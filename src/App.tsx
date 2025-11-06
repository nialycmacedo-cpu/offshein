import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inicio from "./pages/Inicio";
import Video from "./pages/Video";
import Verificacao from "./pages/Verificacao";
import Questionario from "./pages/Questionario";
import Enviando from "./pages/Enviando";
import Final from "./pages/Final";
import Escolha from "./pages/Escolha";
import DadosPix from "./pages/DadosPix";
import TamanhoKit from "./pages/TamanhoKit";
import CategoriasKit from "./pages/CategoriasKit";
import TomPele from "./pages/TomPele";
import CategoriasLooks from "./pages/CategoriasLooks";
import CoresLooks from "./pages/CoresLooks";
import VerificacaoFinal from "./pages/VerificacaoFinal";
import DadosFrete from "./pages/DadosFrete";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/video" element={<Video />} />
          <Route path="/verificacao" element={<Verificacao />} />
          <Route path="/questionario" element={<Questionario />} />
          <Route path="/enviando" element={<Enviando />} />
          <Route path="/final" element={<Final />} />
          <Route path="/escolha" element={<Escolha />} />
          <Route path="/dados-pix" element={<DadosPix />} />
          <Route path="/tamanho-kit" element={<TamanhoKit />} />
          <Route path="/categorias-kit" element={<CategoriasKit />} />
          <Route path="/tom-pele" element={<TomPele />} />
          <Route path="/categorias-looks" element={<CategoriasLooks />} />
          <Route path="/cores-looks" element={<CoresLooks />} />
          <Route path="/verificacao-final" element={<VerificacaoFinal />} />
          <Route path="/dados-frete" element={<DadosFrete />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
