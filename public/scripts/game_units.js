function ground_1(pos) {
    return {
        level: 1,
        baseImg: 'resources/tower-defense-turrets/turret-1-',
        image: 'resources/tower-defense-turrets/turret-1-1.png',
        center: {
            x: (pos.x * 50) + ((WIDTH / COLS) / 2),
            y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
        },
        pos: pos,
        degree: Math.PI / 2,
        damage: 10,
        radius: 100,
        reload: 0,
        relode_time: 1,
        projectile_type: 'lazer',
        type: 'ground',
        value: 5
    }
}

function ground_2(pos) {
    return {
        level: 1,
        baseImg: 'resources/tower-defense-turrets/turret-2-',
        image: 'resources/tower-defense-turrets/turret-2-1.png',
        center: {
            x: (pos.x * 50) + ((WIDTH / COLS) / 2),
            y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
        },
        pos: pos,
        degree: Math.PI / 2,
        damage: 25,
        radius: 150,
        reload: 0,
        relode_time: 2,
        projectile_type: 'bomb',
        type: 'ground',
        value: 15
    }
}

function air_1(pos) {
    return {
        level: 1,
        baseImg: 'resources/tower-defense-turrets/turret-3-',
        image: 'resources/tower-defense-turrets/turret-3-1.png',
        center: {
            x: (pos.x * 50) + ((WIDTH / COLS) / 2),
            y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
        },
        pos: pos,
        degree: Math.PI / 2,
        damage: 15,
        radius: 175,
        reload: 0,
        relode_time: 1,
        projectile_type: 'lazer',
        type: 'air',
        value: 10
    }
}

function air_2(pos) {
    return {
        level: 1,
        baseImg: 'resources/tower-defense-turrets/turret-5-',
        image: 'resources/tower-defense-turrets/turret-5-1.png',
        center: {
            x: (pos.x * 50) + ((WIDTH / COLS) / 2),
            y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
        },
        pos: pos,
        degree: Math.PI / 2,
        damage: 35,
        radius: 200,
        reload: 0,
        relode_time: 3,
        projectile_type: 'missile',
        type: 'air',
        value: 25
    }
}

function ground_creep_1(pos, origin, current) {
    return {
        image: {
            render: "resources/creep/creep-1-red/1.png",
            base: "resources/creep/creep-1-red/",
            current: 0,
            number: 6,
            time: 0.0,
            timings: [1, 0.2, 0.1, 1, 0.1, 0.2]
        },
        pos: pos,
        degree: 0,
        life: 100,
        type: 'ground',
        origin: origin,
        current: current,
        goal: undefined
    }
}

function ground_creep_2(pos, origin, current) {
    return {
        image: {
            render: "resources/creep/creep-2-green/1.png",
            base: "resources/creep/creep-2-green/",
            current: 0,
            number: 4,
            time: 0.0,
            timings: [0.2, 1, 0.2, 0.6]
        },
        pos: pos,
        degree: 0,
        life: 100,
        type: 'ground',
        origin: origin,
        current: current,
        goal: undefined
    }
}

function air_creep(pos, origin, current) {
    return {
        image: {
            render: "resources/creep/creep-3-blue/1.png",
            base: "resources/creep/creep-3-blue/",
            current: 0,
            number: 4,
            time: 0.0,
            timings: [1, 0.2, 0.2, 0.2]
        },
        pos: pos,
        degree: 0,
        life: 100,
        type: 'air',
        origin: origin,
        current: current,
        goal: undefined
    }
}

let level_1 = {
    left:{
        ground_1: 10,
        ground_2: 10, 
        air: 0
    },
    top:{
        ground_1: 0,
        ground_2: 0, 
        air: 0
    }
}

let level_2 = {
    left:{
        ground_1: 20,
        ground_2: 20, 
        air: 0
    },
    top:{
        ground_1: 20,
        ground_2: 20, 
        air: 0
    }
}

let level_3 = {
    left:{
        ground_1: 20,
        ground_2: 20, 
        air: 10
    },
    top:{
        ground_1: 25,
        ground_2: 25, 
        air: 10
    }
}

var levels = [level_1, level_2, level_3];
