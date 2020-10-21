import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increseViewNumber = () => {
    const currnetNumber = commentNumber.innerText.split(" ")[0] === "No"? "0" : commentNumber.innerText.split(" ")[0]
    const updatedNumber = parseInt(currnetNumber) +1;
    if (updatedNumber === 1) {
        commentNumber.innerText = "1 comment";
    } else {
        commentNumber.innerText = `${updatedNumber} comments`
    }


}

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = comment;
    li.appendChild(span);
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
    
}

if (addCommentForm) {
    init();
}