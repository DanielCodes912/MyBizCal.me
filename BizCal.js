$(document).ready(function() {
    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = true;

    function updateDisplay() {
        $('#display').text(displayValue);
    }

    function inputNumber(number) {
        if (waitingForSecondValue) {
            displayValue = number;
            waitingForSecondValue = false;
        } else {
            displayValue = displayValue === '0' ? number : displayValue + number;
        }
    }

    function inputOperator(nextOperator) {
        const value = parseFloat(displayValue);

        if (firstValue === null) {
            firstValue = value;
        } else if (operator) {
            const result = calculate(firstValue, value, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

        waitingForSecondValue = true;
        operator = nextOperator;
    }

    function calculate(first, second, operator) {
        if (operator === '+') {
            return first + second;
        } else if (operator === '-') {
            return first - second;
        } else if (operator === '*') {
            return first * second;
        } else if (operator === '/') {
            return first / second;
        }

        return second;
    }

    function clear() {
        displayValue = '0';
        firstValue = null;
        operator = null;
        waitingForSecondValue = false;
    }

    function backspace() {
        displayValue = displayValue.slice(0, -1);
        if (displayValue === '') {
            displayValue = '0';
        }
    }

    $('.btn').on('click', function() {
        const { target } = event;
        const { number } = target.dataset;
        const { operator } = target.dataset;

        if (number) {
            inputNumber(number);
            updateDisplay();
            return;
        }

        if (operator) {
            inputOperator(operator);
            updateDisplay();
            return;
        }

        if (target.id === 'equals') {
            inputOperator(operator);
            updateDisplay();
            return;
        }

        if (target.id === 'clear') {
            clear();
            updateDisplay();
            return;
        }

        if (target.id === 'backspace') {
            backspace();
            updateDisplay();
            return;
        }
    });
});
