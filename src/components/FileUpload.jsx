import { useEffect, useState } from "react";

import CanvasForm from "./CanvasForm/CanvasForm";
import CanvasForm2 from "./CanvasForm/CanvasForm2";
import CanvasForm3 from "./CanvasForm/CanvasForm3";
import CanvasForm4 from "./CanvasForm/CanvasForm4";
import CanvasForm5 from "./CanvasForm/CanvasForm5";
import CanvasForm6 from "./CanvasForm/CanvasForm6";
import SliderComponent from "./CanvasForm/SliderComponent";

const FileUpload = ({
  file,
  setUrl,
  lat,
  lon,
  country,
  countryCode,
  city,
  address,
  account,
  message,
  weather,
  temperature,
  time,
  setCanvasIndex,
}) => {
  const [CanvasImage1, setCanvasImage1] = useState();
  const [CanvasImage2, setCanvasImage2] = useState();
  const [CanvasImage3, setCanvasImage3] = useState();
  const [CanvasImage4, setCanvasImage4] = useState();
  const [CanvasImage5, setCanvasImage5] = useState();
  const [CanvasImage6, setCanvasImage6] = useState();
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState([]);
  const [end, setEnd] = useState(false);

  const loadImage = () => {
    const image = new Image();
    image.src = file;

    image.onload = () => {
      const iw = image.width;
      const ih = image.height;
      if (iw / ih > 1.1) {
        // 가로가 김
        setSize([1, ...size]);
        setEnd(true);
      } else if (iw / ih < 0.9) {
        // 세로가 김
        setSize([2, ...size]);
        setEnd(true);
      } else {
        // 가로 세로 비율이 비슷함
        setSize([3, ...size]);
        setEnd(true);
      }
    };
  };

  useEffect(() => {
    loadImage();
  }, [file, message]);

  useEffect(() => {
    if (size.length > 2 && size[0] == 1) {
      setSize([1]);
    }
    console.log(size);
  }, [size]);

  const FileToMint = () => {
    if (index == 0 && CanvasImage1) {
      setUrl(CanvasImage1);
      setCanvasIndex(0);
      return;
    } else if (index == 1) {
      setUrl(CanvasImage2);
      setCanvasIndex(1);
      return;
    } else if (index == 2) {
      setUrl(CanvasImage3);
      setCanvasIndex(2);
    } else if (index == 3) {
      setUrl(CanvasImage4);
      setCanvasIndex(3);
    } else if (index == 4) {
      setUrl(CanvasImage5);
      setCanvasIndex(4);
    } else if (index == 5) {
      setUrl(CanvasImage6);
      setCanvasIndex(5);
    }
  };

  //폰트 기능
  const fonts = [
    new FontFace(
      "SB",
      `url(${process.env.PUBLIC_URL}/font/SourceSans3-SemiBold.ttf)`
    ),
    new FontFace(
      "EL",
      `url(${process.env.PUBLIC_URL}/font/SourceSans3-Light.ttf)`
    ),
  ];

  useEffect(() => {
    const loadFonts = async () => {
      // 폰트 로드
      await Promise.all(fonts.map((font) => font.load()));

      // 폰트가 모두 로드된 후에 document에 폰트 추가
      fonts.forEach((font) => document.fonts.add(font));
    };

    loadFonts();
  }, [fonts]);

  const loadImaget = (src) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    FileToMint();
  }, [index, CanvasImage1]);

  useEffect(() => {
    console.log(end);
  }, [end]);

  return (
    <>
      <div className="flex justify-center items-center mb-4">
        {file && (
          <div className=" items-center w-[350px] md:w-[1000px] ">
            <SliderComponent
              imgurl1={CanvasImage1}
              imgurl2={CanvasImage2}
              imgurl3={CanvasImage3}
              imgurl4={CanvasImage4}
              imgurl5={CanvasImage5}
              imgurl6={CanvasImage6}
              setIndex={setIndex}
              size={size}
            />
          </div>
        )}
      </div>
      {
        <div>
          <CanvasForm
            img={setCanvasImage1}
            lat={lat}
            lon={lon}
            country={country}
            countryCode={countryCode}
            city={city}
            address={address}
            account={account}
            file={file}
            size={size}
            setEnd={setEnd}
            setSize={setSize}
            message={message}
            weather={weather}
            temperature={temperature}
            time={time}
          />
          <CanvasForm2
            img={setCanvasImage2}
            lat={lat}
            lon={lon}
            country={country}
            countryCode={countryCode}
            city={city}
            address={address}
            account={account}
            file={file}
            size={size}
            setEnd={setEnd}
            setSize={setSize}
            message={message}
            weather={weather}
            temperature={temperature}
            time={time}
          />
          <CanvasForm3
            img={setCanvasImage3}
            lat={lat}
            lon={lon}
            country={country}
            countryCode={countryCode}
            city={city}
            address={address}
            account={account}
            file={file}
            size={size}
            setEnd={setEnd}
            setSize={setSize}
            message={message}
            weather={weather}
            temperature={temperature}
            time={time}
          />
          <CanvasForm4
            img={setCanvasImage4}
            lat={lat}
            lon={lon}
            country={country}
            countryCode={countryCode}
            city={city}
            address={address}
            account={account}
            file={file}
            size={size}
            setEnd={setEnd}
            setSize={setSize}
            message={message}
            weather={weather}
            temperature={temperature}
            time={time}
          />
          <CanvasForm5
            img={setCanvasImage5}
            lat={lat}
            lon={lon}
            country={country}
            countryCode={countryCode}
            city={city}
            address={address}
            account={account}
            file={file}
            size={size}
            setEnd={setEnd}
            setSize={setSize}
            message={message}
            weather={weather}
            temperature={temperature}
            time={time}
          />
          <CanvasForm6
            img={setCanvasImage6}
            lat={lat}
            lon={lon}
            country={country}
            countryCode={countryCode}
            city={city}
            address={address}
            account={account}
            file={file}
            size={size}
            setEnd={setEnd}
            setSize={setSize}
            message={message}
            weather={weather}
            temperature={temperature}
            time={time}
          />
        </div>
      }
    </>
  );
};
export default FileUpload;
