import { useCallback, useEffect, useRef } from "react";

const GOOGLEMAP_API = process.env.REACT_APP_GOOGLEMAP_API;

const GeolocationMap = ({ lat, lon }) => {
  const mapElement = useRef(null);

  //  스크립트가 실행된 시점에서 initMap은 undefined이기 때문에 에러가 발생
  //  initMap이 먼저 선언되는 것을 보장하기 위해서 수동으로 스크립트를 로드 loadScript
  // script가 실행되기 이전에 window.initMap이 먼저 선언되어야 하기 때문
  const loadScript = useCallback((url) => {
    const firstScript = window.document.getElementsByTagName("script")[0];
    const newScript = window.document.createElement("script");
    newScript.src = url;
    newScript.async = true;
    newScript.defer = true;
    firstScript?.parentNode?.insertBefore(newScript, firstScript);
  }, []);

  // script에서 google map api를 가져온 후에 실행될 callback 함수
  const initMap = useCallback(() => {
    const { google } = window;
    if (!mapElement.current || !google) return;

    const location = { lat, lng: lon };
    const map = new google.maps.Map(mapElement.current, {
      zoom: 17,
      center: location,
    });
    new google.maps.Marker({
      position: location,
      map,
    });
  }, [lat, lon]);

  useEffect(() => {
    const script = window.document.getElementsByTagName("script")[0];
    const includeCheck = script.src.startsWith(
      "https://maps.googleapis.com/maps/api"
    );

    // script 중복 호출 방지
    if (includeCheck) return initMap();

    window.initMap = initMap;
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAP_API}&callback=initMap&language=en`
    );
  }, [initMap, loadScript]);

  return (
    <>
      <div ref={mapElement} className="min-h-[400px]" />
    </>
  );
};

export default GeolocationMap;
