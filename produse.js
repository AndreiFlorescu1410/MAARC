


function GetSites(parameteres) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {

		if (xhr.status >= 200 && xhr.status < 300) {
			var obj = JSON.parse(xhr.response);
			for (var i = 0; i < obj.length; i++) {

				var tr = document.createElement("tr");

				var td = document.createElement("td");


				var img = document.createElement("img");
				img.setAttribute("src", obj[i].prodimg);
				img.height = "100";
				td.appendChild(img);
				tr.appendChild(td);

				var td = document.createElement("td");
				td.innerHTML = "Telefon Mobil " + obj[i].prodtitle;
				tr.appendChild(td);



				var td = document.createElement("td");
				var a = document.createElement("a");
				a.classList.add("prodprice");
				a.innerHTML = "de la " + obj[i].price + " Lei";
				td.appendChild(a);
				var br = document.createElement("br");
				td.appendChild(br);
				tr.appendChild(td);

				var td = document.createElement("td");
				var a1 = document.createElement("a");
				a1.href = "/produs.html?idprod=" + obj[i].idproducts

				var btn = document.createElement("button");
				btn.innerHTML = "Mai multe detalii!";


				a1.appendChild(btn);

				td.appendChild(a1);
				tr.appendChild(td);
				document.getElementsByClassName("stores")[0].appendChild(tr);
			}
		} else {
			console.log('The request failed!');
		}
	};
	xhr.open("POST", 'https://maarc.herokuapp.com/search?prodtitle=' + parameteres, true);
	xhr.send();

}

function GetParams() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const product = urlParams.get('search');
	GetSites(product)
}



GetParams()



$('#produrl').keyup(function () {
	if (this.value.match(/\.(jpeg|jpg|gif|png)$/) == null) {
		document.getElementsByClassName("passvalidation")[4].style.display = "block";
		document.getElementById("new-image").style.display = "none";
		document.getElementById("new-image-p").style.display = "none";
		document.getElementById("new-image-alert").innerHTML = "Adresă url invalidă.";
		document.getElementsByClassName("passvalidation")[4].style.boxShadow = "5px 0 5px -5px  #FFA600, 0 5px 5px -5px #FFA600, -5px 0 5px -5px #FFA600";
		document.getElementsByClassName("passvalidation")[4].style.backgroundColor = "#FFF3DD";
		document.getElementById("produrl").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementsByClassName("passvalidation")[4].style.display = "block";
		document.getElementById("createbtn-add1").disabled = true;
	}
	else {
		document.getElementById("produrl").style.boxShadow = "0px 0px 5px #1B7940"
		document.getElementsByClassName("passvalidation")[4].style.display = "none";
		document.getElementById("checked5").style.display = "block";
		document.getElementById("new-image").setAttribute("src", this.value);
		check_add()
	}


});

$("#new-image")
	.on('load', function () {
		document.getElementById("new-image").style.display = "block";
		document.getElementById("new-image-p").style.display = "block";
	})
	.on('error', function () {
		document.getElementsByClassName("passvalidation")[4].style.boxShadow = "5px 0 5px -5px  #FFA600, 0 5px 5px -5px #FFA600, -5px 0 5px -5px #FFA600";
		document.getElementsByClassName("passvalidation")[4].style.backgroundColor = "#FFF3DD";
		document.getElementById("produrl").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementsByClassName("passvalidation")[4].style.display = "block";
		document.getElementById("new-image").style.display = "none";
		document.getElementsByClassName("passvalidation")[4].style.display = "block";
		document.getElementById("new-image-alert").innerHTML = "Imaginea nu a putut fi încărcată.";
	}
	);

// VALIDARE DESCRIERE PRODUS
$('#proddesc').keyup(function () {

	if (this.value.length == 0) {
		document.getElementById("proddesc").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementById("checked4").style.display = "none";
		document.getElementById("createbtn-add1").disabled = true;
	}
	//CORECT
	else {
		document.getElementById("proddesc").style.boxShadow = "0px 0px 5px #1B7940"
		document.getElementById("checked4").style.display = "block";
		check_add()

	}
});

$('#prodprod').keyup(function () {

	if (this.value.length == 0) {
		document.getElementById("prodprod").style.boxShadow = "0px 0px 5px #FFA600"
		document.getElementById("createbtn-add1").disabled = true;
	}
	//CORECT
	else {
		document.getElementById("prodprod").style.boxShadow = "0px 0px 5px #1B7940"
		check_add()

	}
});



function check_add() {
	if (document.getElementById("checked4").style.display == "block" && document.getElementById("checked5").style.display == "block") {
		document.getElementById("createbtn-add1").disabled = false;
	}
}
function add_new_prod() {
	//Adresa de email este deja folosita



	document.getElementsByClassName("createdalert")[2].style.display = "none";
	document.getElementsByClassName("notcreatedalert")[2].style.display = "none";
	var xhr = new XMLHttpRequest();
	xhr.onloadend = function () {

		document.body.style.cursor = "default";
		if (xhr.status >= 200 && xhr.status < 300) {
			document.getElementsByClassName("createdalert")[3].style.display = "block";
			// setTimeout(function(){ location.reload(); }, 2000);	
		} else {
			document.getElementsByClassName("notcreatedalert")[4].style.display = "block";
		}
	};
	xhr.open('POST', 'https://maarc.herokuapp.com/add?prodtitle=' + document.getElementById("proddesc").value + '&produrl=' + document.getElementById("produrl").value + '&proddesc=' + document.getElementById("prodprod").value, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
	document.body.style.cursor = "wait";

	return false;

}

$('#navbar').load('navbar.html');


var username = localStorage.getItem('userlogat');
if (username != "Administrator") {
	document.getElementsByClassName("addbutton")[0].style.display = "none";
}