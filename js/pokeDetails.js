const pokemonPage = document.querySelector('#pokemonPage')
const pokedex = document.querySelector('#pokedex')

const api = 'https://pokeapi.co/api/v2/'

async function getPokemonsSpecies(id, info, gender) {
  const response = await fetch(`${api}pokemon-species/${id}`)

  if (info == 'egg_groups') {
    const data = await response
      .json()
      .then((dataSpecie) =>
        dataSpecie.egg_groups.map((eggs) => eggs.name).join(', '),
      )

    return `${data}`
  } else if (info == 'specie') {
    const data = await response.json().then((genera) => genera.genera[7].genus)
    return `${data}`.split(' ')[0]
  } else {
    const data = await response.json().then((gender) => gender.gender_rate)

    if (gender == 'male') {
      if (data == 1) {
        return '87,5%'
      } else if (data == 2) {
        return '75,0%'
      } else if (data == 3) {
        return '50,0%'
      } else if (data == 4) {
        return '25,0%'
      } else if (data == 5) {
        return '0,0%'
      } else if (data == 0) {
        return '100,0%'
      }
    } else {
      if (data == 1) {
        return '12,5%'
      } else if (data == 2) {
        return '25,0%'
      } else if (data == 3) {
        return '50,0%'
      } else if (data == 4) {
        return '75,0%'
      } else if (data == 5) {
        return '100,0%'
      } else if (data == 0) {
        return '0,0%'
      }
    }
  }
}

async function getPokemon(pokemon) {
  const response = await fetch(`${api}pokemon/${pokemon}`)
  const data = await response.json()
  console.log(data)

  if (!pokedex.hasAttribute('hidden')) {
    pokedex.setAttribute('hidden', 'true')

    pokemonPage.innerHTML = `
    <section class="content-details ${data.types[0].type.name}">
    <div class="navbar">
      <a href="index.html">
        <span><i class="ph ph-arrow-left"></i></span>
      </a>
      <span><i class="ph ph-heart"></i></span>
    </div>
    <div class="pokemon">
      <div class="pokeHeader">
        <h1 class="name">${
          data.name[0].toUpperCase() + data.name.substring(1)
        }</h1>
        <span class="number">${data.id}</span>
      </div>
      <div class="detail">
        <ol class="types">
        ${data.types
          .map(
            (type) => `<li class="type">${type.type.name}
        </li>`,
          )
          .join('')}
        </ol>
      </div>
      <div class="pokePhoto">
        <img src="${data.sprites.other.home.front_default}" alt="${
      data.name
    }" />
      </div>
    </div>
    <div class="pokeInfo">
      <nav>
        <ul>
          <li class="active">About</li>
          <li>Base Stats</li>
          <li>Evolution</li>
          <li>Moves</li>
        </ul>
      </nav>
      <div class="info-table">
        <table>
          <tr>
            <td class="item">Species</td>
            <td class="description">${await getPokemonsSpecies(
              data.id,
              'specie',
            )}</td>
          </tr>
          <tr>
            <td class="item">Height</td>
            <td class="description">${data.height / 10}</td>
          </tr>
          <tr>
            <td class="item">Weight</td>
            <td class="description">${data.weight / 10}</td>
          </tr>
          <tr>
            <td class="item">Abilities</td>
            <td class="description">${data.abilities
              .map((ability) => ability.ability.name)
              .join(', ')}</td>
          </tr>
          <th colspan="2">Breeding</th>
          <tr>
            <td class="item">Gender</td>
            <td class="description gender">
              <span><i class="ph ph-gender-male male"></i></span>
              <span>${await getPokemonsSpecies(data.id, ' ', 'male')}</span>
              <span><i class="ph ph-gender-female female"></i></span>
              <span>${await getPokemonsSpecies(data.id, ' ', 'female')}</span>
            </td>
          </tr>
          <tr>
              <td class="item">Egg Groups</td>
              <td class="description">${await getPokemonsSpecies(
                data.id,
                'egg_groups',
              )}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
    `
  }
}
