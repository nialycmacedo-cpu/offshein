import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import sheinLogo from "@/assets/shein-logo-custom.png";
import { useNavigate } from "react-router-dom";

const Video = () => {
  const navigate = useNavigate();
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleContinuar = () => {
    if (estado && cidade) {
      navigate("/verificacao");
    }
  };

  const estados = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
    "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
    "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
    "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
    "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ];

  return (
    <div className="min-h-screen bg-background p-4 pt-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-start">
          <img 
            src={sheinLogo} 
            alt="Shein Premiações" 
            className="h-12 w-auto object-contain"
          />
        </div>

        <Card className="w-full p-8 shadow-lg border-2">
          <div className="space-y-6">
            <p className="text-center text-base">
              Antes de <span className="font-bold">começarmos</span>, veja a{" "}
              <span className="font-bold text-[#dc2626]">matéria exclusiva</span> divulgada nos jornais sobre nosso{" "}
              <span className="font-bold text-[#2563eb]">questionário premiado</span>:
            </p>

            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  className="w-full h-full"
                  onEnded={() => setIsPlaying(false)}
                  onClick={() => {
                    if (videoRef.current?.paused) {
                      handlePlayVideo();
                    } else {
                      videoRef.current?.pause();
                      setIsPlaying(false);
                    }
                  }}
                >
                  <source src="/video/promo-video.mp4" type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                
                {!isPlaying && (
                  <button 
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all cursor-pointer group"
                    onClick={handlePlayVideo}
                    type="button"
                    aria-label="Reproduzir"
                  >
                    <div className="w-20 h-20 bg-[#00c853] rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <svg 
                        className="w-10 h-10 text-white ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-[#2563eb]">
              Para prosseguirmos, informe seu Estado e Cidade e verifique se ainda há prêmios disponíveis na sua região.
            </p>

            <div className="space-y-4 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-sm text-[#2563eb]">
                  Estado:
                </label>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger className="w-full bg-white border-gray-300 h-11 rounded-md text-gray-500">
                    <SelectValue placeholder="Selecione um Estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {estados.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#2563eb]">
                  Cidade:
                </label>
                <Input
                  type="text"
                  placeholder="Digite sua cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full bg-white border-gray-300 h-11 rounded-md"
                />
              </div>

              <div className="flex justify-center pt-2">
                <Button 
                  onClick={handleContinuar}
                  disabled={!estado || !cidade}
                  className="bg-[#00c853] hover:bg-[#00a844] text-white px-6 py-2.5 text-sm font-bold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  CONTINUAR →
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Video;
