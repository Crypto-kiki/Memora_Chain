import React, { useRef } from "react";
import { useEffect } from "react";

function CanvasForm2({ metadata, size, img, file }) {
  const canvasRef = useRef(null);

    // 폰트 기능
    const font = new FontFace(
    "roboto",
    `url(${process.env.PUBLIC_URL}/font/roboto.ttf)`
  );
  useEffect(() => {
    // 이미지 그리기
    const image = new Image();
    image.src = file;
    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    if(size[0] == 1){

      const iw = image.width;
      const ih = image.height;
      const iar = iw / ih;
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
  
      const height = cw / 1.83 * 0.8;
      const width = ch / 2.2 *iar;
      const y = cw / 2 - cw / 2.4;
      const x = ch / 2 - ch / 4;
      const cornerRadius = 20;
  
      image.onload = () => {   
        // 배경 사각형 그리기
        const rectWidth = cw / 2;
        const rectheight = ch;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, rectWidth * 2, rectheight);
  
        // 배경 삽화 그리기
        ctx.filter = "blur(6px)";
        ctx.drawImage(image, 15, 15, cw - 30, ch - 30);
  
        // 사각형 아웃라인
        ctx.filter = "none";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 15;
        ctx.strokeRect(15, 15, cw - 30, ch - 30);
  
        ctx.beginPath();
        ctx.rect(0, 0, cw, ch);
        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.font = "20px roboto";
            ctx.fillStyle = "white";
            ctx.fillText(`Name: ${metadata.name}`, x + width + 40, y + 40);
            ctx.fillText(`Age: ${metadata.age}`, x + width + 40, y + 80);
            const imageDataUrl = canvas.toDataURL("image/png");
            img(imageDataUrl);
          });
        });
  
        ctx.clip();
        ctx.restore();
  
        // 삽화 이미지 그리기 (원본 크기)
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
        // const imageDataUrl = canvas.toDataURL("image/png");
        // img(imageDataUrl);
      };
    } 
    if(size[0]==2 || size[0]==3){
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
  
      const width = cw / 1.83;
      const height = ch / 2.5;
      const x = cw / 2 - cw / 3.66;
      const y = ch / 2 - ch / 5;
      const cornerRadius = 20;
  
      image.onload = () => { 
  
        // 배경 사각형 그리기
        const rectWidth = cw / 2;
        const rectheight = ch;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, rectWidth * 2, rectheight);
  
        // 배경 삽화 그리기
        ctx.filter = "blur(6px)";
        ctx.drawImage(image, 15, 15, cw - 30, ch - 30);
  
        // 사각형 아웃라인
        ctx.filter = "none";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 15;
        ctx.strokeRect(15, 15, cw - 30, ch - 30);
  
        ctx.beginPath();
        ctx.rect(0, 0, cw, ch);
        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.font = "20px roboto";
            ctx.fillStyle = "white";
            ctx.fillText(`Name: ${metadata.name}`, cw / 11, ch / 5.55);
            ctx.fillText(`Age: ${metadata.age}`, cw / 11, ch / 4.54);
            const imageDataUrl = canvas.toDataURL("image/png");
            img(imageDataUrl);
          });
        });
  
        ctx.clip();
        ctx.restore();
  
        // 삽화 이미지 그리기 (원본 크기)
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
        // const imageDataUrl = canvas.toDataURL("image/png");
        // img(imageDataUrl);
      };
    }

   
  }, [metadata,size]);

  return(
    <div className="hidden">
       {size[0] == 1  ? (
      <canvas ref={canvasRef} width={900} height={550} />
    ) : (
      <canvas ref={canvasRef} width={550} height={900} />
    )}
    </div>
  )
}

export default CanvasForm2;
