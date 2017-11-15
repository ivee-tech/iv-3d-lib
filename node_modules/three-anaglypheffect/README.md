# three-anaglyphffect
A fork of the anaglyph effect for npm package

ThreeJS AnaglyphEffect as an npm module. 

```js

var AnaglyphEffect = require('three-anaglypheffect')

function start(gl, width, height) {
    renderer = new THREE.WebGLRenderer({
        canvas: gl.canvas
    })
    renderer.setClearColor(0x000000, 1.0)

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(50, width/height, 1, 1000)
    camera.position.set(0, 1, -3)
    camera.lookAt(new THREE.Vector3())

    var focalLength = 75;
    anaglyphEffect = new AnaglyphEffect(renderer, focalLength, width, height);

    var geo = new THREE.BoxGeometry(1,1,1)
    var mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff })
    var box = new THREE.Mesh(geo, mat)
    scene.add(box)
}

function render(gl, width, height) {
    anaglyphEffect.render(scene, camera);
}
```


#### `AnaglyphEffect = require('three-anaglypheffect')`

This module exports a function which returns an AnaglyphEffect class. This allows you to use the module with CommonJS, globals, etc.


The returned function has the following constructor pattern:

```js
anaglyphEffect = new AnaglyphEffect(renderer, focalLength, width, height)
```
