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
    
    app.beforeTransition = function(page){
        
        $(pages[app.currentPage].wrapper).find("div:first-child").animate({
            opacity:0
        }, 300, function(){
            $(pages[app.currentPage].wrapper).empty();
            $(page).css({opacity:0, left:100}).appendTo($(pages[app.currentPage].wrapper)).animate({opacity:1, left:0}, 300);
        })
    };
        
    app.init(pages, components);
});