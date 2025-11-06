import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const Final = () => {
  const navigate = useNavigate();
  const premio = 2690;
  const [aceitouTermos, setAceitouTermos] = useState(false);

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
            <Card className="w-full max-w-3xl p-10 shadow-lg border-2 animate-in fade-in zoom-in duration-500">
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-[#00c853] rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>

                <h1 className="text-3xl font-bold">Parabéns!</h1>

                <p className="text-base leading-relaxed">
                  O seu perfil foi <span className="font-bold">aprovado</span> para participar do programa de testes da SHEIN e você acaba de ganhar{" "}
                  <span className="font-bold">R$ 2.690,00 em prêmios</span> exclusivos da marca, incluindo Roupas ou Maquiagens.
                </p>

                <div className="bg-[#fff3cd] border-2 border-dashed border-[#ffa500] rounded-lg p-6 space-y-3">
                  <h3 className="font-bold text-[#dc2626] text-lg">
                    A única condição para o recebimento do prêmio é:
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-800">
                    Após a premiação chegar em sua residência, você receberá um link de avaliação em seu e-mail, onde você deverá enviar uma avaliação 5 estrelas e se possível, tirar 2 fotos com os itens ou gravar um vídeo de até 10 segundos falando bem dos nossos produtos.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm">
                  <input 
                    type="checkbox" 
                    id="termos" 
                    checked={aceitouTermos}
                    onChange={(e) => setAceitouTermos(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                  />
                  <label htmlFor="termos" className="text-gray-600 cursor-pointer">
                    Concordo com os termos acima.
                  </label>
                </div>

                <Button 
                  onClick={() => navigate("/escolha")}
                  disabled={!aceitouTermos}
                  className="bg-[#00c853] hover:bg-[#00a844] text-white px-10 py-3 text-base font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  ESCOLHER PREMIAÇÃO
                </Button>
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

export default Final;
