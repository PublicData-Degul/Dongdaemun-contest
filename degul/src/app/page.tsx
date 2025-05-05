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