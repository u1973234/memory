var round_data = {
	cards:2, dificulty:"hard", player:"", maxScore:0, actScore:0, number:0
};
var json = localStorage.getItem("round") || '{"cards":2,"dificulty":"easy"}';
round_data = JSON.parse(json);

var next_round = function(){
	if (round_data.cards < 6){ 
		round_data.cards += 1;
		if (round_data.cards == 4) round_data.dificulty = "medium";
	}
	else round_data.dificulty = "hard";
	localStorage.setItem("round", JSON.stringify(round_data));
}

class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
    }
    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
    create (){	
		let arraycards = [];
		if (round_data.cards == 2) arraycards = ['co', 'sb', 'co', 'sb'];
		else if (round_data.cards == 3) arraycards = ['co', 'sb', 'co', 'sb', 'tb', 'tb'];
		else if (round_data.cards == 4) arraycards = ['co', 'sb', 'co', 'sb', 'to', 'to', 'cb', 'cb'];
		else if (round_data.cards == 5) arraycards = ['co', 'sb', 'co', 'sb', 'to', 'to', 'cb', 'cb', 'tb', 'tb'];
		else arraycards = ['co', 'sb', 'co', 'sb', 'to', 'to', 'cb', 'cb', 'tb', 'tb', 'so', 'so'];
		Phaser.Utils.Array.Shuffle(arraycards);
		
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		let spaceUp = 150;
		let spaceDown = 150;
		for (let i = 0; i < round_data.cards*2; i++){
			if (i < 6){
				this.add.image(spaceUp, 200, arraycards[i]);
				spaceUp += 100;
			}
			else{
				this.add.image(spaceDown, 400, arraycards[i]);
				spaceDown += 100;
			}
		}
		
		this.cards = this.physics.add.staticGroup();
		
		this.time.delayedCall(3000,()=>{
			spaceUp = 150;
			spaceDown = 150;
			for (let i = 0; i < round_data.cards*2; i++){
				if (i < 6){
					this.cards.create(spaceUp, 200, 'back');
					spaceUp += 100;
				}
				else{
					this.cards.create(spaceDown, 400, 'back');
					spaceDown += 100;
				}
			}
			let i = 0;
			this.cards.children.iterate((card)=>{
				card.card_id = arraycards[i];
				i++;
				card.setInteractive();
				card.on('pointerup', () => {
					card.disableBody(true,true);
					if (this.firstClick){
						if (this.firstClick.card_id !== card.card_id){
							if(round_data.dificulty=="hard") this.score -= 50;
							else if(round_data.dificulty=="easy") this.score -= 10;
							this.score -= 25;
							this.cards.setVisible(false);
							this.time.delayedCall(1000,()=>{
								this.cards.setVisible(true);
							})
							if (this.score <= 0){
								alert("Game Over");
								if (round_data.actScore > round_data.maxScore){
									var player_data = {
										name:round_data.player, score:round_data.maxScore
									};
									var lastPlayerId = "pl"+round_data.number; 
									localStorage.setItem(lastPlayerId, player_data);
								}
								loadpage("../");
							}
						}
						else{
							card.destroy();
							this.firstClick.destroy();
							this.correct++;
							if (this.correct >= round_data.cards){
								next_round();
								alert("You Win with " + this.score + " points.");
								round_data.actScore += this.actScore;
								loadpage("./phasergameTwo.html");
							}
						}
						this.firstClick = null;
					}
					else{
						this.firstClick = card;
					}
				}, card);
			});
		});
	}
	update (){	}
}