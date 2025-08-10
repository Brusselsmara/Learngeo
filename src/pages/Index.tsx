import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { QUESTIONS, QUESTIONS_PER_GAME, type Question, type Difficulty } from "@/data/questions";

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Index = () => {
  const { toast } = useToast();
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const s = localStorage.getItem("geoquiz_highscore");
    return s ? Number(s) : 0;
  });
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const gameOver = current >= questions.length;

  const startNewGame = (diff: Difficulty) => {
    const pool = QUESTIONS.filter(q => q.difficulty === diff);
    const picks = shuffle(pool).slice(0, Math.min(QUESTIONS_PER_GAME, pool.length));
    setQuestions(picks);
    setCurrent(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
  };

  useEffect(() => {
    // SEO title
    document.title = "Geography Quiz Game – Countries, Capitals, Flags";
    startNewGame(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startNewGame(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("geoquiz_highscore", String(score));
        toast({ title: "New high score!", description: `You scored ${score} points.`, });
      } else {
        toast({ title: "Round complete", description: `Your score: ${score}/${questions.length}` });
      }
    }
  }, [gameOver, score, highScore, questions.length, toast]);

  const currentQuestion = useMemo(() => questions[current], [questions, current]);

  const selectOption = (index: number) => {
    if (answered || gameOver || !currentQuestion) return;
    setSelected(index);
    const isCorrect = index === currentQuestion.correctIndex;
    setAnswered(true);
    if (isCorrect) {
      setScore(s => s + 1);
      toast({ title: "Correct!", description: currentQuestion.fact });
    } else {
      const correct = currentQuestion.options[currentQuestion.correctIndex];
      toast({ title: "Not quite", description: `Answer: ${correct}. ${currentQuestion.fact}`, variant: "destructive" });
    }
  };

  const next = () => {
    if (!answered) return;
    setCurrent(i => i + 1);
    setAnswered(false);
    setSelected(null);
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto py-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Geography Quiz Game</h1>
          <p className="text-muted-foreground">Countries, capitals, flags, and landmarks — test yourself and learn as you play.</p>
        </header>

        <div className="mx-auto max-w-3xl">
          <Card className="shadow-elevated">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl">Choose difficulty</CardTitle>
                <Tabs value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
                  <TabsList>
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {!gameOver && currentQuestion && (
                <article>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>Question {current + 1} / {questions.length}</span>
                    <span>Score: {score}</span>
                  </div>

                  <div className="rounded-lg border p-4 mb-4 bg-card">
                    <p className="text-lg font-semibold mb-3">{currentQuestion.prompt}</p>
                    {currentQuestion.imageSrc && (
                      <img src={currentQuestion.imageSrc} alt={currentQuestion.imageAlt || 'Question image'} loading="lazy" className="mx-auto h-28 object-contain mb-3" />
                    )}
                    <div className="grid md:grid-cols-2 gap-3">
                      {currentQuestion.options.map((opt, idx) => {
                        const isCorrect = idx === currentQuestion.correctIndex;
                        const isSelected = idx === selected;
                        const variant = answered
                          ? isSelected && isCorrect
                            ? 'success'
                            : isSelected && !isCorrect
                              ? 'destructive'
                              : 'outline'
                          : 'secondary';
                        return (
                          <Button key={idx} variant={variant as any} onClick={() => selectOption(idx)} disabled={answered}>
                            {opt}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {answered && (
                    <div className="rounded-md bg-secondary p-3 text-sm">
                      <p className="mb-1 font-medium">{selected === currentQuestion.correctIndex ? 'Correct!' : `Answer: ${currentQuestion.options[currentQuestion.correctIndex]}`}</p>
                      <p className="text-muted-foreground">{currentQuestion.fact}</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">High score: {highScore}</div>
                    <Button variant={answered ? 'hero' : 'outline'} onClick={next} disabled={!answered}>
                      {current + 1 === questions.length ? 'See results' : 'Next question'}
                    </Button>
                  </div>
                </article>
              )}

              {gameOver && (
                <div className="text-center py-8">
                  <p className="text-2xl font-semibold mb-1">Round complete!</p>
                  <p className="text-muted-foreground mb-6">You scored {score} / {questions.length}</p>
                  <div className="flex items-center justify-center gap-3">
                    <Button variant="hero" onClick={() => startNewGame(difficulty)}>Play again</Button>
                    <Button variant="outline" onClick={() => startNewGame('easy')}>Reset to Easy</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Sharpen your map skills one question at a time.
        </footer>
      </section>
    </main>
  );
};

export default Index;
