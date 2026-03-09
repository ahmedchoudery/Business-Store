import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import './TestimonialsSection.css';

const TESTIMONIALS = [
  {
    name: 'Falak Halls & Events',
    role: 'Owner, Event Venue',
    photo: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    quote:
      'Ahmed turned our old brochure site into a modern booking machine. We now get consistent WhatsApp inquiries every week.',
  },
  {
    name: 'Star Coaching Academy',
    role: 'Director, Coaching Center',
    photo: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    quote:
      'The new website looks premium and loads fast even on mobile data. Parents keep telling us how easy it is to find information.',
  },
  {
    name: 'Premier Real Estate',
    role: 'Real Estate Agent',
    photo: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    quote:
      'From layout to copy, everything is focused on getting leads. My WhatsApp is now my main sales channel thanks to this website.',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TestimonialsSection() {
  const [[index, direction], setIndex] = useState([0, 0]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(([current]) => {
        const next = (current + 1) % TESTIMONIALS.length;
        return [next, 1];
      });
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">💬 Client Testimonials</span>
          <h2 className="section-title">
            What <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle">
            Real feedback from business owners who needed a website that actually brings them customers.
          </p>
        </motion.div>

        <div className="testimonials__carousel">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.name}
              className="card testimonials__card"
              variants={slideVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="testimonials__profile">
                <img src={active.photo} alt={active.name} className="testimonials__avatar" />
                <div>
                  <div className="testimonials__name">{active.name}</div>
                  <div className="testimonials__role">{active.role}</div>
                </div>
              </div>

              <p className="testimonials__quote">“{active.quote}”</p>

              <div className="testimonials__footer">
                <div className="testimonials__stars" aria-label={`${active.rating} star rating`}>
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <FiStar key={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonials__dots">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                className={`testimonials__dot ${i === index ? 'testimonials__dot--active' : ''}`}
                onClick={() => setIndex([i, i > index ? 1 : -1])}
                aria-label={`Show testimonial from ${t.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

