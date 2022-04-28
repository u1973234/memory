function scores(){
	loadpage("./html/scores.html")
}

function phaser_games(){
	loadpage("./html/gameSelector.html");
}

function phaser_game_one(){
	loadpage("./phasergameOne.html");
}

function phaser_game_two(){
	var round_data = {
		cards:2, dificulty:"easy"
	};
	localStorage.setItem("round", JSON.stringify(round_data));
	loadpage("./phasergameTwo.html");
}

function menu(){
	loadpage("../");
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

