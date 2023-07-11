import React, { useRef } from "react";
import { useEffect } from "react";
function CanvasForm3({
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
    // 이미지 불러오기
    (async () => {
      const image2 = await loadImage(
        `${process.env.PUBLIC_URL}/image/logo3.png`
      );
      const image3 = await loadImage(
        `${process.env.PUBLIC_URL}/image/logo6.png`
      );

      const image = new Image();
      image.src = file;
      // 캔버스에 그리기
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const cw = canvas.width;
      const ch = canvas.height;
      //가로가 긴 사진
      if (size[0] == 1) {
        image.onload = () => {
          // 배경 프레임 그리기

          const rectWidth = cw / 2;
          const rectheight = ch;
          ctx.fillStyle = "#ffffff"; //바꿔야되는부분
          ctx.fillRect(0, 0, rectWidth * 2, rectheight);

          ctx.filter = "blur(6px)";
          //배경 사각형 그리기
          ctx.drawImage(image, 15, 15, cw - 30, ch - 30);
          ctx.filter = "none";
          // 사각형 아웃라인
          ctx.filter = "none";
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 15;
          ctx.strokeRect(15, 15, cw - 30, ch - 30);

          //이미지 크기
          const iw = image.width;
          const ih = image.height;
          const iar = iw / ih;

          //삽화 배경사각형 크기
          const rectWidth2 = cw / 1.78;
          const rectheight2 = cw / 1.78;
          // const y2 = ch / 2 - ((rectheight2 * 0.5) / 2) * 1.3 + rectheight2 * 0.6 * 1.3;
          //가로가 김
          //삽화 배경사각형
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            cw / 2 - (rectWidth2 * iar * 0.5) / 2,
            ch / 2 - ((rectheight2 * 0.5) / 2) * 1.3 - 10,
            rectWidth2 * iar * 0.5,
            rectheight2 * 0.5 * 1.45
          );
          //삽화 이미지 그리기 (원본 크기)
          const x = cw / 2 - ((cw / 2.05) * iar * 0.5) / 2;
          const y = ch / 2 - (((cw / 2.05) * 0.5) / 2) * 1.3;
          const width = (cw / 2.05) * iar;
          const height = cw / 2.05;
          ctx.drawImage(image, x, y, width * 0.5, height * 0.5);
          ctx.drawImage(image2, 25, 30, 73, 73);

          ctx.font = "bolder 37px SB ";
          ctx.fillStyle = "black";
          ctx.fillText("MEMORIES", x + width * 0.5 + 40, y + 20);
          ctx.fillText("ON CHAIN.", x + width * 0.5 + 40, y + 60);

          ctx.font = "bold 17px EL";
          ctx.fillStyle = "black";
          ctx.fillText("MEMO", x, y + height * 0.5 + 20);
          ctx.font = "13px EL";
          ctx.fillStyle = "black";
          ctx.fillText(
            `${time[0]} ${time[1]} ${time[2]}  ${weather}`,
            x,
            y + height * 0.5 + 35
          );
          ctx.font = "lighter 14px EL";
          ctx.fillStyle = "black";
          const maxWidth = 260; // 최대 너비
          const lineHeight = 20;
          const x2 = x;
          let y2 = y + height * 0.5 + 60;
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

          // ctx.font = "14px EL";
          // ctx.fillStyle = "white";
          // ctx.fillText("made by memorachain", cw - 160, ch - 30);
          ctx.font = "24px SB";
          ctx.fillStyle = "#999999";
          ctx.fillText(
            `${countryCode}. ${city}`,
            cw / 2 - ((cw / 2.05) * iar * 0.5) / 2,
            y - 7
          );
          ctx.rotate((270 * Math.PI) / 180);
          ctx.font = "14px EL";
          ctx.fillStyle = "#cccccc";
          ctx.fillText(`Address : ${address}`, -(ch - 40), 45);
          ctx.fillText(
            `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
            -(ch - 40),
            60
          );
          ctx.rotate((-270 * Math.PI) / 180);

          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
          img(imageDataUrl);
          setEnd(false);
        };
      }
      //세로가 긴사진, 비율이 비슷한 사진
      if (size[0] == 2 || size[0] == 3) {
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

          const rectWidth2 = ch / 1.78;
          const rectheight2 = ch / 1.78;
          //세로가 김
          if (iar < 0.9) {
            const y2 =
              ch / 2 -
              (rectheight2 * 0.5 * (2 - iar)) / 2 +
              rectheight2 * (2 - iar) * 0.5 * 1.1;
            if (iar < 0.5) {
              //삽화 배경사각형
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(
                cw / 2 - (rectWidth2 * 0.5) / 2,
                ch / 2 - (rectheight2 * 0.5 * (2 - iar)) / 2 - 10,
                rectWidth2 * 0.5,
                rectheight2 * (2 - iar) * 0.5 * 1.1
              );
              //삽화 이미지 그리기 (원본 크기)
              const x = cw / 2 - ((ch / 2.05) * 0.5) / 2;
              const y = ch / 2 - (((ch / 2.05) * (2 - iar) * 0.5) / 2) * 1.05;
              const width = (ch / 2.05) * 0.5;
              const height = (ch / 2.05) * (2 - iar) * 0.55;
              ctx.drawImage(image, x, y, width, height);
              ctx.drawImage(image3, 25, 30, 73, 73);

              ctx.font = "bolder 37px SB ";
              ctx.fillStyle = "black";
              ctx.fillText("MEMORIES", x, y + height + 40);
              ctx.fillText("ON CHAIN.", x, y + height + 80);

              ctx.font = "bold 17px EL";
              ctx.fillStyle = "black";
              ctx.fillText("MEMO", x, y2 + 30);
              ctx.font = "13px EL";
              ctx.fillStyle = "black";
              ctx.fillText(
                `${time[0]} ${time[1]} ${time[2]}  ${weather}`,
                x,
                y2 + 45
              );
              ctx.font = "lighter 14px EL";
              ctx.fillStyle = "black";
              const maxWidth = 200; // 최대 너비
              const lineHeight = 20;
              const x2 = x;
              let y3 = y2 + height * 0.5 + 60;
              const text2 = message;
              const characters = text2.split("");
              let line = "";
              for (let i = 0; i < characters.length; i++) {
                const testLine = line + characters[i];
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && i > 0) {
                  ctx.fillText(line, x2, y3);
                  line = characters[i];
                  y3 += lineHeight;
                } else {
                  line = testLine;
                }
              }
              ctx.fillText(line, x2, y3);

              ctx.font = "24px SB";
              ctx.fillStyle = "#b3b3b3";
              ctx.fillText(`${countryCode}. ${city}`, x - 15, y - 6);
              ctx.rotate((270 * Math.PI) / 180);
              ctx.font = "14px EL";
              ctx.fillStyle = "#808080";
              ctx.fillText(`Address : ${address}`, -(ch - 40), cw - 30);
              ctx.fillText(
                `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
                -(ch - 40),
                cw - 45
              );
              ctx.rotate((-270 * Math.PI) / 180);

              const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
              img(imageDataUrl);
              setEnd(false);
            } else {
              //삽화 배경사각형
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(
                cw / 2 - (rectWidth2 * 0.65) / 2,
                ch / 2 - (rectheight2 * 0.65 * (2 - iar)) / 2 - 60,
                rectWidth2 * 0.65,
                rectheight2 * (2 - iar) * 0.6 * 1.12 + 60
              );
              //삽화 이미지 그리기 (원본 크기)
              const x = cw / 2 - ((ch / 2.05) * 0.65) / 2;
              const y =
                ch / 2 - (((ch / 2.05) * (2 - iar) * 0.6) / 2) * 1.05 - 10;
              const width = (ch / 2.05) * 0.65;
              const height = (ch / 2.05) * (2 - iar) * 0.65;
              ctx.drawImage(image, x, y - 50, width, height);
              ctx.drawImage(image3, 25, 30, 73, 73);

              ctx.font = "bolder 37px SB ";
              ctx.fillStyle = "black";
              ctx.fillText("MEMORIES", x, y + height + 40 - 50);
              ctx.fillText("ON CHAIN.", x, y + height + 80 - 50);

              ctx.font = "bold 17px EL";
              ctx.fillStyle = "black";
              ctx.fillText("MEMO", x, y2 + 80);
              ctx.font = "13px EL";
              ctx.fillStyle = "black";
              ctx.fillText(
                `${time[0]} ${time[1]} ${time[2]} ${weather}`,
                x,
                y2 + 95
              );
              ctx.font = "bold 14px EL";
              ctx.fillStyle = "black";
              const maxWidth = 200; // 최대 너비
              const lineHeight = 20;
              const x2 = x;
              let y3 = y2 + 130;
              const text2 = message;
              const characters = text2.split("");
              let line = "";
              for (let i = 0; i < characters.length; i++) {
                const testLine = line + characters[i];
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && i > 0) {
                  ctx.fillText(line, x2, y3);
                  line = characters[i];
                  y3 += lineHeight;
                } else {
                  line = testLine;
                }
              }
              ctx.fillText(line, x2, y3);

              ctx.font = "24px SB";
              ctx.fillStyle = "#b3b3b3";
              ctx.fillText(
                `${countryCode}. ${city}`,
                cw / 2 - ((ch / 2.05) * 0.65) / 2,
                y - 6 - 50
              );
              ctx.rotate((270 * Math.PI) / 180);
              ctx.font = "14px EL";
              ctx.fillStyle = "#808080";
              ctx.fillText(`Address : ${address}`, -(ch - 40), cw - 30);
              ctx.fillText(
                `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
                -(ch - 40),
                cw - 45
              );
              ctx.rotate((-270 * Math.PI) / 180);

              const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
              img(imageDataUrl);
              setEnd(false);
            }
          } else {
            //삽화 배경사각형
            const rectWidth2 = cw / 1.83;
            const rectheight2 = ch / 2.23;
            const y2 = ch / 2 - ch / 4.5 + rectheight2;
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
            ctx.drawImage(image3, 25, 30, 73, 73);

            ctx.font = "bolder 37px SB ";
            ctx.fillStyle = "black";
            ctx.fillText("MEMORIES", x, y + height + 40);
            ctx.fillText("ON CHAIN.", x, y + height + 80);

            ctx.font = "bold 17px EL";
            ctx.fillStyle = "white";
            ctx.fillText("MEMO", x, y2 + 30);
            ctx.font = "13px EL";
            ctx.fillStyle = "white";
            ctx.fillText(
              `${time[0]} ${time[1]} ${time[2]}  ${weather}`,
              x,
              y2 + 45
            );

            ctx.font = " 14px EL";
            ctx.fillStyle = "white";
            const maxWidth = 200; // 최대 너비
            const lineHeight = 20;
            const x2 = x;
            let y3 = y2 + 90;
            const text2 = message;
            const characters = text2.split("");
            let line = "";
            for (let i = 0; i < characters.length; i++) {
              const testLine = line + characters[i];
              const metrics = ctx.measureText(testLine);
              const testWidth = metrics.width;

              if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, x2, y3);
                line = characters[i];
                y3 += lineHeight;
              } else {
                line = testLine;
              }
            }
            ctx.fillText(line, x2, y3);

            ctx.font = "24px SB";
            ctx.fillStyle = "#b3b3b3";
            ctx.fillText(
              `${countryCode}. ${city}`,
              cw / 2 - ((ch / 2.05) * 0.65) / 2,
              y - 6
            );
            ctx.rotate((270 * Math.PI) / 180);
            ctx.font = "14px EL";
            ctx.fillStyle = "#808080";
            ctx.fillText(`Address : ${address}`, -(ch - 40), cw - 30);
            ctx.fillText(
              `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
              -(ch - 40),
              cw - 45
            );
            ctx.rotate((-270 * Math.PI) / 180);

            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
            setEnd(false);
          }
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

export default CanvasForm3;
