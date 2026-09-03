import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const checks = ["CHECKING SECURE CHANNEL", "LOADING PORTFOLIO MODULES", "ACCESS READY"];
export default function AccessGate() {
  const [visible, setVisible] = useState(true), [entering, setEntering] = useState(false), [step, setStep] = useState(0);
  useEffect(() => { const timers = checks.map((_, index) => setTimeout(() => setStep(index + 1), 440 * (index + 1))); return () => timers.forEach(clearTimeout); }, []);
  const ready = step >= checks.length;
  const enter = () => { if (!ready) return; setEntering(true); window.setTimeout(() => setVisible(false), 850); };
  return <AnimatePresence>{visible && <motion.section className={`access-gate ${entering ? "is-entering" : ""}`} initial={{ opacity:1 }} exit={{ opacity:0, transition:{ duration:.42 } }} aria-label="Portfolio access gateway"><div className="gate-grid" /><motion.div className="gate-content" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}><p className="gate-status"><i /> IDENTITY VERIFICATION</p><div className={`gate-scanner ${ready ? "ready" : ""}`}><div className="gate-mark">AF<span>_</span></div></div><div className="gate-checks" aria-live="polite">{checks.map((check, index) => <p className={step > index ? "complete" : step === index ? "active" : ""} key={check}><b>{step > index ? "✓" : step === index ? "•" : "○"}</b>{check}</p>)}</div><motion.button className="access-button" onClick={enter} disabled={!ready || entering} initial={{ opacity:0, y:8 }} animate={{ opacity:ready ? 1 : 0, y:ready ? 0 : 8 }} transition={{ duration:.3 }}>{entering ? <span>AUTHENTICATING...</span> : <span>ENTER PORTFOLIO</span>}<b>↗</b></motion.button><p className="gate-foot">ENCRYPTED CONNECTION · 2026</p></motion.div><div className="gate-scan" /></motion.section>}</AnimatePresence>;
}
