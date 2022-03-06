const newsList = document.querySelector(".newsList");
const searchContainer = document.querySelector(".searchContainer");
const input = document.querySelector(".newsInput");

window.addEventListener("DOMContentLoaded", () => {
  const key = "8f0e85dbbfc6f56c9786e4d04794a1c5";
  const topic = "mobile";
  let url = `
  http://api.mediastack.com/v1/news?access_key=${key}&keywords=${topic}&countries=us`;

  fetch(url)
    .then((respond) => respond.json())
    .then((data) => {
      let html = "";
      data.data.forEach((article) => {
        const newsApiDate = article.published_at;
        const timeStamp = new Date(newsApiDate).getTime();
        const day = new Date(timeStamp).getDate();
        const month = new Date(timeStamp).getMonth() + 1;
        const year = new Date(timeStamp).getFullYear();
        const formatedDate = `${day}/${month}/${year}`;

        html += `
        <a href="${article.url}" class="post col-lg-6 col-md-6 col-12">
            <div class="post-img">
                <img class="img-fluid w-100 imgNews" src="${article.image}"  alt=""
                onerror="this.onerror=null; this.src='https://source.unsplash.com/random/300×300/?technology';" />
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

      console.log(data.data);
    })
    .catch((err) => console.log(err));
});

const retrieveNews = (e) => {
  e.preventDefault();
  const key = "8f0e85dbbfc6f56c9786e4d04794a1c5";
  const topic = input.value;
  let url = `
  http://api.mediastack.com/v1/news?access_key=${key}&keywords=${topic}&countries=us`;

  fetch(url)
    .then((respond) => respond.json())
    .then((data) => {
      let html = "";
      data.data.forEach((article) => {
        const newsApiDate = article.published_at;
        const timeStamp = new Date(newsApiDate).getTime();
        const day = new Date(timeStamp).getDate();
        const month = new Date(timeStamp).getMonth() + 1;
        const year = new Date(timeStamp).getFullYear();
        const formatedDate = `${day}/${month}/${year}`;

        html += `
        <a href="${article.url}" class="post col-lg-6 col-md-6 col-12">
            <div class="post-img">
                <img class="img-fluid w-100 imgNews" src="${article.image}"  alt=""
                onerror="this.onerror=null; this.src='https://source.unsplash.com/random/300×300/?technology';" />
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

      console.log(data.data);
    })
    .catch((err) => console.log(err));
};

searchContainer.addEventListener("submit", retrieveNews);
