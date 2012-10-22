<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
<p>This framework is help user to easily create a configurable frontend based on HTML, JS, JSON, Twitter Bootstrap and Jquery.</p>
<p>How to use:<br />
  1. Dependencies<br />
  Import all the script:<br />
  How to implement?</p>
<p>&lt;script src=&quot;//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js&quot;&gt;&lt;/script&gt;<br />
  &lt;script src=&quot;js/app.js&quot;&gt;&lt;/script&gt;</p>
<p>2.Pages <br />
  Pages object is a json object where all the html pages is indicated. This is the main content for your page.</p>
<p>How to implement?<br />
  First of all you need to have a json object called &quot;pages&quot;:</p>
<p> pages = {<br />
  &quot;home&quot; : { //name of the page<br />
  title: &quot;Home&quot;, //this is optional<br />
  component: &quot;home.html&quot;, //required, page name and must be in &quot;components&quot; folder.<br />
  wrapper: &quot;#content&quot;, //wrapper where to insert the page. This could be class, tag or id<br />
  isDefault: true, //the first page to appear when you refresh the page<br />
  onLoad : null, //optional, callback or function to execute after the page is completely loaded<br />
  onError : null //optional, callback or function to execute after the page is loaded with error or the component does not exist<br />
  },<br />
  ...<br />
  &quot;contact&quot; : {<br />
  title: &quot;Contact&quot;,<br />
  component: &quot;contact.html&quot;,<br />
  wrapper: &quot;#content&quot;,<br />
  isDefault: false,<br />
  onLoad : null,<br />
  onError : null<br />
  } <br />
  };</p>
<p>3. Components:<br />
  Component object is a json object that contains all components for your page. Example, sidebars, menubar, footers.. etc. <br />
  Component should no be inside the Pages object. If you want to implement component iside you page then you have to code it manually<br />
  <br />
  How to implement?<br />
  First of all you need to have a json object called &quot;components&quot;:</p>
<p>components = {<br />
  &quot;sidemenu&quot; : { //name of the component<br />
  title: &quot;Side&quot;, //this is optional<br />
  component: &quot;sidemenu.html&quot;,  //required, component name and must be in &quot;components&quot; folder.<br />
  wrapper: &quot;#hidden_menu&quot;, //wrapper where to insert the component. This could be class, tag or id<br />
  onLoad : function(){ //optional, callback or function to execute after the component is completely loaded<br />
  $(&quot;#body&quot;).live('click', function(){<br />
  $(&quot;#body&quot;).transition({left: 0});<br />
  });<br />
  <br />
  $(&quot;#sidemenu a&quot;).live('click', function(){<br />
  $(&quot;#body&quot;).transition({left: 60});<br />
  });<br />
  },<br />
  onError : null //optional, callback or function to execute after the page is loaded with error or the component does not exist<br />
  },<br />
  ...<br />
  <br />
  };<br />
</p>
<p>4. After pages object and cmponents are created, then run type this function:</p>
<p> app.init(pages, components);</p>
</body>
</html>
