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
      "Popppins",
      `url(${process.env.PUBLIC_URL}/font/Popppins.ttf)`
    );

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

      // 왼쪽에 사각형 그리기

      ctx.filter = "blur(2px)";
      ctx.drawImage(tempCanvas, 0, 0, width, height);

      ctx.filter = "none";
      // 오른쪽에 사각형 그리기
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(rectWidth - cw / 18.33, 0, rectWidth + cw / 5, rectheight);
      //사각형 아웃라인

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
