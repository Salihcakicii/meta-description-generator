function generateDescription() {
  const input = document.getElementById("userInput").value.trim();
  const keyword = document.getElementById("keyword").value.trim();
  const output = document.getElementById("metaOutput");
  const feedback = document.getElementById("feedback");

  if (!input) {
    output.value = "";
    feedback.innerHTML = '<span class="bad">Lütfen açıklama girin.</span>';
    return;
  }

  let description = input;

  // Karakter uzunluğu kontrolü
  const length = description.length;
  let lengthFeedback = "";
  if (length >= 140 && length <= 160) {
    lengthFeedback = '<span class="good">✅ Uzunluk ideal: ' + length + ' karakter</span>';
  } else if (length < 140) {
    lengthFeedback = '<span class="warning">⚠️ Kısa: ' + length + ' karakter (min 140 önerilir)</span>';
  } else {
    lengthFeedback = '<span class="warning">⚠️ Uzun: ' + length + ' karakter (maks. 160 önerilir)</span>';
  }

  // Anahtar kelime içeriyor mu
  let keywordFeedback = "";
  if (keyword && description.toLowerCase().includes(keyword.toLowerCase())) {
    keywordFeedback = '<span class="good">✅ Anahtar kelime içeriyor</span>';
  } else {
    keywordFeedback = '<span class="bad">❌ Anahtar kelime bulunamadı</span>';
  }

  output.value = description;
  feedback.innerHTML = lengthFeedback + "<br>" + keywordFeedback;
}
