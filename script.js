const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;const pick=a=>a[Math.floor(Math.random()*a.length)];const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));const wait=ms=>new Promise(r=>setTimeout(r,ms));
function save(k,v){localStorage.setItem(k,JSON.stringify(v))}function load(k,f){try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}}

/* ============================ SOUND ============================ */
const SoundEngine={context:null,master:null,sfxVolume:.6,enabled:true,init(){if(this.context)return;const A=window.AudioContext||window.webkitAudioContext;if(!A)return;this.context=new A();this.master=this.context.createGain();this.master.gain.value=.7;this.master.connect(this.context.destination)},resume(){this.init();if(this.context?.state==='suspended')this.context.resume()},tone(f=440,d=.15,t='sine',v=.18,delay=0){if(!this.enabled)return;this.resume();if(!this.context)return;const now=this.context.currentTime+delay,o=this.context.createOscillator(),g=this.context.createGain();o.type=t;o.frequency.setValueAtTime(f,now);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(Math.max(.001,v*this.sfxVolume),now+.015);g.gain.exponentialRampToValueAtTime(.0001,now+d);o.connect(g);g.connect(this.master);o.start(now);o.stop(now+d+.04)},chord(notes,d=.3,t='sine',v=.12){notes.forEach((n,i)=>this.tone(n,d,t,v,i*.025))},noise(d=.15,v=.12){if(!this.enabled)return;this.resume();const c=this.context;if(!c)return;const b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),data=b.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;const s=c.createBufferSource(),g=c.createGain();s.buffer=b;g.gain.setValueAtTime(v*this.sfxVolume,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+d);s.connect(g);g.connect(this.master);s.start()}};

const S={
click(){SoundEngine.tone(620,.07,'sine',.12)},
coin(){SoundEngine.tone(880,.08,'square',.11);SoundEngine.tone(1320,.12,'square',.08,.07)},
xp(){SoundEngine.tone(523,.09,'sine',.08);SoundEngine.tone(659,.1,'sine',.08,.06);SoundEngine.tone(784,.14,'sine',.09,.12)},
level(){SoundEngine.chord([523,659,784],.3,'triangle',.12);SoundEngine.tone(1046,.5,'sine',.14,.24)},
attack(){SoundEngine.tone(180,.12,'sawtooth',.13);SoundEngine.tone(260,.15,'square',.06,.04)},
critical(){SoundEngine.tone(880,.1,'square',.14);SoundEngine.tone(1174,.16,'square',.12,.06);SoundEngine.tone(1568,.25,'sine',.12,.12)},
ultimate(){[220,330,440,660,880].forEach((n,i)=>SoundEngine.tone(n,.32,'sawtooth',.1,i*.08))},
shield(){SoundEngine.chord([440,554,659],.4,'sine',.08)},
heal(){[523,659,784,1046].forEach((n,i)=>SoundEngine.tone(n,.2,'sine',.08,i*.07))},
perfect(){SoundEngine.tone(1046,.11,'sine',.14);SoundEngine.tone(1568,.14,'sine',.09,.05)},
great(){SoundEngine.tone(880,.1,'triangle',.1)},
good(){SoundEngine.tone(660,.09,'triangle',.07)},
miss(){SoundEngine.tone(150,.16,'sawtooth',.07)},
correct(){SoundEngine.tone(660,.1,'sine',.11);SoundEngine.tone(990,.16,'sine',.1,.08)},
wrong(){SoundEngine.tone(220,.18,'square',.07);SoundEngine.tone(165,.22,'square',.06,.09)},
victory(){[523,659,784,1046].forEach((n,i)=>SoundEngine.tone(n,.35,'triangle',.11,i*.13))},
defeat(){[392,330,262,196].forEach((n,i)=>SoundEngine.tone(n,.3,'triangle',.07,i*.14))},
jump(){SoundEngine.tone(280,.1,'square',.06);SoundEngine.tone(560,.1,'square',.04,.06)},
mine(){SoundEngine.noise(.07,.09);SoundEngine.tone(110,.07,'square',.05)},
treasure(){[784,988,1174,1568].forEach((n,i)=>SoundEngine.tone(n,.2,'sine',.09,i*.07))},
gacha(){for(let i=0;i<7;i++)SoundEngine.tone(300+i*100,.16,'triangle',.07,i*.08)}
};

function crowd(strength=.5){
for(let i=0;i<6+strength*8;i++)
setTimeout(
()=>SoundEngine.noise(rand(15,35)/100,.015+Math.random()*.02),
Math.random()*500
);
}

document.addEventListener('pointerdown',()=>SoundEngine.resume(),{once:true});

$('#soundToggle').onclick=()=>{
SoundEngine.enabled=!SoundEngine.enabled;
$('#soundToggle').textContent=SoundEngine.enabled?'🔊':'🔇';
if(SoundEngine.enabled)S.click();
};

/* ============================ DATA ============================ */

const instruments=[
['Guitar','Strings','🎸',78,58,72,76,'strum'],
['Ukulele','Strings','🪕',86,38,70,82,'strum'],
['Piano','Keys','🎹',62,88,92,70,'keys'],
['Flute','Woodwind','🪈',58,48,96,82,'wind'],
['Drums','Percussion','🥁',92,72,38,96,'drums'],
['Clarinet','Woodwind','🎶',60,64,88,72,'wind'],
['Trumpet','Brass','🎺',88,54,68,74,'brass'],
['Violin','Strings','🎻',72,52,98,84,'bow'],
['Saxophone','Woodwind','🎷',76,62,88,78,'wind'],
['Cello','Strings','🎻',70,84,94,58,'bow'],
['Xylophone','Percussion','🔔',68,50,76,92,'mallet'],
['Trombone','Brass','🎺',84,70,62,64,'brass'],
['Synthesizer','Keys','🎛️',74,58,90,86,'keys'],
['French Horn','Brass','📯',72,82,86,58,'brass'],
['Oboe','Woodwind','🎼',64,56,94,68,'wind'],
['Digital Piano','Keys','🎹',68,78,88,78,'keys'],
['Organ','Keys','🎹',76,92,90,48,'keys'],
['Drum Machine','Percussion','🎛️',82,54,58,100,'pads'],
['Electric Guitar','Strings','🎸',94,48,68,88,'strum'],
['Bass Guitar','Strings','🎸',86,76,54,90,'pluck'],
['Harp','Strings','🪕',52,64,100,72,'pluck'],
['Banjo','Strings','🪕',82,44,64,94,'pluck'],
['Mandolin','Strings','🪕',80,46,78,90,'pluck'],
['Double Bass','Strings','🎻',82,90,72,54,'bow'],
['Accordion','Keys','🪗',72,74,82,78,'bellows'],
['Keytar','Keys','🎹',86,46,76,92,'keys'],
['Harpsichord','Keys','🎹',70,60,92,80,'keys'],
['Marimba','Percussion','🔔',66,58,84,94,'mallet'],
['Timpani','Percussion','🥁',90,86,42,72,'drums'],
['Bongos','Percussion','🥁',78,42,54,98,'drums'],
['Congas','Percussion','🥁',82,58,50,94,'drums'],
['Tambourine','Percussion','🪘',70,34,58,100,'shake'],
['Steel Pan','Percussion','🛢️',68,56,86,88,'mallet'],
['Tuba','Brass','🎺',90,94,54,38,'brass'],
['Euphonium','Brass','🎺',76,84,78,54,'brass'],
['Cornet','Brass','🎺',84,58,74,76,'brass'],
['Piccolo','Woodwind','🪈',66,32,96,92,'wind'],
['Bassoon','Woodwind','🎼',68,86,84,48,'wind'],
['Recorder','Woodwind','🪈',70,44,78,84,'wind'],
['Erhu','World','🎻',74,54,98,82,'bow'],
['Guzheng','World','🎶',78,62,96,88,'pluck'],
['Pipa','World','🪕',84,50,88,92,'pluck'],
['Kalimba','World','🎵',58,60,90,86,'pluck'],
['Sitar','World','🪕',76,64,96,80,'pluck'],
['Shamisen','World','🪕',88,48,74,92,'pluck']
].map((x,i)=>({
name:x[0],
family:x[1],
icon:x[2],
attack:x[3],
defense:x[4],
melody:x[5],
rhythm:x[6],
play:x[7],
price:i===0?0:220+i*95
}));

const getInstrument=n=>instruments.find(i=>i.name===n)||instruments[0];

const moveSets={
strum:[
['Power Strum','attack',1],
['Rapid Riff','rhythm',.9],
['Harmony Guard','shield',0],
['Dragon Solo','ultimate',1.8]
],

keys:[
['Power Chord','attack',1],
['Rapid Keys','rhythm',.9],
['Sustain Shield','shield',0],
['Grand Crescendo','ultimate',1.8]
],

drums:[
['Power Beat','attack',1],
['Drum Roll','rhythm',.95],
['Rhythm Barrier','shield',0],
['Thunder Beat','ultimate',1.85]
],

wind:[
['Focused Note','attack',1],
['Rapid Scale','rhythm',.9],
['Breath Heal','heal',0],
['Cyclone Symphony','ultimate',1.8]
],

brass:[
['Brass Blast','attack',1],
['Fanfare Rush','rhythm',.92],
['Royal Guard','shield',0],
['Solar Fanfare','ultimate',1.85]
],

bow:[
['Power Bow','attack',1],
['Rapid Bow','rhythm',.92],
['Harmony Strings','heal',0],
['Phoenix Symphony','ultimate',1.8]
],

mallet:[
['Mallet Strike','attack',1],
['Scale Rush','rhythm',.95],
['Resonance','shield',0],
['Rainbow Cascade','ultimate',1.8]
],

pads:[
['Beat Drop','attack',1],
['Pad Rush','rhythm',.98],
['Bass Sequence','shield',0],
['Mega Beat Drop','ultimate',1.9]
],

pluck:[
['Crystal Pluck','attack',1],
['Finger Rush','rhythm',.95],
['Resonance','heal',0],
['Starlight Cascade','ultimate',1.82]
],

bellows:[
['Squeeze Beat','attack',1],
['Polka Rush','rhythm',.95],
['Bellows Guard','shield',0],
['Festival Frenzy','ultimate',1.85]
],

shake:[
['Rhythm Shake','attack',1],
['Jingle Rush','rhythm',.98],
['Tempo Guard','shield',0],
['Carnival Storm','ultimate',1.8]
]
};

function playInstrument(name,note=440){
const p=getInstrument(name).play;

const map={
strum:['triangle',.22],
keys:['sine',.3],
drums:['square',.1],
wind:['sine',.42],
brass:['sawtooth',.28],
bow:['triangle',.5],
mallet:['sine',.15],
pads:['square',.16],
pluck:['triangle',.18],
bellows:['sawtooth',.38],
shake:['square',.08]
};

if(p==='drums'||p==='shake')
SoundEngine.noise(.12,.12);

const [t,d]=map[p]||['sine',.2];

SoundEngine.tone(note,d,t,.08);
}

const defaultProfile={
name:'',
level:1,
xp:0,
totalXp:0,
coins:500,
dust:0,

owned:[
'Guitar'
],

equipped:'Guitar',

mastery:{},

instrumentUpgrades:{},

instrumentEvolutions:{},

wins:0,
losses:0,

avatar:{
preset:'Hero',
skin:'#dca57b',
hair:'#201915',
outfit:'#19345b'
},

inventory:[],

equipmentInventory:[
{
name:'Starter Headphones',
slot:'Head',
attack:1,
defense:0
},
{
name:'Canvas Jacket',
slot:'Body',
attack:0,
defense:2
}
],

equippedGear:{},

pets:[],

petEggs:[],

equippedPet:null,

materials:{},

quests:{},

rpg:{
zone:0,
x:1,
y:1,
hp:100,
maxHp:100,
storyStep:0
},

dailyRewards:{
lastClaim:'',
streak:0
},

skillTree:{
power1:0,
power2:0,
power3:0,

rhythm1:0,
rhythm2:0,
rhythm3:0,

harmony1:0,
harmony2:0,
harmony3:0
}
};

let profile={
...defaultProfile,
...load('musicverseProfile',{})
};

profile.avatar={
...defaultProfile.avatar,
...(profile.avatar||{})
};

profile.owned=
Array.isArray(profile.owned)
?profile.owned
:['Guitar'];

if(!profile.owned.includes('Guitar'))
profile.owned.unshift('Guitar');

profile.mastery=
profile.mastery||{};

profile.inventory=
profile.inventory||[];

profile.instrumentUpgrades=
profile.instrumentUpgrades||{};

profile.instrumentEvolutions=
profile.instrumentEvolutions||{};

profile.equipmentInventory=
Array.isArray(profile.equipmentInventory)
?profile.equipmentInventory
:defaultProfile.equipmentInventory;

profile.equippedGear=
profile.equippedGear||{};

profile.pets=
Array.isArray(profile.pets)
?profile.pets
:[];

profile.petEggs=
Array.isArray(profile.petEggs)
?profile.petEggs
:[];

profile.materials=
profile.materials||{};

profile.quests=
profile.quests||{};

profile.rpg={
...defaultProfile.rpg,
...(profile.rpg||{})
};

profile.dailyRewards={
...defaultProfile.dailyRewards,
...(profile.dailyRewards||{})
};

profile.skillTree={
...defaultProfile.skillTree,
...(profile.skillTree||{})
};

profile.coins=
Math.max(
0,
Number(profile.coins)||0
);

function persist(){
save(
'musicverseProfile',
profile
);
}

function toast(t){

const el=
$('#toast');

el.textContent=t;

el.classList.add(
'show'
);

clearTimeout(
toast.t
);

toast.t=
setTimeout(
()=>el.classList.remove('show'),
2200
);
}

function getPlayerXPNeeded(){

return Math.round(
100+
(profile.level-1)*35
);

}

function addXP(amount){

amount=
Math.max(
0,
Math.round(amount)
);

profile.xp+=amount;

profile.totalXp+=amount;

let levels=0;

let needed=
getPlayerXPNeeded();

while(
profile.xp>=needed
){

profile.xp-=needed;

profile.level++;

profile.coins+=20;

levels++;

needed=
getPlayerXPNeeded();

}

persist();

updateProfileUI();

renderLeaderboard();

if(
typeof renderSkillTree==='function'
)
renderSkillTree();

if(levels){

S.level();

toast(
`🎉 Level ${profile.level}! +20 Coins`
);

}else if(amount){

S.xp();

}

return amount;
}

function addMastery(
name,
amount
){

profile.mastery[name]=
(profile.mastery[name]||0)
+
Math.max(
0,
Math.round(amount)
);

persist();
}

function getInstrumentUpgradeData(
name
){

if(
!profile.instrumentUpgrades[name]
){

profile.instrumentUpgrades[name]={
level:1,
xp:0
};

}

return profile.instrumentUpgrades[name];
}

function getInstrumentXPNeeded(
name
){

const d=
getInstrumentUpgradeData(
name
);

return Math.round(
120+
(d.level-1)*90
);
}

function addInstrumentXP(
name,
amount
){

const d=
getInstrumentUpgradeData(
name
);

if(
d.level>=20
)
return;

d.xp+=
Math.max(
0,
Math.round(amount)
);

persist();

if(
d.xp>=
getInstrumentXPNeeded(name)
){

toast(
`🎵 ${name} can be upgraded!`
);

}

renderInstruments();
}

function upgradeInstrument(
name
){

const d=
getInstrumentUpgradeData(
name
);

const need=
getInstrumentXPNeeded(
name
);

if(
d.level>=20
){

return toast(
`${name} is already max level!`
);

}

if(
d.xp<need
){

return toast(
`Need ${need-d.xp} more Instrument EXP.`
);

}

d.xp-=need;

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
}

function getEvolutionBonus(
name
){

const evo=
profile.instrumentEvolutions[name];

return evo
?1.1
:1;
}

function getGearBonuses(){

return Object
.values(
profile.equippedGear||{}
)
.reduce(
(a,g)=>{

if(g){

a.attack+=g.attack||0;
a.defense+=g.defense||0;
a.melody+=g.melody||0;
a.rhythm+=g.rhythm||0;

}

return a;

},
{
attack:0,
defense:0,
melody:0,
rhythm:0
}
);

}

function getPetBonus(){

const p=
profile.pets.find(
x=>x.id===profile.equippedPet
);

if(!p){

return{
attack:0,
defense:0,
melody:0,
rhythm:0
};

}

const level=
p.level||1;

const base=
Math.max(
1,
Math.floor(level/2)
);

return p.type==='attack'
?{
attack:base,
defense:0,
melody:0,
rhythm:0
}

:p.type==='melody'
?{
attack:0,
defense:0,
melody:base,
rhythm:0
}

:p.type==='defense'
?{
attack:0,
defense:base,
melody:0,
rhythm:0
}

:{
attack:base,
defense:base,
melody:base,
rhythm:base
};

}

function getUpgradedInstrument(
name
){

const base=
getInstrument(
name
);

const u=
getInstrumentUpgradeData(
name
);

const mult=
(
1+
(u.level-1)*.01
)
*
getEvolutionBonus(
name
);

const g=
getGearBonuses();

const p=
getPetBonus();

return{
...base,

attack:
Math.round(
base.attack*mult+
g.attack+
p.attack
),

defense:
Math.round(
base.defense*mult+
g.defense+
p.defense
),

melody:
Math.round(
base.melody*mult+
g.melody+
p.melody
),

rhythm:
Math.round(
base.rhythm*mult+
g.rhythm+
p.rhythm
)
};

}

function addPetXP(
id,
amount
){

const p=
profile.pets.find(
x=>x.id===id
);

if(!p)
return;

const petBonus=
typeof getSkillBonuses==='function'
?getSkillBonuses().petXpPct
:0;

amount=
Math.round(
amount*
(1+petBonus)
);

p.xp=
(p.xp||0)
+
Math.max(
0,
Math.round(amount)
);

let need=
(p.level||1)*40;

while(
p.xp>=need &&
p.level<20
){

p.xp-=need;

p.level++;

need=
p.level*40;

toast(
`🐾 ${p.name} reached Level ${p.level}!`
);

}

persist();

renderPets();
}

function reward(
xp,
coins=0,
msg='Reward earned!'
){

addXP(
xp
);

profile.coins+=coins;

persist();

updateProfileUI();

if(coins)
S.coin();

toast(
`${msg} +${xp} EXP${coins?` • +${coins} Coins`:''}`
);

}

function updateProfileUI(){

[
'coinTop',
'heroCoins',
'gachaCoins'
]
.forEach(
id=>
$('#'+id)&&
(
$('#'+id).textContent=
profile.coins.toLocaleString()
)
);

$('#levelTop').textContent=
profile.level;

$('#heroName').textContent=
profile.name||'Player';

$('#heroLevel').textContent=
profile.level;

$('#heroDust').textContent=
profile.dust;

$('#gachaDust').textContent=
profile.dust;

$('#heroLifetime').textContent=
profile.totalXp.toLocaleString();

const needed=
getPlayerXPNeeded();

$('#xpText').textContent=
`${profile.xp} / ${needed}`;

$('#xpFill').style.width=
`${Math.min(
100,
profile.xp/needed*100
)}%`;

document.documentElement.style.setProperty(
'--avatar-skin',
profile.avatar.skin
);

document.documentElement.style.setProperty(
'--avatar-outfit',
profile.avatar.outfit
);

}

/* ============================ SETUP ============================ */

function setupProfile(){

const presets=[
'Hero',
'Swift',
'Power',
'Star',
'Neo',
'Legend'
];

const skins=[
['Light','#f2c8a8'],
['Warm','#dca57b'],
['Tan','#bd8058'],
['Deep','#8d5d42'],
['Dark','#5d3a2c']
];

const hairs=[
['Black','#151515'],
['Dark Brown','#201915'],
['Brown','#4c2e20'],
['Blonde','#c49a5a'],
['Silver','#aeb6c0']
];

const outfits=[
['Royal Navy','#19345b'],
['Crimson','#6c2636'],
['Emerald','#1f5a48'],
['Purple','#52376f'],
['Midnight','#111827']
];

$('#avatarPresetSelect').innerHTML=
presets
.map(
x=>`<option>${x}</option>`
)
.join('');

$('#skinSelect').innerHTML=
skins
.map(
x=>`<option value="${x[1]}">${x[0]}</option>`
)
.join('');

$('#hairSelect').innerHTML=
hairs
.map(
x=>`<option value="${x[1]}">${x[0]}</option>`
)
.join('');

$('#outfitSelect').innerHTML=
outfits
.map(
x=>`<option value="${x[1]}">${x[0]}</option>`
)
.join('');

$('#avatarPresetSelect').value=
profile.avatar.preset;

$('#skinSelect').value=
profile.avatar.skin;

$('#hairSelect').value=
profile.avatar.hair;

$('#outfitSelect').value=
profile.avatar.outfit;

const prev=()=>{

$('#previewHead').style.background=
$('#skinSelect').value;

$('#previewHair').style.background=
$('#hairSelect').value;

$('#previewBody').style.background=
$('#outfitSelect').value;

$$(
'.preview-arm,.preview-leg'
)
.forEach(
x=>
x.style.background=
$('#outfitSelect').value
);

};

[
'avatarPresetSelect',
'skinSelect',
'hairSelect',
'outfitSelect'
]
.forEach(
id=>
$('#'+id).onchange=
prev
);

prev();

if(
!profile.name
){

$('#setupOverlay')
.classList
.remove(
'hidden'
);

}

$('#startBtn').onclick=()=>{

const n=
$('#playerNameInput')
.value
.trim();

if(!n){

$('#setupError').textContent=
'Please enter a stage name.';

return;

}

profile.name=n;

profile.avatar={
preset:
$('#avatarPresetSelect').value,

skin:
$('#skinSelect').value,

hair:
$('#hairSelect').value,

outfit:
$('#outfitSelect').value
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

$('#playerNameInput')
.addEventListener(
'keydown',
e=>{

if(
e.key==='Enter'
)
$('#startBtn').click();

}
);

}
/* ============================ INSTRUMENTS ============================ */
let activeFamily='All';

function renderFamilies(){
  const fam=[
    'All',
    ...new Set(
      instruments.map(
        i=>i.family
      )
    )
  ];

  $('#familyTabs').innerHTML=
    fam
      .map(
        f=>
          `
          <button
            class="${f===activeFamily?'active':''}"
            data-family="${f}"
          >
            ${f}
          </button>
          `
      )
      .join('');

  $$('[data-family]')
    .forEach(
      b=>
        b.onclick=
          ()=>{
            activeFamily=
              b.dataset.family;

            renderFamilies();

            renderInstruments();
          }
    );
}


function renderInstruments(){

  const q=
    $('#instrumentSearch')
      .value
      .toLowerCase();


  const list=
    instruments
      .filter(
        i=>
          (
            activeFamily==='All' ||
            i.family===activeFamily
          )
          &&
          i.name
            .toLowerCase()
            .includes(q)
      );


  $('#instrumentGrid').innerHTML=
    list
      .map(
        i=>{

          const owned=
            profile.owned.includes(
              i.name
            );


          const eq=
            profile.equipped===
            i.name;


          const u=
            getInstrumentUpgradeData(
              i.name
            );


          const need=
            getInstrumentXPNeeded(
              i.name
            );


          const up=
            getUpgradedInstrument(
              i.name
            );


          const evo=
            profile.instrumentEvolutions[
              i.name
            ];


          return `

            <article
              class="
                instrument-card
                ${eq?'equipped':''}
              "
            >

              <div class="instrument-icon">
                ${i.icon}
              </div>


              <h3>
                ${
                  evo
                    ?evo.name
                    :i.name
                }
              </h3>


              <p>

                ${i.family}

                • Mastery

                ${
                  profile.mastery[
                    i.name
                  ]||0
                }

                ${
                  evo
                    ?' • EVOLVED'
                    :''
                }

              </p>


              ${
                owned

                ?`
                <div class="instrument-level-row">

                  <strong>
                    Level ${u.level}
                  </strong>

                  <span>

                    ${
                      u.level>=20

                        ?'MAX'

                        :`${u.xp} / ${need} EXP`
                    }

                  </span>

                </div>


                <div class="instrument-xp-bar">

                  <i
                    style="
                      width:${
                        u.level>=20

                          ?100

                          :Math.min(
                            100,
                            u.xp/
                            need*
                            100
                          )
                      }%
                    "
                  ></i>

                </div>
                `

                :''
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

                  ?`

                  <button
                    class="
                      btn
                      ${eq?'gold':'ghost'}
                    "
                    data-equip="${i.name}"
                  >

                    ${
                      eq
                        ?'Equipped'
                        :'Equip'
                    }

                  </button>


                  <button
                    class="
                      btn
                      ${
                        u.xp>=need &&
                        u.level<20

                          ?'gold'
                          :'ghost'
                      }
                    "
                    data-upgrade-instrument="${i.name}"

                    ${
                      u.xp<need ||
                      u.level>=20

                        ?'disabled'
                        :''
                    }
                  >

                    ${
                      u.level>=20
                        ?'MAX'
                        :'Upgrade'
                    }

                  </button>

                  `

                  :`

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


  $$('[data-buy]')
    .forEach(
      b=>
        b.onclick=
          ()=>{

            const i=
              getInstrument(
                b.dataset.buy
              );


            if(
              profile.coins<
              i.price
            ){

              return toast(
                'Not enough coins.'
              );

            }


            profile.coins-=
              i.price;


            profile.owned.push(
              i.name
            );


            profile.equipped=
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


  $$('[data-equip]')
    .forEach(
      b=>
        b.onclick=
          ()=>{

            profile.equipped=
              b.dataset.equip;


            persist();

            renderInstruments();

            refreshBattle(
              true
            );

            renderEvolutionPanel();

            S.click();

          }
    );


  $$(
    '[data-upgrade-instrument]'
  )
  .forEach(
    b=>
      b.onclick=
        ()=>
          upgradeInstrument(
            b.dataset.upgradeInstrument
          )
  );


  renderBattleInstrumentSelect();

}


$('#instrumentSearch').oninput=
  renderInstruments;


function renderBattleInstrumentSelect(){

  const old=
    $('#battleInstrumentSelect')
      .value;


  $('#battleInstrumentSelect')
    .innerHTML=

      profile.owned
        .map(
          n=>
            `
            <option
              ${
                n===profile.equipped
                  ?'selected'
                  :''
              }
            >
              ${n}
            </option>
            `
        )
        .join('');


  if(
    profile.owned.includes(
      old
    )
  ){

    $('#battleInstrumentSelect')
      .value=
        old;

  }

}


$('#battleInstrumentSelect')
  .onchange=
    ()=>{

      profile.equipped=
        $('#battleInstrumentSelect')
          .value;


      persist();

      renderInstruments();

      refreshBattle(
        true
      );

    };


/* ============================ SOLO BATTLE ============================ */

let battle={};


const botNames=[
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
  newEnemy=false
){

  const pi=
    getInstrument(
      profile.equipped
    );


  if(
    newEnemy ||
    !battle.enemy
  ){

    const ei=
      pick(
        instruments
      );


    battle={

      playerHp:
        Math.round(
          100+
          pi.defense*.4
        ),

      playerMax:
        Math.round(
          100+
          pi.defense*.4
        ),

      enemyHp:
        Math.round(
          100+
          ei.defense*.4
        ),

      enemyMax:
        Math.round(
          100+
          ei.defense*.4
        ),

      enemy:{
        name:
          pick(
            botNames
          ),

        instrument:
          ei.name
      },

      energy:0,

      shield:false,

      busy:false

    };

  }


  $('#playerBattleName')
    .textContent=
      profile.name||
      'Player';


  $('#playerInstrumentLabel')
    .textContent=
      profile.equipped;


  $('#cpuBattleName')
    .textContent=
      battle.enemy.name;


  $('#cpuInstrumentLabel')
    .textContent=
      battle.enemy.instrument;


  renderSoloBattle();

}


function renderSoloBattle(){

  const pi=
    getInstrument(
      profile.equipped
    );


  const moves=
    moveSets[
      pi.play
    ]||
    moveSets.strum;


  $('#playerHpFill')
    .style.width=
      `${
        100*
        battle.playerHp/
        battle.playerMax
      }%`;


  $('#cpuHpFill')
    .style.width=
      `${
        100*
        battle.enemyHp/
        battle.enemyMax
      }%`;


  $('#playerHpText')
    .textContent=
      `${battle.playerHp} / ${battle.playerMax}`;


  $('#cpuHpText')
    .textContent=
      `${battle.enemyHp} / ${battle.enemyMax}`;


  $('#energyPips')
    .innerHTML=

      [0,1,2]
        .map(
          i=>
            `
            <i
              class="
                ${
                  i<battle.energy
                    ?'on'
                    :''
                }
              "
            ></i>
            `
        )
        .join('');


  $('#moveButtons')
    .innerHTML=

      moves
        .map(
          (
            m,
            i
          )=>
            `
            <button
              class="
                move-btn
                ${i===3?'ultimate':''}
              "
              data-solo-move="${i}"

              ${
                battle.busy ||
                (
                  i===3 &&
                  battle.energy<3
                )

                  ?'disabled'
                  :''
              }
            >

              <strong>
                ${m[0]}
              </strong>

              <span>

                ${
                  i===3

                    ?'ULTIMATE • 3 ENERGY'

                    :m[1]
                      .toUpperCase()
                }

              </span>

              <small>

                ${
                  m[1]==='heal'

                    ?'Restore HP'

                    :m[1]==='shield'

                    ?'Block next hit'

                    :'Deal musical damage'
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
    b=>
      b.onclick=
        ()=>
          soloMove(
            +b.dataset.soloMove
          )
  );

}


async function soloMove(
  idx
){

  if(
    battle.busy
  )
    return;


  battle.busy=
    true;


  const inst=
    getUpgradedInstrument(
      profile.equipped
    );


  const move=
    (
      moveSets[
        inst.play
      ]||
      moveSets.strum
    )[
      idx
    ];


  let text='';


  playInstrument(
    inst.name,
    idx===3
      ?660
      :440
  );


  if(
    move[1]==='heal'
  ){

    const h=
      Math.round(
        inst.melody*.25+
        12
      );


    battle.playerHp=
      clamp(
        battle.playerHp+h,
        0,
        battle.playerMax
      );


    battle.energy=
      clamp(
        battle.energy+1,
        0,
        3
      );


    text=
      `${move[0]} restored ${h} HP.`;


    S.heal();

  }


  else if(
    move[1]==='shield'
  ){

    battle.shield=
      true;


    battle.energy=
      clamp(
        battle.energy+1,
        0,
        3
      );


    text=
      `${move[0]} created a musical shield.`;


    S.shield();

  }


  else{

    let mult=
      move[2];


    if(
      idx===3
    ){

      battle.energy=
        0;


      S.ultimate();

    }

    else{

      battle.energy=
        clamp(
          battle.energy+1,
          0,
          3
        );

    }


    let dmg=
      Math.max(
        6,

        Math.round(

          (
            inst.attack*.32
            +
            inst.rhythm*.12
            +
            rand(
              -3,
              7
            )
          )

          *
          mult

          -

          getInstrument(
            battle.enemy.instrument
          ).defense
          *
          .06

        )
      );


    const crit=
      Math.random()
      <
      .08+
      inst.melody/
      1200;


    if(
      crit
    ){

      dmg=
        Math.round(
          dmg*
          1.5
        );


      S.critical();

    }

    else{

      S.attack();

    }


    battle.enemyHp=
      clamp(
        battle.enemyHp-dmg,
        0,
        battle.enemyMax
      );


    text=
      `${move[0]} dealt ${dmg}${crit?' CRITICAL':''} damage.`;


    addMastery(
      inst.name,
      2
    );

  }


  $('#battleStatus')
    .textContent=
      text;


  $('#battleLog')
    .textContent=
      text;


  renderSoloBattle();


  if(
    battle.enemyHp<=0
  ){

    battle.busy=
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
      ()=>
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


  const ei=
    getInstrument(
      battle.enemy.instrument
    );


  let edmg=
    Math.max(
      5,

      Math.round(

        ei.attack*.28
        +
        rand(
          -3,
          5
        )
        -
        inst.defense*.05

      )
    );


  if(
    battle.shield
  ){

    edmg=
      Math.round(
        edmg*
        .5
      );


    battle.shield=
      false;

  }


  battle.playerHp=
    clamp(
      battle.playerHp-edmg,
      0,
      battle.playerMax
    );


  playInstrument(
    ei.name,
    330
  );


  S.attack();


  $('#battleStatus')
    .textContent=
      `${battle.enemy.name} dealt ${edmg} damage.`;


  $('#battleLog')
    .textContent=
      `${text} • Enemy hit for ${edmg}.`;


  battle.busy=
    false;


  renderSoloBattle();


  if(
    battle.playerHp<=0
  ){

    profile.losses++;


    addXP(
      4
    );


    S.defeat();


    toast(
      'Defeat. +4 EXP'
    );


    setTimeout(
      ()=>
        refreshBattle(
          true
        ),
      1000
    );

  }

}


$('#newOpponentBtn')
  .onclick=
    ()=>
      refreshBattle(
        true
      );


/* ============================ TEAM BATTLE ============================ */

let multiplayerState={
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
  maxTeamHP:10000
};


function makeTeamPlayer(
  team,
  index
){

  const human=
    team==='blue' &&
    index===0;


  const inst=
    human

      ?getInstrument(
        profile.equipped
      )

      :pick(
        instruments
      );


  return{

    id:
      `${team}-${index}-${Math.random()}`,

    team,

    human,

    name:
      human

        ?(
          profile.name||
          'Player'
        )

        :pick(
          botNames
        )
        +
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


function openLobby(
  size
){

  if(
    multiplayerState.playing
  )
    return;


  multiplayerState.size=
    size;


  multiplayerState.blue=
    Array.from(
      {
        length:size
      },
      (
        _,
        i
      )=>
        makeTeamPlayer(
          'blue',
          i
        )
    );


  multiplayerState.red=
    Array.from(
      {
        length:size
      },
      (
        _,
        i
      )=>
        makeTeamPlayer(
          'red',
          i
        )
    );


  multiplayerState.blueHP=
    multiplayerState.redHP=
      multiplayerState.maxTeamHP=
        10000;


  multiplayerState.playerEnergy=
    0;


  multiplayerState.round=
    0;


  $('#concertRoundLabel')
    .textContent=
      'LOBBY';


  $('#startTeamBattleBtn')
    .disabled=
      false;


  $('#startTeamBattleBtn')
    .textContent=
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
    b=>
      b.classList.toggle(
        'active',
        +b.dataset.team===
        size
      )
  );

}


function renderConcertTeams(
  activeId=''
){

  const render=
    (
      arr,
      team
    )=>

      arr
        .map(
          p=>
            `
            <div
              class="
                concert-player
                ${team}
                ${
                  p.id===activeId
                    ?'active'
                    :''
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
    .innerHTML=
      render(
        multiplayerState.blue,
        'blue'
      );


  $('#redConcertPlayers')
    .innerHTML=
      render(
        multiplayerState.red,
        'red'
      );

}


function updateTeamHPBars(){

  const m=
    multiplayerState.maxTeamHP;


  const b=
    clamp(
      multiplayerState.blueHP/
      m*
      100,
      0,
      100
    );


  const r=
    clamp(
      multiplayerState.redHP/
      m*
      100,
      0,
      100
    );


  $('#blueTeamHPFill')
    .style.width=
      b+'%';


  $('#redTeamHPFill')
    .style.width=
      r+'%';


  $('#blueTeamHPText')
    .textContent=
      `${Math.round(
        multiplayerState.blueHP
      ).toLocaleString()} / ${m.toLocaleString()} HP`;


  $('#redTeamHPText')
    .textContent=
      `${Math.round(
        multiplayerState.redHP
      ).toLocaleString()} / ${m.toLocaleString()} HP`;

}


function setMP(
  html
){

  $('#multiplayerBattleMessage')
    .innerHTML=
      html;

}


function teamDamage(
  attacker,
  mult=1
){

  const targetTeam=
    attacker.team==='blue'
      ?'red'
      :'blue';


  let dmg=
    Math.max(
      120,

      Math.round(

        (
          attacker.attack*
          4.2

          +

          attacker.rhythm*
          1.7

          +

          rand(
            -40,
            70
          )
        )

        *
        mult

      )
    );


  const critical=
    Math.random()
    <
    .05+
    attacker.melody/
    1000;


  if(
    critical
  ){

    dmg=
      Math.round(
        dmg*
        1.5
      );

  }


  multiplayerState[
    targetTeam+
    'HP'
  ]=

    Math.max(
      0,

      multiplayerState[
        targetTeam+
        'HP'
      ]
      -
      dmg
    );


  updateTeamHPBars();


  return{
    dmg,
    critical
  };

}


function waitHumanMove(){

  return new Promise(
    resolve=>{

      multiplayerState.resolve=
        resolve;


      showTeamMoves();

    }
  );

}


function showTeamMoves(){

  const p=
    multiplayerState.blue[
      0
    ];


  const inst=
    getInstrument(
      p.instrument
    );


  const moves=
    moveSets[
      inst.play
    ]||
    moveSets.strum;


  multiplayerState.waiting=
    true;


  $('#teamMovePanel')
    .classList
    .remove(
      'hidden'
    );


  $('#teamTurnTitle')
    .textContent=
      `${p.name}, choose your move`;


  $('#teamEnergyLabel')
    .textContent=
      `${multiplayerState.playerEnergy} / 3`;


  $('#teamMoveButtons')
    .innerHTML=

      moves
        .map(
          (
            m,
            i
          )=>
            `
            <button
              class="
                move-btn
                ${i===3?'ultimate':''}
              "
              data-team-move="${i}"

              ${
                i===3 &&
                multiplayerState.playerEnergy<3

                  ?'disabled'
                  :''
              }
            >

              <strong>
                ${m[0]}
              </strong>

              <span>

                ${
                  i===3

                    ?'ULTIMATE • 3 ENERGY'

                    :m[1]
                      .toUpperCase()
                }

              </span>

              <small>

                ${
                  m[1]==='heal'

                    ?'Restore team HP'

                    :m[1]==='shield'

                    ?'Reduce next enemy hit'

                    :'Damage Team Red'
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
    b=>
      b.onclick=
        ()=>{

          if(
            !multiplayerState.waiting
          )
            return;


          multiplayerState.waiting=
            false;


          $('#teamMovePanel')
            .classList
            .add(
              'hidden'
            );


          const r=
            multiplayerState.resolve;


          multiplayerState.resolve=
            null;


          r(
            +b.dataset.teamMove
          );

        }
  );

}


async function executeTeamMove(
  idx
){

  const p=
    multiplayerState.blue[
      0
    ];


  const inst=
    getInstrument(
      p.instrument
    );


  const move=
    (
      moveSets[
        inst.play
      ]||
      moveSets.strum
    )[
      idx
    ];


  renderConcertTeams(
    p.id
  );


  playInstrument(
    inst.name,
    idx===3
      ?659
      :440
  );


  if(
    move[1]==='heal'
  ){

    const h=
      Math.round(
        inst.melody*
        7
        +
        220
      );


    multiplayerState.blueHP=
      clamp(
        multiplayerState.blueHP+h,
        0,
        10000
      );


    multiplayerState.playerEnergy=
      clamp(
        multiplayerState.playerEnergy+1,
        0,
        3
      );


    S.heal();


    setMP(
      `<strong>💚 ${move[0]}</strong><span>Team Blue restored ${h} HP.</span>`
    );

  }


  else if(
    move[1]==='shield'
  ){

    multiplayerState.teamShield=
      true;


    multiplayerState.playerEnergy=
      clamp(
        multiplayerState.playerEnergy+1,
        0,
        3
      );


    S.shield();


    setMP(
      `<strong>🛡️ ${move[0]}</strong><span>Team Blue is shielded against the next attack.</span>`
    );

  }


  else{

    let mult=
      move[2];


    if(
      idx===3
    ){

      mult*=
        1.5;


      multiplayerState.playerEnergy=
        0;


      S.ultimate();

      crowd(
        1
      );

    }

    else{

      multiplayerState.playerEnergy=
        clamp(
          multiplayerState.playerEnergy+1,
          0,
          3
        );


      S.attack();

    }


    const hit=
      teamDamage(
        p,
        mult
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
      `<strong>🔵 ${p.name} used ${move[0]}!</strong><span>${hit.dmg} damage${hit.critical?' • CRITICAL PERFORMANCE!':''}</span>`
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


async function aiTeamTurn(
  p
){

  renderConcertTeams(
    p.id
  );


  playInstrument(
    p.instrument,
    p.team==='blue'
      ?420
      :320
  );


  S.attack();


  let hit=
    teamDamage(
      p,
      .8
    );


  if(
    p.team==='red' &&
    multiplayerState.teamShield
  ){

    const restore=
      Math.round(
        hit.dmg*
        .45
      );


    multiplayerState.blueHP=
      Math.min(
        10000,
        multiplayerState.blueHP+
        restore
      );


    hit.dmg-=
      restore;


    multiplayerState.teamShield=
      false;


    S.shield();


    updateTeamHPBars();

  }


  if(
    hit.critical
  ){

    S.critical();

  }


  setMP(
    `<strong>${p.team==='blue'?'🔵':'🔴'} ${p.name} performs!</strong><span>${p.instrument} deals ${hit.dmg} team damage${hit.critical?' • CRITICAL!':''}</span>`
  );


  await wait(
    multiplayerState.size>=10
      ?150
      :350
  );

}


async function startTeamBattle(){

  if(
    multiplayerState.playing
  )
    return;


  multiplayerState.playing=
    true;


  $('#startTeamBattleBtn')
    .disabled=
      true;


  $('#startTeamBattleBtn')
    .textContent=
      'Concert in Progress...';


  let round=
    1;


  while(
    multiplayerState.blueHP>0 &&
    multiplayerState.redHP>0 &&
    round<=50
  ){

    multiplayerState.round=
      round;


    $('#concertRoundLabel')
      .textContent=
        `ROUND ${round}`;


    setMP(
      `<strong>🎵 Round ${round}: Your turn!</strong><span>Choose one of your instrument moves.</span>`
    );


    const move=
      await waitHumanMove();


    await executeTeamMove(
      move
    );


    if(
      multiplayerState.redHP<=0
    )
      break;


    for(
      const p of
      multiplayerState.blue.slice(
        1
      )
    ){

      await aiTeamTurn(
        p
      );


      if(
        multiplayerState.redHP<=0
      )
        break;

    }


    if(
      multiplayerState.redHP<=0
    )
      break;


    for(
      const p of
      multiplayerState.red
    ){

      await aiTeamTurn(
        p
      );


      if(
        multiplayerState.blueHP<=0
      )
        break;

    }


    round++;

  }


  multiplayerState.playing=
    false;


  $('#teamMovePanel')
    .classList
    .add(
      'hidden'
    );


  const won=
    multiplayerState.blueHP>
    multiplayerState.redHP;


  $('#concertRoundLabel')
    .textContent=
      won
        ?'VICTORY'
        :'DEFEAT';


  if(
    won
  ){

    crowd(
      1
    );


    S.victory();


    progressQuest(
      'battle',
      1
    );


    reward(

      24+
      multiplayerState.size*
      2,

      18+
      multiplayerState.size*
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

  else{

    S.defeat();


    addXP(
      6
    );


    setMP(
      `<strong>Team Red wins the concert.</strong><span>+18 EXP for performing.</span>`
    );

  }


  $('#startTeamBattleBtn')
    .disabled=
      false;


  $('#startTeamBattleBtn')
    .textContent=
      'Play Again';

}


$$(
  '.mp-start'
)
.forEach(
  b=>
    b.onclick=
      ()=>
        openLobby(
          +b.dataset.team
        )
);


$('#startTeamBattleBtn')
  .onclick=
    startTeamBattle;
/* ============================ DAILY REWARDS ============================ */

const dailyRewardTable=[
  {
    day:1,
    label:'15 Coins',
    icon:'🪙',
    coins:15
  },
  {
    day:2,
    label:'10 EXP',
    icon:'⭐',
    xp:10
  },
  {
    day:3,
    label:'8 Instrument EXP',
    icon:'🎵',
    instrumentXP:8
  },
  {
    day:4,
    label:'25 Coins + 10 EXP',
    icon:'🎁',
    coins:25,
    xp:10
  },
  {
    day:5,
    label:'15 Star Dust',
    icon:'💫',
    dust:15
  },
  {
    day:6,
    label:'Pet Egg',
    icon:'🥚',
    petEgg:true
  },
  {
    day:7,
    label:'Weekly Chest',
    icon:'👑',
    coins:50,
    xp:30,
    instrumentXP:15,
    weeklyChest:true
  }
];


function getLocalDateKey(
  date=new Date()
){

  const y=
    date.getFullYear();

  const m=
    String(
      date.getMonth()+1
    )
    .padStart(
      2,
      '0'
    );

  const d=
    String(
      date.getDate()
    )
    .padStart(
      2,
      '0'
    );

  return `${y}-${m}-${d}`;

}


function getYesterdayDateKey(){

  const d=
    new Date();

  d.setDate(
    d.getDate()-1
  );

  return getLocalDateKey(
    d
  );

}


function canClaimDailyReward(){

  return (
    profile.dailyRewards.lastClaim !==
    getLocalDateKey()
  );

}


function getNextDailyRewardDay(){

  const today=
    getLocalDateKey();

  const y=
    getYesterdayDateKey();


  if(
    profile.dailyRewards.lastClaim===today
  ){

    return (
      profile.dailyRewards.streak||
      1
    );

  }


  if(
    profile.dailyRewards.lastClaim===y
  ){

    return (
      profile.dailyRewards.streak%7
    )+1;

  }


  return 1;

}


function giveDailyPetEgg(){

  const eggs=[

    {
      egg:'Meadow Egg',
      icon:'🌱',
      pet:'Music Bunny',
      layer:'Daily Reward'
    },

    {
      egg:'Cave Egg',
      icon:'🪨',
      pet:'Mole Beat',
      layer:'Daily Reward'
    },

    {
      egg:'Stone Egg',
      icon:'🐾',
      pet:'Rock Pup',
      layer:'Daily Reward'
    },

    {
      egg:'Golden Egg',
      icon:'🪙',
      pet:'Gold Chick',
      layer:'Daily Reward'
    },

    {
      egg:'Crystal Egg',
      icon:'💎',
      pet:'Crystal Fox',
      layer:'Daily Reward'
    }

  ];


  const egg=
    pick(
      Math.random()<.08
        ?eggs.slice(3)
        :eggs.slice(0,3)
    );


  profile.petEggs.push({

    id:
      `daily-${Date.now()}-${Math.random()}`,

    ...egg,

    hatched:false

  });


  toast(
    `${egg.icon} You received a ${egg.egg}!`
  );

}


function rollWeeklyChestBonus(){

  const r=
    Math.random();


  if(
    r<.03
  ){

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

      hatched:false

    });


    toast(
      '✨ JACKPOT! Celestial Egg!'
    );

  }

  else if(
    r<.15
  ){

    profile.dust+=25;


    toast(
      '💫 Weekly Chest bonus: +25 Star Dust!'
    );

  }

}


function claimDailyReward(){

  if(
    !canClaimDailyReward()
  ){

    return toast(
      "You already claimed today's reward!"
    );

  }


  profile.dailyRewards.streak=
    profile.dailyRewards.lastClaim===
    getYesterdayDateKey()

      ?(
        profile.dailyRewards.streak%7
      )+1

      :1;


  const r=
    dailyRewardTable[
      profile.dailyRewards.streak-1
    ];


  if(
    r.coins
  ){

    profile.coins+=
      r.coins;

  }


  if(
    r.xp
  ){

    addXP(
      r.xp
    );

  }


  if(
    r.dust
  ){

    profile.dust+=
      r.dust;

  }


  if(
    r.instrumentXP
  ){

    addInstrumentXP(
      profile.equipped,
      r.instrumentXP
    );

  }


  if(
    r.petEgg
  ){

    giveDailyPetEgg();

  }


  if(
    r.weeklyChest
  ){

    rollWeeklyChestBonus();

  }


  profile.dailyRewards.lastClaim=
    getLocalDateKey();


  persist();

  updateProfileUI();

  renderDailyRewards();

  renderCraftEggs();

  S.treasure();


  toast(
    `${r.icon} Day ${r.day}: ${r.label}!`
  );

}


function renderDailyRewards(){

  const grid=
    $('#dailyRewardGrid');


  if(
    !grid
  )
    return;


  const next=
    getNextDailyRewardDay();


  const claimable=
    canClaimDailyReward();


  $('#dailyStreakLabel')
    .textContent=
      profile.dailyRewards.streak||
      0;


  grid.innerHTML=
    dailyRewardTable
      .map(
        r=>
          `
          <div
            class="
              daily-reward-card
              ${
                claimable &&
                r.day===next
                  ?'current'
                  :''
              }

              ${
                !claimable &&
                r.day===
                profile.dailyRewards.streak
                  ?'claimed'
                  :''
              }

              ${
                r.day===7
                  ?'day-seven'
                  :''
              }
            "
          >

            <span class="daily-day">
              DAY ${r.day}
            </span>

            <div class="daily-icon">
              ${r.icon}
            </div>

            <strong>
              ${r.label}
            </strong>

          </div>
          `
      )
      .join('');


  const b=
    $('#claimDailyBtn');


  b.disabled=
    !claimable;


  b.textContent=
    claimable
      ?`CLAIM DAY ${next}`
      :'COME BACK TOMORROW';

}


/* ============================ QUESTS / GEAR / PETS ============================ */

const questDefs=[

  {
    id:'fight',
    name:'Battle Practice',
    goal:3,
    label:'Defeat 3 RPG enemies',
    xp:10,
    coins:6
  },

  {
    id:'mine',
    name:'Deep Miner',
    goal:20,
    label:'Mine 20 MusicCraft blocks',
    xp:10,
    coins:6
  },

  {
    id:'battle',
    name:'Arena Winner',
    goal:1,
    label:'Win 1 Solo or Team Battle',
    xp:12,
    coins:8
  }

];


function ensureQuests(){

  questDefs
    .forEach(
      q=>{

        if(
          !profile.quests[
            q.id
          ]
        ){

          profile.quests[
            q.id
          ]={

            progress:0,

            claimed:false

          };

        }

      }
    );

}


function progressQuest(
  id,
  n=1
){

  ensureQuests();


  const q=
    questDefs.find(
      x=>
        x.id===id
    );


  const s=
    profile.quests[
      id
    ];


  if(
    !q ||
    s.claimed
  )
    return;


  s.progress=
    Math.min(
      q.goal,
      s.progress+n
    );


  persist();

  renderQuests();

}


function claimQuest(
  id
){

  const q=
    questDefs.find(
      x=>
        x.id===id
    );


  const s=
    profile.quests[
      id
    ];


  if(
    !q ||
    !s ||
    s.progress<q.goal ||
    s.claimed
  )
    return;


  s.claimed=
    true;


  reward(
    q.xp,
    q.coins,
    `${q.name} complete!`
  );


  renderQuests();

}


function renderQuests(){

  const el=
    $('#questList');


  if(
    !el
  )
    return;


  ensureQuests();


  el.innerHTML=
    questDefs
      .map(
        q=>{

          const s=
            profile.quests[
              q.id
            ];


          const pct=
            Math.min(
              100,
              s.progress/
              q.goal*
              100
            );


          return `
            <div class="quest-card">

              <strong>
                ${q.name}
              </strong>

              <span>
                ${q.label}
              </span>

              <div class="quest-progress">
                <i
                  style="
                    width:${pct}%
                  "
                ></i>
              </div>

              <small>

                ${s.progress}/${q.goal}

                • ${q.xp} EXP

                • ${q.coins} Coins

              </small>


              ${
                s.progress>=q.goal &&
                !s.claimed

                  ?`
                  <button
                    class="btn gold small"
                    data-quest-claim="${q.id}"
                  >
                    Claim
                  </button>
                  `

                  :s.claimed

                    ?'<small> ✓ Claimed</small>'

                    :''
              }

            </div>
          `;

        }
      )
      .join('');


  $$(
    '[data-quest-claim]'
  )
  .forEach(
    b=>
      b.onclick=
        ()=>
          claimQuest(
            b.dataset.questClaim
          )
  );

}


function renderEquipment(){

  const el=
    $('#equipmentList');


  if(
    !el
  )
    return;


  el.innerHTML=
    profile.equipmentInventory
      .map(
        (
          g,
          i
        )=>{

          const eq=
            profile.equippedGear[
              g.slot
            ]?.name===
            g.name;


          return `
            <div class="gear-card">

              <div>

                <strong>
                  ${g.name}
                </strong>

                <small>

                  ${g.slot}

                  •

                  ${
                    g.attack
                      ?`+${g.attack} ATK `
                      :''
                  }

                  ${
                    g.defense
                      ?`+${g.defense} DEF`
                      :''
                  }

                </small>

              </div>


              <button
                class="
                  btn
                  small
                  ${
                    eq
                      ?'gold'
                      :'ghost'
                  }
                "
                data-gear="${i}"
              >

                ${
                  eq
                    ?'Equipped'
                    :'Equip'
                }

              </button>

            </div>
          `;

        }
      )
      .join('');


  $$(
    '[data-gear]'
  )
  .forEach(
    b=>
      b.onclick=
        ()=>{

          const g=
            profile.equipmentInventory[
              +b.dataset.gear
            ];


          profile.equippedGear[
            g.slot
          ]=
            g;


          persist();

          renderEquipment();

          renderInstruments();

          S.click();

        }
  );

}


const petTypes={

  'Music Bunny':'melody',

  'Mole Beat':'defense',

  'Rock Pup':'attack',

  'Shadow Bat':'attack',

  'Gear Fox':'defense',

  'Echo Spider':'melody',

  'Gold Chick':'all',

  'Crystal Fox':'melody',

  'Diamond Dragon':'attack',

  'Obsidian Wolf':'defense',

  'Relic Guardian':'defense',

  'Lava Dragon':'attack',

  'Echo Spirit':'melody',

  'Star Phoenix':'all',

  'Harmony Dragon':'all'

};


function hatchCraftEgg(
  id
){

  const egg=
    profile.petEggs.find(
      e=>
        e.id===id
    );


  if(
    !egg ||
    egg.hatched
  )
    return;


  egg.hatched=
    true;


  const existing=
    profile.pets.find(
      p=>
        p.name===
        egg.pet
    );


  if(
    existing
  ){

    profile.dust+=10;


    toast(
      `✨ Duplicate ${egg.pet}! +10 Star Dust`
    );

  }

  else{

    profile.pets.push({

      id:
        `pet-${Date.now()}-${Math.random()}`,

      name:
        egg.pet,

      level:1,

      xp:0,

      type:
        petTypes[
          egg.pet
        ]||
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


function renderPets(){

  const el=
    $('#petList');


  if(
    !el
  )
    return;


  if(
    !profile.pets.length
  ){

    el.innerHTML=
      '<p class="muted">Hatch eggs in MusicCraft to collect pets.</p>';


    return;

  }


  el.innerHTML=
    profile.pets
      .map(
        p=>{

          const need=
            (
              p.level||
              1
            )*
            40;


          const eq=
            profile.equippedPet===
            p.id;


          return `
            <div class="pet-card">

              <div>

                <strong>

                  ${p.name}

                  • Lv.${p.level||1}

                </strong>

                <small>
                  ${p.type} pet
                </small>

                <div class="pet-xp">

                  <i
                    style="
                      width:${
                        Math.min(
                          100,
                          (
                            p.xp||
                            0
                          )/
                          need*
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
                    eq
                      ?'gold'
                      :'ghost'
                  }
                "
                data-pet="${p.id}"
              >

                ${
                  eq
                    ?'Active'
                    :'Equip'
                }

              </button>

            </div>
          `;

        }
      )
      .join('');


  $$(
    '[data-pet]'
  )
  .forEach(
    b=>
      b.onclick=
        ()=>{

          profile.equippedPet=
            b.dataset.pet;


          persist();

          renderPets();

          renderInstruments();

          S.click();

        }
  );

}


function renderEvolutionPanel(){

  const el=
    $('#evolutionPanel');


  if(
    !el
  )
    return;


  const name=
    profile.equipped;


  const u=
    getInstrumentUpgradeData(
      name
    );


  const done=
    profile.instrumentEvolutions[
      name
    ];


  const req={

    Stone:20,

    Crystal:5

  };


  if(
    done
  ){

    el.innerHTML=
      `
      <div class="evolution-card">

        <strong>
          ${done.name}
        </strong>

        <span>
          Evolution complete • +10% base stats
        </span>

      </div>
      `;


    return;

  }


  const can=
    u.level>=10
    &&
    (
      profile.materials.Stone||
      0
    )>=20
    &&
    (
      profile.materials.Crystal||
      0
    )>=5;


  el.innerHTML=
    `
    <div class="evolution-card">

      <strong>
        ${name} Evolution
      </strong>

      <span>
        Requires Instrument Lv.10 + 20 Stone + 5 Crystal
      </span>

      <button
        id="evolveInstrumentBtn"
        class="
          btn
          ${
            can
              ?'gold'
              :'ghost'
          }
          small
        "
        ${
          can
            ?''
            :'disabled'
        }
      >
        Evolve
      </button>

    </div>
    `;


  if(
    can
  ){

    $('#evolveInstrumentBtn')
      .onclick=
        ()=>{

          profile.materials.Stone-=20;

          profile.materials.Crystal-=5;


          profile.instrumentEvolutions[
            name
          ]={

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


/* ============================ SKILL TREE ============================ */

const skillTreeDefs={

  power:{

    name:
      'Power',

    icon:
      '⚔️',

    desc:
      'Stronger attacks and special moves.',

    nodes:[

      {

        id:
          'power1',

        icon:
          '🎸',

        name:
          'Forte',

        desc:
          '+3% attack damage per rank.',

        max:3,

        requires:null

      },

      {

        id:
          'power2',

        icon:
          '💥',

        name:
          'Critical Ear',

        desc:
          '+2% critical chance per rank.',

        max:3,

        requires:
          'power1'

      },

      {

        id:
          'power3',

        icon:
          '🔥',

        name:
          'Encore Strike',

        desc:
          '+5% special move damage per rank.',

        max:3,

        requires:
          'power2'

      }

    ]

  },


  rhythm:{

    name:
      'Rhythm',

    icon:
      '🥁',

    desc:
      'Defence, dodging and tempo control.',

    nodes:[

      {

        id:
          'rhythm1',

        icon:
          '🛡️',

        name:
          'Tempo Guard',

        desc:
          '+3% defence per rank.',

        max:3,

        requires:null

      },

      {

        id:
          'rhythm2',

        icon:
          '💨',

        name:
          'Quick Beat',

        desc:
          '+2% dodge chance per rank.',

        max:3,

        requires:
          'rhythm1'

      },

      {

        id:
          'rhythm3',

        icon:
          '⚡',

        name:
          'Momentum',

        desc:
          '+4% normal attack damage per rank.',

        max:3,

        requires:
          'rhythm2'

      }

    ]

  },


  harmony:{

    name:
      'Harmony',

    icon:
      '🎼',

    desc:
      'More HP, healing and pet growth.',

    nodes:[

      {

        id:
          'harmony1',

        icon:
          '❤️',

        name:
          'Vital Chorus',

        desc:
          '+5 max RPG HP per rank.',

        max:3,

        requires:null

      },

      {

        id:
          'harmony2',

        icon:
          '✨',

        name:
          'Healing Notes',

        desc:
          '+8% healing per rank.',

        max:3,

        requires:
          'harmony1'

      },

      {

        id:
          'harmony3',

        icon:
          '🐾',

        name:
          'Companion Bond',

        desc:
          '+10% pet EXP per rank.',

        max:3,

        requires:
          'harmony2'

      }

    ]

  }

};


function totalSkillPointsEarned(){

  return Math.floor(
    (
      profile.level-1
    )/
    2
  );

}


function spentSkillPoints(){

  return Object
    .values(
      profile.skillTree||
      {}
    )
    .reduce(
      (
        a,
        b
      )=>

        a+
        (
          Number(
            b
          )||
          0
        ),

      0
    );

}


function availableSkillPoints(){

  return Math.max(
    0,

    totalSkillPointsEarned()
    -
    spentSkillPoints()
  );

}


function skillRank(
  id
){

  return Number(
    profile.skillTree?.[
      id
    ]||
    0
  );

}


function canBuySkill(
  node
){

  if(
    availableSkillPoints()<=0
  ){

    return false;

  }


  if(
    skillRank(
      node.id
    )>=
    node.max
  ){

    return false;

  }


  if(
    node.requires
    &&
    skillRank(
      node.requires
    )<=0
  ){

    return false;

  }


  return true;

}


function buySkill(
  id
){

  let node=
    null;


  for(
    const branch of
    Object.values(
      skillTreeDefs
    )
  ){

    node=
      branch.nodes.find(
        n=>
          n.id===id
      );


    if(
      node
    )
      break;

  }


  if(
    !node
  )
    return;


  if(
    !canBuySkill(
      node
    )
  ){

    if(
      availableSkillPoints()<=0
    ){

      toast(
        'You need another Skill Point.'
      );

    }

    else if(
      node.requires
      &&
      skillRank(
        node.requires
      )<=0
    ){

      toast(
        'Unlock the previous skill first.'
      );

    }


    return;

  }


  profile.skillTree[
    id
  ]=

    skillRank(
      id
    )+
    1;


  applySkillTreeVitals();

  persist();

  S.level();


  toast(
    `🌳 ${node.name} is now Rank ${profile.skillTree[id]}!`
  );


  renderSkillTree();

  renderRpgMap();


  if(
    rpgEnemy
  ){

    renderRpgBattle();

  }

}


function getSkillBonuses(){

  return{

    attackPct:
      skillRank(
        'power1'
      )*
      .03,


    critChance:
      skillRank(
        'power2'
      )*
      .02,


    specialPct:
      skillRank(
        'power3'
      )*
      .05,


    defensePct:
      skillRank(
        'rhythm1'
      )*
      .03,


    dodgeChance:
      skillRank(
        'rhythm2'
      )*
      .02,


    normalPct:
      skillRank(
        'rhythm3'
      )*
      .04,


    maxHp:
      skillRank(
        'harmony1'
      )*
      5,


    healPct:
      skillRank(
        'harmony2'
      )*
      .08,


    petXpPct:
      skillRank(
        'harmony3'
      )*
      .10

  };

}


function applySkillTreeVitals(){

  const b=
    getSkillBonuses();


  const oldMax=
    profile.rpg.maxHp||
    100;


  const newMax=
    100+
    b.maxHp;


  profile.rpg.maxHp=
    newMax;


  if(
    profile.rpg.hp>
    newMax
  ){

    profile.rpg.hp=
      newMax;

  }


  if(
    newMax>
    oldMax
  ){

    profile.rpg.hp=
      Math.min(

        newMax,

        profile.rpg.hp+
        (
          newMax-
          oldMax
        )

      );

  }

}


function renderSkillTree(){

  const el=
    $('#skillTree');


  if(
    !el
  )
    return;


  applySkillTreeVitals();


  $('#skillPointsAvailable')
    .textContent=
      availableSkillPoints();


  el.innerHTML=

    Object
      .values(
        skillTreeDefs
      )
      .map(
        branch=>
          `
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
                  )=>{

                    const rank=
                      skillRank(
                        n.id
                      );


                    const locked=
                      n.requires
                      &&
                      skillRank(
                        n.requires
                      )<=0;


                    const maxed=
                      rank>=
                      n.max;


                    return `

                      ${
                        i
                          ?'<div class="skill-connector"></div>'
                          :''
                      }

                      <div
                        class="
                          skill-node
                          ${
                            locked
                              ?'locked'
                              :''
                          }

                          ${
                            maxed
                              ?'maxed'
                              :''
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

                            Rank
                            ${rank}
                            /
                            ${n.max}

                          </div>

                          <button
                            data-skill="${n.id}"

                            ${
                              maxed
                              ||
                              locked
                              ||
                              availableSkillPoints()<=0

                                ?'disabled'

                                :''
                            }
                          >

                            ${
                              maxed
                                ?'MAX'

                                :locked
                                  ?'LOCKED'

                                  :'UPGRADE'
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
          +${
            Math.round(
              getSkillBonuses()
                .attackPct*
              100
            )
          }%
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
          +${
            Math.round(
              getSkillBonuses()
                .petXpPct*
              100
            )
          }%
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
    b=>
      b.onclick=
        ()=>
          buySkill(
            b.dataset.skill
          )
  );

}


/* ============================ RPG WORLD ============================ */

const rpgZones=[

  {
    name:'Melody Village',
    emoji:'🏡',
    enemy:'Slime Note',
    boss:'Village Maestro'
  },

  {
    name:'Rhythm Forest',
    emoji:'🌲',
    enemy:'Beat Bug',
    boss:'Tempo Wolf'
  },

  {
    name:'Echo Caves',
    emoji:'🕳️',
    enemy:'Echo Bat',
    boss:'Crystal Golem'
  },

  {
    name:'Brass Kingdom',
    emoji:'🏰',
    enemy:'Horn Guard',
    boss:'Royal Conductor'
  },

  {
    name:'Crystal Highlands',
    emoji:'💎',
    enemy:'Shard Sprite',
    boss:'Crystal Maestro'
  },

  {
    name:'Shadow Ruins',
    emoji:'🗿',
    enemy:'Shadow Note',
    boss:'Silent Knight'
  },

  {
    name:'Magma Canyon',
    emoji:'🔥',
    enemy:'Fire Beat',
    boss:'Inferno Dragon'
  },

  {
    name:'Celestial Valley',
    emoji:'✨',
    enemy:'Star Wisp',
    boss:'Celestial Titan'
  },

  {
    name:'Void Realm',
    emoji:'🌌',
    enemy:'Void Spirit',
    boss:'Abyss Titan'
  },

  {
    name:'MusicVerse Citadel',
    emoji:'🎼',
    enemy:'Dark Virtuoso',
    boss:'The Silent King'
  }

];


let rpgMapData=[];

let rpgEnemy=null;


function makeRpgMap(){

  rpgMapData=
    Array.from(
      {
        length:8
      },
      (
        _,
        y
      )=>

        Array.from(
          {
            length:12
          },
          (
            _,
            x
          )=>

            x===0
            ||
            x===11
            ||
            y===0
            ||
            y===7

              ?'wall'

              :'floor'
        )
    );


  for(
    let i=0;
    i<10;
    i++
  ){

    const x=
      rand(
        2,
        10
      );


    const y=
      rand(
        1,
        6
      );


    if(
      x!==profile.rpg.x
      ||
      y!==profile.rpg.y
    ){

      rpgMapData[
        y
      ][
        x
      ]=
        'wall';

    }

  }


  for(
    let i=0;
    i<4;
    i++
  ){

    const x=
      rand(
        2,
        10
      );


    const y=
      rand(
        1,
        6
      );


    if(
      rpgMapData[
        y
      ][
        x
      ]===
      'floor'
    ){

      rpgMapData[
        y
      ][
        x
      ]=
        'enemy';

    }

  }


  for(
    let i=0;
    i<2;
    i++
  ){

    const x=
      rand(
        2,
        10
      );


    const y=
      rand(
        1,
        6
      );


    if(
      rpgMapData[
        y
      ][
        x
      ]===
      'floor'
    ){

      rpgMapData[
        y
      ][
        x
      ]=
        'chest';

    }

  }


  rpgMapData[
    6
  ][
    10
  ]=
    'exit';


  profile.rpg.x=
    1;


  profile.rpg.y=
    1;


  persist();

  renderRpgMap();

}


function renderRpgMap(){

  const el=
    $('#rpgMap');


  if(
    !el
  )
    return;


  $('#rpgZoneName')
    .textContent=
      rpgZones[
        profile.rpg.zone
      ].name;


  $('#rpgHpText')
    .textContent=
      `${profile.rpg.hp} / ${profile.rpg.maxHp}`;


  $('#rpgStoryText')
    .textContent=
      `${profile.rpg.storyStep+1} / ${rpgZones.length}`;


  el.innerHTML=
    rpgMapData
      .flatMap(
        (
          row,
          y
        )=>

          row.map(
            (
              t,
              x
            )=>{

              const p=
                x===profile.rpg.x
                &&
                y===profile.rpg.y;


              const icon=
                p

                  ?'🎸'

                  :t==='wall'

                    ?''

                    :t==='enemy'

                      ?'👾'

                      :t==='chest'

                        ?'🎁'

                        :t==='exit'

                          ?'🚪'

                          :'';


              return `
                <div
                  class="
                    rpg-tile
                    ${
                      p
                        ?'player'
                        :t
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


function moveRpg(
  dx,
  dy
){

  if(
    rpgEnemy
  )
    return;


  const nx=
    profile.rpg.x+
    dx;


  const ny=
    profile.rpg.y+
    dy;


  const t=
    rpgMapData[
      ny
    ]?.[
      nx
    ];


  if(
    !t
    ||
    t==='wall'
  )
    return;


  if(
    t==='enemy'
  ){

    profile.rpg.x=
      nx;


    profile.rpg.y=
      ny;


    startRpgBattle(
      false
    );


    return;

  }


  if(
    t==='chest'
  ){

    rpgMapData[
      ny
    ][
      nx
    ]=
      'floor';


    const coins=
      rand(
        2,
        7
      );


    profile.coins+=
      coins;


    if(
      Math.random()<.35
    ){

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


  if(
    t==='exit'
  ){

    startRpgBattle(
      true
    );


    return;

  }


  profile.rpg.x=
    nx;


  profile.rpg.y=
    ny;


  persist();

  renderRpgMap();

}


function startRpgBattle(
  boss
){

  const z=
    rpgZones[
      profile.rpg.zone
    ];


  const inst=
    getUpgradedInstrument(
      profile.equipped
    );


  rpgEnemy={

    name:
      boss
        ?z.boss
        :z.enemy,


    hp:
      boss
        ?220+
         profile.rpg.zone*
         70
        :75+
         profile.rpg.zone*
         25,


    max:
      boss
        ?220+
         profile.rpg.zone*
         70
        :75+
         profile.rpg.zone*
         25,


    boss,

    attack:
      boss
        ?12+
         profile.rpg.zone*
         2
        :6+
         profile.rpg.zone

  };


  renderRpgBattle();

}


function renderRpgBattle(){

  const p=
    $('#rpgBattlePanel');


  if(
    !p
    ||
    !rpgEnemy
  )
    return;


  p.classList
    .remove(
      'hidden'
    );


  const inst=
    getUpgradedInstrument(
      profile.equipped
    );


  p.innerHTML=
    `
    <div class="story-banner">

      ${
        rpgEnemy.boss

          ?`Boss guarding the fragment of the Grand Melody: ${rpgEnemy.name}`

          :`A ${rpgEnemy.name} blocks your path.`
      }

    </div>


    <div class="rpg-battle-grid">

      <div>

        <strong>
          ${profile.name||'Player'}
        </strong>

        <p>
          HP ${profile.rpg.hp}/${profile.rpg.maxHp}
        </p>

        <small>
          ${inst.icon} ${profile.equipped}
        </small>

      </div>


      <div>

        <strong>

          ${
            rpgEnemy.boss
              ?'👑'
              :'👾'
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
    .onclick=
      ()=>
        rpgPlayerAction(
          'attack'
        );


  $('#rpgSkill')
    .onclick=
      ()=>
        rpgPlayerAction(
          'skill'
        );


  $('#rpgHeal')
    .onclick=
      ()=>
        rpgPlayerAction(
          'heal'
        );


  $('#rpgRun')
    .onclick=
      ()=>{

        if(
          rpgEnemy.boss
        ){

          return toast(
            'You cannot run from a boss!'
          );

        }


        rpgEnemy=
          null;


        p.classList
          .add(
            'hidden'
          );


        rpgMapData[
          profile.rpg.y
        ][
          profile.rpg.x
        ]=
          'floor';


        renderRpgMap();

      };

}


function rpgPlayerAction(
  type
){

  const inst=
    getUpgradedInstrument(
      profile.equipped
    );


  const skills=
    getSkillBonuses();


  if(
    type==='heal'
  ){

    const base=
      Math.round(
        inst.melody*
        .12
      )+
      6;


    const heal=
      Math.round(

        base*

        (
          1+
          skills.healPct
        )

      );


    profile.rpg.hp=
      Math.min(

        profile.rpg.maxHp,

        profile.rpg.hp+
        heal

      );


    S.heal();


    toast(
      `✨ Healed ${heal} HP`
    );

  }

  else{

    let mult=
      type==='skill'
        ?1.45
        :1;


    mult*=
      1+
      skills.attackPct;


    mult*=
      type==='skill'

        ?1+
         skills.specialPct

        :1+
         skills.normalPct;


    let damage=
      Math.max(

        5,

        Math.round(

          (
            inst.attack*.22

            +

            inst.rhythm*.08

            +

            rand(
              0,
              6
            )
          )

          *

          mult

        )

      );


    const crit=
      Math.random()
      <
      .06
      +
      inst.melody/
      1600
      +
      skills.critChance;


    if(
      crit
    ){

      damage=
        Math.round(
          damage*
          1.5
        );


      S.critical();


      toast(
        '💥 Critical hit!'
      );

    }


    rpgEnemy.hp=
      Math.max(

        0,

        rpgEnemy.hp-
        damage

      );


    playInstrument(

      profile.equipped,

      type==='skill'
        ?660
        :440

    );


    type==='skill'
      ?S.ultimate()
      :S.attack();

  }


  if(
    rpgEnemy.hp<=0
  ){

    finishRpgBattle();

    return;

  }


  if(
    Math.random()<
    skills.dodgeChance
  ){

    S.great();


    toast(
      '💨 Quick Beat! You dodged the attack.'
    );


    persist();

    renderRpgBattle();

    renderRpgMap();


    return;

  }


  const effectiveDefense=
    inst.defense*
    (
      1+
      skills.defensePct
    );


  const hurt=
    Math.max(

      1,

      rpgEnemy.attack

      -

      Math.round(
        effectiveDefense*
        .035
      )

    );


  profile.rpg.hp=
    Math.max(

      0,

      profile.rpg.hp-
      hurt

    );


  if(
    profile.rpg.hp<=0
  ){

    profile.rpg.hp=
      profile.rpg.maxHp;


    rpgEnemy=
      null;


    $('#rpgBattlePanel')
      .classList
      .add(
        'hidden'
      );


    profile.rpg.x=
      1;


    profile.rpg.y=
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


function finishRpgBattle(){

  const boss=
    rpgEnemy.boss;


  const name=
    rpgEnemy.name;


  progressQuest(
    'fight',
    1
  );


  addInstrumentXP(

    profile.equipped,

    boss
      ?8
      :2

  );


  if(
    profile.equippedPet
  ){

    addPetXP(

      profile.equippedPet,

      boss
        ?12
        :3

    );

  }


  reward(

    boss
      ?28
      :6,

    boss
      ?18
      :3,

    `${name} defeated!`

  );


  if(
    boss
  ){

    profile.rpg.storyStep=
      Math.max(

        profile.rpg.storyStep,

        profile.rpg.zone+1

      );


    if(
      profile.rpg.zone<
      rpgZones.length-1
    ){

      profile.rpg.zone++;


      profile.rpg.hp=
        profile.rpg.maxHp;


      toast(
        `🗺️ ${rpgZones[profile.rpg.zone].name} unlocked!`
      );

    }

    else{

      toast(
        '🎼 The Grand Melody has been restored!'
      );

    }


    makeRpgMap();

  }

  else{

    rpgMapData[
      profile.rpg.y
    ][
      profile.rpg.x
    ]=
      'floor';

  }


  rpgEnemy=
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


function setupRpg(){

  if(
    !rpgMapData.length
  ){

    makeRpgMap();

  }


  const map=
    $('#rpgMap');


  if(
    map
  ){

    map.onkeydown=
      e=>{

        const k=
          e.key
            .toLowerCase();


        const m={

          arrowup:[
            0,
            -1
          ],

          w:[
            0,
            -1
          ],

          arrowdown:[
            0,
            1
          ],

          s:[
            0,
            1
          ],

          arrowleft:[
            -1,
            0
          ],

          a:[
            -1,
            0
          ],

          arrowright:[
            1,
            0
          ],

          d:[
            1,
            0
          ]

        }[
          k
        ];


        if(
          m
        ){

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
    )=>{

      $('#'+id)
        .onclick=
          ()=>
            moveRpg(
              x,
              y
            );

    }
  );

}
/* ============================ GAME HUB ============================ */
const games=[['rhythm','🎵','Rhythm Rush','Hit falling notes with D F J K.'],['guess','🎼','Guess the Song','Hear a melody and identify it.'],['tiles','🎹','Piano Tiles','Hit the correct tiles before they fall.'],['pitch','👂','Perfect Pitch','Listen to a note and identify it.'],['memory','🧠','Melody Memory','Repeat an increasingly long melody.'],['dash','🏃','Music Dash','Jump obstacles and collect music coins.'],['hero','🎸','Instrument Hero','Score combos with your equipped instrument.'],['beat','🎧','Beat Battle','Time your hits to defeat a music boss.'],['dungeon','🏰','Music Dungeon','Explore rooms and fight musical monsters.']];

function renderGameCards(){
  $('#gameCards').innerHTML=games.map(g=>`
    <article class="game-card" data-game="${g[0]}">
      <div class="game-icon">${g[1]}</div>
      <h3>${g[2]}</h3>
      <p>${g[3]}</p>
      <b>EARNS UNIVERSAL EXP</b>
    </article>
  `).join('');

  $$('[data-game]').forEach(c=>c.onclick=()=>openGame(c.dataset.game));
}

function openGame(id){
  stopActiveGame();

  const g=games.find(x=>x[0]===id);

  $('#gameStage').classList.remove('hidden');
  $('#gameEyebrow').textContent='MUSICVERSE ARCADE';
  $('#gameTitle').textContent=g[2];
  $('#gameBody').innerHTML='';

  $('#gameStage').scrollIntoView({
    behavior:'smooth',
    block:'start'
  });

  ({
    rhythm:startRhythm,
    guess:startGuessSong,
    tiles:startPianoTiles,
    pitch:startPitch,
    memory:startMemory,
    dash:startDash,
    hero:startInstrumentHero,
    beat:startBeatBattle,
    dungeon:startDungeon
  }[id])();
}

$('#closeGameBtn').onclick=()=>{
  stopActiveGame();
  $('#gameStage').classList.add('hidden');
};

let activeIntervals=[];
let activeKeyHandler=null;

function every(fn,ms){
  const id=setInterval(fn,ms);
  activeIntervals.push(id);
  return id;
}

function stopActiveGame(){
  activeIntervals.forEach(clearInterval);
  activeIntervals=[];

  if(activeKeyHandler){
    document.removeEventListener('keydown',activeKeyHandler);
    activeKeyHandler=null;
  }
}


/* ============================ RHYTHM RUSH ============================ */

function startRhythm(){

  $('#gameBody').innerHTML=`
    <div class="game-panel">

      <div class="game-toolbar">
        <span class="game-stat">
          Score <b id="rrScore">0</b>
        </span>

        <span class="game-stat">
          Combo <b id="rrCombo">0</b>
        </span>

        <span class="game-stat">
          Time <b id="rrTime">20</b>s
        </span>
      </div>

      <div id="rrBoard" class="lane-board">
        ${
          ['D','F','J','K']
          .map((k,i)=>`
            <div class="lane" data-lane="${i}">
              <div class="lane-key">${k}</div>
            </div>
          `)
          .join('')
        }
      </div>

      <p id="rrResult">
        Press D F J K when notes reach the bottom.
      </p>

    </div>
  `;

  let score=0;
  let combo=0;
  let time=20;
  let notes=[];

  function spawn(){

    const lane=rand(0,3);

    const el=document.createElement('div');

    el.className='fall-note';
    el.style.top='-30px';
    el.dataset.y='-30';
    el.dataset.lane=lane;

    $('#rrBoard')
      .children[lane]
      .appendChild(el);

    notes.push(el);
  }

  every(spawn,650);

  every(()=>{

    notes=[...notes].filter(n=>{

      let y=+n.dataset.y+8;

      n.dataset.y=y;
      n.style.top=y+'px';

      if(y>330){

        n.remove();

        combo=0;

        $('#rrCombo').textContent=combo;

        S.miss();

        return false;
      }

      return true;
    });

  },35);

  every(()=>{

    time--;

    $('#rrTime').textContent=time;

    if(time<=0){

      stopActiveGame();

      $('#rrResult').textContent=
        `Finished! Score ${score}.`;

      const xp=
        20+
        Math.round(score/300);

      reward(
        xp,
        Math.round(xp*.6),
        'Rhythm Rush complete!'
      );

      addMastery(
        profile.equipped,
        Math.round(score/500)
      );
    }

  },1000);

  activeKeyHandler=e=>{

    const map={
      d:0,
      f:1,
      j:2,
      k:3
    };

    const lane=
      map[e.key.toLowerCase()];

    if(lane===undefined)
      return;

    const candidates=
      notes
      .filter(n=>+n.dataset.lane===lane)
      .sort(
        (a,b)=>
          +b.dataset.y-
          +a.dataset.y
      );

    const n=
      candidates[0];

    if(!n){

      combo=0;

      S.miss();

      return;
    }

    const y=
      +n.dataset.y;

    const dist=
      Math.abs(306-y);

    if(dist<32){

      score+=
        dist<12
          ?150
          :100;

      combo++;

      dist<12
        ?S.perfect()
        :S.great();

      n.remove();

      notes=
        notes.filter(x=>x!==n);
    }

    else{

      combo=0;

      S.miss();
    }

    $('#rrScore').textContent=score;
    $('#rrCombo').textContent=combo;
  };

  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* ============================ GUESS THE SONG ============================ */

const melodies=[
  {
    name:'Twinkle Twinkle Little Star',
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
    name:'Ode to Joy',
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
    name:'Mary Had a Little Lamb',
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

function playMelody(m){

  m.notes.forEach(
    (n,i)=>
      SoundEngine.tone(
        n,
        .26,
        'sine',
        .09,
        i*.24
      )
  );
}

function startGuessSong(){

  let score=0;
  let round=0;
  let current;

  const render=()=>{

    current=
      pick(melodies);

    const opts=[
      current.name,
      ...melodies
        .filter(x=>x!==current)
        .map(x=>x.name)
    ]
    .sort(
      ()=>Math.random()-.5
    );

    $('#gameBody').innerHTML=`
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
            opts
            .map(o=>`
              <button data-song="${o}">
                ${o}
              </button>
            `)
            .join('')
          }
        </div>

        <p>
          Listen carefully, then choose the melody.
        </p>

      </div>
    `;

    $('#playSongBtn').onclick=
      ()=>playMelody(current);

    $$('[data-song]')
      .forEach(b=>b.onclick=()=>{

        const ok=
          b.dataset.song===
          current.name;

        ok
          ?(
            score++,
            S.correct()
          )
          :S.wrong();

        round++;

        if(round>=5){

          const xp=
            score*10+
            10;

          reward(
            xp,
            score*8,
            'Guess the Song complete!'
          );

          $('#gameBody').innerHTML=`
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

          $('#againGuess').onclick=
            startGuessSong;
        }

        else{

          render();
        }

      });
  };

  render();
}


/* ============================ PIANO TILES ============================ */

function startPianoTiles(){

  $('#gameBody').innerHTML=`
    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Score <b id="ptScore">0</b>
        </span>

        <span class="game-stat">
          Time <b id="ptTime">20</b>s
        </span>

      </div>

      <div id="ptBoard" class="lane-board">

        ${
          ['D','F','J','K']
          .map((k,i)=>`
            <div
              class="lane"
              data-lane="${i}"
            >

              <div class="lane-key">
                ${k}
              </div>

            </div>
          `)
          .join('')
        }

      </div>

    </div>
  `;

  let score=0;
  let time=20;
  let notes=[];

  every(()=>{

    const lane=
      rand(0,3);

    const el=
      document.createElement('div');

    el.className=
      'fall-note';

    el.style.background=
      '#f7f5ef';

    el.dataset.y=
      '-30';

    el.dataset.lane=
      lane;

    $('#ptBoard')
      .children[lane]
      .appendChild(el);

    notes.push(el);

  },480);

  every(()=>{

    notes=[...notes].filter(n=>{

      const y=
        +n.dataset.y+
        10;

      n.dataset.y=y;
      n.style.top=y+'px';

      if(y>330){

        n.remove();

        S.miss();

        return false;
      }

      return true;

    });

  },35);

  every(()=>{

    time--;

    $('#ptTime').textContent=
      time;

    if(time<=0){

      stopActiveGame();

      const xp=
        15+
        Math.round(score/250);

      reward(
        xp,
        Math.round(xp*.5),
        'Piano Tiles complete!'
      );
    }

  },1000);

  activeKeyHandler=e=>{

    const lane={
      d:0,
      f:1,
      j:2,
      k:3
    }[
      e.key.toLowerCase()
    ];

    if(lane===undefined)
      return;

    const n=
      notes
      .filter(
        x=>
          +x.dataset.lane===
          lane
      )
      .sort(
        (a,b)=>
          +b.dataset.y-
          +a.dataset.y
      )[0];

    if(
      n &&
      +n.dataset.y>250
    ){

      score+=100;

      S.perfect();

      playInstrument(
        'Piano',
        261.6*
        Math.pow(
          2,
          lane/12
        )
      );

      n.remove();

      notes=
        notes.filter(
          x=>x!==n
        );

      $('#ptScore').textContent=
        score;
    }

    else{

      S.miss();
    }

  };

  document.addEventListener(
    'keydown',
    activeKeyHandler
  );
}


/* ============================ PERFECT PITCH ============================ */

function startPitch(){

  const notes=[
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B'
  ];

  const freq=[
    261.6,
    293.7,
    329.6,
    349.2,
    392,
    440,
    493.9
  ];

  let score=0;
  let round=0;
  let target=0;

  const render=()=>{

    target=
      rand(0,6);

    $('#gameBody').innerHTML=`
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
            .map((n,i)=>`
              <button
                data-pitch="${i}"
              >
                ${n}
              </button>
            `)
            .join('')
          }

        </div>

      </div>
    `;

    $('#hearPitch').onclick=
      ()=>
        SoundEngine.tone(
          freq[target],
          .55,
          'sine',
          .15
        );

    $$('[data-pitch]')
      .forEach(
        b=>
          b.onclick=
            ()=>{

              const ok=
                +b.dataset.pitch===
                target;

              ok
                ?(
                  score++,
                  S.correct()
                )
                :S.wrong();

              round++;

              if(round>=10){

                reward(
                  score*6+10,
                  score*4,
                  'Perfect Pitch complete!'
                );

                $('#gameBody').innerHTML=`
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

                $('#pitchAgain').onclick=
                  startPitch;
              }

              else{

                render();
              }

            }
      );
  };

  render();
}


/* ============================ MELODY MEMORY ============================ */

function startMemory(){

  const notes=[
    261.6,
    293.7,
    329.6,
    392,
    440
  ];

  const labels=[
    'C',
    'D',
    'E',
    'G',
    'A'
  ];

  let seq=[];
  let input=[];
  let round=0;

  const render=()=>{

    $('#gameBody').innerHTML=`
      <div class="game-panel">

        <h3>
          Round <span id="memRound">${round+1}</span>
        </h3>

        <p id="memText">
          Watch and listen.
        </p>

        <div class="memory-buttons">

          ${
            labels
            .map((n,i)=>`
              <button data-mem="${i}">
                ${n}
              </button>
            `)
            .join('')
          }

        </div>

      </div>
    `;

    $$('[data-mem]')
      .forEach(
        b=>
          b.onclick=
            ()=>{

              const i=
                +b.dataset.mem;

              SoundEngine.tone(
                notes[i],
                .2,
                'sine',
                .12
              );

              input.push(i);

              if(
                input[
                  input.length-1
                ]
                !==
                seq[
                  input.length-1
                ]
              ){

                S.wrong();

                reward(
                  8+
                  round*5,

                  round*4,

                  'Melody Memory finished!'
                );

                $('#memText').textContent=
                  `Wrong note! You reached round ${round}.`;

                $$('[data-mem]')
                  .forEach(
                    x=>
                      x.disabled=true
                  );

                return;
              }

              if(
                input.length===
                seq.length
              ){

                round++;

                S.correct();

                setTimeout(
                  nextRound,
                  600
                );
              }

            }
      );
  };

  async function nextRound(){

    seq.push(
      rand(0,4)
    );

    input=[];

    render();

    for(
      const i of seq
    ){

      await wait(280);

      SoundEngine.tone(
        notes[i],
        .22,
        'sine',
        .12
      );

      const b=
        $(`[data-mem="${i}"]`);

      b.classList.add(
        'flash'
      );

      setTimeout(
        ()=>
          b.classList.remove(
            'flash'
          ),
        180
      );

      await wait(180);
    }
  }

  nextRound();
}


/* ============================ MUSIC DASH ============================ */

function startDash(){

  $('#gameBody').innerHTML=`
    <div class="game-panel">

      <div class="game-toolbar">

        <span class="game-stat">
          Score <b id="dashScore">0</b>
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

  const c=
    $('#dashCanvas');

  const x=
    c.getContext('2d');

  let y=195;
  let vy=0;
  let ground=195;
  let score=0;
  let time=25;
  let obs=[];
  let coins=[];

  activeKeyHandler=e=>{

    if(
      (
        e.key==='Shift'
        ||
        e.code==='ShiftLeft'
        ||
        e.code==='ShiftRight'
      )
      &&
      y>=ground
    ){

      vy=-12;

      S.jump();
    }
  };

  document.addEventListener(
    'keydown',
    activeKeyHandler
  );

  every(()=>{

    if(
      Math.random()<.45
    ){

      obs.push({

        x:760,

        w:25,

        h:rand(
          25,
          60
        )

      });
    }

    if(
      Math.random()<.65
    ){

      coins.push({

        x:760,

        y:rand(
          120,
          190
        )

      });
    }

  },700);

  every(()=>{

    vy+=.8;

    y+=vy;

    if(y>ground){

      y=ground;

      vy=0;
    }

    obs.forEach(
      o=>
        o.x-=7
    );

    coins.forEach(
      o=>
        o.x-=7
    );

    obs=
      obs.filter(
        o=>{

          if(
            o.x<95
            &&
            o.x+o.w>60
            &&
            y+35>
            225-o.h
          ){

            $('#dashMsg').textContent=
              'You hit an obstacle! -100 score';

            score=
              Math.max(
                0,
                score-100
              );

            S.wrong();

            return false;
          }

          return o.x>-40;

        }
      );

    coins=
      coins.filter(
        o=>{

          if(
            Math.abs(
              o.x-75
            )<28
            &&
            Math.abs(
              o.y-y
            )<35
          ){

            score+=50;

            S.coin();

            return false;
          }

          return o.x>-20;

        }
      );

    x.clearRect(
      0,
      0,
      760,
      260
    );

    x.fillStyle=
      '#07111d';

    x.fillRect(
      0,
      0,
      760,
      260
    );

    x.fillStyle=
      '#19334d';

    x.fillRect(
      0,
      230,
      760,
      30
    );

    x.fillStyle=
      '#64c8ff';

    x.fillRect(
      55,
      y,
      40,
      40
    );

    x.fillStyle=
      '#ff748a';

    obs.forEach(
      o=>
        x.fillRect(
          o.x,
          230-o.h,
          o.w,
          o.h
        )
    );

    x.fillStyle=
      '#ffe08a';

    x.font=
      '24px sans-serif';

    coins.forEach(
      o=>
        x.fillText(
          '♪',
          o.x,
          o.y
        )
    );

    $('#dashScore').textContent=
      score;

  },33);

  every(()=>{

    time--;

    if(time<=0){

      stopActiveGame();

      reward(
        20+
        Math.round(score/100),

        Math.round(score/25),

        'Music Dash complete!'
      );
    }

  },1000);
}


/* ============================ INSTRUMENT HERO ============================ */

function startInstrumentHero(){

  const inst=
    getInstrument(
      profile.equipped
    );

  $('#gameBody').innerHTML=`
    <div class="game-panel">

      <h3>
        ${inst.icon} ${inst.name} Hero
      </h3>

      <p>
        Hit A S D F in sequence. Faster streaks give more points.
      </p>

      <div class="game-toolbar">

        <span class="game-stat">
          Target <b id="ihTarget">A</b>
        </span>

        <span class="game-stat">
          Score <b id="ihScore">0</b>
        </span>

        <span class="game-stat">
          Time <b id="ihTime">20</b>s
        </span>

      </div>

    </div>
  `;

  const keys=[
    'a',
    's',
    'd',
    'f'
  ];

  let target=
    pick(keys);

  let score=0;
  let time=20;

  $('#ihTarget').textContent=
    target.toUpperCase();

  activeKeyHandler=e=>{

    if(
      !keys.includes(
        e.key.toLowerCase()
      )
    )
      return;

    if(
      e.key.toLowerCase()===
      target
    ){

      score+=100;

      S.perfect();

      playInstrument(
        inst.name,
        440+
        score%300
      );

      target=
        pick(keys);

      $('#ihTarget').textContent=
        target.toUpperCase();

      $('#ihScore').textContent=
        score;
    }

    else{

      score=
        Math.max(
          0,
          score-25
        );

      S.miss();
    }
  };

  document.addEventListener(
    'keydown',
    activeKeyHandler
  );

  every(()=>{

    time--;

    $('#ihTime').textContent=
      time;

    if(time<=0){

      stopActiveGame();

      const xp=
        25+
        Math.round(score/250);

      reward(
        xp,
        Math.round(xp*.7),
        'Instrument Hero complete!'
      );

      addMastery(
        inst.name,
        Math.round(score/400)
      );
    }

  },1000);
}


/* ============================ BEAT BATTLE ============================ */

function startBeatBattle(){

  $('#gameBody').innerHTML=`
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
        <i id="bbBossHp"></i>
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

  let hp=3000;
  let pos=0;
  let dir=1;
  let ended=false;

  every(()=>{

    pos+=dir*2.5;

    if(
      pos>=100
      ||
      pos<=0
    ){

      dir*=-1;
    }

    $('#bbMarker').style.left=
      `calc(${pos}% - 4px)`;

  },20);

  activeKeyHandler=e=>{

    if(
      !(
        e.key==='Shift'
        ||
        e.code==='ShiftLeft'
        ||
        e.code==='ShiftRight'
      )
      ||
      ended
    )
      return;

    const dist=
      Math.abs(
        pos-50
      );

    let dmg;

    if(
      dist<=6
    ){

      dmg=420;

      S.perfect();
    }

    else if(
      dist<=14
    ){

      dmg=260;

      S.great();
    }

    else{

      dmg=90;

      S.miss();
    }

    hp=
      Math.max(
        0,
        hp-dmg
      );

    $('#bbBossHp').style.width=
      `${hp/30}%`;

    $('#bbBossText').textContent=
      `${hp} / 3000`;

    $('#bbText').textContent=
      `${dmg} damage!`;

    playInstrument(
      profile.equipped,
      520
    );

    if(hp<=0){

      ended=true;

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


/* ============================ MUSIC DUNGEON ============================ */

function startDungeon(){

  let room=1;
  let hp=100;

  let boss=
    room%4===0;

  let enemyHp=
    boss
      ?1200
      :420;

  const render=()=>{

    $('#gameBody').innerHTML=`
      <div class="game-panel">

        <h3>
          Room ${room}
          ${
            boss
              ?'👹 BOSS CHAMBER'
              :'🎵 Echo Chamber'
          }
        </h3>

        <p>
          Your HP:
          <b>${hp}</b>

          • Enemy HP:
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

    $('#dAtk').onclick=
      ()=>{

        const inst=
          getUpgradedInstrument(
            profile.equipped
          );

        const dmg=
          Math.round(
            inst.attack*2.8
            +
            rand(
              30,
              80
            )
          );

        enemyHp=
          Math.max(
            0,
            enemyHp-dmg
          );

        playInstrument(
          inst.name,
          440
        );

        S.attack();

        if(
          enemyHp<=0
        ){

          const xp=
            boss
              ?50
              :8;

          const coins=
            boss
              ?35
              :5;

          reward(
            xp,
            coins,
            boss
              ?'Dungeon boss defeated!'
              :'Room cleared!'
          );

          addMastery(
            inst.name,
            boss
              ?15
              :4
          );

          room++;

          boss=
            room%4===0;

          enemyHp=
            boss
              ?1200
              :420;

          hp=
            Math.min(
              100,
              hp+15
            );

          render();

          return;
        }

        const hurt=
          rand(
            8,
            boss
              ?24
              :16
          );

        hp=
          Math.max(
            0,
            hp-hurt
          );

        if(
          hp<=0
        ){

          S.defeat();

          addXP(
            10
          );

          $('#gameBody').innerHTML=`
            <div class="game-panel">

              <h3>
                Dungeon Run Ended
              </h3>

              <p>
                You reached room ${room}. +10 EXP
              </p>

              <button
                id="dAgain"
                class="btn gold"
              >
                Try Again
              </button>

            </div>
          `;

          $('#dAgain').onclick=
            startDungeon;
        }

        else{

          render();
        }

      };

    $('#dHeal').onclick=
      ()=>{

        hp=
          Math.min(
            100,
            hp+
            rand(
              15,
              25
            )
          );

        S.heal();

        render();
      };

    $('#dChest').onclick=
      ()=>{

        if(
          Math.random()<.55
        ){

          profile.coins+=
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

        else{

          hp=
            Math.max(
              1,
              hp-
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
/* ============================ GACHA ============================ */

const gachaData={
  accessory:[
    ['Black Cap','Common'],
    ['Studio Headphones','Uncommon'],
    ['Star Glasses','Rare'],
    ['Cyber Visor','Epic'],
    ['Royal Crown','Legendary'],
    ['MusicVerse Crown','Mythic']
  ],

  pet:[
    ['Music Cat','Common'],
    ['Beat Puppy','Common'],
    ['Neon Fox','Rare'],
    ['Music Ghost','Epic'],
    ['Phoenix','Legendary'],
    ['Celestial Dragon','Mythic']
  ],

  aura:[
    ['Musical Notes','Common'],
    ['Rhythm Pulse','Uncommon'],
    ['Flame Aura','Rare'],
    ['Lightning Aura','Epic'],
    ['Celestial Aura','Legendary'],
    ['Galaxy Aura','Mythic']
  ],

  skin:[
    ['Sakura Skin','Rare'],
    ['Thunder Skin','Epic'],
    ['Phoenix Skin','Legendary'],
    ['Cosmic Void Skin','Mythic']
  ]
};

let activeGacha='accessory';

const costs={
  accessory:100,
  pet:200,
  aura:175,
  skin:150
};

function rarityRoll(){

  const r=
    Math.random()*100;

  return r<.5
    ?'Mythic'
    :r<3
      ?'Legendary'
      :r<11
        ?'Epic'
        :r<27
          ?'Rare'
          :r<55
            ?'Uncommon'
            :'Common';
}

function updateGachaUI(){

  const titles={
    accessory:'Accessory Capsule',
    pet:'Pet Capsule',
    aura:'Aura Capsule',
    skin:'Skin Capsule'
  };

  $('#gachaTitle').textContent=
    titles[activeGacha];

  $('#rollOneBtn').textContent=
    `Roll x1 • ${costs[activeGacha]} Coins`;

  $('#rollTenBtn').textContent=
    `Roll x10 • ${costs[activeGacha]*9} Coins`;
}

function rollGacha(
  count=1
){

  const cost=
    costs[activeGacha]*
    (
      count===10
        ?9
        :1
    );

  if(
    profile.coins<
    cost
  ){

    return toast(
      'Not enough coins.'
    );
  }

  profile.coins-=
    cost;

  const results=[];

  for(
    let i=0;
    i<count;
    i++
  ){

    const desired=
      rarityRoll();

    const pool=
      gachaData[
        activeGacha
      ];

    const valid=
      pool.filter(
        x=>
          x[1]===desired
      );

    const item=
      pick(
        valid.length
          ?valid
          :pool
      );

    const key=
      `${activeGacha}:${item[0]}`;

    if(
      profile.inventory.some(
        x=>
          x.key===key
      )
    ){

      profile.dust+=
        item[1]==='Mythic'
          ?80
          :item[1]==='Legendary'
            ?40
            :10;

      results.push(
        `${item[0]} → Dust`
      );

    }

    else{

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

  $('#gachaReveal').textContent=
    results.join(' • ');

  S.gacha();
}

function renderInventory(){

  $('#inventoryGrid').innerHTML=
    profile.inventory.length

      ?profile.inventory
        .map(
          x=>
            `
            <div class="inventory-item">

              <b>
                ${x.rarity}
              </b>

              ${x.name}

              <small>
                ${x.type}
              </small>

            </div>
            `
        )
        .join('')

      :'<p class="muted">No cosmetics yet.</p>';
}

$$('.gacha-tab')
.forEach(
  b=>
    b.onclick=
      ()=>{

        $$('.gacha-tab')
        .forEach(
          x=>
            x.classList.remove(
              'active'
            )
        );

        b.classList.add(
          'active'
        );

        activeGacha=
          b.dataset.gacha;

        updateGachaUI();

      }
);

$('#rollOneBtn').onclick=
  ()=>
    rollGacha(
      1
    );

$('#rollTenBtn').onclick=
  ()=>
    rollGacha(
      10
    );


/* ============================ MUSICCRAFT ============================ */

const craftCanvas=
  $('#craftCanvas');

const ctx=
  craftCanvas.getContext(
    '2d'
  );

let craftWorld=[];

let craftMined=0;

let craftDepth=0;

let craftLayer=0;


const craftTypesByDepth=[

  {
    name:'Surface',

    blocks:[
      ['Dirt','#70513c',1,1],
      ['Stone','#6d7885',1,2],
      ['Coal','#28313a',2,2]
    ]
  },

  {
    name:'Shallow Underground',

    blocks:[
      ['Dirt','#5f4435',1,1],
      ['Stone','#68727d',1,2],
      ['Coal','#28313a',2,2],
      ['Copper','#b87333',3,2]
    ]
  },

  {
    name:'Stone Tunnels',

    blocks:[
      ['Stone','#626d79',1,2],
      ['Coal','#252d34',2,2],
      ['Copper','#b87333',3,2],
      ['Iron','#9b8c7a',3,3]
    ]
  },

  {
    name:'Coal Depths',

    blocks:[
      ['Stone','#5c6570',1,2],
      ['Coal','#1f252b',3,2],
      ['Iron','#9b8c7a',3,3],
      ['Silver','#b7bec8',4,3]
    ]
  },

  {
    name:'Iron Caverns',

    blocks:[
      ['Stone','#59636e',1,2],
      ['Iron','#9b8c7a',4,3],
      ['Silver','#b7bec8',5,3],
      ['Gold','#d8ad42',6,4]
    ]
  },

  {
    name:'Deep Caves',

    blocks:[
      ['Stone','#525b66',1,2],
      ['Iron','#8f8274',4,3],
      ['Gold','#d8ad42',6,4],
      ['Ruby','#d94a62',8,4]
    ]
  },

  {
    name:'Gold Veins',

    blocks:[
      ['Stone','#4d5661',1,2],
      ['Gold','#d8ad42',7,4],
      ['Ruby','#d94a62',9,4],
      ['Emerald','#4fca83',10,4]
    ]
  },

  {
    name:'Crystal Caverns',

    blocks:[
      ['Stone','#48525e',1,2],
      ['Gold','#d8ad42',7,4],
      ['Crystal','#8e73ff',12,5],
      ['Amethyst','#a66cff',14,5]
    ]
  },

  {
    name:'Diamond Depths',

    blocks:[
      ['Dark Stone','#3b4652',2,3],
      ['Crystal','#8e73ff',12,5],
      ['Diamond','#55d7e8',16,6],
      ['Sapphire','#4a78ef',15,5]
    ]
  },

  {
    name:'Obsidian Ruins',

    blocks:[
      ['Obsidian','#27243a',4,5],
      ['Diamond','#55d7e8',16,6],
      ['Sapphire','#4a78ef',15,5],
      ['Ancient Ore','#9f865a',20,6]
    ]
  },

  {
    name:'Ancient Depths',

    blocks:[
      ['Obsidian','#211d31',4,5],
      ['Ancient Ore','#9f865a',20,6],
      ['Ancient Crystal','#d6b3ff',24,7],
      ['Relic Stone','#786246',18,6]
    ]
  },

  {
    name:'Magma Zone',

    blocks:[
      ['Basalt','#2c292e',4,5],
      ['Obsidian','#1c1925',5,6],
      ['Magma Crystal','#ff6a3d',28,7],
      ['Fire Gem','#ffb347',32,7]
    ]
  },

  {
    name:'Echo Abyss',

    blocks:[
      ['Void Stone','#171624',5,6],
      ['Echo Crystal','#5ed4ff',32,7],
      ['Void Gem','#8857ff',38,8],
      ['Resonance Ore','#d04fff',42,8]
    ]
  },

  {
    name:'Celestial Core',

    blocks:[
      ['Celestial Stone','#27395d',6,7],
      ['Star Crystal','#ffe178',45,8],
      ['Moonstone','#b9d7ff',48,8],
      ['Celestial Gem','#e5d3ff',55,9]
    ]
  },

  {
    name:'MusicVerse Core',

    blocks:[
      ['Core Stone','#13101d',7,8],
      ['Music Crystal','#f3d77c',65,9],
      ['Harmony Gem','#71e7d3',75,9],
      ['CoreShard','#fff1a8',100,10]
    ]
  }

];


const craftPetEggs=[

  [
    'Surface',
    'Meadow Egg',
    '🌱',
    'Music Bunny',
    '#8bd46e',
    .035
  ],

  [
    'Shallow Underground',
    'Cave Egg',
    '🪨',
    'Mole Beat',
    '#92745c',
    .032
  ],

  [
    'Stone Tunnels',
    'Stone Egg',
    '🐾',
    'Rock Pup',
    '#858f9a',
    .03
  ],

  [
    'Coal Depths',
    'Coal Egg',
    '⚫',
    'Shadow Bat',
    '#353942',
    .028
  ],

  [
    'Iron Caverns',
    'Iron Egg',
    '⚙️',
    'Gear Fox',
    '#a9a097',
    .026
  ],

  [
    'Deep Caves',
    'Echo Egg',
    '🕷️',
    'Echo Spider',
    '#645a75',
    .024
  ],

  [
    'Gold Veins',
    'Golden Egg',
    '🪙',
    'Gold Chick',
    '#f2c74e',
    .022
  ],

  [
    'Crystal Caverns',
    'Crystal Egg',
    '💎',
    'Crystal Fox',
    '#9a78ff',
    .02
  ],

  [
    'Diamond Depths',
    'Diamond Egg',
    '🔷',
    'Diamond Dragon',
    '#60e7f7',
    .018
  ],

  [
    'Obsidian Ruins',
    'Obsidian Egg',
    '🖤',
    'Obsidian Wolf',
    '#302b45',
    .016
  ],

  [
    'Ancient Depths',
    'Ancient Egg',
    '🏺',
    'Relic Guardian',
    '#b79a68',
    .014
  ],

  [
    'Magma Zone',
    'Magma Egg',
    '🔥',
    'Lava Dragon',
    '#ff6535',
    .012
  ],

  [
    'Echo Abyss',
    'Void Egg',
    '🌌',
    'Echo Spirit',
    '#7454e8',
    .01
  ],

  [
    'Celestial Core',
    'Celestial Egg',
    '✨',
    'Star Phoenix',
    '#f6e69a',
    .008
  ],

  [
    'MusicVerse Core',
    'MusicVerse Egg',
    '🎵',
    'Harmony Dragon',
    '#ffe783',
    .005
  ]

].map(
  x=>({

    layer:
      x[0],

    egg:
      x[1],

    icon:
      x[2],

    pet:
      x[3],

    color:
      x[4],

    chance:
      x[5]

  })
);


function getCraftDepthName(){

  return craftTypesByDepth[
    Math.min(
      craftDepth,
      craftTypesByDepth.length-1
    )
  ].name;
}


function getCurrentCraftEgg(){

  return craftPetEggs[
    Math.min(
      craftDepth,
      craftPetEggs.length-1
    )
  ];
}


function resetCraftInventory(){

  craftTypesByDepth
  .flatMap(
    z=>
      z.blocks.map(
        b=>b[0]
      )
  )
  .forEach(
    n=>{

      if(
        profile.materials[n]===
        undefined
      ){

        profile.materials[n]=0;
      }

    }
  );
}


function generateCraftLayer(){

  const d=
    craftTypesByDepth[
      craftDepth
    ];

  const egg=
    getCurrentCraftEgg();

  craftWorld=
    Array.from(
      {
        length:12
      },

      (
        _,
        y
      )=>

        Array.from(
          {
            length:20
          },

          (
            _,
            x
          )=>{

            if(
              y===0
              &&
              x>=8
              &&
              x<=11
            ){

              return null;
            }

            if(
              Math.random()<
              egg.chance
            ){

              return[
                'PET_EGG',
                egg.color,
                0,
                1,
                egg
              ];
            }

            const r=
              Math.random();

            return r<.5

              ?d.blocks[0]

              :r<.75

                ?d.blocks[
                  Math.min(
                    1,
                    d.blocks.length-1
                  )
                ]

                :r<.9

                  ?d.blocks[
                    Math.min(
                      2,
                      d.blocks.length-1
                    )
                  ]

                  :d.blocks[
                    d.blocks.length-1
                  ];

          }
        )
    );

  renderCraft();
}


function newCraftWorld(){

  craftMined=0;

  craftDepth=0;

  craftLayer=0;

  resetCraftInventory();

  generateCraftLayer();

  renderCraftEggs();
}


function drawEgg(
  x,
  y,
  w,
  h,
  egg
){

  const cx=
    x*w+
    w/2;

  const cy=
    y*h+
    h/2;

  ctx.save();

  ctx.shadowBlur=
    18;

  ctx.shadowColor=
    egg.color;

  ctx.fillStyle=
    egg.color;

  ctx.beginPath();

  ctx.ellipse(
    cx,
    cy,
    w*.27,
    h*.36,
    0,
    0,
    Math.PI*2
  );

  ctx.fill();

  ctx.shadowBlur=
    0;

  ctx.font=
    `${Math.max(
      14,
      w*.36
    )}px sans-serif`;

  ctx.textAlign=
    'center';

  ctx.textBaseline=
    'middle';

  ctx.fillText(
    egg.icon,
    cx,
    cy
  );

  ctx.restore();
}


function renderCraft(){

  const w=
    craftCanvas.width/20;

  const h=
    craftCanvas.height/12;

  ctx.clearRect(
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
    )=>

      row.forEach(
        (
          b,
          x
        )=>{

          if(
            !b
          )
            return;

          if(
            b[0]==='PET_EGG'
          ){

            drawEgg(
              x,
              y,
              w,
              h,
              b[4]
            );

            return;
          }

          ctx.fillStyle=
            b[1];

          ctx.fillRect(
            x*w+1,
            y*h+1,
            w-2,
            h-2
          );

          ctx.fillStyle=
            'rgba(255,255,255,.12)';

          ctx.fillRect(
            x*w+3,
            y*h+3,
            w-7,
            4
          );

        }
      )
  );

  const current=
    craftTypesByDepth[
      craftDepth
    ].blocks
    .map(
      b=>b[0]
    );

  $('#craftInventory').innerHTML=
    current
    .map(
      k=>
        `
        <div>

          <span>
            ${k}
          </span>

          <b>
            ${profile.materials[k]||0}
          </b>

        </div>
        `
    )
    .join('');

  $('#missionText').textContent=
    `Mine 12 blocks • ${craftMined%12}/12`;

  $('#craftDepthName').textContent=
    getCraftDepthName();

  $('#craftLayerLabel').textContent=
    `${craftDepth+1} / ${craftTypesByDepth.length}`;

  $('#craftDepthFill').style.width=
    `${((craftDepth+1)/craftTypesByDepth.length)*100}%`;

  renderCraftEggs();

  renderEvolutionPanel();
}


function collectCraftPetEgg(
  egg
){

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
    4+
    Math.floor(
      craftDepth/3
    )
  );

  renderCraftEggs();
}


function renderCraftEggs(){

  const el=
    $('#craftEggInventory');

  if(
    !el
  )
    return;

  const eggs=
    profile.petEggs.filter(
      e=>
        !e.hatched
    );

  el.innerHTML=
    eggs.length

      ?eggs
        .slice(
          -8
        )
        .map(
          e=>
            `
            <div class="craft-egg-card">

              <div class="craft-egg-icon">
                ${e.icon}
              </div>

              <div>

                <strong>
                  ${e.egg}
                </strong>

                <small>
                  ${e.layer}
                </small>

              </div>

              <button
                class="btn gold small"
                data-hatch-egg="${e.id}"
              >
                Hatch
              </button>

            </div>
            `
        )
        .join('')

      :'<p class="muted">No eggs discovered yet.</p>';

  $$(
    '[data-hatch-egg]'
  )
  .forEach(
    b=>
      b.onclick=
        ()=>
          hatchCraftEgg(
            b.dataset.hatchEgg
          )
  );
}


function checkCraftDescent(){

  let n=0;

  for(
    let y=9;
    y<12;
    y++
  ){

    for(
      let x=0;
      x<20;
      x++
    ){

      if(
        craftWorld[
          y
        ][
          x
        ]===
        null
      ){

        n++;
      }
    }
  }

  if(
    n>=12
    &&
    craftDepth<
    craftTypesByDepth.length-1
  ){

    craftDepth++;

    craftLayer++;

    reward(

      8+
      craftDepth*
      2,

      5+
      craftDepth*
      2,

      `⛏️ Descended to ${getCraftDepthName()}!`

    );

    generateCraftLayer();

    return true;
  }

  return false;
}


craftCanvas.onclick=
  e=>{

    const r=
      craftCanvas.getBoundingClientRect();

    const x=
      Math.floor(
        (
          e.clientX-
          r.left
        )
        /
        r.width
        *
        20
      );

    const y=
      Math.floor(
        (
          e.clientY-
          r.top
        )
        /
        r.height
        *
        12
      );

    const b=
      craftWorld[
        y
      ]?.[
        x
      ];

    if(
      !b
    )
      return;

    craftWorld[
      y
    ][
      x
    ]=
      null;

    if(
      b[0]==='PET_EGG'
    ){

      collectCraftPetEgg(
        b[4]
      );

      renderCraft();

      return;
    }

    profile.materials[
      b[0]
    ]=
      (
        profile.materials[
          b[0]
        ]||
        0
      )
      +
      1;

    craftMined++;

    progressQuest(
      'mine',
      1
    );

    const coin=
      Math.max(
        0,
        Math.floor(
          b[2]*
          .15
        )
      );

    const xp=
      b[2]>=12
        ?Math.max(
          1,
          Math.floor(
            b[2]*
            .08
          )
        )
        :0;

    if(
      coin
    ){

      profile.coins+=
        coin;
    }

    if(
      xp
    ){

      addXP(
        xp
      );
    }

    if(
      b[0]==='CoreShard'
    ){

      profile.coins+=25;

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

    const descended=
      y>=10
      &&
      checkCraftDescent();

    if(
      !descended
    ){

      renderCraft();
    }
  };


$('#missionBtn').onclick=
  ()=>{

    if(
      craftMined<12
    ){

      return toast(
        'Mine 12 blocks first.'
      );
    }

    reward(
      8,
      5,
      'Mining mission complete!'
    );

    craftMined=
      0;

    renderCraft();
  };


$('#newWorldBtn').onclick=
  ()=>
    newCraftWorld();


/* ============================ LEADERBOARD ============================ */

function renderLeaderboard(){

  const bots=
    Array.from(
      {
        length:99
      },

      (
        _,
        i
      )=>({

        name:
          `${pick(botNames)}${i+1}`,

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
      profile.name||
      'You',

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
    )=>
      b.xp-
      a.xp
  );

  const rank=
    bots.findIndex(
      x=>x.you
    )
    +
    1;

  $('#yourRank').textContent=
    '#'+rank;

  $('#podium').innerHTML=
    bots
    .slice(
      0,
      3
    )
    .map(
      (
        x,
        i
      )=>
        `
        <div>

          <span>
            ${[
              '🥇',
              '🥈',
              '🥉'
            ][i]}
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

  $('#leaderboardBody').innerHTML=
    bots
    .map(
      (
        x,
        i
      )=>
        `
        <tr
          ${
            x.you
              ?'style="background:#12263c"'
              :''
          }
        >

          <td>
            #${i+1}
          </td>

          <td>

            ${
              x.you
                ?'⭐ '
                :''
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


/* ============================ QUIZ ============================ */

const quizQs=[

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

let quizIndex=0;

let quizScore=0;


function renderQuiz(){

  const q=
    quizQs[
      quizIndex
    ];

  $('#quizScore').textContent=
    quizScore;

  $('#quizCard').innerHTML=
    `
    <span class="eyebrow">
      QUESTION ${quizIndex+1}/${quizQs.length}
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
          )=>
            `
            <button data-quiz="${i}">
              ${a}
            </button>
            `
        )
        .join('')
      }

    </div>
    `;

  $$(
    '[data-quiz]'
  )
  .forEach(
    b=>
      b.onclick=
        ()=>{

          const i=
            +b.dataset.quiz;

          const ok=
            i===
            q[2];

          $$(
            '[data-quiz]'
          )
          .forEach(
            x=>
              x.disabled=
                true
          );

          b.classList.add(
            ok
              ?'correct'
              :'wrong'
          );

          if(
            ok
          ){

            quizScore++;

            addXP(
              2
            );

            profile.coins+=1;

            persist();

            updateProfileUI();

            S.correct();

          }

          else{

            S.wrong();
          }

          setTimeout(
            ()=>{

              quizIndex++;

              if(
                quizIndex>=
                quizQs.length
              ){

                $('#quizCard').innerHTML=
                  `
                  <h3>
                    Quiz complete: ${quizScore}/${quizQs.length}
                  </h3>

                  <button
                    id="quizRestart"
                    class="btn gold"
                  >
                    Play Again
                  </button>
                  `;

                $('#quizRestart').onclick=
                  ()=>{

                    quizIndex=0;

                    quizScore=0;

                    renderQuiz();

                  };

              }

              else{

                renderQuiz();
              }

            },
            650
          );

        }
  );
}


/* ============================ START ============================ */

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

renderSkillTree();

setupRpg();

$('#claimDailyBtn').onclick=
  claimDailyReward;
