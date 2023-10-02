import Image from 'next/image'
import React from 'react'
import "./card.css"

const Card = ({ student }) => {
    return (
        <div className='card'>
            <div >
                <Image src="/Dog.jpg" width={100} height={100} alt="Dog" className="card-image" />
            </div>
            <div className="carddetails">
                <p className='card-details'>{student.n}</p>
                <p className='card-details'>Newar</p>
                {/* <p className='card-details'>Newar</p> */}

            </div>
        </div>
    )
}

export default Card
