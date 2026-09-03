import { useEffect, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { getSession } from "../utils/auth";

export default function SupportChatbot({ role }) {
  const session = getSession();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const loadMessages = () => {
    if (!session?.email) return;
    fetch(`http://localhost:5000/api/support?email=${encodeURIComponent(session.email)}`)
      .then((response) => response.json())
      .then((data) => { if (data.success) setMessages(data.messages); })
      .catch(() => setError("Unable to load chat."));
  };

  useEffect(() => {
    if (!session?.email) return;
    fetch(`http://localhost:5000/api/support?email=${encodeURIComponent(session.email)}`)
      .then((response) => response.json())
      .then((data) => { if (data.success) setMessages(data.messages); })
      .catch(() => setError("Unable to load chat."));
  }, [session?.email]);

  const submit = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;
    const response = await fetch("http://localhost:5000/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: session?.id, userName: session?.fullName, userEmail: session?.email, userRole: role, question }) });
    const data = await response.json();
    if (!response.ok) { setError(data.message || "Unable to send question."); return; }
    setQuestion(""); setError(""); loadMessages();
  };

  return <div className="fixed bottom-5 right-5 z-50"><button type="button" onClick={() => setOpen((value) => !value)} className="flex h-12 items-center gap-2 rounded-full bg-brand-navy px-5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/20 transition hover:bg-brand-blue" aria-label="Open support chat">{open ? <X size={18} /> : <MessageCircle size={18} />}<span>{open ? "Close" : "Ask EstateHub"}</span></button>{open && <section className="absolute bottom-16 right-0 flex w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-2xl"><div className="bg-brand-navy px-5 py-4 text-white"><p className="text-sm font-semibold">EstateHub support</p><p className="mt-1 text-xs text-brand-mist/70">Ask a question and our team will reply here.</p></div><div className="max-h-72 space-y-3 overflow-y-auto p-4">{messages.length === 0 && <p className="text-center text-xs text-brand-navy/50">No questions yet. How can we help?</p>}{messages.map((message) => <div key={message._id} className="space-y-2"><div className="rounded-lg bg-brand-mist px-3 py-2 text-sm text-brand-navy"><span className="mb-1 block text-[10px] font-semibold uppercase text-brand-blue">You</span>{message.question}</div>{message.reply && <div className="rounded-lg bg-brand-blue px-3 py-2 text-sm text-white"><span className="mb-1 block text-[10px] font-semibold uppercase text-brand-sky">EstateHub</span>{message.reply}</div>}</div>)}</div>{error && <p className="px-4 text-xs text-red-600">{error}</p>}<form onSubmit={submit} className="flex gap-2 border-t border-brand-navy/10 p-3"><input required value={question} onChange={(event) => setQuestion(event.target.value)} className="field-input h-10" placeholder="Type your question..." /><button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-blue text-white" aria-label="Send question"><Send size={16} /></button></form></section>}</div>;
}
