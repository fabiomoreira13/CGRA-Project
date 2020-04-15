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
	}

	update(){
		this.x += this.speed * 0.1;
		this.z += this.speed * 0.1;
	}

	turn(val){
		this.initialAngle += val;
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
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0.5,	//0
			0.5, -0.5, -0.5,	//1
			-0.5, -0.5, -0.5,	//2
			0.5, 0.5, -0.5,	//3
			-0.5, 0.5, -0.5	//4
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			0, 4, 2,
			0, 1, 3,
			0, 3, 4,
			1, 2, 3,
			2, 4, 3
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];


		this.primitiveType = this.scene.gl.TRIANGLES;

		
	
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
