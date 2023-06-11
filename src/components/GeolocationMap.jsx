import { useEffect } from "react";

const GOOGLEMAP_API = process.env.REACT_APP_GOOGLEMAP_API;

const GeolocationMap = () => {
  useEffect(() => {
    let map, infoWindow;

    function initMap() {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.611, lng: 127.0139 },
        zoom: 19,
      });
      infoWindow = new window.google.maps.InfoWindow();

      const locationButton = document.createElement("button");

      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
        locationButton
      );
      locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      });
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

    window.initMap = initMap; // initMap 함수를 전역 범위로 노출

    // Load Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAP_API}&callback=initMap&v=weekly`;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script after component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="h-screen">
      <div id="map" className="h-1/2 w-1/2"></div>
    </div>
  );
};

export default GeolocationMap;
