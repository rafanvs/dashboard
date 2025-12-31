# Front (Next.js) + NextAuth (Credentials)

Este `front/` autentica via **NextAuth (Credentials Provider)** consumindo o backend NestJS em:

- `POST /auth/login` → retorna `{ "access_token": "..." }`
- `GET /auth/profile` (Bearer) → retorna `{ userId, email, name }`

## Variáveis de ambiente

Por configuração global do ambiente, arquivos `.env*` não são versionados aqui. Use o `env.example.txt` como base e crie manualmente um `front/.env.local` com:

```txt
NEXTAUTH_SECRET=coloque-um-segredo-forte-aqui
NEXTAUTH_URL=http://localhost:3000
BACKEND_URL=http://localhost:8080
```

## Rodando em desenvolvimento

### Backend (NestJS)

Rode o backend em `8080`:

```bash
cd back
# PowerShell
$env:PORT=8080
# (alternativa no cmd.exe: set PORT=8080)
npm run start:dev
```

### Front (Next.js)

```bash
cd front
npm run dev
```

Acesse `http://localhost:3000` e use:

- `/login` para entrar
- `/cadastro` para criar conta
- `/dashboard` como exemplo de página protegida (usa `getServerSession`)

## Onde está o NextAuth

- **Configuração**: `src/lib/auth.ts`
- **Rota**: `src/app/api/auth/[...nextauth]/route.ts`
- **Login**: `src/app/login/page.tsx`
- **Dashboard**: `src/app/dashboard/page.tsx`
