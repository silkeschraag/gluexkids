/* ==========================================================================
   GlüXkids Eltern-App — INHALTE
   --------------------------------------------------------------------------
   Diese Datei ist die einzige, die du für neue Inhalte anfassen musst.

   • Neues Freebie      → einen Eintrag in "freebies" ergänzen
   • Neuer Wochenimpuls → einen Eintrag in "impulse" ergänzen
                          (erscheint automatisch ab dem Datum in "datum",
                           du kannst also mehrere Wochen vorplanen)
   • Kurs freischalten  → bei dem Kurs status: "verfuegbar" setzen und
                          den Link zur Bezahlseite in "kaufLink" eintragen

   Regeln: Texte in "Anführungszeichen", Einträge mit Komma trennen.
   Ein Absatz mit **Sternchen** wird fett dargestellt.
   ========================================================================== */

window.GLUX_CONTENT = {

  /* ---------------------------------------------------------- Einstellungen */
  einstellungen: {
    newsletterLink: "https://gluexkids.de/newsletter",   // TODO: echten Anmeldelink eintragen
    wartelisteMail: "hallo@gluexkids.de",                 // TODO: echte Adresse eintragen
    webseite: "https://gluexkids.de",
    instagram: "https://instagram.com/gluexkids",         // TODO: prüfen
    impressum: "https://gluexkids.de/impressum",
    datenschutz: "https://gluexkids.de/datenschutz"
  },

  /* ---------------------------------------------------------- Wochenimpulse
     datum: ab wann der Impuls in der App sichtbar ist (JJJJ-MM-TT)
     bild:  optionales Titelbild (Datei in img/)          */
  impulse: [
    {
      id: "impuls-2026-47",
      datum: "2026-11-16",
      titel: "Fehler sind Mutproben",
      kurz: "Warum dein Kind Fehler machen darf – und wie du es dabei stärkst.",
      farbe: "orange",
      text: [
        "Kinder, die Angst vor Fehlern haben, probieren weniger aus. Und wer weniger ausprobiert, sammelt weniger Erfolgserlebnisse. Selbstvertrauen wächst aber genau dort: beim Ausprobieren, Danebenliegen und Weitermachen.",
        "**Dein Impuls für diese Woche:** Erzähl deinem Kind beim Abendessen von einem Fehler, den du heute gemacht hast – und was du daraus gelernt hast. Ganz locker, gern mit Humor.",
        "So erlebt dein Kind: Auch Erwachsene machen Fehler. Und das ist kein Drama, sondern ganz normal."
      ],
      frage: "Welcher Fehler ist dir diese Woche passiert – und was hat er dir gezeigt?"
    },
    {
      id: "impuls-2026-46",
      datum: "2026-11-09",
      titel: "Zuhören ohne zu lösen",
      kurz: "Manchmal braucht dein Kind keinen Rat, sondern ein offenes Ohr.",
      farbe: "green",
      text: [
        "Wenn unser Kind traurig oder wütend nach Hause kommt, wollen wir sofort helfen: „Dann spiel doch einfach mit jemand anderem!“ Gut gemeint – aber oft fühlt sich das Kind dadurch nicht verstanden.",
        "**Dein Impuls für diese Woche:** Wenn dein Kind etwas erzählt, das es beschäftigt, sag erst einmal nur: „Das klingt echt doof. Erzähl mal.“ Und dann: zuhören. Keine Lösung, kein Kommentar.",
        "Erst wenn sich dein Kind verstanden fühlt, ist es offen für gemeinsame Ideen."
      ],
      frage: "Wie oft hast du diese Woche zugehört, ohne gleich eine Lösung anzubieten?"
    },
    {
      id: "impuls-2026-48",
      datum: "2026-11-23",
      bild: "img/mutig.webp",
      titel: "Nein sagen ist erlaubt",
      kurz: "Wie Kinder lernen, ihre Grenzen freundlich und klar zu zeigen.",
      farbe: "blue",
      text: [
        "Kinder, die zu Hause „Nein“ sagen dürfen, können es auch auf dem Schulhof. Ein klares Nein ist eine der wichtigsten Fähigkeiten gegen Mobbing.",
        "**Dein Impuls für diese Woche:** Übt in einer ruhigen Minute ein „Stopp, das will ich nicht!“ – mit fester Stimme, geradem Rücken und Blick in die Augen. Gern auch als Rollenspiel, bei dem du mal das Kind bist.",
        "Und ganz wichtig: Wenn dein Kind zu Hause Nein sagt, nimm es ernst – auch wenn du am Ende anders entscheidest."
      ],
      frage: "Wann hat dein Kind diese Woche Nein gesagt – und wie hast du reagiert?"
    }
  ],

  /* ---------------------------------------------------------------- Freebies
     typ: "uebung"   = Übung zum gemeinsamen Machen
          "alltag"   = Transferaufgabe für den Alltag
          "download" = Datei zum Herunterladen/Ausdrucken (datei: "downloads/...")
          "serie"    = Übungsserie: mehrere Übungen zum Durchwischen (uebungen: [...])
     neu: true = bekommt das Etikett „Neu“ und steht auf der Startseite vorn
     bild:  optionales Titelbild (Datei in img/)
     alter: Altersangabe als Text
     dauer: z. B. "5 Min."                                                    */
  freebies: [
    {
      id: "koordination-zuhause",
      typ: "serie",
      neu: true,
      titel: "Koordination für zu Hause",
      kurz: "10 kleine Bewegungsspiele für Wohnzimmer und Kinderzimmer – ohne Turnhalle, mit Material, das ihr schon habt.",
      alter: "4–10 Jahre",
      dauer: "je 2–5 Min.",
      thema: "Koordination",
      intro: [
        "Koordination ist viel mehr als Geschicklichkeit. Wenn Kinder balancieren, fangen oder Arme und Beine überkreuz bewegen, müssen Körper und Kopf eng zusammenarbeiten. Genau das stärkt Konzentration, Körpergefühl – und das Vertrauen in sich selbst: **Ich kann das!**",
        "Bei GlüXkids steht Koordination deshalb immer am Anfang. Diese 10 Übungen könnt ihr ganz einfach zu Hause machen. Ihr braucht keine Turnhalle, nur ein bisschen Platz und Lust auf Bewegung."
      ],
      hinweise: [
        "Lieber jeden Tag 5 Minuten als einmal pro Woche eine Stunde.",
        "Macht mit! Kinder lieben es, wenn Eltern auch mal wackeln.",
        "Fehler sind erwünscht – Lachen gehört dazu.",
        "Sucht euch 2–3 Lieblingsübungen aus und steigert sie nach und nach."
      ],
      uebungen: [
        {
          titel: "Der Überkreuz-Marsch",
          dauer: "2 Min.",
          material: "nichts",
          schritte: [
            "Marschiert auf der Stelle und hebt die Knie schön hoch.",
            "Jetzt berührt der rechte Ellenbogen das linke Knie, dann der linke Ellenbogen das rechte Knie.",
            "Findet einen gleichmäßigen Rhythmus – gern zu Musik."
          ],
          steigerung: "Statt Ellenbogen tippt die Hand an die gegenüberliegende Ferse – mal vorn, mal hinter dem Körper.",
          warum: "Überkreuzbewegungen fordern die Zusammenarbeit beider Körperseiten."
        },
        {
          titel: "Der Flamingo",
          dauer: "2 Min.",
          material: "nichts",
          schritte: [
            "Stellt euch auf ein Bein, das andere Bein ist angewinkelt wie beim Flamingo.",
            "Die Arme breitet ihr aus wie Flügel. Zählt gemeinsam laut bis 10.",
            "Dann das Bein wechseln."
          ],
          steigerung: "Augen zu! Oder auf einem Sofakissen stehen – das wackelt richtig.",
          warum: "Der Einbeinstand trainiert das Gleichgewicht und die Körperspannung."
        },
        {
          titel: "Der Luftballon darf nicht landen",
          dauer: "3–5 Min.",
          material: "1 Luftballon",
          schritte: [
            "Pustet einen Luftballon auf.",
            "Spielt ihn euch gegenseitig zu – er darf den Boden nicht berühren.",
            "Zählt mit: Wie viele Berührungen schafft ihr gemeinsam?"
          ],
          steigerung: "Nur mit dem Kopf, den Knien oder dem Fuß spielen. Oder: Jeder darf nur die schwächere Hand nehmen.",
          warum: "Kinder lernen, Flugbahnen einzuschätzen und schnell zu reagieren – ganz ohne Angst vor einem harten Ball."
        },
        {
          titel: "Der Seiltänzer",
          dauer: "3 Min.",
          material: "Schnur, Wollfaden oder Malerkrepp",
          schritte: [
            "Legt eine Schnur in einer langen Linie auf den Boden oder klebt einen Streifen Krepp.",
            "Euer Kind balanciert wie im Zirkus darüber – Fuß vor Fuß, die Arme zur Seite.",
            "Am Ende gibt es eine große Verbeugung und Applaus."
          ],
          steigerung: "Rückwärts gehen, ein Kuscheltier auf dem Kopf tragen oder die Schnur in Kurven legen.",
          warum: "Balancieren schult Gleichgewicht, Konzentration und genaues Hinschauen."
        },
        {
          titel: "Socken-Jonglage",
          dauer: "3 Min.",
          material: "2 Paar zusammengerollte Socken",
          schritte: [
            "Rollt Socken zu kleinen Bällen.",
            "Euer Kind wirft einen Sockenball hoch und fängt ihn mit beiden Händen.",
            "Klappt das gut? Dann vor dem Fangen einmal in die Hände klatschen."
          ],
          steigerung: "Zweimal klatschen, mit einer Hand fangen oder zwei Sockenbälle abwechselnd werfen.",
          warum: "Werfen und Fangen verbinden Sehen und Bewegen – die Auge-Hand-Koordination."
        },
        {
          titel: "Das Spiegelspiel",
          dauer: "3 Min.",
          material: "nichts",
          schritte: [
            "Stellt euch gegenüber. Einer ist die Person, der andere das Spiegelbild.",
            "Bewegt euch langsam: Arme heben, auf die Zehenspitzen gehen, Grimassen schneiden. Das Spiegelbild macht alles genau nach.",
            "Nach einer Minute wird getauscht."
          ],
          steigerung: "Schneller werden – oder ganz langsam wie in Zeitlupe.",
          warum: "Nachahmen fördert Körperwahrnehmung, Aufmerksamkeit und ganz nebenbei die Verbindung zwischen euch."
        },
        {
          titel: "Nase – Ohr – Wechsel",
          dauer: "2 Min.",
          material: "nichts",
          schritte: [
            "Die rechte Hand fasst an die Nase, die linke Hand an das rechte Ohr.",
            "Einmal in die Hände klatschen und schnell wechseln: linke Hand an die Nase, rechte Hand ans linke Ohr.",
            "Erst langsam, dann immer schneller."
          ],
          steigerung: "Mit geschlossenen Augen – oder nach jedem Wechsel zweimal klatschen.",
          warum: "Die Übung bringt Kopf und Hände zum Lachen und Knobeln zugleich – Konzentration pur."
        },
        {
          titel: "Inselhüpfen",
          dauer: "3–5 Min.",
          material: "Sofakissen oder Handtücher",
          schritte: [
            "Verteilt Kissen oder Handtücher als Inseln auf dem Boden – der Boden ist das Meer.",
            "Euer Kind hüpft von Insel zu Insel, ohne ins Wasser zu fallen.",
            "Auf jeder Insel einmal kurz stehen bleiben und das Gleichgewicht halten."
          ],
          steigerung: "Nur auf einem Bein hüpfen, die Inseln weiter auseinanderlegen oder rückwärts hüpfen.",
          warum: "Springen und sicher landen stärkt Beinkraft, Gleichgewicht und Mut."
        },
        {
          titel: "Klatsch – Patsch – Schnips",
          dauer: "2 Min.",
          material: "nichts",
          schritte: [
            "Du machst einen kurzen Rhythmus vor: zweimal auf die Oberschenkel patschen, einmal klatschen.",
            "Dein Kind macht ihn nach.",
            "Mit jeder Runde wird der Rhythmus ein bisschen länger."
          ],
          steigerung: "Schnipsen oder Stampfen einbauen – oder dein Kind denkt sich einen Rhythmus für dich aus.",
          warum: "Rhythmus fördert Merkfähigkeit, Zuhören und das Timing von Bewegungen."
        },
        {
          titel: "Der Fuchs-Parcours",
          dauer: "5 Min.",
          material: "Stühle, Kissen, Decke",
          schritte: [
            "Baut gemeinsam einen kleinen Parcours: unter dem Tisch durchkriechen, über ein Kissen steigen, durch einen Deckentunnel krabbeln.",
            "Euer Kind schleicht wie ein Fuchs hindurch – leise, flink und geschmeidig.",
            "Danach baut euer Kind einen Parcours für dich!"
          ],
          steigerung: "Mit Stoppuhr auf Zeit oder mit einem Sockenball, der unterwegs nicht runterfallen darf.",
          warum: "Klettern, Kriechen und Krabbeln verbinden viele Bewegungsformen – und das Selberbauen macht stolz."
        }
      ],
      tipp: "Macht aus den Übungen eine kleine Morgen- oder Abendroutine: Jeden Tag zieht euer Kind eine Übung – und am Wochenende gibt es den großen Fuchs-Parcours."
    },
    {
      id: "fuchs-power-pose",
      typ: "uebung",
      titel: "Die Fuchs-Power-Pose",
      kurz: "In 2 Minuten mutiger: Körperhaltung, die Selbstvertrauen schenkt.",
      alter: "4–12 Jahre",
      dauer: "2 Min.",
      thema: "Selbstbewusstsein",
      intro: "Unsere Haltung beeinflusst, wie wir uns fühlen. Wer aufrecht steht, fühlt sich stärker – und wirkt auch so. Perfekt vor dem Kindergarten, der Schule oder einer Herausforderung.",
      schritte: [
        "Stellt euch gemeinsam hin, die Füße etwa schulterbreit auseinander.",
        "Rücken gerade, Kopf hoch, Schultern locker nach hinten – wie ein stolzer Fuchs.",
        "Hände in die Hüften stemmen oder die Arme wie ein Sieger nach oben strecken.",
        "Dreimal tief durch die Nase einatmen und laut ausatmen: „Ich bin stark!“",
        "Noch 30 Sekunden so stehen bleiben und grinsen. Ja, das darf albern sein!"
      ],
      tipp: "Macht die Power-Pose zu eurem Morgenritual – zum Beispiel direkt nach dem Zähneputzen."
    },
    {
      id: "stopp-hand",
      typ: "uebung",
      titel: "Die Stopp-Hand",
      kurz: "Klare Grenzen setzen – mit Stimme, Haltung und Blick.",
      alter: "5–12 Jahre",
      dauer: "10 Min.",
      thema: "Mobbingprävention",
      bild: "img/mutig.webp",
      intro: "Ein selbstbewusstes „Stopp!“ ist eine der wirksamsten Strategien gegen Ärgern und Mobbing. Entscheidend ist nicht, was das Kind sagt, sondern wie es das sagt.",
      schritte: [
        "Erklärt die drei Zutaten: feste Stimme, gerader Stand, Blick in die Augen.",
        "Dein Kind streckt eine Hand nach vorn, Handfläche zeigt zu dir – wie ein Stoppschild.",
        "Es sagt laut und deutlich: „Stopp! Lass das!“ Nicht schreien, aber bestimmt.",
        "Jetzt tauscht ihr: Du spielst einmal ein unsicheres, leises Stopp vor – woran merkt dein Kind den Unterschied?",
        "Wiederholt das Ganze drei Mal und lobt konkret: „Deine Stimme war richtig kraftvoll!“"
      ],
      tipp: "Wichtig: Nach dem Stopp darf sich dein Kind immer umdrehen und weggehen – und sich Hilfe bei einem Erwachsenen holen. Das ist kein Petzen, sondern mutig."
    },
    {
      id: "atem-igel",
      typ: "uebung",
      titel: "Der Atem-Igel",
      kurz: "Eine Beruhigungsübung für Wut, Aufregung und schlechte Tage.",
      alter: "4–10 Jahre",
      dauer: "3 Min.",
      thema: "Gefühle",
      intro: "Wenn Gefühle groß werden, hilft der Atem, wieder ruhig zu werden. Mit einem Bild im Kopf fällt das Kindern viel leichter.",
      schritte: [
        "Setzt euch bequem hin oder legt euch auf den Rücken.",
        "Dein Kind legt eine Hand auf den Bauch – dort wohnt ein kleiner Igel.",
        "Langsam durch die Nase einatmen und bis 4 zählen: Der Igel plustert sich auf und wird groß und rund.",
        "Kurz die Luft anhalten und bis 2 zählen.",
        "Langsam durch den Mund ausatmen und bis 6 zählen: Der Igel rollt sich gemütlich zusammen.",
        "Fünf Runden wiederholen. Danach fragen: „Wie fühlt sich dein Bauch jetzt an?“"
      ],
      tipp: "Übt den Atem-Igel in ruhigen Momenten. Dann kann dein Kind ihn auch abrufen, wenn es wirklich aufgeregt ist."
    },
    {
      id: "gefuehls-check",
      typ: "alltag",
      titel: "Der Gefühls-Check am Abendbrottisch",
      kurz: "Ein kleines Ritual, das Gespräche über Gefühle ganz leicht macht.",
      alter: "4–12 Jahre",
      dauer: "jeden Abend",
      thema: "Gefühle",
      bild: "img/erzaehl-doch-mal.webp",
      intro: "Auf „Wie war's in der Schule?“ kommt oft nur „Gut.“ Mit dem Gefühls-Check erfährst du viel mehr – ohne Verhör.",
      schritte: [
        "Jeder am Tisch zeigt mit der Hand, wie sein Tag war: Daumen hoch, Daumen zur Seite oder Daumen runter.",
        "Reihum erzählt jede Person einen Moment, in dem sie sich heute gut gefühlt hat.",
        "Wer mag, erzählt auch einen Moment, der doof war. Niemand muss.",
        "Du fängst an – so lernt dein Kind, dass auch Erwachsene schwierige Momente haben.",
        "Ganz wichtig: zuhören, nicht bewerten. Ein „Danke, dass du das erzählt hast“ reicht."
      ],
      tipp: "Haltet es kurz. Fünf Minuten am Tag sind wertvoller als ein langes Gespräch einmal im Monat."
    },
    {
      id: "drei-gute-dinge",
      typ: "alltag",
      titel: "3 gute Dinge – das Glücks-Ritual",
      kurz: "Den Blick aufs Gelingen lenken: jeden Abend vor dem Einschlafen.",
      alter: "4–12 Jahre",
      dauer: "5 Min.",
      thema: "Resilienz",
      intro: "Unser Gehirn merkt sich Negatives leichter als Positives. Wer jeden Tag bewusst auf das Gute schaut, stärkt seine innere Widerstandskraft – das ist gut erforscht.",
      schritte: [
        "Beim Zubettbringen fragst du: „Was waren heute drei gute Dinge?“",
        "Es dürfen auch kleine Dinge sein: das Lieblingsessen, ein Lachen, die Sonne.",
        "Frag bei einem Punkt nach: „Was hast du dazu beigetragen?“ So erlebt dein Kind: Ich kann Gutes bewirken.",
        "Erzähl auch deine drei guten Dinge.",
        "Wer mag, schreibt oder malt die Dinge in ein kleines Glücks-Heft."
      ],
      tipp: "Nach zwei Wochen fängt dein Kind oft schon tagsüber an, gute Dinge für den Abend zu „sammeln“."
    },
    {
      id: "finger-affirmationen",
      typ: "download",
      titel: "Finger-Affirmationen",
      kurz: "Fünf starke Sätze – einer für jeden Finger. Zum Ausdrucken und täglich Üben.",
      alter: "4–10 Jahre",
      dauer: "1 Min. täglich",
      thema: "Selbstbewusstsein",
      bild: "img/finger-affirmationen.webp",
      datei: "downloads/finger-affirmationen.png",
      intro: "Positive Sätze wirken am besten, wenn sie oft wiederholt werden. Mit den Fingern hat dein Kind seine Mutmacher immer dabei – auch vor der Klassenarbeit oder auf dem Schulhof.",
      schritte: [
        "Lade das Plakat herunter und hängt es gut sichtbar auf, z. B. am Kühlschrank oder neben dem Bett.",
        "Daumen und Zeigefinger zusammen: „Ich werde das schaffen.“",
        "Daumen und Mittelfinger: „Ich bin gut genug.“ – Daumen und Ringfinger: „Ich glaube an mich.“",
        "Daumen und kleiner Finger: „Ich bin heute mutig.“ Dann die Hand öffnen und tief ausatmen: „Ich bleibe ganz ruhig.“",
        "Macht die Übung jeden Morgen gemeinsam – nach ein paar Tagen kann dein Kind sie allein."
      ],
      tipp: "Zeig deinem Kind, dass es die Finger-Affirmationen ganz unauffällig unter dem Tisch machen kann. Das ist sein kleines Geheimnis."
    }
  ],

  /* ------------------------------------------------------------------ Kurse
     status: "bald"        = Vorschau „Bald verfügbar“ mit Warteliste
             "verfuegbar"  = Kaufen-Button mit kaufLink (z. B. Digistore24,
                             CopeCart, Stripe-Zahlungslink, Elopage …)       */
  kurse: [
    {
      id: "mobbing-basiswissen",
      titel: "Mobbing – Basiswissen für Eltern",
      kurz: "Erkennen, verstehen, richtig handeln: Was du über Mobbing wissen musst.",
      preis: "19 €",
      status: "bald",
      kaufLink: "",
      farbe: "blue",
      icon: "shield",
      inhalte: [
        "Ärgern, Streit oder Mobbing? Der Unterschied",
        "Warnsignale, die du kennen solltest",
        "Was du sofort tun kannst – und was du lassen solltest",
        "So sprichst du mit Schule und Lehrkräften"
      ]
    },
    {
      id: "mein-kind-mobbt",
      titel: "Hilfe, mein Kind mobbt!",
      kurz: "Ohne Schuldgefühle hinschauen und dein Kind gut begleiten.",
      preis: "19 €",
      status: "bald",
      kaufLink: "",
      farbe: "orange",
      icon: "heart-handshake",
      inhalte: [
        "Warum Kinder andere mobben",
        "Das klärende Gespräch mit deinem Kind",
        "Verantwortung übernehmen, ohne zu beschämen",
        "Empathie im Alltag stärken"
      ]
    },
    {
      id: "selbstbewusster",
      titel: "So wird mein Kind selbstbewusster",
      kurz: "Elterninput mit alltagstauglichen Ideen für mehr Selbstvertrauen.",
      preis: "19 €",
      status: "bald",
      kaufLink: "",
      farbe: "green",
      icon: "sun",
      inhalte: [
        "Was Selbstbewusstsein wirklich ausmacht",
        "Die 5 größten Selbstvertrauens-Killer im Familienalltag",
        "Loben, das stärkt",
        "Kleine Mutproben für jeden Tag"
      ]
    },
    {
      id: "selbstbewusstsein-training",
      titel: "Selbstbewusstseins-Training für Kinder",
      kurz: "Mitmach-Kurs für Kinder: spielerisch stark werden – mit dem Fuchs und der GlüXbande.",
      preis: "19 €",
      status: "bald",
      kaufLink: "",
      farbe: "yellow",
      icon: "flame",
      inhalte: [
        "Videoübungen zum Mitmachen",
        "Stimme, Haltung und Blick trainieren",
        "Mutmach-Spiele für die ganze Familie",
        "Urkunde zum Ausdrucken"
      ]
    }
  ]
};
