import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useLocation, useNavigate } from "react-router-dom";

const TamanhoKit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const kitType = location.state?.kitType || 'looks';
  const premio = 2690;
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null);

  const tamanhos = ['PP', 'P', 'M', 'G', 'GG'];

  const handleConfirm = () => {
    if (tamanhoSelecionado) {
      navigate('/categorias-looks');
    }
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
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-bold">
                    Escolha o tamanho das peças do seu kit:
                  </h2>
                </div>

                <div className="space-y-3">
                  {tamanhos.map((tamanho) => (
                    <Button
                      key={tamanho}
                      onClick={() => setTamanhoSelecionado(tamanho)}
                      className={`w-full py-3 text-base font-semibold rounded-md transition-all ${
                        tamanhoSelecionado === tamanho
                          ? 'bg-[#00c853] hover:bg-[#00a844] text-white'
                          : 'bg-black hover:bg-gray-800 text-white'
                      }`}
                    >
                      {tamanho}
                    </Button>
                  ))}
                </div>

                {tamanhoSelecionado && (
                  <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Button
                      onClick={handleConfirm}
                      className="w-full bg-[#00c853] hover:bg-[#00a844] text-white py-3 text-base font-bold rounded-md"
                    >
                      CONFIRMAR
                    </Button>
                  </div>
                )}
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

export default TamanhoKit;
