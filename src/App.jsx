import { useState } from "react"
import { PokemonCard } from "./components/PokemonCard"
import { useGetPokemons } from "./hooks/useGetPokemons"
import './App.css'


export const App = () => {

    const [urlPokemons, setUrlPokemons] = useState('https://pokeapi.co/api/v2/pokemon?limit=50')

    const { pokemones, urlNext, urlPrevious } = useGetPokemons({ urlPokemons })

    const handlePrev = () => {
        urlPrevious && setUrlPokemons(urlPrevious)
    }
    const handleNext = () => {
        urlNext && setUrlPokemons(urlNext)
    }

    return (
        <main>
            <h1>POKEMON</h1>
            <div>
                <button onClick={handlePrev}>Anterior</button>
                <button onClick={handleNext}>Siguiente</button>
            </div>
            <div className="grid">
                {!pokemones ? <p>Cargando...</p> : pokemones.map(pokemon => {
                    return <PokemonCard key={pokemon.id} name={pokemon.name} img={pokemon.img} />
                })}
            </div>
        </main>
    )
}
