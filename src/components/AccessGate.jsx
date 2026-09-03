import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playAccessSound, startAmbient } from "./soundEngine";

export default function AccessGate() {
  const [visible, setVisible] = useState(true);
  const [entering, setEntering] = useState(false);
  const enter = () => { startAmbient(); playAccessSound(); setEntering(true); window.setTimeout(() => setVisible(false), 850); };
  return <AnimatePresence>{visible && <motion.section className={`access-gate ${entering ? "is-entering" : ""}`} initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .42 } }} aria-label="Portfolio access gateway"><div className="gate-grid" /><motion.div className="gate-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><p className="gate-status"><i /> SYSTEM SECURE · ACCESS READY</p><div className="gate-mark">AF<span>_</span></div><p className="gate-copy">AFFAN SAYED / CYBERSECURITY PORTFOLIO</p><button className="access-button" onClick={enter} disabled={entering}><span>{entering ? "AUTHENTICATING..." : "ENTER PORTFOLIO"}</span><b>↗</b></button><p className="gate-foot">ENCRYPTED CONNECTION · 2026</p></motion.div><div className="gate-scan" /></motion.section>}</AnimatePresence>;
}
