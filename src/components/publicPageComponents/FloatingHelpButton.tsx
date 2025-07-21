// components/FloatingHelpButton.tsx
import { FC } from "react";
 // optional icon lib

const FloatingHelpButton: FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className="rounded-full  transition-all"
        aria-label="Help"
      >
        {/* Replace with your custom image/icon if needed */}
        <img
          src="/assets/help.png" // place your PNG or SVG in public folder
          alt="Help"
          className="w-32 h-32"
        />
      </div>
    </div>
  );
};

export default FloatingHelpButton;
