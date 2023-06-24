import React, { useRef } from "react";
import { useEffect } from "react";
function CanvasForm4({ metadata, fontstyle, size, img, file }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;

    //폰트 기능
    const font = new FontFace(
      "Montserrat",
      `url(${process.env.PUBLIC_URL}/font/Montserrat.ttf)`
    );

    // 이미지 그리기
    const image = new Image();
    image.src = file;

    image.onload = () => {
      // 배경 사각형 그리기
      const rectWidth3 = cw / 2;
      const rectheight3 = ch;
      ctx.fillStyle = "#F9E7B6";
      ctx.fillRect(0, 0, rectWidth3 * 2, rectheight3);

      // 아래에 사각형 그리기
      const rectWidth2 = cw;
      const rectheight2 = ch / 2;
      // console.log(rgba);
      ctx.fillStyle = "gray";
      ctx.fillRect(
        15,
        ch / 2 - ch / 10,
        rectWidth2 - 30,
        rectheight2 + ch / 10 - 15
      );

      ctx.filter = "none";

      // 위쪽에 사각형 그리기
      const rectWidth = cw;
      const rectheight = ch / 2 - ch / 10;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(15, 15, rectWidth - 30, rectheight - 15);

      //이미지 크기
      const iw = image.width;
      const ih = image.height;
      const iar = iw / ih;
      if (iar < 0.9) {
        const x = cw / 2 - cw / 3.23;
        const y = ch / 2 - ch / 3.7 - (rectheight2 * (2 - iar) - rectheight2);
        const width = cw / 1.6;
        const height = (cw / 1.6) * (2 - iar);

        ctx.drawImage(image, x, y, width, height);
      } else if (iar > 1.1) {
        const width = (cw / 1.6) * iar;
        const height = cw / 1.6;
        const x = cw / 2 - width / 2;
        const y = ch / 2 - ch / 3.7;

        ctx.drawImage(image, x, y, width, height);
      } else {
        //삽화 이미지 그리기 (원본 크기)
        const x = cw / 2 - cw / 3.23;
        const y = ch / 2 - ch / 3.7;
        const width = cw / 1.6;
        const height = cw / 1.6;

        ctx.drawImage(image, x, y, width, height);
      }

      const x = cw / 2 - cw / 3.23;
      const y = ch / 2 - ch / 3.7;
      const width = cw / 1.6;
      const height = cw / 1.6;
      font.load().then(() => {
        document.fonts.add(font); // 폰트를 document.fonts에 추가
        document.fonts.ready.then(() => {
          ctx.font = "20px Montserrat";
          ctx.fillStyle = "white";
          ctx.fillText(`Name: ${metadata.name}`, x + 3, y + height + 30);
          ctx.font = `15px ${fontstyle} `;
          ctx.fillStyle = "white";
          ctx.fillText(`Age: ${metadata.age}`, x + 3, y + height + 55);
          const imageDataUrl = canvas.toDataURL("image/png");
          img(imageDataUrl);
        });
      });
    };
  }, [metadata, fontstyle, size, file]);

  return (
    <div className="hidden">
      <canvas ref={canvasRef} width={550} height={900} />
    </div>
  );
}

export default CanvasForm4;

//색깔

// const x1 = image.width / 2;
// const y1 = image.height / 2 +(ch/2);
// const pixel = ctx.getImageData(x1, y1, 1, 1);
// const data = pixel.data;
// const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
