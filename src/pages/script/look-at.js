const lookAt = {
  schema: { type: 'selector' },
	        
	init: function () {},

	tick: function () {
	  this.el.object3D.lookAt(this.data.object3D.position)
	}
}
export{lookAt}

AFRAME.registerComponent('look-at', {lookAt})