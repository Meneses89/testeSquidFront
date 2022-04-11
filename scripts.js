const API_URL = "https://us-central1-squid-apis.cloudfunctions.net/test-front-basic";
const container = document.querySelector(".container");
const load = document.querySelector("#load");


function setLoading(loading = true) {
  if (loading === true) {
    let loadingEl = document.createElement("h3");

    loadingEl.setAttribute("id", "loading");
    container.appendChild(loadingEl);
  }else {
    document.getElementById("loading").remove();
  }
}

//Primeira consulta da API
search(API_URL).then(showData);

//Buscar API
function search(val) {
  return fetch(val)
    .then(setLoading())
    .then(data => data.json().then(setLoading(false)));
}

function loadMore(url) {
  search(API_URL + "&nextUrl=" + encodeURIComponent(url))
    .then(setLoading())
    .then(showData)
    .then(setLoading(false));
}
function showData(medias, pagination ) {
    medias.map(element => {

    const{criadoEm, upvotes, comentarios, imagens, usuario, link } = element;
    //capturando os dados a serem utilizados

    const criadoEmFormatted = new Intl
    .DateTimeFormat('pt-br', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
    .format(new Date(criadoEm));

    const postWrapper = document.createElement("div");
    postWrapper.classList.add("post-wrapper");

    const postImage = document.createElement("img");
    postImage.classList.add("post-img");
    postImage.setAttribute("src", imagens.resolucaoPadrao.url);
    
    
    const postsSection = document.createElement("section");
    postsSection.classList.add("posts-section");

    const postInfo = document.createElement("div");
    postInfo.classList.add("post-info");

    const { username } = usuario;
    const userInfo = [username, upvotes, comentarios, criadoEmFormatted ];

    userInfo.map(item => {
    const postItem = document.createElement("p");
        postItem.classList.add("item");
        postItem.innerHTML = item;
        postInfo.appendChild(postItem);
        
    });

    postWrapper.appendChild(postImage);
    postWrapper.appendChild(postInfo);

    container.appendChild(postWrapper);
  });

}
