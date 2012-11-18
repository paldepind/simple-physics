define(["vector", "physics", "render", "lines"],
function (vector, physics, render, lines) {
   
    return {
        accelerating: false,
        breaking: false,
        
        swap: function() {
            var temp = front;
            front = back;
            back = temp;
            wheelAcceleration = -wheelAcceleration;
        },
        
        update: function() {
            var that = this;
            
            constraints.forEach(function (constraint) {
                constraint.solve();
            });
            
            circles.forEach(function(circle) {
                if (circle === back) {
                    if (that.accelerating) {
                        circle.rotationSpeed += wheelAcceleration;
                    }
                }
                circle.integrate();
                if (that.breaking) circle.rotationSpeed = 0;
                circle.detectCollisions(lines, function(nearestPointOnLine) {
                    var offset = circle.project(nearestPointOnLine);
                    circle.rotate(offset);
                });
            });
            
            this.render();
        },
        
        render: function() {
            constraints.forEach(function (constraint) {
                render.line(constraint.v1, constraint.v2);
            });
            circles.forEach(function(circle) {
                render.circle(circle.pos.x, circle.pos.y, circle.radius, circle.rotation);
            });
        }
    };
});
