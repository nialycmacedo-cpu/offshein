import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const CategoriasKit = () => {
  const navigate = useNavigate();
  const premio = 2690;
  
  const [todosSelected, setTodosSelected] = useState(false);
  const [maquiagemOlhos, setMaquiagemOlhos] = useState({
    paletasSombras: false,
    delineadoresGel: false,
    rimel: false,
    delineadoresLiquidos: false,
    sombrasSticks: false,
    sombrasOlhos: false,
  });
  const [maquiagemRosto, setMaquiagemRosto] = useState({
    base: false,
    corretivo: false,
    blush: false,
    iluminador: false,
    po: false,
    contornoBronze: false,
    sprayFixacao: false,
    primer: false,
  });
  const [labios, setLabios] = useState({
    batom: false,
    brilhoLabial: false,
    delineadorLabios: false,
    batomLiquido: false,
    lipPlumper: false,
    tinturaLabial: false,
  });

  const handleTodosChange = (checked: boolean) => {
    setTodosSelected(checked);
    if (checked) {
      // Seleciona todas as opções
      setMaquiagemOlhos({
        paletasSombras: true,
        delineadoresGel: true,
        rimel: true,
        delineadoresLiquidos: true,
        sombrasSticks: true,
        sombrasOlhos: true,
      });
      setMaquiagemRosto({
        base: true,
        corretivo: true,
        blush: true,
        iluminador: true,
        po: true,
        contornoBronze: true,
        sprayFixacao: true,
        primer: true,
      });
      setLabios({
        batom: true,
        brilhoLabial: true,
        delineadorLabios: true,
        batomLiquido: true,
        lipPlumper: true,
        tinturaLabial: true,
      });
    } else {
      // Desmarca todas as opções
      setMaquiagemOlhos({
        paletasSombras: false,
        delineadoresGel: false,
        rimel: false,
        delineadoresLiquidos: false,
        sombrasSticks: false,
        sombrasOlhos: false,
      });
      setMaquiagemRosto({
        base: false,
        corretivo: false,
        blush: false,
        iluminador: false,
        po: false,
        contornoBronze: false,
        sprayFixacao: false,
        primer: false,
      });
      setLabios({
        batom: false,
        brilhoLabial: false,
        delineadorLabios: false,
        batomLiquido: false,
        lipPlumper: false,
        tinturaLabial: false,
      });
    }
  };

  const hasSelection = () => {
    return todosSelected || 
      Object.values(maquiagemOlhos).some(v => v) ||
      Object.values(maquiagemRosto).some(v => v) ||
      Object.values(labios).some(v => v);
  };

  const handleConfirm = () => {
    if (hasSelection()) {
      navigate('/tom-pele');
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
                  <h2 className="text-lg font-bold text-[#dc2626]">
                    Escolha as categorias do seu kit:
                  </h2>
                </div>

                <div className="space-y-4 text-sm">
                  {/* Todos/Misto */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Todos/Misto</h3>
                    <div className="flex items-center space-x-2 ml-4">
                      <Checkbox
                        id="todos"
                        checked={todosSelected}
                        onCheckedChange={handleTodosChange}
                      />
                      <label htmlFor="todos" className="cursor-pointer">
                        Todos/Misto
                      </label>
                    </div>
                  </div>

                  {/* Maquiagem Olhos */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Maquiagem Olhos</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="paletasSombras"
                          checked={maquiagemOlhos.paletasSombras}
                          onCheckedChange={(checked) => {
                            setMaquiagemOlhos({...maquiagemOlhos, paletasSombras: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="paletasSombras" className="cursor-pointer">
                          Paletas de Sombras
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="delineadoresGel"
                          checked={maquiagemOlhos.delineadoresGel}
                          onCheckedChange={(checked) => {
                            setMaquiagemOlhos({...maquiagemOlhos, delineadoresGel: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="delineadoresGel" className="cursor-pointer">
                          Delineadores/Gel
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rimel"
                          checked={maquiagemOlhos.rimel}
                          onCheckedChange={(checked) => {
                            setMaquiagemOlhos({...maquiagemOlhos, rimel: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="rimel" className="cursor-pointer">
                          Rímel
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="delineadoresLiquidos"
                          checked={maquiagemOlhos.delineadoresLiquidos}
                          onCheckedChange={(checked) => {
                            setMaquiagemOlhos({...maquiagemOlhos, delineadoresLiquidos: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="delineadoresLiquidos" className="cursor-pointer">
                          Delineadores líquidos
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sombrasSticks"
                          checked={maquiagemOlhos.sombrasSticks}
                          onCheckedChange={(checked) => {
                            setMaquiagemOlhos({...maquiagemOlhos, sombrasSticks: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="sombrasSticks" className="cursor-pointer">
                          Sombras em sticks
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sombrasOlhos"
                          checked={maquiagemOlhos.sombrasOlhos}
                          onCheckedChange={(checked) => {
                            setMaquiagemOlhos({...maquiagemOlhos, sombrasOlhos: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="sombrasOlhos" className="cursor-pointer">
                          Sombras de olhos
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Maquiagem Rosto */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Maquiagem Rosto</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="base"
                          checked={maquiagemRosto.base}
                          onCheckedChange={(checked) => {
                            setMaquiagemRosto({...maquiagemRosto, base: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="base" className="cursor-pointer">
                          Base
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="corretivo"
                          checked={maquiagemRosto.corretivo}
                          onCheckedChange={(checked) => {
                            setMaquiagemRosto({...maquiagemRosto, corretivo: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="corretivo" className="cursor-pointer">
                          Corretivo
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="blush"
                          checked={maquiagemRosto.blush}
                          onCheckedChange={(checked) => {
                            setMaquiagemRosto({...maquiagemRosto, blush: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="blush" className="cursor-pointer">
                          Blush
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="iluminador"
                          checked={maquiagemRosto.iluminador}
                          onCheckedChange={(checked) => {
                            setMaquiagemRosto({...maquiagemRosto, iluminador: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="iluminador" className="cursor-pointer">
                          Iluminador
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="po"
                          checked={maquiagemRosto.po}
                          onCheckedChange={(checked) => {
                            setMaquiagemRosto({...maquiagemRosto, po: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="po" className="cursor-pointer">
                          Pó
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="contornoBronze"
                          checked={maquiagemRosto.contornoBronze}
                          onCheckedChange={(checked) => {
                            setMaquiagemRosto({...maquiagemRosto, contornoBronze: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="contornoBronze" className="cursor-pointer">
                          Contorno & Bronze
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sprayFixacao"
                          checked={maquiagemRosto.sprayFixacao}
                          onCheckedChange={(checked) => {
                            setMaquiagemRosto({...maquiagemRosto, sprayFixacao: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="sprayFixacao" className="cursor-pointer">
                          Spray de fixação
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="primer"
                          checked={maquiagemRosto.primer}
                          onCheckedChange={(checked) => {
                            setMaquiagemRosto({...maquiagemRosto, primer: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="primer" className="cursor-pointer">
                          Primer
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Lábios */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Lábios</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="batom"
                          checked={labios.batom}
                          onCheckedChange={(checked) => {
                            setLabios({...labios, batom: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="batom" className="cursor-pointer">
                          Batom
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="brilhoLabial"
                          checked={labios.brilhoLabial}
                          onCheckedChange={(checked) => {
                            setLabios({...labios, brilhoLabial: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="brilhoLabial" className="cursor-pointer">
                          Brilho labial
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="delineadorLabios"
                          checked={labios.delineadorLabios}
                          onCheckedChange={(checked) => {
                            setLabios({...labios, delineadorLabios: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="delineadorLabios" className="cursor-pointer">
                          Delineador de lábios
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="batomLiquido"
                          checked={labios.batomLiquido}
                          onCheckedChange={(checked) => {
                            setLabios({...labios, batomLiquido: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="batomLiquido" className="cursor-pointer">
                          Batom líquido
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="lipPlumper"
                          checked={labios.lipPlumper}
                          onCheckedChange={(checked) => {
                            setLabios({...labios, lipPlumper: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="lipPlumper" className="cursor-pointer">
                          Lip plumper
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tinturaLabial"
                          checked={labios.tinturaLabial}
                          onCheckedChange={(checked) => {
                            setLabios({...labios, tinturaLabial: checked as boolean});
                            setTodosSelected(false);
                          }}
                        />
                        <label htmlFor="tinturaLabial" className="cursor-pointer">
                          Tintura labial
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {hasSelection() && (
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

export default CategoriasKit;
