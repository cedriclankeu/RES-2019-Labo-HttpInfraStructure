$(function() {
	
function loadPersonnes(){
		$.getJSON ("/api/students/", function(tab){
			console.log(tab);
			var message = "null";
			if(tab.length > 0){
				message = tab[0].pays_de_provenance;
			}
			// ceci est faite a base de jquery 
			$(".personne").text(message); // recupérer un element de la page html et on remplace sa valeur avec le message 
		});
		
	};
	loadPersonnes();
	setInterval(loadPersonnes, 2000);

     
});

