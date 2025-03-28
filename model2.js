import * as THREE from 'three';
//引入GLTF加载器
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//创建加载器对象
const loader = new GLTFLoader();
const group = new THREE.Group();
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const gui =new GUI();
const matFolder = gui.addFolder('金属材质')
matFolder.close();


const textureCube = new THREE.CubeTextureLoader()
.setPath('../textures/')
.load(['studio_small_08_r.jpg','studio_small_08_l.jpg','studio_small_08_u.jpg','studio_small_08_d.jpg','studio_small_08_b.jpg','studio_small_08_f.jpg']);

loader.load('../examples/models/gltf/DragonAttenuation.glb', function (gltf) {
    // console.log('gltf',gltf.children);
    const mesh =  gltf.scene.getObjectByName("Cloth_Backdrop");
    const mesh2 =  gltf.scene.getObjectByName("Dragon");
    mesh2.visible = false;
    mesh.material = new THREE.MeshPhysicalMaterial({
        color:0x00ff00,
        clearcoat:1,//物体表面清漆层
        clearcoatRoughness:0.1,
        metalness:0.8,
        roughness:0.4,
        envMap:textureCube,
        envMapIntensity:0.8,
        transmission:0.5,//代替opacity不透明度
        ior:1.5,

    })
    matFolder.addColor(mesh.material,'color').name('颜色').onChange(function(value){
        mesh.material.color.set(value);
    });
    matFolder.add(mesh.material,'metalness',0,1).name('金属度').step('0.01');
    matFolder.add(mesh.material,'roughness',0,1).name('粗糙度').step('0.01');
    matFolder.add(mesh.material,'clearcoat',0,1).name('清漆度').step('0.01');
    matFolder.add(mesh.material,'clearcoatRoughness',0,1).name('清漆粗糙度').step('0.01');
    matFolder.add(mesh.material,'envMapIntensity',0,10).name('环境影响度').step('0.01');
    matFolder.add(mesh.material,'transmission',0,1).name('透光度').step('0.01');
    matFolder.add(mesh.material,'ior',1.0,2.333).name('折射率').step('0.01');


    
    console.log('名称', mesh.name);
    // mesh.material.metalness = 1.0;
    // mesh.material.roughness = 0.1;
    // mesh.material.envMap = textureCube;//设置环境贴图属性的值
    // mesh.material.envMapIntensity = 0.8;//环境贴图反射率
    // mesh.material = new THREE.MeshStandardMaterial({
    //     metalness:1.0,
    //     roughness:0.5,
    // })

    // gltf.scene.traverse(function (obj) {

        
    //     if (obj.isMesh) {
    //         console.log('名称', obj.name);

    //         // obj.material = new THREE.MeshStandardMaterial({
    //         //     // color: 0xffffff,
    //         //     metalness:1.0,
    //         //     roughness:0.5,
    //         // })
    //     }


    // })
// gltf.scene.environment = textureCube;
group.add(gltf.scene);
})

group.scale.set(20, 20, 20);

// console.log('group',group.type);

export default group;