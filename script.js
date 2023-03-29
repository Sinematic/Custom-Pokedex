const pokedex = document.getElementById("pokedex");

const legendaries = [
    144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 377, 378, 
    379, 380, 381, 382, 383, 384, 480, 481, 482, 483, 484, 485, 
    486, 487, 488, 638, 639, 640, 641, 642, 643, 644, 645, 646,
    716, 717, 718, 772, 773, 785, 786, 787, 788, 791, 792, 800, 
    888, 889, 890, 891, 892, 894, 895, 896, 897, 898];


async function getData(url = "pokemon/") {

    const reponse = await fetch(`https://pokebuildapi.fr/api/v1/${url}`);
    const pokemons = await reponse.json();

    pokedex.innerHTML = "";

    for (let i = 0; i < pokemons.length; i++)
    {
        generatePokedex(pokemons[i]);
        displayClickedPokemon(pokemons[i].pokedexId);
    }
}


try {

    getData();

} catch(error) {

    console.error(error);
}


const btnLegendaries = document.getElementById("btn-legendaries");

btnLegendaries.addEventListener("click", async function() {
    
    reset();
    
    pokedex.innerHTML = "";

    for (let i = 0; i < legendaries.length; i++)
    {
        await retrievePokemon(legendaries[i]);
    }
    
});


function generatePokedex(pokemon) {

    const card = document.createElement("article");
    card.classList.add("pokemon-card");
    card.setAttribute("id", `pokemon${pokemon.id}`);
    pokedex.appendChild(card);

    const image = document.createElement("img");
    image.src = pokemon.image;
    image.classList.add("pokemon-img");
    card.appendChild(image);

    const name = document.createElement("h3");
    name.innerText = `${pokemon.name} (00${pokemon.pokedexId})`;
    name.classList.add("pokemon-name");
    card.appendChild(name);    

    const types = document.createElement("p");
    types.classList.add("pokemon-types");

    const typesDiv = document.createElement("div");
    typesDiv.classList.add("pokemon-types-div");

    if (pokemon.apiTypes.length === 1) {

            types.innerText = pokemon.apiTypes[0].name;

            const typeImg = document.createElement("img");
            typeImg.src = pokemon.apiTypes[0].image;
            typeImg.classList.add("pokemon-types-img");
            typesDiv.appendChild(typeImg);  

    } else {

            types.innerText = `${pokemon.apiTypes[0].name} - ${pokemon.apiTypes[1].name}`;

            for(let j = 0; j < 2; j++)
            {
                const typeImg = document.createElement("img");
                typeImg.src = pokemon.apiTypes[j].image;
                typeImg.classList.add("pokemon-types-img");
                typeImg.classList.add("pokemo-duo-types");
                typesDiv.appendChild(typeImg);
            }
    }

    card.appendChild(typesDiv);
    card.appendChild(types);  
  
    const stats = document.createElement("ol");
    stats.classList.add("pokemon-stats", "hidden");
    card.appendChild(stats);

    const HP = document.createElement("li");
    HP.classList.add("pokemon-stat-li");
    HP.innerText = `HP : ${pokemon.stats["HP"]}`;
    stats.appendChild(HP);

    const attack = document.createElement("li");
    attack.classList.add("pokemon-stat-li");
    attack.innerText = `Attaque : ${pokemon.stats["attack"]}`;
    stats.appendChild(attack);

    const defense = document.createElement("li");
    defense.classList.add("pokemon-stat-li");
    defense.innerText = `Défense : ${pokemon.stats["defense"]}`;
    stats.appendChild(defense);

    const specialAttack = document.createElement("li");
    specialAttack.classList.add("pokemon-stat-li");
    specialAttack.innerText = `Attaque spéciale : ${pokemon.stats["special_attack"]}`;
    stats.appendChild(specialAttack);

    const specialDefense = document.createElement("li");
    specialDefense.classList.add("pokemon-stat-li");
    specialDefense.innerText = `Défense spéciale : ${pokemon.stats["special_defense"]}`;
    stats.appendChild(specialDefense);

    const speed = document.createElement("li");
    speed.classList.add("pokemon-stat-li");
    speed.innerText = `Vitesse : ${pokemon.stats["speed"]}`;
    stats.appendChild(speed);

}


async function retrievePokemon(pokemonName) {

    const reponse = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonName}`);
    const pokemon = await reponse.json();
    
    generatePokedex(pokemon);

}


const search = document.getElementById("search");
const submit = document.getElementById("submit");

submit.addEventListener("click", function(event) {

    event.preventDefault();
    const pokemon = search.value;
    pokedex.innerHTML = "";
    retrievePokemon(pokemon);

});


const selectGen = document.getElementById("gen");

selectGen.addEventListener("change", function() {

    if(selectGen.value > 0) {
        getData(`pokemon/generation/${selectGen.value}`)
    } else {
        getData();
    }
});


const btnReset = document.getElementById("reset");

function reset() {

    getData();
    hideStats(); 
    pokedex.style.gridTemplateColumns = "repeat(4, 1fr)";
    search.value = "";

}

btnReset.addEventListener("click", function() {

    reset();
});


const btnStatsHidden = document.getElementById("btn-stats-hidden");

btnStatsHidden.addEventListener("click", function() {
    displayStats();
});

function displayStats() {

    const stats = document.querySelectorAll(".pokemon-stats");

    for (let i = 0; i < stats.length; i++)
    {
        stats[i].classList.remove("hidden");
    }

    btnStatsHidden.style.display = "none";
    btnStatsDisplayed.style.display = "inline";

}


const btnStatsDisplayed = document.getElementById("btn-stats-displayed");

function hideStats() {

    const stats = document.querySelectorAll(".pokemon-stats");

    for (let i = 0; i < stats.length; i++)
    {
        stats[i].classList.add("hidden");
    }

    btnStatsHidden.style.display = "inline";
    btnStatsDisplayed.style.display = "none";

}

btnStatsDisplayed.addEventListener("click", function() {

    hideStats();
});


const random = document.getElementById("random");

random.addEventListener("click", function() {

    getData("random/team");
    pokedex.style.gridTemplateColumns = "repeat(3, 1fr)";
});


async function displayClickedPokemon(id) {

    const card = document.getElementById(`pokemon${id}`);
        
    card.addEventListener("click", function() {

        console.log(`Pokemon${id} cliqué`);
        pokedex.innerHTML = "";
        retrievePokemon(id);
        displayStats();

        const xmark = document.createElement("i");
        xmark.classList.add("fa-solid");
        xmark.classList.add("fa-xmark");

        card.appendChild(xmark);
        card.style.width = "40%"
        
        hasEvolutions(id);

    });
    
}

async function hasEvolutions(id) {

    const reponse = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`);
    const pokemon = await reponse.json();

    if(pokemon.apiPreEvolution) {
        retrievePokemon(pokemon.apiPreEvolution.name);
    }

    if(pokemon.apiEvolutions) {
        if(pokemon.apiEvolutions.length > 1) {

            for (let i = 0; i < pokemon.apiEvolutions.length; i++)
            {
                retrievePokemon(pokemon.apiEvolutions[i].name);
            }
            
        } else {
            retrievePokemon(pokemon.apiEvolutions[0].name);
        }
    }
} 

const xmark = document.querySelector("fa-xmark");

xmark.addEventListener("click", function() {
    reset();
    getData();
});