var player_data = {
    name:"", score:0
};
var string = function ranking(){
    let res;
    for (let i = 0; i < numberPl; i++){

        var playerId = "pl"+numberPl; 
        var json = localStorage.getItem(playerId) || '{"name":"", "score":0}';
        player = JSON.parse(json);

        res += '\n'+player.name+" "+player.score;
    }
    return res;
}
document.getElementById('rank').innerHTML = string;