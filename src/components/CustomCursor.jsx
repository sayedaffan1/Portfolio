import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const dot = document.querySelector(".cursor-dot");
    const reticle = document.querySelector(".cursor-reticle");
    const corners = document.querySelector(".cursor-corners");

    let mouseX = -100, mouseY = -100;
    let reticleX = -100, reticleY = -100;
    let frameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onMouseOver = (e) => {
      const isInteractive = Boolean(e.target.closest("a, button, [role='button'], .project-card, input, textarea"));
      setHovered(isInteractive);
      document.body.classList.toggle("cursor-hover", isInteractive);
    };

    const render = () => {
      // Smooth lerp physics
      reticleX += (mouseX - reticleX) * 0.16;
      reticleY += (mouseY - reticleY) * 0.16;

      if (reticle) {
        reticle.style.transform = `translate3d(${reticleX}px, ${reticleY}px, 0)`;
      }
      if (corners) {
        corners.style.transform = `translate3d(${reticleX}px, ${reticleY}px, 0)`;
      }

      frameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);

    document.body.classList.add("has-cursor");
    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(frameId);
      document.body.classList.remove("has-cursor");
    };
  }, [hovered]);

  return (
    <>
      {/* Central Laser Dot */}
      <div className={`cursor-dot ${clicked ? "is-clicked" : ""} ${hovered ? "is-hovered" : ""}`} />

      {/* Outer Reticle Ring */}
      <div className={`cursor-reticle ${clicked ? "is-clicked" : ""} ${hovered ? "is-hovered" : ""}`} />

      {/* Cyber Target Brackets */}
      <div className={`cursor-corners ${hovered ? "is-hovered" : ""}`}>
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </div>
    </>
  );
}
