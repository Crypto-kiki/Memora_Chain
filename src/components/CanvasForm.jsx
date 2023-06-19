import React, { useRef } from 'react';
import {useEffect} from "react";
function CanvasForm({metadata, imgad, imgstyle}) {
  const canvasRef = useRef(null);
  useEffect(()=>{

    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    //이미지 최솟값과 최대값
    const minWidth = 100;
    const minHeight = 100;
    const maxWidth = 200;
    const maxHeight = 200;

    // 이미지 그리기
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/image/test.jpg`;
    if(imgad){

      image.onload = () => {
        if(imgstyle == 1){
          const zoomFactor = 2; // 확대 비율
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width * zoomFactor, image.height * zoomFactor);
        }
        const scaleFactor = window.devicePixelRatio; // 현재 디스플레이의 픽셀 비율
        // ctx.scale(scaleFactor, scaleFactor); // 해상도 조정
        // ctx.drawImage(image, 0, 0);
        
        // // 텍스트 그리기
        // ctx.font = '25px Arial bold ';
        // ctx.fillStyle = 'black';
        // ctx.fillText(`Name: ${metadata.name}`, 300, 80);
        // ctx.fillText(`Age: ${metadata.age}`, 300, 120);
        
        
        // 추가 삽화 그리기
        const additionalImage = new Image();
        additionalImage.src = `https://gateway.pinata.cloud/ipfs/${imgad}`;
        // 추가 삽화를 조그맣게 그릴 좌표 및 크기 설정
        additionalImage.onload = () => {
          //이미지 크기 확인하고 그에 맞게 최솟값과 최대값 사이로 크기 조정
          const imageWidth = image.width;
          const imageHeight = image.height;

          let adjustedWidth = imageWidth;
          let adjustedHeight = imageHeight;

          // 최소값보다 작은 경우 조정
          if (imageWidth < minWidth) {
            adjustedWidth = minWidth;
          }
          if (imageHeight < minHeight) {
            adjustedHeight = minHeight;
          }

          // 최대값보다 큰 경우 조정
          if (imageWidth > maxWidth) {
            adjustedWidth = maxWidth;
          }
          if (imageHeight > maxHeight) {
            adjustedHeight = maxHeight;
          }
          const x = 50;
          const y = 50;
          const width = adjustedWidth * scaleFactor;
          const height = adjustedHeight * scaleFactor;
          ctx.scale(scaleFactor, scaleFactor); // 해상도 조정
          
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