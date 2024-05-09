import './PokemonCard.css'

export const PokemonCard = ({ name, img }) => {
    return (
        <article className='pokeCard'>
            <img className='pokeCard-img' src={img} alt={name} />
            <h2 className='pokeCard-name'>{name}</h2>
        </article>
    )
}
