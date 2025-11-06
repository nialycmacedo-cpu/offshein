import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const Verificacao = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [premio, setPremio] = useState(99);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Anima a barra de progresso e o dinheiro sincronizados
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setShowSuccess(true), 800);
          return 100;
        }
        const newProgress = prev + 1;
        // Calcula o prêmio proporcional ao progresso (0% = R$0, 100% = R$100)
        setPremio(Math.floor(newProgress));
        return newProgress;
      });
    }, 80); // Mais lento: 80ms por incremento (total ~8 segundos)

    return () => clearInterval(progressInterval);
  }, []);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background p-4 pt-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-start">
            <img 
              src={sheinLogo} 
              alt="Shein Premiações" 
              className="h-12 w-auto object-contain"
            />
            <div className="text-right">
              <p className="text-xs text-gray-600">Acumulado em prêmios:</p>
              <p className="text-2xl font-bold">R${premio}</p>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-2xl p-12 shadow-lg border-2 animate-in fade-in zoom-in duration-500">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 bg-[#00c853] rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>

                <h1 className="text-3xl font-bold">Excelente!</h1>

                <p className="text-base">
                  Sua região está apta para receber a{" "}
                  <span className="font-bold text-[#dc2626]">premiação SHEIN</span>
                </p>

                <Button 
                  onClick={() => navigate("/questionario")}
                  className="bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-3 text-sm font-bold rounded-md mt-4"
                >
                  IR PARA O QUESTIONÁRIO
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 pt-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <img 
            src={sheinLogo} 
            alt="Shein Premiações" 
            className="h-12 w-auto object-contain"
          />
          <div className="text-right">
            <p className="text-xs text-gray-600">Acumulado em prêmios:</p>
            <p className="text-2xl font-bold">R${premio}</p>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-2xl p-12 shadow-lg border-2">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">
                Conferindo disponibilidade em sua região
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-black text-white px-4 py-1.5 rounded text-sm font-bold min-w-[60px] text-center">
                    {progress}%
                  </div>
                  <Progress value={progress} className="flex-1" />
                </div>
              </div>

              <p className="text-sm text-center text-[#dc2626]">
                Analisando banco de dados...
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verificacao;
