// Your script here.
const synth = window.speechSynthesis;
    const textInput = document.getElementById("text");
    const voiceSelect = document.getElementById("voiceSelect");
    const rate = document.getElementById("rate");
    const pitch = document.getElementById("pitch");
    const rateValue = document.getElementById("rateValue");
    const pitchValue = document.getElementById("pitchValue");
    const speakButton = document.getElementById("speak");
    const stopButton = document.getElementById("stop");

    let voices = [];

    function populateVoices() {
      voices = synth.getVoices();
      voiceSelect.innerHTML = "";
      if (voices.length === 0) {
        const option = document.createElement("option");
        option.textContent = "No voices available";
        voiceSelect.appendChild(option);
        return;
      }
      voices.forEach(voice => {
        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
      });
    }

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }

    let utterance;

    function speakText() {
      if (synth.speaking) {
        synth.cancel(); // Stop current speech
      }

      const text = textInput.value.trim();
      if (!text) {
        alert("Please enter some text to speak.");
        return;
      }

      utterance = new SpeechSynthesisUtterance(text);

      const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.rate = parseFloat(rate.value);
      utterance.pitch = parseFloat(pitch.value);

      synth.speak(utterance);
    }

    function stopSpeech() {
      if (synth.speaking) {
        synth.cancel();
      }
    }

    speakButton.addEventListener("click", speakText);
    stopButton.addEventListener("click", stopSpeech);

    rate.addEventListener("input", () => {
      rateValue.textContent = rate.value;
    });

    pitch.addEventListener("input", () => {
      pitchValue.textContent = pitch.value;
    });

    voiceSelect.addEventListener("change", () => {
      if (synth.speaking) {
        speakText(); // Restart with new voice
      }
    });