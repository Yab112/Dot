// Lightbulb functionality
const bulb = document.getElementById('bulb');
const turnOn = document.querySelector('.turn-on');
const turnOff = document.querySelector('.turn-off');

turnOn.addEventListener('click', () => {
    bulb.style.backgroundColor = 'yellow';
    bulb.style.boxShadow = '0 0 70px yellow';
});

turnOff.addEventListener('click', () => {
    bulb.style.backgroundColor = 'transparent';
    bulb.style.boxShadow = 'none';
});

// Clock functionality
const clockElement = document.getElementById('clock');
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = 
        hours + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0') + ' ' + 
        ampm;

    return formattedTime;
}

clockElement.querySelector('button').addEventListener('click', () => {
    alert(getCurrentTime());
});

// Remove first and last character from string
const removeCharBtn = document.getElementById('removeCharBtn');
const output = document.getElementById('output');

removeCharBtn.addEventListener('click', () => {
    const inputString = document.getElementById('userInput').value;
    if (inputString.length <= 2 && inputString.length > 0) {
        output.innerText = "Input is too short!";
    } 
    else if (inputString.length === 0) {
        output.innerText = "Input is empty!";
    } else {
        const modifiedString = removeFirstAndLastChar(inputString);
        output.innerText = `Modified String: ${modifiedString}`;
    }
});

function removeFirstAndLastChar(str) {
    return str.substring(1, str.length - 1);
}
