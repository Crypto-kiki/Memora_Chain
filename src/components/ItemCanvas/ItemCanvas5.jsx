import React, { useRef, useState } from "react";
import { useEffect } from "react";

function ItemCanvas5({ size, img, setEnd, setItemOnImage, ItemIndex }) {
  const ItemImage = [
    `${process.env.PUBLIC_URL}/image/parts/items/item1s.png`,
    `${process.env.PUBLIC_URL}/image/parts/items/item2s.png`,
    `${process.env.PUBLIC_URL}/image/parts/items/item5s.png`,
    `${process.env.PUBLIC_URL}/image/parts/items/item4s.png`,
  ];
  const ItemX = [140, 140, 270, 270];
  const ItemY = [250, 270, 50, 50];
  const ItemW = [170, 170, 170, 170];
  const ItemH = [170, 170, 170, 170];
  const ItemX2 = [630, 630, 660, 660];
  const ItemY2 = [350, 370, 190, 190];
  const ItemW2 = [150, 150, 110, 110];
  const ItemH2 = [150, 150, 110, 110];

  useEffect(() => {}, [size]);
  const canvasRef = useRef(null);

  const image2 = new Image();
  image2.src = ItemImage[ItemIndex];

  //1 가로가 김, 2 세로가 김

  // 이미지 그리기

  useEffect(() => {
    //이미지 불러오기

    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function getColorAtPixel(x, y) {
      const imageData = ctx.getImageData(x, y, 1, 1); // 해당 좌표의 픽셀 데이터를 가져옵니다.
      const data = imageData.data; // 픽셀 데이터의 RGBA 값을 가져옵니다.

      const red = data[0];
      const green = data[1];
      const blue = data[2];
      const alpha = data[3];

      return `rgba(${red}, ${green}, ${blue}, ${alpha})`; // 픽셀의 색상을 RGBA 형식으로 반환합니다.
    }

    function isWhiteColor(color) {
      return (
        color === "rgb(236, 236, 236)" || color === "rgba(236, 236, 236, 255)"
      ); // 흰색 여부를 확인합니다.
    }

    // 사용 예시:
    const x = 105;
    const y = 80;

    // 가로가 긴버전

    const image = new Image();
    image.src = img;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      //배경 프레임 그리기
      ctx.drawImage(image, 0, 0, 900, 550);
      const color = getColorAtPixel(x, y);
      // console.log(color);
      if (isWhiteColor(color)) {
        //추가할 파츠 그리기
        ctx.drawImage(
          image2,
          ItemX[ItemIndex],
          ItemY[ItemIndex],
          ItemW[ItemIndex],
          ItemH[ItemIndex]
        );
        // ctx.fillStyle = "red"; //바꿔야되는부분
        // ctx.fillRect(120, 80, 80, 80);

        const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분

        setItemOnImage(imageDataUrl);
        setEnd(false);
      } else {
        //추가할 파츠 그리기
        ctx.drawImage(
          image2,
          ItemX2[ItemIndex],
          ItemY2[ItemIndex],
          ItemW2[ItemIndex],
          ItemH2[ItemIndex]
        );
        // ctx.fillStyle = "blue"; //바꿔야되는부분
        // ctx.fillRect(120, 80, 80, 80);

        const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분

        setItemOnImage(imageDataUrl);
        setEnd(false);
      }
    };
  }, [size, img]);

  return (
    <canvas
      ref={canvasRef}
      width={size === 1 ? 900 : 550}
      height={size === 1 ? 550 : 900}
      className="max-w-[90%] max-h-[90%] w-auto h-auto"
    />
  );
}

export default ItemCanvas5;
