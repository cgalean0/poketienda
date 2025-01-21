const containerProducts = document.getElementById('section-products');

let getPokemons = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        if (!response.ok) {
            throw new Error(`Response error: ${response.status}`);
        }

        const json = await response.json();
        const pokemons = json.results; // Array container of pokemons

        //Function to return aditional information of pokemons
        async function getPokemonInfo(pokemons) {
            try {
                const res = await fetch(pokemons.url);
                if (!res.ok) {
                    throw new Error(`Response error: ${res.status}`);
                }
                const result = await res.json();
                return result;

            } catch (error) {
                console.error("An error ocurred: " + error);
            }
        }

        for (const pokemon of pokemons) {
            const info = await getPokemonInfo(pokemon);
            
            //Make cards of products

            //Card Container
            const containerCard = document.createElement('div');
            containerCard.classList.add('card');
            containerCard.style.width = "18rem";
            containerCard.style.margin = "1rem";

            //Product image
            const imageProduct = document.createElement('img');
            imageProduct.classList.add('card-img-top');
            imageProduct.setAttribute('src', info.sprites.front_default);
            imageProduct.setAttribute('alt', `Pokemon: ${pokemon.name}`);

            //Body card container
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.classList.add('d-flex');
            cardBody.classList.add('justify-content-center');
            cardBody.classList.add('align-items-center');
            cardBody.classList.add('flex-column');
            cardBody.style.gap = "1rem"

            //Title card
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = (pokemon.name).toUpperCase();
            cardTitle.style.fontWeight = "700";
            

            //Show all types for each pokemon
            const typesOfPokemon = info.types;
            const containerTypes = document.createElement('div');
            containerTypes.classList.add('d-flex');
            containerTypes.style.gap = "1rem";
            containerTypes.classList.add('container-types');
            for (let i = 0; i < typesOfPokemon.length; i++) {
                const typePokemon = typesOfPokemon[i].type
                const nameType = document.createElement('span');
                nameType.classList.add('btn');
                //Color for each type of pokemon
                if (typePokemon.name === "grass") {
                    nameType.style.backgroundColor = "#3E7B27";
                } else if (typePokemon.name === "poison") {
                    nameType.style.backgroundColor = "#C21292"
                } else if (typePokemon.name === "fire") {
                    nameType.style.backgroundColor = "#FF7F3E";
                } else if (typePokemon.name === "water") {
                    nameType.style.backgroundColor = "#86A7FC"
                } else if (typePokemon.name === "bug") {
                    nameType.style.backgroundColor = "#337357";
                } else if (typePokemon.name === "normal") {
                    nameType.style.backgroundColor = "#EAD196";
                } else if (typePokemon.name === "flying") {
                    nameType.style.backgroundColor = "#E9F6FF"
                }

                nameType.textContent = typePokemon.name;
                containerTypes.append(nameType);
            }

            //Price of Pokemons
            const price = document.createElement('span');
            price.textContent = `$ ${info.base_experience}`;
            price.style.fontSize = "2rem";
            price.style.fontWeight = "bold";

            //Button to function to add cart to buy pokemon
            const buttonAddToCart = document.createElement('button');
            buttonAddToCart.classList.add('btn');
            buttonAddToCart.classList.add('btn-primary');
            buttonAddToCart.textContent = "Add to Cart";

            //Implements childs of containers
            cardBody.append(cardTitle, containerTypes, price, buttonAddToCart);
            containerCard.append(imageProduct, cardBody);
            containerProducts.appendChild(containerCard);
        }
        
    } catch (error) {
        console.error("An error ocurred: " + error);
    }
}
getPokemons();