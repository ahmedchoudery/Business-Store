import './TrustedSection.css';

const BRANDS = ['Falak Halls', 'Star Coaching', 'Premier Estate', 'City Bakery'];

export default function TrustedSection() {
  return (
    <section id="trusted" className="section trusted">
      <div className="container trusted__inner">
        <p className="trusted__title">Trusted by local businesses and founders</p>
        <div className="trusted__logos">
          {BRANDS.map((name) => (
            <div key={name} className="trusted__logo">
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

