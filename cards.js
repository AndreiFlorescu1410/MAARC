function GetCards() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            for (var i = 0; i < (obj.length < 6 ? obj.length : 6); i++) {
                card = document.createElement("div");
                card.className = "card";

                a = document.createElement("a");
                a.href = "/produs.html?idprod=" + obj[i].idproducts

                card_header = document.createElement("div")
                card_header.className = "card-header";
                img = document.createElement("img");
                img.setAttribute("src", obj[i].prodimg);
                card_header.appendChild(img);
                a.appendChild(card_header);

                card_prod_title = document.createElement("div");
                card_prod_title.className = "card-prod-title";
                card_prod_title.innerHTML = "Telefon Mobil " + obj[i].prodtitle
                a.appendChild(card_prod_title);

                card_prod_price = document.createElement("div");
                card_prod_price.className = "card-prod-price";
                card_prod_price.innerHTML = "de la";
                p = document.createElement("p");
                p.innerHTML = obj[i].price + " RON";
                card_prod_price.appendChild(p);
                a.appendChild(card_prod_price);

                card_footer = document.createElement("div");
                card_footer.className = "card-footer";
                button = document.createElement("button");
                button.innerHTML = "Vezi detalii";
                card_footer.appendChild(button);
                p = document.createElement("p");
                if (obj[i].nr_oferte == 1)
                    p.innerHTML = "(o ofertă)";
                else
                    p.innerHTML = "(" + obj[i].nr_oferte + " oferte)";
                card_footer.appendChild(p);
                a.appendChild(card_footer);



                card.appendChild(a);
                document.getElementsByClassName("container-cards")[0].appendChild(card);
            }
        } else {
            console.log('The request failed!');
        }
    };
    xhr.open("POST", 'https://maarc.herokuapp.com/getcards', true);
    xhr.send();

}

GetCards();