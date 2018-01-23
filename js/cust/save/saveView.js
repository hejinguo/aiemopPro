define(['app'], function(app) {
	var $$ = Dom7;

	function render(params) {
		bindEvents(params.bindings);
	}
	
	function bindEvents(bindings) {
		for (var i in bindings) {
			$$(bindings[i].element).off(bindings[i].event);
			$$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
//			$$(document).on(bindings[i].event,bindings[i].element,bindings[i].handler);
		}
	}
	
	return {
		render: render
	};
});