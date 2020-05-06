
class MyTerrain extends CGFobject {
	constructor(scene){
        super(scene);
				this.terraintexture = null;
				this.appearance = null;

        this.plane = new MyPlane(scene, 20);

				this.terrainHeight = 1;

				this.init(scene);

    }

		init(scene){

			this.appearance = new CGFappearance(scene);
			this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
			this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
			this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
			this.appearance.setShininess(120);

			//Texture
			this.terraintexture = new CGFtexture(this.scene, "images/terrain.jpg");
			this.terrainmap = new CGFtexture(this.scene, "images/heightmap.jpg");

			this.appearance.setTexture(this.terraintexture);
			this.appearance.setTextureWrap('REPEAT', 'REPEAT');

			//Shader
			this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
			this.shader.setUniformsValues({uSampler2: 1});
			this.shader.setUniformsValues({normScale: this.terrainHeight});

		}

		onTerrainHeightChanged(v){
			this.shader.setUniformsValues({normScale: this.terrainHeight});
		}

    display(){

				this.appearance.apply();
				this.scene.setActiveShader(this.shader);
				this.scene.pushMatrix();
				this.terrainmap.bind(1);
				this.scene.pushMatrix();
				this.scene.translate(0, -49.5, 0);
				this.scene.scale(50, 50, 50);
				this.scene.rotate(-Math.PI/2, 1, 0, 0);
				this.plane.display();
				this.scene.popMatrix();

				//this.scene.setActiveShader(this.defaultShader);
    }
}
