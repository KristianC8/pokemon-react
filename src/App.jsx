import { useState } from "react"
import { PokemonCard } from "./components/PokemonCard"
import { useGetPokemons } from "./hooks/useGetPokemons"
import { Left } from "./components/icons/Left"
import { Right } from "./components/icons/Right"
import './App.css'
import { ScrollTop } from "./components/ScrollTop"


export const App = () => {

    const [urlPokemons, setUrlPokemons] = useState('https://pokeapi.co/api/v2/pokemon?limit=21')

    const { pokemones, urlNext, urlPrevious, loading } = useGetPokemons({ urlPokemons })

    const handlePrev = () => {
        urlPrevious && setUrlPokemons(urlPrevious)
    }
    const handleNext = () => {
        urlNext && setUrlPokemons(urlNext)
    }

    return (
        <main>
            <h1>POKéMON</h1>
            <div className="buttons-container">
                <button className="buttons button-next" onClick={handlePrev}><Left /></button>
                <button className="buttons button-prev" onClick={handleNext}><Right /></button>
            </div>
            <div className="grid">
                {loading && <span className="loading">Cargando...</span>}
                {pokemones && pokemones.map(pokemon => {
                    return <PokemonCard key={pokemon.id} name={pokemon.name} img={pokemon.img} />
                })}
            </div>
            <ScrollTop />
        </main>
    )
}
