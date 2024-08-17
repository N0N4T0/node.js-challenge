# Kinvo - Desafio Back-end

<p align="center">
  <img src="./logo.svg" width="200" alt="Kinvo Logo" />
</p>

## Description

Um estudante a fim de poupar gastos e controlar suas finanças pessoais resolveu desenvolver um aplicativo para lhe ajudar nessa missão. Após um estudo de caso ele mapeou as seguintes funcionalidades:

- Criação da movimentação (receitas e despesas);
- Atualização da movimentação;
- Exclusão da movimentação;
- Listagem de movimentações;
- Exibição do saldo.

## Instructions

### Installation

1. Instalar dependências do projeto

```bash
$ npm install
```

2. Baixar migrations

```
$ npx migrate dev
```

3. Adicionar chaves no arquivo .env

- Execute o script abaixo para otimizar o processo de gerar as chaves: **_JWT_PRIVATE_KEY_** e **_JWT_PUBLIC_KEY_**

#### Gerar a chave privada

```
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
```

#### Gerar a chave pública

```
openssl rsa -pubout -in private.key -out public.key -outform PEM
```

#### Converter a chave privada para base64

```
JWT_PRIVATE_KEY=$(openssl base64 -in private.key -A)
```

#### Converter a chave pública para base64

```
JWT_PUBLIC_KEY=$(openssl base64 -in public.key -A)
```

#### Adicionar as chaves ao arquivo .env

```
echo "JWT_PRIVATE_KEY=\"$JWT_PRIVATE_KEY\"" >> .env

echo "JWT_PUBLIC_KEY=\"$JWT_PUBLIC_KEY\"" >> .env
```

Por último adicione o o valor para DATABASE*URL
\*\*\_DATABASE_URL="postgresql://postgres:docker@localhost:5432/personal-finance?schema=public"*\*\*

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test
```

### Insomnia Collection

Encontrado no arquivo

```
kinvo-finance-api.json
```

## Context

- Utilize Typescript com Node;
- Desenvolva uma API REST ou GraphQL;
- Fique à vontade para escolher as libs, arquitetura, frameworks, banco de dados e etc.;
- Crie um arquivo README com instruções para executar seu projeto;
- Crie a collection do Insomnia ou Postman, salve com o nome "collection".

## Requirements

### Desenvolvedor Júnior

```
[x] Filtro na listagem de movimentações por data (data inicial e data final);
[x] Paginação na listagem de movimentações.
```

### Desenvolvedor Pleno

```
[x] Todos os requisitos do Júnior;
[x] API Rest semântica (se escolheu desenvolver uma API Rest);
[x] Arquitetura minimamente escalável;
[x] Cobertura mínima de testes automatizados.
```

### Desenvolvedor Sênior

```
[x] Todos os requisitos do Pleno;
[x] Autenticação:
  [x] Cadastro de usuário;
  [x] Login;
  [x] Necessidade do usuário estar autenticado para a realização das atividades citadas no contexto.
[x] Dockerizar a aplicação;
[x] Boas práticas de POO (Exemplos: SOLID, Design Patterns, etc.).
```

### Plus

```
[x] Cache;
[ ] Segurança da aplicação;
[ ] Deploy.
```

## Highlight

- Se optar por uma API REST, tenha cuidado ao definir as rotas e verbos HTTP: faça uso de boas práticas;
- Crie uma aplicação flexível, ou seja, que seja fácil incluir novas funcionalidades;
- Clean Code: o código deve ser fácil de entender;
- Atente-se a boas práticas de versionamento.

## Submission process

1. Faça o fork deste repositório;
2. Faça seu projeto neste fork;
3. Suba as alterações para o seu fork;
4. Submeta uma PR para este repositório.

## Observations:

- O cumprimento dos requisitos solicitados para uma vaga em determinado nível não é garantia de aprovação. <strong>Focamos em avaliar a forma como os requisitos foram cumpridos.</strong>
- Apesar da listagem de requisitos mínimos acima, caso não tenha tido tempo suficiente ou tenha se esbarrado em alguma dificuldade, entregue o desafio ainda que incompleto e conte-nos na descrição do pull request quais foram as suas maiores dificuldades. Não se preocupe, avaliaremos ainda assim! :)
- Está com alguma dificuldade, encontrou algum problema no desafio ou tem alguma sugestão pra gente? Crie uma issue e descreva o que achar necessário ou entre em contato.

### Boa sorte! 🍀

## License

Nest is [MIT licensed](LICENSE).
