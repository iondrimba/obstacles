import '../styles/index.css';
import Stats from 'stats.js';
import chroma from 'chroma-js';

import {
  radians,
  rgbToHex,
} from './helpers';

export default class App {
  init() {
    this.setup();
    this.addStatsMonitor();
    this.createScene();
    this.createCamera();
    this.addCameraControls();
    this.addAmbientLight();
    this.addPhysics();
    this.addBackWall();
    this.addFloor();
    this.addMeshes();
    this.addObstacles();
    this.addDirectionalLight();
    this.animate();
    this.addWindowListeners();
  }

  setup() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.meshes = {
      container: new THREE.Object3D(),
      spheres: [],
      animated: [],
      total: 1,
    };

    const bgColor = rgbToHex(window.getComputedStyle(document.body).backgroundColor);

    this.colors = {
      background: bgColor,
    };
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.colors.background);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.scene.add(this.meshes.container);
    this.renderer.setSize(this.width, this.height);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  createCamera() {
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
    this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 15, 20);

    this.scene.add(this.camera);
  }

  addCameraControls() {
    this.controlsOrbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controlsOrbit.minPolarAngle = radians(90);
    this.controlsOrbit.maxPolarAngle = radians(90);
    this.controlsOrbit.minAzimuthAngle = radians(-40);
    this.controlsOrbit.maxAzimuthAngle = radians(40);
    this.controlsOrbit.enableDamping = true;
    this.controlsOrbit.dampingFactor = 0.02;

    document.body.style.cursor = '-moz-grabg';
    document.body.style.cursor = '-webkit-grab';

    this.controlsOrbit.addEventListener('start', () => {
      requestAnimationFrame(() => {
        document.body.style.cursor = '-moz-grabbing';
        document.body.style.cursor = '-webkit-grabbing';
      });
    });

    this.controlsOrbit.addEventListener('end', () => {
      requestAnimationFrame(() => {
        document.body.style.cursor = '-moz-grab';
        document.body.style.cursor = '-webkit-grab';
      });
    });
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight({ color: '#ffffff' }, .5);

    this.scene.add(light);
  }

  addDirectionalLight() {
    const target = new THREE.Object3D();
    target.position.set(0, 0, -40);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.needsUpdate = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.position.set(0, 10, 30);
    this.directionalLight.target = target;

    this.scene.add(this.directionalLight);
    // this.scene.add(this.directionalLight.target);
  }

  addBackWall() {
    const geometry = new THREE.PlaneBufferGeometry(40, 20);
    const material = new THREE.MeshStandardMaterial({ color: 0xff00ff, side: THREE.DoubleSide });

    this.backwall = new THREE.Mesh(geometry, material);
    this.backwall.position.z = -.5;
    this.backwall.receiveShadow = true;

    this.scene.add(this.backwall);
  }

  addFloor() {
    const geometry = new THREE.PlaneBufferGeometry(40, 20);
    const material = new THREE.MeshStandardMaterial({ color: 0xff00ff, side: THREE.DoubleSide });

    this.floor = new THREE.Mesh(geometry, material);
    this.floor.position.y = -5;
    this.floor.position.z = 5;
    this.floor.rotateX(Math.PI / 2);
    this.floor.receiveShadow = true;

    this.scene.add(this.floor);

    this.controls = new THREE.TransformControls(this.camera, this.renderer.domElement);
    this.controls.enabled = false;
    this.controls.attach(this.floor);
    this.scene.add(this.controls);

    // CREATE PHYSICS PLANE
    this.groundBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, -5, 5),
      material: new CANNON.Material(),
    });

    this.groundBody.id = 'ground';
    this.groundShape = new CANNON.Plane(2,2,2);
    //this.groundShape = new CANNON.Box(new CANNON.Vec3(20, 10, .1)),
    this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), radians(-90));
    this.groundBody.addShape(this.groundShape);
    this.world.addBody(this.groundBody);
  }

  getSphereMesh({ x, y, z }) {
    const radius = .3, width = 32, height = 32;
    const geometry = new THREE.SphereBufferGeometry(radius, width, height);

    const materialParams = {
      emissive: 0x0,
      roughness: 1,
      metalness: 0,
    };
    const material = new THREE.MeshStandardMaterial(materialParams);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x,y,z);

    // CREATE SPHERE BODY
    mesh.body = new CANNON.Body({
      mass: 1,
      material: new CANNON.Material(),
      shape: new CANNON.Sphere(radius),
      position: new CANNON.Vec3(x, y, z),
    });

    mesh.body.linearDamping = this.damping;
    mesh.body.fixedRotation = true;

    return mesh;
  }

  addObstacle(posX = -3, posY = 4, posZ = 0, rotation = 30) {
    const width = 4;
    const geometry = new THREE.BoxBufferGeometry(width, 1, .1);
    const matParams = {
      emissive: 0x0,
      roughness: 1,
      metalness: 0,
    };

    const material = new THREE.MeshStandardMaterial(matParams);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.set(posX, posY, posZ);
    mesh.rotation.x = -radians(90);
    mesh.rotation.y = radians(rotation);

    this.meshes.container.add(mesh);

    // CREATE BOX
    this.radius = .3;
    const boxBody = new CANNON.Body({
      mass: 0,
      material: new CANNON.Material(),
      shape: new CANNON.Box(new CANNON.Vec3(width * .5, .05, .5)),
      position: new CANNON.Vec3(posX, posY, posZ),
    });

    boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, -1), radians(rotation))
    this.world.addBody(boxBody);

    this.meshes.spheres.forEach((s) => {
      // ADD BOUNCE BALL MATERIAL
      const mat = new CANNON.ContactMaterial(boxBody.material, s.body.material, { friction: 0.5, restitution: 0.5 });
      this.world.addContactMaterial(mat);
    });
  }

  addObstacles() {
    this.addObstacle();
    this.addObstacle(0, 2, 0, -30);
    this.addObstacle(-3, -1, 0, 20);
  }

  addMeshes() {
    const s = this.getSphereMesh({ x: -4, y: 8, z: 0 });
    this.meshes.spheres.push(s);
    this.meshes.container.add(s);

    this.world.addBody(s.body);

    // ADD BOUNCE GROUND MATERIAL
    const mat2_ground = new CANNON.ContactMaterial(this.groundBody.material, s.body.material, { friction: 0.3, restitution: 0.5 });
    this.world.addContactMaterial(mat2_ground);
  }

  addPhysics() {
    this.fixedTimeStep = 1 / 60; // seconds
    this.maxSubSteps = 3;
    this.damping = .09;
    this.time = .01;
    this.lastTime = this.time;

    // CREATE WORLD
    this.world = new CANNON.World();
    this.world.gravity.set(0, -20, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.world.defaultContactMaterial.contactEquationStiffness = 1e6;
    this.world.defaultContactMaterial.contactEquationRelaxation = 3;
    this.cannonDebugRenderer = new THREE.CannonDebugRenderer(this.scene, this.world);
  }

  addWindowListeners() {
    window.addEventListener('click', () => {
      this.addMeshes();
    });

    window.addEventListener('resize', this.onResize.bind(this), { passive: true });
  }

  addStatsMonitor() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    this.stats.begin();
    this.controlsOrbit.update();
    this.renderer.render(this.scene, this.camera);

    // PHYSIC LOOP
    if (this.lastTime !== undefined) {
      this.cannonDebugRenderer.update();
      var dt = (this.time - this.lastTime) / 1000;
      this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);

      this.meshes.spheres.forEach((s) => {
        s.position.copy(s.body.position);
        s.quaternion.copy(s.body.quaternion);
      });
    }

    this.stats.end();
    this.lastTime = this.time;

    requestAnimationFrame(this.animate.bind(this));
  }
}
