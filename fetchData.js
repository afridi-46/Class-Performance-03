const fetchAllPosts = async() => {
    let data;

    try{
        const res = await fetch("http://localhost:9999/getAllPosts");
        data = await res.json();
        console.log(data);
        showAllPosts(data);
    }
    catch(err){
        console.log("Error fetching data from server");
    }
};

const showAllPosts = (allPosts) => {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";
    
        
    allPosts.forEach(async(post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
        <div class="post-header">
                
                <div class="post-user-image">
                    <img
                       src=${post.postedUserImage}
                    />
                </div>

                <div class="post-username-time">
                    <p class="post-username">${post.postedUserName}</p>
                    <div class="posted-time">
                        <span>${post.postedTime}</span>
                        <span>hours ago</span>
                    </div>
                </div>
            </div>

            <div>
                <div class="post-text">
                    <p class="post-text-content">
                        ${post.postText}
                    </p>
                </div>
                
            </div>

            <div class="post-image">
                <img src= ${post.postImageUrl}
                />
            </div>
        `;

        postContainer.appendChild(postDiv);

        // Comments under a post

        let postComments = await fetchAllCommentsOfAPost(post.postId);
        console.log("postComments: ", postComments);

    });
};

const fetchAllCommentsOfAPost =  async(postId) => {
    let commentsOfPost = [];
    try{
        const res = await fetch(`http://localhost:9999/getAllComments/${postId}`);
        commentsOfPost = await res.json();
    }
    catch(err){
        console.log("Error fetching comments from the server: ", err);
    }
    finally{
        return commentsOfPost; 
    }
}  

fetchAllPosts();