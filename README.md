# Resenha Never Dies

Site estatico publicado no GitHub Pages para guardar imagens da comunidade.

## Como adicionar uma imagem

1. Entre no repositorio pelo GitHub.
2. Envie a imagem para a pasta `assets/posts`.
3. Abra o arquivo `data/posts.json`.
4. Adicione um item na lista seguindo este modelo:

```json
{
  "image": "assets/posts/nome-da-imagem.png",
  "caption": "Legenda da imagem",
  "date": "2026-05-23"
}
```

Se ja existir outro item na lista, separe os itens com virgula:

```json
[
  {
    "image": "assets/posts/primeira.png",
    "caption": "Primeira imagem",
    "date": "2026-05-23"
  },
  {
    "image": "assets/posts/segunda.png",
    "caption": "Segunda imagem",
    "date": "2026-05-23"
  }
]
```

Depois de salvar o commit, o GitHub Pages atualiza o site automaticamente.
