elearning = function(_wrapper){
    this.buttons = [
        {
            _parent: this,
            element: ".previous",
            click: function(e){
                this._parent.showPrevious();
            }
        },{
            _parent: this,
            element: ".next",
            click: function(e){
                this._parent.showNext();
            }
        }
    ];
    this.originalState = null;
    this.wrapper = _wrapper;
    this.init = function(){
        
       $(this.wrapper).find('li').addClass('step').css({display:'none'});
       
       var _this = this;
        
        $(this.buttons).each(function(i, e){

            $(e.element).off();
            $(e.element).on('click', function(){
                    e.click.call(e, arguments);
            });
        });
        
        $('.menu ul li a').live('click', function(){
            window['elearning'][$(this).data('onclick')].apply(this, arguments);
        });
        
        if( this.originalState  == null){
             this.originalState = $(this.wrapper).clone(true);
        }
        this.showStep(0);
    };
    this.toggleButton = function(type){
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
    };
    this.showStep = function(step){
        if(step < 0) return false;
        var _this = this;
        var  el = $(this.wrapper).find('.step').get(step);
        var current = $(this.wrapper).find('.active');
       
        if($(current).length > 0){
            $(current).find("*").die();
            
            $(current).find('.vjs-tech').each(function(){
                  this.pause();  
            });

            var originalEl = $(this.originalState).find('.step').get($(current).index());
            var cloned = $(originalEl).clone();
            $(this.wrapper).find('.active').replaceWith($(cloned));
        }
        
         $(this.wrapper).find('.step [data-initial-visibile*=false]').fadeOut();
         if($(current).length == 0){      
             _this.processStep(el);
         }
        
        $(current).removeClass('active').fadeOut(300, function(){
           _this.processStep(el);
        });
        
        return true;
    };
    this.showNext = function(){
        var el = $(this.wrapper).find('.active').next();
        this.showStep($(el).index());
    };
    this.showPrevious = function(){
        var el = $(this.wrapper).find('.active').prev();
        
        return this.showStep($(el).index());
        
    };
   this.processStep = function(el){
      
       $(el).addClass('active').fadeIn(300);
        $(el).find('[data-onload-transition]').each(function(i,e){
            var loadedStyle = $(this).data("onload-transition");
            var initialStyle =$(this).data("initial-style");
            $(this).css(initialStyle).transition(loadedStyle, window['elearning'][$(e).data('loaded-callback')]);    
        });
    };
    
    this.reset = function(){
        var parent = $(this.wrapper).parent();
        $(parent).empty().append(this.originalState);
        this.init();
    }
    
    
    this.init();
}
