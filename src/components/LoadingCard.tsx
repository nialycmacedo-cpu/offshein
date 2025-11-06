import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import sheinLogo from "@/assets/shein-logo.png";

interface LoadingCardProps {
  onComplete: () => void;
}

export const LoadingCard = ({ onComplete }: LoadingCardProps) => {
  const [progress, setProgress] = useState(11);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 2, 100));
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [progress, onComplete]);

  useEffect(() => {
    const stepTimer = setTimeout(() => {
      if (step < 1) {
        setStep(prev => prev + 1);
      }
    }, 2000);

    return () => clearTimeout(stepTimer);
  }, [step]);

  return (
    <Card className="w-full max-w-md p-8 shadow-lg border-2 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        
        <h2 className="text-xl font-semibold text-center">
          {step === 0 ? "Garantindo conexão segura..." : "Verificando vagas restantes para promoção..."}
        </h2>

        <div className="w-full space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white px-3 py-1 rounded text-sm font-bold">
              {progress}%
            </div>
            <Progress value={progress} className="flex-1" />
          </div>
        </div>

        {step === 1 && (
          <p className="text-sm text-muted-foreground text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
            Verificando vagas restantes para promoção...
          </p>
        )}
      </div>
    </Card>
  );
};
