define(["vector", "libs/thing", "render"],
function(vector, Thing, render) {
    return {
        line: (function () {
            var prototype = {
                point: vector(),
                pointVec: vector(),
                normalizedProjection: 0,
                
                init: function(x1, y1, x2, y2) {
                    this.p1 = vector(x1, y1);
                    this.p2 = vector(x2, y2);
                    this.piece = vector().setVec(this.p2).sub(this.p1);
                    this.norm = vector().setVec(this.piece).normalize(),
                    this.sqrLength = this.piece.lengthSquared();
                },
                
                nearestPoint: function(pos) {
                    this.pointVec.setVec(pos).sub(this.p1);
                    this.normalizedProjection = this.pointVec.dot(this.piece);
                    if (this.normalizedProjection < 0) {
                        return this.p1;
                    } else if (this.normalizedProjection > this.sqrLength) {
                        return this.p2;
                    } else { // Projection is on line
                        this.point.setVec(this.piece)
                                  .scale(this.normalizedProjection / this.sqrLength)
                                  .add(this.p1);
                        return this.point;
                    }
                }
            };
            return function(x1, y1, x2, y2) {
                return Thing.create(prototype, true, x1, y1, x2, y2);
            };
        }()),
        
        circle: (function () {
            var prototype = {
                newpos: vector(),
                acc: vector(0, 0.05),
                rotation: 0,
                rotationSpeed: 0,
                pointToPos: vector(),
                count: 0,
                
                init: function(radius, x, y, px, py) {
                    this.radius = radius;
                    this.radiusSquared = Math.pow(radius, 2);
                    this.pos = vector(x, y);
                    this.prevpos = vector(px || this.pos.x,
                                          py || this.pos.y);
                },
                    
                // Calculate new position based on prev pos (Verlet integration)
                integrate: function() {
                    this.newpos.setVec(this.pos)
                               .scale(2)
                               .sub(this.prevpos)
                               .add(this.acc);
                    this.prevpos.setVec(this.pos);
                    this.pos.setVec(this.newpos);
                    this.rotation += this.rotationSpeed/this.radius;
                },

                rotate: (function () {
                    var deltaPos = vector();
                    var projection = vector();
                    
                    return function(offset, rotate) {
                        var clockwise = vector();
                        var rotationDiff, force;
                        
                        deltaPos.setVec(this.prevpos).sub(this.pos);
                        clockwise.set(offset.y, -offset.x);
                        clockwise.scale(1 / clockwise.length()); //FIXME MAYBE
                        
                        force = Math.abs(deltaPos.dot(clockwise));
                        projection.setVec(clockwise)
                                  .scale(deltaPos.dot(clockwise));
                                  
                        if (clockwise.dot(projection) <= 0) {
                            force *= -1;
                        }
                        
                        rotationDiff = force-this.rotationSpeed;
                        
                        this.rotationSpeed += rotationDiff;
                        this.pos.add(clockwise.scale(rotationDiff));
                    };
                }()),
                
                detectCollisions: (function () {
                    var pointToPos = vector();
                    var nearestPointOnLine;
                    
                    return function(lines, onCollisionCallback) {
                        var that = this;
                        
                        lines.forEach(function (line) {
                            nearestPointOnLine = line.nearestPoint(that.pos);
                            
                            pointToPos.setVec(that.pos).sub(nearestPointOnLine);    
                            
                            if (pointToPos.lengthSquared() < that.radiusSquared) {
                                // We have a collision
                                onCollisionCallback(pointToPos);
                            }
                        });
                        lines.reverse();
                    };
                }()),
                
                project: (function () {
                    var offset = vector();
                    
                    return function(pointToPos) {
                        var depth = this.radius - pointToPos.length();
                    
                        offset.setVec(pointToPos).normalize().scale(depth);
                        this.pos.add(offset);
                        //this.rotate(offset);
                        return offset;
                    };
                }())
            };
            
            return function (radius, x, y, px, py) {
                return Thing.create(prototype, true, radius, x, y, px, py);
            };
        }()),
        
        constraint: (function () {
            var prototype = {
                distVec: vector(),
                offset: vector(),
                
                init: function(w1, w2, distance) {
                    this.v1 = w1.pos;
                    this.v2 = w2.pos;
                    this.dist = distance;
                },
                
                solve: function() {
                    var ratio;
                    this.distVec.setVec(this.v2).sub(this.v1);
                    var curDist = this.distVec.length();
                    
                    if (this.curDist != this.dist) {
                        ratio = (1 - curDist/this.dist) / 2;
                        this.offset.setVec(this.distVec).scale(ratio*0.08);
                        this.v1.sub(this.offset);
                        this.v2.add(this.offset);
                    }
                }
            };
            
            return function (w1, w2, distance) {
                return Thing.create(prototype, true, w1, w2, distance);
            };
        }())
    };
});
