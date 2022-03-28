function start_game(){
	
}

function phaser_game(){
	loadpage("./html/phasergame.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}

