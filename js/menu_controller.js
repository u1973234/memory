function scores(){
	loadpage("./html/scores.html")
}

function phaser_games(){
	loadpage("./html/gameSelector.html");
}

function phaser_game_one(){
	loadpage("./html/phasergameOne.html");
}

function phaser_game_two(){
	loadpage("./html/phasergameTwo.html");
}

function menu(){
	loadpage("./index.html");
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

