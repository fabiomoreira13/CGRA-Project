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
		this.top.loadTexture('images/split_cubemap/sky/top.png');
		this.top.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.left = new CGFappearance(scene);
		this.left.setAmbient(1.0, 1.0, 1.0, 1);
		this.left.setDiffuse(0.0, 0.0, 0.0, 1);
		this.left.setSpecular(0.0, 0.0, 0.0, 1);
		this.left.setShininess(10.0);
		this.left.loadTexture('images/split_cubemap/sky/left.png');
		this.left.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.right= new CGFappearance(scene);
		this.right.setAmbient(1.0, 1.0, 1.0, 1);
		this.right.setDiffuse(0.0, 0.0, 0.0, 1);
		this.right.setSpecular(0.0, 0.0, 0.0, 1);
		this.right.setShininess(10.0);
		this.right.loadTexture('images/split_cubemap/sky/right.png');
		this.right.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.front = new CGFappearance(scene);
		this.front.setAmbient(1.0, 1.0, 1.0, 1);
		this.front.setDiffuse(0.0, 0.0, 0.0, 1);
		this.front.setSpecular(0.0, 0.0, 0.0, 1);
		this.front.setShininess(10.0);
		this.front.loadTexture('images/split_cubemap/sky/front.png');
		this.front.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.bottom = new CGFappearance(scene);
		this.bottom.setAmbient(1.0, 1.0, 1.0, 1);
		this.bottom.setDiffuse(0.0, 0.0, 0.0, 1);
		this.bottom.setSpecular(0.0, 0.0, 0.0, 1);
		this.bottom.setShininess(10.0);
		this.bottom.loadTexture('images/split_cubemap/sky/bottom.png');
		this.bottom.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.back = new CGFappearance(scene);
		this.back.setAmbient(1.0, 1.0, 1.0, 1);
		this.back.setDiffuse(0.0, 0.0, 0.0, 1);
		this.back.setSpecular(0.0, 0.0, 0.0, 1);
		this.back.setShininess(10.0);
		this.back.loadTexture('images/split_cubemap/sky/back.png');
		this.back.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	}

	display(){

	

		// TOP //
		this.scene.pushMatrix();
		this.scene.translate(0, 50, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.scale(50,50,50);
		this.top.apply();
		this.quad.display();
		this.scene.popMatrix();

		// BOTTOM //
		this.scene.pushMatrix();
		this.scene.translate(0, -50, 0);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.scale(50,50,50);
		this.bottom.apply();
		this.quad.display();
		this.scene.popMatrix();

		// LEFT //
		this.scene.pushMatrix();
		this.scene.translate(-50, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.scale(50,50,50);
		this.left.apply();
		this.quad.display();
		this.scene.popMatrix();

		// RIGHT //
		this.scene.pushMatrix();
		this.scene.translate(50, 0, 0);
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.scale(50,50,50);
		this.right.apply();
		this.quad.display();
		this.scene.popMatrix();

		// FRONT //
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -50);
		this.scene.scale(50,50,50);
		this.front.apply();
		this.quad.display();
		this.scene.popMatrix();

		// BACK //
		this.scene.pushMatrix();
		this.scene.translate(0,0,50);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(50,50,50);
		this.back.apply();
		this.quad.display();
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

	updateTexture(){
        if(this.scene.currentTexture==0){
            this.left.loadTexture('images/split_cubemap/sky/left.png');
            this.right.loadTexture('images/split_cubemap/sky/right.png');
            this.back.loadTexture('images/split_cubemap/sky/back.png');
            this.front.loadTexture('images/split_cubemap/sky/front.png');
            this.top.loadTexture('images/split_cubemap/sky/top.png');
            this.bottom.loadTexture('images/split_cubemap/sky/bottom.png');
        }
        else if(this.scene.currentTexture==1){
			this.left.loadTexture('images/split_cubemap/forest/left.png');
            this.right.loadTexture('images/split_cubemap/forest/right.png');
            this.back.loadTexture('images/split_cubemap/forest/back.png');
            this.front.loadTexture('images/split_cubemap/forest/front.png');
            this.top.loadTexture('images/split_cubemap/forest/top.png');
            this.bottom.loadTexture('images/split_cubemap/forest/bottom.png');
        }
    }


}
