import { useEffect, useState } from "react";

export function StarWarsCard(): JSX.Element {
  return <div></div>;
}

interface CounterButtonProps {
  readonly notificationClick: () => void;
}
export function CounterButton({
  notificationClick,
}: CounterButtonProps): JSX.Element {
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <button
      onClick={() => {
        setClicked(!clicked);
        notificationClick();
      }}
      className="bg-red-400 rounded-lg p-2 text-lg text-white hover:bg-red-200 w-24 focus:bg-red-400"
    >
      {clicked ? "Pressed" : "Press me"}
    </button>
  );
}
export function Counter(): JSX.Element {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (count === 5) {
      setShowMessage(true);
    }
  }, [count]);

  return (
    <div className="flex flex-col gap-5">
      {showMessage && <div>YOU CLICKED 5 times</div>}

      <div className="font-bold text-lg text-white items-center justify-center flex">
        {count}
      </div>
      <CounterButton
        notificationClick={() => {
          setCount(count + 1);
        }}
      />
    </div>
  );
}
