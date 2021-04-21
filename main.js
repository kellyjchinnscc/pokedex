import { getSelectMenuData, clearLists, getChosenPokemonData } from './functions.js'

getSelectMenuData()
    .then( data => {
    getChosenPokemonData()

    const pokeSelector = $('#poke-selector');
    pokeSelector.on('change', async () => {
        clearLists();
        getChosenPokemonData();
    })
})