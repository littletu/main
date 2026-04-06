import { useState, useEffect } from 'react';

export default function About() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(json => setData(json.about))
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
          <div>Our Story</div>
          <div>Services</div>
        </aside>
        
        <main className="two-col-content">
          <section style={{ marginBottom: '80px' }}>
            <h2>
              {data.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br/></span>
              ))}
            </h2>
            <p style={{ whiteSpace: 'pre-line' }}>{data.description}</p>
          </section>

          <section className="services-list">
            <h2 style={{ fontSize: '1.8rem' }}>{data.servicesTitle}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{data.servicesSubtitle}</p>
            
            {data.services.map((service, idx) => (
              <div key={idx}>
                <h3>{service.title}</h3>
                <ul>
                  {service.items.map((item, idy) => <li key={idy}>{item}</li>)}
                </ul>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
