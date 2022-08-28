const loadCommentsBtnElement = document.querySelector("#load-comments-btn");
const commentsSectionElement = document.querySelector("#comments");

const renderCommentsList = (comments) => {
  const commentListElement = document.createElement("ol");
  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
      <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
      </article>
    `;
    commentListElement.appendChild(commentElement);
  }
  return commentListElement;
};

loadCommentsBtnElement.addEventListener("click", async () => {
  const postId = loadCommentsBtnElement.dataset.postid;
  const res = await fetch(`/posts/${postId}/comments`);
  const responseData = await res.json();
  const commentsListElement = renderCommentsList(responseData);
  commentsSectionElement.innerHTML = "";
  commentsSectionElement.appendChild(commentsListElement);
});
