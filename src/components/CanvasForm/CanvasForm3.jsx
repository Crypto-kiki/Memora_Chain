import React, { useRef } from 'react';
import {useEffect} from "react";
function CanvasForm3({metadata, imgstyle}) {
  const canvasRef = useRef(null);

   useEffect(()=>{

    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;   

    // 이미지 그리기
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/image/test4.jpg`; 


      image.onload = () => {
   
          ctx.filter = 'blur(6px)'
          // const scaleFactor = window.devicePixelRatio; // 현재 디스플레이의 픽셀 비율    

          // ctx.drawImage(image, 0,0, image.width, image.height, 0,0,255,1000)
          ctx.drawImage(image, 0,0,550,1000)


          ctx.filter = 'none'
          //사각형 아웃라인
          ctx.strokeRect(0,0, canvasWidth, canvasHeight);
      

                  //삽화 배경사각형
        const rectWidth2 = 300;
        const rectheight2 = 380;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(canvasWidth/2 - 150, canvasHeight/2 -195, rectWidth2, rectheight2);
        //삽화 이미지 그리기 (원본 크기)
        const additionalImage = new Image();
        additionalImage.src = image.src;

           const x = canvasWidth/2 - 125;
          const y = canvasHeight/2 - 170;
          const width = 250;
          const height = 250;
          // const cornerRadius = 20;  

        ctx.drawImage(image,x, y, width, height);

        ctx.font = '20px Arial extrabold ';
        ctx.fillStyle = 'black';
        ctx.fillText(`Name: ${metadata.name}`, canvasWidth/2 - 120, canvasHeight/2 + 120);
        const textWidth = ctx.measureText(`Name: ${metadata.name}`).width;
        const underLineY = canvasHeight/2 + 120 +4;
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1;
        ctx.moveTo(canvasWidth/2- 120, underLineY);
        ctx.lineTo(x +textWidth, underLineY);
        ctx.stroke();


        ctx.font = '15px Arial bold ';
        ctx.fillStyle = 'black';
        ctx.fillText(`Age: ${metadata.age}`, canvasWidth/2 -120 , canvasHeight/2 + 150);    
        }


    }, [metadata])
    
    
    return (
      <div>      
      <canvas ref={canvasRef} width={550} height={1000} />
    </div>
  );
}

export default CanvasForm3;

