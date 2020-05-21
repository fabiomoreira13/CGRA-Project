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
        this.vehicle = new MyVehicle(this, undefined, 0, 0, 0,0,10);
        this.quad = new MyQuad(this);
        this.terrain = new MyTerrain(this);

        this.billboard = new MyBillboard(this);


        //Utils vars

        this.alreadyPressedL = false;
        this.cooldownIsOver = true;
        this.cooldownTime = 0;
        //this.supply = new MySupply(this);

        this.supplies = new Array(new MySupply(this), new MySupply(this), new MySupply(this), new MySupply(this), new MySupply(this));

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
        this.displayBillboard = true;
        this.displayTerrain = false;


        this.scaleFactor = 1;
        this.speedFactor = 1;

        this.terrainY = 0;

        this.currentTexture = 0;

        this.nSuppliesDelivered = 0;

        this.textureList= {
            'Sky': 0,
            'Forest': 1
        };
    }
    initLights() {
        this.setGlobalAmbientLight(0.6, 0.6, 0.6, 1.0);


        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(40, 35, 40), vec3.fromValues(0, -10, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }


    checkKeys() {
        var text="Keys pressed: ";
        var turnRight=false;
        var turnLeft = false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW") && !this.vehicle.autoPilotEnabled)  {
            text+=" W ";

            this.vehicle.accelerate(this.speedFactor * 0.1);


            //keysPressed=true;
            //this.vehicle.update();
        }
        if (this.gui.isKeyPressed("KeyS") && !this.vehicle.autoPilotEnabled) {
            text+=" S ";

            this.vehicle.accelerate(this.speedFactor *  -0.1);

            //this.vehicle.update();
            //keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            console.log(text);
            if (this.vehicle.autoPilotEnabled == false)  {
                this.vehicle.enableAutoPilot();


            }
            else {
                this.vehicle.autoPilotEnabled = false;

            }

            //this.vehicle.update();
            //keysPressed=true;
        }

        if (this.gui.isKeyPressed("KeyA") && !this.vehicle.autoPilotEnabled){
            text+=" A ";
            this.vehicle.turn(15 );

            turnLeft = true;

        }
        //this.vehicle.rotateLeme = false;

        if (this.gui.isKeyPressed("KeyD") && !this.vehicle.autoPilotEnabled){
            text+=" D ";
           this.vehicle.turn(-15);

            turnRight = true;

        }

        if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            this.vehicle.reset();
            this.billboard.reset();
            for (let i = 0; i < 5; i++){


                this.supplies[i].reset();
            }
            this.nSuppliesDelivered = 0;
            //keysPressed = true;
        }

        /*
            Added cooldown time for the supply drop. When 'L' is pressed, one supply will be released and countdown will begin.
            When 1 second passes, cooldown will be over and another supply will be available to drop!

        */

        if (this.gui.isKeyPressed("KeyL") && this.cooldownIsOver){
            this.cooldownIsOver = false;

            for (let i = 0; i<5; i++){
                if (this.supplies[i].state == this.supplies[i].SupplyStates.INACTIVE){
                    this.supplies[i].drop();
                    this.billboard.update();
                    this.nSuppliesDelivered++;

                    break;
                }
            }

        }

        if (turnLeft){
            //console.log(text);
            this.vehicle.rotateLemeLeft = true;
            //this.vehicle.update();
        }
        else{
            this.vehicle.rotateLemeLeft = false;
        }
        if (turnRight){
            this.vehicle.rotateLemeRight = true;
        }
        else{
            this.vehicle.rotateLemeRight = false;
        }
    }



    // called periodically (as per setUpdatePeriod() in init())
    update(t){

        if (this.lastUpdate == 0){
            this.lastUpdate = t;
        }
        this.elapsedTime = t - this.lastUpdate;
        if (!this.cooldownIsOver){
            this.cooldownTime+= this.elapsedTime;
            if (this.cooldownTime > 1000){
                this.cooldownIsOver = true;
                this.cooldownTime = 0;
            }
        }
        this.lastUpdate = t;
        this.checkKeys();
        if (this.vehicle.autoPilotEnabled){
            this.vehicle.autoTurn();
            this.vehicle.autoUpdate();
        }
        else{

            this.vehicle.update(this.elapsedTime);
        }

        //TODO Maybe the .land part should be done outside of update
        for (let i = 0; i < 5; i++){
            if (this.supplies[i].state == this.supplies[0].SupplyStates.FALLING) {
                this.supplies[i].update();
                if (this.supplies[i].y <= -49.5) {
                    this.supplies[i].land();
                }
            }
        }


    }

    selectedTexture() {
        this.cube.updateTexture();
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
            this.rotate(this.vehicle.angle * Math.PI / 180 , 0,1,0);
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);



            this.vehicle.display();


            this.popMatrix();

        }

        if (this.displayCube){
            this.cube.display();
        }

        for (let i = 0; i < 5; i++){
            this.pushMatrix();
            if (this.supplies[i].state == this.supplies[0].SupplyStates.INACTIVE) {
                this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
            }
            else {
                this.translate(this.supplies[i].initialX, this.supplies[i].y, this.supplies[i].initialZ);
            }
            //TODO CHECK IF THIS IS NEEDED
            this.scale(this.scaleFactor * 0.1, this.scaleFactor * 0.1, this.scaleFactor * 0.1);
            this.supplies[i].display();
            this.popMatrix();
        }

        if (this.displayBillboard){
            this.pushMatrix();
            //this.translate(-40,-49,-45);
            //this.scale(5,5,5);
            this.billboard.display();
            this.popMatrix();
        }


        if (this.displayTerrain){
            this.pushMatrix();
            this.translate(0, -49.9, 0);
            this.scale(2*50, 1, 2*50);
			this.rotate(-Math.PI/2, 1, 0, 0);
            this.terrain.display();

            this.popMatrix();
        }
        

        // ---- END Primitive drawing section
    }
}
