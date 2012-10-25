elearning = {
    wrapper:"#elearning-steps",
    _elearning: this,
    buttons:[
        {
            element: ".previous",
            click: function(){
                elearning.showPrevious();
            }
        },{
            element: ".next",
            click: function(){
                elearning.showNext();
            }
        }
    ],
    
    toggleButton: function(type){
        var buttonObject = null;
        switch(type){
            case "previous":
                    buttonObject = this.buttons['previous'].element;
                break;
            case "next":
                    buttonObject = this.buttons['next'].element;
                break;
            default:
                        
        }
        
        if($(buttonObject).css('display') == 'none'){
            $(buttonObject).show();
        }else{
            $(buttonObject).hide();
        }
    },
    init: function(wrapper){
        if(arguments.length > 0){
            this.wrapper = wrapper;
        }
        
        
        $(this.buttons).each(function(i, e){
            $(e.element).live('click', function(){
                e.click.apply(this, arguments);
            });
        });
        
        
    },
    showStep: function(step){
       var  el = $(this.wrapper).find('.step').get(step);
        
        $(this.wrapper).find('.step [data-initial-visibile*=false]').css({display:'none'});
        $(this.wrapper).find('.step').removeClass('active').fadeOut(300);
            $(el).addClass('active').fadeIn(500, function(){
                    elearning.processStep(el);
            });
    },
    showNext:function(){
        var index = $(this.wrapper).find('.active').index();
        var size = $(this.wrapper).find('.step').length;
        if(index < size-1){
           index++;
        }
        this.showStep(index);
    },
    showPrevious:function(){
        var index = $(this.wrapper).find('.active').index();
        var size = $(this.wrapper).find('.step').length;
        if(index > 0){
           index--;
        }
        this.showStep(index);
    },
   processStep : function(el){
        $(this.wrapper).find('.active [data-onload-transition]').each(function(i,e){
            var loadedStyle = $(this).data("onload-transition");
           
            var initialStyle =$(this).data("initial-style");
            $(this).css(initialStyle).transition(loadedStyle);
           
        });
    },
    loadSomething : function(){
        alert("Test");
    } 
}
