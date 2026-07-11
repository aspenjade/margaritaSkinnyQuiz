import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

const questions = [
  {
    question: 'You and your best friend are doing a last minute hang, whats the plan?',
    video: '/videos/q1.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: 'Convertible sunset babyyyy', type: 'skinny' },
      { text: 'binge watching your favorite show on the couch', type: 'salty' },
      { text: 'A cute dinner out and skinny margarita, lets dress up!', type: 'strawberry' },
      { text: 'BEACH.', type: 'spicy' },
    ],
  },
  {
    question: 'When does the perfect night end?',
    video: '/videos/q2.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: 'what do you mean, I never left the house', type: 'salty' },
      { text: "I'll go home after the first spot!", type: 'strawberry' },
      { text: 'I LOVE AN AFTER PARTY', type: 'skinny' },
      { text: 'waking up with a stranger (preferably on the beach)', type: 'spicy' },
    ],
  },
  {
    question: 'True or False: I kiss with tongue 👀',
    video: '/videos/q3.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: 'TRUE!', type: ['spicy', 'skinny'] },
      { text: 'FALSE', type: 'salty' },
      { text: 'ummm, thats classified', type: ['strawberry'] },
    ],
  },
  {
    question: 'You\'re headed to Palermo (Italy), what time are you getting to the airport?',
    video: '/videos/q4.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: '3 hours ahead, can\'t be too careful now', type: 'strawberry' },
      { text: "I'm a bit early cuz I have lounge access!", type: ['salty', 'skinny'] },
      { text: 'arriving at the gate right as boarding starts, perfect timing!', type: 'skinny' },
      { text: 'so... i think thats my flight taking off right now without me', type: 'spicy' },
    ],
  },
  {
    question: 'How are you documenting your night?',
    video: '/videos/q5.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: "I've got my digital camera! Smile for the photos", type: 'skinny' },
      { text: 'my phone just got stolen, so im living in the moment', type: 'spicy' },
      { text: "I'm filming and taking photos all night with my phone", type: 'strawberry' },
      { text: "I'm in everyone elses photos, looking iconic of course", type: 'salty' },
    ],
  },
  {
    question: "True or False: I've made out with two people that were friends (separately)",
    video: '/videos/q6.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: 'TRUE: haha, yeah I\'ve done that', type: ['spicy', 'skinny'] },
      { text: "FALSE: I don't f around in friend groups", type: ['salty', 'strawberry'] },
    ],
  },
  {
    question: 'How perfect is your skin rn?',
    video: '/videos/q7.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: 'I have my routine down! GLASS SKIN BABYYY', type: 'strawberry' },
      { text: "I'm broken out, but I'm still pretty", type: 'skinny' },
      { text: 'Perfect, i just have good genetics', type: 'salty' },
      { text: 'Pretty good considering I dont try', type: 'spicy' },
    ],
  },
  {
    question: 'Your main character flaw?',
    video: '/videos/q8.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: 'I text back three business days later.', type: 'salty' },
      { text: 'Romanticizing everything, I think every crush is my soulmate', type: 'strawberry' },
      { text: 'I dont know when to go home, I always convince everyone to stay out one more hour', type: 'spicy' },
      { text: 'sometimes i forget to listen when people are talking', type: 'skinny' },
    ],
  },
]

const results = {
  skinny: {
    title: 'Margarita Skinny',
    emoji: '🍸',
    description:
      "OMG THERE YOU ARE!! Aspen Jade has been looking everywhere for you. ✨ You're the sparkly main character without even trying. Somehow you're always in the most iconic photos, everyone's asking what you're doing this weekend, and you're definitely getting aux on the drive to the afterparty. Obviously you're ordering a Margarita Skinny.",
    shareTexts: [
    "Did you steal the spotlight... or did it just follow you home?",
    "You weren't flirting... that's just your face.",
    "Somehow you always end up in the center of the photo.",
    "The night peaked when you got there.",
    "was the date really good, or was it your amazing personality",
    "You're suspiciously good at being unforgettable.",
    "bro, how many numbers did you get tonight?"
  ],
  },
  spicy: {
    title: 'Margarita Spicy',
    emoji: '🌶️',
    description:
      "You have never once said 'let's call it an early night' and actually meant it. 😂 One more drink? Sure. One more kiss? Probably. One more bad decision? Absolutely. Somehow everything always works out and your stories are legendary. Extra tajín on the rim please.",
  shareTexts: [
  "So... who did you kiss tonight?",
  "You're either making memories or bad decisions.",
  "How many times did you say 'one more drink'?",
  "You definitely have a story you're leaving out.",
  "Your Uber driver deserves a raise.",
  "Be honest... whose idea was this?  It definitely wasn\'t strawberry\'s",
  "You texted 'I'm on my way home' three hours ago.",
],
  },
  strawberry: {
    title: 'Margarita Strawberry',
    emoji: '🍓',
    description:
      "You're a certified lover girl. 💕 You fall in love with people, places, songs, sunsets... honestly the whole vibe. You'd rather make memories than plans, your camera roll is full of your favorite people, and yes... the phone definitely eats first. 🍓",
    shareTexts: [
  "Was it true love... or did they just smile at you?",
  "How many weddings have you planned in your head today?",
  "You definitely thought they were your soulmate...",
  "Every sunset is somehow about you.",
  "You've caught feelings for less.",
  "You're one playlist away from falling in love again.",
  "Be honest... are you already planning the second date with that Margarita Spicy?",
],
  },
  salty: {
    title: 'Margarita Salty',
    emoji: '🧂',
    description:
      "You're hilarious without even trying. Your side-eye deserves an award, your standards are sky high, and your sarcasm keeps everyone on their toes. Secretly though? You're the reliable friend everyone calls when things get messy. Also... nobody is stealing a sip of your margarita.",
  shareTexts: [
  "You knew they were a red flag immediately.",
  "How many people did you silently judge tonight?",
  "You're funny... you should probably apologize more tho.",
  "Your side-eye deserves its own TV show.",
  "You're not mean you're just right.",
  "Somebody had to keep the marg skinny girl humble.",
  "You definitely said 'I told you so to Margarita Strawberry'",
],
  },
  sparkling: {
    title: 'Margarita Sparkling',
    emoji: '✨',
    description: 
    "Look at you in the middle of every good story 🌸 Hey, you didn't plan on staying out until sunrise or making three new friends but here we are.  Umm, how'd you end up on this rooftop, with taco bell?!?  You know you're gorgeous, and somehow you're just impulsive enough that saying yes usually works out in your favor. i feel like you made that drink concoction yourself ;) but hey, who doesnt like bubbles",
  shareTexts: [
  "Wait... how did you end up on a rooftop?",
  "Whose idea was champagne and tequila?",
  "You somehow made three new best friends tonight.",
  "You definitely said yes before hearing the question.",
  "How did this become the best night of the summer?",
  "You don't find the party. The party finds you.",
  "You're one spontaneous decision away from another story.",
],
  },
  sunset: {
    title: 'Margarita Sunset',
    emoji: '🌅',
    description: "You'll absolutely think, \"Wait... are they kind of perfect?\" 🌅 Then you'll text your best friend, laugh at yourself, and remember you've known them for exactly twelve minutes. Your standards are sky high and then sea level and then sky high again.  Mostly sweet, but a little bit psycho. 💅  Youre always ready to believe in the next crush, or take them down, either works.  Should we leave this bar and go for a drive in my convertible...maybe kiss a little?",
    shareTexts: [
       "You're somehow both the red flag and the green flag.",
  "You romanticized the chaos... again.",
  "Your therapist is going to LOVE this one.",
  "You absolutely believe in fate... until work Monday morning.",
  "You keep accidentally living in a rom-com.",
  "The chemistry was undeniable... probably.",
  "You'd absolutely say 'this is so unlike me' while doing exactly this again.",
],
  }
}

const initialScores = {
  skinny: 0,
  spicy: 0,
  strawberry: 0,
  salty: 0,
}

// function getWinner(scores) {
//   return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
// }


function getWinner(scores) {
  const highestScore = Math.max(...Object.values(scores))

  const tiedTypes = Object.entries(scores)
    .filter(([, score]) => score === highestScore)
    .map(([type]) => type)

  // Strawberry + enough Spicy becomes Sunset.
  if (
    tiedTypes.includes('strawberry') &&
    scores.spicy >= 2
  ) {
    return 'sunset'
  }

  // Rare unicorn result: Skinny must be at the top
  // and Spicy must have more than 3 points.
  if (
    tiedTypes.includes('skinny') &&
    scores.spicy > 3
  ) {
    return 'sparkling'
  }

  // Choose randomly among tied top scores instead of
  // always favoring Skinny because it appears first.
  return tiedTypes[
    Math.floor(Math.random() * tiedTypes.length)
  ]
}


export default function App() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState(initialScores)
  const [presaveOpened, setPresaveOpened] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const isFinished = step >= questions.length
  const current = questions[step]
  const progress = Math.round((step / questions.length) * 100)
  const resultType = useMemo(() => getWinner(scores), [scores])
  const result = results[resultType]
  
  const shareText = useMemo(() => {
  const options = result.shareTexts
  return options[Math.floor(Math.random() * options.length)]
}, [resultType])



  function handleAnswer(answer) {
    const answerTypes = Array.isArray(answer.type) ? answer.type : [answer.type]

    setScores((prev) => {
      const nextScores = { ...prev }

      answerTypes.forEach((type) => {
        nextScores[type] = nextScores[type] + 1
      })

      console.log('Answered:', answer.text)
      console.log('Added point(s) to:', answerTypes)
      console.log('Current scores:', nextScores)

      return nextScores
    })

    setStep((prev) => prev + 1)
  }

  function restart() {
    setStarted(false)
    setStep(0)
    setScores(initialScores)
    setPresaveOpened(false)
    setShowResult(false)
}
  return (
    <main className="page">
      <div className="phone">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.section
              key="intro"
              className="screen intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="sparkle">🍹</div>
              <p className="eyebrow">Aspen Jade presents</p>
              <h1>What kind of margarita are you?</h1>
              <p className="subcopy">Answer 8 questions to find out!</p>
              <button className="primary" onClick={() => setStarted(true)}>
                Start quiz
              </button>
            </motion.section>
          ) : isFinished && !showResult ? (
  <motion.section
    key="presave"
    className="screen result"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="resultEmoji">🍸</div>

    <p className="eyebrow">Your result is ready…</p>

    <h1>But first, pre-save Margarita Skinny!</h1>

    <p className="subcopy">
      Pre-save the song, then come back here to reveal which margarita you are.
    </p>

    <a
      className="primary linkButton"
      href="https://Venice.lnk.to/margarita-skinny"
      target="_blank"
      rel="noreferrer"
      onClick={() => setPresaveOpened(true)}
    >
      Pre-save Margarita Skinny
    </a>

    {presaveOpened && (
      <button
        className="secondary"
        onClick={() => setShowResult(true)}
      >
        I pre-saved — show my result
      </button>
    )}
  </motion.section>
) : isFinished ? (
  <motion.section
    key="result"
    className="screen result"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="resultEmoji">{result.emoji}</div>
    <p className="eyebrow">You are a…</p>
    <h1>{result.title}</h1>
    <p className="subcopy">{result.description}</p>

    <button
  className="primary"
  onClick={() => {
    const recipeFiles = {
      skinny: '/recipes/margarita-skinny.png',
      spicy: '/recipes/margarita-spicy.png',
      strawberry: '/recipes/margarita-strawberry.png',
      salty: '/recipes/margarita-salty.png',
      sparkling: '/recipes/margarita-sparkling.png',
      sunset: '/recipes/margarita-sunset.png',
    }

    const link = document.createElement('a')
link.href = recipeFiles[resultType]
link.download = `margarita-${resultType}-recipe.png`
document.body.appendChild(link)
link.click()
link.remove()
  }}
>
  Download your recipe card
  </button>
<button
  className="primary"
  onClick={shareResult}
  style={{ marginTop: '24px' }}
>
  Share my result 
  (don't forget to tag @aspenjade.vox)📸
</button>

   {/* <button className="secondary" onClick={restart}>
      Take it again
    </button>*/}
  </motion.section>
          ) : (
            <motion.section
              key={step}
              className="screen quiz"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <video className="bgVideo" src={current.video} autoPlay muted loop playsInline />
              <div className="shade" />

              <div className="content">
                <div className="topbar">
                  <span>
                    Question {step + 1}/{questions.length}
                  </span>
                  <span>{progress}%</span>
                </div>

                <div className="progressTrack">
                  <div className="progressFill" style={{ width: `${progress}%` }} />
                </div>

                <h1>{current.question}</h1>

                <div className="answers">
                  {current.answers.map((answer) => (
                    <button key={answer.text} onClick={() => handleAnswer(answer)}>
                      {answer.text}
                    </button>
                  ))}
                </div>

                {/*<a className="ig" href={current.reel} target="_blank" rel="noreferrer">
                  📷 Watch the full reel on IG
                </a>*/}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
async function shareResult() {
  try {
    const templateFiles = {
      skinny: '/share-templates/margarita-skinny.png',
      spicy: '/share-templates/margarita-spicy.png',
      strawberry: '/share-templates/margarita-strawberry.png',
      salty: '/share-templates/margarita-salty.png',
      sparkling: '/share-templates/margarita-sparkling.png',
      sunset: '/share-templates/margarita-sunset.png',
    }

    const templatePath = templateFiles[resultType]

    if (!templatePath) {
      throw new Error(`No share template found for ${resultType}`)
    }

    const templateImage = await loadImage(templatePath)

    const canvas = document.createElement('canvas')
    canvas.width = templateImage.naturalWidth || templateImage.width
    canvas.height = templateImage.naturalHeight || templateImage.height

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Canvas is not supported')
    }

    // Draw the completed Canva template first.
    ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height)

    // Share text styling.
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '700 48px Arial'

    // Adjust these values to move the caption.
    const textCenterX = canvas.width / 2
    const textCenterY = canvas.height * 0.765
    const maxTextWidth = canvas.width * 0.74
    const lineHeight = 60

    drawCenteredWrappedText(
      ctx,
      shareText,
      textCenterX,
      textCenterY,
      maxTextWidth,
      lineHeight
    )

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((createdBlob) => {
        if (createdBlob) {
          resolve(createdBlob)
        } else {
          reject(new Error('Could not create the result image'))
        }
      }, 'image/png')
    })

    const filename = `${resultType}-margarita-result.png`

    const file = new File([blob], filename, {
      type: 'image/png',
    })

    const shareData = {
      title: `I got ${result.title}!`,
      text: `I got ${result.title} on Aspen Jade's Margarita quiz! 🍹`,
      files: [file],
    }

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      await navigator.share(shareData)
      return
    }

    // Desktop fallback: download the completed image.
    const imageUrl = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')

    downloadLink.href = imageUrl
    downloadLink.download = filename
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()

    URL.revokeObjectURL(imageUrl)

    alert(
      'Your result card was downloaded! Upload it to your Instagram Story and tag @aspenjade 💖'
    )
  } catch (error) {
    if (error?.name === 'AbortError') {
      return
    }

    console.error('Could not share result:', error)

    alert(
      'I could not create your share image. Take a screenshot instead and tag @aspenjade.vox'
    )
  }
}
  

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)

    image.onerror = () => {
      console.error('Template image failed to load:', src)
      reject(new Error(`Could not load template image: ${src}`))
    }

    image.src = src
  })
}

function drawCenteredWrappedText(
  ctx,
  text,
  centerX,
  centerY,
  maxWidth,
  lineHeight
) {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  words.forEach((word) => {
    const testLine = currentLine
      ? `${currentLine} ${word}`
      : word

    if (
      ctx.measureText(testLine).width > maxWidth &&
      currentLine
    ) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  const totalHeight = (lines.length - 1) * lineHeight
  const startY = centerY - totalHeight / 2

  lines.forEach((line, index) => {
    ctx.fillText(
      line,
      centerX,
      startY + index * lineHeight
    )
  })
}
}