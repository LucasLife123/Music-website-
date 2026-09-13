/* =========================================================
   CORE HELPERS
========================================================= */

const $ = s =>
  document.querySelector(s);

const $$ = s =>
  [...document.querySelectorAll(s)];

const rand = (a, b) =>
  Math.floor(
    Math.random() * (b - a + 1)
  ) + a;

const pick = a =>
  a[
    Math.floor(
      Math.random() * a.length
    )
  ];

const clamp = (n, a, b) =>
  Math.max(
    a,
    Math.min(b, n)
  );

const wait = ms =>
  new Promise(
    resolve =>
      setTimeout(resolve, ms)
  );


/* =========================================================
   SAVE / LOAD
========================================================= */

function save(key, value) {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}


function load(key, fallback) {

  try {

    const value =
      localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : fallback;

  }

  catch {

    return fallback;
  }
}


/* =========================================================
   SOUND ENGINE
========================================================= */

const SoundEngine = {

  context: null,

  master: null,

  sfxVolume: 0.6,

  enabled: true,


  init() {

    if (this.context) {
      return;
    }


    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;


    if (!AudioContextClass) {
      return;
    }


    this.context =
      new AudioContextClass();


    this.master =
      this.context.createGain();


    this.master.gain.value =
      0.7;


    this.master.connect(
      this.context.destination
    );
  },


  resume() {

    this.init();


    if (
      this.context?.state ===
      "suspended"
    ) {

      this.context.resume();
    }
  },


  tone(
    frequency = 440,
    duration = 0.15,
    type = "sine",
    volume = 0.18,
    delay = 0
  ) {

    if (!this.enabled) {
      return;
    }


    this.resume();


    if (!this.context) {
      return;
    }


    const now =
      this.context.currentTime +
      delay;


    const oscillator =
      this.context.createOscillator();


    const gain =
      this.context.createGain();


    oscillator.type =
      type;


    oscillator.frequency.setValueAtTime(
      frequency,
      now
    );


    gain.gain.setValueAtTime(
      0.0001,
      now
    );


    gain.gain.exponentialRampToValueAtTime(
      Math.max(
        0.001,
        volume * this.sfxVolume
      ),
      now + 0.015
    );


    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + duration
    );


    oscillator.connect(gain);

    gain.connect(this.master);


    oscillator.start(now);

    oscillator.stop(
      now +
      duration +
      0.04
    );
  },


  chord(
    notes,
    duration = 0.3,
    type = "sine",
    volume = 0.12
  ) {

    notes.forEach(
      (note, index) => {

        this.tone(
          note,
          duration,
          type,
          volume,
          index * 0.025
        );
      }
    );
  },


  noise(
    duration = 0.15,
    volume = 0.12
  ) {

    if (!this.enabled) {
      return;
    }


    this.resume();


    const context =
      this.context;


    if (!context) {
      return;
    }


    const buffer =
      context.createBuffer(
        1,
        context.sampleRate *
          duration,
        context.sampleRate
      );


    const data =
      buffer.getChannelData(0);


    for (
      let i = 0;
      i < data.length;
      i++
    ) {

      data[i] =
        Math.random() * 2 - 1;
    }


    const source =
      context.createBufferSource();


    const gain =
      context.createGain();


    source.buffer =
      buffer;


    gain.gain.setValueAtTime(
      volume * this.sfxVolume,
      context.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime +
        duration
    );


    source.connect(gain);

    gain.connect(this.master);


    source.start();
  }
};


/* =========================================================
   SOUND EFFECTS
========================================================= */

const S = {

  click() {

    SoundEngine.tone(
      620,
      0.07,
      "sine",
      0.12
    );
  },


  coin() {

    SoundEngine.tone(
      880,
      0.08,
      "square",
      0.11
    );


    SoundEngine.tone(
      1320,
      0.12,
      "square",
      0.08,
      0.07
    );
  },


  xp() {

    SoundEngine.tone(
      523,
      0.09,
      "sine",
      0.08
    );


    SoundEngine.tone(
      659,
      0.1,
      "sine",
      0.08,
      0.06
    );


    SoundEngine.tone(
      784,
      0.14,
      "sine",
      0.09,
      0.12
    );
  },


  level() {

    SoundEngine.chord(
      [
        523,
        659,
        784
      ],
      0.3,
      "triangle",
      0.12
    );


    SoundEngine.tone(
      1046,
      0.5,
      "sine",
      0.14,
      0.24
    );
  },


  attack() {

    SoundEngine.tone(
      180,
      0.12,
      "sawtooth",
      0.13
    );


    SoundEngine.tone(
      260,
      0.15,
      "square",
      0.06,
      0.04
    );
  },


  critical() {

    SoundEngine.tone(
      880,
      0.1,
      "square",
      0.14
    );


    SoundEngine.tone(
      1174,
      0.16,
      "square",
      0.12,
      0.06
    );


    SoundEngine.tone(
      1568,
      0.25,
      "sine",
      0.12,
      0.12
    );
  },


  ultimate() {

    [
      220,
      330,
      440,
      660,
      880
    ].forEach(
      (note, index) => {

        SoundEngine.tone(
          note,
          0.32,
          "sawtooth",
          0.1,
          index * 0.08
        );
      }
    );
  },


  shield() {

    SoundEngine.chord(
      [
        440,
        554,
        659
      ],
      0.4,
      "sine",
      0.08
    );
  },


  heal() {

    [
      523,
      659,
      784,
      1046
    ].forEach(
      (note, index) => {

        SoundEngine.tone(
          note,
          0.2,
          "sine",
          0.08,
          index * 0.07
        );
      }
    );
  },


  perfect() {

    SoundEngine.tone(
      1046,
      0.11,
      "sine",
      0.14
    );


    SoundEngine.tone(
      1568,
      0.14,
      "sine",
      0.09,
      0.05
    );
  },


  great() {

    SoundEngine.tone(
      880,
      0.1,
      "triangle",
      0.1
    );
  },


  good() {

    SoundEngine.tone(
      660,
      0.09,
      "triangle",
      0.07
    );
  },


  miss() {

    SoundEngine.tone(
      150,
      0.16,
      "sawtooth",
      0.07
    );
  },


  correct() {

    SoundEngine.tone(
      660,
      0.1,
      "sine",
      0.11
    );


    SoundEngine.tone(
      990,
      0.16,
      "sine",
      0.1,
      0.08
    );
  },


  wrong() {

    SoundEngine.tone(
      220,
      0.18,
      "square",
      0.07
    );


    SoundEngine.tone(
      165,
      0.22,
      "square",
      0.06,
      0.09
    );
  },


  victory() {

    [
      523,
      659,
      784,
      1046
    ].forEach(
      (note, index) => {

        SoundEngine.tone(
          note,
          0.35,
          "triangle",
          0.11,
          index * 0.13
        );
      }
    );
  },


  defeat() {

    [
      392,
      330,
      262,
      196
    ].forEach(
      (note, index) => {

        SoundEngine.tone(
          note,
          0.3,
          "triangle",
          0.07,
          index * 0.14
        );
      }
    );
  },


  jump() {

    SoundEngine.tone(
      280,
      0.1,
      "square",
      0.06
    );


    SoundEngine.tone(
      560,
      0.1,
      "square",
      0.04,
      0.06
    );
  },


  mine() {

    SoundEngine.noise(
      0.07,
      0.09
    );


    SoundEngine.tone(
      110,
      0.07,
      "square",
      0.05
    );
  },


  treasure() {

    [
      784,
      988,
      1174,
      1568
    ].forEach(
      (note, index) => {

        SoundEngine.tone(
          note,
          0.2,
          "sine",
          0.09,
          index * 0.07
        );
      }
    );
  },


  gacha() {

    for (
      let i = 0;
      i < 7;
      i++
    ) {

      SoundEngine.tone(
        300 + i * 100,
        0.16,
        "triangle",
        0.07,
        i * 0.08
      );
    }
  }
};


/* =========================================================
   CROWD SOUND
========================================================= */

function crowd(
  strength = 0.5
) {

  for (
    let i = 0;
    i < 6 + strength * 8;
    i++
  ) {

    setTimeout(
      () => {

        SoundEngine.noise(
          rand(15, 35) / 100,
          0.015 +
            Math.random() *
            0.02
        );
      },

      Math.random() * 500
    );
  }
}


/* =========================================================
   ENABLE AUDIO AFTER FIRST INTERACTION
========================================================= */

document.addEventListener(
  "pointerdown",
  () =>
    SoundEngine.resume(),
  {
    once: true
  }
);


/* =========================================================
   SOUND TOGGLE
========================================================= */

const soundToggle =
  $("#soundToggle");


if (soundToggle) {

  soundToggle.onclick =
    () => {

      SoundEngine.enabled =
        !SoundEngine.enabled;


      soundToggle.textContent =
        SoundEngine.enabled
          ? "🔊"
          : "🔇";


      if (
        SoundEngine.enabled
      ) {

        S.click();
      }
    };
}


/* =========================================================
   INSTRUMENT DATA
========================================================= */

const instruments = [

  [
    "Guitar",
    "Strings",
    "🎸",
    78,
    58,
    72,
    76,
    "strum"
  ],

  [
    "Ukulele",
    "Strings",
    "🪕",
    86,
    38,
    70,
    82,
    "strum"
  ],

  [
    "Piano",
    "Keys",
    "🎹",
    62,
    88,
    92,
    70,
    "keys"
  ],

  [
    "Flute",
    "Woodwind",
    "🪈",
    58,
    48,
    96,
    82,
    "wind"
  ],

  [
    "Drums",
    "Percussion",
    "🥁",
    92,
    72,
    38,
    96,
    "drums"
  ],

  [
    "Clarinet",
    "Woodwind",
    "🎶",
    60,
    64,
    88,
    72,
    "wind"
  ],

  [
    "Trumpet",
    "Brass",
    "🎺",
    88,
    54,
    68,
    74,
    "brass"
  ],

  [
    "Violin",
    "Strings",
    "🎻",
    72,
    52,
    98,
    84,
    "bow"
  ],

  [
    "Saxophone",
    "Woodwind",
    "🎷",
    76,
    62,
    88,
    78,
    "wind"
  ],

  [
    "Cello",
    "Strings",
    "🎻",
    70,
    84,
    94,
    58,
    "bow"
  ],

  [
    "Xylophone",
    "Percussion",
    "🔔",
    68,
    50,
    76,
    92,
    "mallet"
  ],

  [
    "Trombone",
    "Brass",
    "🎺",
    84,
    70,
    62,
    64,
    "brass"
  ],

  [
    "Synthesizer",
    "Keys",
    "🎛️",
    74,
    58,
    90,
    86,
    "keys"
  ],

  [
    "French Horn",
    "Brass",
    "📯",
    72,
    82,
    86,
    58,
    "brass"
  ],

  [
    "Oboe",
    "Woodwind",
    "🎼",
    64,
    56,
    94,
    68,
    "wind"
  ],

  [
    "Digital Piano",
    "Keys",
    "🎹",
    68,
    78,
    88,
    78,
    "keys"
  ],

  [
    "Organ",
    "Keys",
    "🎹",
    76,
    92,
    90,
    48,
    "keys"
  ],

  [
    "Drum Machine",
    "Percussion",
    "🎛️",
    82,
    54,
    58,
    100,
    "pads"
  ],

  [
    "Electric Guitar",
    "Strings",
    "🎸",
    94,
    48,
    68,
    88,
    "strum"
  ],

  [
    "Bass Guitar",
    "Strings",
    "🎸",
    86,
    76,
    54,
    90,
    "pluck"
  ],

  [
    "Harp",
    "Strings",
    "🪕",
    52,
    64,
    100,
    72,
    "pluck"
  ],

  [
    "Banjo",
    "Strings",
    "🪕",
    82,
    44,
    64,
    94,
    "pluck"
  ],

  [
    "Mandolin",
    "Strings",
    "🪕",
    80,
    46,
    78,
    90,
    "pluck"
  ],

  [
    "Double Bass",
    "Strings",
    "🎻",
    82,
    90,
    72,
    54,
    "bow"
  ],

  [
    "Accordion",
    "Keys",
    "🪗",
    72,
    74,
    82,
    78,
    "bellows"
  ],

  [
    "Keytar",
    "Keys",
    "🎹",
    86,
    46,
    76,
    92,
    "keys"
  ],

  [
    "Harpsichord",
    "Keys",
    "🎹",
    70,
    60,
    92,
    80,
    "keys"
  ],

  [
    "Marimba",
    "Percussion",
    "🔔",
    66,
    58,
    84,
    94,
    "mallet"
  ],

  [
    "Timpani",
    "Percussion",
    "🥁",
    90,
    86,
    42,
    72,
    "drums"
  ],

  [
    "Bongos",
    "Percussion",
    "🥁",
    78,
    42,
    54,
    98,
    "drums"
  ],

  [
    "Congas",
    "Percussion",
    "🥁",
    82,
    58,
    50,
    94,
    "drums"
  ],

  [
    "Tambourine",
    "Percussion",
    "🪘",
    70,
    34,
    58,
    100,
    "shake"
  ],

  [
    "Steel Pan",
    "Percussion",
    "🛢️",
    68,
    56,
    86,
    88,
    "mallet"
  ],

  [
    "Tuba",
    "Brass",
    "🎺",
    90,
    94,
    54,
    38,
    "brass"
  ],

  [
    "Euphonium",
    "Brass",
    "🎺",
    76,
    84,
    78,
    54,
    "brass"
  ],

  [
    "Cornet",
    "Brass",
    "🎺",
    84,
    58,
    74,
    76,
    "brass"
  ],

  [
    "Piccolo",
    "Woodwind",
    "🪈",
    66,
    32,
    96,
    92,
    "wind"
  ],

  [
    "Bassoon",
    "Woodwind",
    "🎼",
    68,
    86,
    84,
    48,
    "wind"
  ],

  [
    "Recorder",
    "Woodwind",
    "🪈",
    70,
    44,
    78,
    84,
    "wind"
  ],

  [
    "Erhu",
    "World",
    "🎻",
    74,
    54,
    98,
    82,
    "bow"
  ],

  [
    "Guzheng",
    "World",
    "🎶",
    78,
    62,
    96,
    88,
    "pluck"
  ],

  [
    "Pipa",
    "World",
    "🪕",
    84,
    50,
    88,
    92,
    "pluck"
  ],

  [
    "Kalimba",
    "World",
    "🎵",
    58,
    60,
    90,
    86,
    "pluck"
  ],

  [
    "Sitar",
    "World",
    "🪕",
    76,
    64,
    96,
    80,
    "pluck"
  ],

  [
    "Shamisen",
    "World",
    "🪕",
    88,
    48,
    74,
    92,
    "pluck"
  ]

].map(
  (instrument, index) => ({

    name:
      instrument[0],

    family:
      instrument[1],

    icon:
      instrument[2],

    attack:
      instrument[3],

    defense:
      instrument[4],

    melody:
      instrument[5],

    rhythm:
      instrument[6],

    play:
      instrument[7],

    price:
      index === 0
        ? 0
        : 220 + index * 95
  })
);


/* =========================================================
   GET INSTRUMENT
========================================================= */

const getInstrument =
  name =>
    instruments.find(
      instrument =>
        instrument.name === name
    ) ||
    instruments[0];
/* =========================================================
   FALLBACK MOVE SETS
========================================================= */

const moveSets = {

  strum: [
    ["Power Strum", "attack", 1],
    ["Rapid Riff", "rhythm", 0.9],
    ["Harmony Guard", "shield", 0],
    ["Dragon Solo", "ultimate", 1.8]
  ],

  keys: [
    ["Power Chord", "attack", 1],
    ["Rapid Keys", "rhythm", 0.9],
    ["Sustain Shield", "shield", 0],
    ["Grand Crescendo", "ultimate", 1.8]
  ],

  drums: [
    ["Power Beat", "attack", 1],
    ["Drum Roll", "rhythm", 0.95],
    ["Rhythm Barrier", "shield", 0],
    ["Thunder Beat", "ultimate", 1.85]
  ],

  wind: [
    ["Focused Note", "attack", 1],
    ["Rapid Scale", "rhythm", 0.9],
    ["Breath Heal", "heal", 0],
    ["Cyclone Symphony", "ultimate", 1.8]
  ],

  brass: [
    ["Brass Blast", "attack", 1],
    ["Fanfare Rush", "rhythm", 0.92],
    ["Royal Guard", "shield", 0],
    ["Solar Fanfare", "ultimate", 1.85]
  ],

  bow: [
    ["Power Bow", "attack", 1],
    ["Rapid Bow", "rhythm", 0.92],
    ["Harmony Strings", "heal", 0],
    ["Phoenix Symphony", "ultimate", 1.8]
  ],

  mallet: [
    ["Mallet Strike", "attack", 1],
    ["Scale Rush", "rhythm", 0.95],
    ["Resonance", "shield", 0],
    ["Rainbow Cascade", "ultimate", 1.8]
  ],

  pads: [
    ["Beat Drop", "attack", 1],
    ["Pad Rush", "rhythm", 0.98],
    ["Bass Sequence", "shield", 0],
    ["Mega Beat Drop", "ultimate", 1.9]
  ],

  pluck: [
    ["Crystal Pluck", "attack", 1],
    ["Finger Rush", "rhythm", 0.95],
    ["Resonance", "heal", 0],
    ["Starlight Cascade", "ultimate", 1.82]
  ],

  bellows: [
    ["Squeeze Beat", "attack", 1],
    ["Polka Rush", "rhythm", 0.95],
    ["Bellows Guard", "shield", 0],
    ["Festival Frenzy", "ultimate", 1.85]
  ],

  shake: [
    ["Rhythm Shake", "attack", 1],
    ["Jingle Rush", "rhythm", 0.98],
    ["Tempo Guard", "shield", 0],
    ["Carnival Storm", "ultimate", 1.8]
  ]
};


/* =========================================================
   INDIVIDUAL INSTRUMENT MOVES
========================================================= */

const instrumentMoves = {

  Guitar: [
    ["Power Strum", "attack", 1],
    ["Rapid Riff", "rhythm", 0.9],
    ["Harmony Guard", "shield", 0],
    ["Dragon Solo", "ultimate", 1.8]
  ],

  Ukulele: [
    ["Island Strum", "attack", 1],
    ["Sunny Rhythm", "rhythm", 0.92],
    ["Tropical Harmony", "heal", 0],
    ["Paradise Finale", "ultimate", 1.8]
  ],

  Piano: [
    ["Power Chord", "attack", 1],
    ["Rapid Keys", "rhythm", 0.9],
    ["Sustain Shield", "shield", 0],
    ["Grand Crescendo", "ultimate", 1.8]
  ],

  Flute: [
    ["Focused Note", "attack", 1],
    ["Flutter Scale", "rhythm", 0.92],
    ["Breath of Harmony", "heal", 0],
    ["Cyclone Symphony", "ultimate", 1.8]
  ],

  Drums: [
    ["Power Beat", "attack", 1],
    ["Drum Roll", "rhythm", 0.95],
    ["Rhythm Barrier", "shield", 0],
    ["Thunder Beat", "ultimate", 1.85]
  ],

  Clarinet: [
    ["Midnight Tone", "attack", 1],
    ["Silver Scale", "rhythm", 0.92],
    ["Warm Breath", "heal", 0],
    ["Moonlight Rhapsody", "ultimate", 1.82]
  ],

  Trumpet: [
    ["Brass Blast", "attack", 1],
    ["Victory Fanfare", "rhythm", 0.92],
    ["Royal Guard", "shield", 0],
    ["Solar Fanfare", "ultimate", 1.85]
  ],

  Violin: [
    ["Piercing Bow", "attack", 1],
    ["Rapid Arpeggio", "rhythm", 0.94],
    ["Healing Strings", "heal", 0],
    ["Phoenix Symphony", "ultimate", 1.85]
  ],

  Saxophone: [
    ["Jazz Burst", "attack", 1],
    ["Groove Run", "rhythm", 0.95],
    ["Soul Melody", "heal", 0],
    ["Midnight Jazz Storm", "ultimate", 1.85]
  ],

  Cello: [
    ["Deep Bow", "attack", 1],
    ["Resonant Pulse", "rhythm", 0.9],
    ["Cello Sanctuary", "shield", 0],
    ["Titan Concerto", "ultimate", 1.82]
  ],

  Xylophone: [
    ["Bright Strike", "attack", 1],
    ["Rainbow Scale", "rhythm", 0.96],
    ["Resonance Guard", "shield", 0],
    ["Crystal Cascade", "ultimate", 1.82]
  ],

  Trombone: [
    ["Slide Blast", "attack", 1],
    ["Brass Glide", "rhythm", 0.9],
    ["Fortress Tone", "shield", 0],
    ["Titan Slide", "ultimate", 1.85]
  ],

  Synthesizer: [
    ["Synth Pulse", "attack", 1],
    ["Neon Sequence", "rhythm", 0.96],
    ["Digital Barrier", "shield", 0],
    ["Cyber Drop", "ultimate", 1.9]
  ],

  "French Horn": [
    ["Royal Call", "attack", 1],
    ["Noble Fanfare", "rhythm", 0.9],
    ["Castle Guard", "shield", 0],
    ["Kingdom Anthem", "ultimate", 1.85]
  ],

  Oboe: [
    ["Piercing Reed", "attack", 1],
    ["Graceful Scale", "rhythm", 0.92],
    ["Serene Breath", "heal", 0],
    ["Forest Elegy", "ultimate", 1.82]
  ],

  "Digital Piano": [
    ["Digital Chord", "attack", 1],
    ["Velocity Keys", "rhythm", 0.95],
    ["Sustain Matrix", "shield", 0],
    ["Digital Crescendo", "ultimate", 1.85]
  ],

  Organ: [
    ["Cathedral Chord", "attack", 1],
    ["Pipe Resonance", "rhythm", 0.88],
    ["Sanctuary", "heal", 0],
    ["Divine Symphony", "ultimate", 1.9]
  ],

  "Drum Machine": [
    ["Beat Drop", "attack", 1],
    ["Pad Rush", "rhythm", 0.98],
    ["Bass Sequence", "shield", 0],
    ["Mega Beat Drop", "ultimate", 1.9]
  ],

  "Electric Guitar": [
    ["Voltage Slash", "attack", 1.05],
    ["Lightning Riff", "rhythm", 0.98],
    ["Amp Shield", "shield", 0],
    ["Thunderstorm Solo", "ultimate", 1.95]
  ],

  "Bass Guitar": [
    ["Bass Slam", "attack", 1],
    ["Groove Line", "rhythm", 0.98],
    ["Low-End Guard", "shield", 0],
    ["Earthquake Bass", "ultimate", 1.88]
  ],

  Harp: [
    ["Crystal Pluck", "attack", 1],
    ["Angel Strings", "rhythm", 0.92],
    ["Celestial Healing", "heal", 0],
    ["Heavenly Cascade", "ultimate", 1.85]
  ],

  Banjo: [
    ["Country Snap", "attack", 1],
    ["Bluegrass Rush", "rhythm", 0.98],
    ["Porch Harmony", "heal", 0],
    ["Wild West Finale", "ultimate", 1.82]
  ],

  Mandolin: [
    ["Twin Pluck", "attack", 1],
    ["Tremolo Rush", "rhythm", 0.98],
    ["Folk Harmony", "heal", 0],
    ["Festival Storm", "ultimate", 1.85]
  ],

  "Double Bass": [
    ["Deep Resonance", "attack", 1],
    ["Bass Bow Rush", "rhythm", 0.88],
    ["Low Frequency Guard", "shield", 0],
    ["Colossal Symphony", "ultimate", 1.88]
  ],

  Accordion: [
    ["Squeeze Beat", "attack", 1],
    ["Polka Rush", "rhythm", 0.95],
    ["Bellows Guard", "shield", 0],
    ["Festival Frenzy", "ultimate", 1.85]
  ],

  Keytar: [
    ["Keytar Blast", "attack", 1],
    ["Stage Rush", "rhythm", 0.98],
    ["Synth Guard", "shield", 0],
    ["Rockstar Overdrive", "ultimate", 1.9]
  ],

  Harpsichord: [
    ["Baroque Strike", "attack", 1],
    ["Royal Scale", "rhythm", 0.94],
    ["Courtly Guard", "shield", 0],
    ["Golden Fugue", "ultimate", 1.85]
  ],

  Marimba: [
    ["Mallet Strike", "attack", 1],
    ["Marimba Run", "rhythm", 0.98],
    ["Wooden Resonance", "heal", 0],
    ["Tropical Cascade", "ultimate", 1.85]
  ],

  Timpani: [
    ["War Drum", "attack", 1],
    ["Rolling Thunder", "rhythm", 0.9],
    ["Battle Guard", "shield", 0],
    ["Titan Thunder", "ultimate", 1.9]
  ],

  Bongos: [
    ["Bongo Strike", "attack", 1],
    ["Jungle Rhythm", "rhythm", 1],
    ["Tribal Guard", "shield", 0],
    ["Jungle Frenzy", "ultimate", 1.82]
  ],

  Congas: [
    ["Conga Slam", "attack", 1],
    ["Latin Rush", "rhythm", 0.98],
    ["Rhythm Spirit", "heal", 0],
    ["Carnival Inferno", "ultimate", 1.85]
  ],

  Tambourine: [
    ["Rhythm Shake", "attack", 1],
    ["Jingle Rush", "rhythm", 1],
    ["Tempo Guard", "shield", 0],
    ["Carnival Storm", "ultimate", 1.8]
  ],

  "Steel Pan": [
    ["Island Strike", "attack", 1],
    ["Calypso Rush", "rhythm", 0.96],
    ["Tropical Resonance", "heal", 0],
    ["Caribbean Sunrise", "ultimate", 1.85]
  ],

  Tuba: [
    ["Heavy Brass", "attack", 1.05],
    ["Low Brass Pulse", "rhythm", 0.82],
    ["Iron Lung Guard", "shield", 0],
    ["Colossal Fanfare", "ultimate", 1.9]
  ],

  Euphonium: [
    ["Warm Brass", "attack", 1],
    ["Smooth Fanfare", "rhythm", 0.9],
    ["Golden Guard", "shield", 0],
    ["Majestic Anthem", "ultimate", 1.85]
  ],

  Cornet: [
    ["Sharp Fanfare", "attack", 1],
    ["Cornet Rush", "rhythm", 0.94],
    ["Brass Guard", "shield", 0],
    ["Royal Trumpet Storm", "ultimate", 1.85]
  ],

  Piccolo: [
    ["High Note", "attack", 1],
    ["Sky Scale", "rhythm", 1],
    ["Wind Blessing", "heal", 0],
    ["Sonic Whirlwind", "ultimate", 1.82]
  ],

  Bassoon: [
    ["Deep Reed", "attack", 1],
    ["Woodwind Pulse", "rhythm", 0.86],
    ["Forest Guard", "shield", 0],
    ["Ancient Woodland Song", "ultimate", 1.85]
  ],

  Recorder: [
    ["Clear Note", "attack", 1],
    ["Quick Fingering", "rhythm", 0.96],
    ["Gentle Breath", "heal", 0],
    ["Schoolyard Symphony", "ultimate", 1.8]
  ],

  Erhu: [
    ["Silk Bow", "attack", 1],
    ["Dragon Bow Rush", "rhythm", 0.96],
    ["Spirit Strings", "heal", 0],
    ["Celestial Dragon Song", "ultimate", 1.88]
  ],

  Guzheng: [
    ["Silk Pluck", "attack", 1],
    ["River Cascade", "rhythm", 0.98],
    ["Mountain Harmony", "heal", 0],
    ["Ten Thousand Strings", "ultimate", 1.9]
  ],

  Pipa: [
    ["Moon Pluck", "attack", 1],
    ["Flying Fingers", "rhythm", 1],
    ["Jade Harmony", "shield", 0],
    ["Ambush Symphony", "ultimate", 1.9]
  ],

  Kalimba: [
    ["Crystal Thumb", "attack", 1],
    ["Dream Rhythm", "rhythm", 0.96],
    ["Peaceful Resonance", "heal", 0],
    ["Starlight Lullaby", "ultimate", 1.82]
  ],

  Sitar: [
    ["Raga Strike", "attack", 1],
    ["Mystic Scale", "rhythm", 0.94],
    ["Meditation Aura", "heal", 0],
    ["Cosmic Raga", "ultimate", 1.88]
  ],

  Shamisen: [
    ["Samurai Pluck", "attack", 1.05],
    ["Rapid Tsugaru", "rhythm", 1],
    ["Spirit Guard", "shield", 0],
    ["Shogun Finale", "ultimate", 1.9]
  ]
};


/* =========================================================
   GET AN INSTRUMENT'S MOVE SET
========================================================= */

function getInstrumentMoves(name) {

  const instrument =
    getInstrument(name);


  return (
    instrumentMoves[
      instrument.name
    ] ||
    moveSets[
      instrument.play
    ] ||
    moveSets.strum
  );
}


/* =========================================================
   PLAY INSTRUMENT SOUND
========================================================= */

function playInstrument(
  name,
  note = 440
) {

  const playType =
    getInstrument(name).play;


  const soundMap = {

    strum: [
      "triangle",
      0.22
    ],

    keys: [
      "sine",
      0.3
    ],

    drums: [
      "square",
      0.1
    ],

    wind: [
      "sine",
      0.42
    ],

    brass: [
      "sawtooth",
      0.28
    ],

    bow: [
      "triangle",
      0.5
    ],

    mallet: [
      "sine",
      0.15
    ],

    pads: [
      "square",
      0.16
    ],

    pluck: [
      "triangle",
      0.18
    ],

    bellows: [
      "sawtooth",
      0.38
    ],

    shake: [
      "square",
      0.08
    ]
  };


  if (
    playType === "drums" ||
    playType === "shake"
  ) {

    SoundEngine.noise(
      0.12,
      0.12
    );
  }


  const [
    type,
    duration
  ] =
    soundMap[
      playType
    ] ||
    [
      "sine",
      0.2
    ];


  SoundEngine.tone(
    note,
    duration,
    type,
    0.08
  );
}
/* =========================================================
   DEFAULT PLAYER PROFILE
========================================================= */

const defaultProfile = {

  name: "",

  level: 1,

  xp: 0,

  totalXp: 0,

  coins: 500,

  dust: 0,

  owned: [
    "Guitar"
  ],

  equipped:
    "Guitar",

  mastery: {},

  instrumentUpgrades: {},

  instrumentEvolutions: {},

  wins: 0,

  losses: 0,

  avatar: {

    preset:
      "Hero",

    skin:
      "#dca57b",

    hair:
      "#201915",

    outfit:
      "#19345b"
  },

  inventory: [],

  equipmentInventory: [

    {
      name:
        "Starter Headphones",

      slot:
        "Head",

      attack:
        1,

      defense:
        0
    },

    {
      name:
        "Canvas Jacket",

      slot:
        "Body",

      attack:
        0,

      defense:
        2
    }
  ],

  equippedGear: {},

  pets: [],

  petEggs: [],

  equippedPet:
    null,

  materials: {},

  quests: {},

  rpg: {

    zone:
      0,

    x:
      1,

    y:
      1,

    hp:
      100,

    maxHp:
      100,

    storyStep:
      0
  },

  dailyRewards: {

    lastClaim:
      "",

    streak:
      0
  },

  skillTree: {

    power1:
      0,

    power2:
      0,

    power3:
      0,

    rhythm1:
      0,

    rhythm2:
      0,

    rhythm3:
      0,

    harmony1:
      0,

    harmony2:
      0,

    harmony3:
      0
  }
};


/* =========================================================
   LOAD PLAYER PROFILE
========================================================= */

let profile = {

  ...defaultProfile,

  ...load(
    "musicverseProfile",
    {}
  )
};


/* =========================================================
   REPAIR / NORMALIZE SAVED PROFILE
========================================================= */

profile.avatar = {

  ...defaultProfile.avatar,

  ...(
    profile.avatar ||
    {}
  )
};


profile.owned =
  Array.isArray(
    profile.owned
  )
    ? profile.owned
    : [
        "Guitar"
      ];


if (
  !profile.owned.includes(
    "Guitar"
  )
) {

  profile.owned.unshift(
    "Guitar"
  );
}


profile.mastery =
  profile.mastery ||
  {};


profile.inventory =
  profile.inventory ||
  [];


profile.instrumentUpgrades =
  profile.instrumentUpgrades ||
  {};


profile.instrumentEvolutions =
  profile.instrumentEvolutions ||
  {};


profile.equipmentInventory =
  Array.isArray(
    profile.equipmentInventory
  )
    ? profile.equipmentInventory
    : defaultProfile.equipmentInventory;


profile.equippedGear =
  profile.equippedGear ||
  {};


profile.pets =
  Array.isArray(
    profile.pets
  )
    ? profile.pets
    : [];


profile.petEggs =
  Array.isArray(
    profile.petEggs
  )
    ? profile.petEggs
    : [];


profile.materials =
  profile.materials ||
  {};


profile.quests =
  profile.quests ||
  {};


profile.rpg = {

  ...defaultProfile.rpg,

  ...(
    profile.rpg ||
    {}
  )
};


profile.dailyRewards = {

  ...defaultProfile.dailyRewards,

  ...(
    profile.dailyRewards ||
    {}
  )
};


profile.skillTree = {

  ...defaultProfile.skillTree,

  ...(
    profile.skillTree ||
    {}
  )
};


profile.coins =
  Math.max(
    0,
    Number(
      profile.coins
    ) ||
    0
  );


/* =========================================================
   SAVE PLAYER PROFILE
========================================================= */

function persist() {

  save(
    "musicverseProfile",
    profile
  );
}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function toast(text) {

  const element =
    $("#toast");


  element.textContent =
    text;


  element.classList.add(
    "show"
  );


  clearTimeout(
    toast.t
  );


  toast.t =
    setTimeout(
      () =>
        element.classList.remove(
          "show"
        ),
      2200
    );
}


/* =========================================================
   PLAYER EXP
========================================================= */

function getPlayerXPNeeded() {

  return Math.round(

    100 +

    (
      profile.level -
      1
    ) *
    35
  );
}


/* =========================================================
   ADD PLAYER EXP
========================================================= */

function addXP(amount) {

  amount =
    Math.max(
      0,
      Math.round(
        amount
      )
    );


  profile.xp +=
    amount;


  profile.totalXp +=
    amount;


  let levels =
    0;


  let needed =
    getPlayerXPNeeded();


/* =========================================================
   LEVEL UP LOOP
========================================================= */

  while (
    profile.xp >=
    needed
  ) {

    profile.xp -=
      needed;


    profile.level++;


    profile.coins +=
      20;


    levels++;


    needed =
      getPlayerXPNeeded();
  }


  persist();

  updateProfileUI();

  renderLeaderboard();


  if (
    typeof renderSkillTree ===
    "function"
  ) {

    renderSkillTree();
  }


/* =========================================================
   LEVEL UP SOUND
========================================================= */

  if (
    levels
  ) {

    S.level();


    toast(
      `🎉 Level ${profile.level}! +20 Coins`
    );
  }


/* =========================================================
   NORMAL EXP SOUND
========================================================= */

  else if (
    amount
  ) {

    S.xp();
  }


  return amount;
}


/* =========================================================
   INSTRUMENT MASTERY
========================================================= */

function addMastery(
  name,
  amount
) {

  profile.mastery[
    name
  ] =
    (
      profile.mastery[
        name
      ] ||
      0
    ) +
    Math.max(
      0,
      Math.round(
        amount
      )
    );


  persist();
}


/* =========================================================
   GET INSTRUMENT UPGRADE DATA
========================================================= */

function getInstrumentUpgradeData(
  name
) {

  if (
    !profile.instrumentUpgrades[
      name
    ]
  ) {

    profile.instrumentUpgrades[
      name
    ] = {

      level:
        1,

      xp:
        0
    };
  }


  return profile.instrumentUpgrades[
    name
  ];
}


/* =========================================================
   INSTRUMENT EXP NEEDED
========================================================= */

function getInstrumentXPNeeded(
  name
) {

  const data =
    getInstrumentUpgradeData(
      name
    );


  return Math.round(

    120 +

    (
      data.level -
      1
    ) *
    90
  );
}


/* =========================================================
   ADD INSTRUMENT EXP
========================================================= */

function addInstrumentXP(
  name,
  amount
) {

  const data =
    getInstrumentUpgradeData(
      name
    );


  if (
    data.level >=
    20
  ) {

    return;
  }


  data.xp +=
    Math.max(
      0,
      Math.round(
        amount
      )
    );


  persist();


  if (
    data.xp >=
    getInstrumentXPNeeded(
      name
    )
  ) {

    toast(
      `🎵 ${name} can be upgraded!`
    );
  }


  renderInstruments();

  renderInstrumentUpgradePanel();
}


/* =========================================================
   UPGRADE INSTRUMENT
========================================================= */

function upgradeInstrument(
  name
) {

  const data =
    getInstrumentUpgradeData(
      name
    );


  const needed =
    getInstrumentXPNeeded(
      name
    );


  if (
    data.level >=
    20
  ) {

    return toast(
      `${name} is already max level!`
    );
  }


  if (
    data.xp <
    needed
  ) {

    return toast(
      `Need ${
        needed -
        data.xp
      } more Instrument EXP.`
    );
  }


  data.xp -=
    needed;


  data.level++;


  persist();


  S.level();


  toast(
    `🎉 ${name} upgraded to Level ${data.level}!`
  );


  renderInstruments();

  refreshBattle(
    false
  );

  renderEvolutionPanel();

  renderInstrumentUpgradePanel(
    name
  );
}


/* =========================================================
   EVOLUTION BONUS
========================================================= */

function getEvolutionBonus(
  name
) {

  const evolution =
    profile.instrumentEvolutions[
      name
    ];


  return evolution
    ? 1.1
    : 1;
}


/* =========================================================
   EQUIPPED GEAR BONUSES
========================================================= */

function getGearBonuses() {

  return Object.values(
    profile.equippedGear ||
    {}
  ).reduce(

    (
      bonuses,
      gear
    ) => {

      if (
        gear
      ) {

        bonuses.attack +=
          gear.attack ||
          0;


        bonuses.defense +=
          gear.defense ||
          0;


        bonuses.melody +=
          gear.melody ||
          0;


        bonuses.rhythm +=
          gear.rhythm ||
          0;
      }


      return bonuses;
    },

    {

      attack:
        0,

      defense:
        0,

      melody:
        0,

      rhythm:
        0
    }
  );
}


/* =========================================================
   EQUIPPED PET BONUS
========================================================= */

function getPetBonus() {

  const pet =
    profile.pets.find(
      pet =>
        pet.id ===
        profile.equippedPet
    );


  if (
    !pet
  ) {

    return {

      attack:
        0,

      defense:
        0,

      melody:
        0,

      rhythm:
        0
    };
  }


  const level =
    pet.level ||
    1;


  const base =
    Math.max(
      1,
      Math.floor(
        level /
        2
      )
    );


  if (
    pet.type ===
    "attack"
  ) {

    return {

      attack:
        base,

      defense:
        0,

      melody:
        0,

      rhythm:
        0
    };
  }


  if (
    pet.type ===
    "melody"
  ) {

    return {

      attack:
        0,

      defense:
        0,

      melody:
        base,

      rhythm:
        0
    };
  }


  if (
    pet.type ===
    "defense"
  ) {

    return {

      attack:
        0,

      defense:
        base,

      melody:
        0,

      rhythm:
        0
    };
  }


  return {

    attack:
      base,

    defense:
      base,

    melody:
      base,

    rhythm:
      base
  };
}


/* =========================================================
   GET FULL UPGRADED INSTRUMENT STATS
========================================================= */

function getUpgradedInstrument(
  name
) {

  const base =
    getInstrument(
      name
    );


  const upgrade =
    getInstrumentUpgradeData(
      name
    );


  const multiplier =

    (
      1 +
      (
        upgrade.level -
        1
      ) *
      0.01
    ) *

    getEvolutionBonus(
      name
    );


  const gear =
    getGearBonuses();


  const pet =
    getPetBonus();


  return {

    ...base,

    attack:
      Math.round(

        base.attack *
        multiplier +

        gear.attack +

        pet.attack
      ),

    defense:
      Math.round(

        base.defense *
        multiplier +

        gear.defense +

        pet.defense
      ),

    melody:
      Math.round(

        base.melody *
        multiplier +

        gear.melody +

        pet.melody
      ),

    rhythm:
      Math.round(

        base.rhythm *
        multiplier +

        gear.rhythm +

        pet.rhythm
      )
  };
}


/* =========================================================
   PET EXP
========================================================= */

function addPetXP(
  id,
  amount
) {

  const pet =
    profile.pets.find(
      pet =>
        pet.id ===
        id
    );


  if (
    !pet
  ) {

    return;
  }


  const petBonus =

    typeof getSkillBonuses ===
    "function"

      ? getSkillBonuses()
        .petXpPct

      : 0;


  amount =
    Math.round(

      amount *
      (
        1 +
        petBonus
      )
    );


  pet.xp =
    (
      pet.xp ||
      0
    ) +
    Math.max(
      0,
      Math.round(
        amount
      )
    );


  let needed =
    (
      pet.level ||
      1
    ) *
    40;


/* =========================================================
   PET LEVEL UP LOOP
========================================================= */

  while (
    pet.xp >=
      needed &&
    pet.level <
      20
  ) {

    pet.xp -=
      needed;


    pet.level++;


    needed =
      pet.level *
      40;


    toast(
      `🐾 ${pet.name} reached Level ${pet.level}!`
    );
  }


  persist();

  renderPets();
}


/* =========================================================
   REWARD HELPER
========================================================= */

function reward(
  xp,
  coins = 0,
  message = "Reward earned!"
) {

  addXP(
    xp
  );


  profile.coins +=
    coins;


  persist();

  updateProfileUI();


  if (
    coins
  ) {

    S.coin();
  }


  toast(
    `${message} +${xp} EXP${
      coins
        ? ` • +${coins} Coins`
        : ""
    }`
  );
}


/* =========================================================
   UPDATE PROFILE UI
========================================================= */

function updateProfileUI() {

  [
    "coinTop",
    "heroCoins",
    "gachaCoins"
  ].forEach(
    id => {

      if (
        $("#" + id)
      ) {

        $("#" + id).textContent =
          profile.coins.toLocaleString();
      }
    }
  );


  $("#levelTop").textContent =
    profile.level;


  $("#heroName").textContent =
    profile.name ||
    "Player";


  $("#heroLevel").textContent =
    profile.level;


  $("#heroDust").textContent =
    profile.dust;


  $("#gachaDust").textContent =
    profile.dust;


  $("#heroLifetime").textContent =
    profile.totalXp.toLocaleString();


  const needed =
    getPlayerXPNeeded();


  $("#xpText").textContent =
    `${profile.xp} / ${needed}`;


  $("#xpFill").style.width =
    `${
      Math.min(
        100,
        profile.xp /
        needed *
        100
      )
    }%`;


  document.documentElement
  .style
  .setProperty(
    "--avatar-skin",
    profile.avatar.skin
  );


  document.documentElement
  .style
  .setProperty(
    "--avatar-outfit",
    profile.avatar.outfit
  );
}


/* =========================================================
   PROFILE SETUP
========================================================= */

function setupProfile() {

  const presets = [

    "Hero",
    "Swift",
    "Power",
    "Star",
    "Neo",
    "Legend"
  ];


  const skins = [

    [
      "Light",
      "#f2c8a8"
    ],

    [
      "Warm",
      "#dca57b"
    ],

    [
      "Tan",
      "#bd8058"
    ],

    [
      "Deep",
      "#8d5d42"
    ],

    [
      "Dark",
      "#5d3a2c"
    ]
  ];


  const hairs = [

    [
      "Black",
      "#151515"
    ],

    [
      "Dark Brown",
      "#201915"
    ],

    [
      "Brown",
      "#4c2e20"
    ],

    [
      "Blonde",
      "#c49a5a"
    ],

    [
      "Silver",
      "#aeb6c0"
    ]
  ];


  const outfits = [

    [
      "Royal Navy",
      "#19345b"
    ],

    [
      "Crimson",
      "#6c2636"
    ],

    [
      "Emerald",
      "#1f5a48"
    ],

    [
      "Purple",
      "#52376f"
    ],

    [
      "Midnight",
      "#111827"
    ]
  ];


/* =========================================================
   SETUP SELECT OPTIONS
========================================================= */

  $("#avatarPresetSelect").innerHTML =
    presets
    .map(
      preset =>
        `<option>${preset}</option>`
    )
    .join("");


  $("#skinSelect").innerHTML =
    skins
    .map(
      option =>
        `<option value="${option[1]}">${option[0]}</option>`
    )
    .join("");


  $("#hairSelect").innerHTML =
    hairs
    .map(
      option =>
        `<option value="${option[1]}">${option[0]}</option>`
    )
    .join("");


  $("#outfitSelect").innerHTML =
    outfits
    .map(
      option =>
        `<option value="${option[1]}">${option[0]}</option>`
    )
    .join("");


/* =========================================================
   LOAD SAVED AVATAR VALUES
========================================================= */

  $("#avatarPresetSelect").value =
    profile.avatar.preset;


  $("#skinSelect").value =
    profile.avatar.skin;


  $("#hairSelect").value =
    profile.avatar.hair;


  $("#outfitSelect").value =
    profile.avatar.outfit;


/* =========================================================
   UPDATE AVATAR PREVIEW
========================================================= */

  const preview =
    () => {

      $("#previewHead").style.background =
        $("#skinSelect").value;


      $("#previewHair").style.background =
        $("#hairSelect").value;


      $("#previewBody").style.background =
        $("#outfitSelect").value;


      $$(".preview-arm, .preview-leg")
      .forEach(
        part => {

          part.style.background =
            $("#outfitSelect").value;
        }
      );
    };


  [
    "avatarPresetSelect",
    "skinSelect",
    "hairSelect",
    "outfitSelect"
  ].forEach(
    id => {

      $("#" + id).onchange =
        preview;
    }
  );


  preview();


/* =========================================================
   SHOW SETUP IF NO NAME
========================================================= */

  if (
    !profile.name
  ) {

    $("#setupOverlay")
    .classList
    .remove(
      "hidden"
    );
  }


/* =========================================================
   START GAME BUTTON
========================================================= */

  $("#startBtn").onclick =
    () => {

      const name =
        $("#playerNameInput")
        .value
        .trim();


      if (
        !name
      ) {

        $("#setupError").textContent =
          "Please enter a stage name.";


        return;
      }


      profile.name =
        name;


      profile.avatar = {

        preset:
          $("#avatarPresetSelect").value,

        skin:
          $("#skinSelect").value,

        hair:
          $("#hairSelect").value,

        outfit:
          $("#outfitSelect").value
      };


      persist();


      $("#setupOverlay")
      .classList
      .add(
        "hidden"
      );


      updateProfileUI();


      refreshBattle(
        true
      );


      S.victory();
    };


/* =========================================================
   ENTER KEY START
========================================================= */

  $("#playerNameInput")
  .addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Enter"
      ) {

        $("#startBtn")
        .click();
      }
    }
  );
}
/* =========================================================
   INSTRUMENT LIBRARY
========================================================= */

let activeFamily =
  "All";


/* =========================================================
   RENDER INSTRUMENT FAMILIES
========================================================= */

function renderFamilies() {

  const families = [
    "All",
    ...new Set(
      instruments.map(
        instrument =>
          instrument.family
      )
    )
  ];


  $("#familyTabs").innerHTML =
    families
    .map(
      family => `

        <button
          class="${
            family === activeFamily
              ? "active"
              : ""
          }"
          data-family="${family}"
        >
          ${family}
        </button>
      `
    )
    .join("");


  $$("[data-family]")
  .forEach(
    button => {

      button.onclick =
        () => {

          activeFamily =
            button.dataset.family;


          renderFamilies();

          renderInstruments();
        };
    }
  );
}


/* =========================================================
   RENDER INSTRUMENTS
========================================================= */

function renderInstruments() {

  const query =
    $("#instrumentSearch")
    .value
    .toLowerCase();


  const list =
    instruments.filter(
      instrument =>

        (
          activeFamily ===
            "All" ||

          instrument.family ===
            activeFamily
        ) &&

        instrument.name
        .toLowerCase()
        .includes(
          query
        )
    );


  $("#instrumentGrid").innerHTML =
    list
    .map(
      instrument => {

        const owned =
          profile.owned.includes(
            instrument.name
          );


        const equipped =
          profile.equipped ===
          instrument.name;


        const upgrade =
          getInstrumentUpgradeData(
            instrument.name
          );


        const needed =
          getInstrumentXPNeeded(
            instrument.name
          );


        const upgraded =
          getUpgradedInstrument(
            instrument.name
          );


        const evolution =
          profile.instrumentEvolutions[
            instrument.name
          ];


        return `

          <article
            class="instrument-card ${
              equipped
                ? "equipped"
                : ""
            }"
          >

            <div class="instrument-icon">
              ${instrument.icon}
            </div>


            <h3>
              ${
                evolution
                  ? evolution.name
                  : instrument.name
              }
            </h3>


            <p>

              ${instrument.family}

              • Mastery ${
                profile.mastery[
                  instrument.name
                ] ||
                0
              }

              ${
                evolution
                  ? " • EVOLVED"
                  : ""
              }

            </p>


            ${
              owned
                ? `

                  <div class="instrument-level-row">

                    <strong>
                      Level ${upgrade.level}
                    </strong>


                    <span>

                      ${
                        upgrade.level >=
                        20

                          ? "MAX"

                          : `${upgrade.xp} / ${needed} EXP`
                      }

                    </span>

                  </div>


                  <div class="instrument-xp-bar">

                    <i
                      style="
                        width:${
                          upgrade.level >=
                          20

                            ? 100

                            : Math.min(
                                100,
                                upgrade.xp /
                                needed *
                                100
                              )
                        }%
                      "
                    ></i>

                  </div>
                `

                : ""
            }


            <div class="stat-line">

              <span>
                ATK ${upgraded.attack}
              </span>

              <span>
                DEF ${upgraded.defense}
              </span>

              <span>
                MEL ${upgraded.melody}
              </span>

              <span>
                RHY ${upgraded.rhythm}
              </span>

            </div>


            <div class="instrument-actions">

              ${
                owned

                  ? `

                    <button
                      class="btn ${
                        equipped
                          ? "gold"
                          : "ghost"
                      }"
                      data-equip="${instrument.name}"
                    >

                      ${
                        equipped
                          ? "Equipped"
                          : "Equip"
                      }

                    </button>


                    <button
                      class="btn ${
                        upgrade.xp >=
                          needed &&
                        upgrade.level <
                          20

                          ? "gold"

                          : "ghost"
                      }"

                      data-upgrade-instrument="${instrument.name}"

                      ${
                        upgrade.xp <
                          needed ||
                        upgrade.level >=
                          20

                          ? "disabled"

                          : ""
                      }
                    >

                      ${
                        upgrade.level >=
                        20

                          ? "MAX"

                          : "Upgrade"
                      }

                    </button>
                  `

                  : `

                    <button
                      class="btn gold"
                      data-buy="${instrument.name}"
                    >

                      🪙 ${instrument.price}

                    </button>
                  `
              }

            </div>

          </article>
        `;
      }
    )
    .join("");


/* =========================================================
   BUY INSTRUMENT
========================================================= */

  $$("[data-buy]")
  .forEach(
    button => {

      button.onclick =
        () => {

          const instrument =
            getInstrument(
              button.dataset.buy
            );


          if (
            profile.coins <
            instrument.price
          ) {

            return toast(
              "Not enough coins."
            );
          }


          profile.coins -=
            instrument.price;


          profile.owned.push(
            instrument.name
          );


          profile.equipped =
            instrument.name;


          persist();

          updateProfileUI();

          renderInstruments();

          refreshBattle(
            true
          );


          S.coin();
        };
    }
  );


/* =========================================================
   EQUIP INSTRUMENT
========================================================= */

  $$("[data-equip]")
  .forEach(
    button => {

      button.onclick =
        () => {

          profile.equipped =
            button.dataset.equip;


          persist();


          renderInstruments();


          refreshBattle(
            true
          );


          renderEvolutionPanel();


          renderInstrumentUpgradePanel();


          S.click();
        };
    }
  );


/* =========================================================
   UPGRADE INSTRUMENT BUTTON
========================================================= */

  $$("[data-upgrade-instrument]")
  .forEach(
    button => {

      button.onclick =
        () =>
          upgradeInstrument(
            button.dataset
            .upgradeInstrument
          );
    }
  );


  renderBattleInstrumentSelect();
}


/* =========================================================
   INSTRUMENT SEARCH
========================================================= */

$("#instrumentSearch").oninput =
  renderInstruments;


/* =========================================================
   BATTLE INSTRUMENT SELECT
========================================================= */

function renderBattleInstrumentSelect() {

  const oldSelection =
    $("#battleInstrumentSelect")
    .value;


  $("#battleInstrumentSelect").innerHTML =
    profile.owned
    .map(
      name => `

        <option
          ${
            name ===
            profile.equipped

              ? "selected"

              : ""
          }
        >
          ${name}
        </option>
      `
    )
    .join("");


  if (
    profile.owned.includes(
      oldSelection
    )
  ) {

    $("#battleInstrumentSelect").value =
      oldSelection;
  }
}


/* =========================================================
   CHANGE BATTLE INSTRUMENT
========================================================= */

$("#battleInstrumentSelect").onchange =
  () => {

    profile.equipped =
      $("#battleInstrumentSelect")
      .value;


    persist();


    renderInstruments();


    refreshBattle(
      true
    );
  };


/* =========================================================
   SOLO BATTLE
========================================================= */

let battle =
  {};


const botNames = [

  "BeatKnight",

  "PianoNova",

  "RhythmFox",

  "StringStorm",

  "TempoAce",

  "ChordKing",

  "MelodyMint",

  "BassOrbit",

  "JazzPixel"
];


/* =========================================================
   CREATE / REFRESH SOLO BATTLE
========================================================= */

function refreshBattle(
  newEnemy = false
) {

  const playerInstrument =
    getInstrument(
      profile.equipped
    );


  if (
    newEnemy ||
    !battle.enemy
  ) {

    const enemyInstrument =
      pick(
        instruments
      );


    battle = {

      playerHp:
        Math.round(
          100 +
          playerInstrument.defense *
          0.4
        ),

      playerMax:
        Math.round(
          100 +
          playerInstrument.defense *
          0.4
        ),

      enemyHp:
        Math.round(
          100 +
          enemyInstrument.defense *
          0.4
        ),

      enemyMax:
        Math.round(
          100 +
          enemyInstrument.defense *
          0.4
        ),

      enemy: {

        name:
          pick(
            botNames
          ),

        instrument:
          enemyInstrument.name
      },

      energy:
        0,

      shield:
        false,

      busy:
        false
    };
  }


  $("#playerBattleName").textContent =
    profile.name ||
    "Player";


  $("#playerInstrumentLabel").textContent =
    profile.equipped;


  $("#cpuBattleName").textContent =
    battle.enemy.name;


  $("#cpuInstrumentLabel").textContent =
    battle.enemy.instrument;


  renderSoloBattle();
}


/* =========================================================
   RENDER SOLO BATTLE
========================================================= */

function renderSoloBattle() {

  const playerInstrument =
    getInstrument(
      profile.equipped
    );


  const moves =
    getInstrumentMoves(
      profile.equipped
    );


/* =========================================================
   HP BARS
========================================================= */

  $("#playerHpFill").style.width =
    `${
      100 *
      battle.playerHp /
      battle.playerMax
    }%`;


  $("#cpuHpFill").style.width =
    `${
      100 *
      battle.enemyHp /
      battle.enemyMax
    }%`;


  $("#playerHpText").textContent =
    `${battle.playerHp} / ${battle.playerMax}`;


  $("#cpuHpText").textContent =
    `${battle.enemyHp} / ${battle.enemyMax}`;


/* =========================================================
   ENERGY
========================================================= */

  $("#energyPips").innerHTML =
    [
      0,
      1,
      2
    ]
    .map(
      index => `

        <i
          class="${
            index <
            battle.energy

              ? "on"

              : ""
          }"
        ></i>
      `
    )
    .join("");


/* =========================================================
   MOVE BUTTONS
========================================================= */

  $("#moveButtons").innerHTML =
    moves
    .map(
      (
        move,
        index
      ) => `

        <button
          class="
            move-btn
            ${
              index === 3
                ? "ultimate"
                : ""
            }
          "

          data-solo-move="${index}"

          ${
            battle.busy ||
            (
              index === 3 &&
              battle.energy < 3
            )

              ? "disabled"

              : ""
          }
        >

          <strong>
            ${move[0]}
          </strong>


          <span>

            ${
              index === 3

                ? "ULTIMATE • 3 ENERGY"

                : move[1]
                  .toUpperCase()
            }

          </span>


          <small>

            ${
              move[1] ===
              "heal"

                ? "Restore HP"

                : move[1] ===
                  "shield"

                  ? "Block next hit"

                  : "Deal musical damage"
            }

          </small>

        </button>
      `
    )
    .join("");


  $$("[data-solo-move]")
  .forEach(
    button => {

      button.onclick =
        () =>
          soloMove(
            +button.dataset
            .soloMove
          );
    }
  );
}


/* =========================================================
   SOLO BATTLE MOVE
========================================================= */

async function soloMove(
  index
) {

  if (
    battle.busy
  ) {

    return;
  }


  battle.busy =
    true;


  const instrument =
    getUpgradedInstrument(
      profile.equipped
    );


  const move =
    getInstrumentMoves(
      profile.equipped
    )[
      index
    ];


  let text =
    "";


  playInstrument(

    instrument.name,

    index === 3
      ? 660
      : 440
  );


/* =========================================================
   HEAL MOVE
========================================================= */

  if (
    move[1] ===
    "heal"
  ) {

    const healing =
      Math.round(

        instrument.melody *
        0.25 +
        12
      );


    battle.playerHp =
      clamp(

        battle.playerHp +
        healing,

        0,

        battle.playerMax
      );


    battle.energy =
      clamp(

        battle.energy +
        1,

        0,

        3
      );


    text =
      `${move[0]} restored ${healing} HP.`;


    S.heal();
  }


/* =========================================================
   SHIELD MOVE
========================================================= */

  else if (
    move[1] ===
    "shield"
  ) {

    battle.shield =
      true;


    battle.energy =
      clamp(

        battle.energy +
        1,

        0,

        3
      );


    text =
      `${move[0]} created a musical shield.`;


    S.shield();
  }


/* =========================================================
   ATTACK / RHYTHM / ULTIMATE
========================================================= */

  else {

    let multiplier =
      move[2];


/* =========================================================
   ULTIMATE
========================================================= */

    if (
      index === 3
    ) {

      battle.energy =
        0;


      S.ultimate();
    }


/* =========================================================
   NORMAL MOVE
========================================================= */

    else {

      battle.energy =
        clamp(

          battle.energy +
          1,

          0,

          3
        );
    }


/* =========================================================
   DAMAGE
========================================================= */

    let damage =
      Math.max(

        6,

        Math.round(

          (
            instrument.attack *
            0.32 +

            instrument.rhythm *
            0.12 +

            rand(
              -3,
              7
            )
          ) *

          multiplier -

          getInstrument(
            battle.enemy.instrument
          ).defense *
          0.06
        )
      );


/* =========================================================
   CRITICAL HIT
========================================================= */

    const critical =
      Math.random() <
      0.08 +
      instrument.melody /
      1200;


    if (
      critical
    ) {

      damage =
        Math.round(
          damage *
          1.5
        );


      S.critical();
    }

    else {

      S.attack();
    }


    battle.enemyHp =
      clamp(

        battle.enemyHp -
        damage,

        0,

        battle.enemyMax
      );


    text =
      `${move[0]} dealt ${damage}${
        critical
          ? " CRITICAL"
          : ""
      } damage.`;


    addMastery(

      instrument.name,

      2
    );
  }


/* =========================================================
   UPDATE BATTLE TEXT
========================================================= */

  $("#battleStatus").textContent =
    text;


  $("#battleLog").textContent =
    text;


  renderSoloBattle();


/* =========================================================
   PLAYER VICTORY
========================================================= */

  if (
    battle.enemyHp <=
    0
  ) {

    battle.busy =
      false;


    profile.wins++;


    progressQuest(

      "battle",

      1
    );


    reward(

      24,

      18,

      "Battle won!"
    );


    addInstrumentXP(

      profile.equipped,

      6
    );


    S.victory();


    setTimeout(
      () =>
        refreshBattle(
          true
        ),
      1000
    );


    return;
  }


/* =========================================================
   ENEMY TURN
========================================================= */

  await wait(
    700
  );


  const enemyInstrument =
    getInstrument(
      battle.enemy.instrument
    );


  let enemyDamage =
    Math.max(

      5,

      Math.round(

        enemyInstrument.attack *
        0.28 +

        rand(
          -3,
          5
        ) -

        instrument.defense *
        0.05
      )
    );


/* =========================================================
   PLAYER SHIELD
========================================================= */

  if (
    battle.shield
  ) {

    enemyDamage =
      Math.round(
        enemyDamage *
        0.5
      );


    battle.shield =
      false;
  }


  battle.playerHp =
    clamp(

      battle.playerHp -
      enemyDamage,

      0,

      battle.playerMax
    );


  playInstrument(

    enemyInstrument.name,

    330
  );


  S.attack();


  $("#battleStatus").textContent =
    `${battle.enemy.name} dealt ${enemyDamage} damage.`;


  $("#battleLog").textContent =
    `${text} • Enemy hit for ${enemyDamage}.`;


  battle.busy =
    false;


  renderSoloBattle();


/* =========================================================
   PLAYER DEFEAT
========================================================= */

  if (
    battle.playerHp <=
    0
  ) {

    profile.losses++;


    addXP(
      4
    );


    S.defeat();


    toast(
      "Defeat. +4 EXP"
    );


    setTimeout(
      () =>
        refreshBattle(
          true
        ),
      1000
    );
  }
}


/* =========================================================
   NEW OPPONENT BUTTON
========================================================= */

$("#newOpponentBtn").onclick =
  () =>
    refreshBattle(
      true
    );
/* =========================================================
   TEAM BATTLE
========================================================= */

let multiplayerState = {

  size: 10,

  blue: [],

  red: [],

  playing: false,

  round: 0,

  playerEnergy: 0,

  waiting: false,

  resolve: null,

  blueHP: 10000,

  redHP: 10000,

  maxTeamHP: 10000
};


/* =========================================================
   CREATE TEAM PLAYER
========================================================= */

function makeTeamPlayer(
  team,
  index
) {

  const human =
    team === "blue" &&
    index === 0;


  const instrument =
    human

      ? getInstrument(
          profile.equipped
        )

      : pick(
          instruments
        );


  return {

    id:
      `${team}-${index}-${Math.random()}`,

    team,

    human,

    name:
      human

        ? (
            profile.name ||
            "Player"
          )

        : pick(
            botNames
          ) +
          rand(
            1,
            99
          ),

    instrument:
      instrument.name,

    icon:
      instrument.icon,

    attack:
      instrument.attack,

    defense:
      instrument.defense,

    melody:
      instrument.melody,

    rhythm:
      instrument.rhythm
  };
}


/* =========================================================
   OPEN TEAM BATTLE LOBBY
========================================================= */

function openLobby(
  size
) {

  if (
    multiplayerState.playing
  ) {

    return;
  }


  multiplayerState.size =
    size;


  multiplayerState.blue =
    Array.from(
      {
        length: size
      },

      (
        _,
        index
      ) =>
        makeTeamPlayer(
          "blue",
          index
        )
    );


  multiplayerState.red =
    Array.from(
      {
        length: size
      },

      (
        _,
        index
      ) =>
        makeTeamPlayer(
          "red",
          index
        )
    );


  multiplayerState.blueHP =
    multiplayerState.redHP =
    multiplayerState.maxTeamHP =
    10000;


  multiplayerState.playerEnergy =
    0;


  multiplayerState.round =
    0;


  $("#concertRoundLabel").textContent =
    "LOBBY";


  $("#startTeamBattleBtn").disabled =
    false;


  $("#startTeamBattleBtn").textContent =
    "Start Concert Battle";


  $("#teamMovePanel")
  .classList
  .add(
    "hidden"
  );


  renderConcertTeams();

  updateTeamHPBars();


  setMP(
    `<strong>${size}v${size} Concert Battle ready.</strong>
     <span>Both teams share 10,000 HP.</span>`
  );


  $$(".mp-start")
  .forEach(
    button => {

      button.classList.toggle(

        "active",

        +button.dataset.team ===
        size
      );
    }
  );
}


/* =========================================================
   RENDER TEAM PLAYERS
========================================================= */

function renderConcertTeams(
  activeId = ""
) {

  const render =
    (
      players,
      team
    ) =>
      players
      .map(
        player => `

          <div
            class="
              concert-player
              ${team}
              ${
                player.id ===
                activeId

                  ? "active"

                  : ""
              }
            "
          >

            <div
              class="body"
              data-icon="${player.icon}"
            ></div>


            <div class="name">
              ${player.name}
            </div>

          </div>
        `
      )
      .join("");


  $("#blueConcertPlayers").innerHTML =
    render(
      multiplayerState.blue,
      "blue"
    );


  $("#redConcertPlayers").innerHTML =
    render(
      multiplayerState.red,
      "red"
    );
}


/* =========================================================
   UPDATE TEAM HP BARS
========================================================= */

function updateTeamHPBars() {

  const max =
    multiplayerState.maxTeamHP;


  const bluePercent =
    clamp(

      multiplayerState.blueHP /
      max *
      100,

      0,

      100
    );


  const redPercent =
    clamp(

      multiplayerState.redHP /
      max *
      100,

      0,

      100
    );


  $("#blueTeamHPFill").style.width =
    bluePercent +
    "%";


  $("#redTeamHPFill").style.width =
    redPercent +
    "%";


  $("#blueTeamHPText").textContent =
    `${
      Math.round(
        multiplayerState.blueHP
      )
      .toLocaleString()
    } / ${max.toLocaleString()} HP`;


  $("#redTeamHPText").textContent =
    `${
      Math.round(
        multiplayerState.redHP
      )
      .toLocaleString()
    } / ${max.toLocaleString()} HP`;
}


/* =========================================================
   TEAM BATTLE MESSAGE
========================================================= */

function setMP(html) {

  $("#multiplayerBattleMessage").innerHTML =
    html;
}


/* =========================================================
   TEAM DAMAGE
========================================================= */

function teamDamage(
  attacker,
  mult = 1
) {

  const targetTeam =
    attacker.team ===
    "blue"

      ? "red"

      : "blue";


  let damage =
    Math.max(

      120,

      Math.round(

        (
          attacker.attack *
          4.2 +

          attacker.rhythm *
          1.7 +

          rand(
            -40,
            70
          )
        ) *

        mult
      )
    );


  const critical =
    Math.random() <
    0.05 +
    attacker.melody /
    1000;


  if (
    critical
  ) {

    damage =
      Math.round(
        damage *
        1.5
      );
  }


  multiplayerState[
    targetTeam +
    "HP"
  ] =
    Math.max(

      0,

      multiplayerState[
        targetTeam +
        "HP"
      ] -
      damage
    );


  updateTeamHPBars();


  return {

    dmg:
      damage,

    critical
  };
}


/* =========================================================
   WAIT FOR HUMAN MOVE
========================================================= */

function waitHumanMove() {

  return new Promise(
    resolve => {

      multiplayerState.resolve =
        resolve;


      showTeamMoves();
    }
  );
}


/* =========================================================
   SHOW TEAM MOVE BUTTONS
========================================================= */

function showTeamMoves() {

  const player =
    multiplayerState.blue[
      0
    ];


  const instrument =
    getInstrument(
      player.instrument
    );


  const moves =
    getInstrumentMoves(
      player.instrument
    );


  multiplayerState.waiting =
    true;


  $("#teamMovePanel")
  .classList
  .remove(
    "hidden"
  );


  $("#teamTurnTitle").textContent =
    `${player.name}, choose your move`;


  $("#teamEnergyLabel").textContent =
    `${multiplayerState.playerEnergy} / 3`;


  $("#teamMoveButtons").innerHTML =
    moves
    .map(
      (
        move,
        index
      ) => `

        <button
          class="
            move-btn
            ${
              index === 3
                ? "ultimate"
                : ""
            }
          "

          data-team-move="${index}"

          ${
            index === 3 &&
            multiplayerState.playerEnergy <
            3

              ? "disabled"

              : ""
          }
        >

          <strong>
            ${move[0]}
          </strong>


          <span>

            ${
              index === 3

                ? "ULTIMATE • 3 ENERGY"

                : move[1]
                  .toUpperCase()
            }

          </span>


          <small>

            ${
              move[1] ===
              "heal"

                ? "Restore team HP"

                : move[1] ===
                  "shield"

                  ? "Reduce next enemy hit"

                  : "Damage Team Red"
            }

          </small>

        </button>
      `
    )
    .join("");


  $$("[data-team-move]")
  .forEach(
    button => {

      button.onclick =
        () => {

          if (
            !multiplayerState.waiting
          ) {

            return;
          }


          multiplayerState.waiting =
            false;


          $("#teamMovePanel")
          .classList
          .add(
            "hidden"
          );


          const resolve =
            multiplayerState.resolve;


          multiplayerState.resolve =
            null;


          resolve(
            +button.dataset
            .teamMove
          );
        };
    }
  );
}


/* =========================================================
   EXECUTE HUMAN TEAM MOVE
========================================================= */

async function executeTeamMove(
  index
) {

  const player =
    multiplayerState.blue[
      0
    ];


  const instrument =
    getInstrument(
      player.instrument
    );


  const move =
    getInstrumentMoves(
      player.instrument
    )[
      index
    ];


  renderConcertTeams(
    player.id
  );


  playInstrument(

    instrument.name,

    index === 3
      ? 659
      : 440
  );


/* =========================================================
   TEAM HEAL
========================================================= */

  if (
    move[1] ===
    "heal"
  ) {

    const healing =
      Math.round(

        instrument.melody *
        7 +

        220
      );


    multiplayerState.blueHP =
      clamp(

        multiplayerState.blueHP +
        healing,

        0,

        10000
      );


    multiplayerState.playerEnergy =
      clamp(

        multiplayerState.playerEnergy +
        1,

        0,

        3
      );


    S.heal();


    setMP(
      `<strong>💚 ${move[0]}</strong>
       <span>Team Blue restored ${healing} HP.</span>`
    );
  }


/* =========================================================
   TEAM SHIELD
========================================================= */

  else if (
    move[1] ===
    "shield"
  ) {

    multiplayerState.teamShield =
      true;


    multiplayerState.playerEnergy =
      clamp(

        multiplayerState.playerEnergy +
        1,

        0,

        3
      );


    S.shield();


    setMP(
      `<strong>🛡️ ${move[0]}</strong>
       <span>Team Blue is shielded against the next attack.</span>`
    );
  }


/* =========================================================
   TEAM ATTACK
========================================================= */

  else {

    let multiplier =
      move[2];


/* =========================================================
   TEAM ULTIMATE
========================================================= */

    if (
      index === 3
    ) {

      multiplier *=
        1.5;


      multiplayerState.playerEnergy =
        0;


      S.ultimate();

      crowd(
        1
      );
    }


/* =========================================================
   NORMAL TEAM ATTACK
========================================================= */

    else {

      multiplayerState.playerEnergy =
        clamp(

          multiplayerState.playerEnergy +
          1,

          0,

          3
        );


      S.attack();
    }


    const hit =
      teamDamage(

        player,

        multiplier
      );


/* =========================================================
   TEAM CRITICAL
========================================================= */

    if (
      hit.critical
    ) {

      S.critical();


      crowd(
        0.8
      );
    }


    setMP(
      `<strong>🔵 ${player.name} used ${move[0]}!</strong>
       <span>${hit.dmg} damage${
         hit.critical
           ? " • CRITICAL PERFORMANCE!"
           : ""
       }</span>`
    );


    addMastery(

      instrument.name,

      3
    );
  }


  updateTeamHPBars();


  await wait(
    500
  );


  renderConcertTeams();
}


/* =========================================================
   AI TEAM TURN
========================================================= */

async function aiTeamTurn(
  player
) {

  renderConcertTeams(
    player.id
  );


  playInstrument(

    player.instrument,

    player.team ===
    "blue"

      ? 420

      : 320
  );


  S.attack();


  let hit =
    teamDamage(

      player,

      0.8
    );


/* =========================================================
   APPLY BLUE TEAM SHIELD
========================================================= */

  if (
    player.team ===
      "red" &&

    multiplayerState.teamShield
  ) {

    const restore =
      Math.round(

        hit.dmg *
        0.45
      );


    multiplayerState.blueHP =
      Math.min(

        10000,

        multiplayerState.blueHP +
        restore
      );


    hit.dmg -=
      restore;


    multiplayerState.teamShield =
      false;


    S.shield();


    updateTeamHPBars();
  }


/* =========================================================
   AI CRITICAL HIT
========================================================= */

  if (
    hit.critical
  ) {

    S.critical();
  }


  setMP(
    `<strong>${
      player.team ===
      "blue"

        ? "🔵"

        : "🔴"
    } ${player.name} performs!</strong>
     <span>${player.instrument} deals ${hit.dmg} team damage${
       hit.critical
         ? " • CRITICAL!"
         : ""
     }</span>`
  );


  await wait(

    multiplayerState.size >=
    10

      ? 150

      : 350
  );
}


/* =========================================================
   START TEAM BATTLE
========================================================= */

async function startTeamBattle() {

  if (
    multiplayerState.playing
  ) {

    return;
  }


  multiplayerState.playing =
    true;


  $("#startTeamBattleBtn").disabled =
    true;


  $("#startTeamBattleBtn").textContent =
    "Concert in Progress...";


  let round =
    1;


/* =========================================================
   TEAM BATTLE ROUND LOOP
========================================================= */

  while (

    multiplayerState.blueHP >
      0 &&

    multiplayerState.redHP >
      0 &&

    round <=
      50
  ) {

    multiplayerState.round =
      round;


    $("#concertRoundLabel").textContent =
      `ROUND ${round}`;


    setMP(
      `<strong>🎵 Round ${round}: Your turn!</strong>
       <span>Choose one of your instrument moves.</span>`
    );


/* =========================================================
   HUMAN TURN
========================================================= */

    const move =
      await waitHumanMove();


    await executeTeamMove(
      move
    );


    if (
      multiplayerState.redHP <=
      0
    ) {

      break;
    }


/* =========================================================
   BLUE AI TEAMMATES
========================================================= */

    for (
      const player of
      multiplayerState.blue.slice(
        1
      )
    ) {

      await aiTeamTurn(
        player
      );


      if (
        multiplayerState.redHP <=
        0
      ) {

        break;
      }
    }


    if (
      multiplayerState.redHP <=
      0
    ) {

      break;
    }


/* =========================================================
   RED TEAM
========================================================= */

    for (
      const player of
      multiplayerState.red
    ) {

      await aiTeamTurn(
        player
      );


      if (
        multiplayerState.blueHP <=
        0
      ) {

        break;
      }
    }


    round++;
  }


/* =========================================================
   END TEAM BATTLE
========================================================= */

  multiplayerState.playing =
    false;


  $("#teamMovePanel")
  .classList
  .add(
    "hidden"
  );


  const won =
    multiplayerState.blueHP >
    multiplayerState.redHP;


  $("#concertRoundLabel").textContent =
    won
      ? "VICTORY"
      : "DEFEAT";


/* =========================================================
   TEAM VICTORY
========================================================= */

  if (
    won
  ) {

    crowd(
      1
    );


    S.victory();


    progressQuest(

      "battle",

      1
    );


    reward(

      24 +
      multiplayerState.size *
      2,

      18 +
      multiplayerState.size *
      2,

      "Concert victory!"
    );


    addInstrumentXP(

      profile.equipped,

      10
    );


    setMP(
      `<strong>🏆 TEAM BLUE WINS!</strong>
       <span>${
         Math.round(
           multiplayerState.blueHP
         )
         .toLocaleString()
       } HP remaining.</span>`
    );
  }


/* =========================================================
   TEAM DEFEAT
========================================================= */

  else {

    S.defeat();


    addXP(
      6
    );


    setMP(
      `<strong>Team Red wins the concert.</strong>
       <span>+6 EXP for performing.</span>`
    );
  }


/* =========================================================
   RESET START BUTTON
========================================================= */

  $("#startTeamBattleBtn").disabled =
    false;


  $("#startTeamBattleBtn").textContent =
    "Play Again";
}


/* =========================================================
   TEAM SIZE BUTTONS
========================================================= */

$$(".mp-start")
.forEach(
  button => {

    button.onclick =
      () =>
        openLobby(
          +button.dataset.team
        );
  }
);


/* =========================================================
   TEAM BATTLE START BUTTON
========================================================= */

$("#startTeamBattleBtn").onclick =
  startTeamBattle;
/* ============================ DAILY REWARDS ============================ */

const dailyRewardTable = [
  {
    day: 1,
    label: '15 Coins',
    icon: '🪙',
    coins: 15
  },
  {
    day: 2,
    label: '10 EXP',
    icon: '⭐',
    xp: 10
  },
  {
    day: 3,
    label: '8 Instrument EXP',
    icon: '🎵',
    instrumentXP: 8
  },
  {
    day: 4,
    label: '25 Coins + 10 EXP',
    icon: '🎁',
    coins: 25,
    xp: 10
  },
  {
    day: 5,
    label: '15 Star Dust',
    icon: '💫',
    dust: 15
  },
  {
    day: 6,
    label: 'Pet Egg',
    icon: '🥚',
    petEgg: true
  },
  {
    day: 7,
    label: 'Weekly Chest',
    icon: '👑',
    coins: 50,
    xp: 30,
    instrumentXP: 15,
    weeklyChest: true
  }
];


function getLocalDateKey(date = new Date()) {

  const y =
    date.getFullYear();

  const m =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      '0'
    );

  const d =
    String(
      date.getDate()
    ).padStart(
      2,
      '0'
    );

  return `${y}-${m}-${d}`;
}


function getYesterdayDateKey() {

  const d =
    new Date();

  d.setDate(
    d.getDate() - 1
  );

  return getLocalDateKey(
    d
  );
}


function canClaimDailyReward() {

  return (
    profile.dailyRewards.lastClaim !==
    getLocalDateKey()
  );
}


function getNextDailyRewardDay() {

  const today =
    getLocalDateKey();

  const yesterday =
    getYesterdayDateKey();


  if (
    profile.dailyRewards.lastClaim ===
    today
  ) {

    return (
      profile.dailyRewards.streak ||
      1
    );
  }


  if (
    profile.dailyRewards.lastClaim ===
    yesterday
  ) {

    return (
      profile.dailyRewards.streak %
      7
    ) + 1;
  }


  return 1;
}


/* =========================================================
   DAILY PET EGG
========================================================= */

function giveDailyPetEgg() {

  const eggs = [
    {
      egg: 'Meadow Egg',
      icon: '🌱',
      pet: 'Music Bunny',
      layer: 'Daily Reward'
    },
    {
      egg: 'Cave Egg',
      icon: '🪨',
      pet: 'Mole Beat',
      layer: 'Daily Reward'
    },
    {
      egg: 'Stone Egg',
      icon: '🐾',
      pet: 'Rock Pup',
      layer: 'Daily Reward'
    },
    {
      egg: 'Golden Egg',
      icon: '🪙',
      pet: 'Gold Chick',
      layer: 'Daily Reward'
    },
    {
      egg: 'Crystal Egg',
      icon: '💎',
      pet: 'Crystal Fox',
      layer: 'Daily Reward'
    }
  ];


  const egg =
    pick(
      Math.random() < 0.08
        ? eggs.slice(3)
        : eggs.slice(0, 3)
    );


  profile.petEggs.push({
    id:
      `daily-${Date.now()}-${Math.random()}`,

    ...egg,

    hatched:
      false
  });


  toast(
    `${egg.icon} You received a ${egg.egg}!`
  );
}


/* =========================================================
   WEEKLY CHEST BONUS
========================================================= */

function rollWeeklyChestBonus() {

  const r =
    Math.random();


  if (
    r < 0.03
  ) {

    profile.petEggs.push({
      id:
        `weekly-${Date.now()}-${Math.random()}`,

      egg:
        'Celestial Egg',

      icon:
        '✨',

      pet:
        'Star Phoenix',

      layer:
        'Weekly Chest',

      hatched:
        false
    });


    toast(
      '✨ JACKPOT! Celestial Egg!'
    );
  }


  else if (
    r < 0.15
  ) {

    profile.dust +=
      25;


    toast(
      '💫 Weekly Chest bonus: +25 Star Dust!'
    );
  }
}


/* =========================================================
   CLAIM DAILY REWARD
========================================================= */

function claimDailyReward() {

  if (
    !canClaimDailyReward()
  ) {

    return toast(
      "You already claimed today's reward!"
    );
  }


  profile.dailyRewards.streak =
    profile.dailyRewards.lastClaim ===
    getYesterdayDateKey()

      ? (
          profile.dailyRewards.streak %
          7
        ) + 1

      : 1;


  const rewardData =
    dailyRewardTable[
      profile.dailyRewards.streak -
      1
    ];


  if (
    rewardData.coins
  ) {

    profile.coins +=
      rewardData.coins;
  }


  if (
    rewardData.xp
  ) {

    addXP(
      rewardData.xp
    );
  }


  if (
    rewardData.dust
  ) {

    profile.dust +=
      rewardData.dust;
  }


  if (
    rewardData.instrumentXP
  ) {

    addInstrumentXP(
      profile.equipped,
      rewardData.instrumentXP
    );
  }


  if (
    rewardData.petEgg
  ) {

    giveDailyPetEgg();
  }


  if (
    rewardData.weeklyChest
  ) {

    rollWeeklyChestBonus();
  }


  profile.dailyRewards.lastClaim =
    getLocalDateKey();


  persist();

  updateProfileUI();

  renderDailyRewards();

  renderCraftEggs();

  S.treasure();


  toast(
    `${rewardData.icon} Day ${rewardData.day}: ${rewardData.label}!`
  );
}


/* =========================================================
   RENDER DAILY REWARDS
========================================================= */

function renderDailyRewards() {

  const grid =
    $('#dailyRewardGrid');


  if (
    !grid
  ) {

    return;
  }


  const next =
    getNextDailyRewardDay();


  const claimable =
    canClaimDailyReward();


  $('#dailyStreakLabel').textContent =
    profile.dailyRewards.streak ||
    0;


  grid.innerHTML =
    dailyRewardTable
    .map(
      rewardData => `

        <div
          class="
            daily-reward-card
            ${
              claimable &&
              rewardData.day === next
                ? 'current'
                : ''
            }

            ${
              !claimable &&
              rewardData.day ===
              profile.dailyRewards.streak
                ? 'claimed'
                : ''
            }

            ${
              rewardData.day === 7
                ? 'day-seven'
                : ''
            }
          "
        >

          <span class="daily-day">
            DAY ${rewardData.day}
          </span>

          <div class="daily-icon">
            ${rewardData.icon}
          </div>

          <strong>
            ${rewardData.label}
          </strong>

        </div>
      `
    )
    .join('');


  const button =
    $('#claimDailyBtn');


  button.disabled =
    !claimable;


  button.textContent =
    claimable
      ? `CLAIM DAY ${next}`
      : 'COME BACK TOMORROW';
}


/* ============================ QUESTS / GEAR / PETS ============================ */

const questDefs = [

  {
    id: 'fight',
    name: 'Battle Practice',
    goal: 3,
    label: 'Defeat 3 RPG enemies',
    xp: 10,
    coins: 6
  },

  {
    id: 'mine',
    name: 'Deep Miner',
    goal: 20,
    label: 'Mine 20 MusicCraft blocks',
    xp: 10,
    coins: 6
  },

  {
    id: 'battle',
    name: 'Arena Winner',
    goal: 1,
    label: 'Win 1 Solo or Team Battle',
    xp: 12,
    coins: 8
  }
];


/* =========================================================
   ENSURE QUEST DATA EXISTS
========================================================= */

function ensureQuests() {

  questDefs.forEach(
    quest => {

      if (
        !profile.quests[
          quest.id
        ]
      ) {

        profile.quests[
          quest.id
        ] = {

          progress:
            0,

          claimed:
            false
        };
      }
    }
  );
}


/* =========================================================
   PROGRESS QUEST
========================================================= */

function progressQuest(
  id,
  amount = 1
) {

  ensureQuests();


  const quest =
    questDefs.find(
      quest =>
        quest.id ===
        id
    );


  const state =
    profile.quests[
      id
    ];


  if (
    !quest ||
    state.claimed
  ) {

    return;
  }


  state.progress =
    Math.min(

      quest.goal,

      state.progress +
      amount
    );


  persist();

  renderQuests();
}


/* =========================================================
   CLAIM QUEST
========================================================= */

function claimQuest(
  id
) {

  const quest =
    questDefs.find(
      quest =>
        quest.id ===
        id
    );


  const state =
    profile.quests[
      id
    ];


  if (
    !quest ||
    !state ||
    state.progress <
      quest.goal ||
    state.claimed
  ) {

    return;
  }


  state.claimed =
    true;


  reward(

    quest.xp,

    quest.coins,

    `${quest.name} complete!`
  );


  renderQuests();
}


/* =========================================================
   RENDER QUESTS
========================================================= */

function renderQuests() {

  const element =
    $('#questList');


  if (
    !element
  ) {

    return;
  }


  ensureQuests();


  element.innerHTML =
    questDefs
    .map(
      quest => {

        const state =
          profile.quests[
            quest.id
          ];


        const percent =
          Math.min(

            100,

            state.progress /
            quest.goal *
            100
          );


        return `

          <div class="quest-card">

            <strong>
              ${quest.name}
            </strong>

            <span>
              ${quest.label}
            </span>

            <div class="quest-progress">

              <i
                style="width:${percent}%"
              ></i>

            </div>

            <small>
              ${state.progress}/${quest.goal}
              • ${quest.xp} EXP
              • ${quest.coins} Coins
            </small>

            ${
              state.progress >=
                quest.goal &&
              !state.claimed

                ? `

                  <button
                    class="btn gold small"
                    data-quest-claim="${quest.id}"
                  >
                    Claim
                  </button>
                `

                : state.claimed

                  ? '<small> ✓ Claimed</small>'

                  : ''
            }

          </div>
        `;
      }
    )
    .join('');


  $$('[data-quest-claim]')
  .forEach(
    button => {

      button.onclick =
        () =>
          claimQuest(
            button.dataset
            .questClaim
          );
    }
  );
}


/* =========================================================
   EQUIPMENT
========================================================= */

function renderEquipment() {

  const element =
    $('#equipmentList');


  if (
    !element
  ) {

    return;
  }


  element.innerHTML =
    profile.equipmentInventory
    .map(
      (
        gear,
        index
      ) => {

        const equipped =
          profile.equippedGear[
            gear.slot
          ]?.name ===
          gear.name;


        return `

          <div class="gear-card">

            <div>

              <strong>
                ${gear.name}
              </strong>

              <small>

                ${gear.slot}

                •

                ${
                  gear.attack
                    ? `+${gear.attack} ATK `
                    : ''
                }

                ${
                  gear.defense
                    ? `+${gear.defense} DEF`
                    : ''
                }

              </small>

            </div>


            <button
              class="
                btn
                small
                ${
                  equipped
                    ? 'gold'
                    : 'ghost'
                }
              "

              data-gear="${index}"
            >

              ${
                equipped
                  ? 'Equipped'
                  : 'Equip'
              }

            </button>

          </div>
        `;
      }
    )
    .join('');


  $$('[data-gear]')
  .forEach(
    button => {

      button.onclick =
        () => {

          const gear =
            profile.equipmentInventory[
              +button.dataset.gear
            ];


          profile.equippedGear[
            gear.slot
          ] =
            gear;


          persist();

          renderEquipment();

          renderInstruments();

          S.click();
        };
    }
  );
}


/* =========================================================
   PET TYPES
========================================================= */

const petTypes = {

  'Music Bunny':
    'melody',

  'Mole Beat':
    'defense',

  'Rock Pup':
    'attack',

  'Shadow Bat':
    'attack',

  'Gear Fox':
    'defense',

  'Echo Spider':
    'melody',

  'Gold Chick':
    'all',

  'Crystal Fox':
    'melody',

  'Diamond Dragon':
    'attack',

  'Obsidian Wolf':
    'defense',

  'Relic Guardian':
    'defense',

  'Lava Dragon':
    'attack',

  'Echo Spirit':
    'melody',

  'Star Phoenix':
    'all',

  'Harmony Dragon':
    'all'
};


/* =========================================================
   HATCH PET EGG
========================================================= */

function hatchCraftEgg(
  id
) {

  const egg =
    profile.petEggs.find(
      egg =>
        egg.id ===
        id
    );


  if (
    !egg ||
    egg.hatched
  ) {

    return;
  }


  egg.hatched =
    true;


  const existing =
    profile.pets.find(
      pet =>
        pet.name ===
        egg.pet
    );


  if (
    existing
  ) {

    profile.dust +=
      10;


    toast(
      `✨ Duplicate ${egg.pet}! +10 Star Dust`
    );
  }


  else {

    profile.pets.push({

      id:
        `pet-${Date.now()}-${Math.random()}`,

      name:
        egg.pet,

      level:
        1,

      xp:
        0,

      type:
        petTypes[
          egg.pet
        ] ||
        'all',

      source:
        egg.layer
    });


    toast(
      `🐾 ${egg.pet} hatched!`
    );
  }


  persist();

  renderCraftEggs();

  renderPets();

  updateProfileUI();

  S.gacha();
}


/* =========================================================
   RENDER PETS
========================================================= */

function renderPets() {

  const element =
    $('#petList');


  if (
    !element
  ) {

    return;
  }


  if (
    !profile.pets.length
  ) {

    element.innerHTML =
      '<p class="muted">Hatch eggs in MusicCraft to collect pets.</p>';


    return;
  }


  element.innerHTML =
    profile.pets
    .map(
      pet => {

        const needed =
          (
            pet.level ||
            1
          ) *
          40;


        const equipped =
          profile.equippedPet ===
          pet.id;


        return `

          <div class="pet-card">

            <div>

              <strong>
                ${pet.name}
                • Lv.${pet.level || 1}
              </strong>

              <small>
                ${pet.type} pet
              </small>

              <div class="pet-xp">

                <i
                  style="
                    width:${
                      Math.min(
                        100,
                        (pet.xp || 0) /
                        needed *
                        100
                      )
                    }%
                  "
                ></i>

              </div>

            </div>


            <button
              class="
                btn
                small
                ${
                  equipped
                    ? 'gold'
                    : 'ghost'
                }
              "

              data-pet="${pet.id}"
            >

              ${
                equipped
                  ? 'Active'
                  : 'Equip'
              }

            </button>

          </div>
        `;
      }
    )
    .join('');


  $$('[data-pet]')
  .forEach(
    button => {

      button.onclick =
        () => {

          profile.equippedPet =
            button.dataset.pet;


          persist();

          renderPets();

          renderInstruments();

          S.click();
        };
    }
  );
}


/* =========================================================
   INSTRUMENT WORKSHOP
========================================================= */

let workshopInstrument =
  profile.equipped;


/* =========================================================
   GET NEXT LEVEL STATS
========================================================= */

function getNextInstrumentStats(
  name
) {

  const base =
    getInstrument(
      name
    );


  const data =
    getInstrumentUpgradeData(
      name
    );


  const nextLevel =
    Math.min(

      20,

      data.level +
      1
    );


  const multiplier =

    (
      1 +
      (
        nextLevel -
        1
      ) *
      0.01
    ) *

    getEvolutionBonus(
      name
    );


  const gear =
    getGearBonuses();


  const pet =
    getPetBonus();


  return {

    attack:
      Math.round(

        base.attack *
        multiplier +

        gear.attack +

        pet.attack
      ),

    defense:
      Math.round(

        base.defense *
        multiplier +

        gear.defense +

        pet.defense
      ),

    melody:
      Math.round(

        base.melody *
        multiplier +

        gear.melody +

        pet.melody
      ),

    rhythm:
      Math.round(

        base.rhythm *
        multiplier +

        gear.rhythm +

        pet.rhythm
      )
  };
}


/* =========================================================
   RENDER INSTRUMENT WORKSHOP
========================================================= */

function renderInstrumentWorkshop(
  selected =
    workshopInstrument
) {

  const element =
    $('#instrumentWorkshop');


  if (
    !element
  ) {

    return;
  }


  const owned =
    profile.owned ||
    [];


  if (
    !owned.length
  ) {

    element.innerHTML =
      '<p class="muted">Buy an instrument first to unlock the workshop.</p>';


    return;
  }


  if (
    !owned.includes(
      selected
    )
  ) {

    selected =
      owned[0];
  }


  workshopInstrument =
    selected;


  const base =
    getInstrument(
      selected
    );


  const data =
    getInstrumentUpgradeData(
      selected
    );


  const current =
    getUpgradedInstrument(
      selected
    );


  const next =
    getNextInstrumentStats(
      selected
    );


  const needed =
    getInstrumentXPNeeded(
      selected
    );


  const maxed =
    data.level >=
    20;


  const ready =

    !maxed &&

    data.xp >=
    needed;


  const percent =
    maxed

      ? 100

      : Math.min(

          100,

          data.xp /
          needed *
          100
        );


  const evolved =
    profile.instrumentEvolutions[
      selected
    ];


  element.innerHTML = `

    <div class="workshop-instrument-list">

      ${
        owned
        .map(
          name => {

            const instrument =
              getInstrument(
                name
              );


            const upgrade =
              getInstrumentUpgradeData(
                name
              );


            return `

              <button
                class="
                  workshop-instrument-option
                  ${
                    name ===
                    selected

                      ? 'active'

                      : ''
                  }
                "

                data-workshop-instrument="${name}"
              >

                <span class="icon">
                  ${instrument.icon}
                </span>

                <strong>
                  ${name}
                </strong>

                <small>
                  LV.${upgrade.level}
                </small>

              </button>
            `;
          }
        )
        .join('')
      }

    </div>


    <div class="workshop-machine">

      <div class="workshop-main">

        <div class="workshop-big-icon">
          ${base.icon}
        </div>


        <div class="workshop-name">

          <h4>

            ${
              evolved
                ? evolved.name
                : selected
            }

          </h4>

          <span>

            ${base.family}

            •

            ${
              selected ===
              profile.equipped

                ? 'Currently Equipped'

                : 'Owned Instrument'
            }

          </span>

        </div>


        <div class="workshop-level">

          <strong>
            LV.${data.level}
          </strong>

          <span>
            MAX 20
          </span>

        </div>

      </div>


      <div class="workshop-exp-head">

        <span>
          Instrument EXP
        </span>

        <b>

          ${
            maxed

              ? 'MAX'

              : `${data.xp} / ${needed}`
          }

        </b>

      </div>


      <div class="workshop-exp-bar">

        <i
          style="width:${percent}%"
        ></i>

      </div>


      <div class="workshop-level-preview">

        <div class="workshop-level-box">
          LEVEL ${data.level}
        </div>

        <span class="workshop-arrow">
          ➜
        </span>

        <div class="workshop-level-box next">

          ${
            maxed
              ? 'MAX LEVEL'
              : `LEVEL ${data.level + 1}`
          }

        </div>

      </div>


      <div class="workshop-stat-table">

        <div class="workshop-stat-row">

          <span>
            ATTACK
          </span>

          <b>
            ${current.attack}
          </b>

          <div class="workshop-stat-arrow">
            →
          </div>

          <b class="next-stat">

            ${
              maxed
                ? current.attack
                : next.attack
            }

          </b>

        </div>


        <div class="workshop-stat-row">

          <span>
            DEFENSE
          </span>

          <b>
            ${current.defense}
          </b>

          <div class="workshop-stat-arrow">
            →
          </div>

          <b class="next-stat">

            ${
              maxed
                ? current.defense
                : next.defense
            }

          </b>

        </div>


        <div class="workshop-stat-row">

          <span>
            MELODY
          </span>

          <b>
            ${current.melody}
          </b>

          <div class="workshop-stat-arrow">
            →
          </div>

          <b class="next-stat">

            ${
              maxed
                ? current.melody
                : next.melody
            }

          </b>

        </div>


        <div class="workshop-stat-row">

          <span>
            RHYTHM
          </span>

          <b>
            ${current.rhythm}
          </b>

          <div class="workshop-stat-arrow">
            →
          </div>

          <b class="next-stat">

            ${
              maxed
                ? current.rhythm
                : next.rhythm
            }

          </b>

        </div>

      </div>


      <div class="workshop-footer">

        <p>

          ${
            maxed

              ? `⭐ ${selected} has reached maximum level.`

              : ready

                ? `✨ Enough Instrument EXP! Upgrade ${selected} now.`

                : `🎵 Need ${Math.max(
                    0,
                    needed -
                    data.xp
                  )} more EXP to upgrade ${selected}.`
          }

        </p>


        <button
          id="workshopUpgradeBtn"

          class="
            btn
            workshop-upgrade-btn
            ${
              ready
                ? 'gold'
                : 'ghost'
            }
          "

          ${
            ready
              ? ''
              : 'disabled'
          }
        >

          ${
            maxed

              ? 'MAX LEVEL'

              : `UPGRADE ${selected.toUpperCase()}`
          }

        </button>

      </div>


      ${
        evolved

          ? `

            <div
              class="upgrade-evolved-note"
              style="margin-top:10px"
            >

              ✨ Harmonic Evolution Active
              • +10% Base Stats

            </div>
          `

          : ''
      }

    </div>
  `;


/* =========================================================
   WORKSHOP INSTRUMENT BUTTONS
========================================================= */

  $$('[data-workshop-instrument]')
  .forEach(
    button => {

      button.onclick =
        () => {

          workshopInstrument =
            button.dataset
            .workshopInstrument;


          renderInstrumentWorkshop(
            workshopInstrument
          );


          S.click();
        };
    }
  );


/* =========================================================
   WORKSHOP UPGRADE BUTTON
========================================================= */

  if (
    ready &&
    $('#workshopUpgradeBtn')
  ) {

    $('#workshopUpgradeBtn').onclick =
      () =>
        upgradeInstrument(
          workshopInstrument
        );
  }
}


/* =========================================================
   UPGRADE PANEL WRAPPER
========================================================= */

function renderInstrumentUpgradePanel(
  selectedName =
    profile.equipped
) {

  renderInstrumentWorkshop(
    selectedName
  );
}


/* =========================================================
   INSTRUMENT EVOLUTION
========================================================= */

function renderEvolutionPanel() {

  const element =
    $('#evolutionPanel');


  if (
    !element
  ) {

    return;
  }


  const name =
    profile.equipped;


  const upgrade =
    getInstrumentUpgradeData(
      name
    );


  const done =
    profile.instrumentEvolutions[
      name
    ];


  const requirements = {

    Stone:
      20,

    Crystal:
      5
  };


/* =========================================================
   ALREADY EVOLVED
========================================================= */

  if (
    done
  ) {

    element.innerHTML = `

      <div class="evolution-card">

        <strong>
          ${done.name}
        </strong>

        <span>
          Evolution complete
          • +10% base stats
        </span>

      </div>
    `;


    return;
  }


/* =========================================================
   CHECK REQUIREMENTS
========================================================= */

  const canEvolve =

    upgrade.level >=
      10 &&

    (
      profile.materials.Stone ||
      0
    ) >=
      requirements.Stone &&

    (
      profile.materials.Crystal ||
      0
    ) >=
      requirements.Crystal;


/* =========================================================
   EVOLUTION PANEL HTML
========================================================= */

  element.innerHTML = `

    <div class="evolution-card">

      <strong>
        ${name} Evolution
      </strong>

      <span>
        Requires Instrument Lv.10
        + 20 Stone
        + 5 Crystal
      </span>

      <button
        id="evolveInstrumentBtn"

        class="
          btn
          ${
            canEvolve
              ? 'gold'
              : 'ghost'
          }
          small
        "

        ${
          canEvolve
            ? ''
            : 'disabled'
        }
      >
        Evolve
      </button>

    </div>
  `;


/* =========================================================
   EVOLVE INSTRUMENT
========================================================= */

  if (
    canEvolve
  ) {

    $('#evolveInstrumentBtn').onclick =
      () => {

        profile.materials.Stone -=
          20;


        profile.materials.Crystal -=
          5;


        profile.instrumentEvolutions[
          name
        ] = {

          name:
            `${name} ★ Harmonic`
        };


        persist();


        S.ultimate();


        toast(
          `✨ ${name} evolved!`
        );


        renderEvolutionPanel();

        renderInstruments();
      };
  }
}


/* ============================ MUSICVERSE ADVENTURE RPG ============================ */
/* ============================ MUSICVERSE ADVENTURE RPG ============================ */
/* ============================ SKILL TREE ============================ */

const skillTreeDefs = {
  power: {
    name: 'Power',
    icon: '⚔️',
    desc: 'Stronger attacks and special moves.',
    nodes: [
      {
        id: 'power1',
        icon: '🎸',
        name: 'Forte',
        desc: '+3% attack damage per rank.',
        max: 3,
        requires: null
      },
      {
        id: 'power2',
        icon: '💥',
        name: 'Critical Ear',
        desc: '+2% critical chance per rank.',
        max: 3,
        requires: 'power1'
      },
      {
        id: 'power3',
        icon: '🔥',
        name: 'Encore Strike',
        desc: '+5% special move damage per rank.',
        max: 3,
        requires: 'power2'
      }
    ]
  },

  rhythm: {
    name: 'Rhythm',
    icon: '🥁',
    desc: 'Defence, dodging and tempo control.',
    nodes: [
      {
        id: 'rhythm1',
        icon: '🛡️',
        name: 'Tempo Guard',
        desc: '+3% defence per rank.',
        max: 3,
        requires: null
      },
      {
        id: 'rhythm2',
        icon: '💨',
        name: 'Quick Beat',
        desc: '+2% dodge chance per rank.',
        max: 3,
        requires: 'rhythm1'
      },
      {
        id: 'rhythm3',
        icon: '⚡',
        name: 'Momentum',
        desc: '+4% normal attack damage per rank.',
        max: 3,
        requires: 'rhythm2'
      }
    ]
  },

  harmony: {
    name: 'Harmony',
    icon: '🎼',
    desc: 'More HP, healing and pet growth.',
    nodes: [
      {
        id: 'harmony1',
        icon: '❤️',
        name: 'Vital Chorus',
        desc: '+5 max RPG HP per rank.',
        max: 3,
        requires: null
      },
      {
        id: 'harmony2',
        icon: '✨',
        name: 'Healing Notes',
        desc: '+8% healing per rank.',
        max: 3,
        requires: 'harmony1'
      },
      {
        id: 'harmony3',
        icon: '🐾',
        name: 'Companion Bond',
        desc: '+10% pet EXP per rank.',
        max: 3,
        requires: 'harmony2'
      }
    ]
  }
};


/* =========================================================
   SKILL POINTS
========================================================= */

function totalSkillPointsEarned() {
  return Math.floor(
    (profile.level - 1) / 2
  );
}


function spentSkillPoints() {

  return Object.values(
    profile.skillTree || {}
  ).reduce(
    (a, b) =>
      a + (Number(b) || 0),
    0
  );
}


function availableSkillPoints() {

  return Math.max(
    0,
    totalSkillPointsEarned() -
    spentSkillPoints()
  );
}


function skillRank(id) {

  return Number(
    profile.skillTree?.[id] || 0
  );
}


/* =========================================================
   CAN BUY SKILL
========================================================= */

function canBuySkill(node) {

  if (
    availableSkillPoints() <= 0
  ) {
    return false;
  }


  if (
    skillRank(node.id) >= node.max
  ) {
    return false;
  }


  if (
    node.requires &&
    skillRank(node.requires) <= 0
  ) {
    return false;
  }


  return true;
}


/* =========================================================
   BUY SKILL
========================================================= */

function buySkill(id) {

  let node = null;


  for (
    const branch of
    Object.values(skillTreeDefs)
  ) {

    node =
      branch.nodes.find(
        n => n.id === id
      );


    if (node) {
      break;
    }
  }


  if (!node) {
    return;
  }


  if (
    !canBuySkill(node)
  ) {

    if (
      availableSkillPoints() <= 0
    ) {

      toast(
        'You need another Skill Point.'
      );
    }

    else if (
      node.requires &&
      skillRank(node.requires) <= 0
    ) {

      toast(
        'Unlock the previous skill first.'
      );
    }


    return;
  }


  profile.skillTree[id] =
    skillRank(id) + 1;


  applySkillTreeVitals();

  persist();

  S.level();


  toast(
    `🌳 ${node.name} is now Rank ${profile.skillTree[id]}!`
  );


  renderSkillTree();

  renderRpgMap();


  if (rpgEnemy) {

    renderRpgBattle();
  }
}


/* =========================================================
   SKILL BONUSES
========================================================= */

function getSkillBonuses() {

  return {

    attackPct:
      skillRank('power1') *
      0.03,

    critChance:
      skillRank('power2') *
      0.02,

    specialPct:
      skillRank('power3') *
      0.05,

    defensePct:
      skillRank('rhythm1') *
      0.03,

    dodgeChance:
      skillRank('rhythm2') *
      0.02,

    normalPct:
      skillRank('rhythm3') *
      0.04,

    maxHp:
      skillRank('harmony1') *
      5,

    healPct:
      skillRank('harmony2') *
      0.08,

    petXpPct:
      skillRank('harmony3') *
      0.10
  };
}


/* =========================================================
   APPLY SKILL TREE HP BONUS
========================================================= */

function applySkillTreeVitals() {

  const bonuses =
    getSkillBonuses();


  const oldMax =
    profile.rpg.maxHp || 100;


  const newMax =
    100 + bonuses.maxHp;


  profile.rpg.maxHp =
    newMax;


  if (
    profile.rpg.hp >
    newMax
  ) {

    profile.rpg.hp =
      newMax;
  }


  if (
    newMax >
    oldMax
  ) {

    profile.rpg.hp =
      Math.min(

        newMax,

        profile.rpg.hp +
        (
          newMax -
          oldMax
        )
      );
  }
}


/* =========================================================
   RENDER SKILL TREE
========================================================= */

function renderSkillTree() {

  const element =
    $('#skillTree');


  if (!element) {
    return;
  }


  applySkillTreeVitals();


  $('#skillPointsAvailable')
  .textContent =
    availableSkillPoints();


  element.innerHTML =

    Object.values(
      skillTreeDefs
    )
    .map(
      branch => `

        <div class="skill-branch">

          <div class="skill-branch-title">

            <strong>
              ${branch.icon}
              ${branch.name}
            </strong>

            <span>
              ${branch.desc}
            </span>

          </div>


          ${
            branch.nodes
            .map(
              (node, index) => {

                const rank =
                  skillRank(
                    node.id
                  );


                const locked =
                  node.requires &&
                  skillRank(
                    node.requires
                  ) <= 0;


                const maxed =
                  rank >= node.max;


                return `

                  ${
                    index
                      ? '<div class="skill-connector"></div>'
                      : ''
                  }


                  <div
                    class="
                      skill-node
                      ${
                        locked
                          ? 'locked'
                          : ''
                      }
                      ${
                        maxed
                          ? 'maxed'
                          : ''
                      }
                    "
                  >

                    <div class="skill-icon">
                      ${node.icon}
                    </div>


                    <div>

                      <strong>
                        ${node.name}
                      </strong>

                      <small>
                        ${node.desc}
                      </small>

                    </div>


                    <div>

                      <div class="skill-rank">
                        Rank ${rank}/${node.max}
                      </div>


                      <button
                        data-skill="${node.id}"

                        ${
                          maxed ||
                          locked ||
                          availableSkillPoints() <= 0

                            ? 'disabled'

                            : ''
                        }
                      >

                        ${
                          maxed

                            ? 'MAX'

                            : locked

                              ? 'LOCKED'

                              : 'UPGRADE'
                        }

                      </button>

                    </div>

                  </div>
                `;
              }
            )
            .join('')
          }

        </div>
      `
    )
    .join('')

    +

    `

      <div class="skill-summary">

        <div>
          <b>
            +${Math.round(
              getSkillBonuses().attackPct *
              100
            )}%
          </b>
          <span>Attack</span>
        </div>

        <div>
          <b>
            +${getSkillBonuses().maxHp}
          </b>
          <span>RPG Max HP</span>
        </div>

        <div>
          <b>
            +${Math.round(
              getSkillBonuses().petXpPct *
              100
            )}%
          </b>
          <span>Pet EXP</span>
        </div>

      </div>
    `;


  $$('[data-skill]')
  .forEach(
    button => {

      button.onclick =
        () =>
          buySkill(
            button.dataset.skill
          );
    }
  );
}


/* =========================================================
   RPG ZONES
========================================================= */

const rpgZones = [

  {
    name:
      'Melody Village',
    emoji:
      '🏡',
    enemy:
      'Slime Note',
    boss:
      'Village Maestro'
  },

  {
    name:
      'Rhythm Forest',
    emoji:
      '🌲',
    enemy:
      'Beat Bug',
    boss:
      'Tempo Wolf'
  },

  {
    name:
      'Echo Caves',
    emoji:
      '🕳️',
    enemy:
      'Echo Bat',
    boss:
      'Crystal Golem'
  },

  {
    name:
      'Brass Kingdom',
    emoji:
      '🏰',
    enemy:
      'Horn Guard',
    boss:
      'Royal Conductor'
  },

  {
    name:
      'Crystal Highlands',
    emoji:
      '💎',
    enemy:
      'Shard Sprite',
    boss:
      'Crystal Maestro'
  },

  {
    name:
      'Shadow Ruins',
    emoji:
      '🗿',
    enemy:
      'Shadow Note',
    boss:
      'Silent Knight'
  },

  {
    name:
      'Magma Canyon',
    emoji:
      '🔥',
    enemy:
      'Fire Beat',
    boss:
      'Inferno Dragon'
  },

  {
    name:
      'Celestial Valley',
    emoji:
      '✨',
    enemy:
      'Star Wisp',
    boss:
      'Celestial Titan'
  },

  {
    name:
      'Void Realm',
    emoji:
      '🌌',
    enemy:
      'Void Spirit',
    boss:
      'Abyss Titan'
  },

  {
    name:
      'MusicVerse Citadel',
    emoji:
      '🎼',
    enemy:
      'Dark Virtuoso',
    boss:
      'The Silent King'
  }
];


let rpgMapData = [];

let rpgEnemy = null;


/* =========================================================
   CREATE RPG MAP
========================================================= */

function makeRpgMap() {

  rpgMapData =
    Array.from(
      {
        length: 8
      },

      (_, y) =>
        Array.from(
          {
            length: 12
          },

          (_, x) =>
            x === 0 ||
            x === 11 ||
            y === 0 ||
            y === 7

              ? 'wall'

              : 'floor'
        )
    );


/* =========================================================
   RANDOM WALLS
========================================================= */

  for (
    let i = 0;
    i < 10;
    i++
  ) {

    const x =
      rand(
        2,
        10
      );


    const y =
      rand(
        1,
        6
      );


    if (
      x !== profile.rpg.x ||
      y !== profile.rpg.y
    ) {

      rpgMapData[y][x] =
        'wall';
    }
  }


/* =========================================================
   RANDOM ENEMIES
========================================================= */

  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const x =
      rand(
        2,
        10
      );


    const y =
      rand(
        1,
        6
      );


    if (
      rpgMapData[y][x] ===
      'floor'
    ) {

      rpgMapData[y][x] =
        'enemy';
    }
  }


/* =========================================================
   RANDOM CHESTS
========================================================= */

  for (
    let i = 0;
    i < 2;
    i++
  ) {

    const x =
      rand(
        2,
        10
      );


    const y =
      rand(
        1,
        6
      );


    if (
      rpgMapData[y][x] ===
      'floor'
    ) {

      rpgMapData[y][x] =
        'chest';
    }
  }


/* =========================================================
   EXIT
========================================================= */

  rpgMapData[6][10] =
    'exit';


  profile.rpg.x =
    1;


  profile.rpg.y =
    1;


  persist();

  renderRpgMap();
}


/* =========================================================
   RENDER RPG MAP
========================================================= */

function renderRpgMap() {

  const element =
    $('#rpgMap');


  if (!element) {
    return;
  }


  $('#rpgZoneName').textContent =
    rpgZones[
      profile.rpg.zone
    ].name;


  $('#rpgHpText').textContent =
    `${profile.rpg.hp} / ${profile.rpg.maxHp}`;


  $('#rpgStoryText').textContent =
    `${profile.rpg.storyStep + 1} / ${rpgZones.length}`;


  element.innerHTML =

    rpgMapData
    .flatMap(
      (row, y) =>
        row.map(
          (tile, x) => {

            const player =
              x === profile.rpg.x &&
              y === profile.rpg.y;


            const icon =
              player
                ? '🎸'
                : tile === 'wall'
                  ? ''
                  : tile === 'enemy'
                    ? '👾'
                    : tile === 'chest'
                      ? '🎁'
                      : tile === 'exit'
                        ? '🚪'
                        : '';


            return `

              <div
                class="
                  rpg-tile
                  ${
                    player
                      ? 'player'
                      : tile
                  }
                "
              >
                ${icon}
              </div>
            `;
          }
        )
    )
    .join('');
}


/* =========================================================
   RPG MOVEMENT
========================================================= */

function moveRpg(
  dx,
  dy
) {

  if (rpgEnemy) {
    return;
  }


  const nx =
    profile.rpg.x +
    dx;


  const ny =
    profile.rpg.y +
    dy;


  const tile =
    rpgMapData[ny]?.[nx];


  if (
    !tile ||
    tile === 'wall'
  ) {
    return;
  }


/* =========================================================
   ENEMY TILE
========================================================= */

  if (
    tile === 'enemy'
  ) {

    profile.rpg.x =
      nx;


    profile.rpg.y =
      ny;


    startRpgBattle(
      false
    );


    return;
  }


/* =========================================================
   CHEST TILE
========================================================= */

  if (
    tile === 'chest'
  ) {

    rpgMapData[ny][nx] =
      'floor';


    const coins =
      rand(
        2,
        7
      );


    profile.coins +=
      coins;


    if (
      Math.random() <
      0.35
    ) {

      profile.equipmentInventory.push({

        name:
          pick([
            'Echo Ring',
            'Rhythm Boots',
            'Crystal Charm'
          ]),

        slot:
          pick([
            'Ring',
            'Feet',
            'Charm'
          ]),

        attack:
          rand(
            1,
            3
          ),

        defense:
          rand(
            1,
            3
          )
      });
    }


    persist();

    updateProfileUI();

    renderEquipment();

    S.treasure();


    toast(
      `🎁 Chest: +${coins} Coins`
    );
  }


/* =========================================================
   EXIT / BOSS TILE
========================================================= */

  if (
    tile === 'exit'
  ) {

    startRpgBattle(
      true
    );


    return;
  }


  profile.rpg.x =
    nx;


  profile.rpg.y =
    ny;


  persist();

  renderRpgMap();
}


/* =========================================================
   START RPG BATTLE
========================================================= */

function startRpgBattle(
  boss
) {

  const zone =
    rpgZones[
      profile.rpg.zone
    ];


  const instrument =
    getUpgradedInstrument(
      profile.equipped
    );


  rpgEnemy = {

    name:
      boss
        ? zone.boss
        : zone.enemy,

    hp:
      boss
        ? 220 +
          profile.rpg.zone *
          70
        : 75 +
          profile.rpg.zone *
          25,

    max:
      boss
        ? 220 +
          profile.rpg.zone *
          70
        : 75 +
          profile.rpg.zone *
          25,

    boss,

    attack:
      boss
        ? 12 +
          profile.rpg.zone *
          2
        : 6 +
          profile.rpg.zone
  };


  renderRpgBattle();
}


/* =========================================================
   RENDER RPG BATTLE
========================================================= */

function renderRpgBattle() {

  const panel =
    $('#rpgBattlePanel');


  if (
    !panel ||
    !rpgEnemy
  ) {
    return;
  }


  panel.classList.remove(
    'hidden'
  );


  const instrument =
    getUpgradedInstrument(
      profile.equipped
    );


  panel.innerHTML = `

    <div class="story-banner">

      ${
        rpgEnemy.boss

          ? `Boss guarding the fragment of the Grand Melody: ${rpgEnemy.name}`

          : `A ${rpgEnemy.name} blocks your path.`
      }

    </div>


    <div class="rpg-battle-grid">

      <div>

        <strong>
          ${profile.name || 'Player'}
        </strong>

        <p>
          HP ${profile.rpg.hp}/${profile.rpg.maxHp}
        </p>

        <small>
          ${instrument.icon}
          ${profile.equipped}
        </small>

      </div>


      <div>

        <strong>
          ${
            rpgEnemy.boss
              ? '👑'
              : '👾'
          }
          ${rpgEnemy.name}
        </strong>

        <p>
          HP ${rpgEnemy.hp}/${rpgEnemy.max}
        </p>

      </div>

    </div>


    <div class="rpg-actions">

      <button
        class="btn gold"
        id="rpgAttack"
      >
        Attack
      </button>

      <button
        class="btn ghost"
        id="rpgSkill"
      >
        Special Move
      </button>

      <button
        class="btn ghost"
        id="rpgHeal"
      >
        Heal
      </button>

      <button
        class="btn ghost"
        id="rpgRun"
      >
        Run
      </button>

    </div>
  `;


  $('#rpgAttack').onclick =
    () =>
      rpgPlayerAction(
        'attack'
      );


  $('#rpgSkill').onclick =
    () =>
      rpgPlayerAction(
        'skill'
      );


  $('#rpgHeal').onclick =
    () =>
      rpgPlayerAction(
        'heal'
      );


  $('#rpgRun').onclick =
    () => {

      if (
        rpgEnemy.boss
      ) {

        return toast(
          'You cannot run from a boss!'
        );
      }


      rpgEnemy =
        null;


      panel.classList.add(
        'hidden'
      );


      rpgMapData[
        profile.rpg.y
      ][
        profile.rpg.x
      ] =
        'floor';


      renderRpgMap();
    };
}


/* =========================================================
   RPG PLAYER ACTION
========================================================= */

function rpgPlayerAction(
  type
) {

  const instrument =
    getUpgradedInstrument(
      profile.equipped
    );


  const skills =
    getSkillBonuses();


/* =========================================================
   RPG HEAL
========================================================= */

  if (
    type === 'heal'
  ) {

    const base =
      Math.round(
        instrument.melody *
        0.12
      ) + 6;


    const heal =
      Math.round(

        base *
        (
          1 +
          skills.healPct
        )
      );


    profile.rpg.hp =
      Math.min(

        profile.rpg.maxHp,

        profile.rpg.hp +
        heal
      );


    S.heal();


    toast(
      `✨ Healed ${heal} HP`
    );
  }


/* =========================================================
   RPG ATTACK / SPECIAL
========================================================= */

  else {

    let multiplier =
      type === 'skill'
        ? 1.45
        : 1;


    multiplier *=
      1 +
      skills.attackPct;


    multiplier *=

      type === 'skill'

        ? 1 +
          skills.specialPct

        : 1 +
          skills.normalPct;


    let damage =
      Math.max(

        5,

        Math.round(

          (
            instrument.attack *
            0.22 +

            instrument.rhythm *
            0.08 +

            rand(
              0,
              6
            )
          ) *

          multiplier
        )
      );


    const critical =
      Math.random() <

      0.06 +

      instrument.melody /
      1600 +

      skills.critChance;


    if (
      critical
    ) {

      damage =
        Math.round(
          damage *
          1.5
        );


      S.critical();


      toast(
        '💥 Critical hit!'
      );
    }


    rpgEnemy.hp =
      Math.max(

        0,

        rpgEnemy.hp -
        damage
      );


    playInstrument(

      profile.equipped,

      type === 'skill'
        ? 660
        : 440
    );


    type === 'skill'
      ? S.ultimate()
      : S.attack();
  }


/* =========================================================
   ENEMY DEFEATED
========================================================= */

  if (
    rpgEnemy.hp <=
    0
  ) {

    finishRpgBattle();

    return;
  }


/* =========================================================
   DODGE
========================================================= */

  if (
    Math.random() <
    skills.dodgeChance
  ) {

    S.great();


    toast(
      '💨 Quick Beat! You dodged the attack.'
    );


    persist();

    renderRpgBattle();

    renderRpgMap();


    return;
  }


/* =========================================================
   ENEMY ATTACK
========================================================= */

  const effectiveDefense =

    instrument.defense *

    (
      1 +
      skills.defensePct
    );


  const hurt =
    Math.max(

      1,

      rpgEnemy.attack -

      Math.round(
        effectiveDefense *
        0.035
      )
    );


  profile.rpg.hp =
    Math.max(

      0,

      profile.rpg.hp -
      hurt
    );


/* =========================================================
   PLAYER DEFEATED
========================================================= */

  if (
    profile.rpg.hp <=
    0
  ) {

    profile.rpg.hp =
      profile.rpg.maxHp;


    rpgEnemy =
      null;


    $('#rpgBattlePanel')
    .classList
    .add(
      'hidden'
    );


    profile.rpg.x =
      1;


    profile.rpg.y =
      1;


    persist();


    S.defeat();


    toast(
      'Defeated! You returned to the zone entrance.'
    );


    renderRpgMap();


    return;
  }


  persist();

  renderRpgBattle();

  renderRpgMap();
}


/* =========================================================
   FINISH RPG BATTLE
========================================================= */

function finishRpgBattle() {

  const boss =
    rpgEnemy.boss;


  const name =
    rpgEnemy.name;


  progressQuest(
    'fight',
    1
  );


  addInstrumentXP(

    profile.equipped,

    boss
      ? 8
      : 2
  );


  if (
    profile.equippedPet
  ) {

    addPetXP(

      profile.equippedPet,

      boss
        ? 12
        : 3
    );
  }


  reward(

    boss
      ? 28
      : 6,

    boss
      ? 18
      : 3,

    `${name} defeated!`
  );


/* =========================================================
   BOSS VICTORY
========================================================= */

  if (
    boss
  ) {

    profile.rpg.storyStep =
      Math.max(

        profile.rpg.storyStep,

        profile.rpg.zone +
        1
      );


    if (
      profile.rpg.zone <
      rpgZones.length -
      1
    ) {

      profile.rpg.zone++;


      profile.rpg.hp =
        profile.rpg.maxHp;


      toast(
        `🗺️ ${rpgZones[profile.rpg.zone].name} unlocked!`
      );
    }


    else {

      toast(
        '🎼 The Grand Melody has been restored!'
      );
    }


    makeRpgMap();
  }


/* =========================================================
   NORMAL ENEMY VICTORY
========================================================= */

  else {

    rpgMapData[
      profile.rpg.y
    ][
      profile.rpg.x
    ] =
      'floor';
  }


  rpgEnemy =
    null;


  $('#rpgBattlePanel')
  .classList
  .add(
    'hidden'
  );


  persist();

  renderRpgMap();

  renderQuests();
}


/* =========================================================
   SETUP RPG CONTROLS
========================================================= */

function setupRpg() {

  if (
    !rpgMapData.length
  ) {

    makeRpgMap();
  }


  const map =
    $('#rpgMap');


  if (
    map
  ) {

    map.onkeydown =
      event => {

        const key =
          event.key.toLowerCase();


        const movement = {

          arrowup:
            [0, -1],

          w:
            [0, -1],

          arrowdown:
            [0, 1],

          s:
            [0, 1],

          arrowleft:
            [-1, 0],

          a:
            [-1, 0],

          arrowright:
            [1, 0],

          d:
            [1, 0]

        }[
          key
        ];


        if (
          movement
        ) {

          event.preventDefault();


          moveRpg(
            ...movement
          );
        }
      };
  }


  [
    [
      'rpgUp',
      0,
      -1
    ],

    [
      'rpgDown',
      0,
      1
    ],

    [
      'rpgLeft',
      -1,
      0
    ],

    [
      'rpgRight',
      1,
      0
    ]
  ]
  .forEach(
    (
      [
        id,
        x,
        y
      ]
    ) => {

      $('#' + id).onclick =
        () =>
          moveRpg(
            x,
            y
          );
    }
  );
}
/* ============================ GAME HUB ============================ */

const games = [

  [
    'rhythm',
    '🎵',
    'Rhythm Rush',
    'Hit falling notes with D F J K.'
  ],

  [
    'guess',
    '🎼',
    'Guess the Song',
    'Hear a melody and identify it.'
  ],

  [
    'tiles',
    '🎹',
    'Piano Tiles',
    'Hit the correct tiles before they fall.'
  ],

  [
    'pitch',
    '👂',
    'Perfect Pitch',
    'Listen to a note and identify it.'
  ],

  [
    'memory',
    '🧠',
    'Melody Memory',
    'Repeat an increasingly long melody.'
  ],

  [
    'dash',
    '🏃',
    'Music Dash',
    'Jump obstacles and collect music coins.'
  ],

  [
    'hero',
    '🎸',
    'Instrument Hero',
    'Score combos with your equipped instrument.'
  ],

  [
    'beat',
    '🎧',
    'Beat Battle',
    'Time your hits to defeat a music boss.'
  ],

  [
    'dungeon',
    '🏰',
    'Music Dungeon',
    'Explore rooms and fight musical monsters.'
  ]
];


/* =========================================================
   RENDER GAME CARDS
========================================================= */

function renderGameCards() {

  $('#gameCards').innerHTML =

    games
    .map(
      game => `

        <article
          class="game-card"
          data-game="${game[0]}"
        >

          <div class="game-icon">
            ${game[1]}
          </div>

          <h3>
            ${game[2]}
          </h3>

          <p>
            ${game[3]}
          </p>

          <b>
            EARNS UNIVERSAL EXP
          </b>

        </article>
      `
    )
    .join('');


  $$('[data-game]')
  .forEach(
    card => {

      card.onclick =
        () =>
          openGame(
            card.dataset.game
          );
    }
  );
}


/* =========================================================
   OPEN GAME
========================================================= */

function openGame(id) {

  stopActiveGame();


  const game =
    games.find(
      item =>
        item[0] === id
    );


  $('#gameStage')
  .classList
  .remove(
    'hidden'
  );


  $('#gameEyebrow').textContent =
    'MUSICVERSE ARCADE';


  $('#gameTitle').textContent =
    game[2];


  $('#gameBody').innerHTML =
    '';


  $('#gameStage')
  .scrollIntoView({
    behavior:
      'smooth',

    block:
      'start'
  });


  ({
    rhythm:
      startRhythm,

    guess:
      startGuessSong,

    tiles:
      startPianoTiles,

    pitch:
      startPitch,

    memory:
      startMemory,

    dash:
      startDash,

    hero:
      startInstrumentHero,

    beat:
      startBeatBattle,

    dungeon:
      startDungeon

  }[id])();
}


/* =========================================================
   CLOSE GAME
========================================================= */

$('#closeGameBtn').onclick =
  () => {

    stopActiveGame();


    $('#gameStage')
    .classList
    .add(
      'hidden'
    );
  };


/* =========================================================
   GAME INTERVAL / KEYBOARD CLEANUP
========================================================= */

let activeIntervals = [];

let activeKeyHandler =
  null;


function every(
  fn,
  ms
) {

  const id =
    setInterval(
      fn,
      ms
    );


  activeIntervals.push(
    id
  );


  return id;
}


function stopActiveGame() {

  activeIntervals
  .forEach(
    clearInterval
  );


  activeIntervals =
    [];


  if (
    activeKeyHandler
  ) {

    document.removeEventListener(
      'keydown',
      activeKeyHandler
    );


    activeKeyHandler =
      null;
  }
}


/* =========================================================
   RHYTHM RUSH
========================================================= */

function startRhythm() {

  $('#gameBody').innerHTML = `

    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Score
          <b id="rrScore">
            0
          </b>
        </span>

        <span class="game-stat">
          Combo
          <b id="rrCombo">
            0
          </b>
        </span>

        <span class="game-stat">
          Time
          <b id="rrTime">
            20
          </b>s
        </span>

      </div>


      <div
        id="rrBoard"
        class="lane-board"
      >

        ${
          [
            'D',
            'F',
            'J',
            'K'
          ]
          .map(
            (
              key,
              index
            ) => `

              <div
                class="lane"
                data-lane="${index}"
              >

                <div class="lane-key">
                  ${key}
                </div>

              </div>
            `
          )
          .join('')
        }

      </div>


      <p id="rrResult">
        Press D F J K when notes reach the bottom.
      </p>

    </div>
  `;


  let score =
    0;

  let combo =
    0;

  let time =
    20;

  let notes =
    [];


/* =========================================================
   RHYTHM NOTE SPAWN
========================================================= */

  function spawn() {

    const lane =
      rand(
        0,
        3
      );


    const element =
      document.createElement(
        'div'
      );


    element.className =
      'fall-note';


    element.style.top =
      '-30px';


    element.dataset.y =
      '-30';


    element.dataset.lane =
      lane;


    $('#rrBoard')
    .children[
      lane
    ]
    .appendChild(
      element
    );


    notes.push(
      element
    );
  }


  every(
    spawn,
    650
  );


/* =========================================================
   RHYTHM NOTE MOVEMENT
========================================================= */

  every(
    () => {

      notes =
        [
          ...notes
        ]
        .filter(
          note => {

            let y =
              +note.dataset.y +
              8;


            note.dataset.y =
              y;


            note.style.top =
              y + 'px';


            if (
              y >
              330
            ) {

              note.remove();


              combo =
                0;


              $('#rrCombo').textContent =
                combo;


              S.miss();


              return false;
            }


            return true;
          }
        );
    },

    35
  );


/* =========================================================
   RHYTHM TIMER
========================================================= */

  every(
    () => {

      time--;


      $('#rrTime').textContent =
        time;


      if (
        time <=
        0
      ) {

        stopActiveGame();


        $('#rrResult').textContent =
          `Finished! Score ${score}.`;


        const xp =

          20 +

          Math.round(
            score /
            300
          );


        reward(

          xp,

          Math.round(
            xp *
            0.6
          ),

          'Rhythm Rush complete!'
        );


        addMastery(

          profile.equipped,

          Math.round(
            score /
            500
          )
        );
      }
    },

    1000
  );


/* =========================================================
   RHYTHM KEY HANDLER
========================================================= */

  activeKeyHandler =
    event => {

      const map = {

        d:
          0,

        f:
          1,

        j:
          2,

        k:
          3
      };


      const lane =
        map[
          event.key
          .toLowerCase()
        ];


      if (
        lane ===
        undefined
      ) {

        return;
      }


      const candidates =

        notes
        .filter(
          note =>
            +note.dataset.lane ===
            lane
        )
        .sort(
          (
            a,
            b
          ) =>
            +b.dataset.y -
            +a.dataset.y
        );


      const note =
        candidates[0];


      if (
        !note
      ) {

        combo =
          0;


        S.miss();


        return;
      }


      const y =
        +note.dataset.y;


      const distance =
        Math.abs(
          306 -
          y
        );


      if (
        distance <
        32
      ) {

        score +=
          distance <
          12
            ? 150
            : 100;


        combo++;


        distance <
        12

          ? S.perfect()

          : S.great();


        note.remove();


        notes =
          notes.filter(
            item =>
              item !== note
          );
      }


      else {

        combo =
          0;


        S.miss();
      }


      $('#rrScore').textContent =
        score;


      $('#rrCombo').textContent =
        combo;
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* =========================================================
   GUESS THE SONG
========================================================= */

const melodies = [

  {
    name:
      'Twinkle Twinkle Little Star',

    notes: [
      261.6,
      261.6,
      392,
      392,
      440,
      440,
      392
    ]
  },

  {
    name:
      'Ode to Joy',

    notes: [
      329.6,
      329.6,
      349.2,
      392,
      392,
      349.2,
      329.6,
      293.7
    ]
  },

  {
    name:
      'Mary Had a Little Lamb',

    notes: [
      329.6,
      293.7,
      261.6,
      293.7,
      329.6,
      329.6,
      329.6
    ]
  }
];


/* =========================================================
   PLAY MELODY
========================================================= */

function playMelody(
  melody
) {

  melody.notes
  .forEach(
    (
      note,
      index
    ) =>

      SoundEngine.tone(

        note,

        0.26,

        'sine',

        0.09,

        index *
        0.24
      )
  );
}


/* =========================================================
   START GUESS THE SONG
========================================================= */

function startGuessSong() {

  let score =
    0;

  let round =
    0;

  let current;


/* =========================================================
   RENDER GUESS SONG ROUND
========================================================= */

  const render =
    () => {

      current =
        pick(
          melodies
        );


      const options = [

        current.name,

        ...melodies
        .filter(
          item =>
            item !== current
        )
        .map(
          item =>
            item.name
        )
      ]
      .sort(
        () =>
          Math.random() -
          0.5
      );


      $('#gameBody').innerHTML = `

        <div class="game-panel">

          <div class="game-toolbar">

            <span class="game-stat">
              Round ${round + 1}/5
            </span>

            <span class="game-stat">
              Score ${score}
            </span>

          </div>


          <button
            id="playSongBtn"
            class="btn gold"
          >
            ▶ Play Melody
          </button>


          <div
            class="choice-grid"
            style="margin-top:16px"
          >

            ${
              options
              .map(
                option => `

                  <button
                    data-song="${option}"
                  >
                    ${option}
                  </button>
                `
              )
              .join('')
            }

          </div>


          <p>
            Listen carefully, then choose the melody.
          </p>

        </div>
      `;


/* =========================================================
   PLAY SONG BUTTON
========================================================= */

      $('#playSongBtn').onclick =
        () =>
          playMelody(
            current
          );


/* =========================================================
   SONG ANSWERS
========================================================= */

      $$('[data-song]')
      .forEach(
        button => {

          button.onclick =
            () => {

              const correct =
                button.dataset.song ===
                current.name;


              correct

                ? (
                    score++,
                    S.correct()
                  )

                : S.wrong();


              round++;


/* =========================================================
   GUESS SONG FINISH
========================================================= */

              if (
                round >=
                5
              ) {

                const xp =
                  score *
                  10 +
                  10;


                reward(

                  xp,

                  score *
                  8,

                  'Guess the Song complete!'
                );


                $('#gameBody').innerHTML = `

                  <div class="game-panel">

                    <h3>
                      ${score}/5 correct
                    </h3>

                    <button
                      id="againGuess"
                      class="btn gold"
                    >
                      Play Again
                    </button>

                  </div>
                `;


                $('#againGuess').onclick =
                  startGuessSong;
              }


              else {

                render();
              }
            };
        }
      );
    };


  render();
}
/* =========================================================
   PIANO TILES
========================================================= */

function startPianoTiles() {

  $('#gameBody').innerHTML = `

    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Score
          <b id="ptScore">
            0
          </b>
        </span>

        <span class="game-stat">
          Time
          <b id="ptTime">
            20
          </b>s
        </span>

      </div>


      <div
        id="ptBoard"
        class="piano-tiles-board"
      >

        ${
          [0, 1, 2, 3]
          .map(
            lane => `
              <div
                class="piano-lane"
                data-pt-lane="${lane}"
              ></div>
            `
          )
          .join('')
        }

      </div>


      <p id="ptResult">
        Click the black tiles before they reach the bottom.
      </p>

    </div>
  `;


  let score =
    0;

  let time =
    20;

  let tiles =
    [];


/* =========================================================
   SPAWN TILE
========================================================= */

  function spawnTile() {

    const lane =
      rand(
        0,
        3
      );


    const tile =
      document.createElement(
        'button'
      );


    tile.className =
      'piano-tile';


    tile.dataset.y =
      '-70';


    tile.style.top =
      '-70px';


    tile.onclick =
      () => {

        const y =
          +tile.dataset.y;


        if (
          y >
          250
        ) {

          score +=
            100;


          $('#ptScore').textContent =
            score;


          S.perfect();


          tile.remove();


          tiles =
            tiles.filter(
              item =>
                item !== tile
            );
        }


        else {

          S.miss();
        }
      };


    $('#ptBoard')
    .children[
      lane
    ]
    .appendChild(
      tile
    );


    tiles.push(
      tile
    );
  }


  every(
    spawnTile,
    480
  );


/* =========================================================
   MOVE TILES
========================================================= */

  every(
    () => {

      tiles =
        [
          ...tiles
        ]
        .filter(
          tile => {

            const y =
              +tile.dataset.y +
              7;


            tile.dataset.y =
              y;


            tile.style.top =
              y + 'px';


            if (
              y >
              360
            ) {

              tile.remove();


              S.miss();


              return false;
            }


            return true;
          }
        );
    },

    35
  );


/* =========================================================
   PIANO TILES TIMER
========================================================= */

  every(
    () => {

      time--;


      $('#ptTime').textContent =
        time;


      if (
        time <=
        0
      ) {

        stopActiveGame();


        const xp =
          15 +
          Math.round(
            score /
            250
          );


        const coins =
          Math.round(
            xp *
            0.5
          );


        $('#ptResult').textContent =
          `Finished! Score ${score}.`;


        reward(

          xp,

          coins,

          'Piano Tiles complete!'
        );
      }
    },

    1000
  );
}


/* =========================================================
   PERFECT PITCH
========================================================= */

const pitchNotes = [

  {
    name:
      'C',

    frequency:
      261.6
  },

  {
    name:
      'D',

    frequency:
      293.7
  },

  {
    name:
      'E',

    frequency:
      329.6
  },

  {
    name:
      'F',

    frequency:
      349.2
  },

  {
    name:
      'G',

    frequency:
      392
  },

  {
    name:
      'A',

    frequency:
      440
  },

  {
    name:
      'B',

    frequency:
      493.9
  }
];


/* =========================================================
   START PERFECT PITCH
========================================================= */

function startPitch() {

  let round =
    0;

  let score =
    0;

  let current;


/* =========================================================
   RENDER PERFECT PITCH ROUND
========================================================= */

  function render() {

    current =
      pick(
        pitchNotes
      );


    $('#gameBody').innerHTML = `

      <div class="game-panel">

        <div class="game-toolbar">

          <span class="game-stat">
            Round ${round + 1}/10
          </span>

          <span class="game-stat">
            Score ${score}
          </span>

        </div>


        <button
          id="pitchPlayBtn"
          class="btn gold"
        >
          🔊 Play Note
        </button>


        <div
          class="choice-grid"
          style="margin-top:16px"
        >

          ${
            pitchNotes
            .map(
              note => `

                <button
                  data-pitch-note="${note.name}"
                >
                  ${note.name}
                </button>
              `
            )
            .join('')
          }

        </div>


        <p>
          Listen to the note and identify it.
        </p>

      </div>
    `;


/* =========================================================
   PLAY PERFECT PITCH NOTE
========================================================= */

    $('#pitchPlayBtn').onclick =
      () => {

        SoundEngine.tone(

          current.frequency,

          0.6,

          'sine',

          0.12
        );
      };


/* =========================================================
   PERFECT PITCH ANSWERS
========================================================= */

    $$('[data-pitch-note]')
    .forEach(
      button => {

        button.onclick =
          () => {

            const correct =
              button.dataset
              .pitchNote ===
              current.name;


            if (
              correct
            ) {

              score++;


              S.correct();
            }


            else {

              S.wrong();
            }


            round++;


/* =========================================================
   PERFECT PITCH COMPLETE
========================================================= */

            if (
              round >=
              10
            ) {

              const xp =
                score *
                6 +
                10;


              const coins =
                score *
                4;


              reward(

                xp,

                coins,

                'Perfect Pitch complete!'
              );


              $('#gameBody').innerHTML = `

                <div class="game-panel">

                  <h3>
                    ${score}/10 correct
                  </h3>

                  <button
                    id="pitchAgain"
                    class="btn gold"
                  >
                    Play Again
                  </button>

                </div>
              `;


              $('#pitchAgain').onclick =
                startPitch;
            }


            else {

              render();
            }
          };
      }
    );
  }


  render();
}


/* =========================================================
   MELODY MEMORY
========================================================= */

const memoryNotes = [

  {
    name:
      'C',

    frequency:
      261.6
  },

  {
    name:
      'D',

    frequency:
      293.7
  },

  {
    name:
      'E',

    frequency:
      329.6
  },

  {
    name:
      'G',

    frequency:
      392
  },

  {
    name:
      'A',

    frequency:
      440
  }
];


/* =========================================================
   START MELODY MEMORY
========================================================= */

function startMemory() {

  let sequence =
    [];

  let playerIndex =
    0;

  let round =
    0;

  let accepting =
    false;


/* =========================================================
   RENDER MEMORY GAME
========================================================= */

  $('#gameBody').innerHTML = `

    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Round
          <b id="memoryRound">
            0
          </b>
        </span>

      </div>


      <div
        id="memoryButtons"
        class="memory-note-grid"
      >

        ${
          memoryNotes
          .map(
            (
              note,
              index
            ) => `

              <button
                data-memory-note="${index}"
              >
                ${note.name}
              </button>
            `
          )
          .join('')
        }

      </div>


      <p id="memoryText">
        Watch and listen carefully.
      </p>

    </div>
  `;


/* =========================================================
   FLASH MEMORY NOTE
========================================================= */

  async function flash(
    index
  ) {

    const button =
      $(
        `[data-memory-note="${index}"]`
      );


    button.classList.add(
      'active'
    );


    SoundEngine.tone(

      memoryNotes[
        index
      ].frequency,

      0.28,

      'sine',

      0.1
    );


    await wait(
      320
    );


    button.classList.remove(
      'active'
    );


    await wait(
      120
    );
  }


/* =========================================================
   PLAY MEMORY SEQUENCE
========================================================= */

  async function playSequence() {

    accepting =
      false;


    $('#memoryText').textContent =
      'Listen...';


    for (
      const note of
      sequence
    ) {

      await flash(
        note
      );
    }


    playerIndex =
      0;


    accepting =
      true;


    $('#memoryText').textContent =
      'Your turn!';
  }


/* =========================================================
   NEXT MEMORY ROUND
========================================================= */

  async function nextRound() {

    round++;


    $('#memoryRound').textContent =
      round;


    sequence.push(

      rand(
        0,
        memoryNotes.length -
        1
      )
    );


    await wait(
      500
    );


    playSequence();
  }


/* =========================================================
   MEMORY NOTE BUTTONS
========================================================= */

  $$('[data-memory-note]')
  .forEach(
    button => {

      button.onclick =
        async () => {

          if (
            !accepting
          ) {

            return;
          }


          const index =
            +button.dataset
            .memoryNote;


          SoundEngine.tone(

            memoryNotes[
              index
            ].frequency,

            0.2,

            'sine',

            0.1
          );


/* =========================================================
   WRONG MEMORY NOTE
========================================================= */

          if (
            index !==
            sequence[
              playerIndex
            ]
          ) {

            accepting =
              false;


            S.wrong();


            const xp =
              8 +
              round *
              5;


            const coins =
              round *
              4;


            reward(

              xp,

              coins,

              'Melody Memory complete!'
            );


            $('#memoryText').textContent =
              `Wrong note! You reached Round ${round}.`;


            const again =
              document.createElement(
                'button'
              );


            again.className =
              'btn gold';


            again.textContent =
              'Play Again';


            again.onclick =
              startMemory;


            $('#memoryText')
            .after(
              again
            );


            return;
          }


/* =========================================================
   CORRECT MEMORY NOTE
========================================================= */

          S.correct();


          playerIndex++;


          if (
            playerIndex >=
            sequence.length
          ) {

            accepting =
              false;


            $('#memoryText').textContent =
              'Perfect! Next round...';


            await wait(
              700
            );


            nextRound();
          }
        };
    }
  );


  nextRound();
}


/* =========================================================
   MUSIC DASH
========================================================= */

function startDash() {

  $('#gameBody').innerHTML = `

    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Score
          <b id="dashScore">
            0
          </b>
        </span>

        <span class="game-stat">
          Time
          <b id="dashTime">
            25
          </b>s
        </span>

      </div>


      <div
        id="dashWorld"
        class="dash-world"
      >

        <div
          id="dashPlayer"
          class="dash-player"
        >
          🎸
        </div>

      </div>


      <p id="dashText">
        Press SHIFT to jump over obstacles.
      </p>

    </div>
  `;


  let score =
    0;

  let time =
    25;

  let jumping =
    false;

  let ended =
    false;


/* =========================================================
   MUSIC DASH JUMP
========================================================= */

  function jump() {

    if (
      jumping ||
      ended
    ) {

      return;
    }


    jumping =
      true;


    $('#dashPlayer')
    .classList
    .add(
      'jump'
    );


    S.jump();


    setTimeout(
      () => {

        $('#dashPlayer')
        .classList
        .remove(
          'jump'
        );


        jumping =
          false;
      },

      520
    );
  }


/* =========================================================
   DASH KEY HANDLER
========================================================= */

  activeKeyHandler =
    event => {

      if (
        event.key ===
        'Shift'
      ) {

        event.preventDefault();


        jump();
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );


/* =========================================================
   CREATE DASH OBJECT
========================================================= */

  function createDashObject(
    type
  ) {

    if (
      ended
    ) {

      return;
    }


    const object =
      document.createElement(
        'div'
      );


    object.className =
      type ===
      'obstacle'

        ? 'dash-obstacle'

        : 'dash-note';


    object.textContent =
      type ===
      'obstacle'

        ? '🎵'

        : '🪙';


    object.style.left =
      '100%';


    $('#dashWorld')
    .appendChild(
      object
    );


    let x =
      100;


/* =========================================================
   MOVE DASH OBJECT
========================================================= */

    const id =
      setInterval(
        () => {

          if (
            ended ||
            !object.isConnected
          ) {

            clearInterval(
              id
            );


            return;
          }


          x -=
            2.5;


          object.style.left =
            x + '%';


/* =========================================================
   COLLISION AREA
========================================================= */

          if (
            x <
              17 &&
            x >
              5
          ) {


/* =========================================================
   HIT OBSTACLE
========================================================= */

            if (
              type ===
                'obstacle' &&
              !jumping
            ) {

              score =
                Math.max(

                  0,

                  score -
                  100
                );


              $('#dashScore').textContent =
                score;


              S.miss();


              object.remove();


              clearInterval(
                id
              );


              return;
            }


/* =========================================================
   COLLECT MUSIC COIN
========================================================= */

            if (
              type ===
              'note'
            ) {

              score +=
                50;


              $('#dashScore').textContent =
                score;


              S.coin();


              object.remove();


              clearInterval(
                id
              );


              return;
            }
          }


/* =========================================================
   REMOVE OBJECT OFFSCREEN
========================================================= */

          if (
            x <
            -10
          ) {

            object.remove();


            clearInterval(
              id
            );
          }
        },

        35
      );


    activeIntervals.push(
      id
    );
  }


/* =========================================================
   DASH OBJECT SPAWNER
========================================================= */

  every(
    () => {

      if (
        Math.random() <
        0.45
      ) {

        createDashObject(
          'obstacle'
        );
      }


      if (
        Math.random() <
        0.65
      ) {

        setTimeout(
          () =>
            createDashObject(
              'note'
            ),

          250
        );
      }
    },

    700
  );


/* =========================================================
   DASH TIMER
========================================================= */

  every(
    () => {

      time--;


      $('#dashTime').textContent =
        time;


      if (
        time <=
        0
      ) {

        ended =
          true;


        stopActiveGame();


        const xp =
          20 +
          Math.round(
            score /
            100
          );


        const coins =
          Math.round(
            score /
            25
          );


        $('#dashText').textContent =
          `Finished! Score ${score}.`;


        reward(

          xp,

          coins,

          'Music Dash complete!'
        );
      }
    },

    1000
  );
}
/* =========================================================
   INSTRUMENT HERO
========================================================= */

function startInstrumentHero() {

  const inst =
    getInstrument(
      profile.equipped
    );


  $('#gameBody').innerHTML = `

    <div class="game-panel">

      <h3>
        ${inst.icon} ${inst.name} Hero
      </h3>

      <p>
        Hit A S D F in sequence. Faster streaks give more points.
      </p>


      <div class="game-toolbar">

        <span class="game-stat">
          Target
          <b id="ihTarget">
            A
          </b>
        </span>

        <span class="game-stat">
          Score
          <b id="ihScore">
            0
          </b>
        </span>

        <span class="game-stat">
          Time
          <b id="ihTime">
            20
          </b>s
        </span>

      </div>

    </div>
  `;


  const keys = [
    'a',
    's',
    'd',
    'f'
  ];


  let target =
    pick(
      keys
    );


  let score =
    0;


  let time =
    20;


  $('#ihTarget').textContent =
    target.toUpperCase();


/* =========================================================
   INSTRUMENT HERO KEY HANDLER
========================================================= */

  activeKeyHandler =
    event => {

      if (
        !keys.includes(
          event.key.toLowerCase()
        )
      ) {

        return;
      }


      if (
        event.key.toLowerCase() ===
        target
      ) {

        score +=
          100;


        S.perfect();


        playInstrument(

          inst.name,

          440 +
          score %
          300
        );


        target =
          pick(
            keys
          );


        $('#ihTarget').textContent =
          target.toUpperCase();


        $('#ihScore').textContent =
          score;
      }


      else {

        score =
          Math.max(

            0,

            score -
            25
          );


        S.miss();
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );


/* =========================================================
   INSTRUMENT HERO TIMER
========================================================= */

  every(
    () => {

      time--;


      $('#ihTime').textContent =
        time;


      if (
        time <=
        0
      ) {

        stopActiveGame();


        const xp =
          25 +
          Math.round(
            score /
            250
          );


        reward(

          xp,

          Math.round(
            xp *
            0.7
          ),

          'Instrument Hero complete!'
        );


        addMastery(

          inst.name,

          Math.round(
            score /
            400
          )
        );
      }
    },

    1000
  );
}


/* =========================================================
   BEAT BATTLE
========================================================= */

function startBeatBattle() {

  $('#gameBody').innerHTML = `

    <div class="game-panel">

      <h3>
        🎧 Bass Golem
      </h3>


      <div
        class="hpbar red"
        style="
          max-width:520px;
          margin:10px auto
        "
      >

        <i
          id="bbBossHp"
          style="width:100%"
        ></i>

      </div>


      <b id="bbBossText">
        3000 / 3000
      </b>


      <p>
        Press SHIFT when the marker is inside the gold zone.
      </p>


      <div
        style="
          height:28px;
          max-width:520px;
          margin:18px auto;
          background:#13263a;
          border-radius:999px;
          position:relative
        "
      >

        <div
          style="
            position:absolute;
            left:44%;
            width:12%;
            top:0;
            bottom:0;
            background:#b79143
          "
        ></div>


        <i
          id="bbMarker"
          style="
            position:absolute;
            width:8px;
            top:-4px;
            bottom:-4px;
            background:#fff;
            border-radius:6px
          "
        ></i>

      </div>


      <p id="bbText">
        Ready...
      </p>

    </div>
  `;


  let hp =
    3000;


  let pos =
    0;


  let dir =
    1;


  let ended =
    false;


/* =========================================================
   BEAT BATTLE MARKER
========================================================= */

  every(
    () => {

      pos +=
        dir *
        2.5;


      if (
        pos >= 100 ||
        pos <= 0
      ) {

        dir *=
          -1;
      }


      $('#bbMarker').style.left =
        `calc(${pos}% - 4px)`;
    },

    20
  );


/* =========================================================
   BEAT BATTLE KEY HANDLER
========================================================= */

  activeKeyHandler =
    event => {

      if (
        !(
          event.key ===
            'Shift' ||

          event.code ===
            'ShiftLeft' ||

          event.code ===
            'ShiftRight'
        ) ||

        ended
      ) {

        return;
      }


      const dist =
        Math.abs(
          pos -
          50
        );


      let dmg;


/* =========================================================
   PERFECT / GREAT / MISS
========================================================= */

      if (
        dist <=
        6
      ) {

        dmg =
          420;


        S.perfect();
      }


      else if (
        dist <=
        14
      ) {

        dmg =
          260;


        S.great();
      }


      else {

        dmg =
          90;


        S.miss();
      }


      hp =
        Math.max(

          0,

          hp -
          dmg
        );


      $('#bbBossHp').style.width =
        `${hp / 30}%`;


      $('#bbBossText').textContent =
        `${hp} / 3000`;


      $('#bbText').textContent =
        `${dmg} damage!`;


      playInstrument(

        profile.equipped,

        520
      );


/* =========================================================
   BEAT BATTLE VICTORY
========================================================= */

      if (
        hp <=
        0
      ) {

        ended =
          true;


        stopActiveGame();


        S.victory();


        reward(

          45,

          35,

          'Bass Golem defeated!'
        );


        addInstrumentXP(

          profile.equipped,

          10
        );


        addMastery(

          profile.equipped,

          20
        );
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* =========================================================
   MUSIC DUNGEON
========================================================= */

function startDungeon() {

  let room =
    1;


  let hp =
    100;


  let boss =
    room %
    4 ===
    0;


  let enemyHp =
    boss
      ? 1200
      : 420;


/* =========================================================
   RENDER DUNGEON ROOM
========================================================= */

  const render =
    () => {

      $('#gameBody').innerHTML = `

        <div class="game-panel">

          <h3>

            Room ${room}

            ${
              boss
                ? '👹 BOSS CHAMBER'
                : '🎵 Echo Chamber'
            }

          </h3>


          <p>

            Your HP:
            <b>${hp}</b>

            •

            Enemy HP:
            <b>${enemyHp}</b>

          </p>


          <div class="dungeon-actions">

            <button
              id="dAtk"
              class="btn gold"
            >
              ⚔️ Perform Attack
            </button>


            <button
              id="dHeal"
              class="btn ghost"
            >
              💚 Heal
            </button>


            <button
              id="dChest"
              class="btn ghost"
            >
              🎁 Search Room
            </button>

          </div>


          <p id="dMsg">
            Choose an action.
          </p>

        </div>
      `;


/* =========================================================
   DUNGEON ATTACK
========================================================= */

      $('#dAtk').onclick =
        () => {

          const inst =
            getUpgradedInstrument(
              profile.equipped
            );


          const dmg =
            Math.round(

              inst.attack *
              2.8 +

              rand(
                30,
                80
              )
            );


          enemyHp =
            Math.max(

              0,

              enemyHp -
              dmg
            );


          playInstrument(

            inst.name,

            440
          );


          S.attack();


/* =========================================================
   DUNGEON ENEMY DEFEATED
========================================================= */

          if (
            enemyHp <=
            0
          ) {

            const xp =
              boss
                ? 50
                : 8;


            const coins =
              boss
                ? 35
                : 5;


            reward(

              xp,

              coins,

              boss
                ? 'Dungeon boss defeated!'
                : 'Room cleared!'
            );


            addMastery(

              inst.name,

              boss
                ? 15
                : 4
            );


            room++;


            boss =
              room %
              4 ===
              0;


            enemyHp =
              boss
                ? 1200
                : 420;


            hp =
              Math.min(

                100,

                hp +
                15
              );


            render();


            return;
          }


/* =========================================================
   DUNGEON ENEMY ATTACK
========================================================= */

          const hurt =
            rand(

              8,

              boss
                ? 24
                : 16
            );


          hp =
            Math.max(

              0,

              hp -
              hurt
            );


/* =========================================================
   DUNGEON DEFEAT
========================================================= */

          if (
            hp <=
            0
          ) {

            S.defeat();


            addXP(
              10
            );


            $('#gameBody').innerHTML = `

              <div class="game-panel">

                <h3>
                  Dungeon Run Ended
                </h3>

                <p>
                  You reached room ${room}.
                  +10 EXP
                </p>

                <button
                  id="dAgain"
                  class="btn gold"
                >
                  Try Again
                </button>

              </div>
            `;


            $('#dAgain').onclick =
              startDungeon;
          }


          else {

            render();
          }
        };


/* =========================================================
   DUNGEON HEAL
========================================================= */

      $('#dHeal').onclick =
        () => {

          hp =
            Math.min(

              100,

              hp +
              rand(
                15,
                25
              )
            );


          S.heal();


          render();
        };


/* =========================================================
   DUNGEON CHEST
========================================================= */

      $('#dChest').onclick =
        () => {

          if (
            Math.random() <
            0.55
          ) {

            profile.coins +=
              rand(
                2,
                8
              );


            persist();


            updateProfileUI();


            S.treasure();


            toast(
              'Treasure found!'
            );
          }


          else {

            hp =
              Math.max(

                1,

                hp -
                rand(
                  4,
                  10
                )
              );


            S.wrong();


            toast(
              'A trap!'
            );
          }


          render();
        };
    };


  render();
}


/* =========================================================
   GACHA
========================================================= */

const gachaData = {

  accessory: [

    [
      'Black Cap',
      'Common'
    ],

    [
      'Studio Headphones',
      'Uncommon'
    ],

    [
      'Star Glasses',
      'Rare'
    ],

    [
      'Cyber Visor',
      'Epic'
    ],

    [
      'Royal Crown',
      'Legendary'
    ],

    [
      'MusicVerse Crown',
      'Mythic'
    ]
  ],


  pet: [

    [
      'Music Cat',
      'Common'
    ],

    [
      'Beat Puppy',
      'Common'
    ],

    [
      'Neon Fox',
      'Rare'
    ],

    [
      'Music Ghost',
      'Epic'
    ],

    [
      'Phoenix',
      'Legendary'
    ],

    [
      'Celestial Dragon',
      'Mythic'
    ]
  ],


  aura: [

    [
      'Musical Notes',
      'Common'
    ],

    [
      'Rhythm Pulse',
      'Uncommon'
    ],

    [
      'Flame Aura',
      'Rare'
    ],

    [
      'Lightning Aura',
      'Epic'
    ],

    [
      'Celestial Aura',
      'Legendary'
    ],

    [
      'Galaxy Aura',
      'Mythic'
    ]
  ],


  skin: [

    [
      'Sakura Skin',
      'Rare'
    ],

    [
      'Thunder Skin',
      'Epic'
    ],

    [
      'Phoenix Skin',
      'Legendary'
    ],

    [
      'Cosmic Void Skin',
      'Mythic'
    ]
  ]
};


let activeGacha =
  'accessory';


const costs = {

  accessory:
    100,

  pet:
    200,

  aura:
    175,

  skin:
    150
};


/* =========================================================
   GACHA RARITY ROLL
========================================================= */

function rarityRoll() {

  const r =
    Math.random() *
    100;


  return r < 0.5
    ? 'Mythic'

    : r < 3
      ? 'Legendary'

      : r < 11
        ? 'Epic'

        : r < 27
          ? 'Rare'

          : r < 55
            ? 'Uncommon'

            : 'Common';
}


/* =========================================================
   UPDATE GACHA UI
========================================================= */

function updateGachaUI() {

  const titles = {

    accessory:
      'Accessory Capsule',

    pet:
      'Pet Capsule',

    aura:
      'Aura Capsule',

    skin:
      'Skin Capsule'
  };


  $('#gachaTitle').textContent =
    titles[
      activeGacha
    ];


  $('#rollOneBtn').textContent =
    `Roll x1 • ${costs[activeGacha]} Coins`;


  $('#rollTenBtn').textContent =
    `Roll x10 • ${costs[activeGacha] * 9} Coins`;
}


/* =========================================================
   SAFE GACHA RARITY FALLBACK
========================================================= */

const rarityOrder = [

  'Common',

  'Uncommon',

  'Rare',

  'Epic',

  'Legendary',

  'Mythic'
];


function pickGachaItem(
  pool,
  desired
) {

  let idx =
    rarityOrder.indexOf(
      desired
    );


  for (
    let d = 0;
    d < rarityOrder.length;
    d++
  ) {

    const low =
      idx -
      d;


    const high =
      idx +
      d;


    if (
      low >=
      0
    ) {

      const matches =
        pool.filter(
          item =>
            item[1] ===
            rarityOrder[
              low
            ]
        );


      if (
        matches.length
      ) {

        return pick(
          matches
        );
      }
    }


    if (
      d &&
      high <
      rarityOrder.length
    ) {

      const matches =
        pool.filter(
          item =>
            item[1] ===
            rarityOrder[
              high
            ]
        );


      if (
        matches.length
      ) {

        return pick(
          matches
        );
      }
    }
  }


  return pick(
    pool
  );
}


/* =========================================================
   ROLL GACHA
========================================================= */

function rollGacha(
  count = 1
) {

  const cost =

    costs[
      activeGacha
    ] *

    (
      count ===
      10

        ? 9

        : 1
    );


  if (
    profile.coins <
    cost
  ) {

    return toast(
      'Not enough coins.'
    );
  }


  profile.coins -=
    cost;


  const results =
    [];


/* =========================================================
   GACHA ROLL LOOP
========================================================= */

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const desired =
      rarityRoll();


    const pool =
      gachaData[
        activeGacha
      ];


    const item =
      pickGachaItem(

        pool,

        desired
      );


    const key =
      `${activeGacha}:${item[0]}`;


/* =========================================================
   DUPLICATE ITEM
========================================================= */

    if (
      profile.inventory
      .some(
        inventoryItem =>
          inventoryItem.key ===
          key
      )
    ) {

      profile.dust +=

        item[1] ===
        'Mythic'

          ? 80

          : item[1] ===
            'Legendary'

            ? 40

            : 10;


      results.push(
        `${item[0]} → Dust`
      );
    }


/* =========================================================
   NEW ITEM
========================================================= */

    else {

      profile.inventory.push({

        key,

        type:
          activeGacha,

        name:
          item[0],

        rarity:
          item[1]
      });


      results.push(
        `${item[1]} ${item[0]}`
      );
    }
  }


  persist();


  updateProfileUI();


  renderInventory();


  $('#gachaReveal').textContent =
    results.join(
      ' • '
    );


  S.gacha();
}


/* =========================================================
   RENDER GACHA INVENTORY
========================================================= */

function renderInventory() {

  $('#inventoryGrid').innerHTML =

    profile.inventory.length

      ? profile.inventory
        .map(
          item => `

            <div class="inventory-item">

              <b>
                ${item.rarity}
              </b>

              ${item.name}

              <small>
                ${item.type}
              </small>

            </div>
          `
        )
        .join('')

      : '<p class="muted">No cosmetics yet.</p>';
}


/* =========================================================
   GACHA TABS
========================================================= */

$$('.gacha-tab')
.forEach(
  button => {

    button.onclick =
      () => {

        $$('.gacha-tab')
        .forEach(
          tab =>
            tab.classList.remove(
              'active'
            )
        );


        button.classList.add(
          'active'
        );


        activeGacha =
          button.dataset.gacha;


        updateGachaUI();
      };
  }
);


/* =========================================================
   GACHA ROLL BUTTONS
========================================================= */

$('#rollOneBtn').onclick =
  () =>
    rollGacha(
      1
    );


$('#rollTenBtn').onclick =
  () =>
    rollGacha(
      10
    );
/* ============================ MUSICCRAFT ============================ */

const craftCanvas =
  $('#craftCanvas');

const ctx =
  craftCanvas
    ?.getContext
    ?.('2d') ||
  null;


let craftWorld =
  [];

let craftMined =
  0;

let craftDepth =
  0;

let craftLayer =
  0;


/* =========================================================
   MUSICCRAFT DEPTHS
========================================================= */

const craftTypesByDepth = [

  {
    name:
      'Surface',

    blocks: [

      [
        'Dirt',
        '#70513c',
        1,
        1
      ],

      [
        'Stone',
        '#6d7885',
        1,
        2
      ],

      [
        'Coal',
        '#28313a',
        2,
        2
      ]
    ]
  },


  {
    name:
      'Shallow Underground',

    blocks: [

      [
        'Dirt',
        '#5f4435',
        1,
        1
      ],

      [
        'Stone',
        '#68727d',
        1,
        2
      ],

      [
        'Coal',
        '#28313a',
        2,
        2
      ],

      [
        'Copper',
        '#b87333',
        3,
        2
      ]
    ]
  },


  {
    name:
      'Stone Tunnels',

    blocks: [

      [
        'Stone',
        '#626d79',
        1,
        2
      ],

      [
        'Coal',
        '#252d34',
        2,
        2
      ],

      [
        'Copper',
        '#b87333',
        3,
        2
      ],

      [
        'Iron',
        '#9b8c7a',
        3,
        3
      ]
    ]
  },


  {
    name:
      'Coal Depths',

    blocks: [

      [
        'Stone',
        '#5c6570',
        1,
        2
      ],

      [
        'Coal',
        '#1f252b',
        3,
        2
      ],

      [
        'Iron',
        '#9b8c7a',
        3,
        3
      ],

      [
        'Silver',
        '#b7bec8',
        4,
        3
      ]
    ]
  },


  {
    name:
      'Iron Caverns',

    blocks: [

      [
        'Stone',
        '#59636e',
        1,
        2
      ],

      [
        'Iron',
        '#9b8c7a',
        4,
        3
      ],

      [
        'Silver',
        '#b7bec8',
        5,
        3
      ],

      [
        'Gold',
        '#d8ad42',
        6,
        4
      ]
    ]
  },


  {
    name:
      'Deep Caves',

    blocks: [

      [
        'Stone',
        '#525b66',
        1,
        2
      ],

      [
        'Iron',
        '#8f8274',
        4,
        3
      ],

      [
        'Gold',
        '#d8ad42',
        6,
        4
      ],

      [
        'Ruby',
        '#d94a62',
        8,
        4
      ]
    ]
  },


  {
    name:
      'Gold Veins',

    blocks: [

      [
        'Stone',
        '#4d5661',
        1,
        2
      ],

      [
        'Gold',
        '#d8ad42',
        7,
        4
      ],

      [
        'Ruby',
        '#d94a62',
        9,
        4
      ],

      [
        'Emerald',
        '#4fca83',
        10,
        4
      ]
    ]
  },


  {
    name:
      'Crystal Caverns',

    blocks: [

      [
        'Stone',
        '#48525e',
        1,
        2
      ],

      [
        'Gold',
        '#d8ad42',
        7,
        4
      ],

      [
        'Crystal',
        '#8e73ff',
        12,
        5
      ],

      [
        'Amethyst',
        '#a66cff',
        14,
        5
      ]
    ]
  },


  {
    name:
      'Diamond Depths',

    blocks: [

      [
        'Dark Stone',
        '#3b4652',
        2,
        3
      ],

      [
        'Crystal',
        '#8e73ff',
        12,
        5
      ],

      [
        'Diamond',
        '#55d7e8',
        16,
        6
      ],

      [
        'Sapphire',
        '#4a78ef',
        15,
        5
      ]
    ]
  },


  {
    name:
      'Obsidian Ruins',

    blocks: [

      [
        'Obsidian',
        '#27243a',
        4,
        5
      ],

      [
        'Diamond',
        '#55d7e8',
        16,
        6
      ],

      [
        'Sapphire',
        '#4a78ef',
        15,
        5
      ],

      [
        'Ancient Ore',
        '#9f865a',
        20,
        6
      ]
    ]
  },


  {
    name:
      'Ancient Depths',

    blocks: [

      [
        'Obsidian',
        '#211d31',
        4,
        5
      ],

      [
        'Ancient Ore',
        '#9f865a',
        20,
        6
      ],

      [
        'Ancient Crystal',
        '#d6b3ff',
        24,
        7
      ],

      [
        'Relic Stone',
        '#786246',
        18,
        6
      ]
    ]
  },


  {
    name:
      'Magma Zone',

    blocks: [

      [
        'Basalt',
        '#2c292e',
        4,
        5
      ],

      [
        'Obsidian',
        '#1c1925',
        5,
        6
      ],

      [
        'Magma Crystal',
        '#ff6a3d',
        28,
        7
      ],

      [
        'Fire Gem',
        '#ffb347',
        32,
        7
      ]
    ]
  },


  {
    name:
      'Echo Abyss',

    blocks: [

      [
        'Void Stone',
        '#171624',
        5,
        6
      ],

      [
        'Echo Crystal',
        '#5ed4ff',
        32,
        7
      ],

      [
        'Void Gem',
        '#8857ff',
        38,
        8
      ],

      [
        'Resonance Ore',
        '#d04fff',
        42,
        8
      ]
    ]
  },


  {
    name:
      'Celestial Core',

    blocks: [

      [
        'Celestial Stone',
        '#27395d',
        6,
        7
      ],

      [
        'Star Crystal',
        '#ffe178',
        45,
        8
      ],

      [
        'Moonstone',
        '#b9d7ff',
        48,
        8
      ],

      [
        'Celestial Gem',
        '#e5d3ff',
        55,
        9
      ]
    ]
  },


  {
    name:
      'MusicVerse Core',

    blocks: [

      [
        'Core Stone',
        '#13101d',
        7,
        8
      ],

      [
        'Music Crystal',
        '#f3d77c',
        65,
        9
      ],

      [
        'Harmony Gem',
        '#71e7d3',
        75,
        9
      ],

      [
        'CoreShard',
        '#fff1a8',
        100,
        10
      ]
    ]
  }
];


/* =========================================================
   MUSICCRAFT PET EGGS
========================================================= */

const craftPetEggs = [

  [
    'Surface',
    'Meadow Egg',
    '🌱',
    'Music Bunny',
    '#8bd46e',
    0.035
  ],

  [
    'Shallow Underground',
    'Cave Egg',
    '🪨',
    'Mole Beat',
    '#92745c',
    0.032
  ],

  [
    'Stone Tunnels',
    'Stone Egg',
    '🐾',
    'Rock Pup',
    '#858f9a',
    0.03
  ],

  [
    'Coal Depths',
    'Coal Egg',
    '⚫',
    'Shadow Bat',
    '#353942',
    0.028
  ],

  [
    'Iron Caverns',
    'Iron Egg',
    '⚙️',
    'Gear Fox',
    '#a9a097',
    0.026
  ],

  [
    'Deep Caves',
    'Echo Egg',
    '🕷️',
    'Echo Spider',
    '#645a75',
    0.024
  ],

  [
    'Gold Veins',
    'Golden Egg',
    '🪙',
    'Gold Chick',
    '#f2c74e',
    0.022
  ],

  [
    'Crystal Caverns',
    'Crystal Egg',
    '💎',
    'Crystal Fox',
    '#9a78ff',
    0.02
  ],

  [
    'Diamond Depths',
    'Diamond Egg',
    '🔷',
    'Diamond Dragon',
    '#60e7f7',
    0.018
  ],

  [
    'Obsidian Ruins',
    'Obsidian Egg',
    '🖤',
    'Obsidian Wolf',
    '#302b45',
    0.016
  ],

  [
    'Ancient Depths',
    'Ancient Egg',
    '🏺',
    'Relic Guardian',
    '#b79a68',
    0.014
  ],

  [
    'Magma Zone',
    'Magma Egg',
    '🔥',
    'Lava Dragon',
    '#ff6535',
    0.012
  ],

  [
    'Echo Abyss',
    'Void Egg',
    '🌌',
    'Echo Spirit',
    '#7454e8',
    0.01
  ],

  [
    'Celestial Core',
    'Celestial Egg',
    '✨',
    'Star Phoenix',
    '#f6e69a',
    0.008
  ],

  [
    'MusicVerse Core',
    'MusicVerse Egg',
    '🎵',
    'Harmony Dragon',
    '#ffe783',
    0.005
  ]

].map(
  egg => ({

    layer:
      egg[0],

    egg:
      egg[1],

    icon:
      egg[2],

    pet:
      egg[3],

    color:
      egg[4],

    chance:
      egg[5]
  })
);


/* =========================================================
   CURRENT MUSICCRAFT DEPTH
========================================================= */

function getCraftDepthName() {

  return craftTypesByDepth[
    Math.min(
      craftDepth,
      craftTypesByDepth.length - 1
    )
  ].name;
}


/* =========================================================
   CURRENT PET EGG
========================================================= */

function getCurrentCraftEgg() {

  return craftPetEggs[
    Math.min(
      craftDepth,
      craftPetEggs.length - 1
    )
  ];
}


/* =========================================================
   INITIALIZE MATERIAL INVENTORY
========================================================= */

function resetCraftInventory() {

  craftTypesByDepth
  .flatMap(
    zone =>
      zone.blocks.map(
        block =>
          block[0]
      )
  )
  .forEach(
    name => {

      if (
        profile.materials[
          name
        ] ===
        undefined
      ) {

        profile.materials[
          name
        ] =
          0;
      }
    }
  );
}


/* =========================================================
   GENERATE MUSICCRAFT LAYER
========================================================= */

function generateCraftLayer() {

  const depth =
    craftTypesByDepth[
      craftDepth
    ];


  const egg =
    getCurrentCraftEgg();


  craftWorld =
    Array.from(
      {
        length: 12
      },

      (_, y) =>

        Array.from(
          {
            length: 20
          },

          (_, x) => {

            if (
              y === 0 &&
              x >= 8 &&
              x <= 11
            ) {

              return null;
            }


            if (
              Math.random() <
              egg.chance
            ) {

              return [

                'PET_EGG',

                egg.color,

                0,

                1,

                egg
              ];
            }


            const r =
              Math.random();


            return r < 0.5

              ? depth.blocks[0]

              : r < 0.75

                ? depth.blocks[
                    Math.min(
                      1,
                      depth.blocks.length - 1
                    )
                  ]

                : r < 0.9

                  ? depth.blocks[
                      Math.min(
                        2,
                        depth.blocks.length - 1
                      )
                    ]

                  : depth.blocks[
                      depth.blocks.length - 1
                    ];
          }
        )
    );


  renderCraft();
}


/* =========================================================
   NEW MUSICCRAFT WORLD
========================================================= */

function newCraftWorld() {

  craftMined =
    0;


  craftDepth =
    0;


  craftLayer =
    0;


  resetCraftInventory();

  generateCraftLayer();

  renderCraftEggs();
}


/* =========================================================
   DRAW PET EGG
========================================================= */

function drawEgg(
  x,
  y,
  w,
  h,
  egg
) {

  const cx =
    x * w +
    w / 2;


  const cy =
    y * h +
    h / 2;


  ctx.save();


  ctx.shadowBlur =
    18;


  ctx.shadowColor =
    egg.color;


  ctx.fillStyle =
    egg.color;


  ctx.beginPath();


  ctx.ellipse(

    cx,

    cy,

    w * 0.27,

    h * 0.36,

    0,

    0,

    Math.PI * 2
  );


  ctx.fill();


  ctx.shadowBlur =
    0;


  ctx.font =
    `${Math.max(
      14,
      w * 0.36
    )}px sans-serif`;


  ctx.textAlign =
    'center';


  ctx.textBaseline =
    'middle';


  ctx.fillText(

    egg.icon,

    cx,

    cy
  );


  ctx.restore();
}


/* =========================================================
   RENDER MUSICCRAFT
========================================================= */

function renderCraft() {

  if (
    !craftCanvas ||
    !ctx
  ) {

    return;
  }


  const w =
    craftCanvas.width /
    20;


  const h =
    craftCanvas.height /
    12;


  ctx.clearRect(

    0,

    0,

    craftCanvas.width,

    craftCanvas.height
  );


  craftWorld.forEach(
    (
      row,
      y
    ) =>

      row.forEach(
        (
          block,
          x
        ) => {

          if (
            !block
          ) {

            return;
          }


/* =========================================================
   DRAW PET EGG BLOCK
========================================================= */

          if (
            block[0] ===
            'PET_EGG'
          ) {

            drawEgg(

              x,

              y,

              w,

              h,

              block[4]
            );


            return;
          }


/* =========================================================
   DRAW NORMAL BLOCK
========================================================= */

          ctx.fillStyle =
            block[1];


          ctx.fillRect(

            x * w + 1,

            y * h + 1,

            w - 2,

            h - 2
          );


          ctx.fillStyle =
            'rgba(255,255,255,.12)';


          ctx.fillRect(

            x * w + 3,

            y * h + 3,

            w - 7,

            4
          );
        }
      )
  );


/* =========================================================
   CURRENT MATERIAL INVENTORY
========================================================= */

  const current =
    craftTypesByDepth[
      craftDepth
    ]
    .blocks
    .map(
      block =>
        block[0]
    );


  $('#craftInventory').innerHTML =

    current
    .map(
      material => `

        <div>

          <span>
            ${material}
          </span>

          <b>
            ${
              profile.materials[
                material
              ] ||
              0
            }
          </b>

        </div>
      `
    )
    .join('');


/* =========================================================
   MUSICCRAFT UI
========================================================= */

  $('#missionText').textContent =
    `Mine 12 blocks • ${craftMined % 12}/12`;


  $('#craftDepthName').textContent =
    getCraftDepthName();


  $('#craftLayerLabel').textContent =
    `${craftDepth + 1} / ${craftTypesByDepth.length}`;


  $('#craftDepthFill').style.width =
    `${
      (
        (
          craftDepth + 1
        ) /
        craftTypesByDepth.length
      ) *
      100
    }%`;


  renderCraftEggs();

  renderEvolutionPanel();
}


/* =========================================================
   COLLECT MUSICCRAFT PET EGG
========================================================= */

function collectCraftPetEgg(
  egg
) {

  profile.petEggs.push({

    id:
      `egg-${Date.now()}-${Math.random()}`,

    egg:
      egg.egg,

    icon:
      egg.icon,

    pet:
      egg.pet,

    layer:
      egg.layer,

    hatched:
      false
  });


  persist();


  S.treasure();


  toast(
    `${egg.icon} ${egg.egg} discovered!`
  );


  addXP(
    4 +
    Math.floor(
      craftDepth /
      3
    )
  );


  renderCraftEggs();
}


/* =========================================================
   RENDER MUSICCRAFT EGGS
========================================================= */

function renderCraftEggs() {

  const element =
    $('#craftEggInventory');


  if (
    !element
  ) {

    return;
  }


  const eggs =
    profile.petEggs.filter(
      egg =>
        !egg.hatched
    );


  element.innerHTML =

    eggs.length

      ? eggs
        .slice(
          -8
        )
        .map(
          egg => `

            <div class="craft-egg-card">

              <div class="craft-egg-icon">
                ${egg.icon}
              </div>


              <div>

                <strong>
                  ${egg.egg}
                </strong>

                <small>
                  ${egg.layer}
                </small>

              </div>


              <button
                class="btn gold small"
                data-hatch-egg="${egg.id}"
              >
                Hatch
              </button>

            </div>
          `
        )
        .join('')

      : '<p class="muted">No eggs discovered yet.</p>';


  $$('[data-hatch-egg]')
  .forEach(
    button => {

      button.onclick =
        () =>
          hatchCraftEgg(
            button.dataset.hatchEgg
          );
    }
  );
}


/* =========================================================
   CHECK DEPTH DESCENT
========================================================= */

function checkCraftDescent() {

  let minedBottom =
    0;


  for (
    let y = 9;
    y < 12;
    y++
  ) {

    for (
      let x = 0;
      x < 20;
      x++
    ) {

      if (
        craftWorld[y][x] ===
        null
      ) {

        minedBottom++;
      }
    }
  }


  if (
    minedBottom >=
      12 &&

    craftDepth <
      craftTypesByDepth.length -
      1
  ) {

    craftDepth++;


    craftLayer++;


    reward(

      8 +
      craftDepth *
      2,

      5 +
      craftDepth *
      2,

      `⛏️ Descended to ${getCraftDepthName()}!`
    );


    generateCraftLayer();


    return true;
  }


  return false;
}


/* =========================================================
   MUSICCRAFT CANVAS CLICK
========================================================= */

if (
  craftCanvas
) {

  craftCanvas.onclick =
    event => {

      const rect =
        craftCanvas
        .getBoundingClientRect();


      const x =
        Math.floor(

          (
            event.clientX -
            rect.left
          ) /

          rect.width *

          20
        );


      const y =
        Math.floor(

          (
            event.clientY -
            rect.top
          ) /

          rect.height *

          12
        );


      const block =
        craftWorld[y]?.[x];


      if (
        !block
      ) {

        return;
      }


/* =========================================================
   REMOVE BLOCK
========================================================= */

      craftWorld[y][x] =
        null;


/* =========================================================
   PET EGG BLOCK
========================================================= */

      if (
        block[0] ===
        'PET_EGG'
      ) {

        collectCraftPetEgg(
          block[4]
        );


        renderCraft();


        return;
      }


/* =========================================================
   ADD MATERIAL
========================================================= */

      profile.materials[
        block[0]
      ] =
        (
          profile.materials[
            block[0]
          ] ||
          0
        ) +
        1;


      craftMined++;


      progressQuest(
        'mine',
        1
      );


/* =========================================================
   BLOCK REWARDS
========================================================= */

      const coin =
        Math.max(

          0,

          Math.floor(
            block[2] *
            0.15
          )
        );


      const xp =

        block[2] >=
        12

          ? Math.max(

              1,

              Math.floor(
                block[2] *
                0.08
              )
            )

          : 0;


      if (
        coin
      ) {

        profile.coins +=
          coin;
      }


      if (
        xp
      ) {

        addXP(
          xp
        );
      }


/* =========================================================
   MYTHIC CORE SHARD
========================================================= */

      if (
        block[0] ===
        'CoreShard'
      ) {

        profile.coins +=
          25;


        addXP(
          15
        );


        S.ultimate();


        toast(
          '🌟 MYTHIC CORE SHARD! +25 Coins • +15 EXP'
        );
      }


      persist();

      updateProfileUI();

      S.mine();


/* =========================================================
   DESCEND IF BOTTOM CLEARED
========================================================= */

      const descended =

        y >= 10 &&

        checkCraftDescent();


      if (
        !descended
      ) {

        renderCraft();
      }
    };
}


/* =========================================================
   MINING MISSION
========================================================= */

$('#missionBtn').onclick =
  () => {

    if (
      craftMined <
      12
    ) {

      return toast(
        'Mine 12 blocks first.'
      );
    }


    reward(

      8,

      5,

      'Mining mission complete!'
    );


    craftMined =
      0;


    renderCraft();
  };


/* =========================================================
   NEW MUSICCRAFT WORLD BUTTON
========================================================= */

$('#newWorldBtn').onclick =
  () =>
    newCraftWorld();
/* =========================================================
   LEADERBOARD
========================================================= */

const leaderboardBots = Array.from(

  {
    length:
      99
  },

  (
    _,
    index
  ) => ({

    name:
      `${pick(botNames)}${index + 1}`,

    level:
      rand(
        1,
        70
      ),

    xp:
      rand(
        100,
        8000
      )
  })
);


/* =========================================================
   RENDER LEADERBOARD
========================================================= */

function renderLeaderboard() {

  const element =
    $('#leaderboardList');


  if (
    !element
  ) {

    return;
  }


  const player = {

    name:
      profile.name ||
      'Player',

    level:
      profile.level,

    xp:
      profile.totalXp,

    player:
      true
  };


  const list = [

    player,

    ...leaderboardBots

  ]
  .sort(
    (
      a,
      b
    ) =>

      b.xp -
      a.xp
  );


  const playerRank =
    list.findIndex(
      item =>
        item.player
    ) + 1;


  $('#leaderboardRank').textContent =
    `#${playerRank}`;


  element.innerHTML =

    list
    .slice(
      0,
      20
    )
    .map(
      (
        item,
        index
      ) => `

        <div
          class="
            leaderboard-row
            ${
              item.player
                ? 'player-row'
                : ''
            }
          "
        >

          <span class="leaderboard-position">
            #${index + 1}
          </span>


          <div class="leaderboard-name">

            <strong>
              ${item.name}
            </strong>

            <small>
              Level ${item.level}
            </small>

          </div>


          <b>
            ${item.xp.toLocaleString()} EXP
          </b>

        </div>
      `
    )
    .join('');
}


/* =========================================================
   MUSIC QUIZ
========================================================= */

const quizQuestions = [

  {
    question:
      'Which instrument belongs to the Strings family?',

    options: [
      'Violin',
      'Trumpet',
      'Flute',
      'Drums'
    ],

    answer:
      'Violin'
  },


  {
    question:
      'Which instrument is mainly played using keys?',

    options: [
      'Piano',
      'Tuba',
      'Bongos',
      'Recorder'
    ],

    answer:
      'Piano'
  },


  {
    question:
      'Which instrument belongs to the Brass family?',

    options: [
      'Trumpet',
      'Cello',
      'Harp',
      'Clarinet'
    ],

    answer:
      'Trumpet'
  },


  {
    question:
      'Which instrument is a percussion instrument?',

    options: [
      'Drums',
      'Oboe',
      'Violin',
      'Sitar'
    ],

    answer:
      'Drums'
  },


  {
    question:
      'Which instrument is a woodwind instrument?',

    options: [
      'Flute',
      'Trombone',
      'Piano',
      'Bass Guitar'
    ],

    answer:
      'Flute'
  },


  {
    question:
      'What does tempo describe in music?',

    options: [
      'Speed',
      'Volume',
      'Instrument colour',
      'Number of singers'
    ],

    answer:
      'Speed'
  },


  {
    question:
      'What does rhythm mainly describe?',

    options: [
      'The pattern of beats',
      'The colour of an instrument',
      'The size of a stage',
      'The name of a song'
    ],

    answer:
      'The pattern of beats'
  },


  {
    question:
      'Which of these is a keyboard instrument?',

    options: [
      'Organ',
      'Tuba',
      'Piccolo',
      'Congas'
    ],

    answer:
      'Organ'
  },


  {
    question:
      'Which instrument is typically played with a bow?',

    options: [
      'Cello',
      'Trumpet',
      'Tambourine',
      'Accordion'
    ],

    answer:
      'Cello'
  },


  {
    question:
      'Which instrument belongs to the World family in MusicVerse?',

    options: [
      'Guzheng',
      'French Horn',
      'Drum Machine',
      'Harpsichord'
    ],

    answer:
      'Guzheng'
  }
];


let quizIndex =
  0;


let quizScore =
  0;


/* =========================================================
   RENDER QUIZ
========================================================= */

function renderQuiz() {

  const element =
    $('#quizBody');


  if (
    !element
  ) {

    return;
  }


/* =========================================================
   QUIZ COMPLETE
========================================================= */

  if (
    quizIndex >=
    quizQuestions.length
  ) {

    element.innerHTML = `

      <div class="quiz-complete">

        <h3>
          Quiz Complete!
        </h3>

        <p>
          You scored
          <strong>
            ${quizScore}/${quizQuestions.length}
          </strong>
        </p>

        <button
          id="restartQuizBtn"
          class="btn gold"
        >
          Play Again
        </button>

      </div>
    `;


    $('#restartQuizBtn').onclick =
      () => {

        quizIndex =
          0;


        quizScore =
          0;


        renderQuiz();
      };


    return;
  }


  const question =
    quizQuestions[
      quizIndex
    ];


  element.innerHTML = `

    <div class="quiz-card">

      <div class="quiz-progress">

        Question
        ${quizIndex + 1}
        /
        ${quizQuestions.length}

      </div>


      <h3>
        ${question.question}
      </h3>


      <div class="quiz-options">

        ${
          question.options
          .map(
            option => `

              <button
                data-quiz-answer="${option}"
              >
                ${option}
              </button>
            `
          )
          .join('')
        }

      </div>


      <p id="quizFeedback"></p>

    </div>
  `;


/* =========================================================
   QUIZ ANSWERS
========================================================= */

  $$('[data-quiz-answer]')
  .forEach(
    button => {

      button.onclick =
        () => {

          const correct =
            button.dataset
            .quizAnswer ===
            question.answer;


          $$('[data-quiz-answer]')
          .forEach(
            answerButton => {

              answerButton.disabled =
                true;
            }
          );


/* =========================================================
   CORRECT ANSWER
========================================================= */

          if (
            correct
          ) {

            quizScore++;


            profile.coins +=
              1;


            addXP(
              2
            );


            persist();

            updateProfileUI();


            $('#quizFeedback').textContent =
              '✅ Correct! +2 EXP • +1 Coin';


            S.correct();
          }


/* =========================================================
   WRONG ANSWER
========================================================= */

          else {

            $('#quizFeedback').textContent =
              `❌ Correct answer: ${question.answer}`;


            S.wrong();
          }


/* =========================================================
   NEXT QUIZ QUESTION
========================================================= */

          setTimeout(
            () => {

              quizIndex++;


              renderQuiz();
            },

            850
          );
        };
    }
  );
}


/* =========================================================
   STARTUP / INITIALIZATION
========================================================= */

setupProfile();

updateProfileUI();

renderDailyRewards();

renderFamilies();

renderInstruments();

refreshBattle(
  true
);

openLobby(
  10
);

renderGameCards();

updateGachaUI();

renderInventory();

newCraftWorld();

renderLeaderboard();

renderQuiz();

ensureQuests();

renderQuests();

renderEquipment();

renderPets();

renderEvolutionPanel();

renderInstrumentUpgradePanel();

renderSkillTree();

setupRpg();


/* =========================================================
   DAILY REWARD BUTTON
========================================================= */

const claimDailyBtn =
  $('#claimDailyBtn');


if (
  claimDailyBtn
) {

  claimDailyBtn.onclick =
    claimDailyReward;
}
