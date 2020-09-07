
// --------FUNCTII MODAL--------
//deschide modal-ul pentru creearea unui cont nou
function opennewaccount() {
	document.getElementById('id01').style.display = "none";
	document.getElementById('id02').style.display = "block";
	return false;
}
function openlogin() {
	document.getElementById('id02').style.display = "none";
	document.getElementById('id03').style.display = "none";
	document.getElementById('id01').style.display = "block";
	return false;
}
function openforgot() {
	document.getElementById('id01').style.display = "none";
	document.getElementById('id03').style.display = "block";
	return false;




}
//deschide modal-ul pentru resetarea parolei
function forgotpassword() {
	var modal = document.getElementById('id01');
	modal.style.display = "none";
	modal = document.getElementById('id04');
	modal.style.display = 'block';
	return false;
}
// Click in afara modal-ului => inchide fereastra
window.onclick = function (event) {
	if (event.target == document.getElementsByClassName("modal")[0] || event.target == document.getElementsByClassName("modal")[1] || event.target == document.getElementsByClassName("modal")[2] || event.target == document.getElementsByClassName("modal")[3] || event.target == document.getElementsByClassName("modal")[4]) {
		event.target.children[0].style.animationName = "animateoutzoom";
		setTimeout(function () {
			event.target.style.display = "none";
			event.target.children[0].style.animationName = "animatezoom";
		}, 300);
	}
};

function showpassvalidation() {
	document.getElementsByClassName("passvalidation")[0].style.display = "block";
};
function hidepassvalidation() {
	document.getElementsByClassName("passvalidation")[0].style.display = "none";
};
// VALIDAREA PAROLEI


// VALIDAREA PAROLEI RECOVER
$('#psw-recover').keyup(function () {

	if (RegexCifra.test(document.getElementById("psw-recover").value)) {
		document.getElementById("cifra-recover").style.textDecoration = "line-through";
	}
	else {
		document.getElementById("cifra-recover").style.textDecoration = "none";
	}
	if (RegexLitera.test(document.getElementById("psw-recover").value)) {
		document.getElementById("litera-recover").style.textDecoration = "line-through";
	}
	else {
		document.getElementById("litera-recover").style.textDecoration = "none";
	}
	if (RegexLungime.test(document.getElementById("psw-recover").value)) {
		document.getElementById("lungime-recover").style.textDecoration = "line-through";
	}
	else {
		document.getElementById("lungime-recover").style.textDecoration = "none";
	}
	if (RegexCifra.test(document.getElementById("psw-recover").value) || RegexLitera.test(document.getElementById("psw-recover").value) || RegexLungime.test(document.getElementById("psw-recover").value)) {
		document.getElementsByClassName("passvalidation")[3].style.boxShadow = "5px 0 5px -5px  #FFA600, 0 5px 5px -5px #FFA600, -5px 0 5px -5px #FFA600";
		document.getElementsByClassName("passvalidation")[3].style.backgroundColor = "#FFF3DD";
		document.getElementById("psw-recover").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementsByClassName("passvalidation")[3].style.display = "block";
		document.getElementById("parolanesigura-recover").style.display = "block";
		document.getElementById("checked1-recover").style.display = "none";
	}
	//CORECT
	if (RegexCifra.test(document.getElementById("psw-recover").value) && RegexLitera.test(document.getElementById("psw-recover").value) && RegexLungime.test(document.getElementById("psw-recover").value)) {
		document.getElementById("psw-recover").style.boxShadow = "0px 0px 5px #1B7940" //boxShadow pentru input de parola
		document.getElementsByClassName("passvalidation")[3].style.display = "none"; //ascund passvalidation
		document.getElementById("checked1-recover").style.display = "block";//arat checkmark-ul
	}
});


// VALIDAREA E-MAILULUI
var RegexEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
$('#email').keyup(function () {

	document.getElementsByClassName("sameemail")[0].style.display = "none";
	if (!RegexEmail.test(document.getElementById("email").value)) {
		document.getElementsByClassName("passvalidation")[1].style.boxShadow = "5px 0 5px -5px  #FFA600, 0 5px 5px -5px #FFA600, -5px 0 5px -5px #FFA600";
		document.getElementsByClassName("passvalidation")[1].style.backgroundColor = "#FFF3DD";
		document.getElementById("email").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementsByClassName("passvalidation")[1].style.display = "block";
		document.getElementById("checked2").style.display = "none";
		document.getElementById("createbtn").disabled = true;
	}
	//CORECT
	else {
		document.getElementById("email").style.boxShadow = "0px 0px 5px #1B7940"
		document.getElementsByClassName("passvalidation")[1].style.display = "none";
		document.getElementById("checked2").style.display = "block";
		check();
	}
});
// VALIDARE EMAIL RECOVER
$('#email-recover').keyup(function () {

	document.getElementsByClassName("sameemail")[0].style.display = "none";
	if (!RegexEmail.test(document.getElementById("email-recover").value)) {
		document.getElementsByClassName("passvalidation")[2].style.boxShadow = "5px 0 5px -5px  #FFA600, 0 5px 5px -5px #FFA600, -5px 0 5px -5px #FFA600";
		document.getElementsByClassName("passvalidation")[2].style.backgroundColor = "#FFF3DD";
		document.getElementById("email-recover").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementsByClassName("passvalidation")[2].style.display = "block";
		document.getElementById("checked2-recover").style.display = "none";
		document.getElementsByClassName("sameemail")[1].style.display = "none";
		document.getElementById("createbtn-recover").disabled = true;
	}
	//CORECT
	else {
		document.getElementById("email-recover").style.boxShadow = "0px 0px 5px #1B7940"
		document.getElementsByClassName("passvalidation")[2].style.display = "none";
		document.getElementById("checked2-recover").style.display = "block";
		document.getElementById("createbtn-recover").disabled = false;
	}
});



// VALIDAREA NUMELUI SI A PRENUMELUI
var RegexNumePrenume = /[a-zA-Z]+\s+[a-zA-Z]/
$('#numeprenume').keyup(function () {

	if (!RegexNumePrenume.test(document.getElementById("numeprenume").value)) {
		document.getElementById("numeprenume").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementById("checked").style.display = "none";
		document.getElementById("createbtn").disabled = true;
	}
	//CORECT
	else {
		document.getElementById("numeprenume").style.boxShadow = "0px 0px 5px #1B7940"
		document.getElementById("checked").style.display = "block";
		check();

	}
});


// VALIDAREA RASPUNSULUI LA INTREBARE 
var RegexRaspuns = /[a-zA-Z]/
$('#answer').keyup(function () {

	if (!RegexRaspuns.test(document.getElementById("answer").value)) {
		document.getElementById("answer").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementById("checked3").style.display = "none";
		document.getElementById("createbtn").disabled = true;
	}
	//CORECT
	else {
		document.getElementById("answer").style.boxShadow = "0px 0px 5px #1B7940"
		document.getElementById("checked3").style.display = "block";
		check();

	}
});

//VERIFICAM DACA TOATE INPUT-URILE AU FOST COMPLETATE CORECT
function check() {
	if (document.getElementById("checked").style.display == "block" && document.getElementById("checked1").style.display == "block" && document.getElementById("checked2").style.display == "block") {
		document.getElementById("createbtn").disabled = false;
	}
}

//--------USER LOGIN-----------
function login() {
	document.getElementsByClassName("notcreatedalert")[1].style.display = "none"
	document.getElementsByClassName("notcreatedalert")[0].style.display = "none"
	var xhr = new XMLHttpRequest();
	xhr.onloadend = function () {

		authbutton = document.getElementById("auth");
		authbutton.disabled = false;
		clearInterval(loading);
		authbutton.innerHTML = "Autentificare";
		if (xhr.status >= 200 && xhr.status < 300) {
			var obj = JSON.parse(xhr.response);
			if (obj == 0) {
				document.getElementsByClassName("notcreatedalert")[1].style.display = "block";
			}
			else {
				document.getElementsByClassName("createdalert")[0].style.display = "block";
				localStorage.setItem('userlogat', obj[0].Name);
				setTimeout(function () { location.reload(); }, 2000);
			}

		} else {
			document.getElementsByClassName("notcreatedalert")[0].style.display = "block";
		}
	};
	var userEmail = document.getElementById("emaillogin").value;
	var userPw = document.getElementById("passlogin").value;
	xhr.open('POST', 'https://maarc.herokuapp.com/check/' + userEmail + '&' + userPw, true);
	xhr.send();


	// Dezactivez butonul de autentificare
	authbutton = document.getElementById("auth");
	authbutton.disabled = true;
	authbutton.innerHTML = "Se încarcă ";
	loading = window.setInterval(function () {
		if (authbutton.innerHTML.length > 13)
			authbutton.innerHTML = "Se încarcă ";
		else
			authbutton.innerHTML += ".";
	}, 300);
	return false;
}

//--------USER REGISTER-----------

// Mai intai verificam daca a mai fost utilizata adresa de E-Mail
function checkemail(callback) {
	var xhr = new XMLHttpRequest();
	var ok = 1;
	document.getElementsByClassName("notcreatedalert")[2].style.display = "none";
	xhr.onloadend = function () {
		regbutton = document.getElementById("createbtn");
		regbutton.disabled = false;
		clearInterval(loading);
		regbutton.innerHTML = "Creează cont";
		if (xhr.status >= 200 && xhr.status < 300) {
			if (xhr.response.localeCompare("0")) {
				document.getElementsByClassName("sameemail")[0].style.display = "block";
				document.getElementById("email").style.boxShadow = "0px 0px 5px #ff0000"
			}
			else//email-ul nu a mai fost folosim, apelam register()
			{

				callback();
			}


		} else {
			document.getElementsByClassName("notcreatedalert")[2].style.display = "block";
			console.log('The request failed!');
		}
	};
	xhr.open('POST', 'https://maarc.herokuapp.com/check/' + document.getElementById("email").value, true);
	xhr.send();


	regbutton = document.getElementById("createbtn");
	regbutton.disabled = true;
	regbutton.innerHTML = "Se încarcă ";
	loading = window.setInterval(function () {
		if (regbutton.innerHTML.length > 13)
			regbutton.innerHTML = "Se încarcă ";
		else
			regbutton.innerHTML += ".";
	}, 300);

}
function register() {
	//Adresa de email este deja folosita



	document.getElementsByClassName("createdalert")[1].style.display = "none";
	document.getElementsByClassName("notcreatedalert")[2].style.display = "none";
	var xhr = new XMLHttpRequest();
	xhr.onloadend = function () {
		regbutton = document.getElementById("createbtn");
		regbutton.disabled = false;
		clearInterval(loading);
		regbutton.innerHTML = "Creează cont";
		if (xhr.status >= 200 && xhr.status < 300) {
			document.getElementsByClassName("createdalert")[1].style.display = "block";
			setTimeout(function () { location.reload(); }, 3000);
		} else {
			document.getElementsByClassName("notcreatedalert")[2].style.display = "block";
		}
	};
	xhr.open('POST', 'https://maarc.herokuapp.com/register/' + document.getElementById("email").value + '&' + document.getElementById("psw").value + '&' + document.getElementById("numeprenume").value + '&' + document.getElementById("question").value + '&' + document.getElementById("answer").value, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();

	regbutton = document.getElementById("createbtn");
	regbutton.disabled = true;
	regbutton.innerHTML = "Se încarcă ";
	loading = window.setInterval(function () {
		if (regbutton.innerHTML.length > 13)
			regbutton.innerHTML = "Se încarcă ";
		else
			regbutton.innerHTML += ".";
	}, 300);
	return false;
}

//--------PASSWORD RECOVER-----------
function recoveremail(callback) {
	var xhr = new XMLHttpRequest();
	document.getElementsByClassName("notcreatedalert")[3].style.display = "none";
	xhr.onloadend = function () {
		recbutton = document.getElementById("createbtn-recover");
		recbutton.disabled = false;
		clearInterval(loading);
		recbutton.innerHTML = "Continuă";
		if (xhr.status >= 200 && xhr.status < 300) {
			if (xhr.response == 0) {
				document.getElementsByClassName("sameemail")[1].style.display = "block";
				document.getElementById("email-recover").style.boxShadow = "0px 0px 5px #ff0000"
			}
			else//email-ul apartine unui cont, apelam recoverpass()
			{
				callback(JSON.parse(xhr.response)[0].Question);
			}


		} else {
			document.getElementsByClassName("notcreatedalert")[3].style.display = "block";
			console.log('The request failed!');
		}
	};
	xhr.open('POST', 'https://maarc.herokuapp.com/checkq/' + document.getElementById("email-recover").value, true);
	xhr.send();


	recbutton = document.getElementById("createbtn-recover");
	recbutton.disabled = true;
	recbutton.innerHTML = "Se încarcă ";
	loading = window.setInterval(function () {
		if (recbutton.innerHTML.length > 13)
			recbutton.innerHTML = "Se încarcă ";
		else
			recbutton.innerHTML += ".";
	}, 300);
}

function changepass() {
	var xhr = new XMLHttpRequest();
	document.getElementsByClassName("notcreatedalert")[3].style.display = "none";
	xhr.onloadend = function () {
		document.body.style.cursor = "default";
		if (xhr.status >= 200 && xhr.status < 300) {
			document.getElementsByClassName("createdalert")[2].style.display = "block";
			document.getElementById("psw-recover").disabled = true;
			document.getElementById("psw-recover").style.opacity = 0.5;



		} else {
			document.getElementsByClassName("notcreatedalert")[3].style.display = "block";
			console.log('The request failed!');
		}
	};
	xhr.open('PATCH', 'https://maarc.herokuapp.com/update/' + document.getElementById("email-recover").value + '&' + document.getElementById("psw-recover").value, true);
	xhr.send();


}

function checkans() {
	var xhr = new XMLHttpRequest();
	document.getElementsByClassName("notcreatedalert")[3].style.display = "none";
	xhr.onloadend = function () {
		document.body.style.cursor = "default";

		document.getElementsByClassName("sameemail")[2].style.display = "none";
		if (xhr.status >= 200 && xhr.status < 300) {
			if (xhr.response == 0) {
				document.getElementsByClassName("sameemail")[2].style.display = "block";
				document.getElementById("answer-recover").style.boxShadow = "0px 0px 5px #ff0000"
			}
			else//email-ul apartine unui cont, apelam recoverpass()
			{
				document.getElementById("answer-recover").style.boxShadow = "0px 0px 5px #1B7940"
				document.getElementById("answer-recover").disabled = true;
				document.getElementById("answer-recover").style.opacity = 0.5;
				document.getElementById("checked2-recover1").style.display = "block";
				document.getElementById("createbtn-recover").disabled = false;
				document.getElementById("psw-recover").style.display = "block";
				document.getElementById("PassText").style.display = "block";
				document.getElementsByClassName("modal-content animate")[2].addEventListener('submit',
					changepass);
			}


		} else {
			document.getElementsByClassName("notcreatedalert")[3].style.display = "block";
			console.log('The request failed!');
		}
	};
	xhr.open('POST', 'https://maarc.herokuapp.com/checka/' + document.getElementById("email-recover").value + '&' + document.getElementById("answer-recover").value, true);
	xhr.send();

}

function recoverpass(questionNo) {
	document.getElementById("email-recover").disabled = true;
	document.getElementById("email-recover").style.opacity = 0.5;
	p = document.getElementById("QuestionText");
	p.style.display = "block";
	document.getElementById("answer-recover").style.display = "block";
	switch (questionNo) {
		case 1:
			p.innerHTML = "Care era porecla dvs. în copilărie?"
			break;
		case 2:
			p.innerHTML = "Care este numele primei dvs. școli?"
			break;

		case 3:
			p.innerHTML = "Care este numele localității în care s-au întâlnit părinții dvs.?"
			break;

		case 4:
			p.innerHTML = "Care era numele primului dvs. animal de companie?"
			break;

		case 5:
			p.innerHTML = "Care este numele localității în care v-ați născut?"
			break;

		case 6:
			p.innerHTML = "Care este prenumele celui mai în vârsta văr al dvs.?"
			break;

		default:
			console.log("Something's wrong!!!")
			break;
	}
	document.getElementsByClassName("modal-content animate")[2].addEventListener('submit',
		checkans);

}



$("#id01").submit(function (e) {
	e.preventDefault();
});
$("#id02").submit(function (e) {
	e.preventDefault();
});
$("#id03").submit(function (e) {
	e.preventDefault();
});
$("#id04").submit(function (e) {
	e.preventDefault();
});
$("#id05").submit(function (e) {
	e.preventDefault();
});
$("#contact-form").submit(function (e) {
	e.preventDefault();
});
function auto_grow(element) {
	element.style.height = "5px";
	element.style.height = (element.scrollHeight) + "px";
}


