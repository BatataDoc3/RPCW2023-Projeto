# Acorthemis

## Introdução

Um dos principais objetivos da engenharia web foi, desde cedo, a simplificação do trabalho das múltiplas áreas do quotidiano de diversas pessoas. No entanto, a justiça portuguesa não tem acompanhado essa evolução, dificultando assim o trabalho de advogados, juízes, entre outros.

Com acorthemis, pretende-se criar uma plataforma que permita a pesquisa, revisão e partilha de acórdãos, de forma a facilitar o trabalho de todos os intervenientes no sistema judicial português. Este processo, além de entediante na parte da leitura dos documentos revela-se, muitas vezes, extremamente custoso na sua pesquisa, algo que pretendemos contrariar com o projeto desenvolvido.

## Backend

### Dataset e Taxonomia de Termos

- Foram-nos disponibilizados 14 datasets iniciais, que nós juntámos num único dataset final. Nenhuma informação de nenhum dataset inicial foi perdida, no entanto, ela ficou disposta de forma diferente no dataset final. Com isto, acabamos por ficar com os seguintes campos: 

    - Retirados diretamente dos datasets iniciais:
        - "processo", "relator", "descritores", "n_documento", "data_acordao", "especie", "requerente", "texto_integral", "url", "tribunal", "votacao", "privacidade", "n_convencional", "decisao", "sumario", "requerido", "indicacoes_eventuais", "tribunal_1_instancia", "autor", "reu", "seccao", "tribunal_nome", "recorrido_1", "meio_processual", "recorrente", "recorrido_2", "decisao_texto_integral", "tribunal_recorrido", "processo_tribunal_recorrido", "tribunal_recurso", "processo_tribunal_recurso", "magistrado", "area_tematica_1", "area_tematica_2"

    - Retirados diretamente dos datasets iniciais e colocados dentro do campo do dataset final "referências":
        - "normas_apreciadas", "constituicao", "normas_julgadas_inconst",  "normas_suscitadas", "jurisprudencia_constitucional", "normas_declaradas_inconst", "referencias_internacionais", "referencia_pareceres", "legislacao_comunitaria", "outras_publicacoes", "outra_jurisprudencia", "legislacao_estrangeira", "jurisprudencia_estrangeira", "jurisprudencia_internacional", "jurisprudencia_nacional", "objecto", "referencia_doutrina", "referencia_publicacao", "recusa_aplicacao"

    - Informação de todos os campos dos datasets iniciais que não ficaram em nenhum campo específico, ficando tudo numa só string:
        - "anotacoes_extra"

### Coleções 

- "acordaos"
    - Representa os diferentes acórdãos (informação que estava nos datasets iniciais), que são a base para quase todas as funcionalidades do site.
    
- "lists"
    - O site tem a funcionalidade de um utilizador poder criar listas de acórdãos, de forma a organiza-los e junta-los como lhe convier. Esta coleção representa as listas que o utilizador cria. 

- "reviews"
    - Para adicionar/alterar um acórdão, um utilizador faz uma review. Essa review representa uma proposta dessa adição/alteração. Posteriormente, os users admin, podem aceitar essa proposta, adicionando/editando, desta forma, o acórdão a que a review se refere, e retirando a review da database.
  
- "users"
    - Utilizadores do site. Estes têm a possibilidade de procurar por acórdãos, consulta-los, coloca-los em listas, sugerir adições, sugerir alterações e, se forem admin, aceitar essas adições/alterações.

### Tratamento de pedidos


- GETS
    - `/acordaos?page=${page}&orderBy=${campo};(desc|asc)&keywords=${keywords}&(filtro=${filtro})+`

        - Devolve a página `page` da lista dos acórdãos ordenada por `campo` (definido pelo utilizador), com `keywords`, que procura em campos específicos dos acórdãos o termo ou frase inserida. Para além disso também é possível filtrar pelos campos dos acordãos.
          
    - `/acordaos/${id}`

        - Devolve o acórdão com o respetivo `id`
    - `/reviews?page=${page}`

        - Devolve a página `page` da lista de reviews.
          
    - `/reviews/${id}`

        - Devolve a review com o respetivo `id`
          
    - `/users/${username}`

       - Devolve a página do utilizador com `username`
         
    - `/lists?list=${listId}`

        - Devolve a lista com o id `listId`
          
    - `/lists?user=${username}`

        - Devolve a lista de listas de acórdãos que o utilizador com `username`
        
- POSTS
    - `/lists`
        - Coloca uma lista na database.
 
    - `/acordaos`
        - Coloca um acórdão na database.
          
    - `/reviews`
        - Coloca uma review na database.
          
    - `/users`
        - Coloca um user na database.
          
    - `/auth`
        - Faz o login.
          
    - `/reviews/accept/${reviewId}`
        - Aceita uma `review`, ou seja, cria/altera o acórdão ao qual a `review` se refere.

- PUT [UPDATE]

    - `/acordaos/{acordaoID}`
        - Edita o acórdão.
        
    - `/users/${username}`
        - Edita o utilizador.

- DELETE
    - `/lists?list=${listId}&acordao=${acordaoId}`;
        - Elimina um acórdão da lista selecionada
          
    - `/lists?list=${listId}`;
        - Elimina a lista selecionada.
          
    - `/reviews/${id}`;
        - Elimina a review com o id selecionado.
          
    - `/users/${username}`.
        - Elimina o user com o uesrname selecionado.


## Frontend

Para o Frontend, escolheu-se utilizar a framework para criar Web Apps [SvelteKit](https://kit.svelte.dev/). Esta é baseada em Svelte, uma framework de Javascript que difere de outras por ser um compilador e não apenas uma runtime library. O código é compilado durante o build time em vez de executar do lado do cliente. Desta forma, menos código é enviado para o lado do cliente e maior é a performace. Para além disso, permite ainda adicionar reatividade à aplicação.

Foi ainda utilizado TailwindCSS de forma a simplificar a escrita de CSS.

É de realçar que a escolha destas ferramentas se deu, não só devido à sua provada utilidade, mas também à sua vasta utilização, no caso do TailwindCSS, e à sua crescente popularidade, no caso do SvelteKit.

Foram criados vários módulos onde cada possui um ficheiro denominado por "+page.svelte" contendo o código para a criação das páginas. O seguintes módulos e sub-módulos foram criados para apresentar as diversas funcionalidades:

- "about": página que apresenta a secção "Sobre nós" que possui informações sobre o contexto do trabalho e sobre do grupo.
- "/": página principal do projeto, apresenta o título do site bem como a barra de pesquisas e o botão de login. Caso o utilizador tente pesquisar sem estar autenticado, um "Modal" de erro é apresentado, mencionando que se deve autenticar primeiro.
- "acordaos":
    - [id]: página que apresenta todos os campos de um acordão com o identificador 'id'.
    - add: página que permite adicionar um acordão apresentando os vários campos do mesmo.
    - edit: página que permite editar os vários campos de um acordão.
- "login": o login deve ser realizado através da introdução de credenciais.  Permite redirecionar para a página de registo de um utilizador novo.
- "logout": contém um script auxiliar para a o logout de um utilizador.
- "register": página que permite registar um utilizador novo apresentando vários campos onde é possível introduzir as novas informações e submeter as mesmas.
- "reviews": página referentes à revisão de acordãos. Apresenta uma listagem de vários acordãos de forma paginada. É possível interagir com a mesma, ordenando e filtrando de acordo com diversos parâmetros. É possível ainda pesquisar e visualizar acordãos específicos.
    - [id]: página que apresenta todos os campos de um acordão com o identificador 'id' em modo de revisão. Semelhante à página de um acordão, com a funcionalidade acrescida de "Aceitar" ou "Rejeitar" o mesmo.
- "user"
    - [id]: página que apresenta todas as informações relativas ao utilizador com o identificador 'id'. Permite "Apagar", "Promover" e "Despromover" o utilizador.
    - edit: página que apresenta todas as informações relativas ao utilizador com o identificador 'id' e atualizar o valor de cada campo.
    - lists: página que apresenta as listas de acordãos existentes.
        - [id]: página que permite visualizar as informações relativas à lista com o identificador 'id'. Permite "Ver" e "Remover" acordãos na lista em causa.
        - add: página que permite criar uma lista de acordãos. 
    - search: página que permite pesquisar utilizadores na base de dados pelo seu nome.
- "error": página geral de erro.

## Trabalho futuro

A database ficou organizada de forma a ter acesso às diferentes referências. Isso torna possível que, tendo acesso a outra database com os documentos presentes nas referências, se faça essa ligação de forma quase automática, integrando os acórdãos de um forma muito mais completa. Algo semelhante poderia também ser feito com as entidades/instituições/pessoas referidas em campos como "relator", "tribunal_1_instancia" ou "requerido".

## Conclusão


Este projeto demonstrou-se desafiante em várias ocasiões, especialmente em definir uma estratégia para organizar e generalizar os vários datasets em apenas um que fosse mais simples e também a reatividade dos dados na obtenção dos mesmos na backend. Contudo, achamos que conseguimos desenvolver uma aplicação mais intuitiva e direta para todos os intervenientes no sistema judicial português. Com o acorthemis, criamos uma plataforma que simplifica a pesquisa, revisão e compartilhamento de acórdãos, tornando o trabalho de advogados, juízes e outros profissionais do setor mais fácil e eficiente.

Ao longo do processo de desenvolvimento, implementamos recursos como filtragem, ordenação e pesquisa avançada para melhorar a usabilidade da plataforma. Também criamos funcionalidades para permitir a revisão dos acórdãos, facilitando a colaboração e a troca de conhecimento entre os usuários.

Dito isto, estamos satisfeitos com o resultado final deste projeto, pois conseguimos cumprir todas as expectativas estabelecidas pela equipe docente. Acreditamos ter desenvolvido uma aplicação robusta e intuitiva que atende às necessidades dos intervenientes do sistema judicial português. 