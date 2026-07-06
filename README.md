# Filmy Frolic

A React Native mobile application built with **Expo SDK 56**, **Expo Router**, **TypeScript**, and **NativeWind**.

---

## Prerequisites

Make sure the following are installed on your system:

- Node.js (v20 or later recommended)
- npm
- Expo CLI (optional)
- Android Studio (for Android development)
- Android SDK
- Java JDK 17+

---

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:emad-krishLab/filmy-frolic.git
cd filmy-frolic
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

or

```bash
npx expo start
```

---

## Run on Android

Start the Expo development server:

```bash
npm start
```

Then press:

```text
a
```

or run:

```bash
npx expo run:android
```

Make sure an Android emulator is running or a physical device is connected.

---

## Run on iOS (macOS only)

```bash
npx expo run:ios
```

---

## Project Structure

```text
src/
├── app/            # Expo Router screens
├── components/     # Reusable UI components
├── globals.css     # NativeWind global styles
```

---

## Tech Stack

- Expo SDK 56
- React Native
- Expo Router
- TypeScript
- NativeWind
- Tailwind CSS

---

## Useful Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run the app on Android |
| `npm run ios` | Run the app on iOS |
| `npm run web` | Run the app in the browser |

---

## Notes

- Ensure Android Studio and Android SDK are properly configured.
- If Metro cache causes issues, clear it using:

```bash
npx expo start --clear
```

---

## License

This project is intended for internal development.