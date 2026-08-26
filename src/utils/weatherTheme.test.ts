import { describe, expect, it } from 'vitest';
import { getWeatherTheme } from './weatherTheme';

describe('getWeatherTheme', () => {
  it('returns the bright clear-sky theme during the day', () => {
    const theme = getWeatherTheme('Clear');
    expect(theme.label).toBe('sunny');
    expect(theme.gradient).toContain('#FF9A44');
  });

  it('returns the night clear-sky theme when requested', () => {
    const theme = getWeatherTheme('Clear', true);
    expect(theme.label).toBe('clear');
    expect(theme.gradient).toContain('#2B3A67');
  });

  it('uses a stable fallback for unknown API conditions', () => {
    const theme = getWeatherTheme('Volcanic ash');
    expect(theme.label).toBe('weather');
    expect(theme.gradient).toContain('#4A7FD4');
  });
});
