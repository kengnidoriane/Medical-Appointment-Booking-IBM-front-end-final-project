import React from 'react'
import ServiceCard from './Service_Card/ServiceCard'
import './Services.css'

function Service() {
  return (
    <div>
        <h2>Best Practices</h2>
        <p>Take care of your body. It's the only place you have to live</p>
        <div className='container-card-services'>
            <ServiceCard
                imageUrl="https://example.com/image.jpg"
                title="Instant Consultation"
                link="/instant-consultation"
            />
             <ServiceCard
                imageUrl="https://example.com/image.jpg"
                title="Booking Appointment"
                link="/booking-consultation"
            />
             <ServiceCard
                imageUrl="https://example.com/image.jpg"
                title="Self Checkup"
                link="/autre-page"
            />
             <ServiceCard
                imageUrl="https://example.com/image.jpg"
                title="Health Tips and Guidance"
                link="/autre-page"
            />
        </div>
    </div>
  )
}

export default Service