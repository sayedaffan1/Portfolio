import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null), reticleRef = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current, reticle = reticleRef.current;
    let x = -100, y = -100, smoothX = -100, smoothY = -100, frame = 0;
    const place = (element, px, py) => { element.style.left = `${px}px`; element.style.top = `${py}px`; };
    const move = event => { x = event.clientX; y = event.clientY; place(dot, x, y); const interactive = Boolean(event.target.closest("a,button,[role='button'],input,textarea")); document.body.classList.toggle("cursor-hover", interactive); };
    const down = () => reticle.classList.add("is-clicked");
    const up = () => reticle.classList.remove("is-clicked");
    const draw = () => { smoothX += (x - smoothX) * .18; smoothY += (y - smoothY) * .18; place(reticle, smoothX, smoothY); frame = requestAnimationFrame(draw); };
    addEventListener("pointermove", move, { passive:true }); addEventListener("pointerdown", down); addEventListener("pointerup", up); document.body.classList.add("has-cursor"); draw();
    return () => { removeEventListener("pointermove", move); removeEventListener("pointerdown", down); removeEventListener("pointerup", up); cancelAnimationFrame(frame); document.body.classList.remove("has-cursor", "cursor-hover"); };
  }, []);
  return <><i ref={dotRef} className="cursor-dot" /><i ref={reticleRef} className="cursor-reticle"><b /><b /><b /><b /></i></>;
}
