function ground_1(pos){
    return {
        level: 1,
        baseImg: 'resources/tower-defense-turrets/turret-1-',
        image: 'resources/tower-defense-turrets/turret-1-1.png',
        center: {
            x: (pos.x * 50) + ((WIDTH / COLS) / 2),
            y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
        },
        degree: Math.PI / 2,
        damage: 10,
        radius: 100
    }
}

function ground_2(pos){
    return {
        level: 1,
        baseImg: 'resources/tower-defense-turrets/turret-2-',
        image: 'resources/tower-defense-turrets/turret-2-1.png',
        center: {
            x: (pos.x * 50) + ((WIDTH / COLS) / 2),
            y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
        },
        degree: Math.PI / 2,
        damage: 25,
        radius: 150
    }
}

function air_1(pos){
    return{
        level: 1,
        baseImg: 'resources/tower-defense-turrets/turret-3-',
        image: 'resources/tower-defense-turrets/turret-3-1.png',
        center: {
            x: (pos.x * 50) + ((WIDTH / COLS) / 2),
            y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
        },
        degree: Math.PI / 2,
        damage: 15,
        radius: 175
    }
}

function air_2(pos){
    return{
        level: 1,
        baseImg: 'resources/tower-defense-turrets/turret-5-',
        image: 'resources/tower-defense-turrets/turret-5-1.png',
        center: {
            x: (pos.x * 50) + ((WIDTH / COLS) / 2),
            y: (pos.y * 50) + ((HEIGHT / ROWS) / 2)
        },
        degree: Math.PI / 2,
        damage: 35,
        radius: 200
    }
}

function ground_creep_1(pos){
    return {
        image:{
            render: "resources/creep/creep-1-red/1.png",
            base: "resources/creep/creep-1-red/",
            current: 0,
            number: 6,
            time: 0.0,
            timings : [1, 0.2, 0.1, 1, 0.1, 0.2]
        },
        pos: pos,
        degree: 0,
        life: 100
    }
}

function ground_creep_2(pos){
    return {
        image:{
            render: "resources/creep/creep-2-green/1.png",
            base: "resources/creep/creep-2-green/",
            current: 0,
            number: 4,
            time: 0.0,
            timings : [0.2, 1, 0.2, 0.6]
        },
        pos: pos,
        degree: 0, 
        life: 100
    }
}

function air_creep(pos){
    return{
        image:{
            render: "resources/creep/creep-3-blue/1.png",
            base: "resources/creep/creep-3-blue/",
            current: 0,
            number: 4,
            time: 0.0,
            timings : [1, 0.2, 0.2, 0.2]
        },
        pos: pos,
        degree: 0,
        life: 100
    }
}