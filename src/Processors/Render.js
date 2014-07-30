class RenderProcess extends Processor {
    draw() {

        var foundMeshEntities = em.getAllEntitiesPosessingComponent("MeshComponent");
        if (foundMeshEntities.length > 0) {

            for (var e = 0; e < foundMeshEntities.length; e++) {
                var foundRenderableEntities = em.searchComponentForEntity(foundMeshEntities[e], "Renderable");
                var foundSelectableEntities = em.searchComponentForEntity(foundMeshEntities[e], "Selectable");

                if (foundRenderableEntities) {
                    var fm = em.searchComponentForEntity(foundMeshEntities[e], "MeshComponent");


                    camera.mvPushMatrix();

                    gl.uniform3fv(shaderProgram.uMaterialDiffuse, fm.mesh.diffuse);
                    if (foundSelectableEntities) {
                        gl.uniform3fv(shaderProgram.uDrawColor, foundSelectableEntities.color);
                    }
                    else {
                        gl.uniform3fv(shaderProgram.uDrawColor, [1, 1, 1]);
                    }
                    mat4.translate(camera.mvMatrix, [foundRenderableEntities.xPos, foundRenderableEntities.yPos, foundRenderableEntities.zPos]);


                    gl.uniform1f(shaderProgram.uMaterialShininess, 200.0);

                    gl.bindBuffer(gl.ARRAY_BUFFER, fm.mesh.vertexPositionBuffer);
                    gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


                    gl.bindBuffer(gl.ARRAY_BUFFER, fm.mesh.normalPositionBuffer);
                    gl.vertexAttribPointer(shaderProgram.aVertexNormal, 3, gl.FLOAT, false, 0, 0);


                    gl.bindBuffer(gl.ARRAY_BUFFER, fm.mesh.texturePositionBuffer);
                    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
                    gl.activeTexture(gl.TEXTURE0);
                    gl.bindTexture(gl.TEXTURE_2D, fm.mesh.texture);
                    gl.uniform1i(shaderProgram.samplerUniform, 0);

                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fm.mesh.indexPositionBuffer);

                    helpers.setMatrixUniforms();
                    gl.drawElements(gl.TRIANGLES, fm.mesh.indexPositionBuffer.numItems, gl.UNSIGNED_SHORT, 0);
                    // gl.disable(gl.BLEND);
                    camera.mvPopMatrix();

                }
            }
        }
    }
}