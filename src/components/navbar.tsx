import { useCardCounter } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export function DonationButton(): JSX.Element {
  const [isDialogShowing, setDialogShow] = useState(false);
  const onShowDialog = (): void => {
    setDialogShow(!isDialogShowing);
  };

  return (
    <Button variant={"ghost"} onClick={onShowDialog}>
      🥟
    </Button>
  );
}

export function NavBar({ children }: { children?: JSX.Element }): JSX.Element {
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
          onClick={() => {
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
        <Progress className="w-28" value={100} />
        <div className="flex items-center space-x-4">
          <InputWithButton />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

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
