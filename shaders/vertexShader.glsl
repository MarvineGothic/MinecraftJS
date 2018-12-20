#version 300 es

in vec3 vertPosition;
in vec3 normal;
in vec2 textureCoordinates;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 transformationMatrix;

out vec2 pass_TextureCoords;
out vec3 surfaceNormal;
//out vec3 toLightVector[lights];

//out vec3 lightColor;
//out vec3 diffuse;
out vec3 toCameraVector;
out vec4 worldPosition;

void main() {
    worldPosition = transformationMatrix * vec4(vertPosition, 1.0);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;

    vec3 actualNormal = normal;
    pass_TextureCoords = textureCoordinates;
    surfaceNormal = (transformationMatrix * vec4(actualNormal, 0.0)).xyz;

    toCameraVector = (inverse(viewMatrix) * vec4(0.0,0.0,0.0,1.0)).xyz - worldPosition.xyz;
}