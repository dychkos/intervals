
const calculateBtn = document.querySelector('#calculate')
// const checks = [...checkboxes]


// class Drawing {
//     constructor(canvasID,title,text1,text2){
//         this.canvasID = canvasID;
//         this.title = title;
//         this.text1 = text1;
//         this.text2 = text2;
        
//     }

// }


//ОБНОВИТЬ ФУНКЦИИ
const choosing = {
    sum : sumAtoB,
    sub : subAtoB,
    multy: multAtoB,
    divs1: divAtoB,
    divs2:divAtoBHypo,
    showA:showA,
    max:maxAtoB,
    sumToA:addToA,
    //
    subFromB:subFromB,
    multTo:multToA,
    divsTo:divFromB,
    //
    inv:invB,
    min:minAtoB

}

//заполение условий для задачи
function setCondition() {
    let a1 = parseInt(document.querySelector('#a1').value);
    let a2 = +document.querySelector('#a2').value;
    let b1 = +document.querySelector('#b1').value;
    let b2 = +document.querySelector('#b2').value;
    return [a1, a2, b1, b2]
}

//заповнення додаткових полів
function disableExtraInput(){
    let extraInputs = document.querySelectorAll('.extra-input');
    extraInputs.forEach(input=>{
        input.setAttribute("disabled","disabled");
    })
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
    let forA = Math.ceil(a1 / b2);
    let forB = Math.ceil(a2 / b1);
    return [forA, forB]
}

//ділення інтервалів А та В (гіпотеза)
function divAtoBHypo(a1, a2, b1, b2) {
    let forA = Math.min(Math.ceil(a1 / b1), Math.ceil(a1 / b2), Math.ceil(a2 / b1), Math.ceil(a2 / b2));
    let forB = Math.max(Math.ceil(a1 / b1), Math.ceil(a1 / b2), Math.ceil(a2 / b1), Math.ceil(a2 / b2));
    return [forA, forB]
}


//відображення інтервалу А
function showA(a1, a2) {
    let forA = -a2;
    let forB = -a1;
    return [forA, forB]
}



//інверсія інтервалу B
function invB(b1, b2) {
    let forA = 1 / b2;
    let forB = 1 / b1;
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

//віднімання від B
function subFromB(b1, b2) {
    let addition = +document.getElementById('inp-subFromB').value;
    let forA = b1 - addition;
    let forB = b2 - addition;
    return [forA, forB]
}


//множення A на число
function multToA(a1, a2,) {
    let addition = +document.getElementById('inp-multTo').value;
    let forA =a1 * addition;
    let forB =  a2 * addition;    
    return [forA, forB]

}


//ділення B на число
function divFromB(b1, b2) {
    let addition = +document.getElementById('inp-divsTo').value;
    let forA = Math.ceil(b1 / addition);
    let forB = Math.ceil(b2 / addition);
    return [forA, forB]

}



function calculate() {
    let condition = setCondition();
    const event = document.querySelector('input[name="radioField"]:checked');
    
    //обработка ошибки
    if(event===null) throw new Error("Chosse elem");
    
    let eventType = event.id;
    let result1,result2;

    if( event.dataset.check==="forA"){
        [result1,result2] = choosing[eventType](condition[0],condition[1]);
        getCanvas({
            canvasID:"canvas1",
            title:"A:",
            text1:"A1",
            text2:"A2",
            num1: condition[0],
            num2: condition[1]
        });
        getCanvas({
            canvasID:"canvas2",
            title:"RES:",
            text1:"R1",
            text2:"R2",
            num1: result1,
            num2: result2
        });
    }
    else if( event.dataset.check==="forB"){
        [result1,result2] = choosing[eventType](condition[2],condition[3]);
        getCanvas({
            canvasID:"canvas1",
            title:"B:",
            text1:"B1",
            text2:"B2",
            num1: condition[2],
            num2: condition[3]
        });
        getCanvas({
            canvasID:"canvas2",
            title:"RES:",
            text1:"R1",
            text2:"R2",
            num1: result1,
            num2: result2
        });
    }
    else {
        [result1,result2] = choosing[eventType](...condition);
        getCanvas({
            canvasID:"canvas1",
            title:"A:",
            text1:"A1",
            text2:"A2",
            num1: condition[0],
            num2: condition[1]
        });
    
        getCanvas({
            canvasID:"canvas2",
            title:"B:",
            text1:"B1",
            text2:"B2",
            num1: condition[2],
            num2: condition[3]
        });
        getCanvas({
            canvasID:"canvas3",
            title:"RES:",
            text1:"R1",
            text2:"R2",
            num1: result1,
            num2: result2
        });
    }
   
    console.log(choosing[eventType])    
    
    console.log(result1,result2)

    
   

   
    

    



    // let $res = document.querySelector('#forResult');
    // $res.innerHTML = results;
    //console.log(results)

}

// опрацьовуємо клік
calculateBtn.onclick = () => {
    calculate();
    let delres =document.querySelectorAll('input');
    delres.forEach((delre)=>delre.value="")
}

//onChange
let eventRadio = document.querySelectorAll('input[name="radioField"]');
let radios = [...eventRadio];


radios.forEach((radio)=>{
    radio.addEventListener('change',()=>{
        console.log(radio.id)
        disableExtraInput();
        let inputs = document.querySelectorAll(".numInput");
        inputs.forEach(input => {
            input.removeAttribute("disabled");
        });

        let [a1,a2,b1,b2] = inputs;

        if(radio.id==="sumToA"){
            document.getElementById('inp-sumToA').removeAttribute("disabled");
            b1.setAttribute("disabled","disabled");
            b2.setAttribute("disabled","disabled");
        }
        else if(radio.id==="subFromB"){
            document.getElementById('inp-subFromB').removeAttribute("disabled")
            a1.setAttribute("disabled","disabled");
            a2.setAttribute("disabled","disabled");
        }
        else if(radio.id==="showA"){
            b1.setAttribute("disabled","disabled");
            b2.setAttribute("disabled","disabled");

        }
        else if(radio.id==="multTo"){
            document.getElementById('inp-multTo').removeAttribute("disabled");
            b1.setAttribute("disabled","disabled");
            b2.setAttribute("disabled","disabled");
        }
        else if(radio.id==="divsTo"){
            document.getElementById('inp-divsTo').removeAttribute("disabled")
            a1.setAttribute("disabled","disabled");
            a2.setAttribute("disabled","disabled");
        }
    })
})



// function countDigits(number) {
//    return String(number).replace('-', '').length;
//  }

//корегуємо значення для графічногозображення
function countTwoNum(n) {
    let nMode = Math.ceil(n);
    if(nMode<0) return nMode.toString().slice(0,3);    
    return nMode.toString().slice(0,2);
      
 }

//розрахунок для зображення графіку
function countForCanvas(n, canvasX){
    nString=countTwoNum(n);
    nInt=parseInt(nString);
    nInt<0?nInt=nInt-20:nInt;
    console.log("canv",canvasX,nInt)
    return canvasX + nInt;
     
}

function getCanvas(options){
    let canvas = document.getElementById(options.canvasID);
    let ctx = canvas.getContext('2d');
    
    let cordX1 =countForCanvas(options.num1,115);
    let cordX2 = countForCanvas(options.num2,115);
 
    canvas.width = 230;
    canvas.height = 100;

    // осі графіка
    ctx.strokeStyle = '#ececec';
    ctx.beginPath()
    ctx.moveTo(0,50)
    ctx.lineTo(230,50)
    ctx.moveTo(115,25)
    ctx.lineTo(115,75)
    ctx.stroke()

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.fillStyle = "red";
    ctx.font = "bold 15px Roboto";
    ctx.textAlign="center";

    //заголовок
    ctx.fillText(options.title, 15,15);
    ctx.font = "bold 12px Roboto";

    ctx.lineWidth = 2;
    
    ctx.fillText(options.text1, cordX1, 74);
    ctx.moveTo(cordX1,40)
    ctx.lineTo(cordX1,60)

       
    ctx.fillText(options.text2, cordX2+20, 74);
    ctx.moveTo(cordX2+20,40)
    ctx.lineTo(cordX2+20,60)


    ctx.stroke()
}


// getCanvas({
//     canvasID:"canvas1",
//     title:"A:",
//     text1:"A1",
//     text2:"A2",
//     num1: 1200,
//     num2: 1500,
// });

// getCanvas({
//     canvasID:"canvas2",
//     title:"B:",
//     text1:"B1",
//     text2:"B2",
// });



