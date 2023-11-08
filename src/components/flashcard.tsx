import { useState, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookType, BookA } from "lucide-react";

interface Response {
  correct?: boolean;
  text: string;
  ru: string;
}

interface FlashcardSet {
  img?: string;
  responses: Response[];
  text: string;
  ru: string;
}

type FlashcardProps = React.ComponentProps<typeof Card>;

// TODO:
// Correct answer should be green if you pressed on it, otherwise show red
// Add automatic swipe to next card
// Add global counter of right and wrong answers
// Add global counter of all cards

export function Flashcard({
  className,
  ...props
}: FlashcardProps): JSX.Element {
  const [flashcards, setFlashcards] = useState<FlashcardSet[]>([]);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const [correctResponse, setCorrectResponse] = useState<Response>();

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

  const handleNextCard = (): void => {
    setCurrentCard((prevCard) => (prevCard + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const handlePrevCard = (): void => {
    setCurrentCard(
      (prevCard) => (prevCard - 1 + flashcards.length) % flashcards.length,
    );
    setShowAnswer(false);
  };

  const handleAnswer = (res: Response): void => {
    if (res.correct === true) {
      setCorrectResponse(res);
    } else {
      // Handle an incorrect answer
    }

    setShowAnswer(true);
  };

  if (flashcards.length === 0) {
    return <div>Loading...</div>;
  }

  const TranslateButton = (): JSX.Element => {
    return (
      <Button
        variant="ghost"
        size="icon"
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

  const handleButtonVarianOnAnswer = (
    res: Response,
  ): ButtonProps["variant"] => {
    if (showAnswer) {
      if (res.text === correctResponse?.text) return "success";
      else return "mistake";
    }
    return "outline";
  };

  return (
    <Card
      className={cn("w-fit md:w-3/4 lg:w-2/4 overflow-auto p-4", className)}
      {...props}
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-center">
          {Boolean(flashcards[currentCard].img) && (
            <img
              src={flashcards[currentCard].img}
              alt="Flashcard"
              className="mb-4"
            />
          )}
        </div>
        <div className="flex gap-4">
          <p className="text-lg mb-4 font-medium leading-none break-words">
            {showTranslate
              ? flashcards[currentCard].ru
              : flashcards[currentCard].text}
          </p>
          <TranslateButton />
        </div>
      </CardContent>

      <CardFooter className="grid gap-4">
        {flashcards[currentCard].responses.map((response, index) => (
          <Button
            key={index}
            className="whitespace-normal break-words leading-1 h-auto"
            variant={handleButtonVarianOnAnswer(response)}
            onClick={() => {
              handleAnswer(response);
            }}
          >
            {showTranslate ? response.ru : response.text}
          </Button>
        ))}
        <Button
          onClick={handlePrevCard}
          disabled={currentCard === 0}
          variant={"secondary"}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextCard}
          disabled={currentCard === flashcards.length - 1}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
