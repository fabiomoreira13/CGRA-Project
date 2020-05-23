/**
 * MyHelix
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject{
	constructor(scene) {
		super(scene);
		this.rectangle = new MyQuad(this.scene);
        
        this.progressbar = new MyPlane(this.scene, 50);

        this.progressShader = new CGFshader(scene.gl, 'shaders/progressBar.vert', 'shaders/progressBar.frag');

        
        this.initMaterials(this.scene);
        this.dropped = 0;
        this.progressShader.setUniformsValues({offset: -0.6});

	
		

	}


    update(){
        this.dropped++;
        this.progressShader.setUniformsValues({offset: -0.6+0.24*this.dropped});
    }

    reset(){
        this.dropped = 0;
        this.progressShader.setUniformsValues({offset: -0.6});
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

        this.white = new CGFappearance(this.scene);
        this.white.setAmbient(0.9, 0.9, 0.9, 1);
        this.white.setDiffuse(0.1, 0.1, 0.1, 1);
        this.white.setSpecular(0.1, 0.1, 0.1, 1);
        this.white.setShininess(10.0);
        this.texture_white = new CGFtexture(this.scene, 'images/White.png');
        this.white.setTexture(this.texture_white);
        this.white.setTextureWrap('REPEAT', 'REPEAT');

        
		
		
	}


	display(){
		this.scene.pushMatrix();
        this.scene.scale(1,0.5,1);
        this.message.apply();
        this.rectangle.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-0.95,-1,0);
        this.scene.scale(0.05,0.5,1);
        this.white.apply();
        this.rectangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.95,-1,0);
        this.scene.scale(0.05,0.5,1);
        this.white.apply();
        this.rectangle.display();
        this.scene.popMatrix();

        
        this.scene.setActiveShader(this.progressShader);
        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, 0.01);
        this.scene.scale(1.5, 0.2, 1);
        this.progressbar.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

      
		

	}

	updateBuffers(){
	}

	
}
