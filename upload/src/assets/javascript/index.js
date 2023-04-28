//! Get Element By ID
const filename = document.getElementById("filename");
const filesize = document.getElementById("filesize");
const filetype = document.getElementById("filetype");
const FileInput = document.getElementById("fileuploadinput");
const formError = document.getElementById("formError");
const fileForm = document.getElementById("fileForm");
const formbtn = document.getElementById("formbtn");
const studentID = document.getElementById("studentID");
const uploadToken = document.getElementById("uploadToken");

FileInput.addEventListener("change", () => {
  if (FileInput.files.length == 0) {
  } else {
    formError.style.display = "none";
    formError.innerText = ``;
    let megabytes = FileInput.files[0].size / 1024 / 1024;
    let kilobytes = FileInput.files[0].size / 1000;
    let extension = FileInput.files[0].name.split(".");

    filename.innerHTML = `<div>File Name:</div> <div>${FileInput.files[0].name}</div>`;
    if (megabytes > 1) {
      filesize.innerHTML = `<div>File Size:</div> <div>${Math.round(
        megabytes
      ).toFixed(2)} mb</div>`;
    } else {
      filesize.innerHTML = `<div>File Size:</div> <div>${Math.round(
        kilobytes
      ).toFixed(2)} kb</div>`;
    }

    // filetype.innerHTML = `<div>File Type:</div> <div>${files[0].type}</div>`;
    filetype.innerHTML = `<div>File Type:</div> <div>${
      extension[extension.length - 1]
    }</div>`;
  }
});

//! Form Event Handler
fileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let result = isAllPresent();
  if (!result) {
  } else {
    formbtn.innerText = `Uploading Assignment...`;
    let formData = new FormData();
    let imageFile = FileInput.files[0];
    // console.log(FileInput.files[0]);
    console.log(imageFile);

    formData.append("fileuploadinput", imageFile);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    formData.append("studentID", studentID.value);
    formData.append("uploadToken", uploadToken.value);
    console.log(formData.get("fileuploadinput"));
    console.log(formData.get("studentID"));
    console.log(formData.get("uploadToken"));
    axios
      .post("/upload", formData, {
        header: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.data.success) {
          emptyValues();
          alertify.success("Successfully uploaded to the server");
        } else {
          emptyValues();
          alertify.error(result.data.error);
          formError.innerText = "Error Occurred";
        }
      })
      .catch((error) => {
        emptyValues();
        alertify.error("internal Goes Wrong");
        formError.innerText = "internal Occurred";
      });
  }
});

function isAllPresent() {
  if (FileInput.files.length == 0) {
    formError.style.display = "block";
    formError.innerText = "Upload your assignment";
    return false;
  } else if (studentID.value == "") {
    formError.style.display = "block";
    formError.innerText = "Fill your Student ID";
    return false;
  } else if (uploadToken.value == "") {
    formError.style.display = "block";
    formError.innerText = "Fill your Upload Token";
    return false;
  } else {
    return true;
  }
}

function emptyValues() {
  return (
    (studentID.value = ""),
    (uploadToken.value = ""),
    (filetype.innerHTML = `<div>File Type:</div> <div>?</div>`),
    (filesize.innerHTML = `<div>File Size:</div> <div>?</div>`),
    (filename.innerHTML = `<div>File Name:</div> <div>?</div>`),
    (FileInput.value = ""),
    (formbtn.innerText = `Upload Assignment`)
  );
}
