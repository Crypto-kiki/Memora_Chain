import { useEffect, useState} from "react";

import CanvasForm from './CanvasForm/CanvasForm';
import CanvasForm2 from './CanvasForm/CanvasForm2';
import CanvasForm3 from './CanvasForm/CanvasForm3';
import CanvasForm4 from './CanvasForm/CanvasForm4';
import SliderComponent from './CanvasForm/SliderComponent';

const FileUpload = () => {
  const [metaData2, setMetaData] = useState({name : '',  age: 0,});
  const [fontstyle, setFontStyle] = useState("roboto");
  const [canvasSize, setCanvasSize] = useState({
    width: 550,
    height: 900,
  });
  // const [CanvasImage, setCanvasImage] = useState([]);
  const [CanvasImage1, setCanvasImage1] = useState();
  const [CanvasImage2, setCanvasImage2] = useState();
  const [CanvasImage3, setCanvasImage3] = useState();
  const [CanvasImage4, setCanvasImage4] = useState();




  const FontArray = ["Inter","Montserrat","Popppins","roboto"]; 

  const handleSubmit = (event) => {
    event.preventDefault();
    // name, age 값을 업데이트하는 함수
    setMetaData({
      name: event.target.name.value,
      age: event.target.age.value,
    });
          // console.log(metaData2);  
  };  
  const ButtonWithImage = ({fonturl, alt})=> (
    <button className='w-[150px] h-[100px] border-2' onClick = {()=>{setFontStyle(fonturl)}}>
      <img src={`${process.env.PUBLIC_URL}/fontimage/${fonturl}.png`} alt={alt} />      
    </button>
  );
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) { // sm 화면 크기
        setCanvasSize({
          width: 200,
          height: 324,
        });
      } else if (screenWidth < 768) { // md 화면 크기
        setCanvasSize({
          width: 250,
          height: 420,
        });
      } else if (screenWidth < 1024){ // lg 화면 크기 이상
        setCanvasSize({
          width: 400,
          height: 648,
        });
      }
      else {
        setCanvasSize({
          width: 550,
          height: 900
        })
      }
    };

    window.addEventListener('resize', handleResize);
    // console.log(canvasSize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //   setCanvasImage([CanvasImage1, CanvasImage2, CanvasImage3, CanvasImage4]);
  //   console.log(CanvasImage);
  // }, [CanvasImage1, CanvasImage2, CanvasImage3, CanvasImage4]);


  return (
    <>    
      <div className='flex'>
      <form onSubmit={handleSubmit} className='mr-8 ml-6'>
        <label>
          Name:
          <input type="text" name="name" className="border-2 rounded-md ml-2  m-1" />
        </label>
        <br />
        <label className='font-display2' >
          Age:
          <input type="text" name="age" className="border-2 rounded-md ml-2 m-1"  />
        </label>
        <br />
        <button type="submit"  >Submit</button>
        </form>
        <div  className='border-2 border-black rounded-md p-4 ml-[350px] w-[700px] h-[200px] mb-4'>
          <div className='mb-4 ml-4 text-bold text-2xl'>
          Font Example
          </div>
          <div className='grid grid-cols-4 gap-2 justify-items-center'>
            {FontArray.map((v,i)=>{
              return (
                <ButtonWithImage key={i} fonturl={v} alt={`Image ${i + 1}`}/>
              );
            })}
          </div>
        </div> 
        </div>               
        <div className='grid grid-cols-2 gap-4 justify-items-center'>
          <CanvasForm metadata = {metaData2} fontstyle={fontstyle} size={canvasSize} img={setCanvasImage1}  />
          <CanvasForm2 metadata = {metaData2} fontstyle={fontstyle} size={canvasSize} img={setCanvasImage2} />
          <CanvasForm3 metadata = {metaData2} fontstyle={fontstyle} size={canvasSize} img={setCanvasImage3} />
          <CanvasForm4 metadata = {metaData2} fontstyle={fontstyle} size={canvasSize} img={setCanvasImage4} />
        </div>
        <div>
          <SliderComponent imgurl1={CanvasImage1} imgurl2={CanvasImage2} imgurl3={CanvasImage3} imgurl4={CanvasImage4} metadata = {metaData2} />
        </div>        
    </>
  );
};
{/*imgurl1={CanvasImage1} imgurl2={CanvasImage2} imgurl3={CanvasImage3} imgurl4={CanvasImage4}*/} 
export default FileUpload;

