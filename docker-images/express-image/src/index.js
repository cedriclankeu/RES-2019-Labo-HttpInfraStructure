var Chance = require('chance');
var express = require('express');

var chance = new Chance();


// server 
var app = express();

app.get('/api/students', function(req, res){
	res.send(getFunction());
});

// ecoute du serveur sur le port 3000
app.listen(3000, function(){
	console.log('Accepting requests on port 3000.');
});

// fonction appelé a chaque fois qu'une requette GET est solicitée
function getFunction()
{
	var futurNumber = chance.integer({min: 2,max: 7});
	
	
	//on crée un tableau qui va contenir  les differente occupations
	var tab = [];
	for(var i = 0; i < futurNumber; ++i){
		tab.push({
			Occupation : chance.profession(),
			Date_entree : chance.date({string: true, american: false}),
			pays_de_provenance : chance.country({ full: true })
		});
	};
	console.log(futurNumber);
	console.log(tab);
	return tab;
}
