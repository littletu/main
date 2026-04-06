import { useState, useEffect } from 'react';

export default function Contact() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3003/api/settings')
      .then(res => res.json())
      .then(json => setData(json.contact))
      .catch(err => {
        console.error(err);
        setError(true);
      });
  }, []);

  if (error) return <div className="page-container" style={{ marginTop: '50px', color: 'red' }}><h2>⚠️ 無法連線到後端伺服器！</h2><p>請確認伺服器已啟動: node server/index.js</p></div>;
  if (!data) return <div className="page-container" style={{ marginTop: '50px' }}>Loading... 讀取中...</div>;

  return (
    <div className="page-container">
      <div className="two-col-layout">
        <aside className="two-col-sidebar">
          <div>Contact</div>
        </aside>
        
        <main className="two-col-content">
          <section>
            <h2>{data.title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{data.description}</p>
            
            <div style={{ marginTop: '40px', lineHeight: '2' }}>
              <strong>{data.address}</strong><br/>
              <a href={`mailto:${data.email}`} style={{ color: 'inherit' }}>{data.email}</a><br/>
              Tel: {data.phone}<br/>
              <a href={data.facebook} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>Facebook</a>
            </div>
            <div style={{ marginTop: '60px', opacity: 0.5, fontSize: '0.9rem' }}>
              © 2026 by MIAOKEN LTD.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
