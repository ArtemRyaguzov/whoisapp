const form = document.getElementById('form');
const userInput = document.getElementById('userInput');

form.addEventListener('submit', (e) => {
    if(userInput.value.trim() === ''){
        e.preventDefault();
        alert('Пожалуйста, введите доменное имя или IP-адрес');
    }
});


const leftTop = document.querySelector('.location-left-top');
const rightBottom = document.querySelector('.location-right-bottom');
const leftBottom = document.querySelector('.location-left-bottom');
const rightTop = document.querySelector('.location-right-top');

document.body.addEventListener('mousemove', (e) => {
    let leftTopValueX = (e.pageX * -1 / 24),
        leftTopValueY = (e.pageY * -1 / 24),
        leftBottomValueX = (e.pageX * -1 / 16),
        leftBottomValueY = (e.pageY * -1 / 6),
        rightTopValueX = (e.pageX * -1 / 16),
        rightTopValueY = (e.pageY * -1 / 8),
        rightBottomValueX = (e.pageX * -1 / 4),
        rightBottomValueY = (e.pageY * -1 / 8);


    leftTop.style.transform = `translate3d(${leftTopValueX}px, ${leftTopValueY}px, 0)`;
    leftBottom.style.transform = `translate3d(${leftBottomValueX}px, ${leftBottomValueY}px, 0)`;
    rightTop.style.transform = `translate3d(${rightTopValueX}px, ${rightTopValueY}px, 0)`;
    rightBottom.style.transform = `translate3d(${rightBottomValueX}px, ${rightBottomValueY}px, 0)`;
});


const submitBtn = document.querySelector('.main__submit');

submitBtn.addEventListener('mouseenter', function(){
    if(!userInput.value.trim()){
        this.style.background = '#ce4939';
        this.setAttribute('title', 'Введите доменное имя или IP-адрес');
    } else {
        this.style.background = '#34b3a0';
    }
});

submitBtn.addEventListener('mouseleave', function(){
    this.removeAttribute('title');
    this.removeAttribute('style');
});


class Modal {
    constructor(element, opener, closer){
        this.element = element,
        this.opener = opener,
        this.closer = closer
    }

    openModal(){
        this.element.classList.add('modal_type_opened');
    }

    closeModal(){
        this.element.classList.add('modal_type_closing');

        setTimeout(() => {
            this.element.classList.remove('modal_type_closing', 'modal_type_opened');
        }, 900);
    }

    init(){
        this.opener.addEventListener('click', () => {
            this.openModal();
        });
        this.closer.addEventListener('click', () => {
            this.closeModal();
        });
        window.addEventListener('click', (e) => {
            if(e.target == this.element){
                this.closeModal();
            }
        });
    }
}

const whoisModalInstance = new Modal(document.getElementById('w-modal'), document.getElementById('w-openModal'), document.getElementById('w-closeBtn'));
const punycodeModalInstance = new Modal(document.getElementById('p-modal'), document.getElementById('p-openModal'), document.getElementById('p-closeBtn'));

whoisModalInstance.init();
punycodeModalInstance.init();