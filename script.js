document.addEventListener("DOMContentLoaded", () => {


/* =========================================================
   HELPERS
========================================================= */

function randomItem(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


function randomNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


function delay(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}



/* =========================================================
   INSTRUMENT DATABASE
========================================================= */

const instruments = [

    {
        name: "Guitar",
        icon: "🎸",
        category: "string",
        family: "String",
        origin: "Spain",
        description:
            "A versatile string instrument played by plucking or strumming.",
        sound:
            "Plucked vibrating strings",
        styles:
            "Rock, Pop, Jazz, Blues",
        difficulty:
            "Intermediate",
        frequency:
            220
    },

    {
        name: "Violin",
        icon: "🎻",
        category: "string",
        family: "String",
        origin: "Italy",
        description:
            "A bowed string instrument known for its expressive tone.",
        sound:
            "Bowed strings",
        styles:
            "Classical, Folk, Film",
        difficulty:
            "Advanced",
        frequency:
            659.25
    },

    {
        name: "Cello",
        icon: "🎻",
        category: "string",
        family: "String",
        origin: "Italy",
        description:
            "A large bowed instrument with a deep and warm tone.",
        sound:
            "Bowed strings",
        styles:
            "Classical, Chamber, Film",
        difficulty:
            "Advanced",
        frequency:
            196
    },

    {
        name: "Ukulele",
        icon: "🎸",
        category: "string",
        family: "String",
        origin: "Hawaii",
        description:
            "A small four-string instrument with a cheerful sound.",
        sound:
            "Plucked strings",
        styles:
            "Pop, Folk, Hawaiian",
        difficulty:
            "Beginner",
        frequency:
            392
    },

    {
        name: "Piano",
        icon: "🎹",
        category: "keyboard",
        family: "Keyboard",
        origin: "Italy",
        description:
            "A keyboard instrument where hammers strike strings.",
        sound:
            "Hammered strings",
        styles:
            "Classical, Jazz, Pop",
        difficulty:
            "Intermediate",
        frequency:
            440
    },

    {
        name: "Organ",
        icon: "🎹",
        category: "keyboard",
        family: "Keyboard",
        origin: "Europe",
        description:
            "A keyboard instrument capable of sustained tones.",
        sound:
            "Pipes or oscillators",
        styles:
            "Classical, Church, Rock",
        difficulty:
            "Advanced",
        frequency:
            261.63
    },

    {
        name: "Flute",
        icon: "🪈",
        category: "woodwind",
        family: "Woodwind",
        origin: "Ancient",
        description:
            "A wind instrument that creates sound from moving air.",
        sound:
            "Air vibration",
        styles:
            "Classical, Folk, World",
        difficulty:
            "Intermediate",
        frequency:
            698.46
    },

    {
        name: "Clarinet",
        icon: "🎶",
        category: "woodwind",
        family: "Woodwind",
        origin: "Germany",
        description:
            "A single-reed woodwind with a flexible tone.",
        sound:
            "Single reed",
        styles:
            "Classical, Jazz, Band",
        difficulty:
            "Intermediate",
        frequency:
            293.66
    },

    {
        name: "Oboe",
        icon: "🪈",
        category: "woodwind",
        family: "Woodwind",
        origin: "Europe",
        description:
            "A double-reed instrument with a focused tone.",
        sound:
            "Double reed",
        styles:
            "Classical, Orchestra",
        difficulty:
            "Advanced",
        frequency:
            466.16
    },

    {
        name: "Saxophone",
        icon: "🎷",
        category: "woodwind",
        family: "Woodwind",
        origin: "Belgium",
        description:
            "A reed instrument famous for jazz and popular music.",
        sound:
            "Single reed",
        styles:
            "Jazz, Blues, Pop",
        difficulty:
            "Intermediate",
        frequency:
            369.99
    },

    {
        name: "Trumpet",
        icon: "🎺",
        category: "brass",
        family: "Brass",
        origin: "Ancient",
        description:
            "A bright brass instrument played by buzzing the lips.",
        sound:
            "Lip vibration",
        styles:
            "Jazz, Classical, Band",
        difficulty:
            "Advanced",
        frequency:
            523.25
    },

    {
        name: "Trombone",
        icon: "🎺",
        category: "brass",
        family: "Brass",
        origin: "Europe",
        description:
            "A brass instrument that commonly uses a movable slide.",
        sound:
            "Lip vibration",
        styles:
            "Jazz, Classical",
        difficulty:
            "Intermediate",
        frequency:
            233.08
    },

    {
        name: "French Horn",
        icon: "📯",
        category: "brass",
        family: "Brass",
        origin: "Europe",
        description:
            "A coiled brass instrument with a warm orchestral tone.",
        sound:
            "Lip vibration",
        styles:
            "Classical, Orchestra, Film",
        difficulty:
            "Advanced",
        frequency:
            349.23
    },

    {
        name: "Drums",
        icon: "🥁",
        category: "percussion",
        family: "Percussion",
        origin: "Ancient",
        description:
            "Percussion instruments used to create rhythm.",
        sound:
            "Struck membranes and cymbals",
        styles:
            "Rock, Pop, Jazz, Hip-Hop",
        difficulty:
            "Beginner to Advanced",
        drum:
            true
    },

    {
        name: "Xylophone",
        icon: "🎼",
        category: "percussion",
        family: "Percussion",
        origin: "Ancient",
        description:
            "A tuned percussion instrument made from bars.",
        sound:
            "Struck bars",
        styles:
            "Classical, World",
        difficulty:
            "Beginner",
        frequency:
            783.99
    },

    {
        name: "Synthesizer",
        icon: "🎛️",
        category: "electronic",
        family: "Electronic",
        origin: "20th Century",
        description:
            "An electronic instrument capable of creating many sounds.",
        sound:
            "Electronic synthesis",
        styles:
            "Electronic, Pop, Film",
        difficulty:
            "Intermediate",
        frequency:
            329.63
    },

    {
        name: "Digital Piano",
        icon: "🎹",
        category: "electronic",
        family: "Electronic",
        origin: "20th Century",
        description:
            "A digital keyboard designed to reproduce piano sounds.",
        sound:
            "Digital piano",
        styles:
            "Pop, Classical, Education",
        difficulty:
            "Beginner",
        frequency:
            440
    },

    {
        name: "Drum Machine",
        icon: "🎛️",
        category: "electronic",
        family: "Electronic",
        origin: "20th Century",
        description:
            "An electronic instrument for programmed rhythms.",
        sound:
            "Electronic percussion",
        styles:
            "Hip-Hop, Electronic, Dance",
        difficulty:
            "Beginner",
        drum:
            true
    }

];


function getInstrument(name) {

    return instruments.find(
        instrument =>
            instrument.name === name
    );

}



/* =========================================================
   AUDIO ENGINE
========================================================= */

let audioContext = null;


function getAudioContext() {

    if (!audioContext) {

        const AudioClass =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioClass) {
            return null;
        }


        audioContext =
            new AudioClass();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    return audioContext;

}


function createVoice({

    frequency,
    type = "sine",
    volume = .1,
    attack = .01,
    duration = .7,
    release = .4,
    destination = null

}) {

    const context =
        getAudioContext();


    if (!context) {
        return null;
    }


    const oscillator =
        context.createOscillator();


    const gain =
        context.createGain();


    const now =
        context.currentTime;


    oscillator.type =
        type;


    oscillator.frequency.setValueAtTime(
        frequency,
        now
    );


    gain.gain.setValueAtTime(
        .0001,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        Math.max(
            .0002,
            volume
        ),
        now + attack
    );


    gain.gain.exponentialRampToValueAtTime(
        .0001,
        now + duration + release
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        destination ||
        context.destination
    );


    oscillator.start(
        now
    );


    oscillator.stop(
        now +
        duration +
        release +
        .05
    );


    return oscillator;

}


function createNoiseBuffer(
    seconds = .5
) {

    const context =
        getAudioContext();


    if (!context) {
        return null;
    }


    const buffer =
        context.createBuffer(
            1,
            context.sampleRate * seconds,
            context.sampleRate
        );


    const data =
        buffer.getChannelData(
            0
        );


    for (
        let i = 0;
        i < data.length;
        i++
    ) {

        data[i] =
            Math.random() * 2 - 1;

    }


    return buffer;

}



/* =========================================================
   INSTRUMENT SOUNDS
========================================================= */

function playGuitar(
    frequency
) {

    [
        [1,.16],
        [2,.07],
        [3,.03],
        [4,.014]
    ]
    .forEach(
        ([harmonic,volume]) => {

            createVoice({

                frequency:
                    frequency * harmonic,

                type:
                    "triangle",

                volume,

                attack:
                    .002,

                duration:
                    .32,

                release:
                    .85

            });

        }
    );

}


function playPiano(
    frequency
) {

    [
        [1,.15],
        [2,.06],
        [3,.025],
        [4,.012]
    ]
    .forEach(
        ([harmonic,volume]) => {

            createVoice({

                frequency:
                    frequency * harmonic,

                type:
                    "triangle",

                volume,

                attack:
                    .002,

                duration:
                    .45,

                release:
                    1

            });

        }
    );

}


function playString(
    frequency,
    cello = false
) {

    const context =
        getAudioContext();


    if (!context) return;


    const filter =
        context.createBiquadFilter();


    filter.type =
        "lowpass";


    filter.frequency.value =
        cello
            ? 1900
            : 3400;


    filter.connect(
        context.destination
    );


    const oscillator =
        createVoice({

            frequency,

            type:
                "sawtooth",

            volume:
                .08,

            attack:
                .12,

            duration:
                1.15,

            release:
                .45,

            destination:
                filter

        });


    if (!oscillator) return;


    const vibrato =
        context.createOscillator();


    const amount =
        context.createGain();


    vibrato.frequency.value =
        cello
            ? 4.6
            : 5.3;


    amount.gain.value =
        cello
            ? 3
            : 5;


    vibrato.connect(
        amount
    );


    amount.connect(
        oscillator.frequency
    );


    vibrato.start();


    vibrato.stop(
        context.currentTime +
        1.6
    );

}


function playFlute(
    frequency
) {

    createVoice({

        frequency,

        type:
            "sine",

        volume:
            .12,

        attack:
            .08,

        duration:
            1,

        release:
            .3

    });

}


function playClarinet(
    frequency
) {

    [
        [1,.12],
        [3,.04],
        [5,.015]
    ]
    .forEach(
        ([harmonic,volume]) => {

            createVoice({

                frequency:
                    frequency * harmonic,

                type:
                    "sine",

                volume,

                attack:
                    .06,

                duration:
                    .9,

                release:
                    .3

            });

        }
    );

}


function playOboe(
    frequency
) {

    createVoice({

        frequency,

        type:
            "sawtooth",

        volume:
            .065,

        attack:
            .08,

        duration:
            .9,

        release:
            .3

    });

}


function playSaxophone(
    frequency
) {

    createVoice({

        frequency,

        type:
            "sawtooth",

        volume:
            .065,

        attack:
            .06,

        duration:
            1,

        release:
            .35

    });

}


function playBrass(
    frequency,
    warm = false
) {

    [
        [1,.08],
        [2,.045],
        [3,.025]
    ]
    .forEach(
        ([harmonic,volume]) => {

            createVoice({

                frequency:
                    frequency * harmonic,

                type:
                    "sawtooth",

                volume:
                    warm
                        ? volume * .75
                        : volume,

                attack:
                    warm
                        ? .1
                        : .035,

                duration:
                    1,

                release:
                    .3

            });

        }
    );

}


function playTrombone(
    frequency
) {

    const context =
        getAudioContext();


    if (!context) return;


    const oscillator =
        createVoice({

            frequency,

            type:
                "sawtooth",

            volume:
                .075,

            attack:
                .04,

            duration:
                1,

            release:
                .3

        });


    if (!oscillator) return;


    oscillator.frequency.setValueAtTime(

        frequency * .96,

        context.currentTime

    );


    oscillator.frequency.linearRampToValueAtTime(

        frequency,

        context.currentTime +
        .15

    );

}


function playXylophone(
    frequency
) {

    [
        [1,.16],
        [3,.045],
        [6,.013]
    ]
    .forEach(
        ([harmonic,volume]) => {

            createVoice({

                frequency:
                    frequency * harmonic,

                type:
                    "sine",

                volume,

                attack:
                    .001,

                duration:
                    .1,

                release:
                    .4

            });

        }
    );

}


function playSynth(
    frequency
) {

    createVoice({

        frequency,

        type:
            "sawtooth",

        volume:
            .075,

        attack:
            .03,

        duration:
            1,

        release:
            .5

    });


    createVoice({

        frequency:
            frequency / 2,

        type:
            "square",

        volume:
            .025,

        attack:
            .03,

        duration:
            1,

        release:
            .5

    });

}


function playOrgan(
    frequency
) {

    [
        .5,
        1,
        2,
        3
    ]
    .forEach(
        harmonic => {

            createVoice({

                frequency:
                    frequency * harmonic,

                type:
                    "sine",

                volume:
                    .07 /
                    Math.max(
                        1,
                        harmonic
                    ),

                attack:
                    .03,

                duration:
                    1.3,

                release:
                    .2

            });

        }
    );

}



/* =========================================================
   DRUMS
========================================================= */

function playKick() {

    const context =
        getAudioContext();


    if (!context) return;


    const oscillator =
        context.createOscillator();


    const gain =
        context.createGain();


    oscillator.frequency.setValueAtTime(
        150,
        context.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        45,
        context.currentTime + .28
    );


    gain.gain.setValueAtTime(
        .65,
        context.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        .001,
        context.currentTime + .3
    );


    oscillator.connect(
        gain
    );


    gain.connect(
        context.destination
    );


    oscillator.start();


    oscillator.stop(
        context.currentTime + .31
    );

}


function playNoise(
    cutoff,
    duration,
    volume
) {

    const context =
        getAudioContext();


    if (!context) return;


    const source =
        context.createBufferSource();


    const filter =
        context.createBiquadFilter();


    const gain =
        context.createGain();


    source.buffer =
        createNoiseBuffer(
            duration + .1
        );


    filter.type =
        "highpass";


    filter.frequency.value =
        cutoff;


    gain.gain.setValueAtTime(
        volume,
        context.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        .001,
        context.currentTime + duration
    );


    source.connect(
        filter
    );


    filter.connect(
        gain
    );


    gain.connect(
        context.destination
    );


    source.start();


    source.stop(
        context.currentTime + duration
    );

}


function playSnare() {

    playNoise(
        1200,
        .2,
        .3
    );

}


function playHiHat() {

    playNoise(
        6500,
        .08,
        .2
    );

}


function playCymbal() {

    playNoise(
        4200,
        .8,
        .18
    );

}


function playTom() {

    createVoice({

        frequency:
            130,

        type:
            "sine",

        volume:
            .3,

        attack:
            .001,

        duration:
            .13,

        release:
            .25

    });

}


function playClap() {

    playNoise(
        1000,
        .13,
        .25
    );

}



/* =========================================================
   MASTER INSTRUMENT SOUND
========================================================= */

function playInstrumentSound(
    instrument
) {

    if (!instrument) return;


    switch (
        instrument.name
    ) {

        case "Guitar":

            playGuitar(
                instrument.frequency
            );

            break;


        case "Ukulele":

            playGuitar(
                instrument.frequency
            );

            break;


        case "Violin":

            playString(
                instrument.frequency
            );

            break;


        case "Cello":

            playString(
                instrument.frequency,
                true
            );

            break;


        case "Piano":

        case "Digital Piano":

            playPiano(
                instrument.frequency
            );

            break;


        case "Organ":

            playOrgan(
                instrument.frequency
            );

            break;


        case "Flute":

            playFlute(
                instrument.frequency
            );

            break;


        case "Clarinet":

            playClarinet(
                instrument.frequency
            );

            break;


        case "Oboe":

            playOboe(
                instrument.frequency
            );

            break;


        case "Saxophone":

            playSaxophone(
                instrument.frequency
            );

            break;


        case "Trumpet":

            playBrass(
                instrument.frequency
            );

            break;


        case "French Horn":

            playBrass(
                instrument.frequency,
                true
            );

            break;


        case "Trombone":

            playTrombone(
                instrument.frequency
            );

            break;


        case "Xylophone":

            playXylophone(
                instrument.frequency
            );

            break;


        case "Synthesizer":

            playSynth(
                instrument.frequency
            );

            break;


        case "Drums":

            playKick();

            setTimeout(
                playHiHat,
                160
            );

            setTimeout(
                playSnare,
                320
            );

            break;


        case "Drum Machine":

            playKick();

            setTimeout(
                playHiHat,
                150
            );

            setTimeout(
                playSnare,
                300
            );

            break;

    }

}



/* =========================================================
   INSTRUMENT LIBRARY
========================================================= */

const instrumentGrid =
    document.getElementById(
        "instrumentGrid"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


let currentCategory =
    "all";


let currentSearch =
    "";


function renderInstruments() {

    const results =
        instruments.filter(
            instrument => {

                const categoryMatch =

                    currentCategory ===
                    "all" ||

                    instrument.category ===
                    currentCategory;


                const searchable = [

                    instrument.name,
                    instrument.family,
                    instrument.origin,
                    instrument.description,
                    instrument.sound,
                    instrument.styles,
                    instrument.difficulty

                ]
                .join(" ")
                .toLowerCase();


                return (
                    categoryMatch &&
                    searchable.includes(
                        currentSearch
                    )
                );

            }
        );


    instrumentGrid.innerHTML =
        "";


    results.forEach(
        instrument => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "instrument-card";


            card.innerHTML = `

                <div class="instrument-icon">
                    ${instrument.icon}
                </div>

                <span class="category-label">
                    ${instrument.family.toUpperCase()}
                </span>

                <h3>
                    ${instrument.name}
                </h3>

                <p>
                    ${instrument.description}
                </p>

                <div class="instrument-details">

                    <p>
                        <strong>Origin:</strong>
                        ${instrument.origin}
                    </p>

                    <p>
                        <strong>Styles:</strong>
                        ${instrument.styles}
                    </p>

                    <p>
                        <strong>Difficulty:</strong>
                        ${instrument.difficulty}
                    </p>

                </div>

                <button
                    class="sound-btn"
                    type="button"
                >
                    ▶ Play Sound
                </button>

                <button
                    class="info-btn"
                    type="button"
                >
                    Learn More →
                </button>

            `;


            card
                .querySelector(
                    ".sound-btn"
                )
                .addEventListener(
                    "click",
                    () => {

                        playInstrumentSound(
                            instrument
                        );

                    }
                );


            card
                .querySelector(
                    ".info-btn"
                )
                .addEventListener(
                    "click",
                    () => {

                        openInstrumentModal(
                            instrument
                        );

                    }
                );


            instrumentGrid.appendChild(
                card
            );

        }
    );


    document.getElementById(
        "noInstrumentResults"
    ).hidden =
        results.length > 0;


    document.getElementById(
        "searchStatus"
    ).textContent =

        currentSearch

        ? `${results.length} instrument${
            results.length === 1
                ? ""
                : "s"
          } found`

        : "";

}


document
    .querySelectorAll(
        ".tab-btn"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    currentCategory =
                        button.dataset.category;


                    document
                        .querySelectorAll(
                            ".tab-btn"
                        )
                        .forEach(
                            tab => {

                                tab.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    renderInstruments();

                }
            );

        }
    );


searchInput.addEventListener(
    "input",
    () => {

        currentSearch =
            searchInput.value
                .trim()
                .toLowerCase();


        renderInstruments();

    }
);



/* =========================================================
   MODAL
========================================================= */

const instrumentModal =
    document.getElementById(
        "instrumentModal"
    );


function openInstrumentModal(
    instrument
) {

    document.getElementById(
        "modalIcon"
    ).textContent =
        instrument.icon;


    document.getElementById(
        "modalFamily"
    ).textContent =
        instrument.family;


    document.getElementById(
        "modalTitle"
    ).textContent =
        instrument.name;


    document.getElementById(
        "modalDescription"
    ).textContent =
        instrument.description;


    document.getElementById(
        "modalOrigin"
    ).textContent =
        instrument.origin;


    document.getElementById(
        "modalSound"
    ).textContent =
        instrument.sound;


    document.getElementById(
        "modalStyles"
    ).textContent =
        instrument.styles;


    document.getElementById(
        "modalDifficulty"
    ).textContent =
        instrument.difficulty;


    instrumentModal.classList.add(
        "modal-active"
    );

}


function closeInstrumentModal() {

    instrumentModal.classList.remove(
        "modal-active"
    );

}


document.getElementById(
    "closeModal"
).addEventListener(
    "click",
    closeInstrumentModal
);


instrumentModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            instrumentModal
        ) {

            closeInstrumentModal();

        }

    }
);



/* =========================================================
   FEATURED INSTRUMENT
========================================================= */

function showFeaturedInstrument() {

    const instrument =
        randomItem(
            instruments
        );


    document.getElementById(
        "featuredInstrumentIcon"
    ).textContent =
        instrument.icon;


    document.getElementById(
        "featuredInstrumentFamily"
    ).textContent =
        instrument.family.toUpperCase();


    document.getElementById(
        "featuredInstrumentName"
    ).textContent =
        instrument.name;


    document.getElementById(
        "featuredInstrumentText"
    ).textContent =
        instrument.description;


    document.getElementById(
        "featuredInstrumentOrigin"
    ).textContent =
        instrument.origin;


    document.getElementById(
        "featuredInstrumentSound"
    ).textContent =
        instrument.sound;


    document.getElementById(
        "featuredInstrumentStyles"
    ).textContent =
        instrument.styles;

}


document.getElementById(
    "newFeaturedInstrument"
).addEventListener(
    "click",
    showFeaturedInstrument
);



/* =========================================================
   PIANO
========================================================= */

document
    .querySelectorAll(
        ".piano-key"
    )
    .forEach(
        key => {

            key.addEventListener(
                "click",
                () => {

                    playPiano(
                        Number(
                            key.dataset.note
                        )
                    );

                }
            );

        }
    );



/* =========================================================
   DRUM PAD
========================================================= */

document
    .querySelectorAll(
        ".drum-pad-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const sound =
                        button.dataset.drum;


                    if (sound === "kick") {
                        playKick();
                    }

                    if (sound === "snare") {
                        playSnare();
                    }

                    if (sound === "hihat") {
                        playHiHat();
                    }

                    if (sound === "tom") {
                        playTom();
                    }

                    if (sound === "clap") {
                        playClap();
                    }

                    if (sound === "cymbal") {
                        playCymbal();
                    }

                }
            );

        }
    );



/* =========================================================
   GUESS THE INSTRUMENT
========================================================= */

let currentGuess =
    null;


function createGuessQuestion() {

    currentGuess =
        randomItem(
            instruments
        );


    document.getElementById(
        "instrumentClue"
    ).textContent =

        `I belong to the ${currentGuess.family} family and I am often used in ${currentGuess.styles}.`;


    const wrongAnswers =
        instruments
            .filter(
                instrument =>
                    instrument.name !==
                    currentGuess.name
            )
            .sort(
                () =>
                    Math.random() - .5
            )
            .slice(
                0,
                3
            );


    const answers = [

        currentGuess,

        ...wrongAnswers

    ]
    .sort(
        () =>
            Math.random() - .5
    );


    const container =
        document.getElementById(
            "guessOptions"
        );


    container.innerHTML =
        answers.map(
            instrument => `

                <button
                    data-guess="${instrument.name}"
                    type="button"
                >
                    ${instrument.icon}
                    ${instrument.name}
                </button>

            `
        ).join("");


    let answered =
        false;


    container
        .querySelectorAll(
            "[data-guess]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (answered) return;


                        answered =
                            true;


                        container
                            .querySelectorAll(
                                "button"
                            )
                            .forEach(
                                option => {

                                    option.disabled =
                                        true;

                                }
                            );


                        document.getElementById(
                            "guessResult"
                        ).textContent =

                            button.dataset.guess ===
                            currentGuess.name

                            ? "🎉 Correct!"

                            : `❌ It was ${currentGuess.name}.`;

                    }
                );

            }
        );

}


document.getElementById(
    "newGuessQuestion"
).addEventListener(
    "click",
    createGuessQuestion
);



/* =========================================================
   TRUE / FALSE
========================================================= */

const trueFalseQuestions = [

    [
        "The saxophone is a woodwind instrument.",
        true
    ],

    [
        "The trumpet is a string instrument.",
        false
    ],

    [
        "The trombone commonly uses a slide.",
        true
    ],

    [
        "The oboe uses a double reed.",
        true
    ],

    [
        "Tempo describes how loud music is.",
        false
    ],

    [
        "A ukulele commonly has four strings.",
        true
    ]

];


let currentTrueFalse =
    null;


let trueFalseAnswered =
    false;


function nextTrueFalse() {

    currentTrueFalse =
        randomItem(
            trueFalseQuestions
        );


    trueFalseAnswered =
        false;


    document.getElementById(
        "trueFalseQuestion"
    ).textContent =
        currentTrueFalse[0];


    document.getElementById(
        "trueFalseResult"
    ).textContent =
        "";

}


function answerTrueFalse(
    answer
) {

    if (
        !currentTrueFalse ||
        trueFalseAnswered
    ) {

        return;
    }


    trueFalseAnswered =
        true;


    document.getElementById(
        "trueFalseResult"
    ).textContent =

        answer ===
        currentTrueFalse[1]

        ? "🎉 Correct!"

        : `❌ The answer is ${
            currentTrueFalse[1]
                ? "True"
                : "False"
          }.`;

}


document.getElementById(
    "trueButton"
).addEventListener(
    "click",
    () =>
        answerTrueFalse(
            true
        )
);


document.getElementById(
    "falseButton"
).addEventListener(
    "click",
    () =>
        answerTrueFalse(
            false
        )
);


document.getElementById(
    "nextTrueFalse"
).addEventListener(
    "click",
    nextTrueFalse
);



/* =========================================================
   BATTLE DATA
========================================================= */

const battleBaseStats = {

    Guitar:
        [68,78,72,58],

    Violin:
        [62,92,65,55],

    Cello:
        [76,85,58,72],

    Ukulele:
        [45,72,70,48],

    Piano:
        [74,90,82,72],

    Organ:
        [88,82,58,86],

    Flute:
        [50,88,62,52],

    Clarinet:
        [58,84,68,60],

    Oboe:
        [60,88,58,64],

    Saxophone:
        [74,84,82,62],

    Trumpet:
        [90,76,74,68],

    Trombone:
        [86,72,75,76],

    "French Horn":
        [82,84,62,82],

    Drums:
        [94,38,98,78],

    Xylophone:
        [58,82,86,50],

    Synthesizer:
        [82,86,88,65],

    "Digital Piano":
        [70,86,78,68],

    "Drum Machine":
        [84,46,96,70]

};


const specialAttacks = {

    Guitar:
        ["🔥 Power Riff","power",28],

    Violin:
        ["🎻 Perfect Pitch","melody",32],

    Cello:
        ["🌊 Deep Resonance","defense",30],

    Ukulele:
        ["🌴 Happy Strum","rhythm",26],

    Piano:
        ["🎹 88-Key Combo","melody",30],

    Organ:
        ["⛪ Cathedral Blast","power",31],

    Flute:
        ["💨 Wind Melody","melody",29],

    Clarinet:
        ["🎶 Reed Rush","melody",28],

    Oboe:
        ["🌀 Double Reed Strike","melody",31],

    Saxophone:
        ["🎷 Jazz Solo","rhythm",31],

    Trumpet:
        ["🎺 Brass Blast","power",33],

    Trombone:
        ["💥 Slide Smash","power",31],

    "French Horn":
        ["📯 Royal Call","defense",31],

    Drums:
        ["🥁 Rhythm Rush","rhythm",34],

    Xylophone:
        ["✨ Mallet Storm","rhythm",29],

    Synthesizer:
        ["⚡ Bass Drop","power",32],

    "Digital Piano":
        ["🎹 Digital Cascade","melody",29],

    "Drum Machine":
        ["🤖 Beat Overdrive","rhythm",33]

};


function freshBattleData() {

    return {

        instrument:
            null,

        level:
            1,

        xp:
            0,

        wins:
            0,

        losses:
            0,

        highestLevel:
            1,

        upgradePoints:
            0,

        upgrades: {

            power:
                0,

            melody:
                0,

            rhythm:
                0,

            defense:
                0

        }

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

            upgrades: {

                ...battleData.upgrades,

                ...saved.upgrades

            }

        };

    }

}
catch (error) {}


function saveBattleData() {

    try {

        localStorage.setItem(

            "musicverseBattle",

            JSON.stringify(
                battleData
            )

        );

    }
    catch (error) {}

}



/* =========================================================
   BATTLE STATS
========================================================= */

function getPlayerBattleStats() {

    if (!battleData.instrument) {
        return null;
    }


    const base =
        battleBaseStats[
            battleData.instrument
        ];


    const levelBonus =
        (
            battleData.level - 1
        ) * 2;


    return {

        power:
            base[0] +
            levelBonus +
            battleData.upgrades.power * 3,

        melody:
            base[1] +
            levelBonus +
            battleData.upgrades.melody * 3,

        rhythm:
            base[2] +
            levelBonus +
            battleData.upgrades.rhythm * 3,

        defense:
            base[3] +
            levelBonus +
            battleData.upgrades.defense * 3

    };

}



/* =========================================================
   BATTLE CHOICES
========================================================= */

function renderBattleChoices() {

    const grid =
        document.getElementById(
            "battleInstrumentGrid"
        );


    grid.innerHTML =
        instruments.map(
            instrument => `

                <button
                    class="battle-instrument-option ${
                        battleData.instrument ===
                        instrument.name
                            ? "active"
                            : ""
                    }"
                    data-battle-choice="${instrument.name}"
                    type="button"
                >

                    <span class="battle-option-icon">
                        ${instrument.icon}
                    </span>

                    ${instrument.name}

                </button>

            `
        ).join("");


    grid
        .querySelectorAll(
            "[data-battle-choice]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        chooseBattleInstrument(
                            button.dataset.battleChoice
                        );

                    }
                );

            }
        );

}


function chooseBattleInstrument(
    name
) {

    if (
        battleData.instrument &&
        battleData.instrument !== name
    ) {

        const hasProgress =

            battleData.level > 1 ||
            battleData.xp > 0 ||
            battleData.wins > 0 ||
            battleData.losses > 0 ||
            Object.values(
                battleData.upgrades
            ).some(
                value =>
                    value > 0
            );


        if (hasProgress) {

            const confirmed =
                confirm(

                    "Changing your instrument resets your battle progress. Continue?"

                );


            if (!confirmed) {
                return;
            }

        }

    }


    if (
        battleData.instrument !== name
    ) {

        battleData =
            freshBattleData();


        battleData.instrument =
            name;

    }


    currentCPU =
        null;


    saveBattleData();

    renderBattleChoices();

    renderBattlePlayer();

    clearCPU();


    document.getElementById(
        "battleStatus"
    ).textContent =

        `${name} entered the arena!`;

}



/* =========================================================
   BATTLE PLAYER
========================================================= */

function renderBattlePlayer() {

    if (!battleData.instrument) {
        return;
    }


    const instrument =
        getInstrument(
            battleData.instrument
        );


    const stats =
        getPlayerBattleStats();


    document.getElementById(
        "playerBattleIcon"
    ).textContent =
        instrument.icon;


    document.getElementById(
        "playerBattleName"
    ).textContent =
        instrument.name;


    document.getElementById(
        "playerBattleLevel"
    ).textContent =
        battleData.level;


    document.getElementById(
        "playerPower"
    ).textContent =
        stats.power;


    document.getElementById(
        "playerMelody"
    ).textContent =
        stats.melody;


    document.getElementById(
        "playerRhythm"
    ).textContent =
        stats.rhythm;


    document.getElementById(
        "playerDefense"
    ).textContent =
        stats.defense;


    document.getElementById(
        "playerXPText"
    ).textContent =
        `${battleData.xp} / 100`;


    document.getElementById(
        "playerXPBar"
    ).style.width =
        `${Math.min(
            100,
            Math.max(
                0,
                battleData.xp
            )
        )}%`;


    document.getElementById(
        "upgradePoints"
    ).textContent =
        battleData.upgradePoints;


    renderBattleRecord();

}



/* =========================================================
   CPU
========================================================= */

let currentCPU =
    null;


function createCPU() {

    if (!battleData.instrument) {

        document.getElementById(
            "battleStatus"
        ).textContent =
            "Choose an instrument first.";

        return;

    }


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

            battleData.level +
            randomNumber(
                -1,
                1
            )

        );


    const base =
        battleBaseStats[
            instrument.name
        ];


    const bonus =
        (
            level - 1
        ) * 2;


    currentCPU = {

        instrument,

        level,

        stats: {

            power:
                base[0] + bonus,

            melody:
                base[1] + bonus,

            rhythm:
                base[2] + bonus,

            defense:
                base[3] + bonus

        }

    };


    renderCPU();

}


function renderCPU() {

    if (!currentCPU) return;


    document.getElementById(
        "cpuBattleIcon"
    ).textContent =
        currentCPU.instrument.icon;


    document.getElementById(
        "cpuBattleName"
    ).textContent =
        currentCPU.instrument.name;


    document.getElementById(
        "cpuBattleLevel"
    ).textContent =
        currentCPU.level;


    document.getElementById(
        "cpuPower"
    ).textContent =
        currentCPU.stats.power;


    document.getElementById(
        "cpuMelody"
    ).textContent =
        currentCPU.stats.melody;


    document.getElementById(
        "cpuRhythm"
    ).textContent =
        currentCPU.stats.rhythm;


    document.getElementById(
        "cpuDefense"
    ).textContent =
        currentCPU.stats.defense;


    document.getElementById(
        "battleButton"
    ).disabled =
        false;


    document.getElementById(
        "battleStatus"
    ).textContent =

        `Level ${currentCPU.level} ${currentCPU.instrument.name} challenges you!`;

}


function clearCPU() {

    currentCPU =
        null;


    document.getElementById(
        "cpuBattleIcon"
    ).textContent =
        "❓";


    document.getElementById(
        "cpuBattleName"
    ).textContent =
        "Waiting...";


    document.getElementById(
        "cpuBattleLevel"
    ).textContent =
        "?";


    [
        "cpuPower",
        "cpuMelody",
        "cpuRhythm",
        "cpuDefense"
    ]
    .forEach(
        id => {

            document.getElementById(
                id
            ).textContent =
                "?";

        }
    );


    document.getElementById(
        "battleButton"
    ).disabled =
        true;

}


document.getElementById(
    "findOpponentButton"
).addEventListener(
    "click",
    createCPU
);



/* =========================================================
   BATTLE LOG
========================================================= */

function addBattleLog(
    message
) {

    const div =
        document.createElement(
            "div"
        );


    div.className =
        "battle-log-entry";


    div.textContent =
        message;


    document.getElementById(
        "battleLog"
    ).appendChild(
        div
    );

}



/* =========================================================
   BATTLE FORMULA
========================================================= */

function calculateBattleScore(
    stats
) {

    const base =

        stats.power * 1.05 +

        stats.melody * .9 +

        stats.rhythm * .95 +

        stats.defense * .75;


    return (

        base *

        (
            .88 +
            Math.random() * .24
        )

    );

}


function activateSpecial(
    instrument,
    stats
) {

    if (
        Math.random() >
        .35
    ) {

        return {

            bonus:
                0,

            message:
                ""

        };

    }


    const special =
        specialAttacks[
            instrument.name
        ];


    const bonus =

        special[2] +

        stats[
            special[1]
        ] * .2;


    return {

        bonus,

        message:

            `${instrument.icon} ${instrument.name} used ${special[0]}!`

    };

}



/* =========================================================
   RUN BATTLE
========================================================= */

document.getElementById(
    "battleButton"
).addEventListener(
    "click",
    async () => {

        if (
            !battleData.instrument ||
            !currentCPU
        ) {

            return;
        }


        document.getElementById(
            "battleButton"
        ).disabled =
            true;


        document.getElementById(
            "battleLog"
        ).innerHTML =
            "";


        const playerInstrument =
            getInstrument(
                battleData.instrument
            );


        const playerStats =
            getPlayerBattleStats();


        playInstrumentSound(
            playerInstrument
        );


        addBattleLog(

            `${playerInstrument.icon} ${playerInstrument.name} begins the performance!`

        );


        await delay(
            500
        );


        playInstrumentSound(
            currentCPU.instrument
        );


        addBattleLog(

            `${currentCPU.instrument.icon} CPU ${currentCPU.instrument.name} responds!`

        );


        await delay(
            500
        );


        const rounds = [

            ["power","⚡ POWER SOLO"],

            ["melody","🎵 MELODY DUEL"],

            ["rhythm","🥁 RHYTHM CLASH"],

            ["defense","🛡 ENDURANCE ROUND"]

        ];


        const round =
            randomItem(
                rounds
            );


        addBattleLog(
            round[1]
        );


        let playerScore =

            calculateBattleScore(
                playerStats
            ) +

            playerStats[
                round[0]
            ] * .7;


        let cpuScore =

            calculateBattleScore(
                currentCPU.stats
            ) +

            currentCPU.stats[
                round[0]
            ] * .7;


        const playerSpecial =
            activateSpecial(

                playerInstrument,

                playerStats

            );


        const cpuSpecial =
            activateSpecial(

                currentCPU.instrument,

                currentCPU.stats

            );


        if (
            playerSpecial.bonus
        ) {

            playerScore +=
                playerSpecial.bonus;


            addBattleLog(
                playerSpecial.message
            );

        }


        if (
            cpuSpecial.bonus
        ) {

            cpuScore +=
                cpuSpecial.bonus;


            addBattleLog(
                `CPU ${cpuSpecial.message}`
            );

        }


        await delay(
            450
        );


        addBattleLog(

            `YOU ${Math.round(playerScore)} ⚔️ ${Math.round(cpuScore)} CPU`

        );


        await delay(
            500
        );


        if (
            playerScore >=
            cpuScore
        ) {

            battleWin();

        }
        else {

            battleLoss();

        }

    }
);



/* =========================================================
   BATTLE WIN / LOSS
========================================================= */

function battleWin() {

    const gained =
        randomNumber(
            20,
            35
        );


    battleData.wins++;


    battleData.xp +=
        gained;


    document.getElementById(
        "battleStatus"
    ).innerHTML =

        `🏆 <strong>YOU WIN!</strong> +${gained} EXP`;


    addBattleLog(

        `You gained ${gained} EXP.`

    );


    checkLevelUp();

    finishBattle();

}


function battleLoss() {

    const lost =
        randomNumber(
            12,
            25
        );


    battleData.losses++;


    battleData.xp -=
        lost;


    document.getElementById(
        "battleStatus"
    ).innerHTML =

        `💀 <strong>YOU LOST!</strong> -${lost} EXP`;


    addBattleLog(

        `You lost ${lost} EXP.`

    );


    checkLevelDown();

    finishBattle();

}


function checkLevelUp() {

    while (
        battleData.xp >=
        100
    ) {

        battleData.xp -=
            100;


        battleData.level++;


        battleData.upgradePoints++;


        battleData.highestLevel =
            Math.max(

                battleData.highestLevel,

                battleData.level

            );


        addBattleLog(

            `🌟 LEVEL UP! Level ${battleData.level}.`

        );


        addBattleLog(

            "🔧 You earned 1 Upgrade Point."

        );


        playPiano(
            523.25
        );


        setTimeout(
            () =>
                playPiano(
                    659.25
                ),
            130
        );


        setTimeout(
            () =>
                playPiano(
                    783.99
                ),
            260
        );

    }

}


function checkLevelDown() {

    while (
        battleData.xp < 0 &&
        battleData.level > 1
    ) {

        battleData.level--;


        battleData.xp +=
            100;


        addBattleLog(

            `⬇️ LEVEL DOWN! Level ${battleData.level}.`

        );


        if (
            battleData.upgradePoints > 0
        ) {

            battleData.upgradePoints--;

        }
        else {

            const upgradedStats =
                Object.keys(
                    battleData.upgrades
                )
                .filter(
                    stat =>
                        battleData.upgrades[
                            stat
                        ] > 0
                );


            if (
                upgradedStats.length
            ) {

                const stat =
                    randomItem(
                        upgradedStats
                    );


                battleData.upgrades[
                    stat
                ]--;


                addBattleLog(

                    `💔 ${stat.toUpperCase()} lost one upgrade.`

                );

            }

        }

    }


    if (
        battleData.level === 1 &&
        battleData.xp < 0
    ) {

        battleData.xp =
            0;

    }

}


function finishBattle() {

    saveBattleData();

    renderBattlePlayer();

    renderBattleRecord();


    setTimeout(
        clearCPU,
        1200
    );

}



/* =========================================================
   BATTLE UPGRADES
========================================================= */

document
    .querySelectorAll(
        ".upgrade-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        !battleData.instrument
                    ) {

                        return;
                    }


                    if (
                        battleData.upgradePoints <=
                        0
                    ) {

                        document.getElementById(
                            "battleStatus"
                        ).textContent =

                            "You need an Upgrade Point.";

                        return;

                    }


                    const stat =
                        button.dataset.upgrade;


                    battleData.upgrades[
                        stat
                    ]++;


                    battleData.upgradePoints--;


                    saveBattleData();

                    renderBattlePlayer();


                    document.getElementById(
                        "battleStatus"
                    ).textContent =

                        `🔧 ${stat.toUpperCase()} increased by +3!`;

                }
            );

        }
    );



/* =========================================================
   BATTLE RECORD
========================================================= */

function renderBattleRecord() {

    const total =

        battleData.wins +

        battleData.losses;


    const rate =

        total === 0

        ? 0

        : Math.round(

            battleData.wins /

            total *

            100

        );


    document.getElementById(
        "battleWins"
    ).textContent =
        battleData.wins;


    document.getElementById(
        "battleLosses"
    ).textContent =
        battleData.losses;


    document.getElementById(
        "battleWinRate"
    ).textContent =
        `${rate}%`;


    document.getElementById(
        "battleHighestLevel"
    ).textContent =
        battleData.highestLevel;

}



/* =========================================================
   CHANGE BATTLE INSTRUMENT
========================================================= */

document.getElementById(
    "changeBattleInstrument"
).addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(

                "Changing your instrument resets Battle Level, EXP and upgrades. Continue?"

            );


        if (!confirmed) {
            return;
        }


        battleData =
            freshBattleData();


        saveBattleData();

        renderBattleChoices();

        renderBattleRecord();

        clearCPU();


        document.getElementById(
            "playerBattleIcon"
        ).textContent =
            "🎵";


        document.getElementById(
            "playerBattleName"
        ).textContent =
            "Choose Instrument";


        document.getElementById(
            "playerBattleLevel"
        ).textContent =
            "1";


        [
            "playerPower",
            "playerMelody",
            "playerRhythm",
            "playerDefense"
        ]
        .forEach(
            id => {

                document.getElementById(
                    id
                ).textContent =
                    "0";

            }
        );


        document.getElementById(
            "playerXPText"
        ).textContent =
            "0 / 100";


        document.getElementById(
            "playerXPBar"
        ).style.width =
            "0%";


        document.getElementById(
            "upgradePoints"
        ).textContent =
            "0";


        document.getElementById(
            "battleStatus"
        ).textContent =
            "Choose an instrument.";

    }
);



/* =========================================================
   MUSICCRAFT
========================================================= */

const mcCanvas =
    document.getElementById(
        "musiccraftCanvas"
    );


const mcContext =
    mcCanvas.getContext(
        "2d"
    );


mcContext.imageSmoothingEnabled =
    false;


const MC_TILE_SIZE =
    40;


const MC_WORLD_SIZE =
    140;


const MC_COLUMNS =
    Math.ceil(
        mcCanvas.width /
        MC_TILE_SIZE
    );


const MC_ROWS =
    Math.ceil(
        mcCanvas.height /
        MC_TILE_SIZE
    );



/* =========================================================
   MUSICCRAFT BLOCKS
========================================================= */

const mcBlocks = {

    air: {

        name:
            "Empty",

        icon:
            "",

        color:
            "#171a1f",

        solid:
            false,

        mineable:
            false,

        xp:
            0

    },


    grass: {

        name:
            "Grass",

        icon:
            "🌱",

        color:
            "#557d3b",

        solid:
            false,

        mineable:
            true,

        xp:
            1

    },


    dirt: {

        name:
            "Dirt",

        icon:
            "🟫",

        color:
            "#735038",

        solid:
            true,

        mineable:
            true,

        xp:
            1

    },


    stone: {

        name:
            "Stone",

        icon:
            "🪨",

        color:
            "#727981",

        solid:
            true,

        mineable:
            true,

        xp:
            2

    },


    coal: {

        name:
            "Coal",

        icon:
            "⬛",

        color:
            "#303238",

        solid:
            true,

        mineable:
            true,

        xp:
            4

    },


    iron: {

        name:
            "Iron",

        icon:
            "🔩",

        color:
            "#9b8f82",

        solid:
            true,

        mineable:
            true,

        xp:
            6

    },


    gold: {

        name:
            "Gold",

        icon:
            "🟨",

        color:
            "#caa84c",

        solid:
            true,

        mineable:
            true,

        xp:
            10

    },


    diamond: {

        name:
            "Diamond",

        icon:
            "💎",

        color:
            "#57c8d1",

        solid:
            true,

        mineable:
            true,

        xp:
            18

    },


    music: {

        name:
            "Music Crystal",

        icon:
            "🎵",

        color:
            "#9165af",

        solid:
            true,

        mineable:
            true,

        xp:
            25

    },


    water: {

        name:
            "Water",

        icon:
            "💧",

        color:
            "#286b9d",

        solid:
            true,

        mineable:
            false,

        xp:
            0

    },


    lava: {

        name:
            "Lava",

        icon:
            "🌋",

        color:
            "#b94c28",

        solid:
            true,

        mineable:
            false,

        xp:
            0

    }

};



/* =========================================================
   DEPTHS
========================================================= */

let mcDepth =
    0;


const mcDepthNames = [

    "🌱 Surface",

    "⛏️ Underground",

    "🪨 Deep Caves",

    "💎 Crystal Depths",

    "🌋 Ancient Depths",

    "🎵 Music Core"

];


const mcDepthDescriptions = [

    "Begin your mining journey with Dirt and Stone.",

    "Coal starts appearing underground.",

    "Iron and small amounts of Gold can now be discovered.",

    "Diamonds and rare Music Crystals begin appearing.",

    "Dangerous lava surrounds valuable rare ores.",

    "The deepest layer of MusicCraft, rich in Music Crystals."

];


const mcMissions = [

    {

        name:
            "Getting Started",

        requirements: {

            dirt:
                6,

            stone:
                8

        }

    },


    {

        name:
            "Into the Underground",

        requirements: {

            stone:
                12,

            coal:
                5

        }

    },


    {

        name:
            "Iron Explorer",

        requirements: {

            coal:
                8,

            iron:
                5

        }

    },


    {

        name:
            "Treasure Hunter",

        requirements: {

            iron:
                8,

            gold:
                4,

            diamond:
                1

        }

    },


    {

        name:
            "Ancient Miner",

        requirements: {

            gold:
                8,

            diamond:
                4,

            music:
                2

        }

    },


    {

        name:
            "Master of the Music Core",

        requirements: {

            diamond:
                10,

            music:
                8

        }

    }

];



/* =========================================================
   MUSICCRAFT STATE
========================================================= */

let mcWorld =
    [];


let mcPlayer = {

    x:
        Math.floor(
            MC_WORLD_SIZE / 2
        ),

    y:
        Math.floor(
            MC_WORLD_SIZE / 2
        ),

    health:
        10,

    xp:
        0

};


let mcCamera = {

    x:
        0,

    y:
        0

};


let mcSelectedBlock =
    "dirt";


let mcInventory = {

    dirt:
        0,

    stone:
        0,

    coal:
        0,

    iron:
        0,

    gold:
        0,

    diamond:
        0,

    music:
        0

};



/* =========================================================
   BLOCK DISTRIBUTION BY DEPTH
========================================================= */

function getBlockForDepth(
    random
) {

    if (
        mcDepth === 0
    ) {

        if (random < .05) {
            return "water";
        }

        if (random < .26) {
            return "dirt";
        }

        if (random < .44) {
            return "stone";
        }

        return "grass";

    }


    if (
        mcDepth === 1
    ) {

        if (random < .10) {
            return "coal";
        }

        if (random < .48) {
            return "stone";
        }

        return "dirt";

    }


    if (
        mcDepth === 2
    ) {

        if (random < .11) {
            return "coal";
        }

        if (random < .20) {
            return "iron";
        }

        if (random < .225) {
            return "gold";
        }

        return "stone";

    }


    if (
        mcDepth === 3
    ) {

        if (random < .09) {
            return "iron";
        }

        if (random < .17) {
            return "gold";
        }

        if (random < .215) {
            return "diamond";
        }

        if (random < .235) {
            return "music";
        }

        return "stone";

    }


    if (
        mcDepth === 4
    ) {

        if (random < .07) {
            return "lava";
        }

        if (random < .15) {
            return "gold";
        }

        if (random < .215) {
            return "diamond";
        }

        if (random < .26) {
            return "music";
        }

        return "stone";

    }


    if (random < .07) {
        return "lava";
    }

    if (random < .17) {
        return "diamond";
    }

    if (random < .30) {
        return "music";
    }

    if (random < .39) {
        return "gold";
    }


    return "stone";

}



/* =========================================================
   WORLD GENERATION
========================================================= */

function generateMusicCraftWorld() {

    mcWorld =
        [];


    for (
        let y = 0;
        y < MC_WORLD_SIZE;
        y++
    ) {

        const row =
            [];


        for (
            let x = 0;
            x < MC_WORLD_SIZE;
            x++
        ) {

            row.push(

                getBlockForDepth(
                    Math.random()
                )

            );

        }


        mcWorld.push(
            row
        );

    }


    /*
       SAFE OPEN SPAWN AREA
    */

    for (
        let y =
            mcPlayer.y - 2;

        y <=
            mcPlayer.y + 2;

        y++
    ) {

        for (
            let x =
                mcPlayer.x - 2;

            x <=
                mcPlayer.x + 2;

            x++
        ) {

            if (
                mcWorld[y] &&
                mcWorld[y][x] !== undefined
            ) {

                mcWorld[y][x] =
                    "air";

            }

        }

    }


    /*
       GUARANTEE SOME MINEABLE MATERIAL
       AROUND SPAWN SO THE GAME CANNOT GET STUCK.
    */

    const nearbyResources =
        mcDepth === 0

        ? [
            "dirt",
            "stone",
            "stone",
            "dirt"
          ]

        : mcDepth === 1

        ? [
            "stone",
            "coal",
            "stone",
            "coal"
          ]

        : mcDepth === 2

        ? [
            "stone",
            "coal",
            "iron",
            "stone"
          ]

        : mcDepth === 3

        ? [
            "iron",
            "gold",
            "stone",
            "diamond"
          ]

        : mcDepth === 4

        ? [
            "gold",
            "diamond",
            "stone",
            "music"
          ]

        : [
            "diamond",
            "music",
            "gold",
            "music"
          ];


    const positions = [

        [3,0],
        [-3,0],
        [0,3],
        [0,-3]

    ];


    positions.forEach(
        (offset,index) => {

            const x =
                mcPlayer.x +
                offset[0];


            const y =
                mcPlayer.y +
                offset[1];


            mcWorld[y][x] =
                nearbyResources[index];

        }
    );


    addMusicCraftLog(

        `⛏️ Entered ${mcDepthNames[mcDepth]}.`

    );


    updateMiningMission();

    renderMusicCraftInventory();

    drawMusicCraft();

}



/* =========================================================
   DRAW MUSICCRAFT TILE
========================================================= */

function drawMusicCraftTile(
    screenX,
    screenY,
    blockName,
    worldX,
    worldY
) {

    const block =
        mcBlocks[
            blockName
        ];


    if (!block) {
        return;
    }


    /*
       EMPTY / CAVE FLOOR
    */

    if (
        blockName ===
        "air"
    ) {

        mcContext.fillStyle =

            mcDepth === 0

            ? "#344b2b"

            : "#171a1f";


        mcContext.fillRect(

            screenX,
            screenY,

            MC_TILE_SIZE,
            MC_TILE_SIZE

        );


        const seed =

            (
                worldX * 19 +
                worldY * 29
            ) % 17;


        mcContext.fillStyle =
            "rgba(255,255,255,.025)";


        mcContext.fillRect(

            screenX +
            6 +
            seed,

            screenY +
            12,

            3,
            3

        );


        mcContext.strokeStyle =
            "rgba(0,0,0,.12)";


        mcContext.strokeRect(

            screenX,
            screenY,

            MC_TILE_SIZE,
            MC_TILE_SIZE

        );


        return;

    }


    /*
       BLOCK BASE
    */

    mcContext.fillStyle =
        block.color;


    mcContext.fillRect(

        screenX,
        screenY,

        MC_TILE_SIZE,
        MC_TILE_SIZE

    );


    const seed =

        (
            worldX * 17 +
            worldY * 31
        ) % 13;


    mcContext.fillStyle =
        "rgba(255,255,255,.06)";


    mcContext.fillRect(

        screenX +
        5 +
        seed,

        screenY +
        8,

        4,
        4

    );


    mcContext.fillStyle =
        "rgba(0,0,0,.1)";


    mcContext.fillRect(

        screenX +
        20,

        screenY +
        25,

        5,
        4

    );


    mcContext.strokeStyle =
        "rgba(0,0,0,.18)";


    mcContext.strokeRect(

        screenX,
        screenY,

        MC_TILE_SIZE,
        MC_TILE_SIZE

    );


    /*
       MUSIC CRYSTAL
    */

    if (
        blockName ===
        "music"
    ) {

        mcContext.fillStyle =
            "#f8e9ff";


        mcContext.font =
            "22px serif";


        mcContext.textAlign =
            "center";


        mcContext.textBaseline =
            "middle";


        mcContext.fillText(

            "♪",

            screenX +
            MC_TILE_SIZE / 2,

            screenY +
            MC_TILE_SIZE / 2

        );

    }


    /*
       DIAMOND
    */

    if (
        blockName ===
        "diamond"
    ) {

        mcContext.fillStyle =
            "#c7ffff";


        mcContext.fillRect(

            screenX + 12,
            screenY + 10,

            6,
            6

        );


        mcContext.fillRect(

            screenX + 25,
            screenY + 24,

            5,
            5

        );

    }


    /*
       GOLD
    */

    if (
        blockName ===
        "gold"
    ) {

        mcContext.fillStyle =
            "#ffe49a";


        mcContext.fillRect(

            screenX + 10,
            screenY + 10,

            6,
            5

        );


        mcContext.fillRect(

            screenX + 26,
            screenY + 25,

            5,
            5

        );

    }


    /*
       COAL
    */

    if (
        blockName ===
        "coal"
    ) {

        mcContext.fillStyle =
            "#101116";


        mcContext.fillRect(

            screenX + 10,
            screenY + 9,

            7,
            6

        );


        mcContext.fillRect(

            screenX + 24,
            screenY + 26,

            6,
            5

        );

    }


    /*
       IRON
    */

    if (
        blockName ===
        "iron"
    ) {

        mcContext.fillStyle =
            "#d0bda9";


        mcContext.fillRect(

            screenX + 8,
            screenY + 12,

            7,
            5

        );


        mcContext.fillRect(

            screenX + 26,
            screenY + 24,

            6,
            5

        );

    }


    /*
       LAVA
    */

    if (
        blockName ===
        "lava"
    ) {

        mcContext.fillStyle =
            "#f47c33";


        mcContext.fillRect(

            screenX + 5,
            screenY + 9,

            30,
            5

        );


        mcContext.fillStyle =
            "#ffd166";


        mcContext.fillRect(

            screenX + 12,
            screenY + 25,

            17,
            4

        );

    }

}



/* =========================================================
   DRAW PLAYER
========================================================= */

function drawMusicCraftPlayer(
    x,
    y
) {

    mcContext.fillStyle =
        "rgba(0,0,0,.28)";


    mcContext.fillRect(

        x + 7,
        y + 31,

        27,
        5

    );


    /*
       BODY
    */

    mcContext.fillStyle =
        "#c39a55";


    mcContext.fillRect(

        x + 10,
        y + 15,

        20,
        19

    );


    /*
       HEAD
    */

    mcContext.fillStyle =
        "#e8c9a1";


    mcContext.fillRect(

        x + 11,
        y + 4,

        18,
        16

    );


    /*
       HAIR
    */

    mcContext.fillStyle =
        "#3e2d22";


    mcContext.fillRect(

        x + 11,
        y + 4,

        18,
        5

    );


    /*
       EYES
    */

    mcContext.fillStyle =
        "#111820";


    mcContext.fillRect(

        x + 15,
        y + 11,

        2,
        2

    );


    mcContext.fillRect(

        x + 24,
        y + 11,

        2,
        2

    );


    /*
       PICKAXE
    */

    mcContext.fillStyle =
        "#b8bec6";


    mcContext.fillRect(

        x + 29,
        y + 16,

        8,
        3

    );


    mcContext.fillStyle =
        "#7b5230";


    mcContext.fillRect(

        x + 32,
        y + 18,

        3,
        11

    );

}



/* =========================================================
   DRAW WORLD
========================================================= */

function drawMusicCraft() {

    mcContext.clearRect(

        0,
        0,

        mcCanvas.width,
        mcCanvas.height

    );


    mcCamera.x =

        mcPlayer.x -

        Math.floor(
            MC_COLUMNS / 2
        );


    mcCamera.y =

        mcPlayer.y -

        Math.floor(
            MC_ROWS / 2
        );


    for (
        let viewY = 0;
        viewY <= MC_ROWS;
        viewY++
    ) {

        for (
            let viewX = 0;
            viewX <= MC_COLUMNS;
            viewX++
        ) {

            const worldX =

                mcCamera.x +
                viewX;


            const worldY =

                mcCamera.y +
                viewY;


            if (
                worldX < 0 ||
                worldY < 0 ||
                worldX >= MC_WORLD_SIZE ||
                worldY >= MC_WORLD_SIZE
            ) {

                continue;

            }


            const blockName =
                mcWorld[
                    worldY
                ][
                    worldX
                ];


            drawMusicCraftTile(

                viewX * MC_TILE_SIZE,

                viewY * MC_TILE_SIZE,

                blockName,

                worldX,

                worldY

            );

        }

    }


    const playerScreenX =

        (
            mcPlayer.x -
            mcCamera.x
        ) * MC_TILE_SIZE;


    const playerScreenY =

        (
            mcPlayer.y -
            mcCamera.y
        ) * MC_TILE_SIZE;


    drawMusicCraftPlayer(

        playerScreenX,
        playerScreenY

    );


    updateMusicCraftHUD();

}



/* =========================================================
   MOVEMENT
========================================================= */

function moveMusicCraftPlayer(
    dx,
    dy
) {

    const nextX =
        mcPlayer.x + dx;


    const nextY =
        mcPlayer.y + dy;


    if (
        nextX < 0 ||
        nextY < 0 ||
        nextX >= MC_WORLD_SIZE ||
        nextY >= MC_WORLD_SIZE
    ) {

        addMusicCraftLog(

            "🗺️ You reached the edge of the region."

        );


        return;

    }


    const blockName =
        mcWorld[
            nextY
        ][
            nextX
        ];


    const block =
        mcBlocks[
            blockName
        ];


    if (
        block.solid
    ) {

        if (
            blockName ===
            "lava"
        ) {

            mcPlayer.health =
                Math.max(
                    1,
                    mcPlayer.health - 1
                );


            addMusicCraftLog(

                "🔥 Lava burned you! -1 Health."

            );


            updateMusicCraftHUD();

        }
        else if (
            blockName ===
            "water"
        ) {

            addMusicCraftLog(

                "💧 Deep water blocks your path."

            );

        }
        else {

            addMusicCraftLog(

                `⛏️ Mine the ${block.name} first.`

            );

        }


        return;

    }


    mcPlayer.x =
        nextX;


    mcPlayer.y =
        nextY;


    drawMusicCraft();

}



/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

mcCanvas.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();


        const movementKeys = [

            "w",
            "a",
            "s",
            "d",
            "arrowup",
            "arrowdown",
            "arrowleft",
            "arrowright"

        ];


        if (
            movementKeys.includes(
                key
            )
        ) {

            event.preventDefault();

        }


        if (
            key === "w" ||
            key === "arrowup"
        ) {

            moveMusicCraftPlayer(
                0,
                -1
            );

        }


        if (
            key === "s" ||
            key === "arrowdown"
        ) {

            moveMusicCraftPlayer(
                0,
                1
            );

        }


        if (
            key === "a" ||
            key === "arrowleft"
        ) {

            moveMusicCraftPlayer(
                -1,
                0
            );

        }


        if (
            key === "d" ||
            key === "arrowright"
        ) {

            moveMusicCraftPlayer(
                1,
                0
            );

        }


        const inventoryKeys = {

            "1":
                "dirt",

            "2":
                "stone",

            "3":
                "coal",

            "4":
                "iron",

            "5":
                "gold",

            "6":
                "diamond",

            "7":
                "music"

        };


        if (
            inventoryKeys[
                key
            ]
        ) {

            selectMusicCraftBlock(

                inventoryKeys[
                    key
                ]

            );

        }

    }
);



/* =========================================================
   MOBILE MOVEMENT
========================================================= */

document
    .querySelectorAll(
        "[data-mc-move]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const direction =
                        button.dataset.mcMove;


                    if (
                        direction ===
                        "up"
                    ) {

                        moveMusicCraftPlayer(
                            0,
                            -1
                        );

                    }


                    if (
                        direction ===
                        "down"
                    ) {

                        moveMusicCraftPlayer(
                            0,
                            1
                        );

                    }


                    if (
                        direction ===
                        "left"
                    ) {

                        moveMusicCraftPlayer(
                            -1,
                            0
                        );

                    }


                    if (
                        direction ===
                        "right"
                    ) {

                        moveMusicCraftPlayer(
                            1,
                            0
                        );

                    }

                }
            );

        }
    );



/* =========================================================
   CANVAS CLICK → WORLD TILE
========================================================= */

function getMusicCraftTile(
    event
) {

    const rect =
        mcCanvas.getBoundingClientRect();


    const scaleX =
        mcCanvas.width /
        rect.width;


    const scaleY =
        mcCanvas.height /
        rect.height;


    const mouseX =

        (
            event.clientX -
            rect.left
        ) * scaleX;


    const mouseY =

        (
            event.clientY -
            rect.top
        ) * scaleY;


    return {

        x:

            mcCamera.x +

            Math.floor(
                mouseX /
                MC_TILE_SIZE
            ),


        y:

            mcCamera.y +

            Math.floor(
                mouseY /
                MC_TILE_SIZE
            )

    };

}



/* =========================================================
   MINING
========================================================= */

mcCanvas.addEventListener(
    "click",
    event => {

        mcCanvas.focus();


        const tile =
            getMusicCraftTile(
                event
            );


        mineMusicCraftBlock(

            tile.x,

            tile.y

        );

    }
);


function mineMusicCraftBlock(
    x,
    y
) {

    /*
       WORLD BOUNDS
    */

    if (
        x < 0 ||
        y < 0 ||
        x >= MC_WORLD_SIZE ||
        y >= MC_WORLD_SIZE
    ) {

        return;

    }


    /*
       CAN'T MINE YOUR OWN TILE
    */

    if (
        x === mcPlayer.x &&
        y === mcPlayer.y
    ) {

        addMusicCraftLog(

            "❌ You cannot mine the block you are standing on."

        );


        return;

    }


    /*
       MINING RANGE

       Up to 2 tiles horizontally and vertically.
       Diagonals work too.
    */

    const distanceX =
        Math.abs(
            x -
            mcPlayer.x
        );


    const distanceY =
        Math.abs(
            y -
            mcPlayer.y
        );


    if (
        distanceX > 2 ||
        distanceY > 2
    ) {

        addMusicCraftLog(

            "⛏️ Move closer to mine that block."

        );


        return;

    }


    const blockName =
        mcWorld[
            y
        ][
            x
        ];


    const block =
        mcBlocks[
            blockName
        ];


    /*
       EMPTY TILE
    */

    if (
        blockName ===
        "air"
    ) {

        addMusicCraftLog(

            "There is nothing there to mine."

        );


        return;

    }


    /*
       UNMINEABLE
    */

    if (
        !block.mineable
    ) {

        if (
            blockName ===
            "water"
        ) {

            addMusicCraftLog(

                "💧 Water cannot be mined."

            );

        }
        else if (
            blockName ===
            "lava"
        ) {

            addMusicCraftLog(

                "🔥 Lava is too hot to mine!"

            );

        }
        else {

            addMusicCraftLog(

                `❌ ${block.name} cannot be mined.`

            );

        }


        return;

    }


    /*
       ADD RESOURCE
    */

    if (
        blockName ===
        "grass"
    ) {

        mcInventory.dirt++;

    }
    else if (

        Object.prototype.hasOwnProperty.call(

            mcInventory,

            blockName

        )

    ) {

        mcInventory[
            blockName
        ]++;

    }


    /*
       EXP
    */

    mcPlayer.xp +=
        block.xp;


    /*
       IMPORTANT FIX:

       ACTUALLY REMOVE BLOCK.
    */

    mcWorld[
        y
    ][
        x
    ] =
        "air";


    addMusicCraftLog(

        `${block.icon} Mined ${block.name}! +${block.xp} EXP`

    );


    /*
       MINING SOUND
    */

    if (
        blockName ===
        "stone" ||
        blockName ===
        "coal" ||
        blockName ===
        "iron"
    ) {

        playXylophone(
            260
        );

    }


    if (
        blockName ===
        "gold"
    ) {

        playXylophone(
            523.25
        );

    }


    if (
        blockName ===
        "diamond"
    ) {

        playPiano(
            783.99
        );


        setTimeout(
            () =>
                playPiano(
                    1046.5
                ),
            120
        );

    }


    if (
        blockName ===
        "music"
    ) {

        playPiano(

            randomItem(
                [
                    261.63,
                    293.66,
                    329.63,
                    349.23,
                    392,
                    440,
                    493.88,
                    523.25
                ]
            )

        );


        addMusicCraftLog(

            "🎵 You discovered a rare Music Crystal!"

        );

    }


    renderMusicCraftInventory();

    updateMiningMission();

    updateMusicCraftHUD();

    drawMusicCraft();

}



/* =========================================================
   PLACE BLOCKS
========================================================= */

mcCanvas.addEventListener(
    "contextmenu",
    event => {

        event.preventDefault();


        mcCanvas.focus();


        const tile =
            getMusicCraftTile(
                event
            );


        placeMusicCraftBlock(

            tile.x,

            tile.y

        );

    }
);


function placeMusicCraftBlock(
    x,
    y
) {

    if (
        x < 0 ||
        y < 0 ||
        x >= MC_WORLD_SIZE ||
        y >= MC_WORLD_SIZE
    ) {

        return;

    }


    /*
       RANGE
    */

    const distanceX =
        Math.abs(
            x -
            mcPlayer.x
        );


    const distanceY =
        Math.abs(
            y -
            mcPlayer.y
        );


    if (
        distanceX > 2 ||
        distanceY > 2
    ) {

        addMusicCraftLog(

            "🧱 That location is too far away."

        );


        return;

    }


    if (
        x === mcPlayer.x &&
        y === mcPlayer.y
    ) {

        addMusicCraftLog(

            "❌ You cannot place a block on yourself."

        );


        return;

    }


    /*
       ONLY BUILD ON EMPTY SPACE
    */

    if (
        mcWorld[y][x] !==
        "air"
    ) {

        addMusicCraftLog(

            "❌ Mine that block before building there."

        );


        return;

    }


    if (
        !mcInventory[
            mcSelectedBlock
        ]
    ) {

        addMusicCraftLog(

            `❌ You have no ${mcBlocks[mcSelectedBlock].name}.`

        );


        return;

    }


    mcWorld[
        y
    ][
        x
    ] =
        mcSelectedBlock;


    mcInventory[
        mcSelectedBlock
    ]--;


    addMusicCraftLog(

        `🧱 Placed ${mcBlocks[mcSelectedBlock].name}.`

    );


    if (
        mcSelectedBlock ===
        "music"
    ) {

        playPiano(
            523.25
        );

    }


    renderMusicCraftInventory();

    updateMiningMission();

    drawMusicCraft();

}



/* =========================================================
   INVENTORY
========================================================= */

function renderMusicCraftInventory() {

    const container =
        document.getElementById(
            "mcInventory"
        );


    container.innerHTML =
        "";


    Object.entries(
        mcInventory
    )
    .forEach(
        (
            [
                blockName,
                amount
            ],
            index
        ) => {

            const block =
                mcBlocks[
                    blockName
                ];


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =

                `mc-inventory-item ${
                    mcSelectedBlock ===
                    blockName
                        ? "selected"
                        : ""
                }`;


            button.innerHTML = `

                <span class="mc-inventory-icon">
                    ${block.icon}
                </span>

                ${index + 1}. ${block.name}

                <span class="mc-inventory-count">
                    × ${amount}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    selectMusicCraftBlock(
                        blockName
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


function selectMusicCraftBlock(
    blockName
) {

    if (
        mcInventory[
            blockName
        ] === undefined
    ) {

        return;

    }


    mcSelectedBlock =
        blockName;


    document.getElementById(
        "mcSelectedBlock"
    ).textContent =

        `${mcBlocks[blockName].icon} ${mcBlocks[blockName].name}`;


    renderMusicCraftInventory();

}



/* =========================================================
   MINING MISSIONS
========================================================= */

function updateMiningMission() {

    const mission =
        mcMissions[
            mcDepth
        ];


    document.getElementById(
        "mcDepth"
    ).textContent =
        mcDepthNames[
            mcDepth
        ];


    const descriptionElement =
        document.getElementById(
            "mcDepthDescription"
        );


    if (
        descriptionElement
    ) {

        descriptionElement.textContent =
            mcDepthDescriptions[
                mcDepth
            ];

    }


    document.getElementById(
        "mcMissionTitle"
    ).textContent =
        mission.name;


    const list =
        document.getElementById(
            "mcMissionList"
        );


    list.innerHTML =
        "";


    let totalNeeded =
        0;


    let totalHave =
        0;


    Object.entries(
        mission.requirements
    )
    .forEach(
        (
            [
                resource,
                required
            ]
        ) => {

            const current =
                Math.min(

                    mcInventory[
                        resource
                    ] || 0,

                    required

                );


            totalNeeded +=
                required;


            totalHave +=
                current;


            const complete =

                current >=
                required;


            const row =
                document.createElement(
                    "div"
                );


            row.className =

                `mc-mission-item ${
                    complete
                        ? "complete"
                        : ""
                }`;


            row.innerHTML = `

                <span>

                    ${mcBlocks[resource].icon}
                    ${mcBlocks[resource].name}

                </span>

                <strong>

                    ${current}/${required}

                    ${complete ? "✓" : ""}

                </strong>

            `;


            list.appendChild(
                row
            );

        }
    );


    const percentage =

        totalNeeded === 0

        ? 100

        : Math.round(

            totalHave /
            totalNeeded *
            100

        );


    document.getElementById(
        "mcMissionProgressBar"
    ).style.width =

        `${percentage}%`;


    const complete =

        Object.entries(
            mission.requirements
        )
        .every(
            (
                [
                    resource,
                    amount
                ]
            ) =>

                (
                    mcInventory[
                        resource
                    ] || 0
                ) >= amount

        );


    const button =
        document.getElementById(
            "mcGoDeeper"
        );


    if (
        mcDepth ===
        mcDepthNames.length - 1
    ) {

        button.disabled =
            true;


        button.textContent =

            complete

            ? "🏆 Music Core Conquered!"

            : "🎵 Complete Final Mission";


        return;

    }


    button.disabled =
        !complete;


    button.textContent =

        complete

        ? "⛏️ Mine Deeper!"

        : "🔒 Complete Mission First";

}



/* =========================================================
   MINE DEEPER
========================================================= */

document.getElementById(
    "mcGoDeeper"
).addEventListener(
    "click",
    () => {

        const mission =
            mcMissions[
                mcDepth
            ];


        const complete =

            Object.entries(
                mission.requirements
            )
            .every(
                (
                    [
                        resource,
                        amount
                    ]
                ) =>

                    (
                        mcInventory[
                            resource
                        ] || 0
                    ) >= amount

            );


        if (!complete) {

            addMusicCraftLog(

                "🔒 Finish your mining mission first."

            );


            return;

        }


        if (
            mcDepth >=
            mcDepthNames.length - 1
        ) {

            return;

        }


        /*
           SPEND REQUIRED MATERIALS
        */

        Object.entries(
            mission.requirements
        )
        .forEach(
            (
                [
                    resource,
                    amount
                ]
            ) => {

                mcInventory[
                    resource
                ] -=
                    amount;

            }
        );


        mcDepth++;


        mcPlayer.x =
            Math.floor(
                MC_WORLD_SIZE / 2
            );


        mcPlayer.y =
            Math.floor(
                MC_WORLD_SIZE / 2
            );


        addMusicCraftLog(

            `⬇️ Descending to ${mcDepthNames[mcDepth]}...`

        );


        playPiano(
            392
        );


        setTimeout(
            () =>
                playPiano(
                    329.63
                ),
            130
        );


        setTimeout(
            () =>
                playPiano(
                    261.63
                ),
            260
        );


        generateMusicCraftWorld();

        renderMusicCraftInventory();

        updateMiningMission();

    }
);



/* =========================================================
   MUSICCRAFT HUD
========================================================= */

function updateMusicCraftHUD() {

    document.getElementById(
        "mcHealth"
    ).textContent =
        mcPlayer.health;


    document.getElementById(
        "mcExperience"
    ).textContent =
        mcPlayer.xp;


    document.getElementById(
        "mcPlayerX"
    ).textContent =
        mcPlayer.x;


    document.getElementById(
        "mcPlayerY"
    ).textContent =
        mcPlayer.y;

}



/* =========================================================
   MUSICCRAFT LOG
========================================================= */

function addMusicCraftLog(
    message
) {

    const log =
        document.getElementById(
            "mcLog"
        );


    const row =
        document.createElement(
            "div"
        );


    row.textContent =
        message;


    log.prepend(
        row
    );


    while (
        log.children.length > 12
    ) {

        log.lastChild.remove();

    }

}



/* =========================================================
   REGENERATE CURRENT DEPTH
========================================================= */

document.getElementById(
    "mcNewWorld"
).addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(

                `Regenerate ${mcDepthNames[mcDepth]}? Your inventory will remain.`

            );


        if (!confirmed) {
            return;
        }


        mcPlayer.x =
            Math.floor(
                MC_WORLD_SIZE / 2
            );


        mcPlayer.y =
            Math.floor(
                MC_WORLD_SIZE / 2
            );


        generateMusicCraftWorld();

    }
);



/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

    {
        question:
            "Which instrument belongs to the string family?",

        answers:
            [
                "Trumpet",
                "Guitar",
                "Flute",
                "Drums"
            ],

        correct:
            1
    },

    {
        question:
            "Which instrument uses a keyboard?",

        answers:
            [
                "Violin",
                "Piano",
                "Trumpet",
                "Flute"
            ],

        correct:
            1
    },

    {
        question:
            "Which is a brass instrument?",

        answers:
            [
                "Clarinet",
                "Trumpet",
                "Violin",
                "Piano"
            ],

        correct:
            1
    },

    {
        question:
            "The saxophone belongs to which family?",

        answers:
            [
                "String",
                "Woodwind",
                "Percussion",
                "Keyboard"
            ],

        correct:
            1
    },

    {
        question:
            "Which instrument uses a slide?",

        answers:
            [
                "Trombone",
                "Guitar",
                "Piano",
                "Flute"
            ],

        correct:
            0
    },

    {
        question:
            "Which instrument uses a double reed?",

        answers:
            [
                "Oboe",
                "Trumpet",
                "Guitar",
                "Drums"
            ],

        correct:
            0
    },

    {
        question:
            "What does BPM measure?",

        answers:
            [
                "Tempo",
                "Pitch",
                "Volume",
                "Timbre"
            ],

        correct:
            0
    },

    {
        question:
            "Which instrument commonly has four strings?",

        answers:
            [
                "Ukulele",
                "Trumpet",
                "Clarinet",
                "Drums"
            ],

        correct:
            0
    },

    {
        question:
            "What is timbre?",

        answers:
            [
                "Character of a sound",
                "Speed",
                "Volume only",
                "Silence"
            ],

        correct:
            0
    },

    {
        question:
            "What is a chord?",

        answers:
            [
                "Several notes together",
                "A drumstick",
                "A microphone",
                "A tempo"
            ],

        correct:
            0
    }

];


let quizIndex =
    0;


let quizScore =
    0;


let quizAnswered =
    false;


let quizFinished =
    false;


function loadQuizQuestion() {

    quizAnswered =
        false;


    const question =
        quizQuestions[
            quizIndex
        ];


    document.getElementById(
        "questionNumber"
    ).textContent =
        quizIndex + 1;


    document.getElementById(
        "totalQuestions"
    ).textContent =
        quizQuestions.length;


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    document.getElementById(
        "quizResult"
    ).textContent =
        "";


    const container =
        document.getElementById(
            "answerButtons"
        );


    container.innerHTML =
        "";


    document.getElementById(
        "nextQuestion"
    ).style.display =
        "none";


    question.answers.forEach(
        (answer,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "quiz-answer";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    if (
                        quizAnswered
                    ) {

                        return;
                    }


                    quizAnswered =
                        true;


                    container
                        .querySelectorAll(
                            ".quiz-answer"
                        )
                        .forEach(
                            (
                                option,
                                optionIndex
                            ) => {

                                option.disabled =
                                    true;


                                if (
                                    optionIndex ===
                                    question.correct
                                ) {

                                    option.classList.add(
                                        "correct-answer"
                                    );

                                }

                            }
                        );


                    if (
                        index ===
                        question.correct
                    ) {

                        quizScore++;


                        button.classList.add(
                            "correct-answer"
                        );


                        document.getElementById(
                            "quizResult"
                        ).textContent =
                            "🎉 Correct!";

                    }
                    else {

                        button.classList.add(
                            "wrong-answer"
                        );


                        document.getElementById(
                            "quizResult"
                        ).textContent =

                            `❌ Correct answer: ${question.answers[question.correct]}`;

                    }


                    document.getElementById(
                        "score"
                    ).textContent =
                        quizScore;


                    document.getElementById(
                        "nextQuestion"
                    ).style.display =
                        "inline-flex";

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


function startQuiz() {

    quizIndex =
        0;


    quizScore =
        0;


    quizFinished =
        false;


    document.getElementById(
        "score"
    ).textContent =
        "0";


    document.getElementById(
        "nextQuestion"
    ).textContent =
        "Next →";


    loadQuizQuestion();

}


function finishQuiz() {

    quizFinished =
        true;


    document.getElementById(
        "questionText"
    ).textContent =
        "🎉 Quiz Complete!";


    document.getElementById(
        "answerButtons"
    ).innerHTML =
        "";


    document.getElementById(
        "quizResult"
    ).innerHTML =

        `You scored <strong>${quizScore}/${quizQuestions.length}</strong>.`;


    const next =
        document.getElementById(
            "nextQuestion"
        );


    next.textContent =
        "🔄 Play Again";


    next.style.display =
        "inline-flex";

}


document.getElementById(
    "nextQuestion"
).addEventListener(
    "click",
    () => {

        if (
            quizFinished
        ) {

            startQuiz();

            return;

        }


        if (
            !quizAnswered
        ) {

            return;
        }


        quizIndex++;


        if (
            quizIndex >=
            quizQuestions.length
        ) {

            finishQuiz();

        }
        else {

            loadQuizQuestion();

        }

    }
);



/* =========================================================
   FUN FACTS
========================================================= */

const funFacts = [

    "🎹 A modern piano normally has 88 keys.",

    "🎷 The saxophone is made from brass but belongs to the woodwind family.",

    "🥁 Drums are among the oldest musical instruments.",

    "🎻 The cello has a lower range than the violin.",

    "🎺 Brass instruments begin with vibrating lips.",

    "🎵 BPM means beats per minute.",

    "🎧 Timbre describes the character of a sound.",

    "🎶 The clarinet uses a single reed.",

    "🪈 The oboe uses a double reed.",

    "🎸 A ukulele commonly has four strings.",

    "🎛️ Synthesizers can create completely electronic sounds.",

    "🎺 The trombone commonly changes pitch using a slide."

];


let previousFact =
    -1;


document.getElementById(
    "factButton"
).addEventListener(
    "click",
    () => {

        let index;


        do {

            index =
                randomNumber(
                    0,
                    funFacts.length - 1
                );

        }
        while (
            index ===
            previousFact &&
            funFacts.length > 1
        );


        previousFact =
            index;


        document.getElementById(
            "funFact"
        ).textContent =
            funFacts[
                index
            ];

    }
);



/* =========================================================
   NAV
========================================================= */

document.getElementById(
    "menuToggle"
).addEventListener(
    "click",
    () => {

        document.getElementById(
            "navLinks"
        ).classList.toggle(
            "nav-active"
        );

    }
);


document
    .querySelectorAll(
        "#navLinks a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    document.getElementById(
                        "navLinks"
                    ).classList.remove(
                        "nav-active"
                    );

                }
            );

        }
    );



/* =========================================================
   THEME
========================================================= */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


try {

    const savedTheme =
        localStorage.getItem(
            "musicverseTheme"
        );


    if (
        savedTheme ===
        "light"
    ) {

        document.body.classList.add(
            "light-mode"
        );


        themeToggle.textContent =
            "☀️";

    }

}
catch (error) {}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );


        const isLight =
            document.body.classList.contains(
                "light-mode"
            );


        themeToggle.textContent =

            isLight

            ? "☀️"

            : "🌙";


        try {

            localStorage.setItem(

                "musicverseTheme",

                isLight
                    ? "light"
                    : "dark"

            );

        }
        catch (error) {}

    }
);



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

            closeInstrumentModal();

        }

    }
);



/* =========================================================
   INITIALISE
========================================================= */

renderInstruments();

showFeaturedInstrument();

nextTrueFalse();

renderBattleChoices();

renderBattleRecord();

clearCPU();


if (
    battleData.instrument
) {

    renderBattlePlayer();

}


generateMusicCraftWorld();

renderMusicCraftInventory();

updateMiningMission();

updateMusicCraftHUD();

startQuiz();


});
