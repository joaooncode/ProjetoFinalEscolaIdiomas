import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { Navbar } from "./components/Navbar";
import { HeroCarousel } from "./components/HeroCarousel";
import { QuickActions } from "./components/QuickActions";
import { AdditionalInfo } from "./components/AdditionalInfo";
import CreateAlunoPage from "./components/forms/alunos/CreateAlunoPage";
import { Toaster } from "./components/ui/sonner";

// Importar páginas
import AlunosPage from "./pages/alunos/index";
import ProfessoresPage from "./pages/professores/index";
import CursosPage from "./pages/cursos/index";
import MatriculasPage from "./pages/matriculas/index";
import NovoProfessorPage from "./pages/professores/novo";
import NovoCursoPage from "./pages/cursos/novo";
import NovaMatriculaPage from "./pages/matriculas/nova";

function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HeroCarousel />
      <QuickActions />
      <AdditionalInfo />
    </main>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Rotas de Alunos */}
            <Route path="/alunos" element={<AlunosPage />} />
            <Route path="/alunos/novo" element={<CreateAlunoPage />} />

            {/* Rotas de Professores */}
            <Route path="/professores" element={<ProfessoresPage />} />
            <Route path="/professores/novo" element={<NovoProfessorPage />} />

            {/* Rotas de Cursos */}
            <Route path="/cursos" element={<CursosPage />} />
            <Route path="/cursos/novo" element={<NovoCursoPage />} />

            {/* Rotas de Matrículas */}
            <Route path="/matriculas" element={<MatriculasPage />} />
            <Route path="/matriculas/nova" element={<NovaMatriculaPage />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
