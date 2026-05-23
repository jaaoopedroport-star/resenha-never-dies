const POSTS_URL = "data/posts.json";

const galleryGrid = document.querySelector("#galleryGrid");
const emptyState = document.querySelector("#emptyState");

function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short"
  }).format(new Date(`${dateValue}T12:00:00`));
}

function createPostCard(post) {
  const card = document.createElement("article");
  card.className = "post-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "post-image";

  const image = document.createElement("img");
  image.src = post.image;
  image.alt = post.caption || "Imagem postada na galeria Resenha Never Dies";
  image.loading = "lazy";
  imageWrap.append(image);

  const body = document.createElement("div");
  body.className = "post-body";

  const title = document.createElement("h3");
  title.textContent = post.caption || "Sem legenda, so resenha";

  const meta = document.createElement("p");
  meta.className = "post-meta";
  const date = formatDate(post.date);
  meta.textContent = date ? `Postado em ${date}` : "Post publico da comunidade";

  body.append(title, meta);
  card.append(imageWrap, body);

  return card;
}

function renderPosts(posts) {
  galleryGrid.innerHTML = "";
  emptyState.hidden = posts.length > 0;

  posts.forEach((post) => {
    galleryGrid.append(createPostCard(post));
  });
}

async function loadPublicPosts() {
  try {
    const response = await fetch(POSTS_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Nao foi possivel carregar a galeria.");
    }

    const posts = await response.json();
    renderPosts(Array.isArray(posts) ? posts : []);
  } catch (error) {
    emptyState.hidden = false;
    emptyState.textContent = "Nao foi possivel carregar a galeria agora.";
    console.error(error);
  }
}

loadPublicPosts();
