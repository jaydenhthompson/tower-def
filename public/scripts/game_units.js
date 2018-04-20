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

function ground_creep_1(pos) {
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
        type: 'ground'
    }
}

function ground_creep_2(pos) {
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
        type: 'ground'
    }
}

function air_creep(pos) {
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
        type: 'air'
    }
}

var KeyEvent = {
    CANCEL: 3,
    HELP: 6,
    BACK_SPACE: 8,
    TAB: 9,
    CLEAR: 12,
    RETURN: 13,
    ENTER: 14,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINTSCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    K_0: 48,
    K_1: 49,
    K_2: 50,
    K_3: 51,
    K_4: 52,
    K_5: 53,
    K_6: 54,
    K_7: 55,
    K_8: 56,
    K_9: 57,
    SEMICOLON: 59,
    EQUALS: 61,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    CONTEXT_MENU: 93,
    NUMPAD0: 96,
    NUMPAD1: 97,
    NUMPAD2: 98,
    NUMPAD3: 99,
    NUMPAD4: 100,
    NUMPAD5: 101,
    NUMPAD6: 102,
    NUMPAD7: 103,
    NUMPAD8: 104,
    NUMPAD9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SEPARATOR: 108,
    SUBTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    F16: 127,
    F17: 128,
    F18: 129,
    F19: 130,
    F20: 131,
    F21: 132,
    F22: 133,
    F23: 134,
    F24: 135,
    NUM_LOCK: 144,
    SCROLL_LOCK: 145,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    BACK_QUOTE: 192,
    OPEN_BRACKET: 219,
    BACK_SLASH: 220,
    CLOSE_BRACKET: 221,
    QUOTE: 222,
    META: 224
};