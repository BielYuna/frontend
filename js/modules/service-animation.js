const animationFilePath = 'itens/Isometric data analysis.json';
let animationInstance = null;

function getBackgroundEl() {
  return document.getElementById('service-animation-bg');
}

function getAnimationContainer() {
  return document.getElementById('service-animation');
}

function ensureAnimationLoaded() {
  const container = getAnimationContainer();
  if (!container) return;
  if (animationInstance) return;
  if (!window.lottie || typeof window.lottie.loadAnimation !== 'function') return;

  animationInstance = window.lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: encodeURI(animationFilePath)
  });
}

function setBackgroundVisible(visible) {
  const background = getBackgroundEl();
  if (!background) return;

  background.classList.toggle('is-visible', visible);
  background.setAttribute('aria-hidden', visible ? 'false' : 'true');
}

export function handlePanelChange(panelId) {
  const isService = panelId !== 'welcome';
  setBackgroundVisible(isService);

  if (isService) {
    ensureAnimationLoaded();
  }
}

export function initServiceAnimation() {
  setBackgroundVisible(false);
}
