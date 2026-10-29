/**
 * Web Audio API Synthesizer for rich interactive sound effects and romantic music-box melody fallback.
 * Works 100% offline without needing external audio asset downloads!
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private fallbackInterval: number | null = null;
  private isFallbackPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isFallbackPlaying) {
      this.stopFallbackMelody();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Magical chime harp sweep for opening the gate or revealing elements
   */
  public playGateChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00]; // C5, E5, G5, C6, E6, G6, C7
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  }

  /**
   * Delicate paper unfold sound for the letter
   */
  public playLetterOpen() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.25);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * Sparkle sound for typing letter or star wish
   */
  public playTypewriterSparkle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const pitches = [1318.51, 1479.98, 1661.22, 1760.00, 1975.53];
    const pitch = pitches[Math.floor(Math.random() * pitches.length)];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  /**
   * Magical gift box open sound
   */
  public playGiftBoxOpen() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Pop low note
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(220, now);
    popOsc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
    popGain.gain.setValueAtTime(0.25, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    popOsc.connect(popGain);
    popGain.connect(this.ctx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.3);

    // Sparkle flourish
    const arpeggio = [659.25, 830.61, 987.77, 1318.51, 1661.22];
    arpeggio.forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + 0.1 + i * 0.06);

      gain.gain.setValueAtTime(0, now + 0.1 + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.1 + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1 + i * 0.06 + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.1 + i * 0.06);
      osc.stop(now + 0.1 + i * 0.06 + 0.8);
    });
  }

  /**
   * Candle blow-out puff and gentle wind
   */
  public playCandleBlow() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Wind burst using filtered noise buffer
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.6);
  }

  /**
   * Rocket launch whistle/whoosh before exploding
   */
  public playRocketLaunch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.95);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.linearRampToValueAtTime(1300, now + 0.95);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.05);
  }

  /**
   * Fireworks boom & crackle
   */
  public playFireworkBoom() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Deep boom
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.45);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.65);

    // Sparkle crackle
    const count = 4;
    for (let i = 0; i < count; i++) {
      const crackleTime = now + 0.2 + i * 0.07;
      const cOsc = this.ctx.createOscillator();
      const cGain = this.ctx.createGain();
      cOsc.type = 'triangle';
      cOsc.frequency.setValueAtTime(1200 + Math.random() * 600, crackleTime);

      cGain.gain.setValueAtTime(0.08, crackleTime);
      cGain.gain.exponentialRampToValueAtTime(0.001, crackleTime + 0.12);

      cOsc.connect(cGain);
      cGain.connect(this.ctx.destination);
      cOsc.start(crackleTime);
      cOsc.stop(crackleTime + 0.15);
    }
  }

  /**
   * Multiple fireworks salvo (nổ bùng bùng liên hồi)
   */
  public playFireworkSalvo() {
    this.playFireworkBoom();
    setTimeout(() => this.playFireworkBoom(), 250);
    setTimeout(() => this.playFireworkBoom(), 600);
    setTimeout(() => this.playFireworkBoom(), 1050);
    setTimeout(() => this.playFireworkBoom(), 1500);
  }

  /**
   * Wish star launch chime
   */
  public playWishLaunch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.5);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.85);
  }

  /**
   * Romantic Music Box Fallback Melody
   * Plays a gorgeous, soothing celesta melody (Canon in D / Romantic arpeggio)
   * if user has not yet placed an MP3 in public/music/birthday.mp3.
   */
  public startFallbackMelody(volume: number = 0.5) {
    if (this.isMuted || this.isFallbackPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.isFallbackPlaying = true;

    // Romantic music box sequence (frequencies in Hz)
    const melodyNotes = [
      // Measure 1
      523.25, 659.25, 783.99, 1046.5,
      // Measure 2
      783.99, 987.77, 1174.66, 1567.98,
      // Measure 3
      880.00, 1046.5, 1318.51, 1760.00,
      // Measure 4
      659.25, 783.99, 1046.50, 1318.51,
      // Measure 5
      698.46, 880.00, 1046.50, 1396.91,
      // Measure 6
      523.25, 659.25, 783.99, 1046.50,
      // Measure 7
      698.46, 880.00, 1046.50, 1318.51,
      // Measure 8
      783.99, 987.77, 1174.66, 1318.51
    ];

    let noteIndex = 0;
    const playNextNote = () => {
      if (!this.isFallbackPlaying || this.isMuted || !this.ctx) return;

      const freq = melodyNotes[noteIndex % melodyNotes.length];
      const now = this.ctx.currentTime;

      // Bell / Celesta oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const targetGain = 0.08 * volume;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);

      noteIndex++;
    };

    // Play every 360ms for a gentle soothing tempo
    this.fallbackInterval = window.setInterval(playNextNote, 360);
    playNextNote();
  }

  public stopFallbackMelody() {
    this.isFallbackPlaying = false;
    if (this.fallbackInterval !== null) {
      clearInterval(this.fallbackInterval);
      this.fallbackInterval = null;
    }
  }

  public isFallbackActive(): boolean {
    return this.isFallbackPlaying;
  }
}

export const soundEngine = new SoundEngine();

