# 📦 Sistema de Gerenciamento de Produtos

Uma aplicação web desenvolvida em **Angular** para gerenciamento de produtos com autenticação e CRUD.

---

## 📋 Descrição

Este projeto é um sistema de gerenciamento de produtos que permite:

- 📑 Listagem de produtos com paginação e filtros  
- ✏️ Criação e edição de produtos com formulários validados  
- 🗑️ Exclusão de produtos com confirmação  
- 🔄 Controle de status dos produtos (ativo/inativo)  
---

## 🚀 Tecnologias Utilizadas

- [Angular 20.2.0](https://angular.io/) - Framework principal  
- [Angular Material](https://material.angular.io/) - Componentes de UI  
- [RxJS](https://rxjs.dev/) - Programação reativa  
- [ngx-cookie-service](https://www.npmjs.com/package/ngx-cookie-service) - Gerenciamento de cookies  
- [ngx-mask](https://www.npmjs.com/package/ngx-mask) - Máscaras de entrada  
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação  

---

## 📦 Pré-requisitos
- Backend: (https://github.com/fbatalha7/Ecommerce.API)
- [Node.js](https://nodejs.org/) (versão **18 ou superior**)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  
- [Angular CLI](https://angular.io/cli)  

---

## 🔧 Instalação e Execução

Instale as dependências:

```bash
git clone https://github.com/fbatalha7/front-product.git
cd front-product
npm i -g

npm install @angular/cdk@^20.2.0 @angular/common@^20.2.0 @angular/compiler@^20.2.0 @angular/core@^20.2.0 @angular/forms@^20.2.0 @angular/material@^20.2.0 @angular/platform-browser@^20.2.0 @angular/router@^20.2.0 ngx-mask@^20.0.3 rxjs@~7.8.0 tslib@^2.3.0 --save

ou use

npm install @angular/cdk@^20.2.0
npm install @angular/common@^20.2.0
npm install @angular/compiler@^20.2.0
npm install @angular/core@^20.2.0
npm install @angular/forms@^20.2.0
npm install @angular/material@^20.2.0
npm install @angular/platform-browser@^20.2.0
npm install @angular/router@^20.2.0
npm install ngx-mask@^20.0.3
npm install rxjs@~7.8.0
npm install tslib@^2.3.0


npm start
# ou
ng serve

```

#🏗️ Estrutura do Projeto

```
src/app/
├── core/                     # Serviços e componentes principais
├── guards/
│   └── auth-guard.ts         # Guarda de autenticação
├── login/
│   └── login.component.*     # Componente de login
├── products/
│   ├── models/
│   │   └── product.model.ts  # Modelos de dados
│   ├── form-product/         # Formulário de produto
│   ├── products.component.*  # Lista de produtos
│   ├── products.service.ts   # Serviço de produtos
│   └── department.service.ts # Serviço de departamentos
└── shared/
    ├── modal-dialog/         # Componente de modal
    └── status-toggle/        # Toggle de status

```

#🔄 Fluxo da Aplicação
```
flowchart TD
    A[Usuário Acessa] --> B{Token Existe?}
    B -->|Não| C[Página de Login]
    B -->|Sim| D[Página de Produtos]
    
    C --> E[Inserir Credenciais]
    E --> F{Credenciais Válidas?}
    F -->|Não| G[Erro de Autenticação]
    G --> C
    F -->|Sim| H[Salvar Token no Cookie]
    H --> D
    
    D --> I[Carregar Lista de Produtos]
    I --> J[Exibir Tabela com Produtos]
    
    J --> K{Usuário Seleciona Ação}
    K -->|Novo Produto| L[Formulário de Criação]
    K -->|Editar Produto| M[Formulário de Edição]
    K -->|Excluir Produto| N[Confirmar Exclusão]
    K -->|Filtrar| O[Aplicar Filtros]
    
    L --> P[Preencher Dados]
    M --> P
    P --> Q{Formulário Válido?}
    Q -->|Não| R[Exibir Erros]
    R --> P
    Q -->|Sim| S[Salvar Produto]
    S --> T[Redirecionar para Lista]
    
    N --> U{Confirmar?}
    U -->|Não| J
    U -->|Sim| V[Excluir Produto]
    V --> W[Atualizar Lista]
```
<img width="452" height="539" alt="image" src="https://github.com/user-attachments/assets/3b824c23-cc11-494e-ae09-9214f4771727" />
