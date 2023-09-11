# Cross Plataform To Do List

## Introdução

Este projeto tem como objetivo elaborar uma aplicação multiplataforma de gerenciamento de tarefas no modelo Kanban.

## Tecnologias utilizadas

### Backend:

- Express
- PostgreSQL
- TypeScript
- Docker
- Docker Compose

O backend foi elaborado no formato de API REST, com persistência de dados em um banco de dados e um sistema de autenticação de usuário baseado em JSON Web Token.

### Frontend Web:

- React
- NextJS
- Chakra UI
- React-Beautiful-dnd
- ApexCharts
- TypeScript

O Frontend Web foi elaborado em Next.js, com a utilização da biblioteca de estilo Chakra UI para gerar um layout simples e responsivo. Para permitir que os usuários possam arrastar as tarefas de uma coluna para outra do Kanban, foi utilizada a biblioteca React-Beautiful-DND. Além disso, os gráficos da tela de dashboard foram elaborados utilizando ApexCharts para gráficos visualmente mais atraentes e simples.

### Frontend Mobile:

- React Native
- GlueStack UI
- Victory-Native
- TypeScript

O Frontend Mobile foi elaborado utilizando React Native, com o auxílio da biblioteca de estilos GlueStack UI, pois ela fornece componentes semelhantes à biblioteca Chakra UI utilizada no frontend web, e para a elaboração dos gráficos da dashboard, foi utilizado o Victory-Native.

- Na aplicação mobile não foram utilizadas as bibliotecas Chakra UI, ApexCharts e React-Beautiful-DND por não possuírem integração com o React Native.

## Funcionalidades

### Usuario:

Permite a criação de novos usuários e o login, com persistência dos dados em um banco de dados.

### Gerenciamento de tarefas no modelo Kanban:

Permite ao usuário gerenciar suas tarefas pelo modelo Kanban, distribuindo-as em 3 colunas: "A fazer", "Em progresso" e "Concluídas". Dentro de cada tabela, as tarefas são ordenadas de cima para baixo por ordem de data, de modo que aquelas cujo prazo termina antes sempre estarão mais acima na tabela, facilitando a visualização de quais tarefas estão próximas do prazo de validade.

### Tarefas:

Permite a criação, edição e exclusão de tarefas, possibilitando que o usuário edite completamente os dados de cada tarefa por meio de um formulário de adição. Também é possível mover as tarefas entre as colunas do Kanban, clicando e arrastando-as entre as colunas.

Além disso, o usuário pode arquivar tarefas concluídas para que fiquem armazenadas na aplicação e possam ser recuperadas quando o usuário precisar.

### Notificações:

Possui um sistema de notificações com um ícone que sinaliza a existência de novas notificações para o usuário sempre que ele entra na aplicação. As notificações são geradas 2 vezes por tarefa, a primeira é quando falta menos de 3 dias para o fim do prazo de entrega da tarefa e a segunda é quando o prazo expira.

Para que o aplicativo deixe de sinalizar a existência de uma nova notificação referente a uma determinada tarefa, é necessário que o usuário abra a aba de notificações e clique sobre a notificação recente, indicando para a aplicação que o usuário a visualizou.

### Dashboard:

A aplicação também conta com uma tela de dashboard onde exibe dados atualizados referentes à conclusão e estados das tarefas cadastradas pelo usuário, considerando tarefas ativas e arquivadas.

É possível aplicar um filtro de 7, 30 ou 90 dias sobre os gráficos que exibem os dados referentes às tarefas concluídas.

- Na aplicação mobile, por uma questão de limitação de espaço e para facilitar a visualização do usuário, os filtros aplicados aos gráficos de tarefas concluídas são de 7, 30 ou 60 dias.
