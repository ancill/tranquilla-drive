import { useCardCounter } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function NavBar({ children }: { children: JSX.Element }): JSX.Element {
  // const [lastScrollTop, setLastScrollTop] = useState(0);
  // const [visible, setVisible] = useState(true);

  // const handleScroll = (): void => {
  //   const currentScrollTop = document.documentElement.scrollTop;
  //   if (currentScrollTop > lastScrollTop) {
  //     // Scroll Down
  //     setVisible(!visible);
  //   } else {
  //     // Scroll Up
  //   }
  //   setLastScrollTop(currentScrollTop);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [lastScrollTop]);
  // ${ visible ? "translate-y-0" : "-translate-y-full" }

  function InputWithButton(): JSX.Element {
    const { currentCard, setCurrentCard } = useCardCounter();
    const [inputValue, setInputValue] = useState("");
    return (
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="number"
          placeholder={`${currentCard}`}
          className="w-14"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <Button
          type="submit"
          variant={"outline"}
          onClick={(event) => {
            setCurrentCard(Number(inputValue));
          }}
        >
          <ArrowRight />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={` w-full px-4 bg-secondary top-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex h-16 items-center justify-between">
        <div>🥟</div>
        <div className="flex-1 flex justify-center">{children}</div>
        <div className="ml-auto flex items-center space-x-4">
          <InputWithButton />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
