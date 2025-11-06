import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const CategoriasLooks = () => {
  const navigate = useNavigate();
  const premio = 2690;
  
  const [todosMisto, setTodosMisto] = useState(false);
  const [tops, setTops] = useState({
    tShirts: false,
    regatas: false,
    blusas: false,
    vestidinhosCurtos: false,
    camisas: false,
  });
  const [parteBaixo, setParteBaixo] = useState({
    calca: false,
    shorts: false,
    saia: false,
    legging: false,
  });
  const [malhas, setMalhas] = useState({
    cardigans: false,
    blusas: false,
    sueter: false,
  });
  const [casacos, setCasacos] = useState({
    casacosJaquetas: false,
    jaquetas: false,
    moletons: false,
    sobretudos: false,
  });
  const [outros, setOutros] = useState({
    macacao: false,
    chapeus: false,
  });
  const [roupasPraia, setRoupasPraia] = useState({
    topoVestidos: false,
    parteInferiorBiquini: false,
    saidas: false,
  });
  const [calcados, setCalcados] = useState({
    sandalia: false,
    chinelo: false,
    bota: false,
    chinela: false,
  });

  const handleTodosMistoChange = (checked: boolean) => {
    setTodosMisto(checked);
    if (checked) {
      setTops({ tShirts: true, regatas: true, blusas: true, vestidinhosCurtos: true, camisas: true });
      setParteBaixo({ calca: true, shorts: true, saia: true, legging: true });
      setMalhas({ cardigans: true, blusas: true, sueter: true });
      setCasacos({ casacosJaquetas: true, jaquetas: true, moletons: true, sobretudos: true });
      setOutros({ macacao: true, chapeus: true });
      setRoupasPraia({ topoVestidos: true, parteInferiorBiquini: true, saidas: true });
      setCalcados({ sandalia: true, chinelo: true, bota: true, chinela: true });
    } else {
      setTops({ tShirts: false, regatas: false, blusas: false, vestidinhosCurtos: false, camisas: false });
      setParteBaixo({ calca: false, shorts: false, saia: false, legging: false });
      setMalhas({ cardigans: false, blusas: false, sueter: false });
      setCasacos({ casacosJaquetas: false, jaquetas: false, moletons: false, sobretudos: false });
      setOutros({ macacao: false, chapeus: false });
      setRoupasPraia({ topoVestidos: false, parteInferiorBiquini: false, saidas: false });
      setCalcados({ sandalia: false, chinelo: false, bota: false, chinela: false });
    }
  };

  const hasSelection = () => {
    return todosMisto || 
      Object.values(tops).some(v => v) ||
      Object.values(parteBaixo).some(v => v) ||
      Object.values(malhas).some(v => v) ||
      Object.values(casacos).some(v => v) ||
      Object.values(outros).some(v => v) ||
      Object.values(roupasPraia).some(v => v) ||
      Object.values(calcados).some(v => v);
  };

  const handleConfirm = () => {
    if (hasSelection()) {
      navigate('/cores-looks');
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
            <Card className="w-full max-w-xl p-8 shadow-lg border-2 border-gray-300 rounded-2xl max-h-[600px] overflow-y-auto">
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
                        id="todosMisto"
                        checked={todosMisto}
                        onCheckedChange={handleTodosMistoChange}
                      />
                      <label htmlFor="todosMisto" className="cursor-pointer">
                        Todos/Misto
                      </label>
                    </div>
                  </div>

                  {/* Tops */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Tops</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tShirts"
                          checked={tops.tShirts}
                          onCheckedChange={(checked) => {
                            setTops({...tops, tShirts: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="tShirts" className="cursor-pointer">T-Shirts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="regatas"
                          checked={tops.regatas}
                          onCheckedChange={(checked) => {
                            setTops({...tops, regatas: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="regatas" className="cursor-pointer">Regatas</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="blusasTops"
                          checked={tops.blusas}
                          onCheckedChange={(checked) => {
                            setTops({...tops, blusas: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="blusasTops" className="cursor-pointer">Blusas</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vestidinhosCurtos"
                          checked={tops.vestidinhosCurtos}
                          onCheckedChange={(checked) => {
                            setTops({...tops, vestidinhosCurtos: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="vestidinhosCurtos" className="cursor-pointer">Vestidinhos curtos</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="camisas"
                          checked={tops.camisas}
                          onCheckedChange={(checked) => {
                            setTops({...tops, camisas: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="camisas" className="cursor-pointer">Camisas</label>
                      </div>
                    </div>
                  </div>

                  {/* Parte de Baixo */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Parte de Baixo</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="calca"
                          checked={parteBaixo.calca}
                          onCheckedChange={(checked) => {
                            setParteBaixo({...parteBaixo, calca: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="calca" className="cursor-pointer">Calça</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="shorts"
                          checked={parteBaixo.shorts}
                          onCheckedChange={(checked) => {
                            setParteBaixo({...parteBaixo, shorts: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="shorts" className="cursor-pointer">Shorts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saia"
                          checked={parteBaixo.saia}
                          onCheckedChange={(checked) => {
                            setParteBaixo({...parteBaixo, saia: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="saia" className="cursor-pointer">Saia</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="legging"
                          checked={parteBaixo.legging}
                          onCheckedChange={(checked) => {
                            setParteBaixo({...parteBaixo, legging: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="legging" className="cursor-pointer">Legging</label>
                      </div>
                    </div>
                  </div>

                  {/* Malhas */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Malhas</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cardigans"
                          checked={malhas.cardigans}
                          onCheckedChange={(checked) => {
                            setMalhas({...malhas, cardigans: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="cardigans" className="cursor-pointer">Cardigans</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="blusasMalhas"
                          checked={malhas.blusas}
                          onCheckedChange={(checked) => {
                            setMalhas({...malhas, blusas: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="blusasMalhas" className="cursor-pointer">Blusas</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sueter"
                          checked={malhas.sueter}
                          onCheckedChange={(checked) => {
                            setMalhas({...malhas, sueter: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="sueter" className="cursor-pointer">Suéter</label>
                      </div>
                    </div>
                  </div>

                  {/* Casacos */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Casacos</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="casacosJaquetas"
                          checked={casacos.casacosJaquetas}
                          onCheckedChange={(checked) => {
                            setCasacos({...casacos, casacosJaquetas: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="casacosJaquetas" className="cursor-pointer">Casacos de Jaquetas</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="jaquetas"
                          checked={casacos.jaquetas}
                          onCheckedChange={(checked) => {
                            setCasacos({...casacos, jaquetas: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="jaquetas" className="cursor-pointer">Jaquetas</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="moletons"
                          checked={casacos.moletons}
                          onCheckedChange={(checked) => {
                            setCasacos({...casacos, moletons: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="moletons" className="cursor-pointer">Moletons</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sobretudos"
                          checked={casacos.sobretudos}
                          onCheckedChange={(checked) => {
                            setCasacos({...casacos, sobretudos: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="sobretudos" className="cursor-pointer">Sobretudos</label>
                      </div>
                    </div>
                  </div>

                  {/* Outros */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Outros</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="macacao"
                          checked={outros.macacao}
                          onCheckedChange={(checked) => {
                            setOutros({...outros, macacao: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="macacao" className="cursor-pointer">Macacão</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="chapeus"
                          checked={outros.chapeus}
                          onCheckedChange={(checked) => {
                            setOutros({...outros, chapeus: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="chapeus" className="cursor-pointer">Chapéus</label>
                      </div>
                    </div>
                  </div>

                  {/* Roupas de Praia */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Roupas de Praia</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="topoVestidos"
                          checked={roupasPraia.topoVestidos}
                          onCheckedChange={(checked) => {
                            setRoupasPraia({...roupasPraia, topoVestidos: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="topoVestidos" className="cursor-pointer">Topo de bikíni e de Vestidos</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="parteInferiorBiquini"
                          checked={roupasPraia.parteInferiorBiquini}
                          onCheckedChange={(checked) => {
                            setRoupasPraia({...roupasPraia, parteInferiorBiquini: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="parteInferiorBiquini" className="cursor-pointer">Parte Inferior de biquíni</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saidas"
                          checked={roupasPraia.saidas}
                          onCheckedChange={(checked) => {
                            setRoupasPraia({...roupasPraia, saidas: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="saidas" className="cursor-pointer">Saídas</label>
                      </div>
                    </div>
                  </div>

                  {/* Calçados */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#dc2626]">Calçados</h3>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sandalia"
                          checked={calcados.sandalia}
                          onCheckedChange={(checked) => {
                            setCalcados({...calcados, sandalia: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="sandalia" className="cursor-pointer">Sandália</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="chinelo"
                          checked={calcados.chinelo}
                          onCheckedChange={(checked) => {
                            setCalcados({...calcados, chinelo: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="chinelo" className="cursor-pointer">Chinelo</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bota"
                          checked={calcados.bota}
                          onCheckedChange={(checked) => {
                            setCalcados({...calcados, bota: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="bota" className="cursor-pointer">Bota</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="chinela"
                          checked={calcados.chinela}
                          onCheckedChange={(checked) => {
                            setCalcados({...calcados, chinela: checked as boolean});
                            setTodosMisto(false);
                          }}
                        />
                        <label htmlFor="chinela" className="cursor-pointer">Chinela</label>
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

export default CategoriasLooks;
