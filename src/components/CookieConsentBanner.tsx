"use client";

import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      cookieName="cookieConsent"
      style={{
        background: "#ffffff",
        color: "#1f2937",
        borderTop: "1px solid #ccc",
        fontSize: "14px",
        padding: "16px",
        textAlign: "center",
      }}
      buttonText="Accept"
      declineButtonText="Reject"
      enableDeclineButton
      buttonStyle={{
        backgroundColor: "#14b8a6", // teal-500
        color: "white",
        padding: "8px 16px",
        borderRadius: "9999px",
        fontWeight: "bold",
        border: "none",
        marginRight: "10px",
      }}
      declineButtonStyle={{
        backgroundColor: "#374151", // gray-700
        color: "white",
        padding: "8px 16px",
        borderRadius: "9999px",
        fontWeight: "bold",
        border: "none",
      }}
    >
      <div className="font-semibold mb-1">
        We value your privacy and use cookies to improve your experience.
      </div>
      <p className="text-xs">
        We use cookies to ensure basic functionality and to analyze usage. You can accept or reject cookies.
      </p>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
