# As 7 Chaves — testes totalmente fictícios

Este diretório contém **somente** funções criadas do zero para praticar conceitos genéricos de testes automatizados de dashboard. Não existe dependência, importação ou espelhamento do código privado.

Cenários do laboratório:
- Somar leads fictícios por temperatura sem aceitar identificadores não sintéticos.
- Diferenciar 0 medido de `null` indisponível.
- Rejeitar totais negativos, fracionários, incoerentes e tentativas de rotular dados sintéticos como PostgreSQL verdadeiro.

O ambiente **não testa** o endpoint real de métricas, autenticação real, funis, migrations, PostgreSQL ou a interface real. Para isso, usar os testes locais controlados no repositório privado.

Execução: `npm --prefix as7chaves-lab test` (Node.js 22+, sem instalação de dependências).
