const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonsDetails = document.getElementById('pokemonDetail')
const buttonClose = document.getElementById('button-close');
const buttonFavorite = document.getElementById('button-favorite');
const containerHeader = document.getElementById('container-header')

const maxRecords = 151
let listPokemons = [];
const limit = 10
let offset = 0;
let option = "about"

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="${pokemon.number}">
            <span id="${pokemon.number}" class="number">#${pokemon.number.toString().padStart(4, '0')}</span>
            <div>
                <span id="${pokemon.number}" class="name">${pokemon.name}</span>
                <div id="${pokemon.number}" class="detail">
                    <ol id="${pokemon.number}" class="types">
                        ${pokemon.types.map((type) => `<li id="${pokemon.number}" class="type ${type}">${type}</li>`).join('')}
                    </ol>
                
                    <img id="${pokemon.number}" src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>
            </div>

            
        </li>
    `
}

async function loadPokemonItens(offset, limit) {
    listPokemons = await pokeApi.getPokemons(offset, limit)
    generatePokemon()
}

function generatePokemonDetails(pokemon) {
    return `
    <div class="${pokemon.type} expanded pokemon">
        <div class="container-header">
            <div class="container-types">
                <h1 class="name" >${pokemon.name}</h1>
                <ul id="${pokemon.number}" class="flex">
                ${pokemon.types.map((type) => `<li id="${pokemon.number}" class="type-pokemon ${pokemon.type}">${type}</li>`).join('')}
                </ul>
            </div>
            <span class="number-detail" >#${pokemon.number.toString().padStart(4, '0')}</span>
        </div>
        <img class="pokemonImag" src="${pokemon.animated}" alt="${pokemon.name}">
        <div class="about">
            <ul class="nav-bar">
                <li class="selected" >About</li>
                <li>Base Stats</li>
                <li>Evolution</li>
                <li>Moves</li>
            </ul>
            <ul class="list-about">
                <li>Species: <span>${pokemon.species}</span></li>
                <li>Height: <span>${pokemon.height}</span>
                <li>Weight: <span>${pokemon.weight}</span></li>
                <li class="list-ability" >Abilities: <span>
                    ${
                        pokemon.abilities.map(ability => `
                            <span>${ability}</span>
                        `).join('')
                    }
                </span></li>
        </div>
    </div>
    `
}

function generatePokemon(id = undefined) {
    let newHtml;
    if (id) {
        const data = listPokemons.filter(pokemon => Number(pokemon.number) == Number(id))
        newHtml = generatePokemonDetails(data[0]);
        pokemonsDetails.innerHTML = newHtml
    } else {
        newHtml = listPokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    }
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

pokemonList.addEventListener('click', ({target: {id}}) => {
    pokemonsDetails.classList.remove("hidden")
    generatePokemon(id)
    buttonClose.classList.add("exit")
    buttonFavorite.classList.remove("menu")
    buttonFavorite.classList.add("favorite")
    containerHeader.classList.add('fixed')
})

buttonClose.addEventListener('click', () => {
    buttonFavorite.classList.add("menu")
    buttonFavorite.classList.remove("favorite")
    pokemonsDetails.classList.add("hidden")
    containerHeader.classList.remove('fixed')
})
