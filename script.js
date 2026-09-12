:root{
  --bg:#06111f;
  --bg2:#09192a;
  --panel:#0d1e32;
  --panel2:#122a44;
  --gold:#e6c87a;
  --gold2:#ffe8a6;
  --text:#f8f5ec;
  --muted:#9fb0c4;
  --line:#1f3a58;
  --blue:#61bdff;
  --red:#ff7288;
  --green:#61df9a;
  --shadow:0 25px 70px rgba(0,0,0,.34);
  --radius:22px;
}

*{
  box-sizing:border-box;
}

html{
  scroll-behavior:smooth;
}

body{
  margin:0;
  background:
    radial-gradient(
      circle at 50% 0,
      #102944 0,
      #06111f 40%,
      #040b13 100%
    );
  color:var(--text);
  font-family:Montserrat,sans-serif;
}

button,
input,
select{
  font:inherit;
}

button{
  cursor:pointer;
}

a{
  color:inherit;
  text-decoration:none;
}

.hidden{
  display:none!important;
}

.muted{
  color:var(--muted);
}


/* =========================================================
   HEADER
========================================================= */

.topbar{
  position:sticky;
  top:0;
  z-index:50;

  display:flex;
  align-items:center;
  gap:20px;

  padding:14px 3vw;

  background:rgba(4,12,21,.9);

  backdrop-filter:blur(14px);

  border-bottom:
    1px solid rgba(255,255,255,.06);
}

.brand{
  font-weight:900;
  letter-spacing:.1em;
}

.brand span{
  color:var(--gold);
}

.topbar nav{
  display:flex;
  gap:15px;
  flex:1;
  justify-content:center;
  flex-wrap:wrap;
}

.topbar nav a{
  font-size:11px;
  color:#c7d3df;
}

.topbar nav a:hover{
  color:var(--gold2);
}

.top-actions{
  display:flex;
  align-items:center;
  gap:10px;
  font-size:11px;
}

.icon-btn{
  border:1px solid var(--line);
  background:#0a1b2d;
  color:white;

  border-radius:10px;

  padding:7px 9px;
}


/* =========================================================
   COMMON
========================================================= */

.section{
  width:min(1220px,93vw);
  margin:0 auto;

  padding:72px 0;
}

.panel{
  background:
    linear-gradient(
      180deg,
      rgba(15,35,57,.96),
      rgba(7,21,35,.98)
    );

  border:
    1px solid rgba(255,255,255,.07);

  border-radius:var(--radius);

  box-shadow:var(--shadow);
}

.section-head{
  display:flex;
  justify-content:space-between;
  align-items:end;
  gap:20px;

  margin-bottom:22px;
}

.section h2,
.section h1{
  font-family:
    "Cormorant Garamond",
    serif;

  margin:0;
}

.section h2{
  font-size:42px;
}

.eyebrow{
  font-size:10px;
  letter-spacing:.18em;
  font-weight:800;
  color:var(--gold);
  text-transform:uppercase;
}

.btn{
  border:1px solid var(--line);

  background:#10253d;

  color:white;

  padding:11px 16px;

  border-radius:12px;

  font-weight:800;
  font-size:11px;

  letter-spacing:.03em;
}

.btn:hover{
  transform:translateY(-1px);
}

.btn.gold{
  background:
    linear-gradient(
      135deg,
      #b89444,
      #f0d482
    );

  color:#151007;

  border:none;
}

.btn.ghost{
  background:#0a1b2c;
}

.btn.small{
  padding:8px 12px;
}

.btn.wide{
  width:100%;
  margin-top:14px;
}

.search,
select,
input{
  background:#081728;
  color:white;

  border:1px solid var(--line);

  border-radius:11px;

  padding:11px 12px;

  outline:none;
}

.search{
  min-width:250px;
}


/* =========================================================
   HERO
========================================================= */

.hero{
  min-height:72vh;

  display:grid;

  grid-template-columns:
    1.2fr .8fr;

  align-items:center;

  gap:42px;
}

.hero-copy h1{
  font-size:68px;
  line-height:.95;

  margin:10px 0 18px;
}

.hero-copy h1 em{
  display:block;

  color:var(--gold2);

  font-style:normal;
}

.hero-copy p{
  color:#b3c3d3;

  max-width:650px;

  line-height:1.7;
}

.hero-buttons{
  display:flex;
  gap:12px;

  margin-top:22px;
}

.profile-card{
  padding:24px;

  display:grid;

  grid-template-columns:
    auto 1fr;

  gap:18px;

  align-items:center;
}

.mini-avatar{
  width:90px;
  height:100px;

  position:relative;
}

.mini-head{
  position:absolute;

  width:45px;
  height:40px;

  left:22px;
  top:20px;

  background:#dca57b;

  border-radius:9px;
}

.mini-hair{
  position:absolute;

  width:49px;
  height:18px;

  left:20px;
  top:14px;

  background:#1f1714;

  border-radius:
    10px 10px 3px 3px;

  z-index:2;
}

.mini-body{
  position:absolute;

  width:58px;
  height:48px;

  left:16px;
  top:58px;

  background:#19345b;

  border-radius:10px;
}

.profile-card h2{
  font-size:34px;
}

.xp-wrap{
  grid-column:1/-1;
}

.xp-wrap>div:first-child{
  display:flex;
  justify-content:space-between;

  font-size:11px;

  margin-bottom:6px;
}

.xpbar,
.hpbar,
.team-hp-bar{
  height:12px;

  background:#121e2d;

  border-radius:999px;

  overflow:hidden;

  border:1px solid #263b51;
}

.xpbar i,
.hpbar i,
.team-hp-bar i{
  display:block;

  height:100%;
  width:100%;

  background:
    linear-gradient(
      90deg,
      #2f91ff,
      #77d7ff
    );

  transition:width .35s;
}

.profile-stats{
  grid-column:1/-1;

  display:grid;

  grid-template-columns:
    repeat(3,1fr);

  gap:8px;
}

.profile-stats div{
  padding:12px;

  background:#081726;

  border-radius:12px;

  text-align:center;
}

.profile-stats b{
  display:block;

  color:var(--gold2);

  font-size:18px;
}

.profile-stats span{
  font-size:9px;

  color:var(--muted);
}


/* =========================================================
   TABS
========================================================= */

.tabs{
  display:flex;
  gap:8px;
  flex-wrap:wrap;

  margin-bottom:18px;
}

.tabs button,
.team-size-buttons button{
  border:1px solid var(--line);

  background:#0b1b2b;

  color:#b8c7d7;

  padding:8px 12px;

  border-radius:999px;

  font-size:10px;
  font-weight:800;
}

.tabs button.active,
.team-size-buttons button.active{
  background:var(--gold);

  color:#17120a;

  border-color:transparent;
}


/* =========================================================
   INSTRUMENTS
========================================================= */

.instrument-grid{
  display:grid;

  grid-template-columns:
    repeat(4,1fr);

  gap:14px;
}

.instrument-card{
  padding:17px;

  background:
    linear-gradient(
      180deg,
      #0e2238,
      #091827
    );

  border:1px solid var(--line);

  border-radius:17px;

  position:relative;
}

.instrument-card.equipped{
  border-color:var(--gold);

  box-shadow:
    0 0 24px rgba(230,200,122,.12);
}

.instrument-icon{
  font-size:30px;
}

.instrument-card h3{
  margin:8px 0 2px;
}

.instrument-card p{
  margin:0 0 12px;

  color:var(--muted);

  font-size:10px;
}

.stat-line{
  display:flex;

  gap:6px;

  margin:7px 0;
}

.stat-line span{
  flex:1;

  background:#071421;

  padding:5px 6px;

  border-radius:8px;

  font-size:8px;

  text-align:center;
}

.instrument-actions{
  display:flex;

  gap:7px;

  margin-top:12px;
}

.instrument-actions button{
  flex:1;
}


/* =========================================================
   SOLO BATTLE
========================================================= */

.battle-board{
  display:grid;

  grid-template-columns:
    250px 1fr 250px;

  gap:18px;

  padding:22px;
}

.fighter{
  text-align:center;

  padding:15px;

  background:#081625;

  border-radius:16px;
}

.cool-avatar{
  width:130px;
  height:150px;

  margin:0 auto 8px;

  position:relative;

  filter:
    drop-shadow(
      0 14px 18px
      rgba(0,0,0,.35)
    );

  background:
    radial-gradient(
      circle at 50% 80%,
      rgba(99,199,255,.32),
      transparent 45%
    );
}

.cool-avatar:before{
  content:"";

  position:absolute;

  width:65px;
  height:65px;

  left:32px;
  top:16px;

  background:#d7a078;

  border-radius:14px;

  box-shadow:
    inset 0 12px 0 #241a16;
}

.cool-avatar:after{
  content:"♫";

  position:absolute;

  width:86px;
  height:80px;

  left:22px;
  top:79px;

  border-radius:
    18px 18px 12px 12px;

  background:
    linear-gradient(
      135deg,
      #1b4f80,
      #0d2948
    );

  display:grid;

  place-items:center;

  color:#ffe29a;

  font-size:28px;

  font-weight:900;

  border:
    2px solid
    rgba(255,255,255,.1);
}

.red-avatar{
  background:
    radial-gradient(
      circle at 50% 80%,
      rgba(255,80,110,.28),
      transparent 45%
    );
}

.red-avatar:after{
  background:
    linear-gradient(
      135deg,
      #7a2638,
      #3d1421
    );
}

.fighter h3{
  margin:6px 0 3px;
}

.fighter small{
  color:var(--muted);
}

.fighter .hpbar{
  margin:12px 0 5px;
}

.hpbar.red i{
  background:
    linear-gradient(
      90deg,
      #c93c57,
      #ff8093
    );
}

.battle-center{
  text-align:center;

  display:flex;

  flex-direction:column;

  justify-content:center;
}

.versus{
  font-family:
    "Cormorant Garamond",
    serif;

  font-size:54px;

  color:var(--gold2);
}

#battleStatus{
  min-height:42px;

  color:#c7d5e3;
}

.move-grid{
  display:grid;

  grid-template-columns:
    repeat(2,1fr);

  gap:9px;

  margin-top:14px;
}

.move-btn{
  padding:12px;

  text-align:left;

  border:1px solid var(--line);

  background:#0a1a2a;

  color:white;

  border-radius:12px;
}

.move-btn strong,
.move-btn span,
.move-btn small{
  display:block;
}

.move-btn span{
  color:var(--gold);

  font-size:9px;

  margin:3px 0;
}

.move-btn small{
  color:var(--muted);

  font-size:9px;
}

.move-btn.ultimate{
  border-color:#ab7bff;

  background:
    linear-gradient(
      135deg,
      #241547,
      #0f2038
    );
}

.move-btn:disabled{
  opacity:.4;

  cursor:not-allowed;
}

.energy-pips{
  display:flex;

  justify-content:center;

  gap:5px;

  margin:10px;
}

.energy-pips i{
  width:16px;
  height:6px;

  border-radius:999px;

  background:#203247;
}

.energy-pips i.on{
  background:#bd8fff;

  box-shadow:
    0 0 10px #9f65ff;
}

.battle-footer{
  display:grid;

  grid-template-columns:
    auto 1fr;

  gap:14px;

  margin-top:12px;
}

.battle-log{
  padding:10px;

  color:var(--muted);

  font-size:10px;

  min-height:38px;
}


/* =========================================================
   TEAM BATTLE
========================================================= */

.team-lobby{
  padding:18px;
}

.team-hp-section{
  display:grid;

  grid-template-columns:
    1fr 1fr;

  gap:16px;

  padding:8px 0 16px;
}

.team-hp-label{
  display:flex;

  justify-content:space-between;

  font-size:10px;

  font-weight:900;

  margin-bottom:6px;
}

.team-hp-label.blue{
  color:#74c7ff;
}

.team-hp-label.red{
  color:#ff8397;
}

.team-hp-bar{
  height:18px;
}

.team-hp-bar i.blue{
  background:
    linear-gradient(
      90deg,
      #2679ff,
      #75d6ff
    );
}

.team-hp-bar i.red{
  background:
    linear-gradient(
      90deg,
      #c92e4d,
      #ff7188
    );
}

.concert-shell{
  height:520px;

  position:relative;

  overflow:hidden;

  border-radius:18px;

  border:
    1px solid rgba(230,200,122,.3);

  background:
    linear-gradient(
      #150913 0 12%,
      #301320 12% 33%,
      #140a0d 33% 100%
    );
}

.concert-title{
  position:absolute;

  top:12px;
  left:50%;

  transform:translateX(-50%);

  z-index:8;

  text-align:center;

  text-shadow:
    0 2px 8px #000;
}

.concert-title b{
  display:block;

  font-family:
    "Cormorant Garamond",
    serif;

  color:var(--gold2);

  font-size:22px;

  white-space:nowrap;
}

.concert-title span{
  font-size:10px;

  color:white;
}

.concert-lights{
  position:absolute;

  top:45px;
  left:0;
  right:0;

  display:flex;

  justify-content:space-around;

  z-index:5;
}

.concert-lights i{
  width:16px;
  height:16px;

  background:#ffd77c;

  border-radius:50%;

  box-shadow:
    0 0 35px 15px
    rgba(255,211,124,.18);
}

.stage-curtain{
  position:absolute;

  top:0;
  bottom:70px;

  width:95px;

  background:
    repeating-linear-gradient(
      90deg,
      #5a1124 0 15px,
      #7e1932 15px 30px
    );

  z-index:4;
}

.stage-curtain.left{
  left:0;
}

.stage-curtain.right{
  right:0;
}

.concert-stage{
  position:absolute;

  left:7%;
  right:7%;
  bottom:105px;

  height:315px;

  display:grid;

  grid-template-columns:
    1fr 70px 1fr;

  align-items:end;

  padding:
    34px 30px 14px;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.02),
      rgba(84,47,26,.1)
    ),
    repeating-linear-gradient(
      90deg,
      #5b351f 0 22px,
      #674126 22px 44px
    );

  border:
    2px solid #8d6433;

  box-shadow:
    0 10px 0 #2e1b12;
}

.concert-team-side{
  display:grid;

  grid-template-columns:
    repeat(5,1fr);

  gap:8px;

  align-items:end;
}

.stage-center-mark{
  align-self:center;

  text-align:center;

  font-size:44px;

  color:
    rgba(255,226,153,.7);
}

.concert-player{
  position:relative;

  height:118px;

  display:flex;

  align-items:flex-end;

  justify-content:center;

  transition:
    transform .25s,
    filter .25s;
}

.concert-player .body{
  width:36px;
  height:54px;

  border-radius:
    10px 10px 8px 8px;

  position:relative;

  border:
    2px solid
    rgba(255,255,255,.12);

  box-shadow:
    0 0 18px
    rgba(0,0,0,.35);
}

.concert-player.blue .body{
  background:
    linear-gradient(
      #2c78bb,
      #103c68
    );
}

.concert-player.red .body{
  background:
    linear-gradient(
      #b63a56,
      #671d31
    );
}

.concert-player .body:before{
  content:"";

  position:absolute;

  width:30px;
  height:30px;

  border-radius:8px;

  background:#d6a079;

  left:1px;
  top:-31px;

  box-shadow:
    inset 0 8px 0 #211a16;
}

.concert-player .body:after{
  content:
    attr(data-icon);

  position:absolute;

  font-size:19px;

  left:6px;
  top:16px;
}

.concert-player .name{
  position:absolute;

  bottom:-20px;

  font-size:7px;

  width:70px;

  text-align:center;

  overflow:hidden;

  text-overflow:ellipsis;

  white-space:nowrap;
}

.concert-player.active{
  transform:
    translateY(-12px)
    scale(1.08);

  filter:
    drop-shadow(
      0 0 16px #ffe197
    );
}

.audience{
  position:absolute;

  left:0;
  right:0;
  bottom:0;

  height:90px;

  background:
    radial-gradient(
      circle at 10% 70%,
      #3b1d2c 0 12px,
      transparent 13px
    ),
    radial-gradient(
      circle at 25% 60%,
      #281926 0 13px,
      transparent 14px
    ),
    radial-gradient(
      circle at 40% 75%,
      #3a2130 0 11px,
      transparent 12px
    ),
    radial-gradient(
      circle at 60% 65%,
      #251a24 0 12px,
      transparent 13px
    ),
    radial-gradient(
      circle at 77% 72%,
      #3c2030 0 11px,
      transparent 12px
    ),
    radial-gradient(
      circle at 90% 60%,
      #281a26 0 13px,
      transparent 14px
    ),
    linear-gradient(
      #140b10,
      #090608
    );
}

.multiplayer-battle-message{
  min-height:92px;

  margin:14px 0;

  padding:14px;

  text-align:center;

  background:#081624;

  border:1px solid var(--line);

  border-radius:14px;

  display:flex;

  flex-direction:column;

  justify-content:center;

  gap:6px;
}

.multiplayer-battle-message strong{
  color:var(--gold2);
}

.multiplayer-battle-message span{
  font-size:10px;

  color:#becddd;
}

.team-move-panel{
  padding:16px;

  margin-top:12px;

  background:#081726;

  border:1px solid var(--line);

  border-radius:14px;
}

.team-turn-header{
  display:flex;

  justify-content:space-between;
}

.team-turn-header h3{
  margin:3px 0;
}

.team-energy-box{
  font-size:10px;

  color:var(--muted);
}


/* =========================================================
   GAME HUB
========================================================= */

.game-grid{
  display:grid;

  grid-template-columns:
    repeat(5,1fr);

  gap:12px;
}

.game-card{
  padding:16px;

  background:
    linear-gradient(
      180deg,
      #10253c,
      #081626
    );

  border:1px solid var(--line);

  border-radius:16px;

  cursor:pointer;

  transition:.2s;
}

.game-card:hover{
  transform:translateY(-3px);

  border-color:#557aa0;
}

.game-card .game-icon{
  font-size:30px;
}

.game-card h3{
  margin:8px 0 4px;

  font-size:14px;
}

.game-card p{
  font-size:9px;

  color:var(--muted);

  line-height:1.5;
}

.game-card b{
  font-size:9px;

  color:var(--gold);
}

.game-stage{
  margin-top:18px;

  padding:20px;
}

.game-stage-head{
  display:flex;

  justify-content:space-between;

  align-items:center;

  margin-bottom:18px;
}

.shared-progress{
  font-size:11px;

  color:var(--muted);
}

.shared-progress b{
  color:var(--gold2);
}

.game-panel{
  padding:20px;

  border:1px solid var(--line);

  border-radius:14px;

  background:#081726;

  text-align:center;
}

.game-toolbar{
  display:flex;

  justify-content:center;

  gap:10px;

  flex-wrap:wrap;

  margin-bottom:14px;
}

.game-stat{
  padding:8px 12px;

  background:#0d2236;

  border-radius:10px;

  font-size:10px;
}

.lane-board{
  height:360px;

  max-width:520px;

  margin:0 auto;

  display:grid;

  grid-template-columns:
    repeat(4,1fr);

  gap:6px;

  position:relative;

  overflow:hidden;

  background:#040d17;

  border:1px solid var(--line);

  border-radius:14px;
}

.lane{
  position:relative;

  border-right:
    1px solid #15314c;
}

.lane:last-child{
  border-right:0;
}

.lane-key{
  position:absolute;

  bottom:5px;
  left:8px;
  right:8px;

  padding:10px;

  background:#15324c;

  border-radius:8px;

  font-weight:900;
}

.fall-note{
  position:absolute;

  left:10%;
  right:10%;

  height:30px;

  border-radius:8px;

  background:
    linear-gradient(
      90deg,
      #e0bd5e,
      #ffe7a0
    );

  box-shadow:
    0 0 15px
    rgba(255,223,137,.3);
}

.pitch-buttons,
.memory-buttons,
.choice-grid{
  display:flex;

  justify-content:center;

  gap:9px;

  flex-wrap:wrap;
}

.pitch-buttons button,
.memory-buttons button,
.choice-grid button{
  padding:12px 16px;

  border:1px solid var(--line);

  border-radius:10px;

  background:#10253b;

  color:white;

  font-weight:800;
}

.memory-buttons button.flash{
  background:var(--gold);

  color:#171008;
}

.career-road{
  display:grid;

  grid-template-columns:
    repeat(4,1fr);

  gap:10px;
}

.venue-card{
  padding:14px;

  border:1px solid var(--line);

  border-radius:12px;

  background:#0a1a2a;
}

.venue-card.locked{
  opacity:.4;
}

.dash-canvas,
.boss-canvas{
  display:block;

  width:min(100%,760px);

  height:auto;

  margin:0 auto;

  background:#07111d;

  border:1px solid var(--line);

  border-radius:14px;
}

.dungeon-actions{
  display:flex;

  justify-content:center;

  gap:10px;

  flex-wrap:wrap;
}


/* =========================================================
   GACHA
========================================================= */

.gacha-layout{
  display:grid;

  grid-template-columns:
    .9fr 1.1fr;

  gap:16px;
}

.gacha-orb,
.inventory-panel{
  padding:20px;
}

.orb{
  width:140px;
  height:140px;

  margin:0 auto;

  display:grid;

  place-items:center;

  border-radius:50%;

  font-size:58px;

  background:
    radial-gradient(
      circle at 35% 30%,
      #ffe9a8,
      #b98b32 45%,
      #4c3211 70%
    );

  box-shadow:
    0 0 55px
    rgba(230,200,122,.25);
}

.gacha-orb{
  text-align:center;
}

.gacha-buttons{
  display:flex;

  justify-content:center;

  gap:8px;
}

.gacha-reveal{
  min-height:44px;

  margin-top:14px;

  color:var(--gold2);
}

.inventory-grid{
  display:grid;

  grid-template-columns:
    repeat(3,1fr);

  gap:8px;
}

.inventory-item{
  padding:10px;

  background:#081726;

  border-radius:10px;

  border:1px solid var(--line);

  font-size:9px;
}

.inventory-item b{
  display:block;

  color:var(--gold2);
}


/* =========================================================
   MUSICCRAFT
========================================================= */

.craft-layout{
  display:grid;

  grid-template-columns:
    1fr 300px;

  gap:16px;
}

#craftCanvas{
  width:100%;
  height:auto;

  background:#07111b;

  border-radius:16px;

  border:1px solid var(--line);
}

.craft-panel{
  padding:18px;
}

.craft-inventory{
  display:grid;

  gap:6px;

  margin:14px 0;
}

.craft-inventory div{
  display:flex;

  justify-content:space-between;

  padding:8px;

  background:#081726;

  border-radius:8px;

  font-size:10px;
}


/* =========================================================
   LEADERBOARD
========================================================= */

.podium{
  display:grid;

  grid-template-columns:
    repeat(3,1fr);

  gap:12px;

  margin-bottom:16px;
}

.podium>div{
  padding:18px;

  text-align:center;

  background:#0b1d30;

  border:1px solid var(--line);

  border-radius:14px;
}

.podium b{
  display:block;

  color:var(--gold2);

  font-size:20px;
}

.table-wrap{
  overflow:auto;

  border:1px solid var(--line);

  border-radius:14px;
}

table{
  width:100%;

  border-collapse:collapse;

  background:#081624;
}

th,
td{
  padding:11px 13px;

  border-bottom:
    1px solid #132b43;

  text-align:left;

  font-size:10px;
}

th{
  color:var(--gold);

  font-size:9px;
}


/* =========================================================
   QUIZ
========================================================= */

.quiz-card{
  padding:24px;
}

.quiz-options{
  display:grid;

  grid-template-columns:
    repeat(2,1fr);

  gap:9px;

  margin-top:16px;
}

.quiz-options button{
  padding:12px;

  border:1px solid var(--line);

  background:#0a1c2d;

  color:white;

  border-radius:10px;
}

.quiz-options button.correct{
  background:#1a6746;
}

.quiz-options button.wrong{
  background:#742b3a;
}


/* =========================================================
   SETUP
========================================================= */

.overlay{
  position:fixed;

  inset:0;

  z-index:100;

  background:rgba(2,7,12,.92);

  display:grid;

  place-items:center;

  padding:20px;
}

.setup-card{
  width:min(820px,95vw);

  padding:28px;
}

.setup-card h1{
  font-family:
    "Cormorant Garamond",
    serif;

  font-size:55px;

  margin:3px 0;
}

.setup-card>p{
  color:var(--muted);
}

.setup-grid{
  display:grid;

  grid-template-columns:
    .8fr 1.2fr;

  gap:24px;
}

.setup-preview{
  min-height:330px;

  display:grid;

  place-items:center;

  background:#081726;

  border-radius:16px;
}

.avatar-preview-character{
  width:160px;
  height:240px;

  position:relative;
}

.preview-head{
  position:absolute;

  width:75px;
  height:70px;

  left:42px;
  top:35px;

  background:#dca57b;

  border-radius:14px;
}

.preview-head i{
  position:absolute;

  width:8px;
  height:8px;

  background:#7be0ff;

  border-radius:50%;

  top:33px;
}

.preview-head i:first-child{
  left:19px;
}

.preview-head i:last-child{
  right:19px;
}

.preview-hair{
  position:absolute;

  width:82px;
  height:28px;

  left:39px;
  top:26px;

  background:#201915;

  border-radius:
    16px 16px 5px 5px;

  z-index:2;
}

.preview-body{
  position:absolute;

  width:92px;
  height:90px;

  left:34px;
  top:110px;

  background:#19345b;

  border-radius:15px;
}

.preview-arm,
.preview-leg{
  position:absolute;

  background:#18324f;

  border-radius:10px;
}

.preview-arm{
  width:23px;
  height:82px;

  top:117px;
}

.preview-arm.left{
  left:8px;

  transform:rotate(7deg);
}

.preview-arm.right{
  right:8px;

  transform:rotate(-7deg);
}

.preview-leg{
  width:28px;
  height:63px;

  top:190px;
}

.preview-leg.left{
  left:44px;
}

.preview-leg.right{
  right:44px;
}

.setup-fields{
  display:grid;

  gap:10px;
}

.setup-fields label{
  display:grid;

  gap:5px;

  font-size:10px;

  color:var(--muted);
}

.error-text{
  color:#ff8899;

  font-size:10px;
}


/* =========================================================
   TOAST
========================================================= */

.toast{
  position:fixed;

  right:18px;
  bottom:18px;

  z-index:120;

  padding:12px 15px;

  background:#10253c;

  color:white;

  border:1px solid var(--line);

  border-radius:12px;

  box-shadow:var(--shadow);

  transform:translateY(20px);

  opacity:0;

  pointer-events:none;

  transition:.25s;
}

.toast.show{
  transform:none;

  opacity:1;
}

footer{
  text-align:center;

  padding:40px;

  color:#75899e;

  font-size:10px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media(max-width:1050px){

  .instrument-grid{
    grid-template-columns:
      repeat(3,1fr);
  }

  .game-grid{
    grid-template-columns:
      repeat(3,1fr);
  }

  .battle-board{
    grid-template-columns:
      200px 1fr 200px;
  }

  .hero{
    grid-template-columns:1fr;
  }

  .craft-layout{
    grid-template-columns:1fr;
  }

  .topbar nav{
    display:none;
  }

}


@media(max-width:760px){

  .section{
    padding:50px 0;
  }

  .section h2{
    font-size:34px;
  }

  .hero-copy h1{
    font-size:48px;
  }

  .instrument-grid{
    grid-template-columns:
      repeat(2,1fr);
  }

  .game-grid{
    grid-template-columns:
      repeat(2,1fr);
  }

  .battle-board{
    grid-template-columns:1fr;
  }

  .battle-center{
    order:3;
  }

  .team-hp-section{
    grid-template-columns:1fr;
  }

  .concert-shell{
    height:410px;
  }

  .concert-stage{
    left:2%;
    right:2%;

    grid-template-columns:
      1fr 34px 1fr;

    padding:
      25px 8px 12px;
  }

  .concert-team-side{
    grid-template-columns:
      repeat(5,1fr);

    gap:3px;
  }

  .concert-player .body{
    width:27px;
    height:45px;
  }

  .concert-player .body:before{
    width:23px;
    height:24px;

    top:-25px;
  }

  .concert-player .body:after{
    font-size:14px;

    left:4px;
  }

  .concert-player .name{
    display:none;
  }

  .gacha-layout{
    grid-template-columns:1fr;
  }

  .setup-grid{
    grid-template-columns:1fr;
  }

  .setup-preview{
    display:none;
  }

  .career-road{
    grid-template-columns:
      repeat(2,1fr);
  }

}


@media(max-width:520px){

  .top-actions span{
    display:none;
  }

  .instrument-grid,
  .game-grid{
    grid-template-columns:1fr;
  }

  .section-head{
    align-items:flex-start;

    flex-direction:column;
  }

  .search{
    width:100%;

    min-width:0;
  }

  .hero-copy h1{
    font-size:41px;
  }

  .profile-stats{
    grid-template-columns:
      1fr 1fr 1fr;
  }

  .move-grid{
    grid-template-columns:1fr;
  }

  .quiz-options{
    grid-template-columns:1fr;
  }

  .concert-shell{
    height:360px;
  }

  .concert-stage{
    bottom:80px;

    height:240px;
  }

  .stage-curtain{
    width:40px;
  }

  .concert-player{
    height:92px;
  }

  .concert-player .body{
    width:20px;
    height:37px;
  }

  .concert-player .body:before{
    width:18px;
    height:19px;

    top:-20px;
  }

  .concert-player .body:after{
    font-size:11px;

    left:2px;
    top:12px;
  }

}
