# SmartHome Dash

Minimalist data visualization app for home sensors — temperature, humidity, CO2, and more.

## Features

- **Dashboard** — Overview of all sensors with alerts
- **Sensors Tab** — Browse and filter all sensors by type
- **Rooms Tab** — View sensors organized by room
- **Alerts** — Real-time warnings for critical conditions
- **Onboarding** — 3-screen intro for new users
- **Premium Paywall** — RevenueCat integration ready
- **Home Assistant** — Connect to your real smart home

## Tech Stack

- Expo SDK 54
- React Native 0.81
- Expo Router
- AsyncStorage

## Getting Started

```bash
npm install
npx expo start
```

## Home Assistant Integration

Connect to your Home Assistant instance for real smart home data:

1. Open the app and go to Settings
2. Enter your Home Assistant URL (e.g., `http://homeassistant.local:8123`)
3. Create a Long-Lived Access Token in HA (Profile → Security → Long-Lived Access Tokens)
4. Enter the token and connect

The app will automatically fetch real sensor data from your Home Assistant instance.

## Build

```bash
eas build --platform ios
eas build --platform android
```

## API Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Home Assistant Configuration
HA_URL=http://homeassistant.local:8123
HA_ACCESS_TOKEN=your_long_lived_access_token

# Optional: For cloud connectivity
HA_CLOUD_API_KEY=your_cloud_api_key
```

### Home Assistant Setup

1. Open Home Assistant
2. Go to Profile → Security → Long-Lived Access Tokens
3. Create a new token
4. Add your HA URL and token to `.env`:

```typescript
// src/services/homeAssistant.ts
export const HA_CONFIG = {
  url: process.env.HA_URL || 'http://homeassistant.local:8123',
  token: process.env.HA_ACCESS_TOKEN
};
```

### RevenueCat Configuration

1. Create an account at [RevenueCat.com](https://revenuecat.com)
2. Create products in App Store Connect / Google Play Console:
   - Monthly: $2.99/month - `smarthome_monthly`
   - Annual: $14.99/year - `smarthome_annual`
3. Configure products in RevenueCat dashboard
4. Add your API key to `src/services/purchases.ts`

## License

Proprietary — All rights reserved
