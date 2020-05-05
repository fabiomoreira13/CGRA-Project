/**
 * MyHelix
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject{
	constructor(scene) {
		super(scene);
		this.rectangle = new MyQuad(this.scene);

		this.initMaterials(this.scene);
		
	

	}



	initMaterials(scene){
		this.message= new CGFappearance(this.scene);
        this.message.setAmbient(0.9, 0.9, 0.9, 1);
        this.message.setDiffuse(0.1, 0.1, 0.1, 1);
        this.message.setSpecular(0.1, 0.1, 0.1, 1);
        this.message.setShininess(10.0);
        this.texture = new CGFtexture(this.scene, 'images/Supplies.png');
        this.message.setTexture(this.texture);
        this.message.setTextureWrap('REPEAT', 'REPEAT');

		
		
	}


	display(){
		this.scene.pushMatrix();

        
        
        this.scene.scale(2,1,1);
        this.message.apply();
        this.rectangle.display();
		this.scene.popMatrix();
		

	}

	updateBuffers(){
	}

	
}