/**
 * MyHelix
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHelix extends CGFobject{
	constructor(scene) {
		super(scene);
		this.rectangle = new MyDiamond(this.scene);

		this.initMaterials(this.scene);
		
	

	}



	initMaterials(scene){
		

		
		
	}


	display(){
		this.scene.pushMatrix();

        this.scene.translate(-1,1,0)
        this.scene.rotate(Math.PI/4, 0,0,1);
        this.scene.scale(0.2,1,1);
        this.rectangle.display();
		this.scene.popMatrix();
		

		this.scene.pushMatrix();
        this.scene.translate(-1,-1,0);
        this.scene.rotate(3* Math.PI/4, 0,0,1);
        this.scene.scale(0.2,1,1);
        this.rectangle.display();
		this.scene.popMatrix();
		

		this.scene.pushMatrix();
        this.scene.translate(1,1,0);
        this.scene.rotate(-Math.PI/4, 0,0,1);
        this.scene.scale(0.2,1,1);
        this.rectangle.display();
		this.scene.popMatrix();
		

		this.scene.pushMatrix();
        this.scene.translate(1,-1,0);
        this.scene.rotate(-3 * Math.PI/4, 0,0,1);
        this.scene.scale(0.2,1,1);
        this.rectangle.display();
        this.scene.popMatrix();

	}

	updateBuffers(){
	}

	
}