import React, { useRef } from 'react';
import {useEffect} from "react";
// import d from "../../../public/font/Kablammo-Regular.ttf"

function CanvasForm({metadata,  id}) {
  const canvasRef = useRef(null);
  
  useEffect(()=>{
    
    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');   
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;  
    
    const font = new FontFace('MyFont',  `url(${process.env.PUBLIC_URL}/font/Kablammo-Regular.ttf)`);
 

    font.load().then(() => {
      ctx.font = '20px MyFont';
      ctx.fillText(`Name: ${metadata.name}`, 50, 80);
      ctx.fillText(`Age: ${metadata.age}`, 50, 120);  
    });

    //임시 캔버스 변수
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

   const width = 275; // 이미지의 너비
   const height = 1000; // 이미지의 높이
   const zoomFactor = 0.8; // 확대 배율

        // 확대된 크기 계산
        const zoomedWidth = width * zoomFactor;
        const zoomedHeight = height  * zoomFactor ;

          // 중앙 좌표 계산
  const centerX =  width / 2;
  const centerY = height / 2;

  // 중앙을 기준으로 확대된 크기만큼 좌표 이동
  const zoomedX = centerX - zoomedWidth / 2;
  const zoomedY = centerY - zoomedHeight / 2;


    // 이미지 그리기
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/image/test2.jpg`; 

      image.onload = () => {
        // if(imgstyle ==1){
           //임시캔버스에 그리기
          tempCanvas.width = zoomedWidth;
          tempCanvas.height = zoomedHeight;
          tempCtx.drawImage(image, 0, 0, width, height);

          ctx.filter = 'blur(2px)'        
          ctx.drawImage(tempCanvas, 0,0, width, height);

          ctx.filter = 'none'          
          // 오른쪽에 사각형 그리기
          const rectWidth = canvasWidth /2;
          const rectheight = canvasHeight;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(rectWidth-30, 0, rectWidth+10, rectheight);
          //사각형 아웃라인
          ctx.strokeRect(0,0, canvasWidth, canvasHeight);

        // 텍스트 그리기        
        ctx.font = 'bold 48px serif';
        ctx.fillStyle = 'white';
       
        
        //삽화 배경사각형
        const rectWidth2 = 310;
        const rectheight2 = 310;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(canvasWidth/2 - 75, canvasHeight/2 -55, rectWidth2, rectheight2);

       

        //삽화 이미지 그리기 (원본 크기)
        const additionalImage = new Image();
        additionalImage.src = image.src;

        ctx.drawImage(
          additionalImage,
          canvasWidth/2 - 70,
          canvasHeight/2 -50,
          300,300
          );
        }

    }, [ metadata])
    
    
    return (
      <>

      <div >       
      <canvas ref={canvasRef} width={550} height={1000}/>
    </div>
    </>
  );
}

// additionalImage.src = `https://gateway.pinata.cloud/ipfs/${imgad}`;
export default CanvasForm;

