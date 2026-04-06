import { useState, useEffect } from 'react';

const fallbackQuotes = [
  "將細節做到極致，就是藝術。",
  "每一道漆，都是時間的沉澱。",
  "用雙手，為空間注入靈魂。",
  "不急不躁，方能成就純粹的工藝。",
  "真實的質感，來自日復一日的堅持。",
  "用心的塗裝，是建築最美的外衣。",
  "將簡單的動作做到完美，即是匠人。",
  "色彩與紋理中，藏著我們對生活的美學。",
  "每一次打磨，都是為了遇見更好的作品。",
  "專注當下，讓工藝自己說話。"
];

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(-1);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data.home && data.home.quotes) {
          setQuotes(data.home.quotes);
        } else {
          setQuotes(fallbackQuotes);
        }
      })
      .catch(err => {
        console.error(err);
        setQuotes(fallbackQuotes);
      });
  }, []);

  const handleClick = () => {
    if (quotes.length > 0) {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }
  };

  return (
    <div className="home-container">
      <div className="logo-wrapper" onClick={handleClick}>
        <img 
          src="/artisan-logo.png" 
          alt="Artisan Logo" 
          className="home-logo" 
        />
        {quoteIndex >= 0 && quotes.length > 0 && (
          <div className="logo-quote" key={quoteIndex}>
            {quotes[quoteIndex]}
          </div>
        )}
      </div>
    </div>
  );
}
