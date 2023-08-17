const form = document.getElementById('formpost');
const text = document.querySelector('.text');
const table = document.querySelector('table');



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(text.value);
    text.value = ''
})