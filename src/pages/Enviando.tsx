import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const Enviando = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(13);
  const [premio, setPremio] = useState(2223.87);

  useEffect(() => {
    // Anima a barra de progresso e o prêmio sincronizados
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            navigate("/final");
          }, 800);
          return 100;
        }
        const newProgress = prev + 1;
        // Calcula o prêmio proporcional (13% = R$2223.87, 100% = R$2690)
        const premioInicial = 2223.87;
        const premioFinal = 2690;
        const progressRange = 100 - 13;
        const premioRange = premioFinal - premioInicial;
        const currentPremio = premioInicial + ((newProgress - 13) / progressRange) * premioRange;
        setPremio(Math.max(premioInicial, currentPremio));
        return newProgress;
      });
    }, 80);

    return () => clearInterval(progressInterval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-4 pt-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-start">
            <img 
              src={sheinLogo} 
              alt="Shein Premiações" 
              className="h-10 w-auto object-contain"
            />
            <div className="text-right">
              <p className="text-xs text-gray-600">Acumulado em prêmios:</p>
              <p className="text-xl font-bold">
                R$ {premio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-2xl p-12 shadow-lg border-2">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-center">
                  Enviando suas respostas
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-black text-white px-4 py-1.5 rounded text-sm font-bold min-w-[60px] text-center">
                      {progress}%
                    </div>
                    <Progress value={progress} className="flex-1" />
                  </div>
                </div>

                <p className="text-sm text-center text-[#2563eb]">
                  Analisando seu perfil...
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <footer className="bg-[#374151] text-white py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold">SHEIN Brasil Copyright 2025</p>
            <p className="text-xs">Todos os direitos reservados.</p>
            <div className="flex justify-center gap-6 text-xs pt-2">
              <a href="#" className="hover:underline">Políticas de privacidade</a>
              <a href="#" className="hover:underline">Termos de uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Enviando;
