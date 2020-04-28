const filters = {
    "Default": [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    "Invert": [
        -1, 0, 0, 0, 1,
        0, -1, 0, 0, 1,
        0, 0, -1, 0, 1,
        0, 0, 0, 1, 0,
    ],
    "Grayscale": [
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        0, 0, 0, 1, 0,
    ],
    "Sepia": [
        0.3, 0.45, 0.1, 0, 0,
        0.2, 0.45, 0.1, 0, 0,
        0.1, 0.3, 0.1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    "Summer Daze": [
        0.90, 0, 0, 0, 0.40,
        0.95, 0, 0, 0, -0.10,
        -0.20, 0, 0, 0, 0.65,
        0, 0, 0, 1, 0
    ],
    "Metro": [
        0.36, 0, 0, 0, 0.02,
        0.44, 0, 0, 0, 0.06,
        0.40, 0, 0, 0, 0.16,
        0, 0, 0, 1, 0
    ],
    "Lime": [
        1, 0, 0, 0, 0,
        0, 2, 0, 0, 0,
        0, 0, 0, 0.5, 0,
        0, 0, 0, 1, 0
    ],
    "Peachy": [
        1, 0, 0, 0, 0,
        0, 0.5, 0, 0, 0,
        0, 0, 0, 0.5, 0,
        0, 0, 0, 1, 0
    ],
    "Noir": [
        0, 0, 1, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ],
    "Blow Out": [
        1.5, 0, 0, 0, 0,
        0, 1.5, 0, 0, 0,
        0, 0, 1.5, 0, 0,
        0, 0, 0, 1, 0
    ],
    "Stone Wash": [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, -2, 1, 0
    ],
    "Candy Floss": [
        1, 0, 0, 0.4, 0.1,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    "Tickled": [
        1, 0, 0, 0.4, 0,
        0, 0.5, 0.6, 0.3, -0.2,
        0.7, 1, 0.2, 0.6, 0.8,
        0.5, 0.6, 0.6, 1, 0,
    ],
    "1976": [
        1, 0, 0, 0, 0,
        -0.2, 1.0, 0.3, 0.1, 0,
        -0.1, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ],
    "Old Times": [
        1, 0, 0, 0, 0,
        -0.4, 1.3, -0.4, 0.2, -0.1,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ],
    "Cold Life": [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        -0.2, 0.2, 0.1, 0.4, 0,
        0, 0, 0, 1, 0
    ],
    "Sepium": [
        1.3, -0.3, 1.1, 0, 0,
        0, 1.3, 0.2, 0, 0,
        0, 0, 0.8, 0.2, 0,
        0, 0, 0, 1, 0
    ],
    "Milk": [
        0, 1.0, 0, 0, 0,
        0, 1.0, 0, 0, 0,
        0, 0.6, 1, 0, 0,
        0, 0, 0, 1, 0
    ]
}

export default filters