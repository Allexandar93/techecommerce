const newsList = document.querySelector(".newsList");
const searchContainer = document.querySelector(".searchContainer");
const input = document.querySelector(".newsInput");

const retrieveNews = (e) => {
  e.preventDefault();
  const key = "07b36f32ce7a4ad09a6463c6858a565b";
  let searchTopic = input.value;
  const url = `https://newsapi.org/v2/everything?q=${searchTopic}&apiKey=${key}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.articles.forEach((article) => {
        const newsApiDate = article.publishedAt;
        const timeStamp = new Date(newsApiDate).getTime();
        const day = new Date(timeStamp).getDate();
        const month = new Date(timeStamp).getMonth() + 1;
        const year = new Date(timeStamp).getFullYear();
        const formatedDate = `${day}/${month}/${year}`;

        html += `
        <a href="${article.url}" class="post col-lg-6 col-md-6 col-12">
            <div class="post-img">
                <img class="img-fluid w-100 imgNews" src="${article.urlToImage}"  alt=""
                onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';" />
            </div>
            <h3 class="text-center font-weight-normal pt-3">
                ${article.title}
            </h3>
            <p class="text-center">${formatedDate}</p>
        </a>
          `;
      });
      newsList.innerHTML = html;
      input.value = "";
    })
    .catch((error) => console.log(error));
};

searchContainer.addEventListener("submit", retrieveNews);
