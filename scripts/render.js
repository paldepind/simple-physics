define(["vector"], function (vector) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var offset = vector();
    var twoPI = Math.PI * 2 + 0.0001;
    
    return {
        width: canvas.width,
        height: canvas.height,
        
        circle: function(x, y, r, rotstart, rotend, clockwise) {
            ctx.moveTo(x, y);
            ctx.arc(x, y, r, rotstart, rotstart+twoPI, true);
        },
        
        line: function(p1, p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
        },
        
        clear: function() {
            ctx.clearRect(offset.x, offset.y, 800, 600);
        },
        
        moveView: function(diffx, diffy) {
            ctx.translate(-diffx, -diffy);
            offset.x += diffx;
            offset.y += diffy;
        },
        
        blit: function() {
            ctx.stroke();
            ctx.beginPath();
        }
    };
});
