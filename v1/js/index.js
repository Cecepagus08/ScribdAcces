const boxData = [
  {
    no: "1",
    title: "Bebas Iklan",
    gambar: 'assets/no.png',
    text: "Membaca dokumen di Scribd tanpa gangguan iklan memberikan pengalaman yang lebih nyaman dan fokus."
  },
  {
    no: "2",
    title: "Bebas Langganan",
    gambar: 'assets/credit-card.png',
    text: "Tidak perlu mengeluarkan biaya langganan untuk mengakses jurnal dan dokumen yang Anda butuhkan."
  },
  {
    no: "3",
    title: "Akses Tanpa Batas",
    gambar: 'assets/infinity.png',
    text: "Buka beragam dokumen dan jurnal yang tersedia di Scribd kapan saja tanpa pembatasan."
  }
];
let errorMsg = document.querySelector(".error-message");
const containerBox = document.querySelector('.show-card');
boxData.forEach(item => {
  const box = `
          <div class="col-12 col-sm-6 col-lg-5 mt-3">
            <div class="text-dark shadow-lg bg-light-subtle rounded-2 p-2 d-flex flex-column h-100">
                <img src="${item.gambar}" class="my-3 col-3 col-sm-4 col-lg-3" alt="${item.title}" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='../assets/'+this.getAttribute('src').replace(/^.*[\\\\/]/, '');}">
                <h1 class="fs-2 box-title">${item.title}</h1>
                <p class="box-deskripsi m-0 flex-grow-1">${item.text}</p>
            </div>
        </div>
  

  `;
  containerBox.innerHTML += box;
});

const inputContainer = document.querySelector(".container-input")
const urlInput = document.getElementById('url');
const buttonReadNow = document.querySelector(".continue-application");

urlInput.addEventListener('input', () => {
  if (urlInput.value.trim() !== "") {
    buttonReadNow.classList.add("active")
     inputContainer.classList.remove("border-danger")
     inputContainer.classList.add("border-secondary")
    
  } else {
    buttonReadNow.classList.remove("active")
     
    
  }
});

// buttonReadNow.style.pointerEvents = 'none';
// 
// buttonReadNow.addEventListener('click', proses);
let alertEl = document.querySelector("#alertToast") || document.querySelector(".alert");
let timeoutID;

function notifOn() {
  if (!alertEl) return;
  alertEl.classList.add("active");
  alertEl.style.opacity = "1";
  alertEl.style.visibility = "visible";
  alertEl.style.pointerEvents = "auto";

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  timeoutID = setTimeout(() => {
    notifOff();
  }, 1700);
}

function notifOff() {
  if (!alertEl) return;
  alertEl.classList.remove("active");
  alertEl.style.opacity = "0";
  alertEl.style.visibility = "hidden";
  alertEl.style.pointerEvents = "none";
  if (inputContainer) inputContainer.classList.remove("border-danger");

  if (timeoutID) {
    clearTimeout(timeoutID);
    timeoutID = null;
  }
}
window.notifOff = notifOff;


// Panggil notifOn terlebih dahulu, lalu hapus setelah 100ms



  
  // setTimeout(()=>{
//   alert.classList.toggle("active")
//     
//   },1000 );

function cekUrl() {
  const url = urlInput.value;
  
  if(!url || !url.trim()){
    notifOn();
    errorMsg.innerText = "Masukkan Url";
    inputContainer.classList.add("border-danger");
    inputContainer.classList.remove("border-secondary");
  } else {
    inputContainer.classList.remove("border-danger");
    inputContainer.classList.add("border-secondary");
    proses(url);
  }
}

function proses(url) {
  function extractNumbers(inputUrl) {
    const trimmed = inputUrl.trim();
    if (/^\d+$/.test(trimmed)) {
      return trimmed;
    }
    const match = trimmed.match(/(?:doc(?:ument)?|presentation|embeds)?\/(\d+)/i) || trimmed.match(/\/(\d+)(?:\/|[?#]|$)/);
    if (match) {
      return match[1];
    }
    return null;
  }

  const result = extractNumbers(url);
  if (result) {
    setTimeout(() => {
      window.open(`https://www.scribd.com/embeds/${result}/content?start_page=1&view_mode=scroll&access_key=key-fFexxf7r1bzEfWu3HKw`, "_blank");
    }, 500);
  } else {
    notifOn();
    errorMsg.innerText = "Url tidak valid";
  }
}

urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    cekUrl();
  }
});

const btnPaste = document.querySelector(".btn-paste-url");

btnPaste.addEventListener("click", () =>{
  navigator.clipboard.readText()
    .then(text => {
      urlInput.value = text;
      urlInput.dispatchEvent(new Event('input'));
    })
    .catch(err => console.error("Gagal mengambil teks dari clipboard:", err));
});