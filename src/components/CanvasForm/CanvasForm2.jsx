import React, { useRef } from "react";
import { useEffect } from "react";
function CanvasForm2({ metadata, fontstyle, size, img, file }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;

    // console.log(fontstyle);

    //폰트 기능
    const font = new FontFace(
      `${fontstyle}`,
      `url(${process.env.PUBLIC_URL}/font/${fontstyle}.ttf)`
    );

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    const width = cw / 1.83;
    const height = ch / 2.5;
    const x = cw / 2 - cw / 3.66;
    const y = ch / 2 - ch / 5;
    const cornerRadius = 20;

    // 이미지 그리기
    const image = new Image();
    image.src = file;

    image.onload = () => {
      ctx.filter = "blur(6px)";
      ctx.drawImage(image, 0, 0, cw, ch);

      ctx.filter = "none";
      //사각형 아웃라인
      ctx.strokeRect(0, 0, cw, ch);

      ctx.beginPath();
      ctx.rect(0, 0, cw, ch);
      font.load().then(() => {
        document.fonts.add(font); // 폰트를 document.fonts에 추가
        document.fonts.ready.then(() => {
          ctx.font = `20px ${fontstyle} `;
          ctx.fillStyle = "white";
          ctx.fillText(`Name: ${metadata.name}`, cw / 11, ch / 5.55);
          ctx.fillText(`Age: ${metadata.age}`, cw / 11, ch / 4.54);
          const imageDataUrl = canvas.toDataURL("image/png");
          img(imageDataUrl);
        });
      });

      ctx.clip();
      ctx.restore();

      //삽화 이미지 그리기 (원본 크기)
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(image, 0, 0, width, height);

      tempCtx.globalCompositeOperation = "destination-in";
      tempCtx.beginPath();
      tempCtx.moveTo(cornerRadius, 0);
      tempCtx.lineTo(width - cornerRadius, 0);
      tempCtx.arcTo(width, 0, width, cornerRadius, cornerRadius);
      tempCtx.lineTo(width, height - cornerRadius);
      tempCtx.arcTo(width, height, width - cornerRadius, height, cornerRadius);
      tempCtx.lineTo(cornerRadius, height);
      tempCtx.arcTo(0, height, 0, height - cornerRadius, cornerRadius);
      tempCtx.lineTo(0, cornerRadius);
      tempCtx.arcTo(0, 0, cornerRadius, 0, cornerRadius);
      tempCtx.closePath();
      tempCtx.fill();

      ctx.drawImage(tempCanvas, x, y, width, height);
    };
  }, [metadata, fontstyle, size, file]);

  return (
    <div className="hidden">
      <canvas ref={canvasRef} width={550} height={900} />
    </div>
  );
}

export default CanvasForm2;
