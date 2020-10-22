import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delBtn = document.querySelectorAll(".jsDeleteIcon");

const deleteComment = async (event) => {
    const videoId = window.location.href.split("/videos/")[1].split("?")[0]
    const targetLi = event.target.parentNode;
    const commentId = targetLi.classList.value;
    const response = await axios({
        url: `/api/${videoId}/comment/delete`,
        method: "POST",
        data: {
            commentId
        }
    });
    if (response.status === 200){
        commentList.removeChild(targetLi);
        decreseViewNumber();
    }
}



const increseViewNumber = () => {
    const currnetNumber = commentNumber.innerText.split(" ")[0] === "No"? "0" : commentNumber.innerText.split(" ")[0]
    const updatedNumber = parseInt(currnetNumber) +1;
    if (updatedNumber === 1) {
        commentNumber.innerText = "1 comment";
    } else {
        commentNumber.innerText = `${updatedNumber} comments`
    }
}

const decreseViewNumber = () => {
    const currnetNumber = commentNumber.innerText.split(" ")[0] === "No"? "0" : commentNumber.innerText.split(" ")[0]
    const updatedNumber = parseInt(currnetNumber) -1;
    if (updatedNumber === 1) {
        commentNumber.innerText = "1 comment";
    } else if (updatedNumber === 0) {
        commentNumber.innerText = "No comments";
    } else {
        commentNumber.innerText = `${updatedNumber} comments`
    }
}

const addComment = (comment) => {
    const avatar = document.getElementById("jsLoggedUserAvatarUrl");
    const name = document.getElementById("jsLoggedUserName");

    const img = document.createElement("img");
    img.setAttribute("class", "comment-avatar");
    img.setAttribute("src", `/${avatar.innerHTML}`);
    const li = document.createElement("li");
    const nameSpan = document.createElement("span");
    nameSpan.setAttribute("class", "comment-creator");
    const textSpan = document.createElement("span");
    textSpan.setAttribute("class", "commet-text");
    const i = document.createElement("i");
    i.setAttribute("class", "far fa-trash-alt");
    i.addEventListener("click", deleteComment);
    textSpan.innerText = comment;
    nameSpan.innerText = name.innerText;
    li.appendChild(img);
    li.appendChild(nameSpan);
    li.appendChild(textSpan);
    li.appendChild(i);
    commentList.prepend(li);
    increseViewNumber();
}

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1].split("?")[0]
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if (response.status === 200) {
        addComment(comment);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
    commentInput.focus();
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
    delBtn.forEach( btn => btn.addEventListener("click", deleteComment)); 
}

if (addCommentForm) {
    init();
}