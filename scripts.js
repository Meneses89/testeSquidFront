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
search(API_URL).then(showData).catch(showError);

//Tratamento de Erro
function showError(){
  const postWrapper = document.createElement("div");
    postWrapper.classList.add("post-wrapper1");

  const postItem = document.createElement("span");
    postItem.classList.add("item");
    postItem.innerHTML = " <strong>Ops!</strong><p>Estamos com problemas em nossos servidores. Por favor, tente novamente mais tarde.</p>";

    postWrapper.appendChild(postItem);
    container.appendChild(postWrapper);
  
  setLoading(false)
}

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

    userInfo.map((item, i) => {
      const itemDiv = document.createElement("div")
      itemDiv.classList.add("item-div")

      const postIcon = document.createElement("i");
      postIcon.classList.add("material-icons")
      switch (i){
        case 0:
          postIcon.innerHTML = 'alternate_email';
          break;
        case 1:
          postIcon.innerHTML = 'favorite';
          break;
        case 2:
           postIcon.innerHTML = 'chat_bubble_outline';
           break;
        case 3:
          postIcon.innerHTML = 'calendar_month';
          break;
        default:
          break;  
      }

      itemDiv.appendChild(postIcon);
      // -------------------------------------------
      const postItem = document.createElement("span");
          postItem.classList.add("item");
          postItem.innerHTML = item;
          itemDiv.appendChild(postItem);

          postInfo.appendChild(itemDiv);
        
    });

    postWrapper.appendChild(postImage);
    postWrapper.appendChild(postInfo);

    container.appendChild(postWrapper);
  });

}
