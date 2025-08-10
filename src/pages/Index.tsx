import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { QUESTIONS, type Question, type Difficulty } from "@/data/questions";
import Globe from "@/components/Globe";
import QuestionCountPicker from "@/components/QuestionCountPicker";
import FeedbackCard from "@/components/FeedbackCard";
import auFlag from "@/assets/flags/au.png";
import brFlag from "@/assets/flags/br.png";
import caFlag from "@/assets/flags/ca.png";
import deFlag from "@/assets/flags/de.png";
import frFlag from "@/assets/flags/fr.png";
import jpFlag from "@/assets/flags/jp.png";

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
  const [started, setStarted] = useState(false);
  const maxQuestions = useMemo(() => QUESTIONS.filter(q => q.difficulty === difficulty).length, [difficulty]);
  const [questionCount, setQuestionCount] = useState<number>(() => Math.min(10, QUESTIONS.filter(q => q.difficulty === "easy").length));

  const gameOver = current >= questions.length;

  const startNewGame = (diff: Difficulty, count = questionCount) => {
    const pool = QUESTIONS.filter(q => q.difficulty === diff);
    const picks = shuffle(pool).slice(0, Math.min(count, pool.length));
    setQuestions(picks);
    setCurrent(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setStarted(true);
  };

  useEffect(() => {
    // SEO title
    document.title = "Geography Quiz Game – Countries, Capitals, Flags";
  }, []);

  useEffect(() => {
    // Clamp question count when difficulty changes
    setQuestionCount((c) => Math.min(c, maxQuestions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxQuestions]);

  useEffect(() => {
    if (!started) return;
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("geoquiz_highscore", String(score));
        toast({ title: "New high score!", description: `You scored ${score} points.`, });
      } else {
        toast({ title: "Round complete", description: `Your score: ${score}/${questions.length}` });
      }
    }
  }, [gameOver, score, highScore, questions.length, toast, started]);

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
          <div className="relative mb-8 h-56 rounded-xl overflow-hidden border">
            <Globe />
          </div>
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
              {!started && (
                <article className="animate-fade-in">
                  <div className="grid grid-cols-6 gap-2 mb-4">
                    <img src={jpFlag} alt="Japan flag mosaic" loading="lazy" className="h-10 w-full object-cover rounded" />
                    <img src={brFlag} alt="Brazil flag mosaic" loading="lazy" className="h-10 w-full object-cover rounded" />
                    <img src={deFlag} alt="Germany flag mosaic" loading="lazy" className="h-10 w-full object-cover rounded" />
                    <img src={auFlag} alt="Australia flag mosaic" loading="lazy" className="h-10 w-full object-cover rounded" />
                    <img src={frFlag} alt="France flag mosaic" loading="lazy" className="h-10 w-full object-cover rounded" />
                    <img src={caFlag} alt="Canada flag mosaic" loading="lazy" className="h-10 w-full object-cover rounded" />
                  </div>
                  <div className="rounded-lg border p-4 bg-card">
                    <p className="mb-2 text-sm text-muted-foreground">
                      Select number of questions: <span className="font-medium text-foreground">{questionCount}</span> / {maxQuestions}
                    </p>
                    <QuestionCountPicker value={questionCount} onChange={setQuestionCount} max={maxQuestions} />
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">High score: {highScore}</div>
                      <Button variant="hero" onClick={() => startNewGame(difficulty, questionCount)}>Start game</Button>
                    </div>
                  </div>
                </article>
              )}

              {!gameOver && currentQuestion && started && (
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
                    <FeedbackCard
                      isCorrect={selected === currentQuestion.correctIndex}
                      title={selected === currentQuestion.correctIndex ? 'Correct!' : `Answer: ${currentQuestion.options[currentQuestion.correctIndex]}`}
                      fact={currentQuestion.fact}
                      imageSrc={currentQuestion.imageSrc}
                    />
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">High score: {highScore}</div>
                    <Button variant={answered ? 'hero' : 'outline'} onClick={next} disabled={!answered}>
                      {current + 1 === questions.length ? 'See results' : 'Next question'}
                    </Button>
                  </div>
                </article>
              )}

              {gameOver && started && (
                <div className="text-center py-8">
                  <p className="text-2xl font-semibold mb-1">Round complete!</p>
                  <p className="text-muted-foreground mb-6">You scored {score} / {questions.length}</p>
                  <div className="flex items-center justify-center gap-3">
                    <Button variant="hero" onClick={() => startNewGame(difficulty, questionCount)}>Play again</Button>
                    <Button variant="outline" onClick={() => { setDifficulty('easy'); startNewGame('easy', questionCount); }}>Reset to Easy</Button>
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
