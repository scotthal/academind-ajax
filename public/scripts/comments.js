const loadCommentsBtnElement = document.querySelector("#load-comments-btn");

loadCommentsBtnElement.addEventListener("click", async () => {
  const postId = loadCommentsBtnElement.dataset.postid;
  const res = await fetch(`/posts/${postId}/comments`);
  const responseData = await res.json();
  console.log(responseData);
});
