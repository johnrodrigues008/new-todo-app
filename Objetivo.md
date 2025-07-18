# Desafio Técnico Full Stack - Nível Pleno  
**Empresa:** Cogna Martech

---

## Sobre o Desafio

Você deve desenvolver uma aplicação **Full Stack** que permita o **cadastro e gerenciamento de tarefas (ToDo)**.  
O foco é avaliar sua capacidade de:

- Trabalhar com arquitetura desacoplada  
- Aplicar boas práticas com **Next.js**, **NestJS**, **Prisma**  
- Utilizar banco de dados **PostgreSQL** ou **MongoDB**  
- Automatizar o pipeline com **GitHub Actions**  
- Criar **testes unitários** no backend  

---

## Prazo de Entrega

Você tem até **3 dias corridos após o recebimento deste desafio** para entregá-lo.

---

## Tecnologias Obrigatórias

- **Frontend:** Next.js com TypeScript  
- **Backend:** NestJS com TypeScript  
- **ORM:** Prisma  
- **Banco de Dados:** PostgreSQL ou MongoDB  
- **Deploy/CI:** GitHub Actions  
- **Testes:** Jest (pelo menos no backend)

---

## O que deve ser feito

### Autenticação de Usuário:

- Cadastro com e-mail e senha  
- Login com e-mail e senha  
- Proteção de rotas autenticadas (JWT ou cookies)

### CRUD de Tarefas:

- **Campos:** id, título, descrição, status, data de criação, modificação  
- **Operações:** criar, editar, deletar e listar (somente do usuário logado)

### Frontend:

- Página de Login  
- Página de Cadastro  
- Página protegida com a lista de tarefas  
- Formulário de criação e edição

### Testes Unitários:

- Pelo menos 2 testes no NestJS (ex: service de tarefas e autenticação)

### GitHub Actions:

- Rodar testes, lint e build  
- *(Diferencial)* Deploy automático (Vercel/Render/Railway)

---

## Estrutura Esperada do Repositório

```
/my-todo-app
│
├── apps
│ ├── frontend # Next.js
│ └── backend # NestJS
│
├── prisma
│ └── schema.prisma
│
├── .github
│ └── workflows
│ └── ci.yml
│
└── README.md
```

---

## Critérios de Avaliação

- Funcionalidades implementadas  
- Boas práticas de código (SOLID, Clean Code)  
- Uso correto do Prisma + Banco de Dados  
- Testes unitários funcionando  
- CI/CD com GitHub Actions  
- Organização do repositório e README

---

## Entrega

Envie o link do repositório público no GitHub com:

- Instruções claras no `README.md`  
- Arquivo `.env.example`  
- Link do deploy (se houver)

---

## Diferenciais (não obrigatórios)

- TailwindCSS no frontend  
- Docker (docker-compose)  
- Cobertura de testes  
- ShadCN UI  
- Husky + Lint-staged  
