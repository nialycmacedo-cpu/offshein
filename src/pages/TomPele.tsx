import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const TomPele = () => {
  const navigate = useNavigate();
  const premio = 2690;
  const [tomSelecionado, setTomSelecionado] = useState<number | null>(null);

  // Definir os tons de pele em uma matriz 4x4
  const tonsPele = [
    // Linha 1 - Tons mais claros
    ["#fde8d7", "#f9dcc4", "#f5d0b1", "#f0c49e"],
    // Linha 2 - Tons médio-claros
    ["#d8a574", "#cd9763", "#c38952", "#b87b41"],
    // Linha 3 - Tons médio-escuros
    ["#a86f3f", "#9d6136", "#92532d", "#874524"],
    // Linha 4 - Tons mais escuros
    ["#7c3a1b", "#6f3019", "#5d2817", "#4a2015"],
  ];

  const handleConfirm = () => {
    if (tomSelecionado !== null) {
      navigate('/verificacao-final');
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
                  <h2 className="text-lg font-bold text-[#2563eb]">
                    Selecione seu tom
                  </h2>
                  <h3 className="text-base font-bold text-[#2563eb]">
                    de pele ideal:
                  </h3>
                </div>

                <div className="flex justify-center">
                  <div className="grid grid-cols-4 gap-3">
                    {tonsPele.map((linha, linhaIndex) =>
                      linha.map((cor, colIndex) => {
                        const index = linhaIndex * 4 + colIndex;
                        const isSelected = tomSelecionado === index;
                        return (
                          <button
                            key={index}
                            onClick={() => setTomSelecionado(index)}
                            className={`w-12 h-12 rounded-full transition-all hover:scale-110 ${
                              isSelected 
                                ? 'ring-4 ring-black ring-offset-2' 
                                : 'hover:ring-2 hover:ring-gray-400'
                            }`}
                            style={{ backgroundColor: cor }}
                            aria-label={`Tom de pele ${index + 1}`}
                          />
                        );
                      })
                    )}
                  </div>
                </div>

                {tomSelecionado !== null && (
                  <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Button
                      onClick={handleConfirm}
                      className="w-full bg-[#00c853] hover:bg-[#00a844] text-white py-3 text-sm font-bold rounded-md"
                    >
                      ✓ Confirmar
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

export default TomPele;
