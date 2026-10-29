"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3351],{93351:(e,o,i)=>{i.r(o),i.d(o,{default:()=>P});var t=i(95155),n=i(81808),r=i(67140),l=i(32034),a=i(88945),s=i(12115),c=i(7720),f=i(86595);let u=parseInt(c.sPf.replace(/\D+/g,"")),d=function(e,o,i,t){var n;return(n=class extends c.BKk{constructor(t){for(let n in super({vertexShader:o,fragmentShader:i,...t}),e)this.uniforms[n]=new c.nc$(e[n]),Object.defineProperty(this,n,{get(){return this.uniforms[n].value},set(e){this.uniforms[n].value=e}});this.uniforms=c.LlO.clone(this.uniforms)}}).key=c.cj9.generateUUID(),n}({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new c.Q1f,sectionColor:new c.Q1f,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new c.Pq0,worldPlanePosition:new c.Pq0},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${u>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),m=s.forwardRef(({args:e,cellColor:o="#000000",sectionColor:i="#2080ff",cellSize:t=.5,sectionSize:n=1,followCamera:r=!1,infiniteGrid:l=!1,fadeDistance:u=100,fadeStrength:m=1,fadeFrom:p=1,cellThickness:g=.5,sectionThickness:h=1,side:x=c.hsX,...v},P)=>{(0,f.e)({GridMaterial:d});let w=s.useRef(null);s.useImperativeHandle(P,()=>w.current,[]);let y=new c.Zcv,M=new c.Pq0(0,1,0),j=new c.Pq0(0,0,0);return(0,f.F)(e=>{y.setFromNormalAndCoplanarPoint(M,j).applyMatrix4(w.current.matrixWorld);let o=w.current.material,i=o.uniforms.worldCamProjPosition,t=o.uniforms.worldPlanePosition;y.projectPoint(e.camera.position,i.value),t.value.set(0,0,0).applyMatrix4(w.current.matrixWorld)}),s.createElement("mesh",(0,a.A)({ref:w,frustumCulled:!1},v),s.createElement("gridMaterial",(0,a.A)({transparent:!0,"extensions-derivatives":!0,side:x},{cellSize:t,sectionSize:n,cellColor:o,sectionColor:i,cellThickness:g,sectionThickness:h},{fadeDistance:u,fadeStrength:m,fadeFrom:p,infiniteGrid:l,followCamera:r})),s.createElement("planeGeometry",{args:e}))});var p=i(30258);let g=-Math.PI/2+.55;function h(e){let{url:o,reduceMotion:i,pointer:l,scroll:a,drag:u,scanSignal:d}=e,m=(0,s.useRef)(null),{scene:p,animations:h}=(0,n.p)(o,!1,!0),{actions:v,names:P}=(0,r.f)(h,m),w=(0,s.useRef)(null),{offset:y,scale:M}=(0,s.useMemo)(()=>{p.updateMatrixWorld(!0);let e=new c.NRn;p.traverse(o=>{if(!o.isMesh)return;let i=new c.NRn().setFromBufferAttribute(o.geometry.attributes.position);e.union(i.applyMatrix4(o.matrixWorld))});let o=e.getSize(new c.Pq0),i=e.getCenter(new c.Pq0),t=2.4/Math.max(o.x,o.y,o.z);return{offset:new c.Pq0(-i.x,-e.min.y,-i.z),scale:t}},[p]);return(0,s.useLayoutEffect)(()=>{p.traverse(e=>{if(!e.isMesh)return;e.castShadow=!1,e.frustumCulled=!1;let o=e.material;(null==o?void 0:o.isMeshStandardMaterial)&&(o.roughness=.62,o.metalness=.05,o.envMapIntensity=0)})},[p]),(0,s.useEffect)(()=>{let e=P[0]?v[P[0]]:void 0;if(e)return e.reset().setLoop(c.aMy,1/0),e.play(),w.current=e,e.paused=i,()=>{e.stop()}},[v,P,i]),(0,f.F)((e,o)=>{var t,n,r;let s=m.current;if(!s||i)return;let f=null!=(t=l.current)?t:{x:0,y:0},d=null!=(n=a.current)?n:0,p=u.current;p&&!p.dragging&&Math.abs(p.velocity)>1e-4&&(p.offset+=p.velocity,p.velocity*=.93);let h=Math.pow(Math.min(1,1.15*d),1.5),x=g+.35*f.x*(1-h)+(null!=(r=null==p?void 0:p.offset)?r:0),v=-(.06*f.y)*(1-h);s.rotation.y=c.cj9.damp(s.rotation.y,x,(null==p?void 0:p.dragging)?14:4,o);let P=6.5*h;s.position.x=c.cj9.damp(s.position.x,Math.sin(s.rotation.y)*P,9,o),s.position.z=c.cj9.damp(s.position.z,Math.cos(s.rotation.y)*P,9,o),s.position.y=h>.02?.04*Math.abs(Math.sin(performance.now()/70))*Math.min(1,4*h):c.cj9.damp(s.position.y,0,8,o),w.current&&(w.current.timeScale=1+3.5*h),s.rotation.x=c.cj9.damp(s.rotation.x,v,3,o)}),(0,t.jsxs)("group",{ref:m,rotation:[0,g,0],scale:M,children:[(0,t.jsx)("primitive",{object:p,position:y}),(0,t.jsx)(x,{reduceMotion:i,signal:d})]})}function x(e){let{reduceMotion:o,signal:i}=e,n=(0,s.useRef)(null),r=(0,s.useRef)(null),l=(0,s.useRef)({pending:!1,start:-10});return((0,s.useEffect)(()=>{i>0&&(l.current.pending=!0)},[i]),(0,f.F)(e=>{let{clock:o}=e;if(!n.current||!r.current)return;let i=o.getElapsedTime();l.current.pending&&(l.current={pending:!1,start:i});let t=i-l.current.start,a=t<2.2?t:i%6,s=a<2?a/2:1,f=1-Math.pow(1-s,3);n.current.position.z=c.cj9.lerp(1.55,-1.55,f),r.current.opacity=a<2?Math.sin(s*Math.PI)*(t<2.2?1:.85):0}),o)?null:(0,t.jsxs)("mesh",{ref:n,position:[0,.26,0],children:[(0,t.jsx)("torusGeometry",{args:[.46,.008,8,96]}),(0,t.jsx)("meshBasicMaterial",{ref:r,color:"#FFC23D",transparent:!0,opacity:0,blending:c.EZo,depthWrite:!1,toneMapped:!1})]})}function v(e){let{pointer:o,reduceMotion:i}=e,t=(0,s.useMemo)(()=>new c.Pq0(0,.28,0),[]);return(0,f.F)((e,n)=>{var r;let{camera:l}=e,a=null!=(r=o.current)?r:{x:0,y:0},s=i?0:.25*a.x,f=i?0:.12*a.y;l.position.x=c.cj9.damp(l.position.x,s,2,n),l.position.y=c.cj9.damp(l.position.y,1.35+f,2,n),l.lookAt(t)}),null}function P(e){let{url:o,lite:i,reduceMotion:n,active:r,pointer:a,scroll:f,drag:u,scanSignal:d}=e;return(0,t.jsxs)(p.Hl,{dpr:i?[1,1.25]:[1,1.75],frameloop:r?n?"demand":"always":"never",camera:{position:[0,1.35,3.9],fov:30,near:.1,far:50},gl:{antialias:!i,alpha:!0,powerPreference:"high-performance"},onCreated:e=>{let{gl:o}=e;o.toneMapping=c.FV,o.toneMappingExposure=1.45,o.outputColorSpace=c.er$},"aria-hidden":!0,children:[(0,t.jsx)("hemisphereLight",{args:["#ffe2bf","#24180c",.85]}),(0,t.jsx)("directionalLight",{position:[2.5,3.5,3],intensity:2.8,color:"#fff1dc"}),(0,t.jsx)("directionalLight",{position:[-3,1.6,-2.5],intensity:4.2,color:"#FFC23D"}),(0,t.jsx)("directionalLight",{position:[3,1.2,-3],intensity:3.4,color:"#F7931E"}),(0,t.jsx)("pointLight",{position:[0,.25,1.4],intensity:.8,color:"#F5A524",distance:3}),(0,t.jsxs)(s.Suspense,{fallback:null,children:[(0,t.jsx)(h,{url:o,reduceMotion:n,pointer:a,scroll:f,drag:u,scanSignal:d}),(0,t.jsx)(l._,{position:[0,.001,0],opacity:.55,scale:5,blur:2.6,far:1.2,resolution:i?256:512,frames:n?1:1/0,color:"#000000"})]}),(0,t.jsx)(m,{position:[0,0,0],args:[12,12],cellSize:.25,cellThickness:.6,cellColor:"#5c3a14",sectionSize:1,sectionThickness:1,sectionColor:"#F7931E",fadeDistance:8,fadeStrength:1.6,infiniteGrid:!0}),(0,t.jsx)(v,{pointer:a,reduceMotion:n})]})}}}]);