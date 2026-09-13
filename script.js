const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const rand = (a, b) =>
  Math.floor(Math.random() * (b - a + 1)) + a;

const pick = a =>
  a[Math.floor(Math.random() * a.length)];

const clamp = (n, a, b) =>
  Math.max(a, Math.min(b, n));

const wait = ms =>
  new Promise(r => setTimeout(r, ms));


function save(k, v) {
  localStorage.setItem(
    k,
    JSON.stringify(v)
  );
}


function load(k, f) {

  try {

    const v =
      localStorage.getItem(k);

    return v
      ? JSON.parse(v)
      : f;

  } catch {

    return f;
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
      'suspended'
    ) {

      this.context.resume();
    }
  },


  tone(
    f = 440,
    d = 0.15,
    t = 'sine',
    v = 0.18,
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


    const o =
      this.context.createOscillator();


    const g =
      this.context.createGain();


    o.type =
      t;


    o.frequency.setValueAtTime(
      f,
      now
    );


    g.gain.setValueAtTime(
      0.0001,
      now
    );


    g.gain.exponentialRampToValueAtTime(
      Math.max(
        0.001,
        v * this.sfxVolume
      ),
      now + 0.015
    );


    g.gain.exponentialRampToValueAtTime(
      0.0001,
      now + d
    );


    o.connect(g);

    g.connect(
      this.master
    );


    o.start(now);

    o.stop(
      now + d + 0.04
    );
  },


  chord(
    notes,
    d = 0.3,
    t = 'sine',
    v = 0.12
  ) {

    notes.forEach(
      (n, i) =>

        this.tone(
          n,
          d,
          t,
          v,
          i * 0.025
        )
    );
  },


  noise(
    d = 0.15,
    v = 0.12
  ) {

    if (!this.enabled) {
      return;
    }


    this.resume();


    const c =
      this.context;


    if (!c) {
      return;
    }


    const b =
      c.createBuffer(
        1,
        c.sampleRate * d,
        c.sampleRate
      );


    const data =
      b.getChannelData(0);


    for (
      let i = 0;
      i < data.length;
      i++
    ) {

      data[i] =
        Math.random() * 2 - 1;
    }


    const s =
      c.createBufferSource();


    const g =
      c.createGain();


    s.buffer =
      b;


    g.gain.setValueAtTime(
      v * this.sfxVolume,
      c.currentTime
    );


    g.gain.exponentialRampToValueAtTime(
      0.0001,
      c.currentTime + d
    );


    s.connect(g);

    g.connect(
      this.master
    );


    s.start();
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
      'sine',
      0.12
    );
  },


  coin() {

    SoundEngine.tone(
      880,
      0.08,
      'square',
      0.11
    );


    SoundEngine.tone(
      1320,
      0.12,
      'square',
      0.08,
      0.07
    );
  },


  xp() {

    SoundEngine.tone(
      523,
      0.09,
      'sine',
      0.08
    );


    SoundEngine.tone(
      659,
      0.1,
      'sine',
      0.08,
      0.06
    );


    SoundEngine.tone(
      784,
      0.14,
      'sine',
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
      'triangle',
      0.12
    );


    SoundEngine.tone(
      1046,
      0.5,
      'sine',
      0.14,
      0.24
    );
  },


  attack() {

    SoundEngine.tone(
      180,
      0.12,
      'sawtooth',
      0.13
    );


    SoundEngine.tone(
      260,
      0.15,
      'square',
      0.06,
      0.04
    );
  },


  critical() {

    SoundEngine.tone(
      880,
      0.1,
      'square',
      0.14
    );


    SoundEngine.tone(
      1174,
      0.16,
      'square',
      0.12,
      0.06
    );


    SoundEngine.tone(
      1568,
      0.25,
      'sine',
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
    ]
    .forEach(
      (n, i) =>

        SoundEngine.tone(
          n,
          0.32,
          'sawtooth',
          0.1,
          i * 0.08
        )
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
      'sine',
      0.08
    );
  },


  heal() {

    [
      523,
      659,
      784,
      1046
    ]
    .forEach(
      (n, i) =>

        SoundEngine.tone(
          n,
          0.2,
          'sine',
          0.08,
          i * 0.07
        )
    );
  },


  perfect() {

    SoundEngine.tone(
      1046,
      0.11,
      'sine',
      0.14
    );


    SoundEngine.tone(
      1568,
      0.14,
      'sine',
      0.09,
      0.05
    );
  },


  great() {

    SoundEngine.tone(
      880,
      0.1,
      'triangle',
      0.1
    );
  },


  good() {

    SoundEngine.tone(
      660,
      0.09,
      'triangle',
      0.07
    );
  },


  miss() {

    SoundEngine.tone(
      150,
      0.16,
      'sawtooth',
      0.07
    );
  },


  correct() {

    SoundEngine.tone(
      660,
      0.1,
      'sine',
      0.11
    );


    SoundEngine.tone(
      990,
      0.16,
      'sine',
      0.1,
      0.08
    );
  },


  wrong() {

    SoundEngine.tone(
      220,
      0.18,
      'square',
      0.07
    );


    SoundEngine.tone(
      165,
      0.22,
      'square',
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
    ]
    .forEach(
      (n, i) =>

        SoundEngine.tone(
          n,
          0.35,
          'triangle',
          0.11,
          i * 0.13
        )
    );
  },


  defeat() {

    [
      392,
      330,
      262,
      196
    ]
    .forEach(
      (n, i) =>

        SoundEngine.tone(
          n,
          0.3,
          'triangle',
          0.07,
          i * 0.14
        )
    );
  },


  jump() {

    SoundEngine.tone(
      280,
      0.1,
      'square',
      0.06
    );


    SoundEngine.tone(
      560,
      0.1,
      'square',
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
      'square',
      0.05
    );
  },


  treasure() {

    [
      784,
      988,
      1174,
      1568
    ]
    .forEach(
      (n, i) =>

        SoundEngine.tone(
          n,
          0.2,
          'sine',
          0.09,
          i * 0.07
        )
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
        'triangle',
        0.07,
        i * 0.08
      );
    }
  }
};


/* =========================================================
   CROWD EFFECT
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
      () =>

        SoundEngine.noise(
          rand(
            15,
            35
          ) / 100,

          0.015 +
          Math.random() *
          0.02
        ),

      Math.random() *
      500
    );
  }
}


/* =========================================================
   SOUND INITIALIZATION
========================================================= */

document.addEventListener(
  'pointerdown',

  () =>
    SoundEngine.resume(),

  {
    once: true
  }
);


const soundToggle =
  $('#soundToggle');


if (
  soundToggle
) {

  soundToggle.onclick =
    () => {

      SoundEngine.enabled =
        !SoundEngine.enabled;


      soundToggle.textContent =
        SoundEngine.enabled
          ? '🔊'
          : '🔇';


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
    'Guitar',
    'Strings',
    '🎸',
    78,
    58,
    72,
    76,
    'strum'
  ],

  [
    'Ukulele',
    'Strings',
    '🪕',
    86,
    38,
    70,
    82,
    'strum'
  ],

  [
    'Piano',
    'Keys',
    '🎹',
    62,
    88,
    92,
    70,
    'keys'
  ],

  [
    'Flute',
    'Woodwind',
    '🪈',
    58,
    48,
    96,
    82,
    'wind'
  ],

  [
    'Drums',
    'Percussion',
    '🥁',
    92,
    72,
    38,
    96,
    'drums'
  ],

  [
    'Clarinet',
    'Woodwind',
    '🎶',
    60,
    64,
    88,
    72,
    'wind'
  ],

  [
    'Trumpet',
    'Brass',
    '🎺',
    88,
    54,
    68,
    74,
    'brass'
  ],

  [
    'Violin',
    'Strings',
    '🎻',
    72,
    52,
    98,
    84,
    'bow'
  ],

  [
    'Saxophone',
    'Woodwind',
    '🎷',
    76,
    62,
    88,
    78,
    'wind'
  ],

  [
    'Cello',
    'Strings',
    '🎻',
    70,
    84,
    94,
    58,
    'bow'
  ],

  [
    'Xylophone',
    'Percussion',
    '🔔',
    68,
    50,
    76,
    92,
    'mallet'
  ],

  [
    'Trombone',
    'Brass',
    '🎺',
    84,
    70,
    62,
    64,
    'brass'
  ],

  [
    'Synthesizer',
    'Keys',
    '🎛️',
    74,
    58,
    90,
    86,
    'keys'
  ],

  [
    'French Horn',
    'Brass',
    '📯',
    72,
    82,
    86,
    58,
    'brass'
  ],

  [
    'Oboe',
    'Woodwind',
    '🎼',
    64,
    56,
    94,
    68,
    'wind'
  ],

  [
    'Digital Piano',
    'Keys',
    '🎹',
    68,
    78,
    88,
    78,
    'keys'
  ],

  [
    'Organ',
    'Keys',
    '🎹',
    76,
    92,
    90,
    48,
    'keys'
  ],

  [
    'Drum Machine',
    'Percussion',
    '🎛️',
    82,
    54,
    58,
    100,
    'pads'
  ],

  [
    'Electric Guitar',
    'Strings',
    '🎸',
    94,
    48,
    68,
    88,
    'strum'
  ],

  [
    'Bass Guitar',
    'Strings',
    '🎸',
    86,
    76,
    54,
    90,
    'pluck'
  ],

  [
    'Harp',
    'Strings',
    '🪕',
    52,
    64,
    100,
    72,
    'pluck'
  ],

  [
    'Banjo',
    'Strings',
    '🪕',
    82,
    44,
    64,
    94,
    'pluck'
  ],

  [
    'Mandolin',
    'Strings',
    '🪕',
    80,
    46,
    78,
    90,
    'pluck'
  ],

  [
    'Double Bass',
    'Strings',
    '🎻',
    82,
    90,
    72,
    54,
    'bow'
  ],

  [
    'Accordion',
    'Keys',
    '🪗',
    72,
    74,
    82,
    78,
    'bellows'
  ],

  [
    'Keytar',
    'Keys',
    '🎹',
    86,
    46,
    76,
    92,
    'keys'
  ],

  [
    'Harpsichord',
    'Keys',
    '🎹',
    70,
    60,
    92,
    80,
    'keys'
  ],

  [
    'Marimba',
    'Percussion',
    '🔔',
    66,
    58,
    84,
    94,
    'mallet'
  ],

  [
    'Timpani',
    'Percussion',
    '🥁',
    90,
    86,
    42,
    72,
    'drums'
  ],

  [
    'Bongos',
    'Percussion',
    '🥁',
    78,
    42,
    54,
    98,
    'drums'
  ],

  [
    'Congas',
    'Percussion',
    '🥁',
    82,
    58,
    50,
    94,
    'drums'
  ],

  [
    'Tambourine',
    'Percussion',
    '🪘',
    70,
    34,
    58,
    100,
    'shake'
  ],

  [
    'Steel Pan',
    'Percussion',
    '🛢️',
    68,
    56,
    86,
    88,
    'mallet'
  ],

  [
    'Tuba',
    'Brass',
    '🎺',
    90,
    94,
    54,
    38,
    'brass'
  ],

  [
    'Euphonium',
    'Brass',
    '🎺',
    76,
    84,
    78,
    54,
    'brass'
  ],

  [
    'Cornet',
    'Brass',
    '🎺',
    84,
    58,
    74,
    76,
    'brass'
  ],

  [
    'Piccolo',
    'Woodwind',
    '🪈',
    66,
    32,
    96,
    92,
    'wind'
  ],

  [
    'Bassoon',
    'Woodwind',
    '🎼',
    68,
    86,
    84,
    48,
    'wind'
  ],

  [
    'Recorder',
    'Woodwind',
    '🪈',
    70,
    44,
    78,
    84,
    'wind'
  ],

  [
    'Erhu',
    'World',
    '🎻',
    74,
    54,
    98,
    82,
    'bow'
  ],

  [
    'Guzheng',
    'World',
    '🎶',
    78,
    62,
    96,
    88,
    'pluck'
  ],

  [
    'Pipa',
    'World',
    '🪕',
    84,
    50,
    88,
    92,
    'pluck'
  ],

  [
    'Kalimba',
    'World',
    '🎵',
    58,
    60,
    90,
    86,
    'pluck'
  ],

  [
    'Sitar',
    'World',
    '🪕',
    76,
    64,
    96,
    80,
    'pluck'
  ],

  [
    'Shamisen',
    'World',
    '🪕',
    88,
    48,
    74,
    92,
    'pluck'
  ]

]
.map(
  (x, i) => ({

    name:
      x[0],

    family:
      x[1],

    icon:
      x[2],

    attack:
      x[3],

    defense:
      x[4],

    melody:
      x[5],

    rhythm:
      x[6],

    play:
      x[7],

    price:
      i === 0
        ? 0
        : 220 + i * 95
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
   DEFAULT MOVE TYPES
========================================================= */

const moveSets = {

  strum: [

    [
      'Power Strum',
      'attack',
      1
    ],

    [
      'Rapid Riff',
      'rhythm',
      0.9
    ],

    [
      'Harmony Guard',
      'shield',
      0
    ],

    [
      'Dragon Solo',
      'ultimate',
      1.8
    ]
  ],


  keys: [

    [
      'Power Chord',
      'attack',
      1
    ],

    [
      'Rapid Keys',
      'rhythm',
      0.9
    ],

    [
      'Sustain Shield',
      'shield',
      0
    ],

    [
      'Grand Crescendo',
      'ultimate',
      1.8
    ]
  ],


  drums: [

    [
      'Power Beat',
      'attack',
      1
    ],

    [
      'Drum Roll',
      'rhythm',
      0.95
    ],

    [
      'Rhythm Barrier',
      'shield',
      0
    ],

    [
      'Thunder Beat',
      'ultimate',
      1.85
    ]
  ],


  wind: [

    [
      'Focused Note',
      'attack',
      1
    ],

    [
      'Rapid Scale',
      'rhythm',
      0.9
    ],

    [
      'Breath Heal',
      'heal',
      0
    ],

    [
      'Cyclone Symphony',
      'ultimate',
      1.8
    ]
  ],


  brass: [

    [
      'Brass Blast',
      'attack',
      1
    ],

    [
      'Fanfare Rush',
      'rhythm',
      0.92
    ],

    [
      'Royal Guard',
      'shield',
      0
    ],

    [
      'Solar Fanfare',
      'ultimate',
      1.85
    ]
  ],


  bow: [

    [
      'Power Bow',
      'attack',
      1
    ],

    [
      'Rapid Bow',
      'rhythm',
      0.92
    ],

    [
      'Harmony Strings',
      'heal',
      0
    ],

    [
      'Phoenix Symphony',
      'ultimate',
      1.8
    ]
  ],


  mallet: [

    [
      'Mallet Strike',
      'attack',
      1
    ],

    [
      'Scale Rush',
      'rhythm',
      0.95
    ],

    [
      'Resonance',
      'shield',
      0
    ],

    [
      'Rainbow Cascade',
      'ultimate',
      1.8
    ]
  ],


  pads: [

    [
      'Beat Drop',
      'attack',
      1
    ],

    [
      'Pad Rush',
      'rhythm',
      0.98
    ],

    [
      'Bass Sequence',
      'shield',
      0
    ],

    [
      'Mega Beat Drop',
      'ultimate',
      1.9
    ]
  ],


  pluck: [

    [
      'Crystal Pluck',
      'attack',
      1
    ],

    [
      'Finger Rush',
      'rhythm',
      0.95
    ],

    [
      'Resonance',
      'heal',
      0
    ],

    [
      'Starlight Cascade',
      'ultimate',
      1.82
    ]
  ],


  bellows: [

    [
      'Squeeze Beat',
      'attack',
      1
    ],

    [
      'Polka Rush',
      'rhythm',
      0.95
    ],

    [
      'Bellows Guard',
      'shield',
      0
    ],

    [
      'Festival Frenzy',
      'ultimate',
      1.85
    ]
  ],


  shake: [

    [
      'Rhythm Shake',
      'attack',
      1
    ],

    [
      'Jingle Rush',
      'rhythm',
      0.98
    ],

    [
      'Tempo Guard',
      'shield',
      0
    ],

    [
      'Carnival Storm',
      'ultimate',
      1.8
    ]
  ]
};


/* =========================================================
   INDIVIDUAL INSTRUMENT MOVES
========================================================= */

const instrumentMoves = {

  Guitar: [
    ['Power Strum', 'attack', 1],
    ['Rapid Riff', 'rhythm', 0.9],
    ['Harmony Guard', 'shield', 0],
    ['Dragon Solo', 'ultimate', 1.8]
  ],


  Ukulele: [
    ['Island Strum', 'attack', 1],
    ['Sunny Rhythm', 'rhythm', 0.92],
    ['Tropical Harmony', 'heal', 0],
    ['Paradise Finale', 'ultimate', 1.8]
  ],


  Piano: [
    ['Power Chord', 'attack', 1],
    ['Rapid Keys', 'rhythm', 0.9],
    ['Sustain Shield', 'shield', 0],
    ['Grand Crescendo', 'ultimate', 1.8]
  ],


  Flute: [
    ['Focused Note', 'attack', 1],
    ['Flutter Scale', 'rhythm', 0.92],
    ['Breath of Harmony', 'heal', 0],
    ['Cyclone Symphony', 'ultimate', 1.8]
  ],


  Drums: [
    ['Power Beat', 'attack', 1],
    ['Drum Roll', 'rhythm', 0.95],
    ['Rhythm Barrier', 'shield', 0],
    ['Thunder Beat', 'ultimate', 1.85]
  ],


  Clarinet: [
    ['Midnight Tone', 'attack', 1],
    ['Silver Scale', 'rhythm', 0.92],
    ['Warm Breath', 'heal', 0],
    ['Moonlight Rhapsody', 'ultimate', 1.82]
  ],


  Trumpet: [
    ['Brass Blast', 'attack', 1],
    ['Victory Fanfare', 'rhythm', 0.92],
    ['Royal Guard', 'shield', 0],
    ['Solar Fanfare', 'ultimate', 1.85]
  ],


  Violin: [
    ['Piercing Bow', 'attack', 1],
    ['Rapid Arpeggio', 'rhythm', 0.94],
    ['Healing Strings', 'heal', 0],
    ['Phoenix Symphony', 'ultimate', 1.85]
  ],


  Saxophone: [
    ['Jazz Burst', 'attack', 1],
    ['Groove Run', 'rhythm', 0.95],
    ['Soul Melody', 'heal', 0],
    ['Midnight Jazz Storm', 'ultimate', 1.85]
  ],


  Cello: [
    ['Deep Bow', 'attack', 1],
    ['Resonant Pulse', 'rhythm', 0.9],
    ['Cello Sanctuary', 'shield', 0],
    ['Titan Concerto', 'ultimate', 1.82]
  ],


  Xylophone: [
    ['Bright Strike', 'attack', 1],
    ['Rainbow Scale', 'rhythm', 0.96],
    ['Resonance Guard', 'shield', 0],
    ['Crystal Cascade', 'ultimate', 1.82]
  ],


  Trombone: [
    ['Slide Blast', 'attack', 1],
    ['Brass Glide', 'rhythm', 0.9],
    ['Fortress Tone', 'shield', 0],
    ['Titan Slide', 'ultimate', 1.85]
  ],


  Synthesizer: [
    ['Synth Pulse', 'attack', 1],
    ['Neon Sequence', 'rhythm', 0.96],
    ['Digital Barrier', 'shield', 0],
    ['Cyber Drop', 'ultimate', 1.9]
  ],


  'French Horn': [
    ['Royal Call', 'attack', 1],
    ['Noble Fanfare', 'rhythm', 0.9],
    ['Castle Guard', 'shield', 0],
    ['Kingdom Anthem', 'ultimate', 1.85]
  ],


  Oboe: [
    ['Piercing Reed', 'attack', 1],
    ['Graceful Scale', 'rhythm', 0.92],
    ['Serene Breath', 'heal', 0],
    ['Forest Elegy', 'ultimate', 1.82]
  ],


  'Digital Piano': [
    ['Digital Chord', 'attack', 1],
    ['Velocity Keys', 'rhythm', 0.95],
    ['Sustain Matrix', 'shield', 0],
    ['Digital Crescendo', 'ultimate', 1.85]
  ],


  Organ: [
    ['Cathedral Chord', 'attack', 1],
    ['Pipe Resonance', 'rhythm', 0.88],
    ['Sanctuary', 'heal', 0],
    ['Divine Symphony', 'ultimate', 1.9]
  ],


  'Drum Machine': [
    ['Beat Drop', 'attack', 1],
    ['Pad Rush', 'rhythm', 0.98],
    ['Bass Sequence', 'shield', 0],
    ['Mega Beat Drop', 'ultimate', 1.9]
  ],


  'Electric Guitar': [
    ['Voltage Slash', 'attack', 1.05],
    ['Lightning Riff', 'rhythm', 0.98],
    ['Amp Shield', 'shield', 0],
    ['Thunderstorm Solo', 'ultimate', 1.95]
  ],


  'Bass Guitar': [
    ['Bass Slam', 'attack', 1],
    ['Groove Line', 'rhythm', 0.98],
    ['Low-End Guard', 'shield', 0],
    ['Earthquake Bass', 'ultimate', 1.88]
  ],


  Harp: [
    ['Crystal Pluck', 'attack', 1],
    ['Angel Strings', 'rhythm', 0.92],
    ['Celestial Healing', 'heal', 0],
    ['Heavenly Cascade', 'ultimate', 1.85]
  ],


  Banjo: [
    ['Country Snap', 'attack', 1],
    ['Bluegrass Rush', 'rhythm', 0.98],
    ['Porch Harmony', 'heal', 0],
    ['Wild West Finale', 'ultimate', 1.82]
  ],


  Mandolin: [
    ['Twin Pluck', 'attack', 1],
    ['Tremolo Rush', 'rhythm', 0.98],
    ['Folk Harmony', 'heal', 0],
    ['Festival Storm', 'ultimate', 1.85]
  ],


  'Double Bass': [
    ['Deep Resonance', 'attack', 1],
    ['Bass Bow Rush', 'rhythm', 0.88],
    ['Low Frequency Guard', 'shield', 0],
    ['Colossal Symphony', 'ultimate', 1.88]
  ],


  Accordion: [
    ['Squeeze Beat', 'attack', 1],
    ['Polka Rush', 'rhythm', 0.95],
    ['Bellows Guard', 'shield', 0],
    ['Festival Frenzy', 'ultimate', 1.85]
  ],


  Keytar: [
    ['Keytar Blast', 'attack', 1],
    ['Stage Rush', 'rhythm', 0.98],
    ['Synth Guard', 'shield', 0],
    ['Rockstar Overdrive', 'ultimate', 1.9]
  ],


  Harpsichord: [
    ['Baroque Strike', 'attack', 1],
    ['Royal Scale', 'rhythm', 0.94],
    ['Courtly Guard', 'shield', 0],
    ['Golden Fugue', 'ultimate', 1.85]
  ],


  Marimba: [
    ['Mallet Strike', 'attack', 1],
    ['Marimba Run', 'rhythm', 0.98],
    ['Wooden Resonance', 'heal', 0],
    ['Tropical Cascade', 'ultimate', 1.85]
  ],


  Timpani: [
    ['War Drum', 'attack', 1],
    ['Rolling Thunder', 'rhythm', 0.9],
    ['Battle Guard', 'shield', 0],
    ['Titan Thunder', 'ultimate', 1.9]
  ],


  Bongos: [
    ['Bongo Strike', 'attack', 1],
    ['Jungle Rhythm', 'rhythm', 1],
    ['Tribal Guard', 'shield', 0],
    ['Jungle Frenzy', 'ultimate', 1.82]
  ],


  Congas: [
    ['Conga Slam', 'attack', 1],
    ['Latin Rush', 'rhythm', 0.98],
    ['Rhythm Spirit', 'heal', 0],
    ['Carnival Inferno', 'ultimate', 1.85]
  ],


  Tambourine: [
    ['Rhythm Shake', 'attack', 1],
    ['Jingle Rush', 'rhythm', 1],
    ['Tempo Guard', 'shield', 0],
    ['Carnival Storm', 'ultimate', 1.8]
  ],


  'Steel Pan': [
    ['Island Strike', 'attack', 1],
    ['Calypso Rush', 'rhythm', 0.96],
    ['Tropical Resonance', 'heal', 0],
    ['Caribbean Sunrise', 'ultimate', 1.85]
  ],


  Tuba: [
    ['Heavy Brass', 'attack', 1.05],
    ['Low Brass Pulse', 'rhythm', 0.82],
    ['Iron Lung Guard', 'shield', 0],
    ['Colossal Fanfare', 'ultimate', 1.9]
  ],


  Euphonium: [
    ['Warm Brass', 'attack', 1],
    ['Smooth Fanfare', 'rhythm', 0.9],
    ['Golden Guard', 'shield', 0],
    ['Majestic Anthem', 'ultimate', 1.85]
  ],


  Cornet: [
    ['Sharp Fanfare', 'attack', 1],
    ['Cornet Rush', 'rhythm', 0.94],
    ['Brass Guard', 'shield', 0],
    ['Royal Trumpet Storm', 'ultimate', 1.85]
  ],


  Piccolo: [
    ['High Note', 'attack', 1],
    ['Sky Scale', 'rhythm', 1],
    ['Wind Blessing', 'heal', 0],
    ['Sonic Whirlwind', 'ultimate', 1.82]
  ],


  Bassoon: [
    ['Deep Reed', 'attack', 1],
    ['Woodwind Pulse', 'rhythm', 0.86],
    ['Forest Guard', 'shield', 0],
    ['Ancient Woodland Song', 'ultimate', 1.85]
  ],


  Recorder: [
    ['Clear Note', 'attack', 1],
    ['Quick Fingering', 'rhythm', 0.96],
    ['Gentle Breath', 'heal', 0],
    ['Schoolyard Symphony', 'ultimate', 1.8]
  ],


  Erhu: [
    ['Silk Bow', 'attack', 1],
    ['Dragon Bow Rush', 'rhythm', 0.96],
    ['Spirit Strings', 'heal', 0],
    ['Celestial Dragon Song', 'ultimate', 1.88]
  ],


  Guzheng: [
    ['Silk Pluck', 'attack', 1],
    ['River Cascade', 'rhythm', 0.98],
    ['Mountain Harmony', 'heal', 0],
    ['Ten Thousand Strings', 'ultimate', 1.9]
  ],


  Pipa: [
    ['Moon Pluck', 'attack', 1],
    ['Flying Fingers', 'rhythm', 1],
    ['Jade Harmony', 'shield', 0],
    ['Ambush Symphony', 'ultimate', 1.9]
  ],


  Kalimba: [
    ['Crystal Thumb', 'attack', 1],
    ['Dream Rhythm', 'rhythm', 0.96],
    ['Peaceful Resonance', 'heal', 0],
    ['Starlight Lullaby', 'ultimate', 1.82]
  ],


  Sitar: [
    ['Raga Strike', 'attack', 1],
    ['Mystic Scale', 'rhythm', 0.94],
    ['Meditation Aura', 'heal', 0],
    ['Cosmic Raga', 'ultimate', 1.88]
  ],


  Shamisen: [
    ['Samurai Pluck', 'attack', 1.05],
    ['Rapid Tsugaru', 'rhythm', 1],
    ['Spirit Guard', 'shield', 0],
    ['Shogun Finale', 'ultimate', 1.9]
  ]
};


/* =========================================================
   GET INSTRUMENT MOVES
========================================================= */

function getInstrumentMoves(
  name
) {

  const instrument =
    getInstrument(name);


  return (
    instrumentMoves[name] ||
    moveSets[
      instrument.play
    ] ||
    moveSets.strum
  );
}


/* =========================================================
   PLAY INSTRUMENT
========================================================= */

function playInstrument(
  name,
  note = 440
) {

  const instrument =
    getInstrument(name);


  const types = {

    strum:
      'sawtooth',

    keys:
      'triangle',

    drums:
      'square',

    wind:
      'sine',

    brass:
      'sawtooth',

    bow:
      'triangle',

    mallet:
      'sine',

    pads:
      'square',

    pluck:
      'triangle',

    bellows:
      'sawtooth',

    shake:
      'square'
  };


  SoundEngine.tone(

    note,

    0.2,

    types[
      instrument.play
    ] || 'sine',

    0.08
  );
}
/* =========================================================
   PLAYER PROFILE
========================================================= */

const defaultProfile = {
  name: '',
  level: 1,
  xp: 0,
  totalXp: 0,
  coins: 500,
  dust: 0,

  owned: [
    'Guitar'
  ],

  equipped: 'Guitar',

  mastery: {},
  instrumentUpgrades: {},
  instrumentEvolutions: {},

  wins: 0,
  losses: 0,

  avatar: {
    preset: 'Hero',
    skin: '#dca57b',
    hair: '#201915',
    outfit: '#19345b'
  },

  inventory: [],

  equipmentInventory: [
    {
      name: 'Starter Headphones',
      slot: 'Head',
      attack: 1,
      defense: 0
    },

    {
      name: 'Canvas Jacket',
      slot: 'Body',
      attack: 0,
      defense: 2
    }
  ],

  equippedGear: {},

  pets: [],
  petEggs: [],
  equippedPet: null,

  materials: {},
  quests: {},

  rpg: {
    zone: 0,
    x: 1,
    y: 1,
    hp: 100,
    maxHp: 100,
    storyStep: 0
  },

  dailyRewards: {
    lastClaim: '',
    streak: 0
  },

  skillTree: {
    power1: 0,
    power2: 0,
    power3: 0,

    rhythm1: 0,
    rhythm2: 0,
    rhythm3: 0,

    harmony1: 0,
    harmony2: 0,
    harmony3: 0
  }
};


/* =========================================================
   LOAD PROFILE
========================================================= */

let profile = {
  ...defaultProfile,
  ...load(
    'musicverseProfile',
    {}
  )
};


profile.avatar = {
  ...defaultProfile.avatar,
  ...(profile.avatar || {})
};


profile.owned =
  Array.isArray(profile.owned)
    ? profile.owned
    : ['Guitar'];


if (
  !profile.owned.includes(
    'Guitar'
  )
) {

  profile.owned.unshift(
    'Guitar'
  );
}


profile.mastery =
  profile.mastery || {};


profile.inventory =
  Array.isArray(
    profile.inventory
  )
    ? profile.inventory
    : [];


profile.instrumentUpgrades =
  profile.instrumentUpgrades || {};


profile.instrumentEvolutions =
  profile.instrumentEvolutions || {};


profile.equipmentInventory =
  Array.isArray(
    profile.equipmentInventory
  )
    ? profile.equipmentInventory
    : [
        ...defaultProfile
          .equipmentInventory
      ];


profile.equippedGear =
  profile.equippedGear || {};


profile.pets =
  Array.isArray(profile.pets)
    ? profile.pets
    : [];


profile.petEggs =
  Array.isArray(profile.petEggs)
    ? profile.petEggs
    : [];


profile.materials =
  profile.materials || {};


profile.quests =
  profile.quests || {};


profile.rpg = {
  ...defaultProfile.rpg,
  ...(profile.rpg || {})
};


profile.dailyRewards = {
  ...defaultProfile.dailyRewards,
  ...(profile.dailyRewards || {})
};


profile.skillTree = {
  ...defaultProfile.skillTree,
  ...(profile.skillTree || {})
};


profile.coins =
  Math.max(
    0,
    Number(profile.coins) || 0
  );


/* =========================================================
   SAVE PROFILE
========================================================= */

function persist() {

  save(
    'musicverseProfile',
    profile
  );
}


/* =========================================================
   TOAST MESSAGE
========================================================= */

function toast(
  message
) {

  const element =
    $('#toast');


  if (!element) {
    return;
  }


  element.textContent =
    message;


  element.classList.add(
    'show'
  );


  clearTimeout(
    toast.timer
  );


  toast.timer =
    setTimeout(
      () => {

        element.classList.remove(
          'show'
        );

      },
      2200
    );
}


/* =========================================================
   LEVEL SYSTEM
========================================================= */

function xpNeeded() {

  return (
    100 +
    (
      profile.level - 1
    ) *
    35
  );
}


function addXP(
  amount
) {

  amount =
    Math.max(
      0,
      Math.round(amount)
    );


  profile.xp +=
    amount;


  profile.totalXp +=
    amount;


  let levelled =
    false;


  while (
    profile.xp >=
    xpNeeded()
  ) {

    profile.xp -=
      xpNeeded();


    profile.level++;


    profile.coins +=
      50;


    levelled =
      true;
  }


  if (levelled) {

    S.level();


    toast(
      `⭐ Level ${profile.level}! +50 Coins`
    );

  } else if (amount > 0) {

    S.xp();
  }


  persist();

  updateProfileUI();
}


/* =========================================================
   INSTRUMENT MASTERY
========================================================= */

function addMastery(
  name,
  amount
) {

  profile.mastery[name] =
    (
      profile.mastery[name] ||
      0
    ) +
    amount;


  persist();
}


/* =========================================================
   INSTRUMENT LEVEL
========================================================= */

function getInstrumentUpgrade(
  name
) {

  if (
    !profile.instrumentUpgrades[name]
  ) {

    profile.instrumentUpgrades[name] = {
      level: 1,
      exp: 0
    };
  }


  return profile
    .instrumentUpgrades[name];
}


function getInstrumentLevel(
  name
) {

  return getInstrumentUpgrade(
    name
  ).level;
}


function instrumentXPNeeded(
  level
) {

  return (
    20 +
    level *
    12
  );
}


function addInstrumentXP(
  name,
  amount
) {

  const data =
    getInstrumentUpgrade(
      name
    );


  if (
    data.level >= 20
  ) {

    data.level =
      20;

    data.exp =
      0;

    persist();

    return;
  }


  data.exp +=
    amount;


  let levelled =
    false;


  while (
    data.level < 20 &&
    data.exp >=
      instrumentXPNeeded(
        data.level
      )
  ) {

    data.exp -=
      instrumentXPNeeded(
        data.level
      );


    data.level++;


    levelled =
      true;
  }


  if (
    data.level >= 20
  ) {

    data.level =
      20;

    data.exp =
      0;
  }


  if (levelled) {

    S.level();


    toast(
      `🎵 ${name} reached Level ${data.level}!`
    );
  }


  persist();
}


/* =========================================================
   EVOLUTION BONUS
========================================================= */

function getEvolutionBonus(
  name
) {

  return profile
    .instrumentEvolutions[
      name
    ]
    ? 1.1
    : 1;
}


/* =========================================================
   EQUIPMENT BONUSES
========================================================= */

function getGearBonuses() {

  let attack =
    0;

  let defense =
    0;


  Object.values(
    profile.equippedGear || {}
  )
  .forEach(
    item => {

      if (!item) {
        return;
      }


      attack +=
        Number(
          item.attack
        ) || 0;


      defense +=
        Number(
          item.defense
        ) || 0;
    }
  );


  return {
    attack,
    defense
  };
}


/* =========================================================
   PET BONUSES
========================================================= */

function getPetBonus() {

  if (
    !profile.equippedPet
  ) {

    return {
      attack: 0,
      defense: 0,
      melody: 0,
      rhythm: 0
    };
  }


  const pet =
    profile.pets.find(
      p =>
        p.id ===
        profile.equippedPet
    );


  if (!pet) {

    return {
      attack: 0,
      defense: 0,
      melody: 0,
      rhythm: 0
    };
  }


  const bonus =
    1 +
    Math.floor(
      (
        pet.level || 1
      ) /
      3
    );


  const type =
    petTypes[
      pet.name
    ] ||
    'all';


  const result = {
    attack: 0,
    defense: 0,
    melody: 0,
    rhythm: 0
  };


  if (
    type === 'attack' ||
    type === 'all'
  ) {

    result.attack +=
      bonus;
  }


  if (
    type === 'defense' ||
    type === 'all'
  ) {

    result.defense +=
      bonus;
  }


  if (
    type === 'melody' ||
    type === 'all'
  ) {

    result.melody +=
      bonus;
  }


  if (
    type === 'rhythm' ||
    type === 'all'
  ) {

    result.rhythm +=
      bonus;
  }


  return result;
}


/* =========================================================
   FINAL INSTRUMENT STATS
========================================================= */

function getUpgradedInstrument(
  name
) {

  const base =
    getInstrument(name);


  const upgrade =
    getInstrumentUpgrade(
      name
    );


  const levelBonus =
    1 +
    (
      upgrade.level - 1
    ) *
    0.035;


  const evolution =
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
        levelBonus *
        evolution +
        gear.attack +
        pet.attack
      ),

    defense:
      Math.round(
        base.defense *
        levelBonus *
        evolution +
        gear.defense +
        pet.defense
      ),

    melody:
      Math.round(
        base.melody *
        levelBonus *
        evolution +
        pet.melody
      ),

    rhythm:
      Math.round(
        base.rhythm *
        levelBonus *
        evolution +
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
      p =>
        p.id === id
    );


  if (!pet) {
    return;
  }


  const bonuses =
    typeof getSkillBonuses ===
      'function'
      ? getSkillBonuses()
      : {
          petXpPct: 0
        };


  amount =
    Math.round(
      amount *
      (
        1 +
        bonuses.petXpPct
      )
    );


  pet.exp =
    (
      pet.exp ||
      0
    ) +
    amount;


  pet.level =
    pet.level || 1;


  while (
    pet.exp >=
    pet.level *
    15
  ) {

    pet.exp -=
      pet.level *
      15;


    pet.level++;
  }


  persist();


  if (
    typeof renderPets ===
    'function'
  ) {

    renderPets();
  }
}


/* =========================================================
   UNIVERSAL REWARD
========================================================= */

function reward(
  xp,
  coins,
  message = ''
) {

  profile.coins +=
    Math.max(
      0,
      Math.round(coins)
    );


  addXP(
    xp
  );


  persist();

  updateProfileUI();


  if (
    coins > 0
  ) {

    S.coin();
  }


  if (message) {

    toast(
      `${message} +${xp} EXP • +${coins} Coins`
    );
  }
}


/* =========================================================
   UPDATE PROFILE UI
========================================================= */

function updateProfileUI() {

  const needed =
    xpNeeded();


  const xpPercent =
    clamp(
      profile.xp /
      needed *
      100,
      0,
      100
    );


  const values = {

    '#coinTop':
      profile.coins,

    '#levelTop':
      profile.level,

    '#heroName':
      profile.name ||
      'Player',

    '#heroLevel':
      profile.level,

    '#heroCoins':
      profile.coins,

    '#heroDust':
      profile.dust,

    '#heroLifetime':
      profile.totalXp,

    '#gachaCoins':
      profile.coins,

    '#gachaDust':
      profile.dust
  };


  Object.entries(
    values
  )
  .forEach(
    ([selector, value]) => {

      const element =
        $(selector);


      if (element) {

        element.textContent =
          value;
      }
    }
  );


  const xpText =
    $('#xpText');


  if (xpText) {

    xpText.textContent =
      `${profile.xp} / ${needed}`;
  }


  const xpFill =
    $('#xpFill');


  if (xpFill) {

    xpFill.style.width =
      `${xpPercent}%`;
  }


  const heroBadge =
    $('#heroBadge');


  if (heroBadge) {

    heroBadge.textContent =
      profile.equipped
        ? `${profile.equipped.toUpperCase()} PLAYER`
        : 'MUSICVERSE PLAYER';
  }


  const miniHair =
    $('.mini-hair');


  const miniHead =
    $('.mini-head');


  const miniBody =
    $('.mini-body');


  if (miniHair) {

    miniHair.style.background =
      profile.avatar.hair;
  }


  if (miniHead) {

    miniHead.style.background =
      profile.avatar.skin;
  }


  if (miniBody) {

    miniBody.style.background =
      profile.avatar.outfit;
  }


  if (
    typeof renderLeaderboard ===
    'function'
  ) {

    renderLeaderboard();
  }
}


/* =========================================================
   PROFILE SETUP
========================================================= */

const avatarPresets = [
  'Hero',
  'Rockstar',
  'Maestro',
  'DJ',
  'Virtuoso'
];


const avatarSkins = [
  '#f6d0b1',
  '#dca57b',
  '#b97752',
  '#8b563f',
  '#5b382d'
];


const avatarHairs = [
  '#201915',
  '#50301f',
  '#d5ad4f',
  '#732c26',
  '#1e3557'
];


const avatarOutfits = [
  '#19345b',
  '#6b253c',
  '#3f704d',
  '#6b4b8a',
  '#191919'
];


function setupProfile() {

  const overlay =
    $('#setupOverlay');


  const nameInput =
    $('#playerNameInput');


  const presetSelect =
    $('#avatarPresetSelect');


  const skinSelect =
    $('#skinSelect');


  const hairSelect =
    $('#hairSelect');


  const outfitSelect =
    $('#outfitSelect');


  const startBtn =
    $('#startBtn');


  if (
    !overlay ||
    !nameInput ||
    !startBtn
  ) {

    return;
  }


  if (presetSelect) {

    presetSelect.innerHTML =
      avatarPresets
      .map(
        item =>
          `<option value="${item}">${item}</option>`
      )
      .join('');
  }


  function colourOptions(
    list
  ) {

    return list
      .map(
        item =>
          `<option value="${item}">${item}</option>`
      )
      .join('');
  }


  if (skinSelect) {

    skinSelect.innerHTML =
      colourOptions(
        avatarSkins
      );
  }


  if (hairSelect) {

    hairSelect.innerHTML =
      colourOptions(
        avatarHairs
      );
  }


  if (outfitSelect) {

    outfitSelect.innerHTML =
      colourOptions(
        avatarOutfits
      );
  }


  nameInput.value =
    profile.name || '';


  if (presetSelect) {

    presetSelect.value =
      profile.avatar.preset;
  }


  if (skinSelect) {

    skinSelect.value =
      profile.avatar.skin;
  }


  if (hairSelect) {

    hairSelect.value =
      profile.avatar.hair;
  }


  if (outfitSelect) {

    outfitSelect.value =
      profile.avatar.outfit;
  }


  function updatePreview() {

    const previewHair =
      $('#previewHair');


    const previewHead =
      $('#previewHead');


    const previewBody =
      $('#previewBody');


    if (
      previewHair &&
      hairSelect
    ) {

      previewHair.style.background =
        hairSelect.value;
    }


    if (
      previewHead &&
      skinSelect
    ) {

      previewHead.style.background =
        skinSelect.value;
    }


    if (
      previewBody &&
      outfitSelect
    ) {

      previewBody.style.background =
        outfitSelect.value;
    }
  }


  [
    presetSelect,
    skinSelect,
    hairSelect,
    outfitSelect
  ]
  .filter(Boolean)
  .forEach(
    element => {

      element.onchange =
        updatePreview;
    }
  );


  updatePreview();


  if (
    !profile.name
  ) {

    overlay.classList.remove(
      'hidden'
    );

  } else {

    overlay.classList.add(
      'hidden'
    );
  }


  startBtn.onclick =
    () => {

      const name =
        nameInput.value.trim();


      if (
        name.length < 2
      ) {

        const error =
          $('#setupError');


        if (error) {

          error.textContent =
            'Please enter a name.';
        }


        return;
      }


      profile.name =
        name;


      profile.avatar = {

        preset:
          presetSelect
            ? presetSelect.value
            : 'Hero',

        skin:
          skinSelect
            ? skinSelect.value
            : '#dca57b',

        hair:
          hairSelect
            ? hairSelect.value
            : '#201915',

        outfit:
          outfitSelect
            ? outfitSelect.value
            : '#19345b'
      };


      persist();

      updateProfileUI();


      overlay.classList.add(
        'hidden'
      );


      S.level();


      toast(
        `Welcome to MusicVerse, ${profile.name}!`
      );
    };
}


/* =========================================================
   INSTRUMENT LIBRARY
========================================================= */

let activeFamily =
  'All';


function renderFamilies() {

  const element =
    $('#familyTabs');


  if (!element) {
    return;
  }


  const families = [
    'All',
    ...new Set(
      instruments.map(
        item =>
          item.family
      )
    )
  ];


  element.innerHTML =
    families
    .map(
      family => `

        <button
          class="${
            activeFamily === family
              ? 'active'
              : ''
          }"
          data-family="${family}"
        >
          ${family}
        </button>
      `
    )
    .join('');


  $$('[data-family]')
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

  const grid =
    $('#instrumentGrid');


  if (!grid) {
    return;
  }


  const search =
    (
      $('#instrumentSearch')
      ?.value ||
      ''
    )
    .trim()
    .toLowerCase();


  const filtered =
    instruments.filter(
      instrument => {

        const familyOK =
          activeFamily === 'All' ||
          instrument.family ===
            activeFamily;


        const searchOK =
          !search ||
          instrument.name
          .toLowerCase()
          .includes(search);


        return (
          familyOK &&
          searchOK
        );
      }
    );


  grid.innerHTML =
    filtered
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
          getInstrumentUpgrade(
            instrument.name
          );


        const stats =
          getUpgradedInstrument(
            instrument.name
          );


        return `

          <article
            class="
              instrument-card
              ${
                equipped
                  ? 'equipped'
                  : ''
              }
            "
          >

            <div class="instrument-icon">
              ${instrument.icon}
            </div>


            <span class="eyebrow">
              ${instrument.family}
            </span>


            <h3>
              ${instrument.name}
            </h3>


            <small>
              Level ${upgrade.level}/20
            </small>


            <div class="instrument-stats">

              <span>
                ⚔️ ${stats.attack}
              </span>

              <span>
                🛡️ ${stats.defense}
              </span>

              <span>
                🎵 ${stats.melody}
              </span>

              <span>
                🥁 ${stats.rhythm}
              </span>

            </div>


            <div class="instrument-actions">

              ${
                owned

                  ? `
                    <button
                      class="btn ${
                        equipped
                          ? 'ghost'
                          : 'gold'
                      } small"
                      data-equip="${instrument.name}"
                      ${
                        equipped
                          ? 'disabled'
                          : ''
                      }
                    >
                      ${
                        equipped
                          ? 'Equipped'
                          : 'Equip'
                      }
                    </button>
                  `

                  : `
                    <button
                      class="btn gold small"
                      data-buy="${instrument.name}"
                    >
                      Buy • ${instrument.price}
                    </button>
                  `
              }


              ${
                owned

                  ? `
                    <button
                      class="btn ghost small"
                      data-workshop="${instrument.name}"
                    >
                      Upgrade
                    </button>
                  `

                  : ''
              }

            </div>

          </article>
        `;
      }
    )
    .join('');


  $$('[data-buy]')
  .forEach(
    button => {

      button.onclick =
        () => {

          const name =
            button.dataset.buy;


          const instrument =
            getInstrument(
              name
            );


          if (
            profile.coins <
            instrument.price
          ) {

            return toast(
              'Not enough coins.'
            );
          }


          profile.coins -=
            instrument.price;


          profile.owned.push(
            name
          );


          persist();

          updateProfileUI();

          renderInstruments();

          renderBattleInstrumentSelect();


          S.treasure();


          toast(
            `🎵 ${name} unlocked!`
          );
        };
    }
  );


  $$('[data-equip]')
  .forEach(
    button => {

      button.onclick =
        () => {

          profile.equipped =
            button.dataset.equip;


          persist();

          updateProfileUI();

          renderInstruments();

          renderBattleInstrumentSelect();

          renderInstrumentUpgradePanel(
            profile.equipped
          );


          toast(
            `${profile.equipped} equipped!`
          );
        };
    }
  );


  $$('[data-workshop]')
  .forEach(
    button => {

      button.onclick =
        () => {

          renderInstrumentUpgradePanel(
            button.dataset.workshop
          );


          $('#instrumentWorkshop')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        };
    }
  );
}


const instrumentSearch =
  $('#instrumentSearch');


if (instrumentSearch) {

  instrumentSearch.oninput =
    renderInstruments;
}


/* =========================================================
   BATTLE INSTRUMENT SELECT
========================================================= */

function renderBattleInstrumentSelect() {

  const select =
    $('#battleInstrumentSelect');


  if (!select) {
    return;
  }


  select.innerHTML =
    profile.owned
    .map(
      name => `

        <option
          value="${name}"
          ${
            profile.equipped === name
              ? 'selected'
              : ''
          }
        >
          ${getInstrument(name).icon}
          ${name}
        </option>
      `
    )
    .join('');
}


const battleInstrumentSelect =
  $('#battleInstrumentSelect');


if (battleInstrumentSelect) {

  battleInstrumentSelect.onchange =
    () => {

      profile.equipped =
        battleInstrumentSelect.value;


      persist();

      updateProfileUI();

      renderInstruments();

      refreshBattle(
        true
      );
    };
}


/* =========================================================
   SOLO BATTLE
========================================================= */

let battle = {};


const botNames = [
  'BeatKnight',
  'PianoNova',
  'RhythmFox',
  'StringStorm',
  'TempoAce',
  'ChordKing',
  'MelodyMint',
  'BassOrbit',
  'JazzPixel'
];


function refreshBattle(
  newEnemy = false
) {

  const playerInstrument =
    getUpgradedInstrument(
      profile.equipped
    );


  if (
    newEnemy ||
    !battle.enemyInstrument
  ) {

    battle.enemyInstrument =
      pick(
        instruments
      );


    battle.enemyName =
      pick(
        botNames
      );
  }


  const enemy =
    battle.enemyInstrument;


  battle.playerMaxHP =
    100 +
    Math.round(
      playerInstrument.defense *
      0.4
    );


  battle.enemyMaxHP =
    100 +
    Math.round(
      enemy.defense *
      0.4
    );


  battle.playerHP =
    battle.playerMaxHP;


  battle.enemyHP =
    battle.enemyMaxHP;


  battle.energy =
    0;


  battle.ended =
    false;


  renderSoloBattle();
}


/* =========================================================
   SOLO BATTLE UI
========================================================= */

function renderSoloBattle() {

  const player =
    getUpgradedInstrument(
      profile.equipped
    );


  const enemy =
    battle.enemyInstrument ||
    instruments[0];


  const playerName =
    $('#playerBattleName');


  const playerInstrument =
    $('#playerInstrumentLabel');


  const cpuName =
    $('#cpuBattleName');


  const cpuInstrument =
    $('#cpuInstrumentLabel');


  if (playerName) {

    playerName.textContent =
      profile.name ||
      'Player';
  }


  if (playerInstrument) {

    playerInstrument.textContent =
      `${player.icon} ${player.name}`;
  }


  if (cpuName) {

    cpuName.textContent =
      battle.enemyName ||
      'CPU';
  }


  if (cpuInstrument) {

    cpuInstrument.textContent =
      `${enemy.icon} ${enemy.name}`;
  }


  const playerHP =
    $('#playerHpText');


  const enemyHP =
    $('#cpuHpText');


  if (playerHP) {

    playerHP.textContent =
      `${Math.ceil(
        battle.playerHP
      )} / ${battle.playerMaxHP}`;
  }


  if (enemyHP) {

    enemyHP.textContent =
      `${Math.ceil(
        battle.enemyHP
      )} / ${battle.enemyMaxHP}`;
  }


  const playerFill =
    $('#playerHpFill');


  const enemyFill =
    $('#cpuHpFill');


  if (playerFill) {

    playerFill.style.width =
      `${
        clamp(
          battle.playerHP /
          battle.playerMaxHP *
          100,
          0,
          100
        )
      }%`;
  }


  if (enemyFill) {

    enemyFill.style.width =
      `${
        clamp(
          battle.enemyHP /
          battle.enemyMaxHP *
          100,
          0,
          100
        )
      }%`;
  }


  const pips =
    $('#energyPips');


  if (pips) {

    pips.innerHTML =
      Array.from(
        {
          length: 3
        },
        (_, i) => `

          <i class="${
            i < battle.energy
              ? 'active'
              : ''
          }"></i>
        `
      )
      .join('');
  }


  const moves =
    getInstrumentMoves(
      profile.equipped
    );


  const moveButtons =
    $('#moveButtons');


  if (moveButtons) {

    moveButtons.innerHTML =
      moves
      .map(
        (move, index) => `

          <button
            data-solo-move="${index}"
            ${
              battle.ended
                ? 'disabled'
                : ''
            }
          >
            <b>
              ${move[0]}
            </b>

            <small>
              ${move[1]}
            </small>
          </button>
        `
      )
      .join('');
  }


  $$('[data-solo-move]')
  .forEach(
    button => {

      button.onclick =
        () =>
          soloMove(
            +button.dataset.soloMove
          );
    }
  );
}


/* =========================================================
   SOLO MOVE
========================================================= */

async function soloMove(
  index
) {

  if (
    battle.ended
  ) {
    return;
  }


  const player =
    getUpgradedInstrument(
      profile.equipped
    );


  const enemy =
    battle.enemyInstrument;


  const move =
    getInstrumentMoves(
      profile.equipped
    )[index];


  const [
    name,
    type,
    multiplier
  ] = move;


  const status =
    $('#battleStatus');


  if (status) {

    status.textContent =
      `${name}!`;
  }


  if (
    type === 'heal'
  ) {

    const heal =
      Math.round(
        player.melody *
        0.25 +
        12
      );


    battle.playerHP =
      Math.min(
        battle.playerMaxHP,
        battle.playerHP +
        heal
      );


    S.heal();
  }


  else if (
    type === 'shield'
  ) {

    battle.shield =
      true;


    S.shield();
  }


  else {

    if (
      type === 'ultimate'
    ) {

      if (
        battle.energy <
        3
      ) {

        return toast(
          'Ultimate requires 3 Energy.'
        );
      }


      battle.energy =
        0;


      S.ultimate();

    } else {

      battle.energy =
        Math.min(
          3,
          battle.energy + 1
        );


      S.attack();
    }


    let damage =
      Math.max(
        6,

        Math.round(

          (
            player.attack *
            0.32 +

            player.rhythm *
            0.12 +

            rand(
              -3,
              7
            )
          ) *

          multiplier -

          enemy.defense *
          0.06
        )
      );


    const critical =
      Math.random() <
      (
        0.08 +
        player.melody /
        1200
      );


    if (critical) {

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


    battle.enemyHP =
      Math.max(
        0,
        battle.enemyHP -
        damage
      );


    playInstrument(
      profile.equipped,
      type === 'ultimate'
        ? 700
        : 440
    );
  }


  renderSoloBattle();


  if (
    battle.enemyHP <= 0
  ) {

    battle.ended =
      true;


    profile.wins++;


    progressQuest(
      'battle',
      1
    );


    reward(
      24,
      18,
      'Victory!'
    );


    addInstrumentXP(
      profile.equipped,
      6
    );


    S.victory();

    crowd(1);


    if (status) {

      status.textContent =
        'Victory! +24 EXP • +18 Coins';
    }


    renderSoloBattle();

    return;
  }


  await wait(
    450
  );


/* =========================================================
   CPU TURN
========================================================= */

  let enemyDamage =
    Math.max(
      5,

      Math.round(

        enemy.attack *
        0.24 +

        enemy.rhythm *
        0.08 +

        rand(
          -2,
          6
        ) -

        player.defense *
        0.04
      )
    );


  if (
    battle.shield
  ) {

    enemyDamage =
      Math.round(
        enemyDamage *
        0.45
      );


    battle.shield =
      false;
  }


  battle.playerHP =
    Math.max(
      0,
      battle.playerHP -
      enemyDamage
    );


  S.attack();


  if (status) {

    status.textContent =
      `${battle.enemyName} dealt ${enemyDamage} damage.`;
  }


  if (
    battle.playerHP <= 0
  ) {

    battle.ended =
      true;


    profile.losses++;


    addXP(
      4
    );


    S.defeat();


    if (status) {

      status.textContent =
        'Defeat. +4 EXP';
    }
  }


  persist();

  renderSoloBattle();
}


const newOpponentBtn =
  $('#newOpponentBtn');


if (newOpponentBtn) {

  newOpponentBtn.onclick =
    () =>
      refreshBattle(
        true
      );
}


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


function makeTeamPlayer(
  team,
  index
) {

  const human =
    team === 'blue' &&
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
      `${team}-${index}`,

    team,

    human,

    name:
      human
        ? profile.name ||
          'Player'
        : pick(botNames),

    instrument:
      instrument.name,

    shield:
      false
  };
}


/* =========================================================
   OPEN TEAM LOBBY
========================================================= */

function openLobby(
  size
) {

  multiplayerState.size =
    size;


  multiplayerState.blue =
    Array.from(
      {
        length: size
      },

      (_, index) =>
        makeTeamPlayer(
          'blue',
          index
        )
    );


  multiplayerState.red =
    Array.from(
      {
        length: size
      },

      (_, index) =>
        makeTeamPlayer(
          'red',
          index
        )
    );


  multiplayerState.blueHP =
    multiplayerState.maxTeamHP;


  multiplayerState.redHP =
    multiplayerState.maxTeamHP;


  multiplayerState.playerEnergy =
    0;


  multiplayerState.round =
    0;


  multiplayerState.playing =
    false;


  $$('.mp-start')
  .forEach(
    button => {

      button.classList.toggle(
        'active',
        +button.dataset.team ===
        size
      );
    }
  );


  renderConcertTeams();

  updateTeamHPBars();


  const label =
    $('#concertRoundLabel');


  if (label) {

    label.textContent =
      'LOBBY';
  }


  const panel =
    $('#teamMovePanel');


  if (panel) {

    panel.classList.add(
      'hidden'
    );
  }


  setMP(
    `
      <strong>
        ${size}v${size} lobby ready.
      </strong>

      <span>
        Every team shares 10,000 HP.
      </span>
    `
  );
}


/* =========================================================
   TEAM PLAYER RENDER
========================================================= */

function renderConcertTeams(
  activeId = ''
) {

  const blue =
    $('#blueConcertPlayers');


  const red =
    $('#redConcertPlayers');


  function teamHTML(
    players
  ) {

    return players
      .map(
        player => {

          const instrument =
            getInstrument(
              player.instrument
            );


          return `

            <div
              class="
                concert-player
                ${
                  player.id === activeId
                    ? 'active'
                    : ''
                }
              "
            >

              <div class="concert-avatar">
                ${
                  player.human
                    ? '🎤'
                    : '🎵'
                }
              </div>

              <strong>
                ${player.name}
              </strong>

              <small>
                ${instrument.icon}
                ${instrument.name}
              </small>

            </div>
          `;
        }
      )
      .join('');
  }


  if (blue) {

    blue.innerHTML =
      teamHTML(
        multiplayerState.blue
      );
  }


  if (red) {

    red.innerHTML =
      teamHTML(
        multiplayerState.red
      );
  }
}


/* =========================================================
   TEAM HP
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


  const blueFill =
    $('#blueTeamHPFill');


  const redFill =
    $('#redTeamHPFill');


  const blueText =
    $('#blueTeamHPText');


  const redText =
    $('#redTeamHPText');


  if (blueFill) {

    blueFill.style.width =
      `${bluePercent}%`;
  }


  if (redFill) {

    redFill.style.width =
      `${redPercent}%`;
  }


  if (blueText) {

    blueText.textContent =
      `${Math.ceil(
        multiplayerState.blueHP
      ).toLocaleString()} / 10,000 HP`;
  }


  if (redText) {

    redText.textContent =
      `${Math.ceil(
        multiplayerState.redHP
      ).toLocaleString()} / 10,000 HP`;
  }
}


/* =========================================================
   TEAM MESSAGE
========================================================= */

function setMP(
  html
) {

  const element =
    $('#multiplayerBattleMessage');


  if (element) {

    element.innerHTML =
      html;
  }
}


/* =========================================================
   TEAM DAMAGE
========================================================= */

function teamDamage(
  attacker,
  multiplier = 1
) {

  const instrument =
    getUpgradedInstrument(
      attacker.instrument
    );


  let damage =
    Math.max(
      120,

      Math.round(

        (
          instrument.attack *
          4.2 +

          instrument.rhythm *
          1.7 +

          rand(
            -40,
            70
          )
        ) *

        multiplier
      )
    );


  const critical =
    Math.random() <
    (
      0.05 +
      instrument.melody /
      1000
    );


  if (critical) {

    damage =
      Math.round(
        damage *
        1.5
      );
  }


  return {
    damage,
    critical
  };
}


/* =========================================================
   HUMAN TEAM MOVE
========================================================= */

function waitHumanMove() {

  return new Promise(
    resolve => {

      multiplayerState.resolve =
        resolve;


      multiplayerState.waiting =
        true;


      showTeamMoves();
    }
  );
}


function showTeamMoves() {

  const panel =
    $('#teamMovePanel');


  const buttons =
    $('#teamMoveButtons');


  const energy =
    $('#teamEnergyLabel');


  if (
    !panel ||
    !buttons
  ) {
    return;
  }


  panel.classList.remove(
    'hidden'
  );


  if (energy) {

    energy.textContent =
      `${multiplayerState.playerEnergy} / 3`;
  }


  const moves =
    getInstrumentMoves(
      profile.equipped
    );


  buttons.innerHTML =
    moves
    .map(
      (move, index) => `

        <button
          data-team-move="${index}"
        >
          <b>
            ${move[0]}
          </b>

          <small>
            ${move[1]}
          </small>
        </button>
      `
    )
    .join('');


  $$('[data-team-move]')
  .forEach(
    button => {

      button.onclick =
        () =>
          executeTeamMove(
            +button.dataset.teamMove
          );
    }
  );
}


/* =========================================================
   EXECUTE HUMAN TEAM MOVE
========================================================= */

async function executeTeamMove(
  index
) {

  if (
    !multiplayerState.waiting
  ) {
    return;
  }


  const player =
    multiplayerState.blue[0];


  const moves =
    getInstrumentMoves(
      player.instrument
    );


  const move =
    moves[index];


  const [
    name,
    type,
    multiplier
  ] = move;


  if (
    type === 'ultimate' &&
    multiplayerState.playerEnergy < 3
  ) {

    return toast(
      'Ultimate requires 3 Energy.'
    );
  }


  multiplayerState.waiting =
    false;


  const panel =
    $('#teamMovePanel');


  if (panel) {

    panel.classList.add(
      'hidden'
    );
  }


  if (
    type === 'heal'
  ) {

    const instrument =
      getUpgradedInstrument(
        player.instrument
      );


    const heal =
      Math.round(
        instrument.melody *
        7 +
        220
      );


    multiplayerState.blueHP =
      Math.min(
        multiplayerState.maxTeamHP,
        multiplayerState.blueHP +
        heal
      );


    S.heal();


    setMP(
      `<strong>${name}</strong><span>Team Blue restored ${heal} HP!</span>`
    );
  }


  else if (
    type === 'shield'
  ) {

    player.shield =
      true;


    S.shield();


    setMP(
      `<strong>${name}</strong><span>Team Blue gained a shield!</span>`
    );
  }


  else {

    if (
      type === 'ultimate'
    ) {

      multiplayerState.playerEnergy =
        0;


      S.ultimate();

    } else {

      multiplayerState.playerEnergy =
        Math.min(
          3,
          multiplayerState.playerEnergy + 1
        );


      S.attack();
    }


    const result =
      teamDamage(
        player,
        multiplier
      );


    multiplayerState.redHP =
      Math.max(
        0,
        multiplayerState.redHP -
        result.damage
      );


    playInstrument(
      player.instrument,
      type === 'ultimate'
        ? 720
        : 440
    );


    if (
      result.critical
    ) {

      S.critical();
    }


    setMP(
      `
        <strong>
          ${name}
          ${
            result.critical
              ? '💥'
              : ''
          }
        </strong>

        <span>
          ${result.damage}
          team damage!
        </span>
      `
    );
  }


  updateTeamHPBars();


  if (
    multiplayerState.resolve
  ) {

    const resolve =
      multiplayerState.resolve;


    multiplayerState.resolve =
      null;


    resolve();
  }
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


  await wait(
    180
  );


  const instrument =
    getUpgradedInstrument(
      player.instrument
    );


  if (
    Math.random() <
    0.12
  ) {

    const heal =
      Math.round(
        instrument.melody *
        4 +
        120
      );


    if (
      player.team === 'blue'
    ) {

      multiplayerState.blueHP =
        Math.min(
          multiplayerState.maxTeamHP,
          multiplayerState.blueHP +
          heal
        );

    } else {

      multiplayerState.redHP =
        Math.min(
          multiplayerState.maxTeamHP,
          multiplayerState.redHP +
          heal
        );
    }


    S.heal();


  } else {

    const result =
      teamDamage(
        player,
        0.8
      );


    if (
      player.team === 'blue'
    ) {

      multiplayerState.redHP =
        Math.max(
          0,
          multiplayerState.redHP -
          result.damage
        );

    } else {

      let damage =
        result.damage;


      const human =
        multiplayerState.blue[0];


      if (
        human.shield
      ) {

        damage =
          Math.round(
            damage *
            0.55
          );


        human.shield =
          false;
      }


      multiplayerState.blueHP =
        Math.max(
          0,
          multiplayerState.blueHP -
          damage
        );
    }


    S.attack();
  }


  updateTeamHPBars();


  await wait(
    130
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


  multiplayerState.blueHP =
    multiplayerState.maxTeamHP;


  multiplayerState.redHP =
    multiplayerState.maxTeamHP;


  multiplayerState.playerEnergy =
    0;


  updateTeamHPBars();


  const size =
    multiplayerState.size;


  setMP(
    `
      <strong>
        Concert Battle Started!
      </strong>

      <span>
        ${size}v${size}
      </span>
    `
  );


  crowd(0.6);


  while (
    multiplayerState.blueHP > 0 &&
    multiplayerState.redHP > 0
  ) {

    multiplayerState.round++;


    const label =
      $('#concertRoundLabel');


    if (label) {

      label.textContent =
        `ROUND ${multiplayerState.round}`;
    }


    for (
      const player of
      multiplayerState.blue
    ) {

      if (
        multiplayerState.redHP <= 0
      ) {
        break;
      }


      if (
        player.human
      ) {

        renderConcertTeams(
          player.id
        );


        await waitHumanMove();

      } else {

        await aiTeamTurn(
          player
        );
      }
    }


    for (
      const player of
      multiplayerState.red
    ) {

      if (
        multiplayerState.blueHP <= 0
      ) {
        break;
      }


      await aiTeamTurn(
        player
      );
    }
  }


  multiplayerState.playing =
    false;


  renderConcertTeams();


  if (
    multiplayerState.redHP <= 0
  ) {

    const xp =
      24 +
      size * 2;


    const coins =
      18 +
      size * 2;


    profile.wins++;


    progressQuest(
      'battle',
      1
    );


    reward(
      xp,
      coins,
      'Team Victory!'
    );


    addInstrumentXP(
      profile.equipped,
      10
    );


    S.victory();

    crowd(1);


    setMP(
      `
        <strong>
          🏆 TEAM BLUE WINS!
        </strong>

        <span>
          +${xp} EXP • +${coins} Coins
        </span>
      `
    );

  } else {

    profile.losses++;


    addXP(
      6
    );


    S.defeat();


    setMP(
      `
        <strong>
          Team Red wins.
        </strong>

        <span>
          +6 EXP for performing.
        </span>
      `
    );
  }


  persist();

  updateProfileUI();
}


/* =========================================================
   TEAM SIZE BUTTONS
========================================================= */

$$('.mp-start')
.forEach(
  button => {

    button.onclick =
      () => {

        if (
          multiplayerState.playing
        ) {
          return;
        }


        openLobby(
          +button.dataset.team
        );
      };
  }
);


const startTeamBattleBtn =
  $('#startTeamBattleBtn');


if (startTeamBattleBtn) {

  startTeamBattleBtn.onclick =
    startTeamBattle;
}
/* =========================================================
   DAILY REWARDS
========================================================= */

const dailyRewardData = [
  { day: 1, coins: 50, xp: 10, icon: '🪙' },
  { day: 2, coins: 75, xp: 15, icon: '🎵' },
  { day: 3, coins: 100, xp: 20, icon: '✨' },
  { day: 4, coins: 125, xp: 25, icon: '🎸' },
  { day: 5, coins: 150, xp: 30, icon: '💎' },
  { day: 6, coins: 200, xp: 40, icon: '🎁' },
  { day: 7, coins: 350, xp: 75, icon: '👑' }
];


function todayKey() {
  const d = new Date();

  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
}


function yesterdayKey() {
  const d = new Date();

  d.setDate(
    d.getDate() - 1
  );

  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0')
  ].join('-');
}


function renderDailyRewards() {
  const grid =
    $('#dailyRewardGrid');

  const claimBtn =
    $('#claimDailyBtn');

  const streakLabel =
    $('#dailyStreakLabel');


  if (!grid) {
    return;
  }


  const streak =
    profile.dailyRewards.streak || 0;

  const claimedToday =
    profile.dailyRewards.lastClaim ===
    todayKey();


  if (streakLabel) {
    streakLabel.textContent =
      streak;
  }


  const activeDay =
    claimedToday
      ? Math.max(
          1,
          ((streak - 1) % 7) + 1
        )
      : (streak % 7) + 1;


  grid.innerHTML =
    dailyRewardData
      .map(reward => {
        const completed =
          reward.day < activeDay ||
          (
            claimedToday &&
            reward.day === activeDay
          );

        const current =
          reward.day === activeDay;

        return `
          <div
            class="
              daily-reward-card
              ${completed ? 'claimed' : ''}
              ${current ? 'current' : ''}
            "
          >
            <span class="daily-day">
              DAY ${reward.day}
            </span>

            <div class="daily-icon">
              ${reward.icon}
            </div>

            <strong>
              ${reward.coins} Coins
            </strong>

            <small>
              +${reward.xp} EXP
            </small>

            ${
              completed
                ? '<span class="daily-check">✓</span>'
                : ''
            }
          </div>
        `;
      })
      .join('');


  if (claimBtn) {
    claimBtn.disabled =
      claimedToday;

    claimBtn.textContent =
      claimedToday
        ? 'REWARD CLAIMED'
        : "CLAIM TODAY'S REWARD";
  }
}


function claimDailyReward() {
  const today =
    todayKey();

  const daily =
    profile.dailyRewards;


  if (
    daily.lastClaim === today
  ) {
    return toast(
      "You've already claimed today's reward."
    );
  }


  if (
    daily.lastClaim ===
    yesterdayKey()
  ) {
    daily.streak =
      (daily.streak || 0) + 1;

  } else {
    daily.streak = 1;
  }


  const rewardDay =
    ((daily.streak - 1) % 7);


  const reward =
    dailyRewardData[
      rewardDay
    ];


  daily.lastClaim =
    today;


  profile.coins +=
    reward.coins;


  addXP(
    reward.xp
  );


  persist();

  updateProfileUI();

  renderDailyRewards();


  S.treasure();


  toast(
    `🎁 Day ${reward.day}: +${reward.coins} Coins • +${reward.xp} EXP`
  );
}


/* =========================================================
   INSTRUMENT WORKSHOP
========================================================= */

let selectedWorkshopInstrument =
  profile.equipped;


function renderInstrumentUpgradePanel(
  name = selectedWorkshopInstrument
) {
  const panel =
    $('#instrumentWorkshop');


  if (!panel) {
    return;
  }


  if (
    !profile.owned.includes(name)
  ) {
    name =
      profile.equipped;
  }


  selectedWorkshopInstrument =
    name;


  const instrument =
    getInstrument(name);

  const upgrade =
    getInstrumentUpgrade(name);

  const upgraded =
    getUpgradedInstrument(name);

  const maxed =
    upgrade.level >= 20;

  const needed =
    maxed
      ? 0
      : instrumentXPNeeded(
          upgrade.level
        );

  const percent =
    maxed
      ? 100
      : clamp(
          upgrade.exp /
          needed *
          100,
          0,
          100
        );


  const upgradeCoinCost =
    maxed
      ? 0
      : 50 +
        upgrade.level * 25;


  panel.innerHTML = `
    <div class="workshop-selector">
      <label>
        Instrument
        <select id="workshopInstrumentSelect">
          ${
            profile.owned
              .map(item => `
                <option
                  value="${item}"
                  ${
                    item === name
                      ? 'selected'
                      : ''
                  }
                >
                  ${getInstrument(item).icon}
                  ${item}
                </option>
              `)
              .join('')
          }
        </select>
      </label>
    </div>

    <div class="workshop-instrument-main">
      <div class="workshop-instrument-icon">
        ${instrument.icon}
      </div>

      <div>
        <span class="eyebrow">
          ${instrument.family}
        </span>

        <h3>
          ${instrument.name}
        </h3>

        <strong>
          Instrument Level ${upgrade.level}/20
        </strong>
      </div>
    </div>

    <div class="workshop-xp">
      <div>
        <span>
          Instrument EXP
        </span>

        <b>
          ${
            maxed
              ? 'MAX'
              : `${upgrade.exp} / ${needed}`
          }
        </b>
      </div>

      <div class="xpbar">
        <i style="width:${percent}%"></i>
      </div>
    </div>

    <div class="workshop-stats">
      <div>
        <span>⚔️ Attack</span>
        <b>${upgraded.attack}</b>
      </div>

      <div>
        <span>🛡️ Defense</span>
        <b>${upgraded.defense}</b>
      </div>

      <div>
        <span>🎵 Melody</span>
        <b>${upgraded.melody}</b>
      </div>

      <div>
        <span>🥁 Rhythm</span>
        <b>${upgraded.rhythm}</b>
      </div>
    </div>

    <div class="workshop-actions">
      <button
        id="trainInstrumentBtn"
        class="btn gold"
        ${maxed ? 'disabled' : ''}
      >
        ${
          maxed
            ? 'MAX LEVEL'
            : `Train • ${upgradeCoinCost} Coins`
        }
      </button>

      <button
        id="equipWorkshopBtn"
        class="btn ghost"
        ${
          profile.equipped === name
            ? 'disabled'
            : ''
        }
      >
        ${
          profile.equipped === name
            ? 'Equipped'
            : 'Equip Instrument'
        }
      </button>
    </div>
  `;


  const select =
    $('#workshopInstrumentSelect');


  if (select) {
    select.onchange =
      () => {
        renderInstrumentUpgradePanel(
          select.value
        );
      };
  }


  const trainBtn =
    $('#trainInstrumentBtn');


  if (trainBtn) {
    trainBtn.onclick =
      () => {
        if (maxed) {
          return;
        }


        if (
          profile.coins <
          upgradeCoinCost
        ) {
          return toast(
            'Not enough coins.'
          );
        }


        profile.coins -=
          upgradeCoinCost;


        addInstrumentXP(
          name,
          Math.max(
            8,
            Math.round(
              needed * 0.45
            )
          )
        );


        progressQuest(
          'upgrade',
          1
        );


        persist();

        updateProfileUI();

        renderInstrumentUpgradePanel(
          name
        );

        renderInstruments();


        S.treasure();
      };
  }


  const equipBtn =
    $('#equipWorkshopBtn');


  if (equipBtn) {
    equipBtn.onclick =
      () => {
        profile.equipped =
          name;

        persist();

        updateProfileUI();

        renderInstrumentUpgradePanel(
          name
        );

        renderInstruments();

        renderBattleInstrumentSelect();

        refreshBattle(true);


        toast(
          `${name} equipped!`
        );
      };
  }
}


/* =========================================================
   SKILL TREE
========================================================= */

const skillNodes = [
  {
    id: 'power1',
    branch: 'Power',
    icon: '⚔️',
    name: 'Stage Power',
    description: '+5% battle damage per level.',
    max: 3,
    requires: null
  },

  {
    id: 'power2',
    branch: 'Power',
    icon: '💥',
    name: 'Critical Rhythm',
    description: '+3% critical chance per level.',
    max: 3,
    requires: 'power1'
  },

  {
    id: 'power3',
    branch: 'Power',
    icon: '🔥',
    name: 'Encore',
    description: 'Ultimate attacks gain extra power.',
    max: 1,
    requires: 'power2'
  },

  {
    id: 'rhythm1',
    branch: 'Rhythm',
    icon: '🥁',
    name: 'Perfect Timing',
    description: '+5% rhythm score per level.',
    max: 3,
    requires: null
  },

  {
    id: 'rhythm2',
    branch: 'Rhythm',
    icon: '⚡',
    name: 'Combo Flow',
    description: 'Game rewards gain +4% EXP per level.',
    max: 3,
    requires: 'rhythm1'
  },

  {
    id: 'rhythm3',
    branch: 'Rhythm',
    icon: '🌟',
    name: 'Virtuoso',
    description: 'Perfect hits earn bonus coins.',
    max: 1,
    requires: 'rhythm2'
  },

  {
    id: 'harmony1',
    branch: 'Harmony',
    icon: '💚',
    name: 'Healing Melody',
    description: '+8% healing per level.',
    max: 3,
    requires: null
  },

  {
    id: 'harmony2',
    branch: 'Harmony',
    icon: '🛡️',
    name: 'Resonant Guard',
    description: '+5% defense per level.',
    max: 3,
    requires: 'harmony1'
  },

  {
    id: 'harmony3',
    branch: 'Harmony',
    icon: '🐾',
    name: 'Pet Harmony',
    description: 'Pets gain 20% more EXP.',
    max: 1,
    requires: 'harmony2'
  }
];


function totalSkillPointsEarned() {
  return Math.floor(
    profile.level / 2
  );
}


function totalSkillPointsSpent() {
  return Object.values(
    profile.skillTree
  )
  .reduce(
    (sum, value) =>
      sum +
      Number(value || 0),
    0
  );
}


function availableSkillPoints() {
  return Math.max(
    0,
    totalSkillPointsEarned() -
    totalSkillPointsSpent()
  );
}


function getSkillBonuses() {
  const s =
    profile.skillTree;

  return {
    damagePct:
      (s.power1 || 0) *
      0.05,

    critChance:
      (s.power2 || 0) *
      0.03,

    ultimatePct:
      (s.power3 || 0) *
      0.2,

    rhythmPct:
      (s.rhythm1 || 0) *
      0.05,

    gameXpPct:
      (s.rhythm2 || 0) *
      0.04,

    perfectCoin:
      (s.rhythm3 || 0) *
      2,

    healPct:
      (s.harmony1 || 0) *
      0.08,

    defensePct:
      (s.harmony2 || 0) *
      0.05,

    petXpPct:
      (s.harmony3 || 0) *
      0.2
  };
}


function canUnlockSkill(
  node
) {
  if (!node.requires) {
    return true;
  }


  const requirement =
    skillNodes.find(
      item =>
        item.id ===
        node.requires
    );


  if (!requirement) {
    return true;
  }


  return (
    profile.skillTree[
      requirement.id
    ] >=
    requirement.max
  );
}


function renderSkillTree() {
  const tree =
    $('#skillTree');

  const points =
    $('#skillPointsAvailable');


  if (!tree) {
    return;
  }


  if (points) {
    points.textContent =
      availableSkillPoints();
  }


  const branches = [
    'Power',
    'Rhythm',
    'Harmony'
  ];


  tree.innerHTML =
    branches
      .map(branch => {
        const nodes =
          skillNodes.filter(
            node =>
              node.branch ===
              branch
          );


        return `
          <div class="skill-branch">
            <h4>
              ${branch}
            </h4>

            <div class="skill-node-list">
              ${
                nodes
                  .map(node => {
                    const level =
                      profile.skillTree[
                        node.id
                      ] || 0;

                    const maxed =
                      level >=
                      node.max;

                    const unlocked =
                      canUnlockSkill(
                        node
                      );

                    return `
                      <button
                        class="
                          skill-node
                          ${maxed ? 'maxed' : ''}
                          ${!unlocked ? 'locked' : ''}
                        "
                        data-skill="${node.id}"
                        ${
                          maxed ||
                          !unlocked
                            ? 'disabled'
                            : ''
                        }
                      >
                        <span class="skill-icon">
                          ${node.icon}
                        </span>

                        <div>
                          <strong>
                            ${node.name}
                          </strong>

                          <small>
                            ${node.description}
                          </small>

                          <b>
                            ${level}/${node.max}
                          </b>
                        </div>
                      </button>
                    `;
                  })
                  .join('')
              }
            </div>
          </div>
        `;
      })
      .join('');


  $$('[data-skill]')
    .forEach(button => {
      button.onclick =
        () => {
          const id =
            button.dataset.skill;

          const node =
            skillNodes.find(
              item =>
                item.id === id
            );


          if (!node) {
            return;
          }


          if (
            availableSkillPoints() <=
            0
          ) {
            return toast(
              'You need another Skill Point.'
            );
          }


          if (
            !canUnlockSkill(node)
          ) {
            return toast(
              'Unlock the previous skill first.'
            );
          }


          const current =
            profile.skillTree[id] ||
            0;


          if (
            current >=
            node.max
          ) {
            return;
          }


          profile.skillTree[id] =
            current + 1;


          persist();

          renderSkillTree();


          S.level();


          toast(
            `🌟 ${node.name} upgraded!`
          );
        };
    });
}


/* =========================================================
   RPG DATA
========================================================= */

const rpgZones = [
  {
    name: 'Melody Village',
    icon: '🏘️',
    level: 1,
    enemy: 'Noise Slime',
    enemyIcon: '🟢'
  },

  {
    name: 'Rhythm Forest',
    icon: '🌲',
    level: 3,
    enemy: 'Beat Wolf',
    enemyIcon: '🐺'
  },

  {
    name: 'Harmony Lake',
    icon: '🌊',
    level: 5,
    enemy: 'Echo Spirit',
    enemyIcon: '👻'
  },

  {
    name: 'Brass Canyon',
    icon: '🏜️',
    level: 8,
    enemy: 'Horn Golem',
    enemyIcon: '🗿'
  },

  {
    name: 'Tempo City',
    icon: '🌆',
    level: 12,
    enemy: 'Cyber Drummer',
    enemyIcon: '🤖'
  },

  {
    name: 'Symphony Castle',
    icon: '🏰',
    level: 16,
    enemy: 'Royal Maestro',
    enemyIcon: '👑'
  }
];


const rpgMaps = [
  [
    '##########',
    '#P......E#',
    '#..##....#',
    '#....C...#',
    '#.E......#',
    '#......>.#',
    '##########'
  ],

  [
    '##########',
    '#P..T....#',
    '#.##...E.#',
    '#....##..#',
    '#E....C..#',
    '#......>.#',
    '##########'
  ],

  [
    '##########',
    '#P..~~...#',
    '#..~~..E.#',
    '#...C....#',
    '#E....~~.#',
    '#......>.#',
    '##########'
  ],

  [
    '##########',
    '#P....R..#',
    '#.##.....#',
    '#....E...#',
    '#E...C...#',
    '#......>.#',
    '##########'
  ],

  [
    '##########',
    '#P..N....#',
    '#..##..E.#',
    '#....C...#',
    '#E.......#',
    '#......>.#',
    '##########'
  ],

  [
    '##########',
    '#P.......#',
    '#..##..E.#',
    '#....C...#',
    '#E.......#',
    '#......B.#',
    '##########'
  ]
];


let rpgRuntime = {
  enemies: [],
  chestOpened: false,
  inBattle: false,
  enemy: null
};


function currentRpgZone() {
  return rpgZones[
    clamp(
      profile.rpg.zone,
      0,
      rpgZones.length - 1
    )
  ];
}


function buildRpgRuntime() {
  const map =
    rpgMaps[
      profile.rpg.zone
    ] ||
    rpgMaps[0];


  rpgRuntime.enemies = [];


  map.forEach(
    (row, y) => {
      [...row].forEach(
        (tile, x) => {
          if (tile === 'E') {
            rpgRuntime.enemies.push({
              x,
              y,
              alive: true
            });
          }
        }
      );
    }
  );


  rpgRuntime.chestOpened =
    false;

  rpgRuntime.inBattle =
    false;

  rpgRuntime.enemy =
    null;
}


/* =========================================================
   RPG MAP
========================================================= */

function renderRpg() {
  const mapElement =
    $('#rpgMap');


  if (!mapElement) {
    return;
  }


  const zone =
    currentRpgZone();


  const map =
    rpgMaps[
      profile.rpg.zone
    ] ||
    rpgMaps[0];


  const zoneName =
    $('#rpgZoneName');


  const hpText =
    $('#rpgHpText');


  const storyText =
    $('#rpgStoryText');


  if (zoneName) {
    zoneName.textContent =
      zone.name;
  }


  if (hpText) {
    hpText.textContent =
      `${Math.ceil(profile.rpg.hp)} / ${profile.rpg.maxHp}`;
  }


  if (storyText) {
    storyText.textContent =
      `${
        Math.min(
          profile.rpg.storyStep + 1,
          10
        )
      } / 10`;
  }


  let html = '';


  map.forEach(
    (row, y) => {
      [...row].forEach(
        (tile, x) => {
          let content = '';
          let className =
            'rpg-tile';


          if (tile === '#') {
            className +=
              ' wall';
          }


          if (tile === '~') {
            className +=
              ' water';

            content = '≈';
          }


          if (tile === 'T') {
            className +=
              ' tree';

            content = '🌲';
          }


          if (tile === 'R') {
            className +=
              ' rock';

            content = '🪨';
          }


          if (tile === 'N') {
            className +=
              ' neon';

            content = '💡';
          }


          if (tile === '>') {
            className +=
              ' exit';

            content = '🚪';
          }


          if (tile === 'B') {
            className +=
              ' boss';

            content = '👑';
          }


          if (
            tile === 'C' &&
            !rpgRuntime.chestOpened
          ) {
            content = '🎁';
          }


          const enemy =
            rpgRuntime.enemies.find(
              item =>
                item.x === x &&
                item.y === y &&
                item.alive
            );


          if (enemy) {
            content =
              zone.enemyIcon;
          }


          if (
            profile.rpg.x === x &&
            profile.rpg.y === y
          ) {
            content = '🎤';

            className +=
              ' player';
          }


          html += `
            <div
              class="${className}"
              data-x="${x}"
              data-y="${y}"
            >
              ${content}
            </div>
          `;
        }
      );
    }
  );


  mapElement.style.gridTemplateColumns =
    `repeat(${map[0].length}, 1fr)`;


  mapElement.innerHTML =
    html;
}


/* =========================================================
   RPG MOVEMENT
========================================================= */

function moveRpg(
  dx,
  dy
) {
  if (
    rpgRuntime.inBattle
  ) {
    return;
  }


  const map =
    rpgMaps[
      profile.rpg.zone
    ] ||
    rpgMaps[0];


  const nx =
    profile.rpg.x + dx;

  const ny =
    profile.rpg.y + dy;


  if (
    ny < 0 ||
    ny >= map.length ||
    nx < 0 ||
    nx >= map[0].length
  ) {
    return;
  }


  const tile =
    map[ny][nx];


  if (
    tile === '#' ||
    tile === '~' ||
    tile === 'T' ||
    tile === 'R'
  ) {
    return;
  }


  profile.rpg.x =
    nx;

  profile.rpg.y =
    ny;


  const enemy =
    rpgRuntime.enemies.find(
      item =>
        item.x === nx &&
        item.y === ny &&
        item.alive
    );


  if (enemy) {
    startRpgBattle(
      enemy
    );
  }


  if (
    tile === 'C' &&
    !rpgRuntime.chestOpened
  ) {
    rpgRuntime.chestOpened =
      true;


    const coins =
      rand(25, 60);


    profile.coins +=
      coins;


    profile.materials.MusicCrystal =
      (
        profile.materials.MusicCrystal ||
        0
      ) + 1;


    progressQuest(
      'chest',
      1
    );


    S.treasure();


    toast(
      `🎁 Treasure! +${coins} Coins +1 Music Crystal`
    );
  }


  if (tile === '>') {
    nextRpgZone();
  }


  if (tile === 'B') {
    startRpgBoss();
  }


  persist();

  updateProfileUI();

  renderRpg();

  renderQuests();
}


/* =========================================================
   NEXT RPG ZONE
========================================================= */

function nextRpgZone() {
  if (
    profile.rpg.zone >=
    rpgZones.length - 1
  ) {
    return toast(
      'You reached the final zone!'
    );
  }


  profile.rpg.zone++;

  profile.rpg.x = 1;

  profile.rpg.y = 1;

  profile.rpg.storyStep =
    Math.min(
      9,
      profile.rpg.storyStep + 1
    );


  profile.rpg.hp =
    profile.rpg.maxHp;


  buildRpgRuntime();

  persist();


  reward(
    20,
    15,
    `Entered ${currentRpgZone().name}!`
  );


  renderRpg();
}


/* =========================================================
   RPG BATTLE
========================================================= */

function startRpgBattle(
  enemy
) {
  rpgRuntime.inBattle =
    true;

  rpgRuntime.enemy =
    {
      ...enemy,

      name:
        currentRpgZone().enemy,

      icon:
        currentRpgZone().enemyIcon,

      maxHp:
        80 +
        profile.rpg.zone *
        35,

      hp:
        80 +
        profile.rpg.zone *
        35,

      boss:
        false
    };


  renderRpgBattle();
}


function startRpgBoss() {
  if (
    rpgRuntime.inBattle
  ) {
    return;
  }


  rpgRuntime.inBattle =
    true;


  rpgRuntime.enemy = {
    x: profile.rpg.x,
    y: profile.rpg.y,

    name:
      'Grand Discord Maestro',

    icon:
      '👑',

    maxHp:
      450,

    hp:
      450,

    boss:
      true
  };


  renderRpgBattle();
}


function renderRpgBattle() {
  const panel =
    $('#rpgBattlePanel');


  if (!panel) {
    return;
  }


  if (
    !rpgRuntime.inBattle ||
    !rpgRuntime.enemy
  ) {
    panel.classList.add(
      'hidden'
    );

    return;
  }


  const enemy =
    rpgRuntime.enemy;


  panel.classList.remove(
    'hidden'
  );


  panel.innerHTML = `
    <div class="rpg-enemy-card">
      <div class="rpg-enemy-icon">
        ${enemy.icon}
      </div>

      <div>
        <span class="eyebrow">
          ${
            enemy.boss
              ? 'BOSS'
              : 'ENEMY'
          }
        </span>

        <h3>
          ${enemy.name}
        </h3>

        <div class="hpbar red">
          <i
            style="
              width:${
                clamp(
                  enemy.hp /
                  enemy.maxHp *
                  100,
                  0,
                  100
                )
              }%
            "
          ></i>
        </div>

        <small>
          ${Math.ceil(enemy.hp)}
          /
          ${enemy.maxHp}
          HP
        </small>
      </div>
    </div>

    <div class="rpg-battle-actions">
      <button
        id="rpgAttackBtn"
        class="btn gold"
      >
        ⚔️ Perform Attack
      </button>

      <button
        id="rpgHealBtn"
        class="btn ghost"
      >
        💚 Healing Melody
      </button>

      <button
        id="rpgRunBtn"
        class="btn ghost"
      >
        🏃 Retreat
      </button>
    </div>
  `;


  $('#rpgAttackBtn').onclick =
    rpgAttack;


  $('#rpgHealBtn').onclick =
    rpgHeal;


  $('#rpgRunBtn').onclick =
    rpgRetreat;
}


function rpgAttack() {
  if (
    !rpgRuntime.enemy
  ) {
    return;
  }


  const instrument =
    getUpgradedInstrument(
      profile.equipped
    );


  const skills =
    getSkillBonuses();


  let damage =
    Math.round(
      (
        instrument.attack *
        0.38 +

        instrument.rhythm *
        0.14 +

        rand(4, 12)
      ) *
      (
        1 +
        skills.damagePct
      )
    );


  const critical =
    Math.random() <
    (
      0.08 +
      skills.critChance
    );


  if (critical) {
    damage =
      Math.round(
        damage * 1.6
      );

    S.critical();

  } else {
    S.attack();
  }


  rpgRuntime.enemy.hp =
    Math.max(
      0,
      rpgRuntime.enemy.hp -
      damage
    );


  playInstrument(
    profile.equipped,
    critical
      ? 720
      : 440
  );


  if (
    rpgRuntime.enemy.hp <=
    0
  ) {
    finishRpgBattle();

    return;
  }


  rpgEnemyAttack();

  renderRpgBattle();

  renderRpg();
}


function rpgHeal() {
  const instrument =
    getUpgradedInstrument(
      profile.equipped
    );


  const skills =
    getSkillBonuses();


  const heal =
    Math.round(
      (
        12 +
        instrument.melody *
        0.2
      ) *
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
    `💚 Restored ${heal} HP`
  );


  rpgEnemyAttack();

  persist();

  renderRpgBattle();

  renderRpg();
}


function rpgEnemyAttack() {
  if (
    !rpgRuntime.enemy
  ) {
    return;
  }


  const instrument =
    getUpgradedInstrument(
      profile.equipped
    );


  const skills =
    getSkillBonuses();


  const defense =
    instrument.defense *
    (
      1 +
      skills.defensePct
    );


  let damage =
    Math.max(
      3,

      Math.round(
        12 +
        profile.rpg.zone * 4 +
        (
          rpgRuntime.enemy.boss
            ? 12
            : 0
        ) -
        defense * 0.05 +
        rand(-2, 5)
      )
    );


  profile.rpg.hp =
    Math.max(
      0,
      profile.rpg.hp -
      damage
    );


  S.attack();


  if (
    profile.rpg.hp <= 0
  ) {
    rpgRuntime.inBattle =
      false;

    rpgRuntime.enemy =
      null;


    profile.rpg.hp =
      profile.rpg.maxHp;


    profile.rpg.x = 1;

    profile.rpg.y = 1;


    persist();


    S.defeat();


    toast(
      'You were defeated and returned to the start of the zone.'
    );


    renderRpgBattle();

    renderRpg();
  }
}


function finishRpgBattle() {
  const enemy =
    rpgRuntime.enemy;


  if (!enemy) {
    return;
  }


  if (
    !enemy.boss
  ) {
    const runtimeEnemy =
      rpgRuntime.enemies.find(
        item =>
          item.x === enemy.x &&
          item.y === enemy.y
      );


    if (runtimeEnemy) {
      runtimeEnemy.alive =
        false;
    }
  }


  rpgRuntime.inBattle =
    false;

  rpgRuntime.enemy =
    null;


  progressQuest(
    'enemy',
    1
  );


  if (enemy.boss) {
    profile.rpg.storyStep =
      9;


    reward(
      100,
      100,
      '👑 Final Boss Defeated!'
    );


    profile.materials.CoreShard =
      (
        profile.materials.CoreShard ||
        0
      ) + 1;


    S.victory();

    crowd(1);

  } else {
    const xp =
      10 +
      profile.rpg.zone * 3;


    const coins =
      6 +
      profile.rpg.zone * 2;


    reward(
      xp,
      coins,
      `${enemy.name} defeated!`
    );


    addInstrumentXP(
      profile.equipped,
      3
    );
  }


  persist();

  renderRpgBattle();

  renderRpg();

  renderQuests();
}


function rpgRetreat() {
  rpgRuntime.inBattle =
    false;

  rpgRuntime.enemy =
    null;


  profile.rpg.x =
    Math.max(
      1,
      profile.rpg.x - 1
    );


  persist();

  renderRpgBattle();

  renderRpg();


  toast(
    'You retreated from battle.'
  );
}


/* =========================================================
   RPG CONTROLS
========================================================= */

function setupRpg() {
  buildRpgRuntime();

  renderRpg();


  const controls = {
    '#rpgUp': [0, -1],
    '#rpgDown': [0, 1],
    '#rpgLeft': [-1, 0],
    '#rpgRight': [1, 0]
  };


  Object.entries(
    controls
  )
  .forEach(
    ([selector, movement]) => {
      const button =
        $(selector);


      if (button) {
        button.onclick =
          () =>
            moveRpg(
              movement[0],
              movement[1]
            );
      }
    }
  );


  document.addEventListener(
    'keydown',
    event => {
      const active =
        document.activeElement;


      if (
        active &&
        (
          active.tagName === 'INPUT' ||
          active.tagName === 'SELECT' ||
          active.tagName === 'TEXTAREA'
        )
      ) {
        return;
      }


      const key =
        event.key.toLowerCase();


      const movement = {
        w: [0, -1],
        arrowup: [0, -1],

        s: [0, 1],
        arrowdown: [0, 1],

        a: [-1, 0],
        arrowleft: [-1, 0],

        d: [1, 0],
        arrowright: [1, 0]
      }[key];


      if (!movement) {
        return;
      }


      if (
        !location.hash ||
        location.hash ===
          '#adventure'
      ) {
        event.preventDefault();

        moveRpg(
          movement[0],
          movement[1]
        );
      }
    }
  );
}


/* =========================================================
   QUEST SYSTEM
========================================================= */

const questTemplates = [
  {
    id: 'enemy',
    icon: '⚔️',
    title: 'Clear the Noise',
    type: 'enemy',
    goal: 5,
    xp: 25,
    coins: 20
  },

  {
    id: 'battle',
    icon: '🏆',
    title: 'Battle Performer',
    type: 'battle',
    goal: 3,
    xp: 30,
    coins: 25
  },

  {
    id: 'game',
    icon: '🎮',
    title: 'Arcade Musician',
    type: 'game',
    goal: 3,
    xp: 25,
    coins: 25
  },

  {
    id: 'chest',
    icon: '🎁',
    title: 'Treasure Hunter',
    type: 'chest',
    goal: 2,
    xp: 20,
    coins: 30
  },

  {
    id: 'upgrade',
    icon: '🔨',
    title: 'Instrument Training',
    type: 'upgrade',
    goal: 2,
    xp: 20,
    coins: 15
  }
];


function ensureQuests() {
  questTemplates.forEach(
    quest => {
      if (
        !profile.quests[
          quest.id
        ]
      ) {
        profile.quests[
          quest.id
        ] = {
          progress: 0,
          claimed: false
        };
      }
    }
  );


  persist();
}


function progressQuest(
  type,
  amount = 1
) {
  questTemplates.forEach(
    quest => {
      if (
        quest.type !== type
      ) {
        return;
      }


      const state =
        profile.quests[
          quest.id
        ];


      if (
        !state ||
        state.claimed
      ) {
        return;
      }


      state.progress =
        Math.min(
          quest.goal,
          (
            state.progress ||
            0
          ) + amount
        );
    }
  );


  persist();

  renderQuests();
}


function renderQuests() {
  const list =
    $('#questList');


  if (!list) {
    return;
  }


  ensureQuests();


  list.innerHTML =
    questTemplates
      .map(quest => {
        const state =
          profile.quests[
            quest.id
          ];


        const completed =
          state.progress >=
          quest.goal;


        return `
          <div
            class="
              quest-item
              ${
                completed
                  ? 'complete'
                  : ''
              }
            "
          >
            <span class="quest-icon">
              ${quest.icon}
            </span>

            <div class="quest-info">
              <strong>
                ${quest.title}
              </strong>

              <small>
                ${state.progress}
                /
                ${quest.goal}
              </small>

              <div class="quest-progress">
                <i
                  style="
                    width:${
                      clamp(
                        state.progress /
                        quest.goal *
                        100,
                        0,
                        100
                      )
                    }%
                  "
                ></i>
              </div>
            </div>

            <button
              class="btn small ${
                completed &&
                !state.claimed
                  ? 'gold'
                  : 'ghost'
              }"
              data-quest-claim="${quest.id}"
              ${
                !completed ||
                state.claimed
                  ? 'disabled'
                  : ''
              }
            >
              ${
                state.claimed
                  ? 'Claimed'
                  : 'Claim'
              }
            </button>
          </div>
        `;
      })
      .join('');


  $$('[data-quest-claim]')
    .forEach(button => {
      button.onclick =
        () => {
          const id =
            button.dataset.questClaim;


          const quest =
            questTemplates.find(
              item =>
                item.id === id
            );


          const state =
            profile.quests[id];


          if (
            !quest ||
            !state ||
            state.claimed ||
            state.progress <
              quest.goal
          ) {
            return;
          }


          state.claimed =
            true;


          profile.coins +=
            quest.coins;


          addXP(
            quest.xp
          );


          persist();

          updateProfileUI();

          renderQuests();


          S.treasure();


          toast(
            `📜 Quest complete! +${quest.xp} EXP • +${quest.coins} Coins`
          );
        };
    });
}


/* =========================================================
   EQUIPMENT
========================================================= */

const equipmentSlots = [
  'Head',
  'Body',
  'Accessory'
];


function renderEquipment() {
  const list =
    $('#equipmentList');


  if (!list) {
    return;
  }


  list.innerHTML =
    equipmentSlots
      .map(slot => {
        const equipped =
          profile.equippedGear[
            slot
          ];


        const items =
          profile.equipmentInventory
            .filter(
              item =>
                item.slot === slot
            );


        return `
          <div class="equipment-slot">
            <div>
              <span class="eyebrow">
                ${slot}
              </span>

              <strong>
                ${
                  equipped
                    ? equipped.name
                    : 'Empty'
                }
              </strong>
            </div>

            <select
              data-equipment-slot="${slot}"
            >
              <option value="">
                None
              </option>

              ${
                items
                  .map((item, index) => `
                    <option
                      value="${index}"
                      ${
                        equipped &&
                        equipped.name ===
                          item.name
                          ? 'selected'
                          : ''
                      }
                    >
                      ${item.name}
                    </option>
                  `)
                  .join('')
              }
            </select>
          </div>
        `;
      })
      .join('');


  $$('[data-equipment-slot]')
    .forEach(select => {
      select.onchange =
        () => {
          const slot =
            select.dataset
              .equipmentSlot;


          const items =
            profile.equipmentInventory
              .filter(
                item =>
                  item.slot ===
                  slot
              );


          if (
            select.value === ''
          ) {
            delete profile
              .equippedGear[
                slot
              ];

          } else {
            profile.equippedGear[
              slot
            ] =
              items[
                +select.value
              ];
          }


          persist();

          renderEquipment();

          renderInstruments();

          refreshBattle(true);
        };
    });
}


/* =========================================================
   PET SYSTEM
========================================================= */

const petTypes = {
  'Tempo Fox': 'rhythm',
  'Melody Bird': 'melody',
  'Bass Bear': 'defense',
  'Amp Dragon': 'attack',
  'Harmony Spirit': 'all',
  'Crystal Bunny': 'melody',
  'Beat Pup': 'rhythm',
  'Echo Cat': 'all'
};


function renderPets() {
  const list =
    $('#petList');


  if (!list) {
    return;
  }


  if (
    profile.pets.length === 0
  ) {
    list.innerHTML = `
      <div class="empty-state">
        <span>🥚</span>
        <p>
          You don't have a pet yet.
          Find eggs in MusicCraft or roll the Pet Gacha.
        </p>
      </div>
    `;

    return;
  }


  list.innerHTML =
    profile.pets
      .map(pet => {
        const equipped =
          profile.equippedPet ===
          pet.id;


        const needed =
          (pet.level || 1) *
          15;


        return `
          <div
            class="
              pet-card
              ${equipped ? 'equipped' : ''}
            "
          >
            <div class="pet-icon">
              ${pet.icon || '🐾'}
            </div>

            <div class="pet-info">
              <strong>
                ${pet.name}
              </strong>

              <small>
                Level ${pet.level || 1}
                •
                ${petTypes[pet.name] || 'all'}
              </small>

              <div class="pet-exp">
                <i
                  style="
                    width:${
                      clamp(
                        (pet.exp || 0) /
                        needed *
                        100,
                        0,
                        100
                      )
                    }%
                  "
                ></i>
              </div>
            </div>

            <button
              class="btn small ${
                equipped
                  ? 'ghost'
                  : 'gold'
              }"
              data-equip-pet="${pet.id}"
              ${equipped ? 'disabled' : ''}
            >
              ${
                equipped
                  ? 'Equipped'
                  : 'Equip'
              }
            </button>
          </div>
        `;
      })
      .join('');


  $$('[data-equip-pet]')
    .forEach(button => {
      button.onclick =
        () => {
          profile.equippedPet =
            button.dataset.equipPet;


          persist();

          renderPets();

          renderInstruments();

          refreshBattle(true);


          toast(
            '🐾 Pet equipped!'
          );
        };
    });
}


/* =========================================================
   PET CREATION
========================================================= */

function addPet(
  name,
  icon = '🐾'
) {
  const existing =
    profile.pets.find(
      pet =>
        pet.name === name
    );


  if (existing) {
    addPetXP(
      existing.id,
      10
    );

    return existing;
  }


  const pet = {
    id:
      `pet-${Date.now()}-${rand(100, 999)}`,

    name,

    icon,

    level: 1,

    exp: 0
  };


  profile.pets.push(
    pet
  );


  if (
    !profile.equippedPet
  ) {
    profile.equippedPet =
      pet.id;
  }


  persist();

  renderPets();


  return pet;
}


/* =========================================================
   INSTRUMENT EVOLUTION
========================================================= */

function renderEvolutionPanel() {
  const panel =
    $('#evolutionPanel');


  if (!panel) {
    return;
  }


  const name =
    profile.equipped;


  const instrument =
    getInstrument(name);


  const level =
    getInstrumentLevel(name);


  const evolved =
    !!profile.instrumentEvolutions[
      name
    ];


  const crystals =
    profile.materials
      .MusicCrystal || 0;


  const core =
    profile.materials
      .CoreShard || 0;


  const canEvolve =
    level >= 10 &&
    crystals >= 3 &&
    core >= 1 &&
    !evolved;


  panel.innerHTML = `
    <div class="evolution-card">
      <div class="evolution-icon">
        ${instrument.icon}
      </div>

      <div>
        <strong>
          ${
            evolved
              ? `Ascended ${name}`
              : name
          }
        </strong>

        <small>
          ${
            evolved
              ? 'Evolution unlocked • +10% stats'
              : 'Requires Instrument Lv.10, 3 Music Crystals and 1 Core Shard'
          }
        </small>
      </div>

      <button
        id="evolveInstrumentBtn"
        class="btn ${
          canEvolve
            ? 'gold'
            : 'ghost'
        } small"
        ${
          !canEvolve
            ? 'disabled'
            : ''
        }
      >
        ${
          evolved
            ? 'Evolved'
            : 'Evolve'
        }
      </button>
    </div>

    <div class="evolution-materials">
      <span>
        💎 Music Crystal:
        <b>${crystals}</b>
      </span>

      <span>
        🔮 Core Shard:
        <b>${core}</b>
      </span>
    </div>
  `;


  const button =
    $('#evolveInstrumentBtn');


  if (button) {
    button.onclick =
      () => {
        if (
          !canEvolve
        ) {
          return;
        }


        profile.materials
          .MusicCrystal -= 3;


        profile.materials
          .CoreShard -= 1;


        profile.instrumentEvolutions[
          name
        ] = true;


        persist();

        renderEvolutionPanel();

        renderInstruments();

        refreshBattle(true);


        S.level();

        crowd(0.8);


        toast(
          `✨ ${name} evolved! All stats +10%.`
        );
      };
  }
}
/* =========================================================
   GAME HUB
========================================================= */

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


let activeIntervals = [];
let activeKeyHandler = null;


/* =========================================================
   INTERVAL HELPER
========================================================= */

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


/* =========================================================
   STOP ACTIVE GAME
========================================================= */

function stopActiveGame() {
  activeIntervals
    .forEach(
      clearInterval
    );

  activeIntervals = [];


  if (activeKeyHandler) {
    document.removeEventListener(
      'keydown',
      activeKeyHandler
    );

    activeKeyHandler = null;
  }
}


/* =========================================================
   RENDER GAME CARDS
========================================================= */

function renderGameCards() {
  const grid =
    $('#gameCards');


  if (!grid) {
    return;
  }


  grid.innerHTML =
    games
      .map(game => `
        <article class="game-card">
          <div class="game-card-icon">
            ${game[1]}
          </div>

          <span class="eyebrow">
            MUSIC GAME
          </span>

          <h3>
            ${game[2]}
          </h3>

          <p>
            ${game[3]}
          </p>

          <button
            class="btn gold small"
            data-game="${game[0]}"
          >
            Play
          </button>
        </article>
      `)
      .join('');


  $$('[data-game]')
    .forEach(button => {
      button.onclick =
        () =>
          openGame(
            button.dataset.game
          );
    });
}


/* =========================================================
   OPEN GAME
========================================================= */

function openGame(
  id
) {
  stopActiveGame();


  const game =
    games.find(
      item =>
        item[0] === id
    );


  if (!game) {
    return;
  }


  const stage =
    $('#gameStage');

  const title =
    $('#gameTitle');

  const eyebrow =
    $('#gameEyebrow');


  if (stage) {
    stage.classList.remove(
      'hidden'
    );
  }


  if (title) {
    title.textContent =
      game[2];
  }


  if (eyebrow) {
    eyebrow.textContent =
      game[1] + ' GAME';
  }


  if (id === 'rhythm') {
    startRhythmRush();
  }

  if (id === 'guess') {
    startGuessSong();
  }

  if (id === 'tiles') {
    startPianoTiles();
  }

  if (id === 'pitch') {
    startPerfectPitch();
  }

  if (id === 'memory') {
    startMelodyMemory();
  }

  if (id === 'dash') {
    startDash();
  }

  if (id === 'hero') {
    startInstrumentHero();
  }

  if (id === 'beat') {
    startBeatBattle();
  }

  if (id === 'dungeon') {
    startDungeon();
  }


  stage?.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
}


/* =========================================================
   CLOSE GAME
========================================================= */

const closeGameBtn =
  $('#closeGameBtn');


if (closeGameBtn) {
  closeGameBtn.onclick =
    () => {
      stopActiveGame();

      $('#gameStage')
        ?.classList.add(
          'hidden'
        );
    };
}


/* =========================================================
   MELODIES
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
      (note, index) => {
        setTimeout(
          () =>
            SoundEngine.tone(
              note,
              0.28,
              'sine',
              0.08
            ),

          index * 330
        );
      }
    );
}


/* =========================================================
   RHYTHM RUSH
========================================================= */

function startRhythmRush() {
  const body =
    $('#gameBody');


  if (!body) {
    return;
  }


  body.innerHTML = `
    <div class="game-panel">
      <div class="game-toolbar">
        <span class="game-stat">
          Score
          <b id="rrScore">0</b>
        </span>

        <span class="game-stat">
          Combo
          <b id="rrCombo">0</b>
        </span>

        <span class="game-stat">
          Time
          <b id="rrTime">20</b>s
        </span>
      </div>

      <div
        id="rhythmBoard"
        class="lane-board"
      >
        ${
          ['D', 'F', 'J', 'K']
            .map(
              (key, i) => `
                <div
                  class="lane"
                  data-lane="${i}"
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
    </div>
  `;


  let score = 0;
  let combo = 0;
  let time = 20;

  let notes = [];


  every(
    () => {
      const lane =
        rand(0, 3);

      const element =
        document.createElement(
          'div'
        );


      element.className =
        'fall-note';


      element.style.background =
        '#ffe08a';


      element.dataset.y =
        '-30';


      element.dataset.lane =
        lane;


      const board =
        $('#rhythmBoard');


      const targetLane =
        board?.children[lane];


      if (!targetLane) {
        return;
      }


      targetLane.appendChild(
        element
      );


      notes.push(
        element
      );
    },

    540
  );


  every(
    () => {
      notes =
        [...notes]
          .filter(note => {
            const y =
              +note.dataset.y + 9;


            note.dataset.y =
              y;


            note.style.top =
              y + 'px';


            if (y > 330) {
              note.remove();

              combo = 0;

              S.miss();

              $('#rrCombo').textContent =
                combo;

              return false;
            }


            return true;
          });
    },

    35
  );


  every(
    () => {
      time--;

      const timeEl =
        $('#rrTime');


      if (timeEl) {
        timeEl.textContent =
          time;
      }


      if (time <= 0) {
        stopActiveGame();


        const xp =
          20 +
          Math.round(
            score / 300
          );


        const coins =
          Math.max(
            5,
            Math.round(
              score / 180
            )
          );


        progressQuest(
          'game',
          1
        );


        reward(
          xp,
          coins,
          'Rhythm Rush complete!'
        );


        addInstrumentXP(
          profile.equipped,
          Math.max(
            2,
            Math.round(
              score / 800
            )
          )
        );
      }
    },

    1000
  );


  activeKeyHandler =
    event => {
      const lane =
        {
          d: 0,
          f: 1,
          j: 2,
          k: 3
        }[
          event.key.toLowerCase()
        ];


      if (
        lane === undefined
      ) {
        return;
      }


      const laneNotes =
        notes
          .filter(
            note =>
              +note.dataset.lane ===
              lane
          )
          .sort(
            (a, b) =>
              +b.dataset.y -
              +a.dataset.y
          );


      const note =
        laneNotes[0];


      if (
        note &&
        +note.dataset.y > 245
      ) {
        const y =
          +note.dataset.y;


        let gain = 60;


        if (y > 285) {
          gain = 100;

          S.perfect();

        } else if (y > 265) {
          gain = 80;

          S.great();

        } else {
          S.good();
        }


        combo++;

        score +=
          gain +
          Math.min(
            50,
            combo * 2
          );


        playInstrument(
          profile.equipped,
          261.6 *
          Math.pow(
            2,
            lane / 12
          )
        );


        note.remove();


        notes =
          notes.filter(
            item =>
              item !== note
          );


        $('#rrScore').textContent =
          score;


        $('#rrCombo').textContent =
          combo;

      } else {
        combo = 0;

        S.miss();


        $('#rrCombo').textContent =
          combo;
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* =========================================================
   GUESS THE SONG
========================================================= */

function startGuessSong() {
  const body =
    $('#gameBody');


  if (!body) {
    return;
  }


  let round = 0;
  let score = 0;
  let current = null;


  function nextRound() {
    round++;


    if (round > 5) {
      const xp =
        10 +
        score * 8;


      const coins =
        score * 5;


      progressQuest(
        'game',
        1
      );


      reward(
        xp,
        coins,
        `Guess the Song: ${score}/5`
      );


      body.innerHTML = `
        <div class="game-panel">
          <h3>
            Finished!
          </h3>

          <p>
            Score:
            <b>${score}/5</b>
          </p>
        </div>
      `;


      return;
    }


    current =
      pick(
        melodies
      );


    const wrong =
      melodies
        .filter(
          melody =>
            melody !== current
        );


    const options = [
      current,
      ...wrong
    ]
      .sort(
        () =>
          Math.random() - 0.5
      );


    body.innerHTML = `
      <div class="game-panel">
        <div class="game-toolbar">
          <span class="game-stat">
            Round
            <b>${round}/5</b>
          </span>

          <span class="game-stat">
            Score
            <b>${score}</b>
          </span>
        </div>

        <div class="guess-song-box">
          <div class="guess-song-icon">
            🎼
          </div>

          <h3>
            Which song is this?
          </h3>

          <button
            id="playGuessMelody"
            class="btn gold"
          >
            ▶ Play Melody
          </button>

          <div class="quiz-options">
            ${
              options
                .map(
                  option => `
                    <button
                      data-song-answer="${option.name}"
                    >
                      ${option.name}
                    </button>
                  `
                )
                .join('')
            }
          </div>
        </div>
      </div>
    `;


    $('#playGuessMelody').onclick =
      () =>
        playMelody(
          current
        );


    $$('[data-song-answer]')
      .forEach(button => {
        button.onclick =
          () => {
            if (
              button.dataset.songAnswer ===
              current.name
            ) {
              score++;

              S.correct();

              toast(
                '✅ Correct!'
              );

            } else {
              S.wrong();

              toast(
                `❌ It was ${current.name}`
              );
            }


            setTimeout(
              nextRound,
              650
            );
          };
      });


    setTimeout(
      () =>
        playMelody(
          current
        ),
      300
    );
  }


  nextRound();
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
          <b id="ptScore">0</b>
        </span>

        <span class="game-stat">
          Time
          <b id="ptTime">20</b>s
        </span>
      </div>

      <div
        id="ptBoard"
        class="lane-board"
      >
        ${
          ['D', 'F', 'J', 'K']
            .map(
              (key, i) => `
                <div
                  class="lane"
                  data-lane="${i}"
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
    </div>
  `;


  let score = 0;
  let time = 20;
  let notes = [];


  every(
    () => {
      const lane =
        rand(0, 3);


      const el =
        document.createElement(
          'div'
        );


      el.className =
        'fall-note';


      el.style.background =
        '#f7f5ef';


      el.dataset.y =
        '-30';


      el.dataset.lane =
        lane;


      $('#ptBoard')
        .children[lane]
        .appendChild(el);


      notes.push(el);
    },

    480
  );


  every(
    () => {
      notes =
        [...notes]
          .filter(n => {
            const y =
              +n.dataset.y + 10;


            n.dataset.y =
              y;


            n.style.top =
              y + 'px';


            if (y > 330) {
              n.remove();

              S.miss();

              return false;
            }


            return true;
          });
    },

    35
  );


  every(
    () => {
      time--;


      $('#ptTime').textContent =
        time;


      if (time <= 0) {
        stopActiveGame();


        const xp =
          15 +
          Math.round(
            score / 250
          );


        progressQuest(
          'game',
          1
        );


        reward(
          xp,
          Math.round(
            xp * 0.5
          ),
          'Piano Tiles complete!'
        );
      }
    },

    1000
  );


  activeKeyHandler =
    event => {
      const lane =
        {
          d: 0,
          f: 1,
          j: 2,
          k: 3
        }[
          event.key.toLowerCase()
        ];


      if (
        lane === undefined
      ) {
        return;
      }


      const n =
        notes
          .filter(
            x =>
              +x.dataset.lane ===
              lane
          )
          .sort(
            (a, b) =>
              +b.dataset.y -
              +a.dataset.y
          )[0];


      if (
        n &&
        +n.dataset.y > 250
      ) {
        score += 100;


        S.perfect();


        playInstrument(
          'Piano',
          261.6 *
          Math.pow(
            2,
            lane / 12
          )
        );


        n.remove();


        notes =
          notes.filter(
            x =>
              x !== n
          );


        $('#ptScore').textContent =
          score;

      } else {
        S.miss();
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* =========================================================
   PERFECT PITCH
========================================================= */

function startPerfectPitch() {
  const notes = [
    {
      name: 'C',
      freq: 261.6
    },

    {
      name: 'D',
      freq: 293.7
    },

    {
      name: 'E',
      freq: 329.6
    },

    {
      name: 'F',
      freq: 349.2
    },

    {
      name: 'G',
      freq: 392
    },

    {
      name: 'A',
      freq: 440
    },

    {
      name: 'B',
      freq: 493.9
    }
  ];


  let round = 0;
  let score = 0;
  let current;


  const body =
    $('#gameBody');


  function next() {
    round++;


    if (round > 10) {
      progressQuest(
        'game',
        1
      );


      reward(
        score * 6 + 10,
        score * 4,
        `Perfect Pitch: ${score}/10`
      );


      body.innerHTML = `
        <div class="game-panel">
          <h3>
            Ear Training Complete
          </h3>

          <p>
            You identified
            <b>${score}/10</b>
            notes correctly.
          </p>
        </div>
      `;


      return;
    }


    current =
      pick(notes);


    body.innerHTML = `
      <div class="game-panel">
        <div class="game-toolbar">
          <span class="game-stat">
            Round
            <b>${round}/10</b>
          </span>

          <span class="game-stat">
            Score
            <b>${score}</b>
          </span>
        </div>

        <div class="pitch-box">
          <div class="pitch-note">
            ♪
          </div>

          <h3>
            Which note did you hear?
          </h3>

          <button
            id="replayPitchBtn"
            class="btn gold"
          >
            🔊 Replay Note
          </button>

          <div class="pitch-options">
            ${
              notes
                .map(
                  note => `
                    <button
                      data-pitch="${note.name}"
                    >
                      ${note.name}
                    </button>
                  `
                )
                .join('')
            }
          </div>
        </div>
      </div>
    `;


    const play =
      () =>
        SoundEngine.tone(
          current.freq,
          0.55,
          'sine',
          0.11
        );


    $('#replayPitchBtn').onclick =
      play;


    $$('[data-pitch]')
      .forEach(button => {
        button.onclick =
          () => {
            if (
              button.dataset.pitch ===
              current.name
            ) {
              score++;

              S.correct();

              toast(
                '🎵 Correct!'
              );

            } else {
              S.wrong();

              toast(
                `That was ${current.name}.`
              );
            }


            setTimeout(
              next,
              450
            );
          };
      });


    setTimeout(
      play,
      250
    );
  }


  next();
}


/* =========================================================
   MELODY MEMORY
========================================================= */

function startMelodyMemory() {
  const noteSet = [
    {
      name: 'C',
      freq: 261.6
    },

    {
      name: 'D',
      freq: 293.7
    },

    {
      name: 'E',
      freq: 329.6
    },

    {
      name: 'G',
      freq: 392
    },

    {
      name: 'A',
      freq: 440
    }
  ];


  let sequence = [];
  let input = [];
  let round = 0;
  let playing = false;


  const body =
    $('#gameBody');


  function render() {
    body.innerHTML = `
      <div class="game-panel">
        <div class="game-toolbar">
          <span class="game-stat">
            Round
            <b>${round}</b>
          </span>

          <span class="game-stat">
            Sequence
            <b>${sequence.length}</b>
          </span>
        </div>

        <div class="memory-box">
          <h3>
            Repeat the melody
          </h3>

          <p id="memoryStatus">
            Listen carefully...
          </p>

          <div class="memory-pads">
            ${
              noteSet
                .map(
                  (note, index) => `
                    <button
                      data-memory-note="${index}"
                      ${
                        playing
                          ? 'disabled'
                          : ''
                      }
                    >
                      ${note.name}
                    </button>
                  `
                )
                .join('')
            }
          </div>
        </div>
      </div>
    `;


    $$('[data-memory-note]')
      .forEach(button => {
        button.onclick =
          () =>
            memoryInput(
              +button.dataset.memoryNote
            );
      });
  }


  async function playSequence() {
    playing = true;

    render();


    for (
      const index of sequence
    ) {
      const note =
        noteSet[index];


      SoundEngine.tone(
        note.freq,
        0.28,
        'sine',
        0.1
      );


      await wait(420);
    }


    playing = false;

    input = [];

    render();


    const status =
      $('#memoryStatus');


    if (status) {
      status.textContent =
        'Your turn!';
    }
  }


  function nextRound() {
    round++;


    sequence.push(
      rand(
        0,
        noteSet.length - 1
      )
    );


    render();


    setTimeout(
      playSequence,
      450
    );
  }


  function finish() {
    const xp =
      8 +
      round * 5;


    const coins =
      round * 4;


    progressQuest(
      'game',
      1
    );


    reward(
      xp,
      coins,
      `Melody Memory reached Round ${round}`
    );


    body.innerHTML = `
      <div class="game-panel">
        <h3>
          Memory Run Complete
        </h3>

        <p>
          You reached Round
          <b>${round}</b>.
        </p>
      </div>
    `;
  }


  function memoryInput(
    index
  ) {
    if (playing) {
      return;
    }


    const note =
      noteSet[index];


    SoundEngine.tone(
      note.freq,
      0.2,
      'sine',
      0.1
    );


    input.push(
      index
    );


    const position =
      input.length - 1;


    if (
      input[position] !==
      sequence[position]
    ) {
      S.wrong();

      finish();

      return;
    }


    if (
      input.length ===
      sequence.length
    ) {
      S.correct();

      toast(
        '✅ Melody matched!'
      );


      setTimeout(
        nextRound,
        600
      );
    }
  }


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
          <b id="dashScore">0</b>
        </span>

        <span class="game-stat">
          Shift = Jump
        </span>
      </div>

      <canvas
        id="dashCanvas"
        class="dash-canvas"
        width="760"
        height="260"
      ></canvas>

      <p id="dashMsg">
        Run for 25 seconds and collect notes.
      </p>
    </div>
  `;


  const c =
    $('#dashCanvas');


  const x =
    c.getContext(
      '2d'
    );


  let y = 195;
  let vy = 0;
  let ground = 195;

  let score = 0;
  let time = 25;

  let obs = [];
  let coins = [];


  activeKeyHandler =
    event => {
      if (
        (
          event.key === 'Shift' ||
          event.code === 'ShiftLeft' ||
          event.code === 'ShiftRight'
        ) &&
        y >= ground
      ) {
        vy = -12;

        S.jump();
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );


  every(
    () => {
      if (
        Math.random() <
        0.45
      ) {
        obs.push({
          x: 760,
          w: 25,
          h: rand(25, 60)
        });
      }


      if (
        Math.random() <
        0.65
      ) {
        coins.push({
          x: 760,
          y: rand(120, 190)
        });
      }
    },

    700
  );


  every(
    () => {
      vy += 0.8;

      y += vy;


      if (y > ground) {
        y = ground;

        vy = 0;
      }


      obs.forEach(
        o =>
          o.x -= 7
      );


      coins.forEach(
        o =>
          o.x -= 7
      );


      obs =
        obs.filter(o => {
          if (
            o.x < 95 &&
            o.x + o.w > 60 &&
            y + 35 >
              225 - o.h
          ) {
            $('#dashMsg').textContent =
              'You hit an obstacle! -100 score';


            score =
              Math.max(
                0,
                score - 100
              );


            S.wrong();

            return false;
          }


          return o.x > -40;
        });


      coins =
        coins.filter(o => {
          if (
            Math.abs(
              o.x - 75
            ) < 28 &&
            Math.abs(
              o.y - y
            ) < 35
          ) {
            score += 50;

            S.coin();

            return false;
          }


          return o.x > -20;
        });


      x.clearRect(
        0,
        0,
        760,
        260
      );


      x.fillStyle =
        '#07111d';


      x.fillRect(
        0,
        0,
        760,
        260
      );


      x.fillStyle =
        '#19334d';


      x.fillRect(
        0,
        230,
        760,
        30
      );


      x.fillStyle =
        '#64c8ff';


      x.fillRect(
        55,
        y,
        40,
        40
      );


      x.fillStyle =
        '#ff748a';


      obs.forEach(
        o =>
          x.fillRect(
            o.x,
            230 - o.h,
            o.w,
            o.h
          )
      );


      x.fillStyle =
        '#ffe08a';


      x.font =
        '24px sans-serif';


      coins.forEach(
        o =>
          x.fillText(
            '♪',
            o.x,
            o.y
          )
      );


      $('#dashScore').textContent =
        score;
    },

    33
  );


  every(
    () => {
      time--;


      if (time <= 0) {
        stopActiveGame();


        progressQuest(
          'game',
          1
        );


        reward(
          20 +
          Math.round(
            score / 100
          ),

          Math.round(
            score / 25
          ),

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
  const body =
    $('#gameBody');


  if (!body) {
    return;
  }


  const keys = [
    'a',
    's',
    'd',
    'f'
  ];


  let target =
    pick(keys);

  let score = 0;
  let combo = 0;
  let time = 20;


  function renderHero() {
    body.innerHTML = `
      <div class="game-panel">
        <div class="game-toolbar">
          <span class="game-stat">
            Score
            <b id="heroGameScore">
              ${score}
            </b>
          </span>

          <span class="game-stat">
            Combo
            <b id="heroGameCombo">
              ${combo}
            </b>
          </span>

          <span class="game-stat">
            Time
            <b id="heroGameTime">
              ${time}
            </b>s
          </span>
        </div>

        <div class="instrument-hero-stage">
          <div class="hero-instrument">
            ${getInstrument(profile.equipped).icon}
          </div>

          <p>
            Press
          </p>

          <div
            id="heroTargetKey"
            class="hero-target-key"
          >
            ${target.toUpperCase()}
          </div>

          <small>
            A • S • D • F
          </small>
        </div>
      </div>
    `;
  }


  renderHero();


  every(
    () => {
      time--;


      const timeEl =
        $('#heroGameTime');


      if (timeEl) {
        timeEl.textContent =
          time;
      }


      if (time <= 0) {
        stopActiveGame();


        const xp =
          25 +
          Math.round(
            score / 250
          );


        progressQuest(
          'game',
          1
        );


        reward(
          xp,
          Math.round(
            xp * 0.7
          ),
          'Instrument Hero complete!'
        );


        addMastery(
          profile.equipped,
          Math.round(
            score / 400
          )
        );


        addInstrumentXP(
          profile.equipped,
          Math.max(
            3,
            Math.round(
              score / 300
            )
          )
        );
      }
    },

    1000
  );


  activeKeyHandler =
    event => {
      const key =
        event.key.toLowerCase();


      if (
        !keys.includes(key)
      ) {
        return;
      }


      if (
        key === target
      ) {
        combo++;

        score +=
          100 +
          Math.min(
            100,
            combo * 4
          );


        S.perfect();


        playInstrument(
          profile.equipped,
          330 +
          keys.indexOf(key) *
          60
        );


        target =
          pick(keys);


        $('#heroTargetKey').textContent =
          target.toUpperCase();

      } else {
        combo = 0;

        score =
          Math.max(
            0,
            score - 25
          );


        S.miss();
      }


      $('#heroGameScore').textContent =
        score;


      $('#heroGameCombo').textContent =
        combo;
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* =========================================================
   BEAT BATTLE
========================================================= */

function startBeatBattle() {
  const body =
    $('#gameBody');


  if (!body) {
    return;
  }


  let bossHP = 3000;
  let bossMax = 3000;
  let score = 0;
  let time = 25;

  let marker = 0;
  let direction = 1;


  body.innerHTML = `
    <div class="game-panel">
      <div class="game-toolbar">
        <span class="game-stat">
          Score
          <b id="bbScore">0</b>
        </span>

        <span class="game-stat">
          Time
          <b id="bbTime">25</b>s
        </span>
      </div>

      <div class="beat-boss">
        <div class="beat-boss-icon">
          🗿
        </div>

        <h3>
          Bass Golem
        </h3>

        <div class="hpbar red">
          <i
            id="bbBossHp"
            style="width:100%"
          ></i>
        </div>

        <b id="bbBossHpText">
          3000 / 3000
        </b>
      </div>

      <div class="beat-timing">
        <div class="beat-track">
          <div class="perfect-zone"></div>

          <div
            id="beatMarker"
            class="beat-marker"
          ></div>
        </div>

        <p>
          Press
          <b>SHIFT</b>
          when the marker reaches the centre.
        </p>
      </div>

      <div
        id="beatResult"
        class="beat-result"
      >
        Ready...
      </div>
    </div>
  `;


  every(
    () => {
      marker +=
        direction * 2.4;


      if (
        marker >= 100
      ) {
        marker = 100;

        direction = -1;
      }


      if (
        marker <= 0
      ) {
        marker = 0;

        direction = 1;
      }


      const markerEl =
        $('#beatMarker');


      if (markerEl) {
        markerEl.style.left =
          `${marker}%`;
      }
    },

    20
  );


  every(
    () => {
      time--;


      $('#bbTime').textContent =
        time;


      if (
        time <= 0
      ) {
        stopActiveGame();


        if (
          bossHP > 0
        ) {
          progressQuest(
            'game',
            1
          );


          reward(
            15,
            8,
            'Beat Battle ended!'
          );
        }
      }
    },

    1000
  );


  activeKeyHandler =
    event => {
      if (
        event.key !== 'Shift' &&
        event.code !== 'ShiftLeft' &&
        event.code !== 'ShiftRight'
      ) {
        return;
      }


      const distance =
        Math.abs(
          marker - 50
        );


      let damage = 90;
      let label = 'WEAK';


      if (
        distance <= 6
      ) {
        damage = 420;

        label = 'PERFECT';

        S.perfect();

      } else if (
        distance <= 14
      ) {
        damage = 260;

        label = 'GREAT';

        S.great();

      } else {
        S.good();
      }


      bossHP =
        Math.max(
          0,
          bossHP - damage
        );


      score += damage;


      $('#bbScore').textContent =
        score;


      $('#bbBossHpText').textContent =
        `${bossHP} / ${bossMax}`;


      $('#bbBossHp').style.width =
        `${
          clamp(
            bossHP /
            bossMax *
            100,
            0,
            100
          )
        }%`;


      $('#beatResult').textContent =
        `${label}! -${damage} HP`;


      playInstrument(
        profile.equipped,
        label === 'PERFECT'
          ? 760
          : 440
      );


      if (
        bossHP <= 0
      ) {
        stopActiveGame();


        progressQuest(
          'game',
          1
        );


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


        S.victory();

        crowd(0.8);


        $('#beatResult').textContent =
          '🏆 BASS GOLEM DEFEATED!';
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
  const body =
    $('#gameBody');


  if (!body) {
    return;
  }


  let room = 1;
  let playerHP = 100;

  let enemy = null;


  function makeEnemy() {
    const boss =
      room % 4 === 0;


    enemy = {
      boss,

      name:
        boss
          ? 'Discord Beast'
          : pick([
              'Noise Slime',
              'Tempo Bat',
              'Echo Ghost',
              'Bass Bug'
            ]),

      icon:
        boss
          ? '🐉'
          : pick([
              '🟢',
              '🦇',
              '👻',
              '🐛'
            ]),

      maxHP:
        boss
          ? 1200
          : 420,

      hp:
        boss
          ? 1200
          : 420
    };
  }


  function renderDungeon() {
    body.innerHTML = `
      <div class="game-panel">
        <div class="game-toolbar">
          <span class="game-stat">
            Room
            <b>${room}</b>
          </span>

          <span class="game-stat">
            HP
            <b>${playerHP}/100</b>
          </span>
        </div>

        <div class="dungeon-room">
          <div class="dungeon-enemy-icon">
            ${enemy.icon}
          </div>

          <span class="eyebrow">
            ${
              enemy.boss
                ? 'BOSS ROOM'
                : 'DUNGEON ENEMY'
            }
          </span>

          <h3>
            ${enemy.name}
          </h3>

          <div class="hpbar red">
            <i
              style="
                width:${
                  clamp(
                    enemy.hp /
                    enemy.maxHP *
                    100,
                    0,
                    100
                  )
                }%
              "
            ></i>
          </div>

          <b>
            ${enemy.hp}
            /
            ${enemy.maxHP}
            HP
          </b>

          <div class="dungeon-actions">
            <button
              id="dungeonAttackBtn"
              class="btn gold"
            >
              ⚔️ Perform Attack
            </button>

            <button
              id="dungeonHealBtn"
              class="btn ghost"
            >
              💚 Heal
            </button>

            <button
              id="dungeonLeaveBtn"
              class="btn ghost"
            >
              🚪 Leave Dungeon
            </button>
          </div>
        </div>
      </div>
    `;


    $('#dungeonAttackBtn').onclick =
      attack;


    $('#dungeonHealBtn').onclick =
      heal;


    $('#dungeonLeaveBtn').onclick =
      leave;
  }


  function enemyTurn() {
    const damage =
      enemy.boss
        ? rand(12, 20)
        : rand(6, 13);


    playerHP =
      Math.max(
        0,
        playerHP - damage
      );


    S.attack();


    if (
      playerHP <= 0
    ) {
      addXP(10);


      S.defeat();


      body.innerHTML = `
        <div class="game-panel">
          <h3>
            Dungeon Run Ended
          </h3>

          <p>
            You reached Room
            <b>${room}</b>.
          </p>

          <p>
            +10 EXP
          </p>
        </div>
      `;


      progressQuest(
        'game',
        1
      );


      return false;
    }


    return true;
  }


  function attack() {
    const instrument =
      getUpgradedInstrument(
        profile.equipped
      );


    const damage =
      Math.max(
        60,

        Math.round(
          instrument.attack *
          1.5 +
          instrument.rhythm *
          0.4 +
          rand(-10, 35)
        )
      );


    enemy.hp =
      Math.max(
        0,
        enemy.hp - damage
      );


    S.attack();


    playInstrument(
      profile.equipped,
      enemy.boss
        ? 650
        : 440
    );


    if (
      enemy.hp <= 0
    ) {
      if (
        enemy.boss
      ) {
        reward(
          50,
          35,
          'Dungeon Boss defeated!'
        );


        S.victory();

        crowd(0.7);

      } else {
        reward(
          8,
          5,
          `${enemy.name} defeated!`
        );
      }


      addInstrumentXP(
        profile.equipped,
        enemy.boss
          ? 8
          : 2
      );


      room++;

      makeEnemy();

      renderDungeon();

      return;
    }


    if (
      enemyTurn()
    ) {
      renderDungeon();
    }
  }


  function heal() {
    const amount =
      rand(14, 25);


    playerHP =
      Math.min(
        100,
        playerHP + amount
      );


    S.heal();


    if (
      enemyTurn()
    ) {
      renderDungeon();
    }
  }


  function leave() {
    progressQuest(
      'game',
      1
    );


    body.innerHTML = `
      <div class="game-panel">
        <h3>
          Dungeon Run Complete
        </h3>

        <p>
          You left at Room
          <b>${room}</b>.
        </p>
      </div>
    `;


    stopActiveGame();
  }


  makeEnemy();

  renderDungeon();
}


/* =========================================================
   GACHA DATA
========================================================= */

const gachaData = {
  accessory: [
    {
      name: 'Silver Headphones',
      rarity: 'Common',
      icon: '🎧'
    },

    {
      name: 'Music Pin',
      rarity: 'Common',
      icon: '🎵'
    },

    {
      name: 'Gold Headphones',
      rarity: 'Rare',
      icon: '🎧'
    },

    {
      name: 'Neon Crown',
      rarity: 'Epic',
      icon: '👑'
    },

    {
      name: 'Celestial Halo',
      rarity: 'Legendary',
      icon: '😇'
    },

    {
      name: 'Mythic Maestro Crown',
      rarity: 'Mythic',
      icon: '👑'
    }
  ],


  pet: [
    {
      name: 'Beat Pup',
      rarity: 'Common',
      icon: '🐶'
    },

    {
      name: 'Crystal Bunny',
      rarity: 'Uncommon',
      icon: '🐰'
    },

    {
      name: 'Tempo Fox',
      rarity: 'Rare',
      icon: '🦊'
    },

    {
      name: 'Melody Bird',
      rarity: 'Rare',
      icon: '🐦'
    },

    {
      name: 'Bass Bear',
      rarity: 'Epic',
      icon: '🐻'
    },

    {
      name: 'Harmony Spirit',
      rarity: 'Legendary',
      icon: '✨'
    },

    {
      name: 'Amp Dragon',
      rarity: 'Mythic',
      icon: '🐉'
    }
  ],


  aura: [
    {
      name: 'Soft Glow',
      rarity: 'Common',
      icon: '✨'
    },

    {
      name: 'Blue Notes',
      rarity: 'Uncommon',
      icon: '🎵'
    },

    {
      name: 'Electric Aura',
      rarity: 'Rare',
      icon: '⚡'
    },

    {
      name: 'Flame Rhythm',
      rarity: 'Epic',
      icon: '🔥'
    },

    {
      name: 'Star Symphony',
      rarity: 'Legendary',
      icon: '🌟'
    },

    {
      name: 'Cosmic Maestro',
      rarity: 'Mythic',
      icon: '🌌'
    }
  ],


  skin: [
    {
      name: 'Street Musician',
      rarity: 'Common',
      icon: '🧢'
    },

    {
      name: 'Jazz Performer',
      rarity: 'Uncommon',
      icon: '🎷'
    },

    {
      name: 'Rock Star',
      rarity: 'Rare',
      icon: '🤘'
    },

    {
      name: 'Royal Maestro',
      rarity: 'Epic',
      icon: '🎩'
    },

    {
      name: 'Celestial Virtuoso',
      rarity: 'Legendary',
      icon: '🌠'
    },

    {
      name: 'MusicVerse God',
      rarity: 'Mythic',
      icon: '👑'
    }
  ]
};


let activeGacha =
  'accessory';


const costs = {
  accessory: 100,
  pet: 200,
  aura: 175,
  skin: 150
};


/* =========================================================
   RARITY ROLL
========================================================= */

function rarityRoll() {
  const r =
    Math.random() * 100;


  return (
    r < 0.5
      ? 'Mythic'
      : r < 3
      ? 'Legendary'
      : r < 11
      ? 'Epic'
      : r < 27
      ? 'Rare'
      : r < 55
      ? 'Uncommon'
      : 'Common'
  );
}


const rarityOrder = [
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Legendary',
  'Mythic'
];


/* =========================================================
   SAFE GACHA PICK
========================================================= */

function pickGachaItem(
  pool,
  desired
) {
  let index =
    rarityOrder.indexOf(
      desired
    );


  while (
    index >= 0
  ) {
    const rarity =
      rarityOrder[index];


    const matches =
      pool.filter(
        item =>
          item.rarity ===
          rarity
      );


    if (
      matches.length
    ) {
      return pick(matches);
    }


    index--;
  }


  return pick(pool);
}


/* =========================================================
   GACHA UI
========================================================= */

function updateGachaUI() {
  const title =
    $('#gachaTitle');

  const subtitle =
    $('#gachaSubtitle');

  const rollOne =
    $('#rollOneBtn');

  const rollTen =
    $('#rollTenBtn');


  const labels = {
    accessory:
      'Accessory Capsule',

    pet:
      'Pet Capsule',

    aura:
      'Aura Capsule',

    skin:
      'Skin Capsule'
  };


  if (title) {
    title.textContent =
      labels[activeGacha];
  }


  if (subtitle) {
    subtitle.textContent =
      `Roll for ${activeGacha} rewards.`;
  }


  if (rollOne) {
    rollOne.textContent =
      `Roll x1 • ${costs[activeGacha]}`;
  }


  if (rollTen) {
    rollTen.textContent =
      `Roll x10 • ${
        costs[activeGacha] * 10
      }`;
  }


  $$('.gacha-tab')
    .forEach(button => {
      button.classList.toggle(
        'active',
        button.dataset.gacha ===
          activeGacha
      );
    });


  updateProfileUI();
}


/* =========================================================
   ROLL GACHA
========================================================= */

function rollGacha(
  count = 1
) {
  const cost =
    costs[activeGacha] *
    count;


  if (
    profile.coins < cost
  ) {
    return toast(
      'Not enough coins.'
    );
  }


  profile.coins -=
    cost;


  const results = [];


  for (
    let i = 0;
    i < count;
    i++
  ) {
    const rarity =
      rarityRoll();


    const item =
      pickGachaItem(
        gachaData[activeGacha],
        rarity
      );


    results.push(
      item
    );


    if (
      activeGacha === 'pet'
    ) {
      addPet(
        item.name,
        item.icon
      );

    } else {
      profile.inventory.push({
        ...item,
        type:
          activeGacha,

        id:
          `gacha-${Date.now()}-${i}-${rand(100, 999)}`
      });
    }
  }


  persist();

  updateProfileUI();

  renderInventory();

  renderPets();


  const reveal =
    $('#gachaReveal');


  if (reveal) {
    reveal.innerHTML =
      results
        .map(item => `
          <div
            class="
              gacha-result
              rarity-${item.rarity.toLowerCase()}
            "
          >
            <span>
              ${item.icon}
            </span>

            <strong>
              ${item.name}
            </strong>

            <small>
              ${item.rarity}
            </small>
          </div>
        `)
        .join('');
  }


  S.gacha();


  const best =
    results
      .map(
        item =>
          rarityOrder.indexOf(
            item.rarity
          )
      )
      .sort(
        (a, b) =>
          b - a
      )[0];


  if (
    best >=
    rarityOrder.indexOf(
      'Legendary'
    )
  ) {
    crowd(0.8);
  }
}


/* =========================================================
   INVENTORY
========================================================= */

function renderInventory() {
  const grid =
    $('#inventoryGrid');


  if (!grid) {
    return;
  }


  if (
    profile.inventory.length === 0
  ) {
    grid.innerHTML = `
      <div class="empty-state">
        <span>🎁</span>

        <p>
          Your cosmetic inventory is empty.
        </p>
      </div>
    `;

    return;
  }


  grid.innerHTML =
    profile.inventory
      .slice()
      .reverse()
      .map(item => `
        <div
          class="
            inventory-item
            rarity-${item.rarity.toLowerCase()}
          "
        >
          <span>
            ${item.icon}
          </span>

          <strong>
            ${item.name}
          </strong>

          <small>
            ${item.rarity}
            •
            ${item.type}
          </small>
        </div>
      `)
      .join('');
}


/* =========================================================
   GACHA EVENTS
========================================================= */

$$('.gacha-tab')
  .forEach(button => {
    button.onclick =
      () => {
        activeGacha =
          button.dataset.gacha;

        updateGachaUI();
      };
  });


const rollOneBtn =
  $('#rollOneBtn');


if (rollOneBtn) {
  rollOneBtn.onclick =
    () =>
      rollGacha(1);
}


const rollTenBtn =
  $('#rollTenBtn');


if (rollTenBtn) {
  rollTenBtn.onclick =
    () =>
      rollGacha(10);
}
/* =========================================================
   MUSICCRAFT
========================================================= */

const craftCanvas =
  $('#craftCanvas');

const ctx =
  craftCanvas?.getContext?.(
    '2d'
  ) || null;


let craftWorld = [];
let craftMined = 0;
let craftDepth = 0;
let craftLayer = 0;


/* =========================================================
   MUSICCRAFT DEPTHS
========================================================= */

const craftTypesByDepth = [
  {
    name: 'Surface',

    blocks: [
      ['Dirt', '#70513c', 1, 1],
      ['Stone', '#6d7885', 1, 2],
      ['Coal', '#28313a', 2, 2]
    ]
  },

  {
    name:
      'Shallow Underground',

    blocks: [
      ['Dirt', '#5f4435', 1, 1],
      ['Stone', '#68727d', 1, 2],
      ['Coal', '#28313a', 2, 2],
      ['Copper', '#b87333', 3, 2]
    ]
  },

  {
    name: 'Stone Tunnels',

    blocks: [
      ['Stone', '#626d79', 1, 2],
      ['Coal', '#252d34', 2, 2],
      ['Copper', '#b87333', 3, 2],
      ['Iron', '#9b8c7a', 3, 3]
    ]
  },

  {
    name: 'Coal Depths',

    blocks: [
      ['Stone', '#5c6570', 1, 2],
      ['Coal', '#1f252b', 3, 2],
      ['Iron', '#9b8c7a', 3, 3],
      ['Silver', '#b7bec8', 4, 3]
    ]
  },

  {
    name: 'Iron Caverns',

    blocks: [
      ['Stone', '#59636e', 1, 2],
      ['Iron', '#9b8c7a', 4, 3],
      ['Silver', '#b7bec8', 5, 3],
      ['Gold', '#d8ad42', 6, 4]
    ]
  },

  {
    name: 'Deep Caves',

    blocks: [
      ['Stone', '#525b66', 1, 2],
      ['Iron', '#8f8274', 4, 3],
      ['Gold', '#d8ad42', 6, 4],
      ['Ruby', '#d94a62', 8, 4]
    ]
  },

  {
    name: 'Gold Veins',

    blocks: [
      ['Stone', '#4d5661', 1, 2],
      ['Gold', '#d8ad42', 7, 4],
      ['Ruby', '#d94a62', 9, 4],
      ['Emerald', '#4fca83', 10, 4]
    ]
  },

  {
    name: 'Crystal Caverns',

    blocks: [
      ['Stone', '#48525e', 1, 2],
      ['Gold', '#d8ad42', 7, 4],
      ['Crystal', '#8e73ff', 12, 5],
      ['Amethyst', '#a66cff', 14, 5]
    ]
  },

  {
    name: 'Diamond Depths',

    blocks: [
      ['Dark Stone', '#3b4652', 2, 3],
      ['Crystal', '#8e73ff', 12, 5],
      ['Diamond', '#55d7e8', 16, 6],
      ['Sapphire', '#4a78ef', 15, 5]
    ]
  },

  {
    name: 'Obsidian Ruins',

    blocks: [
      ['Obsidian', '#27243a', 4, 5],
      ['Diamond', '#55d7e8', 16, 6],
      ['Sapphire', '#4a78ef', 15, 5],
      ['Ancient Ore', '#9f865a', 20, 6]
    ]
  },

  {
    name: 'Ancient Depths',

    blocks: [
      ['Obsidian', '#211d31', 4, 5],
      ['Ancient Ore', '#9f865a', 20, 6],
      ['Ancient Crystal', '#d6b3ff', 24, 7],
      ['Relic Stone', '#786246', 18, 6]
    ]
  },

  {
    name: 'Magma Zone',

    blocks: [
      ['Basalt', '#2c292e', 4, 5],
      ['Obsidian', '#1c1925', 5, 6],
      ['Magma Crystal', '#ff6a3d', 28, 7],
      ['Fire Gem', '#ffb347', 32, 7]
    ]
  },

  {
    name: 'Echo Abyss',

    blocks: [
      ['Void Stone', '#171624', 5, 6],
      ['Echo Crystal', '#5ed4ff', 32, 7],
      ['Void Gem', '#8857ff', 38, 8],
      ['Resonance Ore', '#d04fff', 42, 8]
    ]
  },

  {
    name: 'Celestial Core',

    blocks: [
      ['Celestial Stone', '#27395d', 6, 7],
      ['Star Crystal', '#ffe178', 45, 8],
      ['Moonstone', '#b9d7ff', 48, 8],
      ['Celestial Gem', '#e5d3ff', 55, 9]
    ]
  },

  {
    name: 'MusicVerse Core',

    blocks: [
      ['Core Stone', '#13101d', 7, 8],
      ['Music Crystal', '#f3d77c', 65, 9],
      ['Harmony Gem', '#71e7d3', 75, 9],
      ['CoreShard', '#fff1a8', 100, 10]
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
]
.map(
  egg => ({
    layer: egg[0],
    egg: egg[1],
    icon: egg[2],
    pet: egg[3],
    color: egg[4],
    chance: egg[5]
  })
);


/* =========================================================
   CRAFT HELPERS
========================================================= */

function getCraftDepthName() {
  return craftTypesByDepth[
    Math.min(
      craftDepth,
      craftTypesByDepth.length - 1
    )
  ].name;
}


function getCurrentCraftEgg() {
  return craftPetEggs[
    Math.min(
      craftDepth,
      craftPetEggs.length - 1
    )
  ];
}


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
          profile.materials[name] ===
          undefined
        ) {
          profile.materials[name] = 0;
        }
      }
    );
}


/* =========================================================
   GENERATE CRAFT LAYER
========================================================= */

function generateCraftLayer() {
  const depthData =
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


            if (r < 0.5) {
              return depthData
                .blocks[0];
            }


            if (r < 0.75) {
              return depthData
                .blocks[
                  Math.min(
                    1,
                    depthData.blocks.length - 1
                  )
                ];
            }


            if (r < 0.9) {
              return depthData
                .blocks[
                  Math.min(
                    2,
                    depthData.blocks.length - 1
                  )
                ];
            }


            return depthData
              .blocks[
                depthData.blocks.length - 1
              ];
          }
        )
    );


  renderCraft();
}


/* =========================================================
   NEW CRAFT WORLD
========================================================= */

function newCraftWorld() {
  craftMined = 0;
  craftDepth = 0;
  craftLayer = 0;


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
  if (!ctx) {
    return;
  }


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
    craftCanvas.width / 20;


  const h =
    craftCanvas.height / 12;


  ctx.clearRect(
    0,
    0,
    craftCanvas.width,
    craftCanvas.height
  );


  craftWorld.forEach(
    (row, y) =>
      row.forEach(
        (block, x) => {
          if (!block) {
            return;
          }


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


  const currentBlocks =
    craftTypesByDepth[
      craftDepth
    ].blocks.map(
      block =>
        block[0]
    );


  const inventory =
    $('#craftInventory');


  if (inventory) {
    inventory.innerHTML =
      currentBlocks
        .map(
          item => `
            <div>
              <span>
                ${item}
              </span>

              <b>
                ${profile.materials[item] || 0}
              </b>
            </div>
          `
        )
        .join('');
  }


  const missionText =
    $('#missionText');


  if (missionText) {
    missionText.textContent =
      `Mine 12 blocks • ${craftMined % 12}/12`;
  }


  const depthName =
    $('#craftDepthName');


  if (depthName) {
    depthName.textContent =
      getCraftDepthName();
  }


  const layerLabel =
    $('#craftLayerLabel');


  if (layerLabel) {
    layerLabel.textContent =
      `${craftDepth + 1} / ${craftTypesByDepth.length}`;
  }


  const depthFill =
    $('#craftDepthFill');


  if (depthFill) {
    depthFill.style.width =
      `${
        (
          (
            craftDepth + 1
          ) /
          craftTypesByDepth.length
        ) * 100
      }%`;
  }


  renderCraftEggs();

  renderEvolutionPanel();
}


/* =========================================================
   COLLECT PET EGG
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
      craftDepth / 3
    )
  );


  renderCraftEggs();
}


/* =========================================================
   HATCH PET EGG
========================================================= */

function hatchCraftEgg(
  id
) {
  const egg =
    profile.petEggs.find(
      item =>
        item.id === id
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


  if (existing) {
    profile.dust =
      (
        profile.dust ||
        0
      ) + 10;


    toast(
      `✨ Duplicate ${egg.pet}! +10 Star Dust`
    );

  } else {
    profile.pets.push({
      id:
        `pet-${Date.now()}-${Math.random()}`,

      name:
        egg.pet,

      icon:
        egg.icon || '🐾',

      level:
        1,

      exp:
        0,

      type:
        petTypes[
          egg.pet
        ] || 'all',

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
   RENDER CRAFT EGGS
========================================================= */

function renderCraftEggs() {
  const element =
    $('#craftEggInventory');


  if (!element) {
    return;
  }


  const eggs =
    profile.petEggs.filter(
      egg =>
        !egg.hatched
    );


  if (
    eggs.length === 0
  ) {
    element.innerHTML =
      '<p class="muted">No eggs discovered yet.</p>';

    return;
  }


  element.innerHTML =
    eggs
      .slice(-8)
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
      .join('');


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
   CRAFT DESCENT
========================================================= */

function checkCraftDescent() {
  let cleared =
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
        cleared++;
      }
    }
  }


  if (
    cleared >= 12 &&
    craftDepth <
      craftTypesByDepth.length - 1
  ) {
    craftDepth++;

    craftLayer++;


    reward(
      8 + craftDepth * 2,
      5 + craftDepth * 2,
      `⛏️ Descended to ${getCraftDepthName()}!`
    );


    generateCraftLayer();


    return true;
  }


  return false;
}


/* =========================================================
   MINE BLOCK
========================================================= */

if (craftCanvas) {
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


      if (!block) {
        return;
      }


      craftWorld[y][x] =
        null;


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


      profile.materials[
        block[0]
      ] =
        (
          profile.materials[
            block[0]
          ] ||
          0
        ) + 1;


      craftMined++;


      const coin =
        Math.max(
          0,
          Math.floor(
            block[2] *
            0.15
          )
        );


      const xp =
        block[2] >= 12
          ? Math.max(
              1,
              Math.floor(
                block[2] *
                0.08
              )
            )
          : 0;


      if (coin) {
        profile.coins +=
          coin;
      }


      if (xp) {
        addXP(
          xp
        );
      }


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


      const descended =
        y >= 10 &&
        checkCraftDescent();


      if (!descended) {
        renderCraft();
      }
    };
}


/* =========================================================
   CRAFT MISSION
========================================================= */

const missionBtn =
  $('#missionBtn');


if (missionBtn) {
  missionBtn.onclick =
    () => {
      if (
        craftMined < 12
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
}


const newWorldBtn =
  $('#newWorldBtn');


if (newWorldBtn) {
  newWorldBtn.onclick =
    newCraftWorld;
}


/* =========================================================
   LEADERBOARD
========================================================= */

const leaderboardBots =
  Array.from(
    {
      length: 99
    },

    (_, i) => ({
      name:
        `${pick(botNames)}${i + 1}`,

      level:
        rand(1, 70),

      xp:
        rand(
          100,
          8000
        )
    })
  );


function renderLeaderboard() {
  const body =
    $('#leaderboardBody');


  const rankLabel =
    $('#yourRank');


  const podium =
    $('#podium');


  if (
    !body ||
    !rankLabel ||
    !podium
  ) {
    return;
  }


  const players = [
    ...leaderboardBots,

    {
      name:
        profile.name ||
        'You',

      level:
        profile.level,

      xp:
        profile.totalXp,

      you:
        true
    }
  ];


  players.sort(
    (a, b) =>
      b.xp - a.xp
  );


  const rank =
    players.findIndex(
      player =>
        player.you
    ) + 1;


  rankLabel.textContent =
    `#${rank}`;


  podium.innerHTML =
    players
      .slice(0, 3)
      .map(
        (player, i) => `
          <div>
            <span>
              ${
                [
                  '🥇',
                  '🥈',
                  '🥉'
                ][i]
              }
            </span>

            <b>
              ${player.name}
            </b>

            <small>
              ${player.xp.toLocaleString()}
              EXP
            </small>
          </div>
        `
      )
      .join('');


  body.innerHTML =
    players
      .map(
        (player, i) => `
          <tr
            ${
              player.you
                ? 'style="background:#12263c"'
                : ''
            }
          >
            <td>
              #${i + 1}
            </td>

            <td>
              ${
                player.you
                  ? '⭐ '
                  : ''
              }
              ${player.name}
            </td>

            <td>
              ${player.level}
            </td>

            <td>
              ${player.xp.toLocaleString()}
            </td>
          </tr>
        `
      )
      .join('');
}


/* =========================================================
   MUSIC QUIZ
========================================================= */

const quizQs = [
  [
    'Which instrument usually has 88 keys?',
    [
      'Piano',
      'Violin',
      'Flute',
      'Trumpet'
    ],
    0
  ],

  [
    'Which family does the trumpet belong to?',
    [
      'Strings',
      'Brass',
      'Keys',
      'Woodwind'
    ],
    1
  ],

  [
    'What does tempo describe?',
    [
      'Volume',
      'Speed',
      'Pitch',
      'Instrument size'
    ],
    1
  ],

  [
    'Which instrument is played with a bow?',
    [
      'Violin',
      'Trumpet',
      'Drums',
      'Flute'
    ],
    0
  ],

  [
    'Which symbol often means a musical note?',
    [
      '♪',
      '©',
      '%',
      '@'
    ],
    0
  ],

  [
    'Which instrument is percussion?',
    [
      'Drums',
      'Cello',
      'Saxophone',
      'Harp'
    ],
    0
  ],

  [
    'What is a melody?',
    [
      'A sequence of notes',
      'A stage light',
      'A drum stick',
      'A microphone'
    ],
    0
  ],

  [
    'Which is a woodwind instrument?',
    [
      'Clarinet',
      'Tuba',
      'Piano',
      'Guitar'
    ],
    0
  ],

  [
    'What does forte usually mean?',
    [
      'Loud',
      'Soft',
      'Slow',
      'Silent'
    ],
    0
  ],

  [
    'Which instrument has strings and pedals?',
    [
      'Harp',
      'Flute',
      'Bongos',
      'Cornet'
    ],
    0
  ]
];


let quizIndex =
  0;


let quizScore =
  0;


/* =========================================================
   RENDER QUIZ
========================================================= */

function renderQuiz() {
  const card =
    $('#quizCard');


  const score =
    $('#quizScore');


  if (
    !card ||
    !score
  ) {
    return;
  }


  const question =
    quizQs[
      quizIndex
    ];


  score.textContent =
    quizScore;


  card.innerHTML = `
    <span class="eyebrow">
      QUESTION
      ${quizIndex + 1}
      /
      ${quizQs.length}
    </span>

    <h3>
      ${question[0]}
    </h3>

    <div class="quiz-options">
      ${
        question[1]
          .map(
            (answer, i) => `
              <button
                data-quiz="${i}"
              >
                ${answer}
              </button>
            `
          )
          .join('')
      }
    </div>
  `;


  $$('[data-quiz]')
    .forEach(
      button => {
        button.onclick =
          () => {
            const answer =
              +button.dataset.quiz;


            const correct =
              answer ===
              question[2];


            $$('[data-quiz]')
              .forEach(
                option => {
                  option.disabled =
                    true;
                }
              );


            button.classList.add(
              correct
                ? 'correct'
                : 'wrong'
            );


            if (correct) {
              quizScore++;


              addXP(
                2
              );


              profile.coins +=
                1;


              persist();

              updateProfileUI();


              S.correct();

            } else {
              S.wrong();
            }


            setTimeout(
              () => {
                quizIndex++;


                if (
                  quizIndex >=
                  quizQs.length
                ) {
                  card.innerHTML = `
                    <h3>
                      Quiz complete:
                      ${quizScore}/${quizQs.length}
                    </h3>

                    <button
                      id="quizRestart"
                      class="btn gold"
                    >
                      Play Again
                    </button>
                  `;


                  const restart =
                    $('#quizRestart');


                  if (restart) {
                    restart.onclick =
                      () => {
                        quizIndex = 0;

                        quizScore = 0;

                        renderQuiz();
                      };
                  }

                } else {
                  renderQuiz();
                }
              },

              650
            );
          };
      }
    );
}


/* =========================================================
   START MUSICVERSE
========================================================= */

setupProfile();

updateProfileUI();

renderDailyRewards();

renderFamilies();

renderInstruments();

renderBattleInstrumentSelect();

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

renderInstrumentUpgradePanel(
  profile.equipped
);

renderSkillTree();

setupRpg();


/* =========================================================
   DAILY REWARD BUTTON
========================================================= */

const claimDailyBtn =
  $('#claimDailyBtn');


if (claimDailyBtn) {
  claimDailyBtn.onclick =
    claimDailyReward;
}


/* =========================================================
   MUSICVERSE READY
========================================================= */

console.log(
  '🎵 MusicVerse loaded successfully!'
);
