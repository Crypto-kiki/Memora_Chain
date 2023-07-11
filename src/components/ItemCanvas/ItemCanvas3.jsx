import React, { useRef, useState } from "react";
import { useEffect } from "react";

function ItemCanvas3({ size, img, setEnd, setItemOnImage, ItemIndex }) {
  const ItemImage = [
    `${process.env.PUBLIC_URL}/image/parts/items/item1s.png`,
    `${process.env.PUBLIC_URL}/image/parts/items/item2s.png`,
    `${process.env.PUBLIC_URL}/image/parts/items/item5s.png`,
    `${process.env.PUBLIC_URL}/image/parts/items/item4s.png`,
  ];

  const ItemX = [330, 350, 380, 380];
  const ItemY = [700, 740, 15, 25];
  const ItemW = [190, 180, 170, 170];
  const ItemH = [190, 180, 170, 170];
  const ItemX2 = [680, 700, 680, 680];
  const ItemY2 = [380, 400, 200, 200];
  const ItemW2 = [190, 180, 180, 180];
  const ItemH2 = [190, 180, 180, 180];
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
    const cw = canvas.width;
    const ch = canvas.height;
    // 가로가 긴버전
    if (size == 1) {
      const image = new Image();
      image.src = img;
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        //배경 프레임 그리기
        ctx.drawImage(image, 0, 0, 900, 550);
        //추가할 파츠 그리기
        ctx.drawImage(
          image2,
          ItemX2[ItemIndex],
          ItemY2[ItemIndex],
          ItemW2[ItemIndex],
          ItemH2[ItemIndex]
        );

        const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분

        setItemOnImage(imageDataUrl);
        setEnd(false);
      };
    }

    //세로가 긴 버전, 비율이 비슷한버전
    if (size == 2) {
      const image = new Image();
      image.src = img;
      image.crossOrigin = "Anonymous";

      image.onload = () => {
        //배경 프레임 그리기
        ctx.drawImage(image, 0, 0, 550, 900);
        //추가할 파츠 그리기
        ctx.drawImage(
          image2,
          ItemX[ItemIndex],
          ItemY[ItemIndex],
          ItemW[ItemIndex],
          ItemH[ItemIndex]
        );

        const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
        setItemOnImage(imageDataUrl);
        setEnd(false);
      };
    }
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

export default ItemCanvas3;
