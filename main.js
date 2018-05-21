let canv = document.getElementById('canvas');
let ctx = canv.getContext('2d');
let isMouseDown = false;
let coords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;

// Code

canv.addEventListener('mousedown', () =>{
    isMouseDown = true;
});


canv.addEventListener('mouseup', () =>{
    isMouseDown = false;
    ctx.beginPath();

    coords.push('mouseup');

});

canv.addEventListener('mousemove', (e) =>{
   
    if( isMouseDown ){
    
    coords.push([e.clientX, e.clientY]);
    ctx.lineTo(e.clientX, e.clientY)
    ctx.lineWidth = 10 * 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0 , Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}
   
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

});