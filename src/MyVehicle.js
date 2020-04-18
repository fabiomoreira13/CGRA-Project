/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
	constructor(scene, coords, angle, speed, x, y, z) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
		this.initialAngle = angle;
		this.speed = 0;
		this.x = x;
		this.y = y;
		this.z = z;

		this.body = new MySphere(this.scene, 50, 50);
		this.bottom = new MySphere(this.scene, 50, 50);
		this.motor = new MySphere(this.scene, 50, 50);

		this.helix1 = new MyHelix(this.scene);
		this.helix2 = new MyHelix(this.scene);
		
		this.helixAngle = 0;
		this.initMaterials(this.scene);
	}
	enableNormalViz() {
		this.body.enableNormalViz();
	};


	update(){
		this.x +=  this.speed * Math.sin(this.initialAngle * Math.PI / 180);
		//console.log(this.x);
		this.z += this.speed * Math.cos(this.initialAngle * Math.PI / 180);
	
		if (this.speed != 0){
			this.helixAngle += this.speed * 3 * 15 * Math.PI / 180;
			
		}
		else{
			this.helixAngle = 0;
		}
		
	}

	turn(val){
		let old_x = this.x; let old_y = this.y;
		this.x = 0;
		this.y = 0;
		this.initialAngle += val;

		this.x = old_x;
		this.y = old_y;
	}


	accelerate(val){
		
		this.speed += val;
	
	}

	reset(){
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.speed = 0;
		this.initialAngle = 0;
		this.helixAngle = 0;
	}

	initMaterials(scene){
		this.materialTangram = new CGFappearance(this.scene);
        this.materialTangram.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialTangram.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialTangram.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialTangram.setShininess(10.0);
        this.texture = new CGFtexture(this.scene, 'images/earth.jpg');
        this.materialTangram.setTexture(this.texture);
        this.materialTangram.setTextureWrap('REPEAT', 'REPEAT');

		
		
	}

	
	display(){

		//Body
		this.scene.pushMatrix();
		this.scene.scale(1,1,2);
		
		this.materialTangram.apply();
		this.body.display();
		this.scene.popMatrix();

		//Bottom
		this.scene.pushMatrix();
		this.scene.translate(0,-1.1,0);
		this.scene.scale(0.2,0.2, 0.8);
		this.bottom.display()
		this.scene.popMatrix();

		//Motor1
		this.scene.pushMatrix();
		this.scene.translate(0.13, -1.1, -0.75);
		this.scene.scale(0.05,0.05, 0.1);
		this.motor.display();
		this.scene.popMatrix();

		//Motor2
		this.scene.pushMatrix();
		this.scene.translate(-0.13, -1.1, -0.75);
		this.scene.scale(0.05,0.05, 0.1);
		this.motor.display();
		this.scene.popMatrix();

		//Helix 1
		this.scene.pushMatrix();
		this.scene.translate(0.13,-1.1,-0.85 );
		//this.scene.translate(-this.x, -this.y, -this.z);
		this.scene.rotate(this.helixAngle, 0, 0, 1 );
		this.scene.scale(-0.05,-0.05,-1);
		//this.scene.scale(0.05,0.05, 1);
		this.helix1.display();
		this.scene.popMatrix();
		
		//Helix 2
		this.scene.pushMatrix();
		this.scene.translate(-0.13,-1.1,-0.85 );
		//this.scene.translate(-this.x, -this.y, -this.z);
		this.scene.rotate( this.helixAngle, 0, 0, 1 );
		this.scene.scale(-0.05,-0.05,-1);
		//this.scene.scale(0.05,0.05, 1);
		this.helix2.display();
		this.scene.popMatrix();

		
	}

	updateBuffers(){
	}

	disableNormalViz() {
		this.body.disableNormalViz();
	}

	
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}