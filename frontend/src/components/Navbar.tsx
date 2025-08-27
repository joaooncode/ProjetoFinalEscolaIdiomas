import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { ThemeToggle } from './theme'
import { BookOpen, GraduationCap, Users, Home, School, UserPlus, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="border-b bg-background relative z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <School className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Escola de Idiomas</span>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link to="/">
                      <Home className="mr-2 h-4 w-4" />
                      Início
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Users className="mr-2 h-4 w-4" />
                    Alunos
                  </NavigationMenuTrigger>
                                     <NavigationMenuContent>
                     <div className="p-2 w-[200px] bg-popover">
                       <NavigationMenuLink asChild>
                         <Link to="/alunos" className="block p-2 rounded hover:bg-accent transition-colors">
                           Gerenciar Alunos
                         </Link>
                       </NavigationMenuLink>
                       <NavigationMenuLink asChild>
                         <Link to="/alunos/novo" className="block p-2 rounded hover:bg-accent transition-colors">
                           Novo Aluno
                         </Link>
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
                     <div className="p-2 w-[200px] bg-popover">
                       <NavigationMenuLink asChild>
                         <Link to="/professores" className="block p-2 rounded hover:bg-accent transition-colors">
                           Gerenciar Professores
                         </Link>
                       </NavigationMenuLink>
                       <NavigationMenuLink asChild>
                         <Link to="/professores/novo" className="block p-2 rounded hover:bg-accent transition-colors">
                           Novo Professor
                         </Link>
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
                     <div className="p-2 w-[200px] bg-popover">
                       <NavigationMenuLink asChild>
                         <Link to="/cursos" className="block p-2 rounded hover:bg-accent transition-colors">
                           Gerenciar Cursos
                         </Link>
                       </NavigationMenuLink>
                       <NavigationMenuLink asChild>
                         <Link to="/cursos/novo" className="block p-2 rounded hover:bg-accent transition-colors">
                           Novo Curso
                         </Link>
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
                      <NavigationMenuLink asChild>
                        <Link to="/matriculas" className="block p-2 rounded hover:bg-accent">
                          Gerenciar Matrículas
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/matriculas/nova" className="block p-2 rounded hover:bg-accent">
                          Nova Matrícula
                        </Link>
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
              <Link to="/" className="flex items-center p-3 rounded-md hover:bg-accent transition-colors">
                <Home className="mr-3 h-4 w-4" />
                Início
              </Link>
              
              <div className="space-y-1">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <Users className="mr-3 h-4 w-4" />
                  <span className="font-medium">Alunos</span>
                </div>
                <div className="ml-6 space-y-1">
                  <Link to="/alunos" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Gerenciar Alunos
                  </Link>
                  <Link to="/alunos/novo" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Novo Aluno
                  </Link>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <GraduationCap className="mr-3 h-4 w-4" />
                  <span className="font-medium">Professores</span>
                </div>
                <div className="ml-6 space-y-1">
                  <Link to="/professores" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Gerenciar Professores
                  </Link>
                  <Link to="/professores/novo" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Novo Professor
                  </Link>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <BookOpen className="mr-3 h-4 w-4" />
                  <span className="font-medium">Cursos</span>
                </div>
                <div className="ml-6 space-y-1">
                  <Link to="/cursos" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Gerenciar Cursos
                  </Link>
                  <Link to="/cursos/novo" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Novo Curso
                  </Link>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center p-3 rounded-md bg-muted/50">
                  <UserPlus className="mr-3 h-4 w-4" />
                  <span className="font-medium">Matrículas</span>
                </div>
                <div className="ml-6 space-y-1">
                  <Link to="/matriculas" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Gerenciar Matrículas
                  </Link>
                  <Link to="/matriculas/nova" className="block p-2 rounded-md hover:bg-accent transition-colors">
                    Nova Matrícula
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
