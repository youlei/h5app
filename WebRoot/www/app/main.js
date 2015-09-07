//定义公用变量
window.PATH = {
  DEFAULTINDEX: 'login',  //默认页面
  VIEWS_PATH: 'app/view', //页面view目录,helloworld为部署的虚拟目录
  BASEURL:      './'  //根虚拟目录
}

//返回页面view目录
function getViewsPath() {
    return window.PATH.VIEWS_PATH; 
}

//返回requirejs打包后 js文件路径
function buildViewPath(htmlpath) {
    return getViewsPath() + htmlpath;
}
//返回requirejs打包后 html文件路径
function buildViewTemplatesPath(htmlpath) {
    return 'text!' + getViewsPath() + htmlpath;
}

//require js config
require.config({
  //baseUrl
  baseUrl: window.PATH.BASEURL,
  //paths
  paths: {
     // 'CarModel':       'car/models/carmodel',
     // 'CarStore':       'car/models/carstore',
      //'TaxiModel':      'car/models/taximodel',
      //'TaxiStore':      'car/models/taxistore',
      //'TaxiRadio':      'car/widget/c.taxi.radio',
     // 'CPageStore':     '../webapp/cpage/models/cpagestore',
     // 'TaxiCommon':     'car/common/taxi.common'
  }
});
/**
//程序入口
require(['app/ctrl/login'], function (libs) {
  //实例化App
  var app = new Appliction({
    'defaultView':  window.PATH.DEFAULTINDEX,
    'viewRootPath': window.PATH.VIEWS_PATH,
    animatSwitch: true
  });
});
 */