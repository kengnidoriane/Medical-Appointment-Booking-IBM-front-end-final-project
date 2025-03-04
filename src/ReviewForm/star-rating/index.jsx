import { useState } from 'react'
import { FaStar } from 'react-icons/fa'


export default function StarRating({noOfStars = 5}) {

        const [rating, setRating] = useState(0);
        const [hover, setHover] = useState(0);

        function handleClick(getCurrentIndex) {
            console.log(getCurrentIndex);
            setRating(getCurrentIndex)
        }

        function handleMouseEnter(getCurrentIndex) {
            console.log(getCurrentIndex);
            setHover(getCurrentIndex)

        }

        function handleMouseLeave(getCurrentIndex) {
            console.log(getCurrentIndex);
            setHover(rating)
        }

    return <div className='star-rating'>
    {
        [...Array(noOfStars)].map((_, index) =>{ // cette declaration permet de creer autant d'etoile que voulue avec le parametre noOfStars
            index += 1;

            return <FaStar
            key={index}  //key est la pour identifier chaqu' etoile de facon unique
            color={index <= (hover || rating) ? '#fff700' : '#000000'} //j'aurai pu remplace color par className et les couleurs par des classes choisit et stylise dans le css
            onClick={() => handleClick(index)}
            onMouseMove={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
            size={25}
            />
        })

    }
    </div>
}