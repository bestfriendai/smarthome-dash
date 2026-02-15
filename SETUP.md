# SmartHome Dash — Setup Guide

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo`)
- **EAS CLI** (`npm install -g eas-cli`)
- **Apple Developer Account** (for iOS)
- **Google Play Console** (for Android)

## Installation

```bash
cd smart-home-dash
npm install
```

## Running Locally

```bash
# Start Metro bundler
npx expo start

# Or run on specific platform
npx expo start --ios
npx expo start --android
```

## RevenueCat Setup

1. Create account at [revenuecat.com](https://revenuecat.com)
2. Create new app (iOS + Android)
3. Get your API keys from app settings
4. Create products:
   - **Monthly**: $4.99/month
   - **Annual**: $39.99/year (save 33%)
5. Copy API keys to `.env`:
   ```
   REVENUECAT_IOS_KEY=your_ios_key
   REVENUECAT_ANDROID_KEY=your_android_key
   ```
6. Configure entitlements in app stores

## App Store Connect Setup

### iOS (Apple Developer)

1. Sign in to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app:
   - **Bundle ID**: `com.smarthome.dash`
   - **Name**: SmartHome Dash
   - **Category**: Utilities
3. Upload screenshots (see ASO folder)
4. Configure pricing and availability

### Android (Google Play)

1. Sign in to [Google Play Console](https://play.google.com/console)
2. Create new app:
   - **Package Name**: `com.smarthome.dash`
   - **Name**: SmartHome Dash
3. Upload screenshots
4. Configure pricing

## EAS Build

```bash
# Configure EAS
eas build:configure

# Build for iOS (requires Apple Developer)
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

## Submission Checklist

- [ ] App icon (1024x1024)
- [ ] Screenshots (iPhone: 6.7", 6.5"; iPad: 12.9")
- [ ] Privacy policy URL
- [ ] App Store description
- [ ] Keywords optimized
- [ ] TestFlight build uploaded (iOS)
- [ ] Internal testing (Android)
- [ ] RevenueCat products configured
- [ ] Sandbox testing completed

## Reference

- [Expo Docs](https://docs.expo.dev)
- [RevenueCat Docs](https://docs.revenuecat.com)
- [EAS Build](https://docs.expo.dev/build/introduction)
