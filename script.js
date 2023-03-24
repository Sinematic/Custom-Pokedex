const pokedex = document.getElementById("pokedex");

async function getData() {

    const url = "https://pokebuildapi.fr/api/v1/pokemon";
    const reponse = await fetch(url);
    const pokemons = await reponse.json();
    console.log(pokemons[0]);

    for (let i = 0; i <= pokemons.length -1; i++)
    {
        const card = document.createElement("article");
        card.classList.add("pokemon-card");
        pokedex.appendChild(card);

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
                typesDiv.appendChild(typeImg);      
                card.appendChild(typesDiv);
            }
        }

        card.appendChild(typesDiv);
        card.appendChild(types);  
  
        const stats = document.createElement("ol");
        stats.classList.add("pokemon-stats");
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

    
    console.log(pokemons[2].stats[2]);

}

getData();
