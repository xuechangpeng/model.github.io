// 引入threejs
import * as THREE from 'three';
//引入相机控件
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
//引入stats性能监视器
import Stats from 'three/addons/libs/stats.module.js';
const stats = new Stats();//创建stats对象
document.body.appendChild(stats.domElement);//页面上输出计算结果，一个div元素
stats.setMode(0);
//引入dat.gui.js可视化库，提供交互对象
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const gui =new GUI();
gui.domElement.style.right = '850px';
gui.domElement.style.top = '0px'; 
// gui.domElement.style.height = '200px';
//引入点模型
import model from './model.js';
import house from './house.js';
import {map2,texture} from './map.js';
import model2 from './model2.js';



//创建网格地面
const gridehelper = new THREE.GridHelper(300,20,0x00ffff,0xffff00);
//创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
const obj = {
    x:0,
    y:0,
    z:0,
    color:0xffffff,
    bool:true,
}
const obj2 = {
    bool:true,
}
// setInterval(function (){
//     console.log('x',obj.x);
//     console.log('y',obj.y);
// },10)//定时器，每隔10毫秒打印X
gui.add(obj,'bool').name('网格旋转').onChange(function(value){});
gui.add(obj2,'bool').name('缓冲旋转').onChange(function(value){});
const positionfolder = gui.addFolder('坐标');
positionfolder.close();
positionfolder.add(obj,'x',-200,200).onChange(function(value){
    mesh1.position.x = value;
});
positionfolder.add(obj,'y',[-100,-50,0,50,100]).name('y坐标').onChange(function(value){
    mesh1.position.y = value;
});
positionfolder.add(obj,'z',{
    左:-100,
    中:0,
    右:100,
}).name('z坐标').onChange(function(value){;
    mesh1.position.z = value;
});

const materialfolder = gui.addFolder('材质');
materialfolder.close();
materialfolder.addColor(obj,'color').name('物体颜色').onChange(function(value){
    mesh1.material.color.set(value);
});




//创建一个三维场景
const scene = new THREE.Scene();
//添加点模型
scene.add(model2);
const matFolder = gui.addFolder('金属材质')
matFolder.close();
console.log('model2',model2.children);

// matFolder.add(model2.material,'clearcoat',0,1).name('清漆层').step(0.01);
scene.add(house);
scene.add(gridehelper);
scene.add(map2);
// scene.remove(map);
//移除子对象
scene.remove(house);
// 给三维场景添加物体
// 定义一个几何体,长宽高
const geometry = new THREE.SphereGeometry(50);
const material = new THREE.MeshStandardMaterial({
    color:0x00ffff,
    // transparent:true,
    // opacity:0.6,
    metalness:1.0,
    roughness:0.5,
});
// const material = [
//     new THREE.MeshPhongMaterial({
//     color:("rgb(255,0,0)"),//红色材质
//     shininess:30,//高光强度
//     specular:0x444444,
//     // transparent:true,//开启透明度
//     // opacity:1.0,//不透明度
// }),
//     new THREE.MeshPhongMaterial({
//     color:("rgb(196, 236, 18)"),//红色材质
//     shininess:30,//高光强度
//     specular:0x444444,
//     // transparent:true,//开启透明度
//     // opacity:1.0,//不透明度
// }),
//     new THREE.MeshPhongMaterial({
//     color:("rgb(18, 236, 72)"),//红色材质
//     shininess:30,//高光强度
//     specular:0x444444,
//     // transparent:true,//开启透明度
//     // opacity:1.0,//不透明度
// }),
//     new THREE.MeshPhongMaterial({
//     color:("rgb(18, 22, 236)"),//红色材质
//     shininess:30,//高光强度
//     specular:0x444444,
//     // transparent:true,//开启透明度
//     // opacity:1.0,//不透明度
// }),
//     new THREE.MeshPhongMaterial({
//     color:("rgb(236, 196, 18)"),//红色材质
//     shininess:30,//高光强度
//     specular:0x444444,
//     // transparent:true,//开启透明度
//     // opacity:1.0,//不透明度
// }),
//     new THREE.MeshPhongMaterial({
//     color:("rgb(236, 149, 18)"),//红色材质
//     shininess:30,//高光强度
//     specular:0x444444,
//     // transparent:true,//开启透明度
//     // opacity:1.0,//不透明度
// }),
// ];//6个面颜色都不一样
//创建一个网格模型,表示生活中的物体
const mesh1 = new THREE.Mesh(geometry,material);
geometry.translate(50/2,0,0);//改变模型自身原点位置
const mesh2 = mesh1.clone();
mesh2.geometry = mesh1.geometry.clone();
mesh2.material = mesh1.material.clone();
mesh2.material.color.set(0x00ff00);
mesh1.position.set(0,200,0);
mesh2.position.copy(mesh1.position);
// mesh2.position.y += 100;
mesh2.translateY(100);
//把mesh添加到场景

//创建一个组对象
const group = new THREE.Group();
group.add(mesh1,mesh2);
group.translateX(100);
// console.log('scene',scene.children);
scene.add(group);

//隐藏物体
// group.visible = false;
// material.visible = false;
// mesh2.material.visible = false;
// console.log('mesh2',mesh1.material.color);
// console.log('mesh2',mesh2.material.color);



// console.log('mesh1.position',mesh1.position)
// gui.add(mesh1.position,'x',0,200);
// gui.add(mesh1.position,'y',0,200);
// gui.add(mesh1.position,'z',0,200);
// console.log('查看对象颜色',material.color);





// //沿X轴阵列
// for(let i = 1 ;i<10;i++){
//     for(let j = 1;j<10;j++){
//     const material3 = new THREE.MeshLambertMaterial({color:(0x0000ff),
//     transparent:true,//开启透明度
//     opacity:0.6,//不透明度
//     })
//     const geometry3 =new THREE.CylinderGeometry(6,10,30,32);
//     const mesh2 = new THREE.Mesh(geometry3,material3);
//     mesh2.position.set(i*100,0,j*100);
//     scene.add(mesh2);
//    }
// }

// //通过构造函数或类的参数，去设置材质的属性
const geometrylei = new THREE.PlaneGeometry(100,50,2,3);
geometrylei.scale(10,10,10);//大小缩放
geometrylei.translate(500,50,50);//平移
geometrylei.rotateX(Math.PI/4);//旋转
geometrylei.center();//居中
const v = new THREE.Vector3(2,1,1)
v.normalize();
// console.log('v',v);
// const geometrylei = new THREE.Sp;hereGeometry(100,32,16);
const materiallei = new THREE.MeshLambertMaterial({
    color:0x00ff00,
    side:2,
    transparent:true,
    opacity:0.6,
    // wireframe:true,//线框
})
const meshlei = new THREE.Mesh(geometrylei,materiallei);

meshlei.position.set(500,0,0);
scene.add(meshlei);
scene.remove(meshlei);

// // 创建奶龙的身体
// const bodyGeometry = new THREE.CylinderGeometry(1, 1.5, 5, 32);
// const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xdedede }); // 浅灰色
// const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
// bodyMesh.position.y = 2.5;
// scene.add(bodyMesh);

// // 创建奶龙的头部
// const headGeometry = new THREE.SphereGeometry(1.5, 32, 32);
// const headMaterial = new THREE.MeshStandardMaterial({ color: 0xdedede }); // 浅灰色
// const headMesh = new THREE.Mesh(headGeometry, headMaterial);
// headMesh.position.y = 5;
// scene.add(headMesh);

// // 创建奶龙的眼睛
// const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
// const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // 黑色
// const leftEyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
// leftEyeMesh.position.set(-0.3, 5, 1.6);
// scene.add(leftEyeMesh);

// const rightEyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
// rightEyeMesh.position.set(0.3, 5, 1.6);
// scene.add(rightEyeMesh);

// // 创建奶龙的鼻子
// const noseGeometry = new THREE.ConeGeometry(0.1, 0.5, 32);
// const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00 }); // 橙色
// const noseMesh = new THREE.Mesh(noseGeometry, noseMaterial);
// noseMesh.position.set(0, 5, 1.5);
// scene.add(noseMesh);

// // 创建奶龙的尾巴
// const tailGeometry = new THREE.CylinderGeometry(0.5, 0.1, 3, 32);
// const tailMaterial = new THREE.MeshStandardMaterial({ color: 0xdedede }); // 浅灰色
// const tailMesh = new THREE.Mesh(tailGeometry, tailMaterial);
// tailMesh.rotation.x = Math.PI / 2;
// tailMesh.position.set(0, 1, -2.5);
// scene.add(tailMesh);

//批量创建模型
const num = 1000;
for(let i = 0; i <num; i++){
    const geometry2 = new THREE.SphereGeometry(2);
    const material2 = new THREE.MeshLambertMaterial({color:0xffff00,

    })
    const mesh = new THREE.Mesh(geometry2,material2);
    const x = (Math.random()-0.5)*3000;
    const y = (Math.random()-0.5)*3000;
    const z = (Math.random()-0.5)*3000;
    mesh.position.set(x,y,z);
    scene.add(mesh);
}




//创建一个三维坐标轴
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);




//创建一个光源对象 点光源
const pointLight = new THREE.PointLight(0xffffff,10.0)
pointLight.decay = 0.0;
pointLight.position.set(150,150,150)
scene.add(pointLight)

//可视化点光源
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10,new THREE.Color(0.5, 1, 0.5));
scene.add(pointLightHelper);
//console.log('mesh',mesh)
const pointLightfolder = gui.addFolder('点光');
pointLightfolder.close();
const pointLightfolder2 = pointLightfolder.addFolder('点光坐标');
pointLightfolder2.close();
pointLightfolder.add(pointLight, 'intensity', 0, 100.0).name('点光强度').step(0.1);
pointLightfolder2.add(pointLight.position, 'x',-1000,1000).name('点光x轴').step(0.1);
pointLightfolder2.add(pointLight.position, 'y',-1000,1000).name('点光y轴').step(0.1);
pointLightfolder2.add(pointLight.position, 'z',-1000,1000).name('点光z轴').step(0.1);
//创建一个平行光对象
const directionalLight = new THREE.DirectionalLight(0xffffff,1.0);
directionalLight.position.set(50,500,60);
// directionalLight.target = mesh;
scene.add(directionalLight);
//可视化平行光
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,100,0xff0000);
scene.add(directionalLightHelper);
const directionalLightfolder = gui.addFolder('平行光');
directionalLightfolder.close();
const directionalLightfolder2 = directionalLightfolder.addFolder('平行光坐标')
directionalLightfolder2.close();
directionalLightfolder.add(directionalLight, 'intensity', 0, 100.0).name('平行光强度').step(0.1);
directionalLightfolder2.add(directionalLight.position, 'x',-1000,1000).name('平行光X轴').step(1.0);
directionalLightfolder2.add(directionalLight.position, 'y',-1000,1000).name('平行光y轴').step(1.0);
directionalLightfolder2.add(directionalLight.position, 'z',-1000,1000).name('平行光z轴').step(1.0);
// console.log('directionalLight',directionalLight);
//创建一个环境光对象
const ambientlight = new THREE.AmbientLight(0XFFFFFf,0.6);
scene.add(ambientlight);
// console.log('ambientlight',ambientlight);
const ambientlightfolder = gui.addFolder('环境光');
ambientlightfolder.close();
ambientlightfolder.add(ambientlight, 'intensity', 0, 2.0).name('环境光强度').step(0.1);







//定义相机输出画布的尺寸(像素PX)
const width = window.innerWidth;//文档区域宽度
const height = window.innerHeight;
//创建一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(30,width/height,0.1,3000);
//设置相机的位置
camera.position.set(150,150,150);
//相机的视线 观察目标点的坐标
camera.lookAt(-50,-50,-50);//看向坐标原点
// camera.lookAt(mesh.position);//指向网格模型mesh

//可视化相机
// const CameraHelper = new THREE.CameraHelper(camera);
// scene.add(CameraHelper);







//创建webgl渲染器
const renderer = new THREE.WebGLRenderer({
    antialias:true,//设置渲染器抗锯齿
});
renderer.outputEncoding = THREE.sRGBEncoding;//解决加载GLTF格式模型纹理贴图与原图不一致的问题
renderer.setPixelRatio(window.devicePixelRatio);//告诉three js我的屏幕象素比
renderer.setClearColor(0x444444);
// console.log(window.devicePixelRatio);


//创建输出画布
renderer.setSize(width,height);
// renderer.render(scene,camera);//执行一个渲染操作,类比相机拍照
//把渲染结果canvas画布,也就是照片添加到网页页面上
// document.body.appendChild(renderer.domElement);
document.getElementById('webgl').appendChild(renderer.domElement);

//渲染循环，周期性执行,默认理想状态下每秒60次
const clock = new THREE.Clock();//创建一个时钟对象
function render(){  
 const spt = clock.getDelta()*1000;
 //  console.log('spt',spt);//执行时间间隔
 //  console.log('渲染帧率',1000/spt);//渲染帧率
 texture.offset.x += 0.01;
 
 stats.update();//刷新时间
 if(obj.bool)mesh1.rotateY(0.01);//周期性旋转,第秒60次每次转到0.01弧度
 mesh2.rotation.copy(mesh1.rotation);
 if(obj2.bool)model.rotation.y += 0.005;
 if(obj2.bool)model.rotation.x += 0.01;
 renderer.render(scene,camera);//周期性执行渲染操作,
 requestAnimationFrame(render);
 }
render();


//创建一个相机控件对象
const controls = new OrbitControls(camera,renderer.domElement);
controls.addEventListener('change',function(){
    // console.log('camera.positong',camera.position);
    
    renderer.render(scene,camera);//重新执行一个渲染操作
})
controls.target.set(-50,-50,-50);
controls.update();

//窗口动态变化
window.onresize = function(){
    //更新canvas画布尺寸
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}