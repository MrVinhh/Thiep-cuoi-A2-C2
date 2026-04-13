import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin", "vietnamese"], variable: "--font-script" });
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Wedding – Quốc Thịnh & Đoan Trinh | 22.04.2026",
  description: "Trân trọng kính mời bạn đến tham dự lễ cưới của Quốc Thịnh và Đoan Trinh vào ngày 22 tháng 04 năm 2026.",
  openGraph: {
    title: "Wedding – Quốc Thịnh & Đoan Trinh",
    description: "22 . 04 . 2026 · Nhà Hàng Bạch Việt",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${greatVibes.variable} ${cormorant.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  );
}
