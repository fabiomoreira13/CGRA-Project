class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);

		this.top = new MyQuad(this.scene);
		this.bottom = new MyQuad(this.scene);
		this.left = new MyQuad(this.scene);
		this.right = new MyQuad(this.scene);
		this.front = new MyQuad(this.scene);
		this.back = new MyQuad(this.scene);
		this.initMaterials(scene);
	}

	initMaterials(scene){

		this.material = new CGFappearance(scene);
		this.material.setAmbient(1.0, 1.0, 1.0, 0.0);
		this.material.setDiffuse(0.0, 0.0, 0.0, 1);
		this.material.setSpecular(0.0, 0.0, 0.0, 1);
		this.material.setShininess(10.0);
		this.material.loadTexture('images/cubemap.png');
		this.material.setTextureWrap('REPEAT', 'REPEAT');

		this.top.texCoords = [
			0.25, 1/3,
			0.5, 1/3,
			0.25, 0,
			0.5, 0
		];
		this.top.updateTexCoordsGLBuffers();

		this.bottom.texCoords = [
			0.25, 1,
			0.5, 1,
			0.25, 2/3,
			0.5, 2/3
		];
		this.bottom.updateTexCoordsGLBuffers();

		this.left.texCoords = [
			0, 2/3,
			0.25, 2/3,
			0, 1/3,
			0.25, 1/3
		];
		this.left.updateTexCoordsGLBuffers();

		this.right.texCoords = [
			0.5, 2/3,
			0.75, 2/3,
			0.5, 1/3,
			0.75, 1/3
		];
		this.right.updateTexCoordsGLBuffers();

		this.front.texCoords = [
			0.25, 2/3,
			0.5, 2/3,
			0.25, 1/3,
			0.5, 1/3
		];
		this.front.updateTexCoordsGLBuffers();

		this.back.texCoords = [
			0.75, 2/3,
			1, 2/3,
			0.75, 1/3,
			1, 1/3
		];
		this.back.updateTexCoordsGLBuffers();
	}

	display(){

		this.material.apply();

		// TOP //
		this.scene.pushMatrix();
		this.scene.translate(0, 25, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.top.display();
		this.scene.popMatrix();

		// BOTTOM //
		this.scene.pushMatrix();
		this.scene.translate(0, -25, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.bottom.display();
		this.scene.popMatrix();

		// LEFT //
		this.scene.pushMatrix();
		this.scene.translate(-25, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.left.display();
		this.scene.popMatrix();

		// RIGHT //
		this.scene.pushMatrix();
		this.scene.translate(25, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.right.display();
		this.scene.popMatrix();

		// FRONT //
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -25);
		this.front.display();
		this.scene.popMatrix();

		// BACK //
		this.scene.pushMatrix();
		this.scene.translate(0,0,25);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.back.display();
		this.scene.popMatrix();
	}

	enableNormalViz(){
			this.top.enableNormalViz();
			this.bottom.enableNormalViz();
			this.left.enableNormalViz();
			this.right.enableNormalViz();
			this.front.enableNormalViz();
			this.back.enableNormalViz();
	};

	disableNormalViz(){
			this.top.disableNormalViz();
			this.bottom.disableNormalViz();
			this.left.disableNormalViz();
			this.right.disableNormalViz();
			this.front.disableNormalViz();
			this.back.disableNormalViz();
	};


}
