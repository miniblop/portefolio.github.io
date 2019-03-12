//exercice1
function alea(n) {
	return parseInt(Math.random() * (n - 0));
}

function createRandomArray(n, max) {
	var tab = new Array(n); 
	for (var i = 0; i < n; i++) {
		tab[i] = alea(max);
	}
	return tab;
}

function maxElement(tab){
	return Math.max(...tab);
}

function nbOccurrences(tableau, element){
	var cpt=0;
	for (var i = 0; i < tableau.length; i++) {
		if (tableau[i] === element){
			cpt++;
		}
	}
	return cpt;
}
//exercice 3

function filter(name){
	agregation();
	if (name==="FRA" || name==="DEU"){
		filterByCountry(name, "td");
	} else filterByYear(name, "tr");
}
//filtre année
function filterByYear(name, type){
		var tr=document.getElementById(type +name);
	//console.log(type+name);
	if (tr.style.display==="none"){
		tr.style.display="";
	} else {
		tr.style.display="none";
	}
}
//filtre pays
function filterByCountry(name, type){
	var tdList = document.getElementsByClassName("td"+name);
		//console.log(tdList);
		for (var i = 0; i < tdList.length; i++) {
			var tr = tdList[i];
			if (tr.style.display==="none"){
				tr.style.display="";
			} else {
				tr.style.display="none";
			}
	}
}
//exercice4
function agregation(){
	//alert(value==="somme");

	var agregateMode = getAgregateMode();

	document.getElementById("title").textContent = agregateMode;
	var tabFra = manageCountry("FRA");
	var tabDeu = manageCountry("DEU");

	if (agregateMode==='somme') {
		var total2012 = tabFra[0] + tabDeu[0];
		var total2013 = tabFra[1] + tabDeu[1];
		var total2014 = tabFra[2] + tabDeu[2];

		var totalFra = tabFra[0] + tabFra[1] + tabFra[2];
		var totalDeu = tabDeu[0] + tabDeu[1] + tabDeu[2];

		var total = totalFra + totalDeu;
		document.getElementById("agregationFRA").textContent = totalFra;
		document.getElementById("agregationDEU").textContent = totalDeu;
		document.getElementById("agregation2012").textContent = total2012;
		document.getElementById("agregation2013").textContent = total2013;
		document.getElementById("agregation2014").textContent = total2014;
		document.getElementById("agregationFinale").textContent = total;
	}
	if (agregateMode==='moyenne') {
		var total2012 = parseInt((tabFra[0] + tabDeu[0])/nbPays(tabFra, tabDeu));
		var total2013 = parseInt((tabFra[1] + tabDeu[1])/nbPays(tabFra, tabDeu));
		var total2014 = parseInt((tabFra[2] + tabDeu[2])/nbPays(tabFra, tabDeu));

		var totalFra = parseInt((tabFra[0] + tabFra[1] + tabFra[2])/nbAnnee(tabFra,tabDeu));
		var totalDeu = parseInt((tabDeu[0] + tabDeu[1] + tabDeu[2])/nbAnnee(tabFra,tabDeu));

		var total = parseInt((totalFra + totalDeu)/nbAnnee(tabFra,tabDeu));
		document.getElementById("agregationFRA").textContent = totalFra;
		document.getElementById("agregationDEU").textContent = totalDeu;
		document.getElementById("agregation2012").textContent = total2012;
		document.getElementById("agregation2013").textContent = total2013;
		document.getElementById("agregation2014").textContent = total2014;
		document.getElementById("agregationFinale").textContent = total;
	}




}

function nbPays(tabFra, tabDeu){
	var cpt=0;
	if (tabFra[0]!==0 || tabFra[1]!==0 || tabFra[2]!==0){
		cpt++;
	}
	if (tabDeu[0]!==0 || tabDeu[1]!==0 || tabDeu[2]!==0){
		cpt++;
	}
	return cpt;

}

function nbAnnee(tabFra, tabDeu){
	var cpt=0;
	if(tabFra[0]!==0 || tabDeu[0]!==0){
		cpt++;
	}
	if(tabFra[1]!==0 || tabDeu[1]!==0){
		cpt++;
	}
	if(tabFra[2]!==0 || tabDeu[2]!==0){
		cpt++;
	}
	return cpt;
}

function getAgregateMode() {
	var radios = document.getElementsByName('agregate');
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			return radios[i].value;
		}
	}
}


function manageCountry(country){
	//console.log(document.getElementById("2012").attributes.value);
	var tab=[];
	for (var i=2012; i< 2015; i++){
		if(document.getElementById(country.toLowerCase()).checked===true){
			if(document.getElementById(i+"").checked===true){
				tab.push(parseInt(document.getElementById("td" + country + i).textContent));
			} else {
				tab.push(0);
			}
		} else {
			tab.push(0);
		}

	}
	return tab;
}

//exercice2



var tab=[1, 1, 1, 4, 5, 7, 7, 8];

var max=maxElement(tab);

var occurence=nbOccurrences(tab, 1);

//console.log(occurence);

//console.log(tab);

//console.log(max);

//console.log(alea(100));

//console.log(createRandomArray(5, 100));


