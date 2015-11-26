gapiCallBack = function() {
	
}

function addGapiCallBack(f) {
	var oldCB = gapiCallBack;
	gapiCallBack = function() {
		oldCB.call(window);
		f.call(window);
	}
}

function initGapi() {
	var url = "https://contabilizei-site.appspot.com";
	if(window.location.href.indexOf("localhost") != -1)
		url = 'http://localhost:8888';
	
	var ROOT = url + "/_ah/api";
	gapi.client.load('contabilizei', 'v1', gapiCallBack, ROOT);
	
}
