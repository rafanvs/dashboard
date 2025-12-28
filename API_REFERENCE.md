# Referência da API

Este documento descreve as rotas disponíveis na aplicação.

## Autenticação

### Login

Realiza o login de um usuário e retorna um token JWT.

- **URL**: `/auth/login`
- **Método**: `POST`
- **Corpo da Requisição (JSON)**:

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **Resposta Sucesso (201)**:

  ```json
  {
    "access_token": "token_jwt_aqui"
  }
  ```

### Perfil

Retorna as informações do usuário autenticado. Requer o token JWT.

- **URL**: `/auth/profile`
- **Método**: `GET`
- **Cabeçalhos**:
  - `Authorization`: `Bearer <access_token>`
- **Resposta Sucesso (200)**:

  ```json
  {
    "id": 1,
    "email": "user@example.com",
    "name": "Nome do Usuário",
    ...
  }
  ```

---

## Usuários

### Criar Usuário

Cadastra um novo usuário no sistema.

- **URL**: `/users`
- **Método**: `POST`
- **Corpo da Requisição (JSON)**:

  ```json
  {
    "email": "novo@example.com",
    "password": "senha",
    "name": "Nome Opcional"
  }
  ```

- **Resposta Sucesso (201)**:

  ```json
  {
    "id": 2,
    "email": "novo@example.com",
    "name": "Nome Opcional"
  }
  ```

### Listar Todos os Usuários

Retorna uma lista de todos os usuários cadastrados.

- **URL**: `/users`
- **Método**: `GET`
- **Resposta Sucesso (200)**:

  ```json
  [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "Nome do Usuário",
      "password": "hash_da_senha" // Atenção: Atualmente retorna a senha hash
    },
    ...
  ]
  ```
