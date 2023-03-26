const pokedex = document.getElementById("pokedex");

const legendaries = [
    144, 145, 146, 150, 243, 244, 245, 249, 250, 377, 378, 379, 380, 
    381, 382, 383, 384, 480, 481, 482, 483, 484, 485, 486, 487, 488, 
    638, 639, 640, 641, 642, 643, 644, 645, 646, 716, 717, 718, 772, 
    773, 785, 786, 787, 788, 791, 792, 800, 888, 889, 890, 891, 892, 
    894, 895, 896, 897, 898];


async function getData() {

    const url = "https://pokebuildapi.fr/api/v1/pokemon";
    const reponse = await fetch(url);
    const pokemons = await reponse.json();
    console.log(pokemons[0]);

    for (let i = 0; i <= pokemons.length -1; i++)
    {
        const card = document.createElement("article");
        card.classList.add("pokemon-card");
        card.setAttribute("id", `pokemon${pokemons[i].id}`);
        card.setAttribute("data-gen", pokemons[i].apiGeneration);
        card.setAttribute("data-legendary", false);
        pokedex.appendChild(card);

        console.log(card.getAttribute("data-gen"));

        const image = document.createElement("img");
        image.src = pokemons[i].image;
        image.classList.add("pokemon-img");
        card.appendChild(image);

        const name = document.createElement("h3");
        name.innerText = `${pokemons[i].name} (00${pokemons[i].pokedexId})`;
        name.classList.add("pokemon-name");
        card.appendChild(name);    

        const types = document.createElement("p");
        types.classList.add("pokemon-types");

        const typesDiv = document.createElement("div");
        typesDiv.classList.add("pokemon-types-div");

        if (pokemons[i].apiTypes.length === 1) {

            types.innerText = pokemons[i].apiTypes[0].name;

            const typeImg = document.createElement("img");
            typeImg.src = pokemons[i].apiTypes[0].image;
            typeImg.classList.add("pokemon-types-img");
            typesDiv.appendChild(typeImg);  

        } else {

            types.innerText = `${pokemons[i].apiTypes[0].name} - ${pokemons[i].apiTypes[1].name}`;

            for(let i = 0; i < 2; i++)
            {
                const typeImg = document.createElement("img");
                typeImg.src = pokemons[i].apiTypes[i].image;
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
        HP.innerText = `HP : ${pokemons[i].stats["HP"]}`;
        stats.appendChild(HP);

        const attack = document.createElement("li");
        attack.classList.add("pokemon-stat-li");
        attack.innerText = `Attaque : ${pokemons[i].stats["attack"]}`;
        stats.appendChild(attack);

        const defense = document.createElement("li");
        defense.classList.add("pokemon-stat-li");
        defense.innerText = `Défense : ${pokemons[i].stats["defense"]}`;
        stats.appendChild(defense);

        const specialAttack = document.createElement("li");
        specialAttack.classList.add("pokemon-stat-li");
        specialAttack.innerText = `Attaque spéciale : ${pokemons[i].stats["special_attack"]}`;
        stats.appendChild(specialAttack);

        const specialDefense = document.createElement("li");
        specialDefense.classList.add("pokemon-stat-li");
        specialDefense.innerText = `Défense spéciale : ${pokemons[i].stats["special_defense"]}`;
        stats.appendChild(specialDefense);

        const speed = document.createElement("li");
        speed.classList.add("pokemon-stat-li");
        speed.innerText = `Vitesse : ${pokemons[i].stats["speed"]}`;
        stats.appendChild(speed);
      
    }

    for (let i = 0; i <= legendaries.length -1; i++)
    {
        const card = document.getElementById(`pokemon${legendaries[i]}`);
        card.setAttribute("data-legendary", 1);
    }


}

try {

    getData();

} catch(error) {

    console.error(error);
}


async function displayLegendaries() {

    const cards = document.querySelectorAll(".pokemon-card");

    for (let i = 0; i <= cards.length; i++)
    {
        const card = document.getElementById(`pokemon${i}`);
        
        console.log(card.getAttribute("data-gen"));
/*
        if (card.dataset("data-legendary") === true)
        {
            card.style.display = "block";
        } else {
            card.style.display = "else";
        }*/
    }

/*
    const stats = document.querySelectorAll(".pokemon-stats");

    for (let i = 0; i < stats.length; i++)
    {
        stats[i].classList.add("hidden");
    }

    btnStatsHidden.style.display = "block";
    btnStatsDisplayed.style.display = "none";*/

}


const btnLegendary = document.getElementById("btn-legendaries");

btnLegendary.addEventListener("click", function() {
    displayLegendaries();
});

const btnStatsHidden = document.getElementById("btn-stats-hidden");
const btnStatsDisplayed = document.getElementById("btn-stats-displayed");

function displayStats() {

    const stats = document.querySelectorAll(".pokemon-stats");

    for (let i = 0; i < stats.length; i++)
    {
        stats[i].classList.remove("hidden");
    }

    btnStatsHidden.style.display = "none";
    btnStatsDisplayed.style.display = "block";

}

function hideStats() {

    const stats = document.querySelectorAll(".pokemon-stats");

    for (let i = 0; i < stats.length; i++)
    {
        stats[i].classList.add("hidden");
    }

    btnStatsHidden.style.display = "block";
    btnStatsDisplayed.style.display = "none";

}

btnStatsHidden.addEventListener("click", function() {
    displayStats();
});

btnStatsDisplayed.addEventListener("click", function() {
    hideStats();
});
/*
function displayFirstGen() {

}*/

const btnReset = document.getElementById("reset");

btnReset.addEventListener("click", function() {

    getData();
});

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
                card.style.display = "block";
        }
    }
    
}

const btnFirstGen = document.getElementById("gen-1");

btnFirstGen.addEventListener("click", function() {
    displayGen(1);
});