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

const commentError = (message) => {
  commentsSectionElement.innerHTML = "";
  const errorParagraphElement = document.createElement("p");
  errorParagraphElement.textContent = message;
  commentsSectionElement.appendChild(errorParagraphElement);
};

const loadComments = async () => {
  const postId = loadCommentsBtnElement.dataset.postid;
  try {
    const res = await fetch(`/posts/${postId}/comments`);
    if (!res.ok) {
      commentError("Unable to load comments.");
      return;
    }

    const responseData = await res.json();
    if (responseData && responseData.length > 0) {
      const commentsListElement = renderCommentsList(responseData);
      commentsSectionElement.innerHTML = "";
      commentsSectionElement.appendChild(commentsListElement);
    } else {
      commentError("There aren't any comments.");
    }
  } catch (error) {
    commentError("Unable to load comments.");
  }
};

loadCommentsBtnElement.addEventListener("click", loadComments);

const commentSubmissionError = () => {
  commentsSectionElement.innerHTML = "";
  const errorParagraphElement = document.createElement("p");
  errorParagraphElement.textContent = "Unable to submit comment.";
  commentsSectionElement.appendChild(errorParagraphElement);
};

commentsFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  const postId = commentsFormElement.dataset.postid;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(comment),
    });

    if (response.ok) {
      loadComments();
    } else {
      commentError("Unable to submit comment.");
    }
  } catch (error) {
    commentError("Unable to submit comment.");
  }
});
