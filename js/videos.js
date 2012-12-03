/*
 *This libray provides way of making interacive video where you can provide a json data that has configuration
 *where you can execute
 **/
_vid  = function(v, config){ //pass the id
    /*Create a video wrapper*/
	this.wrapper = document.createElement('div');
	var parentNode = document.getElementById(v).parentNode;
	/*Clone the current video, assing a className and append it to the wrapper*/
	this.video = document.getElementById(v).cloneNode(true);
	this.video.className = '_vid';
	this.pauseOnPopup = (config.hasOwnProperty('pauseOnPopup')) ? config.pauseOnPopup : true ;
	this.wrapper.className = '_vid_wrapper';
	this.wrapper.appendChild(this.video);
	this.config = config;
	/*Replace the node with the new video node with its wrapper*/
	parentNode.replaceChild(this.wrapper, document.getElementById(v));
    
	
	this.getVideoElement = function(){
        return this.video;
    };
	
	this.showOverlay = function(){
		if(this.pauseOnPopup){
			this.video.pause();
		}
		
		this.helper.showOverlay(true);
	}
    this.initialize = function(){
        ////console.log("initialize");
        var config = this.config;
        var _this = this;
		this.helper = new _helper(this);
        //  any video error will fail with message 
        this.video.addEventListener("error", function (err) {
            _this.errMessage(err);
        }, true);

        // content has loaded, display buttons and set up events
        this.video.addEventListener("canplay", function () {
        
            }, false);

        //  display video duration when available
        this.video.addEventListener("loadedmetadata", function () {
            var vLength = this.duration.toFixed(1);
            //console.log("loadedmetadata");
        }, false);

        //  display the current and remaining times
        this.video.addEventListener("timeupdate", function () {
            //  Current time  
            //console.log("timeupdate");
			if(0 == Math.floor(this.currentTime)){
                for(var item=0; item< config.callbacks.length; item++){                                           
                    config.callbacks[item].isExecuted = false;
                }
            }
			
			for(var item=0; item< config.callbacks.length; item++){                
                if(config.callbacks[item]['on'] == Math.floor(this.currentTime)){
                    if(config.callbacks[item].isExecuted == undefined || config.callbacks[item].isExecuted == false){
                        config.callbacks[item]['do'].apply(this, arguments);
                        config.callbacks[item].isExecuted = true;
                    }
                    break;
                }
            }
        }, false);
        //  paused and playing events to control buttons
        this.video.addEventListener("pause", function () {
            //console.log("pause");
        }, false);

        this.video.addEventListener("playing", function () {
            //console.log("playing");
        }, false);

        this.video.addEventListener("volumechange", function () {
            if (this.muted) {
            // if muted, show mute image
            
            } else {
            // if not muted, show not muted image
            
            }
        }, false);
        //  Download and playback status events.
        this.video.addEventListener("loadstart", function () {
            //console.log("loadstart");
        }, false);
        this.video.addEventListener("loadeddata", function () {
            //console.log("loadeddata");
        }, false);

        this.video.addEventListener("ended", function () {
            //console.log("ended");
        }, false);

        this.video.addEventListener("emptied", function () {
            //console.log("emptied");
        }, false);

        this.video.addEventListener("stalled", function () {
            //console.log("stalled");
        }, false);
    
        this.video.addEventListener("waiting", function () {
            //console.log("waiting");
        }, false);
    
        this.video.addEventListener("progress", function () {
            //console.log("progress");
            
        }, false);
    
        this.video.addEventListener("canplaythrough", function () {
            //console.log("canplaythrough");
        }, false);
    }
    
    this.reset = function(){
        this.initialize();
    }
    
    this.errorMessage = function(msg) {
        // displays an error message for 5 seconds then clears it
        //console.log(msg);
    }
    
    this.initialize();
	
	return this;
}

var _helper = function(element){
	var parent = null;
	var overlay = null;
	var overlayWrapper = null;
	var buttonElement = null;
	
	this.setStyle = function(el, cssStyle){
		var s;
		for (s in cssStyle)
		{
			el.style[s] = cssStyle[s];
		}
	};
	
	this.addCustomElements = function(customEl){
		overlay.appendChild(customEl);
	}
	
	this.showOverlay = function(){
		//console.log(overlay);
		element.wrapper.appendChild(overlay);
		this.setStyle(overlay, {'display':'block'});
	}
	
	this.hideOverlay = function(){
		this.setStyle(overlay, {'display':'none'});
		element.wrapper.removeChild(overlay);
		return true;
	}
	
	this.addButton = function(name, callback){
		var button = buttonElement.cloneNode(true);
		button.innerHTML = name;
		this.setStyle(button, {'z-index':120, 'position':'relative'});
		button.addEventListener('click', callback);
		overlay.appendChild(button);
	};
	
	this.initialize = function(){
		parent = element.wrapper;
		mainOverlay = document.createElement('div');
		overlay = document.createElement('div');
		
		if(element.pauseOnPopup){
			overlay.addEventListener('click', function(){
				if(element.video !== undefined){
					element.video.play();
				}
				parent.removeChild(this);
			});
		}
		this.setStyle(overlay, {'position':'absolute', 'top':0, 'left':0, 'width':'100%', 'height':'100%', 'z-index':100});
		this.setStyle(mainOverlay, {'position':'absolute', 'top':0, 'left':0, 'width':'100%', 'height':'100%', 'background-color':'#000', 'opacity':0.75, 'z-index':10});
		overlay.appendChild(mainOverlay);
		
		buttonElement = document.createElement('a');
		buttonElement.href = "#";
		
		overlay.className = '_overlayWrapper';
		mainOverlay.className = '_overlay';
		buttonElement.className = '_button';
		
		if(element.config.customElement[0] != undefined){
			overlay.appendChild(element.config.customElement[0]);
		}
		
		return this;
	}
	
	return this.initialize();
} 