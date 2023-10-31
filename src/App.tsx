import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Response {
  correct?: boolean
  text: string
}

interface Flashcard {
  img?: string
  responses: Response[]
  text: string
}

function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentCard, setCurrentCard] = useState<number>(0)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data.json")
        const data = await response.json()
        setFlashcards(data.questions)
      } catch (error) {
        console.error("Error loading flashcard data:", error)
      }
    }
    fetchData()
  }, [])

  const handleNextCard = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % flashcards.length)
    setShowAnswer(false)
  }

  const handlePrevCard = () => {
    setCurrentCard(
      (prevCard) => (prevCard - 1 + flashcards.length) % flashcards.length
    )
    setShowAnswer(false)
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      // Handle a correct answer
    } else {
      // Handle an incorrect answer
    }

    setShowAnswer(true)
  }

  if (flashcards.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4">Flashcard Game</h1>
      <div className="bg-white p-6 rounded shadow-md w-96">
        <div className="flashcard">
          {flashcards[currentCard].img && (
            <img
              src={flashcards[currentCard].img}
              alt="Flashcard"
              className="mb-4"
            />
          )}
          <p className="text-lg mb-4">{flashcards[currentCard].text}</p>
          <div className="response-options">
            {flashcards[currentCard].responses.map((response, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(!!response.correct)}
                className={`px-4 py-2 rounded border ${
                  showAnswer && response.correct ? "bg-green-300" : ""
                }`}
              >
                {response.text}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevCard}
            disabled={currentCard === 0}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextCard}
            disabled={currentCard === flashcards.length - 1}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
          >
            Next
          </button>
          <Button>Click me</Button>
        </div>
      </div>
    </div>
  )
}

export default App
