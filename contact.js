function send_message() {  //SEND CONTACT MESSAGES
	document.getElementsByClassName("createdalert")[2].style.display = "none";
	document.getElementsByClassName("notcreatedalert")[4].style.display = "none";
	var xhr = new XMLHttpRequest();
	xhr.onloadend = function () {
		sendbutton = document.getElementById("send-contact");
		sendbutton.disabled = false;
		clearInterval(loading);
		sendbutton.innerHTML = "Creează cont";
		if (xhr.status >= 200 && xhr.status < 300) {
			document.getElementsByClassName("createdalert")[2].style.display = "block";
			console.log("sS");
			// setTimeout(function(){ location.reload(); }, 1000);	
		} else {
			document.getElementsByClassName("notcreatedalert")[4].style.display = "block";
		}
	};
	xhr.open('POST', 'https://maarc.herokuapp.com/sendmessage?message=' + document.getElementById("subiect").value + "&name=" + document.getElementById("numeprenume-contact").value + "&email=" + document.getElementById("email-contact").value, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();

	sendbutton = document.getElementById("send-contact");
	sendbutton.disabled = true;
	sendbutton.innerHTML = "Se încarcă ";
	loading = window.setInterval(function () {
		if (sendbutton.innerHTML.length > 13)
			sendbutton.innerHTML = "Se încarcă ";
		else
			sendbutton.innerHTML += ".";
	}, 300);
	return false;
}



// VALIDAREA E-MAILULUI
var RegexEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
$('#email-contact').keyup(function () {

	document.getElementsByClassName("sameemail")[0].style.display = "none";
	console.log("da")
	if (!RegexEmail.test(document.getElementById("email-contact").value)) {
		document.getElementsByClassName("passvalidation")[4].style.boxShadow = "5px 0 5px -5px  #FFA600, 0 5px 5px -5px #FFA600, -5px 0 5px -5px #FFA600";
		document.getElementsByClassName("passvalidation")[4].style.backgroundColor = "#FFF3DD";
		document.getElementById("email-contact").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementsByClassName("passvalidation")[4].style.display = "block";
		document.getElementById("checked2").style.display = "none";
		document.getElementById("send-contact").disabled = true;
		document.getElementById("send-contact").style.opacity = 0.5;
		document.getElementById("send-contact").style.cursor = "not-allowed";
	}
	//CORECT
	else {
		document.getElementById("email-contact").style.boxShadow = "0px 0px 5px #1B7940"
		document.getElementsByClassName("passvalidation")[4].style.display = "none";
		document.getElementById("checked2-contact").style.display = "block";
		check_contact();
	}
});

// VALIDARE Nume Prenume
var RegexNumePrenume = /[a-zA-Z]+\s+[a-zA-Z]/
$('#numeprenume-contact').keyup(function () {

	if (!RegexNumePrenume.test(document.getElementById("numeprenume-contact").value)) {
		document.getElementById("numeprenume-contact").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementById("checked-contact").style.display = "none";
		document.getElementById("send-contact").disabled = true;
		document.getElementById("send-contact").style.opacity = 0.5;
		document.getElementById("send-contact").style.cursor = "not-allowed";
	}
	//CORECT
	else {
		document.getElementById("numeprenume-contact").style.boxShadow = "0px 0px 5px #1B7940"
		document.getElementById("checked-contact").style.display = "block";
		check_contact();

	}
});

function check_contact() {
	if (document.getElementById("checked-contact").style.display == "block" && document.getElementById("checked2-contact").style.display == "block") {
		document.getElementById("send-contact").disabled = false;
		document.getElementById("send-contact").style.opacity = 1;
		document.getElementById("send-contact").style.cursor = "pointer";
	}
}