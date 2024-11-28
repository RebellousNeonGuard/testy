import postsData from './posts.json'; // импорт данных статей

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const postsSection = document.getElementById('posts')!;
const baseUrl = window.location.pathname.endsWith('/') ? '' : '/'; //  для правильного формирования ссылок на статьи

function createPostElement(post: Post): HTMLElement {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const titleElement = document.createElement('h2');
    titleElement.classList.add('post-title');
    titleElement.textContent = post.title;

    const imgElement = document.createElement('img');
    imgElement.src = 'assets/placeholder.jpg';  // Ваша картинка
    imgElement.alt = post.title;
    imgElement.loading = 'lazy';

    const linkElement = document.createElement('a');
    linkElement.href = `${baseUrl}post/${post.id}`;
    linkElement.appendChild(titleElement);

    postElement.appendChild(imgElement);
    postElement.appendChild(linkElement);


    return postElement;
}

//Вывод списка постов на главной странице
postsData.forEach(post => {
  postsSection.appendChild(createPostElement(post));
});

//Вывод статьи на странице статьи
const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
if (postId) {
    const post = postsData.find(p => p.id === parseInt(postId));
    if (post) {
        document.body.innerHTML = `
            <div class="article-page">
              <h1 class="article-title">${post.title}</h1>
              <img src="assets/placeholder.jpg" alt="${post.title}" loading="lazy">
              <div class="article-body">${post.body}</div>
            </div>
        `;
    } else {
        document.body.innerHTML = '<h1>Статья не найдена</h1>';
    }
}
