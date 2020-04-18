/**
 * MyHelix
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeme extends CGFobject{
	constructor(scene,x,y,z) {
		super(scene);
		this.rectangle = new MyDiamond(this.scene);
		this.triangle = new MyTriangle(this.scene);

		this.initMaterials(this.scene);
		
		

	}



	initMaterials(scene){
		

		
		
	}


	display(){
		this.scene.pushMatrix();
		this.scene.scale(0.5,0.5,0.5);
		this.rectangle.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(0,1,0);
		this.scene.scale(0.5,0.5,0.5);
		this.triangle.display();
		this.scene.popMatrix();

	}

	updateBuffers(){
	}

	
}