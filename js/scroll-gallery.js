(function () {
  const steps = document.querySelectorAll('.scroll-step');
  const frames = document.querySelectorAll('.scroll-frame');
  const captionEl = document.getElementById('scroll-caption');
  const dots = document.querySelectorAll('.scroll-progress-dot');

  if (!steps.length || !frames.length) return;

  const openLink = document.getElementById('frame-link');

  function activate(index) {
    frames.forEach((frame) => {
      frame.classList.toggle('is-active', frame.dataset.index === index);
    });
    dots.forEach((dot) => {
      dot.classList.toggle('is-active', dot.dataset.index === index);
    });
    const step = document.querySelector(`.scroll-step[data-index="${index}"]`);
    const activeFrame = document.querySelector(`.scroll-frame[data-index="${index}"]`);
    if (captionEl && step) {
      captionEl.textContent = step.dataset.caption || '';
    }
    if (openLink && activeFrame) {
      openLink.href = activeFrame.src;
    }
  }

  frames.forEach((frame) => {
    frame.addEventListener('click', () => {
      window.open(frame.src, '_blank', 'noopener');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activate(entry.target.dataset.index);
        }
      });
    },
    { threshold: 0.55, rootMargin: '-15% 0px -35% 0px' }
  );

  steps.forEach((step) => observer.observe(step));
  activate('0');
})();
