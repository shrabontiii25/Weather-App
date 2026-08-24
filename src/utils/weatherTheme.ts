export interface WeatherTheme {
  gradient: string;
  label: string;
}

const themes: Record<string, WeatherTheme> = {
  Clear: { gradient: 'linear-gradient(160deg, #FF9A44 0%, #E6483C 100%)', label: 'sunny' },
  Clouds: { gradient: 'linear-gradient(160deg, #5B86D9 0%, #2E4B9E 100%)', label: 'cloudy' },
  Rain: { gradient: 'linear-gradient(160deg, #4A7FD4 0%, #1B3A63 100%)', label: 'rainy' },
  Drizzle: { gradient: 'linear-gradient(160deg, #6FA3D8 0%, #2E5A87 100%)', label: 'drizzle' },
  Thunderstorm: { gradient: 'linear-gradient(160deg, #5A4AA0 0%, #1D1147 100%)', label: 'thunder' },
  Snow: { gradient: 'linear-gradient(160deg, #8FC1E8 0%, #3E6B9E 100%)', label: 'snow' },
  Mist: { gradient: 'linear-gradient(160deg, #8A9BA8 0%, #4E5C66 100%)', label: 'misty' },
  Fog: { gradient: 'linear-gradient(160deg, #8A9BA8 0%, #4E5C66 100%)', label: 'foggy' },
  Haze: { gradient: 'linear-gradient(160deg, #A0958A 0%, #5C544E 100%)', label: 'hazy' },
};

const nightThemes: Record<string, WeatherTheme> = {
  Clear: { gradient: 'linear-gradient(160deg, #2B3A67 0%, #0D1129 100%)', label: 'clear' },
  Clouds: { gradient: 'linear-gradient(160deg, #2E3A5C 0%, #10121F 100%)', label: 'cloudy' },
  Rain: { gradient: 'linear-gradient(160deg, #22335A 0%, #0A1526 100%)', label: 'rainy' },
  Drizzle: { gradient: 'linear-gradient(160deg, #2A3D5C 0%, #0D1A2A 100%)', label: 'drizzle' },
  Thunderstorm: { gradient: 'linear-gradient(160deg, #2E2050 0%, #0C0818 100%)', label: 'thunder' },
  Snow: { gradient: 'linear-gradient(160deg, #35507A 0%, #101E33 100%)', label: 'snow' },
  Mist: { gradient: 'linear-gradient(160deg, #3A4048 0%, #14171B 100%)', label: 'misty' },
  Fog: { gradient: 'linear-gradient(160deg, #3A4048 0%, #14171B 100%)', label: 'foggy' },
  Haze: { gradient: 'linear-gradient(160deg, #423C34 0%, #17140F 100%)', label: 'hazy' },
};

const fallbackTheme: WeatherTheme = {
  gradient: 'linear-gradient(160deg, #4A7FD4 0%, #2A4D8F 100%)',
  label: 'weather',
};

const fallbackNightTheme: WeatherTheme = {
  gradient: 'linear-gradient(160deg, #232946 0%, #0A0C18 100%)',
  label: 'weather',
};

export function getWeatherTheme(conditionMain: string | undefined, isNight = false): WeatherTheme {
  if (!conditionMain) return isNight ? fallbackNightTheme : fallbackTheme;
  const table = isNight ? nightThemes : themes;
  const fallback = isNight ? fallbackNightTheme : fallbackTheme;
  return table[conditionMain] ?? fallback;
}