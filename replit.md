# Sistema de Gestão da Biblioteca Universitária ISPTEC

## Visão Geral
Sistema integrado de gestão bibliotecária para o Instituto Superior Politécnico de Tecnologias e Ciências (ISPTEC), desenvolvido para digitalizar e otimizar todos os processos da biblioteca universitária.

## Arquitetura
- **Frontend**: React + TypeScript + Vite + Wouter
- **Backend**: Express + TypeScript
- **Storage**: In-memory (MemStorage) - pode ser substituído por PostgreSQL
- **UI**: Shadcn/ui + Tailwind CSS

## Estrutura do Projeto

### Backend (`/server`)
- `index.ts` - Servidor Express principal
- `routes.ts` - Rotas da API e lógica de negócio
- `storage.ts` - Interface de armazenamento e implementação in-memory

### Frontend (`/client`)
- `src/pages/` - Páginas da aplicação
  - `welcome.tsx` - Página inicial
  - `login.tsx` - Autenticação
  - `dashboard.tsx` - Painel principal com estatísticas
  - `books.tsx` - Gestão do acervo
  - `loans.tsx` - Gestão de empréstimos
  - `users.tsx` - Gestão de utilizadores
  - `fines.tsx` - Gestão de multas
  - `reports.tsx` - Relatórios e analytics

### Schema (`/shared`)
- `schema.ts` - Modelos de dados usando Drizzle ORM

## Regras de Negócio Implementadas

### Tipos de Utilizadores
1. **Docentes**:
   - Prazo: 15 dias
   - Limite: 4 livros simultâneos
   
2. **Estudantes**:
   - Prazo: 5 dias
   - Limite: 2 livros simultâneos
   
3. **Funcionários**:
   - Prazo: 5 dias
   - Limite: 2 livros simultâneos

### Sistema de Etiquetas
- **Vermelha**: Uso exclusivo na biblioteca (não empresta)
- **Amarela**: Empréstimo de 1 dia
- **Branca**: Empréstimo padrão (5 ou 15 dias conforme tipo de utilizador)

### Sistema de Multas
- Valor: 500 Kz por dia de atraso
- Bloqueio: ≥ 2000 Kz impede novos empréstimos
- Cálculo automático na devolução

### Sistema de Renovações
- Máximo: 2 renovações por livro
- Bloqueio se houver reservas pendentes
- Bloqueio se houver multas não pagas

### Sistema de Reservas
- Máximo: 3 reservas simultâneas por utilizador
- Fila de espera automática por ordem de chegada
- Notificação quando disponível
- Prazo de levantamento: 48 horas

## API Endpoints

### Autenticação
- `POST /api/auth/login` - Login de utilizador

### Utilizadores
- `GET /api/users` - Listar todos os utilizadores
- `GET /api/users/:id` - Obter utilizador específico
- `POST /api/users` - Criar novo utilizador
- `PATCH /api/users/:id` - Atualizar utilizador

### Livros
- `GET /api/books` - Listar livros (com busca opcional)
- `GET /api/books/:id` - Obter livro específico
- `POST /api/books` - Cadastrar novo livro
- `PATCH /api/books/:id` - Atualizar livro
- `DELETE /api/books/:id` - Remover livro

### Empréstimos
- `GET /api/loans` - Listar empréstimos
- `POST /api/loans` - Criar empréstimo
- `POST /api/loans/:id/return` - Devolver livro
- `POST /api/loans/:id/renew` - Renovar empréstimo

### Reservas
- `GET /api/reservations` - Listar reservas
- `POST /api/reservations` - Criar reserva
- `PATCH /api/reservations/:id` - Atualizar reserva

### Multas
- `GET /api/fines` - Listar multas
- `POST /api/fines/:id/pay` - Pagar multa

### Dashboard & Relatórios
- `GET /api/dashboard/stats` - Estatísticas gerais
- `GET /api/reports/popular-books` - Livros mais emprestados
- `GET /api/reports/active-users` - Utilizadores mais ativos

## Credenciais Padrão
- Username: `admin`
- Password: `admin123`

## Categorias Pré-cadastradas
- Informática
- Engenharia
- Matemática
- Física
- Literatura

## Próximas Melhorias
- [ ] Implementar autenticação com sessions/JWT
- [ ] Hash de senhas (bcrypt)
- [ ] Migração para PostgreSQL
- [ ] Sistema de OCR para cadastro de livros
- [ ] Chatbot de atendimento
- [ ] Sistema de recomendações
- [ ] Notificações por email/SMS
- [ ] Gestão de danos e perdas
- [ ] Relatórios avançados com gráficos

## Data de Criação
16 de novembro de 2024

## Versão
1.0.0
