import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background p-4 pt-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-start">
          <img 
            src={sheinLogo} 
            alt="Shein Premiações" 
            className="h-12 w-auto object-contain"
          />
        </div>

        <Card className="w-full p-8 shadow-lg border-2">
          <div className="space-y-6">
            <div className="bg-[#fef3c7] border-2 border-[#f59e0b] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#00c853] rounded-full p-1 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">
                  Aproveite, você já{" "}
                  <span className="font-bold text-[#dc2626]">ganhou um cupom de R$ 100,00</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-base leading-relaxed">
                A Shein está selecionando{" "}
                <span className="font-bold">1.000 mulheres</span> de todo o Brasil para testar sua{" "}
                <span className="font-bold">nova coleção 2024/2025</span>.
              </p>

              <p className="text-base leading-relaxed">
                Sera distribuído{" "}
                <span className="font-bold">R$ 2.000,00 em roupas e maquiagens</span> para cada participante que passar na seleção para teste da Marca.
              </p>

              <p className="text-base leading-relaxed">
                Para saber se você está{" "}
                <span className="font-bold">qualificada á receber o prêmio</span>, você responderá um{" "}
                <span className="font-bold">questionário simples de 2 minutos</span> para uma rápida avaliação do seu perfil.
              </p>

              <p className="text-base leading-relaxed">
                Se você chegou até aqui, considere-se uma{" "}
                <span className="font-bold">pessoa de sorte</span>.
              </p>

              <p className="text-base leading-relaxed">
                Clique no botão abaixo se você{" "}
                <span className="font-bold">tem interesse em continuar</span>.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => navigate("/video")}
                className="bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-3 text-base font-bold rounded-lg"
              >
                🏆 COMEÇAR
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Inicio;
