import React, { useRef, useState } from "react";
import { useEffect } from "react";

function ItemCanvas({
//이미지 주소, 파츠 번호, img내보내는 함수, 가로폼세로폼 구분할 변수,
}) {
  const canvasRef = useRef(null);

  const image2 = new Image();
  //image2.src = `${process.env.PUBLIC_URL}/image/파츠번호에 해당하는 이미지주소.png`;


  //1 가로가 김, 2 세로가 김, 3 비율 비슷함

  // 이미지 그리기
  useEffect(() => {


    //이미지 불러오기

    // 캔버스에 그리기
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    // 가로가 긴버전
    if (size[0] == 1) {
      const image = new Image();
      image.src = {/*이미지 주소 */};
      image.onload = () => {
        //배경 프레임 그리기
        ctx.drawImage(image, 0,0,900,550);
        //추가할 파츠 그리기
        ctx.drawImage(image2,x,y,크기, 크기);
          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
          img(imageDataUrl);
          setEnd(false);
        }
      };
    
    //세로가 긴 버전, 비율이 비슷한버전
    if (size[0] == 2 || size[0] == 3) {
      const image = new Image();
      image.src = {/*이미지 주소 */};
      image.onload = () => {
        //배경 프레임 그리기
        ctx.drawImage(image, 0,0,550,900);
        //추가할 파츠 그리기
        ctx.drawImage(image2,x,y,크기, 크기);
          const imageDataUrl = canvas.toDataURL("image/png"); // 파일 url 저장부분
          img(imageDataUrl);
          setEnd(false);
        }
      };
    
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

export default ItemCanvas;
