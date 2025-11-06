import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const CoresLooks = () => {
  const navigate = useNavigate();
  const premio = 2690;
  
  const [coresSelecionadas, setCoresSelecionadas] = useState<string[]>([]);

  const cores = [
    { id: 'branco', nome: 'Branco', cor: '#FFFFFF', borda: true },
    { id: 'preto', nome: 'Preto', cor: '#000000' },
    { id: 'vermelho', nome: 'Vermelho', cor: '#FF0000' },
    { id: 'azul', nome: 'Azul', cor: '#0000FF' },
    { id: 'verde', nome: 'Verde', cor: '#00FF00' },
    { id: 'amarelo', nome: 'Amarelo', cor: '#FFD700' },
    { id: 'cinza', nome: 'Cinza', cor: '#808080' },
    { id: 'marrom', nome: 'Marrom', cor: '#8B4513' },
    { id: 'beige', nome: 'Beige', cor: '#F5F5DC', borda: true },
    { id: 'rosa', nome: 'Rosa', cor: '#FFC0CB' },
    { id: 'roxo', nome: 'Roxo', cor: '#800080' },
    { id: 'laranja', nome: 'Laranja', cor: '#FFA500' },
    { id: 'vinho', nome: 'Vinho', cor: '#722F37' },
    { id: 'azul-marinho', nome: 'Azul-marinho', cor: '#000080' },
    { id: 'lilas', nome: 'Lilás', cor: '#C8A2C8' },
  ];

  const toggleCor = (corId: string) => {
    setCoresSelecionadas(prev => 
      prev.includes(corId) 
        ? prev.filter(id => id !== corId)
        : [...prev, corId]
    );
  };

  const hasSelection = coresSelecionadas.length > 0;

  const handleConfirm = () => {
    if (hasSelection) {
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
                <div className="text-center">
                  <h2 className="text-lg font-bold text-[#2563eb]">
                    Escolha suas cores preferidas
                  </h2>
                  <h3 className="text-base font-bold text-[#2563eb]">
                    para os Looks:
                  </h3>
                </div>

                <div className="space-y-3">
                  {cores.map((cor) => (
                    <div key={cor.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={cor.id}
                        checked={coresSelecionadas.includes(cor.id)}
                        onCheckedChange={() => toggleCor(cor.id)}
                      />
                      <div 
                        className={`w-6 h-6 rounded-full ${cor.borda ? 'border-2 border-gray-300' : ''}`}
                        style={{ backgroundColor: cor.cor }}
                      />
                      <label 
                        htmlFor={cor.id} 
                        className="text-sm cursor-pointer flex-1"
                      >
                        {cor.nome}
                      </label>
                    </div>
                  ))}
                </div>

                {hasSelection && (
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

export default CoresLooks;
