import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface FeedbackCardProps {
  isCorrect: boolean;
  title: string;
  fact: string;
  imageSrc?: string;
}

export default function FeedbackCard({ isCorrect, title, fact, imageSrc }: FeedbackCardProps) {
  const Icon = isCorrect ? CheckCircle2 : XCircle;
  const iconClass = isCorrect ? "text-primary" : "text-destructive";
  return (
    <Card className="animate-enter overflow-hidden">
      <CardContent className="flex items-center gap-3 p-3">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={`${title} educational graphic`}
          loading="lazy"
          className="h-14 w-14 rounded-md object-cover border"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${iconClass}`} />
            <p className="font-medium">{title}</p>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{fact}</p>
        </div>
      </CardContent>
    </Card>
  );
}
