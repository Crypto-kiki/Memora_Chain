import { useEffect, useState } from "react";

import CanvasForm from "./CanvasForm/CanvasForm";
import CanvasForm2 from "./CanvasForm/CanvasForm2";
import CanvasForm3 from "./CanvasForm/CanvasForm3";
import CanvasForm4 from "./CanvasForm/CanvasForm4";
import SliderComponent from "./CanvasForm/SliderComponent";

const FileUpload = ({ file, setUrl }) => {
  const [metaData2, setMetaData] = useState({ name: "", age: 0 });
  const [fontstyle, setFontStyle] = useState("roboto");
  const [CanvasImage1, setCanvasImage1] = useState();
  const [CanvasImage2, setCanvasImage2] = useState();
  const [CanvasImage3, setCanvasImage3] = useState();
  const [CanvasImage4, setCanvasImage4] = useState();
  const [index, setIndex] = useState(0);
  // console.log(file);
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
  const ButtonWithImage = ({ fonturl, alt }) => (
    <button
      className="w-[150px] h-[100px] border-2"
      onClick={() => {
        setFontStyle(fonturl);
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/fontimage/${fonturl}.png`}
        alt={alt}
      />
    </button>
  );
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
        <div className="border-2 border-black rounded-md p-4 ml-[350px] w-[700px] h-[200px] mb-4">
          <div className="mb-4 ml-4 text-bold text-2xl">Font Example</div>
          <div className="grid grid-cols-4 gap-2 justify-items-center">
            {FontArray.map((v, i) => {
              return (
                <ButtonWithImage key={i} fonturl={v} alt={`Image ${i + 1}`} />
              );
            })}
          </div>
        </div>
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
              index={index}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 justify-items-center">
        <CanvasForm
          metadata={metaData2}
          fontstyle={fontstyle}
          img={setCanvasImage1}
          file={file}
        />
        <CanvasForm2
          metadata={metaData2}
          fontstyle={fontstyle}
          img={setCanvasImage2}
          file={file}
        />
        <CanvasForm3
          metadata={metaData2}
          fontstyle={fontstyle}
          img={setCanvasImage3}
          file={file}
        />
        <CanvasForm4
          metadata={metaData2}
          fontstyle={fontstyle}
          img={setCanvasImage4}
          file={file}
        />
      </div>
    </>
  );
};
{
  /*imgurl1={CanvasImage1} imgurl2={CanvasImage2} imgurl3={CanvasImage3} imgurl4={CanvasImage4}*/
}
export default FileUpload;
