const changeBtn = document.querySelector('.change');
const clearBtn =document.querySelector('.clear');
const increaseBtn =document.querySelector('.increase');
const decreaseBtn =document.querySelector('.decrease');
const colorChangeBtn=document.querySelector('.color');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width=1440;
canvas.height=810;

let size=10;
let isPressed=false;
let color='black';
let x=undefined;
let y=undefined;

//Increasing Brush Size
increaseBtn.addEventListener('click',()=>{
    size=size+5;
    if(size>40)
        size=40;
});

//Decreasing Brush Size
decreaseBtn.addEventListener('click',()=>{
    size=size-5;
    if(size<5)
        size=5;
});

canvas.addEventListener('mousedown',()=>{
    isPressed=true;
    x=e.offsetX;
    y=e.offsetY;
});

canvas.addEventListener('mouseup',()=>{
    isPressed=false;
    x=undefined;
    y=undefined;
});

//Drawing on Canvas 
canvas.addEventListener('mousemove', (e)=> {
    if(isPressed){
        const x2=e.offsetX;
        const y2=e.offsetY;
        drawCircle(x2,y2);
        drawLine(x,y,x2,y2);
        x=x2;
        y=y2;
    }
});

//Changing the Color of the Brush
colorChangeBtn.addEventListener('change',(e)=>{
    color=e.target.value;
});


//Draw Circle at a given point
function drawCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x,y,size/2,0,Math.PI*2);
    ctx.fillStyle=color;
    ctx.fill();
}

//Draw A line between two Points
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth=size;
    ctx.strokeStyle=color;
    ctx.stroke();
}

//Clear the Canvas
clearBtn.addEventListener('click', ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
});


//Changing BackGround Color
const changeColor = () => {
    document.body.style.background=randomBg();
}

changeBtn.addEventListener('click',changeColor);

function randomBg(){
    let num=Math.floor(Math.random()*360);
    return `hsl(${num},100%,81%)`;
}