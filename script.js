import * as THREE from
    "https://unpkg.com/three@0.164.1/build/three.module.js";


/* =========================================================
   HELPERS
========================================================= */

const $ =
    selector =>
        document.querySelector(selector);


const $$ =
    selector =>
        [...document.querySelectorAll(selector)];


const randomItem =
    array =>
        array[
            Math.floor(
                Math.random() *
                array.length
            )
        ];


const randomNumber =
    (min,max) =>
        Math.floor(
            Math.random() *
            (max-min+1)
        ) + min;


const delay =
    ms =>
        new Promise(
            resolve =>
                setTimeout(resolve,ms)
        );



/* =========================================================
   INSTRUMENTS
========================================================= */

const instruments = [

{
    name:"Guitar",
    icon:"🎸",
    category:"string",
    family:"String",
    description:"A versatile plucked string instrument.",
    frequency:220
},

{
    name:"Ukulele",
    icon:"🎸",
    category:"string",
    family:"String",
    description:"A small four-string instrument with a bright tone.",
    frequency:392
},

{
    name:"Piano",
    icon:"🎹",
    category:"keyboard",
    family:"Keyboard",
    description:"A keyboard instrument using hammers and strings.",
    frequency:440
},

{
    name:"Flute",
    icon:"🪈",
    category:"woodwind",
    family:"Woodwind",
    description:"A light woodwind played by blowing across an opening.",
    frequency:698.46
},

{
    name:"Drums",
    icon:"🥁",
    category:"percussion",
    family:"Percussion",
    description:"A family of instruments built around rhythm.",
    drum:true
},

{
    name:"Clarinet",
    icon:"🎶",
    category:"woodwind",
    family:"Woodwind",
    description:"A single-reed woodwind with a flexible sound.",
    frequency:293.66
},

{
    name:"Trumpet",
    icon:"🎺",
    category:"brass",
    family:"Brass",
    description:"A bright and powerful brass instrument.",
    frequency:523.25
},

{
    name:"Violin",
    icon:"🎻",
    category:"string",
    family:"String",
    description:"A bowed string instrument with an expressive sound.",
    frequency:659.25
},

{
    name:"Saxophone",
    icon:"🎷",
    category:"woodwind",
    family:"Woodwind",
    description:"A reed instrument famous for jazz and pop.",
    frequency:369.99
},

{
    name:"Cello",
    icon:"🎻",
    category:"string",
    family:"String",
    description:"A large bowed instrument with a deep tone.",
    frequency:196
},

{
    name:"Xylophone",
    icon:"🎼",
    category:"percussion",
    family:"Percussion",
    description:"Tuned bars struck with mallets.",
    frequency:783.99
},

{
    name:"Trombone",
    icon:"🎺",
    category:"brass",
    family:"Brass",
    description:"A brass instrument famous for its slide.",
    frequency:233.08
},

{
    name:"Synthesizer",
    icon:"🎛️",
    category:"electronic",
    family:"Electronic",
    description:"Creates sounds through electronic synthesis.",
    frequency:329.63
},

{
    name:"French Horn",
    icon:"📯",
    category:"brass",
    family:"Brass",
    description:"A warm coiled brass instrument.",
    frequency:349.23
},

{
    name:"Oboe",
    icon:"🪈",
    category:"woodwind",
    family:"Woodwind",
    description:"A focused double-reed instrument.",
    frequency:466.16
},

{
    name:"Digital Piano",
    icon:"🎹",
    category:"electronic",
    family:"Electronic",
    description:"An electronic instrument designed to imitate a piano.",
    frequency:440
},

{
    name:"Organ",
    icon:"🎹",
    category:"keyboard",
    family:"Keyboard",
    description:"A keyboard instrument known for sustained tones.",
    frequency:261.63
},

{
    name:"Drum Machine",
    icon:"🎛️",
    category:"electronic",
    family:"Electronic",
    description:"Creates programmed electronic rhythms.",
    drum:true
}

];


const getInstrument =
    name =>
        instruments.find(
            item =>
                item.name === name
        );



/* =========================================================
   PRICES
========================================================= */

const instrumentPrices = {

    Guitar:0,
    Ukulele:100,
    Piano:250,
    Flute:450,
    Drums:700,
    Clarinet:1000,
    Trumpet:1350,
    Violin:1750,
    Saxophone:2200,
    Cello:2700,
    Xylophone:3250,
    Trombone:3850,
    Synthesizer:4500,
    "French Horn":5200,
    Oboe:6000,
    "Digital Piano":6900,
    Organ:7900,
    "Drum Machine":9000

};



/* =========================================================
   AVATAR PRESETS
========================================================= */

const avatarPresets = [

{
    id:"hero",
    name:"Hero",
    badge:"H",
    bodyScale:1,
    headScale:1
},

{
    id:"swift",
    name:"Swift",
    badge:"S",
    bodyScale:.9,
    headScale:.95
},

{
    id:"power",
    name:"Power",
    badge:"P",
    bodyScale:1.12,
    headScale:1
},

{
    id:"star",
    name:"Star",
    badge:"★",
    bodyScale:.97,
    headScale:1.06
},

{
    id:"neo",
    name:"Neo",
    badge:"N",
    bodyScale:1.03,
    headScale:.95
},

{
    id:"legend",
    name:"Legend",
    badge:"L",
    bodyScale:1.08,
    headScale:1.03
}

];



/* =========================================================
   PROFILE
========================================================= */

function freshProfile() {

    return {

        playerName:"",

        avatar:{

            preset:"hero",

            skin:"#dca57b",

            hair:"#201915",

            outfit:"#19345b"

        },

        level:1,

        xp:0,

        totalXpEarned:0,

        spendableXp:0,

        highestLevel:1

    };

}


let profile =
    freshProfile();


try {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "musicverseProfile"
            )
        );


    if (saved) {

        profile = {

            ...profile,

            ...saved,

            avatar:{

                ...profile.avatar,

                ...(
                    typeof saved.avatar ===
                    "object"

                    ? saved.avatar

                    : {}
                )

            }

        };

    }

}
catch(error) {

    console.warn(
        "Profile load failed.",
        error
    );

}


if (
    typeof profile.spendableXp !==
    "number"
) {

    profile.spendableXp =
        profile.totalXpEarned || 0;

}


function saveProfile() {

    localStorage.setItem(

        "musicverseProfile",

        JSON.stringify(
            profile
        )

    );

}



/* =========================================================
   BATTLE DATA
========================================================= */

const emptyUpgrades =
    () => ({

        power:0,
        melody:0,
        rhythm:0,
        defense:0

    });


function freshBattleData() {

    return {

        instrument:"Guitar",

        ownedInstruments:[
            "Guitar"
        ],

        wins:0,

        losses:0,

        instrumentXP:{},

        instrumentUpgrades:{}

    };

}


let battleData =
    freshBattleData();


try {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "musicverseBattle"
            )
        );


    if (saved) {

        battleData = {

            ...battleData,

            ...saved,

            instrumentXP:{
                ...(saved.instrumentXP || {})
            },

            instrumentUpgrades:{
                ...(saved.instrumentUpgrades || {})
            }

        };

    }

}
catch(error) {}


if (
    !Array.isArray(
        battleData.ownedInstruments
    )
) {

    battleData.ownedInstruments =
        ["Guitar"];

}


if (
    !battleData.ownedInstruments.includes(
        "Guitar"
    )
) {

    battleData.ownedInstruments.unshift(
        "Guitar"
    );

}


if (
    !battleData.ownedInstruments.includes(
        battleData.instrument
    )
) {

    battleData.instrument =
        "Guitar";

}


instruments.forEach(
    instrument => {

        if (
            typeof battleData.instrumentXP[
                instrument.name
            ] !==
            "number"
        ) {

            battleData.instrumentXP[
                instrument.name
            ] = 0;

        }


        if (
            !battleData.instrumentUpgrades[
                instrument.name
            ]
        ) {

            battleData.instrumentUpgrades[
                instrument.name
            ] =
                emptyUpgrades();

        }

    }
);


function saveBattleData() {

    localStorage.setItem(

        "musicverseBattle",

        JSON.stringify(
            battleData
        )

    );

}



/* =========================================================
   TROPHIES
========================================================= */

const TROPHY_TIERS = [

{
    xp:10000,
    name:"Bronze",
    title:"Bronze Master",
    icon:"🥉"
},

{
    xp:20000,
    name:"Silver",
    title:"Silver Master",
    icon:"🥈"
},

{
    xp:30000,
    name:"Gold",
    title:"Gold Master",
    icon:"🥇"
},

{
    xp:40000,
    name:"Diamond",
    title:"Diamond Master",
    icon:"💎"
},

{
    xp:50000,
    name:"Grand Master",
    title:"Grand Master",
    icon:"👑🏆"
}

];



/* =========================================================
   BASE STATS
========================================================= */

const baseStats = {

    Guitar:[68,78,72,58],

    Ukulele:[45,72,70,48],

    Piano:[74,90,82,72],

    Flute:[50,88,62,52],

    Drums:[94,38,98,78],

    Clarinet:[58,84,68,60],

    Trumpet:[90,76,74,68],

    Violin:[62,92,65,55],

    Saxophone:[74,84,82,62],

    Cello:[76,85,58,72],

    Xylophone:[58,82,86,50],

    Trombone:[86,72,75,76],

    Synthesizer:[82,86,88,65],

    "French Horn":[82,84,62,82],

    Oboe:[60,88,58,64],

    "Digital Piano":[70,86,78,68],

    Organ:[88,82,58,86],

    "Drum Machine":[84,46,96,70]

};



/* =========================================================
   SPECIAL MOVES
========================================================= */

const specialMoves = {

Guitar:{
    name:"Power Chord",
    icon:"⚡🎸",
    description:"A crushing chord powered by raw strength.",
    chance:.32,
    stat:"POWER",
    effect:s => s.power*.75 + randomNumber(18,30)
},

Ukulele:{
    name:"Island Groove",
    icon:"🌴🎸",
    description:"A joyful rhythm combo.",
    chance:.38,
    stat:"RHYTHM",
    effect:s => s.rhythm*.78 + randomNumber(12,25)
},

Piano:{
    name:"Grand Crescendo",
    icon:"🌟🎹",
    description:"All stats combine into one grand finale.",
    chance:.30,
    stat:"POWER",
    effect:s =>
        (
            s.power +
            s.melody +
            s.rhythm +
            s.defense
        )*.20 +
        randomNumber(15,25)
},

Flute:{
    name:"Whirlwind Melody",
    icon:"🌪️🪈",
    description:"A swirling wave of rapid notes.",
    chance:.36,
    stat:"MELODY",
    effect:s =>
        s.melody*.72 +
        s.rhythm*.22 +
        randomNumber(12,22)
},

Drums:{
    name:"Thunder Beat",
    icon:"⚡🥁",
    description:"An earth-shaking rhythm attack.",
    chance:.31,
    stat:"RHYTHM",
    effect:s =>
        s.rhythm*.92 +
        randomNumber(18,30)
},

Clarinet:{
    name:"Reed Rush",
    icon:"💨🎶",
    description:"A rapid melody and rhythm combination.",
    chance:.35,
    stat:"MELODY",
    effect:s =>
        s.melody*.48 +
        s.rhythm*.42 +
        randomNumber(12,24)
},

Trumpet:{
    name:"Brass Burst",
    icon:"💥🎺",
    description:"A devastating blast of brass power.",
    chance:.30,
    stat:"POWER",
    effect:s =>
        s.power*.9 +
        randomNumber(20,32)
},

Violin:{
    name:"Virtuoso Solo",
    icon:"✨🎻",
    description:"A brilliant solo powered by Melody.",
    chance:.34,
    stat:"MELODY",
    effect:s =>
        s.melody*.85 +
        randomNumber(15,28)
},

Saxophone:{
    name:"Jazz Improvisation",
    icon:"🔥🎷",
    description:"An unpredictable jazz attack.",
    chance:.36,
    stat:"POWER",
    effect:s =>
        randomItem(
            [
                s.power,
                s.melody,
                s.rhythm,
                s.defense
            ]
        )*.8 +
        randomNumber(15,35)
},

Cello:{
    name:"Deep Resonance",
    icon:"🌊🎻",
    description:"Deep tones combine Melody and Defense.",
    chance:.33,
    stat:"DEFENSE",
    effect:s =>
        s.melody*.42 +
        s.defense*.46 +
        randomNumber(12,22)
},

Xylophone:{
    name:"Crystal Cascade",
    icon:"💎🎼",
    description:"A sparkling Melody and Rhythm attack.",
    chance:.37,
    stat:"RHYTHM",
    effect:s =>
        s.melody*.45 +
        s.rhythm*.45 +
        randomNumber(13,24)
},

Trombone:{
    name:"Slide Strike",
    icon:"⚔️🎺",
    description:"A powerful sliding brass attack.",
    chance:.34,
    stat:"POWER",
    effect:s =>
        s.power*.5 +
        s.rhythm*.4 +
        randomNumber(14,24)
},

Synthesizer:{
    name:"Digital Overdrive",
    icon:"⚡🎛️",
    description:"Supercharges a random combat stat.",
    chance:.35,
    stat:"POWER",
    effect:s =>
        randomItem(
            [
                s.power,
                s.melody,
                s.rhythm,
                s.defense
            ]
        )*.95 +
        randomNumber(15,28)
},

"French Horn":{
    name:"Royal Fanfare",
    icon:"👑📯",
    description:"A majestic Melody and Defense attack.",
    chance:.32,
    stat:"DEFENSE",
    effect:s =>
        s.melody*.42 +
        s.defense*.52 +
        randomNumber(12,22)
},

Oboe:{
    name:"Piercing Note",
    icon:"🎯🪈",
    description:"A focused note that cuts through defense.",
    chance:.31,
    stat:"MELODY",
    effect:(s,e) =>
        s.melody*.55 +
        e.defense*.3 +
        randomNumber(15,25)
},

"Digital Piano":{
    name:"Electric Arpeggio",
    icon:"⚡🎹",
    description:"Rapid electronic notes flood the arena.",
    chance:.36,
    stat:"MELODY",
    effect:s =>
        s.melody*.55 +
        s.rhythm*.35 +
        randomNumber(12,24)
},

Organ:{
    name:"Cathedral Blast",
    icon:"⛪🎹",
    description:"Massive sustained tones shake the arena.",
    chance:.29,
    stat:"DEFENSE",
    effect:s =>
        s.power*.45 +
        s.defense*.5 +
        randomNumber(15,25)
},

"Drum Machine":{
    name:"Beat Drop",
    icon:"💣🎛️",
    description:"A devastating electronic rhythm attack.",
    chance:.32,
    stat:"RHYTHM",
    effect:s =>
        s.rhythm*.62 +
        s.power*.38 +
        randomNumber(18,30)
}

};



/* =========================================================
   AUDIO
========================================================= */

let audioContext;


function audio() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) return null;


        audioContext =
            new AudioContext();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    return audioContext;

}


function tone(
    frequency,
    duration=.25,
    type="triangle",
    volume=.08
) {

    const ctx =
        audio();


    if (!ctx) return;


    const oscillator =
        ctx.createOscillator();


    const gain =
        ctx.createGain();


    const now =
        ctx.currentTime;


    oscillator.frequency.value =
        frequency;


    oscillator.type =
        type;


    gain.gain.setValueAtTime(
        .001,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        volume,
        now+.02
    );


    gain.gain.exponentialRampToValueAtTime(
        .001,
        now+duration
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        ctx.destination
    );


    oscillator.start();


    oscillator.stop(
        now+duration+.05
    );

}


function playInstrumentSound(
    instrument
) {

    if (
        instrument.drum
    ) {

        tone(
            90,
            .14,
            "sine",
            .12
        );


        setTimeout(
            () =>
                tone(
                    210,
                    .12,
                    "square",
                    .08
                ),
            120
        );


        return;

    }


    tone(
        instrument.frequency || 440,
        .5,
        "triangle",
        .1
    );

}



/* =========================================================
   THREE HELPERS
========================================================= */

function material(
    color,
    metalness=.05,
    roughness=.65
) {

    return new THREE.MeshStandardMaterial({

        color:new THREE.Color(color),

        metalness,

        roughness

    });

}


function mesh(
    geometry,
    color
) {

    const object =
        new THREE.Mesh(
            geometry,
            material(color)
        );


    object.castShadow =
        true;


    object.receiveShadow =
        true;


    return object;

}



/* =========================================================
   INSTRUMENT 3D MODELS
========================================================= */

function createInstrument3D(name) {

    const group =
        new THREE.Group();


    const gold =
        "#d3a85d";


    const wood =
        "#9f542b";


    const dark =
        "#2b1c14";


    if (
        [
            "Guitar",
            "Ukulele"
        ].includes(name)
    ) {

        const body =
            mesh(
                new THREE.BoxGeometry(
                    name === "Ukulele"
                    ? .38
                    : .48,
                    name === "Ukulele"
                    ? .55
                    : .7,
                    .18
                ),
                wood
            );


        body.position.y =
            -.05;


        const neck =
            mesh(
                new THREE.BoxGeometry(
                    .09,
                    .65,
                    .08
                ),
                dark
            );


        neck.position.y =
            .55;


        const head =
            mesh(
                new THREE.BoxGeometry(
                    .16,
                    .16,
                    .09
                ),
                dark
            );


        head.position.y =
            .92;


        group.add(
            body,
            neck,
            head
        );

    }

    else if (
        [
            "Violin",
            "Cello"
        ].includes(name)
    ) {

        const body =
            mesh(
                new THREE.BoxGeometry(
                    name === "Cello"
                    ? .48
                    : .33,
                    name === "Cello"
                    ? .7
                    : .5,
                    .16
                ),
                "#8e4b2c"
            );


        const neck =
            mesh(
                new THREE.BoxGeometry(
                    .07,
                    .62,
                    .07
                ),
                dark
            );


        neck.position.y =
            .52;


        group.add(
            body,
            neck
        );

    }

    else if (
        [
            "Trumpet",
            "Trombone",
            "French Horn",
            "Saxophone",
            "Flute",
            "Clarinet",
            "Oboe"
        ].includes(name)
    ) {

        const tube =
            mesh(
                new THREE.BoxGeometry(
                    .75,
                    .08,
                    .08
                ),
                gold
            );


        const bell =
            mesh(
                new THREE.BoxGeometry(
                    .2,
                    .23,
                    .2
                ),
                gold
            );


        bell.position.x =
            .44;


        group.add(
            tube,
            bell
        );

    }

    else if (
        [
            "Piano",
            "Digital Piano",
            "Organ",
            "Synthesizer"
        ].includes(name)
    ) {

        const keyboard =
            mesh(
                new THREE.BoxGeometry(
                    .8,
                    .2,
                    .36
                ),
                "#20242c"
            );


        const keys =
            mesh(
                new THREE.BoxGeometry(
                    .68,
                    .04,
                    .26
                ),
                "#efefea"
            );


        keys.position.y =
            .12;


        group.add(
            keyboard,
            keys
        );

    }

    else if (
        [
            "Drums",
            "Drum Machine"
        ].includes(name)
    ) {

        const drum =
            mesh(
                new THREE.BoxGeometry(
                    .52,
                    .44,
                    .4
                ),
                "#822b37"
            );


        group.add(
            drum
        );

    }

    else {

        const bars =
            mesh(
                new THREE.BoxGeometry(
                    .75,
                    .16,
                    .28
                ),
                "#705e9a"
            );


        group.add(
            bars
        );

    }


    group.scale.setScalar(
        .9
    );


    return group;

}



/* =========================================================
   BLOCKY ROBLOX-INSPIRED AVATAR
========================================================= */

function createAvatar3D(
    config,
    instrumentName
) {

    const preset =
        avatarPresets.find(
            item =>
                item.id ===
                config.preset
        ) ||
        avatarPresets[0];


    const root =
        new THREE.Group();


    root.userData = {

        state:"idle",

        phase:
            Math.random() *
            Math.PI*2,

        baseY:0,

        baseRotationY:0

    };


    /* TORSO */

    const torso =
        mesh(
            new THREE.BoxGeometry(
                .9*preset.bodyScale,
                1.1,
                .48*preset.bodyScale
            ),
            config.outfit
        );


    torso.position.y =
        1.55;


    /* WAIST */

    const waist =
        mesh(
            new THREE.BoxGeometry(
                .7,
                .38,
                .4
            ),
            "#252b38"
        );


    waist.position.y =
        .82;


    /* BLOCKY HEAD */

    const head =
        mesh(
            new THREE.BoxGeometry(
                .68*preset.headScale,
                .68*preset.headScale,
                .68*preset.headScale
            ),
            config.skin
        );


    head.position.y =
        2.48;


    /* HAIR */

    const hair =
        mesh(
            new THREE.BoxGeometry(
                .72*preset.headScale,
                .22,
                .72*preset.headScale
            ),
            config.hair
        );


    hair.position.y =
        2.84;


    /* EYES */

    const eyeMaterial =
        material(
            "#101010"
        );


    const leftEye =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                .07,
                .085,
                .035
            ),
            eyeMaterial
        );


    leftEye.position.set(
        -.14,
        2.5,
        .355
    );


    const rightEye =
        leftEye.clone();


    rightEye.position.x =
        .14;


    /* SMILE */

    const smile =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                .2,
                .035,
                .035
            ),
            material(
                "#43211d"
            )
        );


    smile.position.set(
        0,
        2.34,
        .355
    );


    /* ARMS */

    const leftArm =
        mesh(
            new THREE.BoxGeometry(
                .28,
                .92,
                .28
            ),
            config.outfit
        );


    const rightArm =
        mesh(
            new THREE.BoxGeometry(
                .28,
                .92,
                .28
            ),
            config.outfit
        );


    leftArm.position.set(
        -.64,
        1.52,
        0
    );


    rightArm.position.set(
        .64,
        1.52,
        0
    );


    /* HANDS */

    const leftHand =
        mesh(
            new THREE.BoxGeometry(
                .27,
                .27,
                .27
            ),
            config.skin
        );


    const rightHand =
        mesh(
            new THREE.BoxGeometry(
                .27,
                .27,
                .27
            ),
            config.skin
        );


    leftHand.position.y =
        -.58;


    rightHand.position.y =
        -.58;


    leftArm.add(
        leftHand
    );


    rightArm.add(
        rightHand
    );


    /* LEGS */

    const leftLeg =
        mesh(
            new THREE.BoxGeometry(
                .32,
                1,
                .34
            ),
            "#252b38"
        );


    const rightLeg =
        mesh(
            new THREE.BoxGeometry(
                .32,
                1,
                .34
            ),
            "#252b38"
        );


    leftLeg.position.set(
        -.22,
        .16,
        0
    );


    rightLeg.position.set(
        .22,
        .16,
        0
    );


    /* SHOES */

    const leftShoe =
        mesh(
            new THREE.BoxGeometry(
                .34,
                .18,
                .46
            ),
            "#141820"
        );


    const rightShoe =
        mesh(
            new THREE.BoxGeometry(
                .34,
                .18,
                .46
            ),
            "#141820"
        );


    leftShoe.position.set(
        0,
        -.53,
        .05
    );


    rightShoe.position.set(
        0,
        -.53,
        .05
    );


    leftLeg.add(
        leftShoe
    );


    rightLeg.add(
        rightShoe
    );


    root.add(
        torso,
        waist,
        head,
        hair,
        leftEye,
        rightEye,
        smile,
        leftArm,
        rightArm,
        leftLeg,
        rightLeg
    );


    root.userData.torso =
        torso;


    root.userData.head =
        head;


    root.userData.leftArm =
        leftArm;


    root.userData.rightArm =
        rightArm;


    root.userData.leftLeg =
        leftLeg;


    root.userData.rightLeg =
        rightLeg;


    const instrument =
        createInstrument3D(
            instrumentName
        );


    instrument.position.set(
        0,
        1.28,
        .48
    );


    instrument.rotation.z =
        -.18;


    root.add(
        instrument
    );


    root.userData.instrument =
        instrument;


    return root;

}



/* =========================================================
   AVATAR ANIMATION LOOP
========================================================= */

function resetAvatarPose(
    avatar
) {

    if (!avatar) return;


    const {
        leftArm,
        rightArm,
        leftLeg,
        rightLeg,
        head,
        torso,
        instrument
    } = avatar.userData;


    leftArm.rotation.set(
        0,
        0,
        0
    );


    rightArm.rotation.set(
        0,
        0,
        0
    );


    leftLeg.rotation.set(
        0,
        0,
        0
    );


    rightLeg.rotation.set(
        0,
        0,
        0
    );


    head.rotation.set(
        0,
        0,
        0
    );


    torso.rotation.set(
        0,
        0,
        0
    );


    instrument.rotation.z =
        -.18;

}



function animateAvatar(
    avatar,
    time
) {

    if (!avatar) return;


    const state =
        avatar.userData.state;


    const t =
        time*.001 +
        avatar.userData.phase;


    const {
        leftArm,
        rightArm,
        leftLeg,
        rightLeg,
        torso,
        head,
        instrument
    } = avatar.userData;


    if (
        state === "idle"
    ) {

        avatar.position.y =

            avatar.userData.baseY +

            Math.abs(
                Math.sin(
                    t*2.2
                )
            )*.045;


        torso.rotation.z =
            Math.sin(
                t*1.6
            )*.018;


        head.rotation.y =
            Math.sin(
                t*1.15
            )*.08;


        leftArm.rotation.x =
            Math.sin(
                t*2
            )*.07;


        rightArm.rotation.x =
            -Math.sin(
                t*2
            )*.07;

    }


    if (
        state === "attack"
    ) {

        leftArm.rotation.x =
            Math.sin(
                t*14
            )*.8;


        rightArm.rotation.x =
            -Math.sin(
                t*14
            )*.8;


        leftLeg.rotation.x =
            -Math.sin(
                t*14
            )*.6;


        rightLeg.rotation.x =
            Math.sin(
                t*14
            )*.6;


        torso.rotation.z =
            Math.sin(
                t*14
            )*.05;

    }


    if (
        state === "perform"
    ) {

        leftArm.rotation.z =

            -.62 +

            Math.sin(
                t*14
            )*.22;


        rightArm.rotation.z =

            .62 -

            Math.sin(
                t*14
            )*.22;


        leftArm.rotation.x =
            -.35;


        rightArm.rotation.x =
            -.35;


        head.rotation.z =
            Math.sin(
                t*5
            )*.08;


        torso.rotation.z =
            Math.sin(
                t*5
            )*.045;


        instrument.rotation.z =

            -.18 +

            Math.sin(
                t*11
            )*.13;

    }


    if (
        state === "hit"
    ) {

        torso.rotation.z =
            Math.sin(
                t*26
            )*.14;


        head.rotation.z =
            Math.sin(
                t*28
            )*.18;


        leftArm.rotation.z =
            -.45;


        rightArm.rotation.z =
            .45;

    }


    if (
        state === "victory"
    ) {

        leftArm.rotation.z =
            -2.25;


        rightArm.rotation.z =
            2.25;


        avatar.position.y =

            avatar.userData.baseY +

            Math.abs(
                Math.sin(
                    t*7
                )
            )*.16;

    }

}



/* =========================================================
   BATTLE SCENE
========================================================= */

const battleContainer =
    $("#battle3D");


let battleScene;

let battleRenderer;

let battleCamera;

let playerAvatar3D;

let cpuAvatar3D;

let battleParticles =
    [];


function createBattleScene() {

    battleScene =
        new THREE.Scene();


    battleScene.background =
        null;


    battleCamera =
        new THREE.PerspectiveCamera(
            43,
            battleContainer.clientWidth /
            battleContainer.clientHeight,
            .1,
            100
        );


    battleCamera.position.set(
        0,
        3.05,
        8.3
    );


    battleCamera.lookAt(
        0,
        1.2,
        0
    );


    battleRenderer =
        new THREE.WebGLRenderer({

            antialias:true,

            alpha:true

        });


    battleRenderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    battleRenderer.setSize(
        battleContainer.clientWidth,
        battleContainer.clientHeight
    );


    battleRenderer.shadowMap.enabled =
        true;


    battleContainer.appendChild(
        battleRenderer.domElement
    );


    const hemi =
        new THREE.HemisphereLight(
            "#d8eeff",
            "#223016",
            2.5
        );


    battleScene.add(
        hemi
    );


    const sunlight =
        new THREE.DirectionalLight(
            "#fff0c6",
            3.4
        );


    sunlight.position.set(
        4,
        7,
        5
    );


    sunlight.castShadow =
        true;


    battleScene.add(
        sunlight
    );


    /* BLOCKY GROUND */

    const floor =
        mesh(
            new THREE.BoxGeometry(
                11,
                .28,
                6
            ),
            "#5d8848"
        );


    floor.position.y =
        -.71;


    floor.receiveShadow =
        true;


    battleScene.add(
        floor
    );


    /* STAGE */

    const stage =
        mesh(
            new THREE.BoxGeometry(
                7.5,
                .28,
                3.6
            ),
            "#3d5268"
        );


    stage.position.y =
        -.49;


    battleScene.add(
        stage
    );


    /* BLOCKS AROUND ARENA */

    for (
        let i=-5;
        i<=5;
        i++
    ) {

        if (
            Math.abs(i) < 3
        ) continue;


        const cube =
            mesh(
                new THREE.BoxGeometry(
                    .7,
                    .7,
                    .7
                ),
                i%2===0
                ? "#698f55"
                : "#7b9862"
            );


        cube.position.set(
            i,
            -.22,
            -2
        );


        battleScene.add(
            cube
        );

    }


    rebuildPlayerAvatar();

    rebuildCPUAvatar(null);


    battleLoop();

}



function removeObject(
    object
) {

    if (!object) return;


    battleScene.remove(
        object
    );

}



function rebuildPlayerAvatar() {

    if (!battleScene) return;


    removeObject(
        playerAvatar3D
    );


    playerAvatar3D =
        createAvatar3D(

            profile.avatar,

            battleData.instrument

        );


    playerAvatar3D.position.set(
        -2,
        -.42,
        0
    );


    playerAvatar3D.rotation.y =
        .25;


    playerAvatar3D.userData.baseY =
        -.42;


    playerAvatar3D.userData.baseRotationY =
        .25;


    battleScene.add(
        playerAvatar3D
    );

}



function randomCPUAvatarConfig() {

    return {

        preset:
            randomItem(
                avatarPresets
            ).id,

        skin:
            randomItem([
                "#f2c7a5",
                "#dca57b",
                "#b97850",
                "#895638",
                "#5d3828"
            ]),

        hair:
            randomItem([
                "#201915",
                "#5b3526",
                "#d0a05a",
                "#8b2635",
                "#503d74"
            ]),

        outfit:
            randomItem([
                "#19345b",
                "#7a2534",
                "#264f45",
                "#654483",
                "#4c4f58",
                "#c59a51"
            ])

    };

}



function rebuildCPUAvatar(
    cpu
) {

    if (!battleScene) return;


    removeObject(
        cpuAvatar3D
    );


    const instrumentName =
        cpu
        ? cpu.instrument.name
        : "Saxophone";


    cpuAvatar3D =
        createAvatar3D(

            cpu
            ? cpu.avatar
            : randomCPUAvatarConfig(),

            instrumentName

        );


    cpuAvatar3D.position.set(
        2,
        -.42,
        0
    );


    cpuAvatar3D.rotation.y =
        -.25;


    cpuAvatar3D.userData.baseY =
        -.42;


    cpuAvatar3D.userData.baseRotationY =
        -.25;


    battleScene.add(
        cpuAvatar3D
    );


    cpuAvatar3D.visible =
        Boolean(cpu);

}



/* =========================================================
   PARTICLES
========================================================= */

function createParticles(
    position,
    color,
    amount=24
) {

    for (
        let i=0;
        i<amount;
        i++
    ) {

        const particle =
            mesh(
                new THREE.BoxGeometry(
                    .07,
                    .07,
                    .07
                ),
                color
            );


        particle.position.copy(
            position
        );


        particle.userData.velocity =
            new THREE.Vector3(

                (
                    Math.random()-.5
                )*.12,

                Math.random()*.1+.03,

                (
                    Math.random()-.5
                )*.12

            );


        particle.userData.life =
            1;


        battleScene.add(
            particle
        );


        battleParticles.push(
            particle
        );

    }

}



function updateParticles() {

    battleParticles.forEach(
        particle => {

            particle.position.add(
                particle.userData.velocity
            );


            particle.userData.velocity.y -=
                .002;


            particle.rotation.x +=
                .1;


            particle.rotation.y +=
                .12;


            particle.userData.life -=
                .025;


            particle.scale.setScalar(
                Math.max(
                    .01,
                    particle.userData.life
                )
            );

        }
    );


    battleParticles =
        battleParticles.filter(
            particle => {

                if (
                    particle.userData.life <= 0
                ) {

                    battleScene.remove(
                        particle
                    );


                    return false;

                }


                return true;

            }
        );

}



/* =========================================================
   CAMERA SHAKE
========================================================= */

let cameraShake =
    0;


function triggerCameraShake(
    amount=.12
) {

    cameraShake =
        amount;

}



function battleLoop(
    time=0
) {

    requestAnimationFrame(
        battleLoop
    );


    animateAvatar(
        playerAvatar3D,
        time
    );


    animateAvatar(
        cpuAvatar3D,
        time
    );


    updateParticles();


    if (
        cameraShake > .001
    ) {

        battleCamera.position.x +=
            (
                Math.random()-.5
            )*cameraShake;


        battleCamera.position.y +=
            (
                Math.random()-.5
            )*cameraShake;


        cameraShake *=
            .82;

    }


    battleRenderer.render(
        battleScene,
        battleCamera
    );

}



/* =========================================================
   ROBLOX-INSPIRED ATTACK
========================================================= */

async function avatarAttack(
    attacker,
    defender
) {

    if (
        !attacker ||
        !defender
    ) return;


    resetAvatarPose(
        attacker
    );


    attacker.userData.state =
        "attack";


    const startX =
        attacker.position.x;


    const startY =
        attacker.userData.baseY;


    const direction =
        startX < 0
        ? 1
        : -1;


    /* RUN */

    for (
        let i=0;
        i<10;
        i++
    ) {

        attacker.position.x +=
            direction*.095;


        attacker.position.y =

            startY +

            Math.abs(
                Math.sin(
                    i*.9
                )
            )*.08;


        await delay(
            20
        );

    }


    /* JUMP */

    for (
        let i=0;
        i<5;
        i++
    ) {

        attacker.position.y +=
            .09;


        attacker.rotation.z +=
            direction*.025;


        await delay(
            20
        );

    }


    /* IMPACT */

    createParticles(

        defender.position
        .clone()
        .add(
            new THREE.Vector3(
                0,
                1.3,
                .2
            )
        ),

        "#f2cb70",

        25

    );


    triggerCameraShake(
        .15
    );


    await avatarHit(
        defender
    );


    /* LAND */

    for (
        let i=0;
        i<5;
        i++
    ) {

        attacker.position.y -=
            .09;


        attacker.rotation.z -=
            direction*.025;


        await delay(
            20
        );

    }


    /* RETURN */

    for (
        let i=0;
        i<10;
        i++
    ) {

        attacker.position.x -=
            direction*.095;


        await delay(
            18
        );

    }


    attacker.position.x =
        startX;


    attacker.position.y =
        startY;


    attacker.rotation.z =
        0;


    attacker.userData.state =
        "idle";


    resetAvatarPose(
        attacker
    );

}



/* =========================================================
   HIT REACTION
========================================================= */

async function avatarHit(
    avatar
) {

    if (!avatar) return;


    resetAvatarPose(
        avatar
    );


    avatar.userData.state =
        "hit";


    const startX =
        avatar.position.x;


    const startY =
        avatar.userData.baseY;


    const knock =
        startX > 0
        ? .20
        : -.20;


    for (
        let i=0;
        i<5;
        i++
    ) {

        avatar.position.x +=
            knock;


        avatar.position.y +=
            .04;


        avatar.rotation.z +=
            knock*.2;


        await delay(
            24
        );

    }


    for (
        let i=0;
        i<5;
        i++
    ) {

        avatar.position.x -=
            knock;


        avatar.position.y -=
            .04;


        avatar.rotation.z -=
            knock*.2;


        await delay(
            24
        );

    }


    avatar.position.x =
        startX;


    avatar.position.y =
        startY;


    avatar.rotation.z =
        0;


    avatar.userData.state =
        "idle";


    resetAvatarPose(
        avatar
    );

}



/* =========================================================
   VICTORY EMOTE
========================================================= */

async function avatarVictory(
    avatar
) {

    if (!avatar) return;


    resetAvatarPose(
        avatar
    );


    avatar.userData.state =
        "victory";


    const baseY =
        avatar.userData.baseY;


    const baseRotation =
        avatar.userData.baseRotationY;


    /* DOUBLE JUMP */

    for (
        let jump=0;
        jump<2;
        jump++
    ) {

        for (
            let i=0;
            i<7;
            i++
        ) {

            avatar.position.y +=
                .09;


            await delay(
                24
            );

        }


        for (
            let i=0;
            i<7;
            i++
        ) {

            avatar.position.y -=
                .09;


            await delay(
                24
            );

        }

    }


    /* SPIN */

    for (
        let i=0;
        i<22;
        i++
    ) {

        avatar.rotation.y +=
            Math.PI/11;


        await delay(
            20
        );

    }


    createParticles(

        avatar.position
        .clone()
        .add(
            new THREE.Vector3(
                0,
                1.5,
                .1
            )
        ),

        "#ffe07a",

        35

    );


    avatar.position.y =
        baseY;


    avatar.rotation.y =
        baseRotation;


    avatar.userData.state =
        "idle";


    resetAvatarPose(
        avatar
    );

}



/* =========================================================
   SPECIAL MOVE
========================================================= */

async function avatarSpecial(
    attacker,
    defender,
    special,
    side
) {

    if (
        !attacker ||
        !defender
    ) return;


    resetAvatarPose(
        attacker
    );


    attacker.userData.state =
        "perform";


    const originalCamera =
        battleCamera.position.clone();


    const originalLook = {
        x:0,
        y:1.2,
        z:0
    };


    const targetX =
        side === "player"
        ? -1.6
        : 1.6;


    /* CAMERA SNAP ZOOM */

    for (
        let i=0;
        i<10;
        i++
    ) {

        battleCamera.position.x +=

            (
                targetX -
                battleCamera.position.x
            )*.18;


        battleCamera.position.z -=
            .1;


        battleCamera.lookAt(
            attacker.position.x,
            1.4,
            0
        );


        await delay(
            16
        );

    }


    showSpecialBanner(
        side,
        special
    );


    /* CHARGE */

    const startY =
        attacker.userData.baseY;


    for (
        let i=0;
        i<6;
        i++
    ) {

        attacker.position.y +=
            .07;


        attacker.rotation.y +=

            side === "player"
            ? .12
            : -.12;


        await delay(
            22
        );

    }


    const colour =

        special.stat === "POWER"
        ? "#ff9c4c"

        : special.stat === "MELODY"
        ? "#a987ff"

        : special.stat === "RHYTHM"
        ? "#4fe4d4"

        : "#69a8ff";


    createParticles(

        attacker.position
        .clone()
        .add(
            new THREE.Vector3(
                0,
                1.4,
                .3
            )
        ),

        colour,

        55

    );


    /* FAST SPIN */

    for (
        let i=0;
        i<16;
        i++
    ) {

        attacker.rotation.y +=

            side === "player"
            ? .35
            : -.35;


        await delay(
            18
        );

    }


    /* DASH */

    const direction =
        attacker.position.x < 0
        ? 1
        : -1;


    const startX =
        attacker.position.x;


    for (
        let i=0;
        i<8;
        i++
    ) {

        attacker.position.x +=
            direction*.13;


        await delay(
            16
        );

    }


    createParticles(

        defender.position
        .clone()
        .add(
            new THREE.Vector3(
                0,
                1.3,
                .2
            )
        ),

        colour,

        55

    );


    triggerCameraShake(
        .25
    );


    await avatarHit(
        defender
    );


    /* RETURN */

    for (
        let i=0;
        i<8;
        i++
    ) {

        attacker.position.x -=
            direction*.13;


        await delay(
            16
        );

    }


    attacker.position.x =
        startX;


    attacker.position.y =
        startY;


    attacker.rotation.y =
        attacker.userData.baseRotationY;


    attacker.userData.state =
        "idle";


    resetAvatarPose(
        attacker
    );


    battleCamera.position.copy(
        originalCamera
    );


    battleCamera.lookAt(
        originalLook.x,
        originalLook.y,
        originalLook.z
    );

}



/* =========================================================
   SPECIAL BANNER
========================================================= */

function showSpecialBanner(
    side,
    special
) {

    const banner =
        $("#specialMoveBanner");


    $("#specialMoveIcon")
        .textContent =
        special.icon;


    $("#specialMoveOwner")
        .textContent =
        side === "player"
        ? "PLAYER SPECIAL"
        : "CPU SPECIAL";


    $("#specialMoveTitle")
        .textContent =
        special.name.toUpperCase();


    $("#specialMoveBonus")
        .textContent =
        `+${special.bonus} ${special.stat}`;


    banner.classList.remove(
        "show"
    );


    void banner.offsetWidth;


    banner.classList.add(
        "show"
    );


    setTimeout(
        () =>
            banner.classList.remove(
                "show"
            ),
        1500
    );

}



/* =========================================================
   SETUP PREVIEW
========================================================= */

let setupScene;

let setupRenderer;

let setupCamera;

let setupAvatar;


let selectedPreset =
    profile.avatar.preset ||
    "hero";


function currentSetupAvatar() {

    return {

        preset:
            selectedPreset,

        skin:
            $("#skinSelect").value,

        hair:
            $("#hairSelect").value,

        outfit:
            $("#outfitSelect").value

    };

}



function createSetupPreview() {

    const container =
        $("#setupAvatarPreview");


    setupScene =
        new THREE.Scene();


    setupCamera =
        new THREE.PerspectiveCamera(
            42,
            container.clientWidth /
            container.clientHeight,
            .1,
            100
        );


    setupCamera.position.set(
        0,
        1.7,
        5
    );


    setupCamera.lookAt(
        0,
        1.2,
        0
    );


    setupRenderer =
        new THREE.WebGLRenderer({

            antialias:true,

            alpha:true

        });


    setupRenderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    setupRenderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    container.appendChild(
        setupRenderer.domElement
    );


    setupScene.add(
        new THREE.HemisphereLight(
            "#ffffff",
            "#35431f",
            2.4
        )
    );


    const light =
        new THREE.DirectionalLight(
            "#fff0c5",
            3
        );


    light.position.set(
        3,
        5,
        5
    );


    setupScene.add(
        light
    );


    const floor =
        mesh(
            new THREE.BoxGeometry(
                6,
                .2,
                4
            ),
            "#5e8849"
        );


    floor.position.y =
        -.72;


    setupScene.add(
        floor
    );


    updateSetupPreview();


    function animate(time) {

        requestAnimationFrame(
            animate
        );


        if (
            setupAvatar
        ) {

            setupAvatar.rotation.y =
                Math.sin(
                    time*.0006
                )*.28;


            animateAvatar(
                setupAvatar,
                time
            );

        }


        setupRenderer.render(
            setupScene,
            setupCamera
        );

    }


    animate();

}



function updateSetupPreview() {

    if (!setupScene) return;


    if (
        setupAvatar
    ) {

        setupScene.remove(
            setupAvatar
        );

    }


    setupAvatar =
        createAvatar3D(

            currentSetupAvatar(),

            "Guitar"

        );


    setupAvatar.position.y =
        -.42;


    setupAvatar.userData.baseY =
        -.42;


    setupScene.add(
        setupAvatar
    );

}



/* =========================================================
   SETUP UI
========================================================= */

function renderPresetButtons() {

    const grid =
        $("#avatarPresetGrid");


    grid.innerHTML =
        "";


    avatarPresets.forEach(
        preset => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =

                `avatar-preset ${
                    preset.id ===
                    selectedPreset
                    ? "selected"
                    : ""
                }`;


            button.innerHTML = `

                <span>
                    ${preset.badge}
                </span>

                ${preset.name}

            `;


            button.onclick =
                () => {

                    selectedPreset =
                        preset.id;


                    renderPresetButtons();

                    updateSetupPreview();

                };


            grid.appendChild(
                button
            );

        }
    );

}



function initialiseSetup() {

    $("#skinSelect").value =
        profile.avatar.skin;


    $("#hairSelect").value =
        profile.avatar.hair;


    $("#outfitSelect").value =
        profile.avatar.outfit;


    renderPresetButtons();


    [
        "#skinSelect",
        "#hairSelect",
        "#outfitSelect"
    ].forEach(
        selector => {

            $(selector)
            .addEventListener(
                "change",
                updateSetupPreview
            );

        }
    );


    createSetupPreview();


    if (
        !profile.playerName
    ) {

        $("#playerSetup")
        .classList.add(
            "show"
        );

    }

}



$("#startMusicVerse").onclick =
    () => {

        const name =
            $("#playerNameInput")
            .value
            .trim();


        if (
            name.length < 2
        ) {

            $("#playerNameError")
            .textContent =
                "Please enter at least 2 characters.";


            return;

        }


        profile.playerName =
            name;


        profile.avatar =
            currentSetupAvatar();


        saveProfile();


        $("#playerSetup")
        .classList.remove(
            "show"
        );


        rebuildPlayerAvatar();

        updateDisplays();

        renderLeaderboard();

    };



/* =========================================================
   EXP
========================================================= */

function addXP(amount) {

    if (
        amount > 0
    ) {

        profile.totalXpEarned +=
            amount;


        profile.spendableXp +=
            amount;

    }


    profile.xp +=
        amount;


    while (
        profile.xp >= 100
    ) {

        profile.xp -=
            100;


        profile.level++;


        profile.highestLevel =
            Math.max(

                profile.highestLevel,

                profile.level

            );


        tone(
            523.25,
            .2
        );


        setTimeout(
            () =>
                tone(
                    659.25,
                    .2
                ),
            100
        );

    }


    while (
        profile.xp < 0 &&
        profile.level > 1
    ) {

        profile.level--;


        profile.xp +=
            100;

    }


    if (
        profile.level === 1 &&
        profile.xp < 0
    ) {

        profile.xp =
            0;

    }


    saveProfile();

    updateDisplays();

    renderLeaderboard();

}



/* =========================================================
   OWNERSHIP
========================================================= */

function ownsInstrument(name) {

    return battleData.ownedInstruments.includes(
        name
    );

}



function showCannotBuy(
    instrument,
    price
) {

    const missing =
        Math.max(
            0,
            price-profile.spendableXp
        );


    $("#purchasePopupTitle")
        .textContent =
        `You Cannot Buy ${instrument.name}`;


    $("#purchasePopupInstrument")
        .textContent =
        instrument.icon;


    $("#purchaseCurrentXP")
        .textContent =
        profile.spendableXp
        .toLocaleString();


    $("#purchaseRequiredXP")
        .textContent =
        price.toLocaleString();


    $("#purchaseXPNeeded")
        .textContent =
        `You need ${missing.toLocaleString()} more EXP.`;


    $("#purchasePopup")
        .classList.add(
            "show"
        );

}



function closePurchasePopup() {

    $("#purchasePopup")
        .classList.remove(
            "show"
        );

}


$("#purchasePopupClose").onclick =
    closePurchasePopup;


$("#purchasePopupOkay").onclick =
    closePurchasePopup;



function buyInstrument(name) {

    if (
        ownsInstrument(name)
    ) {

        equipInstrument(name);

        return;

    }


    const instrument =
        getInstrument(name);


    const price =
        instrumentPrices[name];


    if (
        profile.spendableXp <
        price
    ) {

        showCannotBuy(
            instrument,
            price
        );


        return;

    }


    if (
        !confirm(
            `Buy ${name} for ${price.toLocaleString()} EXP?`
        )
    ) {

        return;

    }


    profile.spendableXp -=
        price;


    battleData.ownedInstruments.push(
        name
    );


    battleData.instrument =
        name;


    saveProfile();

    saveBattleData();


    playInstrumentSound(
        instrument
    );


    clearCPU();

    refreshBattle();

}



function equipInstrument(name) {

    battleData.instrument =
        name;


    saveBattleData();


    playInstrumentSound(
        getInstrument(name)
    );


    clearCPU();

    refreshBattle();

}



/* =========================================================
   BATTLE SHOP
========================================================= */

function renderBattleShop() {

    const grid =
        $("#battleInstrumentGrid");


    grid.innerHTML =
        "";


    [...instruments]

    .sort(
        (a,b) =>
            instrumentPrices[a.name] -
            instrumentPrices[b.name]
    )

    .forEach(
        instrument => {

            const owned =
                ownsInstrument(
                    instrument.name
                );


            const active =
                instrument.name ===
                battleData.instrument;


            const button =
                document.createElement(
                    "button"
                );


            button.className =

                `battle-instrument ${
                    active
                    ? "active"
                    : ""
                }`;


            button.innerHTML = `

                <span class="instrument-big">

                    ${instrument.icon}

                </span>

                <strong>
                    ${instrument.name}
                </strong>

                ${
                    owned

                    ? `

                        <span class="owned-tag">

                            ${
                                active
                                ? "EQUIPPED ✓"
                                : "OWNED ✓"
                            }

                        </span>

                    `

                    : `

                        <span class="price-tag">

                            ${instrumentPrices[
                                instrument.name
                            ].toLocaleString()}

                            EXP

                        </span>

                    `
                }

            `;


            button.onclick =
                () => {

                    if (
                        owned
                    ) {

                        equipInstrument(
                            instrument.name
                        );

                    }
                    else {

                        buyInstrument(
                            instrument.name
                        );

                    }

                };


            grid.appendChild(
                button
            );

        }
    );


    $("#ownedInstrumentCount")
        .textContent =
        battleData.ownedInstruments.length;

}



/* =========================================================
   UPGRADES
========================================================= */

function currentUpgrades() {

    return battleData.instrumentUpgrades[
        battleData.instrument
    ];

}



function upgradeCost(stat) {

    return 100 +
        currentUpgrades()[stat]*75;

}



function buyUpgrade(stat) {

    const cost =
        upgradeCost(stat);


    if (
        profile.spendableXp <
        cost
    ) {

        setBattleStatus(

            `🔒 You need ${(cost-profile.spendableXp).toLocaleString()} more EXP.`

        );


        return;

    }


    if (
        !confirm(
            `Spend ${cost.toLocaleString()} EXP to upgrade ${stat}?`
        )
    ) {

        return;

    }


    profile.spendableXp -=
        cost;


    currentUpgrades()[stat]++;


    saveProfile();

    saveBattleData();

    renderPlayerStats();

    renderUpgrades();

    updateDisplays();

}



$$(".upgrade-button")
.forEach(
    button => {

        button.onclick =
            () =>
                buyUpgrade(
                    button.dataset.upgrade
                );

    }
);



function renderUpgrades() {

    const labels = {

        power:["⚡","Power"],
        melody:["🎵","Melody"],
        rhythm:["🥁","Rhythm"],
        defense:["🛡","Defense"]

    };


    $$(".upgrade-button")
    .forEach(
        button => {

            const stat =
                button.dataset.upgrade;


            const level =
                currentUpgrades()[stat];


            const cost =
                upgradeCost(stat);


            button.innerHTML = `

                <span>

                    ${labels[stat][0]}
                    ${labels[stat][1]}

                </span>

                <strong>
                    +3
                </strong>

                <small>
                    Upgrade Lv ${level}
                </small>

                <small>
                    ${cost.toLocaleString()} EXP
                </small>

            `;

        }
    );

}



/* =========================================================
   PLAYER STATS
========================================================= */

function playerStats() {

    const base =
        baseStats[
            battleData.instrument
        ];


    const levelBonus =
        (
            profile.level-1
        )*2;


    const upgrades =
        currentUpgrades();


    return {

        power:
            base[0] +
            levelBonus +
            upgrades.power*3,

        melody:
            base[1] +
            levelBonus +
            upgrades.melody*3,

        rhythm:
            base[2] +
            levelBonus +
            upgrades.rhythm*3,

        defense:
            base[3] +
            levelBonus +
            upgrades.defense*3

    };

}



function renderPlayerStats() {

    const instrument =
        getInstrument(
            battleData.instrument
        );


    const stats =
        playerStats();


    const special =
        specialMoves[
            instrument.name
        ];


    $("#playerBattleName")
        .textContent =
        instrument.name;


    $("#playerBattleLevel")
        .textContent =
        `LV ${profile.level}`;


    $("#playerPower")
        .textContent =
        stats.power;


    $("#playerMelody")
        .textContent =
        stats.melody;


    $("#playerRhythm")
        .textContent =
        stats.rhythm;


    $("#playerDefense")
        .textContent =
        stats.defense;


    $("#playerSpecialMove")
        .textContent =
        `${special.icon} ${special.name}`;


    $("#playerSpecialDescription")
        .textContent =

        `${special.description} • ${Math.round(special.chance*100)}% activation chance`;


    $("#upgradeInstrumentName")
        .textContent =
        instrument.name;

}



/* =========================================================
   DIFFICULTY
========================================================= */

function difficulty() {

    const owned =
        battleData.ownedInstruments.length;


    if (
        owned <= 5
    ) {

        return {

            name:"Beginner",
            icon:"🟢",
            cpu:.84,
            min:-2,
            max:0,
            player:1.12

        };

    }


    if (
        owned <= 10
    ) {

        return {

            name:"Intermediate",
            icon:"🟡",
            cpu:.94,
            min:-1,
            max:1,
            player:1.06

        };

    }


    if (
        owned <= 14
    ) {

        return {

            name:"Advanced",
            icon:"🟠",
            cpu:1.03,
            min:0,
            max:2,
            player:1.02

        };

    }


    return {

        name:"Master",
        icon:"🔴",
        cpu:1.10,
        min:1,
        max:3,
        player:1

    };

}



/* =========================================================
   CPU
========================================================= */

let currentCPU =
    null;


function findOpponent() {

    const config =
        difficulty();


    const instrument =
        randomItem(

            instruments.filter(
                item =>
                    item.name !==
                    battleData.instrument
            )

        );


    const level =
        Math.max(

            1,

            profile.level +

            randomNumber(
                config.min,
                config.max
            )

        );


    const base =
        baseStats[
            instrument.name
        ];


    const levelBonus =
        (
            level-1
        )*2;


    currentCPU = {

        instrument,

        level,

        avatar:
            randomCPUAvatarConfig(),

        stats:{

            power:
                Math.round(
                    (
                        base[0]+
                        levelBonus
                    )*
                    config.cpu
                ),

            melody:
                Math.round(
                    (
                        base[1]+
                        levelBonus
                    )*
                    config.cpu
                ),

            rhythm:
                Math.round(
                    (
                        base[2]+
                        levelBonus
                    )*
                    config.cpu
                ),

            defense:
                Math.round(
                    (
                        base[3]+
                        levelBonus
                    )*
                    config.cpu
                )

        }

    };


    rebuildCPUAvatar(
        currentCPU
    );


    renderCPU();


    $("#battleButton")
        .disabled =
        false;


    setBattleStatus(

        `${instrument.icon} ${instrument.name} challenges you!`

    );

}



function renderCPU() {

    if (
        !currentCPU
    ) {

        $("#cpuBattleName")
            .textContent =
            "Waiting...";


        $("#cpuBattleLevel")
            .textContent =
            "LV ?";


        [
            "#cpuPower",
            "#cpuMelody",
            "#cpuRhythm",
            "#cpuDefense"
        ].forEach(
            selector =>
                $(selector)
                .textContent =
                "?"
        );


        return;

    }


    $("#cpuBattleName")
        .textContent =
        currentCPU.instrument.name;


    $("#cpuBattleLevel")
        .textContent =
        `LV ${currentCPU.level}`;


    $("#cpuPower")
        .textContent =
        currentCPU.stats.power;


    $("#cpuMelody")
        .textContent =
        currentCPU.stats.melody;


    $("#cpuRhythm")
        .textContent =
        currentCPU.stats.rhythm;


    $("#cpuDefense")
        .textContent =
        currentCPU.stats.defense;

}



function clearCPU() {

    currentCPU =
        null;


    renderCPU();


    if (
        cpuAvatar3D
    ) {

        cpuAvatar3D.visible =
            false;

    }


    $("#battleButton")
        .disabled =
        true;

}


$("#findOpponentButton").onclick =
    findOpponent;



/* =========================================================
   BATTLE CALCULATION
========================================================= */

function score(
    stats,
    player=false
) {

    const config =
        difficulty();


    const base =

        stats.power*1.05 +

        stats.melody*.9 +

        stats.rhythm*.95 +

        stats.defense*.75;


    return (

        base *

        (
            .88 +
            Math.random()*.24
        ) *

        (
            player
            ? config.player
            : 1
        )

    );

}



function trySpecial(
    instrumentName,
    stats,
    enemyStats
) {

    const move =
        specialMoves[
            instrumentName
        ];


    if (
        Math.random() >=
        move.chance
    ) {

        return {

            activated:false

        };

    }


    return {

        activated:true,

        name:
            move.name,

        icon:
            move.icon,

        stat:
            move.stat,

        bonus:
            Math.round(
                move.effect(
                    stats,
                    enemyStats
                )
            )

    };

}



function setBattleStatus(html) {

    $("#battleStatus")
        .innerHTML =
        html;

}



function addBattleLog(text) {

    const row =
        document.createElement(
            "div"
        );


    row.textContent =
        text;


    $("#battleLog")
        .appendChild(
            row
        );


    $("#battleLog")
        .scrollTop =
        $("#battleLog")
        .scrollHeight;

}



/* =========================================================
   BATTLE
========================================================= */

$("#battleButton").onclick =
    async () => {

        if (
            !currentCPU
        ) return;


        $("#battleButton")
            .disabled =
            true;


        $("#battleLog")
            .innerHTML =
            "";


        const playerInstrument =
            getInstrument(
                battleData.instrument
            );


        const pStats =
            playerStats();


        addBattleLog(

            `${playerInstrument.icon} ${playerInstrument.name} enters the arena!`

        );


        playInstrumentSound(
            playerInstrument
        );


        await delay(
            300
        );


        let playerScore =
            score(
                pStats,
                true
            );


        let cpuScore =
            score(
                currentCPU.stats
            );


        const category =
            randomItem([
                "power",
                "melody",
                "rhythm",
                "defense"
            ]);


        playerScore +=
            pStats[category]*.72;


        cpuScore +=
            currentCPU.stats[category]*.65;


        addBattleLog(

            `🎯 ${category.toUpperCase()} challenge!`

        );


        await delay(
            300
        );


        await avatarAttack(

            playerAvatar3D,

            cpuAvatar3D

        );


        await delay(
            200
        );


        await avatarAttack(

            cpuAvatar3D,

            playerAvatar3D

        );


        /* PLAYER SPECIAL */

        const playerSpecial =
            trySpecial(

                battleData.instrument,

                pStats,

                currentCPU.stats

            );


        if (
            playerSpecial.activated
        ) {

            playerScore +=
                playerSpecial.bonus;


            addBattleLog(

                `${playerSpecial.icon} ${playerSpecial.name}! +${playerSpecial.bonus}`

            );


            playInstrumentSound(
                playerInstrument
            );


            await avatarSpecial(

                playerAvatar3D,

                cpuAvatar3D,

                playerSpecial,

                "player"

            );

        }


        /* CPU SPECIAL */

        const cpuSpecial =
            trySpecial(

                currentCPU.instrument.name,

                currentCPU.stats,

                pStats

            );


        if (
            cpuSpecial.activated
        ) {

            cpuScore +=
                cpuSpecial.bonus;


            addBattleLog(

                `CPU ${cpuSpecial.icon} ${cpuSpecial.name}! +${cpuSpecial.bonus}`

            );


            playInstrumentSound(
                currentCPU.instrument
            );


            await avatarSpecial(

                cpuAvatar3D,

                playerAvatar3D,

                cpuSpecial,

                "cpu"

            );

        }


        addBattleLog(

            `YOU ${Math.round(playerScore)} ⚔️ ${Math.round(cpuScore)} CPU`

        );


        if (
            playerScore >=
            cpuScore
        ) {

            const reward =
                randomNumber(
                    20,
                    35
                );


            battleData.wins++;


            setBattleStatus(

                `🏆 <strong>YOU WIN!</strong><br>+${reward} EXP`

            );


            addXP(
                reward
            );


            addMasteryXP(
                reward
            );


            await avatarVictory(
                playerAvatar3D
            );

        }
        else {

            const loss =
                randomNumber(
                    12,
                    25
                );


            battleData.losses++;


            setBattleStatus(

                `💀 <strong>YOU LOST!</strong><br>-${loss} Level EXP`

            );


            addXP(
                -loss
            );


            await avatarVictory(
                cpuAvatar3D
            );

        }


        saveBattleData();

        renderRecord();


        setTimeout(
            clearCPU,
            900
        );

    };



/* =========================================================
   RECORD
========================================================= */

function renderRecord() {

    const total =
        battleData.wins +
        battleData.losses;


    const rate =
        total
        ? Math.round(
            battleData.wins /
            total *
            100
        )
        : 0;


    $("#battleWins")
        .textContent =
        battleData.wins;


    $("#battleLosses")
        .textContent =
        battleData.losses;


    $("#battleWinRate")
        .textContent =
        `${rate}%`;


    $("#battleHighestLevel")
        .textContent =
        profile.highestLevel;

}



/* =========================================================
   MASTERY
========================================================= */

function trophyTier(name) {

    const xp =
        battleData.instrumentXP[
            name
        ] || 0;


    let result =
        null;


    TROPHY_TIERS.forEach(
        tier => {

            if (
                xp >= tier.xp
            ) {

                result =
                    tier;

            }

        }
    );


    return result;

}



function nextTrophy(name) {

    const xp =
        battleData.instrumentXP[
            name
        ] || 0;


    return (

        TROPHY_TIERS.find(
            tier =>
                xp < tier.xp
        ) ||

        null

    );

}



function addMasteryXP(amount) {

    if (
        amount <= 0
    ) return;


    const name =
        battleData.instrument;


    battleData.instrumentXP[
        name
    ] +=
        amount;


    saveBattleData();

    renderMastery();

    renderTrophyCabinet();

}



function renderMastery() {

    const name =
        battleData.instrument;


    const instrument =
        getInstrument(
            name
        );


    const xp =
        battleData.instrumentXP[
            name
        ] || 0;


    const current =
        trophyTier(
            name
        );


    const next =
        nextTrophy(
            name
        );


    if (!next) {

        $("#instrumentMastery")
            .innerHTML = `

                <div class="mastery-header">

                    <div>

                        <small>
                            INSTRUMENT MASTERY
                        </small>

                        <strong>
                            ${instrument.icon}
                            ${instrument.name}
                        </strong>

                    </div>

                    <div class="mastery-rank">
                        👑🏆 GRAND MASTER
                    </div>

                </div>


                <div class="mastery-info">

                    <span>

                        ${xp.toLocaleString()}
                        Mastery EXP

                    </span>

                    <span>
                        MAX
                    </span>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:100%"
                    ></div>

                </div>

            `;


        return;

    }


    const previous =
        current
        ? current.xp
        : 0;


    const percentage =
        Math.min(

            100,

            (
                xp-previous
            ) /

            (
                next.xp-previous
            ) *

            100

        );


    $("#instrumentMastery")
        .innerHTML = `

            <div class="mastery-header">

                <div>

                    <small>
                        INSTRUMENT MASTERY
                    </small>

                    <strong>

                        ${instrument.icon}
                        ${instrument.name}

                    </strong>

                </div>

                <div class="mastery-rank">

                    ${
                        current

                        ? `${current.icon} ${current.title}`

                        : "Unranked"
                    }

                </div>

            </div>


            <div class="mastery-info">

                <span>

                    ${xp.toLocaleString()}
                    Mastery EXP

                </span>

                <span>

                    ${next.icon}

                    ${(
                        next.xp-xp
                    ).toLocaleString()}

                    to ${next.name}

                </span>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${percentage}%"
                ></div>

            </div>

        `;

}



/* =========================================================
   TROPHY CABINET
========================================================= */

function renderTrophyCabinet() {

    const total =
        instruments.reduce(
            (sum,instrument) => {

                const xp =
                    battleData.instrumentXP[
                        instrument.name
                    ] || 0;


                return sum +

                    TROPHY_TIERS.filter(
                        tier =>
                            xp >= tier.xp
                    ).length;

            },
            0
        );


    const grandMasters =
        instruments.filter(
            instrument =>
                (
                    battleData.instrumentXP[
                        instrument.name
                    ] || 0
                ) >= 50000
        ).length;


    $("#trophyCabinet")
        .innerHTML = `

            <div class="trophy-summary">

                <p class="eyebrow">
                    MASTERY COLLECTION
                </p>

                <h3>
                    🏆 Trophy Cabinet
                </h3>

                <p class="muted">

                    ${total}/90 trophies

                    • ${grandMasters}/18 Grand Masters

                </p>

            </div>


            <div class="trophy-grid">

                ${
                    instruments.map(
                        instrument => {

                            const xp =
                                battleData.instrumentXP[
                                    instrument.name
                                ] || 0;


                            return `

                                <article
                                    class="
                                        trophy-card

                                        ${
                                            xp >= 50000
                                            ? "grand"
                                            : ""
                                        }
                                    "
                                >

                                    <div class="instrument-symbol">
                                        ${instrument.icon}
                                    </div>

                                    <strong>
                                        ${instrument.name}
                                    </strong>

                                    <div class="trophy-row">

                                        ${
                                            TROPHY_TIERS.map(
                                                tier => `

                                                    <div
                                                        class="
                                                            trophy-slot

                                                            ${
                                                                xp >= tier.xp
                                                                ? ""
                                                                : "locked"
                                                            }
                                                        "
                                                    >

                                                        ${
                                                            xp >= tier.xp
                                                            ? tier.icon
                                                            : "🔒"
                                                        }

                                                    </div>

                                                `
                                            ).join("")
                                        }

                                    </div>

                                    <small>

                                        ${xp.toLocaleString()}
                                        Mastery EXP

                                    </small>

                                </article>

                            `;

                        }
                    ).join("")
                }

            </div>

        `;

}



/* =========================================================
   LIBRARY
========================================================= */

let selectedCategory =
    "all";


let librarySearch =
    "";


function renderLibrary() {

    const results =
        instruments.filter(
            instrument => {

                const categoryMatch =

                    selectedCategory ===
                    "all" ||

                    instrument.category ===
                    selectedCategory;


                const searchMatch =

                    instrument.name
                    .toLowerCase()
                    .includes(
                        librarySearch
                    );


                return (
                    categoryMatch &&
                    searchMatch
                );

            }
        );


    $("#instrumentGrid")
        .innerHTML =

        results.map(
            instrument => `

                <article class="instrument-card">

                    <div class="instrument-card-icon">

                        ${instrument.icon}

                    </div>

                    <small>

                        ${instrument.family.toUpperCase()}

                    </small>

                    <h3>
                        ${instrument.name}
                    </h3>

                    <p>
                        ${instrument.description}
                    </p>

                    <button
                        data-sound="${instrument.name}"
                    >
                        ▶ Play Sound
                    </button>

                </article>

            `
        ).join("");


    $$("[data-sound]")
    .forEach(
        button => {

            button.onclick =
                () =>
                    playInstrumentSound(
                        getInstrument(
                            button.dataset.sound
                        )
                    );

        }
    );

}



$$(".tab-button")
.forEach(
    button => {

        button.onclick =
            () => {

                selectedCategory =
                    button.dataset.category;


                $$(".tab-button")
                .forEach(
                    tab =>
                        tab.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                renderLibrary();

            };

    }
);


$("#searchInput")
    .oninput =
    event => {

        librarySearch =
            event.target.value
            .trim()
            .toLowerCase();


        renderLibrary();

    };



/* =========================================================
   MUSICCRAFT
========================================================= */

const canvas =
    $("#musiccraftCanvas");


const ctx =
    canvas.getContext(
        "2d"
    );


const TILE =
    40;


const WORLD =
    140;


const blockData = {

air:{
    icon:"",
    color:"#171a1f",
    mineable:false,
    solid:false,
    xp:0
},

grass:{
    icon:"🌱",
    color:"#557d3b",
    mineable:true,
    solid:false,
    xp:1
},

dirt:{
    icon:"🟫",
    color:"#76513a",
    mineable:true,
    solid:true,
    xp:1
},

stone:{
    icon:"🪨",
    color:"#717983",
    mineable:true,
    solid:true,
    xp:2
},

coal:{
    icon:"⬛",
    color:"#30343a",
    mineable:true,
    solid:true,
    xp:4
},

iron:{
    icon:"🔩",
    color:"#918579",
    mineable:true,
    solid:true,
    xp:6
},

gold:{
    icon:"🟨",
    color:"#c8a34c",
    mineable:true,
    solid:true,
    xp:10
},

diamond:{
    icon:"💎",
    color:"#55bfca",
    mineable:true,
    solid:true,
    xp:18
},

music:{
    icon:"🎵",
    color:"#875ca6",
    mineable:true,
    solid:true,
    xp:25
},

water:{
    icon:"💧",
    color:"#28699b",
    mineable:false,
    solid:true,
    xp:0
},

lava:{
    icon:"🌋",
    color:"#b94c2c",
    mineable:false,
    solid:true,
    xp:0
}

};


const blockNames = {

    dirt:"Dirt",
    stone:"Stone",
    coal:"Coal",
    iron:"Iron",
    gold:"Gold",
    diamond:"Diamond",
    music:"Music Crystal"

};


const depths = [

    "🌱 Surface",
    "⛏️ Underground",
    "🪨 Deep Caves",
    "💎 Crystal Depths",
    "🌋 Ancient Depths",
    "🎵 Music Core"

];


const missions = [

{
    dirt:6,
    stone:8
},

{
    stone:12,
    coal:5
},

{
    coal:8,
    iron:5
},

{
    iron:8,
    gold:4,
    diamond:1
},

{
    gold:8,
    diamond:4,
    music:2
},

{
    diamond:10,
    music:8
}

];


let mcDepth =
    0;


let world =
    [];


let selectedBlock =
    "dirt";


const inventory = {

    dirt:0,
    stone:0,
    coal:0,
    iron:0,
    gold:0,
    diamond:0,
    music:0

};


const mcPlayer = {

    x:
        Math.floor(
            WORLD/2
        ),

    y:
        Math.floor(
            WORLD/2
        ),

    health:10

};


let camera = {

    x:0,
    y:0

};



function randomBlock() {

    const r =
        Math.random();


    if (
        mcDepth === 0
    ) {

        if (r<.05) return "water";
        if (r<.30) return "dirt";
        if (r<.48) return "stone";

        return "grass";

    }


    if (
        mcDepth === 1
    ) {

        if (r<.12) return "coal";
        if (r<.55) return "stone";

        return "dirt";

    }


    if (
        mcDepth === 2
    ) {

        if (r<.12) return "coal";
        if (r<.22) return "iron";
        if (r<.25) return "gold";

        return "stone";

    }


    if (
        mcDepth === 3
    ) {

        if (r<.10) return "iron";
        if (r<.18) return "gold";
        if (r<.23) return "diamond";
        if (r<.26) return "music";

        return "stone";

    }


    if (
        mcDepth === 4
    ) {

        if (r<.07) return "lava";
        if (r<.15) return "gold";
        if (r<.22) return "diamond";
        if (r<.28) return "music";

        return "stone";

    }


    if (r<.08) return "lava";
    if (r<.20) return "diamond";
    if (r<.34) return "music";
    if (r<.42) return "gold";

    return "stone";

}



function generateWorld() {

    world =
        Array.from(
            {
                length:WORLD
            },
            () =>
                Array.from(
                    {
                        length:WORLD
                    },
                    randomBlock
                )
        );


    for (
        let y=mcPlayer.y-2;
        y<=mcPlayer.y+2;
        y++
    ) {

        for (
            let x=mcPlayer.x-2;
            x<=mcPlayer.x+2;
            x++
        ) {

            world[y][x] =
                "air";

        }

    }


    drawWorld();

    renderInventory();

    renderMission();

}



function drawWorld() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const cols =
        Math.ceil(
            canvas.width/TILE
        );


    const rows =
        Math.ceil(
            canvas.height/TILE
        );


    camera.x =
        mcPlayer.x -
        Math.floor(
            cols/2
        );


    camera.y =
        mcPlayer.y -
        Math.floor(
            rows/2
        );


    for (
        let sy=0;
        sy<=rows;
        sy++
    ) {

        for (
            let sx=0;
            sx<=cols;
            sx++
        ) {

            const wx =
                camera.x+sx;


            const wy =
                camera.y+sy;


            if (
                wx<0 ||
                wy<0 ||
                wx>=WORLD ||
                wy>=WORLD
            ) continue;


            const name =
                world[wy][wx];


            const block =
                blockData[name];


            ctx.fillStyle =
                block.color;


            ctx.fillRect(
                sx*TILE,
                sy*TILE,
                TILE,
                TILE
            );


            ctx.strokeStyle =
                "rgba(0,0,0,.15)";


            ctx.strokeRect(
                sx*TILE,
                sy*TILE,
                TILE,
                TILE
            );


            if (
                [
                    "gold",
                    "diamond",
                    "music",
                    "water",
                    "lava"
                ].includes(name)
            ) {

                ctx.font =
                    "18px serif";


                ctx.textAlign =
                    "center";


                ctx.fillText(

                    block.icon,

                    sx*TILE+20,

                    sy*TILE+26

                );

            }

        }

    }


    const px =
        (
            mcPlayer.x-camera.x
        )*TILE;


    const py =
        (
            mcPlayer.y-camera.y
        )*TILE;


    /* BLOCKY PLAYER */

    ctx.fillStyle =
        profile.avatar.outfit;


    ctx.fillRect(
        px+10,
        py+13,
        20,
        22
    );


    ctx.fillStyle =
        profile.avatar.skin;


    ctx.fillRect(
        px+12,
        py+4,
        16,
        14
    );


    ctx.fillStyle =
        profile.avatar.hair;


    ctx.fillRect(
        px+12,
        py+3,
        16,
        4
    );


    $("#mcHealth")
        .textContent =
        mcPlayer.health;

}



function moveMC(
    dx,
    dy
) {

    const x =
        mcPlayer.x+dx;


    const y =
        mcPlayer.y+dy;


    if (
        x<0 ||
        y<0 ||
        x>=WORLD ||
        y>=WORLD
    ) return;


    const block =
        world[y][x];


    if (
        blockData[block].solid
    ) {

        if (
            block ===
            "lava"
        ) {

            mcPlayer.health =
                Math.max(
                    1,
                    mcPlayer.health-1
                );

        }


        drawWorld();

        return;

    }


    mcPlayer.x =
        x;


    mcPlayer.y =
        y;


    drawWorld();

}



function canvasTile(event) {

    const rect =
        canvas.getBoundingClientRect();


    const x =

        (
            event.clientX-
            rect.left
        ) *

        (
            canvas.width/
            rect.width
        );


    const y =

        (
            event.clientY-
            rect.top
        ) *

        (
            canvas.height/
            rect.height
        );


    return {

        x:
            Math.floor(
                x/TILE
            ) +
            camera.x,

        y:
            Math.floor(
                y/TILE
            ) +
            camera.y

    };

}



function mineBlock(
    x,
    y
) {

    if (
        !world[y] ||
        !world[y][x]
    ) return;


    if (
        Math.abs(
            x-mcPlayer.x
        ) > 2 ||

        Math.abs(
            y-mcPlayer.y
        ) > 2
    ) return;


    const name =
        world[y][x];


    const data =
        blockData[name];


    if (
        !data.mineable
    ) return;


    const resource =
        name === "grass"
        ? "dirt"
        : name;


    if (
        resource in inventory
    ) {

        inventory[
            resource
        ]++;

    }


    world[y][x] =
        "air";


    addXP(
        data.xp
    );


    addMasteryXP(
        data.xp
    );


    addMCLog(

        `${data.icon} ${blockNames[resource] || resource} +${data.xp} EXP`

    );


    renderInventory();

    renderMission();

    drawWorld();

}



function placeBlock(
    x,
    y
) {

    if (
        !world[y] ||
        world[y][x] !==
        "air"
    ) return;


    if (
        Math.abs(
            x-mcPlayer.x
        ) > 2 ||

        Math.abs(
            y-mcPlayer.y
        ) > 2
    ) return;


    if (
        inventory[
            selectedBlock
        ] <= 0
    ) return;


    world[y][x] =
        selectedBlock;


    inventory[
        selectedBlock
    ]--;


    renderInventory();

    renderMission();

    drawWorld();

}



canvas.onmousedown =
    event => {

        canvas.focus();


        if (
            event.button !== 0
        ) return;


        const tile =
            canvasTile(
                event
            );


        mineBlock(
            tile.x,
            tile.y
        );

    };


canvas.oncontextmenu =
    event => {

        event.preventDefault();


        const tile =
            canvasTile(
                event
            );


        placeBlock(
            tile.x,
            tile.y
        );

    };


canvas.onkeydown =
    event => {

        const key =
            event.key
            .toLowerCase();


        const moves = {

            w:[0,-1],
            arrowup:[0,-1],

            s:[0,1],
            arrowdown:[0,1],

            a:[-1,0],
            arrowleft:[-1,0],

            d:[1,0],
            arrowright:[1,0]

        };


        if (
            moves[key]
        ) {

            event.preventDefault();


            moveMC(
                ...moves[key]
            );

        }


        const selections = {

            1:"dirt",
            2:"stone",
            3:"coal",
            4:"iron",
            5:"gold",
            6:"diamond",
            7:"music"

        };


        if (
            selections[key]
        ) {

            selectedBlock =
                selections[key];


            renderInventory();

        }

    };



function renderInventory() {

    $("#mcInventory")
        .innerHTML =

        Object.entries(
            inventory
        ).map(
            (
                [name,count],
                index
            ) => `

                <button
                    class="
                        inventory-button

                        ${
                            selectedBlock === name
                            ? "selected"
                            : ""
                        }
                    "

                    data-block="${name}"
                >

                    <span>
                        ${blockData[name].icon}
                    </span>

                    <span>

                        ${index+1}.
                        ${blockNames[name]}

                    </span>

                    <span>
                        ×${count}
                    </span>

                </button>

            `
        ).join("");


    $$(".inventory-button")
    .forEach(
        button => {

            button.onclick =
                () => {

                    selectedBlock =
                        button.dataset.block;


                    $("#mcSelectedBlock")
                        .textContent =

                        `${blockData[selectedBlock].icon} ${blockNames[selectedBlock]}`;


                    renderInventory();

                };

        }
    );

}



function renderMission() {

    const mission =
        missions[
            mcDepth
        ];


    $("#mcDepth")
        .textContent =
        depths[
            mcDepth
        ];


    $("#mcDepthDescription")
        .textContent =
        `Depth ${mcDepth+1} of ${depths.length}`;


    $("#mcMissionTitle")
        .textContent =

        mcDepth ===
        depths.length-1

        ? "Music Core Master"

        : `Reach ${depths[mcDepth+1]}`;


    let current =
        0;


    let required =
        0;


    let complete =
        true;


    $("#mcMissionList")
        .innerHTML =

        Object.entries(
            mission
        ).map(
            ([name,amount]) => {

                const have =
                    inventory[name] || 0;


                current +=
                    Math.min(
                        have,
                        amount
                    );


                required +=
                    amount;


                if (
                    have < amount
                ) {

                    complete =
                        false;

                }


                return `

                    <div>

                        <span>

                            ${blockData[name].icon}

                            ${blockNames[name]}

                        </span>

                        <strong>

                            ${Math.min(have,amount)}
                            /
                            ${amount}

                        </strong>

                    </div>

                `;

            }
        ).join("");


    $("#mcMissionProgressBar")
        .style.width =

        `${current/required*100}%`;


    const button =
        $("#mcGoDeeper");


    if (
        mcDepth >=
        depths.length-1
    ) {

        button.disabled =
            true;


        button.textContent =

            complete

            ? "🏆 Music Core Conquered"

            : "Complete Final Mission";

    }
    else {

        button.disabled =
            !complete;


        button.textContent =

            complete

            ? "⛏️ Mine Deeper"

            : "🔒 Complete Mission";

    }

}



$("#mcGoDeeper").onclick =
    () => {

        if (
            mcDepth >=
            depths.length-1
        ) return;


        const mission =
            missions[
                mcDepth
            ];


        const complete =

            Object.entries(
                mission
            ).every(
                ([name,amount]) =>
                    inventory[name] >=
                    amount
            );


        if (!complete) return;


        Object.entries(
            mission
        ).forEach(
            ([name,amount]) => {

                inventory[name] -=
                    amount;

            }
        );


        mcDepth++;


        mcPlayer.x =
            Math.floor(
                WORLD/2
            );


        mcPlayer.y =
            Math.floor(
                WORLD/2
            );


        generateWorld();

    };



function addMCLog(text) {

    const item =
        document.createElement(
            "div"
        );


    item.textContent =
        text;


    $("#mcLog")
        .prepend(
            item
        );


    while (
        $("#mcLog")
        .children.length > 12
    ) {

        $("#mcLog")
        .lastChild.remove();

    }

}



/* =========================================================
   LEADERBOARD
========================================================= */

const leaderboardNames = [

    "BeatLegend",
    "PianoKing",
    "MelodyMaster",
    "RhythmAce",
    "MusicHero",
    "GuitarPro",
    "ViolinStar",
    "DrumChampion",
    "SoundWizard",
    "HarmonyKid",
    "TempoTitan",
    "GoldenNote",
    "BassBoss",
    "ChordMaster",
    "MusicKnight",
    "SonicStar",
    "NoteNinja",
    "BeatRider",
    "TuneLegend",
    "PianoWizard",
    "DrumHero",
    "JazzKing",
    "MelodyAce",
    "SoundMaster",
    "MusicFox",
    "RhythmKing",
    "ChordHero",
    "NoteMaster",
    "SonicKid",
    "BassLegend"

];


let demoLeaderboard =
    [];


function createDemoLeaderboard() {

    if (
        demoLeaderboard.length
    ) return;


    for (
        let i=0;
        i<120;
        i++
    ) {

        const instrument =
            randomItem(
                instruments
            );


        const avatar =
            randomItem(
                avatarPresets
            );


        const xp =
            Math.max(

                1000,

                90000 -

                i*650 +

                randomNumber(
                    -500,
                    500
                )

            );


        demoLeaderboard.push({

            id:
                `demo-${i}`,

            name:

                `${leaderboardNames[
                    i %
                    leaderboardNames.length
                ]}${i+1}`,

            avatar:
                avatar.badge,

            xp,

            level:
                Math.floor(
                    xp/100
                )+1,

            instrument:
                instrument.name,

            icon:
                instrument.icon

        });

    }

}



function leaderboardData() {

    createDemoLeaderboard();


    const preset =
        avatarPresets.find(
            item =>
                item.id ===
                profile.avatar.preset
        ) ||
        avatarPresets[0];


    const instrument =
        getInstrument(
            battleData.instrument
        );


    return [

        ...demoLeaderboard,

        {

            id:"YOU",

            name:
                profile.playerName ||
                "Player",

            avatar:
                preset.badge,

            xp:
                profile.totalXpEarned,

            level:
                profile.level,

            instrument:
                instrument.name,

            icon:
                instrument.icon,

            you:true

        }

    ].sort(
        (a,b) =>
            b.xp-a.xp
    );

}



function podiumCard(
    player,
    rank
) {

    const medal =

        rank === 1
        ? "🥇"

        : rank === 2
        ? "🥈"

        : "🥉";


    return `

        <div class="podium-medal">
            ${medal}
        </div>

        <div class="podium-avatar">
            ${player.avatar}
        </div>

        <h3>
            ${player.name}
        </h3>

        <small>

            ${player.icon}
            ${player.instrument}

        </small>

        <div class="podium-xp">

            ${player.xp.toLocaleString()}
            EXP

        </div>

        <small>
            Level ${player.level}
        </small>

    `;

}



function renderLeaderboard() {

    const data =
        leaderboardData();


    const top100 =
        data.slice(
            0,
            100
        );


    const rank =
        data.findIndex(
            item =>
                item.you
        ) + 1;


    $("#yourLeaderboardRank")
        .textContent =
        `#${rank}`;


    $("#leaderboardPlayerName")
        .textContent =
        profile.playerName ||
        "Player";


    $("#leaderboardPlayerLevel")
        .textContent =
        profile.level;


    $("#leaderboardPlayerXP")
        .textContent =
        profile.totalXpEarned
        .toLocaleString();


    $("#podiumFirst")
        .innerHTML =
        podiumCard(
            top100[0],
            1
        );


    $("#podiumSecond")
        .innerHTML =
        podiumCard(
            top100[1],
            2
        );


    $("#podiumThird")
        .innerHTML =
        podiumCard(
            top100[2],
            3
        );


    $("#leaderboardBody")
        .innerHTML =

        top100.map(
            (player,index) => `

                <tr
                    class="${
                        player.you
                        ? "you-row"
                        : ""
                    }"
                >

                    <td>

                        ${
                            index === 0
                            ? "🥇"

                            : index === 1
                            ? "🥈"

                            : index === 2
                            ? "🥉"

                            : `#${index+1}`
                        }

                    </td>

                    <td>

                        <div class="leaderboard-player">

                            <div class="table-avatar">

                                ${player.avatar}

                            </div>

                            <strong>

                                ${player.name}

                            </strong>

                        </div>

                    </td>

                    <td>
                        ${player.level}
                    </td>

                    <td>

                        ${player.icon}
                        ${player.instrument}

                    </td>

                    <td>

                        ${player.xp.toLocaleString()}

                    </td>

                </tr>

            `
        ).join("");

}



/* =========================================================
   QUIZ
========================================================= */

const questions = [

{
    q:"Which instrument belongs to the string family?",
    answers:[
        "Trumpet",
        "Guitar",
        "Flute",
        "Drums"
    ],
    correct:1
},

{
    q:"Which instrument commonly uses a slide?",
    answers:[
        "Trombone",
        "Piano",
        "Flute",
        "Violin"
    ],
    correct:0
},

{
    q:"Which instrument uses a double reed?",
    answers:[
        "Oboe",
        "Guitar",
        "Trumpet",
        "Drums"
    ],
    correct:0
},

{
    q:"The saxophone belongs to which family?",
    answers:[
        "Woodwind",
        "String",
        "Percussion",
        "Keyboard"
    ],
    correct:0
},

{
    q:"What does BPM measure?",
    answers:[
        "Tempo",
        "Volume",
        "Pitch",
        "Instrument size"
    ],
    correct:0
},

{
    q:"Which commonly has four strings?",
    answers:[
        "Ukulele",
        "Trumpet",
        "Flute",
        "Oboe"
    ],
    correct:0
},

{
    q:"Which is a brass instrument?",
    answers:[
        "Trumpet",
        "Clarinet",
        "Violin",
        "Piano"
    ],
    correct:0
},

{
    q:"Which is percussion?",
    answers:[
        "Drums",
        "Cello",
        "Flute",
        "Organ"
    ],
    correct:0
},

{
    q:"Which is a keyboard instrument?",
    answers:[
        "Piano",
        "Trumpet",
        "Violin",
        "Flute"
    ],
    correct:0
},

{
    q:"A chord contains...",
    answers:[
        "Several notes together",
        "Only one beat",
        "Only percussion",
        "No pitch"
    ],
    correct:0
}

];


let questionIndex =
    0;


let quizScore =
    0;


let quizAnswered =
    false;



function loadQuestion() {

    quizAnswered =
        false;


    const question =
        questions[
            questionIndex
        ];


    $("#questionNumber")
        .textContent =
        questionIndex+1;


    $("#totalQuestions")
        .textContent =
        questions.length;


    $("#questionText")
        .textContent =
        question.q;


    $("#quizResult")
        .textContent =
        "";


    $("#answerButtons")
        .innerHTML =

        question.answers.map(
            (
                answer,
                index
            ) => `

                <button
                    class="quiz-answer"
                    data-answer="${index}"
                >
                    ${answer}
                </button>

            `
        ).join("");


    $$(".quiz-answer")
    .forEach(
        button => {

            button.onclick =
                () => {

                    if (
                        quizAnswered
                    ) return;


                    quizAnswered =
                        true;


                    const answer =
                        Number(
                            button.dataset.answer
                        );


                    $$(".quiz-answer")
                    .forEach(
                        (
                            option,
                            index
                        ) => {

                            option.disabled =
                                true;


                            if (
                                index ===
                                question.correct
                            ) {

                                option.classList.add(
                                    "correct"
                                );

                            }

                        }
                    );


                    if (
                        answer ===
                        question.correct
                    ) {

                        quizScore++;


                        $("#quizResult")
                            .textContent =
                            "🎉 Correct!";

                    }
                    else {

                        button.classList.add(
                            "wrong"
                        );


                        $("#quizResult")
                            .textContent =
                            "❌ Incorrect.";

                    }


                    $("#score")
                        .textContent =
                        quizScore;

                };

        }
    );

}



$("#nextQuestion").onclick =
    () => {

        if (
            !quizAnswered
        ) return;


        questionIndex++;


        if (
            questionIndex >=
            questions.length
        ) {

            $("#questionText")
                .textContent =
                "🎉 Quiz Complete!";


            $("#answerButtons")
                .innerHTML =
                "";


            $("#quizResult")
                .textContent =

                `Score: ${quizScore}/${questions.length}`;


            questionIndex =
                0;


            quizScore =
                0;


            $("#score")
                .textContent =
                "0";


            return;

        }


        loadQuestion();

    };



/* =========================================================
   SHARED DISPLAY
========================================================= */

function updateDisplays() {

    $("#heroPlayerName")
        .textContent =
        profile.playerName ||
        "Player";


    const preset =
        avatarPresets.find(
            item =>
                item.id ===
                profile.avatar.preset
        ) ||
        avatarPresets[0];


    $("#heroAvatarBadge")
        .textContent =
        preset.badge;


    $("#heroLifetimeXP")
        .textContent =
        profile.totalXpEarned
        .toLocaleString();


    $("#spendableXP")
        .textContent =
        profile.spendableXp
        .toLocaleString();


    $("#battleLifetimeXP")
        .textContent =
        profile.totalXpEarned
        .toLocaleString();


    const battleDifficulty =
        difficulty();


    $("#battleDifficultyName")
        .textContent =

        `${battleDifficulty.icon} ${battleDifficulty.name}`;


    $("#sharedLevelDisplay")
        .textContent =
        `Level ${profile.level}`;


    $("#playerXPText")
        .textContent =
        `${profile.xp} / 100`;


    $("#playerXPBar")
        .style.width =
        `${profile.xp}%`;


    $("#mcExperience")
        .textContent =

        `Lv ${profile.level} • ${profile.xp}/100`;


    $("#mcSpendableXP")
        .textContent =
        profile.spendableXp
        .toLocaleString();


    $("#mcEquippedInstrument")
        .textContent =
        battleData.instrument;

}



function refreshBattle() {

    renderBattleShop();

    renderPlayerStats();

    renderUpgrades();

    renderRecord();

    renderMastery();

    renderTrophyCabinet();

    updateDisplays();

    rebuildPlayerAvatar();

}



/* =========================================================
   NAV
========================================================= */

$("#menuToggle").onclick =
    () =>
        $("#navLinks")
        .classList.toggle(
            "show"
        );


$$("#navLinks a")
.forEach(
    link => {

        link.onclick =
            () =>
                $("#navLinks")
                .classList.remove(
                    "show"
                );

    }
);



/* =========================================================
   THEME
========================================================= */

if (
    localStorage.getItem(
        "musicverseTheme"
    ) === "light"
) {

    document.body.classList.add(
        "light-mode"
    );


    $("#themeToggle")
        .textContent =
        "☀️";

}


$("#themeToggle").onclick =
    () => {

        document.body.classList.toggle(
            "light-mode"
        );


        const light =
            document.body.classList.contains(
                "light-mode"
            );


        $("#themeToggle")
            .textContent =
            light
            ? "☀️"
            : "🌙";


        localStorage.setItem(

            "musicverseTheme",

            light
            ? "light"
            : "dark"

        );

    };



/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closePurchasePopup();

        }

    }
);



/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            battleRenderer
        ) {

            battleCamera.aspect =
                battleContainer.clientWidth /
                battleContainer.clientHeight;


            battleCamera.updateProjectionMatrix();


            battleRenderer.setSize(

                battleContainer.clientWidth,

                battleContainer.clientHeight

            );

        }


        if (
            setupRenderer
        ) {

            const container =
                $("#setupAvatarPreview");


            setupCamera.aspect =
                container.clientWidth /
                container.clientHeight;


            setupCamera.updateProjectionMatrix();


            setupRenderer.setSize(

                container.clientWidth,

                container.clientHeight

            );

        }

    }
);



/* =========================================================
   INITIALISE
========================================================= */

initialiseSetup();

createBattleScene();

renderLibrary();

refreshBattle();

clearCPU();

generateWorld();

renderLeaderboard();

loadQuestion();

updateDisplays();
