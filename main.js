"use strict"

var frontCanvas = document.getElementById('carCanvas');
frontCanvas.width = document.body.clientWidth;

frontCanvas.height = document.body.clientWidth/2;

const frontctx = frontCanvas.getContext('2d', {alpha: false, desynchronized: true})

function calculate() {
    // Create temporary canvas
    let backCanvas = document.createElement('canvas');
    backCanvas.width = frontCanvas.width;
    backCanvas.height = frontCanvas.height;
    let ctx = backCanvas.getContext("2d", {alpha: false, desynchronized: true});
    // Paint over canvas for fresh canvas every time
    ctx.fillStyle = '#4b687e';
    ctx.fillRect(0, 0, backCanvas.width, backCanvas.height);

    // Get angle to use in calculation
    let angle = document.getElementById("angleSlider").value;
    
    //Initiate ctx properties for painting lines
    ctx.lineWidth = backCanvas.width/400;
    let arrowLen = backCanvas.height/20;
    ctx.font = "50px Arial";

    ctx.strokeStyle = '#FFFFFF';

    //Paint the FG force
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    let fgX = backCanvas.width/2+6*arrowLen*Math.cos((90-angle)*Math.PI/180);
    ctx.moveTo(fgX,backCanvas.height/4);
    ctx.lineTo(fgX,backCanvas.height/1.25);
    ctx.lineTo(fgX+arrowLen/2,backCanvas.height/1.25);
    ctx.lineTo(fgX,backCanvas.height/1.25+arrowLen);
    ctx.lineTo(fgX-arrowLen/2,backCanvas.height/1.25);
    ctx.lineTo(fgX,backCanvas.height/1.25);
    ctx.stroke();

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Fg",fgX,backCanvas.height/1.13);

    ctx.beginPath();
    
    ctx.strokeStyle = '#FF0000';

    ctx.translate(backCanvas.width/2,backCanvas.height/4);
    ctx.rotate(-angle*Math.PI/180);
    ctx.translate(-backCanvas.width/2,-backCanvas.height/4);

    //Paint road
    ctx.moveTo(-backCanvas.width,backCanvas.height/1.25);
    ctx.lineTo(2*backCanvas.width,backCanvas.height/1.25);

    ctx.stroke();


    //Paint the car
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';

    // Body
    ctx.strokeRect(backCanvas.width/4,backCanvas.height/2,backCanvas.width/2,backCanvas.height/4);
    ctx.strokeRect(backCanvas.width/3,backCanvas.height/3,backCanvas.width/3,backCanvas.height/6);

    //Panels
    ctx.beginPath();
    ctx.moveTo(backCanvas.width/2,backCanvas.height/3);
    ctx.lineTo(backCanvas.width/2,backCanvas.height/1.33);
    ctx.moveTo(backCanvas.width/3,backCanvas.height/2);
    ctx.lineTo(backCanvas.width/2.6,backCanvas.height/1.6);
    ctx.moveTo(backCanvas.width/1.5,backCanvas.height/2);
    ctx.lineTo(backCanvas.width/1.55,backCanvas.height/1.6);
    
    ctx.stroke();

    //Lights
    ctx.fillRect(backCanvas.width/1.43,backCanvas.height/1.9,backCanvas.width/20,backCanvas.height/10);
    ctx.fillRect(backCanvas.width/1.4,backCanvas.height/1.5,backCanvas.width/40,backCanvas.height/20);

    // Wheels
    ctx.beginPath();
    ctx.arc(backCanvas.width/1.6, backCanvas.height/1.43, backCanvas.height/10, 0, 2 * Math.PI, false);
    ctx.arc(backCanvas.width/2.8, backCanvas.height/1.43, backCanvas.height/10, 0, 2 * Math.PI, false);

    ctx.fill();


    //Paint the FN force
    ctx.beginPath();
    ctx.strokeStyle = '#FF0000';
    let fnX = backCanvas.width/2
    ctx.moveTo(fnX,backCanvas.height/1.25);
    ctx.lineTo(fnX,backCanvas.height/4);
    ctx.lineTo(fnX+arrowLen/2,backCanvas.height/4);
    ctx.lineTo(fnX,backCanvas.height/4-arrowLen);
    ctx.lineTo(fnX-arrowLen/2,backCanvas.height/4);
    ctx.lineTo(fnX,backCanvas.height/4);

    ctx.stroke();

    ctx.fillStyle = '#FF0000';
    ctx.fillText("Fn",fnX,backCanvas.height/5.2);


    //Paint the FD force
    ctx.beginPath();
    ctx.strokeStyle = '#00FF00';
    let fdX = backCanvas.width/1.3;
    let fdY = backCanvas.height/1.5;
    ctx.moveTo(backCanvas.width/2,fdY);
    ctx.lineTo(fdX,fdY);
    ctx.lineTo(fdX,fdY-arrowLen/2);
    ctx.lineTo(fdX+arrowLen,fdY);
    ctx.lineTo(fdX,fdY+arrowLen/2);
    ctx.lineTo(fdX,fdY);

    ctx.stroke();

    ctx.fillStyle = '#00FF00';
    ctx.fillText("Fd",fdX+arrowLen/2,fdY-arrowLen/2);
    

    //Paint final back canvas to front canvas
    frontctx.drawImage(backCanvas, 0, 0);




    let mass = document.getElementById("massText").value;
    let decimalPrecision = document.getElementById("decimalText").value;

    // Calculate fg
    let fg = 9.8*mass;
    document.getElementById("fgText").innerHTML = "Fg = "+parseFloat(fg).toFixed(decimalPrecision)+"N";
    // Calculate fn horizontal
    let fnh = -fg*Math.sin(angle*Math.PI/180);
    document.getElementById("fnhText").innerHTML = "Fn horizontal = "+parseFloat(fnh).toFixed(decimalPrecision)+"N";
    // Calculate fn vertical
    let fnv = fg*Math.cos(angle*Math.PI/180);
    document.getElementById("fnvText").innerHTML = "Fn vertical = "+parseFloat(fnv).toFixed(decimalPrecision)+"N";
    // Calculate fd
    let fd = Math.sign(angle)*Math.sqrt(fnh**2+(fg-fnv)**2)
    document.getElementById("fdText").innerHTML = "Fd = "+parseFloat(fd).toFixed(decimalPrecision)+"N";
}

window.onload = function() {
    calculate();
}