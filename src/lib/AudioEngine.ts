"use client";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  
  // Nodes
  private masterGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;

  public async init() {
    if (this.ctx) return;
    
    // Initialize Web Audio API
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    
    // Master gain for fade in/out
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.ctx.destination);

    // Deep drone oscillator
    this.droneOsc = this.ctx.createOscillator();
    this.droneOsc.type = "sine";
    this.droneOsc.frequency.value = 55; // Deep A1 note

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0.4;
    
    this.droneOsc.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);

    // LFO to modulate the drone volume slowly (adds movement)
    this.lfo = this.ctx.createOscillator();
    this.lfo.type = "sine";
    this.lfo.frequency.value = 0.05; // Very slow, 20s period
    
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.2; // Modulate volume by 20%
    
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.droneGain.gain);

    // Start oscillators
    this.droneOsc.start();
    this.lfo.start();
  }

  public async toggle() {
    if (!this.ctx) await this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    if (this.isPlaying) {
      // Fade out
      this.masterGain.gain.setTargetAtTime(0, now, 1);
      this.isPlaying = false;
    } else {
      // Fade in
      this.masterGain.gain.setTargetAtTime(1, now, 2);
      this.isPlaying = true;
    }

    return this.isPlaying;
  }
  
  public setIntensity(progress: number) {
    if (!this.ctx || !this.droneOsc || !this.isPlaying) return;
    
    const now = this.ctx.currentTime;
    
    // As progress goes from 0 to 1, pitch goes from 55Hz to 110Hz (one octave up)
    const targetFreq = 55 + (progress * 55);
    this.droneOsc.frequency.setTargetAtTime(targetFreq, now, 2);
  }

  public getState() {
    return this.isPlaying;
  }
}

// Singleton instance
export const audio = typeof window !== 'undefined' ? new AudioEngine() : null;
