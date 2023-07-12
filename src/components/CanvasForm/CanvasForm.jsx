import React, { useRef, useState } from "react";
import { useEffect } from "react";

function CanvasForm({
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
  fonts,
  time,
}) {
  const canvasRef = useRef(null);

  //1 가로가 김, 2 세로가 김, 3 비율 비슷함
  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  };
  // 이미지 그리기
  useEffect(() => {
    //이미지 불러오기
    (async () => {
      const image2 = await loadImage(
        `${process.env.PUBLIC_URL}/image/logo2.png`
      );
      const image3 = await loadImage(
        `${process.env.PUBLIC_URL}/image/logo3.png`
      );

      // 캔버스에 그리기
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const cw = canvas.width;
      const ch = canvas.height;

      // 가로가 긴버전
      if (size[0] == 1) {
        // console.log(size);
        const image = new Image();
        image.src = file;
        image.onload = () => {
          //배경 프레임 그리기
          const rectWidth = cw / 2;
          const rectheight = ch;
          ctx.fillStyle = "#ececec"; //바꿔야되는부분
          ctx.fillRect(0, 0, rectWidth * 2, rectheight);

          // 왼쪽에 사각형 그리기
          ctx.fillStyle = "black";
          ctx.fillRect(15, 15, rectWidth - 30, rectheight - 30);

          ctx.filter = "none";
          // 오른쪽에 사각형 그리기
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(cw / 2 - 15, 15, rectWidth, rectheight - 30);
          //사각형 아웃라인

          //삽화
          //이미지 크기
          const iw = image.width;
          const ih = image.height;
          const iar = iw / ih;

          const rectWidth2 = cw / 1.78;
          const rectheight2 = cw / 1.78;

          //가로가 김
          ctx.drawImage(image3, cw - 95, 25, 73, 73);
          if (iw > 1100 || iar > 1.5) {
            ctx.fillStyle = "white";
            ctx.fillRect(
              cw / 2 - (rectWidth2 * iar * 0.5) / 2,
              ch / 2 - (rectheight2 * 0.5) / 2,
              rectWidth2 * iar * 0.5,
              rectheight2 * 0.5
            );
            ctx.drawImage(
              image,
              cw / 2 - ((cw / 1.84) * iar * 0.5) / 2,
              ch / 2 - ((cw / 1.84) * 0.5) / 2,
              (cw / 1.84) * iar * 0.5,
              (cw / 1.84) * 0.5
            );
            console.log(`fonts :${fonts}`);

            ctx.font = "bolder 37px SB ";
            ctx.fillStyle = "black";
            ctx.fillText(
              "MEMORIES",
              cw / 2 -
                (rectWidth2 * iar * 0.5) / 2 +
                rectWidth2 * iar * 0.5 +
                12,
              ch / 2 - ((cw / 1.84) * 0.5) / 2 + 40
            );
            ctx.fillText(
              "ON CHAIN.",
              cw / 2 -
                (rectWidth2 * iar * 0.5) / 2 +
                rectWidth2 * iar * 0.5 +
                12,
              ch / 2 - ((cw / 1.84) * 0.5) / 2 + 80
            );

            ctx.font = "bold 17px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText(
              "MEMO",
              cw / 2 -
                (rectWidth2 * iar * 0.5) / 2 +
                rectWidth2 * iar * 0.5 +
                12,
              ch / 2 - (rectheight2 * 0.5) / 2 + rectheight2 * 0.5 - 120
            );
            ctx.font = "15px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText(
              `${time[0]} ${time[1]} ${time[2]} ${weather}`,
              cw / 2 -
                (rectWidth2 * iar * 0.5) / 2 +
                rectWidth2 * iar * 0.5 +
                12,
              ch / 2 - (rectheight2 * 0.5) / 2 + rectheight2 * 0.5 - 105
            );
            ctx.font = "14px EL";
            ctx.fillStyle = "#4d4d4d";
            const maxWidth = 180; // 최대 너비
            const lineHeight = 20;
            const x =
              cw / 2 -
              (rectWidth2 * iar * 0.5) / 2 +
              rectWidth2 * iar * 0.5 +
              12;
            let y = ch / 2 - (rectheight2 * 0.6) / 2 + rectheight2 * 0.6 - 90;
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
            ctx.font = "14px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText("made by memorachain", cw - 160, ch - 30);

            ctx.rotate((270 * Math.PI) / 180);
            const text = `${countryCode}. ${city} `;
            ctx.font = "26px SB";
            ctx.fillStyle = "#b3b3b3";
            ctx.fillText(
              text,
              -ch / 2 - (rectheight2 * 0.5) / 2 + 5,
              cw / 2 - (rectWidth2 * iar * 0.5) / 2 - 5
            );
            ctx.font = "15px EL";
            ctx.fillStyle = "#808080";
            ctx.fillText(`Address : ${address}`, -(ch - 35), 45);
            ctx.fillText(
              `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
              -(ch - 35),
              65
            );
            ctx.rotate((-270 * Math.PI) / 180);
            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
            setEnd(false);
          } else {
            ctx.fillStyle = "white";
            ctx.fillRect(
              cw / 2 - (rectWidth2 * iar * 0.6) / 2,
              ch / 2 - (rectheight2 * 0.6) / 2,
              rectWidth2 * iar * 0.6,
              rectheight2 * 0.6
            );
            ctx.drawImage(
              image,
              cw / 2 - ((cw / 1.84) * iar * 0.6) / 2,
              ch / 2 - ((cw / 1.84) * 0.6) / 2,
              (cw / 1.84) * iar * 0.6,
              (cw / 1.84) * 0.6
            );

            ctx.font = "bolder 37px SB ";
            ctx.fillStyle = "black";
            ctx.fillText(
              "MEMORIES",
              cw / 2 -
                (rectWidth2 * iar * 0.6) / 2 +
                rectWidth2 * iar * 0.6 +
                12,
              ch / 2 - ((cw / 1.84) * 0.6) / 2 + 40
            );
            ctx.fillText(
              "ON CHAIN.",
              cw / 2 -
                (rectWidth2 * iar * 0.6) / 2 +
                rectWidth2 * iar * 0.6 +
                12,
              ch / 2 - ((cw / 1.84) * 0.6) / 2 + 80
            );

            ctx.font = "bold 17px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText(
              "MEMO",
              cw / 2 -
                (rectWidth2 * iar * 0.6) / 2 +
                rectWidth2 * iar * 0.6 +
                12,
              ch / 2 - (rectheight2 * 0.6) / 2 + rectheight2 * 0.6 - 120
            );
            ctx.font = "13px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText(
              `${time[0]} ${time[1]} ${time[2]} ${weather}`,
              cw / 2 -
                (rectWidth2 * iar * 0.6) / 2 +
                rectWidth2 * iar * 0.6 +
                12,
              ch / 2 - (rectheight2 * 0.6) / 2 + rectheight2 * 0.6 - 105
            );

            ctx.font = "14px EL";
            ctx.fillStyle = "#4d4d4d";
            const maxWidth = 200; // 최대 너비
            const lineHeight = 20;
            const x =
              cw / 2 -
              (rectWidth2 * iar * 0.6) / 2 +
              rectWidth2 * iar * 0.6 +
              12;
            let y = ch / 2 - (rectheight2 * 0.6) / 2 + rectheight2 * 0.6 - 80;
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

            ctx.font = "14px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText("made by memorachain", cw - 160, ch - 30);
            ctx.rotate((270 * Math.PI) / 180);
            const text = `${countryCode}. ${city}  `;
            ctx.font = "26px SB";
            ctx.fillStyle = "#b3b3b3";
            ctx.fillText(
              text,
              -ch / 2 - (rectheight2 * 0.6) / 2 + 5,
              cw / 2 - (rectWidth2 * iar * 0.6) / 2 - 5
            );
            ctx.font = "15px EL";
            ctx.fillStyle = "#808080";
            ctx.fillText(`Address : ${address}`, -(ch - 35), 45);
            ctx.fillText(
              `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
              -(ch - 35),
              65
            );
            ctx.rotate((-270 * Math.PI) / 180);
            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
            setEnd(false);
          }
        };
      }
      //세로가 긴 버전, 비율이 비슷한버전
      if (size[0] == 2 || size[0] == 3) {
        const image = new Image();
        image.src = file;

        image.onload = () => {
          //배경테두리 사각형 그리기

          const rectWidth = cw / 2;
          const rectheight = ch;
          console.log(cw);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, rectWidth * 2, rectheight);

          //이미지 크기
          const iw = image.width;
          const ih = image.height;
          const iar = iw / ih;

          // 왼쪽에 사각형 그리기
          ctx.fillStyle = "black";
          ctx.fillRect(15, 15, rectWidth - 30, rectheight - 30);

          ctx.filter = "none";
          // 오른쪽에 사각형 그리기
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(cw / 2 - 15, 15, rectWidth, rectheight - 30);
          //사각형 아웃라인

          const rectWidth2 = cw / 1.78;
          const rectheight2 = cw / 1.78;

          //삽화

          //세로가 김
          if (iar < 0.9) {
            if (iar < 0.6) {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(
                cw / 2 - cw / 7.33,
                ch / 2 - ch / 18.18 - (rectheight2 * (2 - iar) - rectheight2),
                rectWidth2 * 0.8,
                rectheight2 * (2 - iar) * 0.7
              );
              ctx.drawImage(
                image,
                cw / 2 - cw / 7.85,
                ch / 2 - ch / 20 - (rectheight2 * (2 - iar) - rectheight2),
                (cw / 1.84) * 0.8,
                (cw / 1.84) * (2 - iar) * 0.7
              );
              ctx.drawImage(image2, 20, 20, 74, 74);
            } else {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(
                cw / 2 - cw / 7.33,
                ch / 2 - ch / 18.18 - (rectheight2 * (2 - iar) - rectheight2),
                rectWidth2,
                rectheight2 * (2 - iar)
              );
              ctx.drawImage(
                image,
                cw / 2 - cw / 7.85,
                ch / 2 - ch / 20 - (rectheight2 * (2 - iar) - rectheight2),
                cw / 1.84,
                (cw / 1.84) * (2 - iar)
              );
              ctx.drawImage(image2, 20, 30, 74, 74);
            }

            ctx.font = "bolder 37px SB ";
            ctx.fillStyle = "black";
            ctx.fillText(
              "MEMORIES",
              cw / 2.02,
              ch / 2 - ch / 18.18 - (rectheight2 * (2 - iar) - rectheight2) - 52
            );
            ctx.fillText(
              "ON CHAIN.",
              cw / 2.02,
              ch / 2 - ch / 18.18 - (rectheight2 * (2 - iar) - rectheight2) - 20
            );

            ctx.font = "bold 17px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText("MEMO", cw / 2.03, ch / 1.1 - 90);
            ctx.font = " 13px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText(
              `${time[0]} ${time[1]} ${time[2]} ${weather}`,
              cw / 2.03,
              ch / 1.1 - 75
            );

            ctx.font = "14px EL";
            ctx.fillStyle = "#4d4d4d";

            const maxWidth = 200; // 최대 너비
            const lineHeight = 20;
            const x = cw / 2.03;
            let y = ch / 1.1 - 30;
            const text = message;
            const characters = text.split("");
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
            const text2 = `${countryCode}. ${city}`;
            const textWidth = ctx.measureText(text2).width;
            ctx.font = "26px SB";
            ctx.fillStyle = "#b3b3b3";
            ctx.fillText(
              text2,
              -(
                ch / 2 -
                ch / 18.18 -
                (rectheight2 * (2 - iar) - rectheight2) +
                textWidth * 2.1
              ),
              cw / 2 - cw / 7.33 - 13
            );
            ctx.font = "15px EL";
            ctx.fillStyle = "#808080";
            ctx.fillText(`Address : ${address}`, -(ch - 35), 45);
            ctx.fillText(
              `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
              -(ch - 35),
              65
            );
            ctx.rotate((-270 * Math.PI) / 180);
            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
            setEnd(false);
          } else {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(
              cw / 2 - cw / 7.33,
              ch / 2 - ch / 18.18,
              rectWidth2,
              rectheight2
            );
            ctx.drawImage(
              image,
              cw / 2 - cw / 7.85,
              ch / 2 - ch / 20,
              cw / 1.84,
              cw / 1.84
            );
            ctx.drawImage(image2, 20, 20, 74, 74);

            ctx.font = "bolder 37px SB ";
            ctx.fillStyle = "black";
            ctx.fillText(
              "MEMORIES",
              cw / 2.02,
              ch / 2 -
                ch / 18.18 -
                (rectheight2 * (2 - iar) - rectheight2) -
                100
            );
            ctx.fillText(
              "ON CHAIN.",
              cw / 2.02,
              ch / 2 - ch / 18.18 - (rectheight2 * (2 - iar) - rectheight2) - 70
            );

            ctx.font = "bold 17px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText("MEMO", cw / 2.03, ch / 1.1 - 90);
            ctx.font = " 13px EL";
            ctx.fillStyle = "#4d4d4d";
            ctx.fillText(
              `${time[0]} ${time[1]} ${time[2]} ${weather}`,
              cw / 2.03,
              ch / 1.1 - 75
            );

            ctx.font = "14px EL";
            ctx.fillStyle = "#4d4d4d";
            const maxWidth = 200; // 최대 너비
            const lineHeight = 20;
            const x = cw / 2.03;
            let y = ch / 1.1 - 30;
            const text = message;
            const characters = text.split("");
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
            const text2 = `${countryCode}. ${city} `;
            const textWidth = ctx.measureText(text2).width;
            ctx.font = "26px SB";
            ctx.fillStyle = "#b3b3b3";
            ctx.fillText(
              text2,
              -(
                ch / 2 -
                ch / 18.18 -
                (rectheight2 * (2 - iar) - rectheight2) +
                textWidth * 2
              ),
              cw / 2 - cw / 7.33 - 13
            );
            ctx.font = "15px EL";
            ctx.fillStyle = "#808080";
            ctx.fillText(`Address : ${address}`, -(ch - 35), 45);
            ctx.fillText(
              `Location : ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
              -(ch - 35),
              65
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

// additionalImage.src = `https://gateway.pinata.cloud/ipfs/${imgad}`;
export default CanvasForm;
