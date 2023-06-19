import { useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
// import { format } from "crypto-js";

const Mint = () => {
  const GOOGLEMAP_API = process.env.REACT_APP_GOOGLEMAP_API;

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [formatted_address, setFormatted_address] = useState();

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
    } else {
      // 위치 정보가 허용되면 geocoding 호출
      const fetchGeocoding = async () => {
        try {
          const geocoding = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLEMAP_API}&language=en`
          );
          console.log(geocoding);
          setCountry(
            geocoding.data.results[geocoding.data.results.length - 1]
              .formatted_address
          );
          setCity(
            geocoding.data.results[geocoding.data.results.length - 2]
              .address_components[0].long_name
          );
          setFormatted_address(geocoding.data.results[0].formatted_address);
        } catch (error) {
          console.error(error);
        }
      };
      fetchGeocoding();
    }
  }, [isLocationAllowed, getGeolocation, lat, lon, setCountry]);

  useEffect(() => {
    if (lat !== null && lon !== null && mapLoaded.current) {
      getWeatherInfo();
    }
  }, [lat, lon, mapLoaded, getWeatherInfo]);

  useEffect(() => {
    loadScript();
  }, [loadScript]);

  // 비동기라 South Korea를 불렀다가 KR까지 부르게 됨. 따라서 아래 useEffect 써야 함.
  useEffect(() => {
    console.log(lat);
    console.log(lon);
    console.log(country);
  }, [lat, lon, country]);

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
            <div>국가 : {country}</div>
            <div>도시 : {city}</div>
            <div>상세주소 : {formatted_address}</div>
          </div>
          <FileUpload
            lat={lat}
            lon={lon}
            contry={country}
            city={city}
            address={formatted_address}
          />
        </>
      )}
    </div>
  );
};

export default Mint;
