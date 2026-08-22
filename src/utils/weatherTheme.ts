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

const fallbackTheme: WeatherTheme = {
  gradient: 'linear-gradient(160deg, #4A7FD4 0%, #2A4D8F 100%)',
  label: 'weather',
};

export function getWeatherTheme(conditionMain: string | undefined): WeatherTheme {
  if (!conditionMain) return fallbackTheme;
  return themes[conditionMain] ?? fallbackTheme;
}