import { useEffect, useRef, useState } from 'react'
import './PressPage.css'

const SONG_PATH = '/audio/margarita-skinny.wav'
const VIDEO_PATH = '/videos/margarita-skinny.mp4'
const LOGO_PATH = '/images/margarita-skinny-logo.png'

const lyricStickers = [
  {
    text: "MY SKIN'S BROKEN OUT",
    className: 'skinnyStickerOne',
  },
  {
    text: "I'M STILL PRETTY",
    className: 'skinnyStickerTwo',
  },
  {
    text: 'HIT THE CITY',
    className: 'skinnyStickerThree',
  },
  {
    text: 'MARGARITA SKINNY',
    className: 'skinnyStickerFour',
  },
]

const fullLyrics = [
  "If my skin's broken out",
  "I know I'm still pretty",
  'With your tongue in my mouth',
  'And my margarita skinny',
  '',
  "Even though I'm feeling shitty",
  "I'ma still hit the city",
  'Still, still hit the city',
  'Still, still',
  "",
  "",
  "",
  "Cuz Im still, Im stil",
  "Waiting for the right time to buy you a drink",
  "And I\'m sensing and I\'m sure now, you and I are waking up somewhere on a beach",
  "I\'ve got my DJI smile for the photo",
  "Made out with both your friends lets keep it on the down low",
  "Hope I dont miss my flight from LA to Palermo",
  "Wait you didnt notice?",
  "No one even knows...",
  "",
  "",
  "",
 "If my skin's broken out",
  "I know I'm still pretty",
  'With your tongue in my mouth',
  'And my margarita skinny',
  '',
  "Even though I'm feeling shitty",
  "I'ma still hit the city",
  'Still, still hit the city',
  'Still, still',
  "",
  "",
  "",
 "Theres no one else around",
  "Get in close to me",
  'You want the best of me',
  '',
  "Ive got my poloroid",
  "Get in close to me",
  'Make a memory',
  "",
   "",
    "",
     "",
  "If my skin's broken out",
  "I know I'm still pretty",
  'With your tongue in my mouth',
  'And my margarita skinny',
  '',
  "Even though I'm feeling shitty",
  "I'ma still hit the city",
  'Still, still hit the city',
  'Still, still',
  "",
  "",
  "",
]

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')

  return `${minutes}:${remainingSeconds}`
}

export default function PressPage() {
  const audioRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [lyricsOpen, setLyricsOpen] = useState(false)
  const [audioError, setAudioError] = useState('')

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return undefined
    }

    function updateCurrentTime() {
      setCurrentTime(audio.currentTime)
    }

    function updateDuration() {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration)
      }
    }

    function handlePlay() {
      setIsPlaying(true)
    }

    function handlePause() {
      setIsPlaying(false)
    }

    function handleEnded() {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    function handleError() {
      setAudioError('The song could not load. Check the audio filename.')
    }

    audio.addEventListener('timeupdate', updateCurrentTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setLyricsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  async function togglePlayback() {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    setAudioError('')

    try {
      if (audio.paused) {
        await audio.play()
      } else {
        audio.pause()
      }
    } catch (error) {
      console.error('Audio playback failed:', error)
      setAudioError('Tap the player again to start the song.')
    }
  }

  function handleSeek(event) {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    const nextTime = Number(event.target.value)

    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const progress =
    duration > 0 ? `${(currentTime / duration) * 100}%` : '0%'

  return (
    <main className="skinnyExperience">
      <video
        className="skinnyBackground"
        src={VIDEO_PATH}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="skinnyVideoTint" />
      <div className="skinnyGrain" />

      <audio ref={audioRef} src={SONG_PATH} preload="metadata" />

      <div className="skinnyDecorations" aria-hidden="true">
        <span className="skinnyBubble skinnyBubbleOne" />
        <span className="skinnyBubble skinnyBubbleTwo" />
        <span className="skinnyBubble skinnyBubbleThree" />
        <span className="skinnySparkle skinnySparkleOne">✦</span>
        <span className="skinnySparkle skinnySparkleTwo">✦</span>
      </div>

      <div className="skinnyStickerLayer" aria-hidden="true">
        {lyricStickers.map((sticker) => (
          <span
            key={sticker.text}
            className={`skinnyLyricSticker ${sticker.className}`}
          >
            {sticker.text}
          </span>
        ))}
      </div>

      <section className="skinnyMainContent">
        <img
          className="skinnyMainLogo"
          src={LOGO_PATH}
          alt="Margarita Skinny"
        />

        <button
          type="button"
          className={`skinnyDisc ${
            isPlaying ? 'skinnyDiscPlaying' : ''
          }`}
          onClick={togglePlayback}
          aria-label={
            isPlaying
              ? 'Pause Margarita Skinny'
              : 'Play Margarita Skinny'
          }
        >
          <span className="skinnyDiscArtwork" aria-hidden="true">
            <span className="skinnyDiscRing skinnyDiscRingOne" />
            <span className="skinnyDiscRing skinnyDiscRingTwo" />
            <span className="skinnyDiscRing skinnyDiscRingThree" />
          </span>

          <span className="skinnyDiscControl">
            <span className="skinnyDiscIcon">
              {isPlaying ? 'Ⅱ' : '▶'}
            </span>

            <span className="skinnyDiscInstruction">
              {isPlaying ? 'TAP TO PAUSE' : 'TAP TO PLAY'}
            </span>
          </span>
        </button>

        <div className="skinnyProgressSection">
          <div className="skinnyProgressBar">
            <div
              className="skinnyProgressValue"
              style={{ width: progress }}
            />
          </div>

          <input
            className="skinnyProgressInput"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            aria-label="Song progress"
          />

          <div className="skinnyProgressTimes">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <button
          type="button"
          className="skinnyLyricsButton"
          onClick={() => setLyricsOpen(true)}
        >
          FULL LYRICS
        </button>

        {audioError && (
          <p className="skinnyAudioError">{audioError}</p>
        )}
      </section>

      {lyricsOpen && (
        <div
          className="skinnyLyricsOverlay"
          role="presentation"
          onMouseDown={() => setLyricsOpen(false)}
        >
          <section
            className="skinnyLyricsDrawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skinny-lyrics-heading"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="skinnyLyricsClose"
              type="button"
              onClick={() => setLyricsOpen(false)}
              aria-label="Close lyrics"
            >
              ×
            </button>

            <img
              className="skinnyDrawerLogo"
              src={LOGO_PATH}
              alt=""
            />

            <h2 id="skinny-lyrics-heading">Lyrics</h2>

            <div className="skinnyLyricsCopy">
              {fullLyrics.map((line, index) =>
                line ? (
                  <p key={`${line}-${index}`}>{line}</p>
                ) : (
                  <div
                    className="skinnyLyricsBreak"
                    key={`break-${index}`}
                  />
                ),
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}