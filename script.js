const glow = document.querySelector('.cursor-glow');
const cherries = [...document.querySelectorAll('.cherry')];

window.addEventListener('mousemove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;

  cherries.forEach((cherry, i) => {
    const strength = 5 + (i % 3) * 3;
    const x = (e.clientX / window.innerWidth - 0.5) * strength;
    const y = (e.clientY / window.innerHeight - 0.5) * strength;
    cherry.style.transform = `translate(${x}px, ${y}px) rotate(${x * 1.2}deg)`;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
  menuBtn.textContent = navLinks.classList.contains('mobile-open') ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    menuBtn.textContent = '☰';
  });
});

document.querySelectorAll('.skill-card, .project, .hero-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (window.innerWidth > 850 && card.classList.contains('hero-card')) {
      card.style.transform = `rotate(1.4deg) perspective(900px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    if (card.classList.contains('hero-card')) card.style.transform = 'rotate(1.4deg)';
  });
});







/* ============================================================
   CHARVY — STABLE PROJECT INTERACTIONS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       RC CAR
       ======================================================== */

    const rcArea = document.querySelector("[data-rc-car]");
    const car = rcArea?.querySelector("[data-real-car]");

    if (rcArea && car) {

        let moving = false;

        const drive = () => {

            if (moving) return;

            moving = true;

            /*
             * The car NEVER leaves its project card.
             * We calculate a curved path using percentages.
             */

            const path = [
                { x: 0,   y: 0,   r: 0 },
                { x: -55, y: -25, r: -22 },
                { x: -75, y: 35,  r: 65 },
                { x: -20, y: 65,  r: 110 },
                { x: 55,  y: 40,  r: 160 },
                { x: 72,  y: -25, r: 210 },
                { x: 25,  y: -65, r: 260 },
                { x: -35, y: -45, r: 315 },
                { x: 0,   y: 0,   r: 360 }
            ];

            let index = 0;

            const moveNext = () => {

                if (index >= path.length) {

                    // EXACT ORIGINAL POSITION.
                    car.style.transition =
                        "transform 450ms cubic-bezier(.22,.8,.25,1)";

                    car.style.transform =
                        "translate3d(0,0,0) rotate(0deg)";

                    setTimeout(() => {
                        car.style.transition = "";
                        moving = false;
                    }, 500);

                    return;
                }

                const p = path[index];

                car.style.transition =
                    "transform 520ms cubic-bezier(.45,.05,.35,1)";

                car.style.transform =
                    `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.r}deg)`;

                /*
                 * Tiny trace appears underneath the car.
                 * It stays inside the project card.
                 */
                createTrace(p.x, p.y);

                index++;

                setTimeout(moveNext, 540);
            };

            moveNext();
        };

        const createTrace = (x, y) => {

            const trace = document.createElement("span");

            trace.className = "rc-trace";

            trace.style.position = "absolute";
            trace.style.left = "calc(50% + " + x + "px)";
            trace.style.top = "calc(50% + " + y + "px)";
            trace.style.transform = "translate(-50%,-50%)";

            rcArea.appendChild(trace);

            setTimeout(() => {
                trace.remove();
            }, 750);
        };

        rcArea.addEventListener("click", drive);

        const hint = rcArea.querySelector(".animation-hint");

        if (hint) {
            hint.addEventListener("click", e => {
                e.stopPropagation();
                drive();
            });
        }
    }


    /* ========================================================
       FACTORY — RODS COME OUT BUT STAY INSIDE CARD
       ======================================================== */

    document.querySelectorAll(".steel-visual").forEach(factory => {

        if (factory.dataset.ready === "yes") return;

        factory.dataset.ready = "yes";

        factory.addEventListener("click", () => {

            factory.classList.remove("steel-active");

            void factory.offsetWidth;

            factory.classList.add("steel-active");

            setTimeout(() => {
                factory.classList.remove("steel-active");
            }, 2300);
        });
    });

});



/* ============================================================
   🚗 RC CAR — ACTUAL VISIBLE CAR ANIMATION
   ============================================================ */

(function () {

    const area =
        document.querySelector('[data-rc-clean]');

    if (!area) {
        console.log('RC area not found');
        return;
    }


    const car =
        area.querySelector('[data-clean-car]');


    if (!car) {
        console.log('RC car not found');
        return;
    }


    /*
     * Prevent another listener from starting
     * another animation.
     */
    let moving = false;


    /*
     * The car starts at CENTER.
     *
     * It goes mainly horizontally.
     *
     * There is NO 360° rotation.
     */
    const route = [

        { x: 0,    y: 0,   angle: 0 },

        { x: -45,  y: -4,  angle: -2 },

        { x: -90,  y: -2,  angle: 0 },

        { x: -130, y: 7,   angle: 3 },

        { x: -105, y: 20,  angle: 5 },

        { x: -55,  y: 27,  angle: 4 },

        { x: 5,    y: 25,  angle: 1 },

        { x: 65,   y: 16,  angle: -2 },

        { x: 110,  y: 3,   angle: -4 },

        { x: 128,  y: -12, angle: -2 },

        { x: 105,  y: -25, angle: 2 },

        { x: 65,   y: -29, angle: 3 },

        { x: 20,   y: -22, angle: 2 },

        { x: 0,    y: 0,   angle: 0 }

    ];


    function createSmoke(x, y) {

        const smoke =
            document.createElement('span');

        smoke.className =
            'car-smoke-real';


        smoke.style.left =
            `calc(50% + ${x - 22}px)`;


        smoke.style.top =
            `calc(50% + ${y + 7}px)`;


        area.appendChild(smoke);


        setTimeout(() => {

            smoke.remove();

        }, 950);

    }


    function drive() {

        if (moving) return;

        moving = true;


        /*
         * Reset car before beginning.
         */
        car.style.setProperty(
            'left',
            '50%',
            'important'
        );

        car.style.setProperty(
            'top',
            '50%',
            'important'
        );

        car.style.setProperty(
            'transform',
            'translate(-50%, -50%) rotate(0deg)',
            'important'
        );


        let step = 1;


        function nextStep() {

            if (step >= route.length) {

                /*
                 * Exact original parking position.
                 */
                car.style.setProperty(
                    'left',
                    '50%',
                    'important'
                );

                car.style.setProperty(
                    'top',
                    '50%',
                    'important'
                );

                car.style.setProperty(
                    'transform',
                    'translate(-50%, -50%) rotate(0deg)',
                    'important'
                );


                setTimeout(() => {

                    moving = false;

                }, 600);


                return;
            }


            const p = route[step];


            /*
             * REAL POSITION CHANGE.
             *
             * We use left/top, not just transform.
             */
            car.style.setProperty(
                'transition',
                'left 0.52s cubic-bezier(.45,.05,.35,1), ' +
                'top 0.52s cubic-bezier(.45,.05,.35,1), ' +
                'transform 0.52s ease',
                'important'
            );


            car.style.setProperty(
                'left',
                `calc(50% + ${p.x}px)`,
                'important'
            );


            car.style.setProperty(
                'top',
                `calc(50% + ${p.y}px)`,
                'important'
            );


            /*
             * Only tiny steering angles.
             * NEVER upside down.
             */
            car.style.setProperty(
                'transform',
                `translate(-50%, -50%) rotate(${p.angle}deg)`,
                'important'
            );


            /*
             * Smoke behind car.
             */
            createSmoke(p.x, p.y);


            if (step % 2 === 0) {

                setTimeout(() => {

                    createSmoke(
                        p.x - 8,
                        p.y + 5
                    );

                }, 180);

            }


            step++;

            setTimeout(
                nextStep,
                550
            );

        }


        nextStep();

    }


    /*
     * Clicking the visual OR TAP button starts it.
     */
    area.addEventListener(
        'click',
        drive
    );


    const button =
        area.querySelector('[data-car-button]');


    if (button) {

        button.addEventListener(
            'click',
            (event) => {

                event.stopPropagation();

                drive();

            }
        );

    }


    console.log('🚗 RC CAR READY');

})();


/* ============================================================
   🖨️ 3D PRINTER — CUTE CHERRY
   ============================================================ */

(function () {

    const printer =
        document.querySelector('[data-printer]');


    if (!printer) return;


    let printing = false;


    printer.addEventListener(
        'click',
        () => {

            if (printing) return;

            printing = true;


            printer.classList.remove(
                'printing'
            );


            void printer.offsetWidth;


            printer.classList.add(
                'printing'
            );


            const status =
                printer.querySelector(
                    '[data-print-status]'
                );


            if (status) {

                status.textContent =
                    'PRINTING ✦';

            }


            setTimeout(() => {

                if (status) {

                    status.textContent =
                        'PRINTING · 60%';

                }

            }, 450);


            setTimeout(() => {

                if (status) {

                    status.textContent =
                        'PRINT COMPLETE ✦';

                }

            }, 1000);


            setTimeout(() => {

                printer.classList.remove(
                    'printing'
                );


                if (status) {

                    status.textContent =
                        'TAP TO PRINT';

                }


                printing = false;

            }, 2600);

        }
    );

})();



/* ============================================================
   CYBERSECURITY — REPLACE OLD VISUAL COMPLETELY
   ============================================================ */

(function () {

    const cyber =
        document.querySelector('.cyber-project');

    if (!cyber) {
        console.log('Cyber project not found');
        return;
    }


    const visual =
        cyber.querySelector('.project-visual');

    if (!visual) {
        console.log('Cyber project visual not found');
        return;
    }


    /*
     * Completely remove the old visual.
     *
     * This is the important part:
     * we are NOT trying to style the old shield/oval.
     * We replace it.
     */
    visual.innerHTML = `

        <div class="cyber-radar-new">

            <div class="r-ring r1"></div>
            <div class="r-ring r2"></div>
            <div class="r-ring r3"></div>

            <div class="r-horizontal"></div>
            <div class="r-vertical"></div>

            <div class="r-sweep"></div>

            <span class="r-threat rt1"></span>
            <span class="r-threat rt2"></span>
            <span class="r-threat rt3"></span>

            <div class="r-core">
                <i></i>
            </div>

        </div>

        <div class="cyber-radar-status">
            <strong>LIVE SCAN</strong>
            <span>THREAT MONITOR</span>
        </div>

        <span class="cyber-corner cc1"></span>
        <span class="cyber-corner cc2"></span>

    `;


    console.log('🛡️ New cybersecurity radar installed');

})();


/* ============================================================
   LEADERSHIP — DEFINITIVE 5 CARD SLIDER
   ============================================================ */

(function () {

    const section =
        document.querySelector('[data-leadership]');

    if (!section) {
        console.log('Leadership section not found');
        return;
    }


    /*
     * Find the actual five cards.
     */
    const cards =
        Array.from(
            section.querySelectorAll('.lead-card')
        );


    if (!cards.length) {
        console.log('No leadership cards found');
        return;
    }


    /*
     * Find arrows.
     */
    let previous =
        section.querySelector('[data-lead-prev]');

    let next =
        section.querySelector('[data-lead-next]');

    let counter =
        section.querySelector('[data-lead-count]');


    /*
     * If the old buttons have broken listeners,
     * clone them. This removes ALL old click handlers
     * without touching their appearance.
     */
    if (previous) {

        const fresh =
            previous.cloneNode(true);

        previous.parentNode.replaceChild(
            fresh,
            previous
        );

        previous = fresh;

    }


    if (next) {

        const fresh =
            next.cloneNode(true);

        next.parentNode.replaceChild(
            fresh,
            next
        );

        next = fresh;

    }


    /*
     * Current slide.
     */
    let current = 0;

    let locked = false;


    /*
     * Set up every card.
     *
     * We do NOT depend on the previous CSS.
     * JavaScript directly controls each card.
     */
    function setupCards() {

        cards.forEach((card, index) => {

            card.style.position = 'absolute';
            card.style.left = '0';
            card.style.top = '0';
            card.style.width = '100%';

            card.style.transition =
                'transform .55s cubic-bezier(.22,.75,.25,1), opacity .45s ease';

            if (index === current) {

                card.style.transform =
                    'translateX(0)';

                card.style.opacity = '1';

                card.style.pointerEvents =
                    'auto';

                card.classList.add(
                    'lead-current'
                );

                card.classList.remove(
                    'lead-hidden'
                );

            } else {

                card.style.transform =
                    'translateX(100%)';

                card.style.opacity =
                    '0';

                card.style.pointerEvents =
                    'none';

                card.classList.remove(
                    'lead-current'
                );

                card.classList.add(
                    'lead-hidden'
                );

            }

            card.style.zIndex =
                index === current ? '5' : '1';

        });


        /*
         * Make the section tall enough for the
         * current card.
         */
        const active =
            cards[current];

        if (active) {

            section.style.minHeight =
                active.offsetHeight + 'px';

        }

    }


    function updateCounter() {

        if (!counter) return;

        counter.textContent =
            String(current + 1).padStart(2, '0')
            + ' / '
            + String(cards.length).padStart(2, '0');

    }


    /*
     * GO TO SLIDE
     */
    function goTo(target, direction) {

        if (locked) return;

        if (target === current) return;


        locked = true;


        const oldCard =
            cards[current];

        const newCard =
            cards[target];


        /*
         * Put new card outside the screen
         * before animation.
         */
        newCard.style.transition = 'none';

        newCard.style.transform =
            direction > 0
                ? 'translateX(100%)'
                : 'translateX(-100%)';

        newCard.style.opacity = '0';

        newCard.style.zIndex = '10';

        newCard.style.pointerEvents =
            'auto';


        /*
         * Force browser to register
         * the starting position.
         */
        void newCard.offsetWidth;


        /*
         * Turn animation back on.
         */
        newCard.style.transition =
            'transform .55s cubic-bezier(.22,.75,.25,1), opacity .45s ease';


        oldCard.style.transition =
            'transform .55s cubic-bezier(.22,.75,.25,1), opacity .45s ease';


        /*
         * OLD card leaves.
         */
        oldCard.style.transform =
            direction > 0
                ? 'translateX(-100%)'
                : 'translateX(100%)';

        oldCard.style.opacity = '0';

        oldCard.style.pointerEvents =
            'none';

        oldCard.style.zIndex = '1';


        /*
         * NEW card enters.
         */
        newCard.style.transform =
            'translateX(0)';

        newCard.style.opacity =
            '1';

        newCard.style.zIndex =
            '5';


        oldCard.classList.remove(
            'lead-current'
        );

        oldCard.classList.add(
            'lead-hidden'
        );


        newCard.classList.add(
            'lead-current'
        );

        newCard.classList.remove(
            'lead-hidden'
        );


        current = target;


        updateCounter();


        /*
         * Unlock after animation.
         */
        setTimeout(() => {

            locked = false;

            /*
             * Keep inactive cards outside.
             */
            cards.forEach((card, i) => {

                if (i !== current) {

                    card.style.pointerEvents =
                        'none';

                }

            });

        }, 600);

    }


    function nextSlide() {

        const target =
            (current + 1) % cards.length;

        goTo(target, 1);

    }


    function previousSlide() {

        const target =
            (current - 1 + cards.length)
            % cards.length;

        goTo(target, -1);

    }


    /*
     * ARROW BUTTONS
     */
    if (previous) {

        previous.addEventListener(
            'click',
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                previousSlide();

            }
        );

    }


    if (next) {

        next.addEventListener(
            'click',
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                nextSlide();

            }
        );

    }


    /*
     * --------------------------------------------------------
     * SWIPE / DRAG
     * --------------------------------------------------------
     */

    let startX = 0;
    let startY = 0;
    let dragging = false;


    section.addEventListener(
        'touchstart',
        function (event) {

            const touch =
                event.touches[0];

            startX = touch.clientX;
            startY = touch.clientY;

            dragging = true;

        },
        { passive: true }
    );


    section.addEventListener(
        'touchend',
        function (event) {

            if (!dragging) return;

            dragging = false;

            const touch =
                event.changedTouches[0];

            const dx =
                touch.clientX - startX;

            const dy =
                touch.clientY - startY;


            /*
             * Ignore vertical scrolling.
             */
            if (Math.abs(dx) < 50) return;

            if (Math.abs(dx) < Math.abs(dy)) {
                return;
            }


            if (dx < 0) {

                nextSlide();

            } else {

                previousSlide();

            }

        },
        { passive: true }
    );


    /*
     * Desktop mouse drag.
     */
    let mouseStart = 0;
    let mouseDragging = false;


    section.addEventListener(
        'mousedown',
        function (event) {

            /*
             * Don't treat clicking the arrows
             * as dragging.
             */
            if (
                event.target.closest(
                    '[data-lead-prev], [data-lead-next]'
                )
            ) {
                return;
            }

            mouseStart =
                event.clientX;

            mouseDragging = true;

        }
    );


    section.addEventListener(
        'mouseup',
        function (event) {

            if (!mouseDragging) return;

            mouseDragging = false;

            const dx =
                event.clientX - mouseStart;


            if (Math.abs(dx) < 60) {
                return;
            }


            if (dx < 0) {

                nextSlide();

            } else {

                previousSlide();

            }

        }
    );


    /*
     * Keyboard arrows when section is focused.
     */
    section.setAttribute(
        'tabindex',
        '0'
    );


    section.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'ArrowRight') {

                event.preventDefault();

                nextSlide();

            }

            if (event.key === 'ArrowLeft') {

                event.preventDefault();

                previousSlide();

            }

        }
    );


    /*
     * INITIALIZE
     */
    setupCards();
    updateCounter();


    console.log(
        '✦ Leadership slider ready:',
        cards.length,
        'slides'
    );

})();



/* ============================================================
   CHARVY — DEFINITIVE LEADERSHIP CAROUSEL
   Uses the EXACT HTML currently in index.html.
   ============================================================ */

(function () {

    const leadership =
        document.getElementById('leadership');

    if (!leadership) {
        console.log('❌ Leadership section not found');
        return;
    }


    const carousel =
        leadership.querySelector('.leadership-carousel');


    const cards =
        Array.from(
            leadership.querySelectorAll(
                '.lead-card'
            )
        );


    if (!carousel || cards.length !== 5) {

        console.log(
            '❌ Leadership carousel expected 5 cards, found:',
            cards.length
        );

        return;
    }


    /*
     * IMPORTANT:
     *
     * Replace the existing buttons with fresh buttons.
     *
     * This removes every old click listener attached
     * by previous slider versions.
     */

    let oldPrev =
        leadership.querySelector('[data-lead-prev]');

    let oldNext =
        leadership.querySelector('[data-lead-next]');


    let prev =
        oldPrev.cloneNode(true);

    let next =
        oldNext.cloneNode(true);


    oldPrev.replaceWith(prev);
    oldNext.replaceWith(next);


    const counter =
        leadership.querySelector('[data-lead-count]');


    /*
     * Current slide.
     */
    let current = 0;


    /*
     * Animation lock.
     */
    let changing = false;


    /*
     * Put cards into their initial positions.
     */
    function initialise() {

        carousel.style.position =
            'relative';

        carousel.style.overflow =
            'hidden';


        cards.forEach((card, index) => {

            card.classList.remove(
                'lead-active',
                'lead-current',
                'charvy-slide-active'
            );


            card.style.position =
                'absolute';

            card.style.left =
                '0';

            card.style.top =
                '0';

            card.style.width =
                '100%';

            card.style.opacity =
                index === 0 ? '1' : '0';

            card.style.transform =
                index === 0
                    ? 'translateX(0)'
                    : 'translateX(100%)';

            card.style.pointerEvents =
                index === 0 ? 'auto' : 'none';

            card.style.zIndex =
                index === 0 ? '5' : '1';


            if (index === 0) {

                card.classList.add(
                    'charvy-slide-active'
                );

            }

        });


        updateCounter();

    }


    /*
     * Counter:
     *
     * 01 / 05
     * 02 / 05
     * etc.
     */
    function updateCounter() {

        if (!counter) return;

        counter.textContent =
            String(current + 1)
            .padStart(2, '0');

    }


    /*
     * GO TO A SPECIFIC CARD
     */
    function goTo(target, direction) {

        if (changing) return;

        if (target === current) return;


        changing = true;


        const oldCard =
            cards[current];

        const newCard =
            cards[target];


        /*
         * Put new card just outside the viewport.
         */
        newCard.style.transition =
            'none';

        newCard.style.opacity =
            '0';

        newCard.style.transform =
            direction > 0
                ? 'translateX(100%)'
                : 'translateX(-100%)';

        newCard.style.pointerEvents =
            'auto';

        newCard.style.zIndex =
            '10';


        /*
         * Force browser to register
         * the starting position.
         */
        void newCard.offsetWidth;


        /*
         * Turn transition back on.
         */
        newCard.style.transition =
            'transform .5s cubic-bezier(.22,.75,.25,1), opacity .35s ease';

        oldCard.style.transition =
            'transform .5s cubic-bezier(.22,.75,.25,1), opacity .35s ease';


        /*
         * OLD CARD LEAVES.
         */
        oldCard.style.transform =
            direction > 0
                ? 'translateX(-100%)'
                : 'translateX(100%)';

        oldCard.style.opacity =
            '0';

        oldCard.style.pointerEvents =
            'none';

        oldCard.style.zIndex =
            '1';


        /*
         * NEW CARD ENTERS.
         */
        newCard.style.transform =
            'translateX(0)';

        newCard.style.opacity =
            '1';

        newCard.style.pointerEvents =
            'auto';

        newCard.style.zIndex =
            '10';


        oldCard.classList.remove(
            'charvy-slide-active'
        );


        newCard.classList.add(
            'charvy-slide-active'
        );


        current = target;

        updateCounter();


        /*
         * Finish.
         */
        setTimeout(() => {

            cards.forEach((card, index) => {

                if (index !== current) {

                    card.style.pointerEvents =
                        'none';

                    card.style.zIndex =
                        '1';

                }

            });


            changing = false;

        }, 550);

    }


    /*
     * NEXT
     */
    function nextSlide(event) {

        if (event) {

            event.preventDefault();
            event.stopPropagation();

        }


        const target =
            (current + 1) % cards.length;


        goTo(target, 1);

    }


    /*
     * PREVIOUS
     */
    function previousSlide(event) {

        if (event) {

            event.preventDefault();
            event.stopPropagation();

        }


        const target =
            (current - 1 + cards.length)
            % cards.length;


        goTo(target, -1);

    }


    /*
     * THESE ARE THE NEW, CLEAN BUTTON LISTENERS.
     */
    prev.addEventListener(
        'click',
        previousSlide
    );


    next.addEventListener(
        'click',
        nextSlide
    );


    /*
     * --------------------------------------------------------
     * TOUCH SWIPE
     * --------------------------------------------------------
     */

    let touchStartX = 0;
    let touchStartY = 0;


    carousel.addEventListener(
        'touchstart',
        function (event) {

            const touch =
                event.touches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

        },
        { passive: true }
    );


    carousel.addEventListener(
        'touchend',
        function (event) {

            const touch =
                event.changedTouches[0];

            const dx =
                touch.clientX - touchStartX;

            const dy =
                touch.clientY - touchStartY;


            if (Math.abs(dx) < 50) return;

            if (Math.abs(dx) < Math.abs(dy)) {
                return;
            }


            if (dx < 0) {

                nextSlide();

            } else {

                previousSlide();

            }

        },
        { passive: true }
    );


    /*
     * --------------------------------------------------------
     * MOUSE DRAG
     * --------------------------------------------------------
     */

    let mouseStartX = 0;
    let mouseDown = false;


    carousel.addEventListener(
        'mousedown',
        function (event) {

            mouseStartX =
                event.clientX;

            mouseDown = true;

        }
    );


    window.addEventListener(
        'mouseup',
        function (event) {

            if (!mouseDown) return;

            mouseDown = false;


            const dx =
                event.clientX - mouseStartX;


            if (Math.abs(dx) < 50) return;


            if (dx < 0) {

                nextSlide();

            } else {

                previousSlide();

            }

        }
    );


    /*
     * --------------------------------------------------------
     * KEYBOARD
     * --------------------------------------------------------
     */

    leadership.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'ArrowRight') {

                event.preventDefault();

                nextSlide();

            }


            if (event.key === 'ArrowLeft') {

                event.preventDefault();

                previousSlide();

            }

        }
    );


    leadership.setAttribute(
        'tabindex',
        '0'
    );


    /*
     * INITIALIZE
     */
    initialise();


    console.log(
        '🍒 CHARVY LEADERSHIP SLIDER READY — 5 CARDS'
    );

})();

