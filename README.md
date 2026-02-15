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

## License

Proprietary — All rights reserved
