# Margarita Skinny Quiz

A Vite + React quiz app ready for Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually http://localhost:5173/

## Add your videos

Put your 8 looping vertical videos here:

```bash
public/videos/q1.mp4
public/videos/q2.mp4
public/videos/q3.mp4
public/videos/q4.mp4
public/videos/q5.mp4
public/videos/q6.mp4
public/videos/q7.mp4
public/videos/q8.mp4
```

The app still runs without videos; the video area will show a gradient background.

## Edit questions and links

Open `src/App.jsx` and edit the `questions` array.
Replace each `reel` URL with your Instagram Reel link.

## Deploy to Vercel

```bash
npm run build
npm install -g vercel
vercel
```
