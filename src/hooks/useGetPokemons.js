import { useState, useEffect } from "react"

export function useGetPokemons({ urlPokemons }) {
    const [pokemones, setPokemones] = useState([])
    const [urlNext, setUrlNext] = useState('')
    const [urlPrevious, setUrlPrevious] = useState('')

    useEffect(() => {
        if (!urlPokemons) return
        const getPokemones = async () => {
            try {
                setPokemones([])
                const res = await fetch(urlPokemons)
                if (!res.ok) throw { status: res.status }
                const data = await res.json()
                setUrlNext(data.next)
                setUrlPrevious(data.previous)

                const pokemonPromises = data.results.map(async (obj) => {
                    try {
                        const res = await fetch(obj.url)
                        if (!res.ok) throw { status: res.status }
                        const data = await res.json()
                        const pokemon = {
                            id: data.id,
                            name: data.name,
                            img: data.sprites.other['official-artwork'].front_default
                        }
                        return pokemon
                    } catch (error) {

                    }
                })
                Promise.all(pokemonPromises)
                    .then(ArrPokemons => {
                        setPokemones(pokemones => [...pokemones, ...ArrPokemons])
                    })
            } catch (error) {

            }
        }
        getPokemones()

    }, [urlPokemons])

    return { pokemones, urlNext, urlPrevious }
}
