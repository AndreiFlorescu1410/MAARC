window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 330 || document.documentElement.scrollTop > 330) {
    document.getElementsByClassName("topnavbar")[0].style.backgroundColor  = "#fff";
	
    document.getElementsByClassName("topnavbar")[0].style.padding  = ".7rem 1.7rem .7rem 1.7rem";
	document.getElementsByClassName("topnavbar")[0].children[0].style.color="#404144";
	for(var i=0;i<2;i++)
	{
		document.getElementsByClassName("topnavbar")[0].children[2].children[i].style.color="#404144";
	}
	document.getElementsByClassName("formsearch")[0].style.marginTop = "-50vh";
  } else {
	   document.getElementsByClassName("topnavbar")[0].style.padding  = ".5rem 1.5rem .5rem 1.5rem";
    document.getElementsByClassName("topnavbar")[0].style.backgroundColor  = "transparent";
	document.getElementsByClassName("topnavbar")[0].children[0].style.color="white";
	
	for(var i=0;i<2;i++)
	{
		document.getElementsByClassName("topnavbar")[0].children[2].children[i].style.color="white";
	}
	document.getElementsByClassName("formsearch")[0].style.marginTop = "0vh";
  }
}