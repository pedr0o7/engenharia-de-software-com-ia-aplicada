# Agent Skills — O Conhecimento Procedimental da IA

## 1. O Problema da "Folha em Branco"

### O Paradigma do "Saber Como"

LLMs possuem conhecimento geral vasto — sabem escrever em Python ou React, mas sofrem do problema da **"folha em branco"** em contextos corporativos. Eles não conhecem a estrutura de pastas do seu projeto, as regras de negócio da empresa ou o que sua equipe considera "código de alta qualidade".

### A Solução Histórica (e suas limitações)

Até então, desenvolvedores precisavam colar "mega-prompts" imensos no início de cada conversa ou manter arquivos estáticos longos, consumindo muitos tokens e paciência.

---

## 2. O que são Agent Skills?

Formalizadas pela Anthropic como um **padrão aberto no final de 2025**, as Agent Skills ganharam um ecossistema prático com o **skills.sh** da Vercel, frequentemente chamado de **"o momento npm para agentes de IA"**.

Uma **Skill** é um pacote modular e estático que contém diretrizes, regras de decisão e procedimentos. Enquanto o MCP ensina a IA a _usar uma ferramenta_, uma Skill ensina a IA _como executar um processo_.

**Exemplos:**

- "Como fazer uma revisão de código de acessibilidade."
- "Como formatar relatórios financeiros."

---

## 3. Anatomia de uma Skill

O formato foi projetado para ser simples e portátil, baseado em um sistema de arquivos:

| Componente    | Obrigatoriedade | Descrição                                                                                     |
| ------------- | --------------- | --------------------------------------------------------------------------------------------- |
| `SKILL.md`    | **Obrigatório** | O coração da Skill. Metadados YAML (mínimo: `name` e `description`) + instruções em Markdown. |
| `scripts/`    | Opcional        | Arquivos executáveis (Python, Shell) para automatizar tarefas determinísticas.                |
| `references/` | Opcional        | Documentações extensas e guias de referência.                                                 |
| `assets/`     | Opcional        | Templates de arquivos e outros recursos.                                                      |

---

## 4. Divulgação Progressiva (Progressive Disclosure)

O maior diferencial arquitetural das Skills é como elas gerenciam o limite de tokens. O carregamento ocorre em **três fases**:

### Nível 1 — Descoberta

No início da sessão, o agente carrega apenas o `name` e a `description` da Skill (~30 a 100 tokens). A descrição funciona como um "gatilho".

> Exemplo: _"Use esta skill quando o usuário pedir para analisar PDFs."_

### Nível 2 — Ativação

Se o pedido do usuário bate com a descrição, a IA carrega o corpo do `SKILL.md` para o contexto (~200 a 5.000 tokens).

### Nível 3 — Execução

A IA só lê os arquivos pesados de `references/` ou executa `scripts/` se as instruções do Nível 2 mandarem.

**Benefício:** Você pode ter uma biblioteca com **100 Skills instaladas** custando apenas uma fração dos tokens, pois a IA só "abre o manual" daquela que for usar.

---

## 5. Como Usar na Prática

### O CLI `npx skills`

A Vercel introduziu uma ferramenta de linha de comando que padronizou a instalação de conhecimento:

```bash
npx skills add <usuario/repositorio>
```

O comando baixa um pacote de Skills diretamente do GitHub (ou do skills.sh) e detecta automaticamente quais agentes estão na máquina, instalando nos diretórios corretos (`.claude/skills/`, `.cursor/skills/`, `.windsurf/skills/`).

### Casos de Uso Reais

**Vercel — `react-best-practices`**
Pacote com 10 anos de regras de otimização de React e Next.js. Quando você pede ao Cursor para "revisar a performance deste componente", a Skill ativa mais de 40 regras estritas da Vercel.

**Apollo GraphQL — `apollographql/skills`**
Ensina a IA a usar as versões mais modernas do GraphQL (ex: usar `$this` ao invés de variáveis antigas), evitando que gere código com padrões defasados de 2019.

**Firecrawl — CLI + Skills (em vez de MCP)**
Em vez de jogar todo o HTML extraído na conversa (~75.000 tokens), a Skill ensina a IA a raspar a web, salvar em `.md` e usar `grep` para ler apenas o necessário, com uma **redução de quase 98% no uso de tokens**.

---

## 6. Riscos de Segurança e Governança

### Ausência de Limites Rígidos (Sandboxing)

Diferente dos servidores MCP (processos isolados), as Skills são executadas **in-process** (no mesmo ambiente do agente) e herdam todas as permissões do terminal. Se a Skill instruir a IA a rodar um script malicioso, a IA poderá fazê-lo.

### O Estudo SkillScan — Dados Alarmantes

Pesquisadores analisaram mais de **42.000 skills comunitárias** e descobriram:

| Ameaça                       | Incidência |
| ---------------------------- | ---------- |
| Skills com vulnerabilidades  | **26,1%**  |
| Exfiltração de dados         | 13,3%      |
| Escalonamento de privilégios | 11,8%      |

Outros achados relevantes:

- Skills com a pasta `scripts/` têm **2,12× mais chance** de serem maliciosas.
- Foram confirmados casos de **"Ladrões de Dados"** (Data Thieves) disfarçados de skills úteis, projetados para roubar chaves de API e variáveis de ambiente.

### Como se Proteger?

Recomenda-se aplicar **portões de verificação** e um modelo de **níveis de confiança (Trust Tiers)**:

- Skills comunitárias não auditadas devem ter permissão **apenas para fornecer instruções de texto** (Markdown limpo).
- **Bloqueio absoluto** de execução de scripts de terceiros até que sejam inspecionados.
- Tratar a instalação de uma Skill com o **mesmo rigor que a instalação de software em produção**.

---

## 7. Resumo

- **MCP** é para conectividade e ferramentas → _Acessar_ o banco de dados.
- **Skills** são para conhecimento procedimental → _Como formatar_ o relatório com esses dados.
- A arquitetura baseada em arquivos (`SKILL.md`) combinada à **Divulgação Progressiva** resolve o problema de sobrecarga de tokens.
- É essencial ter **cautela ao rodar scripts de Skills comunitárias**, devido aos riscos comprovados de injeção de prompt e roubo de credenciais.

> **O futuro é a combinação:** as IAs mais eficientes usarão servidores MCP como seus "braços e pernas" para tocar o mundo externo com segurança, e uma robusta biblioteca de Skills como seu "cérebro" para saber o que fazer com essa capacidade.
