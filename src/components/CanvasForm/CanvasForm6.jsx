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
}) {
  const canvasRef = useRef(null);

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
        ctx.shadowOffsetX = 5; // 그림자의 x축 오프셋
        ctx.shadowOffsetY = 5; // 그림자의 y축 오프셋
        //배경 크기맞추기용 틀
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          cw / 2 - ((cw / 1.5) * 1.1) / 2,
          ch / 2 - ch / 1.3 / 2,
          (cw / 1.5) * 1.1,
          ch / 1.3
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
          cw / 2 - ((cw / 1.5) * 1.1) / 2 + 15,
          ch / 2 - ch / 1.3 / 2 + 15,
          (cw / 1.5) * 1.1 - 30,
          ch / 1.2 / 1.65
        );

        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            //
            ctx.fillStyle = "black";
            ctx.font = "25px Montserrat";
            ctx.fillText(
              `MEMORA`,
              cw / 2 - ((cw / 1.39) * 0.8) / 2 + 40,
              ch / 1.15 / 1.2
            );
            ctx.fillText(
              `CHAIN`,
              cw / 2 - ((cw / 1.39) * 0.8) / 2 + 40,
              ch / 1.15 / 1.1
            );
            ctx.fillText(
              `MEMORA`,
              cw / 2 - ((cw / 1.39) * 0.8) / 2 + 40,
              ch / 1.15 / 1.2
            );
            ctx.fillText(
              `CHAIN`,
              cw / 2 - ((cw / 1.39) * 0.8) / 2 + 40,
              ch / 1.15 / 1.1
            );
            //
            // ctx.font = "20px Montserrat";
            // ctx.fillText(
            //   `Age: ${metadata.age}`,
            //   cw / 2 - ((cw / 1.39) * 0.8) / 2 + 20,
            //   ch / 4.5 + ch / 1.2 / 1.7 + 45
            // );
            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
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

        font.load().then(() => {
          document.fonts.add(font); // 폰트를 document.fonts에 추가
          document.fonts.ready.then(() => {
            ctx.fillStyle = "black";
            ctx.font = "25px Montserrat";
            // ctx.fillText(
            //   `Name22: ${metadata.name}`,
            //   cw / 2 + 90,
            //   ch / 4.2 - 30
            // );
            // ctx.fillText(`Age: ${metadata.age}`, cw / 2 + 90, ch / 4.2 + 50);
            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
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

export default CanvasForm6;

//색깔

// const x1 = image.width / 2;
// const y1 = image.height / 2 +(ch/2);
// const pixel = ctx.getImageData(x1, y1, 1, 1);
// const data = pixel.data;
// const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;