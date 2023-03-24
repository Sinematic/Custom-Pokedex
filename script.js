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



        if (pokemons[i].apiTypes.length === 1) {

            types.innerText = pokemons[i].apiTypes[0].name;

            const typeImg = document.createElement("img");
            typeImg.src = pokemons[i].apiTypes[0].image;
            typeImg.classList.add("pokemon-types-img");
            card.appendChild(typeImg);  

        } else {

            types.innerText = `${pokemons[i].apiTypes[0].name} - ${pokemons[i].apiTypes[1].name}`;
            for(let i = 0; i < 2; i++)
            {
                const typeImg = document.createElement("img");
                typeImg.src = pokemons[i].apiTypes[i].image;
                typeImg.classList.add("pokemon-types-img");
                card.appendChild(typeImg);    

            }
        }

        card.appendChild(types);  
  

        const stats = document.createElement("ol");
        stats.classList.add("pokemon-stats");
        card.appendChild(stats);

        const stat = document.createElement("li");
        stat.classList.add("pokemon-stat-li");
        pokemons.stats

        /*
        stat.innerText = pokemons[i].name;
        name.classList.add("pokemon-name");
        card.appendChild(name);  */  

            
    } 

    
    console.log(pokemons[2].stats[2]);

}

getData();
