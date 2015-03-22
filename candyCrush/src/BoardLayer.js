var BoardLayer = cc.Layer.extend({
    board:[],
    maxIdx:{i:0, j:0},
    
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
        
        this.initBoard(7);
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
                  (idx.i < this.maxIdx.i) && (idx.j < this.maxIdx.j) &&
                  this.board[idx.i][idx.j]);
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
                cc.log("sel:" + idx.i+","+idx.j);
            }
            else
            {
                this.selectedIdx = {i:-1,j:-1};
            }
        }
    },
    
    addCandy:function(type, pos)
    {
        var candy = new cc.LabelTTF("*", "Courier", 146);
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
    
    checkBoard:function()
    {
        var res = {rows:[], cols:[]};
        // TODO: improve
        
        var chk = function(_i, _n, _getter)
        {
            var res = [];
            var k = 1;
            var a = _getter(0).candyType;
            var t = a ? a.candyType : -1;

            for (var i = 0; i < _n; i++){
                var c = _getter(i);
                //cc.log("chk ="+_i +","+ i + ":" + c.candyType);
                
                if (c && (c.candyType == t))
                {
                    k++;
                }
                else
                {
                    if (k > 2)
                    {
                        var chunk = {n: _i, s: i - k, l: k};
                        res.push(chunk);
                        //cc.log(chunk);
                    }
                    k = 1;
                    t = c ? c.candyType : -1; 
                }
            }

            if (k > 2)
            {
                var chunk = {n: _i, s: _n - k, l: k};
                res.push(chunk);
                //cc.log(chunk);
            }
            
            return res;
        };
        
        var f1 = function (brd){ return function(x){return brd[i][x];};}(this.board);
        
        var sum = [];
        for (var i = 0; i < this.maxIdx.i; i++)
        {
            sum = sum.concat(chk(i, this.maxIdx.j, f1));
            cc.log(sum);
        }
        res.cols = sum;
        return res;
    },
    
    cleanBoard:function (chkBoard){
        cc.log(chkBoard);
        for(var idx = 0; idx < chkBoard.cols.length; idx++){
            var col = chkBoard.cols[idx];
            var i = col.n;
            var j = col.s;
            for (var k = 0; k < col.l; k++, j++){
                var c = this.board[i][j];
                //cc.log("clean ("+i+","+j+"; "+ c.candyType);
                if (c){
                    this.removeChild(c);
                    this.board[i][j] = null;
                }
                
            }
        }
    },
    
    initBoard:function(size){
        this.board = [];
        this.maxIdx = {i: size, j:size};
        for (var i = 0; i< size; i++){
            this.board.push([]);
            for (var j = 0; j< size; j++){
                var pos = this.posFromCoord(i, j);
                var clr = this.getCandyType();
                this.board[i].push(this.addCandy(clr, pos));
            }
        }
        
        var chk = this.checkBoard();
        this.cleanBoard(chk);
        
        cc.eventManager.addListener(hoverHandler.clone(), this);
        
    },
    
});

