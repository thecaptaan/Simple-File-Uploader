const filename = document.getElementById("filename");
const filesize = document.getElementById("filesize");
const filetype = document.getElementById("filetype");
const FileInput = document.getElementById("fileuploadinput");
const formError = document.getElementById("formError");
const fileForm = document.getElementById("fileForm");
const formbtn = document.getElementById('formbtn')

FileInput.addEventListener("change", () => {
	console.log(FileInput.files)
	if (FileInput.files.length == 0) {
		console.log(0);
	} else {
		console.log(FileInput.files[0]);
		formError.style.display = "none";
		formError.innerText = ``;
		let megabytes = FileInput.files[0].size / 1024 / 1024;
		let kilobytes = FileInput.files[0].size / 1000;
		let extenstion = FileInput.files[0].name.split(".");

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
		filetype.innerHTML = `<div>File Type:</div> <div>${extenstion[extenstion.length - 1]
			}</div>`;
	}
});

fileForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (FileInput.files.length == 0) {
		formError.style.display = "block";
		formError.innerText = `Upload Something First to submit.`;
	} else {
		formbtn.innerText = `In Progress...`
		let formData = new FormData();
		let imagefile = FileInput.files[0];
		console.log(formData)
		formData.append("fileuploadinput", imagefile);
		axios.post('/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(
			data => {
				window.location = "/"
			}
		).catch(error => {

		})
	}
});
