
// Fetches data to populate the Select Drop Down Menu with 151 Pokemon and populates it
export const getSelectMenuData = async () => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`);
    let data = await response.json()
    let pokemonRawArray = data;
    let pokemonOptionsArray = pokemonRawArray.results

    pokemonOptionsArray.forEach( pokemon => {
        let currentPokemonOption = document.createElement('option');
        let capitalizedName = pokemon.name.toUpperCase()
        currentPokemonOption.innerHTML = capitalizedName
        $('#poke-selector').append(currentPokemonOption);
    })
}

// Clears both lists on the UI (Sample Move Sets and Stats)
export const clearLists = () => { $('li').remove() }

// Fetches all Pokemon Data and populates the UI
export const getChosenPokemonData = async () => {
    let selectMenu = $('#poke-selector')[0];
    let chosenPokemonOption = selectMenu.options[selectMenu.selectedIndex].text
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${chosenPokemonOption.toLowerCase()}`)
    let chosenPokemonData = await response.json();
    let chosenPokemonImage = chosenPokemonData.sprites.front_default;
    $('#p1').text(chosenPokemonOption)
    $('#poke-image').attr('src', chosenPokemonImage)
    
    // Getting a sample of Pokemon Moves
    let pokemonMovesArray = chosenPokemonData.moves.slice(0, 6)
    pokemonMovesArray.forEach( move => {
        let currentMove = document.createElement('li')
        currentMove.innerHTML = `${move.move.name.toUpperCase()}`
        let movesList = $('ul')[0];
        movesList.appendChild(currentMove)
    })

    // Getting all Pokemon Stats
    let chosenPokemonStatsArray = chosenPokemonData.stats;
    chosenPokemonStatsArray.forEach( pokeStat => {
        let currentStat = document.createElement('li')
        currentStat.innerHTML = `${pokeStat.stat.name.toUpperCase()} - ${pokeStat.base_stat}`
        let statsList = $('ul')[1];
        statsList.appendChild(currentStat)
    })
}
