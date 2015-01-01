var hoverHandler = cc.EventListener.create({
    event: cc.EventListener.MOUSE,
    
    
    onMouseMove: function (event) {
      var target = event.getCurrentTarget();
      var locationInNode = target.convertToNodeSpace(event.getLocation());
      var idx = target.idxFromPos(locationInNode);
      target.selectCell(locationInNode);
      return true;
  }
});

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
    
    idxFromPos:function(pos){
        return {
            i: Math.floor((pos.x) / 42),
            j: Math.floor((pos.y - 40) / 42)
        }
    },
    
    isOnBoard:function(idx){
          return ((idx.i >= 0) && (idx.j >= 0) && 
                  (idx.i < this.board.length) && (idx.j < this.board.length));
    },

    selectedIdx:{i:-1,j:-1},
    selectCell:function(pos){
        var idx = this.idxFromPos(pos);
        var oidx = this.selectedIdx;
        if ((oidx.i != idx.i) || (oidx.j != idx.j))
        {
            if (oidx.j != -1)
            {
                this.board[oidx.i][oidx.j].opacity = 255;
            }
            if (this.isOnBoard(idx))
            {
                this.board[idx.i][idx.j].opacity = 180;
                this.selectedIdx = idx;
            }
            else
            {
                this.selectedIdx = {i:-1,j:-1};
            }
        }
    },
    
    addCandy:function(type, pos)
    {
        var candy = new cc.LabelTTF("*", "Arial", 146);
        candy.x = pos.x;
        candy.y = pos.y;
        candy.color = type.clr;
        // set custom properties
        candy.candyType = type.t;
        this.addChild(candy, 0);        
        return candy;
    },
    
    getCandyType:function(){
        var i = Math.floor(Math.random() * this.candies.length);
        return {t: i, clr: this.candies[i]};
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
        
        cc.eventManager.addListener(hoverHandler.clone(), this);
        
    },
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BoardLayer();
        this.addChild(layer);
    }
});
