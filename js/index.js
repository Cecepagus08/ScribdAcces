const box = [
  {
    no : "1",
    title : "Bebas Iklan",
    gambar: 'no.png',
    text : "Membaca dokumen di Scribd tanpa gangguan iklan memberikan pengalaman yang lebih nyaman dan fokus."
  },
  {
    no : "2",
    title : "Bebas Langganan",
    gambar: 'credit-card.png',
    text : "Tidak perlu mengeluarkan biaya langganan untuk mengakses jurnal dan dokumen yang Anda butuhkan."
  },
  {
    no : "3",
    title : "Akses Tanpa Batas",
    gambar: 'infinity.png',
    text : "Buka beragam dokumen dan jurnal yang tersedia di Scribd kapan saja tanpa pembatasan."
  }
];

box.forEach( (item) => {
  console.log(item)
  let containerBox = document.querySelector('.container-box')
const box = `
      <div class="col-12 col-sm-5 container  ">
          <div class="row justify-content-start">
            <div class="text-dark col-9 col-sm-12 shadow-lg bg-light-subtle rounded-2 p-2 position-relative">
            <img src="assets/${item.gambar}" class=" col-5 col-sm-4 position-absolute image-box " alt="">
              <h1 class="fs-2">${item.title}</h1>
              <p class=" fs-6 m-0 col-10">${item.text}</p>
                </div>
          </div>
          

          
        </div>

`
containerBox.innerHTML += box;
});

    function proses(){
        let url = document.getElementById('url').value;
        
        
        // Fungsi untuk mengambil angka maksimal 9 digit dari URL
        function extractNumbers(url) {
            // Gunakan regex untuk mencari angka
            const numbers = url.match(/\d+/g);
            if (numbers) {
                // Gabungkan angka yang ditemukan
                const combinedNumbers = numbers.join("");
                // Ambil maksimal 9 digit
                return combinedNumbers.slice(0, 9);
            }
            return null; // Jika tidak ada angka
        }
        const result = extractNumbers(url);
        if (result) {
          setTimeout((e)=>{
          window.open(`https://www.scribd.com/embeds/${result}/content?start_page=1&view_mode=scroll&access_key=key-fFexxf7r1bzEfWu3HKw`, "_blank");
            
          },500);
          
        } else {
            console.log("Tidak ada angka yang ditemukan.");
        }
    }
