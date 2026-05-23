const STORAGE_KEY = "resenha-never-dies-posts";

const uploadForm = document.querySelector("#uploadForm");
const imageInput = document.querySelector("#imageInput");
const captionInput = document.querySelector("#captionInput");
const preview = document.querySelector("#preview");
const previewImage = document.querySelector("#previewImage");
const galleryGrid = document.querySelector("#galleryGrid");
const emptyState = document.querySelector("#emptyState");
const formNote = document.querySelector("#formNote");

let selectedImage = "";

function loadPosts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(timestamp));
}

function renderPosts() {
  const posts = loadPosts();
  galleryGrid.innerHTML = "";
  emptyState.hidden = posts.length > 0;

  posts.forEach((post) => {
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
    meta.textContent = `Postado em ${formatDate(post.createdAt)}`;

    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.type = "button";
    remove.textContent = "Remover";
    remove.addEventListener("click", () => deletePost(post.id));

    body.append(title, meta, remove);
    card.append(imageWrap, body);
    galleryGrid.append(card);
  });
}

function deletePost(id) {
  const updatedPosts = loadPosts().filter((post) => post.id !== id);
  savePosts(updatedPosts);
  renderPosts();
  formNote.textContent = "Post removido da galeria.";
}

imageInput.addEventListener("change", () => {
  const [file] = imageInput.files;

  if (!file) {
    selectedImage = "";
    preview.hidden = true;
    return;
  }

  if (!file.type.startsWith("image/")) {
    formNote.textContent = "Escolha um arquivo de imagem valido.";
    imageInput.value = "";
    selectedImage = "";
    preview.hidden = true;
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    selectedImage = reader.result;
    previewImage.src = selectedImage;
    preview.hidden = false;
    formNote.textContent = "Imagem pronta para publicar.";
  });

  reader.readAsDataURL(file);
});

uploadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedImage) {
    formNote.textContent = "Selecione uma imagem antes de publicar.";
    return;
  }

  const posts = loadPosts();
  const newPost = {
    id: crypto.randomUUID(),
    image: selectedImage,
    caption: captionInput.value.trim(),
    createdAt: Date.now()
  };

  savePosts([newPost, ...posts]);
  uploadForm.reset();
  selectedImage = "";
  preview.hidden = true;
  previewImage.removeAttribute("src");
  formNote.textContent = "Imagem publicada na galeria.";
  renderPosts();
  document.querySelector("#galeria").scrollIntoView({ behavior: "smooth" });
});

renderPosts();
