# Live Ótica - Site de Compra e Agendamento

Projeto criado como parte do site da Live Ótica — um site moderno para visualização de produtos e agendamento de exames oftalmológicos.

## 🧾 Sobre o Projeto

Este é um site estático com funcionalidades dinâmicas, construído com:

- HTML5
- TailwindCSS
- JavaScript
- PHP + MySQL
- Docker para ambiente local
- Deploy gratuito no [Railway.app](https://railway.app) 

---

## 🛠️ Funcionalidades

- 🛒 Carrinho de compras com atualização automática
- 📦 Adicionar/remover itens no modal
- 📲 Máscaras de CPF e Telefone
- 📩 Formulário de agendamento salvo no banco
- 📱 Responsivo e adaptável a dispositivos móveis

---

## 📁 Estrutura do Projeto

live-otica/
├── src/
│ ├── index.html
│ ├── script.js
│ ├── style.css
│ └── salvar_agendamento.php
├── assets/
│ └── imagens/
├── docker-compose.yml
├── Dockerfile
├── README.md
└── .gitignore


---

## 🐳 Como Rodar Localmente

1. Instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/) 
2. Clone o repositório:

```bash
git clone https://github.com/Fabio-TI/live-otica.git 
cd live-otica

Inicie os serviços:

docker-compose up -d

Acesse: http://localhost:8080

🚆 Como Fazer Deploy no Railway
Crie uma conta no Railway.app
No painel, clique em "New Project"
Escolha Deploy from GitHub Repo
Conecte seu repositório: Fabio-TI/live-otica
Após deploy, clique em Variables e adicione:

DB_HOST=mysql
DB_USER=root
DB_PASS=root
DB_NAME=liveotica

Acesse o link gerado pelo Railway (ex: https://live-otica.up.railway.app)

📝 Créditos
Desenvolvido por Fabio-TI
Para mais projetos, visite: https://github.com/Fabio-TI