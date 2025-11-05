# 📚 Gerenciador de Cursos - UNOCHAPECÓ

Sistema de gerenciamento de cursos desenvolvido para a disciplina de Desenvolvimento para Web.

## 👥 Integrantes do Grupo

- Wilian Robal dos Santos
- Guilherme Luiz Sutille
- Victor Gabriel Nunes da Silva

## 📋 Descrição do Projeto

Sistema web para gerenciamento de cursos, professores e alunos, com funcionalidades de:
- Autenticação de usuários (login/logout)
- Cadastro e gerenciamento de professores
- Cadastro e gerenciamento de cursos
- Cadastro e gerenciamento de alunos
- Matrícula de alunos em cursos
- Relacionamento entre Professor → Curso → Aluno

## 🏗️ Arquitetura

O projeto segue a arquitetura **Controller → Service → Repository**:

```
src/
├── controllers/    # Gerenciam requisições HTTP
├── services/       # Lógica de negócio
├── repositories/   # Acesso aos dados
├── middlewares/    # Autenticação e validações
├── routes/         # Definição de rotas
└── data/          # Dados em memória
```

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Express-session** - Gerenciamento de sessões
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e responsividade
- **JavaScript** - Interatividade do front-end

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd gerenciador-de-cursos
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

Ou para desenvolvimento com auto-reload:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 🔑 Credenciais de Teste

**Administrador:**
- Username: `admin`
- Password: `admin123`

**Professor:**
- Username: `prof.joao`
- Password: `123456`

## 🌐 Rotas

### Rotas Públicas
- `GET /` - Página inicial
- `GET /sobre` - Sobre o sistema
- `GET /contato` - Contato
- `GET /login` - Página de login
- `POST /login` - Processar login
- `GET /logout` - Logout

### Rotas Privadas (Requerem autenticação)
- `GET /dashboard` - Dashboard principal
- `GET /professores` - Gerenciar professores
- `GET /cursos` - Gerenciar cursos
- `GET /alunos` - Gerenciar alunos

### API Endpoints

#### Professores
- `GET /professores/api` - Listar todos
- `GET /professores/api/:id` - Buscar por ID
- `POST /professores/api` - Criar novo
- `PUT /professores/api/:id` - Atualizar
- `DELETE /professores/api/:id` - Deletar

#### Cursos
- `GET /cursos/api` - Listar todos
- `GET /cursos/api/:id` - Buscar por ID
- `POST /cursos/api` - Criar novo
- `PUT /cursos/api/:id` - Atualizar
- `DELETE /cursos/api/:id` - Deletar

#### Alunos
- `GET /alunos/api` - Listar todos
- `GET /alunos/api/:id` - Buscar por ID
- `POST /alunos/api` - Criar novo
- `PUT /alunos/api/:id` - Atualizar
- `DELETE /alunos/api/:id` - Deletar
- `POST /alunos/api/matricular` - Matricular em curso
- `POST /alunos/api/cancelar-matricula` - Cancelar matrícula
