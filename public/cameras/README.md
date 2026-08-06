# Wandering Cameras

A tiny site for tracking 4 cameras released into LA: a public map, a
per-camera check-in/upload page (what your QR codes point to), and a
password-gated admin page for you.

No build step, no server — just static files + Supabase.

## 1. Set up Supabase (~10 min)

1. Go to https://supabase.com → New project (free tier is plenty).
2. Once it's created, open **SQL Editor → New query**, paste in the
   contents of `schema.sql`, and run it. This creates the tables, the
   storage bucket for photos/videos, and seeds 4 placeholder cameras.
3. Go to **Project Settings → API**. Copy the **Project URL** and the
   **anon public key**.
4. Open `config.js` and paste them in:
   ```js
   window.SUPABASE_URL = "https://xxxxx.supabase.co";
   window.SUPABASE_ANON_KEY = "eyJ...";
   window.ADMIN_PASSWORD = "pick-something-only-you-know";
   ```

## 2. Try it locally

Any static file server works, e.g.:
```
cd camera-project
python3 -m http.server 8000
```
Then open `http://localhost:8000` for the map, and
`http://localhost:8000/admin.html` to edit your cameras.

## 3. Write your camera stories

Go to `/admin.html`, log in with your password, and for each of the 4
cameras:
- Give it a real name
- Write its story/backstory
- Set total frame count (whatever the camera actually holds)
- Set today's starting location (click the little map or type lat/lng)

## 4. Deploy it for real

Easiest option: **Vercel** (free).
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. No build settings needed (it's static) — deploy.
4. You'll get a URL like `wandering-cameras.vercel.app`.

Netlify works the same way if you prefer it (drag-and-drop the folder
onto app.netlify.com also works, for zero setup).

## 5. Two separate flows — read this before making QR codes

- **`index.html`** is the public site — the map, and a **view-only**
  camera page (story + log) for anyone in the world to browse. No
  check-in or upload happens here.
- **`checkin.html`** is the real-world flow — story, frame counter,
  and the actual check-in/upload form. It is **not linked from
  anywhere on the public site** — the only way in is by scanning the
  QR code on the physical camera.

**Your QR codes must point to `checkin.html`, not `index.html`:**
```
https://your-domain.com/checkin.html?cam=camera-1
https://your-domain.com/checkin.html?cam=camera-2
https://your-domain.com/checkin.html?cam=camera-3
https://your-domain.com/checkin.html?cam=camera-4
```
(the slugs match what's in `schema.sql` / what you set in admin)

The public "view camera" links on the map (`index.html?cam=camera-1`
etc.) are for anyone to browse the story and log — they deliberately
don't include the check-in form.

Generate QR codes for free at https://www.qr-code-generator.com or
https://qrcode.tec-it.com — just paste each `checkin.html` URL in.
Print small, stick one on each camera.

## 6. Your daily location update

Once a day, open `/admin.html`, drag the pin (or type coordinates) to
where the camera roughly is, and hit **Save camera**. The map's pin
label turns a soft green for 36 hours after an update, so visitors can
tell which cameras have fresh sightings.

## 7. Using your real CapCut/CC-3dScan brand images

The site's text-based fonts are a stand-in — the real brand font
(CC-3dScan) only exists inside CapCut and can't be exported as a font
file. Instead, drop in exported images and the site will use them
automatically (falling back to plain text if an image is missing, so
nothing breaks while you're still making them):

- **Site logo**: export as `logo.png` (transparent background works
  best), place it at `assets/logo.png`. Recommended height ~64px @2x
  (so ~128px tall actual file) for a crisp look on retina screens.
- **Each camera's name badge**: export one image per camera, named to
  match its slug exactly, e.g. `camera-1.png`, `camera-2.png`, etc.,
  placed in `assets/cameras/`. These sit inside the pill badge on each
  camera's page, so keep them roughly landscape (wide, not tall) —
  something like 500x160px works well, transparent background.

Folder structure:
```
camera-project/
  assets/
    logo.png
    cameras/
      camera-1.png
      camera-2.png
      camera-3.png
      camera-4.png
```


- Anyone can submit a check-in or upload — no login required, by
  design, since a stranger on the street needs to use this in ten
  seconds flat.
- The admin password is a soft gate (client-side check), not real
  auth — fine for a small art project, just don't rely on it for
  anything sensitive.
- AirTag locations aren't pullable into a public website (Apple
  doesn't expose Find My data via any API), which is why location is
  a manual daily update rather than live tracking.
