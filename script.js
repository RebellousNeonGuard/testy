const postsSection = document.getElementById("posts")
const baseUrl = window.location.pathname.endsWith("/") ? "" : "/"

function createPostElement(post) {
  const postElement = document.createElement("div")
  postElement.classList.add("post")
  const titleElement = document.createElement("h2")
  titleElement.classList.add("post-title")
  titleElement.textContent = post.title
  const imgElement = document.createElement("img")
  imgElement.src = "assets/placeholder.jpg"
  imgElement.alt = post.title
  imgElement.loading = "lazy"
  const linkElement = document.createElement("a")
  linkElement.href = `${baseUrl}post.html?id=${post.id}`
  linkElement.appendChild(titleElement)
  postElement.appendChild(imgElement)
  postElement.appendChild(linkElement)
  return postElement
}

async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Ошибка при загрузке постов:", error)
    // Вывод сообщения об ошибке пользователю
    postsSection.innerHTML =
      "<p>Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>"
    return [] // Возвращаем пустой массив, чтобы избежать дальнейших ошибок
  }
}

// Отображение списка постов на главной странице
fetchPosts().then(postsData => {
  postsData.forEach(post => {
    postsSection.appendChild(createPostElement(post))
  })
})

// Отображение статьи на странице статьи (post.html)
const urlParams = new URLSearchParams(window.location.search)
const postId = urlParams.get("id")

if (postId) {
  fetchPosts().then(postsData => {
    const post = postsData.find(p => p.id === parseInt(postId))
    if (post) {
      document.body.innerHTML = `
        <div class="article-page">
          <h1 class="article-title">${post.title}</h1>
          <img src="assets/placeholder.jpg" alt="${post.title}" loading="lazy">
          <div class="article-body">${post.body}</div>
        </div>
      `
    } else {
      document.body.innerHTML = "<h1>Статья не найдена</h1>"
    }
  })
}
