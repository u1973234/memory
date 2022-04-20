var options_data = {
	cards:2, dificulty:"hard"
};
var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
options_data = JSON.parse(json);

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
		if (options_data.cards == 3) arraycards = ['co', 'sb', 'co', 'sb', 'tb', 'tb'];
		else if (options_data.cards == 4) arraycards = ['co', 'sb', 'co', 'sb', 'to', 'to', 'cb', 'cb']
		else arraycards = ['co', 'sb', 'co', 'sb'];
		Phaser.Utils.Array.Shuffle(arraycards);
		
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		let space = 150;
		for (let i = 0; i < options_data.cards*2; i++){
			this.add.image(space, 300, arraycards[i]);
			space += 100;
		}
		
		this.cards = this.physics.add.staticGroup();
		
		this.time.delayedCall(3000,()=>{
			space = 150;
			for (let i = 0; i < options_data.cards*2; i++){
				this.cards.create(space, 300, 'back');
				space += 100;
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
							if(options_data.dificulty=="hard") this.score -= 50;
							else if(options_data.dificulty=="easy") this.score -= 10;
							this.score -= 25;
							this.cards.setVisible(false);
							this.time.delayedCall(1000,()=>{
								this.cards.setVisible(true);
							})
							if (this.score <= 0){
								alert("Game over");
								loadpage("../");
							}
						}
						else{
							card.destroy();
							this.firstClick.destroy();
							this.correct++;
							if (this.correct >= options_data.cards){
								alert("You Win with " + this.score + " points.");
								loadpage("../");
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