const newsList = document.querySelector(".newsList");
const searchContainer = document.querySelector(".searchContainer");
const input = document.querySelector(".newsInput");

const loadNews = () => {
  fetch("news.json")
    .then((respond) => respond.json())
    .then((data) => {
      let html = "";
      data.forEach((article) => {
        html += `
        <div  class="post col-lg-6 col-md-6 col-12">
            <div class="post-img">
                <img class="img-fluid w-100 imgNews" src="${article.imgSrc}"  alt=""
                onerror="this.onerror=null; this.src='https://source.unsplash.com/random/300×300/?technology';" />
            </div>
            <h3 class="text-center font-weight-normal pt-3">
                ${article.title}
            </h3>
            <p class="text-center">${article.date}</p>
        </div>
          `;
      });
      newsList.innerHTML = html;

      console.log(data.data);
    })
    .catch((err) => console.log(err));
};

loadNews();
