utils = {
    icons: '/img/icons.png',
    overlay: null,
    wrapper: null,
    popup: null,
    showOverlay:function(callback){
        if(this.overlay == null){
            this.overlay = $("<div id=\"overlay\"/>");
            $(this.overlay).css({
                backgroundColor:"rgba(0,0,0, 0.5)",
                position: "absolute",
                top:0,
                left:0,
                width:"100%", 
                height:"100%",
                zIndex: 9999
            });
        }
        
       $(this.overlay).css({opacity:0, display:'block'}).appendTo($("body").append()).animate({opacity:1},300, function(){
           if(callback){
                callback.apply(this, arguments);
            }
       });
    },
    hideOverlay: function(){
      $(this.overlay).animate({opacity:0, display:'none'},200);
    },
    hide: function(callback){
        $(this.wrapper).animate({
            opacity:0,
            top:100
        },300, function(){
            $(this).css({display:'none'});
            utils.hideOverlay();
        });
        
        if(callback!=null){
            callback.apply(this, arguments);
        }
    },
    getPopup: function(){
        if(this.wrapper == null){
            this.wrapper = $("<div class=\"popup_wrapper\" >"+
                                    "<div class=\"popup\" >" +
                                         "<div class=\"popup_head\" ></div>" +
                                         "<div class=\"popup_content\" ></div>"+
                                         "<div class=\"popup_footer\" ></div>"+
                                    "</div>" +
                                    "</div>");
            var closebutton = $("<a href=\"#\" class=\"closebutton\">Close</a>");
            var that = this.wrapper;
            var overlay = this.overlay;
            $(closebutton).css({
                background: "url("+this.icons+") -40px 0 no-repeat transparent",
                width: 30,
                height:30,
                top:-10,
                right:-10,
                display:'block',
                textIndent:-999,
                overflow:'hidden',
                position:'absolute'
                

            }).bind('click', function(e){
                e.preventDefault();
                utils.hide(null);
            });
            
            $(this.wrapper).find("div.popup").append($(closebutton));
        }
        return this.wrapper;
    },
    alert: function(message, title){
        var popup = this.getPopup();
        $(popup).find("div.popup_head").html(title);
        $(popup).find("div.popup_content").html(message);
        this.showOverlay(function(){
            $(popup).css({display:'block', opacity:0, top:100}).appendTo($(this)).animate({opacity:1, top:200}, 300);
        });
    }
}


