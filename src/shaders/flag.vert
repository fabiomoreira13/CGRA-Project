
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

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);

	vTextureCoord = aTextureCoord;

	float height = 0.01 * sin(aVertexPosition.x * 30.0);

  offset.z = height * sin( (speed*5.0) * (timeFactor * 0.003));

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
