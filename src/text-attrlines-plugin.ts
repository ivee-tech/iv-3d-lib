import * as THREE from 'three';

import { WglUtil } from './wgl-util';
import { SimpleDictionary } from './models/simple-dictionary';
import { Timeline } from './models/timeline';
import { DataModel } from './models/data-model';
import { ITimelinePlugin } from './i-timeline-plugin';

export class TextAttrLinesPlugin implements ITimelinePlugin {
    config: SimpleDictionary<any>;
    timeline: Timeline;
    data: DataModel;
    w: WglUtil;
    mainGroup: THREE.Group;

    private objText;
    private uniforms;

    init() {
    }

    load() {
      setTimeout(() => {
        let textMesh =  this.mainGroup.children.find(item => item.uuid === this.config['textMeshId']);
        if(textMesh) {
          this.createLinesText(textMesh);
          textMesh.visible = false;
        }
      }, 100);
    }

    update(time?: number) {
      if(time) {
        let textTime = Date.now() * 0.001;
        this.animateText(textTime);
      }
    }

    private createLinesText(textMesh) {
      this.uniforms = {
    
        amplitude: { type: "f", value: 5.0 },
        opacity:   { type: "f", value: 0.3 },
        color:     { type: "c", value: new THREE.Color(0xff8700) } // 0xff8700) }
    
      };
      
      let material = this.w.genShaderMaterial({ uniforms: this.uniforms, vertexShaderId: `${this.config['shaderId']}Vertex`, fragmentShaderId: `${this.config['shaderId']}Fragment` });
      material.blending = THREE.AdditiveBlending;
      material.depthTest = false;
      material.transparent = true;
      let vertices = textMesh.geometry.vertices;
    
      let buffergeometry = new THREE.BufferGeometry();
      
    
      let position = new THREE.Float32Attribute(vertices.length * 3, 3).copyVector3sArray(vertices);
      buffergeometry.addAttribute('position', position)
    
      let displacement = new THREE.Float32Attribute(vertices.length * 3, 3);
      buffergeometry.addAttribute('displacement', displacement);
    
      let customColor = new THREE.Float32Attribute(vertices.length * 3, 3);
      buffergeometry.addAttribute('customColor', customColor);
    
      let color = new THREE.Color(0xffffff * Math.random());
    
      for(let i = 0, l = customColor.count; i < l; i++) {
        color.toArray(customColor.array, i * customColor.itemSize);
    
      }
    
      buffergeometry.center();
      this.objText = new THREE.Line(buffergeometry, material);
      // objText.rotation.x = 0.2;
      this.objText.scale.set(2, 2, 2);
      this.objText.visible = true;
      this.objText.position.z = 100;
      this.w.add(this.objText, this.mainGroup);
    
    }

    private animateText(time) {

      if(!this.objText || !this.uniforms) return;
      //objText.rotation.y = 0.25 * time;
    
      this.uniforms.amplitude.value = Math.sin(0.5 * time);
      var hx = 0.0005, hy = 0, hz = 0;
      //var hx = 0.0005, hy = 0, hz = 0;
      this.uniforms.color.value.offsetHSL(hx, hy, hz);
    
      var attributes = this.objText.geometry.attributes;
      var array = attributes.displacement.array;
    
      for (var i = 0, l = array.length; i < l; i += 3) {
    
        //array[i] += 0.3 * (0.5 - Math.random());
        let offset1 = 0.3; // 0.3
        let offset2 = 0.5; //0.5
        array[i] += offset1 * (offset2 - Math.random());
        array[i + 1] += offset1 * (offset2 - Math.random());
        array[i + 2] += offset1 * (offset2 - Math.random());
    
      }
    
      attributes.displacement.needsUpdate = true;
      
      /*
      for(var i = 0; i < textMeshes.length; i++) {
        textMeshes[i].rotation.x += 0.01 * Math.random();
      }
      */
    }
        
}
