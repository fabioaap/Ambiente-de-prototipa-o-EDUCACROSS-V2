# Minuta de Aditivo: Cessão de Direitos e Exceções

> **Aviso:** Este documento é um modelo informativo e sugestivo para ajudar nas negociações contratuais. Não constitui aconselhamento jurídico. Recomenda-se a revisão final por um advogado.

## 1. Objetivo
Este aditivo visa clarear o escopo da cessão de direitos sobre o material entregue dentro do projeto "Ambiente de Prototipação Educacross" ("Projeto"), limitando o que é transferido à Educacross e preservando direitos do Autor/Contratado que sejam re-usáveis em outros projetos.

## 2. Definições
- **Entregáveis**: Artefatos finais entregues como parte do Projeto — p.ex. Design System (código, CSS, tokens, componentes), protótipos, documentação de uso, arquivos de export (anexo A com lista).
- **Background IP**: Conhecimento pré-existente, frameworks, bibliotecas, padrões, templates, métodos, estruturas organizacionais ou processos que o Autors trouxe para o Projeto e que não foram desenvolvidos especificamente para a Educacross durante o contrato.
- **Foreground IP**: IP criado especificamente para a Educacross no âmbito deste Projeto (ex.: componentes customizados criados exclusivamente para o produto e não reusáveis sem identificação Educacross).
- **Informações Confidenciais**: Dados de negócio, PII, senhas, segredos da empresa, e outros conteúdos sensíveis.

## 3. Escopo da Cessão
- A cessão de direitos será limitada aos Entregáveis descritos no Anexo A (e/ou pastas/artefatos explicitamente listados).
- O Autorrará transferir à Educacross os direitos patrimoniais (incluindo direito de modificação, sublicenciamento e exploração), exclusivamente com relação aos Entregáveis.

> Observação: Por padrão, o Adendo pode e deve excluir explicitamente o Background IP do escopo da cessão. Use a cláusula abaixo para isso.

## 4. Exclusão de Background IP e Retenção de Know-how
O Autornão cede, e permanece proprietário do, Background IP. Para uso do Entregável, a Educacross recebe uma licença de uso do Background IP apenas na medida necessária (licença limitada, não exclusiva, perpétua, intransferível para operar e manter os Entregáveis).

## 5. Licença de Reutilização (License-Back)
O Autor concede a si mesmo uma licença não exclusiva, irrevogável, perpétua e mundial para reutilizar frameworks, métodos e estruturas próprias *desde que* não incorporem dados confidenciais da Educacross e não usem marca ou identidade visual da Educacross.

## 6. Portfólio & Demonstração Pública
O Contratado pode exibir o Projeto em portfólio pessoal (LinkedIn, site, apresentações), usar screenshots, vídeos e trechos, desde que:
- Informações confidenciais e dados de usuários não sejam divulgados.
- Marcas nominativas, logotipos, ou identidades gráficas da Educacross só serão exibidas com consentimento prévio por escrito, se contrato assim exigir.
- Opcional: prazo de embargo (p.ex. 60 dias) caso a empresa peça revisão antes da publicação.

## 7. Reconhecimento de Autoria
A Educacross reconhece a autoria conceitual e técnica do Autor quando apropriado e concorda em conceder crédito nas comunicações públicas (p.ex. "Desenvolvido por [Nome do Contratado]") em materiais públicos, salvo razão legítima para ocultar.

## 8. Comercialização futura e remuneração adicional
Se a Educacross, direta ou indiretamente, explorar comercialmente o material entregue (ex.: licenciar a terceiros, integrar em produto pago, revenda), as partes concordam em negociar de boa-fé uma compensação adicional ao Autor.

Sugestões de mecanismo negociável (escolha uma):
- Royalty: x% da receita líquida gerada por 24 meses.
- Success fee: um pagamento único equivalente a Y% do valor do primeiro contrato de licenciamento ou um múltiplo do provento mensal.
- Participação/credit: reconhecimento + taxa nominal por licença.

Se o contrato atual determinar claramente "cessão plena sem adicionais", considerem ao menos inclusão de uma cláusula de **Notification & Negotiation**: Educacross concorda em notificar o Contratado antes de qualquer comercialização com 60 dias para abrir negociação.

## 9. Proteções e Garantias
- O Autor garante que, salvo explicitado, os Entregáveis não violam direitos de terceiros.
- A Educacross concorda em não restringir indevidamente o Autor de usar seu Background IP em outros clientes enquanto não envolva informações confidenciais da Educacross.

## 10. Anexo A — Lista de Entregáveis (Exemplo)
- Design System (código fonte no diretório `packages/design-system/`)
- Tokens (arquivo `packages/tokens/src/tokens.json` e builds)
- Protótipos (pastas `domains/*/journeys/*/`, assets e histórias Storybook)
- Documentação (Sprints e documentação técnica: arquivos em `docs/`)

## 11. Procedimentos (recomendados)
- Antes do fechamento, o Autor e a Educacross alinham um inventário de Background IP e Entregáveis — assinado e anexado.
- Se houver reuso de frameworks, o Autor deverá indicar, no repositório e no checkout final, as partes consideradas Background IP (p.ex., adicionar uma `NOTICE` ou `README-BACKGROUND-IP` com a lista).
- O Autor e a Educacross definem um processo simples para revisão e aprovação de conteúdo de portfólio (p.ex. 5 dias úteis para revisão).

## 12. Disposições Gerais
- Obrigação de confidencialidade conforme o contrato principal.
- Lei aplicável e foro: [indicar], padrão a discutir com jurídico.

---

### Modelos de cláusulas exemplares (para negociação)

- **Cláusula de exclusão do Background IP**:
> "As Partes acordam que quaisquer frameworks, utilitários, templates, métodos de design, padrões e know-how desenvolvidos ou detidos pelo Contratado antes da celebração deste contrato ("Background IP") não estão incluídos na cessão de direitos ora pactuada. Para os fins de implementação dos Entregáveis, o Contratado concede à Educacross uma licença limitada, não exclusiva, intransferível e royalty-free do Background IP, apenas na medida estritamente necessária para operar os Entregáveis."

- **Cláusula de Portfólio**:
> "O Contratado poderá exibir o trabalho em portfólio pessoal, apresentações e perfis profissionais, desde que não haja divulgação de material confidencial e a Educacross tenha a oportunidade de revisão em 5 (cinco) dias úteis antes da publicação." 

- **Cláusula de Remuneração por Comercialização Futura**:
> "Caso a Educacross venha a licenciar ou comercializar (total ou parcialmente) os Entregáveis a terceiros, as Partes negociarão de boa-fé uma remuneração adicional ao Contratado, sendo aplicáveis, por exemplo: royalty de [X%] sobre a receita líquida ou uma remuneração única equivalente a [Y*valor]."

---

## 13. Próximos passos que eu recomendo ✅
1. Apresente este rascunho ao RH/Jurídico como ponto de partida (pode simplificar as opções de remuneração ao escolher uma preferida).
2. Prepare um inventário técnico (Anexo A) indicando claramente o que é Entregável e o que é Background IP; isso evita ambiguidades.
3. Solicite a inclusão explícita de um direito de portfólio e de atribuição por escrito.
4. Se quiser, solicito que eu gere uma minuta final (formato Word + versão para assinatura) com a opção remuneratória escolhida e cláusulas ajustadas ao regime jurídico aplicável.

---

Se desejar, eu já crio um arquivo adicional com a minuta e um checklist técnico (arquivos que ficarão como entregáveis), e te apoio a preparar um e-mail objetivo para RH/Jurídico.

> Lembrete: este texto é uma sugestão; consulte o jurídico antes de assinar.

