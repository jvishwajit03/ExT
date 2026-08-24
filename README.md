# Daily Expense Tracker Pro 📱

> Smart Daily Money Management app developed by **Vishwajit Jadhav**.

## 🚀 How to Build Android APK on GitHub Actions

This repository is already configured with automated Android APK building via GitHub Actions (`.github/workflows/build-apk.yml`).

### Steps to download your APK from GitHub:
1. Push this repository to GitHub.
2. In your GitHub repository, click on the **Actions** tab at the top.
3. Select **"Build Android APK"** from the left sidebar.
4. Click **Run workflow** (or simply push a commit, which triggers it automatically).
5. Once the build finishes (~2 minutes), click on the completed workflow run.
6. Scroll down to the **Artifacts** section and download **`DailyExpenseTrackerPro-APK.zip`**.
7. Extract the ZIP to get your `app-debug.apk` file and install it on any Android device!

---

## 🛠️ Local Android Studio / Capacitor APK Build

```bash
# 1. Install dependencies
npm install

# 2. Build web assets
npm run build

# 3. Sync into Android project
npx cap sync android

# 4. Open in Android Studio
npx cap open android
```
In Android Studio: Click **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

---

## 📲 Direct Android PWA Installation (No PC Needed)

1. Open the hosted web URL on your Android device in Chrome or Brave.
2. Tap the browser menu (`⋮` top right).
3. Select **Install app** or **Add to Home screen**.
4. The app will install with a native app icon, offline support, and full-screen experience.
