import React, { useRef } from "react";
import { useEffect } from "react";
function CanvasForm6({
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
    // 이미지 그리
    (async () => {
      const image2 = await loadImage(
        `${process.env.PUBLIC_URL}/image/logo5.png`
      );
      const image3 = await loadImage(
        `${process.env.PUBLIC_URL}/image/logo4.png`
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

          // 그림자 스타일 초기화
          ctx.shadowBlur = 0;
          ctx.shadowColor = "rgba(0, 0, 0, 0)";
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          //배경 사각형 그리기
          ctx.fillStyle = "#f5f5f5";
          ctx.fillRect(15, 15, rectWidth * 2 - 30, rectheight - 30);
          //이미지 크기
          const iw = image.width;
          const ih = image.height;
          const iar = iw / ih;

          // 그림자 스타일 설정
          ctx.shadowBlur = 15; // 그림자의 흐림 정도
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // 그림자의 색상
          ctx.shadowOffsetX = 0; // 그림자의 x축 오프셋
          ctx.shadowOffsetY = 5; // 그림자의 y축 오프셋
          //배경 크기맞추기용 틀
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            cw / 2 - ((cw / 1.5) * 1.1) / 2,
            ch / 2 - ch / 1.3 / 2 - 40,
            (cw / 1.5) * 1.1,
            ch - 50
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
            cw / 2 - ((cw / 1.5) * 1.1) / 2 + 10,
            ch / 2 - ch / 1.3 / 2 - 30,
            (cw / 1.5) * 1.1 - 20,
            (ch / 1.2 / 1.65) * 1.2
          );

          ctx.drawImage(
            image3,
            cw / 2 - ((cw / 1.5) * 1.1) / 2 + 10,
            ch - 135,
            50,
            50
          );
          ctx.fillStyle = "black";
          ctx.font = "37px SB";
          ctx.fillText(
            `MEMORIES`,
            cw / 2 - ((cw / 1.5) * 1.1) / 2 + 100,
            ch - 110
          );
          ctx.fillText(
            `ON CHAIN.`,
            cw / 2 - ((cw / 1.5) * 1.1) / 2 + 100,
            ch - 80
          );

          //
          ctx.rotate((270 * Math.PI) / 180);
          const text = `${countryCode}. ${city} `;
          ctx.font = "19px SB";
          ctx.fillStyle = "#b3b3b3";
          ctx.fillText(text, -(ch - 40), cw - 130);
          ctx.rotate((-270 * Math.PI) / 180);
          ctx.fillStyle = "black";
          ctx.font = "bold 14px EL";
          ctx.fillText(`MEMO`, cw / 2 - 20, ch - 145);
          ctx.fillStyle = "black";
          ctx.font = "12px EL";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]} ${weather}`,
            cw / 2 - 20,
            ch - 132
          );
          ctx.fillStyle = "gray";
          ctx.font = "bold 12px EL";
          const maxWidth = 200; // 최대 너비
          const lineHeight = 15;
          const x = cw / 2 - 20;
          let y = ch - 110;
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
          ctx.fillText(`Address: ${address}`, cw / 2 - 20, ch - 40);
          ctx.fillText(`Location: ${lat}, ${lon}`, cw / 2 - 20, ch - 30);

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
            cw / 2 - ((cw / 1.39) * 0.8 * 1.4) / 2,
            ch / 2 - ch / 1.1 / 2,
            (cw / 1.39) * 0.8 * 1.4,
            ch / 1.1
          );

          //메인 사각형(그림) 그리기
          ctx.filter = "none";
          ctx.drawImage(
            image,
            cw / 2 - ((cw / 1.39) * 0.8 * 1.4) / 2,
            ch / 2 - ch / 1.1 / 2,
            (cw / 1.39) * 0.8 * 1.4,
            580
          );
          ctx.drawImage(
            image2,
            cw / 2 -
              ((cw / 1.39) * 0.8 * 1.4) / 2 +
              (cw / 1.39) * 0.8 * 1.4 -
              75,
            55,
            70,
            70
          );

          //폰트
          const x2 = cw / 2 - ((cw / 1.39) * 0.8 * 1.4) / 2;
          const y2 = ch / 2 - ch / 1.1 / 2;
          ctx.fillStyle = "black";
          ctx.font = "36px SB";
          ctx.fillText(`MEMORIES`, x2 + 20, ch - 190);
          ctx.fillText(`ON CHAIN.`, x2 + 20, ch - 150);

          //
          const text = `${countryCode}. ${city} `;
          ctx.font = "23px SB";
          ctx.fillStyle = "#b3b3b3";
          ctx.fillText(text, x2 + 30, ch - 240);

          ctx.fillStyle = "black";
          ctx.font = "bold 15px EL";
          ctx.fillText(`MEMO`, x2 + 240, ch - 240);
          ctx.fillStyle = "black";
          ctx.font = " 13px EL";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]} ${weather}`,
            x2 + 240,
            ch - 225
          );
          ctx.fillStyle = "gray";
          ctx.font = "bold 12px EL";
          const maxWidth = 180; // 최대 너비
          const lineHeight = 20;
          const x3 = x2 + 240;
          let y3 = ch - 195;
          const text2 = message;
          const characters = text2.split("");
          let line = "";
          for (let i = 0; i < characters.length; i++) {
            const testLine = line + characters[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
              ctx.fillText(line, x3, y3);
              line = characters[i];
              y3 += lineHeight;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, x3, y3);
          ctx.fillStyle = "gray";
          ctx.font = "12px EL";
          ctx.fillText(`Address: ${address}`, x2 + 10, ch - 70);
          ctx.fillText(`Location: ${lat}, ${lon}`, x2 + 10, ch - 50);

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

export default CanvasForm6;
