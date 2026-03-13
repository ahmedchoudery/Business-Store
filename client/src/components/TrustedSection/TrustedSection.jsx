import './TrustedSection.css'

const BRANDS = [
  { name: 'Falak Halls', icon: '🏛️' },
  { name: 'Spice Route', icon: '🍽️' },
  { name: 'Noor Boutique', icon: '👗' },
  { name: 'MediCare Clinic', icon: '🏥' },
  { name: 'Green Valley', icon: '🏡' },
  { name: 'Royal Catering', icon: '👨‍🍳' },
  { name: 'TechStart PK', icon: '💻' },
  { name: 'Star Motors', icon: '🚗' },
  { name: 'AlAmir Foods', icon: '🥘' },
  { name: 'Bloom Salon', icon: '💅' },
]

export default function TrustedSection() {
  const track = [...BRANDS, ...BRANDS]
  return (
    <section className="trusted">
      <div className="container">
        <p className="trusted__label">// trusted by local businesses across Pakistan</p>
      </div>
      <div className="trusted__carousel trusted__carousel--l">
        <div className="trusted__track trusted__track--l">
          {track.map((b, i) => (
            <div key={i} className="trusted__item">
              <span className="trusted__icon">{b.icon}</span>
              <span className="trusted__name">{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}