export default function Footer() {
  return (
    <footer className="mt-auto bg-base-200 text-base-content">
      {/* top block: brand + socials */}
      <div className="footer footer-center p-6">
        <aside>
          <p className="font-semibold">🍲 Local Food Lovers Network</p>
          <p>Share honest bites, discover local flavor.</p>
          <div className="flex gap-3">
            <a aria-label="X" href="https://x.com" target="_blank" rel="noreferrer" className="btn btn-sm">𝕏</a>
            <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-sm">f</a>
            <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-sm">IG</a>
          </div>
        </aside>
      </div>

      <div className="border-t px-4">
        <div className="container mx-auto flex items-center justify-between gap-4 py-3 text-sm">
          <p className="whitespace-nowrap">
            © {new Date().getFullYear()} Local Food Lovers. Made with{" "}
            <span className="text-error">❤</span> by Towhiduzzaman Plabon
          </p>

          <div className="flex items-center gap-4 opacity-90">
            {/* Skrill */}
            <svg className="h-6" viewBox="0 0 120 40" aria-label="Skrill" role="img">
              <rect width="120" height="40" rx="6" fill="#6C2A86" />
              <text x="60" y="26" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="18" fill="#fff">Skrill</text>
            </svg>

            {/* Bitcoin */}
            <svg className="h-6" viewBox="0 0 40 40" aria-label="Bitcoin" role="img">
              <circle cx="20" cy="20" r="20" fill="#F7931A" />
              <path fill="#fff" d="M22.6 21.6c1.6-.4 2.6-1.5 2.6-3.2 0-2.4-1.8-3.8-4.6-3.8h-1V12h-2v2.5h-1.6V12h-2v2.5H12V16h1v8h-1v1.5h2V28h2v-2.5h1.7c.2 0 .3 0 .5-.1l1.2 2.6h2.3l-1.5-3.1zm-3.1-1.1h-2.8v-3.1h2.8c1.3 0 2 .6 2 1.6s-.7 1.5-2 1.5zm-.2-4.7h-2.6v-2.8h2.6c1.2 0 1.9.6 1.9 1.4s-.7 1.4-1.9 1.4z"/>
            </svg>

            {/* American Express */}
            <svg className="h-6" viewBox="0 0 120 40" aria-label="American Express" role="img">
              <rect width="120" height="40" rx="6" fill="#2E77BB" />
              <text x="60" y="17" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="10" fill="#fff">AMERICAN</text>
              <text x="60" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="14" fill="#fff">EXPRESS</text>
            </svg>

            {/* PayPal */}
            <svg className="h-6" viewBox="0 0 120 40" aria-label="PayPal" role="img">
              <rect width="120" height="40" rx="6" fill="#fff" />
              <text x="60" y="25" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="18" fill="#003087">Pay</text>
              <text x="87" y="25" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="18" fill="#009CDE">Pal</text>
              <rect width="120" height="40" rx="6" fill="none" stroke="#e5e7eb" />
            </svg>

            {/* Mastercard */}
            <svg className="h-6" viewBox="0 0 60 40" aria-label="Mastercard" role="img">
              <rect width="60" height="40" rx="6" fill="#fff" />
              <circle cx="26" cy="20" r="10" fill="#EB001B" />
              <circle cx="34" cy="20" r="10" fill="#F79E1B" />
              <rect width="60" height="40" rx="6" fill="none" stroke="#e5e7eb" />
            </svg>

            {/* Visa */}
            <svg className="h-6" viewBox="0 0 90 40" aria-label="Visa" role="img">
              <rect width="90" height="40" rx="6" fill="#fff" />
              <text x="45" y="26" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="20" fill="#1A1F71">VISA</text>
              <rect width="90" height="40" rx="6" fill="none" stroke="#e5e7eb" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
