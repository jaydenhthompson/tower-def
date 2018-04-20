//////////////////////////////
//                          //
//    Particles Function    //
//                          //
//////////////////////////////

Game.particles = (function () {
    let particles = [];

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function update(seconds) {
        let keep = [];
        for (let i = 0; i < particles.length; i++) {
            let part = particles[i];
            part.lifetime -= seconds;
            part.pos.x += part.speed * Math.cos(part.direction) * seconds;
            part.pos.y -= part.speed * Math.sin(part.direction) * seconds;

            if (part.lifetime >= 0) {
                keep.push(part);
            }
        }
        particles = keep;
    }

    function makeParticles(specs) {
        for (let i = 0; i < specs.num; i++) {
            let particle = {
                pos: {
                    x: specs.pos.x,
                    y: specs.pos.y
                },
                direction: getRandom(specs.direction.min, specs.direction.max),
                speed: getRandom(specs.speed.min, specs.speed.max),
                lifetime: getRandom(specs.lifetime.min, specs.lifetime.max),
                size: getRandom(specs.size.min, specs.size.max),
                fill: specs.color
            };
            particles.push(particle);
        }
    }

    function explosion(coords, color){
        makeParticles({
            num: 100,
            pos: coords,
            direction: {
                min: 0,
                max: Math.PI * 2
            },
            speed:{
                min: 50,
                max: 200
            },
            lifetime:{
                min: .1,
                max: .25
            },
            size:{
                min: 2,
                max: 5
            },
            color: color
        });
    }

    function trail(coords, color, direction){
        makeParticles({
            num: 10,
            pos: coords,
            direction: {
                min: direction - (Math.PI / 8),
                max: direction + (Math.PI / 8)
            },
            speed:{
                min: 50,
                max: 200
            },
            lifetime:{
                min: .05,
                max: .1
            },
            size:{
                min: 2,
                max: 5
            },
            color: color
        });
    }

    function render(){
        for(let i = 0; i < particles.length; i++){
            let part = particles[i];
            ctx.beginPath();
            ctx.fillStyle=part.fill;
            ctx.arc(part.pos.x, part.pos.y, part.size, 0, Math.PI);
            ctx.fill();
        }
    }

    return {
        update: update,
        render: render,
        explosion: explosion,
        trail: trail
    }
}());