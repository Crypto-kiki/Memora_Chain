import { useEffect, useState } from "react";

import CanvasForm from "./CanvasForm/CanvasForm";
import CanvasForm2 from "./CanvasForm/CanvasForm2";
import CanvasForm3 from "./CanvasForm/CanvasForm3";
import CanvasForm4 from "./CanvasForm/CanvasForm4";
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
  const [fontstyle, setFontStyle] = useState("roboto");
  const [CanvasImage1, setCanvasImage1] = useState();
  const [CanvasImage2, setCanvasImage2] = useState();
  const [CanvasImage3, setCanvasImage3] = useState();
  const [CanvasImage4, setCanvasImage4] = useState();
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState();
  // console.log(file);
  useEffect(()=>{
      const image = new Image();
      image.src = file;
      image.onload =() => {
        const iw = image.width;
        const ih = image.height;      
        if(iw/ih > 1.1) //가로가 김
        {
          setSize(1);
          
        }else if(iw/ih < 0.9) // 세로가 김 
        {
          setSize(2);
        }else // 가로 세로 비율이 비슷함
        {
          setSize(3);
        } 
        // console.log(size);
      }  
  },[file])

  //폰트 배열
  const FontArray = ["Inter", "Montserrat", "Popppins", "roboto"];

  const handleSubmit = (event) => {
    event.preventDefault();
    // name, age 값을 업데이트하는 함수
    setMetaData({
      name: event.target.name.value,
      age: event.target.age.value,
    });
    // console.log(metaData2);
  };

  useEffect(() => {
    FileToMint();
  }, [index, CanvasImage1]);
  const FileToMint = () => {
    if (index == 0 && CanvasImage1) {
      setUrl(CanvasImage1);
    } else if (index == 1) {
      setUrl(CanvasImage2);
    } else if (index == 2) {
      setUrl(CanvasImage3);
    } else if (index == 3) {
      setUrl(CanvasImage4);
    }
  };
  useEffect(()=>{
    // console.log(CanvasImage1);
    // console.log(file);

  },[CanvasImage1]);
  return (
    <>
      <div className="flex">
        <form onSubmit={handleSubmit} className="mr-8 ml-6">
          <label>
            Name:
            <input
              type="text"
              name="name"
              className="border-2 rounded-md ml-2  m-1"
            />
          </label>
          <br />
          <label className="font-display2">
            Age:
            <input
              type="text"
              name="age"
              className="border-2 rounded-md ml-2 m-1"
            />
          </label>
          <br />
          <button type="submit">Submit</button>
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
              metadata={metaData2}
              setIndex={setIndex}
              size={size}
            />
          </div>
        )}
      </div>
      {file && (<div className="grid grid-cols-2 gap-2 justify-items-center">        
        <CanvasForm
          metadata={metaData2}
          img={setCanvasImage1}
          file={file}
          size={size}
        />
        <CanvasForm2
          metadata={metaData2}
          fontstyle={fontstyle}
          img={setCanvasImage2}
          file={file}
          size={size}
        />
        <CanvasForm3
          metadata={metaData2}
          fontstyle={fontstyle}
          img={setCanvasImage3}
          file={file}
          size={size}
        />
        <CanvasForm4
          metadata={metaData2}
          fontstyle={fontstyle}
          img={setCanvasImage4}
          file={file}
          size={size}
        />
      </div>)}
  
    </>
  );
};
{
  /*imgurl1={CanvasImage1} imgurl2={CanvasImage2} imgurl3={CanvasImage3} imgurl4={CanvasImage4}*/
}
export default FileUpload;