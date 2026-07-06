const buttons = document.querySelectorAll('.button__key');
const containerKeys = document.querySelector('.container__keys')



const sounds = {
    boom: new Audio('./assets/sounds/boom.wav'),
    clap: new Audio('./assets/sounds/clap.wav'),
    hihat: new Audio('./assets/sounds/hihat.wav'),
    kick: new Audio('./assets/sounds/kick.wav'),
    openhat: new Audio('./assets/sounds/openhat.wav'),
    ride: new Audio('./assets/sounds/ride.wav'),
    snare: new Audio('./assets/sounds/snare.wav'),
    tink: new Audio('./assets/sounds/tink.wav'),
    tom: new Audio('./assets/sounds/tom.wav')

  };

  buttons.forEach((button) => {
    button.addEventListener('transitionend', removeTransition);
  });
  function playSoundButton(soundName){
    const audio = sounds[soundName];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play()  
}

function handleButton(button){
    if (!button) return;

    const soundName = button.dataset.action;
    
    playSoundButton(soundName);
    button.classList.add('playing');
}
window.addEventListener('keydown', () => {
    const keyButton = document.querySelector(`[data-key="${event.code}"]`);
    
    handleButton(keyButton)
});
  buttons.forEach(button => {
        button.addEventListener('click', () => {
        
        handleButton(button)
    })
  })

function removeTransition(event){
    if (event.propertyName !== 'transform') return;
    event.currentTarget.classList.remove('playing');

}