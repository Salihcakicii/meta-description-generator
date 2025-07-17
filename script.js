document.getElementById("generateBtn").addEventListener("click", function () {
  const content = document.getElementById("content").value.trim();
  const keywords = document.getElementById("keywords").value.trim().toLowerCase().split(",");
  const resultEl = document.getElementById("result");
  const charCountEl = document.getElementById("charCount");
  const keywordCoverageEl = document.getElementById("keywordCoverage");
  const keywordStatusEl = document.getElementById("keywordStatus");

  if (content.length === 0 || keywords.length === 0) {
    resultEl.textContent = "Lütfen içerik ve anahtar kelime girin.";
    return;
  }

  // Meta açıklama oluştur (kırpılmış)
  let meta = content.substring(0, 160);
  if (meta.length > 157) {
    meta = meta.substring(0, 157) + "...";
  }

  resultEl.textContent = meta;

  // Karakter sayısı
  charCountEl.textContent = meta.length;

  // Anahtar kelime yoğunluğu hesapla
  let count = 0;
  let totalKeywords = 0;

  keywords.forEach((kw) => {
    const trimmed = kw.trim();
    if (trimmed.length === 0) return;
    totalKeywords++;

    const regex = new RegExp(`\\b${trimmed}\\b`, "gi");
    const matches = meta.match(regex);
    if (matches) count += matches.length;
  });

  const keywordRatio = Math.round((count / totalKeywords) * 100);
  keywordCoverageEl.textContent = isNaN(keywordRatio) ? "0%" : `${keywordRatio}%`;

  // Renkli durum gösterimi
  if (keywordRatio >= 70) {
    keywordStatusEl.textContent = "Harika!";
    keywordStatusEl.className = "green";
  } else if (keywordRatio >= 40) {
    keywordStatusEl.textContent = "İyi ama geliştirilebilir.";
    keywordStatusEl.className = "yellow";
  } else {
    keywordStatusEl.textContent = "Anahtar kelimeler eksik.";
    keywordStatusEl.className = "red";
  }
});
