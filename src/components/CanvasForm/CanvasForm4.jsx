import React, { useRef } from "react";
import { useEffect } from "react";
function CanvasForm4({
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

      const image = new Image();
      image.src = file;

      // 캔버스에 그리기
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const cw = canvas.width;
      const ch = canvas.height;

      if (size[0] == 1) {
        image.onload = () => {
          //배경 프레임 그리기

          const rectWidth = cw / 2;
          const rectheight = ch;
          ctx.fillStyle = "#ffffff"; //바꿔야되는부분
          ctx.fillRect(0, 0, rectWidth * 2, rectheight);

          //배경 사각형 그리기
          ctx.fillStyle = "#ECECEC";
          ctx.fillRect(15, 15, rectWidth * 2 - 30, rectheight - 30);
          //이미지 크기
          const iw = image.width;
          const ih = image.height;
          const iar = iw / ih;

          //배경 크기맞추기용 틀
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            cw / 2 - ((cw / 1.39) * 0.8) / 2,
            ch / 2 - ch / 1.15 / 2,
            (cw / 1.39) * 0.85,
            ch / 1.15
          );

          //메인 사각형(그림) 그리기
          ctx.filter = "none";
          ctx.drawImage(
            image,
            cw / 2 - ((cw / 1.39) * 0.8) / 2,
            ch / 4.5,
            (cw / 1.39) * 0.85,
            ch / 1.2 / 1.65
          );
          ctx.drawImage(
            image2,
            cw / 2 - ((cw / 1.39) * 0.8) / 2 + (cw / 1.39) * 0.85 - 55,
            40,
            50,
            50
          );
          ctx.font = "bolder 35px SB ";
          ctx.fillStyle = "black";
          ctx.fillText(
            "MEMORIES",
            cw / 2 - ((cw / 1.39) * 0.85) / 2 + 30,
            ch / 4.5 + ch / 1.2 / 1.65 + 50
          );
          ctx.fillText(
            "ON CHAIN.",
            cw / 2 - ((cw / 1.39) * 0.85) / 2 + 30,
            ch / 4.5 + ch / 1.2 / 1.65 + 90
          );
          ctx.font = "bold 15px EL";
          ctx.fillStyle = "black";
          ctx.fillText(
            "MEMO",
            cw / 2 - ((cw / 1.39) * 0.85) / 2 + 230,
            ch / 4.5 + ch / 1.2 / 1.65 + 30
          );
          ctx.font = "12px EL";
          ctx.fillStyle = "black";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]} ${weather}`,
            cw / 2 - ((cw / 1.39) * 0.85) / 2 + 230,
            ch / 4.5 + ch / 1.2 / 1.65 + 45
          );
          ctx.font = "13px EL";
          ctx.fillStyle = "black";

          const maxWidth = 200; // 최대 너비
          const lineHeight = 19;
          const x = cw / 2 - ((cw / 1.39) * 0.85) / 2 + 230;
          let y = ch / 4.5 + ch / 1.2 / 1.65 + 60;
          const text2 = message;
          const characters = text2.split("");
          let line = "";
          for (let i = 0; i < characters.length; i++) {
            const testLine = line + characters[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
              ctx.fillText(line, x, y);
              line = characters[i];
              y += lineHeight;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, x, y);

          const text = `${countryCode}. ${city} `;
          ctx.font = "25px SB";
          ctx.fillStyle = "#808080";
          ctx.fillText(
            text,
            cw / 2 - ((cw / 1.39) * 0.85) / 2 + 30,
            ch / 2 - ch / 1.15 / 2 + 35
          );
          ctx.font = "12px EL";
          ctx.fillStyle = "#808080";
          ctx.fillText(
            `Address : ${address}`,
            cw / 2 - ((cw / 1.39) * 0.85) / 2 + 30,
            ch / 2 - ch / 1.15 / 2 + 65
          );
          ctx.fillText(
            `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
            cw / 2 - ((cw / 1.39) * 0.85) / 2 + 30,
            ch / 2 - ch / 1.15 / 2 + 78
          );
          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
          img(imageDataUrl);
          setEnd(false);
        };
      }
      if (size[0] == 2 || size[0] == 3) {
        image.onload = () => {
          //배경 프레임 그리기

          const rectWidth = cw / 2;
          const rectheight = ch;
          ctx.fillStyle = "#ffffff"; //바꿔야되는부분
          ctx.fillRect(0, 0, rectWidth * 2, rectheight);

          //배경 사각형 그리기
          ctx.fillStyle = "#ECECEC";
          ctx.fillRect(15, 15, rectWidth * 2 - 30, rectheight - 30);
          //이미지 크기
          const iw = image.width;
          const ih = image.height;
          const iar = iw / ih;

          //배경 크기맞추기용 틀
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            cw / 2 - ((cw / 1.39) * 0.8) / 2 - 100,
            ch / 2 - ch / 1.15 / 2,
            (cw / 1.39) * 0.8 * 1.4,
            ch / 1.15
          );

          //메인 사각형(그림) 그리기
          ctx.filter = "none";
          ctx.drawImage(image, cw / 2 - 270, ch / 2 - ch / 1.15 / 2, 340, 478);
          ctx.drawImage(
            image2,
            cw / 2 - ((cw / 1.39) * 0.8) / 2 - 100 + 15,
            45,
            55,
            55
          );

          ctx.font = "bolder 35px SB ";
          ctx.fillStyle = "black";
          ctx.fillText(
            "MEMORIES",
            cw / 2 + 70 + 30,
            ch / 4.5 + ch / 1.2 / 1.65 - 290
          );
          ctx.fillText(
            "ON CHAIN.",
            cw / 2 + 70 + 30,
            ch / 4.5 + ch / 1.2 / 1.65 - 250
          );

          ctx.font = "bold 17px EL";
          ctx.fillStyle = "#4d4d4d";
          ctx.fillText(
            "MEMO",
            cw / 2 + 70 + 30,
            ch / 4.5 + ch / 1.2 / 1.65 - 60
          );
          ctx.font = "13px EL";
          ctx.fillStyle = "#4d4d4d";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]} ${weather}`,
            cw / 2 + 70 + 30,
            ch / 4.5 + ch / 1.2 / 1.65 - 45
          );
          ctx.font = "14px EL";
          ctx.fillStyle = "#4d4d4d";
          const maxWidth = 200; // 최대 너비
          const lineHeight = 20;
          const x = cw / 2 + 70 + 30;
          let y = ch / 4.5 + ch / 1.2 / 1.65 - 10;
          const text2 = message;
          const characters = text2.split("");
          let line = "";
          for (let i = 0; i < characters.length; i++) {
            const testLine = line + characters[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
              ctx.fillText(line, x, y);
              line = characters[i];
              y += lineHeight;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, x, y);

          ctx.rotate((270 * Math.PI) / 180);
          const text = `${countryCode}. ${city} `;
          ctx.font = "18px SB";
          ctx.fillStyle = "#b3b3b3";
          ctx.fillText(text, -(ch - 45), ch / 2 - ch / 1.15 / 2 + 120);
          ctx.font = "11px EL";
          ctx.fillStyle = "#808080";
          ctx.fillText(
            `Address : ${address}`,
            -(ch - 40),
            cw / 2 - ((cw / 1.39) * 0.8) / 2 - 100 + 25
          );
          ctx.fillText(
            `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
            -(ch - 40),
            cw / 2 - ((cw / 1.39) * 0.8) / 2 - 100 + 40
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
        <canvas ref={canvasRef} width={900} height={550} />
      )}
    </div>
  );
}

export default CanvasForm4;
