const form = document.getElementById('form');
const userInput = document.getElementById('userInput');

form.addEventListener('submit', (e) => {
    if(userInput.value === ''){
        e.preventDefault();
        alert('Пожалуйста, введите доменное имя или IP-адрес');
    }
});


const leftTop = document.querySelector('.location-left-top');
const rightBottom = document.querySelector('.location-right-bottom');
const leftBottom = document.querySelector('.location-left-bottom');
const rightTop = document.querySelector('.location-right-top');

document.body.addEventListener('mousemove', (e) => {
    let valueX = (e.pageX * -1 / 24);
    let valueY = (e.pageY * -1 / 24);

    leftTop.style.transform = `translate3d(${valueX}px, ${valueY}px, 0)`;
});

document.body.addEventListener('mousemove', (e) => {
    let valueX = (e.pageX * -1 / 4);
    let valueY = (e.pageY * -1 / 8);

    rightBottom.style.transform = `translate3d(${valueX}px, ${valueY}px, 0)`;
});

document.body.addEventListener('mousemove', (e) => {
    let valueX = (e.pageX * -1 / 16);
    let valueY = (e.pageY * -1 / 8);

    rightTop.style.transform = `translate3d(${valueX}px, ${valueY}px, 0)`;
});

document.body.addEventListener('mousemove', (e) => {
    let valueX = (e.pageX * -1 / 16);
    let valueY = (e.pageY * -1 / 6);

    leftBottom.style.transform = `translate3d(${valueX}px, ${valueY}px, 0)`;
});

const submitBtn = document.querySelector('.main__submit');

submitBtn.addEventListener('mouseenter', () => {
    if(!userInput.value){
        submitBtn.style.background = '#ce4939';
        submitBtn.setAttribute('title', 'Введите доменное имя или IP-адрес');
    } else {
        submitBtn.style.background = '#34b3a0';
    }
});

submitBtn.addEventListener('mouseleave', () => {
    submitBtn.removeAttribute('title');
    submitBtn.removeAttribute('style');
});


const openW = document.getElementById('w-openModal');
const openP = document.getElementById('p-openModal');
const closeW = document.getElementById('w-closeBtn');
const closeP = document.getElementById('p-closeBtn');
const modalW = document.getElementById('w-modal');
const modalP = document.getElementById('p-modal');

openW.addEventListener('click', openWModal);
openP.addEventListener('click', openPModal);
closeW.addEventListener('click', closeWModal);
closeP.addEventListener('click', closePModal);

window.addEventListener('click', (e) => {
    if(e.target == modalW){
        closeWModal();
    } else if(e.target == modalP){
        closePModal();
    }
});

function openWModal(){
    modalW.classList.add('modal_type_opened');
}

function openPModal(){
    modalP.classList.add('modal_type_opened');
}

function closeWModal(){
    modalW.classList.add('modal_type_closing');

    setTimeout(() => {
        modalW.classList.remove('modal_type_closing', 'modal_type_opened');
    }, 900);
}

function closePModal(){
    modalP.classList.add('modal_type_closing');

    setTimeout(() => {
        modalP.classList.remove('modal_type_closing', 'modal_type_opened');
    }, 900);
}
