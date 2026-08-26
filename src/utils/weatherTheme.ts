export interface WeatherTheme {
  gradient: string;
  label: string;
  surface: string;
  surfaceMuted: string;
  surfaceStrong: string;
  text: string;
  mutedText: string;
  accent: string;
  handle: string;
}

const themes: Record<string, WeatherTheme> = {
  Clear: {
    gradient: 'linear-gradient(160deg, #ff9d19 0%, #ff4d22 100%)',
    label: 'sunny',
    surface: '#fff9f3',
    surfaceMuted: '#ffebd6',
    surfaceStrong: '#ff7a20',
    text: '#3e230d',
    mutedText: '#86543a',
    accent: '#f35422',
    handle: '#ffd0a9',
  },
  Clouds: {
    gradient: 'linear-gradient(160deg, #3f83f8 0%, #2450b8 100%)',
    label: 'cloudy',
    surface: '#f5f8ff',
    surfaceMuted: '#dce9ff',
    surfaceStrong: '#3974e8',
    text: '#14274d',
    mutedText: '#5d7098',
    accent: '#2c65d7',
    handle: '#b8d1ff',
  },
  Rain: {
    gradient: 'linear-gradient(160deg, #416fc4 0%, #112e59 100%)',
    label: 'rainy',
    surface: '#f3f7fc',
    surfaceMuted: '#d9e5f4',
    surfaceStrong: '#376bb8',
    text: '#142846',
    mutedText: '#607895',
    accent: '#23569a',
    handle: '#b9cde5',
  },
  Drizzle: {
    gradient: 'linear-gradient(160deg, #5f9bd5 0%, #28547f 100%)',
    label: 'drizzle',
    surface: '#f3f8fc',
    surfaceMuted: '#d8eaf6',
    surfaceStrong: '#4b87bf',
    text: '#15304a',
    mutedText: '#5b7890',
    accent: '#3977ae',
    handle: '#b6d8eb',
  },
  Thunderstorm: {
    gradient: 'linear-gradient(160deg, #51449c 0%, #171035 100%)',
    label: 'thunderstorm',
    surface: '#f8f6ff',
    surfaceMuted: '#e7e1fa',
    surfaceStrong: '#5944a6',
    text: '#281d4c',
    mutedText: '#74699a',
    accent: '#49328f',
    handle: '#cfc4ef',
  },
  Snow: {
    gradient: 'linear-gradient(160deg, #81bde6 0%, #3a6598 100%)',
    label: 'snowy',
    surface: '#f6fbff',
    surfaceMuted: '#dceef9',
    surfaceStrong: '#5b9ecc',
    text: '#173652',
    mutedText: '#5a7892',
    accent: '#367aa9',
    handle: '#c2e0f2',
  },
  Mist: {
    gradient: 'linear-gradient(160deg, #98aab7 0%, #596b77 100%)',
    label: 'misty',
    surface: '#f7f9fa',
    surfaceMuted: '#e2e8eb',
    surfaceStrong: '#7d939f',
    text: '#263842',
    mutedText: '#677b85',
    accent: '#617985',
    handle: '#cdd7db',
  },
  Fog: {
    gradient: 'linear-gradient(160deg, #98aab7 0%, #596b77 100%)',
    label: 'foggy',
    surface: '#f7f9fa',
    surfaceMuted: '#e2e8eb',
    surfaceStrong: '#7d939f',
    text: '#263842',
    mutedText: '#677b85',
    accent: '#617985',
    handle: '#cdd7db',
  },
  Haze: {
    gradient: 'linear-gradient(160deg, #aa9d8c 0%, #62584e 100%)',
    label: 'hazy',
    surface: '#fcfaf7',
    surfaceMuted: '#eee8df',
    surfaceStrong: '#9b8d7c',
    text: '#40372e',
    mutedText: '#7d7166',
    accent: '#786b5e',
    handle: '#d8cfc4',
  },
};

const nightThemes: Record<string, WeatherTheme> = {
  Clear: {
    gradient: 'linear-gradient(160deg, #244889 0%, #090d25 100%)',
    label: 'clear night',
    surface: '#f5f7ff',
    surfaceMuted: '#e0e7fb',
    surfaceStrong: '#2c579d',
    text: '#17213e',
    mutedText: '#637095',
    accent: '#224889',
    handle: '#c5d2f2',
  },
  Clouds: {
    gradient: 'linear-gradient(160deg, #31476f 0%, #101525 100%)',
    label: 'cloudy night',
    surface: '#f5f7fa',
    surfaceMuted: '#e0e7ee',
    surfaceStrong: '#3e587f',
    text: '#1d2b40',
    mutedText: '#68788e',
    accent: '#314d73',
    handle: '#cbd6e1',
  },
  Rain: {
    gradient: 'linear-gradient(160deg, #244671 0%, #081326 100%)',
    label: 'rainy night',
    surface: '#f3f7fc',
    surfaceMuted: '#dce7f3',
    surfaceStrong: '#28557f',
    text: '#132b49',
    mutedText: '#5f7794',
    accent: '#19456f',
    handle: '#bfd2e5',
  },
  Drizzle: {
    gradient: 'linear-gradient(160deg, #2d4c6d 0%, #0a1726 100%)',
    label: 'drizzly night',
    surface: '#f3f7fa',
    surfaceMuted: '#dce7ed',
    surfaceStrong: '#3c6389',
    text: '#193047',
    mutedText: '#60778c',
    accent: '#28567d',
    handle: '#c1d2de',
  },
  Thunderstorm: {
    gradient: 'linear-gradient(160deg, #35265d 0%, #0a0719 100%)',
    label: 'thunderstorm',
    surface: '#f8f6ff',
    surfaceMuted: '#e7e1f8',
    surfaceStrong: '#4b3489',
    text: '#281b4e',
    mutedText: '#74689b',
    accent: '#3c2677',
    handle: '#cfc4ec',
  },
  Snow: {
    gradient: 'linear-gradient(160deg, #35577e 0%, #0e1c31 100%)',
    label: 'snowy night',
    surface: '#f4f9fd',
    surfaceMuted: '#dceaf4',
    surfaceStrong: '#47749e',
    text: '#17344f',
    mutedText: '#5e7890',
    accent: '#2f668f',
    handle: '#bfd9e9',
  },
  Mist: {
    gradient: 'linear-gradient(160deg, #46515b 0%, #15191e 100%)',
    label: 'misty night',
    surface: '#f6f8f9',
    surfaceMuted: '#e1e6e9',
    surfaceStrong: '#65747e',
    text: '#293740',
    mutedText: '#6d7b83',
    accent: '#52636d',
    handle: '#cbd4d8',
  },
  Fog: {
    gradient: 'linear-gradient(160deg, #46515b 0%, #15191e 100%)',
    label: 'foggy night',
    surface: '#f6f8f9',
    surfaceMuted: '#e1e6e9',
    surfaceStrong: '#65747e',
    text: '#293740',
    mutedText: '#6d7b83',
    accent: '#52636d',
    handle: '#cbd4d8',
  },
  Haze: {
    gradient: 'linear-gradient(160deg, #50473c 0%, #17130f 100%)',
    label: 'hazy night',
    surface: '#faf8f5',
    surfaceMuted: '#e9e4dc',
    surfaceStrong: '#75695c',
    text: '#3c332a',
    mutedText: '#786f66',
    accent: '#5f554a',
    handle: '#d6cdc3',
  },
};

const fallbackTheme: WeatherTheme = themes.Clouds;
const fallbackNightTheme: WeatherTheme = nightThemes.Clouds;

export function getWeatherTheme(
  conditionMain: string | undefined,
  isNight = false,
): WeatherTheme {
  const table = isNight ? nightThemes : themes;
  const fallback = isNight ? fallbackNightTheme : fallbackTheme;

  return conditionMain ? table[conditionMain] ?? fallback : fallback;
}
