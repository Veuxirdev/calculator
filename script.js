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

const handleDelete = () => {
    const displayLength = display.textContent.length;
    display.textContent = display.textContent.slice(0,displayLength - 1);
}

const handleNumbers = (el) => {
        const elNode = el.target;
        const number = elNode? elNode.textContent: el;
        if(display.textContent.length === 13){
            return;
        } else if(operator && !numberA){
            numberA = display.textContent;
            display.textContent = "";
            display.textContent += number;
        } else {
            display.textContent += number; 
        }
}

const handleOperator = (el) => {
    const elNode = el.target;
    const opValue = elNode? elNode.textContent: el;
    if(!numberA && display.textContent){
        numberA = display.textContent;
        display.textContent = "";
        operator = opValue;
    } else if(!numberB && display.textContent){
        numberB = display.textContent;
        const result = handleFloatAndBigNum(operate(numberA,operator,numberB));
        operator = opValue;
        numberA = 0;
        numberB = 0;
        display.textContent = result;
    } 
}

const handleFloatBtn = ()=> {
    if(!display.textContent.includes(".") && display.textContent.length < 13){
        display.textContent += ".";
    }
}

const handleEqualBtn = () =>{
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
}

document.addEventListener("keydown", (e) => {
    const numbers = "1234567890";
    const operators = "/*-+";
    const isValid = "1234567890/*-+=.".includes(e.key) || e.key === "Backspace"? true:false;
    const value = e.key;
    if(isValid){
        switch (true){
        case "Backspace" === value : 
            handleDelete();
            break;
        case "=" === value : 
            handleEqualBtn();
            break;
        case numbers.includes(value):
            handleNumbers(value);
            break;
        case operators.includes(value): 
            handleOperator(value);
        break;
        case "." === value :
            handleFloatBtn();
        break;
    }
    }
})

deleteBtn.addEventListener("click", handleDelete);

clearBtn.addEventListener("click", () => {
    numberA = 0;
    numberB = 0;
    operator = "";
    display.textContent = "";
});

numberBtns.forEach((button) =>{
    button.addEventListener("click", (e) => handleNumbers(e))
});

floatSignBtn.addEventListener("click", handleFloatBtn);

operatorBtns.forEach((button) => {
    button.addEventListener("click", (e) => handleOperator(e)
)
});

equalBtn.addEventListener("click", handleEqualBtn);

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
        const roundedNumber = parseFloat(number).toFixed(3);
        if(roundedNumber === "0.000"){
            return 0;
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
    if(b == 0){
        alert("You can't divide by 0!");
        return 0;
    }
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