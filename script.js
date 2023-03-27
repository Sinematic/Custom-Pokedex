const pokedex = document.getElementById("pokedex");

const legendaries = [
    144, 145, 146, 150, 243, 244, 245, 249, 250, 377, 378, 379, 380, 
    381, 382, 383, 384, 480, 481, 482, 483, 484, 485, 486, 487, 488, 
    638, 639, 640, 641, 642, 643, 644, 645, 646, 716, 717, 718, 772, 
    773, 785, 786, 787, 788, 791, 792, 800, 888, 889, 890, 891, 892, 
    894, 895, 896, 897, 898];


async function getData(array = []) {

    const reponse = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
    const result = await reponse.json();
    const pokemons = array.length > 0 ? array : result;

    for (let i = 0; i < pokemons.length; i++)
        {
            const index = array.length > 0 ? pokemons[array[i]] : pokemons[i];
            const card = document.createElement("article");
            card.classList.add("pokemon-card");
            card.setAttribute("id", `pokemon${index.id}`);
            card.setAttribute("data-gen", index.apiGeneration);
            card.setAttribute("data-legendary", false);
            pokedex.appendChild(card);
    
            const image = document.createElement("img");
            image.src = index.image;
            image.classList.add("pokemon-img");
            card.appendChild(image);
    
            const name = document.createElement("h3");

            if (index.pokedexId < 10) {
    
                name.innerText = `${index.name} (00${index.pokedexId})`;
    
            } else if (pokemons[i].pokedexId < 100) {
    
                name.innerText = `${pokemons[i].name} (0${index.pokedexId})`;
            } else {
    
                name.innerText = `${index.name} (${index.pokedexId})`;
            }
    
            name.classList.add("pokemon-name");
            card.appendChild(name);    
    
            const types = document.createElement("p");
            types.classList.add("pokemon-types");
    
            const typesDiv = document.createElement("div");
            typesDiv.classList.add("pokemon-types-div");
    
            if (index.apiTypes.length === 1) {
    
                types.innerText = index.apiTypes[0].name;
    
                const typeImg = document.createElement("img");
                typeImg.src = index.apiTypes[0].image;
                typeImg.classList.add("pokemon-types-img");
                typesDiv.appendChild(typeImg);  
    
            } else {
    
                types.innerText = `${index.apiTypes[0].name} - ${index.apiTypes[1].name}`;
    
                for(let i = 0; i < 2; i++)
                {
                    const typeImg = document.createElement("img");
                    typeImg.src = index.apiTypes[i].image;
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
            HP.innerText = `HP : ${index.stats["HP"]}`;
            stats.appendChild(HP);
    
            const attack = document.createElement("li");
            attack.classList.add("pokemon-stat-li");
            attack.innerText = `Attaque : ${index.stats["attack"]}`;
            stats.appendChild(attack);
    
            const defense = document.createElement("li");
            defense.classList.add("pokemon-stat-li");
            defense.innerText = `Défense : ${index.stats["defense"]}`;
            stats.appendChild(defense);
    
            const specialAttack = document.createElement("li");
            specialAttack.classList.add("pokemon-stat-li");
            specialAttack.innerText = `Attaque spéciale : ${index.stats["special_attack"]}`;
            stats.appendChild(specialAttack);
    
            const specialDefense = document.createElement("li");
            specialDefense.classList.add("pokemon-stat-li");
            specialDefense.innerText = `Défense spéciale : ${index.stats["special_defense"]}`;
            stats.appendChild(specialDefense);
    
            const speed = document.createElement("li");
            speed.classList.add("pokemon-stat-li");
            speed.innerText = `Vitesse : ${index.stats["speed"]}`;
            stats.appendChild(speed);
    
    }
}


try {

    getData();

} catch(error) {

    console.error(error);
}


const btnLegendary = document.getElementById("btn-legendaries");

async function displayLegendaries() {

    const cards = document.querySelectorAll(".pokemon-card");

    for (let i = 0; i < legendaries.length; i++)
    {
        const card = cards[`pokemon${legendaries[i]}`];
        console.log(cards[legendaries[i]]);
        

        console.log(pokemon.dataset.legendary);
        btnLegendary.addEventListener("click", function () {
            const pokemonsFiltrees = cards.filter(function (card) {
                return card.legendary > 0;
            });

            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesFiltrees);

        });
    }
}


btnLegendary.addEventListener("click", async function() {
    pokedex.innerHTML = "";
    getData(legendaries);
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




const btnReset = document.getElementById("reset");

btnReset.addEventListener("click", function() {

    getData();
    hideStats();
});




const btnFirstGen = document.getElementById("gen-1");

function displayGen(int) {

    const cards = document.querySelectorAll(".pokemon-cards");
    
    for (let i = 0; i <= cards.length; i++)
    {
        const card = document.getElementById(`pokemon${i}`);
        let gen = card.dataset.gen;

        switch(gen)
        {
            case int !== gen : 
                card.style.display = "none";
                break;
            default:
                card.style.display = "inline";
        }
    }
    
}

btnFirstGen.addEventListener("click", function() {
    displayGen(1);
});