"use strict";


/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
//const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
//const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
//const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
//const secs = Math.floor((time % (1000 * 60)) / 1000);

const refs = {
    startBtn: document.querySelector('[data-action-start]'),
    stopBtn: document.querySelector('[data-action-stop]'),
    dateInput: document.querySelector('.js-date-input'),
    clockface: document.querySelector('.test-timer')

}

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
        this.init();
    }

    init() {
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }

    start() {
        console.log("Cтарт клік");
        if (this.isActive) {
            return;
        }

        const startTime = Date.now();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            this.isActive = true;
            const deltaTime = currentTime - startTime;
            //const deltaMinus = startTime - currentTime;
            const time = this.getTimeComponents(deltaTime);
            //const timeComponentsMinus = getTimeComponents(deltaMinus);

            this.onTick(time);
            console.log(`${days}:${hours}:${mins}:${secs}`);

        }, 1000);
    }

    stop() {
        console.log("Cтоп клік");
        clearInterval(this.intervalId);
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }


    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateClockface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateClockface({ days, hours, mins, secs }) {
    refs.clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
}
