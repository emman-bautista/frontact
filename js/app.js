app = {
    _app: this,
    pages : null,
    page : null,
    currentPage : null,
    components : null,
    preload : false,
    transition: 'fade',//slideleft, slideright, slideup, slidedown, bounce
    ease: 'in',
    working: false,
    complete: false,
    beforeTransition: function(page, callback){
        $(page).animate({
            opacity:0
        }, 300, callback);  
    },
    afterTransition: function(page, callback){
        
        $(page).animate({
            opacity:1
        }, 300, callback);  
    },
    applyBeforeTransition: function(callback){
         
        this.beforeTransition($(this.page.wrapper).find("div:first-child"), callback);
    },
    applyAfterTransition : function(callback){
        this.afterTransition($(this.page.wrapper).find("div:first-child"), callback);  
    },
    applyTransition: function(response){
        var _app = this;
        this.applyBeforeTransition(function(){
            $(_app.page.wrapper).empty();
            $(response).css({
                opacity:0
            }).appendTo($(_app.page.wrapper));
            $(response).animate({
                opacity:0
            }, 100, _app.applyAfterTransition(function(){
                _app.complete = false;
                _app.afterTransition(response);
                if(_app.page.onLoad != null && !_app.complete){
                    _app.page.onLoad.apply(this, arguments); 
                    _app.complete = true;
                }
            }));
        });
    //$(page).animate({opacity:1}, 300, callback); 
    },
    initComponents : function(){
        var _app = this;
        for(var comp in this.components){
            this.getComponent(comp);
        }
    },
	
    getComponent : function(comp){
        var component = this.components[comp];
        $.get("/components/" + component.component, function(response){
            if(response){
                $(component.wrapper).prepend(response);
                if(component.onLoad != null){
                    component.onLoad.apply(this, arguments);
                }
            }
        }, "html");  
    },
    getPage : function(name){  
        if(this.currentPage == name) return false;
        this.currentPage = name;
        this.page = this.pages[name];
        var _app = this;
        $.get("/components/" + this.page.component, function(response){
            if(response){ 
                _app.applyTransition(response);
            }
        }, "html").error(function(error){
            $(this.page.wrapper).empty().append("Error loading the page.");
            if(this.page.onError != null){
                this.page.onError.apply(this, arguments);
            }
        });
    },
	
    loadDefault: function(){
        var defaultPage = "home";
        for(var page in this.pages){
            var thispage = this.pages[page];
            if(thispage.isDefault){
                defaultPage = page;
                break;
            }
        }
        
        this.getPage(defaultPage);
    },

    init : function(_pages, _components){
        this.components = _components;
        this.pages = _pages;
        this._app = this;
        /* check if pages json is defined */
        if(this.pages === undefined || this.pages.length == 0){
            $("body").append("No pages JSON defined in the application. Please follow framework guideline in creating pages.");
        }
		
        /*initialize components*/
        this.initComponents();
		
        /*load default page*/
        this.loadDefault();
    }	
};


$("a[data-link-page]").live("click", function(e){
    e.preventDefault();
    app.getPage($(this).attr("data-link-page"));
});