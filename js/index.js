const boxData = [
  {
    no: "1",
    title: "Bebas Iklan",
    gambar: 'https://scribd-acces.vercel.app/assets/no.png',
    text: "Membaca dokumen di Scribd tanpa gangguan iklan memberikan pengalaman yang lebih nyaman dan fokus."
  },
  {
    no: "2",
    title: "Bebas Langganan",
    gambar: 'https://scribd-acces.vercel.app/assets/credit-card.png',
    text: "Tidak perlu mengeluarkan biaya langganan untuk mengakses jurnal dan dokumen yang Anda butuhkan."
  },
  {
    no: "3",
    title: "Akses Tanpa Batas",
    gambar: 'https://scribd-acces.vercel.app/assets/infinity.png',
    text: "Buka beragam dokumen dan jurnal yang tersedia di Scribd kapan saja tanpa pembatasan."
  }
];
let errorMsg = document.querySelector(".error-message");
const containerBox = document.querySelector('.show-card');
boxData.forEach(item => {
  const box = `
    <div class="col-11 col-sm-5 col-lg-4 mt-3 container">
        <div class="row justify-content-start h-100">
            <div class="text-dark col-12 col-sm-12 shadow-lg bg-light-subtle rounded-2 p-2 position-relative d-flex flex-column h-100">
                <img src="${item.gambar}" class="my-3 col-3 col-sm-4 col-lg-3" alt="">
                <h1 class="fs-2 box-title">${item.title}</h1>
                <p class="box-deskripsi m-0 col-11 flex-grow-1">${item.text}</p>
            </div>
        </div>
    </div>
  `;
  containerBox.innerHTML += box;
});

const urlInput = document.getElementById('url');
const buttonReadNow = document.querySelector(".continue-application");

urlInput.addEventListener('input', () => {
  if (urlInput.value.trim() !== "") {
    buttonReadNow.classList.add("active")
     urlInput.classList.remove("border-danger")
     urlInput.classList.add("border-secondary")
    
  } else {
    buttonReadNow.classList.remove("active")
     
    
  }
});

// buttonReadNow.style.pointerEvents = 'none';
// 
// buttonReadNow.addEventListener('click', proses);
let alert = document.querySelector(".alert");
let timeoutID; // Variabel untuk menyimpan ID timeout

function notifOn() {
  alert.classList.add("active");

  // Jika sudah ada timeout sebelumnya, hapus terlebih dahulu
  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  // Atur timeout baru
  timeoutID = setTimeout(() => {
    notifOff();
  }, 1700);
}

function notifOff() {
  // Hapus class aktif
  alert.classList.remove("active");

  // Hapus timeout jika ada
  if (timeoutID) {
    clearTimeout(timeoutID);
    timeoutID = null; // Reset ID timeout
  }
}


// Panggil notifOn terlebih dahulu, lalu hapus setelah 100ms



  
  // setTimeout(()=>{
//   alert.classList.toggle("active")
//     
//   },1000 );

function cekUrl() {
  const url = urlInput.value;
  
  if(!url){
    notifOn();
    errorMsg.innerText = "Masukkan Url";
    urlInput.classList.add("border-danger")
     urlInput.classList.remove("border-secondary")
  }else{
    urlInput.classList.remove("border-danger")
    
     urlInput.classList.add("border-secondary")
     proses(url);
  }
  
  
}
function proses(url) {
  console.log("berhasil");

  // Fungsi untuk mengekstrak angka di antara '/' pertama dan terakhir
  function extractNumbers(url) {
    const regex = /\/(\d+)\//; // Regex untuk mengambil angka di antara '/'
    const match = url.match(regex); // Mencocokkan pola dengan URL

    if (match) {
      return match[1]; // Kembalikan angka yang ditemukan
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



