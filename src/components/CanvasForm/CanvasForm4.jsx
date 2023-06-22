import React, { useRef } from 'react';
import {useEffect} from "react";
function CanvasForm4({metadata, imgstyle}) {
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
   
          // ctx.filter = 'blur(6px)'
          // const scaleFactor = window.devicePixelRatio; // 현재 디스플레이의 픽셀 비율    

          // ctx.drawImage(image, 0,0, image.width, image.height, 0,0,255,1000)
          ctx.drawImage(image, 0,canvasHeight/2-50,550,550);
          
          const x1 = (image.width)/2;
          const y1 = ((image.height)/2)+500;
          const pixel = ctx.getImageData(x1, y1, 1, 1);
          const data = pixel.data;          
          const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`; 


           // 아래에 사각형 그리기
           const rectWidth2 = canvasWidth ;
           const rectheight2 = canvasHeight/2 ;
           console.log(rgba);
           ctx.fillStyle = rgba;
           ctx.fillRect(0, canvasHeight/2-100, rectWidth2, rectheight2+100);


          ctx.filter = 'none'
          
          // 위쪽에 사각형 그리기
          const rectWidth = canvasWidth ;
          const rectheight = canvasHeight/2 -100;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, rectWidth, rectheight);
          //사각형 아웃라인
          ctx.strokeRect(0,0, canvasWidth, canvasHeight);
      
        //삽화 이미지 그리기 (원본 크기)
        const additionalImage = new Image();
        additionalImage.src = image.src;

           const x = canvasWidth/2 - 170;
          const y = canvasHeight/2 - 270;
          const width = 340;
          const height = 340;
          // const cornerRadius = 20;  

        ctx.drawImage(image,x, y, width, height);

        ctx.font = '20px Arial extrabold ';
        ctx.fillStyle = 'black';
        ctx.fillText(`Name: ${metadata.name}`, canvasWidth/2 - 120, canvasHeight/2 + 120);
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

export default CanvasForm4;

