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
var errorText = "";

for(var i = 0; i < items.length; i++){
	tab.push(items[i].innerHTML);
}

// get li index onclick
for(var i = 0; i < items.length; i++){
 
	items[i].onclick = function(){
		index = tab.indexOf(this.innerHTML);
		
		//console.log(this.innerHTML + " INDEX = " + index);
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
	const params = {
			"formatVersion": 3,
			"category": "Miscellaneous",
			"type": "single",
            "joke": htmlEscape(divjokeBody.value),
			"flags": {
				"nsfw": !divReligious.checked && !divPolitical.checked && !divRacist.checked && !divSexist.checked ,
				"religious": divReligious.checked,
				"political": divPolitical.checked,
				"racist": divRacist.checked,
				"sexist": divSexist.checked
			},
			"lang": "en"
        }
	
	var xhr = new XMLHttpRequest();	
	
	xhr.onreadystatechange = function() {
			console.log(this.status);
			console.log(this.readyState);
    if (this.readyState == 4 && this.status == 201) {
		console.log('this.readyState');
		let data = JSON.parse(this.responseText);	
			if(data.erroe)
				divpost.innerHTML = "Joke can not be submitted";
			else
				divpost.innerHTML = "Joke has been submitted, please wait for Review";
    }
	else {
		divpost.innerHTML = "Error Code: " + this.status + " (please contact the administrator)";
	}
  };
	console.log('put1');
	xhr.open("put", "https://sv443.net/jokeapi/v2/submit", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	console.log('put2');
	xhr.send(JSON.stringify(params));
}

function refreshArray()
{	
	//console.log(tab);
	tab.length = 0;
	items = document.querySelectorAll("#jokeList li");
	
	for(var i = 0; i < items.length; i++){
	 tab.push(items[i].innerHTML);
   }
}
function addJoke(){
	//console.log(divGet.innerHTML);
	var listNode = document.getElementById("jokeList"),
		textNode = document.createTextNode(divGet.innerHTML),
		liNode = document.createElement("LI");		
		liNode.appendChild(textNode);		
		listNode.appendChild(liNode);		
		refreshArray();
		
		// add event to the new LI		
		liNode.onclick = function(){
		index = tab.indexOf(liNode.innerHTML);
		//console.log(liNode.innerHTML + " INDEX = " + index);
	};
		
}

function deleteJoke(){	  
	  refreshArray();
	  if(items.length > 0){
		  items[index].parentNode.removeChild(items[index]);
	  }
}

function ValidationForm() {
	console.log(errorText);
	errorText = '';	
	
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var myPassword = document.getElementById("userPassword").value;
	// Regular Expression For Email
	var emailReg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	if (name == '' || name.length < 2) {
		errorText += '<BR>' + 'invalid Name Length... Minimum 2 characters';
		console.log('name');
	}
	if (email == '' || !email.match(emailReg)) {
		errorText += '<BR>' + 'Invalid Email Address...!!!';
		console.log('email');
	}
	if (myPassword == '' || myPassword.length < 8) {
		errorText += '<BR>' + 'The password must be at least 8 digit long!';
		console.log('pass');
	}	
	
	console.log(errorText);
	if(errorText != '') {
		document.getElementById("errorMessage").innerHTML = errorText;
		return false;
	}
	else {
		document.getElementById("errorMessage").innerHTML = 'Form is Valid';
		return true;
	}
}

function filterJokes() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchField");
    filter = input.value.toUpperCase();
    ul = document.getElementById("jokeList");
	//console.log(ul.innerHTML);
    li = ul.getElementsByTagName("li");	
    for (i = 0; i < li.length; i++) {
		//console.log(li[0].innerText);
        txtValue = li[i].innerText || li[i].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }		
    }
}

function buildSubmission()
{
    var category = gebid("f_category").value;
    var type = gebid("f_type").value;

    submission = {
        formatVersion: settings.formatVersion,
        category: category,
        type: type
    }

    if(type == "single")
    {
        submission.joke = gebid("f_setup").value;
    }
    else if(type == "twopart")
    {
        submission.setup = gebid("f_setup").value;
        submission.delivery = gebid("f_delivery").value;
    }

    var sLang = gebid("f_language").value || settings.defaultLang;

    if(sLang == "other")
    {
        var elVal = gebid("f_customLang").value;
        if(elVal && elVal.length == 2)
        {
            sLang = elVal;
        }
        else
        {
            sLang = "Please enter 2 char language code";
        }
    }

    submission = {
        ...submission,
        flags: {
            nsfw: gebid("f_flags_nsfw").checked,
            religious: gebid("f_flags_religious").checked,
            political: gebid("f_flags_political").checked,
            racist: gebid("f_flags_racist").checked,
            sexist: gebid("f_flags_sexist").checked,
        },
        lang: sLang
    };

    var subDisp = gebid("submissionDisplay");

    var escapedSubmission = JSON.parse(JSON.stringify(submission)); // copy value without reference
    if(type == "single")
    {
        escapedSubmission.joke = htmlEscape(submission.joke);
    }
    else if(type == "twopart")
    {
        escapedSubmission.setup = htmlEscape(submission.setup);
        escapedSubmission.delivery = htmlEscape(submission.delivery);
    }
    subDisp.innerText = JSON.stringify(escapedSubmission, null, 4);

    var subCodeElem = gebid("submissionCodeElement");

    if(!subCodeElem.classList.contains("prettyprint"))
    {
        subCodeElem.classList.add("prettyprint");
    }

    if(subCodeElem.classList.contains("prettyprinted"))
    {
        subCodeElem.classList.remove("prettyprinted");
    }

    if(subCodeElem.classList.contains("lang-json"))
    {
        subCodeElem.classList.remove("lang-json");
    }

    subCodeElem.classList.add("lang-json");

    setTimeout(function() {
        PR.prettyPrint(); // eslint-disable-line no-undef
    }, 5);
}

/**
 * Escapes unsafe HTML
 * @param {String} unsafeHTML
 * @returns {String}
 */
function htmlEscape(unsafeHTML)
{
    unsafeHTML = unsafeHTML.replace(/</g, "&lt;");
    unsafeHTML = unsafeHTML.replace(/>/g, "&gt;");

    return unsafeHTML;
}