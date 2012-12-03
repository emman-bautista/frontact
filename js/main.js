/*Prepare pages*/
var _app = null;
var _elearning = null;
var v = null;
var cElement = $('<div style="height: 100%; z-index: 1000; position:relative;">This is a sample custom Element inside the popup overlay</div>');
var pages = {
    "home" : {
        title: "Home",
        component: "home.html",
        wrapper: "#content",
        isDefault: true,
        onLoad : function(){
            /* Exted the class first */
            elearning.loadLast = function(){ 
                $(this).transition({opacity:0.75, x:660, y: "+=107", easing:"in-out", duration:1000});
            };
            elearning.loadSomething = function(){
                $(this).transition({opacity:0.5, y:192, easing:"snap", duration:1000});
            };
            elearning.moveDown= function(){
                $(this).transition({opacity:1, duration:1000});
            }
            elearning.initDraggables = function(){
                initDraggables(".dragitem", "#basketitem");
            }
            _elearning = new elearning("#elearning-steps");
             /* Extend elearning by adding new functions */
            if($("#videoPlayer_html5_api").length > 0){
				//cElement = [].slice.call(cElement);
                var config = {
						customElement: cElement,
						pauseOnPopup: true,
						callbacks: [
                        {
                        'on': 2,
                        'do':function(){
                            console.log("happend in the duration 2");
                        }
                        },{
                        'on': 4,
                        'do':function(){
                            $(v.getVideoElement()).transit({ width: '50%', height:'50%', marginTop: '-20px' });
                            
                        }
                        }   ,{
                        'on': 6,
                        'do':function(){
                            $(v.getVideoElement()).transit({ width: '100%', height:'100%', marginTop: '0' });
                        }
                        }]
						};
                v = new _vid("videoPlayer_html5_api", config);
				
				
            }
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
var components = {
    "nav" : {
        title: "Nav",
        component: "nav.html",
        wrapper: "body",
        onLoad : function(response){
            $("a").on('click', function(e){
              
               $("ul.nav li a").parent("li[class=active]").removeClass("active");
               $(this).parent('li').addClass('active');
               $(".collapse").collapse('toggle');
            });
            
            /*$("a.brand").live("click", function(e){
                e.preventDefault();
                app.getPage("home");
            });*/
        	},
        onError : null
    }
    
};


$(function(){
    _app = new app(pages, components)
    _app.beforeTransition = function(page, callback){
           $(page).transition({
            opacity:0, left:-100
        }, 300, 'out' , callback);   
    };
    
    _app.afterTransition = function(page, callback){
        $(page).css({left:-100}).transition({
            opacity:1, left:0
        }, 300, 'out' , callback);
    };
    
    var url = window.location.hash.replace("#", '');
    if(url == ''){
        url = _app.defaultPageName;
    }
    window.location.href = '#'+ url;
});

$(window).bind('hashchange', function(e){
    var url = e.target.location.hash.replace("#", '');
    _app.getPage(url)
});

$(window).bind('load', function(){
        $(window).trigger('hashchange');
});