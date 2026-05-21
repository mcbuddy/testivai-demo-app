/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  CLOUD LANE CONFIG  —  testivai.config.ts                                │
 * ├──────────────────────────────────────────────────────────────────────────┤
 * │  This file configures the cloud comparison engine (REVEAL AI).           │
 * │  It is read by playwright.config.ts / the cloud lane only.               │
 * │                                                                          │
 * │  The OSS lane (playwright.oss.config.ts) uses .testivai/config.json      │
 * │  instead — see that file for OSS-specific settings (threshold, mode).    │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
export default {
  layout: {
    sensitivity: 2, // 0-4 scale (0=strict, 4=lenient)
    tolerance: 1.0, // Pixel tolerance
  },
  ai: {
    sensitivity: 2, // 0-4 scale
    confidence: 0.7, // 0.0-1.0 (minimum confidence)
  },
  performance: {
    captureTimings: true, // Basic timing (default: ON)
    enableLighthouse: false, // Lighthouse audit (default: OFF)
  }
};
