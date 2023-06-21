import React, { useRef } from 'react';
import {useEffect} from "react";
function CanvasForm2({metadata, imgad, imgstyle}) {
  const canvasRef = useRef(null);

   useEffect(()=>{

    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;   

    // 이미지 그리기
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/image/test3.jpg`; 

    if(imgad){
      image.onload = () => {
   
          ctx.filter = 'blur(6px)'
          // const scaleFactor = window.devicePixelRatio; // 현재 디스플레이의 픽셀 비율    

          // ctx.drawImage(image, 0,0, image.width, image.height, 0,0,255,1000)
          ctx.drawImage(image, 0,0,550,1000)


          ctx.filter = 'none'
          //사각형 아웃라인
          ctx.strokeRect(0,0, canvasWidth, canvasHeight);
          ctx.font = '25px Arial bold ';
          ctx.fillStyle = 'white';
          console.log(`${metadata.name}`);
          console.log(`${metadata.age}`);
          ctx.fillText(`Name: ${metadata.name}`, 50, 180);
          ctx.fillText(`Age: ${metadata.age}`, 50, 220);     
        //삽화 이미지 그리기 (원본 크기)
        const additionalImage = new Image();
        additionalImage.src = image.src;

           const x = canvasWidth/2 - 150;
          const y = canvasHeight/2 -200;
          const width = 300;
          const height = 400;
          const cornerRadius = 20; 

         // 라운드된 사각형 클리핑 영역 설정
          ctx.beginPath();
          ctx.moveTo(x + cornerRadius, y);
          ctx.lineTo(x + width - cornerRadius, y);
          ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
          ctx.lineTo(x + width, y + height - cornerRadius);
          ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
          ctx.lineTo(x + cornerRadius, y + height);
          ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
          ctx.lineTo(x, y + cornerRadius);
          ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
          ctx.closePath();

          ctx.clip();

        ctx.drawImage(image,x, y, width, height);
        }

      };
    }, [metadata])
    
    
    return (
      <div>      
      <canvas ref={canvasRef} width={550} height={1000} />
    </div>
  );
}

export default CanvasForm2;

