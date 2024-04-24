import * as AFRAME from 'https://aframe.io/releases/1.3.0/aframe.min.js'
const lookAt = {
  schema: { type: 'selector' },
	        
	init: function () {},

	tick: function () {
	  this.el.object3D.lookAt(this.data.object3D.position)
	}
}
export{lookAt}

AFRAME.registerComponent('look-at', {lookAt})