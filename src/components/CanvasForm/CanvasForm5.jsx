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
}) {
  const canvasRef = useRef(null);

  // 이미지 경로
  const imageSrc = "Logo.png";

  //폰트 기능
  const font = new FontFace(
    "Montserrat",
    `url(${process.env.PUBLIC_URL}/font/Montserrat.ttf)`
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

        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            //굵기 효과?
            ctx.fillStyle = "black";
            ctx.font = "25px Montserrat";
            ctx.fillText(
              `MEMORIES`,
              cw - ((cw / 1.39) * 0.8) / 2 - 25,
              ch / 3.6
            );
            ctx.fillText(
              `MEMORIES`,
              cw - ((cw / 1.39) * 0.8) / 2 - 25,
              ch / 3.6
            );
            ctx.fillText(
              `IN CHAIN.`,
              cw - ((cw / 1.39) * 0.8) / 2 - 25,
              ch / 3
            );
            ctx.fillText(
              `IN CHAIN.`,
              cw - ((cw / 1.39) * 0.8) / 2 - 25,
              ch / 3
            );
            //
            ctx.fillStyle = "#aaaaaa";
            ctx.font = "20px Montserrat";
            ctx.fillText(
              `${countryCode}. ${city}`,
              cw - ((cw / 1.39) * 0.65) / 2,
              ch / 2 - ch / 1.05 / 2.8
            );
            //
            ctx.fillStyle = "black";
            ctx.font = "13px Montserrat";
            ctx.fillText(
              `MEMO`,
              cw - ((cw / 1.39) * 0.8) / 2 - 25,
              ch / 4.4 + 175
            );
            ctx.fillText(
              `MEMO`,
              cw - ((cw / 1.39) * 0.8) / 2 - 25,
              ch / 4.4 + 175
            );
            //
            ctx.fillStyle = "gray";
            ctx.font = "10px Montserrat";
            ctx.fillText(
              `${message}`,
              cw - ((cw / 1.39) * 0.8) / 2 - 25,
              ch / 4.4 + 205
            );
            //
            ctx.fillStyle = "gray";
            ctx.font = "10px Montserrat";
            ctx.fillText(
              `Address: ${address}`,
              cw / 2 - ((cw / 1.39) * 0.9) / 2 - 40,
              ch - ((ch / 1.39) * 0.45) / 2 - 12
            );
            ctx.fillText(
              `Location: ${lat}, ${lon}`,
              cw / 2 - ((cw / 1.39) * 0.9) / 2 - 40,
              ch - ((ch / 1.39) * 0.45) / 2 + 4
            );

            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
            setEnd(false);
          });
        });
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
          (cw / 1.65) * 0.5 * 1.1,
          440
        );
        // 그림자 스타일 초기화
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgba(0, 0, 0, 0)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        //메인 사각형(그림) 그리기
        ctx.filter = "none";
        ctx.drawImage(image, cw / 1.3 - 270, ch / 2 - ch / 1.25 / 2, 350, 440);

        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.fillStyle = "black";
            ctx.font = "25px Montserrat";
            ctx.fillText(
              `${countryCode}`,
              cw / 2 - ((cw / 1.39) * 0.8) / 2 - 50,
              ch / 2 / 0.7 - 30
            );
            ctx.fillText(
              `${city}`,
              cw / 2 - ((cw / 1.39) * 0.8) / 2 - 50,
              ch / 2 / 0.635 - 30
            );
            ctx.fillText(
              `${country}`,
              cw / 2 - ((cw / 1.39) * 0.8) / 2 - 50,
              ch / 2 / 0.58 - 30
            );

            // ctx.fillText(`Age: ${message}`, cw / 2 + 90, ch / 4.2 + 50);

            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
            setEnd(false);
          });
        });
      };
    }
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

//색깔

// const x1 = image.width / 2;
// const y1 = image.height / 2 +(ch/2);
// const pixel = ctx.getImageData(x1, y1, 1, 1);
// const data = pixel.data;
// const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
