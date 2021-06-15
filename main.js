const postsList = document.getElementById('posts-list');

function handleRemoveClick() {
    this.parentNode.remove();
}

function createPost({
    header,
    poster,
    text,
    id,
    link
}) {
    const currPostLi = document.createElement('li');
    currPostLi.classList.add('post');
    currPostLi.id = `post-${id}`;

    const delBtn = document.createElement('button');
    delBtn.classList.add('post__btn__delete');
    delBtn.textContent = '❌';
    delBtn.addEventListener('click', handleRemoveClick);

    const curPostLink = document.createElement('a');
    curPostLink.href = `${link}`;
    const curPostHeader = document.createElement('h4');
    curPostHeader.classList.add('post__header');
    curPostHeader.innerText = `${header}`;

    const curPostImgwrapper = document.createElement('div');
    curPostImgwrapper.classList.add('post__poster');
    const curPostLink1 = document.createElement('a');
    curPostLink1.href = `${link}`
    const curPostLinkImg = document.createElement('img');
    curPostLinkImg.src = `${poster}`;

    const curPostDescwrapper = document.createElement('div');
    curPostDescwrapper.classList.add('post__body');
    curPostDescwrapper.innerText = `${text}`;

    curPostLink.append(curPostHeader);
    curPostLink1.append(curPostLinkImg);
    curPostImgwrapper.append(curPostLink1);

    currPostLi.append(delBtn, curPostLink, curPostImgwrapper, curPostDescwrapper)


    return currPostLi;

}

async function init() {
    postsList.innerHTML = '';
    const responce = await fetch('http://inno-ijl.ru/multystub//stc-21-03/posts', {
        cors: 'no-cors',
    });
    const posts = await responce.json();

    for (let i = 0; i < posts.body.length; i++) {

        const post = createPost(posts.body[i]);

        postsList.append(post);
    }
}

init();