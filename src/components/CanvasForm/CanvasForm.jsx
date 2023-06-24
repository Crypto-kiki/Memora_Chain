import React, { useRef } from "react";
import { useEffect } from "react";

function CanvasForm({ metadata, fontstyle, size, img, file }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;

    //폰트 기능
    const font = new FontFace(
      "Popppins",
      `url(${process.env.PUBLIC_URL}/font/Popppins.ttf)`
    );

    // 이미지 그리기
    const image = new Image();
    image.src = file;

    image.onload = () => {
      //배경
      //배경테두리 사각형 그리기
      const rectWidth = cw / 2;
      const rectheight = ch;
      ctx.fillStyle = "#F9E7B6";
      ctx.fillRect(0, 0, rectWidth * 2, rectheight);

      // 왼쪽에 사각형 그리기

      ctx.fillStyle = "black";
      ctx.fillRect(15, 15, rectWidth - 25, rectheight - 30);

      ctx.filter = "none";
      // 오른쪽에 사각형 그리기
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(rectWidth - 15, 15, rectWidth - 5, rectheight - 30);
      //사각형 아웃라인

      const rectWidth2 = cw / 1.78;
      const rectheight2 = cw / 1.78;

      //삽화
      //이미지 크기
      const iw = image.width;
      const ih = image.height;
      const iar = iw / ih;

      //세로가 김
      if (iar < 0.9) {
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
      //가로가 김
      else if (iar > 1.1) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          cw / 2 - cw / 7.33 - (rectWidth2 * iar - rectWidth2),
          ch / 2 - ch / 18.18,
          rectWidth2 * iar,
          rectheight2
        );
        ctx.drawImage(
          image,
          cw / 2 - cw / 7.85 - (rectWidth2 * iar - rectWidth2),
          ch / 2 - ch / 20,
          (cw / 1.84) * iar,
          cw / 1.84
        );
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
      font.load().then(() => {
        document.fonts.add(font); // 폰트를 document.fonts에 추가
        document.fonts.ready.then(() => {
          ctx.font = "20px Popppins";
          ctx.fillText(`Name: ${metadata.name}`, cw / 11, ch / 12.5);
          ctx.fillText(`Age: ${metadata.age}`, cw / 11, ch / 8.3);
          ctx.fillText(`address: ${metadata.address}`, cw / 11, ch / 6.3);
          ctx.fillText(`account: ${metadata.account}`, cw / 11, ch / 4.3);
          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
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

// additionalImage.src = `https://gateway.pinata.cloud/ipfs/${imgad}`;
export default CanvasForm;
