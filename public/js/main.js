const form = document.getElementById('form');
const userInput = document.getElementById('userInput');

form.addEventListener('submit', (e) => {
    if(userInput.value === ''){
        e.preventDefault();
        console.log('prevented');
    }
});
