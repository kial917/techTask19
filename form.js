const btnAdd = document.getElementById('btn-add');
const addForm = document.getElementById('add-post');
const inputHeader = document.getElementById('add-header');
const inputPoster = document.getElementById('add-poster');
const inputLink = document.getElementById('add-link');
const inputText = document.getElementById('add-text');

btnAdd.addEventListener('click', () => {
    addForm.classList.remove('hide')
});

addForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('image', inputPoster.files[0]);
    formData.append('fullPath', true);
    const answer = await fetch('http://inno-ijl.ru/api/files/v1/img-to-webp', {
        method: 'POST',
        body: formData
    });

    const newPosterData = await answer.json();

    await fetch('http://inno-ijl.ru/multystub/stc-21-03/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            header: inputHeader.value,
            poster: newPosterData.path,
            text: inputText.value,
            link: inputLink.value,
        })
    })

    location.reload();
})
