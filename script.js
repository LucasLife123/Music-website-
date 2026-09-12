import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/+esm";

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const load=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");

const families=["All","Strings","Keys","Percussion","Brass","Woodwind","World"];

const rawInstruments=[
["Guitar","🎸","Strings",78,58,72,76,"Balanced attacker","strum"],
["Ukulele","🪕","Strings",86,38,70,82,"Fast glass cannon","strum"],
["Piano","🎹","Keys",62,88,92,70,"Defensive powerhouse","keys"],
["Flute","🪈","Woodwind",58,48,96,82,"Melody specialist","wind"],
["Drums","🥁","Percussion",92,72,38,96,"Heavy rhythm attacker","drums"],
["Clarinet","🎶","Woodwind",60,64,88,72,"Balanced melody","wind"],
["Trumpet","🎺","Brass",88,54,68,74,"Burst damage","brass"],
["Violin","🎻","Strings",72,52,98,84,"High-skill melody","bow"],
["Saxophone","🎷","Woodwind",76,62,88,78,"Versatile","wind"],
["Cello","🎻","Strings",70,84,94,58,"Tanky melody","bow"],
["Xylophone","🪇","Percussion",68,50,76,92,"Combo specialist","mallet"],
["Trombone","🎺","Brass",84,70,62,64,"Heavy brass","brass"],
["Synthesizer","🎛️","Keys",74,58,90,86,"Effects specialist","keys"],
["French Horn","📯","Brass",72,82,86,58,"Defensive brass","brass"],
["Oboe","🎶","Woodwind",64,56,94,68,"Precision melody","wind"],
["Digital Piano","🎹","Keys",68,78,88,78,"Balanced keyboard","keys"],
["Organ","🎹","Keys",76,92,90,48,"Super tank","keys"],
["Drum Machine","🥁","Percussion",82,54,58,100,"Rhythm machine","pads"],
["Electric Guitar","⚡","Strings",94,48,68,88,"Aggressive attacker","strum"],
["Bass Guitar","🎸","Strings",86,76,54,90,"Heavy groove","pluck"],
["Harp","🪉","Strings",52,64,100,72,"Healing support","pluck"],
["Banjo","🪕","Strings",82,44,64,94,"Rapid combo","pluck"],
["Mandolin","🪕","Strings",80,46,78,90,"Fast melodic attacker","pluck"],
["Double Bass","🎻","Strings",82,90,72,54,"Massive tank","bow"],
["Accordion","🪗","Keys",72,74,82,78,"All-rounder","bellows"],
["Keytar","🎹","Keys",86,46,76,92,"Mobile attacker","keys"],
["Harpsichord","🎹","Keys",70,60,92,80,"Precision keys","keys"],
["Marimba","🥁","Percussion",66,58,84,94,"Melody/rhythm hybrid","mallet"],
["Timpani","🥁","Percussion",90,86,42,72,"Heavy percussion","drums"],
["Bongos","🪘","Percussion",78,42,54,98,"Extremely fast","drums"],
["Congas","🪘","Percussion",82,58,50,94,"Rhythm attacker","drums"],
["Tambourine","🪇","Percussion",70,34,58,100,"Fastest support","shake"],
["Steel Pan","🥁","Percussion",68,56,86,88,"Melodic percussion","mallet"],
["Tuba","🎺","Brass",90,94,54,38,"Super-heavy tank","brass"],
["Euphonium","🎺","Brass",76,84,78,54,"Balanced tank","brass"],
["Cornet","🎺","Brass",84,58,74,76,"Fast brass","brass"],
["Piccolo","🪈","Woodwind",66,32,96,92,"Fragile speed specialist","wind"],
["Bassoon","🎶","Woodwind",68,86,84,48,"Woodwind tank","wind"],
["Recorder","🪈","Woodwind",70,44,78,84,"Beginner all-rounder","wind"],
["Erhu","🐉","World",74,54,98,82,"Melodic bowed specialist","bow"],
["Guzheng","🌸","World",78,62,96,88,"Combo melody","pluck"],
["Pipa","🌙","World",84,50,88,92,"Rapid plucking","pluck"],
["Kalimba","✨","World",58,60,90,86,"Healing support","pluck"],
["Sitar","🌌","World",76,64,96,80,"Resonance specialist","pluck"],
["Shamisen","🌸","World",88,48,74,92,"Precision attacker","pluck"]
];

const instrumentData=rawInstruments.map(
  ([name,icon,family,attack,defense,melody,rhythm,style,play],i)=>({
    name,
    icon,
    family,
    attack,
    defense,
    melody,
    rhythm,
    style,
    play,
    price:i===0?0:220+i*95
  })
);

const moveSets={
  strum:[
    ["Power Strum","Heavy soundwave",1.06,"attack"],
    ["Rapid Riff","Fast combo",.80,"rhythm"],
    ["Perfect Chord","Shielding chord",.62,"shield"],
    ["Dragon Solo","Cinematic ultimate",1.88,"ultimate"]
  ],
  keys:[
    ["Power Chord","Heavy chord",1.00,"attack"],
    ["Rapid Keys","Fast run",.82,"rhythm"],
    ["Sustain Shield","Defensive harmony",.62,"shield"],
    ["Grand Crescendo","Massive finale",1.82,"ultimate"]
  ],
  drums:[
    ["Power Beat","Heavy beat",1.10,"attack"],
    ["Drum Roll","Rapid combo",.84,"rhythm"],
    ["Rhythm Barrier","Beat shield",.62,"shield"],
    ["Thunder Beat","Lightning ultimate",1.90,"ultimate"]
  ],
  wind:[
    ["Focused Note","Precise note",.94,"melody"],
    ["Rapid Scale","Fast run",.82,"rhythm"],
    ["Breath Guard","Heal with melody",.58,"heal"],
    ["Cyclone Symphony","Wind ultimate",1.78,"ultimate"]
  ],
  brass:[
    ["Brass Blast","Direct blast",1.06,"attack"],
    ["Fanfare Rush","Fast phrase",.82,"rhythm"],
    ["Royal Guard","Protective resonance",.62,"shield"],
    ["Solar Fanfare","Brass ultimate",1.86,"ultimate"]
  ],
  bow:[
    ["Power Bow","Strong bow stroke",.98,"melody"],
    ["Rapid Bow","Fast bow combo",.82,"rhythm"],
    ["Harmony Strings","Shielding phrase",.62,"shield"],
    ["Phoenix Symphony","String ultimate",1.86,"ultimate"]
  ],
  mallet:[
    ["Mallet Strike","Focused strike",.98,"attack"],
    ["Scale Rush","Rapid scale",.82,"rhythm"],
    ["Resonance","Protective ring",.60,"shield"],
    ["Rainbow Cascade","Mallet ultimate",1.80,"ultimate"]
  ],
  pads:[
    ["Beat Drop","Heavy pad",1.02,"attack"],
    ["Pad Rush","Fast sequence",.84,"rhythm"],
    ["Bass Sequence","Build shield",.60,"shield"],
    ["Mega Beat Drop","Electronic ultimate",1.90,"ultimate"]
  ],
  pluck:[
    ["Crystal Pluck","Focused pluck",.94,"melody"],
    ["Finger Rush","Rapid plucking",.82,"rhythm"],
    ["Resonance","Harmony shield",.60,"shield"],
    ["Starlight Cascade","Plucked ultimate",1.82,"ultimate"]
  ],
  bellows:[
    ["Squeeze Beat","Bellows attack",.98,"attack"],
    ["Polka Rush","Fast combo",.82,"rhythm"],
    ["Bellows Guard","Defensive squeeze",.60,"shield"],
    ["Festival Frenzy","Accordion ultimate",1.80,"ultimate"]
  ],
  shake:[
    ["Rhythm Shake","Fast shake",.92,"rhythm"],
    ["Jingle Rush","Multi-hit burst",.80,"rhythm"],
    ["Tempo Guard","Protective tempo",.58,"shield"],
    ["Carnival Storm","Rhythm ultimate",1.78,"ultimate"]
  ]
};

const rarities={
  common:{
    label:"COMMON",
    weight:45,
    color:"#aab5c0",
    dust:8
  },
  uncommon:{
    label:"UNCOMMON",
    weight:28,
    color:"#54d88a",
    dust:15
  },
  rare:{
    label:"RARE",
    weight:16,
    color:"#5cafff",
    dust:30
  },
  epic:{
    label:"EPIC",
    weight:8,
    color:"#bd7cff",
    dust:60
  },
  legendary:{
    label:"LEGENDARY",
    weight:2.5,
    color:"#ffd65a",
    dust:120
  },
  mythic:{
    label:"MYTHIC",
    weight:.5,
    color:"#ff7fe1",
    dust:260
  }
};

const rarityOrder=[
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythic"
];

const bonus=(text,mods)=>({text,mods});

const accessoryPool=[
  [
    "black_cap",
    "Black Cap",
    "head",
    "common",
    bonus("+1% Defense",{defense:1})
  ],
  [
    "round_glasses",
    "Round Glasses",
    "face",
    "common",
    bonus("+1% Melody",{melody:1})
  ],
  [
    "studio_headphones",
    "Studio Headphones",
    "head",
    "uncommon",
    bonus("+2% Rhythm",{rhythm:2})
  ],
  [
    "gold_chain",
    "Gold Chain",
    "neck",
    "rare",
    bonus("+3% Attack",{attack:3})
  ],
  [
    "star_glasses",
    "Star Glasses",
    "face",
    "rare",
    bonus("+3% Melody",{melody:3})
  ],
  [
    "cyber_visor",
    "Cyber Visor",
    "face",
    "epic",
    bonus("+4% Rhythm",{rhythm:4})
  ],
  [
    "angel_wings",
    "Angel Wings",
    "back",
    "legendary",
    bonus("+5% Defense",{defense:5})
  ],
  [
    "royal_crown",
    "Royal Crown",
    "head",
    "legendary",
    bonus("+5% Attack",{attack:5})
  ],
  [
    "musicverse_crown",
    "MusicVerse Crown",
    "head",
    "mythic",
    bonus("+3% all stats",{
      attack:3,
      defense:3,
      melody:3,
      rhythm:3
    })
  ],
  [
    "neon_sneakers",
    "Neon Sneakers",
    "shoes",
    "rare",
    bonus("+3% Rhythm",{rhythm:3})
  ],
  [
    "royal_jacket",
    "Royal Music Jacket",
    "clothing",
    "epic",
    bonus("+2% Attack +2% Defense",{
      attack:2,
      defense:2
    })
  ],
  [
    "golden_cape",
    "Golden Cape",
    "back",
    "legendary",
    bonus("+3% Melody +3% Defense",{
      melody:3,
      defense:3
    })
  ]
].map(
  ([id,name,slot,rarity,ability])=>({
    id,
    name,
    slot,
    rarity,
    ability,
    type:"accessory",
    icon:"👑"
  })
);

const petPool=[
  [
    "music_cat",
    "Music Cat",
    "common",
    "🐱",
    bonus("+2% Melody",{melody:2})
  ],
  [
    "beat_puppy",
    "Beat Puppy",
    "common",
    "🐶",
    bonus("+2% Rhythm",{rhythm:2})
  ],
  [
    "mini_robot",
    "Mini Robot",
    "rare",
    "🤖",
    bonus("+3% Defense",{defense:3})
  ],
  [
    "neon_fox",
    "Neon Fox",
    "rare",
    "🦊",
    bonus("+3% Attack",{attack:3})
  ],
  [
    "music_ghost",
    "Music Ghost",
    "epic",
    "👻",
    bonus("+4% Melody",{melody:4})
  ],
  [
    "baby_dragon",
    "Baby Dragon",
    "epic",
    "🐲",
    bonus("+4% Attack",{attack:4})
  ],
  [
    "crystal_unicorn",
    "Crystal Unicorn",
    "legendary",
    "🦄",
    bonus("+5% Melody",{melody:5})
  ],
  [
    "thunder_wolf",
    "Thunder Wolf",
    "legendary",
    "🐺",
    bonus("+5% Rhythm",{rhythm:5})
  ],
  [
    "phoenix",
    "Phoenix",
    "legendary",
    "🔥",
    bonus("Phoenix Guard: +5% Defense",{defense:5})
  ],
  [
    "celestial_dragon",
    "Celestial Dragon",
    "mythic",
    "🐉",
    bonus("+5% Attack +3% Defense",{
      attack:5,
      defense:3
    })
  ],
  [
    "cosmic_owl",
    "Cosmic Owl",
    "mythic",
    "🦉",
    bonus("+5% Melody +3% Rhythm",{
      melody:5,
      rhythm:3
    })
  ],
  [
    "musicverse_spirit",
    "MusicVerse Spirit",
    "mythic",
    "🎼",
    bonus("+3% all stats",{
      attack:3,
      defense:3,
      melody:3,
      rhythm:3
    })
  ]
].map(
  ([id,name,rarity,icon,ability])=>({
    id,
    name,
    rarity,
    icon,
    ability,
    type:"pet",
    slot:"pet"
  })
);

const auraPool=[
  [
    "music_notes",
    "Musical Notes",
    "common",
    "🎵",
    bonus("+2% Melody",{melody:2})
  ],
  [
    "rhythm_pulse",
    "Rhythm Pulse",
    "uncommon",
    "💨",
    bonus("+2% Rhythm",{rhythm:2})
  ],
  [
    "flame_aura",
    "Flame Aura",
    "rare",
    "🔥",
    bonus("+3% Attack",{attack:3})
  ],
  [
    "frost_aura",
    "Frost Aura",
    "rare",
    "❄️",
    bonus("+3% Defense",{defense:3})
  ],
  [
    "lightning_aura",
    "Lightning Aura",
    "epic",
    "⚡",
    bonus("+4% Rhythm",{rhythm:4})
  ],
  [
    "sakura_aura",
    "Sakura Aura",
    "epic",
    "🌸",
    bonus("+4% Melody",{melody:4})
  ],
  [
    "celestial_aura",
    "Celestial Aura",
    "legendary",
    "👼",
    bonus("+5% Defense",{defense:5})
  ],
  [
    "dragon_aura",
    "Dragon Aura",
    "legendary",
    "🐉",
    bonus("+5% Attack",{attack:5})
  ],
  [
    "galaxy_aura",
    "Galaxy Aura",
    "mythic",
    "🌌",
    bonus("+5% Melody +3% Rhythm",{
      melody:5,
      rhythm:3
    })
  ],
  [
    "rainbow_symphony",
    "Rainbow Symphony",
    "mythic",
    "🌈",
    bonus("+3% all stats",{
      attack:3,
      defense:3,
      melody:3,
      rhythm:3
    })
  ],
  [
    "void_aura",
    "Void Aura",
    "mythic",
    "🕳️",
    bonus("+5% Attack +3% Defense",{
      attack:5,
      defense:3
    })
  ]
].map(
  ([id,name,rarity,icon,ability])=>({
    id,
    name,
    rarity,
    icon,
    ability,
    type:"aura",
    slot:"aura"
  })
);

const skinThemes=[
  [
    "sakura",
    "Sakura",
    "rare",
    "🌸",
    bonus("+2% Melody",{melody:2}),
    "#f4aac9",
    "#6f3154"
  ],
  [
    "thunder",
    "Thunder",
    "epic",
    "⚡",
    bonus("+3% Rhythm",{rhythm:3}),
    "#eed34e",
    "#18203a"
  ],
  [
    "phoenix",
    "Phoenix",
    "legendary",
    "🔥",
    bonus("+4% Attack",{attack:4}),
    "#ff7433",
    "#7c1717"
  ],
  [
    "celestial",
    "Celestial",
    "legendary",
    "✨",
    bonus("+4% Melody",{melody:4}),
    "#cfe8ff",
    "#775f9e"
  ],
  [
    "void",
    "Cosmic Void",
    "mythic",
    "🌌",
    bonus("+3% Attack +3% Rhythm",{
      attack:3,
      rhythm:3
    }),
    "#5d45a7",
    "#130b29"
  ]
];

const skinPool=instrumentData.flatMap(inst=>
  skinThemes.map(
    ([key,label,rarity,icon,ability,primary,secondary])=>({
      id:`skin_${slug(inst.name)}_${key}`,
      name:`${label} ${inst.name}`,
      instrument:inst.name,
      rarity,
      icon,
      ability,
      primary,
      secondary,
      type:"skin",
      slot:"skin"
    })
  )
);

const allCollectibles=[
  ...accessoryPool,
  ...petPool,
  ...auraPool,
  ...skinPool
];

const defaultProfile={
  playerName:"",
  level:1,
  xp:0,
  totalXpEarned:0,
  highestLevel:1,
  musicCoins:1200,
  starDust:0,

  avatar:{
    preset:"hero",
    skin:"#dca57b",
    hairColor:"#201915",
    outfit:"#19345b"
  },

  owned:{
    accessory:[],
    pet:[],
    aura:[],
    skin:[]
  },

  equipped:{
    head:null,
    face:null,
    neck:null,
    back:null,
    shoes:null,
    clothing:null,
    pet:null,
    aura:null,
    skins:{}
  },

  gacha:{
    accessory:{
      legendary:0,
      mythic:0
    },
    pet:{
      legendary:0,
      mythic:0
    },
    aura:{
      legendary:0,
      mythic:0
    },
    skin:{
      legendary:0,
      mythic:0
    }
  }
};

let profile={
  ...defaultProfile,
  ...load("musicverseProfile",{})
};

profile.avatar={
  ...defaultProfile.avatar,
  ...(profile.avatar||{})
};

profile.owned={
  ...defaultProfile.owned,
  ...(profile.owned||{})
};

profile.equipped={
  ...defaultProfile.equipped,
  ...(profile.equipped||{})
};

profile.equipped.skins={
  ...(profile.equipped.skins||{})
};

profile.gacha={
  ...defaultProfile.gacha,
  ...(profile.gacha||{})
};

for(const k of ["accessory","pet","aura","skin"]){
  profile.gacha[k]={
    ...defaultProfile.gacha[k],
    ...(profile.gacha[k]||{})
  };
}

const defaultBattleData={
  wins:0,
  losses:0,
  equipped:"Guitar",
  owned:["Guitar"],
  mastery:{},
  energy:0,
  demoRP:0,
  onlineRP:0,
  streak:0,
  demoWins:0,
  demoLosses:0
};

let battleData={
  ...defaultBattleData,
  ...load("musicverseBattle",{})
};

battleData.owned=[
  ...new Set(
    battleData.owned||["Guitar"]
  )
];

battleData.mastery||={};

let craft=load(
  "musicverseCraft",
  null
);

let activeFamily="All";
let battleMode="practice";
let activeGacha="accessory";

let battle={
  playerHp:100,
  enemyHp:100,
  playerMax:100,
  enemyMax:100,
  enemy:null,
  turnLocked:false,
  playerShield:0,
  enemyShield:0
};

let pendingTiming=null;
let timingRAF=null;
let timingStart=0;

function persist(){
  save(
    "musicverseProfile",
    profile
  );

  save(
    "musicverseBattle",
    battleData
  );
}

function toast(m){
  const e=$("#toast");

  e.textContent=m;
  e.classList.add("show");

  setTimeout(
    ()=>e.classList.remove("show"),
    2100
  );
}

function addXP(n){

  if(n>0){

    profile.totalXpEarned+=n;
    profile.xp+=n;

    while(profile.xp>=100){

      profile.xp-=100;
      profile.level++;

      profile.highestLevel=Math.max(
        profile.highestLevel,
        profile.level
      );

      profile.musicCoins+=75;

      toast(
        `Level up! Level ${profile.level} +75 Music Coins`
      );
    }

  }else{

    profile.xp+=n;

    while(
      profile.xp<0 &&
      profile.level>1
    ){

      profile.level--;
      profile.xp+=100;
    }

    profile.xp=Math.max(
      0,
      profile.xp
    );
  }

  persist();
  updateProfileUI();
}

function addCoins(n){

  profile.musicCoins=Math.max(
    0,
    profile.musicCoins+n
  );

  persist();
  updateProfileUI();
}

function addMastery(name,n){

  battleData.mastery[name]=
    (battleData.mastery[name]||0)+n;

  persist();
}

function masteryTier(x){

  return x>=50000
    ?"👑 Grand Master"

    :x>=40000
    ?"💎 Diamond Master"

    :x>=30000
    ?"🥇 Gold Master"

    :x>=20000
    ?"🥈 Silver Master"

    :x>=10000
    ?"🥉 Bronze Master"

    :"Beginner";
}

function getInst(n){

  return instrumentData.find(
    x=>x.name===n
  )||instrumentData[0];
}

function rankName(rp){

  if(rp>=4000)
    return"🌌 MusicVerse Legend";

  if(rp>=3000)
    return"👑 Master";

  if(rp>=2600)
    return"💎 Diamond I";

  if(rp>=2300)
    return"💎 Diamond II";

  if(rp>=2000)
    return"💎 Diamond III";

  if(rp>=1800)
    return"🥇 Gold I";

  if(rp>=1600)
    return"🥇 Gold II";

  if(rp>=1400)
    return"🥇 Gold III";

  if(rp>=1200)
    return"🥈 Silver I";

  if(rp>=1000)
    return"🥈 Silver II";

  if(rp>=800)
    return"🥈 Silver III";

  if(rp>=600)
    return"🥉 Bronze I";

  if(rp>=400)
    return"🥉 Bronze II";

  return"🥉 Bronze III";
}

function cosmeticMods(){

  const mods={
    attack:0,
    defense:0,
    melody:0,
    rhythm:0
  };

  const ids=
    Object.values(profile.equipped)
    .filter(
      v=>typeof v==="string"
    );

  const skinId=
    profile.equipped.skins?.[
      battleData.equipped
    ];

  if(skinId)
    ids.push(skinId);

  for(const id of ids){

    const item=
      allCollectibles.find(
        i=>i.id===id
      );

    if(!item)
      continue;

    for(
      const [k,v]
      of Object.entries(
        item.ability?.mods||{}
      )
    ){

      mods[k]=
        (mods[k]||0)+v;
    }
  }

  if(
    battleMode==="demoRanked" ||
    battleMode==="onlineRanked"
  ){

    for(const k in mods)
      mods[k]=Math.min(
        mods[k],
        10
      );
  }

  return mods;
}

function finalStats(inst){

  const m=cosmeticMods();

  return{
    attack:
      inst.attack*
      (1+m.attack/100),

    defense:
      inst.defense*
      (1+m.defense/100),

    melody:
      inst.melody*
      (1+m.melody/100),

    rhythm:
      inst.rhythm*
      (1+m.rhythm/100)
  };
}

function statHtml(i){

  return[
    ["ATK",i.attack],
    ["DEF",i.defense],
    ["MEL",i.melody],
    ["RHY",i.rhythm]
  ]
  .map(([l,v])=>
    `
    <div class="stat-row">

      <span>${l}</span>

      <div class="stat-bar">
        <i style="width:${Math.min(100,v)}%"></i>
      </div>

      <b>${Math.round(v)}</b>

    </div>
    `
  )
  .join("");
}

function updateProfileUI(){

  $("#heroName").textContent=
    profile.playerName||"Player";

  $("#heroLevel").textContent=
    `Level ${profile.level}`;

  $("#heroCoins").textContent=
    profile.musicCoins.toLocaleString();

  $("#heroDust").textContent=
    profile.starDust.toLocaleString();

  $("#heroLifetime").textContent=
    profile.totalXpEarned.toLocaleString();

  $("#coinTop").textContent=
    profile.musicCoins.toLocaleString();

  $("#dustTop").textContent=
    profile.starDust.toLocaleString();

  $("#levelTop").textContent=
    profile.level;

  $("#gachaCoins").textContent=
    profile.musicCoins.toLocaleString();

  $("#gachaDust").textContent=
    profile.starDust.toLocaleString();

  $("#recordLabel").textContent=
    `${battleData.wins}W / ${battleData.losses}L`;

  $("#demoRankLabel").textContent=
    rankName(
      battleData.demoRP
    );

  $("#demoRpLabel").textContent=
    `${battleData.demoRP} RP`;

  $("#onlineRankLabel").textContent=
    battleData.onlineRP
      ?rankName(
        battleData.onlineRP
      )
      :"Unranked";

  $("#onlineRpLabel").textContent=
    `${battleData.onlineRP} RP`;

  $("#streakLabel").textContent=
    `${battleData.streak} 🔥`;

  updateGachaUI();
}

function setupProfile(){

  const presets=[
    "hero",
    "swift",
    "power",
    "star",
    "neo",
    "legend"
  ];

  const tones=[
    "#dca57b",
    "#f0c7a5",
    "#a56b46",
    "#71452f",
    "#4a2d24"
  ];

  const hairs=[
    "#201915",
    "#4b2b18",
    "#8a552e",
    "#d3aa55",
    "#111111"
  ];

  const outfits=[
    "#19345b",
    "#7d2b3e",
    "#265a45",
    "#5b3f86",
    "#111827"
  ];

  $("#avatarPresetSelect").innerHTML=
    presets.map(
      x=>`<option>${x}</option>`
    ).join("");

  $("#skinSelect").innerHTML=
    tones.map(
      x=>`<option value="${x}">${x}</option>`
    ).join("");

  $("#hairSelect").innerHTML=
    hairs.map(
      x=>`<option value="${x}">${x}</option>`
    ).join("");

  $("#outfitSelect").innerHTML=
    outfits.map(
      x=>`<option value="${x}">${x}</option>`
    ).join("");

  if(!profile.playerName){

    $("#setupOverlay")
      .classList
      .remove("hidden");

    requestAnimationFrame(
      initSetupPreview
    );
  }

  $("#startBtn").onclick=()=>{

    const name=
      $("#playerNameInput")
      .value
      .trim();

    if(!name){

      $("#setupError").textContent=
        "Please choose a player name.";

      return;
    }

    profile.playerName=name;

    profile.avatar.preset=
      $("#avatarPresetSelect").value;

    profile.avatar.skin=
      $("#skinSelect").value;

    profile.avatar.hairColor=
      $("#hairSelect").value;

    profile.avatar.outfit=
      $("#outfitSelect").value;

    persist();

    $("#setupOverlay")
      .classList
      .add("hidden");

    updateProfileUI();

    refreshBattle(true);
  };
}

function renderFamilies(){

  $("#familyTabs").innerHTML=
    families.map(
      f=>`
      <button
        class="tab ${f===activeFamily?"active":""}"
        data-family="${f}"
      >
        ${f}
      </button>
      `
    ).join("");

  $$("[data-family]")
  .forEach(
    b=>b.onclick=()=>{

      activeFamily=
        b.dataset.family;

      renderFamilies();
      renderInstruments();
    }
  );
}

function renderInstruments(){

  const q=
    $("#instrumentSearch")
    .value
    .toLowerCase()
    .trim();

  const rows=
    instrumentData.filter(
      i=>
        (
          activeFamily==="All" ||
          i.family===activeFamily
        )
        &&
        i.name
        .toLowerCase()
        .includes(q)
    );

  $("#instrumentGrid").innerHTML=
    rows.map(
      i=>`
      <article class="instrument-card">

        <div class="icon">
          ${i.icon}
        </div>

        <h3>
          ${i.name}
        </h3>

        <p>
          ${i.family} • ${i.style}
        </p>

        ${statHtml(i)}

        <button
          class="btn ${
            battleData.equipped===i.name
              ?"primary"
              :"ghost"
          } small"
          data-equip="${i.name}"
        >

          ${
            battleData.owned.includes(
              i.name
            )

            ?(
              battleData.equipped===i.name
                ?"Equipped"
                :"Equip"
            )

            :`Unlock • ${i.price} 🎵`
          }

        </button>

      </article>
      `
    ).join("");

  $$("[data-equip]")
  .forEach(
    b=>b.onclick=()=>
      unlockOrEquip(
        b.dataset.equip
      )
  );
}

function unlockOrEquip(name){

  const i=getInst(name);

  if(
    !battleData.owned.includes(
      name
    )
  ){

    if(
      profile.musicCoins<
      i.price
    ){

      return toast(
        `Need ${
          i.price-
          profile.musicCoins
        } more Music Coins.`
      );
    }

    profile.musicCoins-=
      i.price;

    battleData.owned.push(
      name
    );

    toast(
      `${name} unlocked!`
    );
  }

  battleData.equipped=name;

  persist();
  renderInstruments();
  refreshBattle(true);
  updateProfileUI();
}

function setBattleMode(mode){

  battleMode=mode;

  $$("#battleModeTabs .mode-btn")
  .forEach(
    b=>
      b.classList.toggle(
        "active",
        b.dataset.mode===mode
      )
  );

  $("#battleModeLabel").textContent=
    mode==="practice"
      ?"Practice"

      :mode==="demoRanked"
      ?"Demo Ranked"

      :"Online Ranked";

  if(
    mode==="onlineRanked"
  ){

    toast(
      "Online Ranked UI is ready; real players require a connected backend."
    );
  }

  refreshBattle(true);
}

function renderBattleInstrumentSelect(){

  $("#battleInstrumentSelect").innerHTML=
    battleData.owned.map(
      n=>`
      <option
        value="${n}"
        ${
          n===battleData.equipped
            ?"selected"
            :""
        }
      >
        ${n}
      </option>
      `
    ).join("");
}

function refreshBattle(
  newEnemy=false
){

  renderBattleInstrumentSelect();

  const inst=
    getInst(
      battleData.equipped
    );

  const fs=
    finalStats(inst);

  $("#playerBattleName").textContent=
    profile.playerName||"Player";

  $("#playerInstrumentLabel").textContent=
    inst.name;

  $("#playerStats").innerHTML=
    statHtml(fs);

  const mx=
    battleData.mastery[
      inst.name
    ]||0;

  $("#masteryValue").textContent=
    `${mx.toLocaleString()} EXP`;

  $("#masteryTier").textContent=
    masteryTier(mx);

  const mods=
    cosmeticMods();

  $("#cosmeticBonusBox").innerHTML=
    `
    <span>
      COSMETIC BONUSES
      ${
        battleMode!=="practice"
          ?" • Ranked cap 10%"
          :""
      }
    </span>

    <strong>
      ATK +${mods.attack}%
      • DEF +${mods.defense}%
      <br>
      MEL +${mods.melody}%
      • RHY +${mods.rhythm}%
    </strong>
    `;

  if(
    newEnemy ||
    !battle.enemy
  ){

    makeEnemy();
  }

  battle.playerMax=
    Math.round(
      90+
      fs.defense*.38
    );

  battle.enemyMax=
    Math.round(
      90+
      battle.enemy.defense*.38
    );

  battle.playerHp=
    battle.playerMax;

  battle.enemyHp=
    battle.enemyMax;

  battle.playerShield=0;
  battle.enemyShield=0;

  battleData.energy=0;

  battle.turnLocked=false;

  updateBattleBars();
  renderMoves();
  renderBattleScene();
  updateEnergy();
}

function makeEnemy(){

  const inst={
    ...pick(
      instrumentData.filter(
        i=>
          i.name!==
          battleData.equipped
      )
    )
  };

  let mult=1;

  if(
    battleMode==="practice"
  )
    mult=.92;

  if(
    battleMode==="demoRanked"
  )
    mult=1.02;

  if(
    battleMode==="onlineRanked"
  )
    mult=1.04;

  for(
    const k of [
      "attack",
      "defense",
      "melody",
      "rhythm"
    ]
  ){

    inst[k]=Math.round(
      inst[k]*mult
    );
  }

  battle.enemy=inst;

  const name=
    battleMode==="practice"
      ?"Training CPU"

      :battleMode==="demoRanked"
      ?pick([
        "BeatKnight",
        "PianoNova",
        "RhythmFox",
        "StringStorm",
        "TempoAce",
        "ChordKing"
      ])+rand(10,99)

      :"Online Player (backend needed)";

  $("#cpuBattleName").textContent=
    name;

  $("#cpuInstrumentLabel").textContent=
    inst.name;

  $("#cpuStats").innerHTML=
    statHtml(inst);

  logBattle(
    `${name} entered with ${inst.name}.`
  );
}

function updateBattleBars(){

  $("#playerHpFill").style.width=
    `${battle.playerHp/battle.playerMax*100}%`;

  $("#cpuHpFill").style.width=
    `${battle.enemyHp/battle.enemyMax*100}%`;

  $("#playerHpText").textContent=
    `${battle.playerHp} / ${battle.playerMax}`;

  $("#cpuHpText").textContent=
    `${battle.enemyHp} / ${battle.enemyMax}`;
}

function updateEnergy(){

  $("#energyPips").innerHTML=
    [0,1,2].map(
      i=>`
      <i
        class="pip ${
          i<battleData.energy
            ?"on"
            :""
        }"
      ></i>
      `
    ).join("");
}

function renderMoves(){

  const inst=
    getInst(
      battleData.equipped
    );

  const moves=
    moveSets[inst.play]
    ||moveSets.strum;

  $("#moveButtons").innerHTML=
    moves.map(
      (m,i)=>`
      <button
        class="move-btn ${
          i===3
            ?"ultimate"
            :""
        }"
        data-move="${i}"

        ${
          i===3 &&
          battleData.energy<3

          ?"disabled"
          :""
        }
      >

        <strong>
          ${m[0]}
        </strong>

        <span>
          ${
            i===3
              ?"ULTIMATE • 3 ENERGY"
              :m[3].toUpperCase()
          }
        </span>

        <small>
          ${m[1]}
        </small>

      </button>
      `
    ).join("");

  $$("[data-move]")
  .forEach(
    b=>b.onclick=()=>
      startPlayerMove(
        +b.dataset.move
      )
  );
}

function startPlayerMove(i){

  if(
    battle.turnLocked
  )
    return;

  const inst=
    getInst(
      battleData.equipped
    );

  const move=
    (
      moveSets[inst.play]
      ||moveSets.strum
    )[i];

  if(
    i===3 &&
    battleData.energy<3
  )
    return;

  battle.turnLocked=true;

  pendingTiming={
    inst,
    move,
    index:i
  };

  startTiming(
    move[0],
    inst.play
  );
}

function startTiming(
  name,
  play
){

  $("#timingOverlay")
    .classList
    .remove("hidden");

  $("#timingMoveName").textContent=
    name;

  $("#timingType").textContent=
    `${play.toUpperCase()} PERFORMANCE`;

  $("#timingResult").textContent=
    "";

  $("#timingHint").textContent=
    {
      strum:
        "Strum in the gold zone.",

      keys:
        "Land the chord in the gold zone.",

      drums:
        "Hit the beat in the gold zone.",

      wind:
        "Release the note in the gold zone.",

      brass:
        "Blast the note in the gold zone.",

      bow:
        "Change bow direction in the gold zone.",

      mallet:
        "Strike the bar in the gold zone.",

      pads:
        "Tap the pad in the gold zone.",

      pluck:
        "Pluck in the gold zone.",

      bellows:
        "Squeeze in the gold zone.",

      shake:
        "Shake on the beat."
    }[play]
    ||
    "Play in the gold zone.";

  timingStart=
    performance.now();

  cancelAnimationFrame(
    timingRAF
  );

  const marker=
    $("#timingMarker");

  const loop=t=>{

    const x=
      (
        (
          Math.sin(
            (t-timingStart)/420-
            Math.PI/2
          )+1
        )/2
      )*96;

    marker.style.left=
      `${x}%`;

    marker.dataset.x=x;

    timingRAF=
      requestAnimationFrame(
        loop
      );
  };

  timingRAF=
    requestAnimationFrame(
      loop
    );
}

function resolveTiming(){

  if(!pendingTiming)
    return;

  cancelAnimationFrame(
    timingRAF
  );

  const x=
    +(
      $("#timingMarker")
      .dataset.x||0
    );

  const d=
    Math.abs(
      x-50
    );

  let rating="MISS";
  let mult=.4;

  if(d<=4){

    rating="PERFECT";
    mult=1.25;

  }else if(d<=9){

    rating="GREAT";
    mult=1;

  }else if(d<=16){

    rating="GOOD";
    mult=.8;
  }

  $("#timingResult").textContent=
    rating;

  setTimeout(
    ()=>{

      $("#timingOverlay")
        .classList
        .add("hidden");

      executePlayerMove(
        pendingTiming.inst,
        pendingTiming.move,
        pendingTiming.index,
        mult,
        rating
      );

      pendingTiming=null;

    },
    350
  );
}

$("#timingHitBtn").onclick=
  resolveTiming;

window.addEventListener(
  "keydown",
  e=>{

    if(
      e.code==="Space" &&
      !$("#timingOverlay")
      .classList
      .contains("hidden")
    ){

      e.preventDefault();
      resolveTiming();
    }
  }
);

async function executePlayerMove(
  inst,
  move,
  index,
  timing,
  rating
){

  const fs=
    finalStats(inst);

  $("#battleStatus").textContent=
    `${rating}! ${move[0]}`;

  await playMoveAnimation(
    "player",
    inst.play,
    index
  );

  if(
    move[3]==="heal"
  ){

    const h=
      Math.round(
        (
          fs.melody*.22+9
        )*timing
      );

    battle.playerHp=
      clamp(
        battle.playerHp+h,
        0,
        battle.playerMax
      );

    logBattle(
      `${move[0]} healed ${h} HP.`
    );

  }else if(
    move[3]==="shield"
  ){

    battle.playerShield=1;

    const dmg=
      Math.round(
        (
          fs.melody*.12+5
        )*timing
      );

    battle.enemyHp=
      clamp(
        battle.enemyHp-dmg,
        0,
        battle.enemyMax
      );

    logBattle(
      `${move[0]} created a shield and dealt ${dmg}.`
    );

  }else{

    const source=
      move[3]==="rhythm"
        ?(
          fs.attack*.55+
          fs.rhythm*.45
        )

        :move[3]==="melody"
        ?fs.melody

        :fs.attack;

    let dmg=
      Math.max(
        4,
        Math.round(
          (
            source*.29+8
          )*
          move[2]*
          timing
          -
          battle.enemy.defense*.07
        )
      );

    if(
      battle.enemyShield
    ){

      const block=
        Math.round(
          dmg*.4
        );

      dmg-=block;

      battle.enemyShield=0;

      logBattle(
        `Enemy shield blocked ${block}.`
      );
    }

    battle.enemyHp=
      clamp(
        battle.enemyHp-dmg,
        0,
        battle.enemyMax
      );

    logBattle(
      `${move[0]} dealt ${dmg} (${rating}).`
    );
  }

  if(index===3){

    battleData.energy=0;

  }else{

    battleData.energy=
      clamp(
        battleData.energy+
        (
          rating==="PERFECT"
            ?2
            :1
        ),
        0,
        3
      );
  }

  updateBattleBars();
  updateEnergy();
  renderMoves();

  if(
    battle.enemyHp<=0
  ){

    return finishBattle(
      true
    );
  }

  setTimeout(
    enemyTurn,
    500
  );
}

async function enemyTurn(){

  const inst=
    battle.enemy;

  const moves=
    moveSets[inst.play]
    ||moveSets.strum;

  const idx=
    Math.random()<.2
      ?2

      :Math.random()<.5
      ?1

      :0;

  const move=
    moves[idx];

  $("#battleStatus").textContent=
    `Opponent performs ${move[0]}`;

  await playMoveAnimation(
    "enemy",
    inst.play,
    idx
  );

  if(
    move[3]==="heal"
  ){

    const h=
      Math.round(
        inst.melody*.14
      );

    battle.enemyHp=
      clamp(
        battle.enemyHp+h,
        0,
        battle.enemyMax
      );

    logBattle(
      `Opponent healed ${h}.`
    );

  }else if(
    move[3]==="shield"
  ){

    battle.enemyShield=1;

    logBattle(
      "Opponent gained a shield."
    );

  }else{

    const source=
      move[3]==="rhythm"
        ?(
          inst.attack*.55+
          inst.rhythm*.45
        )

        :move[3]==="melody"
        ?inst.melody

        :inst.attack;

    let dmg=
      Math.max(
        4,
        Math.round(
          source*.24*
          move[2]
          -
          finalStats(
            getInst(
              battleData.equipped
            )
          ).defense*.06
        )
      );

    if(
      battle.playerShield
    ){

      const block=
        Math.round(
          dmg*.45
        );

      dmg-=block;

      battle.playerShield=0;

      logBattle(
        `Your shield blocked ${block}.`
      );
    }

    battle.playerHp=
      clamp(
        battle.playerHp-dmg,
        0,
        battle.playerMax
      );

    logBattle(
      `Opponent dealt ${dmg}.`
    );
  }

  updateBattleBars();

  if(
    battle.playerHp<=0
  ){

    return finishBattle(
      false
    );
  }

  battle.turnLocked=false;

  $("#battleStatus").textContent=
    "Your turn — choose a move.";
}

function finishBattle(win){

  battle.turnLocked=true;

  const exp=
    win
      ?rand(24,38)
      :-rand(12,22);

  const coins=
    win

      ?battleMode==="practice"
      ?rand(20,35)

      :battleMode==="demoRanked"
      ?rand(35,50)

      :rand(50,75)

      :0;

  battleData[
    win
      ?"wins"
      :"losses"
  ]++;

  if(win){

    addXP(exp);

    addMastery(
      battleData.equipped,
      exp
    );

    addCoins(coins);

    if(
      battleMode==="demoRanked"
    ){

      const rp=
        rand(18,30);

      battleData.demoRP+=rp;
      battleData.streak++;
      battleData.demoWins++;

      toast(
        `Victory +${rp} RP +${coins} Music Coins`
      );

    }else if(
      battleMode==="onlineRanked"
    ){

      toast(
        "Online RP requires backend verification; local demo rewards only."
      );

    }else{

      toast(
        `Victory +${coins} Music Coins`
      );
    }

    $("#battleStatus").textContent=
      "Victory!";

    playVictory(
      "player"
    );

  }else{

    addXP(exp);

    if(
      battleMode==="demoRanked"
    ){

      const loss=
        rand(12,22);

      battleData.demoRP=
        Math.max(
          0,
          battleData.demoRP-loss
        );

      battleData.streak=0;
      battleData.demoLosses++;

      toast(
        `Defeat -${loss} RP`
      );
    }

    $("#battleStatus").textContent=
      "Defeat";

    playVictory(
      "enemy"
    );
  }

  persist();
  updateProfileUI();

  setTimeout(
    ()=>refreshBattle(true),
    1800
  );
}

function logBattle(m){

  const l=
    $("#battleLog");

  l.insertAdjacentHTML(
    "afterbegin",
    `<p>• ${m}</p>`
  );
}

/* ===========================
   THREE.JS BATTLE
=========================== */

let scene;
let camera;
let renderer;
let playerAvatar;
let enemyAvatar;
let raf;

let fx=[];

const cameraBase=
  new THREE.Vector3(
    0,
    3.2,
    8.6
  );

let cameraShake=0;

function mat(
  c,
  e=0x000000
){

  return new THREE.MeshStandardMaterial({
    color:c,
    roughness:.62,
    metalness:.08,
    emissive:e,
    emissiveIntensity:.25
  });
}

function box(
  w,
  h,
  d,
  m
){

  const x=
    new THREE.Mesh(
      new THREE.BoxGeometry(
        w,
        h,
        d
      ),
      m
    );

  x.castShadow=true;

  return x;
}

function createInstrument3D(name){

  const inst=
    getInst(name);

  const skin=
    skinPool.find(
      s=>
        s.id===
        profile.equipped.skins?.[
          name
        ]
    );

  const p=
    mat(
      skin?.primary
      ||
      "#c9884c"
    );

  const s=
    mat(
      skin?.secondary
      ||
      "#3b2419"
    );

  const g=
    new THREE.Group();

  if(
    inst.play==="keys"
  ){

    const b=
      box(
        1.25,
        .28,
        .58,
        s
      );

    g.add(b);

    for(
      let i=0;
      i<8;
      i++
    ){

      const k=
        box(
          .12,
          .05,
          .42,
          mat("#f4f2e9")
        );

      k.position.set(
        -.5+i*.145,
        .16,
        .02
      );

      g.add(k);
    }

  }else if(
    inst.play==="drums" ||
    inst.play==="pads" ||
    inst.play==="mallet"
  ){

    const d=
      box(
        1.0,
        .42,
        .5,
        p
      );

    g.add(d);

    for(
      let i=-1;
      i<=1;
      i++
    ){

      const pad=
        box(
          .24,
          .06,
          .22,
          mat("#e7d7a1")
        );

      pad.position.set(
        i*.3,
        .25,
        .05
      );

      g.add(pad);
    }

  }else if(
    inst.play==="wind" ||
    inst.play==="brass"
  ){

    const tube=
      box(
        1.15,
        .14,
        .14,
        p
      );

    tube.rotation.z=
      -.12;

    g.add(tube);

    const bell=
      box(
        .25,
        .3,
        .3,
        p
      );

    bell.position.x=.65;

    g.add(bell);

  }else{

    const body=
      box(
        .62,
        .78,
        .18,
        p
      );

    body.position.y=
      -.08;

    g.add(body);

    const neck=
      box(
        .16,
        .95,
        .13,
        s
      );

    neck.position.set(
      .2,
      .72,
      0
    );

    neck.rotation.z=
      -.18;

    g.add(neck);
  }

  g.scale.set(
    .7,
    .7,
    .7
  );

  return g;
}

function createAvatar(
  config,
  instrumentName,
  isEnemy=false
){

  const r=
    new THREE.Group();

  const skin=
    mat(
      config.skin
      ||
      "#dca57b"
    );

  const shirt=
    mat(
      isEnemy
      ?"#7d2d3d"
      :config.outfit
      ||"#19345b"
    );

  const hair=
    mat(
      config.hairColor
      ||
      "#201915"
    );

  const pants=
    mat(
      "#24334a"
    );

  const torso=
    box(
      1.1,
      .95,
      .55,
      shirt
    );

  torso.position.y=
    1.65;

  r.add(torso);

  const head=
    box(
      .9,
      .9,
      .9,
      skin
    );

  head.position.y=
    2.6;

  r.add(head);

  const ht=
    box(
      .94,
      .18,
      .94,
      hair
    );

  ht.position.y=
    3.12;

  r.add(ht);

  [-.18,.18]
  .forEach(
    x=>{

      const e=
        box(
          .07,
          .09,
          .04,
          mat("#111")
        );

      e.position.set(
        x,
        2.66,
        .47
      );

      r.add(e);
    }
  );

  const armL=
    new THREE.Group();

  const armR=
    new THREE.Group();

  armL.position.set(
    -.7,
    1.95,
    0
  );

  armR.position.set(
    .7,
    1.95,
    0
  );

  r.add(
    armL,
    armR
  );

  for(
    const a of [
      armL,
      armR
    ]
  ){

    const u=
      box(
        .32,
        .72,
        .32,
        shirt
      );

    u.position.y=
      -.38;

    a.add(u);

    const h=
      box(
        .33,
        .3,
        .33,
        skin
      );

    h.position.y=
      -.82;

    a.add(h);
  }

  const legL=
    new THREE.Group();

  const legR=
    new THREE.Group();

  legL.position.set(
    -.26,
    1.05,
    0
  );

  legR.position.set(
    .26,
    1.05,
    0
  );

  r.add(
    legL,
    legR
  );

  for(
    const l of [
      legL,
      legR
    ]
  ){

    const z=
      box(
        .38,
        .9,
        .42,
        pants
      );

    z.position.y=
      -.48;

    l.add(z);

    const f=
      box(
        .42,
        .2,
        .58,
        mat("#111827")
      );

    f.position.set(
      0,
      -1,
      .08
    );

    l.add(f);
  }

  const instrument=
    createInstrument3D(
      instrumentName
    );

  instrument.position.set(
    .05,
    1.45,
    .66
  );

  r.add(instrument);

  r.userData={
    torso,
    head,
    armL,
    armR,
    legL,
    legR,
    instrument,
    phase:
      Math.random()*6
  };

  if(!isEnemy)
    addEquippedVisuals(r);

  return r;
}

function addEquippedVisuals(r){

  const eq=
    profile.equipped;

  if(eq.head){

    const c=
      box(
        .7,
        .15,
        .7,
        mat("#d2ac48")
      );

    c.position.set(
      0,
      3.35,
      0
    );

    r.add(c);
  }

  if(eq.aura){

    for(
      let i=0;
      i<6;
      i++
    ){

      const q=
        box(
          .08,
          .08,
          .08,
          mat(
            "#f0d05a",
            0xf0d05a
          )
        );

      q.userData.orbit=i;

      q.position.y=
        1.5;

      r.add(q);
    }
  }

  if(eq.pet){

    const pet=
      box(
        .38,
        .38,
        .38,
        mat("#7cc5ff")
      );

    pet.position.set(
      -1.0,
      .65,
      .2
    );

    pet.userData.pet=
      true;

    r.add(pet);
  }
}

function renderBattleScene(){

  const host=
    $("#battle3D");

  const w=
    Math.max(
      300,
      host.clientWidth
    );

  const h=
    Math.max(
      260,
      host.clientHeight
    );

  if(renderer){

    cancelAnimationFrame(
      raf
    );

    renderer.dispose();
  }

  scene=
    new THREE.Scene();

  scene.background=
    new THREE.Color(
      0x9bd8ff
    );

  camera=
    new THREE.PerspectiveCamera(
      42,
      w/h,
      .1,
      100
    );

  camera.position.copy(
    cameraBase
  );

  camera.lookAt(
    0,
    1.5,
    0
  );

  renderer=
    new THREE.WebGLRenderer({
      antialias:true,
      alpha:true
    });

  renderer.setPixelRatio(
    Math.min(
      devicePixelRatio,
      2
    )
  );

  renderer.setSize(
    w,
    h
  );

  renderer.shadowMap.enabled=
    true;

  host.innerHTML="";

  host.appendChild(
    renderer.domElement
  );

  scene.add(
    new THREE.HemisphereLight(
      0xffffff,
      0x496b43,
      2.2
    )
  );

  const dl=
    new THREE.DirectionalLight(
      0xffffff,
      2.3
    );

  dl.position.set(
    4,
    7,
    4
  );

  scene.add(dl);

  const ground=
    box(
      14,
      .2,
      8,
      mat("#6aa84f")
    );

  ground.position.y=
    -.1;

  scene.add(ground);

  playerAvatar=
    createAvatar(
      profile.avatar,
      battleData.equipped,
      false
    );

  enemyAvatar=
    createAvatar(
      {
        skin:"#c98d67",
        hairColor:"#2e221d",
        outfit:"#7d2d3d"
      },
      battle.enemy?.name
      ||
      "Piano",
      true
    );

  playerAvatar.position.set(
    -2.4,
    0,
    0
  );

  enemyAvatar.position.set(
    2.4,
    0,
    0
  );

  enemyAvatar.rotation.y=
    Math.PI;

  scene.add(
    playerAvatar,
    enemyAvatar
  );

  loopScene();
}

function loopScene(
  t=0
){

  if(!renderer)
    return;

  for(
    const [a,off]
    of [
      [playerAvatar,0],
      [enemyAvatar,2]
    ]
  ){

    if(a){

      a.position.y=
        Math.sin(
          t*.003+
          a.userData.phase
        )*.035;

      a.userData.armL.rotation.x=
        Math.sin(
          t*.003+off
        )*.06;

      a.userData.armR.rotation.x=
        -Math.sin(
          t*.003+off
        )*.06;

      for(
        const c
        of a.children
      ){

        if(
          c.userData?.orbit!=null
        ){

          const ang=
            t*.001+
            c.userData.orbit;

          c.position.set(
            Math.cos(ang)*1.05,
            1.6+
            Math.sin(
              ang*1.8
            )*.35,
            Math.sin(ang)*.7
          );
        }
      }
    }
  }

  fx=
    fx.filter(
      o=>{

        o.mesh.position.add(
          o.vel
        );

        o.life--;

        if(
          o.life<=0
        ){

          scene.remove(
            o.mesh
          );

          return false;
        }

        return true;
      }
    );

  camera.position.copy(
    cameraBase
  );

  if(
    cameraShake>0
  ){

    camera.position.x+=
      (
        Math.random()-.5
      )*cameraShake;

    camera.position.y+=
      (
        Math.random()-.5
      )*cameraShake;

    cameraShake*=.82;
  }

  camera.lookAt(
    0,
    1.5,
    0
  );

  renderer.render(
    scene,
    camera
  );

  raf=
    requestAnimationFrame(
      loopScene
    );
}

function spawnNotes(
  fromX,
  toX,
  color="#f1d16f"
){

  for(
    let i=0;
    i<12;
    i++
  ){

    const m=
      box(
        .08,
        .08,
        .08,
        mat(
          color,
          0xffffff
        )
      );

    m.position.set(
      fromX+
      Math.random()*.2,

      1.5+
      Math.random()*1.3,

      (
        Math.random()-.5
      )*.7
    );

    scene.add(m);

    fx.push({
      mesh:m,

      vel:
        new THREE.Vector3(
          (toX-fromX)/28,
          (
            Math.random()-.5
          )*.02,
          (
            Math.random()-.5
          )*.02
        ),

      life:
        28+
        rand(0,10)
    });
  }
}

function playMoveAnimation(
  side,
  play,
  index
){

  return new Promise(
    res=>{

      const a=
        side==="player"
          ?playerAvatar
          :enemyAvatar;

      const dir=
        side==="player"
          ?1
          :-1;

      if(!a)
        return res();

      a.userData.torso.rotation.z=
        -dir*.10;

      a.userData.armL.rotation.x=
        -1.0;

      a.userData.armR.rotation.x=
        -.7;

      a.userData.instrument.rotation.z=
        dir*.08;

      spawnNotes(
        side==="player"
          ?-1.8
          :1.8,

        side==="player"
          ?1.8
          :-1.8,

        index===3
          ?"#ffd84f"
          :"#bfe5ff"
      );

      if(index===3){

        cameraShake=.22;

        a.scale.set(
          1.08,
          1.08,
          1.08
        );
      }

      setTimeout(
        ()=>{

          a.userData.torso.rotation.z=0;
          a.userData.armL.rotation.x=0;
          a.userData.armR.rotation.x=0;
          a.userData.instrument.rotation.z=0;

          a.scale.set(
            1,
            1,
            1
          );

          res();
        },
        620
      );
    }
  );
}

function playVictory(side){

  const a=
    side==="player"
      ?playerAvatar
      :enemyAvatar;

  if(!a)
    return;

  let n=0;

  const iv=
    setInterval(
      ()=>{

        a.rotation.y+=
          .45;

        a.position.y=
          .35*
          Math.abs(
            Math.sin(
              n*.8
            )
          );

        n++;

        if(n>12){

          clearInterval(iv);

          a.rotation.y=
            side==="player"
              ?0
              :Math.PI;

          a.position.y=0;
        }
      },
      70
    );
}

let setupRenderer;
let setupScene;
let setupCamera;
let setupAvatar;
let setupRAF;

function initSetupPreview(){

  const host=
    $("#setupPreview");

  const w=
    Math.max(
      280,
      host.clientWidth
    );

  const h=
    Math.max(
      240,
      host.clientHeight
    );

  setupScene=
    new THREE.Scene();

  setupCamera=
    new THREE.PerspectiveCamera(
      40,
      w/h,
      .1,
      100
    );

  setupCamera.position.set(
    0,
    2.25,
    6.4
  );

  setupRenderer=
    new THREE.WebGLRenderer({
      antialias:true,
      alpha:true
    });

  setupRenderer.setSize(
    w,
    h
  );

  host.innerHTML="";

  host.appendChild(
    setupRenderer.domElement
  );

  setupScene.add(
    new THREE.HemisphereLight(
      0xffffff,
      0x35536b,
      2.2
    )
  );

  const d=
    new THREE.DirectionalLight(
      0xffffff,
      2
    );

  d.position.set(
    3,
    5,
    4
  );

  setupScene.add(d);

  setupAvatar=
    createAvatar(
      profile.avatar,
      "Guitar",
      false
    );

  setupAvatar.position.y=
    -1.1;

  setupScene.add(
    setupAvatar
  );

  const loop=t=>{

    if(!setupRenderer)
      return;

    setupAvatar.rotation.y=
      Math.sin(
        t*.0006
      )*.35;

    setupRenderer.render(
      setupScene,
      setupCamera
    );

    setupRAF=
      requestAnimationFrame(
        loop
      );
  };

  setupRAF=
    requestAnimationFrame(
      loop
    );
}

/* ===========================
   GACHA
=========================== */

const gachaConfig={
  accessory:{
    title:"Accessory Gacha",
    subtitle:"Hair • Hats • Clothing • Wings • Glasses",
    cost:100,
    ten:900,
    pool:accessoryPool,
    icon:"👑"
  },

  pet:{
    title:"Pet Gacha",
    subtitle:"Pets only • Hatch your companion",
    cost:200,
    ten:1800,
    pool:petPool,
    icon:"🥚"
  },

  aura:{
    title:"Aura Gacha",
    subtitle:"Animated battle auras",
    cost:175,
    ten:1575,
    pool:auraPool,
    icon:"🔮"
  },

  skin:{
    title:"Instrument Skin Gacha",
    subtitle:"Exclusive visual instrument skins",
    cost:150,
    ten:1350,
    pool:skinPool,
    icon:"🎸"
  }
};

function updateGachaUI(){

  const c=
    gachaConfig[
      activeGacha
    ];

  const p=
    profile.gacha[
      activeGacha
    ];

  $("#gachaTitle").textContent=
    c.title;

  $("#gachaSubtitle").textContent=
    c.subtitle;

  $("#gachaOrb").textContent=
    c.icon;

  $("#rollOneBtn").textContent=
    `Roll x1 • ${c.cost} 🎵`;

  $("#rollTenBtn").textContent=
    `Roll x10 • ${c.ten} 🎵`;

  $("#gachaLegendaryPity").textContent=
    `${p.legendary} / 30`;

  $("#gachaMythicPity").textContent=
    `${p.mythic} / 100`;
}

function rollRarity(){

  const p=
    profile.gacha[
      activeGacha
    ];

  if(
    p.mythic>=99
  )
    return"mythic";

  if(
    p.legendary>=29
  ){

    return Math.random()<.18
      ?"mythic"
      :"legendary";
  }

  let r=
    Math.random()*100;

  let acc=0;

  for(
    const k
    of rarityOrder
  ){

    acc+=
      rarities[k].weight;

    if(r<=acc)
      return k;
  }

  return"common";
}

function ownedList(type){

  return profile.owned[type]
    ||[];
}

function rollOne(){

  let rarity=
    rollRarity();

  let pool=
    gachaConfig[
      activeGacha
    ].pool.filter(
      i=>
        i.rarity===rarity
    );

  if(
    activeGacha==="skin"
  ){

    pool=
      pool.filter(
        i=>
          battleData.owned
          .includes(
            i.instrument
          )
      );
  }

  if(!pool.length){

    pool=
      gachaConfig[
        activeGacha
      ].pool;
  }

  const item=
    pick(pool);

  const list=
    ownedList(
      activeGacha
    );

  const dup=
    list.includes(
      item.id
    );

  if(dup){

    profile.starDust+=
      rarities[
        item.rarity
      ].dust;

  }else{

    list.push(
      item.id
    );
  }

  const p=
    profile.gacha[
      activeGacha
    ];

  if(
    item.rarity==="mythic"
  ){

    p.mythic=0;
    p.legendary=0;

  }else{

    p.mythic++;

    if(
      item.rarity==="legendary"
    )
      p.legendary=0;

    else
      p.legendary++;
  }

  return{
    item,
    dup,
    dust:
      dup
        ?rarities[
          item.rarity
        ].dust
        :0
  };
}

function rollGacha(count){

  const c=
    gachaConfig[
      activeGacha
    ];

  const cost=
    count===10
      ?c.ten
      :c.cost;

  if(
    profile.musicCoins<
    cost
  ){

    return toast(
      `Need ${
        cost-
        profile.musicCoins
      } more Music Coins.`
    );
  }

  profile.musicCoins-=
    cost;

  const orb=
    $("#gachaOrb");

  orb.classList.add(
    "rolling"
  );

  setTimeout(
    ()=>{

      const results=
        Array.from(
          {
            length:count
          },
          rollOne
        );

      orb.classList.remove(
        "rolling"
      );

      persist();
      updateProfileUI();
      renderInventory();

      const box=
        $("#gachaReveal");

      box.classList.remove(
        "hidden"
      );

      box.innerHTML=
        `
        <p class="eyebrow">
          GACHA RESULTS
        </p>

        <div class="reveal-grid">

          ${
            results.map(
              ({
                item,
                dup,
                dust
              })=>
              `
              <div
                class="reveal-card"
                style="
                  border-color:
                  ${rarities[
                    item.rarity
                  ].color}
                "
              >

                <div
                  style="
                    font-size:30px
                  "
                >
                  ${item.icon}
                </div>

                <div
                  class="rarity"
                  style="
                    color:
                    ${rarities[
                      item.rarity
                    ].color}
                  "
                >
                  ${
                    rarities[
                      item.rarity
                    ].label
                  }
                </div>

                <strong>
                  ${item.name}
                </strong>

                <small>
                  ${
                    dup

                    ?`Duplicate → +${dust} ✨`

                    :item.ability.text
                  }
                </small>

              </div>
              `
            ).join("")
          }

        </div>
        `;
    },
    650
  );
}

function renderInventory(){

  const filter=
    $("#inventoryFilter")
    .value;

  const ids=[];

  for(
    const type
    of [
      "accessory",
      "pet",
      "aura",
      "skin"
    ]
  ){

    for(
      const id
      of profile.owned[type]
      ||[]
    ){

      ids.push({
        type,
        id
      });
    }
  }

  const rows=
    ids
    .map(
      x=>
        allCollectibles.find(
          i=>i.id===x.id
        )
    )
    .filter(Boolean)
    .filter(
      i=>
        filter==="all"
        ||
        i.type===filter
    );

  $("#inventoryGrid").innerHTML=
    rows.length

    ?rows.map(
      i=>{

        const equipped=
          isEquipped(i);

        return`
        <div class="inventory-item">

          <strong>
            ${i.icon}
            ${i.name}
          </strong>

          <small>
            ${
              rarities[
                i.rarity
              ].label
            }

            ${
              i.instrument
                ?` • ${i.instrument}`
                :""
            }
          </small>

          <span class="ability">
            ${i.ability.text}
          </span>

          <button
            class="btn ${
              equipped
                ?"primary"
                :"ghost"
            } small"
            data-inv="${i.id}"
          >
            ${
              equipped
                ?"Equipped"
                :"Equip"
            }
          </button>

        </div>
        `;
      }
    ).join("")

    :`
    <p class="fineprint">
      No items in this category yet.
    </p>
    `;

  $$("[data-inv]")
  .forEach(
    b=>b.onclick=()=>
      equipItem(
        b.dataset.inv
      )
  );

  renderEquipped();
}

function isEquipped(i){

  if(
    i.type==="skin"
  ){

    return profile
      .equipped
      .skins?.[
        i.instrument
      ]===i.id;
  }

  return profile.equipped[
    i.slot
  ]===i.id;
}

function equipItem(id){

  const i=
    allCollectibles.find(
      x=>x.id===id
    );

  if(!i)
    return;

  if(
    i.type==="skin"
  ){

    profile.equipped.skins[
      i.instrument
    ]=id;

  }else{

    profile.equipped[
      i.slot
    ]=
      profile.equipped[
        i.slot
      ]===id

      ?null
      :id;
  }

  persist();

  renderInventory();
  refreshBattle(false);

  toast(
    `${i.name} ${
      isEquipped(i)
        ?"equipped"
        :"unequipped"
    }.`
  );
}

function renderEquipped(){

  const items=[];

  for(
    const [slot,id]
    of Object.entries(
      profile.equipped
    )
  ){

    if(
      slot==="skins" ||
      !id
    )
      continue;

    const i=
      allCollectibles.find(
        x=>x.id===id
      );

    if(i)
      items.push(i);
  }

  const sid=
    profile.equipped
    .skins?.[
      battleData.equipped
    ];

  if(sid){

    const s=
      skinPool.find(
        x=>x.id===sid
      );

    if(s)
      items.push(s);
  }

  $("#equippedGrid").innerHTML=
    items.length

    ?items.map(
      i=>`
      <div class="inventory-item">

        <strong>
          ${i.icon}
          ${i.name}
        </strong>

        <small>
          ${i.slot}
          ${
            i.instrument
              ?` • ${i.instrument}`
              :""
          }
        </small>

        <span class="ability">
          ${i.ability.text}
        </span>

        <span class="equipped-badge">
          EQUIPPED
        </span>

      </div>
      `
    ).join("")

    :`
    <p class="fineprint">
      Nothing equipped yet.
    </p>
    `;
}

/* ===========================
   MULTIPLAYER DEMO
=========================== */

const botNames=[
  "BeatKnight",
  "PianoNova",
  "RhythmFox",
  "StringStorm",
  "TempoAce",
  "ChordKing",
  "MelodyMint",
  "BassOrbit",
  "JazzPixel",
  "GrooveCat",
  "TempoTiger",
  "HarpHero"
];

let lobbySize=1;

function openLobby(size){

  lobbySize=size;

  $("#teamLobby")
    .classList
    .remove("hidden");

  $("#teamLobbyTitle").textContent=
    size===10
      ?"10v10 Mega Orchestra"
      :`${size}v${size} Team Battle`;

  const make=
    team=>
      Array.from(
        {
          length:size
        },
        (_,i)=>
          i===0 &&
          team==="blue"

          ?{
            name:
              profile.playerName
              ||"You",
            inst:
              battleData.equipped,
            you:true
          }

          :{
            name:
              pick(botNames)
              +
              rand(1,99),

            inst:
              pick(
                instrumentData
              ).name
          }
      );

  const blue=
    make("blue");

  const red=
    make("red");

  $("#blueTeamList").innerHTML=
    blue.map(
      p=>`
      <div class="team-player">

        <span>
          ${
            p.you
              ?"⭐ "
              :""
          }
          ${p.name}
        </span>

        <small>
          ${p.inst}
        </small>

      </div>
      `
    ).join("");

  $("#redTeamList").innerHTML=
    red.map(
      p=>`
      <div class="team-player">

        <span>
          ${p.name}
        </span>

        <small>
          ${p.inst}
        </small>

      </div>
      `
    ).join("");

  $("#startTeamBattleBtn").onclick=
    ()=>
      simulateTeamBattle(
        size
      );
}

function simulateTeamBattle(size){

  const chance=
    .50+
    Math.min(
      .12,
      finalStats(
        getInst(
          battleData.equipped
        )
      ).rhythm/1000
    );

  const win=
    Math.random()<chance;

  const coins=
    win

    ?Math.round(
      (
        35+
        size*10
      )*
      (
        size===10
          ?1.4
          :1
      )
    )

    :10;

  addCoins(coins);

  addXP(
    win
      ?Math.min(
        70,
        18+
        size*4
      )
      :5
  );

  toast(
    `${size}v${size} ${
      win
        ?"victory"
        :"match complete"
    }: +${coins} Music Coins`
  );

  $("#teamLobby")
    .classList
    .add("hidden");
}

/* ===========================
   MUSICCRAFT
=========================== */

const craftTypes=[
  "dirt",
  "stone",
  "coal",
  "iron",
  "gold",
  "diamond",
  "crystal"
];

const craftColors={
  air:"#112032",
  dirt:"#76512e",
  stone:"#6f7882",
  coal:"#2d3138",
  iron:"#a7a8a7",
  gold:"#d6af39",
  diamond:"#55d7ef",
  crystal:"#a06aff",
  water:"#2b6da6",
  lava:"#ef5c28"
};

const depthNames=[
  "Surface",
  "Underground",
  "Deep Caves",
  "Crystal Depths",
  "Ancient Depths",
  "Music Core"
];

function genWorld(){

  const size=140;
  const w=[];

  for(
    let y=0;
    y<size;
    y++
  ){

    const row=[];

    for(
      let x=0;
      x<size;
      x++
    ){

      const r=
        Math.random();

      let t="dirt";

      if(r<.12)
        t="stone";

      if(r<.07)
        t="coal";

      if(r<.045)
        t="iron";

      if(r<.026)
        t="gold";

      if(r<.012)
        t="diamond";

      if(r<.006)
        t="crystal";

      if(r>.986)
        t="water";

      if(r>.995)
        t="lava";

      row.push(t);
    }

    w.push(row);
  }

  for(
    let y=68;
    y<=72;
    y++
  ){

    for(
      let x=68;
      x<=72;
      x++
    ){

      w[y][x]="air";
    }
  }

  craft={
    size,
    x:70,
    y:70,
    hp:100,
    depth:0,
    selected:0,

    inv:
      Object.fromEntries(
        craftTypes.map(
          t=>[t,0]
        )
      ),

    world:w
  };

  save(
    "musicverseCraft",
    craft
  );
}

if(
  !craft?.world
)
  genWorld();

const canvas=
  $("#craftCanvas");

const ctx=
  canvas.getContext(
    "2d"
  );

const tile=26;
const viewX=30;
const viewY=20;

function drawCraft(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const sx=
    Math.floor(
      craft.x-
      viewX/2
    );

  const sy=
    Math.floor(
      craft.y-
      viewY/2
    );

  for(
    let gy=0;
    gy<viewY;
    gy++
  ){

    for(
      let gx=0;
      gx<viewX;
      gx++
    ){

      const x=
        sx+gx;

      const y=
        sy+gy;

      if(
        x<0 ||
        y<0 ||
        x>=craft.size ||
        y>=craft.size
      )
        continue;

      ctx.fillStyle=
        craftColors[
          craft.world[y][x]
        ];

      ctx.fillRect(
        gx*tile,
        gy*tile,
        tile-1,
        tile-1
      );
    }
  }

  ctx.fillStyle=
    "#f5d67e";

  ctx.fillRect(
    (
      craft.x-sx
    )*tile+5,

    (
      craft.y-sy
    )*tile+5,

    tile-10,
    tile-10
  );

  renderCraftUI();
}

function renderCraftUI(){

  $("#depthLabel").textContent=
    depthNames[
      craft.depth
    ];

  $("#craftHp").textContent=
    craft.hp;

  $("#craftInventory").innerHTML=
    craftTypes.map(
      (t,i)=>`
      <div
        class="craft-slot ${
          i===craft.selected
            ?"active"
            :""
        }"
      >

        <span>
          ${i+1}. ${t}
        </span>

        <b>
          ${craft.inv[t]}
        </b>

      </div>
      `
    ).join("");

  const ms=[
    {
      stone:8
    },

    {
      coal:6,
      iron:4
    },

    {
      gold:5,
      diamond:2
    },

    {
      diamond:5,
      crystal:3
    },

    {
      crystal:8
    }
  ];

  if(
    craft.depth>=5
  ){

    $("#missionText").textContent=
      "You reached the Music Core!";

    $("#missionBtn").disabled=
      true;

  }else{

    const req=
      ms[
        craft.depth
      ];

    $("#missionText").textContent=
      "Collect: "+
      Object.entries(req)
      .map(
        ([k,v])=>
          `${v} ${k}`
      )
      .join(", ");

    $("#missionBtn").disabled=
      !Object.entries(req)
      .every(
        ([k,v])=>
          craft.inv[k]>=v
      );
  }

  save(
    "musicverseCraft",
    craft
  );
}

function moveCraft(
  dx,
  dy
){

  const nx=
    clamp(
      craft.x+dx,
      0,
      craft.size-1
    );

  const ny=
    clamp(
      craft.y+dy,
      0,
      craft.size-1
    );

  const t=
    craft.world[ny][nx];

  if(
    t==="lava"
  ){

    craft.hp=
      Math.max(
        1,
        craft.hp-10
      );

    toast(
      "Lava hurts! -10 HP"
    );

    return drawCraft();
  }

  if(
    t!=="air"
  )
    return;

  craft.x=nx;
  craft.y=ny;

  drawCraft();
}

function craftTile(e){

  const r=
    canvas.getBoundingClientRect();

  const gx=
    Math.floor(
      (
        e.clientX-r.left
      )*
      (
        canvas.width/
        r.width
      )/
      tile
    );

  const gy=
    Math.floor(
      (
        e.clientY-r.top
      )*
      (
        canvas.height/
        r.height
      )/
      tile
    );

  const sx=
    Math.floor(
      craft.x-
      viewX/2
    );

  const sy=
    Math.floor(
      craft.y-
      viewY/2
    );

  return[
    sx+gx,
    sy+gy
  ];
}

canvas.onclick=e=>{

  const[
    x,
    y
  ]=craftTile(e);

  if(
    x<0 ||
    y<0 ||
    x>=craft.size ||
    y>=craft.size ||
    Math.max(
      Math.abs(
        x-craft.x
      ),
      Math.abs(
        y-craft.y
      )
    )>2
  )
    return;

  const t=
    craft.world[y][x];

  if(
    [
      "air",
      "water",
      "lava"
    ].includes(t)
  )
    return;

  craft.world[y][x]=
    "air";

  craft.inv[t]=
    (
      craft.inv[t]
      ||0
    )+1;

  const reward=
    t==="crystal"
      ?6

      :t==="diamond"
      ?4

      :2;

  addXP(reward);
  addCoins(reward);

  addMastery(
    battleData.equipped,
    reward
  );

  drawCraft();
};

canvas.oncontextmenu=e=>{

  e.preventDefault();

  const[
    x,
    y
  ]=craftTile(e);

  if(
    x<0 ||
    y<0 ||
    x>=craft.size ||
    y>=craft.size ||
    Math.max(
      Math.abs(
        x-craft.x
      ),
      Math.abs(
        y-craft.y
      )
    )>2 ||
    (
      x===craft.x &&
      y===craft.y
    ) ||
    craft.world[y][x]!=="air"
  )
    return;

  const t=
    craftTypes[
      craft.selected
    ];

  if(
    !craft.inv[t]
  )
    return;

  craft.world[y][x]=t;

  craft.inv[t]--;

  drawCraft();
};

window.addEventListener(
  "keydown",
  e=>{

    if(
      [
        "INPUT",
        "SELECT",
        "TEXTAREA"
      ].includes(
        document.activeElement
        .tagName
      )
    )
      return;

    const m={
      ArrowUp:[0,-1],
      w:[0,-1],
      W:[0,-1],

      ArrowDown:[0,1],
      s:[0,1],
      S:[0,1],

      ArrowLeft:[-1,0],
      a:[-1,0],
      A:[-1,0],

      ArrowRight:[1,0],
      d:[1,0],
      D:[1,0]
    };

    if(
      m[e.key]
    ){

      e.preventDefault();

      moveCraft(
        ...m[e.key]
      );
    }

    if(
      /^[1-7]$/
      .test(
        e.key
      )
    ){

      craft.selected=
        +e.key-1;

      drawCraft();
    }
  }
);

$("#missionBtn").onclick=()=>{

  const ms=[
    {
      stone:8
    },

    {
      coal:6,
      iron:4
    },

    {
      gold:5,
      diamond:2
    },

    {
      diamond:5,
      crystal:3
    },

    {
      crystal:8
    }
  ];

  if(
    craft.depth>=5
  )
    return;

  const req=
    ms[
      craft.depth
    ];

  if(
    !Object.entries(req)
    .every(
      ([k,v])=>
        craft.inv[k]>=v
    )
  )
    return;

  Object.entries(req)
  .forEach(
    ([k,v])=>
      craft.inv[k]-=v
  );

  craft.depth++;

  addXP(
    25+
    craft.depth*10
  );

  addCoins(
    40+
    craft.depth*10
  );

  toast(
    `${depthNames[
      craft.depth
    ]} unlocked!`
  );

  drawCraft();
};

$("#newWorldBtn").onclick=()=>{

  if(
    confirm(
      "Generate a new world?"
    )
  ){

    genWorld();
    drawCraft();
  }
};

/* ===========================
   LEADERBOARD
=========================== */

function renderLeaderboard(){

  const bots=
    Array.from(
      {
        length:99
      },
      ()=>({
        name:
          pick(botNames)
          +
          rand(1,999),

        level:
          rand(3,70),

        instrument:
          pick(
            instrumentData
          ).name,

        xp:
          rand(
            500,
            95000
          )
      })
    );

  bots.push({
    name:
      profile.playerName
      ||"You",

    level:
      profile.level,

    instrument:
      battleData.equipped,

    xp:
      profile.totalXpEarned,

    you:true
  });

  bots.sort(
    (a,b)=>
      b.xp-a.xp
  );

  const rank=
    bots.findIndex(
      x=>x.you
    )+1;

  $("#yourRank").textContent=
    `#${rank}`;

  $("#podium").innerHTML=
    [1,0,2]
    .map(
      i=>{

        const p=
          bots[i];

        return`
        <div class="podium-card">

          <div>
            ${
              i===0
                ?"🥇"

                :i===1
                ?"🥈"

                :"🥉"
            }
          </div>

          <strong>
            ${p.name}
          </strong>

          <p>
            ${p.instrument}
          </p>

          <b>
            ${p.xp.toLocaleString()} EXP
          </b>

        </div>
        `;
      }
    ).join("");

  $("#leaderboardBody").innerHTML=
    bots.slice(
      0,
      100
    )
    .map(
      (p,i)=>`
      <tr
        class="${
          p.you
            ?"you"
            :""
        }"
      >

        <td>
          #${i+1}
        </td>

        <td>
          ${p.name}
        </td>

        <td>
          ${p.level}
        </td>

        <td>
          ${p.instrument}
        </td>

        <td>
          ${p.xp.toLocaleString()}
        </td>

      </tr>
      `
    ).join("");
}

/* ===========================
   QUIZ
=========================== */

const quiz=[
  [
    "Which family does the trumpet belong to?",
    [
      "Brass",
      "Strings",
      "Keys",
      "Percussion"
    ],
    0
  ],

  [
    "Which instrument normally uses a bow?",
    [
      "Violin",
      "Trumpet",
      "Flute",
      "Bongos"
    ],
    0
  ],

  [
    "Which is percussion?",
    [
      "Timpani",
      "Oboe",
      "Tuba",
      "Sitar"
    ],
    0
  ],

  [
    "Which uses keys and bellows?",
    [
      "Accordion",
      "Cello",
      "Cornet",
      "Recorder"
    ],
    0
  ],

  [
    "Which is woodwind?",
    [
      "Clarinet",
      "Trombone",
      "Bass Guitar",
      "Organ"
    ],
    0
  ],

  [
    "Which is mainly plucked?",
    [
      "Harp",
      "Trumpet",
      "Timpani",
      "Flute"
    ],
    0
  ],

  [
    "Which uses drumsticks?",
    [
      "Drums",
      "Violin",
      "Oboe",
      "French Horn"
    ],
    0
  ],

  [
    "Which has a slide?",
    [
      "Trombone",
      "Trumpet",
      "Clarinet",
      "Saxophone"
    ],
    0
  ],

  [
    "Which is a keyboard instrument?",
    [
      "Harpsichord",
      "Cello",
      "Bassoon",
      "Tambourine"
    ],
    0
  ],

  [
    "Which world instrument is bowed?",
    [
      "Erhu",
      "Guzheng",
      "Kalimba",
      "Pipa"
    ],
    0
  ]
];

let qi=0;
let qs=0;
let answered=false;

function renderQuiz(){

  const q=
    quiz[qi];

  $("#quizScore").textContent=
    `${qs} / ${quiz.length}`;

  $("#quizCard").innerHTML=
    `
    <p class="eyebrow">
      QUESTION ${qi+1}
      OF ${quiz.length}
    </p>

    <h3>
      ${q[0]}
    </h3>

    <div class="quiz-options">

      ${
        q[1].map(
          (o,i)=>`
          <button
            class="quiz-option"
            data-q="${i}"
          >
            ${o}
          </button>
          `
        ).join("")
      }

    </div>
    `;

  $$("[data-q]")
  .forEach(
    b=>b.onclick=()=>
      answerQuiz(
        +b.dataset.q
      )
  );
}

function answerQuiz(i){

  if(answered)
    return;

  answered=true;

  const q=
    quiz[qi];

  const bs=
    $$("[data-q]");

  bs[q[2]]
    .classList
    .add("correct");

  if(
    i===q[2]
  ){

    qs++;

    addXP(5);
    addCoins(5);

  }else{

    bs[i]
      .classList
      .add("wrong");
  }

  setTimeout(
    ()=>{

      qi++;
      answered=false;

      if(
        qi>=quiz.length
      ){

        $("#quizCard").innerHTML=
          `
          <h3>
            Quiz complete!
          </h3>

          <p>
            You scored
            ${qs}/${quiz.length}.
          </p>

          <button
            id="restartQuiz"
            class="btn primary"
          >
            Play again
          </button>
          `;

        $("#restartQuiz").onclick=
          ()=>{

            qi=0;
            qs=0;

            renderQuiz();
          };

      }else{

        renderQuiz();
      }
    },
    700
  );
}

/* ===========================
   WIRING
=========================== */

$("#instrumentSearch").oninput=
  renderInstruments;

$("#battleInstrumentSelect").onchange=
  e=>{

    battleData.equipped=
      e.target.value;

    persist();

    renderInstruments();

    refreshBattle(true);

    renderInventory();
  };

$("#newOpponentBtn").onclick=
  ()=>refreshBattle(true);

$$("#battleModeTabs .mode-btn")
.forEach(
  b=>b.onclick=()=>
    setBattleMode(
      b.dataset.mode
    )
);

$$(".mp-start")
.forEach(
  b=>b.onclick=()=>
    openLobby(
      +b.dataset.team
    )
);

$("#closeLobby").onclick=
  ()=>
    $("#teamLobby")
    .classList
    .add("hidden");

$("#createRoomBtn").onclick=
  ()=>{

    $("#roomCode").textContent=
      `MV-${rand(
        100000,
        999999
      )}`;

    toast(
      "Local room code created. Real invites need backend connection."
    );
  };

$$(".gacha-tab")
.forEach(
  b=>b.onclick=()=>{

    activeGacha=
      b.dataset.gacha;

    $$(".gacha-tab")
    .forEach(
      x=>
        x.classList.toggle(
          "active",
          x===b
        )
    );

    updateGachaUI();
  }
);

$("#rollOneBtn").onclick=
  ()=>rollGacha(1);

$("#rollTenBtn").onclick=
  ()=>rollGacha(10);

$("#inventoryFilter").onchange=
  renderInventory;

/* ===========================
   START GAME
=========================== */

setupProfile();

updateProfileUI();

renderFamilies();

renderInstruments();

refreshBattle(true);

renderInventory();

drawCraft();

renderLeaderboard();

renderQuiz();

window.addEventListener(
  "resize",
  ()=>{

    if(renderer)
      renderBattleScene();
  }
);
