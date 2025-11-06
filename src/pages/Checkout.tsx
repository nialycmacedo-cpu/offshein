import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Lock, Shield, Award, Package } from "lucide-react";
import bannerCheckout from "@/assets/banner-checkout.jpg";

interface FreteData {
  id: string;
  name: string;
  prazo: string;
  preco: number;
}

// Lista de nomes brasileiros aleatórios
const nomesAleatorios = [
  "Ana Silva",
  "Maria Santos",
  "Juliana Costa",
  "Fernanda Lima",
  "Carla Souza",
  "Patricia Oliveira",
  "Beatriz Almeida",
  "Camila Rodrigues",
  "Amanda Ferreira",
  "Rafaela Martins",
  "Larissa Pereira",
  "Gabriela Nascimento",
  "Mariana Cardoso",
  "Jessica Ribeiro",
  "Leticia Gomes",
  "Renata Castro",
  "Adriana Dias",
  "Vanessa Araujo",
  "Luciana Barbosa",
  "Tatiana Rocha"
];

// Lista de produtos
const produtosAleatorios = [
  "LOOK SHEIN",
  "KIT DE MAQUIAGENS Shein",
  "KIT FASHION TRENDS",
  "LOOK PREMIUM Shein",
  "KIT DE DECORAÇÃO Shein"
];

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const premio = 2690;
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [freteData, setFreteData] = useState<FreteData | null>(null);
  const [ofertas, setOfertas] = useState({
    whatsapp: false,
    kitFacial: false,
    kitAntiRugas: false,
  });
  const [notificacaoAtual, setNotificacaoAtual] = useState({
    nome: nomesAleatorios[0],
    produto: produtosAleatorios[0]
  });

  // Atualizar notificação a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const nomeAleatorio = nomesAleatorios[Math.floor(Math.random() * nomesAleatorios.length)];
      const produtoAleatorio = produtosAleatorios[Math.floor(Math.random() * produtosAleatorios.length)];
      setNotificacaoAtual({ nome: nomeAleatorio, produto: produtoAleatorio });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const freteSalvo = localStorage.getItem("freteEscolhido");
    if (freteSalvo) {
      setFreteData(JSON.parse(freteSalvo));
    }
  }, []);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return value;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleStepOne = () => {
    if (!nome.trim() || !email.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome e e-mail.",
        variant: "destructive",
      });
      return;
    }
    if (!email.includes("@")) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const calcularTotal = () => {
    let total = freteData?.preco || 0;
    if (ofertas.whatsapp) total += 21.9;
    if (ofertas.kitFacial) total += 14.9;
    if (ofertas.kitAntiRugas) total += 18.1;
    return total;
  };

  const handlePagamento = () => {
    if (!cpf.replace(/\D/g, "").length) {
      toast({
        title: "CPF obrigatório",
        description: "Por favor, insira seu CPF.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Integrar API do Gateway aqui
    toast({
      title: "Aguarde...",
      description: "Processando seu pagamento.",
    });

    // Simular processamento (remover quando integrar API)
    setTimeout(() => {
      navigate("/verificacao-final");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Verde */}
      <div className="bg-[#00c853] text-white py-2 px-3 sm:py-3 sm:px-4 flex items-center justify-center gap-2">
        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-xs sm:text-sm font-bold">PAGAMENTO 100% SEGURO</span>
      </div>

      {step === 1 && (
        <>
          {/* Banner Promo - Usando imagem */}
          <div className="relative w-full">
            <img 
              src={bannerCheckout} 
              alt="LOOKS PARA SEMPRE - Banner promocional" 
              className="w-full h-auto object-cover max-h-[400px] sm:max-h-[600px]"
            />
          </div>

          {/* Formulário Identificação */}
          <div className="p-3 sm:p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg sm:text-2xl font-bold shrink-0">
                1
              </div>
              <h2 className="text-xl sm:text-3xl font-bold">Identifique-se</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label className="text-sm sm:text-base font-semibold mb-2 block">
                  Nome e sobrenome
                </Label>
                <Input
                  type="text"
                  placeholder="Nome e sobrenome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="h-12 sm:h-14 text-sm sm:text-base"
                />
              </div>

              <div>
                <Label className="text-sm sm:text-base font-semibold mb-2 block">E-mail</Label>
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 sm:h-14 text-sm sm:text-base"
                />
              </div>

              <Button
                onClick={handleStepOne}
                className="w-full h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-lg font-bold rounded-lg"
              >
                CONTINUAR
              </Button>
            </div>

            {/* Notificação flutuante */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 max-w-[calc(100%-2rem)] sm:max-w-md z-50">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full shrink-0 animate-pulse"></div>
              <p className="text-[10px] sm:text-sm">
                <span className="font-bold">
                  {notificacaoAtual.nome} escolheu o {notificacaoAtual.produto}
                </span>
              </p>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <div className="p-3 sm:p-6 max-w-2xl mx-auto pb-20">
          {/* Step 2 - Finalizar Pagamento */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg sm:text-2xl font-bold shrink-0">
              2
            </div>
            <h2 className="text-xl sm:text-3xl font-bold">Finalizar Pagamento</h2>
          </div>

          <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
            Escolha o seu método de pagamento preferido
          </p>

          {/* Card PIX */}
          <div className="border-4 border-cyan-400 rounded-lg p-3 sm:p-6 mb-4 sm:mb-6 bg-cyan-50">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-cyan-500 bg-white flex items-center justify-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cyan-500"></div>
              </div>
              <span className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                PIX
              </span>
              <span className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
                APROVAÇÃO IMEDIATA
              </span>
            </div>

            <ul className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2 mb-3 sm:mb-4">
              <li>- Liberação imediata!</li>
              <li>- É simples, só usar o aplicativo do seu banco para pagar PIX.</li>
              <li>
                - Super seguro. O pagamento PIX foi desenvolvido pelo Banco Central para
                facilitar pagamentos.
              </li>
            </ul>

            {/* Aviso Importante */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 rounded">
              <div className="flex items-start gap-2">
                <span className="text-xl sm:text-2xl shrink-0">⚠️</span>
                <div>
                  <p className="font-bold text-xs sm:text-sm mb-2">AVISO IMPORTANTE</p>
                  <p className="text-xs sm:text-sm text-gray-800">
                    <span className="font-bold">ATENÇÃO:</span> Caso você gere um pagamento PIX e
                    não finalize a compra, seu CPF será automaticamente{" "}
                    <span className="font-bold">BANIDO</span> da plataforma SHEIN e você ficará{" "}
                    <span className="font-bold">IMPOSSIBILITADO</span> de participar e comprar em
                    nossa plataforma permanentemente.
                  </p>
                </div>
              </div>
            </div>

            {/* Campo CPF */}
            <div className="mt-3 sm:mt-4">
              <Label className="text-xs sm:text-sm font-semibold mb-2 block">CPF</Label>
              <Input
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
                maxLength={14}
                className="h-12 sm:h-14 text-sm sm:text-base bg-white"
              />
            </div>
          </div>

          {/* Você está adquirindo */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Você está adquirindo:</h3>
            <div className="bg-white border-2 border-gray-300 rounded-lg p-3 sm:p-6 flex items-center gap-3 sm:gap-4">
              <div className="text-3xl sm:text-5xl font-bold">SHEIN</div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-lg font-bold uppercase">
                  FRETE {freteData?.id === "basico" ? "BÁSICO" : freteData?.id === "advanced" ? "ADVANCED" : "EXPRESSO"}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">{freteData?.prazo}</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600 mt-1">
                  R$ {freteData?.preco.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="bg-green-100 text-green-700 py-2 px-3 sm:px-4 rounded-lg mt-2 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              Estoque no Brasil
            </div>
          </div>

          {/* Ofertas */}
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2">
              🎉 Você tem (3) ofertas
            </h3>

            {/* Oferta WhatsApp */}
            <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 border border-gray-200">
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox
                  id="whatsapp"
                  checked={ofertas.whatsapp}
                  onCheckedChange={(checked) =>
                    setOfertas({ ...ofertas, whatsapp: checked as boolean })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="whatsapp"
                    className="text-sm sm:text-base font-bold text-blue-600 cursor-pointer"
                  >
                    Grupo Exclusivo no WhatsAPP
                  </Label>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">2 vagas restantes</p>
                  <p className="text-base sm:text-xl font-bold text-green-600 mt-1">R$ 21,90</p>
                  <p className="text-xs sm:text-sm text-red-600 font-semibold mt-1">
                    ENTRE NO GRUPO E GANHE CUPONS DE ROUPAS GRÁTIS TODA SEMANA
                  </p>
                </div>
              </div>
            </div>

            {/* Kit Facial */}
            <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 border border-gray-200">
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox
                  id="kitFacial"
                  checked={ofertas.kitFacial}
                  onCheckedChange={(checked) =>
                    setOfertas({ ...ofertas, kitFacial: checked as boolean })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="kitFacial"
                    className="text-sm sm:text-base font-bold text-blue-600 cursor-pointer"
                  >
                    Kit de Cuidado Facial (Máscara + Sérum + Faixa)
                  </Label>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Disponível somente nesta página
                  </p>
                  <p className="text-base sm:text-xl font-bold text-green-600 mt-1">R$ 14,90</p>
                  <p className="text-xs sm:text-sm text-red-600 font-semibold mt-1">
                    SOMENTE HOJE!
                  </p>
                </div>
              </div>
            </div>

            {/* Kit Anti-Rugas */}
            <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-start gap-2 sm:gap-3">
                <Checkbox
                  id="kitAntiRugas"
                  checked={ofertas.kitAntiRugas}
                  onCheckedChange={(checked) =>
                    setOfertas({ ...ofertas, kitAntiRugas: checked as boolean })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor="kitAntiRugas"
                    className="text-sm sm:text-base font-bold text-blue-600 cursor-pointer"
                  >
                    Kit de Creme Anti-rugas com Ácido Hialurônico e Colágeno
                  </Label>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Disponível somente nesta página
                  </p>
                  <p className="text-base sm:text-xl font-bold text-green-600 mt-1">R$ 18,10</p>
                  <p className="text-xs sm:text-sm text-red-600 font-semibold mt-1">
                    SOMENTE HOJE!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Total e Botão Pagar */}
          <div className="bg-white border-t-4 border-gray-300 pt-3 sm:pt-4 mb-4 sm:mb-6">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-3xl font-bold">Total:</span>
              <span className="text-xl sm:text-3xl font-bold">
                R$ {calcularTotal().toFixed(2)}
              </span>
            </div>

            <Button
              onClick={handlePagamento}
              className="w-full h-12 sm:h-16 bg-green-600 hover:bg-green-700 text-white text-base sm:text-xl font-bold rounded-lg mb-4"
            >
              PAGAR AGORA
            </Button>

            {/* Informações Importantes */}
            <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
              <h4 className="font-bold text-sm sm:text-base mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Informações Importantes
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 mb-2">
                💰 <span className="font-bold">Valor Excedente:</span> R$ 690,00 excedentes do
                seu prêmio será enviado para o seu PIX cadastrado em até 30 minutos, após o
                pagamento aprovado do frete escolhido.
              </p>
              <p className="text-xs sm:text-sm text-gray-700">
                📧 <span className="font-bold">Informações do Kit:</span> As informações do envio
                do seu kit premiado serão enviadas para o e-mail utilizado no pagamento.
              </p>
            </div>
          </div>

          {/* Selo 100% */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-block">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-4 border-yellow-500 shadow-lg">
                <div className="text-center">
                  <Award className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-1 text-white" />
                  <span className="text-white font-bold text-xs sm:text-sm">SATISFACTION</span>
                  <div className="text-white font-bold text-xl sm:text-3xl">100%</div>
                </div>
              </div>
            </div>
            <h3 className="text-base sm:text-xl font-bold mt-3 sm:mt-4 uppercase">
              RECEBA EM CASA OU TENHA SEU DINHEIRO DE VOLTA
            </h3>
            <p className="text-green-600 font-semibold text-sm sm:text-base mt-2 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ENTREGA 100% GARANTIDA
            </p>
          </div>

          {/* Depoimentos */}
          <div className="space-y-2 sm:space-y-3 mb-6">
            <TestimonialCard
              name="Rafaela Costa"
              text="Chegou aqui em casa em 2 dias depois que paguei, acompanhei tudo certo. escolhi um kit de roupas e amei tudo que chegou"
            />
            <TestimonialCard
              name="Laura Santos"
              text="Estava achando que era golpe até tudo chegar aqui kkkk. Chegou super rápido e sem nenhuma complicação"
            />
            <TestimonialCard
              name="Maria Eduarda"
              text="Esse grupo do WhatsApp é a melhor coisa do mundo, eu tô ganhando tanta coisa que vou precisar de um guarda roupa novo kkkk"
            />
            <TestimonialCard
              name="Simone Silva"
              text="Eu não acreditei que a Zara tinha me escolhido pra essa promoção, ainda bem que fui escolhida e ganhei 20 sacolas de roupas"
            />
            <TestimonialCard
              name="Gabriela Paiva"
              text="A qualidade das peças são maravilhosas, chegou tudo certinho aqui em poucos dias. No começo eu não estava acreditando"
            />
          </div>

          {/* Badges de Segurança */}
          <div className="space-y-3 sm:space-y-4 mb-6">
            <SecurityBadge
              icon={<CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />}
              title="Dados protegidos"
              description="Os seus dados são confidenciais e seguros."
            />
            <SecurityBadge
              icon={<Lock className="w-6 h-6 sm:w-8 sm:h-8" />}
              title="Pagamento 100% Seguro"
              description="As informações desta compra são criptografadas."
            />
            <SecurityBadge
              icon={<CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />}
              title="Conteúdo Aprovado"
              description="100% revisado e aprovado por profissionais"
            />
            <SecurityBadge
              icon={<Shield className="w-6 h-6 sm:w-8 sm:h-8" />}
              title="Garantia de 7 dias"
              description="Você está protegido por uma garantia de satisfação"
            />
          </div>

          {/* Notificação flutuante pessoas finalizando */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 max-w-[calc(100%-2rem)] sm:max-w-md z-50">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full shrink-0 animate-pulse"></div>
            <p className="text-[10px] sm:text-sm">
              <span className="font-bold">{notificacaoAtual.nome} escolheu o {notificacaoAtual.produto}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const TestimonialCard = ({ name, text }: { name: string; text: string }) => (
  <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4 shadow-sm">
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 shrink-0"></div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-sm sm:text-base">{name}</span>
          <span className="text-yellow-500 text-xs sm:text-sm">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-700">{text}</p>
      </div>
    </div>
  </div>
);

const SecurityBadge = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-100 rounded-lg p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500 flex items-center justify-center shrink-0 text-white">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-sm sm:text-base mb-1">{title}</h4>
      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default Checkout;
