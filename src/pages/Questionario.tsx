import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const Questionario = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPremio, setDisplayPremio] = useState(100);
  
  // Valores de prêmio para cada pergunta
  const premiosPorPergunta = [
    100, 287, 474, 661, 848, 1035, 1222, 1409, 1596, 1783, 1970, 2223.87
  ];
  
  const targetPremio = premiosPorPergunta[currentQuestion - 1];

  // Anima o contador de prêmios quando muda
  useEffect(() => {
    const difference = targetPremio - displayPremio;
    if (Math.abs(difference) < 0.01) return;

    const duration = 800; // 800ms para a animação
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
        setDisplayPremio(prev => prev + increment);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetPremio, displayPremio]);
  const questions = [
    {
      id: 1,
      text: (
        <>
          Você já <span className="text-[#2563eb]">adquiriu</span> algum produto da Shein?
        </>
      ),
      options: [
        "Sim, já sou cliente",
        "Ainda não sou cliente",
        "Não sei"
      ]
    },
    {
      id: 2,
      text: "O que mais te chama atenção em nossos produtos?",
      options: [
        "Qualidade",
        "Tecnologia e Inovação",
        "Design",
        "Suporte ao cliente",
        "Outro"
      ]
    },
    {
      id: 3,
      text: (
        <>
          Quais são os fatores mais importantes para você ao <span className="text-[#2563eb]">escolher</span> um produto na Shein?
        </>
      ),
      options: [
        "Preço",
        "Qualidade",
        "Estilo",
        "Tendências da moda",
        "Comentários de outros clientes"
      ]
    },
    {
      id: 4,
      text: (
        <>
          Com que <span className="text-[#dc2626]">frequência</span> você faz compras online?
        </>
      ),
      options: [
        "Diariamente",
        "Semanalmente",
        "Mensalmente",
        "Raramente",
        "Nunca"
      ]
    },
    {
      id: 5,
      text: (
        <>
          Qual categoria de produtos mais te <span className="text-[#2563eb]">interessa</span>?
        </>
      ),
      options: [
        "Roupas femininas",
        "Roupas masculinas",
        "Acessórios",
        "Casa e decoração",
        "Eletrônicos"
      ]
    },
    {
      id: 6,
      text: (
        <>
          Qual é o seu <span className="text-[#dc2626]">orçamento</span> médio para compras mensais?
        </>
      ),
      options: [
        "Até R$ 100",
        "R$ 100 - R$ 300",
        "R$ 300 - R$ 500",
        "R$ 500 - R$ 1000",
        "Acima de R$ 1000"
      ]
    },
    {
      id: 7,
      text: (
        <>
          Qual é a sua experiência geral de navegação no site/app da <span className="text-[#2563eb]">Shein</span>?
        </>
      ),
      options: [
        "Muito fácil",
        "Fácil",
        "Neutra",
        "Difícil",
        "Muito difícil"
      ]
    },
    {
      id: 8,
      text: (
        <>
          Com que <span className="text-[#dc2626]">frequência</span> você compra na Shein?
        </>
      ),
      options: [
        "Semanalmente",
        "Mensalmente",
        "A cada 3 meses",
        "Raramente",
        "Esta é minha primeira compra"
      ]
    },
    {
      id: 9,
      text: (
        <>
          Qual categoria de <span className="text-[#dc2626]">produtos</span> você mais compra na Shein?
        </>
      ),
      options: [
        "Roupas femininas",
        "Roupas masculinas",
        "Acessórios",
        "Casa e decoração",
        "Beleza e cuidados"
      ]
    },
    {
      id: 10,
      text: (
        <>
          Como você <span className="text-[#2563eb]">avalia</span> a qualidade dos produtos da <span className="text-[#ffa500]">Shein</span>?
        </>
      ),
      options: [
        "Excelente",
        "Boa",
        "Regular",
        "Ruim",
        "Muito ruim"
      ]
    },
    {
      id: 11,
      text: (
        <>
          Qual é o <span className="text-[#dc2626]">seu</span> orçamento médio por compra na <span className="text-[#2563eb]">Shein</span>?
        </>
      ),
      options: [
        "Até R$ 50",
        "R$ 51 a R$ 100",
        "R$ 101 a R$ 200",
        "R$ 201 a R$ 300",
        "Acima de R$ 300"
      ]
    },
    {
      id: 12,
      text: (
        <>
          Você recomendaria a Shein para <span className="text-[#2563eb]">amigos</span> e <span className="text-[#2563eb]">familiares</span>?
        </>
      ),
      options: [
        "Definitivamente sim",
        "Provavelmente sim",
        "Talvez",
        "Provavelmente não",
        "Definitivamente não"
      ]
    }
  ];

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleConfirm = () => {
    console.log("Resposta confirmada:", selectedAnswer);
    setSelectedAnswer(null);
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length) {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        // O prêmio será atualizado automaticamente pelo useEffect
      } else {
        // Navigate to sending page
        navigate("/enviando");
      }
      setIsTransitioning(false);
    }, 400); // Tempo da animação de fade-out
  };

  const currentQ = questions[currentQuestion - 1];

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
              <p className="text-xl font-bold transition-all duration-500 ease-in-out transform">
                R$ {displayPremio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[400px]">
            <Card 
              className={`w-full max-w-md p-8 shadow-lg border-2 border-gray-300 rounded-2xl transition-all duration-400 ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="space-y-6">
                <h2 className="text-center text-base font-semibold text-[#8b0000]">
                  Pergunta {currentQuestion.toString().padStart(2, '0')}:
                </h2>

                <p className="text-center text-sm leading-relaxed">
                  {currentQ.text}
                </p>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleSelectAnswer(option)}
                      className={`w-full py-3 rounded-full text-sm font-normal transition-all ${
                        selectedAnswer === option
                          ? "bg-[#00c853] hover:bg-[#00a844] text-white"
                          : "bg-black hover:bg-gray-800 text-white"
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {selectedAnswer && (
                  <div className="flex justify-center pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Button
                      onClick={handleConfirm}
                      className="bg-[#00c853] hover:bg-[#00a844] text-white px-8 py-2.5 rounded-full text-sm font-bold"
                    >
                      Confirmar
                    </Button>
                  </div>
                )}
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

export default Questionario;
