document.addEventListener('DOMContentLoaded', () => {
  const valentineName = 'Naya';
  const questions = {
    first: {
      text: "Do you love me?",
      yesBtn: "Yes",
      noBtn: "No",
      secretAnswer: "I don't like you, I love you! ❤️"
    },
    second: {
      text: "How much do you love me?",
      startText: "This much!",
      nextBtn: "Next ❤️"
    },
    third: {
      text: "Will you be my Valentine...?",
      yesBtn: "Yes!",
      noBtn: "No"
    }
  };

  const loveMessages = {
    extreme: "WOOOOW You love me that much?? 🥰🚀💝",
    high: "To infinity and beyond! 🚀💝",
    normal: "And beyond! 🥰"
  };

  const celebration = {
    title: "Yeay! I'm the luckiest person...",
    message: "Now come get your gift... 🎁💖🤗💝💋❤️💕"
  };

  const musicSettings = {
    enabled: true,
    autoplay: true,
    musicUrl: "https://asset.cloudinary.com/dr8bv9l0m/294f64f4eebd62ac479b98c981f1d8ad",
    startText: "🎵 Play Music",
    stopText: "🔇 Stop Music",
    volume: 0.5
  };

  const floatingEmojis = ['❤️', '💖', '💝', '💗', '💓', '🧸', '🐻'];
  const floatDuration = '15s';
  const floatDistance = '50px';
  const bounceSpeed = '0.5s';

  const container = document.querySelector('.container');
  const questionsDiv = document.getElementById('questions');
  const celebrationDiv = document.getElementById('celebration');
  const musicControl = document.getElementById('music-control');
  let currentQuestion = 0;

  function showQuestion() {
    const questionKeys = Object.keys(questions);
    if (currentQuestion >= questionKeys.length) {
      celebrationDiv.classList.remove('hidden');
      return;
    }
    const questionKey = questionKeys[currentQuestion];
    const question = questions[questionKey];
    questionsDiv.innerHTML = `
      <div class="question">
        <p>${question.text}</p>
        ${question.yesBtn ? `<button class="yes-btn">${question.yesBtn}</button>` : ''}
        ${question.noBtn ? `<button class="no-btn">${question.noBtn}</button>` : ''}
      </div>
    `;
    if (question.yesBtn) {
      document.querySelector('.yes-btn').addEventListener('click', () => {
        if (question.secretAnswer) {
          alert(question.secretAnswer);
        }
        currentQuestion++;
        showQuestion();
      });
    }
    if (question.noBtn) {
      document.querySelector('.no-btn').addEventListener('click', () => {
        currentQuestion++;
        showQuestion();
      });
    }
  }

  function createFloatingEmojis() {
    const floatingElementsDiv = document.querySelector('.floating-elements');
    floatingEmojis.forEach((emoji) => {
      const emojiDiv = document.createElement('div');
      emojiDiv.classList.add('floating-element');
      emojiDiv.textContent = emoji;
      emojiDiv.style.left = `${Math.random() * 100}%`;
      emojiDiv.style.animationDuration = floatDuration;
      emojiDiv.style.animationTimingFunction = 'ease-in-out';
      emojiDiv.style.animationIterationCount = 'infinite';
      floatingElementsDiv.appendChild(emojiDiv);
    });
  }

  function setupMusic() {
    if (!musicSettings.enabled) return;
    const audio = new Audio(musicSettings.musicUrl);
    audio.volume = musicSettings.volume;
    audio.loop = true;
    let isPlaying = false;

    function toggleMusic() {
      if (isPlaying) {
        audio.pause();
        musicControl.textContent = musicSettings.startText;
      } else {
        audio.play();
        musicControl.textContent = musicSettings.stopText;
      }
      isPlaying = !isPlaying;
    }

    if (musicSettings.autoplay) {
      audio.play();
      isPlaying = true;
      musicControl.textContent = musicSettings.stopText;
    } else {
      musicControl.textContent = musicSettings.startText;
    }

    musicControl.classList.remove('hidden');
    musicControl.addEventListener('click', toggleMusic);
  }

  createFloatingEmojis();
  showQuestion();
  setupMusic();
});
