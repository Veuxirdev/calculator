const numbersBtns = document.querySelectorAll(".number");
const operandsBtns = document.querySelectorAll(".operand");
const equalBtn = document.querySelector(".equal");

let numberA = 0;
let numberB = 0;
let operator = "";

const add = (a,b) => {
    return a+b;
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
        case "X":
            return multiply(numA,numB);
        case "/":
            return divide(numA,numB);
    }
}