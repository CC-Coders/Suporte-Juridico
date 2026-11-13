<h1 align="center">Treinamentos Corporativos</h1>
<br>

# 1. Sumário

- [2. Identificação de escopo](#2-identificação-de-escopo)
- [3. Levantamento de escopo](#3-levantamento-de-escopo)
- [4. Detalhamento do Projeto](#4-detalhamento-do-projeto)
  - [4.1 Problema](#41-problema)
  - [4.2 Objetivo do Projeto](#42-objetivo-do-projeto)
- [5. Produto](#5-produto)
  - [5.1 Funcionalidades](#51-funcionalidades)
  - [5.2 Funcionalidades não incluídas no projeto](#52-funcionalidades-não-incluídas-no-projeto)
  - [5.3 Integrações](#53-integrações)
  - [5.4 Validações e Controles](#54-validações-e-controles)
  - [5.5 Relatórios](#55-relatórios)
  - [5.6 Artefatos](#56-artefatos)
- [6. Fluxo do Processo](#6-fluxo-do-processo)
- [7. Premissas](#7-premissas)
- [8. Restrições](#8-restrições)
- [9. Recursos adicionais](#9-recursos-adicionais)

# 2. Identificação de escopo

- Área da empresa:
- Gestor da área: Gabriela Tomm
- Projeto/Desenvolvimento: Automatização do processo de solicitação, agendamento e entrega de treinamentos e materiais corporativos
  <br>

# 3. Levantamento de escopo

- Autor do escopo: Diogo França
- Desenvolvedor responsável: Paola Rosa
- Responsável pelos testes: Paola Rosa/Gabriela Tomm
  <br>

# 4. Detalhamento do Projeto

## 4.1 Problema

O processo manual de solicitação e gestão de treinamentos corporativos gera atrasos, falta de organização e dificuldades na alocação de horários disponíveis, impactando a eficiência e a experiência dos colaboradores.

## 4.2 Objetivo do Projeto

Automatizar o processo de solicitação de treinamentos e materiais corporativos, permitindo agendamento simplificado através de um calendário de horários disponíveis, facilitando o acompanhamento e reduzindo os atrasos no atendimento das solicitações
<br><br>

# 5. Produto

## 5.1 Funcionalidades

1.  Permitir que o usuário escolha entre agendar um treinamento ou solicitar o envio de material.
2.  Disponibilizar uma lista de treinamentos/materiais para seleção.
3.  Para agendamentos, permitir a escolha de data e horário com base em um calendário que exibe os horários livres.
4.  Facilitar a avaliação da solicitação pela equipe de treinamento.
5.  Notificar o solicitante sobre a confirmação do treinamento ou envio do material.

## 5.2 Funcionalidades não incluídas no projeto

## 5.3 Integrações

1.  Integração com o calendário para exibição e gerenciamento de horários disponíveis.

## 5.4 Validações e Controles

1. Validação da disponibilidade do horário escolhido no momento do agendamento.
2. Controle de permissões para solicitações e validações realizadas pela equipe de treinamento.

## 5.5 Relatórios

## 5.6 Artefatos

Abaixo os Artefatos gerados pelo projeto
| Artefato | Responsabilidade |
| --- | --- |
| Dataset AgendamentoTreinamentoCorporativo | Dataset que faz o agendamento
| Dataset OptionsTreinamentosCorporativos | Dataset que lista os materiais de treinaemntos disponíveis para relacionar com os arquivos correspondentes na pasta e permitir o envio via e-mail.

<br>

# 6. Fluxo do Processo

<br>

# 7. Premissas

1. Todos os treinamentos e materiais devem estar previamente cadastrados no sistema.
2. A equipe de treinamento deve manter os horários do calendário atualizados.

<br>

# 8. Restrições

O agendamento de treinamentos deve ser feito com pelo menos 24 horas úteis de antecedência.
<br>

# 9 Recursos adicionais:

<br>
