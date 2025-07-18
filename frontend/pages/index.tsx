import { useState } from 'react';
export default function Home() {
  const [img, setImg] = useState<File|null>(null);
  const [items, setItems] = useState<any[]>([]);
  const handleUpload = async () => {
    const fd = new FormData();
    fd.append('file', img!);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/detect`, {method:'POST', body: fd});
    const json = await res.json();
    setItems(json.items);
  };
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">AI Fashion Finder</h1>
      <input type="file" accept="image/*" onChange={e=>setImg(e.target.files![0])}/>
      <button onClick={handleUpload} className="btn ml-2">Upload</button>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {items.map(i=>(
          <div key={i.label} className="border p-2 rounded">{i.label}</div>
        ))}
      </div>
    </main>
  );
}
