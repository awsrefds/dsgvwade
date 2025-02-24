document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.querySelector(".loading-screen");
    const experienceStart = document.querySelector(".experience-start");
    const characterSelection = document.querySelector(".character-selection");
    const headphonesScreen = document.querySelector(".headphones-screen");
    const instructionScreens = document.querySelectorAll(".instruction-screen");
    const quoteChambers = document.querySelectorAll(".quote-chamber");
    const quoteFeedbacks = document.querySelectorAll(".quote-feedback");
    const quoteSummary = document.querySelector(".quote-summary");
    const toneDissection = document.querySelector(".tone-dissection");
    const toneReflection = document.querySelector(".tone-reflection");
    const castePressure = document.querySelector(".caste-pressure");
    const dialogueShift = document.querySelector(".dialogue-shift");
    const valueHierarchy = document.querySelector(".value-hierarchy");
    const valueComparison = document.querySelector(".value-comparison");
    const identityClash = document.querySelector(".identity-clash");
    const classDiscussion = document.querySelector(".class-discussion");
    const startNowBtn = document.getElementById("start-now-btn");
    const welcomeScreen = document.querySelector(".welcome-screen");
    const loginDialog = document.querySelector(".login-dialog");
    const systemTime = document.getElementById("system-time");
    const countdownTime = document.getElementById("countdown-time");
    const needles = document.querySelectorAll(".needle");
    const quoteVoice = document.getElementById("quote-voice");
    const clickSound = document.getElementById("click-sound");

    let currentCharacter = null; // Set by character selection
    let currentQuoteIndex = 1;
    let valueHierarchyStage = 0; // 0: Selected Character, 1: Other Character, 2: User
    let toneChoices = {}; // Store Tone Dissection choices
    let valueRankings = { "bernard-marx": [], "lenina-crowne": [], "user": [] }; // Store Value Hierarchy rankings

    window.addEventListener("resize", () => { document.querySelectorAll("canvas").forEach(canvas => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }); });

    // Simulated Windows XP Login
    function simulateLogin() {
        console.log("Starting login simulation...");
        welcomeScreen.classList.remove("hidden");
        setTimeout(() => {
            console.log("Showing login dialog...");
            welcomeScreen.classList.add("hidden");
            loginDialog.classList.remove("hidden");
            document.querySelector(".login-body").innerHTML = `
                <div class="login-field">
                    <label>User name:</label>
                    <span>CITIZEN_001</span>
                </div>
                <div class="login-field">
                    <label>Password:</label>
                    <span class="fake-password">•••••</span>
                </div>
                <div class="login-status">SYSTEM BREACH DETECTED</div>
            `;
            setTimeout(() => {
                console.log("Login simulation complete, transitioning to Experience Start...");
                loadingScreen.style.animation = "matrix-fade 0.5s ease-in-out forwards";
                loadingScreen.style.opacity = "0";
                setTimeout(() => {
                    loadingScreen.classList.remove("visible");
                    loadingScreen.classList.add("hidden");
                    experienceStart.classList.remove("hidden");
                    experienceStart.classList.add("visible");
                    experienceStart.style.opacity = "1";
                    startCountdownTimer();
                }, 500);
            }, 2000);
        }, 2000);
    }

    // Update System Tray Time
    function updateSystemTime() {
        const now = new Date();
        systemTime.innerHTML = now.toLocaleTimeString();
    }
    updateSystemTime();
    setInterval(updateSystemTime, 1000);

    // Start Page Countdown
    let countdown = 10;
    function startCountdownTimer() {
        const interval = setInterval(() => {
            countdown--;
            countdownTime.innerHTML = countdown;
            if (countdown <= 0 || !experienceStart.classList.contains("visible")) {
                clearInterval(interval);
            }
            if (Math.random() < 0.1) {
                countdownTime.style.animation = "glitch-text 0.5s infinite";
                setTimeout(() => countdownTime.style.animation = "", 500);
            }
        }, 1000);
    }

    // Needle Tooltips
    needles.forEach(needle => {
        needle.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            const tooltip = needle.getAttribute("data-tooltip");
            const sloganText = document.querySelector(".slogan-text");
            sloganText.innerHTML = tooltip;
            sloganText.style.animation = "fade-in 0.5s ease-out forwards";
            setTimeout(() => sloganText.style.animation = "morph-text 6s infinite", 1000);
        });
    });

    // Particle Background for Experience Start
    const particleCanvas = document.getElementById("particle-bg");
    const particleCtx = particleCanvas.getContext("2d");
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            size: Math.random() * 10 + 5,
            speedX: Math.random() * 0.2 - 0.1,
            speedY: Math.random() * 0.2 - 0.1,
            opacity: Math.random() * 0.4 + 0.1,
            color: `rgba(${Math.random() * 255}, 26, 140, 0.4)`
        });
    }

    function drawParticleBackground() {
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(p => {
            particleCtx.beginPath();
            particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            particleCtx.fillStyle = p.color;
            particleCtx.globalAlpha = p.opacity;
            particleCtx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > particleCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > particleCanvas.height) p.speedY *= -1;
        });
        particleCtx.globalAlpha = 1;
        requestAnimationFrame(drawParticleBackground);
    }
    drawParticleBackground();

    // Smoke Backgrounds for Quote Chambers
    quoteChambers.forEach((chamber, idx) => {
        const smokeCanvas = document.getElementById(`smoke-bg-${idx + 1}`);
        const smokeCtx = smokeCanvas.getContext("2d");
        smokeCanvas.width = window.innerWidth;
        smokeCanvas.height = window.innerHeight;
        const smokeParticles = [];
        for (let i = 0; i < 100; i++) {
            smokeParticles.push({
                x: Math.random() * smokeCanvas.width,
                y: Math.random() * smokeCanvas.height,
                size: Math.random() * 20 + 10,
                speedX: Math.random() * 0.2 - 0.1,
                speedY: Math.random() * 0.2 - 0.1,
                opacity: Math.random() * 0.3 + 0.1,
                color: `rgba(${Math.random() * 255}, 26, 140, 0.3)`
            });
        }

        function drawSmoke() {
            smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
            smokeParticles.forEach(p => {
                smokeCtx.beginPath();
                smokeCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                smokeCtx.fillStyle = p.color;
                smokeCtx.globalAlpha = p.opacity;
                smokeCtx.fill();
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0 || p.x > smokeCanvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > smokeCanvas.height) p.speedY *= -1;
            });
            smokeCtx.globalAlpha = 1;
            requestAnimationFrame(drawSmoke);
        }
        drawSmoke();

        chamber.addEventListener("quoteReveal", () => {
            smokeParticles.forEach(p => {
                p.size += 5;
                setTimeout(() => p.size -= 5, 1000);
            });
        });
    });

    // Tone Dissection Background
    const toneCanvas = document.getElementById("tone-bg");
    const toneCtx = toneCanvas.getContext("2d");
    toneCanvas.width = window.innerWidth;
    toneCanvas.height = window.innerHeight;
    const toneParticles = [];
    for (let i = 0; i < 50; i++) {
        toneParticles.push({
            x: Math.random() * toneCanvas.width,
            y: Math.random() * toneCanvas.height,
            size: Math.random() * 15 + 5,
            speedX: Math.random() * 0.1 - 0.05,
            speedY: Math.random() * 0.1 - 0.05,
            opacity: Math.random() * 0.2 + 0.1,
            color: `rgba(0, 229, 255, 0.3)`
        });
    }

    function drawToneBackground() {
        toneCtx.clearRect(0, 0, toneCanvas.width, toneCanvas.height);
        toneParticles.forEach(p => {
            toneCtx.beginPath();
            toneCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            toneCtx.fillStyle = p.color;
            toneCtx.globalAlpha = p.opacity;
            toneCtx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > toneCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > toneCanvas.height) p.speedY *= -1;
        });
        toneCtx.globalAlpha = 1;
        requestAnimationFrame(drawToneBackground);
    }
    drawToneBackground();

    // Tone Reflection Background
    const reflectionCanvas = document.getElementById("reflection-bg");
    const reflectionCtx = reflectionCanvas.getContext("2d");
    reflectionCanvas.width = window.innerWidth;
    reflectionCanvas.height = window.innerHeight;
    const reflectionParticles = [];
    for (let i = 0; i < 50; i++) {
        reflectionParticles.push({
            x: Math.random() * reflectionCanvas.width,
            y: Math.random() * reflectionCanvas.height,
            size: Math.random() * 15 + 5,
            speedX: Math.random() * 0.1 - 0.05,
            speedY: Math.random() * 0.1 - 0.05,
            opacity: Math.random() * 0.2 + 0.1,
            color: `rgba(0, 255, 128, 0.3)`
        });
    }

    function drawReflectionBackground() {
        reflectionCtx.clearRect(0, 0, reflectionCanvas.width, reflectionCanvas.height);
        reflectionParticles.forEach(p => {
            reflectionCtx.beginPath();
            reflectionCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            reflectionCtx.fillStyle = p.color;
            reflectionCtx.globalAlpha = p.opacity;
            reflectionCtx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > reflectionCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > reflectionCanvas.height) p.speedY *= -1;
        });
        reflectionCtx.globalAlpha = 1;
        requestAnimationFrame(drawReflectionBackground);
    }
    drawReflectionBackground();

    // Caste Pressure Background
    const casteCanvas = document.getElementById("caste-bg");
    const casteCtx = casteCanvas.getContext("2d");
    casteCanvas.width = window.innerWidth;
    casteCanvas.height = window.innerHeight;
    const casteParticles = [];
    for (let i = 0; i < 50; i++) {
        casteParticles.push({
            x: Math.random() * casteCanvas.width,
            y: Math.random() * casteCanvas.height,
            size: Math.random() * 15 + 5,
            speedX: Math.random() * 0.1 - 0.05,
            speedY: Math.random() * 0.1 - 0.05,
            opacity: Math.random() * 0.2 + 0.1,
            color: `rgba(255, 165, 0, 0.3)`
        });
    }

    function drawCasteBackground() {
        casteCtx.clearRect(0, 0, casteCanvas.width, casteCanvas.height);
        casteParticles.forEach(p => {
            casteCtx.beginPath();
            casteCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            casteCtx.fillStyle = p.color;
            casteCtx.globalAlpha = p.opacity;
            casteCtx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > casteCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > casteCanvas.height) p.speedY *= -1;
        });
        casteCtx.globalAlpha = 1;
        requestAnimationFrame(drawCasteBackground);
    }
    drawCasteBackground();

    // Dialogue Shift Background
    const dialogueCanvas = document.getElementById("dialogue-bg");
    const dialogueCtx = dialogueCanvas.getContext("2d");
    dialogueCanvas.width = window.innerWidth;
    dialogueCanvas.height = window.innerHeight;
    const dialogueParticles = [];
    for (let i = 0; i < 50; i++) {
        dialogueParticles.push({
            x: Math.random() * dialogueCanvas.width,
            y: Math.random() * dialogueCanvas.height,
            size: Math.random() * 15 + 5,
            speedX: Math.random() * 0.1 - 0.05,
            speedY: Math.random() * 0.1 - 0.05,
            opacity: Math.random() * 0.2 + 0.1,
            color: `rgba(128, 0, 128, 0.3)`
        });
    }

    function drawDialogueBackground() {
        dialogueCtx.clearRect(0, 0, dialogueCanvas.width, dialogueCanvas.height);
        dialogueParticles.forEach(p => {
            dialogueCtx.beginPath();
            dialogueCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            dialogueCtx.fillStyle = p.color;
            dialogueCtx.globalAlpha = p.opacity;
            dialogueCtx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > dialogueCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > dialogueCanvas.height) p.speedY *= -1;
        });
        dialogueCtx.globalAlpha = 1;
        requestAnimationFrame(drawDialogueBackground);
    }
    drawDialogueBackground();

    // Value Hierarchy Background
    const valueCanvas = document.getElementById("value-bg");
    const valueCtx = valueCanvas.getContext("2d");
    valueCanvas.width = window.innerWidth;
    valueCanvas.height = window.innerHeight;
    const valueParticles = [];
    for (let i = 0; i < 50; i++) {
        valueParticles.push({
            x: Math.random() * valueCanvas.width,
            y: Math.random() * valueCanvas.height,
            size: Math.random() * 15 + 5,
            speedX: Math.random() * 0.1 - 0.05,
            speedY: Math.random() * 0.1 - 0.05,
            opacity: Math.random() * 0.2 + 0.1,
            color: `rgba(255, 26, 140, 0.3)`
        });
    }

    function drawValueBackground() {
        valueCtx.clearRect(0, 0, valueCanvas.width, valueCanvas.height);
        valueParticles.forEach(p => {
            valueCtx.beginPath();
            valueCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            valueCtx.fillStyle = p.color;
            valueCtx.globalAlpha = p.opacity;
            valueCtx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > valueCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > valueCanvas.height) p.speedY *= -1;
        });
        valueCtx.globalAlpha = 1;
        requestAnimationFrame(drawValueBackground);
    }
    drawValueBackground();

    // Identity Clash Background
    const identityCanvas = document.getElementById("identity-bg");
    const identityCtx = identityCanvas.getContext("2d");
    identityCanvas.width = window.innerWidth;
    identityCanvas.height = window.innerHeight;
    const identityParticles = [];
    for (let i = 0; i < 50; i++) {
        identityParticles.push({
            x: Math.random() * identityCanvas.width,
            y: Math.random() * identityCanvas.height,
            size: Math.random() * 15 + 5,
            speedX: Math.random() * 0.1 - 0.05,
            speedY: Math.random() * 0.1 - 0.05,
            opacity: Math.random() * 0.2 + 0.1,
            color: `rgba(0, 128, 0, 0.3)`
        });
    }

    function drawIdentityBackground() {
        identityCtx.clearRect(0, 0, identityCanvas.width, identityCanvas.height);
        identityParticles.forEach(p => {
            identityCtx.beginPath();
            identityCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            identityCtx.fillStyle = p.color;
            identityCtx.globalAlpha = p.opacity;
            identityCtx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > identityCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > identityCanvas.height) p.speedY *= -1;
        });
        identityCtx.globalAlpha = 1;
        requestAnimationFrame(drawIdentityBackground);
    }
    drawIdentityBackground();

    startNowBtn.addEventListener("click", () => {
        clickSound.play().catch(() => console.log("Click sound failed"));
        console.log("Start Now clicked...");
        experienceStart.style.animation = "matrix-fade 0.5s ease-in-out forwards";
        setTimeout(() => {
            experienceStart.classList.remove("visible");
            experienceStart.classList.add("hidden");
            experienceStart.style.opacity = "0";
            experienceStart.style.animation = "";
            transitionToCharacterSelection();
        }, 500);
    });

    function transitionToCharacterSelection() {
        console.log("Transitioning to character selection...");
        characterSelection.classList.remove("hidden");
        characterSelection.classList.add("visible");
        characterSelection.style.opacity = "1";
        setupCharacterSelection();
    }

    function setupCharacterSelection() {
        const castePanels = document.querySelectorAll(".caste-panel");
        castePanels.forEach(panel => {
            panel.addEventListener("click", () => {
                clickSound.play().catch(() => console.log("Click sound failed"));
                currentCharacter = panel.dataset.character;
                console.log(`Character selected: ${currentCharacter}`);
                characterSelection.style.animation = "matrix-fade 0.5s ease-in-out forwards";
                setTimeout(() => {
                    characterSelection.classList.remove("visible");
                    characterSelection.classList.add("hidden");
                    characterSelection.style.opacity = "0";
                    characterSelection.style.animation = "";
                    transitionToHeadphones();
                }, 500);
            }, { once: true });
        });
    }

    function transitionToHeadphones() {
        console.log("Transitioning to headphones screen...");
        headphonesScreen.classList.remove("hidden");
        headphonesScreen.classList.add("visible");
        headphonesScreen.style.opacity = "1";
        setTimeout(() => {
            headphonesScreen.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                headphonesScreen.classList.remove("visible");
                headphonesScreen.classList.add("hidden");
                headphonesScreen.style.opacity = "0";
                headphonesScreen.style.animation = "";
                transitionToInstruction("quote-chamber");
            }, 500);
        }, 5000); // 5 seconds display
    }

    function transitionToInstruction(activity) {
        console.log(`Transitioning to instruction for ${activity}...`);
        const instructionScreen = document.querySelector(`.instruction-screen[data-activity="${activity}"]`);
        instructionScreen.innerHTML = `
            <div class="instruction-overlay">
                <h1>${activity === "quote-chamber" ? "QUOTE ANALYSIS" : activity === "tone-dissection" ? "TONE DISSECTION" : activity === "caste-pressure" ? "CASTE PRESSURE ANALYSIS" : activity === "dialogue-shift" ? "DIALOGUE SHIFT" : activity === "value-hierarchy" ? "VALUE HIERARCHY" : "IDENTITY CLASH ANALYSIS"}</h1>
                <p>${activity === "quote-chamber" ? "Analyze three quotes by breaking them down word-by-word, then summarize the character's traits." : activity === "tone-dissection" ? "Adjust sliders to identify the tone (Bitterness, Defiance, Resignation) and explain its alignment with character personality." : activity === "caste-pressure" ? "Rank four pressures impacting the character in a scenario and explain your reasoning." : activity === "dialogue-shift" ? "Rewrite a quote from one character’s perspective to reflect the other’s and explain the shift." : activity === "value-hierarchy" ? "Rank five values for your character, the other character, and yourself, then compare them." : "Select three identity traits that clash most between Bernard and Lenina in a scenario and analyze the conflict."}</p>
                <button class="next-btn">NEXT</button>
            </div>`;
        instructionScreen.classList.remove("hidden");
        instructionScreen.classList.add("visible");
        instructionScreen.style.opacity = "1";

        const nextBtn = instructionScreen.querySelector(".next-btn");
        nextBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            instructionScreen.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                instructionScreen.classList.remove("visible");
                instructionScreen.classList.add("hidden");
                instructionScreen.style.opacity = "0";
                instructionScreen.style.animation = "";
                switch (activity) {
                    case "quote-chamber":
                        transitionToQuoteChamber(1);
                        break;
                    case "tone-dissection":
                        transitionToToneDissection();
                        break;
                    case "caste-pressure":
                        transitionToCastePressure();
                        break;
                    case "dialogue-shift":
                        transitionToDialogueShift();
                        break;
                    case "value-hierarchy":
                        transitionToValueHierarchy(currentCharacter);
                        break;
                    case "identity-clash":
                        transitionToIdentityClash();
                        break;
                }
            }, 500);
        }, { once: true });
    }

    function transitionToQuoteChamber(quoteIndex) {
        console.log(`Transitioning to quote chamber ${quoteIndex} for ${currentCharacter}...`);
        const quotes = {
            "bernard-marx": [
                "I'd rather be myself than somebody else.",
                "I want freedom over comfort.",
                "I hate that word 'stability'. It's like a gag in your mouth, it makes me want to scream."
            ],
            "lenina-crowne": [
                "A gramme of soma saves nine.",
                "Everybody’s happy now.",
                "I don't understand anything, nor do I want to."
            ]
        };
        const importantWords = {
            "bernard-marx": {
                "myself": ["Individuality", "Rejection of conformity", "Bernard asserts his unique identity against the World State’s imposed uniformity."],
                "somebody": ["Collective identity", "Loss of self", "Critiques the erasure of personal agency in favor of a standardized existence."],
                "freedom": ["Liberty", "Desire for autonomy", "Reflects Bernard’s yearning to break free from societal control and conditioning."],
                "comfort": ["Complacency", "World State norm", "Rejects the shallow comfort offered by Soma and conformity."],
                "hate": ["Rebellion", "Emotional intensity", "Shows Bernard’s visceral opposition to World State values."],
                "stability": ["Control", "Stagnation", "Highlights his disdain for the enforced order that suppresses individuality."]
            },
            "lenina-crowne": {
                "soma": ["Escapism", "Control mechanism", "Highlights Lenina’s reliance on Soma to maintain her conditioned happiness."],
                "saves": ["Quick fix", "Avoidance", "Emphasizes the World State’s preference for superficial solutions over real emotion."],
                "everybody": ["Collectivism", "Universal conformity", "Reflects Lenina’s belief in the World State’s imposed universal happiness."],
                "happy": ["Conditioned joy", "False contentment", "Shows Lenina’s acceptance of a chemically-induced, shallow emotional state."],
                "understand": ["Ignorance", "Conditioned apathy", "Reveals Lenina’s acceptance of not questioning the world around her."],
                "want": ["Conformity", "Lack of curiosity", "Underlines her conditioned resistance to deeper understanding."]
            }
        };

        const chamber = document.querySelector(`.quote-chamber[data-quote="${quoteIndex}"]`);
        const quoteText = chamber.querySelector(".quote-text");
        const analysisContainer = chamber.querySelector(".analysis-container");
        const wordDisplay = chamber.querySelector(".word-display");
        const meaningArrows = chamber.querySelector(".meaning-arrows");
        const deepAnalysis = chamber.querySelector(".deep-analysis");
        const yourTurn = chamber.querySelector(".your-turn");
        const submitBtn = chamber.querySelector(".submit-btn");

        quoteText.classList.add(currentCharacter === "lenina-crowne" ? "lenina" : "bernard");
        quoteText.innerHTML = `"${quotes[currentCharacter][quoteIndex - 1]}"`;
        chamber.classList.remove("hidden");
        chamber.classList.add("visible");
        chamber.style.opacity = "1";
        chamber.dispatchEvent(new Event("quoteReveal"));

        quoteVoice.play().catch(() => console.log("Voiceover playback failed"));

        setTimeout(() => {
            quoteText.classList.add("hidden");
            analysisContainer.classList.remove("hidden");
            const words = quotes[currentCharacter][quoteIndex - 1].split(" ");
            let wordIndex = 0;

            function displayNextWord() {
                if (wordIndex < words.length) {
                    const word = words[wordIndex];
                    const isImportant = importantWords[currentCharacter][word.toLowerCase()];
                    wordDisplay.innerHTML = word;

                    if (isImportant) {
                        meaningArrows.innerHTML = `
                            <div class="arrow">${isImportant[0]}</div>
                            <div class="arrow">${isImportant[1]}</div>
                        `;
                        deepAnalysis.innerHTML = isImportant[2];
                        setTimeout(() => {
                            wordIndex++;
                            displayNextWord();
                        }, 7500); // 7.5 seconds for important words
                    } else {
                        meaningArrows.innerHTML = "";
                        deepAnalysis.innerHTML = "";
                        setTimeout(() => {
                            wordIndex++;
                            displayNextWord();
                        }, 1500); // 1.5 seconds for filler words
                    }
                } else {
                    analysisContainer.classList.add("hidden");
                    yourTurn.classList.remove("hidden");
                    submitBtn.addEventListener("click", () => {
                        clickSound.play().catch(() => console.log("Click sound failed"));
                        chamber.style.animation = "matrix-fade 0.5s ease-in-out forwards";
                        setTimeout(() => {
                            chamber.classList.remove("visible");
                            chamber.classList.add("hidden");
                            chamber.style.opacity = "0";
                            chamber.style.animation = "";
                            if (quoteIndex < 3) {
                                transitionToQuoteFeedback(quoteIndex);
                            } else {
                                transitionToQuoteSummary();
                            }
                        }, 500);
                    }, { once: true });
                }
            }

            displayNextWord();
        }, 5000); // 5 seconds initial display
    }

    function transitionToQuoteFeedback(quoteIndex) {
        console.log(`Transitioning to quote feedback ${quoteIndex}...`);
        const feedbackScreen = document.querySelector(`.quote-${quoteIndex}-feedback`);
        feedbackScreen.classList.remove("hidden");
        feedbackScreen.classList.add("visible");
        feedbackScreen.style.opacity = "1";

        const nextBtn = feedbackScreen.querySelector(".next-btn");
        nextBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            feedbackScreen.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                feedbackScreen.classList.remove("visible");
                feedbackScreen.classList.add("hidden");
                feedbackScreen.style.opacity = "0";
                feedbackScreen.style.animation = "";
                transitionToQuoteChamber(quoteIndex + 1);
            }, 500);
        }, { once: true });
    }

    function transitionToQuoteSummary() {
        console.log("Transitioning to quote summary...");
        quoteSummary.classList.remove("hidden");
        quoteSummary.classList.add("visible");
        quoteSummary.style.opacity = "1";

        const submitBtn = quoteSummary.querySelector(".submit-btn");
        submitBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            quoteSummary.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                quoteSummary.classList.remove("visible");
                quoteSummary.classList.add("hidden");
                quoteSummary.style.opacity = "0";
                quoteSummary.style.animation = "";
                transitionToInstruction("tone-dissection");
            }, 500);
        }, { once: true });
    }

    function transitionToToneDissection() {
        console.log("Transitioning to tone dissection...");
        toneDissection.classList.remove("hidden");
        toneDissection.classList.add("visible");
        toneDissection.style.opacity = "1";

        const toneQuotes = {
            "bernard-marx": "But I don’t want comfort, I want reality.",
            "lenina-crowne": "Why not enjoy the moment?"
        };

        const toneQuote = toneDissection.querySelector(".tone-quote");
        const sliders = toneDissection.querySelectorAll(".tone-slider");
        const submitBtn = toneDissection.querySelector(".submit-btn");

        toneQuote.innerHTML = `"${toneQuotes[currentCharacter]}" - ${currentCharacter === "bernard-marx" ? "Bernard Marx" : "Lenina Crowne"}`;
        sliders.forEach(slider => {
            slider.value = 50;
            const valueSpan = slider.nextElementSibling;
            valueSpan.innerHTML = "50%";
            slider.oninput = () => {
                valueSpan.innerHTML = `${slider.value}%`;
            };
        });
        submitBtn.style.display = "block";

        submitBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            toneChoices = {
                bitterness: sliders[0].value,
                defiance: sliders[1].value,
                resignation: sliders[2].value
            };
            toneDissection.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                toneDissection.classList.remove("visible");
                toneDissection.classList.add("hidden");
                toneDissection.style.opacity = "0";
                toneDissection.style.animation = "";
                transitionToToneReflection();
            }, 500);
        }, { once: true });
    }

    function transitionToToneReflection() {
        console.log("Transitioning to tone reflection...");
        toneReflection.classList.remove("hidden");
        toneReflection.classList.add("visible");
        toneReflection.style.opacity = "1";

        const reflectionContent = toneReflection.querySelector(".reflection-content");
        reflectionContent.innerHTML = `
            Your tone analysis for "${currentCharacter === "bernard-marx" ? "Bernard Marx" : "Lenina Crowne"}":<br>
            Bitterness: ${toneChoices.bitterness}%<br>
            Defiance: ${toneChoices.defiance}%<br>
            Resignation: ${toneChoices.resignation}%
        `;

        const nextBtn = toneReflection.querySelector(".next-btn");
        nextBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            toneReflection.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                toneReflection.classList.remove("visible");
                toneReflection.classList.add("hidden");
                toneReflection.style.opacity = "0";
                toneReflection.style.animation = "";
                transitionToInstruction("caste-pressure");
            }, 500);
        }, { once: true });
    }

    function transitionToCastePressure() {
        console.log("Transitioning to caste pressure analysis...");
        castePressure.classList.remove("hidden");
        castePressure.classList.add("visible");
        castePressure.style.opacity = "1";

        const casteScenario = castePressure.querySelector(".caste-scenario");
        const pressureItems = castePressure.querySelectorAll(".pressure-item");
        const dropSlots = castePressure.querySelectorAll(".drop-slot");
        const submitBtn = castePressure.querySelector(".submit-btn");

        casteScenario.innerHTML = `${currentCharacter === "bernard-marx" ? "Bernard" : "Lenina"} faces ${currentCharacter === "bernard-marx" ? "Alpha" : "Beta"} expectations during a Soma distribution ceremony in front of peers.`;
        pressureItems.forEach(item => item.parentNode.appendChild(item)); // Reset items
        dropSlots.forEach(slot => slot.innerHTML = slot.dataset.rank);
        submitBtn.style.display = "block";

        pressureItems.forEach(item => {
            item.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text", item.textContent);
                item.classList.add("dragging");
            });
            item.addEventListener("dragend", () => item.classList.remove("dragging"));
        });

        dropSlots.forEach(slot => {
            slot.addEventListener("dragover", (e) => e.preventDefault());
            slot.addEventListener("dragenter", () => slot.classList.add("drag-over"));
            slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
            slot.addEventListener("drop", (e) => {
                e.preventDefault();
                const value = e.dataTransfer.getData("text");
                slot.innerHTML = `${slot.dataset.rank}: ${value}`;
                slot.classList.remove("drag-over");
            });
        });

        submitBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            castePressure.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                castePressure.classList.remove("visible");
                castePressure.classList.add("hidden");
                castePressure.style.opacity = "0";
                castePressure.style.animation = "";
                transitionToInstruction("dialogue-shift");
            }, 500);
        }, { once: true });
    }

    function transitionToDialogueShift() {
        console.log("Transitioning to dialogue shift...");
        dialogueShift.classList.remove("hidden");
        dialogueShift.classList.add("visible");
        dialogueShift.style.opacity = "1";

        const dialogueQuote = dialogueShift.querySelector(".dialogue-quote");
        const dialogueInput = dialogueShift.querySelector(".dialogue-input");
        const submitBtn = dialogueShift.querySelector(".submit-btn");

        dialogueQuote.innerHTML = `"Everybody’s happy now" - Lenina Crowne`;
        dialogueInput.value = "";
        submitBtn.style.display = "block";

        submitBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            dialogueShift.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                dialogueShift.classList.remove("visible");
                dialogueShift.classList.add("hidden");
                dialogueShift.style.opacity = "0";
                dialogueShift.style.animation = "";
                transitionToInstruction("value-hierarchy");
            }, 500);
        }, { once: true });
    }

    function transitionToValueHierarchy(character) {
        console.log(`Transitioning to value hierarchy for ${character}...`);
        valueHierarchy.classList.remove("hidden");
        valueHierarchy.classList.add("visible");
        valueHierarchy.style.opacity = "1";

        const characterName = valueHierarchy.querySelector(".character-name");
        const valueItems = valueHierarchy.querySelectorAll(".value-item");
        const dropSlots = valueHierarchy.querySelectorAll(".drop-slot");
        const submitBtn = valueHierarchy.querySelector(".submit-btn");

        characterName.innerHTML = character === "bernard-marx" ? "Bernard Marx" : character === "lenina-crowne" ? "Lenina Crowne" : "Yourself";
        valueItems.forEach(item => item.parentNode.appendChild(item)); // Reset items
        dropSlots.forEach(slot => slot.innerHTML = slot.dataset.rank);
        submitBtn.style.display = "block";

        valueItems.forEach(item => {
            item.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text", item.textContent);
                item.classList.add("dragging");
            });
            item.addEventListener("dragend", () => item.classList.remove("dragging"));
        });

        dropSlots.forEach(slot => {
            slot.addEventListener("dragover", (e) => e.preventDefault());
            slot.addEventListener("dragenter", () => slot.classList.add("drag-over"));
            slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
            slot.addEventListener("drop", (e) => {
                e.preventDefault();
                const value = e.dataTransfer.getData("text");
                slot.innerHTML = `${slot.dataset.rank}: ${value}`;
                slot.classList.remove("drag-over");
            });
        });

        submitBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            const rankings = Array.from(dropSlots).map(slot => slot.textContent);
            valueRankings[character] = rankings;
            valueHierarchy.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                valueHierarchy.classList.remove("visible");
                valueHierarchy.classList.add("hidden");
                valueHierarchy.style.opacity = "0";
                valueHierarchy.style.animation = "";
                transitionToValueComparison(character);
            }, 500);
        }, { once: true });
    }

    function transitionToValueComparison(character) {
        console.log(`Transitioning to value comparison for ${character}...`);
        valueComparison.classList.remove("hidden");
        valueComparison.classList.add("visible");
        valueComparison.style.opacity = "1";

        const comparisonContent = valueComparison.querySelector(".comparison-content");
        let content = "";
        if (valueHierarchyStage === 0) {
            content = `Your rankings for ${currentCharacter === "bernard-marx" ? "Bernard Marx" : "Lenina Crowne"}:<br>${valueRankings[character].join("<br>")}`;
        } else if (valueHierarchyStage === 1) {
            content = `Your rankings for ${currentCharacter === "bernard-marx" ? "Lenina Crowne" : "Bernard Marx"}:<br>${valueRankings[character].join("<br>")}<br><br>Compare with ${currentCharacter === "bernard-marx" ? "Bernard Marx" : "Lenina Crowne"}:<br>${valueRankings[currentCharacter].join("<br>")}`;
        } else {
            content = `Your rankings for Yourself:<br>${valueRankings["user"].join("<br>")}<br><br>Compare with Bernard Marx:<br>${valueRankings["bernard-marx"].join("<br>")}<br><br>Compare with Lenina Crowne:<br>${valueRankings["lenina-crowne"].join("<br>")}`;
        }
        comparisonContent.innerHTML = content;

        const nextBtn = valueComparison.querySelector(".next-btn");
        nextBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            valueComparison.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                valueComparison.classList.remove("visible");
                valueComparison.classList.add("hidden");
                valueComparison.style.opacity = "0";
                valueComparison.style.animation = "";
                if (valueHierarchyStage === 0) {
                    transitionToValueHierarchy(currentCharacter === "bernard-marx" ? "lenina-crowne" : "bernard-marx");
                    valueHierarchyStage = 1;
                } else if (valueHierarchyStage === 1) {
                    transitionToValueHierarchy("user");
                    valueHierarchyStage = 2;
                } else {
                    transitionToInstruction("identity-clash");
                }
            }, 500);
        }, { once: true });
    }

    function transitionToIdentityClash() {
        console.log("Transitioning to identity clash analysis...");
        identityClash.classList.remove("hidden");
        identityClash.classList.add("visible");
        identityClash.style.opacity = "1";

        const identityScenario = identityClash.querySelector(".identity-scenario");
        const traitCheckboxes = identityClash.querySelectorAll(".trait-checkbox");
        const submitBtn = identityClash.querySelector(".submit-btn");

        identityScenario.innerHTML = "Bernard and Lenina argue over Soma use during a social gathering.";
        traitCheckboxes.forEach(checkbox => checkbox.checked = false);
        submitBtn.style.display = "block";

        submitBtn.addEventListener("click", () => {
            clickSound.play().catch(() => console.log("Click sound failed"));
            identityClash.style.animation = "matrix-fade 0.5s ease-in-out forwards";
            setTimeout(() => {
                identityClash.classList.remove("visible");
                identityClash.classList.add("hidden");
                identityClash.style.opacity = "0";
                identityClash.style.animation = "";
                transitionToClassDiscussion();
            }, 500);
        }, { once: true });
    }

    function transitionToClassDiscussion() {
        console.log("Transitioning to class discussion...");
        classDiscussion.classList.remove("hidden");
        classDiscussion.classList.add("visible");
        classDiscussion.style.opacity = "1";

        let timeLeft = 180; // 3 minutes in seconds
        const timerDisplay = document.getElementById("discussion-timer");
        const timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerInterval);
                classDiscussion.style.animation = "matrix-fade 0.5s ease-in-out forwards";
                setTimeout(() => {
                    classDiscussion.classList.remove("visible");
                    classDiscussion.classList.add("hidden");
                    classDiscussion.style.opacity = "0";
                    classDiscussion.style.animation = "";
                    location.reload(); // End experience
                }, 500);
            }
        }, 1000);
    }

    // Start the experience
    console.log("Starting experience...");
    setTimeout(() => {
        console.log("Loading screen timeout triggered");
        simulateLogin();
    }, 500);
});
