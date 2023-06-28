import React, { useRef, useState } from "react";
import { useEffect } from "react";

function CanvasForm({
  lat,
  lon,
  city,
  country,
  size,
  img,
  file,
  setEnd,
  address,
  account,
}) {
  const canvasRef = useRef(null);

  //폰트 기능
  const fonts = [new FontFace(
    "Popppins",
    `url(${process.env.PUBLIC_URL}/font/Popppins.ttf)`)
  ];

 
  //1 가로가 김, 2 세로가 김, 3 비율 비슷함

  // 이미지 그리기
  useEffect(() => {
    console.log(lat);
    console.log(city);
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

        fonts.forEach((font) => {
          font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
            ctx.font = "24px Popppins ";
            ctx.fillStyle = "black";
            ctx.fillText('Title', cw/2, ch/12.5 + 60);
            ctx.fillStyle = "black";
            ctx.font = "15px Montserrat ";
            ctx.fillText(`Country & City: ${country}, ${city}`, cw / 2.05, ch / 1.2);
            ctx.font = "10px Popppins";
          const text = `address: \n${address}`;
            const lineHeight = 20; // 줄 간격 설정
            const lines = text.split('\n');
            lines.forEach((line, index) => {
              const yPos = ch / 1.15 + index * lineHeight; 
            ctx.fillText(line, cw / 2.08, yPos);});
            ctx.font = "12px Montserrat";
            ctx.fillStyle = "white";
            ctx.fillText(
              `Location: ${lat}, ${lon}`,             
              cw / 15,
              ch/1.15 +20
            );
            ctx.font = "10px Montserrat";
            ctx.fillStyle = "black";
            const text2 = `account: \n${account}`;
            const lines2 = text2.split('\n');
            lines2.forEach((line, index) => {
              const yPos = ch / 12.5 + index * lineHeight; 
            ctx.fillText(line, cw / 2.05, yPos);});
            const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
            img(imageDataUrl);
            setEnd(false);
          });
        });

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
          fonts.forEach((font) => {
            font.load().then((loadedFont) => {
              document.fonts.add(loadedFont);
              document.fonts.ready.then(() => {
                ctx.font = "bold 32px Popppins ";
                ctx.fillStyle = "black";
                ctx.fillText('MEMORIES', cw/2.02, ch / 2 - ch / 18.18 - (rectheight2 * (2 - iar) - rectheight2) - 52);
                ctx.fillText('IN CHAIN.', cw/2.02,ch / 2 - ch / 18.18 - (rectheight2 * (2 - iar) - rectheight2) - 20);
                ctx.font = "bold 15px Popppins";
                ctx.fillText('MEMO', cw/2.03, ch/1.1 - 90);        
                const text = `KR. ${city}`;
                ctx.rotate((90 * Math.PI) / 180);
                ctx.scale(-1, 1)
                const reversedText = text.split("").reverse().join(""); // 문자열 역순으로 반전
                ctx.font = "40px Popppins"
                ctx.fillStyle = "red";  
                ctx.textAlign = "right";
                ctx.textBaseline = "middle";
                ctx.fillText(reversedText, -(cw / 2 - cw / 7.33), ch / 2 - ch / 18.18 - (rectheight2 * (2 - iar) - rectheight2)   )                         
                ctx.rotate((-90*(Math.PI)) /180 )  
                ctx.scale(-1, 1)        
          
       
     
              const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
              img(imageDataUrl);
              setEnd(false);
              })
            });
          });
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
