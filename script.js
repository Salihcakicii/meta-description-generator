const keywordsInput = document.getElementById("keywordsInput");
const brandInput = document.getElementById("brandInput");
const generateBtn = document.getElementById("generateBtn");
const descriptionOutput = document.getElementById("descriptionOutput");
const lengthFeedback = document.getElementById("lengthFeedback");
const serpDescription = document.getElementById("serpDescription");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const languageSelect = document.getElementById("languageSelect");

// Çoklu dil destek metinleri
const texts = {
  tr: {
    generateBtn: "Meta Açıklama Oluştur",
    emptyKeywords: "Lütfen anahtar kelimeleri girin.",
    lengthIdeal: "✅ Uzunluk ideal (120-160 karakter).",
    lengthShort: "⚠️ Meta açıklama çok kısa (<120 karakter).",
    lengthLong: "⚠️ Meta açıklama çok uzun (>160 karakter).",
    copySuccess: "Meta açıklama kopyalandı!",
    copyFail: "Kopyalama başarısız oldu!",
    downloadName: "meta_description.txt",
  },
  en: {
    generateBtn: "Generate Meta Description",
    emptyKeywords: "Please enter keywords.",
    lengthIdeal: "✅ Length is ideal (120-160 characters).",
    lengthShort: "⚠️ Meta description is too short (<120 characters).",
    lengthLong: "⚠️ Meta description is too long (>160 characters).",
    copySuccess: "Meta description copied!",
    copyFail: "Copy failed!",
    downloadName: "meta_description.txt",
  },
};

function updateLanguage() {
  const lang = languageSelect.value;
  generateBtn.textContent = texts[lang].generateBtn;
  lengthFeedback.textContent = "";
  descriptionOutput.value = "";
  serpDescription.textContent = lang === "tr" ? "Meta açıklama burada gösterilecek..." : "Meta description will be shown here...";
}
languageSelect.addEventListener("change", updateLanguage);
updateLanguage();

function cleanInput(text) {
  // Küçük harfe çevir ve ekstra boşlukları temizle
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function generateMetaDescription() {
  const lang = languageSelect.value;
  let keywordsRaw = keywordsInput.value.trim();
  if (!keywordsRaw) {
    alert(texts[lang].emptyKeywords);
    return;
  }

  let keywords = keywordsRaw
    .split(/[\n,]+/)
    .map(k => cleanInput(k))
    .filter(k => k.length > 0);

  // Basit özgün meta açıklama oluşturma:
  // "Anahtar kelimelerle ilgili kaliteli içerik sunuyoruz."
  // Sonra marka adı varsa ekle
  let baseDescription = "";
  if (lang === "tr") {
    baseDescription = `En iyi ${keywords.join(", ")} ile kaliteli ve güvenilir içerik sunuyoruz.`;
  } else {
    baseDescription = `We provide quality and reliable content with the best ${keywords.join(", ")}.`;
  }

  const brand = brandInput.value.trim();
  let fullDescription = brand ? `${baseDescription} | ${brand}` : baseDescription;

  descriptionOutput.value = fullDescription;
  serpDescription.textContent = fullDescription;

  checkLength(fullDescription);
}

function checkLength(text) {
  const lang = languageSelect.value;
  const len = text.length;
  if (len < 120) {
    lengthFeedback.textContent = texts[lang].lengthShort;
    lengthFeedback.style.color = "orange";
  } else if (len <= 160) {
    lengthFeedback.textContent = texts[lang].lengthIdeal;
    lengthFeedback.style.color = "green";
  } else {
    lengthFeedback.textContent = texts[lang].lengthLong;
    lengthFeedback.style.color = "red";
  }
}

generateBtn.addEventListener("click", generateMetaDescription);

copyBtn.addEventListener("click", () => {
  const lang = languageSelect.value;
  navigator.clipboard.writeText(descriptionOutput.value).then(() => {
    alert(texts[lang].copySuccess);
  }).catch(() => {
    alert(texts[lang].copyFail);
  });
});

downloadBtn.addEventListener("click", () => {
  const lang = languageSelect.value;
  const blob = new Blob([descriptionOutput.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = texts[lang].downloadName;
  a.click();
  URL.revokeObjectURL(url);
});
