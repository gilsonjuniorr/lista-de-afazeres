const button = document.querySelector('#float-button');
let theme;

if (localStorage.getItem('theme') === 'pink') {
    theme = true;
    setPinkTheme();
} else {
    theme = false;
    setBlueTheme();
}

button.addEventListener('click', function(e) {
    if (theme) {
        setBlueTheme();
    } else {
        setPinkTheme();
    }

    theme = !theme;
    localStorage.setItem('theme', theme ? 'pink' : 'blue');
})

function setPinkTheme() {
    document.body.style.backgroundColor = '#FAACA8';
    document.body.style.backgroundImage = 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)';
    button.style.backgroundColor = '#0093E9';
    button.style.backgroundImage = 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
}

function setBlueTheme() {
    document.body.style.backgroundColor = '#0093E9';
    document.body.style.backgroundImage = 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
    button.style.backgroundColor = '#FAACA8';
    button.style.backgroundImage = 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)';
}