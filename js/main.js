(function() {
  // windowサイズを画面サイズに合わせる
  var width = window.innerWidth;
  var height = window.innerHeight;

  var element;
  var scene, camera, renderer, controls, sphere;

  function init() {
    scene = new THREE.Scene();
    // カメラの作成
    camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      1,
      1000
    );
    camera.position.set(0, 0, 0);
    scene.add(camera);

    // 球体の形状を作成
    var geometry = new THREE.SphereGeometry(5, 60, 40);
    geometry.scale(-1, 1, 1);

    // マテリアルの作成
    var loader = new THREE.TextureLoader();
    var material = new THREE.MeshBasicMaterial({
      // 画像をテクスチャーとして読み込み
      map: loader.load(
        //"https://watkot.github.io/panorama/img/sample.JPG"
        "../img/aerial.PNG"
      )
    });

    // 球体（形状）にマテリアル（質感）を貼り付けて物体を作成
    sphere = new THREE.Mesh(geometry, material);

    // シーンに追加
    scene.add(sphere);

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer();
    // レンダラーをwindowサイズに合わせる
    renderer.setSize(width, height);
    renderer.setClearColor({color: 0x000000});
    element = renderer.domElement;
    document.getElementById("stage").appendChild(element);
    renderer.render(scene, camera);

    // デバイスの判別
    var isAndroid = false;
    var isIOS = false;
    if (navigator.userAgent.indexOf("Android") != -1) {
      isAndroid = true;
    } else if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)){
      isIOS = true;
    }
    if (isAndroid || isIOS ){
      // デバイスがスマートフォンまたはタブレット端末の場合
      // ジャイロセンサーで視点操作を可能にする
      window.addEventListener("deviceorientation", setOrientationControls, true);
    } else {
      // パソコンの場合
      // マウスドラッグで視点操作を可能にする
      setOrbitControls();
    }

    render();
  }

  function setOrbitControls() {
    // パソコン閲覧時マウスドラッグで視点操作する
    controls = new THREE.OrbitControls(camera, element);
    controls.target.set(
      camera.position.x + 0.15,
      camera.position.y,
      camera.position.z
    );
    // 視点操作のイージングをONにする
    controls.enableDamping = true;
    // 視点操作のイージングの値
    controls.dampingFactor = 0.2;
    // 視点変更の速さ
    controls.rotateSpeed = 0.1;
    // ズーム禁止
    controls.enableZoom = false;
    // パン操作禁止
    controls.enablePan = false;
  }

  // ジャイロセンサーで視点操作する
  function setOrientationControls(e) {
    // スマートフォン以外で処理させない
    if (!e.alpha) {
      return;
    }
    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();
    window.removeEventListener("deviceorientation", setOrientationControls, true);
  }

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
  }

  window.addEventListener("load", init, false);
})();

// pull-down menu
function addPulldownMenu() {
  var menu = document.createElement("select");
  document.getElementById("menubar").appendChild(menu);

  var array = ["りんご", "なし"];
  for(var i = 0; i < array.length; i++){
    var option = document.createElement("option");
    option.textContent = array[i];
    menu.appendChild(option);
  }
}

addPulldownMenu();

// Cesium

/*
var viewer;

function loadCesium() {
  'use strict';

  viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
			url: '//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
			enablePickFeatures: false
		}),
    timeline: false,
    animation: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    geocoder: false,
    terrainExaggeration: 1.0
});
*/
