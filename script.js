const $ =
  selector =>
    document.querySelector(
      selector
    );


const $$ =
  selector =>
    [
      ...document.querySelectorAll(
        selector
      )
    ];


const rand =
  (
    min,
    max
  ) =>
    Math.floor(
      Math.random() *
      (
        max -
        min +
        1
      )
    ) +
    min;


const pick =
  array =>
    array[
      Math.floor(
        Math.random() *
        array.length
      )
    ];


const clamp =
  (
    number,
    min,
    max
  ) =>
    Math.max(
      min,
      Math.min(
        max,
        number
      )
    );


const wait =
  milliseconds =>
    new Promise(
      resolve =>
        setTimeout(
          resolve,
          milliseconds
        )
    );


function save(
  key,
  value
){

  localStorage.setItem(
    key,
    JSON.stringify(
      value
    )
  );

}


function load(
  key,
  fallback
){

  try{

    const value =
      localStorage.getItem(
        key
      );


    return value
      ?JSON.parse(value)
      :fallback;

  }catch{

    return fallback;

  }

}


/* =========================================================
   SOUND ENGINE
========================================================= */

const SoundEngine = {

  context:null,

  master:null,

  sfxVolume:.6,

  enabled:true,


  init(){

    if(
      this.context
    )
      return;


    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;


    if(
      !AudioContext
    )
      return;


    this.context =
      new AudioContext();


    this.master =
      this.context.createGain();


    this.master.gain.value =
      .7;


    this.master.connect(
      this.context.destination
    );

  },


  resume(){

    this.init();


    if(
      this.context &&
      this.context.state ===
      "suspended"
    ){

      this.context.resume();

    }

  },


  tone(
    frequency=440,
    duration=.15,
    type="sine",
    volume=.18,
    delay=0
  ){

    if(
      !this.enabled
    )
      return;


    this.resume();


    if(
      !this.context
    )
      return;


    const now =
      this.context.currentTime +
      delay;


    const oscillator =
      this.context.createOscillator();


    const gain =
      this.context.createGain();


    oscillator.type =
      type;


    oscillator.frequency
      .setValueAtTime(
        frequency,
        now
      );


    gain.gain
      .setValueAtTime(
        .0001,
        now
      );


    gain.gain
      .exponentialRampToValueAtTime(
        Math.max(
          .001,
          volume *
          this.sfxVolume
        ),
        now + .015
      );


    gain.gain
      .exponentialRampToValueAtTime(
        .0001,
        now + duration
      );


    oscillator.connect(
      gain
    );


    gain.connect(
      this.master
    );


    oscillator.start(
      now
    );


    oscillator.stop(
      now +
      duration +
      .04
    );

  },


  chord(
    notes,
    duration=.3,
    type="sine",
    volume=.12
  ){

    notes.forEach(
      (
        note,
        index
      ) => {

        this.tone(
          note,
          duration,
          type,
          volume,
          index * .025
        );

      }
    );

  },


  noise(
    duration=.15,
    volume=.12
  ){

    if(
      !this.enabled
    )
      return;


    this.resume();


    const context =
      this.context;


    if(
      !context
    )
      return;


    const buffer =
      context.createBuffer(
        1,
        context.sampleRate *
        duration,
        context.sampleRate
      );


    const data =
      buffer.getChannelData(
        0
      );


    for(
      let i=0;
      i<data.length;
      i++
    ){

      data[i] =
        Math.random()*2-1;

    }


    const source =
      context.createBufferSource();


    const gain =
      context.createGain();


    source.buffer =
      buffer;


    gain.gain
      .setValueAtTime(
        volume *
        this.sfxVolume,
        context.currentTime
      );


    gain.gain
      .exponentialRampToValueAtTime(
        .0001,
        context.currentTime +
        duration
      );


    source.connect(
      gain
    );


    gain.connect(
      this.master
    );


    source.start();

  }

};


const S = {

  click(){

    SoundEngine.tone(
      620,
      .07,
      "sine",
      .12
    );

  },


  coin(){

    SoundEngine.tone(
      880,
      .08,
      "square",
      .11
    );


    SoundEngine.tone(
      1320,
      .12,
      "square",
      .08,
      .07
    );

  },


  xp(){

    SoundEngine.tone(
      523,
      .09,
      "sine",
      .08
    );


    SoundEngine.tone(
      659,
      .1,
      "sine",
      .08,
      .06
    );


    SoundEngine.tone(
      784,
      .14,
      "sine",
      .09,
      .12
    );

  },


  level(){

    SoundEngine.chord(
      [
        523,
        659,
        784
      ],
      .3,
      "triangle",
      .12
    );


    SoundEngine.tone(
      1046,
      .5,
      "sine",
      .14,
      .24
    );

  },


  attack(){

    SoundEngine.tone(
      180,
      .12,
      "sawtooth",
      .13
    );


    SoundEngine.tone(
      260,
      .15,
      "square",
      .06,
      .04
    );

  },


  critical(){

    SoundEngine.tone(
      880,
      .1,
      "square",
      .14
    );


    SoundEngine.tone(
      1174,
      .16,
      "square",
      .12,
      .06
    );


    SoundEngine.tone(
      1568,
      .25,
      "sine",
      .12,
      .12
    );

  },


  ultimate(){

    [
      220,
      330,
      440,
      660,
      880
    ]
    .forEach(
      (
        note,
        index
      ) => {

        SoundEngine.tone(
          note,
          .32,
          "sawtooth",
          .1,
          index*.08
        );

      }
    );

  },


  shield(){

    SoundEngine.chord(
      [
        440,
        554,
        659
      ],
      .4,
      "sine",
      .08
    );

  },


  heal(){

    [
      523,
      659,
      784,
      1046
    ]
    .forEach(
      (
        note,
        index
      ) => {

        SoundEngine.tone(
          note,
          .2,
          "sine",
          .08,
          index*.07
        );

      }
    );

  },


  perfect(){

    SoundEngine.tone(
      1046,
      .11,
      "sine",
      .14
    );


    SoundEngine.tone(
      1568,
      .14,
      "sine",
      .09,
      .05
    );

  },


  great(){

    SoundEngine.tone(
      880,
      .1,
      "triangle",
      .1
    );

  },


  good(){

    SoundEngine.tone(
      660,
      .09,
      "triangle",
      .07
    );

  },


  miss(){

    SoundEngine.tone(
      150,
      .16,
      "sawtooth",
      .07
    );

  },


  correct(){

    SoundEngine.tone(
      660,
      .1,
      "sine",
      .11
    );


    SoundEngine.tone(
      990,
      .16,
      "sine",
      .1,
      .08
    );

  },


  wrong(){

    SoundEngine.tone(
      220,
      .18,
      "square",
      .07
    );


    SoundEngine.tone(
      165,
      .22,
      "square",
      .06,
      .09
    );

  },


  victory(){

    [
      523,
      659,
      784,
      1046
    ]
    .forEach(
      (
        note,
        index
      ) => {

        SoundEngine.tone(
          note,
          .35,
          "triangle",
          .11,
          index*.13
        );

      }
    );

  },


  defeat(){

    [
      392,
      330,
      262,
      196
    ]
    .forEach(
      (
        note,
        index
      ) => {

        SoundEngine.tone(
          note,
          .3,
          "triangle",
          .07,
          index*.14
        );

      }
    );

  },


  jump(){

    SoundEngine.tone(
      280,
      .1,
      "square",
      .06
    );


    SoundEngine.tone(
      560,
      .1,
      "square",
      .04,
      .06
    );

  },


  mine(){

    SoundEngine.noise(
      .07,
      .09
    );


    SoundEngine.tone(
      110,
      .07,
      "square",
      .05
    );

  },


  treasure(){

    [
      784,
      988,
      1174,
      1568
    ]
    .forEach(
      (
        note,
        index
      ) => {

        SoundEngine.tone(
          note,
          .2,
          "sine",
          .09,
          index*.07
        );

      }
    );

  },


  gacha(){

    for(
      let i=0;
      i<7;
      i++
    ){

      SoundEngine.tone(
        300+i*100,
        .16,
        "triangle",
        .07,
        i*.08
      );

    }

  }

};


function crowd(
  strength=.5
){

  for(
    let i=0;
    i<6+strength*8;
    i++
  ){

    setTimeout(
      () => {

        SoundEngine.noise(
          rand(
            15,
            35
          )/100,
          .015+
          Math.random()*.02
        );

      },
      Math.random()*500
    );

  }

}


document.addEventListener(
  "pointerdown",
  () =>
    SoundEngine.resume(),
  {
    once:true
  }
);


$("#soundToggle").onclick =
  () => {

    SoundEngine.enabled =
      !SoundEngine.enabled;


    $("#soundToggle").textContent =
      SoundEngine.enabled
        ?"🔊"
        :"🔇";


    if(
      SoundEngine.enabled
    )
      S.click();

  };


/* =========================================================
   INSTRUMENT DATABASE
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
  (
    item,
    index
  ) => ({

    name:item[0],

    family:item[1],

    icon:item[2],

    attack:item[3],

    defense:item[4],

    melody:item[5],

    rhythm:item[6],

    play:item[7],

    price:
      index===0
        ?0
        :220 +
         index*95

  })
);


const getInstrument =
  name =>
    instruments.find(
      instrument =>
        instrument.name ===
        name
    ) ||
    instruments[0];


/* =========================================================
   MOVE SETS
========================================================= */

const moveSets = {

  strum:[
    [
      "Power Strum",
      "attack",
      1
    ],
    [
      "Rapid Riff",
      "rhythm",
      .9
    ],
    [
      "Harmony Guard",
      "shield",
      0
    ],
    [
      "Dragon Solo",
      "ultimate",
      1.8
    ]
  ],


  keys:[
    [
      "Power Chord",
      "attack",
      1
    ],
    [
      "Rapid Keys",
      "rhythm",
      .9
    ],
    [
      "Sustain Shield",
      "shield",
      0
    ],
    [
      "Grand Crescendo",
      "ultimate",
      1.8
    ]
  ],


  drums:[
    [
      "Power Beat",
      "attack",
      1
    ],
    [
      "Drum Roll",
      "rhythm",
      .95
    ],
    [
      "Rhythm Barrier",
      "shield",
      0
    ],
    [
      "Thunder Beat",
      "ultimate",
      1.85
    ]
  ],


  wind:[
    [
      "Focused Note",
      "attack",
      1
    ],
    [
      "Rapid Scale",
      "rhythm",
      .9
    ],
    [
      "Breath Heal",
      "heal",
      0
    ],
    [
      "Cyclone Symphony",
      "ultimate",
      1.8
    ]
  ],


  brass:[
    [
      "Brass Blast",
      "attack",
      1
    ],
    [
      "Fanfare Rush",
      "rhythm",
      .92
    ],
    [
      "Royal Guard",
      "shield",
      0
    ],
    [
      "Solar Fanfare",
      "ultimate",
      1.85
    ]
  ],


  bow:[
    [
      "Power Bow",
      "attack",
      1
    ],
    [
      "Rapid Bow",
      "rhythm",
      .92
    ],
    [
      "Harmony Strings",
      "heal",
      0
    ],
    [
      "Phoenix Symphony",
      "ultimate",
      1.8
    ]
  ],


  mallet:[
    [
      "Mallet Strike",
      "attack",
      1
    ],
    [
      "Scale Rush",
      "rhythm",
      .95
    ],
    [
      "Resonance",
      "shield",
      0
    ],
    [
      "Rainbow Cascade",
      "ultimate",
      1.8
    ]
  ],


  pads:[
    [
      "Beat Drop",
      "attack",
      1
    ],
    [
      "Pad Rush",
      "rhythm",
      .98
    ],
    [
      "Bass Sequence",
      "shield",
      0
    ],
    [
      "Mega Beat Drop",
      "ultimate",
      1.9
    ]
  ],


  pluck:[
    [
      "Crystal Pluck",
      "attack",
      1
    ],
    [
      "Finger Rush",
      "rhythm",
      .95
    ],
    [
      "Resonance",
      "heal",
      0
    ],
    [
      "Starlight Cascade",
      "ultimate",
      1.82
    ]
  ],


  bellows:[
    [
      "Squeeze Beat",
      "attack",
      1
    ],
    [
      "Polka Rush",
      "rhythm",
      .95
    ],
    [
      "Bellows Guard",
      "shield",
      0
    ],
    [
      "Festival Frenzy",
      "ultimate",
      1.85
    ]
  ],


  shake:[
    [
      "Rhythm Shake",
      "attack",
      1
    ],
    [
      "Jingle Rush",
      "rhythm",
      .98
    ],
    [
      "Tempo Guard",
      "shield",
      0
    ],
    [
      "Carnival Storm",
      "ultimate",
      1.8
    ]
  ]

};


/* =========================================================
   INSTRUMENT SOUNDS
========================================================= */

function playInstrument(
  name,
  note=440
){

  const playType =
    getInstrument(
      name
    ).play;


  const map = {

    strum:[
      "triangle",
      .22
    ],

    keys:[
      "sine",
      .3
    ],

    drums:[
      "square",
      .1
    ],

    wind:[
      "sine",
      .42
    ],

    brass:[
      "sawtooth",
      .28
    ],

    bow:[
      "triangle",
      .5
    ],

    mallet:[
      "sine",
      .15
    ],

    pads:[
      "square",
      .16
    ],

    pluck:[
      "triangle",
      .18
    ],

    bellows:[
      "sawtooth",
      .38
    ],

    shake:[
      "square",
      .08
    ]

  };


  if(
    playType ===
      "drums" ||
    playType ===
      "shake"
  ){

    SoundEngine.noise(
      .12,
      .12
    );

  }


  const [
    type,
    duration
  ] =
    map[
      playType
    ] ||
    [
      "sine",
      .2
    ];


  SoundEngine.tone(
    note,
    duration,
    type,
    .08
  );

}


/* =========================================================
   PROFILE
========================================================= */

const defaultProfile = {

  name:"",

  level:1,

  xp:0,

  totalXp:0,

  coins:10000,

  dust:0,

  owned:[
    "Guitar"
  ],

  equipped:
    "Guitar",

  mastery:{},

  wins:0,

  losses:0,

  avatar:{

    preset:
      "Hero",

    skin:
      "#dca57b",

    hair:
      "#201915",

    outfit:
      "#19345b"

  },

  inventory:[],

  equippedCos:{},

  fans:0,

  careerVenue:0

};


let profile = {

  ...defaultProfile,

  ...load(
    "musicverseProfile",
    {}
  )

};


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
    ?profile.owned
    :[
      "Guitar"
    ];


if(
  !profile.owned.includes(
    "Guitar"
  )
){

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


profile.coins =
  Math.max(
    10000,
    Number(
      profile.coins
    ) ||
    0
  );


function persist(){

  save(
    "musicverseProfile",
    profile
  );

}


function toast(
  text
){

  const element =
    $("#toast");


  element.textContent =
    text;


  element.classList.add(
    "show"
  );


  clearTimeout(
    toast.timer
  );


  toast.timer =
    setTimeout(
      () =>
        element.classList.remove(
          "show"
        ),
      2200
    );

}


/* =========================================================
   UNIVERSAL EXP SYSTEM
========================================================= */

function addXP(
  amount
){

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


  while(
    profile.xp >=
    100
  ){

    profile.xp -=
      100;


    profile.level++;


    profile.coins +=
      75;


    levels++;

  }


  persist();


  updateProfileUI();


  renderLeaderboard();


  if(
    levels
  ){

    S.level();


    toast(
      `🎉 Level ${profile.level}! +75 Coins`
    );

  }else{

    S.xp();

  }


  return amount;

}


function addMastery(
  name,
  amount
){

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


function reward(
  xp,
  coins=0,
  message="Reward earned!"
){

  addXP(
    xp
  );


  profile.coins +=
    coins;


  persist();


  updateProfileUI();


  if(
    coins
  )
    S.coin();


  toast(
    `${message} +${xp} EXP${
      coins
        ?` • +${coins} Coins`
        :""
    }`
  );

}


function updateProfileUI(){

  [
    "coinTop",
    "heroCoins",
    "gachaCoins"
  ]
  .forEach(
    id => {

      if(
        $(
          "#"+id
        )
      ){

        $(
          "#"+id
        ).textContent =
          profile.coins
            .toLocaleString();

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
    profile.totalXp
      .toLocaleString();


  $("#xpText").textContent =
    `${profile.xp} / 100`;


  $("#xpFill").style.width =
    `${profile.xp}%`;

}


/* =========================================================
   PLAYER SETUP
========================================================= */

function setupProfile(){

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
        skin =>
          `
          <option value="${skin[1]}">
            ${skin[0]}
          </option>
          `
      )
      .join("");


  $("#hairSelect").innerHTML =
    hairs
      .map(
        hair =>
          `
          <option value="${hair[1]}">
            ${hair[0]}
          </option>
          `
      )
      .join("");


  $("#outfitSelect").innerHTML =
    outfits
      .map(
        outfit =>
          `
          <option value="${outfit[1]}">
            ${outfit[0]}
          </option>
          `
      )
      .join("");


  $("#avatarPresetSelect").value =
    profile.avatar.preset;


  $("#skinSelect").value =
    profile.avatar.skin;


  $("#hairSelect").value =
    profile.avatar.hair;


  $("#outfitSelect").value =
    profile.avatar.outfit;


  const preview =
    () => {

      $("#previewHead").style.background =
        $("#skinSelect").value;


      $("#previewHair").style.background =
        $("#hairSelect").value;


      $("#previewBody").style.background =
        $("#outfitSelect").value;


      $$(
        ".preview-arm,.preview-leg"
      )
      .forEach(
        element => {

          element.style.background =
            $("#outfitSelect").value;

        }
      );

    };


  [
    "avatarPresetSelect",
    "skinSelect",
    "hairSelect",
    "outfitSelect"
  ]
  .forEach(
    id => {

      $(
        "#"+id
      ).onchange =
        preview;

    }
  );


  preview();


  if(
    !profile.name
  ){

    $("#setupOverlay")
      .classList.remove(
        "hidden"
      );

  }


  $("#startBtn").onclick =
    () => {

      const name =
        $("#playerNameInput")
          .value
          .trim();


      if(
        !name
      ){

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
        .classList.add(
          "hidden"
        );


      updateProfileUI();


      refreshBattle(
        true
      );


      S.victory();

    };


  $("#playerNameInput")
    .addEventListener(
      "keydown",
      event => {

        if(
          event.key ===
          "Enter"
        ){

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


function renderFamilies(){

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
        family =>
          `
          <button
            class="${
              family ===
              activeFamily
                ?"active"
                :""
            }"
            data-family="${family}"
          >
            ${family}
          </button>
          `
      )
      .join("");


  $$(
    "[data-family]"
  )
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


function renderInstruments(){

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


          return `
            <article
              class="instrument-card ${
                equipped
                  ?"equipped"
                  :""
              }"
            >

              <div class="instrument-icon">
                ${instrument.icon}
              </div>

              <h3>
                ${instrument.name}
              </h3>

              <p>
                ${instrument.family}
                •
                Mastery
                ${
                  profile.mastery[
                    instrument.name
                  ] ||
                  0
                }
              </p>

              <div class="stat-line">

                <span>
                  ATK ${instrument.attack}
                </span>

                <span>
                  DEF ${instrument.defense}
                </span>

                <span>
                  MEL ${instrument.melody}
                </span>

                <span>
                  RHY ${instrument.rhythm}
                </span>

              </div>

              <div class="instrument-actions">

                ${
                  owned

                  ?`
                  <button
                    class="btn ${
                      equipped
                        ?"gold"
                        :"ghost"
                    }"
                    data-equip="${instrument.name}"
                  >
                    ${
                      equipped
                        ?"Equipped"
                        :"Equip"
                    }
                  </button>
                  `

                  :`
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


  $$(
    "[data-buy]"
  )
  .forEach(
    button => {

      button.onclick =
        () => {

          const instrument =
            getInstrument(
              button.dataset.buy
            );


          if(
            profile.coins <
            instrument.price
          ){

            toast(
              "Not enough coins."
            );

            return;

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


  $$(
    "[data-equip]"
  )
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

          S.click();

        };

    }
  );


  renderBattleInstrumentSelect();

}


$("#instrumentSearch").oninput =
  renderInstruments;


function renderBattleInstrumentSelect(){

  const previous =
    $("#battleInstrumentSelect")
      .value;


  $("#battleInstrumentSelect").innerHTML =
    profile.owned
      .map(
        name =>
          `
          <option
            ${
              name ===
              profile.equipped
                ?"selected"
                :""
            }
          >
            ${name}
          </option>
          `
      )
      .join("");


  if(
    profile.owned.includes(
      previous
    )
  ){

    $("#battleInstrumentSelect").value =
      previous;

  }

}


$("#battleInstrumentSelect").onchange =
  () => {

    profile.equipped =
      $("#battleInstrumentSelect").value;


    persist();

    renderInstruments();

    refreshBattle(
      true
    );

  };


/* =========================================================
   SOLO BATTLE
========================================================= */

let battle = {};


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


function refreshBattle(
  newEnemy=false
){

  const playerInstrument =
    getInstrument(
      profile.equipped
    );


  if(
    newEnemy ||
    !battle.enemy
  ){

    const enemyInstrument =
      pick(
        instruments
      );


    battle = {

      playerHp:
        Math.round(
          100 +
          playerInstrument.defense *
          .4
        ),

      playerMax:
        Math.round(
          100 +
          playerInstrument.defense *
          .4
        ),

      enemyHp:
        Math.round(
          100 +
          enemyInstrument.defense *
          .4
        ),

      enemyMax:
        Math.round(
          100 +
          enemyInstrument.defense *
          .4
        ),

      enemy:{

        name:
          pick(
            botNames
          ),

        instrument:
          enemyInstrument.name

      },

      energy:0,

      shield:false,

      busy:false

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


function renderSoloBattle(){

  const playerInstrument =
    getInstrument(
      profile.equipped
    );


  const moves =
    moveSets[
      playerInstrument.play
    ] ||
    moveSets.strum;


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


  $("#energyPips").innerHTML =
    [
      0,
      1,
      2
    ]
    .map(
      index =>
        `
        <i
          class="${
            index <
            battle.energy
              ?"on"
              :""
          }"
        ></i>
        `
    )
    .join("");


  $("#moveButtons").innerHTML =
    moves
      .map(
        (
          move,
          index
        ) =>
          `
          <button
            class="move-btn ${
              index === 3
                ?"ultimate"
                :""
            }"
            data-solo-move="${index}"
            ${
              battle.busy ||
              (
                index === 3 &&
                battle.energy < 3
              )
                ?"disabled"
                :""
            }
          >

            <strong>
              ${move[0]}
            </strong>

            <span>
              ${
                index === 3
                  ?"ULTIMATE • 3 ENERGY"
                  :move[1].toUpperCase()
              }
            </span>

            <small>
              ${
                move[1] ===
                "heal"

                ?"Restore HP"

                :move[1] ===
                 "shield"

                ?"Block next hit"

                :"Deal musical damage"
              }
            </small>

          </button>
          `
      )
      .join("");


  $$(
    "[data-solo-move]"
  )
  .forEach(
    button => {

      button.onclick =
        () =>
          soloMove(
            Number(
              button.dataset.soloMove
            )
          );

    }
  );

}


async function soloMove(
  index
){

  if(
    battle.busy
  )
    return;


  battle.busy =
    true;


  const instrument =
    getInstrument(
      profile.equipped
    );


  const move =
    (
      moveSets[
        instrument.play
      ] ||
      moveSets.strum
    )[
      index
    ];


  let text =
    "";


  playInstrument(
    instrument.name,
    index === 3
      ?660
      :440
  );


  if(
    move[1] ===
    "heal"
  ){

    const heal =
      Math.round(
        instrument.melody *
        .25 +
        12
      );


    battle.playerHp =
      clamp(
        battle.playerHp +
        heal,
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
      `${move[0]} restored ${heal} HP.`;


    S.heal();

  }

  else if(
    move[1] ===
    "shield"
  ){

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

  else{

    let multiplier =
      move[2];


    if(
      index === 3
    ){

      battle.energy =
        0;


      S.ultimate();

    }else{

      battle.energy =
        clamp(
          battle.energy +
          1,
          0,
          3
        );

    }


    let damage =
      Math.max(
        6,
        Math.round(
          (
            instrument.attack *
            .32 +

            instrument.rhythm *
            .12 +

            rand(
              -3,
              7
            )
          ) *

          multiplier -

          getInstrument(
            battle.enemy.instrument
          ).defense *

          .06
        )
      );


    const critical =
      Math.random() <
      (
        .08 +
        instrument.melody /
        1200
      );


    if(
      critical
    ){

      damage =
        Math.round(
          damage *
          1.5
        );


      S.critical();

    }else{

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
          ?" CRITICAL"
          :""
      } damage.`;


    addMastery(
      instrument.name,
      2
    );

  }


  $("#battleStatus").textContent =
    text;


  $("#battleLog").textContent =
    text;


  renderSoloBattle();


  if(
    battle.enemyHp <=
    0
  ){

    battle.busy =
      false;


    profile.wins++;


    reward(
      35,
      45,
      "Battle won!"
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
        .28 +

        rand(
          -3,
          5
        ) -

        instrument.defense *
        .05
      )
    );


  if(
    battle.shield
  ){

    enemyDamage =
      Math.round(
        enemyDamage *
        .5
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


  if(
    battle.playerHp <=
    0
  ){

    profile.losses++;


    addXP(
      8
    );


    S.defeat();


    toast(
      "Defeat. +8 EXP"
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


$("#newOpponentBtn").onclick =
  () =>
    refreshBattle(
      true
    );


/* =========================================================
   TEAM BATTLE
========================================================= */

let multiplayerState = {

  size:10,

  blue:[],

  red:[],

  playing:false,

  round:0,

  playerEnergy:0,

  waiting:false,

  resolve:null,

  blueHP:10000,

  redHP:10000,

  maxTeamHP:10000,

  teamShield:false

};


function makeTeamPlayer(
  team,
  index
){

  const human =
    team ===
      "blue" &&
    index ===
      0;


  const instrument =
    human
      ?getInstrument(
        profile.equipped
      )
      :pick(
        instruments
      );


  return {

    id:
      `${team}-${index}-${Math.random()}`,

    team,

    human,

    name:
      human
        ?(
          profile.name ||
          "Player"
        )
        :pick(
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


function openLobby(
  size
){

  if(
    multiplayerState.playing
  )
    return;


  multiplayerState.size =
    size;


  multiplayerState.blue =
    Array.from(
      {
        length:size
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
        length:size
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
    10000;


  multiplayerState.redHP =
    10000;


  multiplayerState.maxTeamHP =
    10000;


  multiplayerState.playerEnergy =
    0;


  multiplayerState.round =
    0;


  multiplayerState.teamShield =
    false;


  $("#concertRoundLabel").textContent =
    "LOBBY";


  $("#startTeamBattleBtn").disabled =
    false;


  $("#startTeamBattleBtn").textContent =
    "Start Concert Battle";


  $("#teamMovePanel")
    .classList.add(
      "hidden"
    );


  renderConcertTeams();


  updateTeamHPBars();


  setMP(
    `
    <strong>
      ${size}v${size} Concert Battle ready.
    </strong>

    <span>
      Both teams share 10,000 HP.
    </span>
    `
  );


  $$(
    ".mp-start"
  )
  .forEach(
    button => {

      button.classList.toggle(
        "active",
        Number(
          button.dataset.team
        ) ===
        size
      );

    }
  );

}


function renderConcertTeams(
  activeId=""
){

  const render =
    (
      players,
      team
    ) =>
      players
        .map(
          player =>
            `
            <div
              class="concert-player ${team} ${
                player.id ===
                activeId
                  ?"active"
                  :""
              }"
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


function updateTeamHPBars(){

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
    `${bluePercent}%`;


  $("#redTeamHPFill").style.width =
    `${redPercent}%`;


  $("#blueTeamHPText").textContent =
    `${Math.round(
      multiplayerState.blueHP
    ).toLocaleString()} / ${max.toLocaleString()} HP`;


  $("#redTeamHPText").textContent =
    `${Math.round(
      multiplayerState.redHP
    ).toLocaleString()} / ${max.toLocaleString()} HP`;

}


function setMP(
  html
){

  $("#multiplayerBattleMessage").innerHTML =
    html;

}


function teamDamage(
  attacker,
  multiplier=1
){

  const targetTeam =
    attacker.team ===
    "blue"
      ?"red"
      :"blue";


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

        multiplier
      )
    );


  const critical =
    Math.random() <
    (
      .05 +
      attacker.melody /
      1000
    );


  if(
    critical
  ){

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

    damage,

    critical

  };

}


function waitHumanMove(){

  return new Promise(
    resolve => {

      multiplayerState.resolve =
        resolve;


      showTeamMoves();

    }
  );

}


function showTeamMoves(){

  const player =
    multiplayerState.blue[
      0
    ];


  const instrument =
    getInstrument(
      player.instrument
    );


  const moves =
    moveSets[
      instrument.play
    ] ||
    moveSets.strum;


  multiplayerState.waiting =
    true;


  $("#teamMovePanel")
    .classList.remove(
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
        ) =>
          `
          <button
            class="move-btn ${
              index === 3
                ?"ultimate"
                :""
            }"
            data-team-move="${index}"
            ${
              index === 3 &&
              multiplayerState.playerEnergy < 3
                ?"disabled"
                :""
            }
          >

            <strong>
              ${move[0]}
            </strong>

            <span>
              ${
                index === 3
                  ?"ULTIMATE • 3 ENERGY"
                  :move[1].toUpperCase()
              }
            </span>

            <small>
              ${
                move[1] ===
                "heal"

                ?"Restore team HP"

                :move[1] ===
                 "shield"

                ?"Reduce next enemy hit"

                :"Damage Team Red"
              }
            </small>

          </button>
          `
      )
      .join("");


  $$(
    "[data-team-move]"
  )
  .forEach(
    button => {

      button.onclick =
        () => {

          if(
            !multiplayerState.waiting
          )
            return;


          multiplayerState.waiting =
            false;


          $("#teamMovePanel")
            .classList.add(
              "hidden"
            );


          const resolve =
            multiplayerState.resolve;


          multiplayerState.resolve =
            null;


          resolve(
            Number(
              button.dataset.teamMove
            )
          );

        };

    }
  );

}


async function executeTeamMove(
  index
){

  const player =
    multiplayerState.blue[
      0
    ];


  const instrument =
    getInstrument(
      player.instrument
    );


  const move =
    (
      moveSets[
        instrument.play
      ] ||
      moveSets.strum
    )[
      index
    ];


  renderConcertTeams(
    player.id
  );


  playInstrument(
    instrument.name,
    index === 3
      ?659
      :440
  );


  if(
    move[1] ===
    "heal"
  ){

    const heal =
      Math.round(
        instrument.melody *
        7 +
        220
      );


    multiplayerState.blueHP =
      clamp(
        multiplayerState.blueHP +
        heal,
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
      `
      <strong>
        💚 ${move[0]}
      </strong>

      <span>
        Team Blue restored ${heal} HP.
      </span>
      `
    );

  }

  else if(
    move[1] ===
    "shield"
  ){

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
      `
      <strong>
        🛡️ ${move[0]}
      </strong>

      <span>
        Team Blue is shielded against the next attack.
      </span>
      `
    );

  }

  else{

    let multiplier =
      move[2];


    if(
      index === 3
    ){

      multiplier *=
        1.5;


      multiplayerState.playerEnergy =
        0;


      S.ultimate();


      crowd(
        1
      );

    }else{

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


    if(
      hit.critical
    ){

      S.critical();


      crowd(
        .8
      );

    }


    setMP(
      `
      <strong>
        🔵 ${player.name} used ${move[0]}!
      </strong>

      <span>
        ${hit.damage} damage
        ${
          hit.critical
            ?" • CRITICAL PERFORMANCE!"
            :""
        }
      </span>
      `
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


async function aiTeamTurn(
  player
){

  renderConcertTeams(
    player.id
  );


  playInstrument(
    player.instrument,
    player.team ===
    "blue"
      ?420
      :320
  );


  S.attack();


  let hit =
    teamDamage(
      player,
      .8
    );


  if(
    player.team ===
      "red" &&
    multiplayerState.teamShield
  ){

    const restored =
      Math.round(
        hit.damage *
        .45
      );


    multiplayerState.blueHP =
      Math.min(
        10000,
        multiplayerState.blueHP +
        restored
      );


    hit.damage -=
      restored;


    multiplayerState.teamShield =
      false;


    S.shield();


    updateTeamHPBars();

  }


  if(
    hit.critical
  )
    S.critical();


  setMP(
    `
    <strong>
      ${
        player.team ===
        "blue"
          ?"🔵"
          :"🔴"
      }
      ${player.name}
      performs!
    </strong>

    <span>
      ${player.instrument}
      deals
      ${hit.damage}
      team damage
      ${
        hit.critical
          ?" • CRITICAL!"
          :""
      }
    </span>
    `
  );


  await wait(
    multiplayerState.size >=
      10
      ?150
      :350
  );

}


async function startTeamBattle(){

  if(
    multiplayerState.playing
  )
    return;


  multiplayerState.playing =
    true;


  $("#startTeamBattleBtn").disabled =
    true;


  $("#startTeamBattleBtn").textContent =
    "Concert in Progress...";


  let round =
    1;


  while(
    multiplayerState.blueHP >
      0 &&
    multiplayerState.redHP >
      0 &&
    round <=
      50
  ){

    multiplayerState.round =
      round;


    $("#concertRoundLabel").textContent =
      `ROUND ${round}`;


    setMP(
      `
      <strong>
        🎵 Round ${round}: Your turn!
      </strong>

      <span>
        Choose one of your instrument moves.
      </span>
      `
    );


    const move =
      await waitHumanMove();


    await executeTeamMove(
      move
    );


    if(
      multiplayerState.redHP <=
      0
    )
      break;


    for(
      const player of
      multiplayerState.blue.slice(
        1
      )
    ){

      await aiTeamTurn(
        player
      );


      if(
        multiplayerState.redHP <=
        0
      )
        break;

    }


    if(
      multiplayerState.redHP <=
      0
    )
      break;


    for(
      const player of
      multiplayerState.red
    ){

      await aiTeamTurn(
        player
      );


      if(
        multiplayerState.blueHP <=
        0
      )
        break;

    }


    round++;

  }


  multiplayerState.playing =
    false;


  $("#teamMovePanel")
    .classList.add(
      "hidden"
    );


  const won =
    multiplayerState.blueHP >
    multiplayerState.redHP;


  $("#concertRoundLabel").textContent =
    won
      ?"VICTORY"
      :"DEFEAT";


  if(
    won
  ){

    crowd(
      1
    );


    S.victory();


    reward(
      60 +
      multiplayerState.size *
      5,
      70 +
      multiplayerState.size *
      8,
      "Concert victory!"
    );


    setMP(
      `
      <strong>
        🏆 TEAM BLUE WINS!
      </strong>

      <span>
        ${Math.round(
          multiplayerState.blueHP
        ).toLocaleString()}
        HP remaining.
      </span>
      `
    );

  }else{

    S.defeat();


    addXP(
      18
    );


    setMP(
      `
      <strong>
        Team Red wins the concert.
      </strong>

      <span>
        +18 EXP for performing.
      </span>
      `
    );

  }


  $("#startTeamBattleBtn").disabled =
    false;


  $("#startTeamBattleBtn").textContent =
    "Play Again";

}


$$(
  ".mp-start"
)
.forEach(
  button => {

    button.onclick =
      () =>
        openLobby(
          Number(
            button.dataset.team
          )
        );

  }
);


$("#startTeamBattleBtn").onclick =
  startTeamBattle;


/* =========================================================
   ARCADE GAME HUB
========================================================= */

const games = [

  [
    "rhythm",
    "🎵",
    "Rhythm Rush",
    "Hit falling notes with D F J K."
  ],

  [
    "guess",
    "🎼",
    "Guess the Song",
    "Hear a melody and identify it."
  ],

  [
    "tiles",
    "🎹",
    "Piano Tiles",
    "Hit the correct tiles before they fall."
  ],

  [
    "pitch",
    "👂",
    "Perfect Pitch",
    "Listen to a note and identify it."
  ],

  [
    "memory",
    "🧠",
    "Melody Memory",
    "Repeat an increasingly long melody."
  ],

  [
    "career",
    "🎤",
    "Concert Career",
    "Grow from small venues to stadiums."
  ],

  [
    "dash",
    "🏃",
    "Music Dash",
    "Jump obstacles and collect music coins."
  ],

  [
    "hero",
    "🎸",
    "Instrument Hero",
    "Score combos with your equipped instrument."
  ],

  [
    "beat",
    "🎧",
    "Beat Battle",
    "Time your hits to defeat a music boss."
  ],

  [
    "dungeon",
    "🏰",
    "Music Dungeon",
    "Explore rooms and fight musical monsters."
  ]

];


function renderGameCards(){

  $("#gameCards").innerHTML =
    games
      .map(
        game =>
          `
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
      .join("");


  $$(
    "[data-game]"
  )
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


function openGame(
  id
){

  stopActiveGame();


  const game =
    games.find(
      game =>
        game[0] ===
        id
    );


  $("#gameStage")
    .classList.remove(
      "hidden"
    );


  $("#gameEyebrow").textContent =
    "MUSICVERSE ARCADE";


  $("#gameTitle").textContent =
    game[2];


  $("#gameBody").innerHTML =
    "";


  $("#gameStage")
    .scrollIntoView({

      behavior:"smooth",

      block:"start"

    });


  const starters = {

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

    career:
      startCareer,

    dash:
      startDash,

    hero:
      startInstrumentHero,

    beat:
      startBeatBattle,

    dungeon:
      startDungeon

  };


  starters[
    id
  ]();

}


$("#closeGameBtn").onclick =
  () => {

    stopActiveGame();


    $("#gameStage")
      .classList.add(
        "hidden"
      );

  };


let activeIntervals =
  [];


let activeKeyHandler =
  null;


function every(
  callback,
  milliseconds
){

  const id =
    setInterval(
      callback,
      milliseconds
    );


  activeIntervals.push(
    id
  );


  return id;

}


function stopActiveGame(){

  activeIntervals
    .forEach(
      clearInterval
    );


  activeIntervals =
    [];


  if(
    activeKeyHandler
  ){

    document.removeEventListener(
      "keydown",
      activeKeyHandler
    );


    activeKeyHandler =
      null;

  }

}


/* =========================================================
   RHYTHM RUSH
========================================================= */

function startRhythm(){

  $("#gameBody").innerHTML =
    `
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
            "D",
            "F",
            "J",
            "K"
          ]
          .map(
            (
              key,
              index
            ) =>
              `
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
          .join("")
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


  function spawn(){

    const lane =
      rand(
        0,
        3
      );


    const element =
      document.createElement(
        "div"
      );


    element.className =
      "fall-note";


    element.style.top =
      "-30px";


    element.dataset.y =
      "-30";


    element.dataset.lane =
      lane;


    $("#rrBoard")
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


  every(
    () => {

      notes =
        [
          ...notes
        ]
        .filter(
          note => {

            let y =
              Number(
                note.dataset.y
              ) +
              8;


            note.dataset.y =
              y;


            note.style.top =
              `${y}px`;


            if(
              y >
              330
            ){

              note.remove();


              combo =
                0;


              $("#rrCombo").textContent =
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


  every(
    () => {

      time--;


      $("#rrTime").textContent =
        time;


      if(
        time <=
        0
      ){

        stopActiveGame();


        $("#rrResult").textContent =
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
            xp*.6
          ),
          "Rhythm Rush complete!"
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


  activeKeyHandler =
    event => {

      const map = {

        d:0,

        f:1,

        j:2,

        k:3

      };


      const lane =
        map[
          event.key
            .toLowerCase()
        ];


      if(
        lane ===
        undefined
      )
        return;


      const candidates =
        notes
          .filter(
            note =>
              Number(
                note.dataset.lane
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


      const note =
        candidates[
          0
        ];


      if(
        !note
      ){

        combo =
          0;


        S.miss();


        return;

      }


      const y =
        Number(
          note.dataset.y
        );


      const distance =
        Math.abs(
          306 -
          y
        );


      if(
        distance <
        32
      ){

        score +=
          distance <
          12
            ?150
            :100;


        combo++;


        if(
          distance <
          12
        ){

          S.perfect();

        }else{

          S.great();

        }


        note.remove();


        notes =
          notes.filter(
            item =>
              item !==
              note
          );

      }else{

        combo =
          0;


        S.miss();

      }


      $("#rrScore").textContent =
        score;


      $("#rrCombo").textContent =
        combo;

    };


  document.addEventListener(
    "keydown",
    activeKeyHandler
  );

}


/* =========================================================
   GUESS THE SONG
========================================================= */

const melodies = [

  {

    name:
      "Twinkle Twinkle Little Star",

    notes:[
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
      "Ode to Joy",

    notes:[
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
      "Mary Had a Little Lamb",

    notes:[
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


function playMelody(
  melody
){

  melody.notes
    .forEach(
      (
        note,
        index
      ) => {

        SoundEngine.tone(
          note,
          .26,
          "sine",
          .09,
          index*.24
        );

      }
    );

}


function startGuessSong(){

  let score =
    0;


  let round =
    0;


  let current;


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
            melody =>
              melody !==
              current
          )
          .map(
            melody =>
              melody.name
          )

      ]
      .sort(
        () =>
          Math.random() -
          .5
      );


      $("#gameBody").innerHTML =
        `
        <div class="game-panel">

          <div class="game-toolbar">

            <span class="game-stat">
              Round ${round+1}/5
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
                  option =>
                    `
                    <button
                      data-song="${option}"
                    >
                      ${option}
                    </button>
                    `
                )
                .join("")
            }

          </div>

          <p>
            Listen carefully, then choose the melody.
          </p>

        </div>
        `;


      $("#playSongBtn").onclick =
        () =>
          playMelody(
            current
          );


      $$(
        "[data-song]"
      )
      .forEach(
        button => {

          button.onclick =
            () => {

              const correct =
                button.dataset.song ===
                current.name;


              if(
                correct
              ){

                score++;

                S.correct();

              }else{

                S.wrong();

              }


              round++;


              if(
                round >=
                5
              ){

                const xp =
                  score *
                  10 +
                  10;


                reward(
                  xp,
                  score*8,
                  "Guess the Song complete!"
                );


                $("#gameBody").innerHTML =
                  `
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


                $("#againGuess").onclick =
                  startGuessSong;

              }else{

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

function startPianoTiles(){

  $("#gameBody").innerHTML =
    `
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
        class="lane-board"
      >

        ${
          [
            "D",
            "F",
            "J",
            "K"
          ]
          .map(
            (
              key,
              index
            ) =>
              `
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
          .join("")
        }

      </div>

    </div>
    `;


  let score =
    0;


  let time =
    20;


  let notes =
    [];


  every(
    () => {

      const lane =
        rand(
          0,
          3
        );


      const element =
        document.createElement(
          "div"
        );


      element.className =
        "fall-note";


      element.style.background =
        "#f7f5ef";


      element.dataset.y =
        "-30";


      element.dataset.lane =
        lane;


      $("#ptBoard")
        .children[
          lane
        ]
        .appendChild(
          element
        );


      notes.push(
        element
      );

    },
    480
  );


  every(
    () => {

      notes =
        [
          ...notes
        ]
        .filter(
          note => {

            const y =
              Number(
                note.dataset.y
              ) +
              10;


            note.dataset.y =
              y;


            note.style.top =
              `${y}px`;


            if(
              y >
              330
            ){

              note.remove();

              S.miss();

              return false;

            }


            return true;

          }
        );

    },
    35
  );


  every(
    () => {

      time--;


      $("#ptTime").textContent =
        time;


      if(
        time <=
        0
      ){

        stopActiveGame();


        const xp =
          15 +
          Math.round(
            score /
            250
          );


        reward(
          xp,
          Math.round(
            xp*.5
          ),
          "Piano Tiles complete!"
        );

      }

    },
    1000
  );


  activeKeyHandler =
    event => {

      const lane =
        {

          d:0,

          f:1,

          j:2,

          k:3

        }[
          event.key
            .toLowerCase()
        ];


      if(
        lane ===
        undefined
      )
        return;


      const note =
        notes
          .filter(
            item =>
              Number(
                item.dataset.lane
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
          )[
            0
          ];


      if(
        note &&
        Number(
          note.dataset.y
        ) >
        250
      ){

        score +=
          100;


        S.perfect();


        playInstrument(
          "Piano",
          261.6 *
          Math.pow(
            2,
            lane/12
          )
        );


        note.remove();


        notes =
          notes.filter(
            item =>
              item !==
              note
          );


        $("#ptScore").textContent =
          score;

      }else{

        S.miss();

      }

    };


  document.addEventListener(
    "keydown",
    activeKeyHandler
  );

}


/* =========================================================
   PERFECT PITCH
========================================================= */

function startPitch(){

  const notes = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B"
  ];


  const frequencies = [
    261.6,
    293.7,
    329.6,
    349.2,
    392,
    440,
    493.9
  ];


  let score =
    0;


  let round =
    0;


  let target =
    0;


  const render =
    () => {

      target =
        rand(
          0,
          6
        );


      $("#gameBody").innerHTML =
        `
        <div class="game-panel">

          <div class="game-toolbar">

            <span class="game-stat">
              Round ${round+1}/10
            </span>

            <span class="game-stat">
              Score ${score}
            </span>

          </div>

          <button
            id="hearPitch"
            class="btn gold"
          >
            🔊 Hear Note
          </button>

          <div
            class="pitch-buttons"
            style="margin-top:16px"
          >

            ${
              notes
                .map(
                  (
                    note,
                    index
                  ) =>
                    `
                    <button
                      data-pitch="${index}"
                    >
                      ${note}
                    </button>
                    `
                )
                .join("")
            }

          </div>

        </div>
        `;


      $("#hearPitch").onclick =
        () => {

          SoundEngine.tone(
            frequencies[
              target
            ],
            .55,
            "sine",
            .15
          );

        };


      $$(
        "[data-pitch]"
      )
      .forEach(
        button => {

          button.onclick =
            () => {

              const correct =
                Number(
                  button.dataset.pitch
                ) ===
                target;


              if(
                correct
              ){

                score++;

                S.correct();

              }else{

                S.wrong();

              }


              round++;


              if(
                round >=
                10
              ){

                reward(
                  score*6+10,
                  score*4,
                  "Perfect Pitch complete!"
                );


                $("#gameBody").innerHTML =
                  `
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


                $("#pitchAgain").onclick =
                  startPitch;

              }else{

                render();

              }

            };

        }
      );

    };


  render();

}


/* =========================================================
   MELODY MEMORY
========================================================= */

function startMemory(){

  const notes = [
    261.6,
    293.7,
    329.6,
    392,
    440
  ];


  const labels = [
    "C",
    "D",
    "E",
    "G",
    "A"
  ];


  let sequence =
    [];


  let input =
    [];


  let round =
    0;


  const render =
    () => {

      $("#gameBody").innerHTML =
        `
        <div class="game-panel">

          <h3>
            Round
            <span id="memRound">
              ${round+1}
            </span>
          </h3>

          <p id="memText">
            Watch and listen.
          </p>

          <div class="memory-buttons">

            ${
              labels
                .map(
                  (
                    note,
                    index
                  ) =>
                    `
                    <button
                      data-mem="${index}"
                    >
                      ${note}
                    </button>
                    `
                )
                .join("")
            }

          </div>

        </div>
        `;


      $$(
        "[data-mem]"
      )
      .forEach(
        button => {

          button.onclick =
            () => {

              const index =
                Number(
                  button.dataset.mem
                );


              SoundEngine.tone(
                notes[
                  index
                ],
                .2,
                "sine",
                .12
              );


              input.push(
                index
              );


              if(
                input[
                  input.length-1
                ] !==
                sequence[
                  input.length-1
                ]
              ){

                S.wrong();


                reward(
                  8 +
                  round*5,
                  round*4,
                  "Melody Memory finished!"
                );


                $("#memText").textContent =
                  `Wrong note! You reached round ${round}.`;


                $$(
                  "[data-mem]"
                )
                .forEach(
                  item =>
                    item.disabled =
                      true
                );


                return;

              }


              if(
                input.length ===
                sequence.length
              ){

                round++;


                S.correct();


                setTimeout(
                  nextRound,
                  600
                );

              }

            };

        }
      );

    };


  async function nextRound(){

    sequence.push(
      rand(
        0,
        4
      )
    );


    input =
      [];


    render();


    for(
      const index of
      sequence
    ){

      await wait(
        280
      );


      SoundEngine.tone(
        notes[
          index
        ],
        .22,
        "sine",
        .12
      );


      const button =
        $(
          `[data-mem="${index}"]`
        );


      button.classList.add(
        "flash"
      );


      setTimeout(
        () =>
          button.classList.remove(
            "flash"
          ),
        180
      );


      await wait(
        180
      );

    }

  }


  nextRound();

}


/* =========================================================
   CONCERT CAREER
========================================================= */

const venues = [

  [
    "Bedroom",
    0,
    50
  ],

  [
    "Street Stage",
    250,
    120
  ],

  [
    "School Hall",
    1000,
    220
  ],

  [
    "Café",
    3000,
    350
  ],

  [
    "Theatre",
    8000,
    550
  ],

  [
    "Grand Hall",
    20000,
    800
  ],

  [
    "Arena",
    50000,
    1200
  ],

  [
    "World Tour",
    120000,
    1800
  ],

  [
    "MusicVerse Stadium",
    300000,
    3000
  ]

];


function startCareer(){

  const render =
    () => {

      $("#gameBody").innerHTML =
        `
        <div class="game-panel">

          <div class="game-toolbar">

            <span class="game-stat">
              ⭐ Fans
              ${profile.fans.toLocaleString()}
            </span>

            <span class="game-stat">
              Career Level
              ${profile.careerVenue+1}
            </span>

          </div>

          <div class="career-road">

            ${
              venues
                .map(
                  (
                    venue,
                    index
                  ) =>
                    `
                    <div
                      class="venue-card ${
                        index >
                        profile.careerVenue
                          ?"locked"
                          :""
                      }"
                    >

                      <b>
                        ${venue[0]}
                      </b>

                      <p>
                        ${venue[1].toLocaleString()}
                        fans required
                      </p>

                      ${
                        index <=
                        profile.careerVenue

                        ?`
                        <button
                          class="btn small ${
                            index ===
                            profile.careerVenue
                              ?"gold"
                              :"ghost"
                          }"
                          data-venue="${index}"
                        >
                          Perform
                        </button>
                        `

                        :"🔒"
                      }

                    </div>
                    `
                )
                .join("")
            }

          </div>

          <p id="careerResult"></p>

        </div>
        `;


      $$(
        "[data-venue]"
      )
      .forEach(
        button => {

          button.onclick =
            () => {

              const index =
                Number(
                  button.dataset.venue
                );


              const venue =
                venues[
                  index
                ];


              const rating =
                rand(
                  72,
                  100
                );


              const fans =
                Math.round(
                  venue[2] *
                  (
                    rating /
                    100
                  )
                );


              const xp =
                Math.round(
                  35 +
                  index*12 +
                  rating/5
                );


              const coins =
                Math.round(
                  40 +
                  index*20
                );


              profile.fans +=
                fans;


              if(
                index ===
                profile.careerVenue &&
                profile.careerVenue <
                venues.length-1 &&
                profile.fans >=
                venues[
                  index+1
                ][1]
              ){

                profile.careerVenue++;

              }


              persist();


              crowd(
                rating /
                100
              );


              S.victory();


              reward(
                xp,
                coins,
                `${venue[0]} performance! +${fans} fans`
              );


              render();

            };

        }
      );

    };


  render();

}


/* =========================================================
   MUSIC DASH
========================================================= */

function startDash(){

  $("#gameBody").innerHTML =
    `
    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Score
          <b id="dashScore">
            0
          </b>
        </span>

        <span class="game-stat">
          Space = Jump
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


  const canvas =
    $("#dashCanvas");


  const context =
    canvas.getContext(
      "2d"
    );


  let y =
    195;


  let velocity =
    0;


  const ground =
    195;


  let score =
    0;


  let time =
    25;


  let obstacles =
    [];


  let coins =
    [];


  activeKeyHandler =
    event => {

      if(
        event.code ===
          "Space" &&
        y >=
          ground
      ){

        velocity =
          -12;


        S.jump();

      }

    };


  document.addEventListener(
    "keydown",
    activeKeyHandler
  );


  every(
    () => {

      if(
        Math.random() <
        .45
      ){

        obstacles.push({

          x:760,

          w:25,

          h:rand(
            25,
            60
          )

        });

      }


      if(
        Math.random() <
        .65
      ){

        coins.push({

          x:760,

          y:rand(
            120,
            190
          )

        });

      }

    },
    700
  );


  every(
    () => {

      velocity +=
        .8;


      y +=
        velocity;


      if(
        y >
        ground
      ){

        y =
          ground;


        velocity =
          0;

      }


      obstacles.forEach(
        obstacle =>
          obstacle.x -=
            7
      );


      coins.forEach(
        coin =>
          coin.x -=
            7
      );


      obstacles =
        obstacles.filter(
          obstacle => {

            if(
              obstacle.x <
                95 &&
              obstacle.x +
                obstacle.w >
                60 &&
              y +
                35 >
              225 -
                obstacle.h
            ){

              $("#dashMsg").textContent =
                "You hit an obstacle! -100 score";


              score =
                Math.max(
                  0,
                  score -
                  100
                );


              S.wrong();


              return false;

            }


            return obstacle.x >
              -40;

          }
        );


      coins =
        coins.filter(
          coin => {

            if(
              Math.abs(
                coin.x -
                75
              ) <
                28 &&
              Math.abs(
                coin.y -
                y
              ) <
                35
            ){

              score +=
                50;


              S.coin();


              return false;

            }


            return coin.x >
              -20;

          }
        );


      context.clearRect(
        0,
        0,
        760,
        260
      );


      context.fillStyle =
        "#07111d";


      context.fillRect(
        0,
        0,
        760,
        260
      );


      context.fillStyle =
        "#19334d";


      context.fillRect(
        0,
        230,
        760,
        30
      );


      context.fillStyle =
        "#64c8ff";


      context.fillRect(
        55,
        y,
        40,
        40
      );


      context.fillStyle =
        "#ff748a";


      obstacles.forEach(
        obstacle => {

          context.fillRect(
            obstacle.x,
            230 -
            obstacle.h,
            obstacle.w,
            obstacle.h
          );

        }
      );


      context.fillStyle =
        "#ffe08a";


      context.font =
        "24px sans-serif";


      coins.forEach(
        coin => {

          context.fillText(
            "♪",
            coin.x,
            coin.y
          );

        }
      );


      $("#dashScore").textContent =
        score;

    },
    33
  );


  every(
    () => {

      time--;


      if(
        time <=
        0
      ){

        stopActiveGame();


        reward(
          20 +
          Math.round(
            score /
            100
          ),
          Math.round(
            score /
            25
          ),
          "Music Dash complete!"
        );

      }

    },
    1000
  );

}


/* =========================================================
   INSTRUMENT HERO
========================================================= */

function startInstrumentHero(){

  const instrument =
    getInstrument(
      profile.equipped
    );


  $("#gameBody").innerHTML =
    `
    <div class="game-panel">

      <h3>
        ${instrument.icon}
        ${instrument.name}
        Hero
      </h3>

      <p>
        Hit A S D F in sequence.
        Faster streaks give more points.
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
    "a",
    "s",
    "d",
    "f"
  ];


  let target =
    pick(
      keys
    );


  let score =
    0;


  let time =
    20;


  $("#ihTarget").textContent =
    target.toUpperCase();


  activeKeyHandler =
    event => {

      if(
        !keys.includes(
          event.key
            .toLowerCase()
        )
      )
        return;


      if(
        event.key
          .toLowerCase() ===
        target
      ){

        score +=
          100;


        S.perfect();


        playInstrument(
          instrument.name,
          440 +
          score%300
        );


        target =
          pick(
            keys
          );


        $("#ihTarget").textContent =
          target.toUpperCase();


        $("#ihScore").textContent =
          score;

      }else{

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
    "keydown",
    activeKeyHandler
  );


  every(
    () => {

      time--;


      $("#ihTime").textContent =
        time;


      if(
        time <=
        0
      ){

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
            xp*.7
          ),
          "Instrument Hero complete!"
        );


        addMastery(
          instrument.name,
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

function startBeatBattle(){

  $("#gameBody").innerHTML =
    `
    <div class="game-panel">

      <h3>
        🎧 Bass Golem
      </h3>

      <div
        class="hpbar red"
        style="
          max-width:520px;
          margin:10px auto;
        "
      >
        <i id="bbBossHp"></i>
      </div>

      <b id="bbBossText">
        3000 / 3000
      </b>

      <p>
        Press SPACE when the marker is inside the gold zone.
      </p>

      <div
        style="
          height:28px;
          max-width:520px;
          margin:18px auto;
          background:#13263a;
          border-radius:999px;
          position:relative;
        "
      >

        <div
          style="
            position:absolute;
            left:44%;
            width:12%;
            top:0;
            bottom:0;
            background:#b79143;
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
            border-radius:6px;
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


  let position =
    0;


  let direction =
    1;


  let ended =
    false;


  every(
    () => {

      position +=
        direction *
        2.5;


      if(
        position >=
          100 ||
        position <=
          0
      ){

        direction *=
          -1;

      }


      $("#bbMarker").style.left =
        `calc(${position}% - 4px)`;

    },
    20
  );


  activeKeyHandler =
    event => {

      if(
        event.code !==
          "Space" ||
        ended
      )
        return;


      const distance =
        Math.abs(
          position -
          50
        );


      let damage;


      if(
        distance <=
        6
      ){

        damage =
          420;


        S.perfect();

      }

      else if(
        distance <=
        14
      ){

        damage =
          260;


        S.great();

      }

      else{

        damage =
          90;


        S.miss();

      }


      hp =
        Math.max(
          0,
          hp -
          damage
        );


      $("#bbBossHp").style.width =
        `${hp/30}%`;


      $("#bbBossText").textContent =
        `${hp} / 3000`;


      $("#bbText").textContent =
        `${damage} damage!`;


      playInstrument(
        profile.equipped,
        520
      );


      if(
        hp <=
        0
      ){

        ended =
          true;


        stopActiveGame();


        S.victory();


        reward(
          110,
          120,
          "Bass Golem defeated!"
        );


        addMastery(
          profile.equipped,
          20
        );

      }

    };


  document.addEventListener(
    "keydown",
    activeKeyHandler
  );

}


/* =========================================================
   MUSIC DUNGEON
========================================================= */

function startDungeon(){

  let room =
    1;


  let hp =
    100;


  let boss =
    room%4 ===
    0;


  let enemyHp =
    boss
      ?1200
      :420;


  const render =
    () => {

      $("#gameBody").innerHTML =
        `
        <div class="game-panel">

          <h3>
            Room ${room}
            ${
              boss
                ?"👹 BOSS CHAMBER"
                :"🎵 Echo Chamber"
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


      $("#dAtk").onclick =
        () => {

          const instrument =
            getInstrument(
              profile.equipped
            );


          const damage =
            Math.round(
              instrument.attack *
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
              damage
            );


          playInstrument(
            instrument.name,
            440
          );


          S.attack();


          if(
            enemyHp <=
            0
          ){

            const xp =
              boss
                ?100
                :24;


            const coins =
              boss
                ?110
                :20;


            reward(
              xp,
              coins,
              boss
                ?"Dungeon boss defeated!"
                :"Room cleared!"
            );


            addMastery(
              instrument.name,
              boss
                ?15
                :4
            );


            room++;


            boss =
              room%4 ===
              0;


            enemyHp =
              boss
                ?1200
                :420;


            hp =
              Math.min(
                100,
                hp +
                15
              );


            render();


            return;

          }


          const hurt =
            rand(
              8,
              boss
                ?24
                :16
            );


          hp =
            Math.max(
              0,
              hp -
              hurt
            );


          if(
            hp <=
            0
          ){

            S.defeat();


            addXP(
              10
            );


            $("#gameBody").innerHTML =
              `
              <div class="game-panel">

                <h3>
                  Dungeon Run Ended
                </h3>

                <p>
                  You reached room
                  ${room}.
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


            $("#dAgain").onclick =
              startDungeon;

          }else{

            render();

          }

        };


      $("#dHeal").onclick =
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


      $("#dChest").onclick =
        () => {

          if(
            Math.random() <
            .55
          ){

            profile.coins +=
              rand(
                10,
                40
              );


            persist();


            updateProfileUI();


            S.treasure();


            toast(
              "Treasure found!"
            );

          }else{

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
              "A trap!"
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

  accessory:[

    [
      "Black Cap",
      "Common"
    ],

    [
      "Studio Headphones",
      "Uncommon"
    ],

    [
      "Star Glasses",
      "Rare"
    ],

    [
      "Cyber Visor",
      "Epic"
    ],

    [
      "Royal Crown",
      "Legendary"
    ],

    [
      "MusicVerse Crown",
      "Mythic"
    ]

  ],


  pet:[

    [
      "Music Cat",
      "Common"
    ],

    [
      "Beat Puppy",
      "Common"
    ],

    [
      "Neon Fox",
      "Rare"
    ],

    [
      "Music Ghost",
      "Epic"
    ],

    [
      "Phoenix",
      "Legendary"
    ],

    [
      "Celestial Dragon",
      "Mythic"
    ]

  ],


  aura:[

    [
      "Musical Notes",
      "Common"
    ],

    [
      "Rhythm Pulse",
      "Uncommon"
    ],

    [
      "Flame Aura",
      "Rare"
    ],

    [
      "Lightning Aura",
      "Epic"
    ],

    [
      "Celestial Aura",
      "Legendary"
    ],

    [
      "Galaxy Aura",
      "Mythic"
    ]

  ],


  skin:[

    [
      "Sakura Skin",
      "Rare"
    ],

    [
      "Thunder Skin",
      "Epic"
    ],

    [
      "Phoenix Skin",
      "Legendary"
    ],

    [
      "Cosmic Void Skin",
      "Mythic"
    ]

  ]

};


let activeGacha =
  "accessory";


const costs = {

  accessory:100,

  pet:200,

  aura:175,

  skin:150

};


function rarityRoll(){

  const roll =
    Math.random() *
    100;


  if(
    roll <
    .5
  )
    return "Mythic";


  if(
    roll <
    3
  )
    return "Legendary";


  if(
    roll <
    11
  )
    return "Epic";


  if(
    roll <
    27
  )
    return "Rare";


  if(
    roll <
    55
  )
    return "Uncommon";


  return "Common";

}


function updateGachaUI(){

  const titles = {

    accessory:
      "Accessory Capsule",

    pet:
      "Pet Capsule",

    aura:
      "Aura Capsule",

    skin:
      "Skin Capsule"

  };


  $("#gachaTitle").textContent =
    titles[
      activeGacha
    ];


  $("#rollOneBtn").textContent =
    `Roll x1 • ${costs[activeGacha]} Coins`;


  $("#rollTenBtn").textContent =
    `Roll x10 • ${costs[activeGacha]*9} Coins`;

}


function rollGacha(
  count=1
){

  const cost =
    costs[
      activeGacha
    ] *
    (
      count ===
      10
        ?9
        :1
    );


  if(
    profile.coins <
    cost
  ){

    toast(
      "Not enough coins."
    );

    return;

  }


  profile.coins -=
    cost;


  const results =
    [];


  for(
    let i=0;
    i<count;
    i++
  ){

    const desired =
      rarityRoll();


    const pool =
      gachaData[
        activeGacha
      ];


    const matching =
      pool.filter(
        item =>
          item[1] ===
          desired
      );


    const item =
      pick(
        matching.length
          ?matching
          :pool
      );


    const key =
      `${activeGacha}:${item[0]}`;


    if(
      profile.inventory
        .some(
          inventoryItem =>
            inventoryItem.key ===
            key
        )
    ){

      profile.dust +=
        item[1] ===
        "Mythic"

        ?80

        :item[1] ===
         "Legendary"

        ?40

        :10;


      results.push(
        `${item[0]} → Dust`
      );

    }else{

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


  $("#gachaReveal").textContent =
    results.join(
      " • "
    );


  S.gacha();

}


function renderInventory(){

  $("#inventoryGrid").innerHTML =
    profile.inventory.length

    ?profile.inventory
      .map(
        item =>
          `
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
      .join("")

    :`
      <p class="muted">
        No cosmetics yet.
      </p>
    `;

}


$$(
  ".gacha-tab"
)
.forEach(
  button => {

    button.onclick =
      () => {

        $$(
          ".gacha-tab"
        )
        .forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        activeGacha =
          button.dataset.gacha;


        updateGachaUI();

      };

  }
);


$("#rollOneBtn").onclick =
  () =>
    rollGacha(
      1
    );


$("#rollTenBtn").onclick =
  () =>
    rollGacha(
      10
    );


/* =========================================================
   MUSICCRAFT
========================================================= */

const craftCanvas =
  $("#craftCanvas");


const craftContext =
  craftCanvas.getContext(
    "2d"
  );


let craftWorld =
  [];


let craftMined =
  0;


let craftInventory = {

  Stone:0,

  Coal:0,

  Gold:0,

  Crystal:0

};


const craftTypes = [

  [
    "Stone",
    "#6d7885",
    1
  ],

  [
    "Coal",
    "#28313a",
    2
  ],

  [
    "Gold",
    "#d8ad42",
    5
  ],

  [
    "Crystal",
    "#8e73ff",
    8
  ]

];


function newCraftWorld(){

  craftWorld =
    Array.from(
      {
        length:12
      },
      () =>
        Array.from(
          {
            length:20
          },
          () =>
            pick(
              craftTypes
            )
        )
    );


  craftMined =
    0;


  craftInventory = {

    Stone:0,

    Coal:0,

    Gold:0,

    Crystal:0

  };


  renderCraft();

}


function renderCraft(){

  const width =
    craftCanvas.width /
    20;


  const height =
    craftCanvas.height /
    12;


  craftContext.clearRect(
    0,
    0,
    craftCanvas.width,
    craftCanvas.height
  );


  craftWorld
    .forEach(
      (
        row,
        y
      ) => {

        row.forEach(
          (
            block,
            x
          ) => {

            if(
              !block
            )
              return;


            craftContext.fillStyle =
              block[1];


            craftContext.fillRect(
              x*width+1,
              y*height+1,
              width-2,
              height-2
            );


            craftContext.fillStyle =
              "rgba(255,255,255,.12)";


            craftContext.fillRect(
              x*width+3,
              y*height+3,
              width-7,
              4
            );

          }
        );

      }
    );


  $("#craftInventory").innerHTML =
    Object.entries(
      craftInventory
    )
    .map(
      (
        [
          name,
          amount
        ]
      ) =>
        `
        <div>
          <span>
            ${name}
          </span>

          <b>
            ${amount}
          </b>
        </div>
        `
    )
    .join("");


  $("#missionText").textContent =
    `Mine 12 blocks • ${craftMined}/12`;

}


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
      craftWorld[
        y
      ]?.[
        x
      ];


    if(
      !block
    )
      return;


    craftWorld[
      y
    ][
      x
    ] =
      null;


    craftInventory[
      block[0]
    ]++;


    craftMined++;


    profile.coins +=
      block[2];


    persist();


    updateProfileUI();


    S.mine();


    renderCraft();

  };


$("#missionBtn").onclick =
  () => {

    if(
      craftMined <
      12
    ){

      toast(
        "Mine 12 blocks first."
      );

      return;

    }


    reward(
      25,
      40,
      "Mining mission complete!"
    );


    newCraftWorld();

  };


$("#newWorldBtn").onclick =
  () =>
    newCraftWorld();


/* =========================================================
   LEADERBOARD
========================================================= */

function renderLeaderboard(){

  const bots =
    Array.from(
      {
        length:99
      },
      (
        _,
        index
      ) => ({

        name:
          `${pick(botNames)}${index+1}`,

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
      "You",

    level:
      profile.level,

    xp:
      profile.totalXp,

    you:true

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
      player =>
        player.you
    ) +
    1;


  $("#yourRank").textContent =
    "#"+rank;


  $("#podium").innerHTML =
    bots
      .slice(
        0,
        3
      )
      .map(
        (
          player,
          index
        ) =>
          `
          <div>

            <span>
              ${
                [
                  "🥇",
                  "🥈",
                  "🥉"
                ][
                  index
                ]
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
      .join("");


  $("#leaderboardBody").innerHTML =
    bots
      .map(
        (
          player,
          index
        ) =>
          `
          <tr
            ${
              player.you
                ?'style="background:#12263c"'
                :""
            }
          >

            <td>
              #${index+1}
            </td>

            <td>
              ${
                player.you
                  ?"⭐ "
                  :""
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
      .join("");

}


/* =========================================================
   QUIZ
========================================================= */

const quizQs = [

  [
    "Which instrument usually has 88 keys?",
    [
      "Piano",
      "Violin",
      "Flute",
      "Trumpet"
    ],
    0
  ],

  [
    "Which family does the trumpet belong to?",
    [
      "Strings",
      "Brass",
      "Keys",
      "Woodwind"
    ],
    1
  ],

  [
    "What does tempo describe?",
    [
      "Volume",
      "Speed",
      "Pitch",
      "Instrument size"
    ],
    1
  ],

  [
    "Which instrument is played with a bow?",
    [
      "Violin",
      "Trumpet",
      "Drums",
      "Flute"
    ],
    0
  ],

  [
    "Which symbol often means a musical note?",
    [
      "♪",
      "©",
      "%",
      "@"
    ],
    0
  ],

  [
    "Which instrument is percussion?",
    [
      "Drums",
      "Cello",
      "Saxophone",
      "Harp"
    ],
    0
  ],

  [
    "What is a melody?",
    [
      "A sequence of notes",
      "A stage light",
      "A drum stick",
      "A microphone"
    ],
    0
  ],

  [
    "Which is a woodwind instrument?",
    [
      "Clarinet",
      "Tuba",
      "Piano",
      "Guitar"
    ],
    0
  ],

  [
    "What does forte usually mean?",
    [
      "Loud",
      "Soft",
      "Slow",
      "Silent"
    ],
    0
  ],

  [
    "Which instrument has strings and pedals?",
    [
      "Harp",
      "Flute",
      "Bongos",
      "Cornet"
    ],
    0
  ]

];


let quizIndex =
  0;


let quizScore =
  0;


function renderQuiz(){

  const question =
    quizQs[
      quizIndex
    ];


  $("#quizScore").textContent =
    quizScore;


  $("#quizCard").innerHTML =
    `
    <span class="eyebrow">
      QUESTION ${quizIndex+1}/${quizQs.length}
    </span>

    <h3>
      ${question[0]}
    </h3>

    <div class="quiz-options">

      ${
        question[1]
          .map(
            (
              answer,
              index
            ) =>
              `
              <button
                data-quiz="${index}"
              >
                ${answer}
              </button>
              `
          )
          .join("")
      }

    </div>
    `;


  $$(
    "[data-quiz]"
  )
  .forEach(
    button => {

      button.onclick =
        () => {

          const index =
            Number(
              button.dataset.quiz
            );


          const correct =
            index ===
            question[2];


          $$(
            "[data-quiz]"
          )
          .forEach(
            item =>
              item.disabled =
                true
          );


          button.classList.add(
            correct
              ?"correct"
              :"wrong"
          );


          if(
            correct
          ){

            quizScore++;


            addXP(
              5
            );


            profile.coins +=
              5;


            persist();


            updateProfileUI();


            S.correct();

          }else{

            S.wrong();

          }


          setTimeout(
            () => {

              quizIndex++;


              if(
                quizIndex >=
                quizQs.length
              ){

                $("#quizCard").innerHTML =
                  `
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


                $("#quizRestart").onclick =
                  () => {

                    quizIndex =
                      0;


                    quizScore =
                      0;


                    renderQuiz();

                  };

              }else{

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
