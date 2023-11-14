import { useState, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn, useCardCounter } from "@/lib/utils";
import { BookType, BookA } from "lucide-react";
import { AnswerPanel } from "./answer-panel";

export interface Answer {
  correct?: boolean;
  text: string;
  ru: string;
}

interface FlashcardSet {
  img?: string;
  responses: Answer[];
  text: string;
  ru: string;
}

type FlashcardProps = React.ComponentProps<typeof Card>;

export function Flashcard({
  className,
  ...props
}: FlashcardProps): JSX.Element {
  const [flashcards, setFlashcards] = useState<FlashcardSet[]>([]);
  const { currentCard, setCurrentCard } = useCardCounter();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Answer | undefined>(
    undefined,
  );
  const [isFlipPanelOpen, setFlipPanelOpen] = useState(false);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await fetch("/data_ru.json");
        const data = await response.json();
        setFlashcards(data.questions);
      } catch (error) {
        console.error("Error loading flashcard data:", error);
      }
    }
    fetchData().catch((error) => {
      // Handle any uncaught promise rejections here
      console.error("Unhandled promise rejection:", error);
    });
  }, []);

  const handleCheck = (): void => {
    setShowAnswer(true);
  };
  const handleNextCard = (): void => {
    const nextCardIdx = (currentCard + 1) % flashcards.length;
    setCurrentCard(nextCardIdx);
    setShowAnswer(false);
    setSelectedCard(undefined);
  };

  // const handlePrevCard = (): void => {
  //   setCurrentCard(
  //     (prevCard) => (prevCard - 1 + flashcards.length) % flashcards.length,
  //   );
  //   setShowAnswer(false);
  // };

  if (flashcards.length === 0) {
    return <div>Loading...</div>;
  }

  const TranslateButton = (): JSX.Element => {
    return (
      <Button
        variant="ghost"
        size="lg"
        onTouchStart={() => {
          setShowTranslate(true);
        }}
        onTouchEnd={() => {
          setShowTranslate(false);
        }}
        onMouseDown={() => {
          setShowTranslate(true);
        }}
        onMouseUp={() => {
          setShowTranslate(false);
        }}
      >
        {showTranslate ? (
          <BookA className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <BookType className="h-[1.2rem] w-[1.2rem] transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  };

  const handleButtonVarianOnAnswer = (res: Answer): ButtonProps["variant"] => {
    if (res.text === selectedCard?.text) return "selected";

    return "outline";
  };

  const handleSelect = (res: Answer): void => {
    setSelectedCard(res);
  };

  const ActionButton = (): JSX.Element => {
    const isCardSelected = selectedCard !== undefined;
    const handleClick = (): void => {
      !showAnswer ? handleCheck() : handleNextCard();
      setFlipPanelOpen(!isFlipPanelOpen);
    };

    const handleTitle = (): string => {
      if (showAnswer) return "Continue";
      if (isCardSelected) return "Check";

      return "Select Answer";
    };

    const correctAnswer: ButtonProps["variant"] =
      selectedCard?.correct === true ? "default" : "destructive";

    return (
      <Button
        onClick={handleClick}
        className={cn("uppercase font-bold w-full z-40 gap-0")}
        variant={showAnswer ? correctAnswer : "outline_disabled"}
        disabled={!isCardSelected}
      >
        {handleTitle()}
      </Button>
    );
  };

  const Image = (): JSX.Element => {
    const [isImageLoaded, setImageLoaded] = useState(false);
    return (
      <div className="flex justify-center">
        {Boolean(flashcards[currentCard].img) && (
          <img
            src={flashcards[currentCard].img}
            alt="img"
            className="object-contain h-48 w-full"
            onLoad={() => {
              setImageLoaded(!isImageLoaded);
            }}
          />
        )}
      </div>
    );
  };

  const getCorrectAnswer = (): Answer | undefined => {
    return flashcards[currentCard].responses.find(
      (val) => val.correct === true,
    );
  };

  return (
    <Card
      className={cn(
        "w-fit md:w-3/4 lg:w-2/4 overflow-none flex flex-col h-[calc(100svh-74px)]",
        className,
      )}
      {...props}
    >
      <CardContent className="flex flex-col gap-4 pt-4">
        <Image />
        <div className="flex gap-4">
          <p className="text-lg mb-4 font-medium leading-none break-words">
            {showTranslate
              ? flashcards[currentCard].ru
              : flashcards[currentCard].text}
          </p>
        </div>
        {flashcards[currentCard].responses.map((response, index) => (
          <Button
            key={index}
            className="whitespace-normal break-words leading-1 h-auto font-semibold"
            variant={handleButtonVarianOnAnswer(response)}
            onClick={() => {
              if (!showAnswer) handleSelect(response);
            }}
          >
            {showTranslate ? response.ru : response.text}
          </Button>
        ))}
      </CardContent>
      <CardFooter className="mt-auto gap-2">
        <ActionButton />
        <TranslateButton />
      </CardFooter>
      <AnswerPanel
        isOpen={isFlipPanelOpen}
        selectedAnswer={selectedCard}
        correctAnswer={getCorrectAnswer()}
      />
    </Card>
  );
}
