function generateDescription() {
  const input = document.getElementById('inputText').value.trim();
  let description = input.slice(0, 160);
  document.getElementById('output').innerText = description;
  updateStatus(description.length);
}

function updateStatus(length) {
  const countElem = document.getElementById('charCount');
  const statusElem = document.getElementById('status');

  countElem.innerText = `${length} karakter`;

  if (length < 50) {
    statusElem.innerText = "Çok kısa";
    statusElem.style.color = "orange";
  } else if (length <= 160) {
    statusElem.innerText = "İdeal uzunluk";
    statusElem.style.color = "green";
  } else {
    statusElem.innerText = "Çok uzun";
    statusElem.style.color = "red";
  }
}

function copyToClipboard() {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Kopyalandı!");
  });
}
