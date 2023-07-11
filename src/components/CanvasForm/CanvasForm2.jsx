import React, { useRef } from "react";
import { useEffect } from "react";

function CanvasForm2({
  lat,
  lon,
  city,
  country,
  countryCode,
  address,
  size,
  img,
  file,
  setEnd,
  account,
  message,
  temperature,
  weather,
  time,
}) {
  const canvasRef = useRef(null);
  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  };

  useEffect(() => {
    // 이미지 그리기
    (async () => {
      const image2 = await loadImage(
        `${process.env.PUBLIC_URL}/image/logo3.png`
      );
      const image3 = await loadImage(
        `${process.env.PUBLIC_URL}/image/logo5.png`
      );
      const image = new Image();
      image.src = file;
      // 캔버스에 그리기
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      const cw = canvas.width;
      const ch = canvas.height;
      if (size[0] == 1) {
        const iw = image.width;
        const ih = image.height;
        const iar = iw / ih;

        const height = (cw / 1.83) * 0.8;
        const width = (ch / 2.2) * iar;
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

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x + cornerRadius, y);
          ctx.lineTo(x + width - cornerRadius, y);
          ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
          ctx.lineTo(x + width, y + height - cornerRadius);
          ctx.arcTo(
            x + width,
            y + height,
            x + width - cornerRadius,
            y + height,
            cornerRadius
          );
          ctx.lineTo(x + cornerRadius, y + height);
          ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
          ctx.lineTo(x, y + cornerRadius);
          ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(image, x, y, width, height);
          ctx.restore();

          ctx.font = "bolder 37px SB ";
          ctx.fillStyle = "black";
          ctx.fillText("MEMORIES", x + width + 20, (y + height) / 2 - 40);
          ctx.fillText("ON CHAIN.", x + width + 20, (y + height) / 2);
          ctx.drawImage(image2, cw - 102, 32, 73, 73);

          ctx.font = "bold 17px EL";
          ctx.fillStyle = "white";
          ctx.fillText("MEMO", x + width + 20, (y + height) / 2 + 80);
          ctx.font = "13px EL";
          ctx.fillStyle = "white";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]}  ${weather}`,
            x + width + 20,
            (y + height) / 2 + 95
          );

          ctx.font = "14px EL";
          ctx.fillStyle = "white";
          const maxWidth = 200; // 최대 너비
          const lineHeight = 20;
          const x2 = x + width + 20;
          let y2 = (y + height) / 2 + 140;
          const text2 = message;
          const characters = text2.split("");
          let line = "";
          for (let i = 0; i < characters.length; i++) {
            const testLine = line + characters[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
              ctx.fillText(line, x2, y2);
              line = characters[i];
              y2 += lineHeight;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, x2, y2);

          // ctx.font = " 12px EL";
          // ctx.fillStyle = "black";
          // ctx.fillText("made by memorachain", cw - 150, ch - 40);

          ctx.font = "24px SB";
          ctx.fillStyle = "white";
          ctx.fillText(`${countryCode}. ${city}`, x, y - 10);
          ctx.rotate((270 * Math.PI) / 180);

          ctx.font = "14px EL";
          ctx.fillStyle = "#808080";
          ctx.fillText(`Address : ${address}`, -(y + height - 20), 40);
          ctx.fillText(
            `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
            -(y + height - 20),
            60
          );
          ctx.rotate((-270 * Math.PI) / 180);

          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
          img(imageDataUrl);
          setEnd(false);
        };
      }
      if (size[0] == 2 || size[0] == 3) {
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

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x + cornerRadius, y);
          ctx.lineTo(x + width - cornerRadius, y);
          ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
          ctx.lineTo(x + width, y + height - cornerRadius);
          ctx.arcTo(
            x + width,
            y + height,
            x + width - cornerRadius,
            y + height,
            cornerRadius
          );
          ctx.lineTo(x + cornerRadius, y + height);
          ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
          ctx.lineTo(x, y + cornerRadius);
          ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(image, x, y, width, height);
          ctx.restore();
          ctx.drawImage(image3, 30, 35, 73, 73);

          ctx.font = "bolder 37px SB ";
          ctx.fillStyle = "black";
          ctx.fillText("MEMORIES", x - 30, y - 80);
          ctx.fillText("ON CHAIN.", x - 30, y - 40);

          ctx.font = "bold 17px EL";
          ctx.fillStyle = "white";
          ctx.fillText("MEMO", x - 30, y + height + 40);
          ctx.font = " 13px EL";
          ctx.fillStyle = "white";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]} ${weather}`,
            x - 30,
            y + height + 55
          );

          ctx.font = "lighter 14px EL";
          ctx.fillStyle = "white";
          const maxWidth = 200; // 최대 너비
          const lineHeight = 20;
          const x2 = x - 30;
          let y2 = y + height + 90;
          const text2 = message;
          const characters = text2.split("");
          let line = "";
          for (let i = 0; i < characters.length; i++) {
            const testLine = line + characters[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
              ctx.fillText(line, x2, y2);
              line = characters[i];
              y2 += lineHeight;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, x2, y2);

          ctx.font = "lighter 11px EL";
          ctx.fillStyle = "black";
          ctx.fillText("made by memorachain", cw - 140, ch - 40);

          ctx.rotate((270 * Math.PI) / 180);
          const text = `${countryCode}. ${city} `;
          const textWidth = ctx.measureText(text).width;
          ctx.font = "24px SB";
          ctx.fillStyle = "#b3b3b3";
          ctx.fillText(text, -(y + height), cw - 65);
          ctx.font = "14px EL";
          ctx.fillStyle = "#808080";
          ctx.fillText(`Address : ${address}`, -(y + height), cw - 30);
          ctx.fillText(
            `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
            -(y + height),
            cw - 45
          );
          ctx.rotate((-270 * Math.PI) / 180);

          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
          img(imageDataUrl);
          setEnd(false);
        };
      }
    })();
  }, [size]);

  return (
    <div className="hidden">
      {size[0] == 1 ? (
        <canvas ref={canvasRef} width={900} height={550} />
      ) : (
        <canvas ref={canvasRef} width={550} height={900} />
      )}
    </div>
  );
}

export default CanvasForm2;
