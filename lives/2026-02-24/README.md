# MCP (Model Context Protocol) e Agent Skills

Live inaugural de aquecimento da **Pós-graduação em Engenharia de IA Aplicada**.

- 🗓️ 24 de fevereiro de 2026

---

## Professores

- [**Aurélio Oliveira**](https://www.linkedin.com/in/aurelioolive/)
- [**Weslley Araújo**](https://www.linkedin.com/in/wellwelwel/)

---

## 📚 Material de Apoio

### 📘 Base Teórica

- [Model Context Protocol (MCP) — O Padrão de Conexão Universal para IA](base-teorica/mcp-model-context-protocol.md)
- [Agent Skills — O Conhecimento Procedimental da IA](base-teorica/agent-skills-conhecimento-procedimental-da-ia.md)

### 🛠️ Ferramentas mencionadas

- [**Lovable**](https://lovable.dev/): Plataforma para criar aplicações web usando IA por meio de prompts em linguagem natural.
- [**Jira**](https://www.atlassian.com/software/jira): Ferramenta de gerenciamento de projetos e rastreamento de tarefas.
- **IDEs** (Integrated Development Environments):
  - [**Cursor**](https://www.cursor.so/): Editor de código com IA integrada nativamente.
  - [**Windsurf**](https://windsurf.com/): IDE com assistente de IA embutido para desenvolvimento de software.
- [**Codex – OpenAI’s coding agent**](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt): Agente de codificação da OpenAI como extensão para VS Code.
- [**GitHub Copilot Chat**](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat): Assistente de IA do GitHub para sugestões e geração de código.
- [**Firecrawl**](https://www.firecrawl.dev/): Ferramenta **CLI** que converte páginas web em texto limpo para consumo por LLMs.

### 👷‍♂️ Ferramentas utilizadas

- **IDE** (Integrated Development Environment):
  - [**VS Code**](https://code.visualstudio.com/): Editor de código gratuito e extensível da Microsoft.
- [**Claude Code for VS Code**](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code): Extensão da Anthropic que integra o agente Claude Code diretamente no VS Code.
- [**skills.sh**](https://skills.sh/): Plataforma para descobrir e compartilhar Agent Skills.
- [**Gitingest**](https://gitingest.com/): Ferramenta que converte repositórios em texto para consumo por LLMs.
- [**Jina Reader**](https://jina.ai/reader/#what_reader): Ferramenta que converte páginas web em texto limpo para consumo por LLMs.

### 📦 Projetos utilizados nos exemplos

- [**Awesome You**](https://awesomeyou.io/) → https://awesomeyou.io/llms.txt
- [**AbacatePay**](https://www.abacatepay.com/) → https://www.abacatepay.com/llms.txt
- [**MySQL2**](https://github.com/sidorares/node-mysql2) (código-fonte / cobaia)
- [**Poku**](https://github.com/wellwelwel/poku) (código-fonte)
  - → https://gitingest.com/wellwelwel/poku
- [**Poku**](https://poku.io/docs/documentation/helpers/startScript) (documentação)
  - → https://r.jina.ai/https://poku.io/docs/documentation/helpers/startScript

---

## 📖 Glossário de Termos e Conceitos

| Termo                                | Descrição                                                                                                                           |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| **MCP**                              | **Model Context Protocol**, um padrão de código aberto para conectar IA a ferramentas.                                              |
| **Agent Skills**                     | Pacotes modulares de conhecimento processual para IA.                                                                               |
| **LLM** (Large Language Model)       | Modelo de linguagem de grande escala treinado para compreender e gerar texto.                                                       |
| **Tokens**                           | Unidades mínimas de texto processadas pelos modelos de IA (palavras, partes de palavras ou caracteres).                             |
| **Debugging**                        | Processo de identificar e corrigir erros no código.                                                                                 |
| **Sandbox**                          | Ambiente isolado para executar código com segurança, sem afetar o sistema principal.                                                |
| **Rate Limiting**                    | Limitação da quantidade de requisições permitidas em um período de tempo.                                                           |
| **Prompt Injection**                 | Técnica de ataque que manipula o comportamento da IA por meio de instruções maliciosas inseridas no prompt.                         |
| **llms.txt**                         | Arquivo padrão que fornece contexto sobre um site ou projeto para consumo por LLMs.                                                 |
| **Test Runner** (Executor de Testes) | Ferramenta que executa testes automatizados e reporta os resultados.                                                                |
| **Codebase / Source Code**           | Conjunto completo de arquivos de código-fonte que compõem um projeto de software.                                                   |
| **CLI** (Command Line Interface)     | Interface de linha de comando para interagir com programas por meio de texto no terminal.                                           |
| **Rules (Progressive Disclosure)**   | Técnica de gerenciamento de tokens onde a IA carrega informações em camadas, conforme necessário.                                   |
| **Front Matter** (**YAML**)          | Bloco de metadados no início de um arquivo markdown, delimitado por `---`, usado para configurar propriedades dos agentes e skills. |

---

## Abordagem Prática

### MCP

> [!NOTE]
>
> Slide em breve 🤝

### Agent Skills (`SKILLS.md` / `skills.sh`)

- **Problema:** refatorar código legado do **MySQL2** e corrigir testes frágeis com tipagem manual separada do código principal (**JavaScript**)
- **Solução:** transcrever todos os testes automatizados para **TypeScript**
- **Desafio:** Criar um Agent Skill que encapsula o conhecimento processual necessário para realizar a tarefa de refatoração:
  - **Skill 1:** conhecimento sobre os tipos e interfaces do projeto.
  - **Skill 2:** conhecimento sobre os testes automatizados, práticas a serem adotadas e exemplos de implementação.
  - **Agent**: o agente que irá utilizar as Skills para analisar o código, analisar quando deve ou não invocar as Skills, identificar pontos de refatoração e sugerir mudanças, além de corrigir os testes frágeis.

**Desafios adicionais:**

- Converter e consumir o código-fonte de projetos externos complexos em formato consumível por LLMs.
- Converter e consumir documentações de sites externos em formato consumível por LLMs.
- Gerenciar regras (`rules`) de uso de tokens (**progressive disclosure**) para garantir que o agente tenha acesso apenas às informações necessárias para cada contexto.
- Invocar agentes e skills localmente e globalmente.
- Invocar skills diretamente (sem passar pelo agente) usando `user-invokable` no front matter.
