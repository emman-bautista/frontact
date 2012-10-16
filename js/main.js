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
		onError : null,
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
			console.log(response);
			$("ul.nav li a").live("click", function(e){
				e.preventDefault();
				app.getPage($(this).attr("data-link-page"));
			});
			$("a.brand").live("click", function(e){
				e.preventDefault();
				app.getPage("home");
			});
		},
		onError : null
	},

};

$(function(){
	app.init(pages, components);
});