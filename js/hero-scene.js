/* ========= Hero Cosmos Canvas ========= */
(function(){
    var c = document.getElementById('heroCosmosCanvas');
    if (!c) return;
    var ctx = c.getContext('2d');
    var W, H, stars = [], nebulas = [], shooters = [];

    function resize() {
        var sec = c.parentElement;
        W = c.width  = sec.clientWidth;
        H = c.height = sec.clientHeight;
    }

    function init() {
        stars = [];
        for (var i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * W, y: Math.random() * H,
                r: Math.random() * 1.3 + 0.25,
                a: Math.random() * Math.PI * 2,
                va: (Math.random() - 0.5) * 0.018,
                vx: (Math.random() - 0.5) * 0.055,
                vy: -Math.random() * 0.045 - 0.01
            });
        }
        nebulas = [
            { px:0.14, py:0.22, r:200, rgb:'237,28,36',   a:0.026, dx:0.00008,  dy:0.00005  },
            { px:0.86, py:0.42, r:240, rgb:'0,157,1',     a:0.02,  dx:-0.00005, dy:0.00009  },
            { px:0.48, py:0.82, r:170, rgb:'99,102,241',  a:0.022, dx:0.00003,  dy:-0.00006 },
            { px:0.04, py:0.62, r:150, rgb:'6,182,212',   a:0.018, dx:0.0001,   dy:0.00003  },
            { px:0.94, py:0.09, r:170, rgb:'168,85,247',  a:0.021, dx:-0.00004, dy:0.0001   }
        ];
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        /* Nebulas */
        nebulas.forEach(function(n) {
            n.px = Math.max(0.02, Math.min(0.98, n.px + n.dx));
            n.py = Math.max(0.02, Math.min(0.98, n.py + n.dy));
            if (n.px <= 0.02 || n.px >= 0.98) n.dx = -n.dx;
            if (n.py <= 0.02 || n.py >= 0.98) n.dy = -n.dy;
            var g = ctx.createRadialGradient(n.px*W, n.py*H, 0, n.px*W, n.py*H, n.r);
            g.addColorStop(0, 'rgba(' + n.rgb + ',' + n.a + ')');
            g.addColorStop(1, 'rgba(' + n.rgb + ',0)');
            ctx.beginPath(); ctx.arc(n.px*W, n.py*H, n.r, 0, Math.PI*2);
            ctx.fillStyle = g; ctx.fill();
        });

        /* Stars */
        stars.forEach(function(s) {
            s.a += s.va;
            var alpha = 0.12 + Math.abs(Math.sin(s.a)) * 0.68;
            s.x = (s.x + s.vx + W) % W;
            s.y = (s.y + s.vy + H) % H;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(255,255,255,' + alpha.toFixed(2) + ')';
            ctx.fill();
            if (s.r > 1) {
                var gw = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
                gw.addColorStop(0, 'rgba(210,225,255,' + (alpha * 0.18).toFixed(2) + ')');
                gw.addColorStop(1, 'rgba(210,225,255,0)');
                ctx.fillStyle = gw;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r*4, 0, Math.PI*2); ctx.fill();
            }
        });

        /* Shooting stars */
        if (Math.random() < 0.004) {
            shooters.push({
                x: Math.random() * W * 0.65, y: Math.random() * H * 0.38,
                vx: 5 + Math.random() * 4.5, vy: 2 + Math.random() * 2.5,
                life: 1, len: 80 + Math.random() * 65
            });
        }
        shooters = shooters.filter(function(s){ return s.life > 0; });
        shooters.forEach(function(s) {
            s.x += s.vx; s.y += s.vy; s.life -= 0.028;
            var g = ctx.createLinearGradient(s.x, s.y, s.x - s.len*0.62, s.y - s.len*0.32);
            g.addColorStop(0, 'rgba(255,255,255,' + s.life.toFixed(2) + ')');
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.beginPath(); ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x - s.len*0.62, s.y - s.len*0.32);
            ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.stroke();
        });

        requestAnimationFrame(draw);
    }

    resize(); init();
    window.addEventListener('resize', function(){ resize(); init(); });
    draw();
})();

/* ========= Hero floating badges — random wandering ========= */
(function(){
    var hero   = document.getElementById('home');
    var badges = Array.from(document.querySelectorAll('.hero-float'));
    if (!hero || !badges.length) return;

    var states = [];

    function randTarget(W, H, bW, bH) {
        return {
            x: Math.random() * Math.max(10, W - bW - 10) + 5,
            y: Math.random() * Math.max(10, H - bH - 130) + 120
        };
    }

    function init() {
        var W = hero.offsetWidth, H = hero.offsetHeight;
        states = badges.map(function(el) {
            var bW = el.offsetWidth  || 220;
            var bH = el.offsetHeight || 60;
            var p  = randTarget(W, H, bW, bH);
            var t  = randTarget(W, H, bW, bH);
            el.style.left   = p.x + 'px';
            el.style.top    = p.y + 'px';
            el.style.right  = 'auto';
            el.style.bottom = 'auto';
            return { el:el, x:p.x, y:p.y, tx:t.x, ty:t.y,
                     bW:bW, bH:bH,
                     spd: 0.004 + Math.random() * 0.005 };
        });
    }

    function tick() {
        var W = hero.offsetWidth, H = hero.offsetHeight;
        states.forEach(function(s) {
            var dx = s.tx - s.x, dy = s.ty - s.y;
            if (Math.sqrt(dx*dx + dy*dy) < 25) {
                var p = randTarget(W, H, s.bW, s.bH);
                s.tx = p.x; s.ty = p.y;
            }
            s.x += dx * s.spd;
            s.y += dy * s.spd;
            s.el.style.left = s.x + 'px';
            s.el.style.top  = s.y + 'px';
        });
        requestAnimationFrame(tick);
    }

    setTimeout(function(){ init(); tick(); }, 120);
    window.addEventListener('resize', function(){ setTimeout(init, 200); });
})();
