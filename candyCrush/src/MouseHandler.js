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
