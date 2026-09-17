const boxData = [
  { no: "1", title: "Bebas Iklan",       gambar: "assets/no.png",          text: "Membaca dokumen di Scribd tanpa gangguan iklan memberikan pengalaman yang lebih nyaman dan fokus." },
  { no: "2", title: "Bebas Langganan",   gambar: "assets/credit-card.png", text: "Tidak perlu mengeluarkan biaya langganan untuk mengakses jurnal dan dokumen yang Anda butuhkan." },
  { no: "3", title: "Akses Tanpa Batas", gambar: "assets/infinity.png",   text: "Buka beragam dokumen dan jurnal yang tersedia di Scribd kapan saja tanpa pembatasan." }
];

let errorMsg = document.querySelector(".error-message");
const containerBox = document.querySelector(".show-card");

if (containerBox) {
  boxData.forEach(item => {
    const box = `
      <div class="col-12 col-md-4">
        <div class="card-feature">
          <div class="icon-wrapper">
            <img src="${item.gambar}" width="30" height="30" alt="${item.title}"
                 onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='../assets/'+this.getAttribute('src').replace(/^.*[\\\\/]/, '');}">
          </div>
          <h3 class="box-title">${item.title}</h3>
          <p class="box-deskripsi">${item.text}</p>
        </div>
      </div>`;
    containerBox.innerHTML += box;
  });
}

const inputContainer = document.querySelector(".container-input");
const urlInput       = document.getElementById("url");
const buttonReadNow  = document.querySelector(".continue-application");
let alertEl          = document.querySelector(".alert");
let timeoutID;

if (urlInput && buttonReadNow) {
  urlInput.addEventListener("input", () => {
    if (urlInput.value.trim() !== "") {
      buttonReadNow.classList.add("active");
      if (inputContainer) {
        inputContainer.classList.remove("border-danger");
        inputContainer.classList.add("border-primary");
      }
    } else {
      buttonReadNow.classList.remove("active");
      if (inputContainer) {
        inputContainer.classList.remove("border-primary");
      }
    }
  });

  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      cekUrl();
    }
  });
}

function notifOn() {
  if (!alertEl) return;
  alertEl.classList.add("active");
  if (timeoutID) clearTimeout(timeoutID);
  timeoutID = setTimeout(() => { notifOff(); }, 1700);
}

function notifOff() {
  if (!alertEl) return;
  alertEl.classList.remove("active");
  if (inputContainer) inputContainer.classList.remove("border-danger");
  if (timeoutID) { clearTimeout(timeoutID); timeoutID = null; }
}

function setLoading(on) {
  if (!buttonReadNow) return;
  if (on) {
    buttonReadNow.classList.add("loading");
    buttonReadNow.classList.remove("active");
  } else {
    buttonReadNow.classList.remove("loading");
    if (urlInput && urlInput.value.trim() !== "") {
      buttonReadNow.classList.add("active");
    }
  }
}

function cekUrl() {
  if (!urlInput) return;
  const url = urlInput.value;
  if (!url || !url.trim()) {
    notifOn();
    if (errorMsg) errorMsg.innerText = "Masukkan URL Dokumen!";
    if (inputContainer) {
      inputContainer.classList.add("border-danger");
      inputContainer.classList.remove("border-primary");
    }
  } else {
    if (inputContainer) {
      inputContainer.classList.remove("border-danger");
      inputContainer.classList.add("border-primary");
    }
    proses(url);
  }
}

function proses(url) {
  const trimmed = url.trim();
  let result = null;
  if (/^\d+$/.test(trimmed)) {
    result = trimmed;
  } else {
    const match = trimmed.match(/(?:doc(?:ument)?|presentation|embeds)?\/(\d+)/i) || trimmed.match(/\/(\d+)(?:\/|[?#]|$)/);
    result = match ? match[1] : null;
  }
  if (result) {
    setLoading(true);
    setTimeout(() => {
      window.open(`https://www.scribd.com/embeds/${result}/content?start_page=1&view_mode=scroll&access_key=key-fFexxf7r1bzEfWu3HKw`, "_blank");
      setLoading(false);
    }, 1800);
  } else {
    notifOn();
    if (errorMsg) errorMsg.innerText = "URL Scribd Tidak Valid!";
  }
}

if (buttonReadNow) {
  buttonReadNow.addEventListener("click", cekUrl);
}

const btnPaste = document.querySelector(".btn-paste-url");
if (btnPaste && urlInput) {
  btnPaste.addEventListener("click", () => {
    navigator.clipboard.readText()
      .then(text => {
        urlInput.value = text;
        urlInput.dispatchEvent(new Event("input"));
      })
      .catch(err => console.error("Gagal mengambil teks clipboard:", err));
  });
}
