# actions-runner-as7chaves

**Laboratório público e independente para experimentos de CI do projeto As 7 Chaves.**

Este repositório foi criado como uma cópia separada do modelo público `Froficial/actions-runner-teste-publico`. Ele NÃO é um fork de código privado. O laboratório original permanece livre para outros projetos.

## Limites de segurança

- **Não copiar** código, arquivos, histórico Git, configurações, dados, credenciais, capturas, relatórios com informações sensíveis ou segredos de `Froficial/as7chaves-portfolio` ou de outros repositórios privados.
- **Não usar** tokens de acesso, permissões de escrita, `repository_dispatch`, `pull_request_target`, chamadas a APIs privadas, artefatos de builds privados ou checkouts de outros repositórios.
- Os únicos exemplos aqui são funções escritas originalmente para este laboratório e fixtures marcadas `synthetic-*`.
- **CI verde neste repositório não aprova o código do As 7 Chaves privado.** Serve para confirmar o funcionamento do GitHub Actions gratuito e experimentar regras isoladas sem dependências.
- Toda alteração submetida a um repositório público já fica visível no GitHub, antes de qualquer verificação de segurança do workflow. Revisar conteúdo **antes** de publicar.

## Uso

- Workflow de smoke runner público: `.github/workflows/teste-runner.yml`.
- Workflow de exemplos independentes do As 7 Chaves: `.github/workflows/as7chaves-synthetic.yml`.
- `npm --prefix as7chaves-lab test`: teste local dos exemplos, sem dependências npm.
- O produto verdadeiro continua em `Froficial/as7chaves-portfolio` (privado), testado em Mac com Docker e PostgreSQL descartável. Não há sincronização automática entre repositórios.

Ver [as7chaves-lab/README.md](as7chaves-lab/README.md) para o escopo exato dos cenários.

## Reutilização segura para validar código privado

O arquivo público `.github/workflows/private-owned-runner-reusable.yml` é uma **definição genérica de teste** compatível com `workflow_call`. Ele pode ser chamado por workflows de repositórios **privados** com `uses: ...@SHA`, definindo os labels de um **runner self-hosted exclusivo do repositório chamador** e o caminho do script de testes próprio.

**Importante:** a execução e os logs ficam vinculados ao repositório privado chamador. O checkout faz download do código privado diretamente no runner registrado para ele, **nunca para este laboratório público**. Esse arquivo público não tem tokens, `secrets: inherit`, checkout de repositórios privados explícitos ou acesso ao Mac por conta própria.

Para o As 7 Chaves, o workflow chamador está em `Froficial/as7chaves-portfolio/.github/workflows/private-mac-ci.yml` na branch de desenvolvimento, com referência presa a um SHA. O runner precisa ser registrado pelo responsável **no repositório privado**, usando a label específica `as7chaves-ci`.

A reutilização para outros projetos exige adaptar os labels do runner, o script de teste e os controles de segurança do repositório privado. Não conceder a este laboratório acesso aos repositórios privados, não cadastrar tokens nele e não registrar runners pessoais em workflows públicos.

O GitHub Actions no repositório privado pode continuar bloqueado por faturamento mesmo quando o workflow público e o runner próprio estão configurados. Um teste privado executado no runner próprio, **não** os exemplos sintéticos públicos, é a evidência que valida o produto.
