//https://github.com/JonnyBGod/famous-infinitescroll (with some modfications)

FView.registerView("InfiniteScrollView", function(require, exports, module) {
    var ScrollView = require('famous/views/Scrollview');

    function InfiniteScrollView(options) {
        ScrollView.apply(this, arguments);

        this.setOffset(this.options.offset||0);

        _monitor.call(this);
    }

    InfiniteScrollView.prototype = Object.create(ScrollView.prototype);
    InfiniteScrollView.prototype.constructor = InfiniteScrollView;

    InfiniteScrollView.DEFAULT_OPTIONS = {};

    InfiniteScrollView.prototype.setOffset = function(o) {
        this.offset = o || 0;
    }

    InfiniteScrollView.prototype._setContentSize = function() {
        var node = this._node;
        this.contentSize = 0;
        for(var i in node._.array) {
            this.contentSize += node._.array[i].getSize()[1];
        }
    }

    InfiniteScrollView.prototype.disable = function() {
        this.infiniteScrollDisabled = true;
    }

    InfiniteScrollView.prototype.enable = function() {
        this._setContentSize();
        this.infiniteScrollDisabled = false;
    }

    function _monitor() {
        this.sync.on('start',function(data) {
            this._setContentSize();
        }.bind(this));

        this.sync.on('update',function(data) {
            //console.log(this._scroller._position, this._pageSpringPosition, this.contentSize, this.offset, this.getSize()[1]);
            //console.log('scroll data', this);//may want to check direction for restricting top/bottom
            if (!this.infiniteScrollDisabled && this._scroller._position + Math.abs(this._pageSpringPosition) + this.getSize()[1] >= this.contentSize - this.offset) {
            	//console.log('bottom');
                this._eventOutput.emit('infiniteScroll');
            }
            if (!this.infiniteScrollDisabled && this._scroller._position < 0 && this.getSize()[1] >= 0+this.offset) {
            	//console.log('top');
                this._eventOutput.emit('infiniteScrollTop');
            }
        }.bind(this));
    }

    module.exports = InfiniteScrollView;

    //Registering with famousCmp here, as this file seems to only execute after my init code (or define is not placing it in the correct context to be accessible later)
    if(famousCmp && !famousCmp.views.InfiniteScrollView)
    {
	    famousCmp.registerView('InfiniteScrollView', InfiniteScrollView, {
	        famousCreatedPost: function() {
	            this.pipeChildrenTo = this.parent.pipeChildrenTo
	                ? [ this.viewNode, this.parent.pipeChildrenTo[0] ]
	                : [ this.viewNode ];
	        },
	    });
    }
});