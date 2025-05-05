'use client'; // 

import Script from 'next/script'; // 외부 스크립트(kakao maps sdk) 불러오기 위해
import { useEffect, useState } from 'react';

// 상태 변수
export default function KakaoMapPage() {
  const [isLoaded, setIsLoaded] = useState(false); // 지도 로드 여부
  const [map, setMap] = useState<any>(null);


  // 지도 초기화 함수
  const initMap = () => {
    // 지도 담을 DOM
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5744, 127.0395), // 초기 좌표
      level: 4 // 확대 레벨 (작을수록 확대)
    };

    //다부니 이미지 불러오기
    const dabunisrc = '/icons/dabuni.webp';
    const dabunisize = new window.kakao.maps.Size(40, 40);
    const dabuni = new window.kakao.maps.MarkerImage(dabunisrc, dabunisize);

    //노인 복지 시설 좌표
    const elderly = [
      { lat: 37.57829744, lng: 127.0421996 },
      { lat: 37.56663423, lng: 127.0683889 },
      { lat: 37.57716395, lng: 127.0358094 },
      { lat: 37.56670169, lng: 127.056713 },
      { lat: 37.57640519, lng: 127.0473915 },
      { lat: 37.56990735, lng: 127.0576235 },
      { lat: 37.57016097, lng: 127.0495161 },
      { lat: 37.58419171, lng: 127.0456969 },
      { lat: 37.58526339, lng: 127.0347349 },
      { lat: 37.58279487, lng: 127.0433833 },
      { lat: 37.57435891, lng: 127.031927 },
      { lat: 37.57415402, lng: 127.0451904 },
      { lat: 37.58751632, lng: 127.0427076 },
      { lat: 37.59025847, lng: 127.0620398 },
      { lat: 37.57922666, lng: 127.074006 },
      { lat: 37.58152415, lng: 127.0377483 },
      { lat: 37.5814977, lng: 127.0364792 },
      { lat: 37.57612882, lng: 127.0420167 },
      { lat: 37.5682068, lng: 127.0548 },
      { lat: 37.57675797, lng: 127.0248888 },
      { lat: 37.57631848, lng: 127.0665157 },
      { lat: 37.58936957, lng: 127.060972 },
      { lat: 37.5683536, lng: 127.0674649 },
      { lat: 37.58724711, lng: 127.0500267 },
      { lat: 37.58402099, lng: 127.034197 },
      { lat: 37.57728491, lng: 127.0301471 },
      { lat: 37.57228156, lng: 127.0695085 },
      { lat: 37.58294483, lng: 127.0437714 },
      { lat: 37.5842018, lng: 127.050552 },
      { lat: 37.57996239, lng: 127.068052 },
      { lat: 37.58621194, lng: 127.0635533 },
      { lat: 37.58607579, lng: 127.0420193 },
      { lat: 37.57473888, lng: 127.0325123 },
      { lat: 37.60315837, lng: 127.065295 },
      { lat: 37.5821361, lng: 127.0388933 },
      { lat: 37.57631749, lng: 127.0661948 },
      { lat: 37.5733599, lng: 127.0663218 },
      { lat: 37.57585054, lng: 127.044914 },
      { lat: 37.5862721, lng: 127.0339466 },
      { lat: 37.57298904, lng: 127.0699287 },
      { lat: 37.58646751, lng: 127.0410668 },
      { lat: 37.5837983, lng: 127.0383136 },
      { lat: 37.56864896, lng: 127.0632061 },
      { lat: 37.57600766, lng: 127.0714122 },
      { lat: 37.57549907, lng: 127.0709115 },
      { lat: 37.5786945, lng: 127.0564585 },
      { lat: 37.56570315, lng: 127.0671339 },
      { lat: 37.57017349, lng: 127.0576471 },
      { lat: 37.59848092, lng: 127.0618727 },
      { lat: 37.57125705, lng: 127.0694906 },
      { lat: 37.57512329, lng: 127.0488588 },
      { lat: 37.57268267, lng: 127.0589395 },
      { lat: 37.57276248, lng: 127.068801 },
      { lat: 37.57265459, lng: 127.0750703 },
      { lat: 37.58067787, lng: 127.0519176 },
      { lat: 37.58577859, lng: 127.0416619 },
      { lat: 37.57887851, lng: 127.0556411 },
      { lat: 37.56520017, lng: 127.0631218 },
      { lat: 37.6001268, lng: 127.0673903 },
      { lat: 37.57268283, lng: 127.0591464 },
      { lat: 37.57058465, lng: 127.0570303 }
    ];    

    // 지도 객체 생성
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);
    // 중심 좌표 (동대문구)
    const centerPosition = new window.kakao.maps.LatLng(37.5744, 127.0395);

    // 중심 좌표 마커 생성
    const centerMarker = new window.kakao.maps.Marker({
      position: centerPosition
    });
    centerMarker.setMap(newMap); // 지도 위에 중심 마커 표시

    // 노인 복지 시설 마커 생성성
    elderly.forEach((loc) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(loc.lat, loc.lng),
        image: dabuni
      });
      marker.setMap(newMap);
    });
  };

  // 지도 크기 재조정
  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, 'tilesloaded', () => {
        map.relayout(); // 지도 크기 재조정
      });
    }
  }, [map]);

  // 스크립트가 로드되면, 지도 초기화
  useEffect(() => {
    if (isLoaded && !map) {
      window.kakao.maps.load(() => {
        initMap();
      });
    }
  }, [isLoaded, map]);

  return (
    <div>
      {/* kakao map sdk 불러오기 */}
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setIsLoaded(true)}
      />
      {/* 지도 표시 영역 */}
      <div className="map-container" id="map"></div>
    </div>
  );
}