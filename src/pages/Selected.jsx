import { useState, useEffect } from 'react';

function SelectedProject({ item }) {
  const images = (item.images || []).map(img => img.trim()).filter(Boolean);
  const [activeImage, setActiveImage] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="selected-item">
      <div className="selected-image-wrapper">
        <img src={images[activeImage]} alt={item.title} className="selected-image main-image" />
        
        {images.length > 1 && (
          <div className="thumbnails-container">
            {images.map((imgUrl, idx) => (
              <img 
                key={idx} 
                src={imgUrl} 
                alt={`${item.title} thumbnail ${idx}`} 
                className={`thumbnail ${idx === activeImage ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="selected-content">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default function Selected() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/selected')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) return <div className="page-container" style={{ marginTop: '50px', color: 'red' }}><h2>⚠️ 無法連線到後端伺服器！</h2><p>請確認伺服器已啟動: node server/index.js</p></div>;
  if (loading) return <div className="page-container" style={{ marginTop: '50px' }}>Loading...</div>;

  return (
    <div className="page-container selected-page">
      <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '80px', marginLeft: 0 }}>Selected</h1>
      
      <div className="selected-gallery">
        {data.map((item, index) => <SelectedProject key={index} item={item} />)}
        {data.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', marginTop: '100px' }}>目前沒有精選專案</div>
        )}
      </div>
    </div>
  );
}
