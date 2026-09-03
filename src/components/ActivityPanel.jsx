const activities = [
  ["CURRENT", "Information Security Internship", "DC Infotech and Communication LTD"],
  ["LAB", "Web security testing", "Burp Suite · Host header · Redirect validation"],
  ["LAB", "Network discovery", "Nmap · Wireshark · Kali Linux"],
  ["BUILD", "Secure system design", "Remote access · Password manager · IoT"],
];
export default function ActivityPanel() { return <section className="activity-panel"><div><p className="section-label">LIVE LEARNING LOG</p><h3>Security work,<br /><span>in motion.</span></h3></div><div className="activity-list">{activities.map(([type, title, detail]) => <article key={title}><span>{type}</span><div><h4>{title}</h4><p>{detail}</p></div><i /></article>)}</div></section>; }
