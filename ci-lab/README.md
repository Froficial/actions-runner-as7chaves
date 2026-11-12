# CI Lab — experimentos sintéticos

Este é um **laboratório público descartável** para demonstrar testes automáticos independentes da Sales Academy privada.

- Código e testes nesta pasta foram escritos originalmente para o laboratório; **nenhum arquivo da Sales Academy/Mentingo foi copiado**.
- Os identificadores `fictional-*` e cenários são dados fictícios.
- Não há serviços externos, banco, browser, `secrets`, dependências npm ou conexão com o repositório privado.
- O teste verifica exclusivamente a função de exemplo `completionPercent` e a estrutura experimental `isSyntheticPath`.
- **CI verde aqui não valida** frontend, backend, Learning Engine real, migrações, Playwright, licenças ou segurança da Sales Academy.
- Antes de migrar um módulo real, auditar a licença, a proveniência, os arquivos e todo o histórico relevante no repositório privado; fazer publicação apenas com autorização expressa.

Execução local opcional com Node 22+: `npm --prefix ci-lab test`.

Workflow: `.github/workflows/ci-lab-synthetic.yml`.
