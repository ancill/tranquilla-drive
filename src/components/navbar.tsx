import { useState, useEffect } from "react";
import { ModeToggle } from "./mode-toggle";

export function NavBar({ children }: { children: JSX.Element }): JSX.Element {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = (): void => {
    const currentScrollTop = document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      // Scroll Down
      setVisible(false);
    } else {
      // Scroll Up
      setVisible(true);
    }
    setLastScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className={`fixed w-full px-4 bg-secondary top-0 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex h-16 items-center justify-between">
        <div>🥟</div>
        <div className="flex-1 flex justify-center">{children}</div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
