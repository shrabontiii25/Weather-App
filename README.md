# Weather App

A responsive single-page weather application built with Vue 3, TypeScript, and the OpenWeatherMap API. Built as a technical assessment.

## Features

- Search for any city and view current weather
- City list with live temperature, condition, and high/low
- Detail view per city with hourly and weekly forecast
- Loading and error states throughout
- Form validation on search (prevents empty submissions, prevents duplicate cities)
- Client-side routing between home and detail views
- Auto-detects user's current location weather using the browser's Geolocation API

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript** (strict typing throughout, interfaces modeling the API response)
- **Vite** — build tool and dev server
- **Pinia** — state management
- **Vue Router** — navigation between views
- **OpenWeatherMap API** — weather data source

## Architecture

Components are organized following **Atomic Design**:

- `atoms/` — smallest reusable pieces (TempDisplay, WeatherIcon, SearchInput)
- `molecules/` — combinations of atoms (CityCard, SearchBar)
- `organisms/` — larger reusable sections (CityList)
- `pages/` — full assembled views (HomePage, DetailPage)

Data flow: the **API service layer** (`services/weatherApi.ts`) fetches and types responses. The **Pinia store** (`stores/weatherStore.ts`) holds shared state (city list, selected city, loading/error flags) as a single source of truth. Components read reactively from the store rather than fetching independently.

## Setup and Installation

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the project root with:
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
4. Run `npm run dev`
5. Open `http://localhost:5173`

## Approach and Decisions

- Chose **Pinia** over Vuex, as it's the modern, officially recommended successor and integrates more naturally with the Composition API.
- The free OpenWeatherMap tier provides 3-hour interval forecasts rather than a true daily forecast, so the weekly forecast is derived by taking the first entry per unique date from the 5-day list.
- Routes are lazy-loaded so that page code is fetched only when the corresponding screen is visited.
- Used the browser's native **Geolocation API** to detect the user's location and show local weather first in the list, degrading gracefully with an error message if permission is denied or unavailable.

## Running Tests

Run the automated unit tests with `npm test`. The suite covers weather-theme mapping, including day, night, and fallback conditions. Manual testing was also performed for search validation, duplicate city prevention, navigation between views, and API error states.

## Next Steps (given more time)

- Expand automated test coverage (unit tests for the store and API service)
- Deeper accessibility audit (keyboard navigation, ARIA labels, contrast)
- Further image optimization for the supplied weather icon assets
