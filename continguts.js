/**
 * BASE DE DADES DIDÀCTICA - DIGITALITZACIÓ 4t ESO
 * Curs 2026-2027 · Institut Matadepera
 * Departament de Tecnologia i Digitalització
 *
 * Aquest arxiu conté l'estructura curricular per blocs temàtics i la
 * informació pedagògica detallada de cadascuna de les pràctiques.
 */

const CONTINGUTS_CURS = {
  assignatura: "Digitalització 4t ESO",
  curs: "2026-2027",
  centre: "Institut Matadepera",
  departament: "Departament de Tecnologia i Digitalització",
  descripcio: "Portal didàctic interactiu orientat a l'aprenentatge per reptes, l'edició multimèdia, el pensament computacional i la competència digital ciutadana segons el currículum de 4t d'ESO a Catalunya.",
  
  // Blocs temàtics de l'assignatura
  blocs: [
    {
      id: "audio",
      titol: "Edició d'Àudio Digital",
      icona: "🎧",
      subtitol: "Manipulació d'ones, foley, efectes sonors, mescla multipista i podcasts",
      estat: "actiu", // 100% desenvolupat
      color: "var(--color-primary)",
      duradaAproximada: "6 setmanes · 18 hores lectives",
      einesPrincipals: [
        { nom: "AudioMass", url: "https://audiomass.co/", tipus: "Editor d'ona ràpid al navegador" },
        { nom: "BandLab for Education", url: "https://edu.bandlab.com/", tipus: "Estudi DAW multipista col·laboratiu" }
      ],
      introduccio: "En aquest bloc aprendràs a manipular el so com a matèria primera de la comunicació digital. Des de la transformació d'un sol xerric d'una porta fins a la realització d'una ficció sonora completa, exploraràs com l'acústica i la tecnologia digital es combinen per generar emocions, ambientar històries i transmetre idees.",
      
      // Enllaç opcional a Google Forms per recollir notes oficials (deixar "" per mostrar l'espai reservat)
      googleFormsUrl: "",

      // ======================================================================
      // 1. TEORIA EXPRESS: FORMATS D'ÀUDIO DIGITAL I PROPIETAT INTEL·LECTUAL
      // ======================================================================
      teoriaFormats: {
        titol: "Teoria Express: Formats d'Àudio Digital",
        subtitol: "Comprendre com es codifica el so, les diferències entre formats i l'ús ètic de recursos sonors a l'aula",
        introduccio: "En l'edició digital, l'elecció del format d'arxiu determina l'equilibri entre la fidelitat acústica i l'espai que ocupa al disc dur o a la xarxa. No és el mateix treballar a l'estudi d'edició (on necessitem màxima fidelitat sense pèrdua) que compartir el producte acabat a Google Classroom o publicar-lo en una plataforma de podcast.",
        formats: [
          {
            nom: "WAV",
            nomComplet: "Waveform Audio File Format",
            creador: "Microsoft & IBM",
            extensio: ".wav",
            compressio: "Sense compressió (Lossless PCM)",
            tipusCompressio: "sense_perdua",
            badgeClass: "badge-lossless",
            pesAproximat: "Molt pesat (~10 MB per minut d'àudio estèreo a 44.1 kHz / 16-bit)",
            qualitat: "Màxima (fidelitat 100% idèntica a l'original, qualitat CD d'estudi)",
            usAula: "Format mestre per treballar i editar a AudioMass i BandLab. En retallar, moure fragments i aplicar efectes successius no perds cap dada acústica.",
            consellDocent: "Fes servir sempre WAV per gravar la teva veu i importar mostres a les pràctiques 1, 2 i 3.",
            icona: "🌊"
          },
          {
            nom: "MP3",
            nomComplet: "MPEG-1 Audio Layer III",
            creador: "Fraunhofer Institut",
            extensio: ".mp3",
            compressio: "Amb compressió psicoacústica (Lossy)",
            tipusCompressio: "amb_perdua",
            badgeClass: "badge-lossy",
            pesAproximat: "Molt lleuger (~1 MB per minut a 128-192 kbps, estalvia fins a un 90% d'espai)",
            qualitat: "Molt bona per a l'oïda quotidiana; elimina freqüències que l'oïda humana no percep fàcilment.",
            usAula: "Format òptim per exportar la pràctica acabada i entregar-la al Google Classroom o enviar-la per correu sense saturar l'emmagatzematge del Chromebook.",
            consellDocent: "Tria 192 kbps o 320 kbps a BandLab en fer el mixdown final per a un lliurament impecable.",
            icona: "🎧"
          },
          {
            nom: "FLAC",
            nomComplet: "Free Lossless Audio Codec",
            creador: "Xiph.Org Foundation (Codi Obert)",
            extensio: ".flac",
            compressio: "Amb compressió sense pèrdua (Lossless)",
            tipusCompressio: "sense_perdua",
            badgeClass: "badge-lossless",
            pesAproximat: "Moderat (~5-6 MB per minut, redueix el pes del WAV a la meitat)",
            qualitat: "Màxima i perfecta: funciona com un fitxer ZIP per a àudio (en descomprimir, recupera el 100% del so).",
            usAula: "Format de referència per a arxius de so i melòmans que volen estalviar espai al disc sense perdre cap dada acústica.",
            consellDocent: "Molt utilitzat en biblioteques digitals i arxius sonors professionals.",
            icona: "💎"
          },
          {
            nom: "OGG Vorbis",
            nomComplet: "Ogg Vorbis Audio",
            creador: "Xiph.Org Foundation (Lliure de patents)",
            extensio: ".ogg",
            compressio: "Amb compressió eficient (Lossy moderna)",
            tipusCompressio: "amb_perdua",
            badgeClass: "badge-lossy",
            pesAproximat: "Lleuger (similar o lleugerament inferior a l'MP3 a igualtat de qualitat)",
            qualitat: "Molt alta fins i tot a bitrates baixos; superior a l'algorisme de l'MP3 clàssic.",
            usAula: "Format estàndard lliure de drets de patent utilitzat a la web, a Spotify (streaming mòbil) i en videojocs com Minecraft.",
            consellDocent: "Si mai programes un videojoc a l'aula d'informàtica, l'OGG és el format preferit per als efectes.",
            icona: "🦊"
          },
          {
            nom: "MIDI",
            nomComplet: "Musical Instrument Digital Interface",
            creador: "Consorci MIDI Manufacturers Association",
            extensio: ".mid / .midi",
            compressio: "No aplica (No és so gravat, sinó dades de partitura digital)",
            tipusCompressio: "dades_midi",
            badgeClass: "badge-midi",
            pesAproximat: "Extremadament minúscul (uns pocs Kilobytes, ex. 15-40 KB per a una cançó completa)",
            qualitat: "Depèn al 100% del banc de sons o sintetitzador virtual que l'interpreti a l'ordinador.",
            usAula: "Quan toques un teclat virtual a BandLab o programes una línia de baix al Piano Roll, estàs generant notes MIDI abans de transformar-les en so.",
            consellDocent: "No pots gravar una veu en MIDI, però pots canviar el tempo o instrument d'una melodia MIDI amb un sol clic sense desafinar.",
            icona: "🎹"
          }
        ],
        propietatIntellectual: {
          titol: "Propietat Intel·lectual i Llicències Creative Commons",
          subtitol: "Com utilitzar música i efectes de so a l'aula de manera ètica, legal i respectuosa",
          conceptesClau: [
            {
              nom: "El Copyright tradicional (© Tots els drets reservats)",
              descripcio: "Qualsevol cançó comercial (de Spotify, YouTube, ràdio, etc.) té drets d'autor automàtics. A l'escola no podem agafar una cançó comercial per al nostre podcast públic o canal de vídeo sense llicència expressa, ja que infringeix la llei de propietat intel·lectual i plataformes com YouTube bloquejaran el vídeo per reclamació de drets (Content ID)."
            },
            {
              nom: "Les Llicències Creative Commons (CC)",
              descripcio: "Són models de contracte públics on l'autor/a permet explícitament reutilitzar la seva obra gratuïtament sota determinades condicions clares i transparents simbolitzades per icones."
            }
          ],
          llicencies: [
            {
              codi: "CC0",
              nom: "Domini Públic (Public Domain)",
              descripcio: "L'autor/a ha renunciat a tots els seus drets. Pots utilitzar, transformar, mesclar i compartir el so lliurement, fins i tot sense obligació legal d'atribuir (tot i que per ètica escolar sempre és recomanable citar la font).",
              badge: "Llibertat Total",
              color: "var(--success)"
            },
            {
              codi: "CC-BY",
              nom: "Reconeixement (Attribution)",
              descripcio: "Pots fer servir el so per a qualsevol finalitat i modificar-lo com vulguis, amb l'única condició de mencionar qui és l'autor/a original i posar un enllaç a la llicència.",
              badge: "Citar Autor/a",
              color: "var(--primary)"
            },
            {
              codi: "CC-BY-NC",
              nom: "No Comercial (Non-Commercial)",
              descripcio: "Permet utilitzar i modificar el so per a treballs escolars, personals o culturals, però mai en projectes que generin beneficis econòmics o publicitat.",
              badge: "Ideal Escolar",
              color: "var(--secondary)"
            },
            {
              codi: "CC-BY-SA",
              nom: "Compartir Igual (Share-Alike)",
              descripcio: "Pots mesclar i transformar el so, però si publiques la nova obra derivada l'has de llicenciar sota les mateixes condicions de llibertat.",
              badge: "Mantenir Llicència",
              color: "var(--warning)"
            }
          ],
          plantillaAtribucio: "Com citar un so a la teva memòria de Google Classroom:\n\"Efecte de so 'Trons llunyans' per SoundMaker a Freesound.org sota llicència CC-BY 4.0 (https://freesound.org/...)\""
        }
      },

      // ======================================================================
      // 2. BANC DE SONS GRATUÏTS PER A L'AULA
      // ======================================================================
      bancSons: {
        titol: "Banc de Sons Gratuïts i Segurs per a l'Aula",
        subtitol: "Directori de repositoris web recomanats per descarregar efectes foley, ambients i música lliure de drets per a les pràctiques 4, 5, 6 i 7",
        consellCerca: "Recomanació docent: la majoria d'aquests cercadors funcionen molt millor si cerques les paraules clau en anglès (ex: 'rain', 'thunder', 'footsteps', 'door creak', 'whoosh', 'heartbeat', 'wind').",
        repositoris: [
          {
            id: "freesound",
            nom: "Freesound.org",
            url: "https://freesound.org/",
            icona: "🔊",
            registre: "Requereix compte gratuït",
            registreClass: "badge-warning",
            tipus: "Efectes de so, ambients reals, foley i mostres acústiques",
            formats: "WAV i MP3 d'alta qualitat",
            llicencies: "CC0, CC-BY, CC-BY-NC",
            descripcio: "La comunitat de so col·laborativa més prestigiosa del món, impulsada pel Grup de Tecnologia Musical de la Universitat Pompeu Fabra (UPF) a Barcelona. Conté més de mig milió de sons enregistrats per dissenyadors acústics i voluntaris d'arreu del món.",
            puntsForts: ["Centenars de milers de sons reals", "Formes d'ona previsualitzables al navegador", "Creat a Catalunya (UPF)"],
            comDescarregar: "Crea un compte gratuït amb el correu del centre, fes la cerca i prem el botó blau 'Download' per obtenir el fitxer WAV/MP3 original."
          },
          {
            id: "pixabay",
            nom: "Pixabay Sound Effects & Music",
            url: "https://pixabay.com/sound-effects/",
            icona: "🎬",
            registre: "Sense registre obligatori",
            registreClass: "badge-success",
            tipus: "Efectes de so moderns, transicions, risers i música de fons",
            formats: "MP3 d'alta resolució",
            llicencies: "Llicència de contingut Pixabay (Lliure per a ús multimèdia)",
            descripcio: "Una de les millors plataformes actuals per a creadors de contingut. Inclou milers d'efectes de so cinematogràfics de gran impacte (cinema, terror, ciència-ficció, natura) i un apartat de música lliure categoritzada per estats d'ànim.",
            puntsForts: ["Descàrrega directa d'un sol clic", "Categories per estats d'ànim", "Excel·lent per a les pràctiques 5 i 6"],
            comDescarregar: "Navega o cerca el so, escolta'l al reproductor i fes clic directament al botó 'Download' verd sense necessitat de cap usuari."
          },
          {
            id: "bbc",
            nom: "BBC Sound Effects Archive",
            url: "https://sound-effects.bbcrewind.co.uk/",
            icona: "🎙️",
            registre: "Sense registre obligatori",
            registreClass: "badge-success",
            tipus: "Arxiu històric de camp: natura, ciutats, passos, transports i maquinària",
            formats: "WAV sense pèrdua",
            llicencies: "Llicència RemArc de la BBC (Permès per a ús educatiu i escolar)",
            descripcio: "El tresor sonor de la prestigiosa cadena pública britànica: més de 33.000 gravacions reals d'alta definició acumulades al llarg d'un segle per als seus documentals i drames radiofònics.",
            puntsForts: ["Fidelitat documental inigualable", "Arxiu de tempestes, fauna i passos", "Format WAV directe d'alta definició"],
            comDescarregar: "Escriu la cerca en anglès, escolta la mostra i fes clic a la icona de la fletxa de descàrrega al costat de cada pista."
          },
          {
            id: "mixkit",
            nom: "Mixkit Free Sound Effects",
            url: "https://mixkit.co/free-sound-effects/",
            icona: "⚡",
            registre: "Sense registre obligatori",
            registreClass: "badge-success",
            tipus: "Efectes curts per a podcasts, transicions de vídeo, risers i sintonies",
            formats: "WAV i MP3",
            llicencies: "Mixkit Sound Effects Free License",
            descripcio: "Creat per l'empresa Envato, ofereix una cuidada selecció d'efectes de so moderns i sintetitzats de qualitat comercial, especialment útils per a transicions de ràdio, ràfegues i projectes de podcast ràpids.",
            puntsForts: ["Clips molt polits i nets", "Sense soroll residual", "Descàrrega immediata des del Chromebook"],
            comDescarregar: "Clica el botó de descàrrega directa taronja sota de qualsevol efecte."
          },
          {
            id: "bandlab_sounds",
            nom: "BandLab Sounds (Dins l'editor)",
            url: "https://edu.bandlab.com/",
            icona: "🎛️",
            registre: "Inclòs al compte de BandLab",
            registreClass: "badge-tool",
            tipus: "Loops rítmics, instruments virtuals i efectes de so per paquets",
            formats: "Àudio intern multipista",
            llicencies: "100% lliure de royalties dins de BandLab",
            descripcio: "No oblidis que dins del mateix estudi de BandLab disposes d'un botó 'View in Library' / 'Browse Loops' al panell dret amb milers de sons lliures llestos per arrossegar directament a la línia de temps.",
            puntsForts: ["S'ajusta automàticament al tempo (BPM) del projecte", "Arrossegar i deixar anar", "Zero descàrregues al disc"],
            comDescarregar: "Afegeix una nova pista a BandLab i selecciona 'Browse Loops' o obre el panell lateral dret."
          }
        ]
      },

      // ======================================================================
      // 3. AVALUACIÓ FINAL AUTOCORREGIBLE (10 PREGUNTES)
      // ======================================================================
      avaluacioFinal: {
        titol: "Avaluació Final: Qüestionari de Competència Sonora",
        subtitol: "Posa a prova els teus coneixements sobre formats, eines d'edició, mescla multipista i propietat intel·lectual",
        instruccions: "Respon a cadascuna de les 10 preguntes següents. Quan hagis acabat, prem el botó 'Valida les meves respostes' per comprovar la teva nota sobre 10 punts i llegir l'explicació didàctica detallada de cada pregunta.",
        preguntes: [
          {
            id: "q1",
            enunciat: "1. Quina és la diferència fonamental entre un fitxer d'àudio en format WAV i un en format MP3?",
            opcions: [
              "El WAV utilitza compressió amb pèrdua de dades i el MP3 no té cap mena de compressió.",
              "El WAV és àudio pur sense compressió (màxima qualitat però fitxer molt pesat), mentre que el MP3 aplica compressió amb pèrdua psicoacústica (molt més lleuger).",
              "El format WAV només es pot reproduir a ordinadors Windows i el MP3 només a telèfons intel·ligents.",
              "El WAV no permet enregistrar música instrumental, només veu parlada."
            ],
            respostaCorrecta: 1,
            explicacio: "El format WAV guarda la forma d'ona digital exacta sense cap mena de compressió destructiva (format PCM lineal), per això és el format mestre ideal per editar. En canvi, el MP3 elimina les freqüències que l'oïda humana gairebé no percep per estalviar fins a un 90% d'espai."
          },
          {
            id: "q2",
            enunciat: "2. Per a què serveix aplicar un fonedís d'entrada (Fade In) i de sortida (Fade Out) als extrems d'un clip de so?",
            opcions: [
              "Per canviar automàticament l'idioma de la veu enregistrada.",
              "Per evitar 'clics' o espetecs digitals sobtats i aconseguir que el so comenci i s'apagui de manera suau i progressiva.",
              "Per duplicar la velocitat de reproducció de la pista.",
              "Per augmentar el guany fins al màxim de saturació vermella."
            ],
            respostaCorrecta: 1,
            explicacio: "Quan retallem un so bruscament, la forma d'ona pot quedar tallada en un punt de voltatge que produeix un 'clic' molest. Els fonedissos (Fade In / Fade Out) regulen l'amplitud des de o fins a zero per garantir una transició acústica neta."
          },
          {
            id: "q3",
            enunciat: "3. En què consisteix la tècnica del fonedís creuat (Crossfade) que vam practicar a la Pràctica 5?",
            opcions: [
              "En esborrar les dues pistes i substituir-les per un minut de silenci absolut.",
              "En solapar dues cançons fent que la primera baixi de volum progressivament mentre la segona va pujant, creant una transició musical contínua estil DJ.",
              "En accelerar dues cançons fins que superin els 200 BPM al mateix instant.",
              "En invertir l'àudio cap enrere a ambdues pistes."
            ],
            respostaCorrecta: 1,
            explicacio: "El Crossfade dibuixa una 'X' de volums en la zona de solapament entre dos temes: atenua el tema sortint mentre amplifica el tema entrant, evitant talls bruscos o silencis incòmodes a la pista de ball."
          },
          {
            id: "q4",
            enunciat: "4. Si descarregues un efecte de so sota llicència Creative Commons Reconeixement (CC-BY) per al teu podcast escolar, quina és la teva obligació?",
            opcions: [
              "Has de pagar obligatòriament 10 euros a la plataforma abans de lliurar la feina.",
              "Pots utilitzar i modificar el so lliurement, sempre que esmentis l'autor/a original i la llicència als crèdits del projecte.",
              "No pots alterar el so de cap manera, ni tan sols canviar-li el volum.",
              "Només el pots escoltar tu mateix en privat amb auriculars sense compartir el podcast."
            ],
            respostaCorrecta: 1,
            explicacio: "La condició 'BY' (Atribució) atorga permís total per utilitzar, modificar i mesclar l'obra, sempre que es reconegui l'autoria original (per exemple, al document de guió o als crèdits de Classroom)."
          },
          {
            id: "q5",
            enunciat: "5. Quina de les següents afirmacions sobre el format MIDI és la correcta?",
            opcions: [
              "És una gravació acústica que conté la veu humana exacta del locutor.",
              "Ocupa molt més espai de memòria al Chromebook que un arxiu WAV d'un minut.",
              "No conté so real enregistrat, sinó instruccions numèriques (quines notes tocar, quan i amb quina intensitat) que interpreta un sintetitzador o instrument virtual.",
              "Només funciona si connectem una bateria acústica tradicional a l'ordinador."
            ],
            respostaCorrecta: 2,
            explicacio: "Els arxius MIDI no guarden ones de so, sinó dades de partitura (missatges Note On, Note Off, to, velocitat). Per això pesen pocs kilobytes i sonen mitjançant els instruments virtuals del DAW."
          },
          {
            id: "q6",
            enunciat: "6. A la producció de ràdio i podcasts multipista, què és la tècnica del 'Ducking'?",
            opcions: [
              "Canviar el to de la veu perquè soni com un ànec de dibuixos animats.",
              "Abaixar automàticament el volum de la música de fons o els efectes quan la persona està narrant perquè la veu s'entengui nítidament.",
              "Silenciar completament el micròfon de la classe durant l'enregistrament.",
              "Exportar cadascuna de les pistes en un fitxer separat."
            ],
            respostaCorrecta: 1,
            explicacio: "El Ducking és la pràctica d'atenuar les pistes de fons (música ambiental) durant els moments en què el locutor parla, assegurant que el missatge vocal sempre regni en primer pla d'atenció."
          },
          {
            id: "q7",
            enunciat: "7. Si a AudioMass apliquem un canvi de to (Pitch Shift) reduint diversos semitons (-6 semitons), quin efecte acústic aconseguim?",
            opcions: [
              "El so es torna molt més agut i ràpid, com la veu d'un esquirol.",
              "El so es torna molt més greu i fosc, com una veu monstruosa o cavernosa.",
              "El so augmenta exclusivament el seu volum en decibels sense alterar la freqüència.",
              "El so s'esborra immediatament de la memòria del navegador."
            ],
            respostaCorrecta: 1,
            explicacio: "Reduir semitons amb Pitch Shift fa baixar la freqüència fonamental del so, donant-li un to molt més greu, fosc i misteriós (tal com vam fer al repte de la porta terrorífica a la Pràctica 2)."
          },
          {
            id: "q8",
            enunciat: "8. Quina drecera de teclat universal s'utilitza a AudioMass, BandLab i la majoria de programes per desfer un tall o error accidental?",
            opcions: [
              "Ctrl + Alt + Supr",
              "Ctrl + Z (Cmd + Z a Mac)",
              "Espai + Esc",
              "Alt + F4"
            ],
            respostaCorrecta: 1,
            explicacio: "Ctrl + Z és la combinació universal de 'Desfer' (Undo). És una eina clau que permet a l'alumnat experimentar sense por a perdre la feina o fer malbé l'edició anterior."
          },
          {
            id: "q9",
            enunciat: "9. Com s'han d'organitzar els volums dels diferents elements per aconseguir un bon paisatge sonor (Pràctica 3)?",
            opcions: [
              "Tots els sons han de sonar al màxim volum possible (0 dB) per fer molt de soroll.",
              "La base ambiental contínua (pluja/vent) ha d'estar a un volum suau de fons (-6 dB a -12 dB) perquè els esdeveniments puntuals (passes, tro) destaquin en primer pla sense distorsionar.",
              "Els efectes puntuals han de quedar sempre inaudibles.",
              "Només es pot utilitzar una sola pista per a tots els elements alhora."
            ],
            respostaCorrecta: 1,
            explicacio: "Els paisatges sonors es basen en la perspectiva acústica: una base ambiental suau de segon terme crea l'atmosfera, mentre els efectes dramàtics en primer pla expliquen l'acció sense que el conjunt saturi."
          },
          {
            id: "q10",
            enunciat: "10. Quin pas de control de qualitat és indispensable fer abans de prémer 'Lliurar tasca' a Google Classroom?",
            opcions: [
              "Esborrar immediatament l'arxiu de la carpeta de descàrregues del Chromebook.",
              "Reproduir el fitxer exportat des del disc dur per comprovar que sona complet, que no té silencis gegants i que no satura.",
              "Canviar a mà l'extensió de l'arxiu de .mp3 a .pdf.",
              "Reiniciar el Chromebook tres vegades seguides."
            ],
            respostaCorrecta: 1,
            explicacio: "L'autonomia i el control de qualitat són essencials: sempre cal escoltar el producte multimèdia final exportat amb auriculars abans de donar la tasca per finalitzada a la plataforma escolar."
          }
        ]
      },
      
      // Fases pedagògiques
      fases: [
        {
          numFase: 1,
          nom: "Fase 1: Aprenem a manipular sons",
          eina: "AudioMass",
          einaUrl: "https://audiomass.co/",
          objectiu: "Familiaritzar-se amb la forma d'ona, selecció precisa, tallar/enganxar, aplicació d'efectes bàsics i construcció dels primers paisatges sonors.",
          practiques: ["p1", "p2", "p3"]
        },
        {
          numFase: 2,
          nom: "Fase 2: Creem històries sonores",
          eina: "BandLab",
          einaUrl: "https://edu.bandlab.com/",
          objectiu: "Integrar la veu humana gravada al centre de la narració i coordinar-la amb un mínim de 5 efectes en un entorn multipista.",
          practiques: ["p4"]
        },
        {
          numFase: 3,
          nom: "Fase 3: Muntem cançons i creem transicions",
          eina: "BandLab",
          einaUrl: "https://edu.bandlab.com/",
          objectiu: "Alinear ritmes i tempos (BPM), realitzar fonedissos creuats suaus estil DJ i comprendre el paper emocional de les bandes sonores.",
          practiques: ["p5", "p6"]
        },
        {
          numFase: 4,
          nom: "Fase 4: Projecte final",
          eina: "BandLab",
          einaUrl: "https://edu.bandlab.com/",
          objectiu: "Desenvolupar una ficció sonora original completa de 2 a 3 minuts amb guió tècnic, personatges, efectes foley, música i mescla estèreo.",
          practiques: ["p7"]
        }
      ],

      // Pràctiques desenvolupades íntegrament
      practiques: [
        // ====================================================================
        // PRÀCTICA 1
        // ====================================================================
        {
          id: "p1",
          fase: "Fase 1: Aprenem a manipular sons",
          numFase: 1,
          faseNomCurt: "Fase 1",
          titol: "Pràctica 1: Explorem el nostre editor d'àudio",
          subtitol: "Primers passos amb AudioMass: importar, seleccionar, retallar, copiar, enganxar, desfer i exportar.",
          herramienta: "AudioMass",
          herramientaUrl: "https://audiomass.co/",
          videoUrl: "", // Buit per defecte per incrustar YouTube en el futur
          queAprendremos: "En aquesta pràctica inicial coneixeràs què és una forma d'ona digital i com representar visualment el so. Aprendràs a importar àudios al teu Chromebook, utilitzar el zoom per fer seleccions mil·limètriques, netejar silencis innecessaris, moure fragments mitjançant les eines de tallar i enganxar, i finalment exportar la teva feina en format WAV sense pèrdua.",
          
          audiosMuestra: [
            {
              id: "p1_audio_1",
              nom: "Seqüència musical desordenada (Notes pentatòniques)",
              fitxer: "recursos/audio/p1_sequencia_desordenada.wav",
              tipus: "original", // "original" o "exemple"
              etiqueta: "Àudio original per descarregar",
              descripcio: "Arxiu WAV que conté 5 notes musicals (Sol4, Do4, Do5, Mi4, Re4) barrejades de manera aleatòria i separades per silencis. Hauràs de descarregar-lo i ordenar les notes de més greu a més aguda."
            }
          ],

          pasos: [
            "Accedeix a l'eina web AudioMass des del teu navegador fent clic al botó superior 'Obrir AudioMass'.",
            "Descarrega al teu dispositiu l'àudio de suport 'p1_sequencia_desordenada.wav' fent servir el botó de descàrrega.",
            "A AudioMass, importa l'arxiu anant al menú superior: 'File' > 'Load from computer' (o arrossega el fitxer directament a la finestra).",
            "Observa la forma d'ona a la pantalla. Fes servir la roda del ratolí o les icones de la lupa (+ / -) per familiaritzar-te amb el zoom horitzontal.",
            "Prem la barra d'espai per reproduir l'àudio i escolta la seqüència desordenada de les notes.",
            "Localitza la nota més greu de totes (Do4, 261 Hz). Selecciona-la arrossegant el cursor d'esquerra a dreta sobre la seva forma d'ona.",
            "Utilitza l'eina de tallar: fes clic a 'Edit' > 'Cut' (o la drecera de teclat Ctrl+X).",
            "Situa el cursor a l'inici absolut de la pista (temps 0:00) i enganxa la nota amb 'Edit' > 'Paste' (Ctrl+V).",
            "Repeteix l'operació amb la resta de notes fins a ordenar-les en escala ascendent: Do4 ➔ Re4 ➔ Mi4 ➔ Sol4 ➔ Do5.",
            "Selecciona i suprimeix (tecla Supr o 'Edit' > 'Delete') els fragments buits excessius perquè el ritme entre notes sigui fluid i constant.",
            "Si t'equivoques en qualsevol moment, recorda que pots desfer l'última acció amb Ctrl+Z ('Edit' > 'Undo').",
            "Comprova el resultat final reproduint la seqüència completa d'inici a fi.",
            "Ves a 'File' > 'Export to WAV/MP3', selecciona el format WAV (16-bit PCM) i anomena el fitxer 'P1_Cognom_Nom.wav'."
          ],

          reto: "Afegeix al final de la teva escala ordenada un petit motiu o ritme propi de 2 segons (duplicant alguna nota, canviant-li el ritme o fent una seqüència de dues notes alternades) que serveixi com a tancament personal de la melodia.",

          entrega: "Puja a la tasca corresponent de Google Classroom el fitxer d'àudio final exportat amb el nom 'P1_Cognom_Nom.wav'. Assegura't abans de tancar el navegador que l'arxiu es reprodueix correctament al teu Chromebook.",

          rubrica: [
            {
              criteri: "Importació i gestió de l'arxiu a l'entorn de treball",
              descripcio: "Importa el fitxer de mostra, navega per la línia de temps amb zoom i gestiona els fitxers sense dificultat.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Té problemes greus per obrir el fitxer o descarregar-lo al dispositiu." },
                { nom: "En procés", punts: 1.5, detall: "Obre el fitxer però li costa visualitzar la forma d'ona i utilitzar el zoom." },
                { nom: "Assolit", punts: 2.0, detall: "Importa l'arxiu, aplica el zoom amb precisió i es mou per la línia temporal amb agilitat." },
                { nom: "Excel·lent", punts: 2.5, detall: "Domina la interfície, dreceres de teclat (Ctrl+X, Ctrl+V, Ctrl+Z) i organització dels fitxers." }
              ]
            },
            {
              criteri: "Precisió en la selecció, tall i reordenació",
              descripcio: "Reconeix l'altura acústica de les notes i les reordena correctament en ordre ascendent.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Les notes no segueixen l'escala musical correcta o manquen fragments." },
                { nom: "En procés", punts: 1.5, detall: "Ordena part de les notes, però hi ha 1 o 2 errors d'afinació en la seqüència." },
                { nom: "Assolit", punts: 2.0, detall: "Totes les 5 notes estan perfectament ordenades de greu a aguda (Do-Re-Mi-Sol-Do)." },
                { nom: "Excel·lent", punts: 2.5, detall: "Reordenació impecable, ritme homogeni entre notes i neteja total de silencis residuals." }
              ]
            },
            {
              criteri: "Neteja acústica i fluïdesa del muntatge",
              descripcio: "Elimina espais morts i assoleix un so continu sense talls bruscos ni clics digitals.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Es produeixen clics molestos per talls fora del punt zero o silencis desmesurats." },
                { nom: "En procés", punts: 1.5, detall: "Els silencis són irregulars però no hi ha talls que danyin el so de les notes." },
                { nom: "Assolit", punts: 2.0, detall: "Seqüència fluida i espaiat regular entre cadascuna de les notes musicals." },
                { nom: "Excel·lent", punts: 2.5, detall: "Transició acústica perfecta, sense cap soroll parasitiari i amb un acabat professional." }
              ]
            },
            {
              criteri: "Resolució del repte creatiu i format d'exportació",
              descripcio: "Afegeix el motiu musical propi i lliura el fitxer en format WAV amb el nom estipulat.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No resol el repte creatiu o el fitxer no està en format d'àudio funcional." },
                { nom: "En procés", punts: 1.5, detall: "Exporta el fitxer però oblida el motiu creatiu o no utilitza el nom indicat." },
                { nom: "Assolit", punts: 2.0, detall: "Afegeix un motiu creatiu senzill i exporta correctament en format WAV." },
                { nom: "Excel·lent", punts: 2.5, detall: "Crea un motiu musical propi molt original, ben integrat, amb nomenclatura perfecta." }
              ]
            }
          ]
        },

        // ====================================================================
        // PRÀCTICA 2
        // ====================================================================
        {
          id: "p2",
          fase: "Fase 1: Aprenem a manipular sons",
          numFase: 1,
          faseNomCurt: "Fase 1",
          titol: "Pràctica 2: Transformem els sons!",
          subtitol: "Canvi de volum, accelerar/alentir, eco, reverberació, fonedissos i to a AudioMass.",
          herramienta: "AudioMass",
          herramientaUrl: "https://audiomass.co/",
          videoUrl: "",
          queAprendremos: "Descobriràs com la tecnologia digital permet transformar un so quotidià en una experiència completament diferent. Treballarem els paràmetres fonamentals de l'àudio: amplitud (guany i fonedissos), freqüència (canvi de to o pitch shift), temps (acceleració i desacceleració) i espai acústic (ressò i reverberació).",
          
          audiosMuestra: [
            {
              id: "p2_audio_1",
              nom: "So original de porta (Frontissa i cop sec)",
              fitxer: "recursos/audio/p2_porta_original.wav",
              tipus: "original",
              etiqueta: "Àudio original per descarregar",
              descripcio: "So real i net d'una porta de fusta domèstica: un xerric inicial seguit d'un cop tancant la fulla."
            },
            {
              id: "p2_audio_2",
              nom: "Exemple transformat: Porta terrorífica i misteriosa",
              fitxer: "recursos/audio/p2_porta_terror_exemple.wav",
              tipus: "exemple",
              etiqueta: "Exemple de resultat acabat",
              descripcio: "Exemple sonor del resultat esperat: la mateixa porta transformada en un so fosc, alentit, amb un to molt greu i un ressò cavernós d'ultratomba."
            }
          ],

          pasos: [
            "Descarrega l'àudio base 'p2_porta_original.wav' i obre'l a AudioMass.",
            "Escolta també l'exemple acabat 'p2_porta_terror_exemple.wav' per entendre com els efectes transformen radicalment la sensació que produeix el so.",
            "Selecciona el primer fragment de l'àudio (el xerric de la frontissa).",
            "Aplica un canvi de to greu: ves a 'Effects' > 'Pitch Shift' i redueix entre -4 i -7 semitons (o 'Playback Rate' per fer-lo anar més a poc a poc).",
            "Aplica un fonedís d'entrada suau: 'Effects' > 'Fade In' als primers 0.15 segons per evitar entrades sobtades.",
            "Selecciona el cop final de la porta i incrementa el seu volum: ves a 'Effects' > 'Gain' (+3 dB a +6 dB) vigilant no arribar a la zona vermella de distorsió.",
            "Selecciona tot l'arxiu (Ctrl+A) i afegeix sensació d'amplitud i espai: ves a 'Effects' > 'Reverb' per simular una habitació gran o una cova.",
            "Aplica un efecte de ressò: ves a 'Effects' > 'Delay' amb un retard de 0.35s i feedback suau per crear repeticions fantasmals.",
            "Opcional: prova d'invertir un petit fragment del xerric amb 'Effects' > 'Reverse' just abans del cop sec.",
            "Escolta el conjunt i ajusta els nivells de sortida per assegurar que el so transmeti el misteri buscat.",
            "Exporta el fitxer resultant anant a 'File' > 'Export to WAV/MP3' amb el nom 'P2_Porta_Cognom_Nom.wav'."
          ],

          reto: "REPTE CREATIU: Transforma el so de la porta en una de les següents tres opcions (escull-ne una): 1) La porta d'un castell encantat amb esperits, 2) La comporta hermètica i hidràulica d'una nau espacial futurista de ciència-ficció, o 3) La pesada cel·la d'acer d'una presó de màxima seguretat.",

          entrega: "Puja a Google Classroom el teu arxiu d'àudio 'P2_Porta_Cognom_Nom.wav' i afegeix un comentari privat especificant quina de les 3 opcions del repte has escollit i quins 3 efectes principals has utilitzat per aconseguir-ho.",

          rubrica: [
            {
              criteri: "Modulació de to (Pitch) i velocitat temporal",
              descripcio: "Modifica adequadament la freqüència i el ritme per allunyar el so del seu estat domèstic original.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "El so continua sonant idèntic a l'original sense cap alteració de to ni velocitat." },
                { nom: "En procés", punts: 1.5, detall: "S'aprecia un lleuger canvi de to o velocitat però és poc perceptible o descompensat." },
                { nom: "Assolit", punts: 2.0, detall: "El to i la velocitat estan clarament transformats aconseguint l'efecte de pes i dramatisme." },
                { nom: "Excel·lent", punts: 2.5, detall: "Tractament magistral de la velocitat i el to que atorga un caràcter completament nou i creïble." }
              ]
            },
            {
              criteri: "Ús d'efectes espacials (Eco, Delay i Reverberació)",
              descripcio: "Aplica ressò i reverberació creant una il·lusió d'espai tridimensional realista.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No s'ha aplicat cap efecte d'eco ni reverberació." },
                { nom: "En procés", punts: 1.5, detall: "Efecte d'eco aplicat de forma excessiva o inadequada que embasta el so." },
                { nom: "Assolit", punts: 2.0, detall: "Reverberació i ressò ben calibrats que aporten profunditat espacial sense embrutar." },
                { nom: "Excel·lent", punts: 2.5, detall: "Ambientació espacial excel·lent que recrea fidelment l'escenari escollit (cova, castell, nau)." }
              ]
            },
            {
              criteri: "Control de volum, fonedissos i absència de distorsió",
              descripcio: "Aplica Fade In / Fade Out i gestiona el guany sense provocar saturació (clipping).",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "El so satura clarament o té talls molt sobtats a l'inici i final." },
                { nom: "En procés", punts: 1.5, detall: "Hi ha fonedissos però el volum és massa feble o frega la distorsió." },
                { nom: "Assolit", punts: 2.0, detall: "Bona gestió del volum, fonedissos nets i volum òptim sense saturació." },
                { nom: "Excel·lent", punts: 2.5, detall: "Dinàmica impecable, transicions d'amplitud naturals i mescla acústica neta." }
              ]
            },
            {
              criteri: "Originalitat del repte i justificació pedagògica",
              descripcio: "Compleix el repte escollit i descriu amb claredat els efectes aplicats al comentari de Classroom.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No s'indica quina opció s'ha escollit ni s'expliquen els efectes." },
                { nom: "En procés", punts: 1.5, detall: "L'efecte sonor no s'ajusta del tot a l'opció triada o l'explicació és molt pobra." },
                { nom: "Assolit", punts: 2.0, detall: "L'efecte sonor s'identifica clarament amb l'opció triada i està ben justificat." },
                { nom: "Excel·lent", punts: 2.5, detall: "Resultat creatiu excel·lent, gran capacitat expressiva i anàlisi tècnica impecable." }
              ]
            }
          ]
        },

        // ====================================================================
        // PRÀCTICA 3
        // ====================================================================
        {
          id: "p3",
          fase: "Fase 1: Aprenem a manipular sons",
          numFase: 1,
          faseNomCurt: "Fase 1",
          titol: "Pràctica 3: Construïm paisatges sonors",
          subtitol: "Superposició de pistes, ajustament de volums relatius i combinació de sons naturals i artificials.",
          herramienta: "AudioMass",
          herramientaUrl: "https://audiomass.co/",
          videoUrl: "",
          queAprendremos: "Un paisatge sonor (soundscape) és la recreació acústica d'un ambient o entorn. Aprendràs a diferenciar entre els sons d'ambient continu (fons o background) i els esdeveniments puntuals (primer pla o foreground), ajustant la jerarquia de volums perquè la composició transporti l'oient directament a un lloc i un moment concrets.",
          
          audiosMuestra: [
            {
              id: "p3_audio_1",
              nom: "Base ambiental contínua: Vent i pluja",
              fitxer: "recursos/audio/p3_pluja_vent.wav",
              tipus: "original",
              etiqueta: "Àudio original: Ambient de fons",
              descripcio: "Sons d'atmosfera meteorològica contínua (ràfegues de vent fluctuant i pluja caient)."
            },
            {
              id: "p3_audio_2",
              nom: "Esdeveniment rítmic: Passes sobre fusta/grava",
              fitxer: "recursos/audio/p3_passes.wav",
              tipus: "original",
              etiqueta: "Àudio original: Acció puntual",
              descripcio: "Seqüència de passes d'una persona caminant a pas ferm."
            },
            {
              id: "p3_audio_3",
              nom: "Esdeveniment dramàtic: Llampec i tro ressonant",
              fitxer: "recursos/audio/p3_tro.wav",
              tipus: "original",
              etiqueta: "Àudio original: Clímax sonor",
              descripcio: "Impacte sobtat d'un llampec seguit d'un tro greu i profund que s'allunya."
            }
          ],

          pasos: [
            "Descarrega al teu Chromebook els 3 arxius de la pràctica: 'p3_pluja_vent.wav', 'p3_passes.wav' i 'p3_tro.wav'.",
            "Obre AudioMass i carrega primer la pista ambiental de fons ('p3_pluja_vent.wav').",
            "Abaixa el volum d'aquesta base d'ambient ('Effects' > 'Gain' a -5 dB o -7 dB) per garantir que quedi com a segon pla sonor i no emmascari la resta de sons.",
            "Obre la pista de passes o copia el fragment necessari. Fes servir 'Edit' > 'Paste and Mix' (o 'Mix with clipboard') per barrejar les passes amb la pluja a partir del segon 1.5.",
            "Introdueix l'arxiu del tro ('p3_tro.wav') en un moment de màxima tensió (per exemple, cap al segon 3.0), just abans que s'aturin les passes.",
            "Comprova la proporció de volums: el tro ha de sonar contundent en primer pla però sense saturar; el vent i la pluja han de mantenir l'atmosfera constant de fons; i les passes han d'estar en un pla intermedi.",
            "Aplica un 'Fade In' d'1 segon a l'inici del paisatge i un 'Fade Out' de 2 segons al final de la composició perquè l'ambient s'esvaeixi suaument.",
            "Escolta tota la composició amb auriculars, tancant els ulls: pots visualitzar la tempesta, la persona caminant i el moment en què esclata el tro?",
            "Exporta el fitxer resultant com a 'P3_Paisatge_Cognom_Nom.wav'."
          ],

          reto: "REPTE CREATIU: Personalitza el teu paisatge sonor per ambientar una escena única d'uns 15-25 segons. Pots escollir: A) Una persecució nocturna en una ciutat plujosa, B) Un refugi aïllat en alta muntanya durant una tempesta de neu, o C) Una mansió abandonada amb un misteri a punt de desvelar-se. Pots gravar un efecte propi amb el mòbil (ex. obrir un paraigua o un panteix de respiració) i afegir-lo!",

          entrega: "Lliura a Google Classroom el fitxer 'P3_Paisatge_Cognom_Nom.wav'. Acompanya el lliurament amb una breu descripció (3 línies) explicant la història que s'amaga darrere del teu paisatge sonor.",

          rubrica: [
            {
              criteri: "Estructura de plans sonors (fons vs primer pla)",
              descripcio: "Diferencia clarament l'ambientació contínua dels esdeveniments puntuals en primer terme.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Els sons sonen tots al mateix volum pla o s'encavalquen de manera caòtica." },
                { nom: "En procés", punts: 1.5, detall: "S'intueix la intenció dels plans, però el fons tapa els efectes o les passes gairebé no se senten." },
                { nom: "Assolit", punts: 2.0, detall: "Plans ben definits: ambient constant de fons i efectes d'acció ben situats en primer terme." },
                { nom: "Excel·lent", punts: 2.5, detall: "Profunditat acústica excel·lent, sensació d'espai tridimensional i perspectiva cinematogràfica." }
              ]
            },
            {
              criteri: "Mescla harmònica i equilibri de guanys",
              descripcio: "Evita la col·lisió de freqüències i la saturació del senyal durant els moments de màxim volum.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "L'àudio distorsiona clarament en el moment del tro o hi ha talls inaudibles." },
                { nom: "En procés", punts: 1.5, detall: "El volum general és baix o hi ha petites saturacions puntuals durant la mescla." },
                { nom: "Assolit", punts: 2.0, detall: "Mescla neta i controlada; el tro té pegada sense que el senyal esdevingui vermell." },
                { nom: "Excel·lent", punts: 2.5, detall: "Equilibri dinàmic professional, gran claredat tímbrica i relació senyal/soroll òptima." }
              ]
            },
            {
              criteri: "Temporalitat, ritme i transicions",
              descripcio: "Organitza els elements al llarg del temps amb un ritme narratiu coherent i fonedissos d'entrada/sortida.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "L'àudio arrenca o s'atura de cop sense fonedissos, o els sons estan mal sincronitzats." },
                { nom: "En procés", punts: 1.5, detall: "Té fonedissos però l'arribada dels efectes sembla inconnexa o precipitada." },
                { nom: "Assolit", punts: 2.0, detall: "Bona evolució temporal, fonedissos correctes i ritme narratiu ben pautat." },
                { nom: "Excel·lent", punts: 2.5, detall: "Transicions impecables, timing dramàtic impecable que genera tensió narrativa real." }
              ]
            },
            {
              criteri: "Capacitat evocadora i enriquiment del repte",
              descripcio: "El paisatge transmet una atmosfera clara i afegeix elements personals coherents.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No s'aprecia cap ambient identificable ni s'ha justificat el treball." },
                { nom: "En procés", punts: 1.5, detall: "La història és poc clara o no s'ha afegit cap element distintiu al conjunt bàsic." },
                { nom: "Assolit", punts: 2.0, detall: "Es reconeix l'ambient escollit al repte i la descripció del lliurament és coherent." },
                { nom: "Excel·lent", punts: 2.5, detall: "Grandíssima potència immersiva que transporta l'oient; sons addicionals molt ben integrats." }
              ]
            }
          ]
        },

        // ====================================================================
        // PRÀCTICA 4
        // ====================================================================
        {
          id: "p4",
          fase: "Fase 2: Creem històries sonores",
          numFase: 2,
          faseNomCurt: "Fase 2",
          titol: "Pràctica 4: La meva primera història sonora",
          subtitol: "Enregistrament de veu narrant, efectes sonors sincronitzats i edició multipista amb BandLab for Education.",
          herramienta: "BandLab",
          herramientaUrl: "https://edu.bandlab.com/",
          videoUrl: "",
          queAprendremos: "Fem el salt a un entorn professional d'estudi digital multipista (DAW): BandLab for Education. Aprendràs a gravar la teva pròpia veu amb el micròfon del Chromebook, a utilitzar pistes independents per a cadascun dels elements sonors, a sincronitzar un mínim de 5 efectes d'àudio que reforcin la narració i a fer que una història d'1 a 2 minuts s'entengui i emocioni sense necessitat de cap imatge.",
          
          audiosMuestra: [
            {
              id: "p4_recurs_1",
              nom: "Biblioteca d'efectes BandLab Sounds & Foley",
              fitxer: "recursos/audio/p3_passes.wav", // exemple de recurs disponible
              tipus: "original",
              etiqueta: "Exemple d'efecte Foley per importar",
              descripcio: "Recorda que pots importar tant els sons creats a AudioMass (Fase 1) com explorar la biblioteca de BandLab Sounds integrada al panell dret."
            }
          ],

          pasos: [
            "Inicia sessió a BandLab for Education (edu.bandlab.com) amb el teu compte de correu del centre.",
            "Crea un projecte nou en blanc fent clic a '+ Create' > 'New Project'.",
            "Redacta abans de res un petit guió de 6 a 10 línies per a la teva història (d'1 a 2 minuts de durada). Exemple: tornar a casa de nit, obrir la porta, sentir passes al passadís buit, veure una ombra, trobar una finestra oberta...",
            "Afegeix una pista de tipus 'Voice/Mic' a BandLab. Fes una prova prèvia de gravació per verificar que el micròfon del Chromebook no satura ni queda massa fluix.",
            "Grava la teva veu narrant la història amb bona dicció, vocalització clara i respectant les pauses dramàtiques on després situaràs els sons.",
            "Crea almenys 4 o 5 pistes addicionals ('Add Track' > 'Voice/Audio' o 'Browse Loops').",
            "Afegeix com a mínim 5 efectes de so diferents en moments clau del relat (passes, porta que s'obre, cop a la finestra, rellotge que fa tic-tac, vent fosc...).",
            "Ajusta el volum de cadascuna de les pistes (faders de volum a l'esquerra de cada pista) per aplicar la tècnica de 'Ducking': la veu ha d'estar sempre en primer terme i els efectes no han de tapar les paraules.",
            "Experimenta amb la panoràmica (Pan L/R): col·loca algun so lleugerament a l'esquerra o a la dreta per fer l'experiència més immersiva per a qui escolti amb auriculars.",
            "Aplica fonedissos suaus d'entrada i sortida als fragments sonors per evitar clics i aturades sobtades.",
            "Escolta la història completa de principi a fi amb els ulls tancats: s'entén tot el fil narratiu sense suport visual?",
            "Exporta el projecte anant a 'File' > 'Download' > 'Mixdown as' i tria format MP3 o WAV.",
            "Anomena el fitxer 'P4_HistoriaSonora_Cognom_Nom.mp3'."
          ],

          reto: "REPTE CREATIU: Condicions indispensables del repte: 1) Història breu d'entre 1 i 2 minuts, 2) Veu pròpia gravada narrant, 3) Mínim de 5 efectes sonors diferents sincronitzats al segon exacte, 4) Fonedissos a tots els talls, i 5) Aconseguir que l'oient experimenti una emoció concreta (intriga, tensió, sorpresa o comèdia) exclusivament a través de l'oïda.",

          entrega: "Puja a Google Classroom el fitxer d'àudio 'P4_HistoriaSonora_Cognom_Nom.mp3' juntament amb el document de text del teu guió utilitzat (on figurin indicats entre parèntesis els efectes de so utilitzats).",

          rubrica: [
            {
              criteri: "Qualitat i expressivitat de la veu narradora",
              descripcio: "Vocalització, claredat, ritme de parla i absència de sorolls molestos de respiració o distorsió.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Veu inaudible, excessivament ràpida, incomprensible o amb forta distorsió de micròfon." },
                { nom: "En procés", punts: 1.5, detall: "La veu s'entén però la dicció és monòtona, sense pauses dramàtiques ni expressió." },
                { nom: "Assolit", punts: 2.0, detall: "Veu clara, ben modulada, amb bon ritme narratiu i volum adequat respecte a la mescla." },
                { nom: "Excel·lent", punts: 2.5, detall: "Interpretació vocal excel·lent que captiva l'atenció de l'oient, amb gran expressivitat dramàtica." }
              ]
            },
            {
              criteri: "Quantitat, varietat i sincronització dels efectes sonors (mín. 5)",
              descripcio: "Inclou com a mínim 5 efectes sonors ben seleccionats i coordinats al segon amb la narració.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Hi ha menys de 3 efectes o estan completament dessincronitzats de la narració." },
                { nom: "En procés", punts: 1.5, detall: "Inclou entre 3 i 4 efectes, però alguns entren massa d'hora o tard respecte al guió." },
                { nom: "Assolit", punts: 2.0, detall: "Compleix el mínim de 5 efectes sonors ben sincronitzats amb el moment precís de la història." },
                { nom: "Excel·lent", punts: 2.5, detall: "Gran varietat i riquesa tímbrica (>5 efectes) amb una sincronització mil·limètrica exemplar." }
              ]
            },
            {
              criteri: "Mescla multipista, volums (Ducking) i panoràmica estèreo",
              descripcio: "Equilibri entre la pista de veu i les pistes d'efectes, aprofitant l'espai estèreo (Pan L/R).",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Els efectes tapen la veu completament o el volum general varia bruscament." },
                { nom: "En procés", punts: 1.5, detall: "La veu se sent, però alguns efectes sonen massa forts o manquen fonedissos." },
                { nom: "Assolit", punts: 2.0, detall: "Bona mescla: la veu destaca amb claredat (ducking efectiu) i s'utilitza la panoràmica estèreo." },
                { nom: "Excel·lent", punts: 2.5, detall: "Mescla d'estudi professional impecable, gran espacialitat estèreo i transicions elegants." }
              ]
            },
            {
              criteri: "Guió literari, coherència narrativa i durada (1-2 min)",
              descripcio: "Història amb introducció, nus i desenllaç que s'entén completament sense imatges.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "La història és caòtica, no té sentit narratiu o la durada està fora dels paràmetres." },
                { nom: "En procés", punts: 1.5, detall: "La història s'intueix però el final és sobtat o manca el document de guió." },
                { nom: "Assolit", punts: 2.0, detall: "Història ben estructurada, dura entre 1 i 2 minuts i s'adjunta el guió corresponent." },
                { nom: "Excel·lent", punts: 2.5, detall: "Guió excel·lentment escrit, gran poder evocador, durada perfecta i clímax rodó." }
              ]
            }
          ]
        },

        // ====================================================================
        // PRÀCTICA 5
        // ====================================================================
        {
          id: "p5",
          fase: "Fase 3: Muntem cançons i creem transicions",
          numFase: 3,
          faseNomCurt: "Fase 3",
          titol: "Pràctica 5: Unim dues cançons sense que es noti el tall",
          subtitol: "Bases rítmiques, retall per compassos, ajustament de volums i fonedissos creuats suaus (Crossfade) estil DJ.",
          herramienta: "BandLab",
          herramientaUrl: "https://edu.bandlab.com/",
          videoUrl: "",
          queAprendremos: "Com aconsegueixen els DJs i productors musicals enllaçar dos temes diferents sense trencar la pista de ball? Aprendràs el concepte de tempo (BPM o pulsacions per minut), la divisió en compassos de 4/4, com alinear els bombos forts (downbeats) a la quadrícula magnètica de BandLab i com aplicar un fonedís creuat (crossfade) perquè la transició sigui imperceptible.",
          
          audiosMuestra: [
            {
              id: "p5_audio_1",
              nom: "Base Rítmica 1: Electrònica / Dance (120 BPM)",
              fitxer: "recursos/audio/p5_base_ritmica_1.wav",
              tipus: "original",
              etiqueta: "Pista A: Base 120 BPM per descarregar",
              descripcio: "Base amb bombo a 4 temps (four-on-the-floor), caixa, xarleston i línia de baix sintètic a 120 BPM."
            },
            {
              id: "p5_audio_2",
              nom: "Base Rítmica 2: Hip-Hop / Groove (100 BPM)",
              fitxer: "recursos/audio/p5_base_ritmica_2.wav",
              tipus: "original",
              etiqueta: "Pista B: Base 100 BPM per descarregar",
              descripcio: "Base rítmica càlida amb swing, bombo sincopat, caixa suau i acords de teclat elèctric a 100 BPM."
            }
          ],

          pasos: [
            "Descarrega al teu Chromebook les dues bases rítmiques de mostra ('p5_base_ritmica_1.wav' i 'p5_base_ritmica_2.wav').",
            "Obre un nou projecte a BandLab for Education i crea dues pistes d'àudio buides: anomena la primera 'Pista A (120 BPM)' i la segona 'Pista B (100 BPM)'.",
            "Importa cadascun dels dos arxius a la seva pista corresponent.",
            "Assegura't de tenir activada la quadrícula magnètica (Snap to Grid) a 1 compàs (1 Bar) o 1/4 per facilitar l'alineació precisa.",
            "Escolta la Pista A i localitza el primer compàs complet. Si hi ha algun silenci previ, retalla'l amb l'eina Split (drecera 'S').",
            "Fes el mateix amb la Pista B: identifica clarament el primer cop fort de bombo.",
            "Situa la Pista B a continuació de la Pista A, però fent que se solapin durant un tram d'1 o 2 compassos (on sonaran les dues simultàniament).",
            "Aplica la tècnica del fonedís creuat (Crossfade): arrossega el tirador de 'Fade Out' al final de la Pista A i el tirador de 'Fade In' a l'inici de la Pista B creant una 'X' visual de volums.",
            "Opcionalment, fes servir l'automatització de volum de BandLab per perfilar la corba de transició amb més precisió.",
            "Verifica que durant la transició no es produeixi una pujada desmesurada de volum provocada per la suma de dos bombos alhora.",
            "Escolta el punt d'unió 3 vegades seguides: notas el tall o flueix com una sessió continuada?",
            "Exporta la mescla com a 'P5_Transicio_Cognom_Nom.mp3'."
          ],

          reto: "REPTE CREATIU: Afegeix un efecte sonor especial de transició (riser, plat invertit / reverse cymbal, un sweep de soroll blanc o una frenada de vinil 'tape stop') just en el punt on la segona cançó pren el relleu definitiu per donar un toc professional de club o ràdio.",

          entrega: "Puja a Google Classroom el fitxer resultant 'P5_Transicio_Cognom_Nom.mp3'. Al camp de comentaris, explica quants compassos dura la teva zona de solapament i quin efecte de transició addicional has escollit.",

          rubrica: [
            {
              criteri: "Alineació rítmica i divisió per compassos",
              descripcio: "Retalla i posiciona els blocs musicals coincidint amb els temps forts del compàs a la quadrícula.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Els temes estan enganxats a l'atzar, fora de ritme i tallats a mig compàs." },
                { nom: "En procés", punts: 1.5, detall: "El tall és a prop del temps fort però hi ha una petita reculada o avanç rítmic." },
                { nom: "Assolit", punts: 2.0, detall: "Alineació correcta: la segona cançó entra sincronitzada amb el primer temps del compàs." },
                { nom: "Excel·lent", punts: 2.5, detall: "Precisió rítmica absoluta, sincronia mètrica perfecta aprofitant la quadrícula magnètica." }
              ]
            },
            {
              criteri: "Qualitat del fonedís creuat (Crossfade)",
              descripcio: "Aplica corbes de volum creuades sense buits de silenci ni xocs de volum sobtats.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No hi ha fonedís: una cançó s'apaga bruscament i l'altra comença de sobte." },
                { nom: "En procés", punts: 1.5, detall: "Hi ha fonedís però dura massa poc o s'aprecia una baixada buida de volum al mig." },
                { nom: "Assolit", punts: 2.0, detall: "Fonedís creuat suau i progressiu que garanteix la continuïtat musical." },
                { nom: "Excel·lent", punts: 2.5, detall: "Crossfade impecable, transició imperceptible i manteniment constant de l'energia musical." }
              ]
            },
            {
              criteri: "Neteja de la mescla i equilibri de freqüències",
              descripcio: "Evita la saturació i l'embastament produït per la suma de greus durant la transició.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "El volum satura en vermell durant la zona de solapament." },
                { nom: "En procés", punts: 1.5, detall: "Els greus d'ambdós temes xoquen lleugerament provocant un so embastat." },
                { nom: "Assolit", punts: 2.0, detall: "Volums compensats correctament sense distorsió al punt d'enllaç." },
                { nom: "Excel·lent", punts: 2.5, detall: "Mescla transparent, tractament acurat dels greus i equilibri tonal òptim." }
              ]
            },
            {
              criteri: "Integració de l'efecte de transició especial",
              descripcio: "Afegeix i sincronitza un recurs d'efecte de DJ per emfatitzar el canvi de cançó.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No s'ha afegit cap efecte de transició al repte." },
                { nom: "En procés", punts: 1.5, detall: "S'ha afegit un efecte però no encaixa amb el tempo o està desplaçat en el temps." },
                { nom: "Assolit", punts: 2.0, detall: "Efecte de transició ben col·locat que aporta dinamisme i cohesió a la mescla." },
                { nom: "Excel·lent", punts: 2.5, detall: "Efecte perfectament triat i sincronitzat que eleva la transició a nivell professional." }
              ]
            }
          ]
        },

        // ====================================================================
        // PRÀCTICA 6
        // ====================================================================
        {
          id: "p6",
          fase: "Fase 3: Muntem cançons i creem transicions",
          numFase: 3,
          faseNomCurt: "Fase 3",
          titol: "Pràctica 6: Creem una banda sonora",
          subtitol: "El poder emocional de la música: com canviar radicalment el to dramàtic d'una escena amb BandLab.",
          herramienta: "BandLab",
          herramientaUrl: "https://edu.bandlab.com/",
          videoUrl: "",
          queAprendremos: "La música és el llenguatge invisible que diu a l'espectador què ha de sentir. En aquesta pràctica aprendràs com la selecció d'instruments, l'harmonia (tons majors vs tons menors o dissonants) i el ritme poden convertir una mateixa escena visual en un moment de terror angoixant, d'alegria esperançadora, d'acció trepidant o de profunda nostàlgia.",
          
          audiosMuestra: [
            {
              id: "p6_recurs_1",
              nom: "Biblioteca BandLab: Paquets Cinematic & Soundtrack",
              fitxer: "recursos/audio/p5_base_ritmica_2.wav",
              tipus: "original",
              etiqueta: "Exemple de patrons harmònics",
              descripcio: "Utilitza els bucles i instruments virtuals de BandLab (Orchestral, Cinematic Strings, Horror FX, Upbeat Pop) per crear dues atmosferes contrastades."
            }
          ],

          pasos: [
            "Llegeix la següent situació narrativa bàsica: 'Una persona camina sola per un bosc nevat a mitja tarda i s'apropa a una cabana aïllada on hi ha una petita llum a la finestra'.",
            "Crea un projecte a BandLab per desenvolupar la **Versió A: Suspens, Misteri o Terror** (durada d'aproximadament 45s a 1 min).",
            "Per a la Versió A, utilitza escales menors o sons dissonants: cordes sostingudes amb vibrato, sintetitzadors greus i foscos (drones), cops aïllats de percussió metàl·lica i silencis llargs.",
            "Aplica un crescendo suau a mesura que el personatge s'apropa a la finestra.",
            "Exporta la Versió A amb el nom 'P6_VersioA_Terror_Cognom_Nom.mp3'.",
            "Ara crea un segon projecte a BandLab per desenvolupar la **Versió B: Esperança, Aventura o Alegria** per a exactament la mateixa escena.",
            "Per a la Versió B, fes servir harmonies en to major: piano lluminós, instruments de corda càlids, ritme constant i esperançador, campanetes o vents fusta.",
            "Exporta la Versió B amb el nom 'P6_VersioB_Aventura_Cognom_Nom.mp3'.",
            "Escolta una versió darrere l'altra: com canvia la teva percepció sobre el que hi ha dins de la cabana en funció de la música?",
            "Verifica que ambdues versions tinguin un inici net, un desenvolupament que evolucioni en intensitat i un fonedís de sortida elegant."
          ],

          reto: "REPTE CREATIU: Fes un 'test a cegues' amb un company o companya de l'aula: fes-li escoltar cadascuna de les teves dues versions sense dir-li prèviament quina és cadascuna i demana-li quina sensació o emoció li desperta. Anota la seva resposta a la teva memòria de lliurament!",

          entrega: "Puja a Google Classroom els dos fitxers d'àudio ('P6_VersioA_Terror_Cognom_Nom.mp3' i 'P6_VersioB_Aventura_Cognom_Nom.mp3') i adjunta un breu text de 5 línies explicant quins instruments i elements musicals has triat per a cada versió i quin ha estat el resultat del test a cegues.",

          rubrica: [
            {
              criteri: "Contrast emocional i expressiu entre ambdues versions",
              descripcio: "Les dues versions sonores generen estats d'ànim clarament diferenciats sobre la mateixa situació.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Les dues peces sonen pràcticament iguals o no transmeten cap emoció definida." },
                { nom: "En procés", punts: 1.5, detall: "S'intueix una petita diferència però l'emoció és confusa o poc definida." },
                { nom: "Assolit", punts: 2.0, detall: "Dues versions clarament contrastades (terror/suspens vs aventura/esperança) i efectives." },
                { nom: "Excel·lent", punts: 2.5, detall: "Contrast dramàtic impressionant; cadascuna de les versions transforma per complet la narrativa de l'escena." }
              ]
            },
            {
              criteri: "Selecció d'instruments i adequació tímbrica",
              descripcio: "Escull instruments coherents amb la intenció narrativa de cadascuna de les peces.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Els instruments escollits no tenen relació amb l'objectiu o xoquen entre si." },
                { nom: "En procés", punts: 1.5, detall: "Tria alguns instruments adequats però d'altres distreuen o trenquen l'atmosfera." },
                { nom: "Assolit", punts: 2.0, detall: "Elecció acurada i coherent d'instruments tant a la versió A com a la versió B." },
                { nom: "Excel·lent", punts: 2.5, detall: "Paleta tímbrica rica, molt professional i amb un ús impecable dels recursos sonors." }
              ]
            },
            {
              criteri: "Evolució dinàmica i estructura compositiva",
              descripcio: "Les peces tenen un desenvolupament coherent (inici, evolució/crescendo i tancament).",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "La música és un bucle repetitiu pla sense cap evolució al llarg del minut." },
                { nom: "En procés", punts: 1.5, detall: "Hi ha una petita pujada d'intensitat però l'estructura és bàsica o s'acaba sobtadament." },
                { nom: "Assolit", punts: 2.0, detall: "Composició estructurada amb inici, creixement de la tensió dramàtica i resolució." },
                { nom: "Excel·lent", punts: 2.5, detall: "Dramatisme cinematogràfic excel·lent, crescendo magistral i fonedís final molt polit." }
              ]
            },
            {
              criteri: "Qualitat tècnica de la mescla i reflexió didàctica",
              descripcio: "Mescla sense saturació i redacció de la memòria d'elements i resultat del test a cegues.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Mescles defectuoses i no s'aporta cap comentari ni explicació del test." },
                { nom: "En procés", punts: 1.5, detall: "Lliura els dos àudios però la reflexió escrita és incompleta o no inclou el test." },
                { nom: "Assolit", punts: 2.0, detall: "Bona mescla sonora d'ambdós arxius i memòria completa amb el feedback del company." },
                { nom: "Excel·lent", punts: 2.5, detall: "Qualitat de producció excel·lent i reflexió didàctica madura, detallada i molt analítica." }
              ]
            }
          ]
        },

        // ====================================================================
        // PRÀCTICA 7
        // ====================================================================
        {
          id: "p7",
          fase: "Fase 4: Projecte final",
          numFase: 4,
          faseNomCurt: "Fase 4",
          titol: "Pràctica 7: Som creadors d'una ficció sonora",
          subtitol: "Producció completa d'un radioteatre o podcast de ficció dramàtica (2-3 minuts) integrant totes les competències.",
          herramienta: "BandLab",
          herramientaUrl: "https://edu.bandlab.com/",
          videoUrl: "",
          queAprendremos: "El projecte culminant del bloc d'àudio: convertir-te en un equip complet de producció radiofònica i podcast. Integraràs en una obra original de 2 a 3 minuts totes les eines i tècniques apreses: escriptura de guió tècnic, gravació i interpretació de veus de personatges, efectes sonors foley manipulats, atmosferes i paisatges, banda sonora i transicions musicals, i finalment mescla i masterització multipista.",
          
          audiosMuestra: [
            {
              id: "p7_recurs_1",
              nom: "Plantilla de guia d'organització de pistes per a DAW",
              fitxer: "recursos/audio/p3_tro.wav",
              tipus: "original",
              etiqueta: "Exemple de recurs Foley integrat",
              descripcio: "Recorda organitzar el teu projecte de BandLab en 5 blocs de pistes ben etiquetats: 1. Veus, 2. Efectes de personatge (Foley), 3. Ambients de fons, 4. Música/Sintonia, 5. Transicions."
            }
          ],

          pasos: [
            "**Fase 1: Preproducció i Guió.** En parelles o individualment, redacta el guió literari i tècnic de la teva ficció sonora (durada: de 2 a 3 minuts). Divideix el document en dues columnes: esquerra per a les indicacions tècniques (sons FX, música, fons) i dreta per als diàlegs dels personatges.",
            "Assegura't que la història tingui una estructura dramàtica clara: plantejament inicial, nus amb un conflicte o misteri, i un desenllaç coherent (amb un gir argumental sorprenent!).",
            "**Fase 2: Creació del projecte a BandLab.** Obre BandLab for Education i crea un projecte titulat 'ProjecteFinal_Ficcio_Titol'. Configura el tempo i les pistes necessàries.",
            "**Fase 3: Gravació de les veus.** Grava cadascun dels personatges en pistes separades per poder ajustar el volum i els efectes de cadascun de manera independent (per exemple, aplicar un filtre telefònic a un personatge que parla per mòbil, o reverberació si està en un soterrani).",
            "Treballa la interpretació: la por, la sorpresa o l'alegria han de transmetre's a través de la respiració, el to i el ritme de la parla.",
            "**Fase 4: Disseny d'efectes sonors (Foley).** Afegeix un mínim de 8 efectes sonors sincronitzats amb les accions dels personatges. Recupera els sons que vas generar a AudioMass o utilitza la llibreria de BandLab.",
            "**Fase 5: Ambientació i Música.** Afegeix una pista d'ambient continu que situi l'acció en el lloc escollit i incorpora ràfegues musicals per marcar els canvis d'escena o intensificar les emocions del clímax.",
            "**Fase 6: Mescla general i Poliment.** Revisa l'equilibri de volums (la veu ha de regnar clarament sobre la música i els efectes mitjançant 'ducking'). Panoràmica estèreo (Pan) per col·locar els personatges en l'espai sonor.",
            "**Fase 7: Masterització i exportació.** Aplica un compressor o màster suau de BandLab ('Universal' o 'Clarity') per igualar la potència sonora general sense distorsionar.",
            "Descarrega la mescla final en format MP3 (alta qualitat) o WAV amb el nom 'ProjecteFinal_FiccioSonora_Grup_Cognoms.mp3'."
          ],

          reto: "REPTE CREATIU: Crea una ficció sonora tan visualment evocadora que qualsevol persona que l'escolti amb els ulls tancats pugui imaginar la pel·lícula sencera a la seva ment com si estigués davant de la pantalla del cinema. La història ha d'incloure obligatòriament un gir de guió inesperat als últims 30 segons!",

          entrega: "Puja a Google Classroom: 1) El fitxer final d'àudio en format MP3 o WAV ('ProjecteFinal_FiccioSonora_Grup_Cognoms.mp3'), i 2) El document de guió tècnic complet en format PDF (amb el repartiment, la descripció dels personatges i la taula de dos columnes so/diàleg).",

          rubrica: [
            {
              criteri: "Qualitat del guió tècnic i estructura dramàtica",
              descripcio: "Guió complet a dues columnes amb plantejament, nus, desenllaç coherent i gir argumental original.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No es lliura el guió tècnic o la història és inconnexa i sense estructura dramàtica." },
                { nom: "En procés", punts: 1.5, detall: "Hi ha guió però manca detall tècnic o la narració té mancances de continuïtat." },
                { nom: "Assolit", punts: 2.0, detall: "Guió tècnic complet, història ben pautada de 2-3 minuts i resolució narrativa clara." },
                { nom: "Excel·lent", punts: 2.5, detall: "Guió d'alt nivell literari i tècnic, gran ritme dramàtic i un gir final enginyós i impactant." }
              ]
            },
            {
              criteri: "Gravació, interpretació i tractament de les veus",
              descripcio: "Dicció neta, vocalització, expressivitat emocional i tractament d'efectes segons la situació.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Les veus no s'entenen, hi ha soroll de fons excessiu o es llegeix de forma inexpressiva." },
                { nom: "En procés", punts: 1.5, detall: "Les veus són audibles però manca expressivitat o no hi ha diferenciació de personatges." },
                { nom: "Assolit", punts: 2.0, detall: "Bona vocalització, interpretació creïble dels personatges i pistes separades ordenades." },
                { nom: "Excel·lent", punts: 2.5, detall: "Interpretació vocal magnífica, gran càrrega dramàtica i ús brillant d'efectes a la veu." }
              ]
            },
            {
              criteri: "Riquesa del disseny sonor (Foley, Ambients i Música)",
              descripcio: "Integració d'un mínim de 8 efectes foley, ambients continus i música sincronitzada.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Molt pocs efectes (<4), absència d'ambient o música que desentona completament." },
                { nom: "En procés", punts: 1.5, detall: "Hi ha alguns efectes (4-7) i música, però l'ambient és incomplet o poc coordinat." },
                { nom: "Assolit", punts: 2.0, detall: "Mínim de 8 efectes, ambients fluids i música ben integrada que acompanya la narració." },
                { nom: "Excel·lent", punts: 2.5, detall: "Univers sonor riquíssim (>8 efectes), sincronia perfecta, ambient immersiu i música de cinema." }
              ]
            },
            {
              criteri: "Mescla multipista, masterització i acabat tècnic",
              descripcio: "Equilibri general de volums (Ducking), espacialitat estèreo, neteja acústica i potència de màster.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "La mescla distorsiona o les veus queden inaudibles sota la música de fons." },
                { nom: "En procés", punts: 1.5, detall: "Bona intenció però hi ha descompensacions de volum entre escenes o manca de ducking." },
                { nom: "Assolit", punts: 2.0, detall: "Mescla neta i equilibrada, veus clares en tot moment i volum general homogeni." },
                { nom: "Excel·lent", punts: 2.5, detall: "Producció de nivell podcast professional, espacialitat estèreo exquisida i masterització impecable." }
              ]
            }
          ]
        }
      ]
    },

    // ========================================================================
    // BLOCS TEMÀTICS COMPLEMENTARIS (PRÒXIMAMENT)
    // ========================================================================
    {
      id: "photopea",
      titol: "Imatge amb Photopea",
      icona: "🎨",
      subtitol: "Edició gràfica avançada per capes, màscares, acoloriment i retoc fotogràfic",
      estat: "actiu",
      color: "#00b894",
      duradaAproximada: "5 setmanes · 15 hores lectives",
      einesPrincipals: [
        { nom: "Photopea", url: "https://www.photopea.com/", tipus: "Editor fotogràfic avançat tipus Photoshop al navegador" }
      ],
      introduccio: "Descobreix el món de l'edició digital i el retoc professional sense instal·lar cap programa. Treballaràs amb capes independents, seleccions, pinzells, acoloriment digital d'il·lustracions mantenint el traç original i eliminació d'imperfeccions o elements no desitjats amb el Tampó de clonar.",
      
      fases: [
        {
          numFase: 1,
          nom: "Fase 1: Capes, acoloriment i retoc fotogràfic",
          eina: "Photopea",
          einaUrl: "https://www.photopea.com/",
          objectiu: "Dominar el treball no destructiu amb capes, l'aplicació del color digital respectant les línies originals, la neteja d'objectes amb llaç i tampó de clonar, i el retoc facial de retrats amb l'eina pegat i correctors.",
          practiques: ["photopea_p5", "photopea_p6", "photopea_p7"]
        }
      ],

      practiques: [
        // ====================================================================
        // PRÀCTICA 5 - PHOTOPEA
        // ====================================================================
        {
          id: "photopea_p5",
          fase: "Fase 1: Capes, acoloriment i retoc fotogràfic",
          numFase: 1,
          faseNomCurt: "Fase 1",
          titol: "Pràctica 5: Acolorir il·lustració amb Photopea",
          subtitol: "Transformar una il·lustració en blanc i negre a color mitjançant capes independents i pinzell, mantenint intacte el traç negre original.",
          herramienta: "Photopea",
          herramientaUrl: "https://www.photopea.com/",
          videoUrl: "", // Espai reservat per a vídeo YouTube
          queAprendremos: "En aquesta pràctica aprendràs a treballar de manera professional i no destructiva amb capes a Photopea. Utilitzaràs l'eina Pinzell (B) per aplicar una paleta de colors harmònica a diferents zones d'un dibuix, modificaràs l'opacitat de les capes, mantindràs les línies negres originals per sobre del color i desaràs tant el projecte editable (.PSD) com la imatge final exportada (.JPG).",
          
          recursosMostra: [
            {
              id: "res_pixabay",
              nom: "Pixabay · Il·lustracions en blanc i negre",
              etiqueta: "Banc d'imatges lliures",
              tipusBadge: "recomanat",
              url: "https://pixabay.com/illustrations/search/coloring%20page/",
              descripcio: "Milers de dibuixos de línies netes i zones blanques amb llicència gratuïta per a ús educatiu i comercial."
            },
            {
              id: "res_openclipart",
              nom: "Openclipart · Dibuixos de domini públic",
              etiqueta: "Domini públic (CC0)",
              tipusBadge: "opcio",
              url: "https://openclipart.org/",
              descripcio: "Il·lustracions i cliparts vectorials completament lliures de drets, ideals per descarregar i pintar directament."
            },
            {
              id: "res_rawpixel",
              nom: "Rawpixel · Dissenys i línies d'alta qualitat",
              etiqueta: "Llicència oberta",
              tipusBadge: "opcio",
              url: "https://www.rawpixel.com/",
              descripcio: "Imatges i dibuixos artístics vintage i contemporanis amb excel·lent definició de contorns per acolorir."
            }
          ],

          exemplesComparativa: [
            {
              id: "p5_ex1",
              titol: "Exemple 1: Flor Botànica",
              descripcio: "Il·lustració botànica acolorada per capes independents (Pètals, Centre, Tija i Fons) conservant el contorn de línies negres originals.",
              tecnica: "Capes de color a sota, pinzell suau, línies negres protegides a dalt.",
              imatgeOrigen: "recursos/imatges/p5_flor_origen.svg",
              imatgeFinal: "recursos/imatges/p5_flor_final.svg",
              nomFitxerOrigen: "05_dibuix_flor_origen.svg"
            },
            {
              id: "p5_ex2",
              titol: "Exemple 2: Mascota / Personatge Còmic",
              descripcio: "Dibuix de personatge amb pelatge càlid, morro blanc, ulls brillants i cascavell daurat.",
              tecnica: "Capes per a cada element cromàtic i mode de fusió Multiplicar.",
              imatgeOrigen: "recursos/imatges/p5_gat_origen.svg",
              imatgeFinal: "recursos/imatges/p5_gat_final.svg",
              nomFitxerOrigen: "05_dibuix_gat_origen.svg"
            },
            {
              id: "p5_ex3",
              titol: "Exemple 3: Paisatge i Arquitectura",
              descripcio: "Composició de muntanya amb degradat de cel, cims nevats, cabana de fusta i pins alpins.",
              tecnica: "Degradat suau de fons combinat amb pinzell pla per a detalls.",
              imatgeOrigen: "recursos/imatges/p5_paisatge_origen.svg",
              imatgeFinal: "recursos/imatges/p5_paisatge_final.svg",
              nomFitxerOrigen: "05_dibuix_paisatge_origen.svg"
            }
          ],

          pasos: [
            "Cerca i descarrega una il·lustració en blanc i negre que tingui contorns negres clars i zones interiors blanques a Pixabay, Openclipart o Rawpixel. Desa-la al teu dispositiu dins de la carpeta '05_Ilustracion'. Comprova que la llicència en permeti la modificació.",
            "Accedeix a Photopea des del teu navegador fent clic al botó superior 'Obrir Photopea'.",
            "Obre la imatge anant al menú superior: 'Fitxer' ➔ 'Obre' (o arrossega directament el dibuix a la finestra de Photopea). Comprova que es visualitza correctament.",
            "Obre el panell Capes situat a la part lateral dreta. Selecciona la capa del dibuix i fes-ne una còpia duplicada prement la drecera Ctrl + J.",
            "Fes doble clic sobre el nom de les capes per rebatejar-les: anomena la capa superior 'Línies negres' i la inferior 'Original'. Aquesta organització protegeix el dibuix original davant de qualsevol errada.",
            "Crea una capa nova buida anant a 'Capa' ➔ 'Nova' ➔ 'Capa'. Posa-li el nom 'Colors'.",
            "Fes clic i arrossega la capa 'Colors' per situar-la exactament per sota de la capa 'Línies negres' (o bé configura el mode de fusió de la capa de línies en 'Multiplicar'). Les línies negres han de quedar sempre a dalt per no ser tapades.",
            "Selecciona la capa 'Colors' i activa l'eina Pinzell prement la lletra B (o fent clic a la seva icona a la barra lateral d'eines).",
            "A la barra de propietats superior, tria una mida de pinzell adequada i una duresa mitjana-alta per controlar bé el traç.",
            "Fes clic sobre el selector de color frontal i tria el primer to que vulguis aplicar. Fes servir l'eina Zoom (tecla Z) per apropar-te a la zona del dibuix que pintaràs.",
            "Pinta la primera zona (ex: pètals d'una flor, roba o fulles). Intenta no sortir dels contorns. Si comets una errada, prem Ctrl + Z per desfer l'última pinzellada.",
            "Canvia el color frontal fent clic al selector i pinta una altra zona de la il·lustració. Repeteix aquest procés amb diferents colors fins a pintar el dibuix sencer.",
            "Consell d'organització avançada: crea capes de color addicionals per a diferents parts del dibuix (ex: 'Color 1 - Pètals', 'Color 2 - Fulles', 'Color 3 - Fons'). Així podràs ajustar o esborrar un color sense afectar la resta.",
            "Revisa els contorns amb l'eina Zoom: si has pintat fora dels límits, selecciona la capa corresponent i neteja els sobrants amb l'eina Goma d'esborrar (tecla E).",
            "Ajusta l'opacitat de les capes de color al panell de capes si desitges un to més suau o translúcid, i commuta la icona de l'ull de les capes per comparar el dibuix original amb el pintat.",
            "Desa el projecte editable mestre anant a 'Fitxer' ➔ 'Desa com a PSD' amb el nom '05_ilustracion_editable.psd' per conservar totes les capes.",
            "Exporta la imatge final anant a 'Fitxer' ➔ 'Exporta com a' ➔ 'JPG', tria qualitat màxima (100%) i desa el fitxer amb el nom '05_ilustracion_final.jpg'."
          ],

          reto: "Afegeix volum i ombres a la teva il·lustració: redueix l'opacitat del pinzell al 30-40% i pinta amb un to lleugerament més fosc a les vores dels elements per crear sensació de profunditat, o crea una capa inferior 'Fons' amb un degradat suau de color.",

          entrega: "Lliura a la tasca corresponent de Google Classroom els 4 arxius següents:<br>• <strong>05_ilustracion_original.jpg</strong> (Dibuix original en blanc i negre descarregat)<br>• <strong>05_ilustracion_final.jpg</strong> (Dibuix completament pintat a color)<br>• <strong>05_ilustracion_editable.psd</strong> (Projecte amb totes les capes independents)<br>• <strong>05_font_imatge.txt</strong> (Document de text breu indicant l'enllaç d'on has tret el dibuix i el tipus de llicència lliure).",

          rubrica: [
            {
              criteri: "Estructura i gestió de capes no destructives",
              descripcio: "Duplica la capa original, crea capes de color separades i manté les línies negres a la capa superior.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Pinta directament sobre la capa de fons original sense crear capes noves." },
                { nom: "En procés", punts: 1.5, detall: "Crea capes però l'ordre és incorrecte i el color tapa les línies del dibuix original." },
                { nom: "Assolit", punts: 2.0, detall: "Duplica la capa original, organitza el color a sota de les línies i manté el dibuix net." },
                { nom: "Excel·lent", punts: 2.5, detall: "Estructura exemplar amb capes anomenades per elements/colors, duplicats de seguretat i control d'opacitat." }
              ]
            },
            {
              criteri: "Precisió en l'ús del pinzell, color i neteja de contorns",
              descripcio: "Aplica varietat de colors adequats, utilitza el pinzell amb pols i corregeix els desbordaments amb la goma.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Pintat descuidat, zones sense pintar, sobrepassa contorns àmpliament sense corregir." },
                { nom: "En procés", punts: 1.5, detall: "Aplica color a les zones principals però hi ha taques evidents fora de línia o poca varietat cromàtica." },
                { nom: "Assolit", punts: 2.0, detall: "Pintat acurat, varietat de tons harmònics i neteja correcta dels contorns amb l'eina goma." },
                { nom: "Excel·lent", punts: 2.5, detall: "Precisió mil·limètrica en contorns, harmonia cromàtica excel·lent i acabat polit sense cap taca." }
              ]
            },
            {
              criteri: "Conservació de les línies originals i acabat estètic",
              descripcio: "Les línies negres de la il·lustració romanen nítides, definides i contrastades per sobre del color.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Les línies negres han quedat esborrades o tapades totalment pel color." },
                { nom: "En procés", punts: 1.5, detall: "Les línies són visibles però estan parcialment difuminades o tacades de pintura." },
                { nom: "Assolit", punts: 2.0, detall: "Totes les línies negres originals es mantenen intactes i visibles sobre els colors aplicats." },
                { nom: "Excel·lent", punts: 2.5, detall: "Traç negre impecable i contrastat amb gran fidelitat al dibuix base, integrant volum i estètica professional." }
              ]
            },
            {
              criteri: "Gestió d'arxius (PSD i JPG), drets d'ús i lliurament",
              descripcio: "Desa en format editable PSD i exporta en JPG, cita la font de la imatge i respecta els noms establerts.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No lliura el fitxer PSD o els formats no s'obren o no corresponen a la pràctica." },
                { nom: "En procés", punts: 1.5, detall: "Lliura el JPG final però oblida el fitxer editable PSD amb capes o no cita la font de la imatge." },
                { nom: "Assolit", punts: 2.0, detall: "Lliura els 4 arxius demanats (original, JPG final, PSD amb capes i fitxer font) seguint la nomenclatura." },
                { nom: "Excel·lent", punts: 2.5, detall: "Lliurament complet i impecable dels 4 fitxers amb noms exactes, capes editables perfectes i llicència ben acreditada." }
              ]
            }
          ]
        },

        // ====================================================================
        // PRÀCTICA 6 - PHOTOPEA (Dividida en 6.1 Llaç i 6.2 Tampó de clonar)
        // ====================================================================
        {
          id: "photopea_p6",
          fase: "Fase 1: Capes, acoloriment i retoc fotogràfic",
          numFase: 1,
          faseNomCurt: "Fase 1",
          titol: "Pràctica 6: Eliminar objectes i retoc fotogràfic (Llaç i Tampó de clonar)",
          subtitol: "Dues tècniques professionals per fer desaparèixer elements no desitjats o reparar defectes: 6.1 Eina Llaç + Omplir segons el contingut (intel·ligent) i 6.2 Eina Tampó de clonar (manual de precisió).",
          herramienta: "Photopea",
          herramientaUrl: "https://www.photopea.com/",
          videoUrl: "", // General buit, gestionat per cadascun dels dos apartats
          queAprendremos: "En aquesta pràctica aprendràs a comparar i aplicar els dos mètodes essencials de retoc fotogràfic per eliminar elements o persones d'una imatge. A l'Apartat 6.1 utilitzaràs la selecció amb Llaç i la funció 'Omplir segons el contingut' per a una reconstrucció automàtica ràpida. A l'Apartat 6.2 dominaràs el Tampó de clonar (tecla S) amb mostreig manual Alt+Clic per controlar textures complexes i vores en perspectiva.",
          
          recursosMostra: [
            {
              id: "res_opcio_platja",
              nom: "Opció 1 (Molt recomanada): Objecte a la platja",
              etiqueta: "Nivell inicial recomanat",
              tipusBadge: "recomanat",
              url: "https://pixabay.com/photos/search/beach%20sand/",
              descripcio: "Eliminar una petxina, pedra, paperera o bossa damunt la sorra. La textura uniforme de la sorra és ideal per aprendre a clonar fàcilment."
            },
            {
              id: "res_opcio_jardi",
              nom: "Opció 2: Objecte en un jardí o parc",
              etiqueta: "Nivell mitjà",
              tipusBadge: "opcio",
              url: "https://pixabay.com/photos/search/park%20grass/",
              descripcio: "Eliminar una paperera, joguina, pilota o element sobre la gespa d'un parc reconstruint el verd natural."
            },
            {
              id: "res_opcio_carrer",
              nom: "Opció 3: Cotxe o obstacle al carrer",
              etiqueta: "Nivell mitjà-alt",
              tipusBadge: "opcio",
              url: "https://pixabay.com/photos/search/street%20car/",
              descripcio: "Eliminar un vehicle aparcat o un senyal de trànsit. Requereix reconstruir línies rectes de voreres, finestres o asfalt."
            },
            {
              id: "res_opcio_taula",
              nom: "Opció 4: Objectes sobre una taula",
              etiqueta: "Nivell mitjà",
              tipusBadge: "opcio",
              url: "https://pixabay.com/photos/search/table%20still%20life/",
              descripcio: "Eliminar una tassa, llibreta, clauers o bolígraf sobre una superfície de fusta, marbre o tela."
            }
          ],

          exemplesComparativa: [
            {
              id: "p6_ex1",
              titol: "Exemple 1: Platja i Sorra (Opció recomanada)",
              descripcio: "Eliminació d'una paperera i residus damunt la sorra de la platja, reconstruint les ondulacions naturals del terreny.",
              tecnica: "Tampó de clonar amb duresa 25% i mostreig continu amb Alt+Clic des de diferents altures de la sorra.",
              imatgeOrigen: "recursos/imatges/p6_platja_origen.svg",
              imatgeFinal: "recursos/imatges/p6_platja_final.svg",
              nomFitxerOrigen: "06_platja_origen.svg"
            },
            {
              id: "p6_ex2",
              titol: "Exemple 2: Prat i Jardí",
              descripcio: "Eliminació d'un con de trànsit de color taronja cridaner situat al mig d'un parc de gespa.",
              tecnica: "Mostreig de textures de gespa properes en múltiples direccions per evitar patrons mecànics.",
              imatgeOrigen: "recursos/imatges/p6_gespa_origen.svg",
              imatgeFinal: "recursos/imatges/p6_gespa_final.svg",
              nomFitxerOrigen: "06_gespa_origen.svg"
            },
            {
              id: "p6_ex3",
              titol: "Exemple 3: Carrer Urbà i Paviment",
              descripcio: "Eliminació d'una pilona metàl·lica sobre un paviment històric de llambordes en perspectiva.",
              tecnica: "Reconstrucció acurada de les línies de fuga i la continuïtat de les pedres contigües.",
              imatgeOrigen: "recursos/imatges/p6_carrer_origen.svg",
              imatgeFinal: "recursos/imatges/p6_carrer_final.svg",
              nomFitxerOrigen: "06_carrer_origen.svg"
            }
          ],

          // Estructura dividida en dos apartats pedagògics
          apartats: [
            {
              id: "6.1",
              numApartat: "6.1",
              nom: "Apartat 6.1: Eina Llaç + Omplir segons el contingut",
              subtitol: "Mètode automàtic i ràpid per reconstrucció intel·ligent a partir dels píxels de l'entorn.",
              icona: "🪢",
              badge: "Mètode intel·ligent automàtic",
              badgeClass: "badge-metode-ia",
              drecera: "Llaç (L) ➔ Edita ➔ Omplir (Maj+F5) ➔ Segons el contingut",
              videoUrl: "https://youtu.be/vwAoRBxx6wA?si=-vLdz9229WqjRGAi",
              descripcio: "Aquest mètode és el més ràpid quan el fons és homogeni (aigua, cel, sorra, gespa, asfalt). L'algorisme de Photopea analitza la vora exterior de la teva selecció i emplena el buit recreant la textura circumdant.",
              pasos: [
                "Descarrega una fotografia amb un fons net i un element clar per eliminar (pots fer servir els models de platja o parc) i obre-la a Photopea anant a 'Fitxer' ➔ 'Obre'.",
                "Al panell Capes, duplica la capa de fons prement Ctrl + J. Canvia el nom de la nova capa a '6.1_Retoc_Llac'. Treballaràs sempre sobre aquesta capa per protegir la foto original.",
                "Selecciona l'eina Llaç (Lasso) a la barra d'eines lateral (o prem la lletra L).",
                "Dibuixa amb el ratolí una selecció tancada al voltant de l'objecte que vols eliminar. Consell clau: deixa un petit marge de seguretat (uns 10-15 píxels) de fons al voltant de l'objecte perquè l'algorisme pugui mostrejar la textura circumdant.",
                "Ves al menú superior: 'Edita' ➔ 'Omplir' (o prem la drecera de teclat Maj + F5 / Shift + F5).",
                "A la finestra emergent, desplega el selector 'Omple' i tria l'opció 'Segons el contingut' (Content-Aware). Deixa el Mode en 'Normal' i l'Opacitat al 100%.",
                "Fes clic a 'D'acord' (OK). Espera un segon mentre Photopea analitza la imatge i reconstrueix automàticament la zona seleccionada.",
                "Deselecciona la zona prement la combinació Ctrl + D (o al menú 'Selecciona' ➔ 'Deselecciona').",
                "Observa el resultat: si queda algun petit defecte o rastre a la vora, pots tornar a fer una selecció petita amb el llaç i repetir l'omplenat.",
                "Desa el treball d'aquest apartat: ves a 'Fitxer' ➔ 'Desa com a PSD' com a '06_1_llac_editable.psd' i exporta en JPG com a '06_1_llac_final.jpg'."
              ]
            },
            {
              id: "6.2",
              numApartat: "6.2",
              nom: "Apartat 6.2: Eina Tampó de clonar",
              subtitol: "Mètode manual i artesanal de màxima precisió per a fons complexos, línies i textures orientades.",
              icona: "🧽",
              badge: "Mètode manual de precisió",
              badgeClass: "badge-metode-manual",
              drecera: "Tampó de clonar (S) ➔ Alt + Clic per mostrejar textura",
              videoUrl: "https://youtu.be/yn500tHxAPU?si=4Z_zHMG40BJsUCjh",
              descripcio: "Aquest mètode és imprescindible quan cal controlar exactament d'on s'extreu la textura (per exemple seguint la direcció de les llambordes d'un carrer, branques d'arbres o ombres complexes). Ets tu qui decideix quin punt es copia.",
              pasos: [
                "Obre una segona fotografia a Photopea (o utilitza la mateixa imatge per comparar l'acabat d'ambdós mètodes).",
                "Duplica la capa de fons prement Ctrl + J i canvia el nom de la nova capa a '6.2_Retoc_Tampon'.",
                "Selecciona l'eina Tampó de clonar (Clone Stamp) a la barra d'eines lateral (o prem la drecera S).",
                "A la barra de propietats superior, tria una mida de pinzell adequada i defineix una duresa baixa o mitjana (entre 15% i 30%) per difuminar les vores.",
                "Mostreja la textura de referència (pas clau): mantén premuda la tecla Alt, fes un sol clic esquerre sobre una zona neta i similar de la imatge, i deixa anar la tecla Alt.",
                "Pinta amb clics curts sobre l'objecte que vols esborrar. Observa com es va cobrint amb la textura clonada.",
                "Regla d'or: canvia constantment de punt de mostra prement Alt + Clic des de diferents direccions perquè el fons sembli completament natural i no es repeteixin taques evidents.",
                "Fes servir el Zoom (Z) per acostar-te a les vores i redueix la mida del pinzell per afinar els detalls més difícils.",
                "Comprova l'acabat commutant la icona de l'ull de la capa '6.2_Retoc_Tampon' per verificar que l'objecte ha desaparegut sense deixar marques artificials.",
                "Desa el treball d'aquest segon apartat: 'Fitxer' ➔ 'Desa com a PSD' com a '06_2_tampon_editable.psd' i exporta en JPG com a '06_2_tampon_final.jpg'."
              ]
            }
          ],

          // Passos complets unificats per a compatibilitat amb comptadors i barres de progrés
          pasos: [
            // Apartat 6.1: Passos 1 a 10
            "[6.1 Llaç] Obre la primera fotografia a Photopea des de 'Fitxer' ➔ 'Obre'.",
            "[6.1 Llaç] Duplica la capa amb Ctrl + J i anomena la nova capa '6.1_Retoc_Llac'.",
            "[6.1 Llaç] Selecciona l'eina Llaç (drecera L) a la barra d'eines.",
            "[6.1 Llaç] Dibuixa una selecció al voltant de l'objecte deixant uns 10-15 píxels de marge de seguretat.",
            "[6.1 Llaç] Ves al menú 'Edita' ➔ 'Omplir' (o prem Maj + F5 / Shift + F5).",
            "[6.1 Llaç] A la finestra emergent, tria 'Segons el contingut' (Content-Aware) amb Mode Normal i Opacitat 100%.",
            "[6.1 Llaç] Fes clic a 'D'acord' (OK) i comprova com Photopea reconstrueix la textura automàticament.",
            "[6.1 Llaç] Deselecciona la zona prement la combinació Ctrl + D.",
            "[6.1 Llaç] Revisa el contorn i poleix amb una petita selecció addicional si queda cap detall.",
            "[6.1 Llaç] Exporta '06_1_llac_final.jpg' i desa el projecte mestre '06_1_llac_editable.psd'.",

            // Apartat 6.2: Passos 11 a 20
            "[6.2 Tampó] Obre la segona fotografia a Photopea des de 'Fitxer' ➔ 'Obre'.",
            "[6.2 Tampó] Duplica la capa amb Ctrl + J i canvia el nom de la nova capa a '6.2_Retoc_Tampon'.",
            "[6.2 Tampó] Selecciona l'eina Tampó de clonar a la barra d'eines (drecera S).",
            "[6.2 Tampó] Ajusta la mida del pinzell i tria una duresa baixa/mitjana (15-30%) per a vores suaus.",
            "[6.2 Tampó] Mantén premuda la tecla Alt, fes clic esquerre sobre una zona neta i deixa anar Alt per mostrejar.",
            "[6.2 Tampó] Pinta suaument sobre l'objecte amb clics curts per substituir-lo per la textura clonada.",
            "[6.2 Tampó] Canvia de mostra sovint amb Alt + Clic des de diferents punts per no generar patrons repetitius.",
            "[6.2 Tampó] Fes servir el Zoom (Z) i redueix el pinzell per treballar els límits amb màxima precisió.",
            "[6.2 Tampó] Commuta la visibilitat de la capa per comparar l'abans i el després.",
            "[6.2 Tampó] Exporta '06_2_tampon_final.jpg' i desa el projecte mestre '06_2_tampon_editable.psd'."
          ],

          reto: "Repte comparatiu crític: posa a prova ambdós mètodes sobre la mateixa imatge que tingui un fons més complex (per exemple, el carrer de llambordes de l'Exemple 3 o una foto pròpia). Comprova quin dels dos sistemes resol millor la textura i escriu una petita conclusió al comentari de Classroom justificant per què en alguns casos l'eina automàtica falla i cal el tampó manual.",

          entrega: "Lliura a la tasca de Google Classroom un total de 6 fitxers (3 per a cadascun dels dos apartats):<br>• <strong>Apartat 6.1 (Llaç intel·ligent):</strong> 06_1_llac_original.jpg, 06_1_llac_final.jpg i 06_1_llac_editable.psd<br>• <strong>Apartat 6.2 (Tampó de clonar manual):</strong> 06_2_tampon_original.jpg, 06_2_tampon_final.jpg i 06_2_tampon_editable.psd<br>• <em>Comentari opcional:</em> Breu reflexió de 2 línies explicant quin dels dos mètodes t'ha semblat més ràpid i quin més precís.",

          rubrica: [
            {
              criteri: "Apartat 6.1: Domini de la selecció amb Llaç i 'Omplir segons el contingut'",
              descripcio: "Utilitza l'eina Llaç amb marge adequat, aplica la funció d'omplenat intel·ligent i deselecciona correctament.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No sap fer anar l'eina Llaç o no troba la funció d'omplir segons el contingut a Photopea." },
                { nom: "En procés", punts: 1.5, detall: "Fa la selecció però sense marge de seguretat o el resultat genera deformacions i taques evidents." },
                { nom: "Assolit", punts: 2.0, detall: "Selecciona l'objecte amb marge correcte, aplica l'omplenat intel·ligent amb èxit i deselecciona amb Ctrl+D." },
                { nom: "Excel·lent", punts: 2.5, detall: "Selecció neta i precisa, domini de dreceres (L, Maj+F5, Ctrl+D) i integració automàtica perfecta." }
              ]
            },
            {
              criteri: "Apartat 6.2: Domini del Tampó de clonar i precisió de mostreig Alt+Clic",
              descripcio: "Mostreja textures representatives amb Alt+Clic, canvia de punt de mostra i regula la duresa del pinzell.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No comprèn el mostreig amb la tecla Alt o utilitza eines d'esborrat/pintat inadequades." },
                { nom: "En procés", punts: 1.5, detall: "Aplica el tampó però fa servir un sol punt fix de mostra, generant repeticions evidents o vores dures." },
                { nom: "Assolit", punts: 2.0, detall: "Mostreja textures representatives amb Alt+Clic, varia els punts d'origen i regula la duresa del pinzell." },
                { nom: "Excel·lent", punts: 2.5, detall: "Mostreig dinàmic i precís des de múltiples angles, vora suau i reconstrucció invisible de la textura." }
              ]
            },
            {
              criteri: "Flux de treball no destructiu per capes i naturalitat del retoc",
              descripcio: "Treballa sobre capes duplicades protegint els originals i assoleix un acabat homogeni en ambdós mètodes.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Modifica directament la capa de fons original sense crear capes duplicades de seguretat." },
                { nom: "En procés", punts: 1.5, detall: "Duplica capes només en un dels dos apartats o es noten talls bruscos en el resultat final." },
                { nom: "Assolit", punts: 2.0, detall: "Treballa de forma no destructiva sobre capes duplicades ben anomenades en tots dos apartats." },
                { nom: "Excel·lent", punts: 2.5, detall: "Flux no destructiu exemplar a les dues tècniques, amb acabat fotogràfic invisible a simple vista." }
              ]
            },
            {
              criteri: "Gestió d'arxius (PSD + JPG), lliurament doble i criteri comparatiu",
              descripcio: "Lliura els 6 fitxers (originals, finals JPG i editables PSD) amb la nomenclatura establerta i analitza els mètodes.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No lliura els projectes editables PSD o els fitxers no es poden obrir o estan incomplets." },
                { nom: "En procés", punts: 1.5, detall: "Lliura només els fitxers d'un dels dos apartats o oblida la meitat dels arxius requerits." },
                { nom: "Assolit", punts: 2.0, detall: "Lliura correctament els 6 fitxers demanats (originals, finals JPG i PSDs amb capes) ben anomenats." },
                { nom: "Excel·lent", punts: 2.5, detall: "Lliurament impecable i organitzat dels 6 fitxers, amb reflexió sobre els avantatges de cada tècnica." }
              ]
            }
          ]
        },

        // ====================================================================
        // PRÀCTICA 7 - PHOTOPEA: RETOC DE RETRATS I CORRECCIÓ D'IMPERFECCIONS
        // ====================================================================
        {
          id: "photopea_p7",
          fase: "Fase 1: Capes, acoloriment i retoc fotogràfic",
          numFase: 1,
          faseNomCurt: "Fase 1",
          titol: "Pràctica 7: Retoc de retrats i correcció d'imperfeccions",
          subtitol: "Neteja facial no destructiva a Photopea: eliminació de taques i pigues, atenuació d'ulleres i domini de l'eina Pegat (Patch Tool) i Pinzell corrector.",
          herramienta: "Photopea",
          herramientaUrl: "https://www.photopea.com/",
          videoUrl: "", // Espai reservat per al vídeo tutorial de retoc de retrats
          queAprendremos: "En aquesta pràctica aprendràs a realitzar retoc cosmètic i fotogràfic professional de retrats sense perdre la textura natural de la pell (evitant l'efecte 'porcellana' o borrós artificial). Aprendràs a dominar l'eina Pegat (Patch Tool - tecla J) per substituir zones d'ulleres o marques amples per textures de pell neta, utilitzaràs el Pinzell corrector puntual (Spot Healing Brush) per netejar taquetes i grans a l'instant, treballaràs amb capes de seguretat regulant l'opacitat per a un resultat realista i exportaràs tant el projecte mestre (.PSD) com la imatge final (.JPG).",
          
          recursosMostra: [
            {
              id: "res_pixabay_portrait",
              nom: "Pixabay · Retrats en primer pla lliures",
              etiqueta: "Banc de retrats gratuïts",
              tipusBadge: "recomanat",
              url: "https://pixabay.com/photos/search/portrait%20face/",
              descripcio: "Fotografies de persones en alta resolució, ideals per practicar el retoc facial no destructiu."
            },
            {
              id: "res_unsplash_portrait",
              nom: "Unsplash · Retrats fotogràfics d'estudi",
              etiqueta: "Llicència lliure",
              tipusBadge: "opcio",
              url: "https://unsplash.com/s/photos/portrait",
              descripcio: "Retrats amb il·luminació natural o d'estudi per treballar la correcció d'ulleres i textures de pell."
            },
            {
              id: "res_pexels_portrait",
              nom: "Pexels · Primers plans facials",
              etiqueta: "Domini gratuït",
              tipusBadge: "opcio",
              url: "https://www.pexels.com/search/portrait/",
              descripcio: "Plans detallats de rostres amb varietat de tons de pell per posar a prova l'eina pegat i correctors."
            }
          ],

          exemplesComparativa: [
            {
              id: "p7_ex1",
              titol: "Exemple 1: Correcció de pigues, taquetes i grans",
              descripcio: "Neteja d'imperfeccions puntuals a les galtes i front conservant la il·luminació dels pòmuls i el relleu dels porus.",
              tecnica: "Pinzell corrector puntual (J) amb clics simples i mida de pinzell ajustada a cada taca.",
              imatgeOrigen: "recursos/imatges/p7_pell_origen.svg",
              imatgeFinal: "recursos/imatges/p7_pell_final.svg",
              nomFitxerOrigen: "07_rostre_taquetes_origen.svg"
            },
            {
              id: "p7_ex2",
              titol: "Exemple 2: Atenuació d'ulleres i bosses sota els ulls",
              descripcio: "Suavitzat d'ulleres marcades sota les parpelles per aportar descans i llum a la mirada sense perdre l'expressivitat anatòmica.",
              tecnica: "Eina Pegat (Patch Tool) arrossegant cap a pell neta, i reducció de l'opacitat de capa al 70%.",
              imatgeOrigen: "recursos/imatges/p7_ulleres_origen.svg",
              imatgeFinal: "recursos/imatges/p7_ulleres_final.svg",
              nomFitxerOrigen: "07_ulleres_origen.svg"
            },
            {
              id: "p7_ex3",
              titol: "Exemple 3: Retrat d'estudi complet",
              descripcio: "Retoc cosmètic equilibrat: eliminació de línies d'expressió al front, unificació de to a la barbeta i mirada nítida.",
              tecnica: "Combinació de Pegat + Corrector puntual + capa de retoc no destructiva independent.",
              imatgeOrigen: "recursos/imatges/p7_retrat_origen.svg",
              imatgeFinal: "recursos/imatges/p7_retrat_final.svg",
              nomFitxerOrigen: "07_retrat_complet_origen.svg"
            }
          ],

          pasos: [
            "Cerca i descarrega una fotografia de retrat en primer pla amb bona resolució (que presenti taquetes, grans o ulleres visibles) a Pixabay, Unsplash o Pexels, o descarrega un dels models d'exemple. Desa-la a la carpeta '07_Retoc_Retrat' com a '07_retrat_original.jpg'.",
            "Obre Photopea des del teu navegador fent clic al botó superior 'Obrir Photopea' i carrega la imatge des de 'Fitxer' ➔ 'Obre'.",
            "Obre el panell Capes situat a la dreta. Selecciona la imatge de fons i fes una còpia duplicada prement Ctrl + J.",
            "Canvia el nom de la nova capa a '01_Correccio_Imperfeccions'. Treballarem sempre en capes duplicades per no danyar la imatge original de base.",
            "Selecciona l'eina Pinzell corrector puntual (Spot Healing Brush - drecera de teclat J) a la barra d'eines lateral.",
            "A la barra de propietats superior, ajusta el diàmetre del pinzell perquè sigui només lleugerament superior a la mida de la imperfecció que vols treure.",
            "Fes un sol clic sobre cadascuna de les taquetes, pigues o grans puntuals. Observa com l'algorisme de Photopea pren textura de la pell circumdant i fon la taca de manera instantània.",
            "Per treballar les ulleres de forma professional: duplica una segona capa a partir de l'anterior amb Ctrl + J i anomena-la '02_Ulleres_Atenuades'.",
            "Fes clic secundari (o mantén premut) sobre la icona del corrector per seleccionar l'eina Pegat (Patch Tool - o prem Maj + J fins a activar-la).",
            "Utilitza el Pegat per dibuixar una selecció a mà alçada al voltant de l'ullera o bossa fosca de sota l'ull, deixant una forma arrodonida.",
            "Fes clic dins de l'àrea seleccionada i arrossega-la suaument cap a una zona de pell llisa, clara i ben il·luminada (per exemple, la part alta de la galta). En deixar anar el ratolí, comprova com es fon la nova textura.",
            "Deselecciona la zona prement Ctrl + D (o menú 'Selecciona' ➔ 'Deselecciona').",
            "El secret professional contra l'efecte porcellana: no volem esborrar l'ullera al 100% perquè el rostre semblaria fals i pla. Al panell Capes, redueix l'Opacitat de la capa '02_Ulleres_Atenuades' entre el 60% i el 75%. Així s'atenua el cansament conservant el volum anatòmic natural.",
            "Commuta la visibilitat de les capes de retoc fent clic a la icona de l'ull per comprovar l'abans i el després de la neteja facial.",
            "Ves a 'Fitxer' ➔ 'Desa com a PSD' i anomena el projecte mestre '07_retrat_editable.psd' per conservar intactes les dues capes i les opacitats.",
            "Ves a 'Fitxer' ➔ 'Exporta com a' ➔ 'JPG' amb màxima qualitat i desa el retrat final retocat com a '07_retrat_final.jpg'."
          ],

          reto: "Aplica una correcció d'il·luminació a la mirada: crea una capa d'ajustament de 'Corbes' o 'Brillantor/Contrast' (des de la part inferior del panell de capes) per donar un toc de llum suau als iris dels ulls, o posa a prova les eines de retoc facial sobre un segon retrat escollit per tu.",

          entrega: "Lliura a la tasca corresponent de Google Classroom els 4 fitxers següents:<br>• <strong>07_retrat_original.jpg</strong> (Fotografia original sense retocar)<br>• <strong>07_retrat_final.jpg</strong> (Retrat retocat acabat en JPG)<br>• <strong>07_retrat_editable.psd</strong> (Projecte mestre amb les capes independents de retoc i opacitats regulades)<br>• <strong>07_font_imatge.txt</strong> (Document breu indicant l'enllaç de la foto lliure i una reflexió de 2 línies sobre l'ús ètic i responsable del retoc d'imatges a les xarxes socials).",

          rubrica: [
            {
              criteri: "Domini de l'eina Pegat (Patch Tool) i Corrector puntual",
              descripcio: "Utilitza el corrector per a imperfeccions petites i el pegat per a àrees amples arrossegant cap a pell neta coherent.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No sap fer anar el pegat o el corrector i fa servir eines d'esborrat o pinzells plans que taquen la pell." },
                { nom: "En procés", punts: 1.5, detall: "Aplica el pegat però arrossega cap a zones amb llum o to inadequat, provocant taques i talls evidents." },
                { nom: "Assolit", punts: 2.0, detall: "Domina el Pinzell corrector puntual per a grans i l'eina Pegat per a ulleres seleccionant mostres representatives." },
                { nom: "Excel·lent", punts: 2.5, detall: "Precisió tècnica exemplar amb les eines de retoc facial (J), integrant la textura de pell sana de forma invisible." }
              ]
            },
            {
              criteri: "Naturalitat del retoc i preservació de la textura de la pell",
              descripcio: "Elimina defectes mantenint la textura orgànica dels porus i el volum anatòmic sense efecte plàstic.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Retoc molt agressiu que difumina la pell creant un efecte plàstic o de porcellana artificial." },
                { nom: "En procés", punts: 1.5, detall: "Les taquetes s'han esborrat però es noten zones borroses o pèrdua de textura en punts crítics." },
                { nom: "Assolit", punts: 2.0, detall: "Atenua les imperfeccions i ulleres conservant la textura de la pell i l'expressivitat natural del rostre." },
                { nom: "Excel·lent", punts: 2.5, detall: "Acabat fotogràfic d'estudi professional: rostre nítid, lluminós i 100% realista sense cap indici de manipulació." }
              ]
            },
            {
              criteri: "Flux de treball no destructiu per capes i control d'opacitat",
              descripcio: "Treballa en capes duplicades independents i ajusta l'opacitat per graduar la intensitat de la correcció.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "Pinta o retoca directament sobre la capa de fons original sense crear capes de seguretat." },
                { nom: "En procés", punts: 1.5, detall: "Duplica la capa però deixa l'opacitat al 100%, resultant en un esborrat massa dur de les ulleres." },
                { nom: "Assolit", punts: 2.0, detall: "Treballa en capes duplicades independents i redueix l'opacitat (60-75%) per a una atenuació creïble." },
                { nom: "Excel·lent", punts: 2.5, detall: "Organització de capes exemplar ('01_Imperfeccions', '02_Ulleres') amb control mil·limètric de l'opacitat i màscares." }
              ]
            },
            {
              criteri: "Gestió de fitxers (PSD + JPG), lliurament i reflexió ètica",
              descripcio: "Lliura els 4 fitxers amb els noms correctes i adjunta la reflexió sobre l'ús ètic del retoc digital.",
              nivells: [
                { nom: "No assolit", punts: 1.0, detall: "No lliura el fitxer PSD editable o els arxius estan incomplets o danyats." },
                { nom: "En procés", punts: 1.5, detall: "Lliura el JPG final però oblida el fitxer editable PSD amb capes o no redacta la reflexió ètica." },
                { nom: "Assolit", punts: 2.0, detall: "Lliura correctament els 4 arxius demanats amb la nomenclatura indicada i cita la font de la foto." },
                { nom: "Excel·lent", punts: 2.5, detall: "Lliurament complet i impecable dels 4 fitxers, acompanyat d'una reflexió crítica i madura sobre el retoc a les xarxes." }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "python",
      titol: "Programació amb Python",
      icona: "🐍",
      subtitol: "Pensament computacional, variables, condicionals, bucles i automatització",
      estat: "properament",
      color: "#0984e3",
      duradaAproximada: "8 setmanes · 24 hores lectives",
      einesPrincipals: [
        { nom: "Python 3", url: "https://www.python.org/", tipus: "Llenguatge de programació d'alt nivell" },
        { nom: "Google Colab", url: "https://colab.research.google.com/", tipus: "Quaderns interactius d'aprenentatge al núvol" }
      ],
      introduccio: "Aprèn a pensar com un desenvolupador de programari. Deixem enrere els blocs visuals per escriure codi real amb el llenguatge més utilitzat del món a la indústria tecnològica i la intel·ligència artificial: Python. Des dels primers càlculs fins a jocs interactius i aplicacions que resolen problemes reals.",
      practiquesPendents: [
        "Pràctica 1: Primeres passes amb Python i el quadern Colab",
        "Pràctica 2: Variables, tipus de dades i operacions bàsiques",
        "Pràctica 3: La presa de decisions: estructures condicionals (if, elif, else)",
        "Pràctica 4: Repetir tasques sense cansar-se: bucles (for i while)",
        "Pràctica 5: Organitzar dades: llistes, diccionaris i cadenes de text",
        "Pràctica 6: Funcions pròpies i modularitat del codi",
        "Pràctica 7: Mini-projecte: Creació d'un joc interactiu per terminal",
        "Pràctica 8: Projecte final: Automatització de fitxers i anàlisi de dades"
      ]
    },
    {
      id: "video",
      titol: "Edició de Vídeo Digital",
      icona: "🎬",
      subtitol: "Guió cinematogràfic, plans, muntatge en línia de temps, efectes i etalonatge",
      estat: "properament",
      color: "#e17055",
      duradaAproximada: "6 setmanes · 18 hores lectives",
      einesPrincipals: [
        { nom: "CapCut Online / Clipchamp", url: "https://www.capcut.com/", tipus: "Editors de vídeo contemporanis al núvol" }
      ],
      introduccio: "El llenguatge audiovisual és la forma dominant de consum i creació de continguts a l'era digital. Aprendràs a rodar pensant en el muntatge posterior, el significat dels diferents tipus de plans cinematogràfics, com tallar amb ritme sobre la música, com aplicar títols animats, transicions justificades i corregir el color per donar un toc professional.",
      practiquesPendents: [
        "Pràctica 1: El llenguatge audiovisual: tipus de plans, angles i moviments de càmera",
        "Pràctica 2: La línia de temps: importar clips, retallar i ordenar el ritme",
        "Pràctica 3: Sincronització de vídeo i àudio: muntar al ritme de la música",
        "Pràctica 4: Transicions narratives, màscares i efectes visuals",
        "Pràctica 5: Etalonatge i correcció de color (Look cinematogràfic)",
        "Pràctica 6: Projecte final: Curtmetratge de 2 minuts o tràiler cinematogràfic"
      ]
    }
  ]
};

// Facilitem l'accés global tant al navegador com si s'executa en entorn Node
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CONTINGUTS_CURS };
}
