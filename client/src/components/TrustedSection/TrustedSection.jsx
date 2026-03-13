// FILE: client/src/components/TrustedSection/TrustedSection.jsx

import './TrustedSection.css';

const BRANDS = [
  { name: 'Falak Halls', icon: '🏛️' },
  { name: 'Noor Boutique', icon: '✨' },
  { name: 'CityMed Clinic', icon: '🏥' },
  { name: 'Spice Route', icon: '🍽️' },
  { name: 'Raza Properties', icon: '🏡' },
  { name: 'Lahore Eats', icon: '🍜' },
  { name: 'Star Coaching', icon: '⭐' },
  { name: 'Premier Estate', icon: '🏢' },
];

// Duplicate for seamless infinite loop
const TRACK = [...BRANDS, ...BRANDS];

export default function TrustedSection() {
  return (
    <section id="trusted" className="trusted">
      <div className="container">
        <p className="trusted__label">Trusted by businesses across Pakistan</p>
      </div>

      {/* Carousel — no container constraint, bleeds full width */}
      <div className="trusted__carousel" aria-hidden="true">
        <div className="trusted__track">
          {TRACK.map((b, i) => (
            <div key={`${b.name}-${i}`} className="trusted__item">
              <span className="trusted__icon">{b.icon}</span>
              <span className="trusted__name">{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}