import React, { useRef } from 'react';
import {useEffect} from "react";
function CanvasForm3({metadata, fontstyle, size, img, file}) {
  const canvasRef = useRef(null);

   useEffect(()=>{

    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;   

    //폰트 기능
    const font = new FontFace(`${fontstyle}`,  `url(${process.env.PUBLIC_URL}/font/${fontstyle}.ttf)`);

    // 이미지 그리기
    const image = new Image();
    image.src = file; 

      image.onload = () => {
   
          ctx.filter = 'blur(6px)'
          // const scaleFactor = window.devicePixelRatio; // 현재 디스플레이의 픽셀 비율    

          // ctx.drawImage(image, 0,0, image.width, image.height, 0,0,255,1000)
          ctx.drawImage(image, 0,0,cw,ch)


          ctx.filter = 'none'
          //사각형 아웃라인
          ctx.strokeRect(0,0, cw, ch);

        //삽화 배경사각형
        const rectWidth2 = cw/1.83;
        const rectheight2 = ch/2.63;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cw/2 - cw/3.66, ch/2 -ch/5.128, rectWidth2, rectheight2);
        //삽화 이미지 그리기 (원본 크기)
        const additionalImage = new Image();
        additionalImage.src = image.src;

          const x = cw/2 - cw/4.4;
          const y = ch/2 - ch/5.88;
          const width = cw/2.2;
          const height = cw/2.2;
          // const cornerRadius = 20;  
          // (((ch/2 -ch/5.128) + (ch/2.63) - (ch/2 - ch/5.88) + (cw/2.2))/2)
        ctx.drawImage(image,x, y, width, height);
        font.load().then(() => {
          ctx.font = `20px ${fontstyle} `;
          ctx.fillStyle = 'black';
          ctx.fillText(`Name: ${metadata.name}`, cw/2 - cw/4.58, ch/2 + ch/8);
        }); 

        const textWidth = ctx.measureText(`Name: ${metadata.name}`).width;
        const underLineY = ch/2 + ch/7.8;
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1;
        ctx.moveTo(cw/2- cw/4.58, underLineY);
        ctx.lineTo(x +textWidth, underLineY);
        ctx.stroke();


        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
          ctx.font = `15px ${fontstyle}`;
          ctx.fillStyle = 'black';
          ctx.fillText(`Age: ${metadata.age}`, cw/2 -cw/4.58 , ch/2 + ch/6.8);
          const imageDataUrl = canvas.toDataURL('image/png');
          img(imageDataUrl);});   })
        }

    }, [metadata, fontstyle, size, file])

    return (
      <div className='hidden'>      
      <canvas ref={canvasRef} width={550} height={900} />
    </div>
  );
}

export default CanvasForm3;

