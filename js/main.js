fetch("./js/data.json")
  .then((result) => {
    return result.json();
  })
  .then((allData) => {
    // Create Comments Container
    let commentsContainer = document.createElement("div");
    commentsContainer.className = "comments-container";

    // Create Comment Body
    let commentBody = document.createElement("div");
    commentBody.className = "comment-body";

    // Create Comments & Replies
    for (let i = 0; i < allData.comments.length; i++) {
      commentBody.appendChild(
        createComment(
          allData.comments[i].score,
          allData.comments[i].user.image.webp,
          allData.comments[i].user.username,
          false,
          allData.comments[i].createdAt,
          false,
          true,
          false,
          allData.comments[i].content
        )
      );
      if (allData.comments[i].replies.length > 0) {
        for (let j = 0; j < allData.comments[i].replies.length; j++) {
          let reply = document.createElement("div");
          reply.className = "reply";
          if (
            allData.comments[i].replies[j].user.username ===
            allData.currentUser.username
          ) {
            reply.appendChild(
              createComment(
                allData.comments[i].replies[j].score,
                allData.comments[i].replies[j].user.image.webp,
                allData.comments[i].replies[j].user.username,
                true,
                allData.comments[i].replies[j].createdAt,
                true,
                false,
                true,
                `<span class="replying-to">@${allData.comments[i].replies[j].replyingTo}</span> ${allData.comments[i].replies[j].content}`
              )
            );
          } else {
            reply.appendChild(
              createComment(
                allData.comments[i].replies[j].score,
                allData.comments[i].replies[j].user.image.webp,
                allData.comments[i].replies[j].user.username,
                false,
                allData.comments[i].replies[j].createdAt,
                false,
                true,
                false,
                `<span class="replying-to">@${allData.comments[i].replies[j].replyingTo}</span> ${allData.comments[i].replies[j].content}`
              )
            );
          }
          commentBody.appendChild(reply);
        }
      }
    }

    commentsContainer.appendChild(commentBody);

    // Create Add Comment
    let addComment = document.createElement("div");
    addComment.className = "add-comment";
    addComment.innerHTML = `
    <img class="user-img" src="${allData.currentUser.image.webp}" />
    <textarea
      id="comment-area"
      class="comment-area"
      placeholder="Add a comment..."
    ></textarea>
    <button class="submit" id="send">send</button>`;

    commentsContainer.appendChild(addComment);

    document.body.appendChild(commentsContainer);
  });

function createComment(
  score,
  img,
  username,
  spanActive,
  createdAt,
  delActive,
  replyActive,
  editActive,
  content
) {
  let comment = document.createElement("div");
  comment.className = "comment";
  comment.innerHTML += `
  <div class="score">
    <div class="icon plus">
      <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
        />
      </svg>
    </div>
    <span class="counter" data-score="${score}">${score}</span>
    <div class="icon minus">
      <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
        />
      </svg>
    </div>
  </div>
  <div class="content">
    <div class="header">
      <div class="user-info">
        <img
          class="user-img"
          id="user-img"
          src="${img}"
        />
        <p class="username" id="username">${username}</p>
        <span class="you ${spanActive ? "active" : ""}">You</span>
        <span class="createdAt" id="createdAt">${createdAt}</span>
      </div>
      <div class="btns">
        <button class="del-btn ${delActive ? "active" : ""}" id="delete">
          <svg
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
            />
          </svg>
          Delete
        </button>
        <button class="reply-btn ${replyActive ? "active" : ""}" id="reply">
          <svg
            width="14"
            height="13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
            />
          </svg>
          Reply
        </button>
        <button class="edit-btn ${editActive ? "active" : ""}" id="edit">
        <svg
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
          />
        </svg>
        Edit
      </button>
      </div>
    </div>
    <p class="txt">${content}</p>
  </div>`;
  return comment;
}

document.addEventListener("click", function (e) {
  if (e.target.id === "send") {
    let commentArea = document.getElementById("comment-area");
    if (commentArea.value !== "") {
      fetch("./js/data.json")
        .then((result) => {
          return result.json();
        })
        .then((allData) => {
          document
            .querySelector(".comment-body")
            .appendChild(
              createComment(
                0,
                allData.currentUser.image.webp,
                allData.currentUser.username,
                true,
                "seconds ago",
                true,
                false,
                true,
                commentArea.value
              )
            );
          commentArea.value = "";
        });
    }
  } else if (e.target.id === "delete") {
    let overlay = document.createElement("div");
    overlay.className = "overlay";

    let confirmBox = document.createElement("div");
    confirmBox.className = "confirm-box";

    let deleteComment = document.createElement("p");
    deleteComment.className = "delete-comment";
    deleteComment.innerText = "Delete comment";
    confirmBox.appendChild(deleteComment);

    let commentMsg = document.createElement("p");
    commentMsg.className = "comment-msg";
    commentMsg.innerText =
      "Are you sure you want to delete this comment? This Will Remove the comment and can't be undone.";
    confirmBox.appendChild(commentMsg);

    let btns = document.createElement("div");
    btns.className = "btns";
    let no = document.createElement("button");
    no.className = "no";
    no.innerText = "no, cancel";
    btns.appendChild(no);
    let yes = document.createElement("button");
    yes.className = "yes";
    yes.innerText = "yes, delete";
    btns.appendChild(yes);
    confirmBox.appendChild(btns);

    document.body.appendChild(overlay);
    document.body.appendChild(confirmBox);

    yes.onclick = function () {
      let comments = document.querySelectorAll(".comment");
      comments.forEach((comment) => {
        if (comment.contains(e.target)) {
          comment.parentElement.className === "reply"
            ? comment.parentElement.remove()
            : comment.remove();
          confirmBox.remove();
          overlay.remove();
        }
      });
    };
    no.onclick = function () {
      confirmBox.remove();
      overlay.remove();
    };
  } else if (e.target.id === "edit") {
    let comments = document.querySelectorAll(".comment");
    comments.forEach((comment) => {
      if (
        comment.contains(e.target) &&
        !comment.contains(document.querySelector("#update"))
      ) {
        let textarea = document.createElement("textarea");
        textarea.className = "edit-comment";
        textarea.id = "edit-comment";
        textarea.innerHTML = comment.children[1].children[1].textContent;
        comment.children[1].replaceChild(
          textarea,
          comment.children[1].children[1]
        );
        textarea.style.height = textarea.scrollHeight + 5 + "px";
        textarea.focus();

        let updateBtn = document.createElement("button");
        updateBtn.className = "update";
        updateBtn.id = "update";
        updateBtn.appendChild(document.createTextNode("update"));
        comment.children[1].appendChild(updateBtn);

        updateBtn.onclick = function () {
          let paragraph = document.createElement("p");
          paragraph.className = "txt";
          console.log();
          paragraph.innerHTML =
            `<span class="replying-to">${
              textarea.value.split(" ")[0]
            }</span> ` + textarea.value.split(" ").slice(1).join(" ");
          comment.children[1].replaceChild(paragraph, textarea);
          updateBtn.remove();
        };
      }
    });
  } else if (e.target.id === "reply") {
    let comments = document.querySelectorAll(".comment");
    comments.forEach((comment) => {
      if (comment.contains(e.target)) {
        console.log(comment.nextElementSibling === null);
        if (
          comment.nextElementSibling === null ||
          !(comment.nextElementSibling.children[0].className === "add-comment")
        ) {
          let reply = document.createElement("div");
          reply.className = "reply";
          let addComment = document
            .querySelector(".add-comment")
            .cloneNode(true);
          addComment.children[2].innerHTML = "reply";
          addComment.children[2].id = "send-reply";
          reply.appendChild(addComment);
          comment.after(reply);
          let sendReplyBtn = document.getElementById("send-reply");
          sendReplyBtn.onclick = function () {
            fetch("./js/data.json")
              .then((result) => {
                return result.json();
              })
              .then((allData) => {
                if (addComment.children[1].value !== "") {
                  reply.replaceChild(
                    createComment(
                      0,
                      allData.currentUser.image.webp,
                      allData.currentUser.username,
                      true,
                      "seconds ago",
                      true,
                      false,
                      true,
                      `<span class="replying-to">@${comment.children[1].children[0].children[0].children[1].innerHTML} </span>${addComment.children[1].value}`
                    ),
                    reply.children[0]
                  );
                }
              });
          };
        }
        // !(comment.nextElementSibling.children[0].className === "add-comment")
      }
    });
  } else if (e.target.classList.contains("plus")) {
    if (
      e.target.nextElementSibling.dataset.score ==
        e.target.nextElementSibling.innerHTML ||
      +e.target.nextElementSibling.dataset.score - 1 ==
        e.target.nextElementSibling.innerHTML
    ) {
      e.target.nextElementSibling.innerHTML++;
    }
  } else if (e.target.classList.contains("minus")) {
    if (
      e.target.previousElementSibling.dataset.score ==
        e.target.previousElementSibling.innerHTML ||
      +e.target.previousElementSibling.dataset.score + 1 ==
        e.target.previousElementSibling.innerHTML
    ) {
      e.target.previousElementSibling.innerHTML--;
    }
  }
});
