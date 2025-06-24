const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const display = document.querySelector("#display");
const floatSignBtn = document.querySelector(".float");
let numberA = 0;
let numberB = 0;
let operator = "";

deleteBtn.addEventListener("click", () => {
    const displayLength = display.textContent.length;
    display.textContent = display.textContent.slice(0,displayLength - 1);
})

clearBtn.addEventListener("click", () => {
    numberA = 0;
    numberB = 0;
    operator = "";
    display.textContent = "";
})

numberBtns.forEach((button) =>{
    button.addEventListener("click", ()=>{
        if(display.textContent.length === 13){
            return;
        } else if(operator && !numberA){
            numberA = display.textContent;
            display.textContent = "";
            display.textContent += button.textContent;
        } else {
            display.textContent += button.textContent; 
        }
    })
})

floatSignBtn.addEventListener("click", () => {
    const displayNumber = Number(display.textContent);
    if(Number.isInteger(displayNumber)){
        display.textContent += ".";
    }
})

operatorBtns.forEach((button) => {
    button.addEventListener("click", ()=>{
        if(!numberA && display.textContent){
            numberA = display.textContent;
            display.textContent = "";
            operator = button.textContent;
        } else if(!numberB && display.textContent){
            numberB = display.textContent;
            const result = handleFloatAndBigNum(operate(numberA,operator,numberB));
            operator = button.textContent;
            numberA = 0;
            numberB = 0;
            display.textContent = result;
        } 
    })
})

equalBtn.addEventListener("click", () =>{
    if(!numberA && operator && display.textContent){
        const result = handleFloatAndBigNum(operate(Number(display.textContent), operator, Number(display.textContent)));
        display.textContent = result;
    }else if(display.textContent && operator){
        numberB = display.textContent;
        const result = handleFloatAndBigNum(operate(numberA, operator, numberB));
        numberB = 0;
        numberA = 0;
        display.textContent = result;
    } else if(!numberA){
        return
    }
})

const isFloat = (number) => {
    if (!Number.isInteger(Number(number))){
        return true;
    } else {
        return false;
    }
}
const isBigNum = (number) => {
    if(number.toString().length > 13){
        return true;
    } else {
        return false;
    }
}
const handleFloatAndBigNum = (number) =>{
    if(isFloat(number)){
        const roundedNumber = Math.round(number);
        if(roundedNumber < 1){
            return roundedNumber;
        }
        return parseFloat(number).toFixed(3); 
    }else if(isBigNum(number)){
        return parseFloat(number).toPrecision(4);
    } else {
        return number;
    }
}

const add = (a,b) => {
    return +a + +b;
}
const subtract = (a,b) =>{
    return a-b;
}
const multiply = (a,b) =>{
    return a*b;
}
const divide = (a,b) =>{
    return a/b;
}

const operate = (numA, opSymbol, numB) => {
    switch(opSymbol){
        case "+": 
            return add(numA,numB);
        case "-": 
            return subtract(numA,numB);
        case "*":
            return multiply(numA,numB);
        case "/":
            return divide(numA,numB);
    }
}