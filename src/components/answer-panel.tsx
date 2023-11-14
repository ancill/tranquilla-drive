import { FlagIcon, ShareIcon, ThumbsUp, XCircle } from "lucide-react";
import { type Answer } from "./flashcard";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
export const AnswerPanel = ({
  isOpen,
  selectedAnswer,
  correctAnswer,
}: {
  isOpen: boolean;
  selectedAnswer?: Answer;
  correctAnswer?: Answer;
}): JSX.Element => {
  const isCorrect = selectedAnswer?.correct === true;

  return selectedAnswer !== undefined ? (
    <div className="w-full relative">
      <div
        className={cn(
          "text-red-500 flex flex-col gap-2 p-4 rounded-md absolute z-20 inset-x-0 -bottom-20 w-full h-48 bg-background shadow-lg overflow-auto transition-transform duration-300",
          isOpen
            ? "transform -translate-y-20 ease-out"
            : "transform translate-y-full ease-in",
          isCorrect && "text-primary",
        )}
      >
        <div className="flex justify-between ">
          <div className="flex gap-2">
            {isCorrect ? <ThumbsUp /> : <XCircle />}
            <div className="font-semibold">
              {isCorrect ? "Correct" : "Incorrect"}
            </div>
          </div>
          <div className="flex gap-2">
            <ShareIcon />
            <FlagIcon />
          </div>
        </div>
        {!isCorrect && (
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Correct answer:</div>
            <div className="font-normal">{correctAnswer?.text}</div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};
