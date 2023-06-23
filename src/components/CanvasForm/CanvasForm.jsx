import React, { useRef } from "react";
import { useEffect } from "react";

function CanvasForm({ metadata, fontstyle, size, img, file }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;

    //폰트 기능
    const font = new FontFace(
      `${fontstyle}`,
      `url(${process.env.PUBLIC_URL}/font/${fontstyle}.ttf)`
    );

    //임시 캔버스 변수

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    const width = 275; // 이미지의 너비
    const height = 1000; // 이미지의 높이
    const zoomFactor = 0.8; // 확대 배율

    // 확대된 크기 계산
    const zoomedWidth = width * zoomFactor;
    const zoomedHeight = height * zoomFactor;

    // 중앙 좌표 계산
    const centerX = width / 2;
    const centerY = height / 2;

    // 중앙을 기준으로 확대된 크기만큼 좌표 이동
    //  const zoomedX = centerX - zoomedWidth / 2;
    //   const zoomedY = centerY - zoomedHeight / 2;

    // 이미지 그리기
    const image = new Image();
    image.src = file;

    image.onload = () => {
      font.load().then(() => {
        document.fonts.add(font); // 폰트를 document.fonts에 추가
        document.fonts.ready.then(() => {
          ctx.font = `20px ${fontstyle}`;
          ctx.fillText(`Name: ${metadata.name}`, cw / 11, ch / 12.5);
          ctx.fillText(`Age: ${metadata.age}`, cw / 11, ch / 8.3);
          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
          img(imageDataUrl);
        });
      });

      //임시캔버스에 그리기
      tempCanvas.width = zoomedWidth;
      tempCanvas.height = zoomedHeight;
      tempCtx.drawImage(image, 0, 0, width, height);

      ctx.filter = "blur(2px)";
      ctx.drawImage(tempCanvas, 0, 0, width, height);

      ctx.filter = "none";
      // 오른쪽에 사각형 그리기
      const rectWidth = cw / 2;
      const rectheight = ch;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(rectWidth - cw / 18.33, 0, rectWidth + cw / 5, rectheight);
      //사각형 아웃라인
      ctx.strokeRect(0, 0, cw, ch);

      //삽화 배경사각형
      const rectWidth2 = cw / 1.78;
      const rectheight2 = cw / 1.78;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(
        cw / 2 - cw / 7.33,
        ch / 2 - ch / 18.18,
        rectWidth2,
        rectheight2
      );

      //삽화 이미지 그리기 (원본 크기)
      const additionalImage = new Image();
      additionalImage.src = image.src;

      ctx.drawImage(
        additionalImage,
        cw / 2 - cw / 7.85,
        ch / 2 - ch / 20,
        cw / 1.84,
        cw / 1.84
      );
    };
  }, [metadata, fontstyle, size, file]);

  return (
    <div className="hidden">
      <canvas ref={canvasRef} width={550} height={900} />
    </div>
  );
}

// additionalImage.src = `https://gateway.pinata.cloud/ipfs/${imgad}`;
export default CanvasForm;
