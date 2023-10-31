import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

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
      <Card className="">
        <CardContent className="grid gap-4">
          <div className="flex items-center mt-4">
            {flashcards[currentCard].img && (
              <img
                src={flashcards[currentCard].img}
                alt="Flashcard"
                className="mb-4"
              />
            )}
          </div>

          <p className="text-lg mb-4 font-medium leading-none">
            {flashcards[currentCard].text}
          </p>
          <div className="flex gap-2">
            {flashcards[currentCard].responses.map((response, index) => (
              <Button
                key={index}
                variant={
                  showAnswer && response.correct ? "destructive" : "outline"
                }
                onClick={() => handleAnswer(!!response.correct)}
              >
                {response.text}
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            onClick={handlePrevCard}
            disabled={currentCard === 0}
            variant={"outline"}
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
    </div>
  )
}

export default App
