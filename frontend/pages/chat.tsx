import { useState } from 'react';
export default function Chat() {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const ask = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/chat`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({query:q})
    });
    const json = await res.json();
    setA(json.answer);
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl mb-2">Fashion Assistant</h2>
      <textarea value={q} onChange={e=>setQ(e.target.value)} rows={3} className="w-full border"/>
      <button onClick={ask} className="btn mt-2">Ask</button>
      {a && <p className="mt-4 bg-gray-100 p-3 rounded">{a}</p>}
    </div>
  );
}
