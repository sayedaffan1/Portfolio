import { useEffect, useState } from "react";

export default function Navbar({ theme, onToggleTheme, performanceMode, onTogglePerformance }) {
  const [open, setOpen] = useState(false); const [active, setActive] = useState("home");
  const links = [["Home","home"],["About","about"],["Skills","skills"],["Experience","experience"],["Projects","projects"],["Contact","contact"]];
  useEffect(() => { const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -55%" }); links.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); }); return () => observer.disconnect(); }, []);
  return (
    <nav className="navbar">
      <a className="brand" href="#home">AF<span>_</span></a>
      <button className="mobile-toggle" onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
      <div className={`navlinks ${open ? "open" : ""}`}>
        {links.map(([name,id]) => <a className={active === id ? "active" : ""} key={id} href={`#${id}`} onClick={() => setOpen(false)}>{name}</a>)}
      </div>
      <div className="nav-tools"><button className="nav-icon" onClick={onTogglePerformance} aria-label="Toggle performance mode" aria-pressed={performanceMode}>{performanceMode ? "◌" : "◉"}</button><button className="nav-icon" onClick={onToggleTheme} aria-label="Toggle color theme">{theme === "light" ? "◐" : "☼"}</button><a href="#contact" className="nav-cta">CONTACT ↗</a></div>
    </nav>
  );
}
