# Proxy Translate

O intuito deste projeto é criar um proxy para tradução de textos utilizando a API da DeepL. A ideia é que o usuário possa enviar um texto para o proxy e ele se encarregará de traduzir o texto e retornar a tradução para o usuário, isso tudo sem expor a chave de acesso da API da DeepL do lado do cliente.

## Tecnologias

- Node.js

## Dependências

- node-fetch (para fazer requisições HTTP)

## Rotas

Como o projeto está em deploy no netlify, a única rota que tem é: https://keen-sprinkles-da7fb5.netlify.app/.netlify/functions/proxyTranslate

## Exemplo de requisição

Para fazer uma requisição, você deve enviar uma requisição POST para a rota acima com o seguinte corpo:

```json
{
  "text": "",
  "source": "",
  "target": ""
}
```

Em JavaScript (fetch):

```javascript
const response = await fetch(
  'https://keen-sprinkles-da7fb5.netlify.app/.netlify/functions/proxyTranslate',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: 'Olá, como você está?',
      source: 'PT',
      target: 'EN',
    }),
  }
);

const data = await response.json();

console.log(data); // Saída: "Hello, how are you?"
```

**Lembrando que provalvemente isso não funcionará, pois os CORS estão bloquados para qualquer origem que não seja da url do meu github.io (https://ruan-moraes.github.io).**

Você pode descomentar a linha 23 do arquivo `proxyTranslate.mjs` (Facilitando a vida de quem for testar localmente) para permitir que qualquer origem faça requisições para o proxy e então fazer um deploy em algum serviço de cloud.
