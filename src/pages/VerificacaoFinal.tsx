import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const VerificacaoFinal = () => {
  const navigate = useNavigate();
  const premio = 2690;

  const handleContinue = () => {
    navigate('/dados-frete');
  };

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

          <div className="flex items-center justify-center min-h-[500px]">
            <Card className="w-full max-w-xl p-8 shadow-lg border-2 border-gray-300 rounded-2xl">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-[#00c853]" />
                </div>

                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    Escolha de kit concluída!
                  </h2>
                </div>

                <div className="text-center text-sm text-gray-700">
                  <p>
                    Toque no{" "}
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00c853] text-white text-xs font-bold mx-1">
                      ▶
                    </span>{" "}
                    para reproduzir o
                  </p>
                  <p>vídeo e seguir as instruções!</p>
                </div>

                <div className="flex justify-center">
                  <video
                    controls
                    preload="metadata"
                    className="w-48 h-auto rounded-lg border-2 border-gray-300 bg-white"
                  >
                    <source src="/video/verificacao-final.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>

                <div className="text-center text-sm space-y-2">
                  <p className="text-gray-700">
                    Ao clicar no botão abaixo você será{" "}
                    <span className="font-bold text-[#dc2626]">redirecionada</span>
                  </p>
                  <p className="text-gray-700">
                    para o{" "}
                    <span className="font-bold text-[#dc2626]">preenchimento de dados</span> do{" "}
                    <span className="font-bold text-[#dc2626]">
                      <br />
                      frete
                    </span>{" "}
                    com nosso parceiro{" "}
                    <span className="font-bold text-[#dc2626]">terceirizado</span>.
                  </p>
                </div>

                <Button
                  onClick={handleContinue}
                  className="w-full bg-[#00c853] hover:bg-[#00a844] text-white py-3 text-sm font-bold rounded-md"
                >
                  ▶ Escolher frete
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <footer className="bg-[#374151] text-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs space-y-1">
          <p>© 2025 Shein. Todas as marcas foram usadas.</p>
          <p>Este é uma promoção oficial da Shein Brasil.</p>
        </div>
      </footer>
    </div>
  );
};

export default VerificacaoFinal;
