import { useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";

const Mint = () => {
  const GOOGLEMAP_API = process.env.REACT_APP_GOOGLEMAP_API;

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  const [isLocationAllowed, setIsLocationAllowed] = useState(false); // 위치 정보 동의 상태를 저장

  const getGeolocation = useCallback(async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        const successCallback = (position) => {
          resolve(position);
        };

        const errorCallback = (error) => {
          reject(error);
        };

        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback
        );
      });
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      setIsLocationAllowed(true); // 위치 정보 동의 상태를 true로 설정
    } catch (error) {
      alert("위치 정보에 동의 해주셔야 합니다.");
      console.error(error);
    }
  }, []);

  const getWeatherInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
      );

      if (response.status !== 200) {
        alert("날씨 정보를 가져오지 못했습니다.");
        return;
      }
      setCity(response.data.name);
      setCountry(response.data.sys.country);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [lat, lon]);

  const mapElement = useRef(null);
  const mapLoaded = useRef(false);

  const initMap = useCallback(() => {
    const { google } = window;
    if (
      !mapElement.current ||
      !google ||
      isNaN(lat) ||
      isNaN(lon) ||
      mapLoaded.current
    )
      return;

    const location = { lat, lng: lon };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 17,
      center: location,
    });
    new google.maps.Marker({
      position: location,
      map,
    });
    mapLoaded.current = true;
  }, [lat, lon]);

  const loadScript = useCallback(() => {
    if (typeof window.google === "undefined") {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAP_API}&callback=initMap&language=en`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;

      // 이미 스크립트가 로드된 경우에는 중복으로 로드하지 않음
      if (!document.querySelector(`script[src="${script.src}"]`)) {
        document.body.appendChild(script);
      }
    } else {
      initMap();
    }
  }, [GOOGLEMAP_API, initMap]);

  useEffect(() => {
    if (!isLocationAllowed) {
      // 위치 정보 동의를 받지 않았으면 위치 정보 요청
      getGeolocation();
    }
  }, [isLocationAllowed, getGeolocation]);

  useEffect(() => {
    if (lat !== null && lon !== null && mapLoaded.current) {
      getWeatherInfo();
    }
  }, [lat, lon, mapLoaded, getWeatherInfo]);

  useEffect(() => {
    loadScript();
  }, [loadScript]);

  useEffect(() => {
    console.log(lat);
  }, [lat]);

  useEffect(() => {
    console.log(lon);
  }, [lon]);

  useEffect(() => {
    console.log(process.env.REACT_APP_WEATHER_API);
  }, []);

  return (
    <div>
      {!isLocationAllowed && (
        <button onClick={getGeolocation}>위치 정보 허용</button>
      )}
      <div>Pinata Pin Check</div>
      {isLocationAllowed && (
        <>
          <div ref={mapElement} className="min-h-[400px]" />
          <div className="flex flex-col my-20 border border-gray-500 p-12">
            <div>현재 위치</div>
            <div>위도 : {lat}</div>
            <div>경도 : {lon}</div>
            {/* 국가 / 도시 부분은 위도 경도를 기반으로 Geocoding API 쓸 것. */}
            {/* <div>국가 : {country}</div>
            <div>도시 : {city}</div> */}
          </div>
          <FileUpload />
        </>
      )}
    </div>
  );
};

export default Mint;
