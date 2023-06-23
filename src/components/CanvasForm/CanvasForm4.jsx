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
      `${fontstyle}`,
      `url(${process.env.PUBLIC_URL}/font/${fontstyle}.ttf)`
    );

    // 이미지 그리기
    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/image/test4.jpg`;

    image.onload = () => {
      ctx.drawImage(image, 0, ch / 2 - ch / 20, 550, 550);

      const x1 = image.width / 2;
      const y1 = image.height / 2 + ch / 2;
      const pixel = ctx.getImageData(x1, y1, 1, 1);
      const data = pixel.data;
      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

      // 아래에 사각형 그리기
      const rectWidth2 = cw;
      const rectheight2 = ch / 2;
      console.log(rgba);
      ctx.fillStyle = rgba;
      ctx.fillRect(0, ch / 2 - ch / 10, rectWidth2, rectheight2 + ch / 10);

      ctx.filter = "none";

      // 위쪽에 사각형 그리기
      const rectWidth = cw;
      const rectheight = ch / 2 - ch / 10;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, rectWidth, rectheight);
      //사각형 아웃라인
      ctx.strokeRect(0, 0, cw, ch);

      //삽화 이미지 그리기 (원본 크기)
      const additionalImage = new Image();
      additionalImage.src = image.src;

      const x = cw / 2 - cw / 3.23;
      const y = ch / 2 - ch / 3.7;
      const width = cw / 1.6;
      const height = cw / 1.6;
      // const cornerRadius = 20;

      ctx.drawImage(image, x, y, width, height);

      font.load().then(() => {
        document.fonts.add(font); // 폰트를 document.fonts에 추가
        document.fonts.ready.then(() => {
          ctx.font = `20px  ${fontstyle} `;
          ctx.fillStyle = "black";
          ctx.fillText(
            `Name: ${metadata.name}`,
            cw / 2 - cw / 4.6,
            ch / 2 + ch / 8.33
          );
          ctx.font = `15px ${fontstyle} `;
          ctx.fillStyle = "black";
          ctx.fillText(
            `Age: ${metadata.age}`,
            cw / 2 - cw / 4.6,
            ch / 2 + ch / 6.66
          );
        });
        const imageDataUrl = canvas.toDataURL("image/png");
        img(imageDataUrl);
      });
    };
  }, [metadata, fontstyle, size]);

  return (
    <div>
      <canvas ref={canvasRef} width={size.width} height={size.height} />
    </div>
  );
}

export default CanvasForm4;
