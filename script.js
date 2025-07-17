const descriptionInput = document.getElementById("descriptionInput");
const charCount = document.getElementById("charCount");
const pixelWidth = document.getElementById("pixelWidth");
const feedback = document.getElementById("feedback");
const keywordInput = document.getElementById("keywordInput");
const keywordCheck = document.getElementById("keywordCheck");
const languageSelect = document.getElementById("languageSelect");

const pixelPerChar = 7; // Meta description piksel ortalaması

descriptionInput.addEventListener("input", updateAnalysis);
keywordInput.addEventListener("input", updateAnalysis);

function updateAnalysis() {
  const text = descriptionInput.value.trim();
  const keyword = keywordInput.value.trim().toLowerCase();
  const lang = languageSelect.value;

  const length = text.length;
  const pixels = Math.round(length * pixelPerChar);

  charCount.textContent = `${length} karakter`;
  pixelWidth.textContent = `${pixels} piksel`;

  if (!text) {
    feedback.textContent = "";
    keywordCheck.textContent = "";
    return;
  }

  // Google meta description pixel sınırları: ideal 920-960 arası, max 1000 piksel civarı
  if (pixels < 600) {
    feedback.textContent = lang === "tr" ? "⚠️ Meta açıklama çok kısa." : "⚠️ Meta description is too short.";
    feedback.style.color = "orange";
  } else if (pixels <= 960) {
    feedback.textContent = lang === "tr" ? "✅ Meta açıklama ideal uzunlukta." : "✅ Meta description length is ideal.";
    feedback.style.color = "green";
  } else if (pixels <= 1000) {
    feedback.textContent = lang === "tr" ? "ℹ️ Meta açıklama biraz uzun ama kabul edilebilir." : "ℹ️ Meta description is a bit long but acceptable.";
    feedback.style.color = "#007bff";
  } else {
    feedback.textContent = lang === "tr" ? "❌ Meta açıklama çok uzun, kesilebilir." : "❌ Meta description is too long, may be truncated.";
    feedback.style.color = "red";
  }

  // Anahtar kelime kontrolü
  if (keyword) {
    if (text.toLowerCase().includes(keyword)) {
      keywordCheck.textContent = lang === "tr" ? "✅ Anahtar kelime meta açıklamada var." : "✅ Keyword is present in meta description.";
      keywordCheck.style.color = "green";
    } else {
      keywordCheck.textContent = lang === "tr" ? "❌ Anahtar kelime meta açıklamada yok." : "❌ Keyword is not present in meta description.";
      keywordCheck.style.color = "red";
    }
  } else {
    keywordCheck.textContent = "";
  }
}
