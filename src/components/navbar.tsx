import { useCardCounter } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
export function BinancePayDialog(): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">🥟</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Поддержать проект эмпанадасами 🥟</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <img
            src="/binance.png"
            className="object-contain h-64 w-full"
            alt="binance pay: Ancill (542291390)"
          />

          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-medium leading-none">TRC20:</h4>
              <p className="text-sm text-muted-foreground">
                TGsXq51LHXHRiDcJT8RrzjXK2Fj8wViWef
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium leading-none"> BEP20:</h4>
              <p className="text-sm text-muted-foreground">
                0x9f513cbbf75a635adc95c21b1e2a85b614e0e7b7
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
          className="w-16"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <Button
          type="submit"
          className="px-2"
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
        <BinancePayDialog />
        <div className="flex-1 flex justify-center">{children}</div>
        <div className="ml-auto flex items-center space-x-4">
          <InputWithButton />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
