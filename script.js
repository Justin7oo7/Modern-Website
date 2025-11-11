// Green Felt Billiards — script.js
// Enhances navigation, tabs/accordion, scoreboard, lightbox, carousel, reveals, and forms.
(function () {
	'use strict';

	const $ = (sel, root = document) => root.querySelector(sel);
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

	// Header nav: hamburger toggle + collapse on link click
	const navToggle = $('#navToggle');
	const siteNav = $('#siteNav');
	if (navToggle && siteNav) {
		navToggle.addEventListener('click', () => {
			const isOpen = siteNav.classList.toggle('open');
			document.body.classList.toggle('nav-open', isOpen);
			navToggle.setAttribute('aria-expanded', String(isOpen));
		});
		siteNav.addEventListener('click', (e) => {
			const link = e.target.closest('a[href^="#"]');
			if (link && siteNav.classList.contains('open')) {
				siteNav.classList.remove('open');
				document.body.classList.remove('nav-open');
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Smooth scroll enhancement for same-page links (focus target for accessibility)
	document.addEventListener('click', (e) => {
		const a = e.target.closest('a[href^="#"]');
		if (!a) return;
		const id = a.getAttribute('href');
		if (!id || id === '#') return;
		const target = document.querySelector(id);
		if (!target) return;
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		target.setAttribute('tabindex', '-1');
		target.focus({ preventScroll: true });
	});

	// Tabs (Rules & Tips)
	(function initTabs() {
		const tabs = $$('.tab');
		const panels = $$('.tab-panel');
		if (!tabs.length) return;
		function setActive(idx) {
			tabs.forEach((t, i) => {
				const active = i === idx;
				t.classList.toggle('is-active', active);
				t.setAttribute('aria-selected', String(active));
				panels[i].classList.toggle('is-active', active);
				panels[i].hidden = !active;
			});
		}
		tabs.forEach((tab, i) => {
			tab.addEventListener('click', () => setActive(i));
			tab.addEventListener('keydown', (e) => {
				if (e.key === 'ArrowRight') setActive((i + 1) % tabs.length);
				if (e.key === 'ArrowLeft') setActive((i - 1 + tabs.length) % tabs.length);
			});
		});
		setActive(0);
	})();

	// Accordion inside rules panel
	(function initAccordion() {
		$$('.acc-btn').forEach((btn) => {
			const panel = document.getElementById(btn.getAttribute('aria-controls'));
			btn.addEventListener('click', () => {
				const expanded = btn.getAttribute('aria-expanded') === 'true';
				btn.setAttribute('aria-expanded', String(!expanded));
				panel.classList.toggle('open', !expanded);
				panel.hidden = expanded ? true : false;
			});
			// Initialize closed
			btn.setAttribute('aria-expanded', 'false');
			panel.hidden = true;
		});
	})();

	// Scoreboard
	(function initScoreboard() {
		const scoreA = $('#scoreA'), scoreB = $('#scoreB');
		const select = $('#playerName');
		const incA = $('[data-action="incA"]'), decA = $('[data-action="decA"]');
		const incB = $('[data-action="incB"]'), decB = $('[data-action="decB"]');
		const reset = $('#resetScore'), swap = $('#swapPlayers');
		let a = 0, b = 0;
		function render() { scoreA.textContent = String(a); scoreB.textContent = String(b); }
		function clamp(n) { return Math.max(0, n); }
		if (incA) incA.addEventListener('click', () => { a++; render(); });
		if (decA) decA.addEventListener('click', () => { a = clamp(a - 1); render(); });
		if (incB) incB.addEventListener('click', () => { b++; render(); });
		if (decB) decB.addEventListener('click', () => { b = clamp(b - 1); render(); });
		if (reset) reset.addEventListener('click', () => { a = 0; b = 0; render(); });
		if (swap) swap.addEventListener('click', () => {
			[a, b] = [b, a];
			// swap labels visually by flipping select value (cosmetic)
			if (select) select.selectedIndex = select.selectedIndex === 0 ? 1 : 0;
			render();
		});
		render();
	})();

	// Gallery lightbox
	(function initLightbox() {
		const links = $$('[data-lightbox]');
		const lightbox = $('#lightbox');
		const lightboxImg = $('#lightboxImg');
		const lightboxClose = $('#lightboxClose');
		if (!links.length || !lightbox || !lightboxImg) return;
		function open(src, alt) {
			lightboxImg.src = src;
			lightboxImg.alt = alt || 'Image preview';
			lightbox.hidden = false;
			lightboxClose?.focus();
			document.addEventListener('keydown', onEsc);
		}
		function close() {
			lightbox.hidden = true;
			lightboxImg.removeAttribute('src');
			document.removeEventListener('keydown', onEsc);
		}
		function onEsc(e) { if (e.key === 'Escape') close(); }
		links.forEach((a) => {
			a.addEventListener('click', (e) => {
				e.preventDefault();
				const img = a.querySelector('img');
				open(a.getAttribute('href'), img?.getAttribute('alt') || '');
			});
		});
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox) close();
		});
		lightboxClose?.addEventListener('click', close);
	})();

	// Testimonials carousel
	(function initCarousel() {
		const track = $('#carouselTrack');
		const prev = $('#prevSlide');
		const next = $('#nextSlide');
		if (!track) return;
		const slides = $$('.testimonial', track);
		let index = 0, timer = null;
		function show(i) {
			index = (i + slides.length) % slides.length;
			track.style.transform = `translateX(-${index * 100}%)`;
		}
		function startAuto() { stopAuto(); timer = setInterval(() => show(index + 1), 5000); }
		function stopAuto() { if (timer) clearInterval(timer); }
		prev?.addEventListener('click', () => { show(index - 1); startAuto(); });
		next?.addEventListener('click', () => { show(index + 1); startAuto(); });
		track.addEventListener('pointerdown', stopAuto);
		track.addEventListener('pointerup', startAuto);
		show(0); startAuto();
	})();

	// Reveal on scroll
	(function initReveal() {
		const els = $$('.reveal');
		if (!('IntersectionObserver' in window) || !els.length) {
			els.forEach(el => el.classList.add('in-view'));
			return;
		}
		const io = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.15 });
		els.forEach(el => io.observe(el));
	})();

	// Forms: Booking + Newsletter validation
	function setFieldError(input, message) {
		const error = input.closest('label')?.querySelector('.error') || input.parentElement?.querySelector('.error');
		if (error) error.textContent = message || '';
		input.setAttribute('aria-invalid', message ? 'true' : 'false');
	}
	function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }

	// Booking form
	(function initBookingForm() {
		const form = $('#bookingForm');
		const status = $('#bookingStatus');
		if (!form) return;
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			let valid = true;
			const name = form.elements.namedItem('name');
			const email = form.elements.namedItem('email');
			const date = form.elements.namedItem('date');
			const time = form.elements.namedItem('time');
			const players = form.elements.namedItem('players');

			// Name
			if (name && name.value.trim().length < 2) { valid = false; setFieldError(name, 'Please enter your full name.'); } else if (name) setFieldError(name, '');
			// Email
			if (email && !validateEmail(email.value)) { valid = false; setFieldError(email, 'Enter a valid email.'); } else if (email) setFieldError(email, '');
			// Date
			if (date && !date.value) { valid = false; setFieldError(date, 'Select a date.'); } else if (date) setFieldError(date, '');
			// Time
			if (time && !time.value) { valid = false; setFieldError(time, 'Select a time.'); } else if (time) setFieldError(time, '');
			// Players
			const num = players ? Number(players.value) : 0;
			if (!num || num < 1 || num > 8) { valid = false; setFieldError(players, 'Players must be 1–8.'); } else if (players) setFieldError(players, '');

			if (!valid) { status.textContent = 'Please fix the highlighted fields.'; status.style.color = '#a23333'; return; }
			status.textContent = 'Thanks! We received your request. We will confirm via email.';
			status.style.color = 'var(--green)';
			form.reset();
		});
	})();

	// Newsletter
	(function initNewsletter() {
		const form = $('#newsletterForm');
		const email = $('#newsletterEmail');
		const status = $('#newsletterStatus');
		if (!form || !email) return;
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!validateEmail(email.value)) {
				status.textContent = 'Enter a valid email to subscribe.';
				status.style.color = '#ffd1d1';
				email.focus();
				return;
			}
			status.textContent = 'Subscribed! Welcome to the club.';
			status.style.color = '#dfe8e2';
			form.reset();
		});
	})();

	// Current year
	(function setYear() {
		const year = $('#year');
		if (year) year.textContent = String(new Date().getFullYear());
	})();
})();


