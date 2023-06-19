import React, { useRef } from 'react';
import {useEffect} from "react";
function CanvasForm({metadata, imgad}) {
  const canvasRef = useRef(null);
  useEffect(()=>{

    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 이미지 그리기
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/image/test.jpg`;
    if(imgad){

      image.onload = () => {
        ctx.drawImage(image, 0, 0);
        
        // 텍스트 그리기
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Name: ${metadata.name}`, 50, 50);
        ctx.fillText(`Age: ${metadata.age}`, 50, 80);
        
        
        // 추가 삽화 그리기
        const additionalImage = new Image();
        additionalImage.src = `https://gateway.pinata.cloud/ipfs/${imgad}`;
        additionalImage.onload = () => {
          // 추가 삽화를 조그맣게 그릴 좌표 및 크기 설정
          const x = 50;
          const y = 100;
          const width = 200;
          const height = 200;
          
          ctx.drawImage(additionalImage, x, y, width, height);
          
        }
      }
  };
  }, [imgad, metadata])


  return (
    <div>      
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
}

export default CanvasForm;