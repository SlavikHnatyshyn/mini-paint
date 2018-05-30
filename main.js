let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');
let isMouseDown = false;
let coords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;



// Basic text for settings



// ctx.font = '16px Arial';
// ctx.fillStyle = '#72305f';
// ctx.fillText('Just use your finger or mouse to draw.', 50, 75);

// ctx.fillStyle = '#e53c1e';
// ctx.fillText(' Click w to start.', 46, 100); 


// ctx.font = '14px Arial'
// ctx.fillStyle = '#000';
// ctx.fillText('Click s to save.', 50, 125);
// ctx.fillText(' Click r to replay what you saved.', 46, 150);
// ctx.fillText(' Click c to clear.', 46, 175);


// document.addEventListener('keydown', (e) => {
   

//     if (e.keyCode === 87){
//          //start
//         ctx.fillStyle = '#fff';
//         ctx.fillRect(0,0, canv.width, canv.height);

//         ctx.beginPath();
//         ctx.fillStyle = '#000';
         
//     }

// });




// Code

//basic functions 

function save (){
    localStorage.setItem('coords', JSON.stringify(coords));
}



function clear (){
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0, canv.width, canv.height);

    ctx.beginPath();
    ctx.fillStyle = '#000';
}

function replay (){
 
   let timer = setInterval( function () {
   
    if(!coords.length){
        clearInterval(timer);
        ctx.beginPath();
        return;
    }

    let crd = coords.shift();
    let e = {
        clientX: crd['0'],
        clientY: crd['1']
    };


    ctx.lineTo(e.clientX, e.clientY)
    ctx.lineWidth = 10 * 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0 , Math.PI * 2);
    
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);



   },30);

}


// basic functions for mouse stage

canv.addEventListener('mousedown', () =>{
    isMouseDown = true;
});


canv.addEventListener('mouseup', () =>{
    isMouseDown = false;
    ctx.beginPath();

    coords.push('mouseup');

});




// brash 

let brush = document.getElementById('brush');

brush.addEventListener('click', () => {


    canv.addEventListener('mousemove', (e) =>{
   
        if( isMouseDown ){
        
        coords.push([e.clientX, e.clientY]);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.lineWidth = 10 * 2;
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10, 0 , Math.PI * 2);
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
       
});



});



// arc

let arc = document.getElementById('arc');

arc.addEventListener('click', () => {
   
    canv.addEventListener('mousedown', (e) => {
        coords.push([e.clientX, e.clientY]);
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 30, 0, Math.PI * 2);
        ctx.fill(); 
    });

});


// line 

let line = document.getElementById('line');

line.addEventListener('click', () =>{

   
   
    canv.addEventListener('mousemove', (e) =>{
   
        if( isMouseDown ){
        
        coords.push([e.clientX, e.clientY]);
        ctx.lineTo(e.clientX, e.clientY);
     
        ctx.stroke();
    
        // ctx.beginPath();
        // ctx.arc(e.clientX, e.clientY, 5, 0 , Math.PI * 2);
        // ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
       
});

});









document.addEventListener('keydown', (e) => {
       
    
    if (e.keyCode === 83){
         //save
         save();
         console.log('Saved');
    }

    if (e.keyCode === 82){
        // replay

        coords = JSON.parse(localStorage.getItem('coords'));
        clear();
        replay();
        console.log('Replaying ..');
    }

    if (e.keyCode === 67){
       // clear
       clear();
       console.log('Cleared');
    }
});



