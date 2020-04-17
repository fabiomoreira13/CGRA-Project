/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        //Objects connected to MyInterface
        this.cylinder = new MyCylinder(this,50);
        this.sphere = new MySphere(this, 50, 50);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this, undefined, 0, 0, 5,0,5);
        this.quad = new MyQuad(this);

        


        //Material & Texture
        this.material = new CGFappearance(this);
        this.material.setAmbient(0.5,0.5,0.5,1);
        this.material.setDiffuse(0.7,0.7,0.7,1);
        this.material.setShininess(10);
        this.material.loadTexture('images/earth.jpg');
        this.material.setTextureWrap('REPEAT','REPEAT');
        this.earth = new CGFtexture(this,'images/earth.jpg');
        this.material.setTexture(this.earth);



        //Display vars
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayVehicle = true;
        this.displayCube = false;


        this.scaleFactor = 1;
        this.speedFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }


    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            this.vehicle.accelerate(this.speedFactor * 0.1);
            
            keysPressed=true;
            //this.vehicle.update();
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            this.vehicle.accelerate(this.speedFactor *  -0.1);
            
            //this.vehicle.update();
            keysPressed=true;
        }

        
        if (this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            this.vehicle.turn(15 );
        
            keysPressed = true;

        }

        if (this.gui.isKeyPressed("KeyD")){
            text+=" D ";
            this.vehicle.turn(-15);
           
            keysPressed = true;

        }

        if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            this.vehicle.reset();

            keysPressed = true;
        }
    
        if (keysPressed){
            console.log(text);
            //this.vehicle.update();
        }
    }
        


    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update();
        
    }





    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        //this.incompleteSphere.display();


        //this.cube.display();

        if (this.displayCylinder){
            //this.material.apply();
            this.cylinder.display();
        }

        if (this.displaySphere){
          this.material.apply();
          
          this.sphere.display();
        }


        if (this.displayVehicle){
            this.pushMatrix();
            
            this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
            this.rotate(this.vehicle.initialAngle * Math.PI / 180 , 0,1,0);
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            
            this.vehicle.display();
            

            this.popMatrix();
        }

        if (this.displayCube){
            this.cube.display();
        }

        
        

        
        // ---- END Primitive drawing section
    }
}
