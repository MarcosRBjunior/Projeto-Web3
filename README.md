
# Projeto de Votação On-Chain (Webbb3)

Este projeto é uma aplicação descentralizada (DApp) desenvolvida com React, Vite e a biblioteca Wagmi para interação com contratos inteligentes na blockchain Ethereum.

## Descrição
O objetivo do projeto é permitir que usuários votem em tempo real em uma votação inspirada no "paredão do BBB", utilizando autenticação via carteira (ex: MetaMask) e registrando os votos diretamente em um contrato inteligente.

## Funcionalidades
- Autenticação do usuário via carteira Web3 (MetaMask).
- Exibição das opções de votação e contagem de votos em tempo real.
- Registro do voto do usuário diretamente no contrato inteligente.
- Interface moderna e responsiva.

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Wagmi](https://wagmi.sh/) (conexão Web3)
- [Viem](https://viem.sh/) (interação com contratos)

## Como executar
1. Instale as dependências:
	```bash
	npm install
	```
2. Inicie o projeto:
	```bash
	npm run dev
	```
3. Acesse no navegador: http://localhost:5173

## O que foi feito

- Integração com contrato inteligente de votação (ver arquivo `src/ABI.json`).
- Tela de login com autenticação via carteira Web3.
- Tela de votação com opções dinâmicas e atualização automática dos votos.
- Organização do código em componentes React (`Login.tsx`, `Vote.tsx`, `App.tsx`).

---

