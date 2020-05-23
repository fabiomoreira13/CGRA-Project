
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;

uniform float time;
uniform float speed;
uniform int inverted;

void main() {
	

	vTextureCoord = aTextureCoord;

    vec3 offset = vec3(0.0, 0.0, 0.0);

    if(inverted == 0 && aVertexPosition.x > -0.45) 
        offset.z = -cos((-aVertexPosition.x + timeFactor/10.0 * (0.05 + speed * 0.10)) * 15.0) * 0.01;
	else if (inverted == 1 && aVertexPosition.x < 0.45)
		offset.z = cos((aVertexPosition.x + timeFactor/10.0 * (0.05 + speed * 0.10)) * 15.0) * 0.01;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);


}
