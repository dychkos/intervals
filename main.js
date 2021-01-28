const calculateBtn = document.querySelector('#calculate')

//обьект для ведення розрахунків
const choosing = {
    sum: sumAtoB,
    sub: subAtoB,
    multy: multAtoB,
    divs1: divAtoB,
    divs2: divAtoBHypo,
    showA: showA,
    max: maxAtoB,
    sumToA: addToA,
    //
    subFromB: subFromB,
    multTo: multToA,
    divsTo: divFromB,
    //
    inv: invB,
    min: minAtoB

}

//для опрацювання помилок
let errors = [];

//заполение условий для задачи
function setCondition() {
    let a=document.querySelector('#a1');
    let b=document.querySelector('#b1');

    let a1,a2,b1,b2;
    if(a.disabled){
        a1=1;
        a2=2;
        b1 = +b.value;
        b2 = +document.querySelector('#b2').value;
    }
    else if(b.disabled){
        b1=1;
        b2=2;
        a1 = parseInt(a.value);
        a2 = +document.querySelector('#a2').value;
    }
    else{
        a1 = parseInt(a.value);
        a2 = +document.querySelector('#a2').value;
        b1 = +b.value;
        b2 = +document.querySelector('#b2').value;
        
    }
   
    if((a1 ==0 &&  a2==0 )|| (b1 ==0 && b2==0)){
        errors.push("Заповніть будь-ласка всі необхідні поля!")
        return false;
    }
    else if (a1 > a2 || b1 > b2) {
        errors.push("Помилка вводу. Ліва границя інтервалу має бути менше правої!")
        return false;


    }
    // else if (a1 == 0 && a2 == 0 || b1 == 0 && b2 == 0) {
    //     errors.push("Заповніть інтервал перед разрахунком!")
    //     return;
    // }

    return [a1, a2, b1, b2]
}

//відключення непотрібних полів вводу
function disableExtraInput() {
    let extraInputs = document.querySelectorAll('.extra-input');
    extraInputs.forEach(input => {
        input.setAttribute("disabled", "disabled");
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
    if (b1 == 0 || b2 == 0) errors.push("Ділення на нуль в умові")
    let forA = Math.ceil(a1 / b2);
    let forB = Math.ceil(a2 / b1);
    return [forA, forB]
}

//ділення інтервалів А та В (гіпотеза)
function divAtoBHypo(a1, a2, b1, b2) {
    if (b1 == 0 || b2 == 0) errors.push("Ділення на нуль в умові")
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
function multToA(a1, a2, ) {
    let addition = +document.getElementById('inp-multTo').value;
    let forA = a1 * addition;
    let forB = a2 * addition;
    return [forA, forB]

}


//ділення B на число
function divFromB(b1, b2) {
    let addition = +document.getElementById('inp-divsTo').value;
    let forA = Math.ceil(b1 / addition);
    let forB = Math.ceil(b2 / addition);
    return [forA, forB]

}

//множення декількох інтервалів
function multyArrayElem( array){
    let right1=Math.max(...array);
    let editArray=array.filter(ar=>ar!=right1);
    let right2=Math.max(...editArray);

    let left1=Math.min(...array);
    editArray=array.filter(ar=>ar!=left1);
    let left2=Math.min(...editArray);

    return [left1*left2, right1*right2]
}

//Ініціалізація модального вікна
const createModal = $.modal({
    modalTitle: "ПОМИЛКА ",
    modalText: "",
    modalFooter: [,
        {
            text: "CANCEL",
            type: "danger",
            closable: true,
            handler() {
                createModal.close()
                console.log('Danger btn was clicked')
            }
        }
    ]

})

//для роботи з модaльним вікном
let grafic = document.querySelector('.graphics');

let onlyABtn = document.querySelector('#onlyA');
let onlyBBtn = document.querySelector('#onlyB');
let cnvs = document.querySelectorAll("canvas");

let multyArray=[];



//розрахунок значень
function calculate() {

    let mode = false;
    const event = document.querySelector('input[name="radioField"]:checked');
     //обработка ошибки
     if (event === null) {
        errors.push("Выберіть операцію для разрахунку !");
        return false;

    }
    let eventType = event.id;
   
    if(eventType==="multyMode"){
        console.log("multySTART")
        mode=true;
        return mode;
    }


    if (setCondition() == false) {
        return false;
    }
    let condition = setCondition();

    

    

    cnvs.forEach(cnv => {
        cnv.style.display ='block';
    })


   
    let result1, result2;

    if (event.dataset.check === "forA") {
        [result1, result2] = choosing[eventType](condition[0], condition[1]);
        getCanvas({
            canvasID: "canvas1",
            title: "A:",
            text1: "A1",
            text2: "A2",
            num1: condition[0],
            num2: condition[1]
        });
        getCanvas({
            canvasID: "canvas2",
            title: "RES:",
            text1: "R1",
            text2: "R2",
            num1: result1,
            num2: result2
        });
        clearCanvas("canvas3");
    } else if (event.dataset.check === "forB") {
        [result1, result2] = choosing[eventType](condition[2], condition[3]);
        getCanvas({
            canvasID: "canvas1",
            title: "B:",
            text1: "B1",
            text2: "B2",
            num1: condition[2],
            num2: condition[3]
        });
        getCanvas({
            canvasID: "canvas2",
            title: "RES:",
            text1: "R1",
            text2: "R2",
            num1: result1,
            num2: result2
        });
        clearCanvas("canvas3");
    } else {
        [result1, result2] = choosing[eventType](...condition);
        getCanvas({
            canvasID: "canvas1",
            title: "A:",
            text1: "A1",
            text2: "A2",
            num1: condition[0],
            num2: condition[1]
        });

        getCanvas({
            canvasID: "canvas2",
            title: "B:",
            text1: "B1",
            text2: "B2",
            num1: condition[2],
            num2: condition[3]
        });
        getCanvas({
            canvasID: "canvas3",
            title: "RES:",
            text1: "R1",
            text2: "R2",
            num1: result1,
            num2: result2
        });
    }

    console.log(choosing[eventType])
            
    onlyABtn.style.display = 'block';
    onlyBBtn.style.display = 'block';
  
    if (event.dataset.check) {
        
        onlyABtn.style.display = 'none';
        onlyBBtn.style.display = 'none';


    }
    
    


    onlyABtn.onclick = () => {
        getCanvas({
            canvasID: "canvas1",
            title: "A:",
            text1: "A1",
            text2: "A2",
            num1: condition[0],
            num2: condition[1]
        });
        clearCanvas("canvas2");
        clearCanvas("canvas3");

    }

    onlyBBtn.onclick = () => {
        getCanvas({
            canvasID: "canvas1",
            title: "B:",
            text1: "B1",
            text2: "B2",
            num1: condition[2],
            num2: condition[3]
        });
        clearCanvas("canvas2");
        clearCanvas("canvas3");

    }

    

    console.log(result1, result2,mode)
    return [result1, result2,mode];


    // let $res = document.querySelector('#forResult');
    // $res.innerHTML = results;
    //console.log(results)

}


// опрацьовуємо клік
calculateBtn.onclick = (e) => {
    e.preventDefault();
   
    let result = calculate()
    console.log(errors)
    resetWindow();
    
    if (result==true) {
        console.log('result = true')
        $.confirm({
            simple:true,
            modalTitle: "Множення декількох інтегралів :",
            modalText: `<div class="multy-mode" data-content="true">
            <p>Введіть кількість інтервалів <input class="numInput" type="number" id="count"></p>`,
    
        }).then((count) => {

            console.log("btn here");
            console.log(count) 
            let multyResult = multyArrayElem(count);
            createModal.setResult(`<p> Результат: [${multyResult[0]},${multyResult[1]}]</p>`)
            createModal.setTitle("РЕЗУЛЬТАТ :")
            grafic.style.display="none";
            
            createModal.open(); 

           
        }).catch(() => {
            console.log("cancel");
        })
        return false;
            
        

    }else if(errors.length > 0){
        createModal.setResult(`<p>${errors[0]}</p>`);
        //createModal.setTitle("ПОМИЛКА :")
       grafic.style.display="none";
        // cnvs.forEach(cnv => {
        //     cnv.style.display = "none";
        // })
            
        // onlyABtn.style.display = 'none';
        // onlyBBtn.style.display = 'none';

        createModal.open();
        errors = [];
        
        
    
        return false;
    } 
    
    else {
        // if (errors) {
        //     createModal.setContent(`<p>${errors[0]}</p>`)
        // } else 
        

        grafic.style.display="flex";
        createModal.setTitle("РЕЗУЛЬТАТ :")
        // createModal.setResult(`<a class="btn" id="onlyA" href="#">Результат в А</a>
        // <a class="btn" id="onlyB" href="#">Результат в B</a>`); 
        if(result[0]>result[1]){
            createModal.setResult(`<p> Результат операции : [${result[1]},${result[0]}]</p>`);
        }else{
            createModal.setResult(`<p> Результат операции : [${result[0]},${result[1]}]</p>`);
        }
        



        createModal.open();
    }

}

//onChange
let eventRadio = document.querySelectorAll('input[name="radioField"]');
let radios = [...eventRadio];


radios.forEach((radio) => {
    radio.addEventListener('change', () => {
        console.log(radio.id)
        disableExtraInput();
        let inputs = document.querySelectorAll(".numInput");
        inputs.forEach(input => {
            input.removeAttribute("disabled");
        });

        let [a1, a2, b1, b2] = inputs;

        if (radio.id === "sumToA") {
            document.getElementById('inp-sumToA').removeAttribute("disabled");
            b1.setAttribute("disabled", "disabled");
            b2.setAttribute("disabled", "disabled");
        } else if (radio.id === "subFromB") {
            document.getElementById('inp-subFromB').removeAttribute("disabled")
            a1.setAttribute("disabled", "disabled");
            a2.setAttribute("disabled", "disabled");
        } else if (radio.id === "showA") {
            b1.setAttribute("disabled", "disabled");
            b2.setAttribute("disabled", "disabled");

        } else if (radio.id === "multTo") {
            document.getElementById('inp-multTo').removeAttribute("disabled");
            b1.setAttribute("disabled", "disabled");
            b2.setAttribute("disabled", "disabled");
        } else if (radio.id === "divsTo") {
            document.getElementById('inp-divsTo').removeAttribute("disabled")
            a1.setAttribute("disabled", "disabled");
            a2.setAttribute("disabled", "disabled");
        }
        else if (radio.id === "inv") {
           
            a1.setAttribute("disabled", "disabled");
            a2.setAttribute("disabled", "disabled");
        }
    })
})



// function countDigits(number) {
//    return String(number).replace('-', '').length;
//  }

//корегуємо значення для графічногозображення
function countTwoNum(n) {
    let nMode = Math.ceil(n);
    if (nMode < 0) return nMode.toString().slice(0, 3);
    return nMode.toString().slice(0, 2);

}

//розрахунок для зображення графіку
function countForCanvas(n, canvasX) {
    nString = countTwoNum(n);
    nInt = parseInt(nString);
    nInt < 0 ? nInt = nInt - 20 : nInt;
    console.log("canv", canvasX, nInt)
    return canvasX + nInt;

}

function getCanvas(options) {
    let canvas = document.getElementById(options.canvasID);
    let ctx = canvas.getContext('2d');
    let cordX1,cordX2;
    if(options.num1>options.num2){
        cordX1 = countForCanvas(options.num2, 115);
        cordX2 = countForCanvas(options.num1, 115);
    }else{
        cordX1 = countForCanvas(options.num1, 115);
        cordX2 = countForCanvas(options.num2, 115);
    }
    

    canvas.width = 230;
    canvas.height = 100;

    // осі графіка
    ctx.strokeStyle = '#B8B8B8';
    ctx.beginPath()
    ctx.moveTo(0, 50)
    ctx.lineTo(230, 50)
    ctx.moveTo(115, 25)
    ctx.lineTo(115, 75)
    ctx.stroke()

    ctx.beginPath();
    ctx.strokeStyle = '#65dfc9';
    ctx.fillStyle = "#65dfc9";
    ctx.font = "bold 15px Roboto";
    ctx.textAlign = "center";

    //заголовок
    ctx.fillText(options.title, 15, 15);
    ctx.font = "bold 12px Roboto";

    ctx.lineWidth = 2;

    ctx.fillText(options.text1, cordX1, 74);
    ctx.moveTo(cordX1, 40)
    ctx.lineTo(cordX1, 60)


    ctx.fillText(options.text2, cordX2 + 20, 74);
    ctx.moveTo(cordX2 + 20, 40)
    ctx.lineTo(cordX2 + 20, 60)


    ctx.stroke()
}

function clearCanvas(id) {
    let canvas = document.getElementById(id);
    canvas.style.display = "none";
}


function resetWindow() {
    let delres = document.querySelectorAll('input');
    delres.forEach((delre) => delre.value = "")
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