const axios = require('axios').default;

const formEl = document.querySelector(".search-form")

const galleryEl = document.querySelector(".gallery")

const loadmoreButtinEl = document.querySelector(".load-more")
 

    formEl.addEventListener("submit", onformsubmit)



loadmoreButtinEl.addEventListener("click",loadMore)

 let search = ""


class NewAPIGalyry {
    constructor() {
        
        this.page = 1
    }

    fetch(search) {
        const url = `https://pixabay.com/api/?key=30641598-d39f2f73d719eac54648ccf68&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
        return axios.get(url).then(r => r.data.hits).then(r => {
            loadmoreButtinEl.classList.remove("is-hiden")
            return r
        })
    }
          
    incrementpage() {
        this.page +=1
   }

    resetPage() {
     this.page = 1
 }
    set query(newSearch) {
        this.search = newSearch
   }
    
}



  const APIGalyry = new NewAPIGalyry()



 async function onformsubmit(e) {
    e.preventDefault()
    galleryEl.innerHTML = ""
    search = formEl[0].value
       APIGalyry.resetPage()        
     const elements = await APIGalyry.fetch(search)
          makeGaleruEl (elements)
        
        
       
    }





async function loadMore() {
    APIGalyry.incrementpage()
    const elements = await APIGalyry.fetch(search)
    makeGaleruEl (elements)
    
}

 

   
function makeGaleruEl(el) {
     galleryEl.insertAdjacentHTML('beforebegin',makegalery(el))
 }


  function makegalery(data) {
         if (data !==  []) {
            return  Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
         }
   return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => { 

        return `<div class="photo-card">
  <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>views ${views}</b>
    </p>
    <p class="info-item">
      <b>comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>downloads ${downloads}</b>
    </p>
  </div>
</div>`
       }  ).join("")
    
  }