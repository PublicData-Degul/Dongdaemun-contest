import type { Metadata } from "next";
import "./globals.css";

/* 검색 엔진 */
export const metadata: Metadata = {
  title: "데굴데굴", // 브라우저에 표시될 제목
  description: "Dongdaemun Public Date Contest", // 검색 엔진에서 페이지 설명
};

/* children(page)을 읽기 전용으로 불러옴 */
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
          {children} {/* page.js */}
      </body>
    </html>
  );
}