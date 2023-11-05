const pokeCard = document.getElementById("poke-card")
const pokeName = document.getElementById("poke-name")
const pokeImg = document.getElementById("poke-img")
const pokeImgContainer = document.getElementById("poke-img-container")
const pokeId = document.getElementById("poke-id")
const pokeType = document.getElementById("poke-type")
const pokeStat = document.getElementById("poke-stat")


const searchingPokemon = (event) =>{
    event.preventDefault(); //Prevent the default behavior
    const { value } = event.target.pokemon; //Create a variable with the name of the P
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => gettingPokemonData(response)) //Find the pokemon in the API
    .catch(err => errorFounding()) //Catching if the pokemon is not found


}

const gettingPokemonData = (data) =>{
    const sprite = data.sprites.other["official-artwork"].front_default;
    const {stats, types} = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute("src", sprite);
    pokeImg.setAttribute("class", "img-thumbnails rounded")
    pokeId.textContent = `N: ${data.id}`;
    //Aqui va modificar la tarjeta
    gettingPokemonTypes(types);
    gettingPokemonStats(stats);
} 

const gettingPokemonTypes = (types) =>{
    pokeType.innerHTML = "";
    types.forEach(type => {
        const newElement = document.createElement("div");
        newElement.textContent = type.type.name;
        pokeType.appendChild(newElement);
    })

}

const gettingPokemonStats = (stats) =>{
    pokeStat.innerHTML = "";
    stats.forEach(stat =>{
        const newContainer = document.createElement("div");
        const newElementS = document.createElement("div");
        const newElementA = document.createElement("div");
        newContainer.setAttribute("class","row")
        newElementA.setAttribute("class", "col-6");
        newElementS.setAttribute("class","col-6")
        newElementS.textContent = stat.stat.name;
        newElementA.textContent = stat.base_stat;
        pokeStat.appendChild(newContainer);
        newContainer.appendChild(newElementS);
        newContainer.appendChild(newElementA);
    })
}

const errorFounding = () =>{
    pokeName.textContent = "Pokemon not found";
    pokeImg.setAttribute("src", "img/pokebola.png");
    pokeStat.innerHTML = "";
    pokeType.innerHTML = "";
    pokeId.textContent ="";
}