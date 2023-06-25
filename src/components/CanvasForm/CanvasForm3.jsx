import React, { useRef } from "react";
import { useEffect } from "react";
function CanvasForm3({ metadata, fontstyle, size, img, file }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;

    //폰트 기능
    const font = new FontFace(
      `Popppins`,
      `url(${process.env.PUBLIC_URL}/font/Popppins.ttf)`
    );

    // 이미지 그리기
    const image = new Image();
    image.src = file;

    image.onload = () => {
      // 배경 사각형 그리기
      const rectWidth = cw / 2;
      const rectheight = ch;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, rectWidth * 2, rectheight);

      //이미지 크기
      const iw = image.width;
      const ih = image.height;
      const iar = iw / ih;
      ctx.filter = "blur(6px)";
      ctx.drawImage(image, 15, 15, cw - 30, ch - 30);

      ctx.filter = "none";
      // 사각형 아웃라인
      ctx.filter = "none";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 15;
      ctx.strokeRect(15, 15, cw - 30, ch - 30);

      //세로가 김
      if (iar < 0.9) {
        //삽화 배경사각형
        const rectWidth2 = cw / 1.83;
        const rectheight2 = ch / 2.23;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          cw / 2 - cw / 3.66,
          ch / 2 - ch / 4.5 - (rectheight2 * (2 - iar) - rectheight2),
          rectWidth2,
          rectheight2 * (2 - iar)
        );
        //삽화 이미지 그리기 (원본 크기)
        const x = cw / 2 - cw / 3.66 + 16;
        const y = ch / 2 - ch / 5.2 - (rectheight2 * (2 - iar) - rectheight2);
        const width = cw / 2.05;
        const height = (cw / 2.05) * (2 - iar);
        ctx.drawImage(image, x, y, width, height);
        font.load().then(() => {
          ctx.font = "20px Popppins";
          ctx.fillStyle = "black";
          ctx.fillText(`Name: ${metadata.name}`, x + 3, y + height + 30);
        });

        const textWidth = ctx.measureText(`Name: `).width;
        const underLineY = y + height + 34;
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(x + 3, underLineY);
        ctx.lineTo(x + textWidth + 10, underLineY);
        ctx.stroke();

        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.font = `15px ${fontstyle}`;
            ctx.fillStyle = "black";
            ctx.fillText(`Age: ${metadata.age}`, x + 3, y + height + 50);
            const imageDataUrl = canvas.toDataURL("image/png");
            img(imageDataUrl);
          });
        });
      }
      //가로가 김
      else if (iar > 1.1) {
        //삽화 배경사각형
        const rectWidth2 = cw / 1.83;
        const rectheight2 = ch / 2.23;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          cw / 2 - (cw / 3.66) * iar,
          ch / 2 - ch / 4.5,
          rectWidth2 * iar,
          rectheight2
        );
        //삽화 이미지 그리기 (원본 크기)
        const x = cw / 2 - (cw / 3.66) * iar + 22;
        const y = ch / 2 - ch / 5.2;
        const width = (cw / 2.05) * iar;
        const height = cw / 2.05;
        ctx.drawImage(image, x, y, width, height);
        font.load().then(() => {
          ctx.font = `20px ${fontstyle} `;
          ctx.fillStyle = "black";
          ctx.fillText(`Name: ${metadata.name}`, x + 3, y + height + 30);
        });

        const textWidth = ctx.measureText(`Name: `).width;
        const underLineY = y + height + 34;
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(x + 3, underLineY);
        ctx.lineTo(x + textWidth + 10, underLineY);
        ctx.stroke();

        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.font = `15px ${fontstyle}`;
            ctx.fillStyle = "black";
            ctx.fillText(`Age: ${metadata.age}`, x + 3, y + height + 50);
            const imageDataUrl = canvas.toDataURL("image/png");
            img(imageDataUrl);
          });
        });
      } else {
        //삽화 배경사각형
        const rectWidth2 = cw / 1.83;
        const rectheight2 = ch / 2.23;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          cw / 2 - cw / 3.66,
          ch / 2 - ch / 4.5,
          rectWidth2,
          rectheight2
        );
        //삽화 이미지 그리기 (원본 크기)
        const x = cw / 2 - cw / 3.66 + 16;
        const y = ch / 2 - ch / 5.2;
        const width = cw / 2.05;
        const height = cw / 2.05;
        ctx.drawImage(image, x, y, width, height);
        font.load().then(() => {
          ctx.font = `20px ${fontstyle} `;
          ctx.fillStyle = "black";
          ctx.fillText(`Name: ${metadata.name}`, x + 3, y + height + 30);
        });

        const textWidth = ctx.measureText(`Name: `).width;
        const underLineY = y + height + 34;
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(x + 3, underLineY);
        ctx.lineTo(x + textWidth + 10, underLineY);
        ctx.stroke();

        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.font = `15px ${fontstyle}`;
            ctx.fillStyle = "black";
            ctx.fillText(`Age: ${metadata.age}`, x + 3, y + height + 50);
            const imageDataUrl = canvas.toDataURL("image/png");
            img(imageDataUrl);
          });
        });
      }
    };
  }, [metadata, fontstyle, size, file]);

  return (
    <div className="hidden">
      <canvas ref={canvasRef} width={550} height={900} />
    </div>
  );
}

export default CanvasForm3;
