

Logger.setLevel('famous-views', 'info');

Template.layout.helpers({
	//See: https://github.com/gadicc/fview-flex/
	'layoutOptions': function() {
		return {
  			//margins: [10, 10, 10, 10],
  			itemSize: [200,200],
  			//diameter: undefined,
  			//radialOpacity: 1,
	        // isSectionCallback: function(renderNode) {
	        //     return renderNode.isSection;
	        // }
		};
	}
});