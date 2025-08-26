import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { ThemeToggle } from './theme'
import { BookOpen, GraduationCap, Users, Home, School, UserPlus, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <School className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Escola de Idiomas</span>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Início
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Users className="mr-2 h-4 w-4" />
                    Alunos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-2 w-[180px]">
                      <NavigationMenuLink href="/alunos" className="block p-2 rounded hover:bg-accent">
                        Gerenciar Alunos
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/alunos/novo" className="block p-2 rounded hover:bg-accent">
                        Novo Aluno
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Professores
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-2 w-[180px]">
                      <NavigationMenuLink href="/professores" className="block p-2 rounded hover:bg-accent">
                        Gerenciar Professores
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/professores/novo" className="block p-2 rounded hover:bg-accent">
                        Novo Professor
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Cursos
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-2 w-[180px]">
                      <NavigationMenuLink href="/cursos" className="block p-2 rounded hover:bg-accent">
                        Gerenciar Cursos
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/cursos/novo" className="block p-2 rounded hover:bg-accent">
                        Novo Curso
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Matrículas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-2 w-[180px]">
                      <NavigationMenuLink href="/matriculas" className="block p-2 rounded hover:bg-accent">
                        Gerenciar Matrículas
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/matriculas/nova" className="block p-2 rounded hover:bg-accent">
                        Nova Matrícula
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-accent"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="space-y-2">
              <a href="/" className="flex items-center p-3 rounded-md hover:bg-accent transition-colors">
                <Home className="mr-3 h-4 w-4" />
                Início
              </a>
              
              <div className="space-y-1">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <Users className="mr-3 h-4 w-4" />
                  <span className="font-medium">Alunos</span>
                </div>
                <div className="ml-6 space-y-1">
                  <a href="/alunos" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Gerenciar Alunos
                  </a>
                  <a href="/alunos/novo" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Novo Aluno
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <GraduationCap className="mr-3 h-4 w-4" />
                  <span className="font-medium">Professores</span>
                </div>
                <div className="ml-6 space-y-1">
                  <a href="/professores" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Gerenciar Professores
                  </a>
                  <a href="/professores/novo" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Novo Professor
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <BookOpen className="mr-3 h-4 w-4" />
                  <span className="font-medium">Cursos</span>
                </div>
                <div className="ml-6 space-y-1">
                  <a href="/cursos" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Gerenciar Cursos
                  </a>
                  <a href="/cursos/novo" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Novo Curso
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <UserPlus className="mr-3 h-4 w-4" />
                  <span className="font-medium">Matrículas</span>
                </div>
                <div className="ml-6 space-y-1">
                  <a href="/matriculas" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Gerenciar Matrículas
                  </a>
                  <a href="/matriculas/nova" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Nova Matrícula
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
