/*Prepare pages*/
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
		onError : null,
	},
	"contact" : {
		title: "Contact",
		component: "contact.html",
		wrapper: "#content",
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
		onLoad : null,
		onError : null
	},

};

$(function(){
	
	app.init(pages, components);
	
	$("ul.nav li a").live("click", function(e){
		e.preventDefault();
		app.getPage($(this).attr("data-link-page"));
	});
});