# ToDo List - Desafio Técnico Full Stack (Nível Pleno)

**Empresa:** Cogna Martech  
**Autor:** John Rodrigues

---

## Objetivo:

Este projeto é a resolução do desafio técnico Full Stack proposto pela Cogna Martech.  
Trata-se de uma aplicação para gerenciamento de tarefas (ToDo), contemplando autenticação de usuários e operações CRUD para tarefas, com foco em boas práticas, arquitetura desacoplada e uso de tecnologias modernas.

---

## Como rodar o projeto?

Este projeto possui 3 formas principais para rodar, visando demonstrar conhecimento em Docker, Kubernetes, serverless e deploy em diversas plataformas.

### 1. Opção - Execução com Docker (Configuração local)

Para rodar com Docker, certifique-se de ter o [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado.

- Crie um arquivo `.env` dentro das pastas `backend` e `frontend`, copiando as variáveis de ambiente do arquivo `.env.example`.
- No terminal, estando na raiz do projeto, execute:

```bash
docker-compose up
# ou para rebuildar as imagens
docker-compose up --build
```

O projeto ficará disponível em `http://localhost:3000`.

OBS: Este processo foi projetado para simplificar a experiência do usuário, eliminando a necessidade de lidar manualmente com migrações de banco ou configurações locais complexas.

---

### 2. Opção - Execução local com banco externo

Se preferir rodar localmente sem Docker, utilizando um banco externo (como Neon db):

- Crie uma conta em Neon, crie um projeto e copie a variável DATABASE_URL do painel .env.

- Crie um arquivo .env na pasta apps/backend com essa variável.

No terminal, navegue até apps/backend, execute:

```bash
cd apps/backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

- Em outro terminal, navegue até o frontend:

```bash
cd apps/frontend
npm install
npm run dev
```

Acesse `http://localhost:3000` para usar a aplicação.

---

### 3. Opção - Deploy com GitHub Actions

O projeto está configurado com GitHub Actions para CI/CD. A pipeline realiza:

- Build e testes automatizados (backend com Jest, frontend com Jest + Babel)
- Deploy automático do frontend na Vercel
- Deploy do backend e banco na Render.com

**Links dos serviços em produção:**

- Frontend: *[seu-url-na-vercel]*
- Backend: *[seu-url-na-render]*

---

## Testes Locais

O projeto conta com testes unitários e de integração no backend e no frontend.

- **Backend:** Utiliza Jest para testar controllers, services e integração com Prisma.
- **Frontend:** Utiliza Jest com Babel para rodar testes em componentes React, hooks e utilitários.

> Obs: O frontend usa Turbopack para renderização rápida, mas como o Turbopack ainda não suporta testes robustos, utilizamos Babel para os testes.

Para rodar todos os testes localmente, navegue até as pastas backend ou frontend e execute o seguinte comando:

```bash
npm test
```

Este comando roda os testes do backend ou do frontend dependendo da pasta em que esteja, garantindo a qualidade da aplicação.

---

## Tecnologias Utilizadas

- **Frontend:** Next.js + TypeScript + TailwindCSS + ShadCN UI + Turbopack (renderização)
- **Backend:** NestJS + TypeScript + Prisma ORM + JWT + Class Validator + Jest
- **Banco:** PostgreSQL (Neon serverless + local via Docker + Render serverless)
- **CI/CD:** GitHub Actions (build, test, deploy automático)
- **Docker:** Docker Compose para desenvolvimento local
- **Testes:** Jest (backend e frontend), Jest Babel (frontend)
- **Documentação:** Readme + Swagger.
- **Husky + Lint-staged:** Melhorar a qualidade do código e automatizar verificações antes dos commits no Git. 

---

## Estrutura do Repositório

```
/my-todo-app
│
├── apps
│   ├── frontend    # Next.js + React + TypeScript
│   └── backend     # NestJS + TypeScript + Prisma
│
├── prisma          # Schema e migrations do Prisma
│   └── schema.prisma
│
├── .github
│   └── workflows   # Configuração do GitHub Actions
│       └── ci.yml
│
└── README.md
```

---

## Fluxo de Desenvolvimento

- Configure as variáveis de ambiente `.env` no backend e frontend.
- Execute `docker-compose up` para rodar todos os serviços em containers.
- Para rodar localmente, inicie backend e frontend separadamente, configurando o banco externo.
- Execute `npm test` para rodar todos os testes localmente.
- Deploy automático via GitHub Actions.

---

## Contato

Em caso de dúvidas ou sugestões, sinta-se à vontade para abrir uma issue ou contatar via GitHub.

---

**Obrigado pela oportunidade!**

John Rodrigues
