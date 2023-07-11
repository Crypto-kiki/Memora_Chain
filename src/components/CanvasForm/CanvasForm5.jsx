import React, { useRef } from "react";
import { useEffect } from "react";

function CanvasForm5({
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
        `${process.env.PUBLIC_URL}/image/logo6.png`
      );
      const image3 = await loadImage(
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

          // 배경 사각형 그리기
          ctx.fillStyle = "#ECECEC";
          ctx.fillRect(15, 15, rectWidth * 2 - 30, rectheight - 30);

          // 그림자 스타일 초기화
          ctx.shadowBlur = 0;
          ctx.shadowColor = "rgba(0, 0, 0, 0)";
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          //이미지 크기
          const iw = image.width;
          const ih = image.height;
          const iar = iw / ih;

          // 그림자 스타일 설정
          ctx.shadowBlur = 15; // 그림자의 흐림 정도
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // 그림자의 색상
          ctx.shadowOffsetX = 5; // 그림자의 x축 오프셋
          ctx.shadowOffsetY = 5; // 그림자의 y축 오프셋

          //배경 크기맞추기용 틀
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            cw / 2 - ((cw / 1.39) * 0.9) / 2 - 50, //x
            ch / 2 - ch / 1.15 / 2.3, //y //36
            (cw / 1.39) * 1.055, //width
            ch / 1.15 - 68 //height
          );

          // 그림자 스타일 초기화
          ctx.shadowBlur = 0;
          ctx.shadowColor = "rgba(0, 0, 0, 0)";
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          //메인 사각형(그림) 그리기
          ctx.filter = "none";
          ctx.drawImage(
            image,
            cw / 2 - ((cw / 1.39) * 0.9) / 2 - 50,
            ch / 4.3,
            (cw / 1.39) * 0.75,
            ch / 1.2 / 1.5
          );
          ctx.drawImage(
            image3,
            cw / 2 - ((cw / 1.39) * 0.9) / 2 - 50 + 3,
            ch / 2 - ch / 1.15 / 2.3 + 5,
            45,
            45
          );
          ctx.fillStyle = "black";
          ctx.font = "bold 30px SB";
          ctx.fillText(
            `MEMORIES`,
            cw / 2 - ((cw / 1.39) * 0.9) / 2 - 50 + (cw / 1.39) * 0.75 + 15,
            ch / 4.3 + 30
          );
          ctx.fillText(
            `ON CHAIN.`,
            cw / 2 - ((cw / 1.39) * 0.9) / 2 - 50 + (cw / 1.39) * 0.75 + 15,
            ch / 4.3 + 60
          );

          //
          ctx.fillStyle = "#aaaaaa";
          ctx.font = "20px SB";
          // const text = "USA. ARIZONA";
          const text = `${countryCode}. ${city}`;
          const textWidth = ctx.measureText(text).width;
          ctx.fillText(
            text,
            cw / 2 -
              ((cw / 1.39) * 0.9) / 2 -
              50 +
              (cw / 1.39) * 1.055 -
              textWidth -
              10,
            ch / 2 - ch / 1.05 / 2.8
          );
          //
          ctx.fillStyle = "black";
          ctx.font = "bold 13px EL";
          ctx.fillText(
            `MEMO`,
            cw - ((cw / 1.39) * 0.8) / 2 - 25,
            ch / 4.4 + 175
          );
          ctx.fillStyle = "black";
          ctx.font = " 12px EL";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]} ${weather}`,
            cw - ((cw / 1.39) * 0.8) / 2 - 25,
            ch / 4.4 + 190
          );
          ctx.fillStyle = "gray";
          ctx.font = "14px EL";
          const maxWidth = 160; // 최대 너비
          const lineHeight = 20;
          const x = cw - ((cw / 1.39) * 0.8) / 2 - 30;
          let y = ch / 4.4 + 220;
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
          ctx.fillStyle = "gray";
          ctx.font = "10px EL";
          ctx.fillText(
            `Address: ${address}`,
            cw / 2 - ((cw / 1.39) * 0.9) / 2 - 40,
            ch - ((ch / 1.39) * 0.45) / 2 - 10
          );
          ctx.fillText(
            `Location: ${lat}, ${lon}`,
            cw / 2 - ((cw / 1.39) * 0.9) / 2 - 40,
            ch - ((ch / 1.39) * 0.45) / 2 + 5
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

          // 그림자 스타일 초기화
          ctx.shadowBlur = 0;
          ctx.shadowColor = "rgba(0, 0, 0, 0)";
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          //배경 사각형 그리기
          ctx.fillStyle = "#ECECEC";
          ctx.fillRect(15, 15, rectWidth * 2 - 30, rectheight - 30);

          //이미지 크기
          const iw = image.width;
          const ih = image.height;
          const iar = iw / ih;

          // 그림자 스타일 설정
          ctx.shadowBlur = 15; // 그림자의 흐림 정도
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // 그림자의 색상
          ctx.shadowOffsetX = 5; // 그림자의 x축 오프셋
          ctx.shadowOffsetY = 5; // 그림자의 y축 오프셋
          //배경 크기맞추기용 틀 //
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            cw / 2 - ((cw / 1.39) * 0.8) / 2 - 70,
            ch / 2 - ch / 1.25 / 2,
            (cw / 1.65) * 0.5 * 1.1 + 350,
            440
          );
          // 그림자 스타일 초기화
          ctx.shadowBlur = 0;
          ctx.shadowColor = "rgba(0, 0, 0, 0)";
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          //메인 사각형(그림) 그리기
          ctx.filter = "none";
          ctx.drawImage(
            image,
            cw / 1.3 - 270,
            ch / 2 - ch / 1.25 / 2,
            350,
            440
          );
          ctx.drawImage(
            image2,
            cw / 2 -
              ((cw / 1.39) * 0.8) / 2 -
              70 +
              (cw / 1.65) * 0.5 * 1.1 +
              350 -
              55,
            ch / 2 - ch / 1.25 / 2 + 8,
            50,
            50
          );

          ctx.fillStyle = "black";
          ctx.font = "35px SB";
          ctx.fillText(
            `MEMORIES`,
            cw / 2 - ((cw / 1.39) * 0.8) / 2 - 70 + 20,
            ch - 130
          );
          ctx.fillText(
            `ON CHAIN.`,
            cw / 2 - ((cw / 1.39) * 0.8) / 2 - 70 + 20,
            ch - 90
          );

          //
          const text = `${countryCode}. ${city}`;
          // const text = "USA. ARIZONA";
          const textWidth = ctx.measureText(text).width;
          ctx.fillStyle = "white";
          ctx.font = "25px SB";
          ctx.fillText(text, cw / 1.3 - 270 + 10, ch - 91);
          //

          ctx.fillStyle = "black";
          ctx.font = "bold 17px EL";
          ctx.fillText(`MEMO`, cw / 2 - ((cw / 1.39) * 0.8) / 2 - 70 + 20, 90);
          ctx.fillStyle = "black";
          ctx.font = "13px EL";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]} ${weather}`,
            cw / 2 - ((cw / 1.39) * 0.8) / 2 - 70 + 20,
            105
          );
          ctx.fillStyle = "gray";
          ctx.font = "14px EL";
          const maxWidth = 160; // 최대 너비
          const lineHeight = 20;
          const x = cw / 2 - ((cw / 1.39) * 0.8) / 2 - 70 + 20;
          let y = 140;
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
          ctx.fillStyle = "white";
          ctx.font = "12px EL";
          ctx.fillText(`Address: ${address}`, cw / 1.3 - 270 + 3, ch - 64);
          ctx.fillText(`Location: ${lat}, ${lon}`, cw / 1.3 - 270 + 3, ch - 76);

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

export default CanvasForm5;
