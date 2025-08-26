import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Globe, Award, Clock, Star, Users, BookOpen } from 'lucide-react'

const carouselItems = [
  {
    icon: Globe,
    title: "Múltiplos Idiomas",
    description: "Oferecemos cursos em inglês, espanhol, francês, alemão e muito mais",
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: Award,
    title: "Professores Qualificados",
    description: "Nossa equipe é composta por professores nativos e certificados",
    gradient: "from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    description: "Aulas disponíveis em diferentes horários para sua conveniência",
    gradient: "from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    icon: Star,
    title: "Metodologia Moderna",
    description: "Utilizamos as mais recentes técnicas de ensino de idiomas",
    gradient: "from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900",
    iconColor: "text-orange-600 dark:text-orange-400"
  },
  {
    icon: Users,
    title: "Turmas Pequenas",
    description: "Aulas em grupos reduzidos para atenção personalizada",
    gradient: "from-red-50 to-pink-100 dark:from-red-950 dark:to-pink-900",
    iconColor: "text-red-600 dark:text-red-400"
  },
  {
    icon: BookOpen,
    title: "Material Didático",
    description: "Livros e recursos digitais incluídos em todos os cursos",
    gradient: "from-teal-50 to-cyan-100 dark:from-teal-950 dark:to-cyan-900",
    iconColor: "text-teal-600 dark:text-teal-400"
  }
]

export function HeroCarousel() {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Escola de Idiomas</h1>
        <p className="text-xl text-muted-foreground">
          Aprenda idiomas de forma eficiente e divertida
        </p>
      </div>

      {/* Carousel */}
      <div className="max-w-4xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className={`p-6 bg-gradient-to-br ${item.gradient} rounded-lg border h-full`}>
                    <div className="flex flex-col items-center text-center">
                      <IconComponent className={`h-12 w-12 ${item.iconColor} mb-4`} />
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
