app = {
	pages : null,
	components : null,
	initComponents : function(){
		for(var comp in this.components){
			var component = components[comp];
			this.getComponent(comp, function(response){
				$(component.wrapper).append(response);
				if(component.onLoad != null){
					component.onLoad.apply(this, arguments);
				}
			});
		}
	},
	
	getComponent : function(name, callback){
		$.get("/components/" + name + ".html", function(response){
			if(response){
				callback.apply(this, arguments);
			}
		}, "html");
	},

	getPage : function(name){
		page = this.pages[name];
		$.get("/components/" + page.component, function(response){
			if(response){
				$(page.wrapper).empty().append(response);
				if(page.onLoad != null){
					page.onLoad.apply(this, arguments);
				}
			}
		}, "html").error(function(error){
			$(page.wrapper).empty().append("Error loading the page.");
			if(page.onError!=null){
				page.onError.apply(this, arguments);
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

