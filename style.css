/* =========================================================
   MUSICVERSE — COMPLETE STYLE.CSS
   Dark Navy + Champagne Gold Theme
========================================================= */


/* =========================================================
   1. ROOT VARIABLES
========================================================= */

:root {
    --bg: #080e1a;
    --bg-alt: #0b1426;
    --bg-deep: #050912;

    --panel: #101a2c;
    --panel-2: #111e33;
    --panel-3: #15243c;

    --gold: #c39a55;
    --gold-light: #dfbf7b;
    --gold-soft: rgba(195, 154, 85, 0.14);

    --cream: #f5f1e8;
    --text: #d8dde7;
    --muted: #9fa9b9;

    --border: rgba(216, 185, 119, 0.15);
    --border-strong: rgba(216, 185, 119, 0.32);

    --success: #78c091;
    --danger: #d76c6c;
    --blue: #6aa8d8;

    --shadow:
        0 20px 60px rgba(0, 0, 0, 0.28);

    --radius: 22px;
    --radius-small: 14px;

    --serif:
        "Cormorant Garamond",
        Georgia,
        serif;

    --sans:
        "Montserrat",
        Arial,
        sans-serif;
}


/* =========================================================
   2. RESET
========================================================= */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    min-height: 100vh;

    background:
        radial-gradient(
            circle at top,
            rgba(195, 154, 85, 0.06),
            transparent 30%
        ),
        var(--bg);

    color: var(--text);

    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.7;

    overflow-x: hidden;
}

button,
input {
    font: inherit;
}

button {
    border: none;
}

button,
a {
    -webkit-tap-highlight-color: transparent;
}

a {
    color: inherit;
    text-decoration: none;
}

img,
canvas {
    max-width: 100%;
}

::selection {
    background: var(--gold);
    color: var(--bg);
}


/* =========================================================
   3. TYPOGRAPHY
========================================================= */

h1,
h2,
h3,
h4 {
    font-family: var(--serif);
    color: var(--cream);
    line-height: 1.05;
}

h1 {
    font-size: clamp(3.7rem, 8vw, 7.6rem);
    font-weight: 600;
    letter-spacing: -0.045em;
}

h2 {
    font-size: clamp(2.6rem, 5vw, 4.6rem);
    font-weight: 600;
    letter-spacing: -0.025em;
}

h3 {
    font-size: 1.75rem;
}

p {
    color: var(--text);
}

strong {
    color: var(--cream);
}

em {
    color: var(--gold-light);
    font-weight: 600;
}


/* =========================================================
   4. BUTTONS
========================================================= */

button,
.gold-button,
.outline-button {
    cursor: pointer;

    transition:
        transform 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease,
        box-shadow 0.2s ease;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
}

.gold-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    min-height: 48px;

    padding: 13px 23px;

    border: 1px solid var(--gold);
    border-radius: 999px;

    background:
        linear-gradient(
            135deg,
            var(--gold-light),
            var(--gold)
        );

    color: #10131a;

    font-weight: 800;
    font-size: 0.82rem;

    letter-spacing: 0.04em;
}

.gold-button:hover {
    transform: translateY(-2px);

    box-shadow:
        0 10px 30px rgba(195, 154, 85, 0.22);
}

.outline-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    min-height: 48px;

    padding: 13px 23px;

    border: 1px solid var(--border-strong);
    border-radius: 999px;

    background:
        rgba(255, 255, 255, 0.025);

    color: var(--cream);

    font-weight: 700;
    font-size: 0.82rem;
}

.outline-button:hover {
    border-color: var(--gold);

    color: var(--gold-light);

    transform: translateY(-2px);
}

.full-button {
    width: 100%;
}

.centered-button {
    display: flex;
    width: fit-content;

    margin:
        28px
        auto
        0;
}


/* =========================================================
   5. HERO
========================================================= */

.hero {
    min-height: 92vh;

    display: flex;
    flex-direction: column;

    position: relative;

    overflow: hidden;

    background:
        radial-gradient(
            circle at 72% 30%,
            rgba(195, 154, 85, 0.11),
            transparent 26%
        ),
        radial-gradient(
            circle at 18% 70%,
            rgba(64, 105, 160, 0.10),
            transparent 30%
        ),
        linear-gradient(
            180deg,
            #080f1d,
            #080e1a
        );
}

.hero::before {
    content: "";

    position: absolute;

    width: 700px;
    height: 700px;

    right: -330px;
    top: -300px;

    border: 1px solid rgba(195, 154, 85, 0.1);
    border-radius: 50%;
}

.hero::after {
    content: "";

    position: absolute;

    width: 420px;
    height: 420px;

    left: -250px;
    bottom: -200px;

    border: 1px solid rgba(195, 154, 85, 0.08);
    border-radius: 50%;
}


/* =========================================================
   6. NAVIGATION
========================================================= */

.navbar {
    width: min(1180px, calc(100% - 40px));

    margin: 22px auto 0;

    min-height: 72px;

    padding:
        10px
        14px
        10px
        24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    position: relative;
    z-index: 20;

    border: 1px solid var(--border);
    border-radius: 999px;

    background:
        rgba(8, 14, 26, 0.76);

    backdrop-filter: blur(18px);

    box-shadow:
        0 15px 50px rgba(0, 0, 0, 0.18);
}

.logo {
    color: var(--cream);

    font-family: var(--serif);
    font-size: 1.55rem;
    font-weight: 700;

    white-space: nowrap;
}

.nav-links {
    display: flex;
    align-items: center;

    gap: 6px;

    list-style: none;
}

.nav-links a {
    display: block;

    padding:
        9px
        13px;

    border-radius: 999px;

    color: var(--muted);

    font-size: 0.75rem;
    font-weight: 700;

    transition:
        color 0.2s ease,
        background 0.2s ease;
}

.nav-links a:hover {
    color: var(--gold-light);

    background:
        rgba(195, 154, 85, 0.08);
}

.theme-toggle,
.menu-toggle {
    width: 44px;
    height: 44px;

    flex: 0 0 auto;

    border: 1px solid var(--border);
    border-radius: 50%;

    background:
        rgba(255, 255, 255, 0.035);

    color: var(--cream);
}

.theme-toggle:hover,
.menu-toggle:hover {
    border-color: var(--gold);
}

.menu-toggle {
    display: none;

    padding: 11px;
}

.menu-toggle span {
    display: block;

    width: 100%;
    height: 2px;

    margin: 4px 0;

    border-radius: 10px;

    background: var(--cream);
}


/* =========================================================
   7. HERO CONTENT
========================================================= */

.hero-content {
    width: min(1080px, calc(100% - 40px));

    margin: auto;

    padding:
        110px
        0
        130px;

    position: relative;
    z-index: 2;

    text-align: center;
}

.eyebrow {
    margin-bottom: 22px;

    color: var(--gold-light);

    font-size: 0.72rem;
    font-weight: 800;

    letter-spacing: 0.25em;
}

.hero-content h1 {
    max-width: 980px;

    margin: auto;
}

.hero-content h1 em {
    display: block;

    font-weight: 600;
}

.hero-text {
    max-width: 720px;

    margin:
        30px
        auto
        0;

    color: var(--muted);

    font-size: 1.05rem;
}

.hero-actions {
    margin-top: 36px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    gap: 12px;
}


/* =========================================================
   8. SECTIONS
========================================================= */

.section {
    width: min(1180px, calc(100% - 40px));

    margin: 0 auto;

    padding:
        105px
        0;
}

.alt-section {
    position: relative;
}

.alt-section::before {
    content: "";

    position: absolute;

    left: 50%;
    top: 0;

    width: 100vw;
    height: 100%;

    transform: translateX(-50%);

    z-index: -1;

    background:
        linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.015),
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0.015)
        );

    border-top:
        1px solid rgba(255, 255, 255, 0.03);

    border-bottom:
        1px solid rgba(255, 255, 255, 0.03);
}

.section-title {
    max-width: 780px;

    margin:
        0
        auto
        52px;

    text-align: center;
}

.section-title > p:first-child {
    margin-bottom: 10px;

    color: var(--gold);

    font-size: 0.7rem;
    font-weight: 800;

    letter-spacing: 0.2em;
}

.section-title > p:last-child:not(:first-child) {
    max-width: 660px;

    margin:
        18px
        auto
        0;

    color: var(--muted);
}

.intro-grid {
    max-width: 900px;

    margin: auto;

    display: grid;
    grid-template-columns:
        repeat(2, 1fr);

    gap: 22px;
}

.intro-grid p {
    padding: 30px;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background: var(--panel);

    color: var(--muted);
}


/* =========================================================
   9. SEARCH
========================================================= */

.search-section {
    width: min(780px, calc(100% - 40px));

    margin:
        0
        auto
        10px;
}

.search-box {
    min-height: 62px;

    display: flex;
    align-items: center;

    gap: 14px;

    padding:
        0
        20px;

    border: 1px solid var(--border-strong);
    border-radius: 999px;

    background: var(--panel);

    box-shadow: var(--shadow);
}

.search-box span {
    font-size: 1.15rem;
}

.search-box input {
    width: 100%;

    border: 0;
    outline: 0;

    background: transparent;

    color: var(--cream);

    font-size: 0.95rem;
}

.search-box input::placeholder {
    color: #737e8f;
}

#searchStatus {
    min-height: 26px;

    padding-top: 10px;

    text-align: center;

    color: var(--muted);

    font-size: 0.78rem;
}


/* =========================================================
   10. INSTRUMENT TABS
========================================================= */

.instrument-tabs {
    margin-bottom: 34px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    gap: 9px;
}

.tab-btn {
    padding:
        10px
        16px;

    border: 1px solid var(--border);
    border-radius: 999px;

    background: var(--panel);

    color: var(--muted);

    font-size: 0.75rem;
    font-weight: 700;
}

.tab-btn:hover,
.tab-btn.active {
    border-color: var(--gold);

    background:
        rgba(195, 154, 85, 0.12);

    color: var(--gold-light);
}


/* =========================================================
   11. INSTRUMENT CARDS
========================================================= */

.instrument-grid {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 20px;
}

.instrument-card {
    min-width: 0;

    padding: 28px;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-2)
        );

    box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.14);

    transition:
        transform 0.25s ease,
        border-color 0.25s ease;
}

.instrument-card:hover {
    transform: translateY(-6px);

    border-color: var(--border-strong);
}

.instrument-icon {
    width: 72px;
    height: 72px;

    margin-bottom: 18px;

    display: grid;
    place-items: center;

    border: 1px solid var(--border);
    border-radius: 20px;

    background:
        rgba(195, 154, 85, 0.08);

    font-size: 2.25rem;
}

.category-label,
.gold-label {
    color: var(--gold);

    font-size: 0.67rem;
    font-weight: 800;

    letter-spacing: 0.16em;
}

.instrument-card h3 {
    margin-top: 8px;
}

.instrument-card > p {
    min-height: 82px;

    margin-top: 12px;

    color: var(--muted);

    font-size: 0.86rem;
}

.instrument-details {
    margin:
        18px
        0;

    padding:
        14px
        0;

    border-top:
        1px solid var(--border);

    border-bottom:
        1px solid var(--border);
}

.instrument-details p {
    margin: 4px 0;

    color: var(--muted);

    font-size: 0.75rem;
}

.instrument-details strong {
    color: var(--gold-light);
}

.sound-btn,
.info-btn {
    width: 100%;

    min-height: 42px;

    margin-top: 8px;

    border-radius: 999px;

    font-size: 0.75rem;
    font-weight: 700;
}

.sound-btn {
    background:
        linear-gradient(
            135deg,
            var(--gold-light),
            var(--gold)
        );

    color: #111;
}

.info-btn {
    border:
        1px solid var(--border);

    background: transparent;

    color: var(--cream);
}

.sound-btn:hover,
.info-btn:hover {
    transform: translateY(-2px);
}

.no-results {
    padding: 40px;

    text-align: center;

    color: var(--muted);
}


/* =========================================================
   12. FEATURED INSTRUMENT
========================================================= */

.feature-instrument {
    max-width: 900px;

    margin: auto;

    padding: 42px;

    display: grid;
    grid-template-columns:
        180px
        1fr;

    gap: 38px;

    align-items: center;

    border: 1px solid var(--border-strong);
    border-radius: 30px;

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-2)
        );

    box-shadow: var(--shadow);
}

.feature-icon {
    width: 170px;
    height: 170px;

    display: grid;
    place-items: center;

    border: 1px solid var(--border);
    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(195, 154, 85, 0.18),
            rgba(195, 154, 85, 0.03)
        );

    font-size: 5rem;
}

.feature-instrument h3 {
    margin-top: 8px;

    font-size: 2.7rem;
}

.feature-instrument > div > p {
    margin-top: 12px;

    color: var(--muted);
}

.feature-details {
    margin:
        20px
        0;
}

.feature-details p {
    margin: 6px 0;

    color: var(--muted);

    font-size: 0.85rem;
}


/* =========================================================
   13. VIRTUAL PIANO
========================================================= */

.virtual-piano {
    max-width: 920px;

    min-height: 240px;

    margin: auto;

    padding: 18px;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    overflow-x: auto;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background:
        #060a11;

    box-shadow: var(--shadow);
}

.piano-key {
    min-width: 62px;
    height: 200px;

    margin: 0 2px;

    border:
        1px solid #c9c9c9;

    border-radius:
        0
        0
        9px
        9px;

    background:
        linear-gradient(
            180deg,
            #fff,
            #e7e7e7
        );

    color: #111;

    font-weight: 800;

    display: flex;
    justify-content: center;
    align-items: flex-end;

    padding-bottom: 16px;
}

.piano-key:hover {
    background:
        linear-gradient(
            180deg,
            #fff7e7,
            #dfc58c
        );
}

.piano-key:active {
    transform:
        translateY(
            4px
        );
}

.black-key {
    min-width: 44px;
    height: 128px;

    margin:
        0
        -24px;

    position: relative;
    z-index: 2;

    border-color: #000;

    background:
        linear-gradient(
            180deg,
            #242424,
            #050505
        );

    color: #fff;
}


/* =========================================================
   14. DRUM PAD
========================================================= */

.drum-pad {
    max-width: 760px;

    margin: auto;

    display: grid;
    grid-template-columns:
        repeat(3, 1fr);

    gap: 14px;
}

.drum-pad-button {
    min-height: 130px;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-3)
        );

    color: var(--cream);

    font-weight: 800;
    letter-spacing: 0.08em;

    box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.02);
}

.drum-pad-button:hover {
    border-color: var(--gold);

    color: var(--gold-light);

    transform: translateY(-3px);
}

.drum-pad-button:active {
    transform: scale(0.96);
}


/* =========================================================
   15. GENERAL GAME CARDS
========================================================= */

.game-card,
.quiz-box,
.fact-card {
    max-width: 760px;

    margin: auto;

    padding: 38px;

    border: 1px solid var(--border);
    border-radius: var(--radius);

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-2)
        );

    box-shadow: var(--shadow);

    text-align: center;
}

.clue {
    margin-bottom: 24px;

    color: var(--cream);

    font-family: var(--serif);
    font-size: 1.5rem;
}

.game-options {
    margin:
        20px
        0;

    display: grid;
    grid-template-columns:
        repeat(2, 1fr);

    gap: 12px;
}

.game-options button {
    min-height: 54px;

    padding: 12px 16px;

    border: 1px solid var(--border);
    border-radius: 14px;

    background:
        rgba(255, 255, 255, 0.035);

    color: var(--cream);

    font-weight: 700;
}

.game-options button:hover:not(:disabled) {
    border-color: var(--gold);

    background:
        rgba(195, 154, 85, 0.09);
}


/* =========================================================
   16. BATTLE ARENA
========================================================= */

.battle-section {
    position: relative;
}

.battle-intro {
    max-width: 720px;

    margin:
        -25px
        auto
        35px;

    text-align: center;

    color: var(--muted);
}

.battle-selection {
    margin-bottom: 38px;

    text-align: center;
}

.battle-selection h3 {
    margin-bottom: 20px;
}

.battle-instrument-grid {
    display: grid;

    grid-template-columns:
        repeat(6, 1fr);

    gap: 10px;
}

.battle-instrument-option {
    min-height: 105px;

    padding: 12px 8px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 7px;

    border: 1px solid var(--border);
    border-radius: 16px;

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-2)
        );

    color: var(--muted);

    font-size: 0.67rem;
    font-weight: 700;
}

.battle-instrument-option:hover,
.battle-instrument-option.active {
    border-color: var(--gold);

    background:
        rgba(195, 154, 85, 0.1);

    color: var(--gold-light);

    transform: translateY(-3px);
}

.battle-option-icon {
    display: block;

    font-size: 2rem;
}

.battle-arena {
    display: grid;

    grid-template-columns:
        1fr
        100px
        1fr;

    align-items: center;

    gap: 20px;
}

.fighter-card {
    padding: 34px;

    border: 1px solid var(--border);
    border-radius: 28px;

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-2)
        );

    box-shadow: var(--shadow);

    text-align: center;
}

.fighter-label {
    color: var(--gold);

    font-size: 0.68rem;
    font-weight: 800;

    letter-spacing: 0.2em;
}

.fighter-icon {
    width: 110px;
    height: 110px;

    margin:
        20px
        auto;

    display: grid;
    place-items: center;

    border: 1px solid var(--border);
    border-radius: 50%;

    background:
        rgba(195, 154, 85, 0.07);

    font-size: 3.6rem;
}

.fighter-card h3 {
    font-size: 2.2rem;
}

.fighter-card > p {
    margin-top: 8px;

    color: var(--muted);
}

.battle-vs {
    color: var(--gold);

    font-family: var(--serif);
    font-size: 3rem;
    font-weight: 700;

    text-align: center;
}

.battle-stats {
    margin-top: 22px;

    display: grid;
    grid-template-columns:
        repeat(2, 1fr);

    gap: 9px;
}

.battle-stats div {
    padding: 11px;

    display: flex;
    justify-content: space-between;

    border: 1px solid var(--border);
    border-radius: 12px;

    background:
        rgba(0, 0, 0, 0.13);

    color: var(--muted);

    font-size: 0.72rem;
}

.battle-stats strong {
    color: var(--gold-light);
}


/* =========================================================
   17. XP
========================================================= */

.xp-container {
    margin-top: 22px;
}

.xp-label {
    margin-bottom: 7px;

    display: flex;
    justify-content: space-between;

    color: var(--muted);

    font-size: 0.68rem;
    font-weight: 700;
}

.xp-bar {
    height: 10px;

    overflow: hidden;

    border-radius: 999px;

    background:
        rgba(255, 255, 255, 0.07);
}

.xp-fill {
    width: 0%;
    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            var(--gold),
            var(--gold-light)
        );

    transition:
        width 0.5s ease;
}


/* =========================================================
   18. BATTLE CONTROLS
========================================================= */

.battle-controls {
    margin-top: 28px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    gap: 12px;
}

.battle-button {
    min-height: 50px;

    padding:
        12px
        32px;

    border-radius: 999px;

    background:
        linear-gradient(
            135deg,
            #9e3e3e,
            #d76c6c
        );

    color: white;

    font-weight: 900;

    letter-spacing: 0.06em;
}

.battle-button:hover:not(:disabled) {
    transform: scale(1.04);

    box-shadow:
        0 10px 30px rgba(215, 108, 108, 0.22);
}

.battle-status {
    max-width: 720px;

    min-height: 65px;

    margin:
        24px
        auto
        0;

    padding: 18px;

    border: 1px solid var(--border);
    border-radius: 16px;

    background: var(--panel);

    color: var(--cream);

    text-align: center;
}

.battle-log {
    max-width: 760px;

    max-height: 220px;

    margin:
        14px
        auto
        0;

    padding: 14px;

    overflow-y: auto;

    border: 1px solid var(--border);
    border-radius: 16px;

    background:
        rgba(0, 0, 0, 0.18);
}

.battle-log:empty {
    display: none;
}

.battle-log-entry {
    padding:
        8px
        10px;

    border-bottom:
        1px solid rgba(255, 255, 255, 0.04);

    color: var(--muted);

    font-size: 0.78rem;
}

.battle-log-entry:last-child {
    border-bottom: 0;
}


/* =========================================================
   19. BATTLE RECORD
========================================================= */

.battle-record {
    max-width: 800px;

    margin:
        30px
        auto;

    display: grid;
    grid-template-columns:
        repeat(4, 1fr);

    gap: 10px;
}

.battle-record article {
    padding: 20px 12px;

    border: 1px solid var(--border);
    border-radius: 16px;

    background: var(--panel);

    text-align: center;
}

.battle-record strong {
    display: block;

    color: var(--gold-light);

    font-family: var(--serif);
    font-size: 2rem;
}

.battle-record span {
    color: var(--muted);

    font-size: 0.67rem;
}


/* =========================================================
   20. UPGRADES
========================================================= */

.upgrade-section {
    max-width: 800px;

    margin:
        30px
        auto
        0;

    padding: 30px;

    border: 1px solid var(--border);
    border-radius: 22px;

    background: var(--panel);

    text-align: center;
}

.upgrade-section > p {
    margin-top: 8px;

    color: var(--muted);
}

.upgrade-points {
    margin:
        18px
        0;

    color: var(--muted);
}

.upgrade-points strong {
    color: var(--gold-light);

    font-size: 1.25rem;
}

.upgrade-grid {
    display: grid;
    grid-template-columns:
        repeat(4, 1fr);

    gap: 10px;
}

.upgrade-button {
    padding: 14px 10px;

    border: 1px solid var(--border);
    border-radius: 14px;

    background:
        rgba(255, 255, 255, 0.03);

    color: var(--cream);

    font-size: 0.73rem;
    font-weight: 700;
}

.upgrade-button span {
    display: block;

    margin-top: 3px;

    color: var(--success);
}

.upgrade-button:hover {
    border-color: var(--gold);

    transform: translateY(-2px);
}


/* =========================================================
   21. MUSICCRAFT
========================================================= */

.musiccraft-section {
    width:
        min(
            1380px,
            calc(100% - 40px)
        );
}

.musiccraft-section::before {
    content: "";

    position: absolute;

    pointer-events: none;
}


/* =========================================================
   22. MUSICCRAFT HUD
========================================================= */

.musiccraft-hud {
    margin-bottom: 14px;

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 10px;
}

.mc-stat {
    padding:
        14px
        18px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 1px solid var(--border);
    border-radius: 14px;

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-2)
        );

    color: var(--muted);

    font-size: 0.74rem;
    font-weight: 700;
}

.mc-stat strong {
    color: var(--gold-light);

    font-size: 1rem;
}


/* =========================================================
   23. MUSICCRAFT LAYOUT
========================================================= */

.musiccraft-layout {
    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        320px;

    gap: 18px;

    align-items: start;
}

.musiccraft-game-wrap {
    min-width: 0;

    padding: 12px;

    border: 1px solid var(--border-strong);
    border-radius: 20px;

    background:
        #05080d;

    box-shadow:
        0 25px 70px rgba(0, 0, 0, 0.34);
}


/* =========================================================
   24. MUSICCRAFT CANVAS
========================================================= */

#musiccraftCanvas {
    display: block;

    width: 100%;
    height: auto;

    aspect-ratio: 800 / 520;

    border:
        2px solid rgba(195, 154, 85, 0.3);

    border-radius: 12px;

    outline: none;

    background: #171a1f;

    cursor: crosshair;

    image-rendering: pixelated;
    image-rendering: crisp-edges;

    user-select: none;
}

#musiccraftCanvas:hover {
    border-color:
        rgba(223, 191, 123, 0.55);
}

#musiccraftCanvas:focus {
    border-color: var(--gold);

    box-shadow:
        0 0 0 3px rgba(195, 154, 85, 0.09);
}

#musiccraftCanvas:active {
    cursor: grabbing;
}


/* =========================================================
   25. MUSICCRAFT HELP
========================================================= */

.musiccraft-help {
    margin-top: 10px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    gap: 8px;
}

.musiccraft-help span {
    padding:
        7px
        10px;

    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;

    background:
        rgba(255, 255, 255, 0.025);

    color: #8993a3;

    font-size: 0.62rem;
    font-weight: 700;
}

.mc-instructions {
    margin-top: 12px;

    padding:
        13px
        15px;

    border-left:
        3px solid var(--gold);

    border-radius:
        0
        10px
        10px
        0;

    background:
        rgba(195, 154, 85, 0.055);
}

.mc-instructions strong {
    display: block;

    margin-bottom: 4px;

    color: var(--gold-light);

    font-size: 0.74rem;
}

.mc-instructions p {
    color: var(--muted);

    font-size: 0.69rem;
    line-height: 1.55;
}


/* =========================================================
   26. MUSICCRAFT SIDEBAR
========================================================= */

.musiccraft-sidebar {
    padding: 20px;

    border: 1px solid var(--border);
    border-radius: 20px;

    background:
        linear-gradient(
            180deg,
            #0d1728,
            #0a1220
        );

    box-shadow: var(--shadow);
}

.musiccraft-sidebar > h3 {
    margin:
        20px
        0
        10px;

    padding-bottom: 7px;

    border-bottom:
        1px solid var(--border);

    color: var(--gold-light);

    font-family: var(--sans);
    font-size: 0.72rem;
    font-weight: 800;

    letter-spacing: 0.07em;
}

.musiccraft-sidebar > h3:first-child {
    margin-top: 0;
}


/* =========================================================
   27. DEPTH CARD
========================================================= */

.mc-depth-card {
    padding: 17px;

    border: 1px solid var(--border);
    border-radius: 14px;

    background:
        rgba(0, 0, 0, 0.15);
}

.mc-depth-card strong {
    display: block;

    color: var(--cream);

    font-family: var(--serif);
    font-size: 1.4rem;
}

.mc-depth-card p {
    margin-top: 5px;

    color: var(--muted);

    font-size: 0.68rem;
    line-height: 1.5;
}


/* =========================================================
   28. MISSION BOX
========================================================= */

.mc-mission-box {
    padding: 16px;

    border: 1px solid var(--border);
    border-radius: 14px;

    background:
        rgba(195, 154, 85, 0.045);
}

#mcMissionTitle {
    margin-bottom: 12px;

    color: var(--cream);

    font-family: var(--serif);
    font-size: 1.25rem;
    font-weight: 700;
}

.mc-mission-list {
    display: grid;

    gap: 7px;
}

.mc-mission-item {
    padding:
        8px
        10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 10px;

    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 9px;

    background:
        rgba(0, 0, 0, 0.12);

    color: var(--muted);

    font-size: 0.68rem;
}

.mc-mission-item strong {
    color: var(--cream);

    font-size: 0.67rem;
}

.mc-mission-item.complete {
    border-color:
        rgba(120, 192, 145, 0.24);

    background:
        rgba(120, 192, 145, 0.06);
}

.mc-mission-item.complete,
.mc-mission-item.complete strong {
    color: var(--success);
}

.mc-mission-progress {
    height: 8px;

    margin:
        13px
        0;

    overflow: hidden;

    border-radius: 999px;

    background:
        rgba(255, 255, 255, 0.07);
}

.mc-mission-progress-fill {
    width: 0;
    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            var(--gold),
            var(--gold-light)
        );

    transition:
        width 0.4s ease;
}


/* =========================================================
   29. RESOURCE GUIDE
========================================================= */

.mc-resource-guide {
    display: grid;
    grid-template-columns:
        repeat(2, 1fr);

    gap: 7px;
}

.mc-resource-guide > div {
    min-width: 0;

    padding: 9px;

    display: flex;
    align-items: center;

    gap: 8px;

    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 9px;

    background:
        rgba(255, 255, 255, 0.018);
}

.mc-resource-guide > div > span {
    font-size: 1.1rem;
}

.mc-resource-guide p {
    color: var(--cream);

    font-size: 0.62rem;
    font-weight: 700;
    line-height: 1.2;
}

.mc-resource-guide small {
    display: block;

    margin-top: 3px;

    color: var(--muted);

    font-size: 0.52rem;
    font-weight: 500;
}


/* =========================================================
   30. INVENTORY
========================================================= */

.mc-inventory {
    display: grid;

    gap: 6px;
}

.mc-inventory-item {
    width: 100%;

    min-height: 40px;

    padding:
        8px
        10px;

    display: grid;

    grid-template-columns:
        26px
        1fr
        auto;

    align-items: center;

    gap: 7px;

    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 9px;

    background:
        rgba(255, 255, 255, 0.02);

    color: var(--muted);

    text-align: left;

    font-size: 0.65rem;
    font-weight: 700;
}

.mc-inventory-item:hover {
    border-color:
        rgba(195, 154, 85, 0.4);

    background:
        rgba(195, 154, 85, 0.055);
}

.mc-inventory-item.selected {
    border-color: var(--gold);

    background:
        rgba(195, 154, 85, 0.1);

    color: var(--gold-light);
}

.mc-inventory-icon {
    font-size: 1rem;
}

.mc-inventory-count {
    color: var(--cream);

    font-size: 0.62rem;
}


/* =========================================================
   31. SELECTED BLOCK
========================================================= */

.mc-selected-block {
    padding:
        12px
        14px;

    border: 1px solid var(--gold);
    border-radius: 10px;

    background:
        rgba(195, 154, 85, 0.08);

    color: var(--gold-light);

    font-size: 0.72rem;
    font-weight: 800;

    text-align: center;
}


/* =========================================================
   32. ADVENTURE LOG
========================================================= */

.mc-log {
    max-height: 170px;

    overflow-y: auto;

    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;

    background:
        rgba(0, 0, 0, 0.18);
}

.mc-log div {
    padding:
        8px
        10px;

    border-bottom:
        1px solid rgba(255, 255, 255, 0.04);

    color: #8e98a8;

    font-size: 0.61rem;
    line-height: 1.4;
}

.mc-log div:first-child {
    color: var(--cream);
}

.mc-log div:last-child {
    border-bottom: 0;
}


/* =========================================================
   33. DEPTH ROADMAP
========================================================= */

.mc-depth-roadmap {
    margin-top: 85px;
}

.mc-depth-grid {
    display: grid;

    grid-template-columns:
        repeat(6, 1fr);

    gap: 12px;
}

.mc-depth-grid article {
    min-height: 190px;

    padding:
        24px
        14px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px solid var(--border);
    border-radius: 18px;

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-2)
        );

    text-align: center;

    transition:
        transform 0.2s ease,
        border-color 0.2s ease;
}

.mc-depth-grid article:hover {
    transform: translateY(-4px);

    border-color: var(--gold);
}

.mc-depth-grid article > span {
    margin-bottom: 14px;

    font-size: 2.2rem;
}

.mc-depth-grid h3 {
    font-size: 1.25rem;
}

.mc-depth-grid p {
    margin-top: 7px;

    color: var(--muted);

    font-size: 0.62rem;
}


/* =========================================================
   34. MOBILE MUSICCRAFT CONTROLS
========================================================= */

.mc-mobile-controls {
    display: none;

    margin:
        24px
        auto
        0;

    text-align: center;
}

.mc-mobile-controls > button,
.mc-mobile-controls div button {
    width: 58px;
    height: 58px;

    margin: 3px;

    border: 1px solid var(--border-strong);
    border-radius: 14px;

    background:
        linear-gradient(
            145deg,
            var(--panel),
            var(--panel-2)
        );

    color: var(--cream);

    font-size: 1.2rem;
    font-weight: 900;
}

.mc-mobile-controls button:active {
    transform: scale(0.93);

    border-color: var(--gold);

    background:
        rgba(195, 154, 85, 0.12);
}


/* =========================================================
   35. QUIZ
========================================================= */

.quiz-top {
    margin-bottom: 26px;

    display: flex;
    justify-content: space-between;

    color: var(--muted);

    font-size: 0.72rem;
}

.quiz-top strong {
    color: var(--gold-light);
}

.quiz-box h3 {
    margin-bottom: 24px;

    font-size: 2rem;
}

#answerButtons {
    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 11px;
}

.quiz-answer {
    min-height: 58px;

    padding: 12px;

    border: 1px solid var(--border);
    border-radius: 13px;

    background:
        rgba(255, 255, 255, 0.025);

    color: var(--cream);

    font-weight: 700;
}

.quiz-answer:hover:not(:disabled) {
    border-color: var(--gold);

    background:
        rgba(195, 154, 85, 0.08);
}

.quiz-answer.correct-answer {
    border-color: var(--success);

    background:
        rgba(120, 192, 145, 0.12);

    color: #baf0cb;
}

.quiz-answer.wrong-answer {
    border-color: var(--danger);

    background:
        rgba(215, 108, 108, 0.12);

    color: #f2b4b4;
}

#quizResult {
    min-height: 30px;

    margin-top: 18px;
}

#nextQuestion {
    margin-top: 10px;
}


/* =========================================================
   36. FUN FACT
========================================================= */

.fact-card p {
    min-height: 70px;

    display: grid;
    place-items: center;

    margin-bottom: 20px;

    color: var(--cream);

    font-family: var(--serif);
    font-size: 1.6rem;
}


/* =========================================================
   37. MODAL
========================================================= */

.instrument-modal {
    position: fixed;

    inset: 0;

    z-index: 1000;

    padding: 20px;

    display: none;
    justify-content: center;
    align-items: center;

    background:
        rgba(2, 5, 10, 0.82);

    backdrop-filter:
        blur(10px);
}

.instrument-modal.modal-active {
    display: flex;
}

.modal-content {
    width:
        min(
            600px,
            100%
        );

    max-height:
        calc(100vh - 40px);

    overflow-y: auto;

    position: relative;

    padding: 42px;

    border: 1px solid var(--border-strong);
    border-radius: 28px;

    background:
        linear-gradient(
            145deg,
            #101a2c,
            #0b1426
        );

    box-shadow:
        0 30px 100px rgba(0, 0, 0, 0.55);

    text-align: center;
}

.close-modal {
    position: absolute;

    right: 18px;
    top: 16px;

    width: 40px;
    height: 40px;

    border: 1px solid var(--border);
    border-radius: 50%;

    background:
        rgba(255, 255, 255, 0.03);

    color: var(--cream);

    font-size: 1.4rem;
}

.close-modal:hover {
    border-color: var(--gold);

    color: var(--gold-light);
}

.modal-icon {
    width: 100px;
    height: 100px;

    margin:
        0
        auto
        20px;

    display: grid;
    place-items: center;

    border: 1px solid var(--border);
    border-radius: 50%;

    background:
        rgba(195, 154, 85, 0.08);

    font-size: 3.3rem;
}

.modal-content h2 {
    margin:
        8px
        0
        14px;

    font-size: 3rem;
}

#modalDescription {
    color: var(--muted);
}

.modal-details {
    margin-top: 25px;

    padding-top: 20px;

    border-top:
        1px solid var(--border);

    text-align: left;
}

.modal-details p {
    margin: 8px 0;

    color: var(--muted);

    font-size: 0.82rem;
}

.modal-details strong {
    color: var(--gold-light);
}


/* =========================================================
   38. FOOTER
========================================================= */

footer {
    margin-top: 80px;

    padding:
        70px
        20px;

    border-top:
        1px solid var(--border);

    background:
        #050a12;

    text-align: center;
}

footer h2 {
    color: var(--gold-light);

    font-size: 2.4rem;
}

footer p {
    margin-top: 8px;

    color: var(--muted);

    font-size: 0.72rem;
}


/* =========================================================
   39. SCROLLBARS
========================================================= */

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: #070c15;
}

::-webkit-scrollbar-thumb {
    border:
        2px solid #070c15;

    border-radius: 999px;

    background: #26334a;
}

::-webkit-scrollbar-thumb:hover {
    background: #344562;
}

.mc-log::-webkit-scrollbar,
.battle-log::-webkit-scrollbar {
    width: 6px;
}


/* =========================================================
   40. LIGHT MODE
========================================================= */

body.light-mode {
    --bg: #eee9df;
    --bg-alt: #f5f1e8;
    --bg-deep: #e4ddd1;

    --panel: #fffdf8;
    --panel-2: #f3eee5;
    --panel-3: #ebe3d6;

    --cream: #132038;
    --text: #39465b;
    --muted: #70798a;

    --border:
        rgba(24, 38, 60, 0.12);

    --border-strong:
        rgba(161, 119, 55, 0.32);
}

body.light-mode {
    background:
        radial-gradient(
            circle at top,
            rgba(195, 154, 85, 0.08),
            transparent 30%
        ),
        var(--bg);
}

body.light-mode .navbar {
    background:
        rgba(245, 241, 232, 0.85);
}

body.light-mode .hero {
    background:
        radial-gradient(
            circle at 72% 30%,
            rgba(195, 154, 85, 0.12),
            transparent 28%
        ),
        #eee9df;
}

body.light-mode .search-box input {
    color: var(--cream);
}

body.light-mode .musiccraft-game-wrap,
body.light-mode #musiccraftCanvas {
    background: #171a1f;
}

body.light-mode .musiccraft-sidebar {
    background:
        linear-gradient(
            180deg,
            #fffdf8,
            #f1ebdf
        );
}

body.light-mode footer {
    background: #e6dfd3;
}


/* =========================================================
   41. LARGE TABLET
========================================================= */

@media (max-width: 1100px) {

    .instrument-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .battle-instrument-grid {
        grid-template-columns:
            repeat(4, 1fr);
    }

    .mc-depth-grid {
        grid-template-columns:
            repeat(3, 1fr);
    }

    .musiccraft-layout {
        grid-template-columns:
            minmax(0, 1fr)
            280px;
    }

}


/* =========================================================
   42. TABLET
========================================================= */

@media (max-width: 900px) {

    .section {
        padding:
            80px
            0;
    }

    .navbar {
        border-radius: 24px;
    }

    .nav-links {
        position: absolute;

        left: 0;
        right: 0;
        top: calc(100% + 10px);

        display: none;

        padding: 12px;

        flex-direction: column;
        align-items: stretch;

        border: 1px solid var(--border);
        border-radius: 18px;

        background:
            rgba(8, 14, 26, 0.97);

        box-shadow: var(--shadow);
    }

    .nav-links.nav-active {
        display: flex;
    }

    .nav-links a {
        padding: 12px 14px;
    }

    .menu-toggle {
        display: block;
    }

    .hero-content {
        padding:
            90px
            0
            100px;
    }

    .feature-instrument {
        grid-template-columns:
            1fr;

        text-align: center;
    }

    .feature-icon {
        margin: auto;
    }

    .battle-arena {
        grid-template-columns:
            1fr;
    }

    .battle-vs {
        font-size: 2rem;
    }

    .upgrade-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .musiccraft-layout {
        grid-template-columns:
            1fr;
    }

    .musiccraft-sidebar {
        display: grid;

        grid-template-columns:
            repeat(2, 1fr);

        gap:
            10px
            18px;
    }

    .musiccraft-sidebar > h3 {
        grid-column:
            1 / -1;
    }

    .musiccraft-sidebar .full-button {
        grid-column:
            1 / -1;
    }

    .mc-mobile-controls {
        display: block;
    }

}


/* =========================================================
   43. MOBILE
========================================================= */

@media (max-width: 650px) {

    body {
        font-size: 14px;
    }

    .navbar,
    .section,
    .musiccraft-section {
        width:
            min(
                100% - 24px,
                1180px
            );
    }

    .navbar {
        margin-top: 12px;

        min-height: 62px;

        padding:
            8px
            10px
            8px
            16px;
    }

    .logo {
        font-size: 1.25rem;
    }

    .theme-toggle,
    .menu-toggle {
        width: 40px;
        height: 40px;
    }

    .hero {
        min-height: 760px;
    }

    .hero-content {
        width:
            calc(100% - 28px);

        padding:
            90px
            0;
    }

    h1 {
        font-size:
            clamp(
                3rem,
                16vw,
                4.8rem
            );
    }

    h2 {
        font-size:
            clamp(
                2.3rem,
                12vw,
                3.4rem
            );
    }

    .hero-text {
        font-size: 0.9rem;
    }

    .hero-actions {
        flex-direction: column;
    }

    .hero-actions a {
        width: 100%;
    }

    .section {
        padding:
            65px
            0;
    }

    .section-title {
        margin-bottom: 34px;
    }

    .intro-grid {
        grid-template-columns:
            1fr;
    }

    .intro-grid p {
        padding: 23px;
    }

    .instrument-grid {
        grid-template-columns:
            1fr;
    }

    .instrument-card > p {
        min-height: 0;
    }

    .feature-instrument {
        padding: 28px 20px;
    }

    .feature-icon {
        width: 125px;
        height: 125px;

        font-size: 3.8rem;
    }

    .feature-instrument h3 {
        font-size: 2.2rem;
    }

    .virtual-piano {
        justify-content: flex-start;

        padding: 12px;
    }

    .piano-key {
        min-width: 52px;
        height: 180px;
    }

    .black-key {
        min-width: 38px;
        height: 112px;

        margin:
            0
            -21px;
    }

    .drum-pad {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .drum-pad-button {
        min-height: 100px;
    }

    .game-card,
    .quiz-box,
    .fact-card {
        padding:
            26px
            18px;
    }

    .game-options,
    #answerButtons {
        grid-template-columns:
            1fr;
    }

    .battle-instrument-grid {
        grid-template-columns:
            repeat(3, 1fr);
    }

    .battle-instrument-option {
        min-height: 90px;

        font-size: 0.58rem;
    }

    .fighter-card {
        padding:
            28px
            18px;
    }

    .fighter-icon {
        width: 90px;
        height: 90px;

        font-size: 3rem;
    }

    .battle-stats {
        grid-template-columns:
            1fr;
    }

    .battle-record {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .upgrade-grid {
        grid-template-columns:
            1fr;
    }

    .musiccraft-hud {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .mc-stat {
        padding:
            11px
            12px;

        font-size: 0.62rem;
    }

    .musiccraft-game-wrap {
        padding: 7px;
    }

    #musiccraftCanvas {
        border-radius: 8px;
    }

    .musiccraft-help {
        justify-content: flex-start;
    }

    .musiccraft-sidebar {
        display: block;

        padding: 16px;
    }

    .musiccraft-sidebar > h3 {
        margin-top: 22px;
    }

    .mc-resource-guide {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .mc-depth-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .mc-depth-grid article {
        min-height: 160px;

        padding:
            18px
            10px;
    }

    .mc-depth-roadmap {
        margin-top: 60px;
    }

    .modal-content {
        padding:
            35px
            22px;
    }

    .modal-content h2 {
        font-size: 2.4rem;
    }

}


/* =========================================================
   44. VERY SMALL MOBILE
========================================================= */

@media (max-width: 430px) {

    .battle-instrument-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .musiccraft-hud {
        grid-template-columns:
            1fr
            1fr;
    }

    .mc-resource-guide {
        grid-template-columns:
            1fr;
    }

    .mc-depth-grid {
        grid-template-columns:
            1fr;
    }

    .mc-depth-grid article {
        min-height: 140px;
    }

    .battle-record {
        grid-template-columns:
            1fr
            1fr;
    }

}


/* =========================================================
   45. REDUCED MOTION
========================================================= */

@media (
    prefers-reduced-motion:
    reduce
) {

    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration:
            0.01ms !important;

        animation-iteration-count:
            1 !important;

        transition-duration:
            0.01ms !important;
    }

}
