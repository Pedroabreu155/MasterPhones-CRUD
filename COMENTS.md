# Comentários: #

### Frontend ###
- Decidi usar o typescript somente no frontend junto com o ReactJS
- Para estilização do frontent estarei usando o React-bootsrap
- Decidi usar o axios para fazer as requisições ao invés de utilizar a fetch API padrão do browser:
 - Legibilidade e Organização do código
 - A fetch API não é suportada por todos os navegadores
 - Sintaxe mais intuítiva de trabalhar

### Backend ###
- Usei o nodemon para ajudar na produtividade
- O cors foi usado para dar acesso a api
- Vou tentar seguir um padrão aproximado do MVC, com a View sendo o frontend

### Database ###
- Modelo de produto projetado pro banco: 
  - Produto:{__id__, __marca__: string, __nome__: string, __preço__: string, __gigabytes__: number, __5g__: boolean}