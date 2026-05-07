import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-logo">É.S.B.A.</div>
          <div className="footer-brand-sub">Beaux-Arts · Alger</div>
          <p
            className="footer-brand-desc"
            style={{
              fontSize: "0.78rem",
              lineHeight: 1.8,
              marginTop: "1rem",
              maxWidth: 280
            }}
          >
            Institution nationale d&apos;enseignement supérieur artistique fondée en 1962.
          </p>
          <div className="footer-contact" style={{ marginTop: "1.4rem" }}>
            <div className="footer-contact-item">
              Parc Ziryab, Alger centre — Algérie
            </div>
            <div className="footer-contact-item">023 47 03 27</div>
            <div className="footer-contact-item">
              <a href="mailto:contact@esba-alger.dz">contact@esba-alger.dz</a>
            </div>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Formation</div>
          <ul className="footer-links">
            <li><Link href="/programs">Arts Plastiques</Link></li>
            <li><Link href="/programs">Design Graphique</Link></li>
            <li><Link href="/programs">Sculpture</Link></li>
            <li><Link href="/programs">Photographie</Link></li>
            <li><Link href="/programs">Arts Numériques</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">L&apos;École</div>
          <ul className="footer-links">
            <li><Link href="/about">À propos</Link></li>
            <li><Link href="/student">Vie étudiante</Link></li>
            <li><Link href="/library">Bibliothèque</Link></li>
            <li><Link href="/gallery">Galerie</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Suivre</div>
          <ul className="footer-links">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">YouTube</a></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">
          © 2025 École Supérieure des Beaux-Arts d&apos;Alger
        </div>
        <div className="footer-legal">
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}
