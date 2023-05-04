const url = "https://pokeapi.co/api/v2/pokemon";
const container = document.getElementById("pokemon-container");

// Obtém os dados de todos os Pokemons da API e exibe-os em um catálogo
function loadPokemon() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pokemons = data.results;
      pokemons.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((data) => {
            const pokemonElement = document.createElement("div");
            pokemonElement.className = "pokemon";
            pokemonElement.innerHTML = `
          <h1>${data.name}</h1>
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <h2>Abilities:</h2> <p>${data.abilities
            .map((ability) => ability.ability.name)
            .join(", ")}</p>
          <h3>Type:</h3><p> ${data.types.map((type) => type.type.name).join(", ")}</p>
        `;
            container.appendChild(pokemonElement);
          });
      });
    });
}

// Filtra a lista de Pokemons exibida na tela com base na entrada de pesquisa
function filterPokemon(searchTerm, filterType) {
  const pokemonElements = container.querySelectorAll(".pokemon");
  pokemonElements.forEach((pokemonElement) => {
    const pokemonName = pokemonElement.querySelector("h2").textContent;
    const pokemonType = pokemonElement
      .querySelector("p:last-of-type")
      .textContent.slice(6);
    const shouldDisplay =
      pokemonName.includes(searchTerm) &&
      (filterType === "all" || pokemonType.includes(filterType));
    pokemonElement.style.display = shouldDisplay ? "block" : "none";
  });
}

// Carrega todos os Pokemons na tela
loadPokemon();
