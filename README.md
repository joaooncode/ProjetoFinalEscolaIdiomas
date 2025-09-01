# 🎓 Escola de Idiomas - Sistema de Gestão

Sistema completo de gestão para escola de idiomas, desenvolvido com arquitetura moderna e tecnologias atuais.

## 📋 Descrição

Este projeto é um sistema de gestão escolar completo que permite administrar alunos, professores, cursos e matrículas de uma escola de idiomas. O sistema foi desenvolvido seguindo princípios de arquitetura limpa e boas práticas de desenvolvimento.

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

- **Frontend**: Aplicação React moderna com TypeScript
- **Backend**: API REST em .NET 8 com arquitetura em camadas
- **Banco de Dados**: Contexto Entity Framework (configurável)

### Estrutura do Backend

```
Api.EscolaIdiomas/
├── Api.EscolaIdiomas/           # Camada de apresentação (Controllers)
├── Api.EscolaIdiomas.Domain/    # Camada de domínio (Models, Services, Interfaces)
└── Api.EscolaIdiomas.Infra.Data/ # Camada de infraestrutura (Repositories, Database)
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** com TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **Radix UI** para componentes acessíveis
- **React Hook Form** com Zod para validação
- **React Router** para navegação
- **Axios** para requisições HTTP
- **TanStack Table** para tabelas de dados

### Backend
- **.NET 8** (ASP.NET Core)
- **Entity Framework Core** para ORM
- **Swagger/OpenAPI** para documentação da API
- **CORS** configurado para frontend
- **Arquitetura em camadas** com injeção de dependência

## 📁 Estrutura do Projeto

```
├── backend/
│   └── Api.EscolaIdiomas/
│       ├── Api.EscolaIdiomas/           # API Principal
│       ├── Api.EscolaIdiomas.Domain/    # Domínio e Lógica de Negócio
│       └── Api.EscolaIdiomas.Infra.Data/ # Infraestrutura e Dados
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes reutilizáveis
│   │   ├── pages/              # Páginas da aplicação
│   │   ├── services/           # Serviços de API
│   │   ├── types/              # Tipos TypeScript
│   │   └── contexts/           # Contextos React
│   └── package.json
└── README.md
```

## 🎯 Funcionalidades

### Gestão de Alunos
- ✅ Cadastro de novos alunos
- ✅ Listagem de alunos
- ✅ Edição de informações
- ✅ Controle de status (ativo/inativo)
- ✅ Histórico de matrículas

### Gestão de Professores
- ✅ Cadastro de professores
- ✅ Diferentes níveis de formação
- ✅ Controle de contratação
- ✅ Gestão de disponibilidade

### Gestão de Cursos
- ✅ Criação de cursos
- ✅ Categorias por nível (Básico, Médio, Avançado)
- ✅ Definição de carga horária e valores
- ✅ Associação com professores

### Sistema de Matrículas
- ✅ Processo de matrícula
- ✅ Controle de status
- ✅ Histórico de matrículas por aluno

## 🚀 Como Executar

### Pré-requisitos
- **Backend**: .NET 8 SDK
- **Frontend**: Node.js 18+ e npm/yarn

### Backend
```bash
cd backend/Api.EscolaIdiomas/Api.EscolaIdiomas
dotnet restore
dotnet run
```

A API estará disponível em: `https://localhost:7000` (ou porta configurada)
Swagger UI: `https://localhost:7000/swagger`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

## 📊 Modelos de Dados

### Aluno
- ID, Nome, Sobrenome
- Data de Nascimento, Email, Telefone
- Data de Matrícula, Status Ativo

### Professor
- ID, Nome, Sobrenome
- Email, Formação, Telefone
- Data de Nascimento, Data de Contratação
- Status Ativo

### Curso
- ID, Nome, Descrição
- Categoria (Básico/Médio/Avançado)
- Valor, Carga Horária
- Professor responsável
- Status Ativo

### Formações (Enum)
- Ensino Médio
- Ensino Técnico
- Graduado
- Pós-Graduado
- Mestrado
- Doutorado

### Categorias (Enum)
- Básico
- Médio
- Avançado

## 🔧 Configurações

### CORS
O backend está configurado para aceitar requisições do frontend nas seguintes origens:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Porta alternativa)

### Banco de Dados
- Contexto Entity Framework configurado
- Singleton para DatabaseContext
- Repositórios com escopo por requisição

## 📱 Interface do Usuário

### Design System
- **Tema**: Suporte a tema claro/escuro com toggle automático
- **Componentes**: Biblioteca de componentes UI reutilizáveis
- **Responsividade**: Design responsivo para diferentes dispositivos

### Navegação
- **Navbar**: Navegação principal com menu dropdown
- **Rotas**: Sistema de roteamento organizado por funcionalidade
- **Breadcrumbs**: Navegação contextual

### Componentes Principais
- **Tabelas de Dados**: Visualização organizada com paginação
- **Formulários**: Validação em tempo real com feedback visual
- **Carrosséis**: Apresentação de informações em destaque
- **Notificações**: Sistema de toast para feedback do usuário

## 🧪 Desenvolvimento

### Scripts Disponíveis
```bash
# Frontend
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run lint         # Verificação de código
npm run preview      # Preview da build

# Backend
dotnet run           # Executar aplicação
dotnet build         # Compilar projeto
dotnet test          # Executar testes
```

### Estrutura de Código
- **TypeScript**: Tipagem estática para maior segurança
- **ESLint**: Configuração de linting para qualidade de código
- **Prettier**: Formatação automática de código
- **Husky**: Hooks de git para qualidade

## 🔒 Segurança

- **CORS**: Configurado para origens específicas
- **Validação**: Validação de entrada em frontend e backend
- **Sanitização**: Tratamento seguro de dados

## 📈 Melhorias Futuras

- [ ] Sistema de autenticação e autorização
- [ ] Dashboard com métricas e relatórios
- [ ] Sistema de notificações
- [ ] Upload de arquivos (fotos, documentos)
- [ ] API de pagamentos
- [ ] Sistema de avaliações e feedback
- [ ] Relatórios em PDF/Excel
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **João Vitor Rodrigues** - Desenvolvimento inicial

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos canais disponibilizados pela equipe de desenvolvimento.

---

**Escola de Idiomas** - Transformando o aprendizado de idiomas através da tecnologia! 🚀
