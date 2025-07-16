const textarea = document.getElementById("descriptionInput");
const charCount = document.getElementById("charCount");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const resultBox = document.getElementById("result");

// Karakter sayacı
textarea.addEventListener("input", () => {
  const length = textarea.value.length;
  charCount.textContent = `${length} karakter`;

  if (length < 50) {
    charCount.style.color = "gray";
  } else if (length <= 160) {
    charCount.style.color = "green";
  } else if (length <= 200) {
    charCount.style.color = "orange";
  } else {
    charCount.style.color = "red";
  }
});

// Oluşturma butonu
generateBtn.addEventListener("click", () => {
  const text = textarea.value.trim();
  if (text.length === 0) {
    alert("Lütfen açıklama girin.");
    return;
  }
  resultBox.textContent = text;
  resultBox.style.display = "block";
  copyBtn.style.display = "inline-block";
});

// Kopyalama butonu
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(resultBox.textContent).then(() => {
    copyBtn.textContent = "Kopyalandı!";
    setTimeout(() => {
      copyBtn.textContent = "Kopyala";
    }, 1500);
  });
});
