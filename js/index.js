const boxData = [
  {
    no: "1",
    title: "Bebas Iklan",
    gambar: 'no.png',
    text: "Membaca dokumen di Scribd tanpa gangguan iklan memberikan pengalaman yang lebih nyaman dan fokus."
  },
  {
    no: "2",
    title: "Bebas Langganan",
    gambar: 'credit-card.png',
    text: "Tidak perlu mengeluarkan biaya langganan untuk mengakses jurnal dan dokumen yang Anda butuhkan."
  },
  {
    no: "3",
    title: "Akses Tanpa Batas",
    gambar: 'infinity.png',
    text: "Buka beragam dokumen dan jurnal yang tersedia di Scribd kapan saja tanpa pembatasan."
  }
];
let errorMsg = document.querySelector(".error-message");
const containerBox = document.querySelector('.container-box');
boxData.forEach(item => {
  const box = `
    <div class="col-11 col-sm-5 col-lg-4 container">
      <div class="row justify-content-start">
        <div class="text-dark col-12 col-sm-12 shadow-lg bg-light-subtle rounded-2 p-2 position-relative">
          <img src="assets/${item.gambar}" class="my-3 col-3 col-sm-4 col-lg-3 " alt="">
          <h1 class="fs-2 box-title">${item.title}</h1>
          <p class=" box-deskripsi m-0 col-11">${item.text}</p>
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

  function extractNumbers(url) {
    const numbers = url.match(/\d+/g); // Cari semua angka dalam URL
    if (numbers) {
      const combinedNumbers = numbers.join(""); // Gabungkan semua angka
      if (combinedNumbers.length === 9) { // Validasi jika tepat 9 angka
        return combinedNumbers;
      }
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

