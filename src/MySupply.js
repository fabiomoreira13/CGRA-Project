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
		
	drop(){
		if (this.state == this.SupplyStates.INACTIVE){
			this.initialX = this.scene.vehicle.x;
			this.initialZ = this.scene.vehicle.z;
			
			this.state = this.SupplyStates.FALLING;
			
		}
		
	}

	reset(){
		this.state = this.SupplyStates.INACTIVE;
		this.y = 0;
	}

	land(){
		if (this.state == this.SupplyStates.FALLING){
			this.state = this.SupplyStates.LANDED;
			this.y = -49.8;
		}
	}
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
		


		/*
			Again, regra de 3 simples

			Num cenário perfeito, um update seria a cada 50ms, resultando em 20 atualizacoes por segundo, 60 atualizacoes no total.

			Assim, 
				50 ms 			- 			50 metros / 60 atualizacoes
				t				-	 				x 

				x = (50/60) * t / 50

			

			
		 */ 
		this.y -= (50/60) * this.scene.elapsedTime / 50;
		
	}

	display(){

		
		if (this.state == this.SupplyStates.FALLING || this.state == this.SupplyStates.INACTIVE){
			//First square
			this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
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
			this.square1.display();
			this.scene.popMatrix();

			//Top square
			this.scene.pushMatrix();
			this.scene.translate(0, 1, 0);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			this.square1.display();
			this.scene.popMatrix();


			//Bottom square
			this.scene.pushMatrix();
			this.scene.translate(0, -1, 0);
			this.scene.rotate(Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
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
			this.square1.display();
			this.scene.popMatrix();

			//Top square
			this.scene.pushMatrix();
			this.scene.translate(-2, 0, 0);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			this.square1.display();
			this.scene.popMatrix();


			//Bottom square
			this.scene.pushMatrix();
			this.scene.translate(-4, 0, 0);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.materialSideCube.apply();
			this.square1.display();
			this.scene.popMatrix();
		}
	}
}