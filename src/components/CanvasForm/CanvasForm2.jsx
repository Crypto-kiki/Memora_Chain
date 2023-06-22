import React, { useRef } from 'react';
import {useEffect} from "react";
function CanvasForm2({metadata,  imgstyle}) {
  const canvasRef = useRef(null);

   useEffect(()=>{

    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;   

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    const width = 300;
    const height = 400;
    const x = canvasWidth/2 - 150;
    const y = canvasHeight/2 - 200;
    const cornerRadius = 20; 

    // 이미지 그리기
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/image/test4.jpg`; 


      image.onload = () => {
   
          ctx.filter = 'blur(6px)'       
          ctx.drawImage(image, 0,0,550,1000);

          ctx.filter = 'none'
          //사각형 아웃라인
          ctx.strokeRect(0,0, canvasWidth, canvasHeight);                       
          ctx.beginPath();
          ctx.rect(0, 0, 500, 1000);
          ctx.font = '25px Arial bold ';
          ctx.fillStyle = 'white';
          ctx.fillText(`Name: ${metadata.name}`, 50, 180);
          ctx.fillText(`Age: ${metadata.age}`, 50, 220);
          ctx.clip();
          ctx.restore()
   
        //삽화 이미지 그리기 (원본 크기)        
        tempCanvas.width = width;
        tempCanvas.height = height;
        tempCtx.drawImage(image, 0, 0, width, height);


        tempCtx.globalCompositeOperation = 'destination-in';
        tempCtx.beginPath();
        tempCtx.moveTo(cornerRadius, 0);
        tempCtx.lineTo(width - cornerRadius, 0);
        tempCtx.arcTo(width, 0, width, cornerRadius, cornerRadius);
        tempCtx.lineTo(width, height - cornerRadius);
        tempCtx.arcTo(width, height, width - cornerRadius, height, cornerRadius);
        tempCtx.lineTo(cornerRadius, height);
        tempCtx.arcTo(0, height, 0, height - cornerRadius, cornerRadius);
        tempCtx.lineTo(0, cornerRadius);
        tempCtx.arcTo(0, 0, cornerRadius, 0, cornerRadius);
        tempCtx.closePath();
        tempCtx.fill();
          
          ctx.drawImage(tempCanvas,x, y, width, height);
       
        }
      
    }, [ metadata])
    
    
    return (
      <div>      
      <canvas ref={canvasRef} width={550} height={1000} />
    </div>
  );
}

export default CanvasForm2;

