define(["vector", "physics", "render", "lines"],
function (vector, physics, render, lines) {
    var circles = [physics.circle(20, 150, 0),
                   physics.circle(20, 200, 86),
                   physics.circle(20, 100, 86)];
    var head = circles[0];
    var front = circles[1];
    var back = circles[2];
    var constraints = [physics.constraint(head, front, 100),
                       physics.constraint(head, back, 100),
                       physics.constraint(front, back, 100)];
    var wheelAcceleration = 0.1;
   
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
