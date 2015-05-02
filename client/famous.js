
Logger.setLevel('famous-views', 'info');

Template.layout.helpers({
	heightHack: function() {
		var lineHeight = (window.innerHeight - 150);// + 'px';
		console.log(lineHeight);
		return [undefined,lineHeight];
		//return [undefined,lineHeight];
	}
});

/*
Transform=null, Transitionable=null, Surface=null;
famousCmp.mainCtx = false;
famousCmp.ready(function() {
    //console.log(famousCmp.views.InfiniteScrollView);
    */
    /*famousCmp.views.InfiniteScrollView.on('infiniteScroll', function() {
        console.log('in inf scroll in famous.js');
    })*/
    /*Transform        = famous.core.Transform;
    Transitionable   = famous.transitions.Transitionable;

    var SpringTransition = famous.transitions.SpringTransition;
    Transitionable.registerMethod('spring', SpringTransition);
});*/