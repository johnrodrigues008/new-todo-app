# História do Usuário - Aplicação ToDo List

## Contexto

Como um usuário do sistema de gerenciamento de tarefas (ToDo), desejo ter uma experiência simples, segura e funcional para gerenciar minhas tarefas diárias, garantindo que minhas informações estejam protegidas e organizadas.

---

## História

### Cadastro e Login

- **Como** um novo usuário,  
- **Quero** me cadastrar com meu e-mail e senha,  
- **Para que** eu possa criar uma conta pessoal para armazenar minhas tarefas.

- **Como** um usuário cadastrado,  
- **Quero** realizar login com meu e-mail e senha,  
- **Para que** possa acessar minhas tarefas de forma segura.

- **Como** usuário autenticado,  
- **Quero** ter minhas rotas protegidas por autenticação JWT ou cookies,  
- **Para que** outras pessoas não tenham acesso às minhas informações sem permissão.

### Gerenciamento de Tarefas

- **Como** usuário autenticado,  
- **Quero** criar novas tarefas com título e descrição,  
- **Para que** eu possa organizar minhas atividades.

- **Como** usuário,  
- **Quero** listar somente as minhas tarefas,  
- **Para que** eu tenha uma visão personalizada do meu dia a dia.

- **Como** usuário,  
- **Quero** editar e atualizar minhas tarefas,  
- **Para que** eu possa modificar informações conforme a necessidade.

- **Como** usuário,  
- **Quero** deletar tarefas que não preciso mais,  
- **Para que** meu painel fique limpo e organizado.

### Funcionalidades Técnicas e Qualidade

- **Como** desenvolvedor,  
- **Quero** aplicar boas práticas com Next.js (frontend), NestJS (backend) e Prisma (ORM),  
- **Para que** a aplicação seja escalável, segura e de fácil manutenção.

- **Como** time de desenvolvimento,  
- **Quero** automatizar testes unitários no backend com Jest,  
- **Para que** possamos garantir a qualidade do código e a confiabilidade das funcionalidades.

- **Como** time de DevOps,  
- **Quero** configurar um pipeline de CI/CD com GitHub Actions,  
- **Para que** testes, lint e build sejam executados automaticamente, garantindo deploys consistentes.

- **Como** usuário final,  
- **Quero** acessar a aplicação com interface moderna e responsiva (com TailwindCSS e ShadCN UI como diferencial),  
- **Para que** a experiência seja agradável em qualquer dispositivo.

---

## Critérios de Sucesso

- Cadastro, login e autenticação funcionando corretamente.  
- CRUD completo para gerenciamento das tarefas do usuário.  
- Testes unitários implementados e rodando no backend.  
- Pipeline CI/CD configurado e ativo no GitHub Actions.  
- Código organizado e seguindo boas práticas.  
- Deploy funcionando em ambiente de produção (Vercel para frontend, Render para backend e banco).

---

Essa história guia o desenvolvimento e entrega do desafio, garantindo foco nas necessidades do usuário e nos requisitos técnicos esperados pela Cogna Martech.
