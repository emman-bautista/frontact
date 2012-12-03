function initDraggables(_dragitems, _basket){
    /* for desktop browser */
   
    $(_dragitems).on({
        dragstart: function() {
            //$(this).css('opacity', '0.5');
            droppedElement = this;
        },
        dragleave: function() {
            $(this).removeClass('over');
        },
        dragenter: function(e) {		
            $(this).addClass('over');
        },
        dragend: function() {
            $(this).css('opacity', '1');
			
        },
        dragover: function(e) {
            e.preventDefault();
        },
        drop: function(e) {
            alert(1);
   	
        }
    });
	
    $(_basket).on({
        dragstart: function() {
            $(this).css('opacity', '0.5');
        },
        dragleave: function() {
            $(this).removeClass('over');
        },
        dragenter: function(e) {
            $(this).addClass('over');
        },
        dragend: function() {
            $(this).css('opacity', '1');
        },
        dragover: function(e) {
            //$(this).addClass('over');
            e.preventDefault();
        },
        drop: function(e) {
            $(droppedElement).hide();
            console.log(droppedElement);
            $(this).html($(droppedElement).html());
            droppedElement = null;	   
        }
    });
    
    var item1 = new webkit_draggable('item1', {
        revert: true, 
        onEnd : function(){ }
    });
    var item2 = new webkit_draggable('item2', {
        revert: true, 
        onEnd : function(){ }
    });
    var item3 = new webkit_draggable('item3', {
        revert: true, 
        onEnd : function(){ }
    });
    var item4 = new webkit_draggable('item4', {
        revert: true, 
        onEnd : function(){ }
    });

    webkit_drop.add('basketitem', {
        accept:['valid'], 
        onDrop : function(){
            
        }
    });
};
