# 📊 Dados Mock - Jornada #4800

**Data de Criação**: 27 de novembro de 2025  
**Arquivo**: `domains/studio/data/backoffice/questoes-mock.json`  
**Status**: ✅ Pronto para uso

---

## 📋 Resumo dos Dados

### Questões
- **Total**: 16 questões simuladas
- **Distribuição por Rede**:
  - Canoas: 5 questões
  - Porto Alegre: 5 questões
  - Gravataí: 4 questões
- **Distribuição por Status**:
  - Aprovada: 13 questões ✅
  - Em Revisão: 2 questões 🔄
  - Rejeitada: 1 questão ❌
- **Distribuição por Nível**:
  - Fácil: 6 questões
  - Médio: 8 questões
  - Difícil: 1 questão
- **Disciplinas Cobertas**: Matemática, Geografia, Língua Portuguesa, História, Biologia, Ciências, Física

### Redes
| Rede | Sigla | Cor | ID |
|------|-------|-----|-----|
| Canoas | CNS | #3B82F6 (Azul) | 1 |
| Porto Alegre | POA | #EF4444 (Vermelho) | 2 |
| Gravataí | GRV | #10B981 (Verde) | 3 |

---

## 🎨 Cores por Rede

Essas cores podem ser usadas nos badges das questões:

```css
/* Canoas */
.badge-canoas { background-color: #3B82F6; }

/* Porto Alegre */
.badge-porto-alegre { background-color: #EF4444; }

/* Gravataí */
.badge-gravaçai { background-color: #10B981; }
```

---

## 📐 Estrutura de Dados

```json
{
  "questoes": [
    {
      "id": "13749",
      "codigo": "13749",
      "enunciado": "...",
      "alternativas": ["...", "...", "...", "..."],
      "gabarito": "...",
      "disciplina": "...",
      "topico": "...",
      "nivel": "Fácil|Médio|Difícil",
      "autor": "...",
      "criador": "...",
      "revisor": "...",
      "dataCriacao": "2025-11-20T10:30:00Z",
      "uso": "Canoas|Porto Alegre|Gravataí",
      "status": "aprovada|em-revisao|rejeitada",
      "habilidades": ["EF07MA01", "..."]
    }
  ],
  "redes": [
    {
      "id": "1",
      "nome": "Canoas",
      "cor": "#3B82F6",
      "sigla": "CNS"
    }
  ]
}
```

---

## 🚀 Como Usar no Studio Puck

### 1. Importar dados em um componente
```typescript
import questoesMock from '@/data/backoffice/questoes-mock.json';

export default function QuestoesList() {
  const { questoes, redes } = questoesMock;
  
  return (
    <div>
      {questoes.map(q => (
        <div key={q.id}>
          <h3>{q.codigo}</h3>
          <p>{q.enunciado}</p>
          <span className={`badge-${q.uso.toLowerCase()}`}>
            {q.uso}
          </span>
        </div>
      ))}
    </div>
  );
}
```

### 2. Implementar filtro por rede
```typescript
const [selectedRede, setSelectedRede] = useState('');

const filtered = selectedRede 
  ? questoes.filter(q => q.uso === selectedRede)
  : questoes;
```

### 3. Usar cores do mock
```typescript
// Buscar cor da rede
const getRede = (redeName) => {
  return redes.find(r => r.nome === redeName);
};

// Exemplo
const redeCores = getRede('Canoas'); // { id: '1', nome: 'Canoas', cor: '#3B82F6', ... }
```

---

## 🧪 Como Usar no Storybook

### Exemplo de Story
```typescript
import questoesMock from '@/data/backoffice/questoes-mock.json';

export default {
  title: 'BackOffice/QuestoesList',
  component: QuestoesList,
};

export const ComFiltro = {
  args: {
    questoes: questoesMock.questoes,
    redes: questoesMock.redes,
  },
};

export const SomenteCanoas = {
  args: {
    questoes: questoesMock.questoes.filter(q => q.uso === 'Canoas'),
    redes: questoesMock.redes,
  },
};
```

---

## 📝 Exemplo de Questão Mock

```json
{
  "id": "13749",
  "codigo": "13749",
  "enunciado": "Qual é o resultado de 2 + 2?",
  "alternativas": ["3", "4", "5", "6"],
  "gabarito": "4",
  "disciplina": "Matemática",
  "topico": "1.17.4 Números Inteiros",
  "nivel": "Fácil",
  "autor": "GG",
  "criador": "FM",
  "revisor": "BC",
  "dataCriacao": "2025-11-20T10:30:00Z",
  "uso": "Canoas",
  "status": "aprovada",
  "habilidades": ["EF07MA01"]
}
```

---

## 🎯 Próximas Fases

1. **Fase 2**: Criar componentes no Storybook (Badge, Filter, Modal)
2. **Fase 3**: Integrar mocks em páginas do Studio Puck
3. **Fase 4**: Substituir mocks por API real (pós-prototipagem)

---

## 📌 Notas

- ✅ Dados suficientes para demonstrar todos os recursos
- ✅ 3 redes com cores distintas
- ✅ Mix de status para validar filtros
- ✅ Pronto para uso imediato no Studio e Storybook
- 🔄 Pode ser expandido conforme necessário (adicionar mais questões, redes, etc)

