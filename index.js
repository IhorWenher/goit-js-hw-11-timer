"use strict";

const refs = {
    startBtn: document.querySelector('[data-action-start]'),
    stopBtn: document.querySelector('[data-action-stop]'),
    dateInput: document.querySelector('.js-date-input'),
    stopDateInput: document.querySelector('.js-date-input'),
    daysMonitor: document.querySelector('[data-value="days"]'),
    hoursMonitor: document.querySelector('[data-value="hours"]'),
    minsMonitor: document.querySelector('[data-value="mins"]'),
    secsMonitor: document.querySelector('[data-value="secs"]'),
}

class Timer {
    constructor() {
        this.intervalId = null;
        this.isActive = false;
        this.init();
    }

    init() {
        const time = this.getTimeComponents(0);
        this.updateClockface(time);
    }

    start() {
        if (this.isActive || refs.stopDateInput.value === "") {
            return;
        }

        // Дата с формы в unix
        const stopDateArray = refs.stopDateInput.value.split('-');
        const stopDateArrayForDateFormat = [stopDateArray[0], stopDateArray[1] - 1, stopDateArray[2]];
        const stopDate = new Date(...stopDateArrayForDateFormat);
        const stopDateUnix = stopDate.getTime();
        //

        const startTime = stopDateUnix;

        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            this.isActive = true;
            const deltaTime = startTime - currentTime;

            const time = this.getTimeComponents(deltaTime);

            this.updateClockface(time);
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.updateClockface(time);
        refs.stopDateInput.value = null;
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


    updateClockface({ days, hours, mins, secs }) {
        refs.daysMonitor.textContent = days;
        refs.hoursMonitor.textContent = hours;
        refs.minsMonitor.textContent = mins;
        refs.secsMonitor.textContent = secs;
    }
}

const timer = new Timer();

refs.startBtn.addEventListener('click', timer.start.bind(timer));

refs.stopBtn.addEventListener('click', timer.stop.bind(timer));