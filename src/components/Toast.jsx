import { useEffect, useState } from "react";
export default function Toast() { const [message, setMessage] = useState(""); useEffect(() => { const show = event => { setMessage(event.detail); const id = setTimeout(() => setMessage(""), 2400); return () => clearTimeout(id); }; addEventListener("portfolio-toast", show); return () => removeEventListener("portfolio-toast", show); }, []); return <div className={`toast ${message ? "show" : ""}`} role="status">✓ {message}</div>; }
export const notify = text => dispatchEvent(new CustomEvent("portfolio-toast", { detail:text }));
