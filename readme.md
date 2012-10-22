This framework is help user to easily create a configurable frontend based on HTML, JS, JSON, Twitter Bootstrap and Jquery.

How to use:
1. Dependencies
Import all the script:
<strong>How to implement?</strong>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script src="js/app.js"></script>

2.Pages 
Pages object is a json object where all the html pages is indicated. This is the main content for your page.

How to implement?
First of all you need to have a json object called "pages":

 pages = {
    "home" : { //name of the page
        title: "Home", //this is optional
        component: "home.html", //required, page name and must be in "components" folder.
        wrapper: "#content", //wrapper where to insert the page. This could be class, tag or id
        isDefault: true, //the first page to appear when you refresh the page
        onLoad : null, //optional, callback or function to execute after the page is completely loaded
        onError : null //optional, callback or function to execute after the page is loaded with error or the component does not exist
    },
    ...
    "contact" : {
        title: "Contact",
        component: "contact.html",
        wrapper: "#content",
        isDefault: false,
        onLoad : null,
        onError : null
    }	
};

3. Components:
Component object is a json object that contains all components for your page. Example, sidebars, menubar, footers.. etc. 
Component should no be inside the Pages object. If you want to implement component iside you page then you have to code it manually
  
How to implement?
First of all you need to have a json object called "components":

components = {
    "sidemenu" : { //name of the component
        title: "Side", //this is optional
        component: "sidemenu.html",  //required, component name and must be in "components" folder.
        wrapper: "#hidden_menu", //wrapper where to insert the component. This could be class, tag or id
        onLoad : function(){ //optional, callback or function to execute after the component is completely loaded
            $("#body").live('click', function(){
                    $("#body").transition({left: 0});
            });
            
            $("#sidemenu a").live('click', function(){
                $("#body").transition({left: 60});
            });
        },
        onError : null //optional, callback or function to execute after the page is loaded with error or the component does not exist
    },
   ...
    
};


4. After pages object and cmponents are created, then run type this function:

 app.init(pages, components);