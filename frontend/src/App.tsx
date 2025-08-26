import './App.css'
import { ThemeProvider } from './contexts/theme-context'
import { Navbar } from './components/Navbar'
import { HeroCarousel } from './components/HeroCarousel'
import { QuickActions } from './components/QuickActions'
import { AdditionalInfo } from './components/AdditionalInfo'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <HeroCarousel />
          <QuickActions />
          <AdditionalInfo />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
