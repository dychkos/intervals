Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {}
//Футер для модального окна 

function _createModalButtons(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div');

    }
    const wrap = document.createElement('div');
    wrap.classList.add('window__footer');

    buttons.forEach(btn => {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add('modal-btn');
        // if (btn.closable) {
        //     $btn.addEventListener('click', )
        // }
        //$btn.classList.add(`btn-${btn.type}` || secondary);
        $btn.onclick = btn.handler || noop;

        wrap.appendChild($btn);
    });


    return wrap;

}




//Генерация модального окна
function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('modal-window');
    if(options.simple==true){
        modal.insertAdjacentHTML('afterBegin',

        `   
    <div class="window__content ">
        <div class="window__header">
            <h2 class="modal__title" >${options.modalTitle}</h2>
            <span class="modal-close" data-close="true">&times;</span>
        </div>
        <div class="window__text" data-result="true">
            <span id="forResult"> ${options.modalText}</span>
        </div>
        </div>
            <div data-content="true" class="graphics"></div>
        
        </div>        
    </div>`);
        
    } else {
        modal.insertAdjacentHTML('afterBegin',

        `<div class="window__content ">
        <div class="window__header">
            <h2 class="modal__title" >${options.modalTitle}</h2>
            <span class="modal-close" data-close="true">&times;</span>
        </div>
        <div class="window__text"  data-result="true">
            <span id="forResult"> ${options.modalText}</span>
        </div>
        <div class="graphics">
            
            <div class="results" >
                <a class="btn" id="onlyA" href="#">Результат в А</a>
                <a class="btn" id="onlyB" href="#">Результат в B</a>
            </div>
            
            <canvas id="canvas1">You broswer dont expe</canvas>
            <canvas id="canvas2">You broswer dont expe</canvas>
            <canvas id="canvas3">You broswer dont expe</canvas>
           <div>

        </div>        
    </div>`);
    }
   

    const footer = _createModalButtons(options.modalFooter);
    footer.appendAfter(modal.querySelector('.graphics'))
    document.body.appendChild(modal);
    return modal;

}



$.modal = function(options) {
    const $modal = _createModal(options);
    const ANIM_SPEED = 200;
    let closing = false;
    let destroyed = false;

    //возвращаемый обьект
    const modal = {
        open() {
            if (destroyed) {
                return console.log('modal is destroyed');
            }!closing && $modal.classList.add('open');
        },
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide');
                closing = false;

                if (typeof options.onClose === 'function') {
                    options.onClose();
                
                }
               
            }, ANIM_SPEED)

        }
    }

    //обрабатываем событие для всех data-close
    const listener = event => {
            if (event.target.dataset.close) {
                modal.close();
            }
        }
        //реализация закрытия окна
    $modal.addEventListener('click', listener);


    //разширяем возвращаемый обьект
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        },
        addContent(html) {
            $modal.querySelector('[data-content]').innerHTML += html;
        },
        setResult(html) {
            $modal.querySelector('[data-result]').innerHTML = html;
        },
        setTitle(html) {
            $modal.querySelector('.modal__title').innerHTML = html;
        },
        setFooter(html){
            $modal.querySelector('.window__footer').innerHTML = html;
        }
    });

}