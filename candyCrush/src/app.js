var BoardLayer = cc.Layer.extend({
    board:[],
    
    ctor:function(){
        this._super();
        
        this.initBoard(5);
        return true;
    },

    posFromCoord:function(i, j){
        return {
            x: i*40 + 40,
            y: j*40 + 40
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
    
    initBoard:function(size){
        this.board = [];
        for (var i = 0; i<size; i++){
            this.board.push([]);
            for (var j = 0; j<size; j++){
                var pos = this.posFromCoord(i, j);
                var clr = cc.color(Math.random()*255, 128, 128);
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
