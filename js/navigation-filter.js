/**
 * LED Light Glow Effect
 *
 * Applies a saturated LED-style glow to the main content area that briefly
 * intensifies during page transitions, then settles to a subtle default.
 *
 * The effect combines:
 *   - A radial gradient overlay (gold/turquoise LED glow)
 *   - A CSS saturate filter on <main> for color vibrancy
 *
 * State persistence: sessionStorage
 *   - Key: "navFilterCount"
 *   - Resets when the tab/window is closed.
 *
 * Behavior:
 *   1. Page load: glow and saturation spike to peak intensity
 *   2. After 500ms: fades to subtle default
 */

const NAV_FILTER_KEY = 'navFilterCount';
const PEAK_DURATION = 300; // ms before fading to default
const DEFAULT_SATURATE = 110; // %
const DEFAULT_GLOW_OPACITY = 0.50;

const intensityPeaks = [
  { saturate: 150, glowOpacity: 0.70 },
  { saturate: 140, glowOpacity: 0.65 },
  { saturate: 130, glowOpacity: 0.60 },
  { saturate: 120, glowOpacity: 0.55 },
  { saturate: 115, glowOpacity: 0.50 },
];

function getNavigationCount() {
  const raw = sessionStorage.getItem(NAV_FILTER_KEY);
  return raw ? parseInt(raw, 10) : 0;
}

function incrementNavigationCount() {
  const current = getNavigationCount();
  const next = current + 1;
  sessionStorage.setItem(NAV_FILTER_KEY, String(next));
  return next;
}

function getIntensityPeak(count) {
  const index = Math.min(count, intensityPeaks.length) - 1;
  if (index < 0) return { saturate: 100, glowOpacity: 0 };
  return intensityPeaks[index];
}

function applyLedEffect(count) {
  const main = document.querySelector('main');
  const glow = document.querySelector('.led-glow');
  if (!main || !glow) return;

  const peak = getIntensityPeak(count);

  // Spike: high saturation + bright glow
  main.style.filter = `saturate(${peak.saturate}%)`;
  glow.style.opacity = peak.glowOpacity;

  // Fade to subtle default after transition
  setTimeout(() => {
    main.style.filter = `saturate(${DEFAULT_SATURATE}%)`;
    glow.style.opacity = DEFAULT_GLOW_OPACITY;
  }, PEAK_DURATION);
}

function initLedEffect() {
  const count = incrementNavigationCount();
  applyLedEffect(count);

  window.__navFilter = {
    count,
    peak: getIntensityPeak(count),
    defaultSaturate: DEFAULT_SATURATE,
    defaultGlowOpacity: DEFAULT_GLOW_OPACITY,
    reset() {
      sessionStorage.removeItem(NAV_FILTER_KEY);
      location.reload();
    },
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLedEffect);
} else {
  initLedEffect();
}
