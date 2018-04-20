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
            particles[i].lifetime -= seconds;
            particles[i].position.y += (particles[i].speed * seconds);

            if (particles[i].lifetime >= 0) {
                keep.push(particles[i]);
            }
        }
        particles = keep;
    }

    function makeParticles(specs) {
        for (let i = 0; i < specs.num; i++) {
            let particle = {
                position: {
                    x: specs.pos.x,
                    y: specs.pos.y
                },
                direction: getRandom(specs.rand.min, specs.rand.max),
                speed: getRandom(specs.speed.min, specs.speed.max),
                lifetime: getRandom(spes.lifetime.min, specs.lifetime.max),
                size: getRandom(specs.size.min, specs.size.max),
                fill: spec.color
            };
            particles.push(particle);
        }
    }

    function explosion(coords, color){

    }

    function trail(){

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