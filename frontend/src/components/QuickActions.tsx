import { Users, GraduationCap, BookOpen, UserPlus } from 'lucide-react'

const quickActions = [
  {
    icon: Users,
    title: "Gerenciar Alunos",
    description: "Cadastre e gerencie alunos",
    href: "/alunos"
  },
  {
    icon: GraduationCap,
    title: "Gerenciar Professores",
    description: "Cadastre e gerencie professores",
    href: "/professores"
  },
  {
    icon: BookOpen,
    title: "Gerenciar Cursos",
    description: "Configure cursos disponíveis",
    href: "/cursos"
  },
  {
    icon: UserPlus,
    title: "Gerenciar Matrículas",
    description: "Controle matrículas dos alunos",
    href: "/matriculas"
  }
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {quickActions.map((action, index) => {
        const IconComponent = action.icon
        return (
          <a
            key={index}
            href={action.href}
            className="p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow block"
          >
            <div className="flex items-center space-x-3">
              <IconComponent className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
