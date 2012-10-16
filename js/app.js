util = {
	showError : function(message){
		alert(message);
	}
};
pages = {
	"home" : {
		title: "Home",
		component: "home.html",
		wrapper: "#content",
		onLoad : null,
		onError : null
	},
	"portfolio" : {
		title: "Portfolio",
		component: "portfolio.html",
		wrapper: "#content",
		onLoad : null,
		onError : null
	},
	"contact" : {
		title: "Contact",
		component: "contact.html",
		wrapper: "#content",
		onLoad : null,
		onError : null
	}	
};

components = {
	"nav" : {
		title: "Nav",
		component: "nav.html",
		wrapper: "body",
		onLoad : null,
		onError : null
	},

};

app = {
	pages : null,
	components : null,
	initComponents : function(){
		
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
		}, "html");
	},

	init : function(_pages, _components){
		this.components = _components;
		this.pages = _pages;
		
		if(this.pages === undefined || this.pages.length == 0){
			util.showError("No pages JSON defined in the application. Please follow framework guideline in creating pages.");
		}
		
		for(var comp in this.components){
			var component = components[comp];
			this.getComponent(comp, function(response){
				$(component.wrapper).prepend(response);
			});
		}
			
	}	
};

$(function(){
	
	app.init(pages, components);
	
	$("ul.nav li a").live("click", function(e){
		e.preventDefault();
		app.getPage($(this).attr("data-link-page"));
	});
});