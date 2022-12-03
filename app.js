class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(`.pad`);
    this.playBtn = document.querySelector(`.play`);
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(`.kick-sound`);
    this.snareAudio = document.querySelector(`.snare-sound`);
    this.hihatAudio = document.querySelector(`.hihat-sound`);
    this.index = 0;
    this.bpm = 300;
    this.selects = document.querySelectorAll(`select`);
    this.isPlaying = null;
    this.muteBtn = document.querySelectorAll(`.mute`);
    this.tempoSlider = document.querySelector(`.tempo-slider`);
  }
  activePad() {
    this.classList.toggle(`activate`);
  }
  repeat() {
    let step = this.index % 8;
    this.index++;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //Check if pads are activated
      if (bar.classList.contains(`activate`)) {
        //Check which sound?
        if (bar.classList.contains(`kick-pad`)) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains(`snare-pad`)) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains(`hihat-pad`)) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    //Check If it's playing or not?
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      //Clear interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = `Stop`;
      this.playBtn.classList.add(`activate`);
    } else {
      this.playBtn.innerText = `Play`;
      this.playBtn.classList.remove(`activate`);
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    let muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle(`activate`);
    if (e.target.classList.contains(`activate`)) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(`.tempo-nr`);
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains(`activate`)) {
      this.start();
    }
  }
}

//Event Listener
const drumKit = new DrumKit();
drumKit.pads.forEach((pad) => {
  pad.addEventListener(`click`, drumKit.activePad);
  pad.addEventListener(`animationend`, function () {
    this.style.animation = "";
  });
});
drumKit.playBtn.addEventListener(`click`, function () {
  drumKit.updateBtn();
  drumKit.start();
});
drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
drumKit.muteBtn.forEach((btn) => {
  btn.addEventListener(`click`, function (e) {
    drumKit.mute(e);
  });
});
drumKit.tempoSlider.addEventListener(`input`, function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener(`input`, function (e) {
  drumKit.updateTempo(e);
});

