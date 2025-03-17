"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { StoreProvider } from "./StoreProvider";
import { ToastProvider } from "@/lib/context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ToastProvider>
              <StoreProvider>
                <ReduxProvider>
                  <CartModalProvider>
                    <ModalProvider>
                      <PreviewSliderProvider>
                        <Header />
                        {children}

                        <QuickViewModal />
                        <CartSidebarModal />
                        <PreviewSliderModal />
                      </PreviewSliderProvider>
                    </ModalProvider>
                  </CartModalProvider>
                </ReduxProvider>
              </StoreProvider>
            </ToastProvider>

            <ScrollToTop />
            {/* <Footer /> */}
          </>
        )}
      </body>
    </html>
  );
}
