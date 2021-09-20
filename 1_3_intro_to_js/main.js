let counter = 0;

/*increase by 1 */
function incrementClick() {
    updateDisplay(++counter);
}

/* value is set back to zero */
function resetCounter() {
    counter = 0;
    updateDisplay(counter);
}

/* display the value in the label id */
function updateDisplay(val) {
    document.getElementById("label").innerHTML = val;
}
