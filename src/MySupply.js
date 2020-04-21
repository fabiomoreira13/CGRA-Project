/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject{
	constructor(scene) {
		super(scene);
		this.square1 = new MyQuad(scene);
		this.square2 = new MyQuad(scene);
		this.square3 = new MyQuad(scene);
		this.square4 = new MyQuad(scene);
		this.square5 = new MyQuad(scene);
		this.square6 = new MyQuad(scene);
		this.initMaterials(scene);

		this.state = this.SupplyStates.INACTIVE;
		this.x = this.scene.vehicle.x;
		this.y = 0;
		this.z = this.scene.vehicle.z;
		


	}

	SupplyStates = {
		INACTIVE: 0,
		FALLING: 1,
		LANDED: 2
		};
		
	
	initMaterials(scene){
		this.materialSideCube= new CGFappearance(this.scene);
        this.materialSideCube.setAmbient(0.9, 0.9, 0.9, 1);
        this.materialSideCube.setDiffuse(0.1, 0.1, 0.1, 1);
        this.materialSideCube.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialSideCube.setShininess(10.0);
        this.texture = new CGFtexture(this.scene, 'images/wood.jpg');
        this.materialSideCube.setTexture(this.texture);
        this.materialSideCube.setTextureWrap('REPEAT', 'REPEAT');



		
	}

	update(){

	}

	display(){
		if (this.state != this.SupplyStates.LANDED){
			//First square
			this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			//this.scene.rotate(Math.PI, 0,1,0);
			this.materialSideCube.apply();

			this.square1.display();
			this.scene.popMatrix();

			//Second square
			this.scene.pushMatrix();
			this.scene.translate(0, 0, -1);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.materialSideCube.apply();
			this.square1.display();
			this.scene.popMatrix();


			//Third square
			this.scene.pushMatrix();
			this.scene.translate(-1, 0, 0);
			this.scene.rotate(-Math.PI / 2, 0, 1, 0);
			this.materialSideCube.apply();
			this.square1.display();
			this.scene.popMatrix();


			//Fourth square
			this.scene.pushMatrix();
			this.scene.translate(1, 0, 0);
			this.scene.rotate(Math.PI / 2, 0, 1, 0);
			this.materialSideCube.apply();
			//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			this.square1.display();
			this.scene.popMatrix();

			//Top square
			this.scene.pushMatrix();
			this.scene.translate(0, 1, 0);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			this.square1.display();
			this.scene.popMatrix();


			//Bottom square
			this.scene.pushMatrix();
			this.scene.translate(0, -1, 0);
			this.scene.rotate(Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			this.square1.display();
			this.scene.popMatrix();
		}
		//Supply has landed. Must display it differently.
		else{ 
			this.scene.pushMatrix();
			this.scene.translate(0, 0, 2);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();

			this.square1.display();
			this.scene.popMatrix();

			//Second square
			this.scene.pushMatrix();
			this.scene.translate(0, 0, 0);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			this.square1.display();
			this.scene.popMatrix();


			//Third square
			this.scene.pushMatrix();
			this.scene.translate(0, 0, -2);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			this.square1.display();
			this.scene.popMatrix();


			//Fourth square
			this.scene.pushMatrix();
			this.scene.translate(2, 0, 0);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			this.square1.display();
			this.scene.popMatrix();

			//Top square
			this.scene.pushMatrix();
			this.scene.translate(-2, 0, 0);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			this.square1.display();
			this.scene.popMatrix();


			//Bottom square
			this.scene.pushMatrix();
			this.scene.translate(-4, 0, 0);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			//this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
			this.square1.display();
			this.scene.popMatrix();
		}
	}
}