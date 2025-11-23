# Mocks de Dados - Game Hub

> 🎲 Dados estáticos para prototipação e testes do Game Hub

---

## 📋 Como Usar

Estes mocks servem para:
1. **Prototipação no Studio**: Copiar/colar dados em páginas Puck
2. **Testes manuais**: Validar layouts com diferentes volumes de dados
3. **Documentação**: Mostrar exemplos de estrutura de dados esperada
4. **Desenvolvimento futuro**: Base para contratos de API

---

## 🎮 Jogos Disponíveis

### Mock Completo (4 jogos)

```json
[
  {
    "id": "quiz-matematica-basica",
    "title": "Quiz de Matemática Básica",
    "description": "Teste seus conhecimentos em operações matemáticas fundamentais: adição, subtração, multiplicação e divisão.",
    "detailedDescription": "Um quiz interativo com 10 questões de múltipla escolha cobrindo operações básicas. Perfeito para revisar conceitos e praticar cálculo mental. Tempo recomendado: 10 minutos.",
    "icon": "🧮",
    "category": "quiz",
    "difficulty": "easy",
    "estimatedTime": 10,
    "rewardPoints": 100,
    "status": "in_progress",
    "userProgress": 45,
    "userBestScore": 850,
    "userAttempts": 3,
    "rules": [
      "10 questões de múltipla escolha",
      "Cada questão vale 100 pontos",
      "Sem limite de tempo",
      "Pode jogar quantas vezes quiser"
    ],
    "objectives": [
      "Acertar pelo menos 7 de 10 questões",
      "Completar em menos de 10 minutos",
      "Atingir 900+ pontos"
    ]
  },
  {
    "id": "puzzle-palavras-cruzadas",
    "title": "Palavras Cruzadas Educativas",
    "description": "Complete as palavras cruzadas com termos educacionais e científicos.",
    "detailedDescription": "Um desafio de vocabulário com termos de diversas áreas do conhecimento. Teste sua cultura geral enquanto aprende novas palavras. 15 palavras para descobrir!",
    "icon": "📝",
    "category": "puzzle",
    "difficulty": "medium",
    "estimatedTime": 15,
    "rewardPoints": 150,
    "status": "new",
    "userProgress": 0,
    "rules": [
      "15 palavras para completar",
      "Dicas disponíveis para cada palavra",
      "Pode usar dicionário",
      "Salva progresso automaticamente"
    ],
    "objectives": [
      "Completar todas as 15 palavras",
      "Usar no máximo 5 dicas",
      "Terminar em menos de 15 minutos"
    ]
  },
  {
    "id": "aventura-historia-brasil",
    "title": "Aventura pela História do Brasil",
    "description": "Viaje pelo tempo e aprenda sobre momentos históricos importantes do Brasil.",
    "detailedDescription": "Uma aventura interativa que leva você por 5 períodos históricos: Descobrimento, Colônia, Império, República Velha e Era Moderna. Em cada período, tome decisões e responda perguntas para avançar na linha do tempo.",
    "icon": "🗺️",
    "category": "adventure",
    "difficulty": "medium",
    "estimatedTime": 20,
    "rewardPoints": 200,
    "status": "completed",
    "userProgress": 100,
    "userBestScore": 1500,
    "userAttempts": 1,
    "rules": [
      "5 capítulos históricos",
      "Cada capítulo tem 3-4 perguntas",
      "Decisões afetam a narrativa",
      "Pode rejogar para ver finais alternativos"
    ],
    "objectives": [
      "Completar todos os 5 capítulos",
      "Acertar pelo menos 80% das perguntas",
      "Desbloquear 3 finais diferentes"
    ]
  },
  {
    "id": "memoria-capitais",
    "title": "Jogo da Memória - Capitais",
    "description": "Encontre os pares de países e suas capitais neste clássico jogo da memória.",
    "detailedDescription": "Um jogo da memória com 12 pares de cartas mostrando países e suas capitais. Vire as cartas e encontre os pares corretos. Quanto menos tentativas, mais pontos!",
    "icon": "🌍",
    "category": "memory",
    "difficulty": "easy",
    "estimatedTime": 5,
    "rewardPoints": 80,
    "status": "new",
    "userProgress": 0,
    "rules": [
      "12 pares de cartas (24 cartas no total)",
      "Vire 2 cartas por vez",
      "Se formar par, cartas ficam abertas",
      "Se não formar, cartas viram novamente"
    ],
    "objectives": [
      "Encontrar todos os 12 pares",
      "Completar em no máximo 30 tentativas",
      "Terminar em menos de 5 minutos"
    ]
  }
]
```

### Mock Reduzido (para testes de layout)

```json
[
  {
    "id": "game-1",
    "title": "Jogo Exemplo 1",
    "description": "Descrição curta do jogo.",
    "icon": "🎮",
    "category": "quiz",
    "difficulty": "easy",
    "estimatedTime": 5,
    "rewardPoints": 50,
    "status": "new"
  },
  {
    "id": "game-2",
    "title": "Jogo com Nome Muito Longo para Testar Quebra de Linha",
    "description": "Descrição também muito longa para testar como o layout se comporta com textos extensos que podem quebrar em múltiplas linhas.",
    "icon": "🧩",
    "category": "puzzle",
    "difficulty": "hard",
    "estimatedTime": 30,
    "rewardPoints": 500,
    "status": "in_progress",
    "userProgress": 75
  }
]
```

---

## 🏆 Leaderboard Global

### Mock Completo (20 entradas)

```json
[
  { "rank": 1, "userId": "user-001", "username": "Ana Silva", "avatar": "👩", "score": 5420, "isCurrentUser": false },
  { "rank": 2, "userId": "user-002", "username": "Pedro Santos", "avatar": "👨", "score": 5180, "isCurrentUser": false },
  { "rank": 3, "userId": "user-003", "username": "Maria Oliveira", "avatar": "👩", "score": 4950, "isCurrentUser": false },
  { "rank": 4, "userId": "user-004", "username": "João Costa", "avatar": "👨", "score": 4720, "isCurrentUser": false },
  { "rank": 5, "userId": "user-005", "username": "Carla Souza", "avatar": "👩", "score": 4500, "isCurrentUser": false },
  { "rank": 6, "userId": "user-006", "username": "Lucas Pereira", "avatar": "👨", "score": 4280, "isCurrentUser": false },
  { "rank": 7, "userId": "user-007", "username": "Fernanda Lima", "avatar": "👩", "score": 4100, "isCurrentUser": false },
  { "rank": 8, "userId": "user-008", "username": "Rafael Alves", "avatar": "👨", "score": 3950, "isCurrentUser": false },
  { "rank": 9, "userId": "user-009", "username": "Juliana Rocha", "avatar": "👩", "score": 3800, "isCurrentUser": false },
  { "rank": 10, "userId": "user-010", "username": "Marcos Dias", "avatar": "👨", "score": 3650, "isCurrentUser": false },
  { "rank": 11, "userId": "user-011", "username": "Patricia Gomes", "avatar": "👩", "score": 3500, "isCurrentUser": false },
  { "rank": 12, "userId": "user-012", "username": "Rodrigo Martins", "avatar": "👨", "score": 3400, "isCurrentUser": false },
  { "rank": 13, "userId": "user-013", "username": "Camila Ferreira", "avatar": "👩", "score": 3300, "isCurrentUser": false },
  { "rank": 14, "userId": "user-014", "username": "Bruno Barbosa", "avatar": "👨", "score": 3250, "isCurrentUser": false },
  { "rank": 15, "userId": "current", "username": "Você", "avatar": "😊", "score": 3200, "isCurrentUser": true },
  { "rank": 16, "userId": "user-016", "username": "Aline Ribeiro", "avatar": "👩", "score": 3150, "isCurrentUser": false },
  { "rank": 17, "userId": "user-017", "username": "Thiago Carvalho", "avatar": "👨", "score": 3050, "isCurrentUser": false },
  { "rank": 18, "userId": "user-018", "username": "Beatriz Sousa", "avatar": "👩", "score": 2980, "isCurrentUser": false },
  { "rank": 19, "userId": "user-019", "username": "Gabriel Moreira", "avatar": "👨", "score": 2900, "isCurrentUser": false },
  { "rank": 20, "userId": "user-020", "username": "Larissa Castro", "avatar": "👩", "score": 2850, "isCurrentUser": false }
]
```

### Mock Top 3 (para preview)

```json
[
  { "rank": 1, "userId": "user-001", "username": "Ana Silva", "avatar": "👩", "score": 5420, "isCurrentUser": false },
  { "rank": 2, "userId": "user-002", "username": "Pedro Santos", "avatar": "👨", "score": 5180, "isCurrentUser": false },
  { "rank": 3, "userId": "user-003", "username": "Maria Oliveira", "avatar": "👩", "score": 4950, "isCurrentUser": false }
]
```

---

## 🎯 Leaderboard Por Jogo

### Quiz de Matemática Básica

```json
[
  { "rank": 1, "userId": "user-010", "username": "Carlos Pereira", "avatar": "👨", "score": 1500, "isCurrentUser": false },
  { "rank": 2, "userId": "current", "username": "Você", "avatar": "😊", "score": 1450, "isCurrentUser": true },
  { "rank": 3, "userId": "user-011", "username": "Julia Alves", "avatar": "👩", "score": 1380, "isCurrentUser": false },
  { "rank": 4, "userId": "user-012", "username": "Roberto Silva", "avatar": "👨", "score": 1250, "isCurrentUser": false },
  { "rank": 5, "userId": "user-013", "username": "Sandra Costa", "avatar": "👩", "score": 1180, "isCurrentUser": false },
  { "rank": 6, "userId": "user-014", "username": "Felipe Oliveira", "avatar": "👨", "score": 1100, "isCurrentUser": false },
  { "rank": 7, "userId": "user-015", "username": "Marina Santos", "avatar": "👩", "score": 1050, "isCurrentUser": false },
  { "rank": 8, "userId": "user-016", "username": "André Lima", "avatar": "👨", "score": 980, "isCurrentUser": false },
  { "rank": 9, "userId": "user-017", "username": "Paula Rocha", "avatar": "👩", "score": 920, "isCurrentUser": false },
  { "rank": 10, "userId": "user-018", "username": "Diego Martins", "avatar": "👨", "score": 850, "isCurrentUser": false }
]
```

### Aventura pela História do Brasil

```json
[
  { "rank": 1, "userId": "current", "username": "Você", "avatar": "😊", "score": 1500, "isCurrentUser": true },
  { "rank": 2, "userId": "user-020", "username": "Helena Dias", "avatar": "👩", "score": 1480, "isCurrentUser": false },
  { "rank": 3, "userId": "user-021", "username": "Vinicius Gomes", "avatar": "👨", "score": 1420, "isCurrentUser": false },
  { "rank": 4, "userId": "user-022", "username": "Isabela Ferreira", "avatar": "👩", "score": 1380, "isCurrentUser": false },
  { "rank": 5, "userId": "user-023", "username": "Leonardo Barbosa", "avatar": "👨", "score": 1300, "isCurrentUser": false }
]
```

---

## 📊 Resultados de Jogo

### Resultado Excelente (novo recorde pessoal)

```json
{
  "gameId": "quiz-matematica-basica",
  "gameTitle": "Quiz de Matemática Básica",
  "score": 920,
  "previousBestScore": 850,
  "isNewPersonalBest": true,
  "timeSpent": 480,
  "timeSpentFormatted": "8min 0s",
  "correctAnswers": 9,
  "totalQuestions": 10,
  "accuracy": 90,
  "newBadges": [
    {
      "id": "badge-first-90-percent",
      "name": "Mestre da Precisão",
      "description": "Acerte 90% ou mais em um quiz",
      "icon": "🎯"
    }
  ],
  "rankPosition": 12,
  "rankChange": 3,
  "pointsEarned": 920,
  "celebrationMessage": "🎉 Parabéns! Novo recorde pessoal!"
}
```

### Resultado Bom (não é recorde)

```json
{
  "gameId": "puzzle-palavras-cruzadas",
  "gameTitle": "Palavras Cruzadas Educativas",
  "score": 1200,
  "previousBestScore": 1350,
  "isNewPersonalBest": false,
  "timeSpent": 780,
  "timeSpentFormatted": "13min 0s",
  "correctAnswers": 12,
  "totalQuestions": 15,
  "accuracy": 80,
  "newBadges": [],
  "rankPosition": 25,
  "rankChange": -2,
  "pointsEarned": 1200,
  "celebrationMessage": "Bom trabalho! Continue praticando para superar seu recorde."
}
```

### Resultado Primeiro Jogo (sem recorde anterior)

```json
{
  "gameId": "memoria-capitais",
  "gameTitle": "Jogo da Memória - Capitais",
  "score": 650,
  "previousBestScore": null,
  "isNewPersonalBest": true,
  "timeSpent": 240,
  "timeSpentFormatted": "4min 0s",
  "correctAnswers": 12,
  "totalQuestions": 12,
  "accuracy": 100,
  "attempts": 28,
  "newBadges": [
    {
      "id": "badge-first-game",
      "name": "Primeira Vitória",
      "description": "Complete seu primeiro jogo",
      "icon": "🏅"
    },
    {
      "id": "badge-perfect-memory",
      "name": "Memória Perfeita",
      "description": "Encontre todos os pares no jogo da memória",
      "icon": "🧠"
    }
  ],
  "rankPosition": 8,
  "rankChange": null,
  "pointsEarned": 650,
  "celebrationMessage": "🎊 Primeira vitória! Você está começando muito bem!"
}
```

---

## 🏅 Badges/Conquistas

### Lista de Badges Disponíveis

```json
[
  {
    "id": "badge-first-game",
    "name": "Primeira Vitória",
    "description": "Complete seu primeiro jogo",
    "icon": "🏅",
    "category": "milestone",
    "rarity": "common"
  },
  {
    "id": "badge-first-90-percent",
    "name": "Mestre da Precisão",
    "description": "Acerte 90% ou mais em um quiz",
    "icon": "🎯",
    "category": "achievement",
    "rarity": "rare"
  },
  {
    "id": "badge-perfect-memory",
    "name": "Memória Perfeita",
    "description": "Encontre todos os pares no jogo da memória",
    "icon": "🧠",
    "category": "achievement",
    "rarity": "uncommon"
  },
  {
    "id": "badge-speed-runner",
    "name": "Velocista",
    "description": "Complete um jogo em menos de 5 minutos",
    "icon": "⚡",
    "category": "achievement",
    "rarity": "rare"
  },
  {
    "id": "badge-top-10",
    "name": "Campeão",
    "description": "Entre no top 10 do ranking global",
    "icon": "👑",
    "category": "competitive",
    "rarity": "epic"
  },
  {
    "id": "badge-streak-7",
    "name": "Dedicado",
    "description": "Jogue por 7 dias seguidos",
    "icon": "🔥",
    "category": "engagement",
    "rarity": "rare"
  },
  {
    "id": "badge-all-games",
    "name": "Explorador",
    "description": "Complete pelo menos um jogo de cada categoria",
    "icon": "🗺️",
    "category": "exploration",
    "rarity": "epic"
  },
  {
    "id": "badge-100-games",
    "name": "Veterano",
    "description": "Complete 100 jogos no total",
    "icon": "🎖️",
    "category": "milestone",
    "rarity": "legendary"
  }
]
```

---

## 📈 Estatísticas do Usuário (para Dashboard)

```json
{
  "userId": "current",
  "username": "Você",
  "avatar": "😊",
  "totalScore": 3200,
  "globalRank": 15,
  "totalGamesPlayed": 27,
  "totalGamesCompleted": 18,
  "completionRate": 67,
  "averageAccuracy": 82,
  "totalTimeSpent": 8640,
  "totalTimeSpentFormatted": "2h 24min",
  "badgesEarned": 5,
  "totalBadgesAvailable": 12,
  "favoriteCategory": "quiz",
  "currentStreak": 4,
  "longestStreak": 9,
  "gamesByCategory": {
    "quiz": 12,
    "puzzle": 8,
    "adventure": 3,
    "memory": 4,
    "strategy": 0
  },
  "recentAchievements": [
    {
      "badgeId": "badge-first-90-percent",
      "unlockedAt": "2025-11-23T14:30:00Z"
    },
    {
      "badgeId": "badge-streak-7",
      "unlockedAt": "2025-11-22T10:15:00Z"
    }
  ]
}
```

---

## 🎮 Estado de Jogo (Durante Gameplay)

### Quiz - Estado Atual

```json
{
  "gameId": "quiz-matematica-basica",
  "gameTitle": "Quiz de Matemática Básica",
  "currentQuestion": 5,
  "totalQuestions": 10,
  "currentScore": 400,
  "startedAt": "2025-11-23T15:00:00Z",
  "elapsedTime": 300,
  "elapsedTimeFormatted": "5min 0s",
  "correctSoFar": 4,
  "question": {
    "id": "q5",
    "text": "Quanto é 7 × 8?",
    "options": [
      { "id": "a", "text": "54" },
      { "id": "b", "text": "56" },
      { "id": "c", "text": "58" },
      { "id": "d", "text": "64" }
    ],
    "correctAnswer": "b",
    "pointValue": 100
  }
}
```

### Jogo da Memória - Estado Atual

```json
{
  "gameId": "memoria-capitais",
  "gameTitle": "Jogo da Memória - Capitais",
  "totalPairs": 12,
  "foundPairs": 7,
  "attempts": 18,
  "currentScore": 450,
  "startedAt": "2025-11-23T15:10:00Z",
  "elapsedTime": 180,
  "elapsedTimeFormatted": "3min 0s",
  "cards": [
    { "id": "c1", "content": "🇧🇷 Brasil", "pair": "c13", "status": "found" },
    { "id": "c2", "content": "🇦🇷 Argentina", "pair": "c14", "status": "found" },
    { "id": "c3", "content": "🇺🇸 EUA", "pair": "c15", "status": "hidden" },
    { "id": "c4", "content": "🇫🇷 França", "pair": "c16", "status": "flipped" },
    "..."
  ]
}
```

---

## 🔍 Notas sobre os Mocks

### Convenções Adotadas

1. **IDs**: Formato `tipo-nome-descritivo` (ex: `quiz-matematica-basica`)
2. **Timestamps**: ISO 8601 format (ex: `2025-11-23T15:00:00Z`)
3. **Scores**: Números inteiros de 0 a infinito (sem limite superior definido)
4. **Usernames**: Nomes reais brasileiros para autenticidade
5. **Avatars**: Emojis simples (👨👩😊) para prototipação, serão substituídos por imagens reais

### Variações para Testes

- **Vazio**: Arrays vazios para testar "nenhum jogo disponível" ou "leaderboard vazio"
- **Muitos dados**: Aumentar arrays para 50+ itens e testar performance e paginação
- **Textos longos**: Testar com títulos e descrições extensos para ver quebra de linha
- **Casos extremos**: Score 0, score muito alto (99999), progresso 0%, progresso 100%

### Como Extender

Para adicionar novos jogos ou categorias:

1. Copiar estrutura de um jogo existente
2. Modificar campos necessários (id, title, category, etc)
3. Manter consistência de formato (tipos de dados, naming, etc)
4. Adicionar ao array `mockGames`

---

**Última atualização**: 2025-11-23  
**Próxima revisão**: Quando componentes Progress/Leaderboard/Modal forem implementados  
**Responsável**: Equipe de Desenvolvimento
