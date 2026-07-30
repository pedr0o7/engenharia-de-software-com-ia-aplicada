# MCP — Model Context Protocol

## 1. O Problema da Fragmentação

### A limitação dos LLMs

Modelos de Linguagem Grande (LLMs) possuem um conhecimento "congelado" no tempo em que foram treinados e operam de forma isolada, sem conseguir interagir nativamente com bancos de dados internos, APIs ou ferramentas em tempo real.

### O Problema "N × M"

Historicamente, conectar diferentes modelos de IA (Claude, ChatGPT, Gemini) a diferentes fontes de dados (Slack, GitHub, Postgres) exigia integrações personalizadas e individuais. Isso gerava alta dívida técnica e um pesadelo de manutenção, com o número de integrações crescendo exponencialmente.

---

## 2. O que é o MCP?

Lançado pela Anthropic no final de 2024, o **Model Context Protocol (MCP)** é um padrão de código aberto que fornece uma **interface universal** para conectar aplicativos de IA a fontes de dados e sistemas externos.

> **Metáfora principal:** É frequentemente descrito como o **"USB-C para aplicações de IA"**. Assim como o USB-C padroniza a conexão de periféricos em dispositivos, o MCP padroniza como a IA se conecta às ferramentas.

### Governança Neutra

O protocolo amadureceu rapidamente e foi doado para a **Linux Foundation**, passando a integrar a **Agentic AI Foundation (AAIF)**, ao lado de outras gigantes do mercado de tecnologia, garantindo que o padrão permaneça neutro e livre de monopólios.

---

## 3. Arquitetura e Componentes Principais

O MCP estabelece uma separação clara de responsabilidades baseada no formato de mensagens **JSON-RPC 2.0** (usando transporte local via `stdio` ou rede via `HTTP/SSE`). Ele é composto por três blocos:

### Host (Hospedeiro)

A aplicação principal onde o modelo de IA roda e onde o usuário interage.
Exemplos: Claude Desktop, Cursor, VS Code.

### Client (Cliente)

O componente dentro do Host responsável por gerenciar a conexão. Ele traduz os pedidos da IA (ex: "Preciso de dados de clientes") em solicitações estruturadas pelo protocolo.

### Server (Servidor)

Um serviço executado de forma independente que atua como ponte segura, expondo os dados ou ferramentas externas (ex: banco de dados local ou API do Google Drive) para o modelo.

---

## 4. As 3 Primitivas do Servidor MCP

Para que a IA tenha contexto e capacidade de ação, os servidores expõem três elementos centrais:

| Primitiva                | Descrição                                                                | Exemplo                                                 |
| ------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| **Resources** (Recursos) | Dados de leitura que a IA pode consumir para obter contexto.             | Arquivos de texto, esquemas de bancos de dados.         |
| **Tools** (Ferramentas)  | Funções executáveis que a IA pode invocar para realizar ações ativas.    | Rodar uma query SQL, criar um ticket, enviar um e-mail. |
| **Prompts**              | Templates e fluxos de trabalho pré-definidos para guiar o comportamento. | Prompts padronizados de análise ou formatação.          |

### MCP × Agent Skills — um comparativo rápido

O MCP fornece os **"braços e as pernas"** da IA (capacidade física de tocar e modificar sistemas externos), enquanto as Agent Skills fornecem o **"cérebro"** (o conhecimento processual, como regras de negócios). Eles funcionam melhor juntos.

---

## 5. Fluxo de Funcionamento

O ciclo de invocação segue três etapas:

1. **Descoberta** — O Cliente solicita ao Servidor MCP uma lista das ferramentas disponíveis (`tools/list`).
2. **Planejamento** — Baseado na instrução do usuário, o LLM decide quais ferramentas usar e com quais parâmetros.
3. **Execução** — A IA chama a ferramenta (`tools/call`), o servidor executa a ação no sistema externo e devolve a resposta.

### Exemplo prático

> "Baixe a transcrição do Google Drive e anexe no prospecto do Salesforce."

O LLM identifica duas ferramentas (Google Drive e Salesforce), planeja a sequência e executa cada chamada via MCP.

### Modularidade corporativa

Um único servidor MCP do Jira pode ser reaproveitado por diversos agentes de IA — seja no chat, no terminal de programação ou no sistema de suporte.

---

## 6. Riscos, Desafios e Otimizações de Custo

### O Paradoxo do Custo de Tokens

Conectar uma IA a dezenas de servidores MCP sobrecarrega a janela de contexto: apenas carregar o catálogo de ferramentas pode consumir entre **50.000 e 150.000 tokens por sessão** em ambientes corporativos.

**Solução Arquitetural — Execução de Código (Code-First):**
Em vez de deixar o modelo chamar ferramentas "cegamente", o agente gera pequenos scripts (TypeScript/Python) em sandboxes isoladas. Esses scripts interagem com os servidores MCP nos bastidores, processando os dados externamente (ex: filtrar uma planilha de 10 mil linhas e retornar só 5 para a IA). Resultado: **redução de até 98–99% no consumo de tokens e na latência**.

### A Falsa Sensação de Segurança (Gaps Semânticos)

O MCP oferece excelente isolamento de processos. Contudo, pesquisas acadêmicas revelaram um risco alarmante: **inconsistência entre descrição e código**.

A IA escolhe ferramentas com base nas descrições em linguagem natural. Em cerca de **13% dos servidores**, existe uma divergência séria. Por exemplo: uma ferramenta descrita como "apenas leitura do perfil do usuário" pode conter, nos bastidores, um comando de deleção de banco de dados ou expor o comando `killtree` para derrubar processos.

**Como mitigar:**

- Implementar a política de **Privilégio Mínimo (Zero Trust)**.
- Utilizar **gateways** de segurança.
- Adotar **Human-in-the-loop** (aprovação manual obrigatória) para qualquer ferramenta de execução irreversível.

---

## 7. Resumo

- O MCP **democratizou e padronizou** a integração das IAs, acabaram as construções "apenas para OpenAI" ou "apenas para Claude".
- Arquitetura limpa via **Client/Server**; envio de dados e ações via **Tools/Resources**.
- Exige cuidado na camada de **segurança** (gaps de código e vazamento de prompt) e atenção aos altos custos de contexto (resolvidos delegando execuções para scripts gerados pela IA).
