/* ============================
   CORE HELPERS
============================ */

const $ = s =>
  document.querySelector(s);

const $$ = s =>
  [
    ...document.querySelectorAll(s)
  ];

const rand = (a, b) =>
  Math.floor(
    Math.random() *
    (
      b - a + 1
    )
  ) + a;

const pick = a =>
  a[
    Math.floor(
      Math.random() *
      a.length
    )
  ];

const clamp = (n, a, b) =>
  Math.max(
    a,
    Math.min(
      b,
      n
    )
  );

const wait = ms =>
  new Promise(
    r =>
      setTimeout(
        r,
        ms
      )
  );


/* ============================
   SAVE / LOAD
============================ */

function save(
  k,
  v
) {

  localStorage.setItem(
    k,
    JSON.stringify(
      v
    )
  );
}


function load(
  k,
  f
) {

  try {

    const v =
      localStorage.getItem(
        k
      );


    return v
      ? JSON.parse(
          v
        )
      : f;

  }

  catch {

    return f;
  }
}


/* ============================
   SOUND ENGINE
============================ */

const SoundEngine = {

  context: null,

  master: null,

  sfxVolume: .6,

  enabled: true,


  init() {

    if (
      this.context
    ) {

      return;
    }


    const A =
      window.AudioContext ||
      window.webkitAudioContext;


    if (
      !A
    ) {

      return;
    }


    this.context =
      new A();


    this.master =
      this.context
      .createGain();


    this.master.gain.value =
      .7;


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
    d = .15,
    t = 'sine',
    v = .18,
    delay = 0
  ) {

    if (
      !this.enabled
    ) {

      return;
    }


    this.resume();


    if (
      !this.context
    ) {

      return;
    }


    const now =
      this.context.currentTime +
      delay;


    const o =
      this.context
      .createOscillator();


    const g =
      this.context
      .createGain();


    o.type =
      t;


    o.frequency.setValueAtTime(
      f,
      now
    );


    g.gain.setValueAtTime(
      .0001,
      now
    );


    g.gain.exponentialRampToValueAtTime(

      Math.max(
        .001,
        v *
        this.sfxVolume
      ),

      now +
      .015
    );


    g.gain.exponentialRampToValueAtTime(

      .0001,

      now +
      d
    );


    o.connect(
      g
    );


    g.connect(
      this.master
    );


    o.start(
      now
    );


    o.stop(
      now +
      d +
      .04
    );
  },


  chord(
    notes,
    d = .3,
    t = 'sine',
    v = .12
  ) {

    notes.forEach(
      (
        n,
        i
      ) =>
        this.tone(

          n,

          d,

          t,

          v,

          i *
          .025
        )
    );
  },


  noise(
    d = .15,
    v = .12
  ) {

    if (
      !this.enabled
    ) {

      return;
    }


    this.resume();


    const c =
      this.context;


    if (
      !c
    ) {

      return;
    }


    const b =
      c.createBuffer(

        1,

        c.sampleRate *
        d,

        c.sampleRate
      );


    const data =
      b.getChannelData(
        0
      );


    for (
      let i = 0;
      i <
      data.length;
      i++
    ) {

      data[i] =
        Math.random() *
        2 -
        1;
    }


    const s =
      c.createBufferSource();


    const g =
      c.createGain();


    s.buffer =
      b;


    g.gain.setValueAtTime(

      v *
      this.sfxVolume,

      c.currentTime
    );


    g.gain.exponentialRampToValueAtTime(

      .0001,

      c.currentTime +
      d
    );


    s.connect(
      g
    );


    g.connect(
      this.master
    );


    s.start();
  }
};


/* ============================
   SOUND EFFECTS
============================ */

const S = {

  click() {

    SoundEngine.tone(
      620,
      .07,
      'sine',
      .12
    );
  },


  coin() {

    SoundEngine.tone(
      880,
      .08,
      'square',
      .11
    );


    SoundEngine.tone(
      1320,
      .12,
      'square',
      .08,
      .07
    );
  },


  xp() {

    SoundEngine.tone(
      523,
      .09,
      'sine',
      .08
    );


    SoundEngine.tone(
      659,
      .1,
      'sine',
      .08,
      .06
    );


    SoundEngine.tone(
      784,
      .14,
      'sine',
      .09,
      .12
    );
  },


  level() {

    SoundEngine.chord(

      [
        523,
        659,
        784
      ],

      .3,

      'triangle',

      .12
    );


    SoundEngine.tone(

      1046,

      .5,

      'sine',

      .14,

      .24
    );
  },


  attack() {

    SoundEngine.tone(

      180,

      .12,

      'sawtooth',

      .13
    );


    SoundEngine.tone(

      260,

      .15,

      'square',

      .06,

      .04
    );
  },


  critical() {

    SoundEngine.tone(
      880,
      .1,
      'square',
      .14
    );


    SoundEngine.tone(
      1174,
      .16,
      'square',
      .12,
      .06
    );


    SoundEngine.tone(
      1568,
      .25,
      'sine',
      .12,
      .12
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
      (
        n,
        i
      ) =>
        SoundEngine.tone(

          n,

          .32,

          'sawtooth',

          .1,

          i *
          .08
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

      .4,

      'sine',

      .08
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
      (
        n,
        i
      ) =>
        SoundEngine.tone(

          n,

          .2,

          'sine',

          .08,

          i *
          .07
        )
    );
  },


  perfect() {

    SoundEngine.tone(
      1046,
      .11,
      'sine',
      .14
    );


    SoundEngine.tone(
      1568,
      .14,
      'sine',
      .09,
      .05
    );
  },


  great() {

    SoundEngine.tone(
      880,
      .1,
      'triangle',
      .1
    );
  },


  good() {

    SoundEngine.tone(
      660,
      .09,
      'triangle',
      .07
    );
  },


  miss() {

    SoundEngine.tone(
      150,
      .16,
      'sawtooth',
      .07
    );
  },


  correct() {

    SoundEngine.tone(
      660,
      .1,
      'sine',
      .11
    );


    SoundEngine.tone(
      990,
      .16,
      'sine',
      .1,
      .08
    );
  },


  wrong() {

    SoundEngine.tone(
      220,
      .18,
      'square',
      .07
    );


    SoundEngine.tone(
      165,
      .22,
      'square',
      .06,
      .09
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
      (
        n,
        i
      ) =>
        SoundEngine.tone(

          n,

          .35,

          'triangle',

          .11,

          i *
          .13
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
      (
        n,
        i
      ) =>
        SoundEngine.tone(

          n,

          .3,

          'triangle',

          .07,

          i *
          .14
        )
    );
  },


  jump() {

    SoundEngine.tone(
      280,
      .1,
      'square',
      .06
    );


    SoundEngine.tone(
      560,
      .1,
      'square',
      .04,
      .06
    );
  },


  mine() {

    SoundEngine.noise(
      .07,
      .09
    );


    SoundEngine.tone(
      110,
      .07,
      'square',
      .05
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
      (
        n,
        i
      ) =>
        SoundEngine.tone(

          n,

          .2,

          'sine',

          .09,

          i *
          .07
        )
    );
  },


  gacha() {

    for (
      let i = 0;
      i <
      7;
      i++
    ) {

      SoundEngine.tone(

        300 +
        i *
        100,

        .16,

        'triangle',

        .07,

        i *
        .08
      );
    }
  }
};


/* ============================
   CROWD SOUND
============================ */

function crowd(
  strength = .5
) {

  for (
    let i = 0;

    i <
    6 +
    strength *
    8;

    i++
  ) {

    setTimeout(

      () =>
        SoundEngine.noise(

          rand(
            15,
            35
          ) /
          100,

          .015 +
          Math.random() *
          .02
        ),

      Math.random() *
      500
    );
  }
}


/* ============================
   ENABLE AUDIO AFTER CLICK
============================ */

document.addEventListener(

  'pointerdown',

  () =>
    SoundEngine.resume(),

  {
    once: true
  }
);


/* ============================
   SOUND TOGGLE
============================ */

$('#soundToggle')
.onclick =
  () => {

    SoundEngine.enabled =
      !SoundEngine.enabled;


    $('#soundToggle')
    .textContent =

      SoundEngine.enabled
        ? '🔊'
        : '🔇';


    if (
      SoundEngine.enabled
    ) {

      S.click();
    }
  };


/* ============================
   INSTRUMENT DATA
============================ */

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
  (
    x,
    i
  ) => ({

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
        : 220 +
          i *
          95
  })
);


/* ============================
   GET INSTRUMENT
============================ */

const getInstrument =
  n =>
    instruments.find(
      i =>
        i.name === n
    ) ||
    instruments[0];
/* ============================
   FALLBACK MOVE SETS
============================ */

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
      .9
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
      .9
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
      .95
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
      .9
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
      .92
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
      .92
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
      .95
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
      .98
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
      .95
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
      .95
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
      .98
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


/* ============================
   INDIVIDUAL INSTRUMENT MOVES
============================ */

const instrumentMoves = {


  Guitar: [

    [
      'Power Strum',
      'attack',
      1
    ],

    [
      'Rapid Riff',
      'rhythm',
      .9
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


  Ukulele: [

    [
      'Island Strum',
      'attack',
      1
    ],

    [
      'Sunny Rhythm',
      'rhythm',
      .92
    ],

    [
      'Tropical Harmony',
      'heal',
      0
    ],

    [
      'Paradise Finale',
      'ultimate',
      1.8
    ]
  ],


  Piano: [

    [
      'Power Chord',
      'attack',
      1
    ],

    [
      'Rapid Keys',
      'rhythm',
      .9
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


  Flute: [

    [
      'Focused Note',
      'attack',
      1
    ],

    [
      'Flutter Scale',
      'rhythm',
      .92
    ],

    [
      'Breath of Harmony',
      'heal',
      0
    ],

    [
      'Cyclone Symphony',
      'ultimate',
      1.8
    ]
  ],


  Drums: [

    [
      'Power Beat',
      'attack',
      1
    ],

    [
      'Drum Roll',
      'rhythm',
      .95
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


  Clarinet: [

    [
      'Midnight Tone',
      'attack',
      1
    ],

    [
      'Silver Scale',
      'rhythm',
      .92
    ],

    [
      'Warm Breath',
      'heal',
      0
    ],

    [
      'Moonlight Rhapsody',
      'ultimate',
      1.82
    ]
  ],


  Trumpet: [

    [
      'Brass Blast',
      'attack',
      1
    ],

    [
      'Victory Fanfare',
      'rhythm',
      .92
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


  Violin: [

    [
      'Piercing Bow',
      'attack',
      1
    ],

    [
      'Rapid Arpeggio',
      'rhythm',
      .94
    ],

    [
      'Healing Strings',
      'heal',
      0
    ],

    [
      'Phoenix Symphony',
      'ultimate',
      1.85
    ]
  ],


  Saxophone: [

    [
      'Jazz Burst',
      'attack',
      1
    ],

    [
      'Groove Run',
      'rhythm',
      .95
    ],

    [
      'Soul Melody',
      'heal',
      0
    ],

    [
      'Midnight Jazz Storm',
      'ultimate',
      1.85
    ]
  ],


  Cello: [

    [
      'Deep Bow',
      'attack',
      1
    ],

    [
      'Resonant Pulse',
      'rhythm',
      .9
    ],

    [
      'Cello Sanctuary',
      'shield',
      0
    ],

    [
      'Titan Concerto',
      'ultimate',
      1.82
    ]
  ],


  Xylophone: [

    [
      'Bright Strike',
      'attack',
      1
    ],

    [
      'Rainbow Scale',
      'rhythm',
      .96
    ],

    [
      'Resonance Guard',
      'shield',
      0
    ],

    [
      'Crystal Cascade',
      'ultimate',
      1.82
    ]
  ],


  Trombone: [

    [
      'Slide Blast',
      'attack',
      1
    ],

    [
      'Brass Glide',
      'rhythm',
      .9
    ],

    [
      'Fortress Tone',
      'shield',
      0
    ],

    [
      'Titan Slide',
      'ultimate',
      1.85
    ]
  ],


  Synthesizer: [

    [
      'Synth Pulse',
      'attack',
      1
    ],

    [
      'Neon Sequence',
      'rhythm',
      .96
    ],

    [
      'Digital Barrier',
      'shield',
      0
    ],

    [
      'Cyber Drop',
      'ultimate',
      1.9
    ]
  ],


  'French Horn': [

    [
      'Royal Call',
      'attack',
      1
    ],

    [
      'Noble Fanfare',
      'rhythm',
      .9
    ],

    [
      'Castle Guard',
      'shield',
      0
    ],

    [
      'Kingdom Anthem',
      'ultimate',
      1.85
    ]
  ],


  Oboe: [

    [
      'Piercing Reed',
      'attack',
      1
    ],

    [
      'Graceful Scale',
      'rhythm',
      .92
    ],

    [
      'Serene Breath',
      'heal',
      0
    ],

    [
      'Forest Elegy',
      'ultimate',
      1.82
    ]
  ],


  'Digital Piano': [

    [
      'Digital Chord',
      'attack',
      1
    ],

    [
      'Velocity Keys',
      'rhythm',
      .95
    ],

    [
      'Sustain Matrix',
      'shield',
      0
    ],

    [
      'Digital Crescendo',
      'ultimate',
      1.85
    ]
  ],


  Organ: [

    [
      'Cathedral Chord',
      'attack',
      1
    ],

    [
      'Pipe Resonance',
      'rhythm',
      .88
    ],

    [
      'Sanctuary',
      'heal',
      0
    ],

    [
      'Divine Symphony',
      'ultimate',
      1.9
    ]
  ],


  'Drum Machine': [

    [
      'Beat Drop',
      'attack',
      1
    ],

    [
      'Pad Rush',
      'rhythm',
      .98
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


  'Electric Guitar': [

    [
      'Voltage Slash',
      'attack',
      1.05
    ],

    [
      'Lightning Riff',
      'rhythm',
      .98
    ],

    [
      'Amp Shield',
      'shield',
      0
    ],

    [
      'Thunderstorm Solo',
      'ultimate',
      1.95
    ]
  ],


  'Bass Guitar': [

    [
      'Bass Slam',
      'attack',
      1
    ],

    [
      'Groove Line',
      'rhythm',
      .98
    ],

    [
      'Low-End Guard',
      'shield',
      0
    ],

    [
      'Earthquake Bass',
      'ultimate',
      1.88
    ]
  ],


  Harp: [

    [
      'Crystal Pluck',
      'attack',
      1
    ],

    [
      'Angel Strings',
      'rhythm',
      .92
    ],

    [
      'Celestial Healing',
      'heal',
      0
    ],

    [
      'Heavenly Cascade',
      'ultimate',
      1.85
    ]
  ],


  Banjo: [

    [
      'Country Snap',
      'attack',
      1
    ],

    [
      'Bluegrass Rush',
      'rhythm',
      .98
    ],

    [
      'Porch Harmony',
      'heal',
      0
    ],

    [
      'Wild West Finale',
      'ultimate',
      1.82
    ]
  ],


  Mandolin: [

    [
      'Twin Pluck',
      'attack',
      1
    ],

    [
      'Tremolo Rush',
      'rhythm',
      .98
    ],

    [
      'Folk Harmony',
      'heal',
      0
    ],

    [
      'Festival Storm',
      'ultimate',
      1.85
    ]
  ],


  'Double Bass': [

    [
      'Deep Resonance',
      'attack',
      1
    ],

    [
      'Bass Bow Rush',
      'rhythm',
      .88
    ],

    [
      'Low Frequency Guard',
      'shield',
      0
    ],

    [
      'Colossal Symphony',
      'ultimate',
      1.88
    ]
  ],


  Accordion: [

    [
      'Squeeze Beat',
      'attack',
      1
    ],

    [
      'Polka Rush',
      'rhythm',
      .95
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


  Keytar: [

    [
      'Keytar Blast',
      'attack',
      1
    ],

    [
      'Stage Rush',
      'rhythm',
      .98
    ],

    [
      'Synth Guard',
      'shield',
      0
    ],

    [
      'Rockstar Overdrive',
      'ultimate',
      1.9
    ]
  ],


  Harpsichord: [

    [
      'Baroque Strike',
      'attack',
      1
    ],

    [
      'Royal Scale',
      'rhythm',
      .94
    ],

    [
      'Courtly Guard',
      'shield',
      0
    ],

    [
      'Golden Fugue',
      'ultimate',
      1.85
    ]
  ],


  Marimba: [

    [
      'Mallet Strike',
      'attack',
      1
    ],

    [
      'Marimba Run',
      'rhythm',
      .98
    ],

    [
      'Wooden Resonance',
      'heal',
      0
    ],

    [
      'Tropical Cascade',
      'ultimate',
      1.85
    ]
  ],


  Timpani: [

    [
      'War Drum',
      'attack',
      1
    ],

    [
      'Rolling Thunder',
      'rhythm',
      .9
    ],

    [
      'Battle Guard',
      'shield',
      0
    ],

    [
      'Titan Thunder',
      'ultimate',
      1.9
    ]
  ],


  Bongos: [

    [
      'Bongo Strike',
      'attack',
      1
    ],

    [
      'Jungle Rhythm',
      'rhythm',
      1
    ],

    [
      'Tribal Guard',
      'shield',
      0
    ],

    [
      'Jungle Frenzy',
      'ultimate',
      1.82
    ]
  ],


  Congas: [

    [
      'Conga Slam',
      'attack',
      1
    ],

    [
      'Latin Rush',
      'rhythm',
      .98
    ],

    [
      'Rhythm Spirit',
      'heal',
      0
    ],

    [
      'Carnival Inferno',
      'ultimate',
      1.85
    ]
  ],


  Tambourine: [

    [
      'Rhythm Shake',
      'attack',
      1
    ],

    [
      'Jingle Rush',
      'rhythm',
      1
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
  ],


  'Steel Pan': [

    [
      'Island Strike',
      'attack',
      1
    ],

    [
      'Calypso Rush',
      'rhythm',
      .96
    ],

    [
      'Tropical Resonance',
      'heal',
      0
    ],

    [
      'Caribbean Sunrise',
      'ultimate',
      1.85
    ]
  ],


  Tuba: [

    [
      'Heavy Brass',
      'attack',
      1.05
    ],

    [
      'Low Brass Pulse',
      'rhythm',
      .82
    ],

    [
      'Iron Lung Guard',
      'shield',
      0
    ],

    [
      'Colossal Fanfare',
      'ultimate',
      1.9
    ]
  ],


  Euphonium: [

    [
      'Warm Brass',
      'attack',
      1
    ],

    [
      'Smooth Fanfare',
      'rhythm',
      .9
    ],

    [
      'Golden Guard',
      'shield',
      0
    ],

    [
      'Majestic Anthem',
      'ultimate',
      1.85
    ]
  ],


  Cornet: [

    [
      'Sharp Fanfare',
      'attack',
      1
    ],

    [
      'Cornet Rush',
      'rhythm',
      .94
    ],

    [
      'Brass Guard',
      'shield',
      0
    ],

    [
      'Royal Trumpet Storm',
      'ultimate',
      1.85
    ]
  ],


  Piccolo: [

    [
      'High Note',
      'attack',
      1
    ],

    [
      'Sky Scale',
      'rhythm',
      1
    ],

    [
      'Wind Blessing',
      'heal',
      0
    ],

    [
      'Sonic Whirlwind',
      'ultimate',
      1.82
    ]
  ],


  Bassoon: [

    [
      'Deep Reed',
      'attack',
      1
    ],

    [
      'Woodwind Pulse',
      'rhythm',
      .86
    ],

    [
      'Forest Guard',
      'shield',
      0
    ],

    [
      'Ancient Woodland Song',
      'ultimate',
      1.85
    ]
  ],


  Recorder: [

    [
      'Clear Note',
      'attack',
      1
    ],

    [
      'Quick Fingering',
      'rhythm',
      .96
    ],

    [
      'Gentle Breath',
      'heal',
      0
    ],

    [
      'Schoolyard Symphony',
      'ultimate',
      1.8
    ]
  ],


  Erhu: [

    [
      'Silk Bow',
      'attack',
      1
    ],

    [
      'Dragon Bow Rush',
      'rhythm',
      .96
    ],

    [
      'Spirit Strings',
      'heal',
      0
    ],

    [
      'Celestial Dragon Song',
      'ultimate',
      1.88
    ]
  ],


  Guzheng: [

    [
      'Silk Pluck',
      'attack',
      1
    ],

    [
      'River Cascade',
      'rhythm',
      .98
    ],

    [
      'Mountain Harmony',
      'heal',
      0
    ],

    [
      'Ten Thousand Strings',
      'ultimate',
      1.9
    ]
  ],


  Pipa: [

    [
      'Moon Pluck',
      'attack',
      1
    ],

    [
      'Flying Fingers',
      'rhythm',
      1
    ],

    [
      'Jade Harmony',
      'shield',
      0
    ],

    [
      'Ambush Symphony',
      'ultimate',
      1.9
    ]
  ],


  Kalimba: [

    [
      'Crystal Thumb',
      'attack',
      1
    ],

    [
      'Dream Rhythm',
      'rhythm',
      .96
    ],

    [
      'Peaceful Resonance',
      'heal',
      0
    ],

    [
      'Starlight Lullaby',
      'ultimate',
      1.82
    ]
  ],


  Sitar: [

    [
      'Raga Strike',
      'attack',
      1
    ],

    [
      'Mystic Scale',
      'rhythm',
      .94
    ],

    [
      'Meditation Aura',
      'heal',
      0
    ],

    [
      'Cosmic Raga',
      'ultimate',
      1.88
    ]
  ],


  Shamisen: [

    [
      'Samurai Pluck',
      'attack',
      1.05
    ],

    [
      'Rapid Tsugaru',
      'rhythm',
      1
    ],

    [
      'Spirit Guard',
      'shield',
      0
    ],

    [
      'Shogun Finale',
      'ultimate',
      1.9
    ]
  ]
};


/* ============================
   GET INDIVIDUAL MOVE SET
============================ */

function getInstrumentMoves(
  name
) {

  const inst =
    getInstrument(
      name
    );


  return (
    instrumentMoves[
      inst.name
    ] ||

    moveSets[
      inst.play
    ] ||

    moveSets.strum
  );
}


/* ============================
   INSTRUMENT SOUND TYPES
============================ */

const instrumentSoundTypes = {

  strum: {
    wave: 'triangle',
    octave: 1
  },

  keys: {
    wave: 'sine',
    octave: 1
  },

  drums: {
    wave: 'square',
    octave: .5
  },

  wind: {
    wave: 'sine',
    octave: 2
  },

  brass: {
    wave: 'sawtooth',
    octave: 1
  },

  bow: {
    wave: 'triangle',
    octave: 1
  },

  mallet: {
    wave: 'sine',
    octave: 2
  },

  pads: {
    wave: 'square',
    octave: .5
  },

  pluck: {
    wave: 'triangle',
    octave: 2
  },

  bellows: {
    wave: 'sawtooth',
    octave: 1
  },

  shake: {
    wave: 'square',
    octave: 2
  }
};


/* ============================
   PLAY INSTRUMENT
============================ */

function playInstrument(
  name,
  note = 440
) {

  const inst =
    getInstrument(
      name
    );


  const sound =
    instrumentSoundTypes[
      inst.play
    ] ||
    instrumentSoundTypes.strum;


  const f =
    note *
    sound.octave;


  switch (
    inst.play
  ) {


    case 'drums':

      SoundEngine.noise(
        .08,
        .11
      );


      SoundEngine.tone(
        90,
        .1,
        'square',
        .08
      );

      break;


    case 'pads':

      SoundEngine.tone(
        f,
        .11,
        'square',
        .07
      );


      SoundEngine.tone(
        f *
        1.5,
        .1,
        'sine',
        .05,
        .02
      );

      break;


    case 'shake':

      SoundEngine.noise(
        .1,
        .08
      );


      SoundEngine.tone(
        f *
        2,
        .05,
        'triangle',
        .04
      );

      break;


    case 'strum':

      SoundEngine.tone(
        f,
        .2,
        sound.wave,
        .09
      );


      SoundEngine.tone(
        f *
        1.5,
        .18,
        sound.wave,
        .05,
        .02
      );

      break;


    case 'pluck':

      SoundEngine.tone(
        f,
        .17,
        sound.wave,
        .09
      );


      SoundEngine.tone(
        f *
        2,
        .09,
        'sine',
        .04,
        .02
      );

      break;


    case 'keys':

      SoundEngine.tone(
        f,
        .26,
        sound.wave,
        .08
      );


      SoundEngine.tone(
        f *
        1.25,
        .23,
        'triangle',
        .04,
        .02
      );

      break;


    case 'wind':

      SoundEngine.tone(
        f,
        .3,
        'sine',
        .08
      );


      SoundEngine.tone(
        f *
        2,
        .18,
        'sine',
        .025
      );

      break;


    case 'brass':

      SoundEngine.tone(
        f,
        .24,
        'sawtooth',
        .07
      );


      SoundEngine.tone(
        f *
        .5,
        .22,
        'triangle',
        .03
      );

      break;


    case 'bow':

      SoundEngine.tone(
        f,
        .32,
        'triangle',
        .07
      );


      SoundEngine.tone(
        f *
        2,
        .24,
        'sine',
        .025
      );

      break;


    case 'mallet':

      SoundEngine.tone(
        f,
        .13,
        'sine',
        .1
      );


      SoundEngine.tone(
        f *
        2,
        .1,
        'sine',
        .05,
        .01
      );

      break;


    case 'bellows':

      SoundEngine.tone(
        f,
        .28,
        'sawtooth',
        .06
      );


      SoundEngine.tone(
        f *
        1.5,
        .25,
        'triangle',
        .04
      );

      break;


    default:

      SoundEngine.tone(
        f,
        .2,
        sound.wave,
        .08
      );
  }
}
/* ============================
   DEFAULT PROFILE
============================ */

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


/* ============================
   LOAD PROFILE
============================ */

let profile = {

  ...defaultProfile,

  ...load(
    'musicverseProfile',
    {}
  )
};


/* ============================
   PROFILE HYDRATION
============================ */

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
        'Guitar'
      ];


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


/* ============================
   SAVE PROFILE
============================ */

function persist() {

  save(
    'musicverseProfile',
    profile
  );
}


/* ============================
   TOAST MESSAGE
============================ */

function toast(
  t
) {

  const el =
    $('#toast');


  el.textContent =
    t;


  el.classList.add(
    'show'
  );


  clearTimeout(
    toast.t
  );


  toast.t =
    setTimeout(

      () =>
        el.classList.remove(
          'show'
        ),

      2200
    );
}


/* ============================
   PLAYER EXP
============================ */

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


function addXP(
  amount
) {

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
    'function'
  ) {

    renderSkillTree();
  }


  if (
    levels
  ) {

    S.level();


    toast(
      `🎉 Level ${profile.level}! +20 Coins`
    );
  }

  else if (
    amount
  ) {

    S.xp();
  }


  return amount;
}


/* ============================
   INSTRUMENT MASTERY
============================ */

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


/* ============================
   INSTRUMENT UPGRADE DATA
============================ */

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

      level: 1,

      xp: 0
    };
  }


  return profile.instrumentUpgrades[
    name
  ];
}


/* ============================
   INSTRUMENT XP REQUIREMENT
============================ */

function getInstrumentXPNeeded(
  name
) {

  const d =
    getInstrumentUpgradeData(
      name
    );


  return Math.round(

    120 +

    (
      d.level -
      1
    ) *
    90
  );
}


/* ============================
   ADD INSTRUMENT EXP
============================ */

function addInstrumentXP(
  name,
  amount
) {

  const d =
    getInstrumentUpgradeData(
      name
    );


  if (
    d.level >=
    20
  ) {

    return;
  }


  d.xp +=
    Math.max(

      0,

      Math.round(
        amount
      )
    );


  persist();


  if (
    d.xp >=
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


/* ============================
   UPGRADE INSTRUMENT
============================ */

function upgradeInstrument(
  name
) {

  const d =
    getInstrumentUpgradeData(
      name
    );


  const need =
    getInstrumentXPNeeded(
      name
    );


  if (
    d.level >=
    20
  ) {

    return toast(
      `${name} is already max level!`
    );
  }


  if (
    d.xp <
    need
  ) {

    return toast(
      `Need ${need - d.xp} more Instrument EXP.`
    );
  }


  d.xp -=
    need;


  d.level++;


  persist();


  S.level();


  toast(
    `🎉 ${name} upgraded to Level ${d.level}!`
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


/* ============================
   EVOLUTION BONUS
============================ */

function getEvolutionBonus(
  name
) {

  const evo =
    profile.instrumentEvolutions[
      name
    ];


  return evo
    ? 1.1
    : 1;
}


/* ============================
   EQUIPMENT BONUSES
============================ */

function getGearBonuses() {

  return Object.values(
    profile.equippedGear ||
    {}
  )
  .reduce(

    (
      a,
      g
    ) => {

      if (
        g
      ) {

        a.attack +=
          g.attack ||
          0;


        a.defense +=
          g.defense ||
          0;


        a.melody +=
          g.melody ||
          0;


        a.rhythm +=
          g.rhythm ||
          0;
      }


      return a;
    },

    {

      attack: 0,

      defense: 0,

      melody: 0,

      rhythm: 0
    }
  );
}


/* ============================
   PET BONUS
============================ */

function getPetBonus() {

  const p =
    profile.pets.find(
      x =>
        x.id ===
        profile.equippedPet
    );


  if (
    !p
  ) {

    return {

      attack: 0,

      defense: 0,

      melody: 0,

      rhythm: 0
    };
  }


  const level =
    p.level ||
    1;


  const base =
    Math.max(

      1,

      Math.floor(
        level /
        2
      )
    );


  return p.type ===
    'attack'

    ? {

        attack: base,

        defense: 0,

        melody: 0,

        rhythm: 0
      }

    : p.type ===
      'melody'

      ? {

          attack: 0,

          defense: 0,

          melody: base,

          rhythm: 0
        }

      : p.type ===
        'defense'

        ? {

            attack: 0,

            defense: base,

            melody: 0,

            rhythm: 0
          }

        : {

            attack: base,

            defense: base,

            melody: base,

            rhythm: base
          };
}


/* ============================
   FINAL INSTRUMENT STATS
============================ */

function getUpgradedInstrument(
  name
) {

  const base =
    getInstrument(
      name
    );


  const u =
    getInstrumentUpgradeData(
      name
    );


  const mult =

    (
      1 +

      (
        u.level -
        1
      ) *
      .01
    ) *

    getEvolutionBonus(
      name
    );


  const g =
    getGearBonuses();


  const p =
    getPetBonus();


  return {

    ...base,


    attack:
      Math.round(

        base.attack *
        mult +

        g.attack +

        p.attack
      ),


    defense:
      Math.round(

        base.defense *
        mult +

        g.defense +

        p.defense
      ),


    melody:
      Math.round(

        base.melody *
        mult +

        g.melody +

        p.melody
      ),


    rhythm:
      Math.round(

        base.rhythm *
        mult +

        g.rhythm +

        p.rhythm
      )
  };
}


/* ============================
   PET EXP
============================ */

function addPetXP(
  id,
  amount
) {

  const p =
    profile.pets.find(
      x =>
        x.id ===
        id
    );


  if (
    !p
  ) {

    return;
  }


  const petBonus =

    typeof getSkillBonuses ===
    'function'

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


  p.xp =
    (
      p.xp ||
      0
    ) +

    Math.max(

      0,

      Math.round(
        amount
      )
    );


  let need =

    (
      p.level ||
      1
    ) *
    40;


  while (

    p.xp >=
      need &&

    p.level <
      20
  ) {

    p.xp -=
      need;


    p.level++;


    need =
      p.level *
      40;


    toast(
      `🐾 ${p.name} reached Level ${p.level}!`
    );
  }


  persist();


  renderPets();
}


/* ============================
   REWARD HELPER
============================ */

function reward(
  xp,
  coins = 0,
  msg = 'Reward earned!'
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

    `${msg} +${xp} EXP${
      coins
        ? ` • +${coins} Coins`
        : ''
    }`
  );
}


/* ============================
   UPDATE PROFILE UI
============================ */

function updateProfileUI() {

  [
    'coinTop',
    'heroCoins',
    'gachaCoins'
  ]
  .forEach(
    id => {

      if (
        $('#' + id)
      ) {

        $('#' + id)
        .textContent =
          profile.coins
          .toLocaleString();
      }
    }
  );


  $('#levelTop')
  .textContent =
    profile.level;


  $('#heroName')
  .textContent =
    profile.name ||
    'Player';


  $('#heroLevel')
  .textContent =
    profile.level;


  $('#heroDust')
  .textContent =
    profile.dust;


  $('#gachaDust')
  .textContent =
    profile.dust;


  $('#heroLifetime')
  .textContent =
    profile.totalXp
    .toLocaleString();


  const needed =
    getPlayerXPNeeded();


  $('#xpText')
  .textContent =
    `${profile.xp} / ${needed}`;


  $('#xpFill')
  .style.width =

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

    '--avatar-skin',

    profile.avatar.skin
  );


  document.documentElement
  .style
  .setProperty(

    '--avatar-outfit',

    profile.avatar.outfit
  );
}


/* ============================
   SETUP
============================ */

function setupProfile() {

  const presets = [

    'Hero',

    'Swift',

    'Power',

    'Star',

    'Neo',

    'Legend'
  ];


  const skins = [

    [
      'Light',
      '#f2c8a8'
    ],

    [
      'Warm',
      '#dca57b'
    ],

    [
      'Tan',
      '#bd8058'
    ],

    [
      'Deep',
      '#8d5d42'
    ],

    [
      'Dark',
      '#5d3a2c'
    ]
  ];


  const hairs = [

    [
      'Black',
      '#151515'
    ],

    [
      'Dark Brown',
      '#201915'
    ],

    [
      'Brown',
      '#4c2e20'
    ],

    [
      'Blonde',
      '#c49a5a'
    ],

    [
      'Silver',
      '#aeb6c0'
    ]
  ];


  const outfits = [

    [
      'Royal Navy',
      '#19345b'
    ],

    [
      'Crimson',
      '#6c2636'
    ],

    [
      'Emerald',
      '#1f5a48'
    ],

    [
      'Purple',
      '#52376f'
    ],

    [
      'Midnight',
      '#111827'
    ]
  ];


/* ============================
   SETUP SELECT OPTIONS
============================ */

  $('#avatarPresetSelect')
  .innerHTML =

    presets
    .map(
      x =>
        `<option>${x}</option>`
    )
    .join('');


  $('#skinSelect')
  .innerHTML =

    skins
    .map(
      x =>
        `<option value="${x[1]}">${x[0]}</option>`
    )
    .join('');


  $('#hairSelect')
  .innerHTML =

    hairs
    .map(
      x =>
        `<option value="${x[1]}">${x[0]}</option>`
    )
    .join('');


  $('#outfitSelect')
  .innerHTML =

    outfits
    .map(
      x =>
        `<option value="${x[1]}">${x[0]}</option>`
    )
    .join('');


/* ============================
   LOAD CURRENT AVATAR VALUES
============================ */

  $('#avatarPresetSelect')
  .value =
    profile.avatar.preset;


  $('#skinSelect')
  .value =
    profile.avatar.skin;


  $('#hairSelect')
  .value =
    profile.avatar.hair;


  $('#outfitSelect')
  .value =
    profile.avatar.outfit;


/* ============================
   AVATAR PREVIEW
============================ */

  const prev =
    () => {

      $('#previewHead')
      .style.background =
        $('#skinSelect')
        .value;


      $('#previewHair')
      .style.background =
        $('#hairSelect')
        .value;


      $('#previewBody')
      .style.background =
        $('#outfitSelect')
        .value;


      $$(
        '.preview-arm,.preview-leg'
      )
      .forEach(
        x =>
          x.style.background =
            $('#outfitSelect')
            .value
      );
    };


  [
    'avatarPresetSelect',
    'skinSelect',
    'hairSelect',
    'outfitSelect'
  ]
  .forEach(
    id =>

      $('#' + id)
      .onchange =
        prev
  );


  prev();


/* ============================
   FIRST-TIME SETUP
============================ */

  if (
    !profile.name
  ) {

    $('#setupOverlay')
    .classList
    .remove(
      'hidden'
    );
  }


/* ============================
   START GAME BUTTON
============================ */

  $('#startBtn')
  .onclick =
    () => {

      const n =
        $('#playerNameInput')
        .value
        .trim();


      if (
        !n
      ) {

        $('#setupError')
        .textContent =
          'Please enter a stage name.';


        return;
      }


      profile.name =
        n;


      profile.avatar = {

        preset:
          $('#avatarPresetSelect')
          .value,

        skin:
          $('#skinSelect')
          .value,

        hair:
          $('#hairSelect')
          .value,

        outfit:
          $('#outfitSelect')
          .value
      };


      persist();


      $('#setupOverlay')
      .classList
      .add(
        'hidden'
      );


      updateProfileUI();


      refreshBattle(
        true
      );


      S.victory();
    };


/* ============================
   ENTER KEY TO START
============================ */

  $('#playerNameInput')
  .addEventListener(

    'keydown',

    e => {/* ============================
   INSTRUMENTS
============================ */

let activeFamily =
  'All';


/* ============================
   INSTRUMENT FAMILY FILTERS
============================ */

function renderFamilies() {

  const fam = [

    'All',

    ...new Set(
      instruments.map(
        i =>
          i.family
      )
    )
  ];


  $('#familyTabs')
  .innerHTML =
    fam
    .map(
      f => `

        <button
          class="${
            f ===
            activeFamily
              ? 'active'
              : ''
          }"
          data-family="${f}"
        >
          ${f}
        </button>
      `
    )
    .join('');


  $$(
    '[data-family]'
  )
  .forEach(
    b =>
      b.onclick =
        () => {

          activeFamily =
            b.dataset.family;


          renderFamilies();

          renderInstruments();
        }
  );
}


/* ============================
   RENDER INSTRUMENT COLLECTION
============================ */

function renderInstruments() {

  const q =
    $('#instrumentSearch')
    .value
    .toLowerCase();


  const list =
    instruments.filter(
      i =>
        (
          activeFamily ===
          'All' ||
          i.family ===
          activeFamily
        ) &&
        i.name
        .toLowerCase()
        .includes(
          q
        )
    );


  $('#instrumentGrid')
  .innerHTML =
    list
    .map(
      i => {

        const owned =
          profile.owned.includes(
            i.name
          );


        const eq =
          profile.equipped ===
          i.name;


        const u =
          getInstrumentUpgradeData(
            i.name
          );


        const need =
          getInstrumentXPNeeded(
            i.name
          );


        const up =
          getUpgradedInstrument(
            i.name
          );


        const evo =
          profile.instrumentEvolutions[
            i.name
          ];


        return `

          <article
            class="
              instrument-card
              ${
                eq
                  ? 'equipped'
                  : ''
              }
            "
          >

            <div class="instrument-icon">
              ${i.icon}
            </div>


            <h3>
              ${
                evo
                  ? evo.name
                  : i.name
              }
            </h3>


            <p>

              ${i.family}

              • Mastery
              ${
                profile.mastery[
                  i.name
                ] ||
                0
              }

              ${
                evo
                  ? ' • EVOLVED'
                  : ''
              }

            </p>


            ${
              owned

                ? `

                  <div class="instrument-level-row">

                    <strong>
                      Level ${u.level}
                    </strong>

                    <span>

                      ${
                        u.level >=
                        20

                          ? 'MAX'

                          : `${u.xp} / ${need} EXP`
                      }

                    </span>

                  </div>


                  <div class="instrument-xp-bar">

                    <i
                      style="
                        width:${
                          u.level >=
                          20

                            ? 100

                            : Math.min(
                                100,
                                u.xp /
                                need *
                                100
                              )
                        }%
                      "
                    ></i>

                  </div>
                `

                : ''
            }


            <div class="stat-line">

              <span>
                ATK ${up.attack}
              </span>

              <span>
                DEF ${up.defense}
              </span>

              <span>
                MEL ${up.melody}
              </span>

              <span>
                RHY ${up.rhythm}
              </span>

            </div>


            <div class="instrument-actions">

              ${
                owned

                  ? `

                    <button
                      class="
                        btn
                        ${
                          eq
                            ? 'gold'
                            : 'ghost'
                        }
                      "
                      data-equip="${i.name}"
                    >
                      ${
                        eq
                          ? 'Equipped'
                          : 'Equip'
                      }
                    </button>


                    <button
                      class="
                        btn
                        ${
                          u.xp >=
                            need &&
                          u.level <
                            20

                            ? 'gold'

                            : 'ghost'
                        }
                      "
                      data-upgrade-instrument="${i.name}"

                      ${
                        u.xp <
                          need ||
                        u.level >=
                          20

                          ? 'disabled'

                          : ''
                      }
                    >

                      ${
                        u.level >=
                        20

                          ? 'MAX'

                          : 'Upgrade'
                      }

                    </button>
                  `

                  : `

                    <button
                      class="btn gold"
                      data-buy="${i.name}"
                    >
                      🪙 ${i.price}
                    </button>
                  `
              }

            </div>

          </article>
        `;
      }
    )
    .join('');


/* ============================
   BUY INSTRUMENT
============================ */

  $$(
    '[data-buy]'
  )
  .forEach(
    b =>
      b.onclick =
        () => {

          const i =
            getInstrument(
              b.dataset.buy
            );


          if (
            profile.coins <
            i.price
          ) {

            return toast(
              'Not enough coins.'
            );
          }


          profile.coins -=
            i.price;


          profile.owned.push(
            i.name
          );


          profile.equipped =
            i.name;


          persist();

          updateProfileUI();

          renderInstruments();

          refreshBattle(
            true
          );

          S.coin();
        }
  );


/* ============================
   EQUIP INSTRUMENT
============================ */

  $$(
    '[data-equip]'
  )
  .forEach(
    b =>
      b.onclick =
        () => {

          profile.equipped =
            b.dataset.equip;


          persist();

          renderInstruments();

          refreshBattle(
            true
          );

          renderEvolutionPanel();

          renderInstrumentUpgradePanel();

          S.click();
        }
  );


/* ============================
   UPGRADE INSTRUMENT BUTTON
============================ */

  $$(
    '[data-upgrade-instrument]'
  )
  .forEach(
    b =>
      b.onclick =
        () =>
          upgradeInstrument(
            b.dataset.upgradeInstrument
          )
  );


  renderBattleInstrumentSelect();
}


/* ============================
   INSTRUMENT SEARCH
============================ */

$('#instrumentSearch')
.oninput =
  renderInstruments;


/* ============================
   BATTLE INSTRUMENT SELECT
============================ */

function renderBattleInstrumentSelect() {

  const old =
    $('#battleInstrumentSelect')
    .value;


  $('#battleInstrumentSelect')
  .innerHTML =
    profile.owned
    .map(
      n => `

        <option
          ${
            n ===
            profile.equipped

              ? 'selected'

              : ''
          }
        >
          ${n}
        </option>
      `
    )
    .join('');


  if (
    profile.owned.includes(
      old
    )
  ) {

    $('#battleInstrumentSelect')
    .value =
      old;
  }
}


$('#battleInstrumentSelect')
.onchange =
  () => {

    profile.equipped =
      $('#battleInstrumentSelect')
      .value;


    persist();

    renderInstruments();

    refreshBattle(
      true
    );
  };


/* ============================
   SOLO BATTLE
============================ */

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


/* ============================
   CREATE / REFRESH SOLO BATTLE
============================ */

function refreshBattle(
  newEnemy = false
) {

  const pi =
    getInstrument(
      profile.equipped
    );


  if (
    newEnemy ||
    !battle.enemy
  ) {

    const ei =
      pick(
        instruments
      );


    battle = {

      playerHp:
        Math.round(
          100 +
          pi.defense *
          .4
        ),

      playerMax:
        Math.round(
          100 +
          pi.defense *
          .4
        ),

      enemyHp:
        Math.round(
          100 +
          ei.defense *
          .4
        ),

      enemyMax:
        Math.round(
          100 +
          ei.defense *
          .4
        ),

      enemy: {

        name:
          pick(
            botNames
          ),

        instrument:
          ei.name
      },

      energy:
        0,

      shield:
        false,

      busy:
        false
    };
  }


  $('#playerBattleName')
  .textContent =
    profile.name ||
    'Player';


  $('#playerInstrumentLabel')
  .textContent =
    profile.equipped;


  $('#cpuBattleName')
  .textContent =
    battle.enemy.name;


  $('#cpuInstrumentLabel')
  .textContent =
    battle.enemy.instrument;


  renderSoloBattle();
}


/* ============================
   RENDER SOLO BATTLE
============================ */

function renderSoloBattle() {

  const pi =
    getInstrument(
      profile.equipped
    );


  const moves =
    getInstrumentMoves(
      profile.equipped
    );


  $('#playerHpFill')
  .style.width =
    `${
      100 *
      battle.playerHp /
      battle.playerMax
    }%`;


  $('#cpuHpFill')
  .style.width =
    `${
      100 *
      battle.enemyHp /
      battle.enemyMax
    }%`;


  $('#playerHpText')
  .textContent =
    `${battle.playerHp} / ${battle.playerMax}`;


  $('#cpuHpText')
  .textContent =
    `${battle.enemyHp} / ${battle.enemyMax}`;


  $('#energyPips')
  .innerHTML =
    [
      0,
      1,
      2
    ]
    .map(
      i => `

        <i
          class="${
            i <
            battle.energy
              ? 'on'
              : ''
          }"
        ></i>
      `
    )
    .join('');


  $('#moveButtons')
  .innerHTML =
    moves
    .map(
      (
        m,
        i
      ) => `

        <button
          class="
            move-btn
            ${
              i === 3
                ? 'ultimate'
                : ''
            }
          "

          data-solo-move="${i}"

          ${
            battle.busy ||
            (
              i === 3 &&
              battle.energy <
              3
            )

              ? 'disabled'

              : ''
          }
        >

          <strong>
            ${m[0]}
          </strong>


          <span>

            ${
              i === 3

                ? 'ULTIMATE • 3 ENERGY'

                : m[1]
                  .toUpperCase()
            }

          </span>


          <small>

            ${
              m[1] ===
              'heal'

                ? 'Restore HP'

                : m[1] ===
                  'shield'

                  ? 'Block next hit'

                  : 'Deal musical damage'
            }

          </small>

        </button>
      `
    )
    .join('');


  $$(
    '[data-solo-move]'
  )
  .forEach(
    b =>
      b.onclick =
        () =>
          soloMove(
            +b.dataset.soloMove
          )
  );
}


/* ============================
   SOLO BATTLE MOVE
============================ */

async function soloMove(
  idx
) {

  if (
    battle.busy
  ) {

    return;
  }


  battle.busy =
    true;


  const inst =
    getUpgradedInstrument(
      profile.equipped
    );


  const move =
    getInstrumentMoves(
      profile.equipped
    )[
      idx
    ];


  let text =
    '';


/* ============================
   PLAY MOVE SOUND
============================ */

  playInstrument(

    inst.name,

    idx === 3
      ? 660
      : 440
  );


/* ============================
   HEAL MOVE
============================ */

  if (
    move[1] ===
    'heal'
  ) {

    const h =
      Math.round(

        inst.melody *
        .25 +

        12
      );


    battle.playerHp =
      clamp(

        battle.playerHp +
        h,

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
      `${move[0]} restored ${h} HP.`;


    S.heal();
  }


/* ============================
   SHIELD MOVE
============================ */

  else if (
    move[1] ===
    'shield'
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


/* ============================
   ATTACK MOVE
============================ */

  else {

    let mult =
      move[2];


    if (
      idx ===
      3
    ) {

      battle.energy =
        0;


      S.ultimate();
    }

    else {

      battle.energy =
        clamp(

          battle.energy +
          1,

          0,

          3
        );
    }


    let dmg =
      Math.max(

        6,

        Math.round(

          (
            inst.attack *
            .32 +

            inst.rhythm *
            .12 +

            rand(
              -3,
              7
            )
          ) *

          mult -

          getInstrument(
            battle.enemy.instrument
          )
          .defense *
          .06
        )
      );


/* ============================
   CRITICAL HIT
============================ */

    const crit =
      Math.random() <

      .08 +

      inst.melody /
      1200;


    if (
      crit
    ) {

      dmg =
        Math.round(
          dmg *
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
        dmg,

        0,

        battle.enemyMax
      );


    text =
      `${move[0]} dealt ${dmg}${
        crit
          ? ' CRITICAL'
          : ''
      } damage.`;


    addMastery(
      inst.name,
      2
    );
  }


/* ============================
   UPDATE BATTLE TEXT
============================ */

  $('#battleStatus')
  .textContent =
    text;


  $('#battleLog')
  .textContent =
    text;


  renderSoloBattle();


/* ============================
   PLAYER WINS
============================ */

  if (
    battle.enemyHp <=
    0
  ) {

    battle.busy =
      false;


    profile.wins++;


    progressQuest(
      'battle',
      1
    );


    reward(
      24,
      18,
      'Battle won!'
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


/* ============================
   ENEMY TURN
============================ */

  await wait(
    700
  );


  const ei =
    getInstrument(
      battle.enemy.instrument
    );


  let edmg =
    Math.max(

      5,

      Math.round(

        ei.attack *
        .28 +

        rand(
          -3,
          5
        ) -

        inst.defense *
        .05
      )
    );


/* ============================
   PLAYER SHIELD
============================ */

  if (
    battle.shield
  ) {

    edmg =
      Math.round(
        edmg *
        .5
      );


    battle.shield =
      false;
  }


  battle.playerHp =
    clamp(

      battle.playerHp -
      edmg,

      0,

      battle.playerMax
    );


  playInstrument(
    ei.name,
    330
  );


  S.attack();


  $('#battleStatus')
  .textContent =
    `${battle.enemy.name} dealt ${edmg} damage.`;


  $('#battleLog')
  .textContent =
    `${text} • Enemy hit for ${edmg}.`;


  battle.busy =
    false;


  renderSoloBattle();


/* ============================
   PLAYER LOSES
============================ */

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
      'Defeat. +4 EXP'
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


/* ============================
   NEW OPPONENT
============================ */

$('#newOpponentBtn')
.onclick =
  () =>
    refreshBattle(
      true
    );
      /* ============================
   TEAM BATTLE
============================ */

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


/* ============================
   CREATE TEAM PLAYER
============================ */

function makeTeamPlayer(
  team,
  index
) {

  const human =
    team === 'blue' &&
    index === 0;


  const inst =
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
            'Player'
          )

        : pick(
            botNames
          ) +
          rand(
            1,
            99
          ),

    instrument:
      inst.name,

    icon:
      inst.icon,

    attack:
      inst.attack,

    defense:
      inst.defense,

    melody:
      inst.melody,

    rhythm:
      inst.rhythm
  };
}


/* ============================
   OPEN TEAM BATTLE LOBBY
============================ */

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
        i
      ) =>
        makeTeamPlayer(
          'blue',
          i
        )
    );


  multiplayerState.red =
    Array.from(
      {
        length: size
      },

      (
        _,
        i
      ) =>
        makeTeamPlayer(
          'red',
          i
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


  $('#concertRoundLabel')
  .textContent =
    'LOBBY';


  $('#startTeamBattleBtn')
  .disabled =
    false;


  $('#startTeamBattleBtn')
  .textContent =
    'Start Concert Battle';


  $('#teamMovePanel')
  .classList
  .add(
    'hidden'
  );


  renderConcertTeams();

  updateTeamHPBars();


  setMP(
    `<strong>${size}v${size} Concert Battle ready.</strong><span>Both teams share 10,000 HP.</span>`
  );


  $$(
    '.mp-start'
  )
  .forEach(
    b =>
      b.classList.toggle(
        'active',

        +b.dataset.team ===
        size
      )
  );
}


/* ============================
   RENDER TEAM PLAYERS
============================ */

function renderConcertTeams(
  activeId = ''
) {

  const render =
    (
      arr,
      team
    ) =>
      arr
      .map(
        p => `

          <div
            class="
              concert-player
              ${team}
              ${
                p.id ===
                activeId

                  ? 'active'

                  : ''
              }
            "
          >

            <div
              class="body"
              data-icon="${p.icon}"
            ></div>

            <div class="name">
              ${p.name}
            </div>

          </div>
        `
      )
      .join('');


  $('#blueConcertPlayers')
  .innerHTML =
    render(
      multiplayerState.blue,
      'blue'
    );


  $('#redConcertPlayers')
  .innerHTML =
    render(
      multiplayerState.red,
      'red'
    );
}


/* ============================
   UPDATE TEAM HP
============================ */

function updateTeamHPBars() {

  const m =
    multiplayerState.maxTeamHP;


  const b =
    clamp(

      multiplayerState.blueHP /
      m *
      100,

      0,

      100
    );


  const r =
    clamp(

      multiplayerState.redHP /
      m *
      100,

      0,

      100
    );


  $('#blueTeamHPFill')
  .style.width =
    b +
    '%';


  $('#redTeamHPFill')
  .style.width =
    r +
    '%';


  $('#blueTeamHPText')
  .textContent =
    `${Math.round(multiplayerState.blueHP).toLocaleString()} / ${m.toLocaleString()} HP`;


  $('#redTeamHPText')
  .textContent =
    `${Math.round(multiplayerState.redHP).toLocaleString()} / ${m.toLocaleString()} HP`;
}


/* ============================
   TEAM BATTLE MESSAGE
============================ */

function setMP(
  html
) {

  $('#multiplayerBattleMessage')
  .innerHTML =
    html;
}


/* ============================
   TEAM DAMAGE
============================ */

function teamDamage(
  attacker,
  mult = 1
) {

  const targetTeam =
    attacker.team ===
    'blue'

      ? 'red'

      : 'blue';


  let dmg =
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

    .05 +

    attacker.melody /
    1000;


  if (
    critical
  ) {

    dmg =
      Math.round(
        dmg *
        1.5
      );
  }


  multiplayerState[
    targetTeam +
    'HP'
  ] =
    Math.max(

      0,

      multiplayerState[
        targetTeam +
        'HP'
      ] -
      dmg
    );


  updateTeamHPBars();


  return {

    dmg,

    critical
  };
}


/* ============================
   WAIT FOR PLAYER MOVE
============================ */

function waitHumanMove() {

  return new Promise(
    resolve => {

      multiplayerState.resolve =
        resolve;


      showTeamMoves();
    }
  );
}


/* ============================
   SHOW PLAYER TEAM MOVES
============================ */

function showTeamMoves() {

  const p =
    multiplayerState.blue[
      0
    ];


  const inst =
    getInstrument(
      p.instrument
    );


  const moves =
    getInstrumentMoves(
      p.instrument
    );


  multiplayerState.waiting =
    true;


  $('#teamMovePanel')
  .classList
  .remove(
    'hidden'
  );


  $('#teamTurnTitle')
  .textContent =
    `${p.name}, choose your move`;


  $('#teamEnergyLabel')
  .textContent =
    `${multiplayerState.playerEnergy} / 3`;


  $('#teamMoveButtons')
  .innerHTML =
    moves
    .map(
      (
        m,
        i
      ) => `

        <button
          class="
            move-btn
            ${
              i ===
              3

                ? 'ultimate'

                : ''
            }
          "

          data-team-move="${i}"

          ${
            i ===
              3 &&
            multiplayerState.playerEnergy <
              3

              ? 'disabled'

              : ''
          }
        >

          <strong>
            ${m[0]}
          </strong>

          <span>

            ${
              i ===
              3

                ? 'ULTIMATE • 3 ENERGY'

                : m[1]
                  .toUpperCase()
            }

          </span>

          <small>

            ${
              m[1] ===
              'heal'

                ? 'Restore team HP'

                : m[1] ===
                  'shield'

                  ? 'Reduce next enemy hit'

                  : 'Damage Team Red'
            }

          </small>

        </button>
      `
    )
    .join('');


  $$(
    '[data-team-move]'
  )
  .forEach(
    b =>
      b.onclick =
        () => {

          if (
            !multiplayerState.waiting
          ) {

            return;
          }


          multiplayerState.waiting =
            false;


          $('#teamMovePanel')
          .classList
          .add(
            'hidden'
          );


          const r =
            multiplayerState.resolve;


          multiplayerState.resolve =
            null;


          r(
            +b.dataset.teamMove
          );
        }
  );
}


/* ============================
   EXECUTE HUMAN TEAM MOVE
============================ */

async function executeTeamMove(
  idx
) {

  const p =
    multiplayerState.blue[
      0
    ];


  const inst =
    getInstrument(
      p.instrument
    );


  const move =
    getInstrumentMoves(
      p.instrument
    )[
      idx
    ];


  renderConcertTeams(
    p.id
  );


  playInstrument(

    inst.name,

    idx ===
    3

      ? 659

      : 440
  );


/* ============================
   TEAM HEAL MOVE
============================ */

  if (
    move[1] ===
    'heal'
  ) {

    const h =
      Math.round(

        inst.melody *
        7 +

        220
      );


    multiplayerState.blueHP =
      clamp(

        multiplayerState.blueHP +
        h,

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

      `<strong>💚 ${move[0]}</strong><span>Team Blue restored ${h} HP.</span>`
    );
  }


/* ============================
   TEAM SHIELD MOVE
============================ */

  else if (
    move[1] ===
    'shield'
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

      `<strong>🛡️ ${move[0]}</strong><span>Team Blue is shielded against the next attack.</span>`
    );
  }


/* ============================
   TEAM ATTACK MOVE
============================ */

  else {

    let mult =
      move[2];


    if (
      idx ===
      3
    ) {

      mult *=
        1.5;


      multiplayerState.playerEnergy =
        0;


      S.ultimate();


      crowd(
        1
      );
    }

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
        p,
        mult
      );


    if (
      hit.critical
    ) {

      S.critical();


      crowd(
        .8
      );
    }


    setMP(

      `<strong>🔵 ${p.name} used ${move[0]}!</strong><span>${hit.dmg} damage${hit.critical ? ' • CRITICAL PERFORMANCE!' : ''}</span>`
    );


    addMastery(
      inst.name,
      3
    );
  }


  updateTeamHPBars();


  await wait(
    500
  );


  renderConcertTeams();
}


/* ============================
   AI TEAM TURN
============================ */

async function aiTeamTurn(
  p
) {

  renderConcertTeams(
    p.id
  );


  playInstrument(

    p.instrument,

    p.team ===
    'blue'

      ? 420

      : 320
  );


  S.attack();


  let hit =
    teamDamage(
      p,
      .8
    );


/* ============================
   APPLY TEAM SHIELD
============================ */

  if (
    p.team ===
      'red' &&
    multiplayerState.teamShield
  ) {

    const restore =
      Math.round(
        hit.dmg *
        .45
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


  if (
    hit.critical
  ) {

    S.critical();
  }


  setMP(

    `<strong>${p.team === 'blue' ? '🔵' : '🔴'} ${p.name} performs!</strong><span>${p.instrument} deals ${hit.dmg} team damage${hit.critical ? ' • CRITICAL!' : ''}</span>`
  );


  await wait(

    multiplayerState.size >=
    10

      ? 150

      : 350
  );
}


/* ============================
   START TEAM BATTLE
============================ */

async function startTeamBattle() {

  if (
    multiplayerState.playing
  ) {

    return;
  }


  multiplayerState.playing =
    true;


  $('#startTeamBattleBtn')
  .disabled =
    true;


  $('#startTeamBattleBtn')
  .textContent =
    'Concert in Progress...';


  let round =
    1;


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


    $('#concertRoundLabel')
    .textContent =
      `ROUND ${round}`;


    setMP(

      `<strong>🎵 Round ${round}: Your turn!</strong><span>Choose one of your instrument moves.</span>`
    );


/* ============================
   HUMAN TURN
============================ */

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


/* ============================
   BLUE AI TURNS
============================ */

    for (
      const p of
      multiplayerState.blue.slice(
        1
      )
    ) {

      await aiTeamTurn(
        p
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


/* ============================
   RED TEAM TURNS
============================ */

    for (
      const p of
      multiplayerState.red
    ) {

      await aiTeamTurn(
        p
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


/* ============================
   END TEAM BATTLE
============================ */

  multiplayerState.playing =
    false;


  $('#teamMovePanel')
  .classList
  .add(
    'hidden'
  );


  const won =
    multiplayerState.blueHP >
    multiplayerState.redHP;


  $('#concertRoundLabel')
  .textContent =
    won

      ? 'VICTORY'

      : 'DEFEAT';


/* ============================
   TEAM VICTORY
============================ */

  if (
    won
  ) {

    crowd(
      1
    );


    S.victory();


    progressQuest(
      'battle',
      1
    );


    reward(

      24 +
      multiplayerState.size *
      2,

      18 +
      multiplayerState.size *
      2,

      'Concert victory!'
    );


    addInstrumentXP(

      profile.equipped,

      10
    );


    setMP(

      `<strong>🏆 TEAM BLUE WINS!</strong><span>${Math.round(multiplayerState.blueHP).toLocaleString()} HP remaining.</span>`
    );
  }


/* ============================
   TEAM DEFEAT
============================ */

  else {

    S.defeat();


    addXP(
      6
    );


    setMP(

      `<strong>Team Red wins the concert.</strong><span>+18 EXP for performing.</span>`
    );
  }


  $('#startTeamBattleBtn')
  .disabled =
    false;


  $('#startTeamBattleBtn')
  .textContent =
    'Play Again';
}


/* ============================
   TEAM SIZE BUTTONS
============================ */

$$(
  '.mp-start'
)
.forEach(
  b =>
    b.onclick =
      () =>
        openLobby(
          +b.dataset.team
        )
);


/* ============================
   START TEAM BATTLE BUTTON
============================ */

$('#startTeamBattleBtn')
.onclick =
  startTeamBattle;
      /* ============================
   TEAM BATTLE
============================ */

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


/* ============================
   CREATE TEAM PLAYER
============================ */

function makeTeamPlayer(
  team,
  index
) {

  const human =
    team === 'blue' &&
    index === 0;


  const inst =
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
            'Player'
          )

        : pick(
            botNames
          ) +
          rand(
            1,
            99
          ),

    instrument:
      inst.name,

    icon:
      inst.icon,

    attack:
      inst.attack,

    defense:
      inst.defense,

    melody:
      inst.melody,

    rhythm:
      inst.rhythm
  };
}


/* ============================
   OPEN TEAM BATTLE LOBBY
============================ */

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
        i
      ) =>
        makeTeamPlayer(
          'blue',
          i
        )
    );


  multiplayerState.red =
    Array.from(
      {
        length: size
      },

      (
        _,
        i
      ) =>
        makeTeamPlayer(
          'red',
          i
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


  $('#concertRoundLabel')
  .textContent =
    'LOBBY';


  $('#startTeamBattleBtn')
  .disabled =
    false;


  $('#startTeamBattleBtn')
  .textContent =
    'Start Concert Battle';


  $('#teamMovePanel')
  .classList
  .add(
    'hidden'
  );


  renderConcertTeams();

  updateTeamHPBars();


  setMP(
    `<strong>${size}v${size} Concert Battle ready.</strong><span>Both teams share 10,000 HP.</span>`
  );


  $$(
    '.mp-start'
  )
  .forEach(
    b =>
      b.classList.toggle(
        'active',

        +b.dataset.team ===
        size
      )
  );
}


/* ============================
   RENDER TEAM PLAYERS
============================ */

function renderConcertTeams(
  activeId = ''
) {

  const render =
    (
      arr,
      team
    ) =>
      arr
      .map(
        p => `

          <div
            class="
              concert-player
              ${team}
              ${
                p.id ===
                activeId

                  ? 'active'

                  : ''
              }
            "
          >

            <div
              class="body"
              data-icon="${p.icon}"
            ></div>

            <div class="name">
              ${p.name}
            </div>

          </div>
        `
      )
      .join('');


  $('#blueConcertPlayers')
  .innerHTML =
    render(
      multiplayerState.blue,
      'blue'
    );


  $('#redConcertPlayers')
  .innerHTML =
    render(
      multiplayerState.red,
      'red'
    );
}


/* ============================
   UPDATE TEAM HP
============================ */

function updateTeamHPBars() {

  const m =
    multiplayerState.maxTeamHP;


  const b =
    clamp(

      multiplayerState.blueHP /
      m *
      100,

      0,

      100
    );


  const r =
    clamp(

      multiplayerState.redHP /
      m *
      100,

      0,

      100
    );


  $('#blueTeamHPFill')
  .style.width =
    b +
    '%';


  $('#redTeamHPFill')
  .style.width =
    r +
    '%';


  $('#blueTeamHPText')
  .textContent =
    `${Math.round(multiplayerState.blueHP).toLocaleString()} / ${m.toLocaleString()} HP`;


  $('#redTeamHPText')
  .textContent =
    `${Math.round(multiplayerState.redHP).toLocaleString()} / ${m.toLocaleString()} HP`;
}


/* ============================
   TEAM BATTLE MESSAGE
============================ */

function setMP(
  html
) {

  $('#multiplayerBattleMessage')
  .innerHTML =
    html;
}


/* ============================
   TEAM DAMAGE
============================ */

function teamDamage(
  attacker,
  mult = 1
) {

  const targetTeam =
    attacker.team ===
    'blue'

      ? 'red'

      : 'blue';


  let dmg =
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

    .05 +

    attacker.melody /
    1000;


  if (
    critical
  ) {

    dmg =
      Math.round(
        dmg *
        1.5
      );
  }


  multiplayerState[
    targetTeam +
    'HP'
  ] =
    Math.max(

      0,

      multiplayerState[
        targetTeam +
        'HP'
      ] -
      dmg
    );


  updateTeamHPBars();


  return {

    dmg,

    critical
  };
}


/* ============================
   WAIT FOR PLAYER MOVE
============================ */

function waitHumanMove() {

  return new Promise(
    resolve => {

      multiplayerState.resolve =
        resolve;


      showTeamMoves();
    }
  );
}


/* ============================
   SHOW PLAYER TEAM MOVES
============================ */

function showTeamMoves() {

  const p =
    multiplayerState.blue[
      0
    ];


  const inst =
    getInstrument(
      p.instrument
    );


  const moves =
    getInstrumentMoves(
      p.instrument
    );


  multiplayerState.waiting =
    true;


  $('#teamMovePanel')
  .classList
  .remove(
    'hidden'
  );


  $('#teamTurnTitle')
  .textContent =
    `${p.name}, choose your move`;


  $('#teamEnergyLabel')
  .textContent =
    `${multiplayerState.playerEnergy} / 3`;


  $('#teamMoveButtons')
  .innerHTML =
    moves
    .map(
      (
        m,
        i
      ) => `

        <button
          class="
            move-btn
            ${
              i ===
              3

                ? 'ultimate'

                : ''
            }
          "

          data-team-move="${i}"

          ${
            i ===
              3 &&
            multiplayerState.playerEnergy <
              3

              ? 'disabled'

              : ''
          }
        >

          <strong>
            ${m[0]}
          </strong>

          <span>

            ${
              i ===
              3

                ? 'ULTIMATE • 3 ENERGY'

                : m[1]
                  .toUpperCase()
            }

          </span>

          <small>

            ${
              m[1] ===
              'heal'

                ? 'Restore team HP'

                : m[1] ===
                  'shield'

                  ? 'Reduce next enemy hit'

                  : 'Damage Team Red'
            }

          </small>

        </button>
      `
    )
    .join('');


  $$(
    '[data-team-move]'
  )
  .forEach(
    b =>
      b.onclick =
        () => {

          if (
            !multiplayerState.waiting
          ) {

            return;
          }


          multiplayerState.waiting =
            false;


          $('#teamMovePanel')
          .classList
          .add(
            'hidden'
          );


          const r =
            multiplayerState.resolve;


          multiplayerState.resolve =
            null;


          r(
            +b.dataset.teamMove
          );
        }
  );
}


/* ============================
   EXECUTE HUMAN TEAM MOVE
============================ */

async function executeTeamMove(
  idx
) {

  const p =
    multiplayerState.blue[
      0
    ];


  const inst =
    getInstrument(
      p.instrument
    );


  const move =
    getInstrumentMoves(
      p.instrument
    )[
      idx
    ];


  renderConcertTeams(
    p.id
  );


  playInstrument(

    inst.name,

    idx ===
    3

      ? 659

      : 440
  );


/* ============================
   TEAM HEAL MOVE
============================ */

  if (
    move[1] ===
    'heal'
  ) {

    const h =
      Math.round(

        inst.melody *
        7 +

        220
      );


    multiplayerState.blueHP =
      clamp(

        multiplayerState.blueHP +
        h,

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

      `<strong>💚 ${move[0]}</strong><span>Team Blue restored ${h} HP.</span>`
    );
  }


/* ============================
   TEAM SHIELD MOVE
============================ */

  else if (
    move[1] ===
    'shield'
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

      `<strong>🛡️ ${move[0]}</strong><span>Team Blue is shielded against the next attack.</span>`
    );
  }


/* ============================
   TEAM ATTACK MOVE
============================ */

  else {

    let mult =
      move[2];


    if (
      idx ===
      3
    ) {

      mult *=
        1.5;


      multiplayerState.playerEnergy =
        0;


      S.ultimate();


      crowd(
        1
      );
    }

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
        p,
        mult
      );


    if (
      hit.critical
    ) {

      S.critical();


      crowd(
        .8
      );
    }


    setMP(

      `<strong>🔵 ${p.name} used ${move[0]}!</strong><span>${hit.dmg} damage${hit.critical ? ' • CRITICAL PERFORMANCE!' : ''}</span>`
    );


    addMastery(
      inst.name,
      3
    );
  }


  updateTeamHPBars();


  await wait(
    500
  );


  renderConcertTeams();
}


/* ============================
   AI TEAM TURN
============================ */

async function aiTeamTurn(
  p
) {

  renderConcertTeams(
    p.id
  );


  playInstrument(

    p.instrument,

    p.team ===
    'blue'

      ? 420

      : 320
  );


  S.attack();


  let hit =
    teamDamage(
      p,
      .8
    );


/* ============================
   APPLY TEAM SHIELD
============================ */

  if (
    p.team ===
      'red' &&
    multiplayerState.teamShield
  ) {

    const restore =
      Math.round(
        hit.dmg *
        .45
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


  if (
    hit.critical
  ) {

    S.critical();
  }


  setMP(

    `<strong>${p.team === 'blue' ? '🔵' : '🔴'} ${p.name} performs!</strong><span>${p.instrument} deals ${hit.dmg} team damage${hit.critical ? ' • CRITICAL!' : ''}</span>`
  );


  await wait(

    multiplayerState.size >=
    10

      ? 150

      : 350
  );
}


/* ============================
   START TEAM BATTLE
============================ */

async function startTeamBattle() {

  if (
    multiplayerState.playing
  ) {

    return;
  }


  multiplayerState.playing =
    true;


  $('#startTeamBattleBtn')
  .disabled =
    true;


  $('#startTeamBattleBtn')
  .textContent =
    'Concert in Progress...';


  let round =
    1;


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


    $('#concertRoundLabel')
    .textContent =
      `ROUND ${round}`;


    setMP(

      `<strong>🎵 Round ${round}: Your turn!</strong><span>Choose one of your instrument moves.</span>`
    );


/* ============================
   HUMAN TURN
============================ */

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


/* ============================
   BLUE AI TURNS
============================ */

    for (
      const p of
      multiplayerState.blue.slice(
        1
      )
    ) {

      await aiTeamTurn(
        p
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


/* ============================
   RED TEAM TURNS
============================ */

    for (
      const p of
      multiplayerState.red
    ) {

      await aiTeamTurn(
        p
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


/* ============================
   END TEAM BATTLE
============================ */

  multiplayerState.playing =
    false;


  $('#teamMovePanel')
  .classList
  .add(
    'hidden'
  );


  const won =
    multiplayerState.blueHP >
    multiplayerState.redHP;


  $('#concertRoundLabel')
  .textContent =
    won

      ? 'VICTORY'

      : 'DEFEAT';


/* ============================
   TEAM VICTORY
============================ */

  if (
    won
  ) {

    crowd(
      1
    );


    S.victory();


    progressQuest(
      'battle',
      1
    );


    reward(

      24 +
      multiplayerState.size *
      2,

      18 +
      multiplayerState.size *
      2,

      'Concert victory!'
    );


    addInstrumentXP(

      profile.equipped,

      10
    );


    setMP(

      `<strong>🏆 TEAM BLUE WINS!</strong><span>${Math.round(multiplayerState.blueHP).toLocaleString()} HP remaining.</span>`
    );
  }


/* ============================
   TEAM DEFEAT
============================ */

  else {

    S.defeat();


    addXP(
      6
    );


    setMP(

      `<strong>Team Red wins the concert.</strong><span>+18 EXP for performing.</span>`
    );
  }


  $('#startTeamBattleBtn')
  .disabled =
    false;


  $('#startTeamBattleBtn')
  .textContent =
    'Play Again';
}


/* ============================
   TEAM SIZE BUTTONS
============================ */

$$(
  '.mp-start'
)
.forEach(
  b =>
    b.onclick =
      () =>
        openLobby(
          +b.dataset.team
        )
);


/* ============================
   START TEAM BATTLE BUTTON
============================ */

$('#startTeamBattleBtn')
.onclick =
  startTeamBattle;
      /* ============================
   MUSICVERSE ADVENTURE RPG
============================ */


/* ============================
   SKILL TREE
============================ */

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


/* ============================
   SKILL POINTS
============================ */

function totalSkillPointsEarned() {

  return Math.floor(
    (
      profile.level -
      1
    ) /
    2
  );
}


function spentSkillPoints() {

  return Object.values(
    profile.skillTree ||
    {}
  )
  .reduce(
    (
      a,
      b
    ) =>
      a +
      (
        Number(
          b
        ) ||
        0
      ),

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


function skillRank(
  id
) {

  return Number(
    profile.skillTree?.[
      id
    ] ||
    0
  );
}


/* ============================
   BUY SKILLS
============================ */

function canBuySkill(
  node
) {

  if (
    availableSkillPoints() <=
    0
  ) {

    return false;
  }


  if (
    skillRank(
      node.id
    ) >=
    node.max
  ) {

    return false;
  }


  if (
    node.requires &&
    skillRank(
      node.requires
    ) <=
    0
  ) {

    return false;
  }


  return true;
}


function buySkill(
  id
) {

  let node =
    null;


  for (
    const branch of
    Object.values(
      skillTreeDefs
    )
  ) {

    node =
      branch.nodes.find(
        n =>
          n.id ===
          id
      );


    if (
      node
    ) {

      break;
    }
  }


  if (
    !node
  ) {

    return;
  }


  if (
    !canBuySkill(
      node
    )
  ) {

    if (
      availableSkillPoints() <=
      0
    ) {

      toast(
        'You need another Skill Point.'
      );
    }

    else if (
      node.requires &&
      skillRank(
        node.requires
      ) <=
      0
    ) {

      toast(
        'Unlock the previous skill first.'
      );
    }


    return;
  }


  profile.skillTree[
    id
  ] =
    skillRank(
      id
    ) +
    1;


  applySkillTreeVitals();

  persist();

  S.level();


  toast(
    `🌳 ${node.name} is now Rank ${profile.skillTree[id]}!`
  );


  renderSkillTree();

  renderRpgMap();


  if (
    rpgEnemy
  ) {

    renderRpgBattle();
  }
}


/* ============================
   SKILL BONUSES
============================ */

function getSkillBonuses() {

  return {

    attackPct:
      skillRank(
        'power1'
      ) *
      .03,

    critChance:
      skillRank(
        'power2'
      ) *
      .02,

    specialPct:
      skillRank(
        'power3'
      ) *
      .05,

    defensePct:
      skillRank(
        'rhythm1'
      ) *
      .03,

    dodgeChance:
      skillRank(
        'rhythm2'
      ) *
      .02,

    normalPct:
      skillRank(
        'rhythm3'
      ) *
      .04,

    maxHp:
      skillRank(
        'harmony1'
      ) *
      5,

    healPct:
      skillRank(
        'harmony2'
      ) *
      .08,

    petXpPct:
      skillRank(
        'harmony3'
      ) *
      .10
  };
}


/* ============================
   RPG MAX HP FROM SKILL TREE
============================ */

function applySkillTreeVitals() {

  const b =
    getSkillBonuses();


  const oldMax =
    profile.rpg.maxHp ||
    100;


  const newMax =
    100 +
    b.maxHp;


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


/* ============================
   RENDER SKILL TREE
============================ */

function renderSkillTree() {

  const el =
    $('#skillTree');


  if (
    !el
  ) {

    return;
  }


  applySkillTreeVitals();


  $('#skillPointsAvailable')
  .textContent =
    availableSkillPoints();


  el.innerHTML =

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
              (
                n,
                i
              ) => {

                const rank =
                  skillRank(
                    n.id
                  );


                const locked =
                  n.requires &&
                  skillRank(
                    n.requires
                  ) <=
                  0;


                const maxed =
                  rank >=
                  n.max;


                return `

                  ${
                    i
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
                      ${n.icon}
                    </div>


                    <div>

                      <strong>
                        ${n.name}
                      </strong>

                      <small>
                        ${n.desc}
                      </small>

                    </div>


                    <div>

                      <div class="skill-rank">
                        Rank ${rank}/${n.max}
                      </div>


                      <button
                        data-skill="${n.id}"

                        ${
                          maxed ||
                          locked ||
                          availableSkillPoints() <=
                          0

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
    .join('') +

    `

      <div class="skill-summary">

        <div>

          <b>
            +${Math.round(
              getSkillBonuses()
              .attackPct *
              100
            )}%
          </b>

          <span>
            Attack
          </span>

        </div>


        <div>

          <b>
            +${getSkillBonuses().maxHp}
          </b>

          <span>
            RPG Max HP
          </span>

        </div>


        <div>

          <b>
            +${Math.round(
              getSkillBonuses()
              .petXpPct *
              100
            )}%
          </b>

          <span>
            Pet EXP
          </span>

        </div>

      </div>
    `;


  $$(
    '[data-skill]'
  )
  .forEach(
    b =>
      b.onclick =
        () =>
          buySkill(
            b.dataset.skill
          )
  );
}


/* ============================
   RPG ZONES
============================ */

const rpgZones = [

  {
    name: 'Melody Village',
    emoji: '🏡',
    enemy: 'Slime Note',
    boss: 'Village Maestro'
  },

  {
    name: 'Rhythm Forest',
    emoji: '🌲',
    enemy: 'Beat Bug',
    boss: 'Tempo Wolf'
  },

  {
    name: 'Echo Caves',
    emoji: '🕳️',
    enemy: 'Echo Bat',
    boss: 'Crystal Golem'
  },

  {
    name: 'Brass Kingdom',
    emoji: '🏰',
    enemy: 'Horn Guard',
    boss: 'Royal Conductor'
  },

  {
    name: 'Crystal Highlands',
    emoji: '💎',
    enemy: 'Shard Sprite',
    boss: 'Crystal Maestro'
  },

  {
    name: 'Shadow Ruins',
    emoji: '🗿',
    enemy: 'Shadow Note',
    boss: 'Silent Knight'
  },

  {
    name: 'Magma Canyon',
    emoji: '🔥',
    enemy: 'Fire Beat',
    boss: 'Inferno Dragon'
  },

  {
    name: 'Celestial Valley',
    emoji: '✨',
    enemy: 'Star Wisp',
    boss: 'Celestial Titan'
  },

  {
    name: 'Void Realm',
    emoji: '🌌',
    enemy: 'Void Spirit',
    boss: 'Abyss Titan'
  },

  {
    name: 'MusicVerse Citadel',
    emoji: '🎼',
    enemy: 'Dark Virtuoso',
    boss: 'The Silent King'
  }
];


let rpgMapData = [];

let rpgEnemy =
  null;


/* ============================
   CREATE RPG MAP
============================ */

function makeRpgMap() {

  rpgMapData =
    Array.from(
      {
        length: 8
      },

      (
        _,
        y
      ) =>
        Array.from(
          {
            length: 12
          },

          (
            _,
            x
          ) =>
            x === 0 ||
            x === 11 ||
            y === 0 ||
            y === 7

              ? 'wall'

              : 'floor'
        )
    );


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
      x !==
      profile.rpg.x ||
      y !==
      profile.rpg.y
    ) {

      rpgMapData[
        y
      ][
        x
      ] =
        'wall';
    }
  }


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
      rpgMapData[
        y
      ][
        x
      ] ===
      'floor'
    ) {

      rpgMapData[
        y
      ][
        x
      ] =
        'enemy';
    }
  }


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
      rpgMapData[
        y
      ][
        x
      ] ===
      'floor'
    ) {

      rpgMapData[
        y
      ][
        x
      ] =
        'chest';
    }
  }


  rpgMapData[
    6
  ][
    10
  ] =
    'exit';


  profile.rpg.x =
    1;


  profile.rpg.y =
    1;


  persist();

  renderRpgMap();
}


/* ============================
   RENDER RPG MAP
============================ */

function renderRpgMap() {

  const el =
    $('#rpgMap');


  if (
    !el
  ) {

    return;
  }


  $('#rpgZoneName')
  .textContent =
    rpgZones[
      profile.rpg.zone
    ].name;


  $('#rpgHpText')
  .textContent =
    `${profile.rpg.hp} / ${profile.rpg.maxHp}`;


  $('#rpgStoryText')
  .textContent =
    `${profile.rpg.storyStep + 1} / ${rpgZones.length}`;


  el.innerHTML =
    rpgMapData
    .flatMap(
      (
        row,
        y
      ) =>
        row.map(
          (
            t,
            x
          ) => {

            const p =
              x ===
              profile.rpg.x &&
              y ===
              profile.rpg.y;


            const icon =
              p
                ? '🎸'

                : t ===
                  'wall'
                  ? ''

                  : t ===
                    'enemy'
                    ? '👾'

                    : t ===
                      'chest'
                      ? '🎁'

                      : t ===
                        'exit'
                        ? '🚪'

                        : '';


            return `

              <div
                class="
                  rpg-tile
                  ${
                    p
                      ? 'player'
                      : t
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


/* ============================
   RPG MOVEMENT
============================ */

function moveRpg(
  dx,
  dy
) {

  if (
    rpgEnemy
  ) {

    return;
  }


  const nx =
    profile.rpg.x +
    dx;


  const ny =
    profile.rpg.y +
    dy;


  const t =
    rpgMapData[
      ny
    ]?.[
      nx
    ];


  if (
    !t ||
    t ===
    'wall'
  ) {

    return;
  }


  if (
    t ===
    'enemy'
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


  if (
    t ===
    'chest'
  ) {

    rpgMapData[
      ny
    ][
      nx
    ] =
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
      .35
    ) {

      profile.equipmentInventory.push({

        name:
          pick(
            [
              'Echo Ring',
              'Rhythm Boots',
              'Crystal Charm'
            ]
          ),

        slot:
          pick(
            [
              'Ring',
              'Feet',
              'Charm'
            ]
          ),

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


  if (
    t ===
    'exit'
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


/* ============================
   START RPG BATTLE
============================ */

function startRpgBattle(
  boss
) {

  const z =
    rpgZones[
      profile.rpg.zone
    ];


  const inst =
    getUpgradedInstrument(
      profile.equipped
    );


  rpgEnemy = {

    name:
      boss
        ? z.boss
        : z.enemy,

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


/* ============================
   RENDER RPG BATTLE
============================ */

function renderRpgBattle() {

  const p =
    $('#rpgBattlePanel');


  if (
    !p ||
    !rpgEnemy
  ) {

    return;
  }


  p.classList.remove(
    'hidden'
  );


  const inst =
    getUpgradedInstrument(
      profile.equipped
    );


  p.innerHTML = `

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
          ${inst.icon}
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


  $('#rpgAttack')
  .onclick =
    () =>
      rpgPlayerAction(
        'attack'
      );


  $('#rpgSkill')
  .onclick =
    () =>
      rpgPlayerAction(
        'skill'
      );


  $('#rpgHeal')
  .onclick =
    () =>
      rpgPlayerAction(
        'heal'
      );


  $('#rpgRun')
  .onclick =
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


      p.classList.add(
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


/* ============================
   RPG PLAYER ACTION
============================ */

function rpgPlayerAction(
  type
) {

  const inst =
    getUpgradedInstrument(
      profile.equipped
    );


  const skills =
    getSkillBonuses();


  if (
    type ===
    'heal'
  ) {

    const base =
      Math.round(
        inst.melody *
        .12
      ) +
      6;


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

  else {

    let mult =
      type ===
      'skill'
        ? 1.45
        : 1;


    mult *=
      1 +
      skills.attackPct;


    mult *=
      type ===
      'skill'

        ? 1 +
          skills.specialPct

        : 1 +
          skills.normalPct;


    let damage =
      Math.max(
        5,

        Math.round(
          (
            inst.attack *
            .22 +

            inst.rhythm *
            .08 +

            rand(
              0,
              6
            )
          ) *
          mult
        )
      );


    const crit =
      Math.random() <
      .06 +
      inst.melody /
      1600 +
      skills.critChance;


    if (
      crit
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

      type ===
      'skill'
        ? 660
        : 440
    );


    type ===
    'skill'

      ? S.ultimate()

      : S.attack();
  }


  if (
    rpgEnemy.hp <=
    0
  ) {

    finishRpgBattle();

    return;
  }


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


  const effectiveDefense =
    inst.defense *
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
        .035
      )
    );


  profile.rpg.hp =
    Math.max(
      0,

      profile.rpg.hp -
      hurt
    );


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


/* ============================
   FINISH RPG BATTLE
============================ */

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
      /* ============================
   RPG SETUP / CONTROLS
============================ */

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
      e => {

        const k =
          e.key.toLowerCase();


        const m = {

          arrowup: [
            0,
            -1
          ],

          w: [
            0,
            -1
          ],

          arrowdown: [
            0,
            1
          ],

          s: [
            0,
            1
          ],

          arrowleft: [
            -1,
            0
          ],

          a: [
            -1,
            0
          ],

          arrowright: [
            1,
            0
          ],

          d: [
            1,
            0
          ]

        }[
          k
        ];


        if (
          m
        ) {

          e.preventDefault();


          moveRpg(
            ...m
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

      $('#' + id)
      .onclick =
        () =>
          moveRpg(
            x,
            y
          );
    }
  );
}


/* ============================
   GAME HUB
============================ */

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


/* ============================
   RENDER GAME CARDS
============================ */

function renderGameCards() {

  $('#gameCards')
  .innerHTML =
    games
    .map(
      g => `

        <article
          class="game-card"
          data-game="${g[0]}"
        >

          <div class="game-icon">
            ${g[1]}
          </div>

          <h3>
            ${g[2]}
          </h3>

          <p>
            ${g[3]}
          </p>

          <b>
            EARNS UNIVERSAL EXP
          </b>

        </article>
      `
    )
    .join('');


  $$(
    '[data-game]'
  )
  .forEach(
    c =>
      c.onclick =
        () =>
          openGame(
            c.dataset.game
          )
  );
}


/* ============================
   OPEN GAME
============================ */

function openGame(
  id
) {

  stopActiveGame();


  const g =
    games.find(
      x =>
        x[0] ===
        id
    );


  $('#gameStage')
  .classList
  .remove(
    'hidden'
  );


  $('#gameEyebrow')
  .textContent =
    'MUSICVERSE ARCADE';


  $('#gameTitle')
  .textContent =
    g[2];


  $('#gameBody')
  .innerHTML =
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

  }[
    id
  ])();
}


/* ============================
   CLOSE GAME
============================ */

$('#closeGameBtn')
.onclick =
  () => {

    stopActiveGame();


    $('#gameStage')
    .classList
    .add(
      'hidden'
    );
  };


let activeIntervals =
  [];


let activeKeyHandler =
  null;


/* ============================
   GAME TIMER HELPER
============================ */

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


/* ============================
   STOP ACTIVE GAME
============================ */

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


/* ============================
   RHYTHM RUSH
============================ */

function startRhythm() {

  $('#gameBody')
  .innerHTML = `

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
              k,
              i
            ) => `

              <div
                class="lane"
                data-lane="${i}"
              >

                <div class="lane-key">
                  ${k}
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


/* ============================
   SPAWN RHYTHM NOTES
============================ */

  function spawn() {

    const lane =
      rand(
        0,
        3
      );


    const el =
      document.createElement(
        'div'
      );


    el.className =
      'fall-note';


    el.style.top =
      '-30px';


    el.dataset.y =
      '-30';


    el.dataset.lane =
      lane;


    $('#rrBoard')
    .children[
      lane
    ]
    .appendChild(
      el
    );


    notes.push(
      el
    );
  }


  every(
    spawn,
    650
  );


/* ============================
   MOVE FALLING NOTES
============================ */

  every(
    () => {

      notes =
        [
          ...notes
        ]
        .filter(
          n => {

            let y =
              +n.dataset.y +
              8;


            n.dataset.y =
              y;


            n.style.top =
              y +
              'px';


            if (
              y >
              330
            ) {

              n.remove();


              combo =
                0;


              $('#rrCombo')
              .textContent =
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


/* ============================
   RHYTHM TIMER
============================ */

  every(
    () => {

      time--;


      $('#rrTime')
      .textContent =
        time;


      if (
        time <=
        0
      ) {

        stopActiveGame();


        $('#rrResult')
        .textContent =
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
            .6
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


/* ============================
   RHYTHM KEY INPUT
============================ */

  activeKeyHandler =
    e => {

      const map = {

        d: 0,

        f: 1,

        j: 2,

        k: 3
      };


      const lane =
        map[
          e.key.toLowerCase()
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
          n =>
            +n.dataset.lane ===
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


      const n =
        candidates[
          0
        ];


      if (
        !n
      ) {

        combo =
          0;


        S.miss();


        return;
      }


      const y =
        +n.dataset.y;


      const dist =
        Math.abs(
          306 -
          y
        );


      if (
        dist <
        32
      ) {

        score +=
          dist <
          12
            ? 150
            : 100;


        combo++;


        dist <
        12

          ? S.perfect()

          : S.great();


        n.remove();


        notes =
          notes.filter(
            x =>
              x !== n
          );
      }

      else {

        combo =
          0;


        S.miss();
      }


      $('#rrScore')
      .textContent =
        score;


      $('#rrCombo')
      .textContent =
        combo;
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* ============================
   GUESS THE SONG
============================ */

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


/* ============================
   PLAY MELODY
============================ */

function playMelody(
  m
) {

  m.notes
  .forEach(
    (
      n,
      i
    ) =>
      SoundEngine.tone(
        n,
        .26,
        'sine',
        .09,
        i *
        .24
      )
  );
}


/* ============================
   START GUESS THE SONG
============================ */

function startGuessSong() {

  let score =
    0;


  let round =
    0;


  let current;


/* ============================
   RENDER GUESS ROUND
============================ */

  const render =
    () => {

      current =
        pick(
          melodies
        );


      const opts = [

        current.name,

        ...melodies
        .filter(
          x =>
            x !==
            current
        )
        .map(
          x =>
            x.name
        )

      ]
      .sort(
        () =>
          Math.random() -
          .5
      );


      $('#gameBody')
      .innerHTML = `

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
              opts
              .map(
                o => `

                  <button
                    data-song="${o}"
                  >
                    ${o}
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


      $('#playSongBtn')
      .onclick =
        () =>
          playMelody(
            current
          );


      $$(
        '[data-song]'
      )
      .forEach(
        b =>
          b.onclick =
            () => {

              const ok =
                b.dataset.song ===
                current.name;


              ok

                ? (
                    score++,
                    S.correct()
                  )

                : S.wrong();


              round++;


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


                $('#gameBody')
                .innerHTML = `

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


                $('#againGuess')
                .onclick =
                  startGuessSong;
              }

              else {

                render();
              }
            }
      );
    };


  render();
}
      /* ============================
   PIANO TILES
============================ */

function startPianoTiles() {

  $('#gameBody')
  .innerHTML = `

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
          [
            'A',
            'S',
            'D',
            'F'
          ]
          .map(
            (
              k,
              i
            ) => `

              <div
                class="piano-lane"
                data-piano-lane="${i}"
              >

                <div class="lane-key">
                  ${k}
                </div>

              </div>
            `
          )
          .join('')
        }

      </div>


      <p id="ptResult">
        Press A S D F as the tiles reach the bottom.
      </p>

    </div>
  `;


  let score =
    0;


  let time =
    20;


  let tiles =
    [];


/* ============================
   SPAWN PIANO TILE
============================ */

  function spawnTile() {

    const lane =
      rand(
        0,
        3
      );


    const tile =
      document.createElement(
        'div'
      );


    tile.className =
      'piano-falling-tile';


    tile.dataset.y =
      '-70';


    tile.dataset.lane =
      lane;


    tile.style.top =
      '-70px';


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
    600
  );


/* ============================
   MOVE PIANO TILES
============================ */

  every(
    () => {

      tiles =
        tiles.filter(
          tile => {

            let y =
              Number(
                tile.dataset.y
              ) +
              9;


            tile.dataset.y =
              y;


            tile.style.top =
              y +
              'px';


            if (
              y >
              340
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


/* ============================
   PIANO TILE TIMER
============================ */

  every(
    () => {

      time--;


      $('#ptTime')
      .textContent =
        time;


      if (
        time <=
        0
      ) {

        stopActiveGame();


        const xp =
          12 +
          Math.floor(
            score /
            200
          ) *
          3;


        reward(
          xp,

          Math.floor(
            xp *
            .5
          ),

          'Piano Tiles complete!'
        );


        $('#ptResult')
        .textContent =
          `Finished! Final score: ${score}`;
      }
    },

    1000
  );


/* ============================
   PIANO TILE INPUT
============================ */

  activeKeyHandler =
    e => {

      const map = {

        a: 0,

        s: 1,

        d: 2,

        f: 3
      };


      const lane =
        map[
          e.key.toLowerCase()
        ];


      if (
        lane ===
        undefined
      ) {

        return;
      }


      const candidates =
        tiles
        .filter(
          t =>
            Number(
              t.dataset.lane
            ) ===
            lane
        )
        .sort(
          (
            a,
            b
          ) =>
            Number(
              b.dataset.y
            ) -
            Number(
              a.dataset.y
            )
        );


      const tile =
        candidates[
          0
        ];


      if (
        !tile
      ) {

        S.miss();

        return;
      }


      const y =
        Number(
          tile.dataset.y
        );


      const dist =
        Math.abs(
          300 -
          y
        );


      if (
        dist <=
        35
      ) {

        const perfect =
          dist <=
          12;


        score +=
          perfect
            ? 150
            : 100;


        perfect
          ? S.perfect()
          : S.great();


        tile.remove();


        tiles =
          tiles.filter(
            t =>
              t !==
              tile
          );


        $('#ptScore')
        .textContent =
          score;
      }

      else {

        S.miss();
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* ============================
   PERFECT PITCH
============================ */

const pitchNotes = [

  {
    name: 'C',
    frequency: 261.63
  },

  {
    name: 'D',
    frequency: 293.66
  },

  {
    name: 'E',
    frequency: 329.63
  },

  {
    name: 'F',
    frequency: 349.23
  },

  {
    name: 'G',
    frequency: 392
  },

  {
    name: 'A',
    frequency: 440
  },

  {
    name: 'B',
    frequency: 493.88
  }
];


function startPitch() {

  let round =
    0;


  let score =
    0;


  let current =
    null;


  function newRound() {

    current =
      pick(
        pitchNotes
      );


    $('#gameBody')
    .innerHTML = `

      <div class="game-panel">

        <div class="game-toolbar">

          <span class="game-stat">
            Round
            <b>
              ${round + 1}/7
            </b>
          </span>

          <span class="game-stat">
            Score
            <b>
              ${score}
            </b>
          </span>

        </div>


        <button
          id="pitchPlayBtn"
          class="btn gold"
        >
          🔊 Play Note
        </button>


        <div class="choice-grid">

          ${
            pitchNotes
            .map(
              n => `

                <button
                  data-pitch="${n.name}"
                >
                  ${n.name}
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


    $('#pitchPlayBtn')
    .onclick =
      () => {

        SoundEngine.tone(
          current.frequency,
          .5,
          'sine',
          .12
        );
      };


    $$(
      '[data-pitch]'
    )
    .forEach(
      b =>
        b.onclick =
          () => {

            const ok =
              b.dataset.pitch ===
              current.name;


            if (
              ok
            ) {

              score++;

              S.correct();
            }

            else {

              S.wrong();
            }


            round++;


            if (
              round >=
              7
            ) {

              const xp =
                10 +
                score *
                6;


              reward(
                xp,

                score *
                4,

                'Perfect Pitch complete!'
              );


              $('#gameBody')
              .innerHTML = `

                <div class="game-panel">

                  <h3>
                    ${score}/7 correct
                  </h3>

                  <button
                    id="pitchAgain"
                    class="btn gold"
                  >
                    Play Again
                  </button>

                </div>
              `;


              $('#pitchAgain')
              .onclick =
                startPitch;
            }

            else {

              newRound();
            }
          }
    );


    setTimeout(
      () =>
        SoundEngine.tone(
          current.frequency,
          .5,
          'sine',
          .12
        ),

      300
    );
  }


  newRound();
}


/* ============================
   MELODY MEMORY
============================ */

function startMemory() {

  const buttons = [

    {
      icon: '🔴',
      note: 261.63
    },

    {
      icon: '🔵',
      note: 329.63
    },

    {
      icon: '🟢',
      note: 392
    },

    {
      icon: '🟡',
      note: 523.25
    }
  ];


  let sequence =
    [];


  let input =
    [];


  let round =
    1;


  let locked =
    false;


  $('#gameBody')
  .innerHTML = `

    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Round
          <b id="memoryRound">
            1
          </b>
        </span>

      </div>


      <div
        id="memoryButtons"
        class="memory-buttons"
      >

        ${
          buttons
          .map(
            (
              b,
              i
            ) => `

              <button
                data-memory="${i}"
              >
                ${b.icon}
              </button>
            `
          )
          .join('')
        }

      </div>


      <p id="memoryStatus">
        Watch the sequence.
      </p>

    </div>
  `;


/* ============================
   FLASH MEMORY BUTTON
============================ */

  async function flash(
    index
  ) {

    const el =
      $(
        `[data-memory="${index}"]`
      );


    el.classList.add(
      'active'
    );


    SoundEngine.tone(
      buttons[
        index
      ].note,

      .2,

      'sine',

      .1
    );


    await wait(
      280
    );


    el.classList.remove(
      'active'
    );


    await wait(
      120
    );
  }


/* ============================
   PLAY MEMORY SEQUENCE
============================ */

  async function playSequence() {

    locked =
      true;


    $('#memoryStatus')
    .textContent =
      'Watch carefully...';


    await wait(
      500
    );


    for (
      const n of
      sequence
    ) {

      await flash(
        n
      );
    }


    input =
      [];


    locked =
      false;


    $('#memoryStatus')
    .textContent =
      'Your turn!';
  }


/* ============================
   START MEMORY ROUND
============================ */

  async function beginRound() {

    $('#memoryRound')
    .textContent =
      round;


    sequence.push(
      rand(
        0,
        3
      )
    );


    await playSequence();
  }


/* ============================
   MEMORY INPUT
============================ */

  $$(
    '[data-memory]'
  )
  .forEach(
    b =>
      b.onclick =
        async () => {

          if (
            locked
          ) {

            return;
          }


          const n =
            Number(
              b.dataset.memory
            );


          await flash(
            n
          );


          input.push(
            n
          );


          const index =
            input.length -
            1;


          if (
            input[
              index
            ] !==
            sequence[
              index
            ]
          ) {

            S.wrong();


            const xp =
              8 +
              (
                round -
                1
              ) *
              5;


            reward(
              xp,

              Math.max(
                2,

                round -
                1
              ) *
              3,

              'Melody Memory complete!'
            );


            $('#memoryStatus')
            .textContent =
              `Wrong note! You reached round ${round}.`;


            locked =
              true;


            return;
          }


          S.correct();


          if (
            input.length ===
            sequence.length
          ) {

            round++;


            if (
              round >
              8
            ) {

              reward(
                50,
                30,
                'Melody Memory mastered!'
              );


              $('#memoryStatus')
              .textContent =
                '🏆 Perfect memory!';


              locked =
                true;


              return;
            }


            await wait(
              700
            );


            beginRound();
          }
        }
  );


  beginRound();
}


/* ============================
   MUSIC DASH
============================ */

function startDash() {

  $('#gameBody')
  .innerHTML = `

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
        id="dashBoard"
        class="dash-board"
      >

        <div
          id="dashPlayer"
          class="dash-player"
        >
          🎸
        </div>

      </div>


      <p>
        Press
        <strong>Shift</strong>
        to jump over obstacles and collect music coins.
      </p>

    </div>
  `;


  const board =
    $('#dashBoard');


  const player =
    $('#dashPlayer');


  let jumping =
    false;


  let velocity =
    0;


  let y =
    0;


  let score =
    0;


  let time =
    25;


  let objects =
    [];


/* ============================
   DASH OBJECT SPAWN
============================ */

  function spawnDashObject() {

    const coin =
      Math.random() <
      .42;


    const el =
      document.createElement(
        'div'
      );


    el.className =
      coin
        ? 'dash-coin'
        : 'dash-obstacle';


    el.textContent =
      coin
        ? '🎵'
        : '🪨';


    el.dataset.coin =
      coin
        ? '1'
        : '0';


    el.dataset.x =
      '700';


    el.style.left =
      '700px';


    board.appendChild(
      el
    );


    objects.push(
      el
    );
  }


  every(
    spawnDashObject,
    1050
  );


/* ============================
   DASH PHYSICS
============================ */

  every(
    () => {

      if (
        jumping ||
        y >
        0
      ) {

        velocity -=
          .8;


        y +=
          velocity;


        if (
          y <=
          0
        ) {

          y =
            0;


          velocity =
            0;


          jumping =
            false;
        }


        player.style.transform =
          `translateY(${-y}px)`;
      }


      objects =
        objects.filter(
          obj => {

            let x =
              Number(
                obj.dataset.x
              ) -
              8;


            obj.dataset.x =
              x;


            obj.style.left =
              x +
              'px';


            const isCoin =
              obj.dataset.coin ===
              '1';


            if (
              x <
                105 &&
              x >
                45
            ) {

              if (
                isCoin
              ) {

                score +=
                  25;


                $('#dashScore')
                .textContent =
                  score;


                profile.coins++;


                persist();

                updateProfileUI();

                S.coin();


                obj.remove();


                return false;
              }


              else if (
                y <
                35
              ) {

                score =
                  Math.max(
                    0,

                    score -
                    40
                  );


                $('#dashScore')
                .textContent =
                  score;


                S.miss();


                obj.remove();


                return false;
              }
            }


            if (
              x <
              -60
            ) {

              if (
                !isCoin
              ) {

                score +=
                  10;


                $('#dashScore')
                .textContent =
                  score;
              }


              obj.remove();


              return false;
            }


            return true;
          }
        );
    },

    30
  );


/* ============================
   DASH TIMER
============================ */

  every(
    () => {

      time--;


      $('#dashTime')
      .textContent =
        time;


      if (
        time <=
        0
      ) {

        stopActiveGame();


        const xp =
          15 +
          Math.floor(
            score /
            100
          ) *
          4;


        reward(
          xp,

          Math.floor(
            score /
            80
          ),

          'Music Dash complete!'
        );
      }
    },

    1000
  );


/* ============================
   DASH JUMP INPUT
============================ */

  activeKeyHandler =
    e => {

      if (
        (
          e.key ===
          'Shift' ||
          e.key ===
          'ShiftLeft' ||
          e.key ===
          'ShiftRight'
        ) &&
        !jumping
      ) {

        e.preventDefault();


        jumping =
          true;


        velocity =
          11;


        S.jump();
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}
      /* ============================
   INSTRUMENT HERO
============================ */

function startInstrumentHero() {

  $('#gameBody')
  .innerHTML = `

    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Score
          <b id="heroGameScore">
            0
          </b>
        </span>

        <span class="game-stat">
          Combo
          <b id="heroGameCombo">
            0
          </b>
        </span>

        <span class="game-stat">
          Time
          <b id="heroGameTime">
            20
          </b>s
        </span>

      </div>


      <div
        id="heroBoard"
        class="hero-board"
      >

        ${
          [
            'A',
            'S',
            'D',
            'F'
          ]
          .map(
            (
              k,
              i
            ) => `

              <div
                class="hero-lane"
                data-hero-lane="${i}"
              >

                <div class="lane-key">
                  ${k}
                </div>

              </div>
            `
          )
          .join('')
        }

      </div>


      <p id="heroGameResult">
        Perform with ${profile.equipped}.
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


/* ============================
   HERO NOTE SPAWN
============================ */

  function spawnHeroNote() {

    const lane =
      rand(
        0,
        3
      );


    const note =
      document.createElement(
        'div'
      );


    note.className =
      'hero-note';


    note.dataset.lane =
      lane;


    note.dataset.y =
      '-30';


    note.style.top =
      '-30px';


    $('#heroBoard')
    .children[
      lane
    ]
    .appendChild(
      note
    );


    notes.push(
      note
    );
  }


  every(
    spawnHeroNote,
    520
  );


/* ============================
   HERO NOTE MOVEMENT
============================ */

  every(
    () => {

      notes =
        notes.filter(
          n => {

            const y =
              Number(
                n.dataset.y
              ) +
              9;


            n.dataset.y =
              y;


            n.style.top =
              y +
              'px';


            if (
              y >
              335
            ) {

              n.remove();


              combo =
                0;


              $('#heroGameCombo')
              .textContent =
                combo;


              S.miss();


              return false;
            }


            return true;
          }
        );
    },

    32
  );


/* ============================
   HERO TIMER
============================ */

  every(
    () => {

      time--;


      $('#heroGameTime')
      .textContent =
        time;


      if (
        time <=
        0
      ) {

        stopActiveGame();


        const xp =
          18 +
          Math.floor(
            score /
            250
          ) *
          4;


        reward(
          xp,

          Math.floor(
            xp *
            .55
          ),

          'Instrument Hero complete!'
        );


        addInstrumentXP(
          profile.equipped,

          Math.max(
            2,

            Math.floor(
              score /
              300
            )
          )
        );


        addMastery(
          profile.equipped,

          Math.max(
            1,

            Math.floor(
              score /
              400
            )
          )
        );


        $('#heroGameResult')
        .textContent =
          `Performance complete! Score: ${score}`;
      }
    },

    1000
  );


/* ============================
   HERO INPUT
============================ */

  activeKeyHandler =
    e => {

      const map = {

        a: 0,

        s: 1,

        d: 2,

        f: 3
      };


      const lane =
        map[
          e.key.toLowerCase()
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
          n =>
            Number(
              n.dataset.lane
            ) ===
            lane
        )
        .sort(
          (
            a,
            b
          ) =>
            Number(
              b.dataset.y
            ) -
            Number(
              a.dataset.y
            )
        );


      const n =
        candidates[
          0
        ];


      if (
        !n
      ) {

        combo =
          0;


        S.miss();


        return;
      }


      const y =
        Number(
          n.dataset.y
        );


      const dist =
        Math.abs(
          300 -
          y
        );


      if (
        dist <
        34
      ) {

        const perfect =
          dist <
          12;


        const base =
          perfect
            ? 150
            : 100;


        combo++;


        const bonus =
          Math.min(
            100,

            combo *
            3
          );


        score +=
          base +
          bonus;


        playInstrument(
          profile.equipped,

          [
            261.63,
            329.63,
            392,
            523.25
          ][
            lane
          ]
        );


        perfect
          ? S.perfect()
          : S.great();


        n.remove();


        notes =
          notes.filter(
            x =>
              x !== n
          );
      }

      else {

        combo =
          0;


        S.miss();
      }


      $('#heroGameScore')
      .textContent =
        score;


      $('#heroGameCombo')
      .textContent =
        combo;
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* ============================
   BEAT BATTLE
============================ */

function startBeatBattle() {

  $('#gameBody')
  .innerHTML = `

    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Boss HP
          <b id="beatBossHP">
            1000
          </b>
        </span>

        <span class="game-stat">
          Time
          <b id="beatBattleTime">
            25
          </b>s
        </span>

      </div>


      <div class="beat-battle-area">

        <div class="beat-boss">
          👹
        </div>


        <div
          id="beatPulse"
          class="beat-pulse"
        ></div>


        <div class="beat-target">
          HIT
        </div>

      </div>


      <p id="beatBattleStatus">
        Press
        <strong>Shift</strong>
        when the pulse reaches the target.
      </p>

    </div>
  `;


  let bossHp =
    1000;


  let time =
    25;


  let progress =
    0;


  let direction =
    1;


/* ============================
   BEAT PULSE
============================ */

  every(
    () => {

      progress +=
        direction *
        2.3;


      if (
        progress >=
        100
      ) {

        progress =
          100;


        direction =
          -1;
      }


      if (
        progress <=
        0
      ) {

        progress =
          0;


        direction =
          1;
      }


      $('#beatPulse')
      .style.left =
        progress +
        '%';
    },

    25
  );


/* ============================
   BEAT BATTLE TIMER
============================ */

  every(
    () => {

      time--;


      $('#beatBattleTime')
      .textContent =
        time;


      if (
        time <=
        0
      ) {

        stopActiveGame();


        if (
          bossHp <=
          0
        ) {

          reward(
            35,
            22,
            'Beat Boss defeated!'
          );


          addInstrumentXP(
            profile.equipped,
            6
          );
        }

        else {

          reward(
            10,
            4,
            'Beat Battle complete!'
          );


          $('#beatBattleStatus')
          .textContent =
            `Time up! Boss had ${bossHp} HP remaining.`;
        }
      }
    },

    1000
  );


/* ============================
   BEAT HIT INPUT
============================ */

  activeKeyHandler =
    e => {

      if (
        e.key !==
        'Shift'
      ) {

        return;
      }


      e.preventDefault();


      const dist =
        Math.abs(
          82 -
          progress
        );


      let damage =
        0;


      if (
        dist <=
        5
      ) {

        damage =
          100;


        S.perfect();


        $('#beatBattleStatus')
        .textContent =
          'PERFECT HIT!';
      }


      else if (
        dist <=
        12
      ) {

        damage =
          70;


        S.great();


        $('#beatBattleStatus')
        .textContent =
          'Great hit!';
      }


      else if (
        dist <=
        22
      ) {

        damage =
          40;


        S.good();


        $('#beatBattleStatus')
        .textContent =
          'Good hit.';
      }


      else {

        damage =
          10;


        S.miss();


        $('#beatBattleStatus')
        .textContent =
          'Missed the beat.';
      }


      bossHp =
        Math.max(
          0,

          bossHp -
          damage
        );


      $('#beatBossHP')
      .textContent =
        bossHp;


      playInstrument(
        profile.equipped,

        damage >=
        100

          ? 659

          : 440
      );


      if (
        bossHp <=
        0
      ) {

        stopActiveGame();


        S.victory();


        reward(
          35,
          22,
          'Beat Boss defeated!'
        );


        addInstrumentXP(
          profile.equipped,
          6
        );


        $('#beatBattleStatus')
        .textContent =
          '🏆 Boss defeated!';
      }
    };


  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* ============================
   MUSIC DUNGEON
============================ */

function startDungeon() {

  let room =
    1;


  let hp =
    100;


  let score =
    0;


/* ============================
   DUNGEON ROOM
============================ */

  function renderRoom() {

    if (
      room >
      5
    ) {

      reward(
        45,
        28,
        'Music Dungeon cleared!'
      );


      addInstrumentXP(
        profile.equipped,
        8
      );


      $('#gameBody')
      .innerHTML = `

        <div class="game-panel">

          <h3>
            🏆 Dungeon Cleared
          </h3>

          <p>
            Score: ${score}
          </p>

          <button
            id="dungeonAgain"
            class="btn gold"
          >
            Play Again
          </button>

        </div>
      `;


      $('#dungeonAgain')
      .onclick =
        startDungeon;


      return;
    }


    const enemyNames = [

      'Chord Slime',

      'Tempo Bat',

      'Bass Goblin',

      'Rhythm Knight',

      'Echo Beast'
    ];


    const enemy =
      enemyNames[
        room -
        1
      ];


    let enemyHp =
      45 +
      room *
      18;


    $('#gameBody')
    .innerHTML = `

      <div class="game-panel">

        <div class="game-toolbar">

          <span class="game-stat">
            Room
            <b>
              ${room}/5
            </b>
          </span>

          <span class="game-stat">
            HP
            <b id="dungeonHP">
              ${hp}
            </b>
          </span>

          <span class="game-stat">
            Score
            <b id="dungeonScore">
              ${score}
            </b>
          </span>

        </div>


        <div class="dungeon-room">

          <div class="dungeon-enemy">
            👾
          </div>

          <h3>
            ${enemy}
          </h3>

          <p>
            Enemy HP:
            <b id="dungeonEnemyHP">
              ${enemyHp}
            </b>
          </p>

        </div>


        <div class="choice-grid">

          <button id="dungeonAttack">
            Attack
          </button>

          <button id="dungeonSpecial">
            Special
          </button>

          <button id="dungeonHeal">
            Heal
          </button>

        </div>


        <p id="dungeonStatus">
          Choose an action.
        </p>

      </div>
    `;


    const inst =
      getUpgradedInstrument(
        profile.equipped
      );


/* ============================
   DUNGEON ENEMY TURN
============================ */

    const enemyTurn =
      () => {

        if (
          enemyHp <=
          0
        ) {

          return;
        }


        const damage =
          Math.max(
            3,

            8 +
            room *
            2 -
            Math.floor(
              inst.defense *
              .035
            )
          );


        hp =
          Math.max(
            0,

            hp -
            damage
          );


        $('#dungeonHP')
        .textContent =
          hp;


        if (
          hp <=
          0
        ) {

          S.defeat();


          reward(
            6,
            2,
            'Dungeon run ended.'
          );


          $('#gameBody')
          .innerHTML = `

            <div class="game-panel">

              <h3>
                Defeated in Room ${room}
              </h3>

              <p>
                Score: ${score}
              </p>

              <button
                id="dungeonAgain"
                class="btn gold"
              >
                Try Again
              </button>

            </div>
          `;


          $('#dungeonAgain')
          .onclick =
            startDungeon;
        }
      };


/* ============================
   DUNGEON DAMAGE
============================ */

    const hit =
      special => {

        const damage =
          Math.round(
            (
              inst.attack *
              .20 +
              rand(
                5,
                12
              )
            ) *
            (
              special
                ? 1.55
                : 1
            )
          );


        enemyHp =
          Math.max(
            0,

            enemyHp -
            damage
          );


        $('#dungeonEnemyHP')
        .textContent =
          enemyHp;


        score +=
          damage;


        $('#dungeonScore')
        .textContent =
          score;


        playInstrument(
          profile.equipped,

          special
            ? 659
            : 440
        );


        special
          ? S.ultimate()
          : S.attack();


        if (
          enemyHp <=
          0
        ) {

          S.victory();


          score +=
            50;


          room++;


          setTimeout(
            renderRoom,
            500
          );


          return;
        }


        enemyTurn();
      };


/* ============================
   DUNGEON BUTTONS
============================ */

    $('#dungeonAttack')
    .onclick =
      () =>
        hit(
          false
        );


    $('#dungeonSpecial')
    .onclick =
      () =>
        hit(
          true
        );


    $('#dungeonHeal')
    .onclick =
      () => {

        const heal =
          Math.round(
            10 +
            inst.melody *
            .12
          );


        hp =
          Math.min(
            100,

            hp +
            heal
          );


        $('#dungeonHP')
        .textContent =
          hp;


        S.heal();


        $('#dungeonStatus')
        .textContent =
          `Recovered ${heal} HP.`;


        enemyTurn();
      };
  }


  renderRoom();
}


/* ============================
   GACHA SYSTEM
============================ */

const gachaPools = {

  accessory: {

    cost: 100,

    items: {

      Common: [
        'Silver Pin',
        'Music Wristband',
        'Simple Chain'
      ],

      Uncommon: [
        'Rhythm Ring',
        'Treble Bracelet',
        'Beat Necklace'
      ],

      Rare: [
        'Crystal Headphones',
        'Echo Pendant',
        'Tempo Crown'
      ],

      Epic: [
        'Celestial Headphones',
        'Golden Microphone',
        'Symphony Halo'
      ],

      Legendary: [
        'Dragon Headset',
        'Royal Conductor Crown'
      ],

      Mythic: [
        'Infinity Music Crown'
      ]
    }
  },


  pet: {

    cost: 200,

    items: {

      Common: [
        'Music Bunny',
        'Mole Beat',
        'Rock Pup'
      ],

      Uncommon: [
        'Shadow Bat',
        'Gear Fox',
        'Echo Spider'
      ],

      Rare: [
        'Gold Chick',
        'Crystal Fox'
      ],

      Epic: [
        'Diamond Dragon',
        'Obsidian Wolf'
      ],

      Legendary: [
        'Relic Guardian',
        'Lava Dragon'
      ],

      Mythic: [
        'Star Phoenix',
        'Harmony Dragon'
      ]
    }
  },


  aura: {

    cost: 175,

    items: {

      Common: [
        'Blue Notes',
        'Warm Glow'
      ],

      Uncommon: [
        'Rhythm Sparks',
        'Echo Mist'
      ],

      Rare: [
        'Crystal Aura',
        'Electric Notes'
      ],

      Epic: [
        'Dragon Flame',
        'Celestial Glow'
      ],

      Legendary: [
        'Galaxy Aura'
      ],

      Mythic: [
        'Infinity Symphony'
      ]
    }
  },


  skin: {

    cost: 150,

    items: {

      Common: [
        'Street Performer',
        'Music Student'
      ],

      Uncommon: [
        'Jazz Artist',
        'Rock Performer'
      ],

      Rare: [
        'Concert Star',
        'Royal Musician'
      ],

      Epic: [
        'Cyber Maestro',
        'Crystal Virtuoso'
      ],

      Legendary: [
        'Celestial Composer'
      ],

      Mythic: [
        'MusicVerse Legend'
      ]
    }
  }
};


/* ============================
   GACHA RARITY
============================ */

function rollRarity() {

  const r =
    Math.random();


  if (
    r <
    .005
  ) {

    return 'Mythic';
  }


  if (
    r <
    .03
  ) {

    return 'Legendary';
  }


  if (
    r <
    .11
  ) {

    return 'Epic';
  }


  if (
    r <
    .27
  ) {

    return 'Rare';
  }


  if (
    r <
    .55
  ) {

    return 'Uncommon';
  }


  return 'Common';
}


/* ============================
   GACHA DUST VALUES
============================ */

function duplicateDust(
  rarity
) {

  if (
    rarity ===
    'Mythic'
  ) {

    return 80;
  }


  if (
    rarity ===
    'Legendary'
  ) {

    return 40;
  }


  return 10;
}


/* ============================
   SINGLE GACHA ROLL
============================ */

function doGachaRoll(
  type
) {

  const pool =
    gachaPools[
      type
    ];


  const rarity =
    rollRarity();


  const item =
    pick(
      pool.items[
        rarity
      ]
    );


  const existing =
    profile.inventory.find(
      x =>
        x.name ===
        item &&
        x.type ===
        type
    );


  if (
    existing
  ) {

    const d =
      duplicateDust(
        rarity
      );


    profile.dust +=
      d;


    return {

      item,

      rarity,

      duplicate: true,

      dust: d
    };
  }


  profile.inventory.push({

    name:
      item,

    type,

    rarity
  });


  if (
    type ===
    'pet'
  ) {

    const alreadyPet =
      profile.pets.find(
        p =>
          p.name ===
          item
      );


    if (
      alreadyPet
    ) {

      const d =
        duplicateDust(
          rarity
        );


      profile.dust +=
        d;


      return {

        item,

        rarity,

        duplicate: true,

        dust: d
      };
    }


    profile.pets.push({

      id:
        `gacha-pet-${Date.now()}-${Math.random()}`,

      name:
        item,

      level:
        1,

      xp:
        0,

      type:
        petTypes[
          item
        ] ||
        'all',

      source:
        'Gacha'
    });
  }


  return {

    item,

    rarity,

    duplicate: false,

    dust: 0
  };
}


/* ============================
   GACHA ROLL
============================ */

function rollGacha(
  type,
  ten = false
) {

  const pool =
    gachaPools[
      type
    ];


  if (
    !pool
  ) {

    return;
  }


  const count =
    ten
      ? 10
      : 1;


  const cost =
    ten
      ? pool.cost *
        9

      : pool.cost;


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


  for (
    let i = 0;
    i <
    count;
    i++
  ) {

    results.push(
      doGachaRoll(
        type
      )
    );
  }


  persist();

  updateProfileUI();

  updateGachaUI();

  renderInventory();

  renderPets();

  S.gacha();


  $('#gachaResult')
  .innerHTML =
    results
    .map(
      r => `

        <div
          class="
            gacha-result-item
            rarity-${r.rarity.toLowerCase()}
          "
        >

          <strong>
            ${r.rarity}
          </strong>

          <span>
            ${r.item}
          </span>

          ${
            r.duplicate

              ? `<small>Duplicate • +${r.dust} Dust</small>`

              : '<small>NEW!</small>'
          }

        </div>
      `
    )
    .join('');
}


/* ============================
   GACHA UI
============================ */

function updateGachaUI() {

  const el =
    $('#gachaPools');


  if (
    !el
  ) {

    return;
  }


  el.innerHTML =
    Object.entries(
      gachaPools
    )
    .map(
      (
        [
          type,
          pool
        ]
      ) => `

        <div class="gacha-pool">

          <h3>
            ${
              type
              .charAt(
                0
              )
              .toUpperCase() +
              type.slice(
                1
              )
            }
            Gacha
          </h3>

          <p>
            Single: ${pool.cost} Coins
          </p>

          <p>
            x10: ${pool.cost * 9} Coins
          </p>

          <div class="gacha-buttons">

            <button
              class="btn gold"
              data-gacha="${type}"
              data-ten="0"
            >
              Pull x1
            </button>

            <button
              class="btn ghost"
              data-gacha="${type}"
              data-ten="1"
            >
              Pull x10
            </button>

          </div>

        </div>
      `
    )
    .join('');


  $$(
    '[data-gacha]'
  )
  .forEach(
    b =>
      b.onclick =
        () =>
          rollGacha(
            b.dataset.gacha,

            b.dataset.ten ===
            '1'
          )
  );


  $('#gachaCoins')
  .textContent =
    profile.coins;


  $('#gachaDust')
  .textContent =
    profile.dust;
}


/* ============================
   INVENTORY
============================ */

function renderInventory() {

  const el =
    $('#inventoryGrid');


  if (
    !el
  ) {

    return;
  }


  if (
    !profile.inventory.length
  ) {

    el.innerHTML =
      '<p class="muted">No gacha items yet.</p>';


    return;
  }


  el.innerHTML =
    profile.inventory
    .map(
      item => `

        <div
          class="
            inventory-item
            rarity-${item.rarity.toLowerCase()}
          "
        >

          <strong>
            ${item.name}
          </strong>

          <span>
            ${item.type}
          </span>

          <small>
            ${item.rarity}
          </small>

        </div>
      `
    )
    .join('');
}


/* ============================
   MUSICCRAFT
============================ */

const craftLayers = [

  {
    name: 'Grasslands',
    block: 'Grass',
    icon: '🌱',
    value: 2
  },

  {
    name: 'Dirt Depths',
    block: 'Dirt',
    icon: '🟫',
    value: 3
  },

  {
    name: 'Stone Caverns',
    block: 'Stone',
    icon: '🪨',
    value: 5
  },

  {
    name: 'Copper Tunnels',
    block: 'Copper',
    icon: '🟠',
    value: 7
  },

  {
    name: 'Iron Depths',
    block: 'Iron',
    icon: '⚙️',
    value: 9
  },

  {
    name: 'Crystal Caves',
    block: 'Crystal',
    icon: '💎',
    value: 12
  },

  {
    name: 'Gold Depths',
    block: 'Gold',
    icon: '🪙',
    value: 16
  },

  {
    name: 'Diamond Depths',
    block: 'Diamond',
    icon: '🔷',
    value: 22
  },

  {
    name: 'Obsidian Realm',
    block: 'Obsidian',
    icon: '⬛',
    value: 28
  },

  {
    name: 'Ancient Ruins',
    block: 'Relic',
    icon: '🏺',
    value: 34
  },

  {
    name: 'Magma Depths',
    block: 'Magma',
    icon: '🌋',
    value: 40
  },

  {
    name: 'Echo Depths',
    block: 'Echo',
    icon: '🎶',
    value: 48
  },

  {
    name: 'Celestial Depths',
    block: 'Celestial',
    icon: '✨',
    value: 60
  },

  {
    name: 'Void Depths',
    block: 'Void',
    icon: '🌌',
    value: 75
  },

  {
    name: 'Core of MusicVerse',
    block: 'CoreShard',
    icon: '🎼',
    value: 100
  }
];

/* ============================
   MUSICCRAFT SETTINGS
============================ */

const craftCanvas =
  $('#craftCanvas');


const craftCtx =
  craftCanvas
    ? craftCanvas.getContext(
        '2d'
      )
    : null;


const craftCols =
  10;


const craftRows =
  7;


const craftBlockSize =
  52;


/* ============================
   CRAFT BLOCK WEIGHTS
============================ */

function getCraftBlockPool(
  layer
) {

  const main =
    craftLayers[
      layer
    ];


  const previous =
    craftLayers[
      Math.max(
        0,
        layer - 1
      )
    ];


  const deeper =
    craftLayers[
      Math.min(
        craftLayers.length - 1,
        layer + 1
      )
    ];


  const pool =
    [];


  for (
    let i = 0;
    i < 7;
    i++
  ) {

    pool.push(
      main
    );
  }


  for (
    let i = 0;
    i < 2;
    i++
  ) {

    pool.push(
      previous
    );
  }


  if (
    deeper !==
    main
  ) {

    pool.push(
      deeper
    );
  }


  return pool;
}


/* ============================
   CREATE MUSICCRAFT BLOCK
============================ */

function makeCraftBlock(
  x,
  y
) {

  const layer =
    craftWorld.layer;


  const pool =
    getCraftBlockPool(
      layer
    );


  const data =
    pick(
      pool
    );


  return {

    x,

    y,

    block:
      data.block,

    icon:
      data.icon,

    value:
      data.value,

    mined:
      false,

    special:
      false
  };
}


/* ============================
   GENERATE NEW WORLD
============================ */

function newCraftWorld() {

  craftWorld.blocks =
    [];


  craftWorld.mined =
    0;


  for (
    let y = 0;
    y <
    craftRows;
    y++
  ) {

    for (
      let x = 0;
      x <
      craftCols;
      x++
    ) {

      craftWorld.blocks.push(
        makeCraftBlock(
          x,
          y
        )
      );
    }
  }


  /* RARE SPECIAL BLOCK */

  if (
    craftWorld.layer >=
      3 &&
    Math.random() <
      .45
  ) {

    const b =
      pick(
        craftWorld.blocks
      );


    b.special =
      true;


    b.block =
      'Treasure';


    b.icon =
      '🎁';


    b.value +=
      20;
  }


  /* CORE SHARD AT FINAL LAYER */

  if (
    craftWorld.layer ===
    craftLayers.length -
    1
  ) {

    const b =
      pick(
        craftWorld.blocks
      );


    b.block =
      'CoreShard';


    b.icon =
      '🎼';


    b.value =
      100;


    b.special =
      true;
  }


  renderCraftWorld();

  renderCraftMission();

  updateCraftUI();
}


/* ============================
   MUSICCRAFT COLORS
============================ */

function craftBlockColor(
  block
) {

  const colors = {

    Grass:
      '#58a55c',

    Dirt:
      '#8d5f3c',

    Stone:
      '#6f737b',

    Copper:
      '#b56d43',

    Iron:
      '#8c939c',

    Crystal:
      '#6fc6e8',

    Gold:
      '#d5b348',

    Diamond:
      '#72dbe5',

    Obsidian:
      '#3d3558',

    Relic:
      '#a47b55',

    Magma:
      '#c45337',

    Echo:
      '#7268bb',

    Celestial:
      '#87a9d9',

    Void:
      '#2e2447',

    CoreShard:
      '#e2c45b',

    Treasure:
      '#d88f45'
  };


  return (
    colors[
      block
    ] ||
    '#777'
  );
}


/* ============================
   DRAW MUSICCRAFT BLOCK
============================ */

function drawCraftBlock(
  b
) {

  if (
    !craftCtx ||
    b.mined
  ) {

    return;
  }


  const px =
    b.x *
    craftBlockSize;


  const py =
    b.y *
    craftBlockSize;


  craftCtx.fillStyle =
    craftBlockColor(
      b.block
    );


  craftCtx.fillRect(

    px + 2,

    py + 2,

    craftBlockSize - 4,

    craftBlockSize - 4
  );


  craftCtx.fillStyle =
    'rgba(255,255,255,.12)';


  craftCtx.fillRect(

    px + 5,

    py + 5,

    craftBlockSize - 10,

    7
  );


  craftCtx.fillStyle =
    'rgba(0,0,0,.16)';


  craftCtx.fillRect(

    px + 4,

    py +
    craftBlockSize -
    10,

    craftBlockSize - 8,

    5
  );


  craftCtx.font =
    '26px sans-serif';


  craftCtx.textAlign =
    'center';


  craftCtx.textBaseline =
    'middle';


  craftCtx.fillStyle =
    '#fff';


  craftCtx.fillText(

    b.icon,

    px +
    craftBlockSize /
    2,

    py +
    craftBlockSize /
    2
  );
}


/* ============================
   RENDER MUSICCRAFT WORLD
============================ */

function renderCraftWorld() {

  if (
    !craftCtx
  ) {

    return;
  }


  craftCanvas.width =
    craftCols *
    craftBlockSize;


  craftCanvas.height =
    craftRows *
    craftBlockSize;


  craftCtx.clearRect(

    0,

    0,

    craftCanvas.width,

    craftCanvas.height
  );


  craftCtx.fillStyle =
    '#10141d';


  craftCtx.fillRect(

    0,

    0,

    craftCanvas.width,

    craftCanvas.height
  );


  craftWorld.blocks
  .forEach(
    drawCraftBlock
  );


  if (
    craftWorld.blocks.every(
      b =>
        b.mined
    )
  ) {

    craftCtx.fillStyle =
      'rgba(0,0,0,.68)';


    craftCtx.fillRect(

      0,

      0,

      craftCanvas.width,

      craftCanvas.height
    );


    craftCtx.fillStyle =
      '#fff';


    craftCtx.font =
      'bold 24px sans-serif';


    craftCtx.textAlign =
      'center';


    craftCtx.fillText(

      'LAYER CLEARED',

      craftCanvas.width /
      2,

      craftCanvas.height /
      2 -
      16
    );


    craftCtx.font =
      '15px sans-serif';


    craftCtx.fillText(

      'Descend to continue mining',

      craftCanvas.width /
      2,

      craftCanvas.height /
      2 +
      18
    );
  }
}


/* ============================
   MATERIAL STORAGE
============================ */

function addCraftMaterial(
  name,
  amount = 1
) {

  profile.materials[
    name
  ] =
    (
      profile.materials[
        name
      ] ||
      0
    ) +
    amount;
}


/* ============================
   FIND PET EGG
============================ */

function maybeFindCraftEgg() {

  const layer =
    craftWorld.layer;


  let chance =
    .015;


  if (
    layer >=
    5
  ) {

    chance +=
      .015;
  }


  if (
    layer >=
    10
  ) {

    chance +=
      .02;
  }


  if (
    Math.random() >
    chance
  ) {

    return;
  }


  const pools = [

    {
      egg:
        'Meadow Egg',

      icon:
        '🌱',

      pet:
        'Music Bunny'
    },

    {
      egg:
        'Cave Egg',

      icon:
        '🪨',

      pet:
        'Mole Beat'
    },

    {
      egg:
        'Stone Egg',

      icon:
        '🐾',

      pet:
        'Rock Pup'
    },

    {
      egg:
        'Shadow Egg',

      icon:
        '🌑',

      pet:
        'Shadow Bat'
    },

    {
      egg:
        'Gear Egg',

      icon:
        '⚙️',

      pet:
        'Gear Fox'
    },

    {
      egg:
        'Echo Egg',

      icon:
        '🎶',

      pet:
        'Echo Spider'
    },

    {
      egg:
        'Golden Egg',

      icon:
        '🪙',

      pet:
        'Gold Chick'
    },

    {
      egg:
        'Crystal Egg',

      icon:
        '💎',

      pet:
        'Crystal Fox'
    },

    {
      egg:
        'Diamond Egg',

      icon:
        '🔷',

      pet:
        'Diamond Dragon'
    },

    {
      egg:
        'Obsidian Egg',

      icon:
        '⬛',

      pet:
        'Obsidian Wolf'
    },

    {
      egg:
        'Relic Egg',

      icon:
        '🏺',

      pet:
        'Relic Guardian'
    },

    {
      egg:
        'Lava Egg',

      icon:
        '🌋',

      pet:
        'Lava Dragon'
    },

    {
      egg:
        'Echo Spirit Egg',

      icon:
        '✨',

      pet:
        'Echo Spirit'
    },

    {
      egg:
        'Celestial Egg',

      icon:
        '🌟',

      pet:
        'Star Phoenix'
    },

    {
      egg:
        'Harmony Egg',

      icon:
        '🎼',

      pet:
        'Harmony Dragon'
    }
  ];


  const data =
    pools[
      Math.min(
        pools.length -
        1,

        layer
      )
    ];


  profile.petEggs.push({

    id:
      `craft-egg-${Date.now()}-${Math.random()}`,

    ...data,

    layer:
      craftLayers[
        layer
      ].name,

    hatched:
      false
  });


  persist();

  renderCraftEggs();


  S.treasure();


  toast(
    `${data.icon} You found a ${data.egg}!`
  );
}


/* ============================
   MINE MUSICCRAFT BLOCK
============================ */

function mineCraftBlock(
  b
) {

  if (
    !b ||
    b.mined
  ) {

    return;
  }


  b.mined =
    true;


  craftWorld.mined++;


  const coin =
    Math.max(

      0,

      Math.floor(
        b.value *
        .15
      )
    );


  const xp =
    b.value >=
    12

      ? Math.max(

          1,

          Math.floor(
            b.value *
            .08
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


  addCraftMaterial(

    b.block,

    1
  );


  /* CORE SHARD BONUS */

  if (
    b.block ===
    'CoreShard'
  ) {

    profile.coins +=
      25;


    addXP(
      15
    );


    S.ultimate();


    toast(
      '🎼 Core Shard! +25 Coins +15 EXP'
    );
  }


  /* TREASURE BONUS */

  else if (
    b.block ===
    'Treasure'
  ) {

    const bonus =
      rand(
        8,
        20
      );


    profile.coins +=
      bonus;


    S.treasure();


    toast(
      `🎁 Mining treasure! +${bonus} Coins`
    );
  }


  else {

    S.mine();
  }


  maybeFindCraftEgg();


  progressQuest(
    'mine',
    1
  );


  profile.craftBlocksMined =
    (
      profile.craftBlocksMined ||
      0
    ) +
    1;


  persist();

  updateProfileUI();

  renderCraftWorld();

  renderCraftMission();

  updateCraftUI();
}


/* ============================
   CRAFT CANVAS CLICK
============================ */

if (
  craftCanvas
) {

  craftCanvas.onclick =
    e => {

      const rect =
        craftCanvas
        .getBoundingClientRect();


      const scaleX =
        craftCanvas.width /
        rect.width;


      const scaleY =
        craftCanvas.height /
        rect.height;


      const mx =
        (
          e.clientX -
          rect.left
        ) *
        scaleX;


      const my =
        (
          e.clientY -
          rect.top
        ) *
        scaleY;


      const x =
        Math.floor(
          mx /
          craftBlockSize
        );


      const y =
        Math.floor(
          my /
          craftBlockSize
        );


      const b =
        craftWorld.blocks
        .find(
          q =>
            q.x ===
            x &&
            q.y ===
            y
        );


      mineCraftBlock(
        b
      );
    };
}


/* ============================
   CRAFT LAYER PROGRESS
============================ */

function updateCraftUI() {

  const layer =
    craftLayers[
      craftWorld.layer
    ];


  const mined =
    craftWorld.mined;


  const total =
    craftCols *
    craftRows;


  if (
    $('#craftLayerName')
  ) {

    $('#craftLayerName')
    .textContent =
      layer.name;
  }


  if (
    $('#craftDepthText')
  ) {

    $('#craftDepthText')
    .textContent =
      `Depth ${craftWorld.layer + 1} / ${craftLayers.length}`;
  }


  if (
    $('#craftBlocksText')
  ) {

    $('#craftBlocksText')
    .textContent =
      `${mined} / ${total}`;
  }


  if (
    $('#craftProgressFill')
  ) {

    $('#craftProgressFill')
    .style.width =
      `${
        mined /
        total *
        100
      }%`;
  }


  const descend =
    $('#craftDescendBtn');


  if (
    descend
  ) {

    const clear =
      craftWorld.blocks.length &&
      craftWorld.blocks.every(
        b =>
          b.mined
      );


    descend.disabled =
      !clear;


    descend.textContent =
      craftWorld.layer >=
      craftLayers.length -
      1

        ? 'REBUILD CORE'

        : 'DESCEND';
  }


  renderCraftMaterials();
}


/* ============================
   DESCEND TO NEXT LAYER
============================ */

function descendCraftLayer() {

  if (
    !craftWorld.blocks.length ||
    !craftWorld.blocks.every(
      b =>
        b.mined
    )
  ) {

    return toast(
      'Mine every block first.'
    );
  }


  if (
    craftWorld.layer <
    craftLayers.length -
    1
  ) {

    craftWorld.layer++;


    S.level();


    toast(
      `⛏️ Descended to ${craftLayers[craftWorld.layer].name}!`
    );
  }

  else {

    craftWorld.layer =
      0;


    S.ultimate();


    reward(
      25,
      20,
      'MusicVerse Core completed!'
    );


    toast(
      '🎼 You reached the Core of MusicVerse!'
    );
  }


  newCraftWorld();
}


if (
  $('#craftDescendBtn')
) {

  $('#craftDescendBtn')
  .onclick =
    descendCraftLayer;
}


/* ============================
   MUSICCRAFT MATERIALS
============================ */

function renderCraftMaterials() {

  const el =
    $('#craftMaterials');


  if (
    !el
  ) {

    return;
  }


  const mats =
    Object.entries(
      profile.materials ||
      {}
    )
    .filter(
      (
        [
          _,
          amount
        ]
      ) =>
        amount >
        0
    );


  if (
    !mats.length
  ) {

    el.innerHTML =
      '<p class="muted">Mine blocks to collect materials.</p>';


    return;
  }


  el.innerHTML =
    mats
    .map(
      (
        [
          name,
          amount
        ]
      ) => {

        const layer =
          craftLayers.find(
            l =>
              l.block ===
              name
          );


        return `

          <div class="craft-material">

            <span>
              ${
                layer
                  ? layer.icon
                  : name ===
                    'Treasure'
                    ? '🎁'
                    : '📦'
              }
            </span>

            <strong>
              ${name}
            </strong>

            <b>
              ${amount}
            </b>

          </div>
        `;
      }
    )
    .join('');
}


/* ============================
   CRAFT PET EGGS
============================ */

function renderCraftEggs() {

  const el =
    $('#craftEggs');


  if (
    !el
  ) {

    return;
  }


  const eggs =
    profile.petEggs.filter(
      e =>
        !e.hatched
    );


  if (
    !eggs.length
  ) {

    el.innerHTML =
      '<p class="muted">No unhatched eggs yet.</p>';


    return;
  }


  el.innerHTML =
    eggs
    .map(
      egg => `

        <div class="craft-egg">

          <span class="egg-icon">
            ${egg.icon}
          </span>

          <div>

            <strong>
              ${egg.egg}
            </strong>

            <small>
              Found in ${egg.layer}
            </small>

          </div>

          <button
            class="btn small gold"
            data-hatch="${egg.id}"
          >
            Hatch
          </button>

        </div>
      `
    )
    .join('');


  $$(
    '[data-hatch]'
  )
  .forEach(
    b =>
      b.onclick =
        () =>
          hatchCraftEgg(
            b.dataset.hatch
          )
  );
}


/* ============================
   MUSICCRAFT MISSIONS
============================ */

const craftMissions = [

  {
    goal: 10,
    label: 'Mine 10 blocks'
  },

  {
    goal: 25,
    label: 'Mine 25 blocks'
  },

  {
    goal: 40,
    label: 'Mine 40 blocks'
  },

  {
    goal: 60,
    label: 'Mine 60 blocks'
  },

  {
    goal: 70,
    label: 'Clear the layer'
  }
];


/* ============================
   RENDER CRAFT MISSION
============================ */

function renderCraftMission() {

  const el =
    $('#craftMission');


  if (
    !el
  ) {

    return;
  }


  const mission =
    craftMissions[
      Math.min(
        craftMissions.length -
        1,

        craftWorld.mission
      )
    ];


  const progress =
    Math.min(
      craftWorld.mined,

      mission.goal
    );


  const done =
    progress >=
    mission.goal;


  el.innerHTML = `

    <div class="craft-mission-card">

      <strong>
        ⛏️ Mining Mission
      </strong>

      <span>
        ${mission.label}
      </span>

      <div class="quest-progress">
        <i
          style="
            width:${
              progress /
              mission.goal *
              100
            }%
          "
        ></i>
      </div>

      <small>
        ${progress}/${mission.goal}
      </small>

      ${
        done

          ? `

            <button
              id="claimCraftMission"
              class="btn gold small"
            >
              Claim +8 EXP +5 Coins
            </button>
          `

          : ''
      }

    </div>
  `;


  if (
    done
  ) {

    $('#claimCraftMission')
    .onclick =
      () => {

        reward(
          8,
          5,
          'Mining mission complete!'
        );


        craftWorld.mission =
          (
            craftWorld.mission +
            1
          ) %
          craftMissions.length;


        renderCraftMission();
      };
  }
}


/* ============================
   MUSICCRAFT REFRESH BUTTON
============================ */

if (
  $('#craftRefreshBtn')
) {

  $('#craftRefreshBtn')
  .onclick =
    () => {

      newCraftWorld();


      toast(
        '⛏️ Mining area regenerated.'
      );
    };
}
      /* ============================
   LEADERBOARD
============================ */

function renderLeaderboard() {

  const bots =
    Array.from(
      {
        length: 99
      },

      (
        _,
        i
      ) => ({

        name:
          `${pick(botNames)}${i + 1}`,

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


  bots.push({

    name:
      profile.name ||
      'You',

    level:
      profile.level,

    xp:
      profile.totalXp,

    you:
      true
  });


  bots.sort(
    (
      a,
      b
    ) =>
      b.xp -
      a.xp
  );


  const rank =
    bots.findIndex(
      x =>
        x.you
    ) +
    1;


  $('#yourRank')
  .textContent =
    '#' +
    rank;


/* ============================
   TOP 3 PODIUM
============================ */

  $('#podium')
  .innerHTML =
    bots
    .slice(
      0,
      3
    )
    .map(
      (
        x,
        i
      ) => `

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
            ${x.name}
          </b>

          <small>
            ${x.xp.toLocaleString()} EXP
          </small>

        </div>
      `
    )
    .join('');


/* ============================
   FULL LEADERBOARD TABLE
============================ */

  $('#leaderboardBody')
  .innerHTML =
    bots
    .map(
      (
        x,
        i
      ) => `

        <tr
          ${
            x.you
              ? 'style="background:#12263c"'
              : ''
          }
        >

          <td>
            #${i + 1}
          </td>


          <td>

            ${
              x.you
                ? '⭐ '
                : ''
            }

            ${x.name}

          </td>


          <td>
            ${x.level}
          </td>


          <td>
            ${x.xp.toLocaleString()}
          </td>

        </tr>
      `
    )
    .join('');
}


/* ============================
   MUSIC QUIZ
============================ */

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


/* ============================
   RENDER QUIZ
============================ */

function renderQuiz() {

  const q =
    quizQs[
      quizIndex
    ];


  $('#quizScore')
  .textContent =
    quizScore;


  $('#quizCard')
  .innerHTML = `

    <span class="eyebrow">
      QUESTION ${quizIndex + 1}/${quizQs.length}
    </span>


    <h3>
      ${q[0]}
    </h3>


    <div class="quiz-options">

      ${
        q[1]
        .map(
          (
            a,
            i
          ) => `

            <button
              data-quiz="${i}"
            >
              ${a}
            </button>
          `
        )
        .join('')
      }

    </div>
  `;


/* ============================
   QUIZ ANSWERS
============================ */

  $$(
    '[data-quiz]'
  )
  .forEach(
    b =>
      b.onclick =
        () => {

          const i =
            +b.dataset.quiz;


          const ok =
            i ===
            q[2];


          $$(
            '[data-quiz]'
          )
          .forEach(
            x =>
              x.disabled =
                true
          );


          b.classList.add(
            ok
              ? 'correct'
              : 'wrong'
          );


/* ============================
   CORRECT QUIZ ANSWER
============================ */

          if (
            ok
          ) {

            quizScore++;


            addXP(
              2
            );


            profile.coins +=
              1;


            persist();

            updateProfileUI();

            S.correct();
          }


/* ============================
   WRONG QUIZ ANSWER
============================ */

          else {

            S.wrong();
          }


/* ============================
   NEXT QUIZ QUESTION
============================ */

          setTimeout(
            () => {

              quizIndex++;


              if (
                quizIndex >=
                quizQs.length
              ) {

                $('#quizCard')
                .innerHTML = `

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


                $('#quizRestart')
                .onclick =
                  () => {

                    quizIndex =
                      0;


                    quizScore =
                      0;


                    renderQuiz();
                  };
              }

              else {

                renderQuiz();
              }
            },

            650
          );
        }
  );
}


/* ============================
   START MUSICVERSE
============================ */


/* PROFILE */

setupProfile();


updateProfileUI();


/* DAILY REWARDS */

renderDailyRewards();


/* INSTRUMENT COLLECTION */

renderFamilies();


renderInstruments();


/* SOLO BATTLE */

refreshBattle(
  true
);


/* TEAM BATTLE */

openLobby(
  10
);


/* ARCADE */

renderGameCards();


/* GACHA */

updateGachaUI();


renderInventory();


/* MUSICCRAFT */

newCraftWorld();


/* LEADERBOARD */

renderLeaderboard();


/* QUIZ */

renderQuiz();


/* QUESTS */

ensureQuests();


renderQuests();


/* EQUIPMENT */

renderEquipment();


/* PETS */

renderPets();


/* INSTRUMENT EVOLUTION */

renderEvolutionPanel();


/* INSTRUMENT WORKSHOP */

renderInstrumentUpgradePanel();


/* SKILL TREE */

renderSkillTree();


/* ADVENTURE RPG */

setupRpg();


/* DAILY REWARD BUTTON */

$('#claimDailyBtn')
.onclick =
  claimDailyReward;
let craftWorld = {

  layer: 0,

  blocks: [],

  mined: 0,

  mission: 0
};
      

      if (
        e.key ===
        'Enter'
      ) {

        $('#startBtn')
        .click();
      }
    }
  );
}
