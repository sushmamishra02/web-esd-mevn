

const api_url = "https://web-final-esd.herokuapp.com/user"
//const api_url = "http://localhost:8080/user"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].title}</td>`;
		table_data += `<td>${records[i].category}</td>`;
		table_data += `<td>${records[i].movie_name}</td>`;
		table_data += `<td>${records[i].content}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("title").value = data.title;
		document.getElementById("category").value = data.category;
		document.getElementById("movie_name").value = data.movie_name;
		document.getElementById("content").value = data.content;
	})
}


function postData() {
	var title = document.getElementById("title").value;
	var category = document.getElementById("category").value;
	var movie_name = document.getElementById("movie_name").value;
	var content = document.getElementById("content").value;
	
	data = {title:title, category:category, movie_name:movie_name, content:content};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "indexx.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var title = document.getElementById("title").value;
	var category = document.getElementById("category").value;
	var movie_name = document.getElementById("movie_name").value;
	var content = document.getElementById("content").value;
	
	
	data = {_id: _id, title:title, category:category, movie_name:movie_name, content:content};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "indexx.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}