// Matrix Animation Setup
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-bg');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789πΣΔΘΩ∞∫∂√∑∏μσ';
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
        
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Recalculate columns and ensure it's a positive number
        this.columns = Math.max(1, Math.floor(this.canvas.width / this.fontSize));
        // Safely create new drops array
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#4ade80';
        this.ctx.font = `${this.fontSize}px 'Share Tech Mono'`;

        for(let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Pi Calculation Logic
class PiCalculator {
    constructor() {
        this.form = document.getElementById('pi-form');
        this.input = document.getElementById('iterations');
        this.resultContainer = document.getElementById('result-container');
        this.piResult = document.getElementById('pi-result');
        this.calculationTime = document.getElementById('calculation-time');
        this.errorMessage = document.getElementById('error-message');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.addEventListener('reset', () => this.handleReset());
    }

    calculatePi(iterations) {
        let pi = 0;
        for(let i = 0; i < iterations; i++) {
            pi += Math.pow(-1, i) / (2 * i + 1);
        }
        return 4 * pi;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
        setTimeout(() => {
            this.errorMessage.classList.add('hidden');
        }, 5000);
    }

    handleReset() {
        this.resultContainer.classList.add('hidden');
        this.errorMessage.classList.add('hidden');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const iterations = parseInt(this.input.value);
        
        if (!iterations || iterations < 1 || iterations > 1000000) {
            this.showError('Please enter a number between 1 and 1000000');
            return;
        }

        // Show loading state
        this.piResult.textContent = 'Calculating';
        this.piResult.classList.add('loading');
        this.resultContainer.classList.remove('hidden');
        
        // Calculate pi in the next frame to allow UI update
        const startTime = performance.now();
        
        setTimeout(() => {
            try {
                const result = this.calculatePi(iterations);
                const endTime = performance.now();
                const timeElapsed = ((endTime - startTime) / 1000).toFixed(3);
                
                this.piResult.classList.remove('loading');
                this.piResult.textContent = result.toFixed(10);
                this.calculationTime.textContent = `Calculation time: ${timeElapsed} seconds`;
                
                // Add glow effect to result
                this.piResult.classList.add('glow');
                
            } catch (error) {
                this.showError('An error occurred during calculation');
                console.error('Calculation error:', error);
            }
        }, 0);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MatrixRain();
    new PiCalculator();
});
