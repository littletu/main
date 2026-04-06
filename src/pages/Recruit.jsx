export default function Recruit() {
  return (
    <div className="page-container">
      <div className="two-col-layout">
        <aside className="two-col-sidebar">
          <div>Career</div>
          <div style={{ marginTop: '20px', color: '#999' }}>招募學徒</div>
        </aside>
        
        <main className="two-col-content">
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
              高標準油漆學徒招募
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              商空、辦公室、飯店、銀行、豪宅，從基礎到高端施工，全程跟師傅學真正技能。
            </p>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: 'normal' }}>公司理念與使命</h3>
            <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>「培養高標準油漆職人，掌握現場技術與細節品質」</p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              AI 不能取代職人的現場判斷與技術，我們專注打造職人品牌。透明升級制度、高端案場實戰、師傅現場指導，長期職涯規劃一目了然。
            </p>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: 'normal' }}>你將做什麼？</h3>
            <ul style={{ color: 'var(--text-muted)', lineHeight: '2' }}>
              <li>跟隨師傅學習各類底材施工（石膏板、木作、金屬、天花）</li>
              <li>批土、打磨、遮蔽、防護等基礎流程</li>
              <li>顏色一致性、光澤控制、收邊細節</li>
              <li>商空、辦公室、飯店、銀行、豪宅施工標準</li>
              <li>參與現場品質檢查與業主驗收流程</li>
            </ul>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: 'normal' }}>技能與成長路線</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '10px' }}>基礎技能 (0–3 個月)</strong>
                <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  <li>現場基礎學習</li>
                  <li>批土、打磨、遮蔽、防護</li>
                  <li>施工前材料與底材判斷</li>
                </ul>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '10px' }}>進階技能 (3–12 個月)</strong>
                <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  <li>跟隨師傅實作</li>
                  <li>顏色一致性、光澤控制、收邊</li>
                  <li>小區塊獨立施工</li>
                </ul>
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: '10px' }}>高階技能 (一年以上)</strong>
                <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  <li>獨立完成案場、薪資調整、升級高端技師</li>
                  <li>配合設計師與監工驗收</li>
                  <li>高端案場施工標準掌握</li>
                </ul>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: 'normal' }}>我們希望你</h3>
            <ul style={{ color: 'var(--text-muted)', lineHeight: '2', marginBottom: '20px' }}>
              <li>細心、專注、願意學</li>
              <li>願意接受師傅指導、從基礎開始</li>
              <li>有耐心、想累積技術，長期成為高端油漆職人</li>
            </ul>
            <strong style={{ display: 'block', marginBottom: '10px' }}>加分條件：</strong>
            <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              <li>有室內施工經驗</li>
              <li>熟悉不同底材施工</li>
              <li>對顏色、光澤、收邊敏感</li>
            </ul>
          </section>

          <section style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: 'normal' }}>福利與保障</h3>
            <ul style={{ color: 'var(--text-muted)', lineHeight: '2' }}>
              <li>高端案場實戰：豪宅、飯店、銀行、商空</li>
              <li>清楚升級制度與薪資調整</li>
              <li>安全施工與標準流程保障</li>
              <li>師傅現場指導，快速累積技能</li>
            </ul>
          </section>

          <section style={{ marginBottom: '80px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', fontWeight: 'normal' }}>常見問題</h3>
            <dl style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              <dt style={{ color: '#000', marginTop: '15px' }}>Q1：完全沒經驗可以嗎？</dt>
              <dd style={{ margin: '5px 0 15px 0' }}>可以，從基礎開始學習。</dd>
              <dt style={{ color: '#000' }}>Q2：會很辛苦嗎？</dt>
              <dd style={{ margin: '5px 0 15px 0' }}>有體力需求，但安全與流程有保障。</dd>
              <dt style={{ color: '#000' }}>Q3：未來發展如何？</dt>
              <dd style={{ margin: '5px 0 15px 0' }}>高端油漆市場穩定，技術越成熟越值錢。</dd>
            </dl>
          </section>

          <a 
            href="/contact" 
            style={{ 
              display: 'inline-block', 
              padding: '12px 30px', 
              border: '1px solid var(--text-main)', 
              color: 'var(--text-main)', 
              textDecoration: 'none', 
              letterSpacing: '2px',
              transition: 'background 0.3s, color 0.3s'
            }}
            onMouseOver={(e) => { e.target.style.background = 'var(--text-main)'; e.target.style.color = '#fff'; }}
            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-main)'; }}
          >
            立即聯絡我們
          </a>

        </main>
      </div>
    </div>
  );
}
