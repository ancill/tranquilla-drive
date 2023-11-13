import type React from "react";
import { useState } from "react";

const HorozontalSidePanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the side panel
  const togglePanel = (): void => {
    setIsOpen(!isOpen);
  };

  // Determine the appropriate styles for the side panel based on its open state
  const panelStyles = isOpen
    ? "transform translate-x-0 ease-out"
    : "transform -translate-x-full ease-in";

  return (
    <>
      {/* Button to toggle the side panel */}
      <button
        onClick={togglePanel}
        className="fixed z-10 top-4 left-4 p-2 text-white bg-blue-500 rounded-md focus:outline-none"
      >
        {isOpen ? "Close" : "Open"} Panel
      </button>

      {/* Side panel */}
      <div
        className={`fixed z-20 top-0 left-0 w-64 h-full bg-white shadow-md overflow-auto transition-all duration-300 ${panelStyles}`}
      >
        {/* Your panel content here */}
        <p className="p-4">Your side panel content goes here.</p>
      </div>

      {/* Overlay to close panel when clicked */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={togglePanel}
        ></div>
      )}
    </>
  );
};

export default HorozontalSidePanel;
