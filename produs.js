
var username = localStorage.getItem('userlogat');

//GET URL PARAMS (e.g. page.com/search?params...)
function GetParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idproduct = urlParams.get('idprod');
    MakePage(idproduct);
    GetPrices(idproduct);
    GetSites(idproduct);
    
    if (username != null) {
        GetPrevious(idproduct);
    }
    else {
        GetHistory(idproduct);
    }
}



function MakePage(idproduct) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response)[0];
            console.log(xhr.response)
            document.getElementsByClassName("descprod")[0].children[1].children[0].children[1].innerHTML = obj.maker;
            document.getElementsByClassName("descprod")[0].children[1].children[1].children[1].innerHTML = obj.prodtitle;
            document.getElementsByClassName("prod")[0].children[0].children[0].setAttribute("src", obj.prodimg);
        } else {
            console.log('The request failed!');
        }
    };
    xhr.open("POST", 'https://maarc.herokuapp.com/product?idprod=' + idproduct, true);
    xhr.send();

}

//Get sites that list the product
function GetSites(idproduct) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            for (var i = 0; i < obj.length; i++) {
                var tr = document.createElement("tr");
                var td = document.createElement("td");

                var img = document.createElement("img");
                img.setAttribute("src", obj[i].logo);
                img.classList.add("siteimg");
                td.appendChild(img);
                tr.appendChild(td);

                var td = document.createElement("td");
                td.innerHTML = obj[i].prodtitle;
                tr.appendChild(td);


                var td = document.createElement("td");
                var img = document.createElement("img");
                switch (obj[i].availability) {
                    case 2: // Produsul se afla in stoc
                        img.classList.add("instock");
                        break;
                    case 1: // Produsul se afla in stoc furnizor
                        img.classList.add("inproviderstock");
                        break;
                    default:{// Produsul nu se afla in stoc
						img.classList.add("outofstock");
						tr.style.opacity = 0.3;
						tr.style.cursor = "not-allowed";
					}
                }
                td.appendChild(img);
                tr.appendChild(td);

                var td = document.createElement("td");
                var a = document.createElement("a");
				a.classList.add("prodprice");
				if (obj[i].price != 0)
					a.innerHTML = obj[i].price + " Lei";
				else
					a.innerHTML = "Indisponibil";
                td.appendChild(a);
                var br = document.createElement("br");
                td.appendChild(br);
                var a = document.createElement("a");
                a.classList.add("prodshipping");
                a.innerHTML = "transport gratuit";
                td.appendChild(a);
                tr.appendChild(td);

                var td = document.createElement("td");
                var a1 = document.createElement("a");
				a1.href = obj[i].link
				
                var btn = document.createElement("button");
                btn.innerHTML = "Cumpără!";
                if (obj[i].availability == 0) {
                    btn.style.cursor = "not-allowed";
                    btn.disabled = true;
                }
                a1.appendChild(btn);
                td.appendChild(a1);
                tr.appendChild(td);
                document.getElementsByClassName("stores")[0].appendChild(tr);
            }
        } else {
            console.log('The request failed!');
        }
    };
    xhr.open("POST", 'https://maarc.herokuapp.com/getsites?idprod=' + idproduct, true);
    xhr.send();

}


//Get prices for the product
function GetPrices(idproduct) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            document.getElementById('pricelowheader').innerHTML = Math.round(obj[0].Min * 100) / 100;
            document.getElementById('pricelow1').innerHTML = Math.round(obj[0].MinMin * 100) / 100;
            document.getElementById('pricelow2').innerHTML = Math.round(obj[0].MaxMin * 100) / 100;
            document.getElementById('pricemeanheader').innerHTML = Math.round(obj[0].Mean * 100) / 100;
            document.getElementById('pricemean1').innerHTML = Math.round(obj[0].MinMean * 100) / 100;
            document.getElementById('pricemean2').innerHTML = Math.round(obj[0].MaxMean * 100) / 100;


            if (obj[0].MinDiff >= 0) {
                document.getElementById('pricelowchange').style.color = "#87C38F";
                document.getElementById('pricelowchange').innerHTML = "(+" + Math.round(obj[0].MinDiff * 100) / 100 + ")";

                document.getElementsByClassName("bar")[1].style.backgroundColor = "#87C38F";
                document.getElementsByClassName("bgbar")[1].style.backgroundColor = "#404144";
            } else {
                document.getElementById('pricelowchange').style.color = "#FF1B1C";
                document.getElementById('pricelowchange').innerHTML = "(" + Math.round(obj[0].MinDiff * 100) / 100 + ")";

                document.getElementsByClassName("bar")[1].style.backgroundColor = "#404144";
                document.getElementsByClassName("bgbar")[1].style.backgroundColor = "#FF1B1C";
            }


            if (obj[0].MaxMin - obj[0].MinMin == 0) {
                document.getElementsByClassName("bar")[1].style.width = "100%";
                document.getElementById("pointerimg-low").style.marginLeft = "100%";
            } else {
                document.getElementById("pointerimg-low").style.marginLeft = String((obj[0].Min - obj[0].MinMin) / (obj[0].MaxMin - obj[0].MinMin) * 100) + "%"
                document.getElementsByClassName("bar")[1].style.width = String((obj[0].Min - obj[0].MinMin) / (obj[0].MaxMin - obj[0].MinMin) * 100) + "%";
            }

            if (obj[0].MaxMin - obj[0].MinMin == 0) {
                document.getElementsByClassName("bar")[0].style.width = "100%";
                document.getElementById("pointerimg-mean").style.marginLeft = "100%";
            } else {
                document.getElementById("pointerimg-mean").style.marginLeft = String((obj[0].Mean - obj[0].MinMean) / (obj[0].MaxMean - obj[0].MinMean) * 100) + "%"
                document.getElementsByClassName("bar")[0].style.width = String((obj[0].Mean - obj[0].MinMean) / (obj[0].MaxMean - obj[0].MinMean) * 100) + "%";
            }


            if (obj[0].MeanDiff >= 0) {
                document.getElementById('pricemeanchange').style.color = "#87C38F";
                document.getElementById('pricemeanchange').innerHTML = "(+" + Math.round(obj[0].MeanDiff * 100) / 100 + ")";

                document.getElementsByClassName("bar")[0].style.backgroundColor = "#87C38F";
                document.getElementsByClassName("bgbar")[0].style.backgroundColor = "#404144";
            } else {
                document.getElementById('pricemeanchange').style.color = "#FF1B1C";
                document.getElementById('pricemeanchange').innerHTML = "(" + Math.round(obj[0].MeanDiff * 100) / 100 + ")";

                document.getElementsByClassName("bar")[0].style.backgroundColor = "#404144";
                document.getElementsByClassName("bgbar")[0].style.backgroundColor = "#FF1B1C";
            }

        } else {
            console.log('The request failed!');
        }
    };
    xhr.open("POST", 'https://maarc.herokuapp.com/getprices?idprod=' + idproduct, true);
    xhr.send();

}

GetParams();


document.getElementById('pricemean').style.display = 'none';
$('#pricemeantitle').click(function() {
    document.getElementById('pricemeantitle').classList.add('pricetitleselected');
    document.getElementById('pricelowtitle').classList.remove('pricetitleselected');
    document.getElementById('pricelow').style.display = 'none';
    document.getElementById('pricemean').style.display = '';
});

$('#pricelowtitle').click(function() {
    document.getElementById('pricelowtitle').classList.add('pricetitleselected');
    document.getElementById('pricemeantitle').classList.remove('pricetitleselected');
    document.getElementById('pricelow').style.display = '';
    document.getElementById('pricemean').style.display = 'none';
});




var ctx = document.getElementById('myChart').getContext('2d');


//Draw chart with price history
function makeChart(labelss, datass) {
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelss,
            datasets: [{
                    data: datass[1],
                    label: "Prețul minim",
                    borderColor: "rgb(58,135,173)",
                    fill: false
                }, {
                    data: datass[2],
                    label: "Prețul mediu",
                    borderColor: "#01295F",
                    fill: false,
                }

            ],
            yRangeBegin: 3999,
            yRangeEnd: 5000
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            
            spanGaps: true,
            tooltips: {
                mode: 'index'
            },
            annotation: {
                drawTime: 'afterDatasetsDraw',
                annotations: annotations
            },
            legend: {
                onHover: function(e) {
                    e.target.style.cursor = 'pointer';
                },
                labels: {
                    filter: function(legendItem, chartData) {
                        if (legendItem.datasetIndex > 1) {
                            return false;
                        }
                        return true;
					},
					
                },
                onClick: function(e, legendItem) {
                    const index = legendItem.datasetIndex;

                    Chart.defaults.global.legend.onClick.call(this, e, legendItem);
                }
            },
            hover: {
                onHover: function(e) {
                    var point = this.getElementAtEvent(e);
                    if (point.length) e.target.style.cursor = 'pointer';
                    else e.target.style.cursor = 'default';
                }
            }

        }
    });
}


//Draw chart for premium users
function shownew(labelss, datass){
    $('#myChart').remove(); // this is my <canvas> element
    $('#graph-container').append('<canvas id="myChart" height="100px"></canvas>');
    ctx =  document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelss,
            datasets: [{
                    data: datass[1],
                    label: "Prețul minim",
                    borderColor: "#3A87AD",
                    fill: false
                }, {
                    data: datass[2],
                    label: "Prețul mediu",
                    borderColor: "#01295F",
                    fill: false
                }, {
                    data: datass[3],
                    label: "Prețul generației anterioare",
                    borderColor: "#A71D31",
                    fill: false
                }, {
                    data: datass[4],
                    label: "Prețul prezis",
                    borderColor: "#285238",
                    fill: false
                }

            ],
            yRangeBegin: 3999,
            yRangeEnd: 5000
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            spanGaps: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            annotation: {
                drawTime: 'afterDatasetsDraw',
                annotations: annotations
            },
            legend: {
                onHover: function(e) {
                    e.target.style.cursor = 'pointer';
                },
                labels: {
                    filter: function(legendItem, chartData) {
                        if (legendItem.datasetIndex > 3) {
                            return false;
                        }
                        return true;
					},
					
                },
                onClick: function(e, legendItem) {
                    const index = legendItem.datasetIndex;

                    Chart.defaults.global.legend.onClick.call(this, e, legendItem);
                }
            },
            hover: {
                onHover: function(e) {
                    var point = this.getElementAtEvent(e);
                    if (point.length) e.target.style.cursor = 'pointer';
                    else e.target.style.cursor = 'default';
                }
            }

        }
    });
    myChart.update();

}

//Get price for previous generation product
function GetPrevious(idproduct) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            var datess = [
                []
            ];
			var labelss = [];
			dates1 = [];
				
            dates2 = [];
            dataprev = [];

            labelss = []
            firstprod = null;
            secondprod = null;
            currentdate = null;
            predictions = [];
            for (var i = 0; i < obj.length; i++) {
                if(obj[i].avg_price != "-1"){
                    if(firstprod == null)
                        if(obj[i].idprod != idproduct)
                            firstprod = obj[i].idprod;
                    if(secondprod == null && firstprod != obj[i].idprod)
                        secondprod = obj[i].idprod;

                    if(obj[i].idprod == firstprod){
                        dataprev.push(Math.round(obj[i].min_price * 100) / 100);
                    }
                    else{
                        dates1.push(Math.round(obj[i].min_price * 100) / 100);
                        dates2.push(Math.round(obj[i].avg_price * 100) / 100);
                    }

                    if(obj[i].date != currentdate){
                        if(dataprev.length > dates1.length){
                            
                            dates1.push(null);
                            dates2.push(null);
                        }
                        else if(dataprev.length < dates1.length){
                            dataprev.push(null);
                        }
                        labelss.push(obj[i].date.substring(0, 10));
                        predictions.push(null);
                        currentdate = obj[i].date.substring(0, 10)
                    }
                }
                else{
                    predictions.push(Math.round(obj[i].min_price * 100) / 100);
                    if(obj[i].date != currentdate){
                        labelss.push(obj[i].date.substring(0, 10));
                        currentdate = obj[i].date.substring(0, 10)
                        dates1.push(null);
                        dates2.push(null);
                        dataprev.push(null);
                    }

                }
			}
			datess.push(dates1);
			datess.push(dates2);
			datess.push(dataprev);
			datess.push(predictions);
            shownew(labelss, datess);

        } else {
            console.log('The request failed!');
        }
    };
    xhr.open("POST", 'https://maarc.herokuapp.com/getprevprices?idprod=' + idproduct, true);
    xhr.send();




}



function GetHistory(idproduct) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

        if (xhr.status >= 200 && xhr.status < 300) {
            var obj = JSON.parse(xhr.response);
            var datess = [
                []
            ];
			var labelss = [];
			console.log(obj)
			dates1 = [];
				
			dates2 = [];
            for (var i = 0; i < obj.length; i++) {
				dates1.push(Math.round(obj[i].min_price * 100) / 100)
				labelss.push(obj[i].date.substring(0, 10));
				dates2.push(Math.round(obj[i].avg_price * 100) / 100)
			}
			datess.push(dates1);
			datess.push(dates2);
			console.log(datess);
            makeChart(labelss, datess);

        } else {
            console.log('The request failed!');
        }
    };
    xhr.open("POST", 'https://maarc.herokuapp.com/gethistory?idprod=' + idproduct, true);
    xhr.send();
}


$('#autentificare').click( function(e) {document.getElementById('id01').style.display='block';e.preventDefault();}    );


$('#navbar').load('navbar.html');

if (username != null) {
    document.getElementsByClassName("alert")[0].style.display = "none";

}