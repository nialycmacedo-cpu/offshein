import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
const DadosFrete = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const premio = 2690;
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8);
    return numbers.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  };
  const handleCepChange = async (value: string) => {
    const formatted = formatCep(value);
    setCep(formatted);
    const cleanCep = value.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data: ViaCepResponse = await response.json();
        if (data.erro) {
          toast({
            title: "CEP não encontrado",
            description: "Por favor, verifique o CEP digitado.",
            variant: "destructive"
          });
          return;
        }
        setEndereco(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setEstado(data.uf || "");
      } catch (error) {
        toast({
          title: "Erro ao buscar CEP",
          description: "Não foi possível buscar o endereço. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setLoadingCep(false);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cep || !endereco || !bairro || !cidade || !estado || !numero) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // Salva os dados do endereço no localStorage
    localStorage.setItem("dadosEndereco", JSON.stringify({
      cep,
      endereco,
      bairro,
      cidade,
      estado,
      numero
    }));
    
    // Navega para a página de escolha de frete
    navigate('/escolha-frete');
  };
  return <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-4 pt-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-start">
            <img src={sheinLogo} alt="Shein Premiações" className="h-10 w-auto object-contain" />
            <div className="text-right">
              <p className="text-xs text-gray-600">Acumulado em prêmios:</p>
              <p className="text-xl font-bold">
                R$ {premio.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[500px]">
            <Card className="w-full max-w-2xl p-8 shadow-lg border-2 border-gray-300 rounded-2xl bg-gray-50">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header com steps */}
                <div className="flex items-center justify-center gap-8 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#00c853] flex items-center justify-center text-white font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold">Entrega</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                      2
                    </div>
                    <span className="text-sm text-gray-600">Frete</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* CEP */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2563eb]">
                      Insira seu CEP
                    </label>
                    <Input type="text" placeholder="00000-000" value={cep} onChange={e => handleCepChange(e.target.value)} className="w-full bg-[#e6f0ff] border-gray-300" disabled={loadingCep} />
                    {loadingCep && <p className="text-xs text-gray-500">Buscando endereço...</p>}
                  </div>

                  {/* Endereço */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Endereço
                    </label>
                    <Input type="text" placeholder="Rua, Avenida..." value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full bg-white border-2 border-black" />
                  </div>

                  {/* Bairro e Cidade */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Bairro
                      </label>
                      <Input type="text" placeholder="Bairro" value={bairro} onChange={e => setBairro(e.target.value)} className="w-full bg-white border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Cidade
                      </label>
                      <Input type="text" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} className="w-full bg-white border-gray-300" />
                    </div>
                  </div>

                  {/* Estado e Número */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Estado
                      </label>
                      <Input type="text" placeholder="UF" value={estado} onChange={e => setEstado(e.target.value.toUpperCase())} maxLength={2} className="w-full bg-white border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Número
                      </label>
                      <Input type="text" placeholder="Digite o número" value={numero} onChange={e => setNumero(e.target.value)} className="w-full bg-white border-gray-300" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#6b7280] hover:bg-[#4b5563] text-white py-3 text-sm font-bold rounded-md mt-6">
                    Seguir para o frete
                  </Button>
                </div>
              </form>
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
    </div>;
};
export default DadosFrete;