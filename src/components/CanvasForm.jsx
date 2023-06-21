import React, { useRef } from "react";
import { useEffect } from "react";
function CanvasForm({ metadata, imgad, imgstyle }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // const smoothedZoomCtx = document
    // .getElementById("smoothed-zoom")
    // .getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    //흰색 배경 그리기
    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(0,0,canvasWidth, canvasHeight);

    // 이미지 그리기
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/image/test3.jpg`;
    // 이미지 확대 비율
    const zoomLevel = 2;
    // const foregroundWidth = image.width;
    // const foregroundHeight = image.height;

    // const zoomedWidht = foregroundWidth * zoomRatio;
    // const zoomedHeight = foregroundHeight * zoomRatio;
    const zoomCenterX = 125;
    const zoomCenterY = 500;
    const targetX = 1;
    const targetY = 1;
    const targetWidth = 250;
    const targetHeight = 1000;

    if (imgad) {
      image.onload = () => {
        // if(imgstyle ==1){
        ctx.filter = "blur(5px)";
        // const scaleFactor = window.devicePixelRatio; // 현재 디스플레이의 픽셀 비율

        ctx.drawImage(
          image,
          image.width / 4,
          0,
          (image.width * 3) / 4,
          image.height,
          0,
          0,
          255,
          1000
        );

        ctx.filter = "none";

        // 오른쪽에 사각형 그리기
        const rectWidth = canvasWidth / 2;
        const rectheight = canvasHeight;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(rectWidth, 0, rectWidth, rectheight);
        //사각형 아웃라인
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

        // 텍스트 그리기

        ctx.font = "25px Arial bold ";
        ctx.fillStyle = "white";
        ctx.fillText(`Name: ${metadata.name}`, 50, 80);
        ctx.fillText(`Age: ${metadata.age}`, 50, 120);

        const rectWidth2 = 310;
        const rectheight2 = 310;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          canvasWidth / 2 - 75,
          canvasHeight / 2 - 55,
          rectWidth2,
          rectheight2
        );

        //삽화 이미지 그리기 (원본 크기)
        const additionalImage = new Image();
        additionalImage.src = image.src;

        ctx.drawImage(
          additionalImage,
          canvasWidth / 2 - 70,
          canvasHeight / 2 - 50,
          300,
          300
        );
      };
      // }
    }
  }, [metadata]);

  return (
    <div>
      <canvas ref={canvasRef} width={550} height={1000} />
    </div>
  );
}

export default CanvasForm;

// // 추가 삽화 그리기
// const additionalImage = new Image();
// additionalImage.src = `https://gateway.pinata.cloud/ipfs/${imgad}`;
// // 추가 삽화를 조그맣게 그릴 좌표 및 크기 설정
// additionalImage.onload = () => {
//   //이미지 크기 확인하고 그에 맞게 최솟값과 최대값 사이로 크기 조정
//   const imageWidth = image.width;
//   const imageHeight = image.height;

//   let adjustedWidth = imageWidth;
//   let adjustedHeight = imageHeight;

//   // 최소값보다 작은 경우 조정
//   if (imageWidth < minWidth) {
//     adjustedWidth = minWidth;
//   }
//   if (imageHeight < minHeight) {
//     adjustedHeight = minHeight;
//   }

//   // 최대값보다 큰 경우 조정
//   if (imageWidth > maxWidth) {
//     adjustedWidth = maxWidth;
//   }
//   if (imageHeight > maxHeight) {
//     adjustedHeight = maxHeight;
//   }
//   const x = 50;
//   const y = 50;
//   const width = adjustedWidth * scaleFactor;
//   const height = adjustedHeight * scaleFactor;
//   ctx.scale(scaleFactor, scaleFactor); // 해상도 조정

//   ctx.drawImage(additionalImage, x, y, width, height);

// }

//이미지 최솟값과 최대값
// const minWidth = 100;
// const minHeight = 100;
// const maxWidth = 200;
// const maxHeight = 200;
