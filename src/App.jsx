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
    question: 'Youre headed to Palermo (Italy), what time are you getting to the airport?',
    video: '/videos/q4.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: '3 hours ahead, cant be too careful now', type: 'strawberry' },
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
    video: '/videos/q3.mp4',
    reel: 'https://www.instagram.com/',
    answers: [
      { text: 'TRUE: haha yeah ive done that', type: ['spicy', 'skinny'] },
      { text: "FALSE: i don't f around in friend groups", type: ['salty', 'strawberry'] },
    ],
  },
  {
    question: 'How perfect is your skin rn?',
    video: '/videos/q6.mp4',
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
    video: '/videos/q7.mp4',
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
  },
  spicy: {
    title: 'Margarita Spicy',
    emoji: '🌶️',
    description:
      "You have never once said 'let's call it an early night' and actually meant it. 😂 One more drink? Sure. One more kiss? Probably. One more bad decision? Absolutely. Somehow everything always works out and your stories are legendary. Extra tajín on the rim please.",
  },
  strawberry: {
    title: 'Margarita Strawberry',
    emoji: '🍓',
    description:
      "You're a certified lover girl. 💕 You fall in love with people, places, songs, sunsets... honestly the whole vibe. You'd rather make memories than plans, your camera roll is full of your favorite people, and yes... the phone definitely eats first. 🍓",
  },
  salty: {
    title: 'Margarita Salty',
    emoji: '🧂',
    description:
      "You're hilarious without even trying. Your side-eye deserves an award, your standards are sky high, and your sarcasm keeps everyone on their toes. Secretly though? You're the reliable friend everyone calls when things get messy. Also... nobody is stealing a sip of your margarita.",
  },
  sparkling: {
    title: 'Margarita Sparkling',
    emoji: '✨',
    description: 
    "Look at you in the middle of every good story 🌸 Hey, you didn't plan on staying out until sunrise or making three new friends but here we are.  Umm, how'd you end up on this rooftop, with taco bell?!?  You know you're gorgeous, and somehow you're just impulsive enough that saying yes usually works out in your favor. i feel like you made that drink concoction yourself ;) but hey, who doesnt like bubbles"
  },
  sunset: {
    title: 'Margarita Sunset',
    emoji: '🌅',
    description: "You'll absolutely think, \"Wait... are they kind of perfect?\" 🌅 Then you'll text your best friend, laugh at yourself, and remember you've known them for exactly twelve minutes. Your standards are sky high and then sea level and then sky high again.  Mostly sweet, but a little bit psycho. 💅  Youre always ready to believe in the next crush, or take them down, either works.  Should we leave this bar and go for a drive in my convertible...maybe kiss a little?"
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
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [topType, topScore] = sorted[0]
  const [secondType, secondScore] = sorted[1]

  // Mostly strawberry, but spicy enough to change the vibe
  if (topType === 'strawberry' && scores.spicy >= 2) {
    return 'sunset'
  }

  // Mostly spicy, but strawberry enough to make it romantic-chaotic
  if (topType === 'skinny' && scores.spicy > 3) {
    return 'sparkling'
  }


  return topType
}



export default function App() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState(initialScores)

  const isFinished = step >= questions.length
  const current = questions[step]
  const progress = Math.round((step / questions.length) * 100)
  const resultType = useMemo(() => getWinner(scores), [scores])
  const result = results[resultType]

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
              <a
                className="primary linkButton"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                Watch the reel
              </a>
              <button className="secondary" onClick={restart}>
                Take it again
              </button>
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

                <a className="ig" href={current.reel} target="_blank" rel="noreferrer">
                  📷 Watch the full reel on IG
                </a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}