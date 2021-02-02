import '../styles/index.css';
import Stats from 'stats.js';
import chroma from 'chroma-js';

import {
  radians,
  rgbToHex,
  Spring2D,
} from './helpers';

export default class App {
  init() {
    this.setup();
    this.createGradientSteps();
    this.createScene();
    this.createCamera();
    this.addCameraControls();
    this.addAmbientLight();
    this.addFloor();
    this.addMeshes();
    this.addDirectionalLight();
    this.addStatsMonitor();
    this.addPhysics();
    this.animate();
    this.addWindowListeners();
  }

  setup() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.motion = {
      mouseX: 0,
      velocity: .2,
      mass: 6.0,
      spring: () => {
        if (this.spring) {
          return this.spring;
        }

        this.spring = new Spring2D(this.width / 2, this.motion.mass)

        return this.spring;
      },
    }

    this.meshes = {
      container: new THREE.Object3D(),
      original: [],
      animated: [],
      total: 1,
    };

    const bgColor = rgbToHex(window.getComputedStyle(document.body).backgroundColor);

    this.colors = {
      background: bgColor,
      primary: bgColor,
      secondary: '#e4f262',
      scheme: {
        type: 'gradient',
        options: {
          monochromatic: 'monochromatic',
          gradient: 'gradient',
        }
      },
      gradient: {
        steps: 10,
        dividers: {},
        colors: () => {
          return chroma.scale([this.colors.primary, this.colors.secondary])
            .mode('lch')
            .colors(this.colors.gradient.steps);
        }
      }
    };
  }

  createGradientSteps() {
    const total = this.meshes.total;
    for (let index = 0; index <= this.meshes.total; index++) {
      if (total % index === 0) {
        this.colors.gradient.dividers = Object.assign({}, this.colors.gradient.dividers, { [index]: index });
      }
    }
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
    this.camera.position.set(15, 20, 30);

    this.scene.add(this.camera);
  }

  addCameraControls() {
    this.controlsOrbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);

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

    this.controls = new THREE.TransformControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', this.animate.bind(this));
    this.controls.attach(this.meshes.original[0]);
    this.scene.add(this.controls);
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight({ color: '#ffffff' }, .35, 500);

    this.scene.add(light);
  }

  addDirectionalLight() {
    const target = new THREE.Object3D();
    target.position.set(0, -5, 0);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.needsUpdate = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.position.set(2, 4, 2);
    this.directionalLight.target = target;

    this.scene.add(this.directionalLight);
    this.scene.add(this.directionalLight.target);
  }

  addFloor() {
    const geometry = new THREE.PlaneBufferGeometry(10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xff00ff, side: THREE.DoubleSide });

    this.floor = new THREE.Mesh(geometry, material);
    this.floor.position.y = 0;
    this.floor.rotateX(Math.PI / 2);
    this.floor.receiveShadow = true;

    this.scene.add(this.floor);
  }

  getMesh() {
    const geometry = new THREE.SphereBufferGeometry(.3, 32, 32);

    const matParams = {
      emissive: 0x0,
      roughness: 1,
      metalness: 0,
    };

    const material = new THREE.MeshStandardMaterial(matParams);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.set(0, 0, 5);

    return mesh;
  }

  addMeshes() {
    const geometric = {
      width: .8,
      height: .8,
      depth: .1,
    };

    for (let index = 0; index < this.meshes.total; index++) {
      geometric.width = ((this.meshes.total - index) + (index * .1)) * .2;
      geometric.height = geometric.width;

      const mesh = this.getMesh(geometric);

      this.meshes.original[index] = mesh;
      this.meshes.animated[index] = mesh;

      this.meshes.container.add(mesh);
    }

    this.meshes.animated.reverse();
    this.motion.spring().update((this.motion.mouseX - ((this.width * .5))) * 2);

    for (let index = 0; index < this.meshes.animated.length; index++) {
      const mesh = this.meshes.animated[index];

      if (index > 0) {
        mesh.initialRotationZ = this.meshes.animated[index - 1].initialRotationZ + .1;
      } else {
        mesh.initialRotationZ = 0;
      }
    }

    const geometry = new THREE.BoxBufferGeometry(1, 1, .1);

    const matParams = {
      emissive: 0x0,
      roughness: 1,
      metalness: 0,
    };

    const material = new THREE.MeshStandardMaterial(matParams);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.set(0, 2, 0);
    mesh.rotation.x = -radians(90);
    mesh.rotation.y = radians(30);

    this.meshes.container.add(mesh);
  }

  addPhysics() {
    this.fixedTimeStep = 1 / 60; // seconds
    this.maxSubSteps = 3;
    this.damping = .05;
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

    // CREATE PLANE
    this.groundBody = new CANNON.Body({
      mass: 0,
      material: new CANNON.Material(),
    });
    this.groundBody.id = 'ground';
    this.groundShape = new CANNON.Plane(1, 1, 1);
    this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), radians(-90));
    this.groundBody.addShape(this.groundShape);
    this.world.addBody(this.groundBody);

    // CREATE SPHERE
    this.radius = .3;
    this.sphereBody = new CANNON.Body({
      mass: 1,
      material: new CANNON.Material(),
      shape: new CANNON.Sphere(this.radius),
      position: new CANNON.Vec3(0, 5, 0),
    });
    this.sphereBody.linearDamping = this.damping;
    this.sphereBody.fixedRotation = true;

    this.sphereBody.angularDamping = .5;
    this.sphereBody.sleepSpeedLimit = 20;
    this.sphereBody.sleepTimeLimit = 20;
    this.world.addBody(this.sphereBody);

    // CREATE BOX
    this.radius = .3;
    this.boxBody = new CANNON.Body({
      mass: 0,
      material: new CANNON.Material(),
      shape: new CANNON.Box(new CANNON.Vec3(.5, .05, .5)),
      position: new CANNON.Vec3(0, 2, 0),
    });

    this.boxBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, -1), radians(30))
    this.world.addBody(this.boxBody);

    // ADD BOUNCE GROUND MATERIAL
    const mat2_ground = new CANNON.ContactMaterial(this.groundBody.material, this.sphereBody.material, { friction: 0.2, restitution: 0.4 });
    this.world.addContactMaterial(mat2_ground);
  }

  draw() {

  }


  addWindowListeners() {
    window.addEventListener('click', () => {
      this.sphereBody.sleep();
      this.sphereBody.position.set(0, 5, 0);
      this.sphereBody.wakeUp();
    });

    window.addEventListener('resize', this.onResize.bind(this), { passive: true });
    window.addEventListener('mousemove', ({ x }) => {
      this.motion.mouseX = x;
    }, { passive: true });
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
    this.draw();
    this.controlsOrbit.update();
    this.renderer.render(this.scene, this.camera);
    this.stats.end();

    // PHYSIC LOOP
    if (this.lastTime !== undefined) {
      this.cannonDebugRenderer.update();
      var dt = (this.time - this.lastTime) / 1000;
      this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);


      this.meshes.original[0].position.copy(this.sphereBody.position);
      this.meshes.original[0].quaternion.copy(this.sphereBody.quaternion);
    }

    this.lastTime = this.time;

    requestAnimationFrame(this.animate.bind(this));
  }
}
