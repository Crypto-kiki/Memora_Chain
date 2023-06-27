import { useEffect, useState } from "react";

import CanvasForm from "./CanvasForm/CanvasForm";
import CanvasForm2 from "./CanvasForm/CanvasForm2";
import CanvasForm3 from "./CanvasForm/CanvasForm3";
import CanvasForm4 from "./CanvasForm/CanvasForm4";
import CanvasForm5 from './CanvasForm/CanvasForm5';
import CanvasForm6 from './CanvasForm/CanvasForm6';
import SliderComponent from "./CanvasForm/SliderComponent";

const FileUpload = ({
  file,
  setUrl,
  lat,
  lon,
  country,
  city,
  address,
  account,
}) => {
  const [metaData2, setMetaData] = useState({
    name: "",
    age: 0,
    lat: lat,
    lon: lon,
    country: country,
    city: city,
    address: address,
    account: account,
  });

  const [CanvasImage1, setCanvasImage1] = useState();
  const [CanvasImage2, setCanvasImage2] = useState();
  const [CanvasImage3, setCanvasImage3] = useState();
  const [CanvasImage4, setCanvasImage4] = useState();
  const [CanvasImage5, setCanvasImage5] = useState();
  const [CanvasImage6, setCanvasImage6] = useState();
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState([]); 
  const [end, setEnd] = useState(false);

  useEffect(()=>{
    const image = new Image();
    image.src = file;
    
    image.onload=()=>{
      const iw = image.width;
      const ih = image.height;      
      if(iw/ih > 1.1) //가로가 김
      {
        setSize([1,...size]);      
        setEnd(true);
      }else if(iw/ih < 0.9) // 세로가 김 
      {
        setSize([2,...size]);      
        setEnd(true); 
      }else // 가로 세로 비율이 비슷함
      {
        setSize([3,...size]);
        setEnd(true);
      } 

      }
    },[file])
    

  //폰트 배열
  // const FontArray = ["Inter", "Montserrat", "Popppins", "roboto"];

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // name, age 값을 업데이트하는 함수
  //   setMetaData({
  //     name: event.target.name.value,
  //     age: event.target.age.value,
  //   });
  //   setEnd(true);
  //   // console.log(metaData2);
  // };

  const handleInputChange = (event) => {
    if(CanvasImage1){
      
      setMetaData({
        ...metaData2,
        [event.target.name]: event.target.value,
      });
      // setCanvasImage1();
    }
      setEnd(true);
  };

  useEffect(() => {
    FileToMint();
  }, [index, CanvasImage1]);
  const FileToMint = () => {
    if (index == 0 && CanvasImage1) {
      setUrl(CanvasImage1);
      return;
    } else if (index == 1) {
      setUrl(CanvasImage2);
      return;
    } else if (index == 2) {
      setUrl(CanvasImage3);
    } else if (index == 3) {
      setUrl(CanvasImage4);
    } else if (index == 4) {
      setUrl(CanvasImage5);
    } else if (index == 5) {
      setUrl(CanvasImage6);
    }
  };

  useEffect(()=>{
    if(account){
      setMetaData();
    }
    console.log(metaData2);
  }, [lat,lon,city,country,account])

  useEffect(()=>{
    console.log(end);
  },[end])

  return (
    <>
      <div className="flex">
        {/* <form onSubmit={handleSubmit} className="mr-8 ml-6"> */}
        <form  className="mr-8 ml-6">
          <label>
            Name:
            <input
              type="text"
              name="name"
              className="border-2 rounded-md ml-2  m-1"
              value = {metaData2.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label className="font-display2">
            Age:
            <input
              type="text"
              name="age"
              className="border-2 rounded-md ml-2 m-1"
              value = {metaData2.age}
              onChange={handleInputChange}
            />
          </label>
          <br />
          {/* <button type="submit">Submit</button> */}
        </form>
      </div>
      <div className="flex justify-center mb-4">
        {file && (
          <div className="xl:w-[1000px] lg:w-[800px] md:w-[500px] sm:w-[300px]">
            <SliderComponent
              imgurl1={CanvasImage1}
              imgurl2={CanvasImage2}
              imgurl3={CanvasImage3}
              imgurl4={CanvasImage4}
              imgurl5={CanvasImage5}
              imgurl6={CanvasImage6}
              metadata={metaData2}
              setIndex={setIndex}
              size={size}
            />
          </div>
        )}
      </div>
      {end && (<div>        
        <CanvasForm
          metadata={metaData2}
          img={setCanvasImage1}
          file={file}
          size={size}
          setEnd={setEnd}
          setSize={setSize}

        />
        <CanvasForm2
          metadata={metaData2}
          img={setCanvasImage2}
          file={file}
          size={size}
        />
        <CanvasForm3
          metadata={metaData2}
          img={setCanvasImage3}
          file={file}
          size={size}
        />
        <CanvasForm4
          metadata={metaData2}
          img={setCanvasImage4}
          file={file}
          size={size}
        />    
        <CanvasForm5
        metadata={metaData2}
        img={setCanvasImage5}
        file={file}
        size={size}
        />
        <CanvasForm6
          metadata={metaData2}
          img={setCanvasImage6}
          file={file}
          size={size}
        />
      </div>)}  
    </>
  );
};
export default FileUpload;