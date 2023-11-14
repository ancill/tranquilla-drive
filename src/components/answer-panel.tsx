import { CrossIcon, FlagIcon, ShareIcon } from "lucide-react";

export const AnswerPanel = ({ isOpen }: { isOpen: boolean }): JSX.Element => {
  // Determine the appropriate styles for the side panel based on its open state
  const panelStyles = isOpen
    ? "transform -translate-y-20 ease-out"
    : "transform translate-y-full ease-in";

  const answer = "hello";
  return (
    <div className="w-full relative ">
      <div
        className={`flex flex-col gap-6 p-4 rounded-md absolute z-20 inset-x-0 -bottom-20 w-full h-48 bg-background shadow-lg overflow-auto transition-transform duration-300 ${panelStyles}`}
      >
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <CrossIcon />
            <h3>Incorrect</h3>
          </div>
          <div className="flex gap-2">
            <ShareIcon />
            <FlagIcon />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Correct answer:</div>
          <div>{answer}</div>
        </div>
      </div>
    </div>
  );
};
