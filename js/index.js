let memberList = [
    { id: 1, name: "Дима Кравченко", img: "images/dima.jpg", desc: "Киборг-убийца. Студент петьки могилянского. Айти-специалист. Дота геймер.", modalDesc: "Есть связи с нацгвардией" },
    { id: 2, name: "Бежинар Максим", img: "images/bezhik.jpg", desc: "CS GO - gomer. Бежик со сниг (иревки).Наверное так и не станет айтишником", modalDesc: "Пишет машины на с++. Занимаеться спортом и немного футбиком" },
    { id: 3, name: "Айван Токарчук", img: "images/ivan.jpg", desc: "Людину можна забрати з села, но село з людини - ніяк! Но к этому можна прийти!", modalDesc: "Иван имеет  много увлечений. Последние время предпочитает саморазвитие и личнностный рост." },
    { id: 4, name: "Sergey Dychko", img: "images/dy.jpg", desc: "Front-End разработчик. На данный момент изучает практический JS", modalDesc: "На данный момент увлечен обучением новых технологий,в том числе JS." },


]
const toHTML = member => `<div class="col">
<div class="card" style="width: 18rem;">
    <img src="${member.img}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${member.name}</h5>
        <p class="card-text">${member.desc}</p>
        <a href="#" class="btn btn-primary" data-id="${member.id}"  data-btn="click" >Подробнее</a>
        <a href="#" class="btn" data-id="${member.id}"  data-btn="confirm" >Удалить</a>
    </div>
</div>
</div>`

function render() {
    const html = memberList.map(toHTML).join('');
    document.getElementById('members').innerHTML = html;

}

render();

const createModal = $.modal({
    modalTitle: "Подробная информация",
    modalText: "Desc",
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
const confirmModal = $.modal({
    modalTitle: "Вы уверены?",
    modalText: "",
    modalFooter: [,
        {
            text: "YES",
            type: "danger",
            closable: true,
            handler() {
                confirmModal.close()
                console.log('Danger btn was clicked')
            }
        },
        {
            text: "NO",
            type: "danger",
            closable: true,
            handler() {
                confirmModal.close()
                console.log('Danger btn was clicked')
            }
        }
    ]

})



document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const memberId = +event.target.dataset.id;

    if (btnType === "click") {
        const member = memberList.find(f => f.id === memberId);
        console.log(member);
        createModal.setContent(`<p>${member.modalDesc}</p>`);
        createModal.open();
    } else if (btnType == 'confirm') {
        const member = memberList.find(f => f.id === memberId);
        $.confirm({
                modalTitle: "Вы уверены?",
                modalText: `<p>Вы удаляете <strong> ${member.name}</strong></p>`,

            }).then(() => {
                console.log("remove");
                memberList = memberList.filter(f => f.id !== memberId)
                render()
            }).catch(() => {
                console.log("cancel");
            })
            // confirmModal.setContent()
            // confirmModal.open();
    }
})








let modalOpenBtns = document.querySelectorAll('[data-prod]');
for (let i = 0; i < modalOpenBtns.length; i++) {
    const btn = modalOpenBtns[i];
    btn.addEventListener('click', createModal(memberList[i]));
    //btn.onclick = createModal(memberList[i]);

};



let modalCloseBtn = document.querySelector('.modal-close');