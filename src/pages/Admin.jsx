import { useState, useEffect } from 'react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('projects');
  
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [settings, setSettings] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/selected').then(r => r.json()),
      fetch('/api/settings').then(r => r.json())
    ]).then(([projData, selData, setData]) => {
      setProjects(projData);
      setSelectedProjects(Array.isArray(selData) ? selData : []);
      setSettings(setData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setError(true);
      setLoading(false);
    });
  }, []);

  const handleSaveProjects = () => {
    setSaving(true);
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projects)
    })
    .then(res => res.json())
    .then(() => {
      alert('專案儲存成功！');
      setSaving(false);
    });
  };

  const handleSaveSelected = () => {
    setSaving(true);
    fetch('/api/selected', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedProjects)
    })
    .then(res => res.json())
    .then(() => {
      alert('精選圖文專案儲存成功！');
      setSaving(false);
    });
  };

  const handleSaveSettings = () => {
    setSaving(true);
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    })
    .then(res => res.json())
    .then(() => {
      alert('網站文字儲存成功！');
      setSaving(false);
    });
  };

  const handleAddProject = () => {
    setProjects([{ name: '', category: '', domain: '', customLogo: '' }, ...projects]);
  };

  const handleAddSelected = () => {
    setSelectedProjects([{ title: '', description: '', images: [] }, ...selectedProjects]);
  };

  const handleDeleteProject = (index) => {
    if (window.confirm('確定刪除？')) setProjects(projects.filter((_, i) => i !== index));
  };

  const handleDeleteSelected = (index) => {
    if (window.confirm('確定刪除這個精選專案？')) setSelectedProjects(selectedProjects.filter((_, i) => i !== index));
  };

  const handleChangeProject = (index, field, value) => {
    const newP = [...projects];
    newP[index] = { ...newP[index], [field]: value };
    setProjects(newP);
  };

  const handleChangeSelected = (index, field, value) => {
    const newS = [...selectedProjects];
    newS[index] = { ...newS[index], [field]: value };
    setSelectedProjects(newS);
  };

  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  if (loading) return <div className="page-container" style={{ marginTop: '50px' }}>Loading admin panel... 讀取中...</div>;
  if (error) return <div className="page-container" style={{ marginTop: '50px', color: 'red' }}><h2>⚠️ 無法連線到後端伺服器！</h2><p>請確認伺服器已啟動: node server/index.js</p></div>;

  if (!isAuthenticated) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <h2 style={{ marginBottom: '20px' }}>請輸入密碼以進入後台</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { 
              if (e.key === 'Enter') {
                if (password === 'miaoken123') setIsAuthenticated(true); 
                else alert('密碼錯誤！'); 
              }
            }}
            style={{ padding: '10px', fontSize: '1.2rem', border: '1px solid #ccc', borderRadius: '4px' }}
            autoFocus
          />
          <button 
            onClick={() => { if (password === 'miaoken123') setIsAuthenticated(true); else alert('密碼錯誤！'); }}
            style={{ padding: '10px 20px', background: '#2a2a2a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            登入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '1000px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h1 style={{ fontSize: '2rem', color: '#2a2a2a' }}>管理後台 (Admin Panel)</h1>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setTab('projects')} style={{ padding: '10px 20px', background: tab === 'projects' ? '#2a2a2a' : '#ddd', color: tab === 'projects' ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}>專案清單管理</button>
        <button onClick={() => setTab('selected')} style={{ padding: '10px 20px', background: tab === 'selected' ? '#2a2a2a' : '#ddd', color: tab === 'selected' ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}>Selected (精選圖文)</button>
        <button onClick={() => setTab('about')} style={{ padding: '10px 20px', background: tab === 'about' ? '#2a2a2a' : '#ddd', color: tab === 'about' ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}>About Us (關於我們)</button>
        <button onClick={() => setTab('contact')} style={{ padding: '10px 20px', background: tab === 'contact' ? '#2a2a2a' : '#ddd', color: tab === 'contact' ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}>Contact (聯絡資訊)</button>
        <button onClick={() => setTab('home')} style={{ padding: '10px 20px', background: tab === 'home' ? '#2a2a2a' : '#ddd', color: tab === 'home' ? '#fff' : '#000', border: 'none', cursor: 'pointer' }}>Home (首頁語錄)</button>
      </div>

      {tab === 'projects' && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <div style={{ marginBottom: '15px' }}>
            <button onClick={handleAddProject} style={{ padding: '10px 20px', marginRight: '10px', background: '#ccc', border: 'none', cursor: 'pointer' }}>+ 新增文字專案</button>
            <button onClick={handleSaveProjects} disabled={saving} style={{ padding: '10px 20px', background: '#2a2a2a', color: '#fff', border: 'none', cursor: 'pointer' }}>{saving ? '儲存中...' : '儲存全部專案'}</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ background: '#f5f5f5', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px' }}>專案名稱 (Name)</th>
                <th style={{ padding: '12px' }}>分類 (Category)</th>
                <th style={{ padding: '12px' }}>網域 Domain (For Logo)</th>
                <th style={{ padding: '12px' }}>自訂圖片網址</th>
                <th style={{ padding: '12px' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px' }}><input type="text" value={proj.name} onChange={(e) => handleChangeProject(index, 'name', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}/></td>
                  <td style={{ padding: '8px' }}><input type="text" value={proj.category} onChange={(e) => handleChangeProject(index, 'category', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}/></td>
                  <td style={{ padding: '8px' }}><input type="text" value={proj.domain || ''} onChange={(e) => handleChangeProject(index, 'domain', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}/></td>
                  <td style={{ padding: '8px' }}><input type="text" value={proj.customLogo || ''} onChange={(e) => handleChangeProject(index, 'customLogo', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}/></td>
                  <td style={{ padding: '8px', textAlign: 'center' }}><button onClick={() => handleDeleteProject(index)} style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>刪除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'selected' && (
        <div style={{ animation: 'fadeIn 0.3s', maxWidth: '800px' }}>
          <div style={{ marginBottom: '15px' }}>
            <button onClick={handleAddSelected} style={{ padding: '10px 20px', marginRight: '10px', background: '#ccc', border: 'none', cursor: 'pointer' }}>+ 新增精選專案 (照片)</button>
            <button onClick={handleSaveSelected} disabled={saving} style={{ padding: '10px 20px', background: '#2a2a2a', color: '#fff', border: 'none', cursor: 'pointer' }}>{saving ? '儲存中...' : '儲存精選圖文清單'}</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {selectedProjects.map((item, index) => (
              <div key={index} style={{ background: '#fff', padding: '20px', border: '1px solid #eee', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', position: 'relative' }}>
                <button onClick={() => handleDeleteSelected(index)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '5px 10px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>刪除此專案</button>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>專案名稱 (Title):</label>
                  <input type="text" value={item.title} onChange={(e) => handleChangeSelected(index, 'title', e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '10px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>介紹內文 (Description):</label>
                  <textarea rows="3" value={item.description} onChange={(e) => handleChangeSelected(index, 'description', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', lineHeight: '1.5' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>大面積照片連結 (Images URLs) - 請換行輸入多張網址:</label>
                  <textarea 
                    rows="3"
                    value={(item.images || []).join('\n')} 
                    onChange={(e) => {
                      const val = e.target.value.split('\n');
                      handleChangeSelected(index, 'images', val);
                    }} 
                    placeholder="https://..." 
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', lineHeight: '1.5' }} 
                  />
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {(item.images || []).map((img, i) => img.trim() ? (
                      <img key={i} src={img.trim()} alt="Preview" style={{ height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : null)}
                  </div>
                </div>
              </div>
            ))}
            {selectedProjects.length === 0 && <p>目前沒有任何精選圖文專案。</p>}
          </div>
        </div>
      )}

      {tab === 'home' && (
        <div style={{ animation: 'fadeIn 0.3s', maxWidth: '600px' }}>
          <div style={{ marginBottom: '15px' }}>
            <button onClick={handleSaveSettings} disabled={saving} style={{ padding: '10px 20px', background: '#2a2a2a', color: '#fff', border: 'none', cursor: 'pointer' }}>{saving ? '儲存中...' : '儲存網站設定'}</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>首頁輪播語錄 (每行一句):</label>
              <textarea 
                rows="12" 
                value={(settings?.home?.quotes || []).join('\n')} 
                onChange={(e) => handleSettingChange('home', 'quotes', e.target.value.split('\n'))} 
                style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', lineHeight: '1.5' }} 
              />
            </div>
          </div>
        </div>
      )}

      {(tab === 'about' || tab === 'contact') && (
        <div style={{ animation: 'fadeIn 0.3s', maxWidth: '600px' }}>
          <div style={{ marginBottom: '15px' }}>
            <button onClick={handleSaveSettings} disabled={saving} style={{ padding: '10px 20px', background: '#2a2a2a', color: '#fff', border: 'none', cursor: 'pointer' }}>{saving ? '儲存中...' : '儲存網站設定'}</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>主標題 (Title):</label>
              <textarea rows="2" value={settings[tab].title} onChange={(e) => handleSettingChange(tab, 'title', e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>介紹內文 (Description):</label>
              <textarea rows="8" value={settings[tab].description} onChange={(e) => handleSettingChange(tab, 'description', e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', lineHeight: '1.5' }} />
            </div>
            
            {tab === 'about' && (
              <>
                <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '20px 0' }}/>
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>油漆與塗裝服務清單 (Services)</h3>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>清單區塊大標題 (Services Title):</label>
                  <input type="text" value={settings.about.servicesTitle || ''} onChange={(e) => handleSettingChange('about', 'servicesTitle', e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc' }} />
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>副標題說明文 (Services Subtitle):</label>
                  <textarea rows="2" value={settings.about.servicesSubtitle || ''} onChange={(e) => handleSettingChange('about', 'servicesSubtitle', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', lineHeight: '1.5' }} />
                </div>
                {settings.about.services.map((service, sIndex) => (
                  <div key={sIndex} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #eee', background: '#fafafa', borderRadius: '4px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>服務類別名稱:</label>
                    <input type="text" value={service.title} onChange={(e) => { const newServices = [...settings.about.services]; newServices[sIndex] = { ...newServices[sIndex], title: e.target.value }; handleSettingChange('about', 'services', newServices); }} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc' }} />
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>服務細項 (每行代表一項，以換行分隔):</label>
                    <textarea rows="5" value={service.items.join('\n')} onChange={(e) => { const newServices = [...settings.about.services]; newServices[sIndex] = { ...newServices[sIndex], items: e.target.value.split('\n') }; handleSettingChange('about', 'services', newServices); }} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', lineHeight: '1.5' }} />
                  </div>
                ))}
              </>
            )}

            {tab === 'contact' && (
              <>
                <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '10px 0' }}/>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>聯絡地址 (Address):</label>
                  <input type="text" value={settings.contact.address} onChange={(e) => handleSettingChange('contact', 'address', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>電子郵件 (Email):</label>
                  <input type="text" value={settings.contact.email} onChange={(e) => handleSettingChange('contact', 'email', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>聯絡電話 (Phone):</label>
                  <input type="text" value={settings.contact.phone} onChange={(e) => handleSettingChange('contact', 'phone', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Facebook 連結:</label>
                  <input type="text" value={settings.contact.facebook} onChange={(e) => handleSettingChange('contact', 'facebook', e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc' }} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
