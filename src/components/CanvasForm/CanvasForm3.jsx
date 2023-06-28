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
}) {
  const canvasRef = useRef(null);

  //폰트 기능
  const font = new FontFace(
    `Popppins`,
    `url(${process.env.PUBLIC_URL}/font/Popppins.ttf)`
  );

  useEffect(() => {
    // 이미지 불러오기
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

        //가로가 김
        //삽화 배경사각형
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          cw / 2 - (rectWidth2 * iar * 0.6) / 2,
          ch / 2 - ((rectheight2 * 0.6) / 2) * 1.3,
          rectWidth2 * iar * 0.6,
          rectheight2 * 0.6 * 1.3
        );
        //삽화 이미지 그리기 (원본 크기)
        const x = cw / 2 - ((cw / 2.05) * iar * 0.6) / 2;
        const y = ch / 2 - (((cw / 2.05) * 0.6) / 2) * 1.3;
        const width = (cw / 2.05) * iar;
        const height = cw / 2.05;
        ctx.drawImage(image, x, y, width * 0.6, height * 0.6);
        font.load().then(() => {
          ctx.font = "20px Popppins";
          ctx.fillStyle = "black";
        });

        // const textWidth = ctx.measureText(`Name: `).width;
        // const underLineY = y + height + 34;
        // ctx.fill();
        // ctx.beginPath();
        // ctx.strokeStyle = "black";
        // ctx.lineWidth = 1;
        // ctx.moveTo(x + 3, underLineY);
        // ctx.lineTo(x + textWidth + 10, underLineY);
        // ctx.stroke();

        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.font = "15px Popppins";
            ctx.fillStyle = "black";
            const imageDataUrl = canvas.toDataURL("image/png");
            img(imageDataUrl);
          });
        });
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
          if (iar < 0.6) {
            //삽화 배경사각형
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(
              cw / 2 - (rectWidth2 * 0.6) / 2,
              ch / 2 - (rectheight2 * 0.6 * (2 - iar)) / 2,
              rectWidth2 * 0.6,
              rectheight2 * (2 - iar) * 0.6 * 1.1
            );
            //삽화 이미지 그리기 (원본 크기)
            const x = cw / 2 - ((ch / 2.05) * 0.6) / 2;
            const y = ch / 2 - (((ch / 2.05) * (2 - iar) * 0.6) / 2) * 1.05;
            const width = (ch / 2.05) * 0.6;
            const height = (ch / 2.05) * (2 - iar) * 0.55;
            ctx.drawImage(image, x, y, width, height);
            font.load().then(() => {
              ctx.font = "20px Popppins";
              ctx.fillStyle = "black";
            });

            font.load().then(() => {
              document.fonts.add(font); // 폰트를 document.fonts에 추가
              document.fonts.ready.then(() => {
                ctx.font = "15px Popppins";
                ctx.fillStyle = "black";
                const imageDataUrl = canvas.toDataURL("image/png");
                img(imageDataUrl);
              });
            });
          } else {
            //삽화 배경사각형
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(
              cw / 2 - (rectWidth2 * 0.6) / 2,
              ch / 2 - (rectheight2 * 0.6 * (2 - iar)) / 2,
              rectWidth2 * 0.6,
              rectheight2 * (2 - iar) * 0.6 * 1.1
            );
            //삽화 이미지 그리기 (원본 크기)
            const x = cw / 2 - ((ch / 2.05) * 0.6) / 2;
            const y = ch / 2 - (((ch / 2.05) * (2 - iar) * 0.6) / 2) * 1.05;
            const width = (ch / 2.05) * 0.6;
            const height = (ch / 2.05) * (2 - iar) * 0.55;
            ctx.drawImage(image, x, y, width, height);
            font.load().then(() => {
              ctx.font = "20px Popppins";
              ctx.fillStyle = "black";
            });

            font.load().then(() => {
              document.fonts.add(font); // 폰트를 document.fonts에 추가
              document.fonts.ready.then(() => {
                ctx.font = "15px Popppins";
                ctx.fillStyle = "black";
                const imageDataUrl = canvas.toDataURL("image/png");
                img(imageDataUrl);
              });
            });
          }
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
            ctx.font = "20px Popppins";
            ctx.fillStyle = "black";
          });
          font.load().then(() => {
            document.fonts.add(font); // 폰트를 document.fonts에 추가
            document.fonts.ready.then(() => {
              ctx.font = "15px Popppins";
              ctx.fillStyle = "black";
              const imageDataUrl = canvas.toDataURL("image/png");
              img(imageDataUrl);
            });
          });
        }
      };
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

export default CanvasForm3;
