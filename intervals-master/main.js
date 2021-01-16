const checkboxes = document.querySelectorAll('[type="checkbox"]');
const calculateBtn = document.querySelector('#calculate')
const checks = [...checkboxes]


function setCondition() {
    let a1 = parseInt(document.querySelector('#a1').value);
    let a2 = +document.querySelector('#a2').value;
    let b1 = +document.querySelector('#b1').value;
    let b2 = +document.querySelector('#b2').value;
    return [a1, a2, b1, b2]
}

//додавання інтервалу А до В
function sumAtoB(a1, a2, b1, b2) {
    let forA = a1 + b1;
    let forB = a2 + b2;
    return [forA, forB]
}

//віднімання інтервалу А від В
function subAtoB(a1, a2, b1, b2) {
    let forA = a1 - b1;
    let forB = a2 - b2;
    return [forA, forB]
}

//множення інтервалів А та В
function multAtoB(a1, a2, b1, b2) {
    let forA = Math.min(a1 * b1, a1 * b2, a2 * b1, a2 * b2);
    let forB = Math.max(a1 * b1, a1 * b2, a2 * b1, a2 * b2)
    return [forA, forB]
}

//ділення інтервалів А та В
function divAtoB(a1, a2, b1, b2) {
    if (b1 == 0 || b2 == 0) throw new Error("Zero in condition")
    let forA = Math.floor(a1 / b2);
    let forB = Math.floor(a2 / b1);
    return [forA, forB]
}

//ділення інтервалів А та В (гіпотеза)
function divAtoBHypo(a1, a2, b1, b2) {
    let forA = Math.min(Math.floor(a1 / b1), Math.floor(a1 / b2), Math.floor(a2 / b1), Math.floor(a2 / b2));
    let forB = Math.max(Math.floor(a1 / b1), Math.floor(a1 / b2), Math.floor(a2 / b1), Math.floor(a2 / b2));
    return [forA, forB]
}


//відображення інтервалу А
function showA(a1, a2) {
    let forA = -a2;
    let forB = -a1;
    return [forA, forB]
}



//інверсія інтервалу А
function invA(a1, a2) {
    let forA = 1 / a2;
    let forB = 1 / a1;
    return [forA, forB]
}

//максимум інтервалів А та В
function maxAtoB(a1, a2, b1, b2) {
    let forA = Math.max(a1, b1);
    let forB = Math.max(a2, b2);
    return [forA, forB]
}

//мінімум інтервалів А та В
function minAtoB(a1, a2, b1, b2) {
    let forA = Math.min(a1, b1);
    let forB = Math.min(a2, b2);
    return [forA, forB]
}

//додавання до А
function addToA(a1, a2) {
    let addition = +document.getElementById('inp-sumToA').value;
    let forA = a1 + addition;
    let forB = a2 + addition;
    return [forA, forB]

}

//віднімання від A
function subFromA(a1, a2) {
    let addition = +document.getElementById('inp-subFromB').value;
    let forA = a1 - addition;
    let forB = a2 - addition;
    return [forA, forB]
}


//множення A на число
function multToA(a1, a2) {
    let addition = +document.getElementById('inp-multTo').value;
    let forA = Math.min(a1 * addition, a2 * addition, b1 * addition, b2 * addition);
    let forB = Math.max(a1 * addition, a2 * addition, b1 * addition, b2 * addition)
    console.log(addition, forA, forB)
    return [forA, forB]

}


//ділення A на число
function divFromA(a1, a2) {
    let addition = +document.getElementById('inp-divsTo').value;
    let forA = a1 / addition;
    let forB = a2 / addition;
    return [forA, forB]

}




function calculate() {
    let condidionForSum = setCondition();
    let results = multToA(...condidionForSum);
    console.log(results)

}
calculateBtn.onclick = () => {
    calculate()
}