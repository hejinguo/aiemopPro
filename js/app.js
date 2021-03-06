require.config({
	paths: {
		text: '../lib/requirejs-plugins/text',
		async: '../lib/requirejs-plugins/async',
		echarts: '../lib/echarts/echarts.common.min',
		jquery: '../lib/common/jquery.min',
		base64: '../lib/common/base64',
		coordtransform: '../lib/common/coordtransform',
//		BMap: 'https://api.map.baidu.com/api?v=3.0&ak=sBRRXwEWp4MoUmugUZ5tBfVe1hrQyyZg'
		BMap: 'https://api.map.baidu.com/api?v=2.0&ak=sBRRXwEWp4MoUmugUZ5tBfVe1hrQyyZg'
	},
	shim: {
		base64: {
			exports: "Base64"
		}
	}
});

define(['router'], function(router) {
//	http://v1.framework7.io/docs/device-api.html
	/*
	var isAndroid = Framework7.prototype.device.android === true;
	var isIos = Framework7.prototype.device.ios === true;
	Template7.global = {
	    android: isAndroid,
	    ios: isIos
	};
	*/
	var $$ = Dom7;
	console.log("初始化APP过程启动");
	console.log("初始化APP路由启动");
	router.init();
	console.log("初始化APP路由结束");
	var f7 = new Framework7({
		cache:false,
		swipeBackPage:false,
		modalTitle: '消息',
		modalButtonOk: '确定',
		modalButtonCancel: '取消',
//		pushState:true,
//		animateNavBackIcon: true,
//		pushStateNoAnimation:true,
//		smartSelectBackText:'返回',
		onPageBack: function (f7, page) {
			f7.closePanel();
			f7.closeModal();
		},
		onAjaxStart: function (xhr) {
			console.log("load page onAjaxStart");
	        f7.showIndicator();
	    },
	    onAjaxComplete: function (xhr) {
	    	console.log("load page onAjaxComplete");
	        f7.hideIndicator();
	    }
	});
	console.log("初始化View启动");
	var view = f7.addView('.view-main',{domCache: true,dynamicNavbar: true});
	var right = f7.addView('.view-right',{animatePages: false,reloadPages:true});
	console.log("初始化View结束");
	console.log("初始化APP过程结束");
	
	return {
		f7: f7,
		view: view,
		right: right,
		router: router,
		toast: f7.toast('', '', {duration:2000})
	};
});