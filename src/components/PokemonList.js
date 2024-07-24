import { useEffect, useState } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState();
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0"
  );
  useEffect(() => {
    async function loadPokemon() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // pokemon now gets the complete API response incl. next and previous:
        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemon();
  }, [url]);

  if (!pokemon) {
    return null;
  }
  return (
    <main>
      <button
        type="button"
        onClick={() => setUrl(pokemon.previous)}
        // disable on first page:
        disabled={!pokemon.previous}
      >
        Previous Page
      </button>
      <button
        type="button"
        onClick={() => setUrl(pokemon.next)}
        // disable on last page:
        disabled={!pokemon.next}
      >
        Next Page
      </button>
      <ul>
        {/* now we need to map over the results: */}
        {pokemon.results.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}
