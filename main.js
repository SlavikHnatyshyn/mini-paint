let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');
let isMouseDown = false;
let coords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;

// stage


let one = false;
let two = false;
let three = false;


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


function save1(){
    window.open(canvas.toDataURL('image/png'), 'new_window');
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




// brush 

let brush = document.getElementById('brush');

brush.addEventListener('click', () => {
     
    one  = true;
    

    if( one === true ){
     
        

    two = false;
    three = false; 
      

    canv.addEventListener('mousemove', (e) =>{
   
        if( isMouseDown && one ){
        
        coords.push([e.clientX, e.clientY]);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.lineWidth = 10 * 2;
        ctx.strokeStyle = input.value;
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10, 0 , Math.PI * 2);
        ctx.fillStyle = input.value;
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
       
});

}


});



// arc

let arc = document.getElementById('arc');

arc.addEventListener('click', () => {
   
    two = true;

    if( two === true ) {

    one  = false;
    three = false;
   
    canv.addEventListener('mousedown', (e) => {
        
        if( isMouseDown && two ){

        coords.push([e.clientX, e.clientY]);
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 30, 0, Math.PI * 2);
        ctx.fillStyle = input.value;
        ctx.fill(); 

    }

    });
    
}  

});


// line 

let line = document.getElementById('line');

line.addEventListener('click', () =>{

   three = true;

   if( three === true ) {
   
   

   one  = false;
   two  = false;

   
   
    canv.addEventListener('mousemove', (e) =>{
   
        if( isMouseDown && three ){
        
        coords.push([e.clientX, e.clientY]);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.strokeStyle = input.value;
        ctx.stroke();
    
        // ctx.beginPath();
        // ctx.arc(e.clientX, e.clientY, 5, 0 , Math.PI * 2);
        // ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
       
   });

   }

});


// set color

let input = document.querySelector('input');
input.value = '#000000';


input.addEventListener('change', (e) =>{
    
    return e.target.value;
    
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





