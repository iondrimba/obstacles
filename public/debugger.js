THREE.CannonDebugRenderer=function(e,t,s){s=s||{},this.scene=e,this.world=t,this._meshes=[],this._material=new THREE.MeshBasicMaterial({color:65280,wireframe:!0}),this._sphereGeometry=new THREE.SphereGeometry(1),this._boxGeometry=new THREE.BoxGeometry(1,1,1),this._planeGeometry=new THREE.PlaneGeometry(10,10,10,10),this._cylinderGeometry=new THREE.CylinderGeometry(1,1,10,10)},THREE.CannonDebugRenderer.prototype={tmpVec0:new CANNON.Vec3,tmpVec1:new CANNON.Vec3,tmpVec2:new CANNON.Vec3,tmpQuat0:new CANNON.Vec3,update:function(){for(var e=this.world.bodies,t=this._meshes,s=this.tmpVec0,a=this.tmpQuat0,r=0,n=0;n!==e.length;n++)for(var c=e[n],o=0;o!==c.shapes.length;o++){var i=c.shapes[o];this._updateMesh(r,c,i),(h=t[r])&&(c.quaternion.vmult(c.shapeOffsets[o],s),c.position.vadd(s,s),c.quaternion.mult(c.shapeOrientations[o],a),h.position.copy(s),h.quaternion.copy(a)),r++}for(n=r;n<t.length;n++){var h;(h=t[n])&&this.scene.remove(h)}t.length=r},_updateMesh:function(e,t,s){var a=this._meshes[e];this._typeMatch(a,s)||(a&&this.scene.remove(a),a=this._meshes[e]=this._createMesh(s)),this._scaleMesh(a,s)},_typeMatch:function(e,t){if(!e)return!1;var s=e.geometry;return s instanceof THREE.SphereGeometry&&t instanceof CANNON.Sphere||s instanceof THREE.BoxGeometry&&t instanceof CANNON.Box||s instanceof THREE.PlaneGeometry&&t instanceof CANNON.Plane||s.id===t.geometryId&&t instanceof CANNON.ConvexPolyhedron||s.id===t.geometryId&&t instanceof CANNON.Trimesh||s.id===t.geometryId&&t instanceof CANNON.Heightfield},_createMesh:function(e){var t,s=this._material;switch(e.type){case CANNON.Shape.types.SPHERE:t=new THREE.Mesh(this._sphereGeometry,s);break;case CANNON.Shape.types.BOX:t=new THREE.Mesh(this._boxGeometry,s);break;case CANNON.Shape.types.PLANE:t=new THREE.Mesh(this._planeGeometry,s);break;case CANNON.Shape.types.CONVEXPOLYHEDRON:for(var a=new THREE.Geometry,r=0;r<e.vertices.length;r++){var n=e.vertices[r];a.vertices.push(new THREE.Vector3(n.x,n.y,n.z))}for(r=0;r<e.faces.length;r++)for(var c=e.faces[r],o=c[0],i=1;i<c.length-1;i++){var h=c[i],p=c[i+1];a.faces.push(new THREE.Face3(o,h,p))}a.computeBoundingSphere(),a.computeFaceNormals(),t=new THREE.Mesh(a,s),e.geometryId=a.id;break;case CANNON.Shape.types.TRIMESH:var E=new THREE.Geometry,N=this.tmpVec0,l=this.tmpVec1,m=this.tmpVec2;for(r=0;r<e.indices.length/3;r++)e.getTriangleVertices(r,N,l,m),E.vertices.push(new THREE.Vector3(N.x,N.y,N.z),new THREE.Vector3(l.x,l.y,l.z),new THREE.Vector3(m.x,m.y,m.z)),i=E.vertices.length-3,E.faces.push(new THREE.Face3(i,i+1,i+2));E.computeBoundingSphere(),E.computeFaceNormals(),t=new THREE.Mesh(E,s),e.geometryId=E.id;break;case CANNON.Shape.types.HEIGHTFIELD:E=new THREE.Geometry,N=this.tmpVec0,l=this.tmpVec1,m=this.tmpVec2;for(var y=0;y<e.data.length-1;y++)for(var f=0;f<e.data[y].length-1;f++)for(var d=0;d<2;d++)e.getConvexTrianglePillar(y,f,0===d),N.copy(e.pillarConvex.vertices[0]),l.copy(e.pillarConvex.vertices[1]),m.copy(e.pillarConvex.vertices[2]),N.vadd(e.pillarOffset,N),l.vadd(e.pillarOffset,l),m.vadd(e.pillarOffset,m),E.vertices.push(new THREE.Vector3(N.x,N.y,N.z),new THREE.Vector3(l.x,l.y,l.z),new THREE.Vector3(m.x,m.y,m.z)),r=E.vertices.length-3,E.faces.push(new THREE.Face3(r,r+1,r+2));E.computeBoundingSphere(),E.computeFaceNormals(),t=new THREE.Mesh(E,s),e.geometryId=E.id}return t&&this.scene.add(t),t},_scaleMesh:function(e,t){switch(t.type){case CANNON.Shape.types.SPHERE:var s=t.radius;e.scale.set(s,s,s);break;case CANNON.Shape.types.BOX:e.scale.copy(t.halfExtents),e.scale.multiplyScalar(2);break;case CANNON.Shape.types.CONVEXPOLYHEDRON:e.scale.set(1,1,1);break;case CANNON.Shape.types.TRIMESH:e.scale.copy(t.scale);break;case CANNON.Shape.types.HEIGHTFIELD:e.scale.set(1,1,1)}}};