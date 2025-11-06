import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import sheinLogo from "@/assets/shein-logo-custom.png";

export const SuccessCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-md p-8 shadow-lg border-2 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center gap-6 text-center">
        <img 
          src={sheinLogo} 
          alt="Shein Premiações" 
          className="h-16 w-auto object-contain"
        />
        
        <h1 className="text-2xl font-semibold">Tudo pronto!</h1>

        <div className="w-full bg-[#6b7280] text-white rounded-xl p-6 space-y-3">
          <p className="text-sm font-semibold leading-tight">
            🎯 O BOTÃO "RESPONDER QUESTIONÁRIO" APARECEU PRA VOCÊ?
          </p>
          
          <p className="text-sm font-semibold leading-tight">
            ✨ APROVEITE! RESTAM APENAS 5 VAGAS PARA O FORMULÁRIO PREMIADO!
          </p>
          
          <p className="text-sm font-semibold leading-tight">
            🔥 ÚLTIMOS 5 ACESSOS RESTANTES AO QUESTIONÁRIO!
          </p>
          
          <p className="text-xs font-normal pt-2">
            Após isso a promoção será encerrada!
          </p>
        </div>

        <div className="w-full space-y-3">
          <p className="text-sm">
            Clique no botão abaixo para prosseguir!
          </p>
          
          <Button 
            onClick={() => navigate("/inicio")}
            className="w-full h-12 text-base font-bold bg-[#00c853] hover:bg-[#00a844] text-white rounded-lg"
          >
            RESPONDER QUESTIONÁRIO →
          </Button>
        </div>
      </div>
    </Card>
  );
};
