const loadCommentsBtnElement = document.querySelector("#load-comments-btn");
const commentsSectionElement = document.querySelector("#comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.querySelector("#title");
const commentTextElement = document.querySelector("#text");

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

commentsFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  const postId = commentsFormElement.dataset.postid;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  fetch(`/posts/${postId}/comments`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(comment),
  });
});
