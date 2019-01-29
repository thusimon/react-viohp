export const lowPass1 = {
    name: "lowPass1",
    desc: "low pass filter, attenuate to 0",
    data: [
        [0,1],
        [1,0]
    ],
    edit: false
}

export const lowPass2 = {
    name: "lowPass2",
    desc: "low pass filter, attenuate to 60%",
    data: [
        [0,1],
        [0.6,0.8],
        [1, 0.6]
    ],
    edit: false
}

export const highPass = {
    name: "highPass",
    desc: "high pass, start at 40%",
    data: [
        [0,0.4],
        [1,1]
    ],
    edit: false
}