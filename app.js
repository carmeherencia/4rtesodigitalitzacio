/**
 * MOTOR JAVASCRIPT DINÀMIC - DIGITALITZACIÓ 4t ESO
 * Institut Matadepera · Curs 2026-2027
 *
 * Funcionalitats:
 * - Renderització reactiva a partir de 'dades/continguts.js'
 * - Canvi dinàmic de blocs temàtics (Àudio actiu, Photopea/Python/Vídeo pròximament)
 * - Sub-navegació del bloc d'àudio: Pràctiques (Fases 1-4), Teoria Express, Banc de Sons, Avaluació Final
 * - Checklists interactives amb càlcul de percentatge i persistència a localStorage
 * - Rúbriques d'autoavaluació amb suma de punts sobre 10 i còpia per a Classroom
 * - Reproductors d'àudio HTML5 i descàrrega directa de fitxers WAV
 * - Qüestionari d'avaluació final autocorregible de 10 preguntes amb explicacions didàctiques
 * - Gestor de Google Forms oficial i Vídeo tutorials (amb suport YouTube)
 * - Comptador global de progrés de l'alumne
 * - Mode fosc / clar amb memòria
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // ESTAT GLOBAL DE L'APLICACIÓ
  // ==========================================================================
  const appState = {
    blocActiuId: "audio",
    subseccioActiva: "practiques", // "practiques", "teoria", "banc_sons", "avaluacio"
    faseActivaNum: 1,
    practicaActivaId: "p1",
    dades: CONTINGUTS_CURS
  };

  // Elements DOM principals
  const mainWorkspace = document.getElementById("main-workspace");
  const blocksNavContainer = document.getElementById("blocks-nav-container");
  const audioSubnavContainer = document.getElementById("audio-subnav-container");
  const phaseNavContainer = document.getElementById("phase-nav-container");
  const headerProgressFill = document.getElementById("header-progress-fill");
  const headerProgressText = document.getElementById("header-progress-text");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  // ==========================================================================
  // INICIALITZACIÓ I TEMA FOSC/CLAR
  // ==========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem("digitalitzacio_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("digitalitzacio_theme", newTheme);
        updateThemeIcon(newTheme);
      });
    }
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
    themeToggleBtn.setAttribute("title", theme === "dark" ? "Canvia a mode clar" : "Canvia a mode fosc");
  }

  // ==========================================================================
  // CÀLCUL DE PROGRÉS GLOBAL DE L'ALUMNAT
  // ==========================================================================
  function calcularProgresGlobal() {
    let totalPassos = 0;
    let totalCompletats = 0;

    const blocActiu = appState.dades.blocs.find(b => b.id === appState.blocActiuId);
    if (!blocActiu || !blocActiu.practiques) return { fets: 0, totals: 0, percent: 0 };

    blocActiu.practiques.forEach(p => {
      const passos = p.pasos || [];
      totalPassos += passos.length;
      const key = `digitalitzacio_check_${p.id}`;
      try {
        const guardats = JSON.parse(localStorage.getItem(key)) || [];
        totalCompletats += guardats.filter(Boolean).length;
      } catch (e) {
        // En cas d'error de parsing
      }
    });

    const percent = totalPassos > 0 ? Math.round((totalCompletats / totalPassos) * 100) : 0;
    return { fets: totalCompletats, totals: totalPassos, percent };
  }

  function actualitzarBarraProgresCapcalera() {
    const prog = calcularProgresGlobal();
    if (headerProgressFill) {
      headerProgressFill.style.width = `${prog.percent}%`;
    }
    if (headerProgressText) {
      headerProgressText.textContent = `${prog.percent}% completat (${prog.fets}/${prog.totals} passos)`;
    }
  }

  // ==========================================================================
  // RENDERITZADOR DE SELECTORS DE BLOCS TEMÀTICS
  // ==========================================================================
  function renderBlocksNav() {
    if (!blocksNavContainer) return;
    blocksNavContainer.innerHTML = "";

    appState.dades.blocs.forEach(bloc => {
      const btn = document.createElement("button");
      btn.className = `block-tab-btn ${bloc.id === appState.blocActiuId ? "active" : ""}`;
      btn.dataset.blocId = bloc.id;

      const isActiu = bloc.estat === "actiu";
      const statusClass = isActiu ? "status-active" : "status-upcoming";
      const statusText = isActiu ? "● Disponible (100%)" : "○ Pròximament";

      btn.innerHTML = `
        <div class="block-tab-icon">${bloc.icona}</div>
        <div class="block-tab-text">
          <h3>${bloc.titol}</h3>
          <span class="block-tab-status ${statusClass}">${statusText}</span>
        </div>
      `;

      btn.addEventListener("click", () => {
        appState.blocActiuId = bloc.id;
        appState.subseccioActiva = "practiques";
        appState.faseActivaNum = 1;
        if (bloc.practiques && bloc.practiques.length > 0) {
          appState.practicaActivaId = bloc.practiques[0].id;
        }
        window.location.hash = `#${bloc.id}`;
        renderApp();
      });

      blocksNavContainer.appendChild(btn);
    });
  }

  // ==========================================================================
  // SUB-NAVEGADOR DEL BLOC D'ÀUDIO (Pràctiques, Teoria, Banc de Sons, Avaluació)
  // ==========================================================================
  function renderAudioSubnav() {
    if (!audioSubnavContainer) return;

    if (appState.blocActiuId !== "audio") {
      audioSubnavContainer.style.display = "none";
      return;
    }

    audioSubnavContainer.style.display = "flex";

    const seccions = [
      { id: "practiques", titol: "Pràctiques de Taller (7)", icona: "🛠️", hash: "#audio" },
      { id: "teoria", titol: "Teoria Express: Formats", icona: "📚", hash: "#teoria" },
      { id: "banc_sons", titol: "Banc de Sons Gratuïts", icona: "🔊", hash: "#banc-sons" },
      { id: "avaluacio", titol: "Avaluació Final", icona: "📝", hash: "#avaluacio" }
    ];

    audioSubnavContainer.innerHTML = seccions.map(sec => `
      <button class="audio-subnav-btn ${appState.subseccioActiva === sec.id ? "active" : ""}" data-subseccio="${sec.id}">
        <span>${sec.icona}</span>
        <span>${sec.titol}</span>
      </button>
    `).join("");

    const btns = audioSubnavContainer.querySelectorAll(".audio-subnav-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const secId = btn.dataset.subseccio;
        appState.subseccioActiva = secId;
        const targetSec = seccions.find(s => s.id === secId);
        if (targetSec) {
          window.location.hash = targetSec.hash;
        }
        renderApp();
      });
    });
  }

  // ==========================================================================
  // RENDERITZADOR DE FASES (Per al bloc actiu - Pestanya Pràctiques)
  // ==========================================================================
  function renderPhaseNav() {
    if (!phaseNavContainer) return;

    const bloc = appState.dades.blocs.find(b => b.id === appState.blocActiuId);
    if (!bloc || !bloc.fases || bloc.fases.length === 0 || appState.subseccioActiva !== "practiques") {
      phaseNavContainer.style.display = "none";
      return;
    }

    phaseNavContainer.style.display = "block";

    let html = `<div class="phase-nav-list">`;
    bloc.fases.forEach(fase => {
      const isActive = fase.numFase === appState.faseActivaNum;
      
      // Comptem quantes pràctiques té completades aquesta fase
      let practiquesFaseCompletades = 0;
      fase.practiques.forEach(pId => {
        const p = bloc.practiques.find(item => item.id === pId);
        if (p) {
          const key = `digitalitzacio_check_${p.id}`;
          const guardats = JSON.parse(localStorage.getItem(key)) || [];
          if (guardats.length === p.pasos.length && guardats.every(Boolean)) {
            practiquesFaseCompletades++;
          }
        }
      });

      html += `
        <button class="phase-nav-btn ${isActive ? "active" : ""}" data-fase-num="${fase.numFase}">
          <div class="phase-nav-btn-top">
            <span>Fase ${fase.numFase}</span>
            <span class="phase-nav-tool">${fase.eina}</span>
          </div>
          <div style="font-size:0.9rem;">${fase.nom.split(":")[1] || fase.nom}</div>
          <div style="font-size:0.75rem; opacity:0.85;">
            ${practiquesFaseCompletades}/${fase.practiques.length} pràctiques llestes
          </div>
        </button>
      `;
    });
    html += `</div>`;

    phaseNavContainer.innerHTML = html;

    // Afegim esdeveniments de canvi de fase
    const phaseBtns = phaseNavContainer.querySelectorAll(".phase-nav-btn");
    phaseBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const num = parseInt(btn.dataset.faseNum, 10);
        canviarFase(num);
      });
    });
  }

  function canviarFase(numFase) {
    appState.faseActivaNum = numFase;
    const bloc = appState.dades.blocs.find(b => b.id === appState.blocActiuId);
    if (!bloc || !bloc.fases) return;
    const faseObj = bloc.fases.find(f => f.numFase === numFase);
    if (faseObj && faseObj.practiques.length > 0) {
      if (!faseObj.practiques.includes(appState.practicaActivaId)) {
        appState.practicaActivaId = faseObj.practiques[0];
      }
    }
    renderApp();
  }

  // ==========================================================================
  // RENDERITZADOR 1: TEORIA EXPRESS (FORMATS D'ÀUDIO I CREATIVE COMMONS)
  // ==========================================================================
  function renderTeoriaFormats() {
    const blocAudio = appState.dades.blocs.find(b => b.id === "audio");
    if (!blocAudio || !blocAudio.teoriaFormats) return;

    const teoria = blocAudio.teoriaFormats;

    // Targetes dels formats
    const formatsCardsHtml = teoria.formats.map(fmt => `
      <article class="format-card">
        <div class="format-card-header">
          <div class="format-title-wrap">
            <span class="format-icon">${fmt.icona}</span>
            <div>
              <div class="format-name">${fmt.nom} <span style="font-size:0.8rem; font-weight:600; color:var(--primary);">${fmt.extensio}</span></div>
              <div class="format-full-name">${fmt.nomComplet} · ${fmt.creador}</div>
            </div>
          </div>
          <span class="badge ${fmt.badgeClass}">${fmt.compressio.split(" ")[0]}</span>
        </div>

        <div class="format-details-list">
          <div class="format-detail-item">
            <span class="format-detail-label">📦 Tipus de compressió:</span>
            <span class="format-detail-val">${fmt.compressio}</span>
          </div>
          <div class="format-detail-item">
            <span class="format-detail-label">⚖️ Mida i pes al disc:</span>
            <span class="format-detail-val">${fmt.pesAproximat}</span>
          </div>
          <div class="format-detail-item">
            <span class="format-detail-label">🎧 Fidelitat i qualitat:</span>
            <span class="format-detail-val">${fmt.qualitat}</span>
          </div>
          <div class="format-detail-item">
            <span class="format-detail-label">🏫 Aplicació pràctica a l'aula:</span>
            <span class="format-detail-val">${fmt.usAula}</span>
          </div>
        </div>

        <div class="format-tip-box">
          💡 <strong>Consell docent:</strong> ${fmt.consellDocent}
        </div>
      </article>
    `).join("");

    // Files de la taula comparativa
    const tableRowsHtml = teoria.formats.map(fmt => `
      <tr>
        <td><strong>${fmt.nom}</strong> <code>${fmt.extensio}</code></td>
        <td><span class="badge ${fmt.badgeClass}">${fmt.compressio.split(" ")[0]}</span></td>
        <td>${fmt.pesAproximat.split("(")[0]}</td>
        <td>${fmt.nom === "MIDI" ? "Depèn del sintetitzador" : fmt.nom === "WAV" || fmt.nom === "FLAC" ? "100% fidelitat (Sense pèrdua)" : "Molt bona (Lossy)"}</td>
        <td>${fmt.nom === "WAV" ? "Edició màster (AudioMass/BandLab)" : fmt.nom === "MP3" ? "Entrega a Google Classroom" : fmt.nom === "FLAC" ? "Arxiu d'alta definició" : fmt.nom === "OGG" ? "Videojocs i streaming web" : "Teclats i pistes virtuals"}</td>
      </tr>
    `).join("");

    // Llicències Creative Commons
    const cc = teoria.propietatIntellectual;
    const ccCardsHtml = cc.llicencies.map(lic => `
      <div class="cc-item-card">
        <div class="cc-top-row">
          <span class="cc-code" style="color: ${lic.color};">${lic.codi}</span>
          <span class="badge" style="background-color: var(--bg-surface); border: 1px solid var(--border-color); color: ${lic.color}; font-size:0.75rem;">
            ${lic.badge}
          </span>
        </div>
        <div class="cc-nom">${lic.nom}</div>
        <div class="cc-desc">${lic.descripcio}</div>
      </div>
    `).join("");

    mainWorkspace.innerHTML = `
      <div class="teoria-container">
        <!-- Hero de Teoria -->
        <header class="teoria-hero-card">
          <div class="badge badge-fase" style="margin-bottom:0.6rem;">📚 Guia Visual Didàctica</div>
          <h2 class="practice-title">${teoria.titol}</h2>
          <p class="practice-subtitle" style="margin-bottom:1rem;">${teoria.subtitol}</p>
          <p style="font-size:0.95rem; color:var(--text-muted); line-height:1.6;">
            ${teoria.introduccio}
          </p>
        </header>

        <!-- Reixeta de targetes comparatives -->
        <section>
          <h3 class="section-heading">🎛️ Els 5 Formats d'Àudio Digital clau a l'aula</h3>
          <div class="formats-grid">
            ${formatsCardsHtml}
          </div>
        </section>

        <!-- Taula comparativa resum -->
        <section>
          <h3 class="section-heading">📊 Taula Comparativa Ràpida</h3>
          <div class="table-responsive-wrap">
            <table class="formats-table">
              <thead>
                <tr>
                  <th>Format & Extensió</th>
                  <th>Compressió</th>
                  <th>Mida típica</th>
                  <th>Fidelitat sonora</th>
                  <th>Quan fer-lo servir a classe</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHtml}
              </tbody>
            </table>
          </div>
        </section>

        <!-- Secció de Propietat Intel·lectual i Creative Commons -->
        <section class="cc-guide-card">
          <div class="badge badge-tool" style="margin-bottom:0.6rem;">⚖️ Ètica i Competència Ciutadana</div>
          <h3 class="practice-title" style="font-size:1.45rem;">${cc.titol}</h3>
          <p class="practice-subtitle" style="margin-bottom:1.25rem;">${cc.subtitol}</p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
            ${cc.conceptesClau.map(c => `
              <div style="background-color:var(--bg-surface-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.2rem;">
                <h4 style="font-size:0.95rem; font-weight:800; color:var(--text-main); margin-bottom:0.4rem;">${c.nom}</h4>
                <p style="font-size:0.86rem; color:var(--text-muted); line-height:1.5;">${c.descripcio}</p>
              </div>
            `).join("")}
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
            Les 4 Llicències Creative Commons més habituals per a sons i música:
          </h4>
          <div class="cc-grid">
            ${ccCardsHtml}
          </div>

          <div class="attribution-template-box">
            <h5>📋 Plantilla per citar els teus sons a la tasca de Google Classroom:</h5>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.6rem;">
              Copia i enganxa aquest model al comentari de la teva entrega per complir amb les llicències CC-BY:
            </p>
            <div class="attribution-code-snippet" id="attribution-snippet">${cc.plantillaAtribucio}</div>
            <div style="margin-top:0.75rem;">
              <button class="btn-download" id="btn-copy-attribution" style="background:#fff;">
                📋 Copia la plantilla d'atribució
              </button>
            </div>
          </div>
        </section>
      </div>
    `;

    const btnCopy = document.getElementById("btn-copy-attribution");
    if (btnCopy) {
      btnCopy.addEventListener("click", () => {
        const text = document.getElementById("attribution-snippet").textContent;
        navigator.clipboard.writeText(text).then(() => {
          btnCopy.textContent = "✅ Plantilla copiada al porta-retalls!";
          setTimeout(() => {
            btnCopy.textContent = "📋 Copia la plantilla d'atribució";
          }, 3000);
        });
      });
    }
  }

  // ==========================================================================
  // RENDERITZADOR 2: BANC DE SONS GRATUÏTS
  // ==========================================================================
  function renderBancSons() {
    const blocAudio = appState.dades.blocs.find(b => b.id === "audio");
    if (!blocAudio || !blocAudio.bancSons) return;

    const banc = blocAudio.bancSons;

    const reposHtml = banc.repositoris.map(repo => `
      <article class="repo-card">
        <div class="repo-header">
          <div class="repo-title-wrap">
            <span class="repo-icon">${repo.icona}</span>
            <div>
              <div class="repo-name">${repo.nom}</div>
              <span class="badge ${repo.registreClass}" style="margin-top:2px;">${repo.registre}</span>
            </div>
          </div>
        </div>

        <p class="repo-desc">${repo.descripcio}</p>

        <div class="repo-meta-list">
          <div class="repo-meta-row">
            <span class="repo-meta-label">Tipus de sons:</span>
            <span>${repo.tipus}</span>
          </div>
          <div class="repo-meta-row">
            <span class="repo-meta-label">Formats:</span>
            <span>${repo.formats}</span>
          </div>
          <div class="repo-meta-row">
            <span class="repo-meta-label">Llicències:</span>
            <span>${repo.llicencies}</span>
          </div>
        </div>

        <div>
          <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); margin-bottom:0.35rem; text-transform:uppercase;">
            Punts forts:
          </div>
          <div class="repo-strengths-box">
            ${repo.puntsForts.map(p => `<span class="repo-strength-pill">✓ ${p}</span>`).join("")}
          </div>
        </div>

        <div style="font-size:0.8rem; color:var(--text-muted); background:var(--bg-surface-subtle); padding:0.5rem 0.75rem; border-radius:var(--radius-sm);">
          ℹ️ <strong>Com descarregar:</strong> ${repo.comDescarregar}
        </div>

        <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="btn-repo-link" title="Obre ${repo.nom} en una pestanya nova">
          Obrir ${repo.nom} ↗
        </a>
      </article>
    `).join("");

    mainWorkspace.innerHTML = `
      <div class="banc-container">
        <!-- Hero Banc de Sons -->
        <header class="banc-hero-card">
          <div class="badge badge-tool" style="margin-bottom:0.6rem;">🔊 Directori Web Segur</div>
          <h2 class="practice-title">${banc.titol}</h2>
          <p class="practice-subtitle" style="margin-bottom:1rem;">${banc.subtitol}</p>
          <div style="background-color:var(--warning-light); border:1px solid var(--warning-border); padding:0.85rem 1.1rem; border-radius:var(--radius-md); font-size:0.88rem; color:#92400e;">
            💡 <strong>${banc.consellCerca}</strong>
          </div>
        </header>

        <!-- Reixeta de Repositoris -->
        <section>
          <h3 class="section-heading">🌐 Plataformes recomanades per al Chromebook escolar</h3>
          <div class="repos-grid">
            ${reposHtml}
          </div>
        </section>

        <!-- Consell de descàrrega i organització -->
        <div style="background-color:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.25rem; font-size:0.88rem; color:var(--text-muted);">
          📁 <strong>Recomanació d'organització d'arxius:</strong> Quan descarreguis fitxers de so al teu Chromebook, crea una carpeta anomenada <code>Sons_Digitalitzacio</code> a Google Drive o a la carpeta local de Descàrregues per tenir tots els efectes organitzats abans d'importar-los a BandLab.
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // RENDERITZADOR 3: AVALUACIÓ FINAL (TEST AUTOCORREGIBLE & GOOGLE FORMS)
  // ==========================================================================
  function renderAvaluacioFinal() {
    const blocAudio = appState.dades.blocs.find(b => b.id === "audio");
    if (!blocAudio || !blocAudio.avaluacioFinal) return;

    const avaluacio = blocAudio.avaluacioFinal;
    const testKey = "digitalitzacio_test_respostes";
    const validatKey = "digitalitzacio_test_validat";

    const respostesGuardades = JSON.parse(localStorage.getItem(testKey)) || {};
    const esValidat = localStorage.getItem(validatKey) === "true";

    // Càlcul de nota si ja està validat
    let nota = 0;
    let encerts = 0;
    if (esValidat) {
      avaluacio.preguntes.forEach((q, idx) => {
        if (respostesGuardades[idx] === q.respostaCorrecta) {
          encerts++;
        }
      });
      nota = encerts; // sobre 10
    }

    // Banner de Resultats
    let bannerHtml = "";
    if (esValidat) {
      let qualif = "En procés de millora 🔄";
      let msg = "Cal repassar la secció de Teoria Express i tornar-ho a provar. Ànims, pots millorar la nota!";
      if (nota >= 9) {
        qualif = "Excel·lent 🌟";
        msg = "Enhorabona! Tens un domini excel·lent de tots els conceptes clau d'àudio digital i formats!";
      } else if (nota >= 7) {
        qualif = "Notable 👍";
        msg = "Molt bona feina! Has assolit amb solidesa les competències digitals d'edició i mescla!";
      } else if (nota >= 5) {
        qualif = "Assolit / Bé ✔️";
        msg = "Has superat el test satisfactòriament! Revisa les explicacions de les preguntes fallades per polir detalls.";
      }

      bannerHtml = `
        <div class="quiz-results-banner">
          <div class="quiz-results-score-wrap">
            <div class="quiz-results-number">${nota}<span style="font-size:1.5rem; color:#fff;">/10</span></div>
            <div class="quiz-results-text">
              <h4>${qualif}</h4>
              <p>${msg}</p>
            </div>
          </div>
          <button class="btn-reset-quiz" id="btn-top-reset-quiz" style="background:#fff; color:var(--primary);">
            🔄 Tornar a fer el test
          </button>
        </div>
      `;
    }

    // Preguntes
    const preguntesHtml = avaluacio.preguntes.map((q, qIdx) => {
      const seleccio = respostesGuardades[qIdx];
      const esCorrecta = seleccio === q.respostaCorrecta;

      let cardStatusClass = "";
      if (esValidat) {
        cardStatusClass = esCorrecta ? "q-correct" : "q-incorrect";
      }

      const opcionsHtml = q.opcions.map((opcio, opIdx) => {
        const isSelected = seleccio === opIdx;
        let optStateClass = "";
        let iconaOpcio = isSelected ? "●" : "";

        if (esValidat) {
          if (opIdx === q.respostaCorrecta) {
            optStateClass = "is-correct-answer";
            iconaOpcio = "✓";
          } else if (isSelected && !esCorrecta) {
            optStateClass = "is-wrong-selection";
            iconaOpcio = "✗";
          }
        } else if (isSelected) {
          optStateClass = "selected";
        }

        return `
          <button class="quiz-option-btn ${optStateClass} ${esValidat ? "locked" : ""}" data-q-index="${qIdx}" data-op-index="${opIdx}">
            <div class="quiz-option-circle">${iconaOpcio}</div>
            <div style="flex:1;">${opcio}</div>
          </button>
        `;
      }).join("");

      let feedbackHtml = "";
      if (esValidat) {
        feedbackHtml = `
          <div class="quiz-explanation-box">
            <strong>${esCorrecta ? "✅ Molt bé!" : "❌ Resposta incorrecta."} Explicació didàctica:</strong> ${q.explicacio}
          </div>
        `;
      }

      return `
        <div class="quiz-q-card ${cardStatusClass}" id="quiz-card-${qIdx}">
          <div class="quiz-q-enunciat">${q.enunciat}</div>
          <div class="quiz-options-group">
            ${opcionsHtml}
          </div>
          ${feedbackHtml}
        </div>
      `;
    }).join("");

    // Requadre de Google Forms
    let formsHtml = "";
    if (blocAudio.googleFormsUrl && blocAudio.googleFormsUrl.trim() !== "") {
      formsHtml = `
        <div class="google-forms-box" style="border-style: solid; border-color: var(--primary);">
          <div class="google-forms-icon">📋</div>
          <h4>Formulari Oficial d'Avaluació de l'Institut Matadepera</h4>
          <p>Aquest és el formulari oficial del professorat per recollir les respostes a l'expedient de Google Classroom.</p>
          <div class="google-forms-embed-wrap">
            <iframe src="${blocAudio.googleFormsUrl}" frameborder="0" marginheight="0" marginwidth="0">S'està carregant el formulari...</iframe>
          </div>
        </div>
      `;
    } else {
      formsHtml = `
        <div class="google-forms-box">
          <div class="google-forms-icon">📋</div>
          <h4>Espai reservat per al Formulari Oficial d'Avaluació (Google Forms)</h4>
          <p>
            Aquest requadre està preparat perquè el professorat pugui recollir oficialment les qualificacions de l'alumnat mitjançant un qüestionari de Google Classroom o Google Forms vinculat a la seva fulla de càlcul.
          </p>
          <div style="display:inline-block; background:var(--bg-surface-subtle); padding:0.4rem 0.85rem; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; color:var(--text-subtle);">
            Google Classroom / Google Forms Ready · Per activar-lo, afegeix l'URL a <code>dades/continguts.js</code>
          </div>
        </div>
      `;
    }

    mainWorkspace.innerHTML = `
      <div class="avaluacio-container">
        <!-- Hero Avaluació -->
        <header class="quiz-hero-card">
          <div class="badge badge-success" style="margin-bottom:0.6rem;">📝 Qüestionari Autocorregible</div>
          <h2 class="practice-title">${avaluacio.titol}</h2>
          <p class="practice-subtitle" style="margin-bottom:1rem;">${avaluacio.subtitol}</p>
          <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.5;">
            ${avaluacio.instruccions}
          </p>
        </header>

        <!-- Banner de resultats si està validat -->
        ${bannerHtml}

        <!-- Llista de preguntes -->
        <div class="quiz-questions-list">
          ${preguntesHtml}
        </div>

        <!-- Barra d'accions del test -->
        <div class="quiz-actions-bar">
          ${!esValidat ? `
            <button class="btn-validate-quiz" id="btn-validate-quiz">
              ✅ Valida les meves respostes i calcula la nota
            </button>
          ` : `
            <button class="btn-validate-quiz" id="btn-bottom-reset-quiz" style="background:var(--secondary);">
              🔄 Reiniciar el test
            </button>
          `}
          <div style="font-size:0.82rem; color:var(--text-subtle);">
            * El test es corregeix automàticament al teu Chromebook i pots repetir-lo tantes vegades com necessitis.
          </div>
        </div>

        <!-- Secció de Google Forms oficial -->
        ${formsHtml}
      </div>
    `;

    // Connectar esdeveniments de les opcions del test
    if (!esValidat) {
      const optBtns = mainWorkspace.querySelectorAll(".quiz-option-btn");
      optBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const qIdx = parseInt(btn.dataset.qIndex, 10);
          const opIdx = parseInt(btn.dataset.opIndex, 10);

          respostesGuardades[qIdx] = opIdx;
          localStorage.setItem(testKey, JSON.stringify(respostesGuardades));

          // Desmarquem els altres botons d'aquesta pregunta
          const card = document.getElementById(`quiz-card-${qIdx}`);
          if (card) {
            const germans = card.querySelectorAll(".quiz-option-btn");
            germans.forEach(g => {
              g.classList.remove("selected");
              const circle = g.querySelector(".quiz-option-circle");
              if (circle) circle.textContent = "";
            });
            btn.classList.add("selected");
            const myCircle = btn.querySelector(".quiz-option-circle");
            if (myCircle) myCircle.textContent = "●";
          }
        });
      });

      const btnValidar = document.getElementById("btn-validate-quiz");
      if (btnValidar) {
        btnValidar.addEventListener("click", () => {
          const contestades = Object.keys(respostesGuardades).length;
          if (contestades < 10) {
            if (!confirm(`Has respost ${contestades} de les 10 preguntes. Vols validar el test igualment?`)) {
              return;
            }
          }
          localStorage.setItem(validatKey, "true");
          renderAvaluacioFinal();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    } else {
      const resetActions = ["btn-top-reset-quiz", "btn-bottom-reset-quiz"];
      resetActions.forEach(id => {
        const btnReset = document.getElementById(id);
        if (btnReset) {
          btnReset.addEventListener("click", () => {
            if (confirm("Vols reiniciar el test per respondre totes les preguntes des de zero?")) {
              localStorage.removeItem(testKey);
              localStorage.removeItem(validatKey);
              renderAvaluacioFinal();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          });
        }
      });
    }
  }

  // ==========================================================================
  // RENDERITZADOR DE BLOC EN "PRÒXIMAMENT" (Photopea, Python, Vídeo)
  // ==========================================================================
  function renderUpcomingBlock(bloc) {
    let einesHtml = "";
    if (bloc.einesPrincipals && bloc.einesPrincipals.length > 0) {
      einesHtml = bloc.einesPrincipals.map(e => `
        <a href="${e.url}" target="_blank" rel="noopener noreferrer" class="badge badge-tool badge-tool-link" style="font-size:0.85rem; padding: 0.35rem 0.8rem;">
          🔗 ${e.nom} <span style="font-size:0.75rem; opacity:0.8;">(${e.tipus})</span>
        </a>
      `).join(" ");
    }

    let syllabusHtml = "";
    if (bloc.practiquesPendents && bloc.practiquesPendents.length > 0) {
      syllabusHtml = `
        <div class="upcoming-syllabus-box">
          <h4>📋 Currículum i itinerari de pràctiques previstes:</h4>
          <ul class="upcoming-syllabus-list">
            ${bloc.practiquesPendents.map(item => `
              <li class="upcoming-syllabus-item">
                <span class="upcoming-syllabus-bullet">▸</span>
                <span>${item}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    }

    mainWorkspace.innerHTML = `
      <div class="upcoming-block-card">
        <div class="upcoming-icon-wrap">${bloc.icona}</div>
        <div class="badge badge-fase" style="margin-bottom: 0.75rem;">Mòdul en preparació</div>
        <h2 class="upcoming-title">${bloc.titol}</h2>
        <p class="upcoming-desc">${bloc.subtitol}</p>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">
          ${bloc.introduccio}
        </p>

        <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem;">
          ${einesHtml}
        </div>

        ${syllabusHtml}

        <div style="background-color: var(--warning-light); border: 1px solid var(--warning-border); padding: 1rem; border-radius: var(--radius-md); font-size: 0.88rem; color: #92400e;">
          ℹ️ <strong>Estat del curs:</strong> El bloc complet d'<strong>Edició d'Àudio Digital</strong> està disponible actualment. Aquest mòdul s'activarà durant el 2n i 3r trimestre segons la programació didàctica del centre.
        </div>
        
        <div style="margin-top: 1.5rem;">
          <button id="btn-tornar-audio" class="practice-pill-btn active" style="margin: 0 auto; padding: 0.6rem 1.4rem;">
            ← Tornar al bloc d'Edició d'Àudio
          </button>
        </div>
      </div>
    `;

    const btnTornar = document.getElementById("btn-tornar-audio");
    if (btnTornar) {
      btnTornar.addEventListener("click", () => {
        appState.blocActiuId = "audio";
        appState.subseccioActiva = "practiques";
        renderApp();
      });
    }
  }

  // ==========================================================================
  // RENDERITZADOR DE LA PRÀCTICA ACTIVA (Àudio o Photopea)
  // ==========================================================================
  function renderPractica() {
    const bloc = appState.dades.blocs.find(b => b.id === appState.blocActiuId);
    if (!bloc || !bloc.practiques) return;

    let faseObj = null;
    if (bloc.fases && bloc.fases.length > 0) {
      faseObj = bloc.fases.find(f => f.numFase === appState.faseActivaNum) || bloc.fases[0];
    }

    let practica = bloc.practiques.find(p => p.id === appState.practicaActivaId);
    if (!practica && bloc.practiques.length > 0) {
      practica = bloc.practiques[0];
      appState.practicaActivaId = practica.id;
    }

    if (!practica) return;

    // Selector de pastilles de pràctiques de la fase o bloc
    let pillsHtml = "";
    const listPractiques = faseObj ? faseObj.practiques : bloc.practiques.map(p => p.id);
    if (listPractiques && listPractiques.length > 1) {
      pillsHtml = `<div class="practices-selector-bar"><div class="practices-pills">`;
      listPractiques.forEach(pId => {
        const p = bloc.practiques.find(item => item.id === pId);
        if (!p) return;
        const isSelected = p.id === appState.practicaActivaId;
        
        const key = `digitalitzacio_check_${p.id}`;
        const guardats = JSON.parse(localStorage.getItem(key)) || [];
        const isComplete = guardats.length === p.pasos.length && guardats.every(Boolean);

        pillsHtml += `
          <button class="practice-pill-btn ${isSelected ? "active" : ""}" data-practica-id="${p.id}">
            ${isComplete ? `<span class="pill-check-indicator" title="Pràctica completada"></span>` : ""}
            <span>${p.titol.split(":")[0] || p.titol}</span>
          </button>
        `;
      });
      pillsHtml += `</div></div>`;
    }

    // 1. Capçalera de la pràctica
    const toolBadge = `
      <a href="${practica.herramientaUrl}" target="_blank" rel="noopener noreferrer" class="badge badge-tool badge-tool-link" title="Obre ${practica.herramienta} en una pestanya nova">
        🚀 Obrir ${practica.herramienta} ↗
      </a>
    `;

    // 2. Secció de Vídeo Tutorial (Espai reservat o Iframe YouTube)
    let videoHtml = "";
    if (practica.videoUrl && practica.videoUrl.trim() !== "") {
      const ytId = extractYouTubeID(practica.videoUrl);
      if (ytId) {
        videoHtml = `
          <div class="video-section">
            <h4 class="section-heading">📹 Vídeo tutorial pas a pas</h4>
            <div class="video-embed-container">
              <iframe src="https://www.youtube.com/embed/${ytId}" title="Tutorial ${practica.titol}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
          </div>
        `;
      }
    } else {
      videoHtml = `
        <div class="video-section">
          <div class="video-placeholder">
            <div class="video-placeholder-icon">▶</div>
            <h4>Espai reservat per al vídeo tutorial</h4>
            <p>El professorat vincularà pròximament l'explicació detallada en vídeo d'aquesta pràctica pas a pas.</p>
            <span class="badge-reserve">Pròximament disponible · Google Classroom</span>
          </div>
        </div>
      `;
    }

    // 3. Àudios de mostra i suport
    let audiosHtml = "";
    if (practica.audiosMuestra && practica.audiosMuestra.length > 0) {
      audiosHtml = `
        <div class="audios-section">
          <h4 class="section-heading">🎵 Àudios de treball i mostres de referència</h4>
          <div class="audios-grid">
            ${practica.audiosMuestra.map(a => {
              const badgeClass = a.tipus === "original" ? "audio-badge-original" : "audio-badge-exemple";
              const badgeIcon = a.tipus === "original" ? "📥" : "⭐";
              return `
                <div class="audio-card">
                  <div class="audio-card-header">
                    <span class="audio-badge ${badgeClass}">${badgeIcon} ${a.etiqueta}</span>
                  </div>
                  <div class="audio-title">${a.nom}</div>
                  <div class="audio-desc">${a.descripcio}</div>
                  <div class="audio-player-wrap">
                    <audio controls preload="metadata" src="${a.fitxer}"></audio>
                  </div>
                  <div class="audio-actions">
                    <a href="${a.fitxer}" download class="btn-download" title="Descarrega el fitxer per obrir-lo a ${practica.herramienta}">
                      ⬇️ Descarrega WAV
                    </a>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    // 3.1. Recursos i imatges de mostra
    let recursosHtml = "";
    if (practica.recursosMostra && practica.recursosMostra.length > 0) {
      recursosHtml = `
        <div class="recursos-section">
          <h4 class="section-heading">🎨 Recursos i bancs d'imatges recomanades</h4>
          <div class="recursos-grid">
            ${practica.recursosMostra.map(r => {
              const badgeClass = r.tipusBadge === "recomanat" ? "recurs-badge-recomanat" : "recurs-badge-opcio";
              return `
                <div class="recurs-card">
                  <div class="audio-card-header">
                    <span class="recurs-badge ${badgeClass}">${r.etiqueta}</span>
                  </div>
                  <div class="recurs-title">${r.nom}</div>
                  <div class="recurs-desc">${r.descripcio}</div>
                  <div class="recurs-actions">
                    <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-external-resource">
                      🌐 Obrir banc d'imatges ↗
                    </a>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    // 3.2. Models de referència: Comparativa Origen vs Resultat Final
    let comparativaHtml = "";
    if (practica.exemplesComparativa && practica.exemplesComparativa.length > 0) {
      comparativaHtml = `
        <section class="comparativa-section">
          <div class="comparativa-header">
            <div>
              <h4 class="section-heading" style="margin-bottom:0.25rem;">🖼️ Models de referència: Imatge d'Origen vs Resultat Final</h4>
              <p style="font-size:0.86rem; color:var(--text-muted); line-height: 1.5;">
                Comprova com es transforma la imatge des de l'arxiu d'origen fins a l'acabat final retocat a Photopea. Pots descarregar qualsevol dels 3 arxius d'origen per obrir-lo i practicar pas a pas.
              </p>
            </div>
          </div>
          <div class="comparativa-grid">
            ${practica.exemplesComparativa.map((ex, idx) => `
              <div class="comparativa-card">
                <div class="comparativa-card-top">
                  <span class="badge badge-fase">Exemple ${idx + 1}</span>
                  <h5 class="comparativa-title">${ex.titol}</h5>
                </div>
                <p class="comparativa-desc">${ex.descripcio}</p>

                <div class="comparativa-view-wrap">
                  <!-- Columna Origen -->
                  <div class="comparativa-side comparativa-side-origen">
                    <div class="comparativa-side-header">
                      <span class="comparativa-badge-tag tag-origen">📁 ORIGEN</span>
                      <a href="${ex.imatgeOrigen}" download="${ex.nomFitxerOrigen || 'origen.svg'}" class="btn-download-sm" title="Descarrega la imatge per obrir-la a Photopea">
                        ⬇️ Descarrega
                      </a>
                    </div>
                    <div class="comparativa-img-container">
                      <img src="${ex.imatgeOrigen}" alt="${ex.titol} - Origen" loading="lazy" class="comparativa-img">
                    </div>
                  </div>

                  <!-- Fletxa indicadora -->
                  <div class="comparativa-arrow" title="Transformació a Photopea">➔</div>

                  <!-- Columna Final -->
                  <div class="comparativa-side comparativa-side-final">
                    <div class="comparativa-side-header">
                      <span class="comparativa-badge-tag tag-final">✨ FINAL RETOCAT</span>
                      <a href="${ex.imatgeFinal}" target="_blank" rel="noopener noreferrer" class="btn-view-sm" title="Obre en gran">
                        🔍 Amplia
                      </a>
                    </div>
                    <div class="comparativa-img-container">
                      <img src="${ex.imatgeFinal}" alt="${ex.titol} - Resultat Final" loading="lazy" class="comparativa-img">
                    </div>
                  </div>
                </div>

                <div class="comparativa-tecnica">
                  💡 <strong>Tècnica clau:</strong> ${ex.tecnica}
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `;
    }

    // 4. Checklist interactiva amb barra de progrés (Gestiona apartats 6.1/6.2 o checklist estàndard)
    const checklistKey = `digitalitzacio_check_${practica.id}`;
    const passosGuardats = JSON.parse(localStorage.getItem(checklistKey)) || new Array(practica.pasos.length).fill(false);

    const fets = passosGuardats.filter(Boolean).length;
    const totals = practica.pasos.length;
    const percentPassos = totals > 0 ? Math.round((fets / totals) * 100) : 0;

    let contingutGuiatHtml = "";

    if (practica.apartats && practica.apartats.length > 0) {
      // Cas A: Pràctica dividida en apartats (ex: 6.1 Llaç i 6.2 Tampó de clonar)
      let stepGlobalIdx = 0;
      const apartatsCardsHtml = practica.apartats.map(ap => {
        let apVideoHtml = "";
        if (ap.videoUrl && ap.videoUrl.trim() !== "") {
          const ytId = extractYouTubeID(ap.videoUrl);
          if (ytId) {
            apVideoHtml = `
              <div class="video-section">
                <h5 class="section-heading-sm">📹 Vídeo tutorial: ${ap.nom}</h5>
                <div class="video-embed-container">
                  <iframe src="https://www.youtube.com/embed/${ytId}" title="${ap.nom}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
              </div>
            `;
          }
        } else {
          apVideoHtml = `
            <div class="video-section">
              <div class="video-placeholder">
                <div class="video-placeholder-icon">▶</div>
                <h4>Espai reservat per al vídeo tutorial: ${ap.nom}</h4>
                <p>El professorat vincularà pròximament l'explicació detallada en vídeo d'aquest apartat.</p>
                <span class="badge-reserve">Pròximament disponible · Google Classroom</span>
              </div>
            </div>
          `;
        }

        let apStepsHtml = "";
        ap.pasos.forEach((pas, subIdx) => {
          const currentIdx = stepGlobalIdx++;
          const isChecked = Boolean(passosGuardats[currentIdx]);
          apStepsHtml += `
            <li class="checklist-item ${isChecked ? "completed" : ""}" data-step-index="${currentIdx}">
              <div class="checklist-checkbox">${isChecked ? "✓" : ""}</div>
              <div class="checklist-text"><strong>Pas ${subIdx + 1}:</strong> ${pas}</div>
            </li>
          `;
        });

        return `
          <div class="apartat-card">
            <div class="apartat-header">
              <div class="apartat-header-title-wrap">
                <span class="apartat-icon">${ap.icona}</span>
                <div>
                  <div class="apartat-badge-row">
                    <span class="badge ${ap.badgeClass || 'badge-fase'}">${ap.badge}</span>
                    <span class="apartat-drecera">⌨️ ${ap.drecera}</span>
                  </div>
                  <h3 class="apartat-title">${ap.nom}</h3>
                  <p class="apartat-desc">${ap.descripcio}</p>
                </div>
              </div>
            </div>

            <!-- Vídeo de l'apartat -->
            ${apVideoHtml}

            <!-- Passos guiats de l'apartat -->
            <div class="apartat-steps-box">
              <h5 class="apartat-steps-heading">✅ Passos guiats d'aquest apartat:</h5>
              <ul class="checklist-items">
                ${apStepsHtml}
              </ul>
            </div>
          </div>
        `;
      }).join("");

      contingutGuiatHtml = `
        <section class="checklist-section">
          <div class="checklist-header">
            <h4 class="section-heading">✅ Progrés global dels apartats de la pràctica</h4>
            <button class="btn-reset-checklist" id="btn-reset-checklist">Reinicia la checklist</button>
          </div>

          <div class="checklist-progress-box">
            <div class="checklist-progress-info">
              <span id="checklist-progress-text">${fets} de ${totals} passos completats (${percentPassos}%)</span>
              <span>${percentPassos === 100 ? "🎉 Tot enllestit!" : "En progrés"}</span>
            </div>
            <div class="checklist-progress-bar">
              <div class="checklist-progress-fill" id="checklist-progress-fill" style="width: ${percentPassos}%;"></div>
            </div>
          </div>

          <div class="apartats-wrapper">
            <div class="apartats-intro-banner">
              <span class="apartats-intro-badge">✨ Dues maneres de treure objectes</span>
              <h3>Tria el millor mètode per a cada tipus de fotografia</h3>
              <p>Compara el procediment automàtic intel·ligent (Apartat 6.1) amb el retoc manual d'alta precisió (Apartat 6.2). Segueix cadascun dels vídeos tutorials i completa els passos interactius.</p>
            </div>
            ${apartatsCardsHtml}
          </div>
        </section>
      `;
    } else {
      // Cas B: Pràctica estàndard amb un sol vídeo i una sola llista
      let passosHtml = "";
      practica.pasos.forEach((pas, idx) => {
        const isChecked = Boolean(passosGuardats[idx]);
        passosHtml += `
          <li class="checklist-item ${isChecked ? "completed" : ""}" data-step-index="${idx}">
            <div class="checklist-checkbox">${isChecked ? "✓" : ""}</div>
            <div class="checklist-text"><strong>Pas ${idx + 1}:</strong> ${pas}</div>
          </li>
        `;
      });

      contingutGuiatHtml = `
        <!-- Vídeo Tutorial -->
        ${videoHtml}

        <!-- Checklist interactiva -->
        <section class="checklist-section">
          <div class="checklist-header">
            <h4 class="section-heading">✅ Passos d'aprenentatge guiat (Checklist)</h4>
            <button class="btn-reset-checklist" id="btn-reset-checklist">Reinicia la checklist</button>
          </div>

          <div class="checklist-progress-box">
            <div class="checklist-progress-info">
              <span id="checklist-progress-text">${fets} de ${totals} passos completats (${percentPassos}%)</span>
              <span>${percentPassos === 100 ? "🎉 Tot enllestit!" : "En progrés"}</span>
            </div>
            <div class="checklist-progress-bar">
              <div class="checklist-progress-fill" id="checklist-progress-fill" style="width: ${percentPassos}%;"></div>
            </div>
          </div>

          <ul class="checklist-items" id="checklist-items">
            ${passosHtml}
          </ul>
        </section>
      `;
    }

    // 5. Rúbrica interactiva (Calculadora /10)
    const rubricaKey = `digitalitzacio_rubrica_${practica.id}`;
    const seleccioRubrica = JSON.parse(localStorage.getItem(rubricaKey)) || {};

    let criteriaHtml = "";
    let notaTotal = 0;
    let criterisAvaluats = 0;

    practica.rubrica.forEach((criteriObj, critIdx) => {
      const seleccioNivell = seleccioRubrica[critIdx];
      let levelsHtml = "";

      criteriObj.nivells.forEach((niv, nivIdx) => {
        const isSelected = seleccioNivell === nivIdx;
        if (isSelected) {
          notaTotal += niv.punts;
          criterisAvaluats++;
        }

        levelsHtml += `
          <button class="level-btn ${isSelected ? "selected" : ""}" data-crit-index="${critIdx}" data-level-index="${nivIdx}">
            <div class="level-top">
              <span class="level-name">${niv.nom}</span>
              <span class="level-pts">${niv.punts} pts</span>
            </div>
            <div class="level-detail">${niv.detall}</div>
          </button>
        `;
      });

      criteriaHtml += `
        <div class="criterion-card">
          <div class="criterion-title-wrap">
            <div class="criterion-name">Criteri ${critIdx + 1}: ${criteriObj.criteri}</div>
            <div class="criterion-desc">${criteriObj.descripcio}</div>
          </div>
          <div class="levels-grid">
            ${levelsHtml}
          </div>
        </div>
      `;
    });

    // Qualificació textual segons la nota
    let qualificacioText = "Pendent d'avaluar";
    let qualificacioClass = "color: var(--text-muted);";
    if (criterisAvaluats > 0) {
      if (notaTotal >= 9.0) {
        qualificacioText = "Excel·lent 🌟";
        qualificacioClass = "color: var(--success);";
      } else if (notaTotal >= 7.0) {
        qualificacioText = "Notable 👍";
        qualificacioClass = "color: var(--primary);";
      } else if (notaTotal >= 5.0) {
        qualificacioText = "Assolit / Bé ✔️";
        qualificacioClass = "color: var(--warning);";
      } else {
        qualificacioText = "En procés de millora 🔄";
        qualificacioClass = "color: var(--danger);";
      }
    }

    // Muntem tot el contingut de la pràctica
    mainWorkspace.innerHTML = `
      ${pillsHtml}

      <article class="practice-card">
        <header class="practice-header">
          <div class="practice-badges-row">
            <span class="badge badge-fase">📌 ${practica.fase}</span>
            ${toolBadge}
            <span class="badge badge-success">4t ESO Digitalització</span>
          </div>
          <h2 class="practice-title">${practica.titol}</h2>
          <p class="practice-subtitle">${practica.subtitol}</p>
        </header>

        <!-- Què aprendrem -->
        <section class="section-box">
          <div class="section-box-header">
            <span class="section-box-icon">🎯</span>
            <h4>Objectiu d'aprenentatge (Competència digital)</h4>
          </div>
          <div class="section-box-body">${practica.queAprendremos}</div>
        </section>

        <!-- Contingut guiat (Vídeos i Passos, dividits per apartats o estàndard) -->
        ${contingutGuiatHtml}

        <!-- Àudios de suport -->
        ${audiosHtml}

        <!-- Recursos i imatges de treball -->
        ${recursosHtml}

        <!-- Models de referència: Comparativa Origen vs Final -->
        ${comparativaHtml}

        <!-- Repte Creatiu -->
        <section class="reto-box">
          <div class="reto-header">
            <span class="reto-icon">🚀</span>
            <h4>REPTE CREATIU INDIVIDUAL / EN PARELLES</h4>
          </div>
          <div class="reto-body">${practica.reto}</div>
        </section>

        <!-- Instruccions d'entrega Google Classroom -->
        <section class="entrega-box">
          <div class="entrega-header">
            <span class="entrega-icon">📤</span>
            <h4>INSTRUCCIONS DE LLIURAMENT A GOOGLE CLASSROOM</h4>
          </div>
          <div class="entrega-body">
            <p style="margin-bottom: 0.5rem;">${practica.entrega}</p>
            <div style="font-size: 0.82rem; background: rgba(255,255,255,0.7); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); color: var(--text-main);">
              💡 <strong>Consell docent:</strong> Assegura't de respectar la nomenclatura exacta indicada al títol de l'arxiu i comprova la reproducció del fitxer abans de fer clic al botó "Lliura" de Classroom.
            </div>
          </div>
        </section>

        <!-- Rúbrica interactiva d'autoavaluació -->
        <section class="rubrica-section">
          <div class="rubrica-header-wrap">
            <div>
              <h4 class="section-heading" style="margin-bottom:0.25rem;">📊 Rúbrica d'Autoavaluació Competencial</h4>
              <p style="font-size:0.84rem; color:var(--text-muted);">
                Fes clic a la casella de cada criteri que millor descrigui el teu treball per calcular la teva nota sobre 10 punts.
              </p>
            </div>
            <div class="rubrica-score-display">
              <div class="score-number" id="rubrica-total-score">${notaTotal.toFixed(1)}</div>
              <div class="score-details">
                <span class="score-label">Nota sobre 10</span>
                <span class="score-level-badge" id="rubrica-level-badge" style="${qualificacioClass}">${qualificacioText}</span>
              </div>
            </div>
          </div>

          <div class="rubrica-criteria-list" id="rubrica-criteria-list">
            ${criteriaHtml}
          </div>

          <div class="rubrica-actions">
            <button class="btn-copy-rubric" id="btn-copy-rubric">
              📋 Copia el resum d'autoavaluació per enganxar-lo a Classroom
            </button>
            <button class="btn-reset-checklist" id="btn-reset-rubric">
              Reinicia l'autoavaluació
            </button>
          </div>
        </section>
      </article>
    `;

    // Connectar esdeveniments de les pastilles de pràctiques
    const pillBtns = mainWorkspace.querySelectorAll(".practice-pill-btn");
    pillBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        appState.practicaActivaId = btn.dataset.practicaId;
        window.location.hash = `#${btn.dataset.practicaId}`;
        renderApp();
      });
    });

    // Connectar esdeveniments de la Checklist
    const checkItems = mainWorkspace.querySelectorAll(".checklist-item");
    checkItems.forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.dataset.stepIndex, 10);
        passosGuardats[idx] = !passosGuardats[idx];
        localStorage.setItem(checklistKey, JSON.stringify(passosGuardats));
        
        item.classList.toggle("completed", passosGuardats[idx]);
        item.querySelector(".checklist-checkbox").textContent = passosGuardats[idx] ? "✓" : "";
        
        const nousFets = passosGuardats.filter(Boolean).length;
        const nouPercent = Math.round((nousFets / totals) * 100);
        
        const progFill = document.getElementById("checklist-progress-fill");
        const progText = document.getElementById("checklist-progress-text");
        if (progFill) progFill.style.width = `${nouPercent}%`;
        if (progText) progText.textContent = `${nousFets} de ${totals} passos completats (${nouPercent}%)`;
        
        actualitzarBarraProgresCapcalera();
        renderPhaseNav();
      });
    });

    // Botó reinicia checklist
    const btnResetChecklist = document.getElementById("btn-reset-checklist");
    if (btnResetChecklist) {
      btnResetChecklist.addEventListener("click", () => {
        if (confirm("Vols reiniciar la llista de comprovació d'aquesta pràctica?")) {
          localStorage.removeItem(checklistKey);
          renderApp();
        }
      });
    }

    // Connectar esdeveniments de la Rúbrica interactiva
    const levelBtns = mainWorkspace.querySelectorAll(".level-btn");
    levelBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const critIdx = parseInt(btn.dataset.critIndex, 10);
        const levIdx = parseInt(btn.dataset.levelIndex, 10);

        const germans = btn.closest(".levels-grid").querySelectorAll(".level-btn");
        germans.forEach(g => g.classList.remove("selected"));
        btn.classList.add("selected");

        seleccioRubrica[critIdx] = levIdx;
        localStorage.setItem(rubricaKey, JSON.stringify(seleccioRubrica));

        let novaNota = 0;
        let nousAvaluats = 0;
        practica.rubrica.forEach((cObj, cI) => {
          const lI = seleccioRubrica[cI];
          if (lI !== undefined && cObj.nivells[lI]) {
            novaNota += cObj.nivells[lI].punts;
            nousAvaluats++;
          }
        });

        const scoreEl = document.getElementById("rubrica-total-score");
        const badgeEl = document.getElementById("rubrica-level-badge");
        if (scoreEl) scoreEl.textContent = novaNota.toFixed(1);

        if (badgeEl) {
          if (novaNota >= 9.0) {
            badgeEl.textContent = "Excel·lent 🌟";
            badgeEl.style.color = "var(--success)";
          } else if (novaNota >= 7.0) {
            badgeEl.textContent = "Notable 👍";
            badgeEl.style.color = "var(--primary)";
          } else if (novaNota >= 5.0) {
            badgeEl.textContent = "Assolit / Bé ✔️";
            badgeEl.style.color = "var(--warning)";
          } else {
            badgeEl.textContent = "En procés de millora 🔄";
            badgeEl.style.color = "var(--danger)";
          }
        }
      });
    });

    // Botó reinicia rúbrica
    const btnResetRubric = document.getElementById("btn-reset-rubric");
    if (btnResetRubric) {
      btnResetRubric.addEventListener("click", () => {
        if (confirm("Vols reiniciar l'autoavaluació d'aquesta pràctica?")) {
          localStorage.removeItem(rubricaKey);
          renderApp();
        }
      });
    }

    // Botó copia resum per a Classroom
    const btnCopyRubric = document.getElementById("btn-copy-rubric");
    if (btnCopyRubric) {
      btnCopyRubric.addEventListener("click", () => {
        let textResum = `📋 AUTOAVALUACIÓ - ${practica.titol}\n`;
        textResum += `Alumne/a: 4t d'ESO - Digitalització\n`;
        textResum += `Data: ${new Date().toLocaleDateString('ca-ES')}\n`;
        textResum += `--------------------------------------------------\n`;

        let totalPunts = 0;
        practica.rubrica.forEach((cObj, cI) => {
          const lI = seleccioRubrica[cI];
          if (lI !== undefined && cObj.nivells[lI]) {
            const niv = cObj.nivells[lI];
            totalPunts += niv.punts;
            textResum += `• Criteri ${cI + 1} (${cObj.criteri}): ${niv.nom} (${niv.punts} pts)\n  ${niv.detall}\n`;
          } else {
            textResum += `• Criteri ${cI + 1} (${cObj.criteri}): Sense avaluar\n`;
          }
        });

        textResum += `--------------------------------------------------\n`;
        textResum += `NOTA AUTOAVALUADA: ${totalPunts.toFixed(1)} / 10 punts\n`;

        navigator.clipboard.writeText(textResum).then(() => {
          btnCopyRubric.textContent = "✅ Copiat al porta-retalls!";
          setTimeout(() => {
            btnCopyRubric.textContent = "📋 Copia el resum d'autoavaluació per enganxar-lo a Classroom";
          }, 3000);
        }).catch(() => {
          alert("Resum generat:\n\n" + textResum);
        });
      });
    }
  }

  // ==========================================================================
  // UTILITAT: EXTREURE ID DE YOUTUBE
  // ==========================================================================
  function extractYouTubeID(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // ==========================================================================
  // RENDERITZADOR PRINCIPAL (ROUTER)
  // ==========================================================================
  function renderApp() {
    renderBlocksNav();
    actualitzarBarraProgresCapcalera();

    if (appState.blocActiuId === "audio") {
      renderAudioSubnav();

      if (appState.subseccioActiva === "practiques") {
        renderPhaseNav();
        renderPractica();
      } else if (appState.subseccioActiva === "teoria") {
        if (phaseNavContainer) phaseNavContainer.style.display = "none";
        renderTeoriaFormats();
      } else if (appState.subseccioActiva === "banc_sons") {
        if (phaseNavContainer) phaseNavContainer.style.display = "none";
        renderBancSons();
      } else if (appState.subseccioActiva === "avaluacio") {
        if (phaseNavContainer) phaseNavContainer.style.display = "none";
        renderAvaluacioFinal();
      }
    } else {
      if (audioSubnavContainer) audioSubnavContainer.style.display = "none";
      const bloc = appState.dades.blocs.find(b => b.id === appState.blocActiuId);
      if (bloc && bloc.estat === "actiu" && bloc.practiques && bloc.practiques.length > 0) {
        renderPhaseNav();
        renderPractica();
      } else if (bloc) {
        if (phaseNavContainer) phaseNavContainer.style.display = "none";
        renderUpcomingBlock(bloc);
      }
    }
  }

  // ==========================================================================
  // GESTIÓ D'HASH A LA URL (Navegació directa / marcadors)
  // ==========================================================================
  function handleUrlHash() {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (!hash) return;

    // Subseccions d'àudio
    if (hash === "teoria" || hash === "formats") {
      appState.blocActiuId = "audio";
      appState.subseccioActiva = "teoria";
      return;
    }
    if (hash === "banc-sons" || hash === "bancsons" || hash === "sons") {
      appState.blocActiuId = "audio";
      appState.subseccioActiva = "banc_sons";
      return;
    }
    if (hash === "avaluacio" || hash === "test" || hash === "quiz") {
      appState.blocActiuId = "audio";
      appState.subseccioActiva = "avaluacio";
      return;
    }

    // Comprovem si és un bloc temàtic
    const esBloc = appState.dades.blocs.find(b => b.id === hash);
    if (esBloc) {
      appState.blocActiuId = esBloc.id;
      appState.subseccioActiva = "practiques";
      appState.faseActivaNum = 1;
      if (esBloc.practiques && esBloc.practiques.length > 0) {
        appState.practicaActivaId = esBloc.practiques[0].id;
      }
      return;
    }

    // Àlies freqüents per a Photopea
    if (hash === "photopea_p5" || hash === "photopea5" || hash === "p5_photopea") {
      appState.blocActiuId = "photopea";
      appState.subseccioActiva = "practiques";
      appState.practicaActivaId = "photopea_p5";
      appState.faseActivaNum = 1;
      return;
    }
    if (hash === "photopea_p6" || hash === "photopea6" || hash === "p6_photopea") {
      appState.blocActiuId = "photopea";
      appState.subseccioActiva = "practiques";
      appState.practicaActivaId = "photopea_p6";
      appState.faseActivaNum = 1;
      return;
    }
    if (hash === "photopea_p7" || hash === "photopea7" || hash === "p7_photopea") {
      appState.blocActiuId = "photopea";
      appState.subseccioActiva = "practiques";
      appState.practicaActivaId = "photopea_p7";
      appState.faseActivaNum = 1;
      return;
    }

    // Comprovem si és una pràctica d'algun bloc (p1 a p7, photopea_p5, photopea_p6, etc.)
    for (const b of appState.dades.blocs) {
      if (b.practiques) {
        const p = b.practiques.find(item => item.id.toLowerCase() === hash);
        if (p) {
          appState.blocActiuId = b.id;
          appState.subseccioActiva = "practiques";
          appState.practicaActivaId = p.id;
          appState.faseActivaNum = p.numFase || 1;
          return;
        }
      }
    }
  }

  window.addEventListener("hashchange", () => {
    handleUrlHash();
    renderApp();
  });

  // Execució inicial
  initTheme();
  handleUrlHash();
  renderApp();
});
