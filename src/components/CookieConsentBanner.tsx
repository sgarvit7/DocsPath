"use client";

import CookieConsent from "react-cookie-consent";
import { useEffect, useState } from "react";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(true); // Avoid SSR mismatch
  }, []);

  if (!showBanner) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="mySiteCookieConsent"
      style={{
        background: "#2B373B",
        color: "#ffffff",
        fontSize: "14px",
      }}
      buttonStyle={{
        background: "#14b8a6",
        color: "#fff",
        fontSize: "13px",
        borderRadius: "5px",
        padding: "8px 16px",
      }}
      expires={150}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieConsentBanner;
