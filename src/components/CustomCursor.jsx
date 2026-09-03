import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null), reticleRef = useRef(null), cornersRef = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current, reticle = reticleRef.current, corners = cornersRef.current;
    let x = -100, y = -100, smoothX = -100, smoothY = -100, frame = 0;
    const place = (element, px, py) => { element.style.left = `${px}px`; element.style.top = `${py}px`; };
    const move = event => {
      x = event.clientX; y = event.clientY; place(dot, x, y);
      const interactive = Boolean(event.target.closest("a, button, [role='button'], input, textarea"));
      document.body.classList.toggle("cursor-hover", interactive);
      reticle.classList.toggle("is-hovered", interactive); corners.classList.toggle("is-hovered", interactive);
    };
    const down = () => { dot.classList.add("is-clicked"); reticle.classList.add("is-clicked"); };
    const up = () => { dot.classList.remove("is-clicked"); reticle.classList.remove("is-clicked"); };
    const draw = () => { smoothX += (x - smoothX) * .18; smoothY += (y - smoothY) * .18; place(reticle, smoothX, smoothY); place(corners, smoothX, smoothY); frame = requestAnimationFrame(draw); };
    window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("pointerdown", down); window.addEventListener("pointerup", up); document.body.classList.add("has-cursor"); draw();
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); cancelAnimationFrame(frame); document.body.classList.remove("has-cursor", "cursor-hover"); };
  }, []);
  return <><div ref={dotRef} className="cursor-dot" /><div ref={reticleRef} className="cursor-reticle" /><div ref={cornersRef} className="cursor-corners"><span className="corner top-left" /><span className="corner top-right" /><span className="corner bottom-left" /><span className="corner bottom-right" /></div></>;
}
