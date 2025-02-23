document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.getElementById('posts-container');
    const postForm = document.getElementById('post-form');

    // Sample blog posts (in a real application, these would come from a server)
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [
        { title: 'First Blog Post', content: 'This is the content of the first blog post. Welcome to my blog!' },
        { title: 'Another Post', content: 'Here is some more interesting content for you to read.' }
    ];

    function displayPosts() {
        postsContainer.innerHTML = ''; // Clear existing posts
        if (blogPosts.length === 0) {
            postsContainer.innerHTML = '<p>No posts yet. Be the first to create one!</p>';
            return;
        }
        blogPosts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postDiv);
        });
    }

    displayPosts(); // Initial display of posts

    if (postForm) { // Check if postForm exists (only on post.html)
        postForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            const titleInput = document.getElementById('post-title');
            const contentInput = document.getElementById('post-content');

            const newPost = {
                title: titleInput.value,
                content: contentInput.value
            };

            blogPosts.unshift(newPost); // Add new post to the beginning of the array
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts)); // Save to local storage

            titleInput.value = ''; // Clear form inputs
            contentInput.value = '';

            alert('Post published successfully!');
            window.location.href = 'index.html'; // Redirect to homepage to see the new post
        });
    }
});