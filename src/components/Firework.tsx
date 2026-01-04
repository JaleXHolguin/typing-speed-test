import { type FC, useEffect, useRef } from "react";

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
	color: string;
	trail: { x: number; y: number }[];
}

interface FireworkProps {
	duration?: number;
	particlesPerBurst?: number;
	colors?: string[];
}

const Firework: FC<FireworkProps> = ({
	duration = 15000,
	particlesPerBurst = 80,
	colors = ["#ff0844", "#ffb199", "#ffd700", "#00ff88", "#00d4ff", "#a78bfa"],
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const particlesRef = useRef<Particle[]>([]);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener("resize", resize);

		const createFirework = (x: number, y: number) => {
			const burstCount = particlesPerBurst;

			for (let i = 0; i < burstCount; i++) {
				const angle = (i / burstCount) * Math.PI * 2;
				const speed = 3 + Math.random() * 4;

				particlesRef.current.push({
					x,
					y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					life: 1,
					color: colors[Math.floor(Math.random() * colors.length)],
					trail: [],
				});
			}
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particlesRef.current = particlesRef.current.filter((p) => {
				p.trail.push({ x: p.x, y: p.y });
				if (p.trail.length > 5) p.trail.shift();

				p.vy += 0.06;
				p.x += p.vx;
				p.y += p.vy;
				p.vx *= 0.985;
				p.vy *= 0.985;
				p.life -= 0.008;

				if (p.life > 0.1) {
					for (let i = 0; i < p.trail.length; i++) {
						const trailAlpha = (i / p.trail.length) * p.life * 0.4;
						if (trailAlpha > 0.01) {
							ctx.globalAlpha = trailAlpha;
							ctx.fillStyle = p.color;
							const size = 1.5 + (i / p.trail.length) * 1.5; // Partículas más pequeñas
							ctx.fillRect(p.trail[i].x, p.trail[i].y, size, size);
						}
					}
				}

				if (p.life > 0) {
					ctx.globalAlpha = p.life * 0.6;
					ctx.fillStyle = p.color;
					ctx.beginPath();
					ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
					ctx.fill();

					ctx.globalAlpha = p.life;
					ctx.beginPath();
					ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
					ctx.fill();
				}

				return p.life > 0 && p.y < canvas.height + 100;
			});

			ctx.globalAlpha = 1;

			rafRef.current = requestAnimationFrame(animate);
		};
		animate();

		const endTime = Date.now() + duration;

		const createRandomFirework = () => {
			if (Date.now() >= endTime) return;

			const x = canvas.width * (0.1 + Math.random() * 0.8);
			const y = canvas.height * (0.2 + Math.random() * 0.6);
			createFirework(x, y);

			const nextDelay = 500 + Math.random() * 500;
			setTimeout(createRandomFirework, nextDelay);
		};

		createRandomFirework();
		setTimeout(createRandomFirework, 150);
		setTimeout(createRandomFirework, 300);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			window.removeEventListener("resize", resize);
		};
	}, [duration, particlesPerBurst, colors]);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none -z-10"
		/>
	);
};

export default Firework;
