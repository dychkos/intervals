

$.confirm = function(options) {
    let temp =1;
    let multyIntervals =[];

    return new Promise((resolve, reject) => {
        const modal = $.modal({
            modalTitle: options.modalTitle,
            modalText: options.modalText,
            simple:true,
            
            onClose() {
                modal.destroy()
            },
            modalFooter: [,
                {
                    text: "ДАЛІ",
                    type: "danger",
                    closable: true,
                    handler() {

                        let countInt= document.querySelector("#count").value;
                        
                        if (countInt==""){
                            modal.addContent(`<br><p>Заполните поле!</p>`)
                        }
                        else if(countInt<=1){
                            modal.addContent(`<br><p>Значение не может быть равно ${countInt}</p>`)
                        }

                        
                        else{
                            //modal.close()
                            let value1;
                            let value2;
                            modal.setResult(`<div class="multy-mode">
                                    <p>Введіть ${temp} інтервал</p>
                                    <div class="interval">
                                    <p>Інтервал А</p>
                                    <div class="intervalBody">
                                        <input class="numInput" type="number" id="multyA1">
                                        <input class="numInput" type="number" id="multyA2">
                                    </div>                       
                
                                    </div>`) 
                            modal.setFooter(`<button id="next" class="modal-btn">Далее</button>`);
                         
                                
                             document.querySelector('#next').onclick=()=>{
                                value1= document.querySelector('#multyA1').value;
                                value2=document.querySelector('#multyA2').value;
                                if (value1=="" || value2==""){
                                    modal.addContent(`<br><p>Заповніть будь-ласка всі необхідні поля!</p>`)
                                }
                                else if(+value1 > +value2){
                                    modal.addContent(`<br><p>Ліва границя інтервалу має бути менше правої!</p>`)
                                }
                                else{
                                    temp++;
                                    modal.setContent(" ")
                                multyIntervals.push(value1,value2)
                                    modal.setResult(`<div class="multy-mode">
                                    <p>Введіть ${temp} інтервал</p>
                                    <div class="interval">
                                    <p>Інтервал А</p>
                                    <div class="intervalBody">
                                        <input class="numInput" type="number" id="multyA1">
                                        <input class="numInput" type="number" id="multyA2">
                                    </div>                       
                
                                    </div>`) 
                                   
                                    console.log(temp,+countInt)
                                    if(temp==(parseInt(countInt)+1)){
                                        resolve(multyIntervals)
                                        modal.close()
                                    }
                                }
                                
                                }
                            
                                
                             
                               
                            }
                            
                        
                           
                            console.log('We are here')
                        }
                       
                    },
                
                {
                    text: "ЗАКРИТИ",
                    type: "danger",
                    closable: true,
                    handler() {
                        modal.close()
                        reject();
                        console.log('Danger btn was clicked')
                    }
                }
            ]

        })
        setTimeout(() => modal.open(), 100);
    })
}