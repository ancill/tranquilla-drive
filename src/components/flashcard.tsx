import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Response {
  correct?: boolean
  text: string
}

interface FlashcardSet {
  img?: string
  responses: Response[]
  text: string
}
type FlashcardProps = React.ComponentProps<typeof Card>
export default function Flashcard({ className, ...props }: FlashcardProps) {
  const [flashcards, setFlashcards] = useState<FlashcardSet[]>([])
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
    <Card className={cn("w-3/4 overflow-auto p-4", className)} {...props}>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-center">
          {flashcards[currentCard].img && (
            <img
              src={flashcards[currentCard].img}
              alt="Flashcard"
              className="mb-4"
            />
          )}
        </div>

        <p className="text-lg mb-4 font-medium leading-none break-words ">
          {flashcards[currentCard].text}
        </p>
      </CardContent>

      <CardFooter className="grid gap-4">
        {flashcards[currentCard].responses.map((response, index) => (
          <Button
            key={index}
            className="whitespace-normal break-words leading-1 h-auto"
            variant={showAnswer && response.correct ? "destructive" : "outline"}
            onClick={() => handleAnswer(!!response.correct)}
          >
            {response.text}
          </Button>
        ))}
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
  )
}
