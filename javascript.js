
backgroundChange = false;

function changeBackground(color){
    backgroundChange = true;
    document.body.style.backgroundColor = color;
}

function changeBackgroundBack(){
    backgroundChange = false;
    document.body.style.backgroundColor = '#ffe6ff';
}