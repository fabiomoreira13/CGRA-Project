class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);

		this.quad = new MyQuad(this.scene);
		this.initMaterials(scene);
	}

	initMaterials(scene){

		this.top = new CGFappearance(scene);
		this.top.setAmbient(1.0, 1.0, 1.0, 1);
		this.top.setDiffuse(0.0, 0.0, 0.0, 1);
		this.top.setSpecular(0.0, 0.0, 0.0, 1);
		this.top.setShininess(10.0);
		this.top.loadTexture('images/split_cubemap/top.png');
		this.top.setTextureWrap('REPEAT', 'REPEAT');

		this.left = new CGFappearance(scene);
		this.left.setAmbient(1.0, 1.0, 1.0, 1);
		this.left.setDiffuse(0.0, 0.0, 0.0, 1);
		this.left.setSpecular(0.0, 0.0, 0.0, 1);
		this.left.setShininess(10.0);
		this.left.loadTexture('images/split_cubemap/left.png');
		this.left.setTextureWrap('REPEAT', 'REPEAT');

		this.right= new CGFappearance(scene);
		this.right.setAmbient(1.0, 1.0, 1.0, 1);
		this.right.setDiffuse(0.0, 0.0, 0.0, 1);
		this.right.setSpecular(0.0, 0.0, 0.0, 1);
		this.right.setShininess(10.0);
		this.right.loadTexture('images/split_cubemap/right.png');
		this.right.setTextureWrap('REPEAT', 'REPEAT');

		this.front = new CGFappearance(scene);
		this.front.setAmbient(1.0, 1.0, 1.0, 1);
		this.front.setDiffuse(0.0, 0.0, 0.0, 1);
		this.front.setSpecular(0.0, 0.0, 0.0, 1);
		this.front.setShininess(10.0);
		this.front.loadTexture('images/split_cubemap/front.png');
		this.front.setTextureWrap('REPEAT', 'REPEAT');

		this.bottom = new CGFappearance(scene);
		this.bottom.setAmbient(1.0, 1.0, 1.0, 1);
		this.bottom.setDiffuse(0.0, 0.0, 0.0, 1);
		this.bottom.setSpecular(0.0, 0.0, 0.0, 1);
		this.bottom.setShininess(10.0);
		this.bottom.loadTexture('images/split_cubemap/bottom.png');
		this.bottom.setTextureWrap('REPEAT', 'REPEAT');

		this.back = new CGFappearance(scene);
		this.back.setAmbient(1.0, 1.0, 1.0, 1);
		this.back.setDiffuse(0.0, 0.0, 0.0, 1);
		this.back.setSpecular(0.0, 0.0, 0.0, 1);
		this.back.setShininess(10.0);
		this.back.loadTexture('images/split_cubemap/back.png');
		this.back.setTextureWrap('REPEAT', 'REPEAT');

	}

	display(){

	

		// TOP //
		this.scene.pushMatrix();
		this.scene.translate(0, 25, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.top.apply();
		this.quad.display();
		this.scene.popMatrix();

		// BOTTOM //
		this.scene.pushMatrix();
		this.scene.translate(0, -25, 0);
    	this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.bottom.apply();
		this.quad.display();
		this.scene.popMatrix();

		// LEFT //
		this.scene.pushMatrix();
		this.scene.translate(-25, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.left.apply();
		this.quad.display();
		this.scene.popMatrix();

		// RIGHT //
		this.scene.pushMatrix();
		this.scene.translate(25, 0, 0);
    	this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.right.apply();
		this.quad.display();
		this.scene.popMatrix();

		// FRONT //
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -25);
		this.front.apply();
		this.quad.display();
		this.scene.popMatrix();

		// BACK //
		this.scene.pushMatrix();
		this.scene.translate(0,0,25);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.back.apply();
		this.quad.display();
		this.scene.popMatrix();
	}

	enableNormalViz(){
			/*this.top.enableNormalViz();
			this.bottom.enableNormalViz();
			this.left.enableNormalViz();
			this.right.enableNormalViz();
			this.front.enableNormalViz();
			this.back.enableNormalViz();*/
	};

	disableNormalViz(){
			/*this.top.disableNormalViz();
			this.bottom.disableNormalViz();
			this.left.disableNormalViz();
			this.right.disableNormalViz();
			this.front.disableNormalViz();
			this.back.disableNormalViz();*/	
	};


}
