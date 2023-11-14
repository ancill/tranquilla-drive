import { FlagIcon, ShareIcon, ThumbsUp, XCircle } from "lucide-react";
import { Answer } from "./flashcard";
import { cn } from "@/lib/utils";
export const AnswerPanel = ({
  isOpen,
  answer,
}: {
  isOpen: boolean;
  answer?: Answer;
}): JSX.Element => {
  const isCorrect = answer?.correct;
  console.log(answer);
  return (
    <div className="w-full relative">
      <div
        className={cn(
          "text-red-500 flex flex-col gap-6 p-4 rounded-md absolute z-20 inset-x-0 -bottom-20 w-full h-48 bg-background shadow-lg overflow-auto transition-transform duration-300",
          isOpen
            ? "transform -translate-y-20 ease-out"
            : "transform translate-y-full ease-in",
          isCorrect && "text-primary",
        )}
      >
        <div className="flex justify-between ">
          <div className="flex gap-2">
            {isCorrect ? <ThumbsUp /> : <XCircle />}
            <h3>{isCorrect ? "Correct" : "Incorrect"}</h3>
          </div>
          <div className="flex gap-2">
            <ShareIcon />
            <FlagIcon />
          </div>
        </div>
        {!isCorrect && (
          <div className="flex flex-col gap-2">
            <div>Correct answer:</div>
            <div>{answer?.text}</div>
          </div>
        )}
      </div>
    </div>
  );
};
