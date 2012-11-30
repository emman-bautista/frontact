var app = function(_pages, _components){
    this.components = _components;
    this.pages = _pages;
    this.currentPageName = null;
    this.defaultPageName = null;
    this.working = false;
    this.complete = false;
    this.init = function(){
        /* check if pages json is defined */
        if(this.pages === undefined || this.pages.length == 0){
            $("body").append("No pages JSON defined in the application. Please follow framework guideline in creating pages.");
        }
        
	    this.initComponents();    
        
        this.loadDefault();
    };
        
    this.beforeTransition = function(page, callback){
        $(page).animate({
            opacity:0
        }, 300, callback);  
    };
    this.afterTransition = function(page, callback){
        $(page).animate({
            opacity:1
        }, 300, callback);  
    };
    this.applyBeforeTransition = function(callback){
        $(this.page).find("*").andSelf().unbind();
        this.beforeTransition($(this.page.wrapper).find("div.wrapper:first-child"), callback);
    };
    this.applyAfterTransition = function(callback){
        this.afterTransition($(this.page.wrapper).find("div.wrapper:first-child"), callback);  
    };
        
    this.applyTransition = function(response){
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
        };
    this.initComponents = function(){
        for(var comp in this.components){
           
            this.getComponent(comp);
        }
    };
    
    this.getComponent = function(comp){
        var component = this.components[comp];
        
        $.get("components/" + component.component, function(response){
            if(response){
                $(component.wrapper).prepend(response);
                if(component.onLoad != null){
                    component.onLoad.apply(this, arguments);
                }
            }
        }, "html");  
    };
    
    this.getPage = function(name){  
        if(this.currentPageName == name) return false;
        this.currentPageName = name;
        this.page = this.pages[name];
        var _app = this;
        $.get("pages/" + this.page.component, function(response){
            if(response){ 
                _app.applyTransition(response);
            }
        }, "html").error(function(error){
            $(this.page.wrapper).empty().append("Error loading the page.");
            if(this.page.onError != null){
                this.page.onError.apply(this, arguments);
            }
        });
        return true;
    };
	
    this.loadDefault = function(){
        this.defaultPageName = "";
        for(var page in this.pages){
            var thispage = this.pages[page];
            if(thispage.isDefault){
                this.defaultPageName = page;
                break;
            }
        }
        
        this.getPage( this.defaultPageName );
    };
    
    this.init();
        
}
