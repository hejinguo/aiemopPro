//define(['app','tool','bigdata/unitimg/unitimgView'],function(app,tool,unitimgView){
define(['app','tool','coordtransform'],function(app,tool,coordtransform){
	var $$ = Dom7;
	var bindings = [{
		element: '.cust-detail-page .delete-cust-button',
		event: 'click',
		handler: clickDeleteCustItem
		
	}];
	var pageData = {custInfo:null};
	
	function init(query){
		setTimeout(function(){
			loadCustDetailInfo(query);
		},500);
	}
	
	function loadCustDetailInfo(query){
		tool.appAjax(tool.appPath.emopPro+'cust/get',{custSeqid:query.custSeqid},function(data){
			if(data.state){
				pageData.custInfo = data.info;
				//将数据库中WGS84定位格式数据转换为用于百度定位的经纬度
				var bd09 = coordtransform.wgs84tobd09(pageData.custInfo.longitude,pageData.custInfo.latitude);
				pageData.custInfo.longitude = bd09[0];
				pageData.custInfo.latitude = bd09[1];
				require(['cust/detail/detailView'], function(detailView) {
					pageData.custInfo.existAdPhoto = false;//判断是否存在门头照信息
					pageData.custInfo.existCePhoto = false;//判断是否存在三证一章信息
					if(pageData.custInfo.images && pageData.custInfo.images.length > 0){
						$$.each(pageData.custInfo.images, function (index, element) {
							if(element.imageCode == 'adphoto'){
								pageData.custInfo.existAdPhoto = true;
							}else if(element.imageCode == 'cephoto'){
								pageData.custInfo.existCePhoto = true;
							}
						    element.imageName = tool.appPath.emopPro + 'cust/getShopImage?custSeqid=' + element.custSeqid+"&fileName="+element.imageName+"&k="+new Date().getTime();
						});    
					}
					detailView.render({model:pageData.custInfo,bindings:bindings});
				});
			}
		});
	}
	
	function clickDeleteCustItem(){
		var user = tool.getUser();
		if(!pageData.custInfo.custCreateStaff || 
			pageData.custInfo.custCreateStaff != tool.getUser().staffCode){//只能自己删除自己创建的集团
			app.f7.alert('对不起,只能删除自己创建的集团记录.');
		}else if(pageData.custInfo.custCode){
			app.f7.alert('对不起,含集团编码的数据在138删除.');
		}/*else if(user.organize.orgType < 3){//省和市公司不允许编辑和删除
			app.f7.alert('对不起,省市级账号无权执行删除操作.');
		}*/else{
			app.f7.confirm('您确定要删除该集团吗?','删除',function () {
				app.f7.showIndicator();
		        tool.appAjax(tool.appPath.emopPro+'cust/delete',{custSeqid:pageData.custInfo.custSeqid},function(data){
		        	if(data.state){
						app.toast.show("删除集团记录操作成功.");
						app.view.router.back({pageName:'cust'});
						app.router.load('cust');
					}
				});
		    });
		}
	}
	
	return {
		init: init
	};
});