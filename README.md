# Cross Plataform To Do List

## Introdução

Este projeto tem com objetivo elaborar uma aplicação multiplataforma de gerenciamento de tarefas no modelo Kanban

## Tecnologias utilizadas

### Backend:

- Express
- PostgreSQL
- Typescript
- Docker
- Docker Compose

O backend foi elaborado no formato API REST, com persistencia de dados em um banco de dados e um sistema de autenticação de usuario baseado em JSON Web Token.

### Frontend Web:

- React
- NextJS
- Chakra UI
- React-Beautiful-dnd
- ApexCharts
- Typescript

O Frontend Web foi elaborado em NextJS, com a utilização da biblioteca de estilo Chakra UI para gerar um layout simples e responsivo. Para permiter que o usuarios possa arrastar as tarefas de uma coluna para outra do kanban, foi utilizada a biblioteca React-Beautiful-dnd. Além disse os graficos da tela de dashboard foram elaborados utilizando ApexCharts para graficos visualmente mais atraentes e simples para a usuario.

### Frontend Mobile:

- React Native
- Gluestack UI
- Victory-Native
- Typescript

O Frontend Mobile foi elaborado utilizando React Native, com o auxilio da biblioteca de estilos Gluestack UI pois ela fornece uma componente similares a biblioteca Chakra UI utilizada no frontend web e para a elaboração dos graficos da dashboard, fui utilizado a Victory-Native.

- Na aplicação mobile não foram utilizadas as bibliotecas Chakra UI, ApexCharts e React-Beautiful-dnd por não possuirem integração com o React Native.

## Funcionalidades

### Usuario:

Permite a criação de novos usuario e o login, com persistencia dos dados em um banco de dados.

### Tarefas:

Permite a criação, edição e exclusão de tarefas, possibilitando que o usuario edite completamente os dados de cada tarefa por meio de um formulario de adição, tambem é possivel mover as tarefas entre as colunas kanban ("A fazer", "Em progresso" e "Concluidas") clicando e arrastando-as entre as colunas.

Alem disso o usuario pode arquivar tarefas concluidas para que fiquem armazendas na aplicação e possão ser recuperadas quando o usuario quiser.

### Notificações:

Possui um sistema de notificações com um icone que sinaliza a existencia de novas notificações para o usuario sempre que ele entra na aplicação. As notificaçoes são geradas 2 vezes por tarefas, a primeira é quando falta menos de 3 dias para o fim do prazo de entrega da terefa e a segunda é quando o prazo da tarefa expira.

Para que o aplicativo deixe de sinalizar a existencia de uma nova notificação referente a uma determinada tarefa é necessario que o usuario abra a aba de notificações e clique sobre a notificação recente indicando para a aplicação que o usuario a visualizou.

### Dashboard:

A aplicação tambem conta com uma tela de dashboard onde exibe dados atualizados referente a conclusão e estados das tarefas cadastradas pelo usuario considerando tarefas ativas e arquivadas.

É possivel aplicar um filtro de 7, 30 ou 90 dias sobre os graficos que exibem os dados refetente as tarefas concluidas.

- Na aplicação mobile por uma questão de limitação de espaço e para facilitar a visualização do usuario, os filtros aplicados aos graficos de tarefas concluidas são de 7, 30 ou 60 dias.
