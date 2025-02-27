import React from 'react'
import ServiceCard from './Service_Card/ServiceCard'
import './Services.css'

function Service() {
  return (
    <div className='services'>
        <h2>Best Practices</h2>
        <p>Take care of your body. It's the only place you have to live</p>
        <div className='container-card-services'>
            <ServiceCard
                imageUrl="/images/instant-consultation.png"
                title="Instant Consultation"
                link="/instant-consultation"
            />
             <ServiceCard
                imageUrl="/images/instant-consultation.png"
                title="Booking Appointment"
                link="/booking-consultation"
            />
             <ServiceCard
                imageUrl="/images/instant-consultation.png"
                title="Self Checkup"
                link="/autre-page"
            />
             <ServiceCard
                imageUrl="/images/instant-consultation.png"
                title="Health Tips and Guidance"
                link="/autre-page"
            />
        </div>
    </div>
  )
}

export default Service