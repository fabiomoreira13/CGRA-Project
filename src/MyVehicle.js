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


		this.leme = new MyLeme(this.scene);
		this.rotateLemeLeft = false;
		this.rotateLemeRight = false;


		this.autoPilotEnabled = false;
		this.center_x = 0;
		this.center_z = 0;


		this.initMaterials(this.scene);
	}
	enableNormalViz() {
		this.body.enableNormalViz();
	};


	update(){
		this.x +=  this.speed * Math.sin(this.initialAngle * Math.PI / 180);
		//console.log(this.x);
		this.z += this.speed * Math.cos(this.initialAngle * Math.PI / 180);
	
		
		this.helixAngle += this.speed * 3 * 15 * Math.PI / 180;
		
		
	}

	turn(val){
		let old_x = this.x; 
		this.x = 0;
	
		this.initialAngle += val;

		this.x = old_x;
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
		this.autoPilotEnabled = false;
	}

	initMaterials(scene){
		this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.texture = new CGFtexture(this.scene, 'images/test.jpg');
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');


		this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0.1, 0.1, 0.1, 1);
        this.black.setDiffuse(0.9, 0.9, 0.9, 1);
        this.black.setSpecular(0.1, 0.1, 0.1, 1);
        this.black.setShininess(10.0);
        this.texture = new CGFtexture(this.scene, 'images/black.jpg');
        this.black.setTexture(this.texture);
		this.black.setTextureWrap('REPEAT', 'REPEAT');
		
		
		
		
	}

	enableAutoPilot(){
		this.autoPilotEnabled = true;
		this.speed = 0.5;
		//TODO PUT ANGLE IN RADIANS
		this.center_x = this.x + 5 * Math.cos(this.initialAngle * Math.PI / 180);
		this.center_z = this.z - 5 * Math.sin(this.initialAngle * Math.PI / 180);
		
		this.angleWithX = -Math.acos(Math.sin(this.initialAngle)) * 180 / Math.PI;

		this.initial_X = this.x;
		this.initial_Z = this.z;
	
		//this.angleWithX = 0;
		//multiply by 180 / Math.PI to obtain angulo em graus

		
	}

	autoTurn(){
		let old_x = this.x; let old_z = this.z;
		this.x = this.center_x;
		
		
		//This is for the orientation angle
		//TODO IT should be 3.5 instead of 5, i dont get it
		this.initialAngle += 2* 180 / (20 * 3.5);


		// 2 * Math.PI / (ticksPerSecond * time to complete the circle)
		//This is for the rotation angle
		this.angleWithX += 2 * 180 / (20 * 3.5);
		this.x = old_x;

	
	}

	autoUpdate(){
		this.x =   this.center_x + (5 * Math.sin(this.angleWithX * Math.PI / 180)) ;
		//console.log(this.x);
		this.z = this.center_z  + (5 * Math.cos(this.angleWithX * Math.PI / 180)) ;
		

		this.helixAngle += this.speed * 3 * 15 * Math.PI / 180;
	}
	
	display(){

		//Body
		this.scene.pushMatrix();
		this.scene.scale(1,1,2);
		
		this.material.apply();
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
		if (this.speed != 0)
			this.scene.rotate(this.helixAngle, 0, 0, 1 );
		this.scene.scale(-0.05,-0.05,-1);
		//this.scene.scale(0.05,0.05, 1);
		this.black.apply();
		this.helix1.display();
		this.scene.popMatrix();
		
		//Helix 2
		this.scene.pushMatrix();
		this.scene.translate(-0.13,-1.1,-0.85 );
		//this.scene.translate(-this.x, -this.y, -this.z);
		if (this.speed != 0)
				this.scene.rotate( this.helixAngle, 0, 0, 1 );
		this.scene.scale(-0.05,-0.05,-1);
		//this.scene.scale(0.05,0.05, 1);
		this.black.apply();
		this.helix2.display();
		this.scene.popMatrix();


		//Lemes
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, -2.1);
		if (this.rotateLemeLeft)
			this.scene.rotate(+Math.PI/4, 0,0,1);
		else if (this.rotateLemeRight)
			this.scene.rotate(-Math.PI/4, 0,0,1);
		this.scene.rotate(Math.PI /2, 1,0,0);
		this.scene.rotate(Math.PI/2, 0,1,0);
		this.scene.scale(0.5,0.5,0.5);
		this.leme.display();
		this.scene.popMatrix();



		this.scene.pushMatrix();

		this.scene.translate(0, -0.5, -2.1);
		if (this.rotateLemeLeft)
			this.scene.rotate(Math.PI/4, 0,0,1);
		else if (this.rotateLemeRight)
			this.scene.rotate(-Math.PI/4, 0,0,1);
		this.scene.rotate(Math.PI /2, 1,0,0);
		this.scene.rotate(Math.PI/2, 0,1,0);
		this.scene.scale(0.5,0.5,0.5);
		this.leme.display();
		this.scene.popMatrix();




		this.scene.pushMatrix();
		this.scene.translate(-0.3, 0, -2.1);
		
		this.scene.rotate(Math.PI, 0,0,1);
		this.scene.rotate(Math.PI /2, 1,0,0);
		
		this.scene.scale(0.4,0.4,0.4);
		this.leme.display();
		this.scene.popMatrix();



		this.scene.pushMatrix();
		this.scene.translate(0.3, 0, -2.1);
		
		this.scene.rotate(Math.PI, 0,0,1);
		this.scene.rotate(Math.PI /2, 1,0,0);
		
		this.scene.scale(0.4,0.4,0.4);
		this.leme.display();
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