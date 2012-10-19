/*Prepare pages*/
pages = {
    "home" : {
        title: "Home",
        component: "home.html",
        wrapper: "#content",
        isDefault: true,
        onLoad : null,
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
               $(this).parent('li').addClass('active');
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
    
   /* app.beforeTransition = function(){
        $(app.currentPage).animate({
            opacity:0
        }, function(){
            
        })
    };*/
        
    
    app.init(pages, components);
});