"""
Script de generació d'àudios sintètics en format WAV per a les pràctiques
de la matèria Digitalització 4t d'ESO - Bloc: Edició d'Àudio.

Aquest script utilitza exclusivament la biblioteca estàndard de Python (wave, math, struct, random, os)
i produeix fitxers PCM de 16 bits a 44100 Hz totalment compatibles amb qualsevol navegador web.
"""

import os
import math
import struct
import random

SAMPLE_RATE = 44100
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) if "__file__" in globals() else os.path.abspath(os.getcwd())
OUTPUT_DIR = os.path.join(BASE_DIR, "recursos", "audio")

def save_wav(filename, samples, sample_rate=SAMPLE_RATE):
    """Guarda una llista de mostres de float (-1.0 a 1.0) en un fitxer WAV de 16 bits."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(OUTPUT_DIR, filename)
    
    # Normalització suau per evitar saturació / clipping
    max_val = max(abs(s) for s in samples) if samples else 1.0
    norm_factor = 0.92 / max_val if max_val > 0.92 else 1.0
    
    with wave.open(filepath, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16 bits (2 bytes)
        wav_file.setframerate(sample_rate)
        
        packed_frames = bytearray()
        for s in samples:
            val = int(s * norm_factor * 32767.0)
            val = max(-32768, min(32767, val))
            packed_frames.extend(struct.pack('<h', val))
            
        wav_file.writeframes(packed_frames)
    
    print(f" -> Generat amb èxit: {filename} ({len(samples)/sample_rate:.2f}s)")

import wave

# ==============================================================================
# 1. PRÀCTICA 1: Seqüència musical desordenada
# ==============================================================================
def generar_p1_sequencia():
    """
    Genera 5 notes musicals pentatòniques amb timbre de xilòfon/sintetitzador
    intencionadament desordenades: [Sol4, Do4, Do5, Mi4, Re4].
    L'alumnat les haurà de tallar i ordenar en escala ascendent: Do4 - Re4 - Mi4 - Sol4 - Do5.
    """
    # Freqüències: Do4 (261.63), Re4 (293.66), Mi4 (329.63), Sol4 (392.00), Do5 (523.25)
    desordre = [
        ("Sol4", 392.00),
        ("Do4", 261.63),
        ("Do5", 523.25),
        ("Mi4", 329.63),
        ("Re4", 293.66),
    ]
    
    samples = []
    durada_nota = 0.7  # segons
    durada_silenci = 0.35 # segons
    
    for nom, freq in desordre:
        n_samples_nota = int(durada_nota * SAMPLE_RATE)
        for i in range(n_samples_nota):
            t = i / SAMPLE_RATE
            # Envolupant acústic amb atac ràpid i decaïment exponencial
            env = math.exp(-3.5 * t / durada_nota)
            # Timbre amb harmònics (fundamental + 2n + 3r harmònic)
            s = (0.65 * math.sin(2 * math.pi * freq * t) +
                 0.25 * math.sin(2 * math.pi * freq * 2 * t) +
                 0.10 * math.sin(2 * math.pi * freq * 3 * t)) * env
            samples.append(s)
            
        # Silenci entre notes
        n_silenci = int(durada_silenci * SAMPLE_RATE)
        samples.extend([0.0] * n_silenci)
        
    save_wav("p1_sequencia_desordenada.wav", samples)

# ==============================================================================
# 2. PRÀCTICA 2: Porta original i Porta de terror amb efectes
# ==============================================================================
def generar_p2_porta_original():
    """
    So original d'una porta de fusta que xerrica i es tanca de cop.
    """
    samples = []
    
    # Pas 1: El xerric de la frontissa (1.4s)
    durada_xerric = 1.4
    n_xerric = int(durada_xerric * SAMPLE_RATE)
    random.seed(42)
    for i in range(n_xerric):
        t = i / SAMPLE_RATE
        # Freqüència base que puja i baixa (modulació de freqüència)
        freq_base = 380 + 160 * math.sin(2 * math.pi * 1.8 * t) + 80 * math.sin(2 * math.pi * 5.2 * t)
        # Jitter de fricció
        friccio = math.sin(2 * math.pi * 48 * t)
        env = math.sin(math.pi * (t / durada_xerric)) ** 0.8
        # Soroll metàl·lic de frec
        soroll = (random.random() * 2.0 - 1.0) * 0.15
        s = (math.sin(2 * math.pi * freq_base * t + friccio * 0.5) + soroll) * env * 0.7
        samples.append(s)
        
    # Petit silenci
    samples.extend([0.0] * int(0.15 * SAMPLE_RATE))
    
    # Pas 2: El cop sec de la porta tancant-se (0.6s)
    durada_cop = 0.6
    n_cop = int(durada_cop * SAMPLE_RATE)
    for i in range(n_cop):
        t = i / SAMPLE_RATE
        # Transitori inicial ràpid (click)
        click = (random.random() * 2.0 - 1.0) * math.exp(-120 * t) * 0.6
        # Ressonància de fusta greu (85 Hz)
        ressonancia = math.sin(2 * math.pi * 85 * (1 - 0.2*t) * t) * math.exp(-18 * t) * 0.8
        ressonancia2 = math.sin(2 * math.pi * 170 * t) * math.exp(-25 * t) * 0.4
        s = (click + ressonancia + ressonancia2)
        samples.append(s)
        
    save_wav("p2_porta_original.wav", samples)

def generar_p2_porta_terror_exemple():
    """
    Exemple acabat de la porta transformada: greu, alentida, amb atmosfera misteriosa i ressò fosc.
    """
    samples = []
    durada_total = 4.8
    n_total = int(durada_total * SAMPLE_RATE)
    
    # Generem primer la font sintètica molt més greu i lenta
    font = []
    durada_creak_lenta = 2.4
    n_creak = int(durada_creak_lenta * SAMPLE_RATE)
    random.seed(1337)
    for i in range(n_creak):
        t = i / SAMPLE_RATE
        # Molt més greu (120 - 180 Hz)
        freq_base = 130 + 50 * math.sin(2 * math.pi * 0.9 * t)
        jitter = math.sin(2 * math.pi * 22 * t) * 0.8
        env = math.sin(math.pi * (t / durada_creak_lenta)) ** 1.2
        soroll = (random.random() * 2.0 - 1.0) * 0.12
        s = (math.sin(2 * math.pi * freq_base * t + jitter) + soroll) * env * 0.75
        font.append(s)
        
    font.extend([0.0] * int(0.2 * SAMPLE_RATE))
    
    # Cop sec greu de subgreus estil cinema de terror
    durada_boom = 1.6
    n_boom = int(durada_boom * SAMPLE_RATE)
    for i in range(n_boom):
        t = i / SAMPLE_RATE
        sub = math.sin(2 * math.pi * 42 * (1 - 0.15*t) * t) * math.exp(-4.5 * t) * 0.9
        fusta = math.sin(2 * math.pi * 95 * t) * math.exp(-9.0 * t) * 0.6
        soroll_cop = (random.random() * 2.0 - 1.0) * math.exp(-35 * t) * 0.4
        font.append(sub + fusta + soroll_cop)
        
    # Omplim de silencis fins a n_total
    if len(font) < n_total:
        font.extend([0.0] * (n_total - len(font)))
    else:
        font = font[:n_total]
        
    # Afegim atmosfera de fons fantasmal (bordó de 65Hz) + Eco / Delay amb retard de 0.38s
    delay_samples = int(0.38 * SAMPLE_RATE)
    delay_feedback = 0.48
    
    samples = [0.0] * n_total
    for i in range(n_total):
        t = i / SAMPLE_RATE
        # Zumbido d'ambient misteriós
        amb = 0.08 * math.sin(2 * math.pi * 55 * t) + 0.04 * math.sin(2 * math.pi * 110 * t + 0.3)
        # Font directa
        s = font[i] + amb
        # Retard 1
        if i >= delay_samples:
            s += font[i - delay_samples] * delay_feedback
        # Retard 2
        if i >= 2 * delay_samples:
            s += font[i - 2 * delay_samples] * (delay_feedback ** 2)
        # Retard 3
        if i >= 3 * delay_samples:
            s += font[i - 3 * delay_samples] * (delay_feedback ** 3)
            
        samples[i] = s
        
    save_wav("p2_porta_terror_exemple.wav", samples)

# ==============================================================================
# 3. PRÀCTICA 3: Paisatges sonors (Pluja/Vent, Passes, Tro)
# ==============================================================================
def generar_p3_pluja_vent():
    """
    So continu ambiental de pluja amb ràfegues de vent fluctuants (7.0 segons).
    """
    durada = 7.0
    n = int(durada * SAMPLE_RATE)
    samples = [0.0] * n
    random.seed(99)
    
    # Estat del filtre de soroll rosa per al vent
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
    
    for i in range(n):
        t = i / SAMPLE_RATE
        white = random.random() * 2.0 - 1.0
        
        # Filtre de soroll rosa (algorisme de Paul Kellet)
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
        b6 = white * 0.115926
        pink *= 0.12
        
        # Modulació del vent: ràfegues suaus que van i vénen
        vent_mod = (0.5 + 0.35 * math.sin(2 * math.pi * 0.18 * t) + 0.15 * math.sin(2 * math.pi * 0.42 * t))
        vent = pink * vent_mod * 1.5
        
        # Pluja: soroll d'alta freqüència amb esquitxades esporàdiques
        pluja_fons = white * 0.06
        esquitx = 0.0
        if random.random() < 0.015:  # Gotallums aïllats
            esquitx = (random.random() * 2.0 - 1.0) * 0.35
            
        total = vent + pluja_fons + esquitx
        
        # Fonedís inicial i final per a bucle suau
        fade = min(1.0, t / 0.4) * min(1.0, (durada - t) / 0.4)
        samples[i] = total * fade
        
    save_wav("p3_pluja_vent.wav", samples)

def generar_p3_passes():
    """
    Seqüència de 7 passes fermes sobre un terra de fusta o grava cruixent (4.5 segons).
    """
    durada = 4.5
    n = int(durada * SAMPLE_RATE)
    samples = [0.0] * n
    random.seed(55)
    
    interval = 0.58  # segons entre pas i pas
    n_passes = 7
    temps_inici = 0.35
    
    for pas in range(n_passes):
        t_pas = temps_inici + pas * interval
        idx_inici = int(t_pas * SAMPLE_RATE)
        durada_pas = 0.22
        n_pas_mostres = int(durada_pas * SAMPLE_RATE)
        
        pitch_factor = 1.0 + (0.08 if pas % 2 == 0 else -0.06)  # Variació peu esquerre / dret
        
        for k in range(n_pas_mostres):
            idx = idx_inici + k
            if idx >= n:
                break
            tk = k / SAMPLE_RATE
            
            # Cruixit d'alta freqüència inicial (sola tocant terra)
            cruixit = (random.random() * 2.0 - 1.0) * math.exp(-38 * tk) * 0.45
            # Ressò greu del tauló (115 Hz)
            ressonancia = math.sin(2 * math.pi * (115 * pitch_factor) * tk) * math.exp(-22 * tk) * 0.55
            
            samples[idx] += (cruixit + ressonancia) * 0.9
            
    save_wav("p3_passes.wav", samples)

def generar_p3_tro():
    """
    Llampec sobtat seguit d'un tro greu que retruny i s'allunya (5.2 segons).
    """
    durada = 5.2
    n = int(durada * SAMPLE_RATE)
    samples = [0.0] * n
    random.seed(888)
    
    # Silenci expectant abans de l'esclat
    t_esclat = 0.35
    idx_esclat = int(t_esclat * SAMPLE_RATE)
    
    # 1. Esclat d'impacte inicial ràpid
    for i in range(idx_esclat, n):
        t_rel = (i - idx_esclat) / SAMPLE_RATE
        # Soroll caòtic del tro
        soroll = (random.random() * 2.0 - 1.0)
        
        # Crack inicial
        crack = soroll * math.exp(-14 * t_rel) * 0.8 if t_rel < 0.3 else 0.0
        
        # Ressò greu i ona de xoc ondulant
        ondulacio = (0.6 * math.sin(2 * math.pi * 45 * t_rel) + 
                     0.4 * math.sin(2 * math.pi * 32 * t_rel + math.sin(2 * math.pi * 3 * t_rel)))
        
        # Envolupant d'expansió i caiguda
        env_tro = (t_rel ** 0.5) * math.exp(-0.85 * t_rel) * 1.8
        
        ressò_soroll = soroll * math.exp(-0.9 * t_rel) * 0.35
        
        val = crack + (ondulacio * 0.65 + ressò_soroll) * env_tro
        samples[i] = val
        
    save_wav("p3_tro.wav", samples)

# ==============================================================================
# 4. PRÀCTICA 5: Bases Rítmiques (120 BPM i 100 BPM per a transicions)
# ==============================================================================
def generar_p5_base_ritmica_1():
    """
    Base electrònica estil House / Dance a 120 BPM (4 temps/segon -> 0.5s per pulsació).
    Durada: 2 compassos de 4/4 = 8 pulsacions = 4.0 segons.
    """
    bpm = 120.0
    sec_per_beat = 60.0 / bpm  # 0.5s
    durada = 8 * sec_per_beat   # 4.0s
    n = int(durada * SAMPLE_RATE)
    samples = [0.0] * n
    random.seed(120)
    
    # Afegim elements rítmics compassats
    for i in range(n):
        t = i / SAMPLE_RATE
        beat_pos = (t % sec_per_beat) / sec_per_beat
        beat_num = int(t / sec_per_beat)
        
        # 1. Bombo (Kick) a cada temps (Four-on-the-floor): 0, 1, 2, 3, 4, 5, 6, 7
        t_kick = t % sec_per_beat
        freq_kick = 55 + 160 * math.exp(-35 * t_kick)
        kick = math.sin(2 * math.pi * freq_kick * t_kick) * math.exp(-12 * t_kick) * 0.85
        
        # 2. Caixa / Clap (Snare) als temps 2 i 4 (índexs 1, 3, 5, 7)
        snare = 0.0
        if beat_num % 2 == 1:
            t_snare = t % sec_per_beat
            soroll_snare = (random.random() * 2.0 - 1.0) * math.exp(-22 * t_snare) * 0.5
            ton_snare = math.sin(2 * math.pi * 190 * t_snare) * math.exp(-30 * t_snare) * 0.3
            snare = soroll_snare + ton_snare
            
        # 3. Xarleston (Hi-hat a contratemps - semicorxeres a mig temps)
        t_hihat = (t + sec_per_beat/2) % sec_per_beat
        hihat = 0.0
        if t_hihat < 0.12:
            hihat = (random.random() * 2.0 - 1.0) * math.exp(-55 * t_hihat) * 0.22
            
        # 4. Línia de baix sintètic sintètic (Nota La2: 110Hz -> Do3: 130.8Hz -> Re3: 146.8Hz -> Mi3: 164.8Hz)
        notes = [110.0, 110.0, 130.81, 146.83, 110.0, 164.81, 146.83, 130.81]
        freq_baix = notes[beat_num % len(notes)]
        baix_env = math.exp(-6.0 * (t % (sec_per_beat / 2)))
        baix = (math.sin(2 * math.pi * freq_baix * t) + 
                0.35 * math.sin(2 * math.pi * freq_baix * 2 * t)) * baix_env * 0.4
                
        samples[i] = (kick + snare + hihat + baix) * 0.75
        
    save_wav("p5_base_ritmica_1.wav", samples)

def generar_p5_base_ritmica_2():
    """
    Base rítmica Hip-Hop / Lofi a 100 BPM (0.6s per pulsació).
    Durada: 2 compassos de 4/4 = 8 pulsacions = 4.8 segons.
    """
    bpm = 100.0
    sec_per_beat = 60.0 / bpm  # 0.6s
    durada = 8 * sec_per_beat   # 4.8s
    n = int(durada * SAMPLE_RATE)
    samples = [0.0] * n
    random.seed(100)
    
    # Patró Boom-Bap càlid
    kick_times = [0.0, 1.5, 4.0, 5.5, 6.75]  # Posicions en pulsacions
    snare_times = [1.0, 3.0, 5.0, 7.0]
    
    for i in range(n):
        t = i / SAMPLE_RATE
        cur_beat = t / sec_per_beat
        
        # 1. Bombo acústic càlid
        kick = 0.0
        for kb in kick_times:
            tk = t - (kb * sec_per_beat)
            if 0 <= tk < 0.35:
                freq_k = 48 + 90 * math.exp(-30 * tk)
                kick += math.sin(2 * math.pi * freq_k * tk) * math.exp(-9 * tk) * 0.8
                
        # 2. Caixa / Rimshot suau
        snare = 0.0
        for sb in snare_times:
            ts = t - (sb * sec_per_beat)
            if 0 <= ts < 0.28:
                soroll_s = (random.random() * 2.0 - 1.0) * math.exp(-25 * ts) * 0.4
                body_s = math.sin(2 * math.pi * 175 * ts) * math.exp(-35 * ts) * 0.35
                snare += soroll_s + body_s
                
        # 3. Hi-hat swung càlid a cada corxera (0, 0.5, 1, 1.5...)
        eighth = (t % (sec_per_beat / 2))
        hihat = 0.0
        if eighth < 0.08:
            hihat = (random.random() * 2.0 - 1.0) * math.exp(-70 * eighth) * 0.16
            
        # 4. Teclat elèctric / Rhodes ambiental (acord FaMaj7 -> MiMenor7)
        chord_freqs = [174.61, 220.0, 261.63, 329.63] if cur_beat < 4.0 else [164.81, 196.0, 246.94, 293.66]
        rhodes = 0.0
        for f in chord_freqs:
            rhodes += math.sin(2 * math.pi * f * t) * 0.08
        rhodes *= (0.7 + 0.3 * math.sin(2 * math.pi * 0.5 * t))
        
        samples[i] = (kick + snare + hihat + rhodes) * 0.75
        
    save_wav("p5_base_ritmica_2.wav", samples)

def main():
    print("==================================================")
    print("Iniciant generació d'àudios sintètics de suport...")
    print(f"Carpeta destí: {OUTPUT_DIR}")
    print("==================================================")
    
    generar_p1_sequencia()
    generar_p2_porta_original()
    generar_p2_porta_terror_exemple()
    generar_p3_pluja_vent()
    generar_p3_passes()
    generar_p3_tro()
    generar_p5_base_ritmica_1()
    generar_p5_base_ritmica_2()
    
    print("==================================================")
    print("Tots els fitxers d'àudio s'han generat correctament!")
    print("==================================================")

if __name__ in ("__main__", "builtins"):
    main()
