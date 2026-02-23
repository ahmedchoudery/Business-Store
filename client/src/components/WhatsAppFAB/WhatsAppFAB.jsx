import { BsWhatsapp } from 'react-icons/bs';
import './WhatsAppFAB.css';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043';
const MESSAGE = encodeURIComponent(
    "Hi Ahmed! I'm interested in getting a website for my business. Can we discuss?"
);

export default function WhatsAppFAB() {
    return (
        <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-fab"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
        >
            <BsWhatsapp size={28} />
            <span className="whatsapp-fab__pulse" />
        </a>
    );
}
