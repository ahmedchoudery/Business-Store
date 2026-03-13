import './TrustedSection.css';

const brands = [
  'FALAK HALLS', 'NOOR BOUTIQUE', 'CITYMED CLINIC',
  'SPICE ROUTE', 'AL-NOOR REALTY', 'LAHORE EATS',
];

export default function TrustedSection() {
  return (
    <section id="trusted" className="trusted">
      <div className="container">
        <p className="trusted__label">Trusted by businesses across Pakistan</p>
        <div className="trusted__row">
          {brands.map(b => <span key={b} className="trusted__brand">{b}</span>)}
        </div>
      </div>
    </section>
  );
}