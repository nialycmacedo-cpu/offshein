import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sheinLogo from "@/assets/shein-logo-custom.png";
import kitLooks from "@/assets/kit-looks.png";
import kitMaquiagens from "@/assets/kit-maquiagens.png";
import { useNavigate } from "react-router-dom";

const Escolha = () => {
  const navigate = useNavigate();
  const [selectedKit, setSelectedKit] = useState<'looks' | 'maquiagens' | null>(null);
  const [displayPremio, setDisplayPremio] = useState(2690);

  const targetPremio = 2690;

  // Anima o contador de prêmios
  useEffect(() => {
    let startPremio = 2223.87;
    const difference = targetPremio - startPremio;
    const duration = 1500; // 1.5s
    const steps = 60;
    const increment = difference / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayPremio(targetPremio);
        clearInterval(timer);
      } else {
        startPremio += increment;
        setDisplayPremio(startPremio);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

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
              <p className="text-xl font-bold transition-all duration-300">
                R$ {displayPremio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 py-8">
            <h2 className="text-xl font-semibold text-center">
              Escolha os itens do seu prêmio:
            </h2>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
              {/* Kit Looks */}
              <Card className={`flex-1 border-2 border-dashed p-6 space-y-4 bg-white transition-all ${
                selectedKit === 'looks' ? 'border-[#00c853] bg-green-50' : 'border-gray-400'
              }`}>
                <div className="flex justify-center">
                  <img 
                    src={kitLooks} 
                    alt="Looks variados (roupas)" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-base">
                    Looks variados (roupas)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Valor de até R$ 2.690,00
                  </p>
                </div>
                <Button 
                  onClick={() => setSelectedKit('looks')}
                  className={`w-full py-2.5 rounded-md text-sm font-semibold ${
                    selectedKit === 'looks' 
                      ? 'bg-[#00c853] hover:bg-[#00a844] text-white' 
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  {selectedKit === 'looks' ? '✓ SELECIONADO' : 'SELECIONAR'}
                </Button>
              </Card>

              <div className="flex items-center justify-center text-gray-400 font-semibold">
                OU
              </div>

              {/* Kit Maquiagens */}
              <Card className={`flex-1 border-2 border-dashed p-6 space-y-4 bg-white transition-all ${
                selectedKit === 'maquiagens' ? 'border-[#00c853] bg-green-50' : 'border-gray-400'
              }`}>
                <div className="flex justify-center">
                  <img 
                    src={kitMaquiagens} 
                    alt="Kits Maquiagens (NOVO)" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-base">
                    Kits Maquiagens (NOVO)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Valor de até R$ 2.690,00
                  </p>
                </div>
                <Button 
                  onClick={() => setSelectedKit('maquiagens')}
                  className={`w-full py-2.5 rounded-md text-sm font-semibold ${
                    selectedKit === 'maquiagens' 
                      ? 'bg-[#00c853] hover:bg-[#00a844] text-white' 
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  {selectedKit === 'maquiagens' ? '✓ SELECIONADO' : 'SELECIONAR'}
                </Button>
              </Card>
            </div>

            {selectedKit && (
              <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button 
                  onClick={() => navigate("/dados-pix", { state: { kitType: selectedKit } })}
                  className="w-full bg-[#00c853] hover:bg-[#00a844] text-white py-3 text-base font-bold rounded-md"
                >
                  CONFIRMAR
                </Button>
              </div>
            )}
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

export default Escolha;
