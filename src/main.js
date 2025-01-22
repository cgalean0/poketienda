const containerProducts = document.getElementById('section-products');
const containerShopingCartProducts = document.getElementById('shopping-cart-products');
const shopingCart = [];

const buttonCart = document.getElementById('button-cart');
const shopingCartView = document.getElementById('shopping-cart');
//Show and hide shopping cart
buttonCart.addEventListener('click', () => {
    if (shopingCartView.classList.contains('d-none')){
        shopingCartView.classList.remove('d-none');
        shopingCartView.classList.add('d-flex');
    } else if (!shopingCartView.classList.contains('d-none')) {
        shopingCartView.classList.remove('d-flex');
        shopingCartView.classList.add('d-none');
    }
});

//Button back function
const buttonBackCart = document.getElementById('button-back');
buttonBackCart.addEventListener('click', () => {
    if (shopingCartView.classList.contains('d-flex')) {
        shopingCartView.classList.remove('d-flex');
        shopingCartView.classList.add('d-none');
    }
})

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
            cardBody.classList.add('card-body', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column');
            cardBody.style.gap = "1rem"

            //Title card
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = (pokemon.name).toUpperCase();
            cardTitle.style.fontWeight = "700";
            

            //Show all types for each pokemon
            const typesOfPokemon = info.types;
            const containerTypes = document.createElement('div');
            containerTypes.classList.add('d-flex', 'container-types');
            containerTypes.style.gap = "1rem";
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
            buttonAddToCart.classList.add('btn', 'btn-primary', 'add-to-cart');
            buttonAddToCart.textContent = "Add to Cart";

            buttonAddToCart.addEventListener('click', () => {
                const item = {
                    name: pokemon.name,
                    price: info.base_experience,
                    image: info.sprites.front_default
                };
                shopingCart.push(item);
                showCartElements();
            });

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

//Function for show the elementes in the shopping cart
let showCartElements = () => {
    //Clean the cart before to show elements
    containerShopingCartProducts.innerHTML = '';
    //For each element to the cart create a card
    shopingCart.forEach(elem => {
        //Container of the card
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card', 'mb-3');
        cardContainer.style.maxWidth = "400px";

        //First row of the card
        const divFirstRow = document.createElement('div');
        divFirstRow.classList.add('row', 'g-0');

        //Container of the image and the image of product
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('col-md-3');
        const imagePokemon = document.createElement('img');
        imagePokemon.classList.add('img-fluid', 'rounded-start');
        imagePokemon.setAttribute('src', elem.image);
        imagePokemon.setAttribute('alt', elem.name);

        //Body of the card
        const containerBody = document.createElement('div');
        containerBody.classList.add('col-md-8', 'd-flex', 'justify-content-center', 'align-items-center');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const titleCard = document.createElement('h4');
        titleCard.classList.add('card-title');
        titleCard.textContent = elem.name;
        const price = document.createElement('span');
        price.textContent = `$ ${elem.price}`;
        const deleteButtonContainer = document.createElement('div');
        deleteButtonContainer.classList.add('container-fluid');

        //Section of the delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-warning', 'mr-2')
        deleteButton.style.height = "50px";
        const imageDeleteButton = document.createElement('img');
        imageDeleteButton.setAttribute('src', 'assets/delete_button.svg');
        deleteButton.appendChild(imageDeleteButton);
        deleteButtonContainer.appendChild(deleteButton);
        const indexProduct = shopingCart.findIndex(item => item.name === elem.name);
        deleteButton.addEventListener('click', () => {
            if (indexProduct !== -1) {
                shopingCart.splice(indexProduct, 1);
            }
            showCartElements();
        });


        //Implements of components od the card
        imageContainer.appendChild(imagePokemon);
        cardBody.append(titleCard, price);
        containerBody.append(cardBody, deleteButton);
        divFirstRow.append(imageContainer, containerBody);
        cardContainer.appendChild(divFirstRow);
        containerShopingCartProducts.appendChild(cardContainer);
    });
}

