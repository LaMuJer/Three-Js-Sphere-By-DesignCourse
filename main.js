import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui'
import gsap from 'gsap'
import {cos} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";
import png from './normal.png'

// GUI
const gui = new dat.GUI()
gui.hide()
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load(png)

/**
 * Test Sphere
 */
//  Geometry
const sphereGeometry = new THREE.SphereBufferGeometry( 1, 64, 64 );

//  Materials
const material = new THREE.MeshStandardMaterial( {
    color: '#000' ,
    wireframe: false,
    metalness: .7,
    roughness: .1,
    normalMap: normalTexture,
} );
const sphere = new THREE.Mesh( sphereGeometry, material )
sphere.position.z = .5
scene.add( sphere );

//  Torus
const torusKnotGeometry = new THREE.TorusKnotGeometry( .9, 1, 20, 16 );
const torusKnotMaterial = new THREE.MeshStandardMaterial( {
    color: "#023047" , wireframe: true ,
    metalness: .9,
    roughness: 0,
} );
const torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMaterial );
scene.add( torusKnot );

const  group = new THREE.Group()
group.add(sphere)
group.add(torusKnot)
// group.rotation.y = - Math.PI * .09
// group.position.x = 2.4
// group.position.z = -.9
scene.add(group)

//  Light
//  PintLight
const pointLight = new THREE.PointLight(    '#fb8500' , 100)
pointLight.position.set(3.8, -3.4, -.1)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight('#023047' , 100)
pointLight2.position.set(-2.4, -3.2, 0)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight('#8ecae6' , 100)
pointLight3.position.set(1.3, 1.9, -.5)
scene.add(pointLight3)

const pointLight4 = new THREE.PointLight('#ffb703' , 100)
pointLight4.position.set(-3.3, 1.5, -.7)
scene.add(pointLight4)

const rectLight = new THREE.RectAreaLight('#ee00ff' , 100, 3, 3)
rectLight.position.set(-1.3,1,-2)
rectLight.rotation.y = Math.PI * 1.1
scene.add(rectLight)

//
// const pointLight5 = new THREE.HemisphereLight('#219ebc' , "#ffb703" , 100)
// // pointLight4.position.set(-2.4,2.9,3.4)
// scene.add(pointLight5)


// gui
// const light1 = gui.addFolder('Light 1')
// light1.add(pointLight.position , 'x' , -6 , 6 , .1)
// light1.add(pointLight.position , 'y' , -6 , 6 , .1)
// light1.add(pointLight.position , 'z' , -6 , 6 , .1)
// const light2 = gui.addFolder('Light 2')
// light2.add(pointLight2.position , 'x' , -6 , 6 , .1)
// light2.add(pointLight2.position , 'y' , -6 , 6 , .1)
// light2.add(pointLight2.position , 'z' , -6 , 6 , .1)
// const light3 = gui.addFolder('Light 3')
// light3.add(pointLight3.position , 'x' , -6 , 6 , .1)
// light3.add(pointLight3.position , 'y' , -6 , 6 , .1)
// light3.add(pointLight3.position , 'z' , -6 , 6 , .1)
// const light4 = gui.addFolder('Light 4')
// light4.add(pointLight4.position , 'x' , -6 , 6 , .1)
// light4.add(pointLight4.position , 'y' , -6 , 6 , .1)
// light4.add(pointLight4.position , 'z' , -6 , 6 , .1)
// const light5 = gui.addFolder('Light 5')
// light5.add(rectLight.position , 'x' , -6 , 6 , .1)
// light5.add(rectLight.position , 'y' , -6 , 6 , .1)
// light5.add(rectLight.position , 'z' , -6 , 6 , .1)
// light5.add(rectLight.rotation , 'x' , -6 , 6 , .1)
// light5.add(rectLight.rotation , 'y' , -6 , 6 , .1)
// light5.add(rectLight.rotation , 'z' , -6 , 6 , .1)


//  Light Helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight , .3)
// scene.add(pointLightHelper)
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2 , .3)
// scene.add(pointLightHelper2)
// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3 , .3)
// scene.add(pointLightHelper3)
// const pointLightHelper4 = new THREE.PointLightHelper(pointLight4 , .3)
// scene.add(pointLightHelper4)
// const rectLightHelper = new RectAreaLightHelper(rectLight , '#9a130e')
// scene.add(rectLightHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    // renderer.setClearColor("#000" , 1)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener("load" , () => {
    gsap.from("h1 > span" , {
        yPercent: 120,
        opacity: 0 ,
        stagger: .08,
    })
})
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false
controls.enableRotate = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/**
 * Animate
 */
//  mouse
let mouse = new THREE.Vector2()
document.addEventListener("mousemove" , (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1
    mouse.y = -(e.clientY / sizes.height) * 2 + 1
})

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //update obj
    sphere.rotation.y = elapsedTime * .5

    sphere.rotation.x += mouse.x * .02
    sphere.rotation.y += mouse.y * .02
    sphere.rotation.z += mouse.y * .02


    //  Update torus
    torusKnot.rotation.z = elapsedTime * 0.05
    // torus.rotation.y = elapsedTime * .05
    // torus.rotation.z = elapsedTime * .05

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()