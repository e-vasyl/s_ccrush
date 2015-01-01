var BoardLayer = cc.Layer.extend({
    board:[],
    
    candies:[
            cc.color("#ff8080"),
            cc.color("#80ff80"),
            cc.color("#8080ff"),
 
            cc.color("#ff80ff"),
            cc.color("#80ffff"),
            cc.color("#ffff80"),
            ],
    
    ctor:function(){
        this._super();
        
        this.initBoard(5);
        return true;
    },

    posFromCoord:function(i, j){
        return {
            x: i*42 + 20,
            y: j*42 + 20
            };
    },
    
    addCandy:function(clr, pos)
    {
        var candy = new cc.LabelTTF("*", "Arial", 146);
        // position the label on the center of the screen
        candy.x = pos.x;
        candy.y = pos.y;
        candy.color = clr;
        // add the label as a child to this layer
        this.addChild(candy, 0);        
        return candy;
    },
    
    getCandyType:function(){
        var i = Math.floor(Math.random() * this.candies.length);
        return this.candies[i];
    },
    
    initBoard:function(size){
        this.board = [];
        for (var i = 0; i<size; i++){
            this.board.push([]);
            for (var j = 0; j<size; j++){
                var pos = this.posFromCoord(i, j);
                var clr = this.getCandyType();
                this.board[i].push(this.addCandy(clr, pos));
            }
        }
    },
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BoardLayer();
        this.addChild(layer);
    }
});
