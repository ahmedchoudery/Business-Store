import { BsWhatsapp } from 'react-icons/bs';
import './WhatsAppFAB.css';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '923174307043';
const MSG = encodeURIComponent("Hi Ahmed! I'm interested in getting a website for my business. Can we discuss?");

export default function WhatsAppFAB() {
    return (
        <a
            href={`https://wa.me/${WHATSAPP}?text=${MSG}`}
            target="_blank" rel="noopener noreferrer"
            className="whatsapp-fab"
            aria-label="Chat on WhatsApp"
        >
            <BsWhatsapp size={26} />
            <span className="whatsapp-fab__pulse" />
        </a>
    );
}
