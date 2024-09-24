import React, { useState } from "react";
import "./style.css";

function App() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);

    const fetchPokemonData = async () => {
        setError(null);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokemon not found!');
            }
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPokemonData();
    };

    const getBackgroundColor = () => {
        if (!pokemonData) return null;
        const primaryType = pokemonData.types[0].type.name;
        return primaryType;
    };

    return (
        <div className="App">
            <header>Pokemon Information</header>
            <br />
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter Pokemon Name"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                />
                <br />
                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            {pokemonData && (
                <div className={`pokemon-info ${getBackgroundColor()}`}>
                    <img src={pokemonData.sprites.other.showdown.front_default} alt={pokemonName} />
                    <h2>{pokemonData.name}</h2>
                    <p>Pokedex Number: {pokemonData.id}</p>
                    <p>Types: {pokemonData.types.map(type => type.type.name).join(", ")}</p>
                    <p>Abilities: {pokemonData.abilities.map(ability => ability.ability.name).join(", ")}</p>
                    <p>Stats:</p>
                    <ul>
                        {pokemonData.stats.map(stat => (
                            <li key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;