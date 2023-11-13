import type React from "react";
import { useState } from "react";

export const FlipPanel = ({
  button,
}: {
  button: React.ReactNode;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the side panel
  const togglePanel = (): void => {
    setIsOpen(!isOpen);
  };

  // Determine the appropriate styles for the side panel based on its open state
  const panelStyles = isOpen
    ? "transform translate-y-0 ease-out"
    : "transform translate-y-full ease-in";

  return (
    <div className="absolute ">
      {/* Button to toggle the side panel */}
      <button
        onClick={togglePanel}
        className="fixed z-10 bottom-4 right-4 p-2 text-white bg-blue-500 rounded-md focus:outline-none"
      >
        {isOpen ? "Hide" : "Show"} Panel
      </button>
      {button}

      {/* Side panel */}
      <div
        className={`fixed z-20 inset-x-0 bottom-0 max-w-md w-full h-64 bg-white shadow-lg overflow-auto transition-transform duration-300 ${panelStyles}`}
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
    </div>
  );
};
