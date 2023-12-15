const Display = document.querySelector(".calculator-input")
const calculatorKeys = document.querySelector(".calculator-keys")



let displayvalue = "0"
let firstnumber = null
let operator = null
let waitingsecondNum = false

updatedisplay()

function updatedisplay() {
    Display.value = displayvalue
}


// Events
calculatorKeys.addEventListener("click", function (e) {
    const element = e.target
    if (!element.matches("button")) {

        return
    }


    if (element.classList.contains("operator")) {
        Operator(element.value)
        updatedisplay()
        return

    }
    if (element.classList.contains("decimal")) {
        InputDecimal()
        updatedisplay()
        return
    }

    if (element.classList.contains("clear")) {
        Clear()
        updatedisplay()
        return
    }

    inputNumber(element.value)
    updatedisplay()
})


// Number buttons
function inputNumber(num) {
    if (waitingsecondNum) {
        displayvalue = num
        waitingsecondNum = false
    } else {
        displayvalue = displayvalue === "0" ? num : displayvalue + num
    }
    console.log(displayvalue, firstnumber, operator, waitingsecondNum);
}

// Decimal . Button

function InputDecimal() {
    if (!displayvalue.includes(".")) {
        displayvalue += "."
    }

}
// Clear button
function Clear() {
    displayvalue = "0"
}

function Operator(addOperator) {
    const value = parseFloat(displayvalue)
    if (firstnumber === null) {
        firstnumber = value
    }
    else if (operator) {
        const result = Calc(firstnumber, value, operator)
        displayvalue=String(result)
        firstnumber=result
    }
    waitingsecondNum = true
    operator = addOperator
    console.log(displayvalue, firstnumber, operator, waitingsecondNum);
}

// Hesablama
function Calc(first, second, ope) {
    if (ope === "+") {
        return first + second
    } else if (ope === "-") {
        return first - second
    } else if (ope === "*") {
        return first * second
    } else if (ope === "/") {
        return first / second
    }
    return second
}