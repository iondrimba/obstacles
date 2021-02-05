THREE.TransformControls=function(e,t){void 0===t&&(console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.'),t=document),THREE.Object3D.call(this),this.visible=!1,this.domElement=t;var n=new THREE.TransformControlsGizmo;this.add(n);var o=new THREE.TransformControlsPlane;this.add(o);var i=this;O("camera",e),O("object",void 0),O("enabled",!0),O("axis",null),O("mode","translate"),O("translationSnap",null),O("rotationSnap",null),O("scaleSnap",null),O("space","world"),O("size",1),O("dragging",!1),O("showX",!0),O("showY",!0),O("showZ",!0);var a={type:"change"},s={type:"mouseDown"},r={type:"mouseUp",mode:i.mode},l={type:"objectChange"},c=new THREE.Raycaster;function h(e,t,n){for(var o=t.intersectObject(e,!0),i=0;i<o.length;i++)if(o[i].object.visible||n)return o[i];return!1}var E=new THREE.Vector3,p=new THREE.Vector3,d=new THREE.Quaternion,m={X:new THREE.Vector3(1,0,0),Y:new THREE.Vector3(0,1,0),Z:new THREE.Vector3(0,0,1)},u=new THREE.Vector3,w=new THREE.Vector3,T=new THREE.Vector3,y=new THREE.Vector3,R=new THREE.Vector3,H=new THREE.Vector3,M=0,v=new THREE.Vector3,b=new THREE.Quaternion,f=new THREE.Vector3,x=new THREE.Vector3,g=new THREE.Quaternion,P=new THREE.Quaternion,X=new THREE.Vector3,Y=new THREE.Vector3,Z=new THREE.Quaternion,S=new THREE.Vector3,Q=new THREE.Vector3,I=new THREE.Quaternion,G=new THREE.Quaternion,L=new THREE.Vector3,j=new THREE.Vector3,z=new THREE.Vector3,C=new THREE.Quaternion,V=new THREE.Vector3;function O(e,t){var s=t;Object.defineProperty(i,e,{get:function(){return void 0!==s?s:t},set:function(t){s!==t&&(s=t,o[e]=t,n[e]=t,i.dispatchEvent({type:e+"-changed",value:t}),i.dispatchEvent(a))}}),i[e]=t,o[e]=t,n[e]=t}function A(e){if(i.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:e.button};var n=e.changedTouches?e.changedTouches[0]:e,o=t.getBoundingClientRect();return{x:(n.clientX-o.left)/o.width*2-1,y:-(n.clientY-o.top)/o.height*2+1,button:e.button}}function D(e){if(i.enabled)switch(e.pointerType){case"mouse":case"pen":i.pointerHover(A(e))}}function F(e){i.enabled&&(i.domElement.style.touchAction="none",i.domElement.ownerDocument.addEventListener("pointermove",k),i.pointerHover(A(e)),i.pointerDown(A(e)))}function k(e){i.enabled&&i.pointerMove(A(e))}function q(e){i.enabled&&(i.domElement.style.touchAction="",i.domElement.ownerDocument.removeEventListener("pointermove",k),i.pointerUp(A(e)))}O("worldPosition",Q),O("worldPositionStart",Y),O("worldQuaternion",I),O("worldQuaternionStart",Z),O("cameraPosition",v),O("cameraQuaternion",b),O("pointStart",u),O("pointEnd",w),O("rotationAxis",y),O("rotationAngle",M),O("eye",j),t.addEventListener("pointerdown",F),t.addEventListener("pointermove",D),i.domElement.ownerDocument.addEventListener("pointerup",q),this.dispose=function(){t.removeEventListener("pointerdown",F),t.removeEventListener("pointermove",D),i.domElement.ownerDocument.removeEventListener("pointermove",k),i.domElement.ownerDocument.removeEventListener("pointerup",q),this.traverse((function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}))},this.attach=function(e){return this.object=e,this.visible=!0,this},this.detach=function(){return this.object=void 0,this.visible=!1,this.axis=null,this},this.updateMatrixWorld=function(){void 0!==this.object&&(this.object.updateMatrixWorld(),null===this.object.parent?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):this.object.parent.matrixWorld.decompose(x,g,X),this.object.matrixWorld.decompose(Q,I,L),P.copy(g).invert(),G.copy(I).invert()),this.camera.updateMatrixWorld(),this.camera.matrixWorld.decompose(v,b,f),j.copy(v).sub(Q).normalize(),THREE.Object3D.prototype.updateMatrixWorld.call(this)},this.pointerHover=function(e){if(void 0!==this.object&&!0!==this.dragging){c.setFromCamera(e,this.camera);var t=h(n.picker[this.mode],c);this.axis=t?t.object.name:null}},this.pointerDown=function(e){if(void 0!==this.object&&!0!==this.dragging&&0===e.button&&null!==this.axis){c.setFromCamera(e,this.camera);var t=h(o,c,!0);if(t){var n=this.space;if("scale"===this.mode?n="local":"E"!==this.axis&&"XYZE"!==this.axis&&"XYZ"!==this.axis||(n="world"),"local"===n&&"rotate"===this.mode){var i=this.rotationSnap;"X"===this.axis&&i&&(this.object.rotation.x=Math.round(this.object.rotation.x/i)*i),"Y"===this.axis&&i&&(this.object.rotation.y=Math.round(this.object.rotation.y/i)*i),"Z"===this.axis&&i&&(this.object.rotation.z=Math.round(this.object.rotation.z/i)*i)}this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),z.copy(this.object.position),C.copy(this.object.quaternion),V.copy(this.object.scale),this.object.matrixWorld.decompose(Y,Z,S),u.copy(t.point).sub(Y)}this.dragging=!0,s.mode=this.mode,this.dispatchEvent(s)}},this.pointerMove=function(e){var t=this.axis,n=this.mode,i=this.object,s=this.space;if("scale"===n?s="local":"E"!==t&&"XYZE"!==t&&"XYZ"!==t||(s="world"),void 0!==i&&null!==t&&!1!==this.dragging&&-1===e.button){c.setFromCamera(e,this.camera);var r=h(o,c,!0);if(r){if(w.copy(r.point).sub(Y),"translate"===n)T.copy(w).sub(u),"local"===s&&"XYZ"!==t&&T.applyQuaternion(G),-1===t.indexOf("X")&&(T.x=0),-1===t.indexOf("Y")&&(T.y=0),-1===t.indexOf("Z")&&(T.z=0),"local"===s&&"XYZ"!==t?T.applyQuaternion(C).divide(X):T.applyQuaternion(P).divide(X),i.position.copy(T).add(z),this.translationSnap&&("local"===s&&(i.position.applyQuaternion(d.copy(C).invert()),-1!==t.search("X")&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),-1!==t.search("Y")&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),-1!==t.search("Z")&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.position.applyQuaternion(C)),"world"===s&&(i.parent&&i.position.add(E.setFromMatrixPosition(i.parent.matrixWorld)),-1!==t.search("X")&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),-1!==t.search("Y")&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),-1!==t.search("Z")&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.parent&&i.position.sub(E.setFromMatrixPosition(i.parent.matrixWorld))));else if("scale"===n){if(-1!==t.search("XYZ")){var v=w.length()/u.length();w.dot(u)<0&&(v*=-1),p.set(v,v,v)}else E.copy(u),p.copy(w),E.applyQuaternion(G),p.applyQuaternion(G),p.divide(E),-1===t.search("X")&&(p.x=1),-1===t.search("Y")&&(p.y=1),-1===t.search("Z")&&(p.z=1);i.scale.copy(V).multiply(p),this.scaleSnap&&(-1!==t.search("X")&&(i.scale.x=Math.round(i.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),-1!==t.search("Y")&&(i.scale.y=Math.round(i.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),-1!==t.search("Z")&&(i.scale.z=Math.round(i.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if("rotate"===n){T.copy(w).sub(u);var b=20/Q.distanceTo(E.setFromMatrixPosition(this.camera.matrixWorld));"E"===t?(y.copy(j),M=w.angleTo(u),R.copy(u).normalize(),H.copy(w).normalize(),M*=H.cross(R).dot(j)<0?1:-1):"XYZE"===t?(y.copy(T).cross(j).normalize(),M=T.dot(E.copy(y).cross(this.eye))*b):"X"!==t&&"Y"!==t&&"Z"!==t||(y.copy(m[t]),E.copy(m[t]),"local"===s&&E.applyQuaternion(I),M=T.dot(E.cross(j).normalize())*b),this.rotationSnap&&(M=Math.round(M/this.rotationSnap)*this.rotationSnap),this.rotationAngle=M,"local"===s&&"E"!==t&&"XYZE"!==t?(i.quaternion.copy(C),i.quaternion.multiply(d.setFromAxisAngle(y,M)).normalize()):(y.applyQuaternion(P),i.quaternion.copy(d.setFromAxisAngle(y,M)),i.quaternion.multiply(C).normalize())}this.dispatchEvent(a),this.dispatchEvent(l)}}},this.pointerUp=function(e){0===e.button&&(this.dragging&&null!==this.axis&&(r.mode=this.mode,this.dispatchEvent(r)),this.dragging=!1,this.axis=null)},this.getMode=function(){return i.mode},this.setMode=function(e){i.mode=e},this.setTranslationSnap=function(e){i.translationSnap=e},this.setRotationSnap=function(e){i.rotationSnap=e},this.setScaleSnap=function(e){i.scaleSnap=e},this.setSize=function(e){i.size=e},this.setSpace=function(e){i.space=e},this.update=function(){console.warn("THREE.TransformControls: update function has no more functionality and therefore has been deprecated.")}},THREE.TransformControls.prototype=Object.assign(Object.create(THREE.Object3D.prototype),{constructor:THREE.TransformControls,isTransformControls:!0}),THREE.TransformControlsGizmo=function(){"use strict";THREE.Object3D.call(this),this.type="TransformControlsGizmo";var e=new THREE.MeshBasicMaterial({depthTest:!1,depthWrite:!1,transparent:!0,side:THREE.DoubleSide,fog:!1,toneMapped:!1}),t=new THREE.LineBasicMaterial({depthTest:!1,depthWrite:!1,transparent:!0,linewidth:1,fog:!1,toneMapped:!1}),n=e.clone();n.opacity=.15;var o=e.clone();o.opacity=.33;var i=e.clone();i.color.set(16711680);var a=e.clone();a.color.set(65280);var s=e.clone();s.color.set(255);var r=e.clone();r.opacity=.25;var l=r.clone();l.color.set(16776960);var c=r.clone();c.color.set(65535);var h=r.clone();h.color.set(16711935),e.clone().color.set(16776960);var E=t.clone();E.color.set(16711680);var p=t.clone();p.color.set(65280);var d=t.clone();d.color.set(255);var m=t.clone();m.color.set(65535);var u=t.clone();u.color.set(16711935);var w=t.clone();w.color.set(16776960);var T=t.clone();T.color.set(7895160);var y=w.clone();y.opacity=.25;var R=new THREE.CylinderGeometry(0,.05,.2,12,1,!1),H=new THREE.BoxGeometry(.125,.125,.125),M=new THREE.BufferGeometry;M.setAttribute("position",new THREE.Float32BufferAttribute([0,0,0,1,0,0],3));var v,b=function(e,t){for(var n=new THREE.BufferGeometry,o=[],i=0;i<=64*t;++i)o.push(0,Math.cos(i/32*Math.PI)*e,Math.sin(i/32*Math.PI)*e);return n.setAttribute("position",new THREE.Float32BufferAttribute(o,3)),n},f={X:[[new THREE.Mesh(R,i),[1,0,0],[0,0,-Math.PI/2],null,"fwd"],[new THREE.Mesh(R,i),[1,0,0],[0,0,Math.PI/2],null,"bwd"],[new THREE.Line(M,E)]],Y:[[new THREE.Mesh(R,a),[0,1,0],null,null,"fwd"],[new THREE.Mesh(R,a),[0,1,0],[Math.PI,0,0],null,"bwd"],[new THREE.Line(M,p),null,[0,0,Math.PI/2]]],Z:[[new THREE.Mesh(R,s),[0,0,1],[Math.PI/2,0,0],null,"fwd"],[new THREE.Mesh(R,s),[0,0,1],[-Math.PI/2,0,0],null,"bwd"],[new THREE.Line(M,d),null,[0,-Math.PI/2,0]]],XYZ:[[new THREE.Mesh(new THREE.OctahedronGeometry(.1,0),r.clone()),[0,0,0],[0,0,0]]],XY:[[new THREE.Mesh(new THREE.PlaneGeometry(.295,.295),l.clone()),[.15,.15,0]],[new THREE.Line(M,w),[.18,.3,0],null,[.125,1,1]],[new THREE.Line(M,w),[.3,.18,0],[0,0,Math.PI/2],[.125,1,1]]],YZ:[[new THREE.Mesh(new THREE.PlaneGeometry(.295,.295),c.clone()),[0,.15,.15],[0,Math.PI/2,0]],[new THREE.Line(M,m),[0,.18,.3],[0,0,Math.PI/2],[.125,1,1]],[new THREE.Line(M,m),[0,.3,.18],[0,-Math.PI/2,0],[.125,1,1]]],XZ:[[new THREE.Mesh(new THREE.PlaneGeometry(.295,.295),h.clone()),[.15,0,.15],[-Math.PI/2,0,0]],[new THREE.Line(M,u),[.18,0,.3],null,[.125,1,1]],[new THREE.Line(M,u),[.3,0,.18],[0,-Math.PI/2,0],[.125,1,1]]]},x={X:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),n),[.6,0,0],[0,0,-Math.PI/2]]],Y:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),n),[0,.6,0]]],Z:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),n),[0,0,.6],[Math.PI/2,0,0]]],XYZ:[[new THREE.Mesh(new THREE.OctahedronGeometry(.2,0),n)]],XY:[[new THREE.Mesh(new THREE.PlaneGeometry(.4,.4),n),[.2,.2,0]]],YZ:[[new THREE.Mesh(new THREE.PlaneGeometry(.4,.4),n),[0,.2,.2],[0,Math.PI/2,0]]],XZ:[[new THREE.Mesh(new THREE.PlaneGeometry(.4,.4),n),[.2,0,.2],[-Math.PI/2,0,0]]]},g={START:[[new THREE.Mesh(new THREE.OctahedronGeometry(.01,2),o),null,null,null,"helper"]],END:[[new THREE.Mesh(new THREE.OctahedronGeometry(.01,2),o),null,null,null,"helper"]],DELTA:[[new THREE.Line((v=new THREE.BufferGeometry,v.setAttribute("position",new THREE.Float32BufferAttribute([0,0,0,1,1,1],3)),v),o),null,null,null,"helper"]],X:[[new THREE.Line(M,o.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new THREE.Line(M,o.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new THREE.Line(M,o.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},P={X:[[new THREE.Line(b(1,.5),E)],[new THREE.Mesh(new THREE.OctahedronGeometry(.04,0),i),[0,0,.99],null,[1,3,1]]],Y:[[new THREE.Line(b(1,.5),p),null,[0,0,-Math.PI/2]],[new THREE.Mesh(new THREE.OctahedronGeometry(.04,0),a),[0,0,.99],null,[3,1,1]]],Z:[[new THREE.Line(b(1,.5),d),null,[0,Math.PI/2,0]],[new THREE.Mesh(new THREE.OctahedronGeometry(.04,0),s),[.99,0,0],null,[1,3,1]]],E:[[new THREE.Line(b(1.25,1),y),null,[0,Math.PI/2,0]],[new THREE.Mesh(new THREE.CylinderGeometry(.03,0,.15,4,1,!1),y),[1.17,0,0],[0,0,-Math.PI/2],[1,1,.001]],[new THREE.Mesh(new THREE.CylinderGeometry(.03,0,.15,4,1,!1),y),[-1.17,0,0],[0,0,Math.PI/2],[1,1,.001]],[new THREE.Mesh(new THREE.CylinderGeometry(.03,0,.15,4,1,!1),y),[0,-1.17,0],[Math.PI,0,0],[1,1,.001]],[new THREE.Mesh(new THREE.CylinderGeometry(.03,0,.15,4,1,!1),y),[0,1.17,0],[0,0,0],[1,1,.001]]],XYZE:[[new THREE.Line(b(1,1),T),null,[0,Math.PI/2,0]]]},X={AXIS:[[new THREE.Line(M,o.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},Y={X:[[new THREE.Mesh(new THREE.TorusGeometry(1,.1,4,24),n),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new THREE.Mesh(new THREE.TorusGeometry(1,.1,4,24),n),[0,0,0],[Math.PI/2,0,0]]],Z:[[new THREE.Mesh(new THREE.TorusGeometry(1,.1,4,24),n),[0,0,0],[0,0,-Math.PI/2]]],E:[[new THREE.Mesh(new THREE.TorusGeometry(1.25,.1,2,24),n)]],XYZE:[[new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),n)]]},Z={X:[[new THREE.Mesh(H,i),[.8,0,0],[0,0,-Math.PI/2]],[new THREE.Line(M,E),null,null,[.8,1,1]]],Y:[[new THREE.Mesh(H,a),[0,.8,0]],[new THREE.Line(M,p),null,[0,0,Math.PI/2],[.8,1,1]]],Z:[[new THREE.Mesh(H,s),[0,0,.8],[Math.PI/2,0,0]],[new THREE.Line(M,d),null,[0,-Math.PI/2,0],[.8,1,1]]],XY:[[new THREE.Mesh(H,l),[.85,.85,0],null,[2,2,.2]],[new THREE.Line(M,w),[.855,.98,0],null,[.125,1,1]],[new THREE.Line(M,w),[.98,.855,0],[0,0,Math.PI/2],[.125,1,1]]],YZ:[[new THREE.Mesh(H,c),[0,.85,.85],null,[.2,2,2]],[new THREE.Line(M,m),[0,.855,.98],[0,0,Math.PI/2],[.125,1,1]],[new THREE.Line(M,m),[0,.98,.855],[0,-Math.PI/2,0],[.125,1,1]]],XZ:[[new THREE.Mesh(H,h),[.85,0,.85],null,[2,.2,2]],[new THREE.Line(M,u),[.855,0,.98],null,[.125,1,1]],[new THREE.Line(M,u),[.98,0,.855],[0,-Math.PI/2,0],[.125,1,1]]],XYZX:[[new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125),r.clone()),[1.1,0,0]]],XYZY:[[new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125),r.clone()),[0,1.1,0]]],XYZZ:[[new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125),r.clone()),[0,0,1.1]]]},S={X:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,.8,4,1,!1),n),[.5,0,0],[0,0,-Math.PI/2]]],Y:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,.8,4,1,!1),n),[0,.5,0]]],Z:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,.8,4,1,!1),n),[0,0,.5],[Math.PI/2,0,0]]],XY:[[new THREE.Mesh(H,n),[.85,.85,0],null,[3,3,.2]]],YZ:[[new THREE.Mesh(H,n),[0,.85,.85],null,[.2,3,3]]],XZ:[[new THREE.Mesh(H,n),[.85,0,.85],null,[3,.2,3]]],XYZX:[[new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2),n),[1.1,0,0]]],XYZY:[[new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2),n),[0,1.1,0]]],XYZZ:[[new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2),n),[0,0,1.1]]]},Q={X:[[new THREE.Line(M,o.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new THREE.Line(M,o.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new THREE.Line(M,o.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},I=function(e){var t=new THREE.Object3D;for(var n in e)for(var o=e[n].length;o--;){var i=e[n][o][0].clone(),a=e[n][o][1],s=e[n][o][2],r=e[n][o][3],l=e[n][o][4];i.name=n,i.tag=l,a&&i.position.set(a[0],a[1],a[2]),s&&i.rotation.set(s[0],s[1],s[2]),r&&i.scale.set(r[0],r[1],r[2]),i.updateMatrix();var c=i.geometry.clone();c.applyMatrix4(i.matrix),i.geometry=c,i.renderOrder=1/0,i.position.set(0,0,0),i.rotation.set(0,0,0),i.scale.set(1,1,1),t.add(i)}return t},G=new THREE.Vector3(0,0,0),L=new THREE.Euler,j=new THREE.Vector3(0,1,0),z=new THREE.Vector3(0,0,0),C=new THREE.Matrix4,V=new THREE.Quaternion,O=new THREE.Quaternion,A=new THREE.Quaternion,D=new THREE.Vector3(1,0,0),F=new THREE.Vector3(0,1,0),k=new THREE.Vector3(0,0,1);this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=I(f)),this.add(this.gizmo.rotate=I(P)),this.add(this.gizmo.scale=I(Z)),this.add(this.picker.translate=I(x)),this.add(this.picker.rotate=I(Y)),this.add(this.picker.scale=I(S)),this.add(this.helper.translate=I(g)),this.add(this.helper.rotate=I(X)),this.add(this.helper.scale=I(Q)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1,this.updateMatrixWorld=function(){var e=this.space;"scale"===this.mode&&(e="local");var t="local"===e?this.worldQuaternion:A;this.gizmo.translate.visible="translate"===this.mode,this.gizmo.rotate.visible="rotate"===this.mode,this.gizmo.scale.visible="scale"===this.mode,this.helper.translate.visible="translate"===this.mode,this.helper.rotate.visible="rotate"===this.mode,this.helper.scale.visible="scale"===this.mode;var n=[];n=(n=(n=n.concat(this.picker[this.mode].children)).concat(this.gizmo[this.mode].children)).concat(this.helper[this.mode].children);for(var o=0;o<n.length;o++){var i,a=n[o];if(a.visible=!0,a.rotation.set(0,0,0),a.position.copy(this.worldPosition),i=this.camera.isOrthographicCamera?(this.camera.top-this.camera.bottom)/this.camera.zoom:this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),a.scale.set(1,1,1).multiplyScalar(i*this.size/7),"helper"!==a.tag){if(a.quaternion.copy(t),"translate"===this.mode||"scale"===this.mode){var s=.99;"X"!==a.name&&"XYZX"!==a.name||Math.abs(j.copy(D).applyQuaternion(t).dot(this.eye))>s&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),"Y"!==a.name&&"XYZY"!==a.name||Math.abs(j.copy(F).applyQuaternion(t).dot(this.eye))>s&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),"Z"!==a.name&&"XYZZ"!==a.name||Math.abs(j.copy(k).applyQuaternion(t).dot(this.eye))>s&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),"XY"===a.name&&Math.abs(j.copy(k).applyQuaternion(t).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),"YZ"===a.name&&Math.abs(j.copy(D).applyQuaternion(t).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),"XZ"===a.name&&Math.abs(j.copy(F).applyQuaternion(t).dot(this.eye))<.2&&(a.scale.set(1e-10,1e-10,1e-10),a.visible=!1),-1!==a.name.search("X")&&(j.copy(D).applyQuaternion(t).dot(this.eye)<0?"fwd"===a.tag?a.visible=!1:a.scale.x*=-1:"bwd"===a.tag&&(a.visible=!1)),-1!==a.name.search("Y")&&(j.copy(F).applyQuaternion(t).dot(this.eye)<0?"fwd"===a.tag?a.visible=!1:a.scale.y*=-1:"bwd"===a.tag&&(a.visible=!1)),-1!==a.name.search("Z")&&(j.copy(k).applyQuaternion(t).dot(this.eye)<0?"fwd"===a.tag?a.visible=!1:a.scale.z*=-1:"bwd"===a.tag&&(a.visible=!1))}else"rotate"===this.mode&&(O.copy(t),j.copy(this.eye).applyQuaternion(V.copy(t).invert()),-1!==a.name.search("E")&&a.quaternion.setFromRotationMatrix(C.lookAt(this.eye,z,F)),"X"===a.name&&(V.setFromAxisAngle(D,Math.atan2(-j.y,j.z)),V.multiplyQuaternions(O,V),a.quaternion.copy(V)),"Y"===a.name&&(V.setFromAxisAngle(F,Math.atan2(j.x,j.z)),V.multiplyQuaternions(O,V),a.quaternion.copy(V)),"Z"===a.name&&(V.setFromAxisAngle(k,Math.atan2(j.y,j.x)),V.multiplyQuaternions(O,V),a.quaternion.copy(V)));a.visible=a.visible&&(-1===a.name.indexOf("X")||this.showX),a.visible=a.visible&&(-1===a.name.indexOf("Y")||this.showY),a.visible=a.visible&&(-1===a.name.indexOf("Z")||this.showZ),a.visible=a.visible&&(-1===a.name.indexOf("E")||this.showX&&this.showY&&this.showZ),a.material._opacity=a.material._opacity||a.material.opacity,a.material._color=a.material._color||a.material.color.clone(),a.material.color.copy(a.material._color),a.material.opacity=a.material._opacity,this.enabled?this.axis&&(a.name===this.axis||this.axis.split("").some((function(e){return a.name===e}))?(a.material.opacity=1,a.material.color.lerp(new THREE.Color(1,1,1),.5)):(a.material.opacity*=.25,a.material.color.lerp(new THREE.Color(1,1,1),.5))):(a.material.opacity*=.5,a.material.color.lerp(new THREE.Color(1,1,1),.5))}else a.visible=!1,"AXIS"===a.name?(a.position.copy(this.worldPositionStart),a.visible=!!this.axis,"X"===this.axis&&(V.setFromEuler(L.set(0,0,0)),a.quaternion.copy(t).multiply(V),Math.abs(j.copy(D).applyQuaternion(t).dot(this.eye))>.9&&(a.visible=!1)),"Y"===this.axis&&(V.setFromEuler(L.set(0,0,Math.PI/2)),a.quaternion.copy(t).multiply(V),Math.abs(j.copy(F).applyQuaternion(t).dot(this.eye))>.9&&(a.visible=!1)),"Z"===this.axis&&(V.setFromEuler(L.set(0,Math.PI/2,0)),a.quaternion.copy(t).multiply(V),Math.abs(j.copy(k).applyQuaternion(t).dot(this.eye))>.9&&(a.visible=!1)),"XYZE"===this.axis&&(V.setFromEuler(L.set(0,Math.PI/2,0)),j.copy(this.rotationAxis),a.quaternion.setFromRotationMatrix(C.lookAt(z,j,F)),a.quaternion.multiply(V),a.visible=this.dragging),"E"===this.axis&&(a.visible=!1)):"START"===a.name?(a.position.copy(this.worldPositionStart),a.visible=this.dragging):"END"===a.name?(a.position.copy(this.worldPosition),a.visible=this.dragging):"DELTA"===a.name?(a.position.copy(this.worldPositionStart),a.quaternion.copy(this.worldQuaternionStart),G.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),G.applyQuaternion(this.worldQuaternionStart.clone().invert()),a.scale.copy(G),a.visible=this.dragging):(a.quaternion.copy(t),this.dragging?a.position.copy(this.worldPositionStart):a.position.copy(this.worldPosition),this.axis&&(a.visible=-1!==this.axis.search(a.name)))}THREE.Object3D.prototype.updateMatrixWorld.call(this)}},THREE.TransformControlsGizmo.prototype=Object.assign(Object.create(THREE.Object3D.prototype),{constructor:THREE.TransformControlsGizmo,isTransformControlsGizmo:!0}),THREE.TransformControlsPlane=function(){"use strict";THREE.Mesh.call(this,new THREE.PlaneGeometry(1e5,1e5,2,2),new THREE.MeshBasicMaterial({visible:!1,wireframe:!0,side:THREE.DoubleSide,transparent:!0,opacity:.1,toneMapped:!1})),this.type="TransformControlsPlane";var e=new THREE.Vector3(1,0,0),t=new THREE.Vector3(0,1,0),n=new THREE.Vector3(0,0,1),o=new THREE.Vector3,i=new THREE.Vector3,a=new THREE.Vector3,s=new THREE.Matrix4,r=new THREE.Quaternion;this.updateMatrixWorld=function(){var l=this.space;switch(this.position.copy(this.worldPosition),"scale"===this.mode&&(l="local"),e.set(1,0,0).applyQuaternion("local"===l?this.worldQuaternion:r),t.set(0,1,0).applyQuaternion("local"===l?this.worldQuaternion:r),n.set(0,0,1).applyQuaternion("local"===l?this.worldQuaternion:r),a.copy(t),this.mode){case"translate":case"scale":switch(this.axis){case"X":a.copy(this.eye).cross(e),i.copy(e).cross(a);break;case"Y":a.copy(this.eye).cross(t),i.copy(t).cross(a);break;case"Z":a.copy(this.eye).cross(n),i.copy(n).cross(a);break;case"XY":i.copy(n);break;case"YZ":i.copy(e);break;case"XZ":a.copy(n),i.copy(t);break;case"XYZ":case"E":i.set(0,0,0)}break;case"rotate":default:i.set(0,0,0)}0===i.length()?this.quaternion.copy(this.cameraQuaternion):(s.lookAt(o.set(0,0,0),i,a),this.quaternion.setFromRotationMatrix(s)),THREE.Object3D.prototype.updateMatrixWorld.call(this)}},THREE.TransformControlsPlane.prototype=Object.assign(Object.create(THREE.Mesh.prototype),{constructor:THREE.TransformControlsPlane,isTransformControlsPlane:!0});