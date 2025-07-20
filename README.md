# README - Deploy Automatizado Backend + Frontend via GitHub Actions

## Estrutura do Projeto

O projeto é organizado como monorepo:

```
/apps/backend    # Backend API NestJS + Prisma
/apps/frontend   # Frontend Next.js
```

O banco de dados PostgreSQL está hospedado no Railway e conectado ao backend.

O deploy é automatizado usando GitHub Actions, que executa testes, builds e faz deploys sequenciais do backend no Railway e do frontend na Vercel.

---

## Workflow GitHub Actions (`ci.yml`)

O workflow dispara automaticamente ao fazer push na branch `main` e realiza:

### Job 1: Backend

- Instala Node.js (versão 18)
- Navega para `apps/backend`
- Instala dependências com `npm install`
- Roda testes com `npm test`
- Gera build com `npm run build`
- Instala CLI do Railway
- Faz deploy do backend no Railway com `railway up --detach`

### Job 2: Frontend (depende do backend terminar)

- Instala Node.js (versão 18)
- Navega para `apps/frontend`
- Instala dependências
- Roda testes do frontend
- Gera build da aplicação Next.js
- Instala CLI da Vercel
- Faz deploy na Vercel com `vercel --prod`

---

## Configuração de Secrets no GitHub

Configure os seguintes secrets no repositório do GitHub em **Settings > Secrets and variables > Actions**:

| Nome do Secret       | Descrição                             | Como obter                      |
|----------------------|------------------------------------|--------------------------------|
| `RAILWAY_API_KEY`    | Token para deploy Railway CLI       | Conta Railway > API Keys        |
| `VERCEL_TOKEN`       | Token para deploy Vercel CLI        | Conta Vercel > Tokens           |

---

## Deploy Manual

### Backend

```bash
curl -sSL https://railway.app/install.sh | sh
cd apps/backend
railway login
railway link
railway up --detach
```

### Frontend

```bash
npm install -g vercel
cd apps/frontend
vercel login
vercel --prod
```

---

## Testes e Build Locais

### Backend

```bash
cd apps/backend
npm install
npm test
npm run build
```

### Frontend

```bash
cd apps/frontend
npm install
npm test
npm run build
```

---

## Recomendações para Uso

- Utilize branches para desenvolvimento e faça merge em `master` via pull request.  
- Push direto em `master` dispara o deploy automático.  
- Atualize os secrets caso altere tokens nas plataformas.  
- Monitore as Actions no GitHub para identificar erros.

---

## Contato

Dúvidas ou problemas? Entre em contato:

- Email: john.rodrigues008@gmail.com  
- Slack/Discord: john.rodrigues008

---

**Pronto para um deploy contínuo seguro e eficiente!** 🚀
