/*
 *This libray provides way of making interacive video where you can provide a json data that has configuration
 *where you can execute
 **/

    
_vid  = function(v, config){ //pass the id
    
    this.video = document.getElementById(v);
    this.config = config;
    this._config = config;
    this.layout = {x:1,y:2};
    this.resetConfig = function(){
        this.config = this._config;
    };
    this.initialize = function(){
        //console.log("initialize");
        var config = this.config;
        
        this.video.addEventListener("timeupdate", function(){
            var currentNode = null;
            
            
            for(item=0; item< config.length; item++){                
                if(currentNode == null && config[item]['on'] == Math.floor(this.currentTime)){
                    if(config[item].isExecuted == undefined || config[item].isExecuted == false){
                        config[item]['do'].apply(this, arguments);
                        config[item].isExecuted = true;
                    }
                    break;
                }
            }
            
            
        }, false);
    }
    
    this.reset = function(){
        this.initialize();
    }
    
    this.getVideoElement = function(){
        return this.video;
    }
    
    //  any video error will fail with message 
    this.video.addEventListener("error", function (err) {
        this.errMessage(err);
    }, true);

    // content has loaded, display buttons and set up events
    this.video.addEventListener("canplay", function () {
        
    }, false);

    //  display video duration when available
    this.video.addEventListener("loadedmetadata", function () {
        var vLength = this.duration.toFixed(1);
        console.log("loadedmetadata");
    }, false);

    //  display the current and remaining times
    this.video.addEventListener("timeupdate", function () {
        //  Current time  
        console.log("timeupdate");
        
    }, false);
    //  paused and playing events to control buttons
    this.video.addEventListener("pause", function () {
        console.log("pause");
    }, false);

    this.video.addEventListener("playing", function () {
        console.log("playing");
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
        console.log("loadstart");
    }, false);
    this.video.addEventListener("loadeddata", function () {
        console.log("loadeddata");
    }, false);

    this.video.addEventListener("ended", function () {
        console.log("ended");
    }, false);

    this.video.addEventListener("emptied", function () {
        console.log("emptied");
    }, false);

    this.video.addEventListener("stalled", function () {
        console.log("stalled");
    }, false);
    
    this.video.addEventListener("waiting", function () {
        console.log("waiting");
    }, false);
    
    this.video.addEventListener("progress", function () {
        console.log("progress");
        if(0 == Math.floor(this.currentTime)){
            resetConfig();
        }
    }, false);
    
    this.video.addEventListener("canplaythrough", function () {
        console.log("canplaythrough");
    }, false);
    
    this.errorMessage = function(msg) {
                // displays an error message for 5 seconds then clears it
                alert(msg);
            }
    
    this.initialize();
}


