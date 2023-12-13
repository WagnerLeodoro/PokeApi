const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokemonDetail.id
  pokemon.name = pokemonDetail.name

  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonDetail = async (pokemon) => {
  return await fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  const response = await fetch(url)
  const jsonBody = await response.json()
  const pokemons = jsonBody.results
  const detailRequests = pokemons.map(pokeApi.getPokemonDetail)
  const pokemonsDetails = await Promise.all(detailRequests)
  return pokemonsDetails
}
