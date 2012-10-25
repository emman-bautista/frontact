/*Prepare pages*/
pages = {
    "home" : {
        title: "Home",
        component: "home.html",
        wrapper: "#content",
        isDefault: true,
        onLoad : function(){
            elearning.init("#elearning-steps");
            $('.menu ul li a').live('click', function(){
               window['elearning'][$(this).data('onclick')].apply(this, arguments);
            })
        },
        onError : null
    },
    "portfolio" : {
        title: "Portfolio",
        component: "portfolio.html",
        wrapper: "#content",
        isDefault: false,
        onLoad : null,
        onError : null
    },
    "contact" : {
        title: "Contact",
        component: "contact.html",
        wrapper: "#content",
        isDefault: false,
        onLoad : null,
        onError : null
    }	
};

/*Prepare components to add on your page*/
components = {
   
    "nav" : {
        title: "Nav",
        component: "nav.html",
        wrapper: "body",
        onLoad : function(response){
            $("a").live('click', function(e){
               e.preventDefault();
               $("ul.nav li a").parent("li[class=active]").removeClass("active");
              // $(this).parent('li').addClass('active');
            });
            
            $("a.brand").live("click", function(e){
                e.preventDefault();
                app.getPage("home");
            });
        },
        onError : null
    }
    
};

$(function(){
    app.beforeTransition = function(page, callback){
      
       
           $(page).transition({
            opacity:0, left:-100
        }, 300, 'out' , callback);  
            
        
    };
    
    app.afterTransition = function(page, callback){
        
        $(page).css({left:-100}).transition({
            opacity:1, left:0
        }, 300, 'out' , callback);
       
       
    };
    
    app.init(pages, components);
});