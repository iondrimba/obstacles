(()=>{var e={864:()=>{},466:function(e){var t;e.exports=((t=function(){function e(e){return a.appendChild(e.dom),e}function i(e){for(var t=0;t<a.children.length;t++)a.children[t].style.display=t===e?"block":"none";s=e}var s=0,a=document.createElement("div");a.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",a.addEventListener("click",(function(e){e.preventDefault(),i(++s%a.children.length)}),!1);var o=(performance||Date).now(),n=o,r=0,d=e(new t.Panel("FPS","#0ff","#002")),h=e(new t.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=e(new t.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:a,addPanel:e,showPanel:i,begin:function(){o=(performance||Date).now()},end:function(){r++;var e=(performance||Date).now();if(h.update(e-o,200),e>n+1e3&&(d.update(1e3*r/(e-n),100),n=e,r=0,l)){var t=performance.memory;l.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){o=this.end()},domElement:a,setMode:i}}).Panel=function(e,t,i){var s=1/0,a=0,o=Math.round,n=o(window.devicePixelRatio||1),r=80*n,d=48*n,h=3*n,l=2*n,c=3*n,m=15*n,w=74*n,p=30*n,g=document.createElement("canvas");g.width=r,g.height=d,g.style.cssText="width:80px;height:48px";var u=g.getContext("2d");return u.font="bold "+9*n+"px Helvetica,Arial,sans-serif",u.textBaseline="top",u.fillStyle=i,u.fillRect(0,0,r,d),u.fillStyle=t,u.fillText(e,h,l),u.fillRect(c,m,w,p),u.fillStyle=i,u.globalAlpha=.9,u.fillRect(c,m,w,p),{dom:g,update:function(d,f){s=Math.min(s,d),a=Math.max(a,d),u.fillStyle=i,u.globalAlpha=1,u.fillRect(0,0,r,m),u.fillStyle=t,u.fillText(o(d)+" "+e+" ("+o(s)+"-"+o(a)+")",h,l),u.drawImage(g,c+n,m,w-n,p,c,m,w-n,p),u.fillRect(c+w-n,m,n,p),u.fillStyle=i,u.globalAlpha=.9,u.fillRect(c+w-n,m,n,o((1-d/f)*p))}}},t)}},t={};function i(s){if(t[s])return t[s].exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,i),a.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";i(864);var e=i(466),t=i.n(e);const s=e=>e*Math.PI/180,a=e=>{const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16)/255,g:parseInt(t[2],16)/255,b:parseInt(t[3],16)/255}:null};(new class{init(){this.setup(),this.addStatsMonitor(),this.createScene(),this.createCamera(),this.addCameraControls(),this.addAmbientLight(),this.addDirectionalLight(),this.addPhysicsWorld(),this.addFloor(),this.addFloorGrid(),this.addBackWall(),this.addObstacles(),this.addSpheres(),this.addAxisHelper(),this.addGuiControls(),this.animate(),this.addWindowListeners(),this.addFallingBalls()}addFallingBalls(){this.animation.auto?this.animation.loop=function(e,t){const i=Date.now,s=window.requestAnimationFrame;let a,o=i();const n=function(){i()-o<300||(o+=300,e()),a||s(n)};return s(n),{clear:function(){a=1}}}(this.addSpheres.bind(this)):this.animation.loop.clear()}tweenColors(e,t){gsap.to(e.color,.3,{ease:"power2.out",r:t.r,g:t.g,b:t.b})}setup(){var e;this.debug=!1,this.width=window.innerWidth,this.height=window.innerHeight,this.animation={auto:!0,interval:null},this.colors={background:(e=window.getComputedStyle(document.body).backgroundColor,e.match(/[0-9]+/g).reduce(((e,t)=>e+(256|t).toString(16).slice(1)),"#")),wall:"#ff003e",floor:"#ffffff",ball:"#5661ff",cylinder:"#ffff00",grid:"#aca9a9"},this.meshes={container:new THREE.Object3D,spheres:[],obstacles:[],sphereMaterial:new THREE.MeshStandardMaterial({color:this.colors.ball,metalness:.11,emissive:0,roughness:.1}),cylinderMaterial:new THREE.MeshStandardMaterial({color:this.colors.cylinder,emissive:0,roughness:1,metalness:0}),total:1}}createScene(){this.scene=new THREE.Scene,this.scene.background=new THREE.Color(this.colors.background),this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.scene.add(this.meshes.container),this.renderer.setSize(this.width,this.height),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=THREE.PCFSoftShadowMap,document.body.appendChild(this.renderer.domElement)}addAxisHelper(){const e=new THREE.AxesHelper(5);this.debug&&this.scene.add(e)}createCamera(){this.camera=new THREE.PerspectiveCamera(20,window.innerWidth/window.innerHeight,1,1e3),this.camera.position.set(0,10,50),this.scene.add(this.camera)}addCameraControls(){this.orbitControl=new THREE.OrbitControls(this.camera,this.renderer.domElement),this.orbitControl.minPolarAngle=s(30),this.orbitControl.maxPolarAngle=s(90),this.orbitControl.minAzimuthAngle=s(-40),this.orbitControl.maxAzimuthAngle=s(40),this.orbitControl.enableDamping=!0,this.orbitControl.dampingFactor=.02,document.body.style.cursor="-moz-grabg",document.body.style.cursor="-webkit-grab",this.orbitControl.addEventListener("start",(()=>{requestAnimationFrame((()=>{document.body.style.cursor="-moz-grabbing",document.body.style.cursor="-webkit-grabbing"}))})),this.orbitControl.addEventListener("end",(()=>{requestAnimationFrame((()=>{document.body.style.cursor="-moz-grab",document.body.style.cursor="-webkit-grab"}))}))}addAmbientLight(){const e=new THREE.AmbientLight({color:"#ffffff"},.5);this.scene.add(e)}addDirectionalLight(){const e=new THREE.Object3D;e.position.set(0,0,-40),this.directionalLight=new THREE.DirectionalLight(16777215,1),this.directionalLight.castShadow=!0,this.directionalLight.shadow.camera.needsUpdate=!0,this.directionalLight.shadow.mapSize.width=2048,this.directionalLight.shadow.mapSize.height=2048,this.directionalLight.position.set(0,13,23),this.directionalLight.target=e,this.directionalLight.shadow.camera.far=1e3,this.directionalLight.shadow.camera.near=-100,this.directionalLight.shadow.camera.left=-20,this.directionalLight.shadow.camera.right=20,this.directionalLight.shadow.camera.top=15,this.directionalLight.shadow.camera.bottom=-15,this.directionalLight.shadow.camera.zoom=1,this.directionalLight.shadow.camera.needsUpdate=!0,this.scene.add(this.directionalLight)}addFloorGrid(){this.grid=new THREE.GridHelper(100,100,this.colors.grid,this.colors.grid),this.grid.position.set(0,-5,0),this.grid.material.opacity=0,this.grid.material.transparent=!1,this.scene.add(this.grid)}addBackWall(){const e={color:this.colors.wall,side:THREE.DoubleSide},t=new THREE.PlaneBufferGeometry(100,80),i=new THREE.MeshStandardMaterial(e);this.backwall=new THREE.Mesh(t,i),this.backwall.position.z=-.5,this.backwall.receiveShadow=!0,this.scene.add(this.backwall),this.backwall.body=new CANNON.Body({mass:0,position:new CANNON.Vec3(0,3,-.4),material:new CANNON.Material,shape:new CANNON.Plane(2,2,2)}),this.backwall.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),s(0)),this.world.addBody(this.backwall.body)}addFloor(){const e=new THREE.PlaneBufferGeometry(100,80),t=new THREE.MeshStandardMaterial({color:this.colors.floor,side:THREE.DoubleSide});this.floor=new THREE.Mesh(e,t),this.floor.position.y=-5,this.floor.position.z=5,this.floor.rotateX(Math.PI/2),this.floor.receiveShadow=!0,this.scene.add(this.floor),this.floor.body=new CANNON.Body({mass:0,position:new CANNON.Vec3(0,-5,5),material:new CANNON.Material,shape:new CANNON.Plane(2,2,2)}),this.floor.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),s(-90)),this.world.addBody(this.floor.body)}addFloorHelper(){this.controls=new THREE.TransformControls(this.camera,this.renderer.domElement),this.controls.enabled=!1,this.controls.attach(this.floor),this.scene.add(this.controls)}getSphereMesh({x:e,y:t,z:i}){const s=new THREE.SphereBufferGeometry(.3,32,32),a=new THREE.Mesh(s,this.meshes.sphereMaterial);return a.castShadow=!0,a.receiveShadow=!0,a.position.set(e,t,i),a.body=new CANNON.Body({mass:1,material:new CANNON.Material,shape:new CANNON.Sphere(.3),position:new CANNON.Vec3(e,t,i)}),a.body.linearDamping=this.damping,a.body.fixedRotation=!0,a}addObstacle(e=0,t=4,i=0,a=40){const o=new THREE.BoxBufferGeometry(4,1,.1),n=new THREE.MeshStandardMaterial({emissive:0,roughness:1,metalness:0}),r=new THREE.Mesh(o,n);r.castShadow=!0,r.receiveShadow=!0,r.position.set(e,t,i),r.rotation.x=-s(90),r.rotation.y=s(a),this.meshes.container.add(r),this.meshes.obstacles.push(r),r.body=new CANNON.Body({mass:0,material:new CANNON.Material,shape:new CANNON.Box(new CANNON.Vec3(2,.05,.5)),position:new CANNON.Vec3(e,t,i)}),r.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,-1),s(a)),this.world.addBody(r.body)}addObstacles(){this.addObstacle(-3,2,0,30),this.addObstacle(3,2,0,-40),this.addObstacle(0,-2,0,0),this.addCylinder(8,0),this.addCylinder(7,.5),this.addCylinder(6,1),this.addCylinder(5,-.5),this.addCylinder(4,1),this.addCylinder(8,-2),this.addCylinder(7,-2.5),this.addCylinder(6,-2),this.addCylinder(5,-2.5),this.addCylinder(4,-1)}addCylinder(e,t){const i=.1,s=new THREE.CylinderGeometry(i,i,1,32);for(let a=0;a<3;a++){const o=new THREE.Mesh(s,this.meshes.cylinderMaterial);o.position.set(a+t,e,0),o.rotateX(Math.PI/2),o.castShadow=!0,o.receiveShadow=!0,this.meshes.container.add(o),o.body=new CANNON.Body({mass:0,material:new CANNON.Material,shape:new CANNON.Cylinder(i,i,1,32),position:new CANNON.Vec3(a+t,e,0)}),this.world.addBody(o.body)}}addSpheres(){const e=[-2,-1,0,.2,.8,1.1],t=e[Math.floor(Math.random()*e.length)],i=this.getSphereMesh({x:t,y:12,z:0});this.meshes.spheres.push(i),this.meshes.container.add(i),this.world.addBody(i.body);const s=new CANNON.ContactMaterial(this.floor.body.material,i.body.material,{friction:.3,restitution:.5});this.world.addContactMaterial(s),this.meshes.spheres.forEach((e=>{this.meshes.obstacles.forEach((t=>{const i=new CANNON.ContactMaterial(t.body.material,e.body.material,{friction:.3,restitution:.5});this.world.addContactMaterial(i)}))}))}addPhysicsWorld(){this.fixedTimeStep=1/60,this.maxSubSteps=3,this.damping=.09,this.time=.01,this.lastTime=this.time,this.world=new CANNON.World,this.world.gravity.set(0,-20,.08),this.world.broadphase=new CANNON.NaiveBroadphase,this.world.solver.iterations=10,this.world.defaultContactMaterial.contactEquationStiffness=1e6,this.world.defaultContactMaterial.contactEquationRelaxation=3,this.cannonDebugRenderer=this.debug&&new THREE.CannonDebugRenderer(this.scene,this.world)}addGuiControls(){this.pane=new Tweakpane,this.guiAnimation=this.pane.addFolder({title:"Animation"}),this.guiAnimation.addInput(this.animation,"auto").on("change",(e=>{this.animation.auto=e,this.addFallingBalls()})),this.pane.addButton({title:"Add Ball"}).on("click",(()=>{this.addSpheres()})),this.guiColors=this.pane.addFolder({title:"Colors",expanded:!0}),this.guiColors.addInput(this.colors,"wall").on("change",(e=>{this.tweenColors(this.backwall.material,a(e))})),this.guiColors.addInput(this.colors,"floor").on("change",(e=>{this.tweenColors(this.floor.material,a(e))})),this.guiColors.addInput(this.colors,"ball").on("change",(e=>{this.tweenColors(this.meshes.sphereMaterial,a(e))})),this.guiColors.addInput(this.colors,"cylinder").on("change",(e=>{this.tweenColors(this.meshes.cylinderMaterial,a(e))})),this.guiColors.addInput(this.colors,"grid").on("change",(e=>{this.tweenColors(this.grid.material,a(e))})),this.guiLights=this.pane.addFolder({title:"Lights",expanded:!1}),this.guiLights.addInput(this.directionalLight.position,"x",{min:-100,max:100}).on("change",(e=>{this.directionalLight.position.x=e})),this.guiLights.addInput(this.directionalLight.position,"y",{min:-100,max:100}).on("change",(e=>{this.directionalLight.position.y=e})),this.guiLights.addInput(this.directionalLight.position,"z",{min:-100,max:100}).on("change",(e=>{this.directionalLight.position.z=e}))}addWindowListeners(){window.addEventListener("resize",this.onResize.bind(this),{passive:!0}),window.addEventListener("visibilitychange",(e=>{e.target.hidden&&(this.animation.auto=!1,this.addFallingBalls(),this.pane.refresh())}),!1)}addStatsMonitor(){this.stats=new(t()),this.stats.showPanel(0),document.body.appendChild(this.stats.dom)}onResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}animate(){if(this.stats.begin(),this.orbitControl.update(),this.renderer.render(this.scene,this.camera),void 0!==this.lastTime){this.debug&&this.cannonDebugRenderer.update();var e=(this.time-this.lastTime)/1e3;this.world.step(this.fixedTimeStep,e,this.maxSubSteps),this.meshes.spheres.forEach((e=>{e.position.copy(e.body.position),e.quaternion.copy(e.body.quaternion)}))}this.stats.end(),this.lastTime=this.time,requestAnimationFrame(this.animate.bind(this))}}).init()})()})();