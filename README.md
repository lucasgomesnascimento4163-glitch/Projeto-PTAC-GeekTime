# Projeto-PTAC-GeekTime
Aluno: Lucas Gomes do Nascimento

Um catálogo pessoal para organizar animes e mangás que o usuário está acompanhando.

Funcionalidades:

Cadastrar animes e mangás.

Registrar episódios ou capítulos acompanhados.

Criar listas de favoritos.

Avaliar obras e manter um histórico.

O problema que resolve: dificuldade para lembrar onde parou e organizar uma coleção grande.

## API v1 — Obras

| Método | Rota | Corpo enviado | Resposta de sucesso | Erros |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/api/v1/obras` | — | `200`: array de obras | `500` |
| GET | `/api/v1/obras/favoritas` | — | `200`: array de obras favoritas | `500` |
| GET | `/api/v1/obras/:id` | — | `200`: uma obra | `404` |
| POST | `/api/v1/obras` | `{ titulo, tipo, totalUnidades?, progresso?, favorito?, nota? }` | `201`: obra criada | `400`, `409` |
| PUT | `/api/v1/obras/:id` | `{ titulo?, tipo?, totalUnidades?, progresso?, favorito?, nota? }` | `200`: obra atualizada | `400`, `404`, `409` |
| DELETE | `/api/v1/obras/:id` | — | `204`: sem corpo | `404`, `409` |

```bash
curl http://localhost:3000/api/v1/obras

curl -X POST http://localhost:3000/api/v1/obras \
  -H "Content-Type: application/json" \
  -d '{ "titulo": "Naruto", "tipo": "anime", "totalUnidades": 220, "progresso": 10 }'
```
