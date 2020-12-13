var btnGetJoke = document.getElementById("btnGetJoke").addEventListener("click", getData);
var btnPostJoke = document.getElementById("btnPostJoke").addEventListener("click", postData);
var items = document.querySelectorAll("#jokeList li");
var tab = [], index;				 
var divGet = document.getElementById("apiGetDiv");
var divpost = document.getElementById("apiPostDiv");
var divjokeBody = document.getElementById("jokeBody");
var divReligious = document.getElementById("religious");
var divPolitical = document.getElementById("political");
var divRacist = document.getElementById("racist");
var divSexist = document.getElementById("sexist");

for(var i = 0; i < items.length; i++){
 tab.push(items[i].innerHTML);
}

// get li index onclick
for(var i = 0; i < items.length; i++){
 
 items[i].onclick = function(){
	 index = tab.indexOf(this.innerHTML);
	 console.log(this.innerHTML + " INDEX = " + index);
 };
 
}

async function getData(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		let data = JSON.parse(this.responseText);
		//console.log(data);
			if(data.error == false){
				divGet.innerHTML = data.setup + " \n" + data.delivery;
			}
		}
	};
	xhr.open("GET", "https://sv443.net/jokeapi/v2/joke/Any", true);
	xhr.send();
}
/*
{
    "formatVersion": 3,
    "category": "Miscellaneous",
    "type": "single",
    "joke": "A horse walks into a bar...",
    "flags": {
        "nsfw": true,
        "religious": false,
        "political": true,
        "racist": false,
        "sexist": false
    },
    "lang": "en"
}
*/
async function postData(){
	console.log(divjokeBody.value);
	console.log(divSexist.checked);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
		
	  let data = JSON.parse(this.responseText);	
	  if(data.erroe)
		divpost.innerHTML = "Joke can not be submitted";
	  else
		divpost.innerHTML = "Joke has been submitted, please wait for Review";
    }
  };
	xhr.open("post", "https://sv443.net/jokeapi/v2/submit", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
}

function refreshArray()
{
	
	console.log(tab);
	tab.length = 0;
	items = document.querySelectorAll("#jokeList li");
	
	for(var i = 0; i < items.length; i++){
	 tab.push(items[i].innerHTML);
   }
}
function addJoke(){
	console.log(divGet.innerHTML);
	var listNode = document.getElementById("jokeList"),
		textNode = document.createTextNode(divGet.innerHTML),
		liNode = document.createElement("LI");		
		liNode.appendChild(textNode);
		listNode.appendChild(liNode);		
		refreshArray();
		
		// add event to the new LI		
		liNode.onclick = function(){
		 index = tab.indexOf(liNode.innerHTML);
		 console.log(liNode.innerHTML + " INDEX = " + index);
	};
		
}
  
function deleteJoke(){	  
	  refreshArray();
	  if(items.length > 0){
		  items[index].parentNode.removeChild(items[index]);
	  }
}

function ValidationForm() {
// Storing Field Values In Variables
if(document.getElementById("name") == null || document.getElementById("email") == null || document.getElementById("userPassword") == null ) {
	alert("fill All fields are required(dashed Input).....!");
	return false;
}
else
{	
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var myPassword = document.getElementById("userPassword").value;
// Regular Expression For Email
var emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// Conditions
console.log(myPassword);
console.log(name);
console.log(myPassword.length);
if (name != '' && email != '' && myPassword != '') {
if (email.match(emailReg)) {
if (myPassword.length > 7 && name.length > 1) {
alert("All type of validation has done on OnSubmit event.");
return true;
} else {
if (name.length < 2) {
alert("invalid Name Length... Minimum 2 characters");
return false;
}
alert("The password must be at least 8 digit long!");
return false;
}
} else {
alert("Invalid Email Address...!!!");
return false;
}
} else {
alert("fill All fields are required(dashed Input).....!");
return false;
}
}
}