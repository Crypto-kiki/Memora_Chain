import React, { useRef, useState } from "react";
import { useEffect } from "react";

function CanvasForm({
  lat,
  lon,
  city,
  country,
  countryCode,
  size,
  img,
  file,
  setEnd,
  account,
  message,
}) {
  const canvasRef = useRef(null);

  //폰트 기능
  const font = new FontFace(
    "Popppins",
    `url(${process.env.PUBLIC_URL}/font/Popppins.ttf)`
  );
  //1 가로가 김, 2 세로가 김, 3 비율 비슷함

  // 이미지 그리기
  useEffect(() => {
    console.log(message);
    if (size.length == 1) {
    }
    //이미지 불러오기

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
        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.font = "24px Popppins ";
            ctx.fillStyle = "white";
            ctx.font = "15px Popppins";
            ctx.fillText(`Current Location: ${lat}, ${lon}`, cw / 11, ch / 1.1);
            ctx.fillText(`message: ${message}`, cw / 11, ch / 1.6);
            ctx.fillText(`countryCode: ${countryCode}`, cw / 12, ch / 2.6);
            ctx.fillStyle = "black";
            ctx.fillText(
              `Country & City: ${country}, ${city}`,
              cw / 2,
              ch / 12.5
            );
            ctx.font = "15px Popppins";
            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
            setEnd(false);
          });
        });
      };
    }
    //세로가 긴 버전, 비율이 비슷한버전
    if (size[0] == 2 || size[0] == 3) {
      console.log(message);
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
          }
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
        }
      };

      font.load().then(() => {
        document.fonts.add(font); // 폰트를 document.fonts에 추가
        document.fonts.ready.then(() => {
          ctx.font = "20px Popppins";
          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
          img(imageDataUrl);
          setEnd(false);
        });
      });
    }
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
