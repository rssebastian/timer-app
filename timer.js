class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.isRunning = false;
        
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
        
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        };
    };
    
    start = () => {
        if (!this.isRunning) {
            this.isRunning = true;
            if (this.onStart) this.onStart(this.timeRemaining);
            this.tick();
            this.intervalId = setInterval(this.tick, 20);    
        };
        
    };
    
    pause = () => {
        clearInterval(this.intervalId);
        this.isRunning = false;
    };
    
    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause()
            if (this.onComplete) this.onComplete();
        } else {
            this.timeRemaining = this.timeRemaining - 0.02;
            if (this.onTick) this.onTick(this.timeRemaining);
        };
    };
    
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    };
    
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    };
}