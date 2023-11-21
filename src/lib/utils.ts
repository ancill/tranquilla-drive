import { type ClassValue, clsx } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
export const updateLocalStorage = (newValue: number): void => {
  window.localStorage.setItem("currentCard", newValue.toString());
  // Dispatch custom event to notify of the change
  window.dispatchEvent(new Event("storageChange"));
};

export const getCurrentCardIdx = (): number =>
  window.localStorage.getItem("currentCard") !== null
    ? Number(window.localStorage.getItem("currentCard"))
    : 0;

export const useCardCounter = (): {
  currentCard: number;
  setCurrentCard: (newValue: number) => void;
} => {
  // Initialize the state with the value from localStorage
  const [currentCard, setCurrentCardState] = useState(getCurrentCardIdx());

  // This effect sets up the event listener for localStorage updates
  useEffect(() => {
    const handleStorageChange = (): void => {
      setCurrentCardState(getCurrentCardIdx());
    };

    // Add event listener for custom event
    window.addEventListener("storageChange", handleStorageChange);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, []);

  // Wrap the state setter function to also update localStorage
  const setCurrentCard = (newValue: number): void => {
    setCurrentCardState(newValue);
    updateLocalStorage(newValue);
  };

  return { currentCard, setCurrentCard };
};

export const useSafariCheck = (): {
  isSafari: boolean;
} => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check for Safari browser
    const userAgent = navigator.userAgent.toLowerCase();
    setIsSafari(
      userAgent.includes("safari/") && !userAgent.includes("chrome/"),
    );
  }, []);

  return { isSafari };
};
