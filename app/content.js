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
     Freebies sind nach THEMEN gebündelt. Jede Kategorie ist eine Serie mit
     Karten zum Durchwischen (typ: "serie").

     neu: true   = Etikett „Neu“ und großer Hinweis oben auf der Startseite
     bild:       Titelbild der Kategorie (Datei in img/)
     figur:      alternativ eine Figur der GlüXbande (foxy, lio, pingupik, fina, samy, elli)
     datei:      optional Druckversion als PDF (Datei in downloads/)
     kurs:       optional id eines passenden Kurses → „Tiefer einsteigen?“ unter der Kategorie

     Jede Übung (Karte) kann enthalten:
       titel, dauer, material, figur, intro, schritte, liste {titel, punkte},
       spiel {titel, text}, datei + dateiText, steigerung, tipp, warum
       neu: "JJJJ-MM-TT"  = Datum, an dem du die Übung neu hinzugefügt hast.
                            30 Tage lang erscheint dann „Neue Übung hinzugekommen“
                            in der Übersicht und „Neu“ auf der Karte.          */
  freebies: [
    {
      id: "koordination-zuhause",
      typ: "serie",
      neu: true,
      titel: "Koordinationsübungen für zu Hause",
      kurz: "Kleine Bewegungsspiele für Wohnzimmer und Kinderzimmer – ohne Turnhalle, mit Material, das ihr schon habt.",
      alter: "4–10 Jahre",
      dauer: "je 2–5 Min.",
      thema: "Koordination",
      bild: "img/foxy-balance.webp",
      kurs: "selbstbewusstsein-training",
      intro: [
        "Koordination ist viel mehr als Geschicklichkeit. Wenn Kinder balancieren, fangen oder Arme und Beine überkreuz bewegen, müssen Körper und Kopf eng zusammenarbeiten. Genau das stärkt Konzentration, Körpergefühl – und das Vertrauen in sich selbst: **Ich kann das!**",
        "Bewegung ist bei GlüXkids einer der Wege zu mehr Selbstvertrauen. Diese Übungen könnt ihr ganz einfach zu Hause machen. Ihr braucht keine Turnhalle, nur ein bisschen Platz und Lust auf Bewegung."
      ],
      hinweise: [
        "Lieber jeden Tag 5 Minuten als einmal pro Woche eine Stunde.",
        "Macht mit! Kinder lieben es, wenn Eltern auch mal wackeln.",
        "Fehler sind erwünscht – Lachen gehört dazu.",
        "Sucht euch 2–3 Lieblingsübungen aus und steigert sie nach und nach."
      ],
      uebungen: [
        {
          titel: "Zähneputzen mal anders",
          dauer: "2 Min. · jeden Morgen",
          material: "Zahnbürste",
          schritte: [
            "Heute putzt dein Kind die Zähne mit der anderen Hand. Rechtshänder nehmen also links, Linkshänder rechts.",
            "Das fühlt sich erst ungewohnt an, und genau darum geht es. Lacht gemeinsam darüber.",
            "Wer mag, stellt sich dabei zusätzlich auf ein Bein und wechselt nach der Hälfte der Zeit."
          ],
          steigerung: "Auf einem Bein stehen **und** mit der anderen Hand putzen.",
          tipp: "Macht daraus ein kleines Morgenritual. So wird Zähneputzen zum Spiel. Damit die Zähne trotzdem sauber werden, putzt du am Ende kurz nach.",
          warum: "Klingt simpel, wirkt aber: Ungewohnte Bewegungen fordern das Gehirn heraus, es entstehen neue Impulse. Das ist gut für die Konzentration und für den Mut, Neues auszuprobieren."
        },
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
          spiel: {
            titel: "Spielidee: Flamingo-Stopptanz",
            text: "Macht Musik an und tanzt wild durchs Zimmer. Sobald die Musik stoppt, geht dein Kind blitzschnell in den Flamingo-Stand und hält ihn, bis die Musik weiterläuft. Mit Musik macht das gleich doppelt so viel Spaß."
          },
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
            "Klappt das sicher? Dann geht es auch rückwärts oder mit einem Kuscheltier auf dem Kopf."
          ],
          steigerung: "Hüpfen statt balancieren! Mit geschlossenen Beinen seitlich über die Linie springen, von links nach rechts und wieder zurück. Profis schaffen das auch auf einem Bein.",
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
          titel: "Foxys Parcours",
          dauer: "5 Min.",
          material: "Stühle, Kissen, Decke",
          schritte: [
            "Baut gemeinsam einen kleinen Parcours: unter dem Tisch durchkriechen, über ein Kissen steigen, durch einen Deckentunnel krabbeln.",
            "Euer Kind schleicht wie Foxy hindurch – leise, flink und geschmeidig.",
            "Danach baut euer Kind einen Parcours für dich!"
          ],
          steigerung: "Mit Stoppuhr auf Zeit oder mit einem Sockenball, der unterwegs nicht runterfallen darf.",
          warum: "Klettern, Kriechen und Krabbeln verbinden viele Bewegungsformen – und das Selberbauen macht stolz."
        }
      ],
      tipp: "Macht aus den Übungen eine kleine Morgen- oder Abendroutine: Jeden Tag zieht euer Kind eine Übung – und am Wochenende gibt es Foxys großen Parcours."
    },
    {
      id: "mut-selbstvertrauen",
      typ: "serie",
      titel: "Mut & Selbstvertrauen",
      kurz: "Kleine Übungen, mit denen dein Kind Haltung zeigt, Grenzen setzt und an sich glaubt.",
      alter: "4–12 Jahre",
      dauer: "je 2–10 Min.",
      thema: "Selbstvertrauen & Mobbingprävention",
      bild: "img/mutig.webp",
      kurs: "mobbing-basiswissen",
      intro: [
        "Selbstvertrauen ist der beste Schutz – auch gegen Ärgern und Mobbing. Kinder, die an sich glauben, treten anders auf: Sie stehen aufrechter, sprechen klarer und trauen sich, Nein zu sagen.",
        "Das lässt sich üben. Mit diesen Übungen stärkst du dein Kind ganz nebenbei im Alltag – mit Körperhaltung, Stimme und starken Gedanken."
      ],
      hinweise: [
        "Übt in entspannten Momenten, nicht direkt nach einem Streit.",
        "Lob konkret: „Deine Stimme war richtig kraftvoll!“ wirkt mehr als „Gut gemacht“.",
        "Mach selbst mit – du bist das wichtigste Vorbild."
      ],
      uebungen: [
        {
          titel: "Foxys Power-Pose",
          figur: "foxy",
          dauer: "2 Min.",
          material: "nichts",
          intro: "Unsere Haltung beeinflusst, wie wir uns fühlen. Wer aufrecht steht, fühlt sich stärker – und wirkt auch so.",
          schritte: [
            "Stellt euch gemeinsam hin, die Füße etwa schulterbreit auseinander.",
            "Rücken gerade, Kopf hoch, Schultern locker nach hinten – so stolz wie Foxy.",
            "Hände in die Hüften stemmen oder die Arme wie ein Sieger nach oben strecken.",
            "Dreimal tief einatmen und beim Ausatmen sagen: „Ich bin stark!“"
          ],
          steigerung: "Erfindet eure eigene Power-Pose und gebt ihr einen Namen.",
          tipp: "Macht die Power-Pose zum Morgenritual – zum Beispiel direkt nach dem Zähneputzen oder vor dem Losgehen."
        },
        {
          titel: "Die Stopp-Hand",
          dauer: "10 Min.",
          material: "nichts",
          intro: "Ein selbstbewusstes „Stopp!“ ist eine wichtige Strategie gegen Ärgern und Mobbing. Entscheidend ist nicht, was dein Kind sagt, sondern wie es das sagt.",
          schritte: [
            "Erklärt die drei Zutaten: feste Stimme, gerader Stand, Blick in die Augen.",
            "Dein Kind streckt eine Hand nach vorn, die Handfläche zeigt zu dir – wie ein Stoppschild.",
            "Es sagt laut und deutlich: „Stopp! Lass das!“ Nicht schreien, aber bestimmt.",
            "Tauscht die Rollen: Du spielst einmal ein leises, unsicheres Stopp vor. Woran merkt dein Kind den Unterschied?"
          ],
          steigerung: "Übt das Stopp auch im Gehen oder im Sitzen – so, wie es auf dem Schulhof wirklich passiert.",
          tipp: "Nach dem Stopp darf sich dein Kind immer umdrehen, weggehen und sich Hilfe bei einem Erwachsenen holen. Das ist kein Petzen, sondern mutig."
        },
        {
          titel: "Finger-Affirmationen",
          dauer: "1 Min. täglich",
          material: "nur die eigene Hand",
          intro: "Jede Fingerberührung ist ein Wort. So wird aus einer Hand ein ganzer Mutmach-Satz, den dein Kind immer dabeihat. Ein Beispiel:",
          schritte: [
            "Daumen und Zeigefinger berühren sich: **„Ich“**",
            "Daumen und Mittelfinger: **„kann“**",
            "Daumen und Ringfinger: **„das“**",
            "Daumen und kleiner Finger: **„schaffen.“**",
            "Langsam wiederholen und dabei mitsprechen – erst laut und gemeinsam, später ganz leise allein."
          ],
          liste: {
            titel: "5 weitere Sätze als Idee",
            punkte: [
              "Ich werde das schaffen.",
              "Ich bin gut genug.",
              "Ich glaube an mich.",
              "Ich bin heute mutig.",
              "Ich bleibe ganz ruhig."
            ]
          },
          datei: "downloads/finger-affirmationen.png",
          dateiText: "Plakat zum Ausdrucken",
          tipp: "Zeig deinem Kind, dass es die Finger-Affirmationen ganz unauffällig unter dem Tisch machen kann – zum Beispiel vor einer Klassenarbeit. Das ist sein kleines Geheimnis."
        }
      ],
      tipp: "Sucht euch gemeinsam einen Lieblingssatz für die Woche aus und macht vor dem Losgehen kurz die Power-Pose dazu."
    },
    {
      id: "gefuehle-ruhe",
      typ: "serie",
      titel: "Gefühle & innere Ruhe",
      kurz: "Rituale und Übungen, die helfen, Gefühle zu verstehen und wieder ruhig zu werden.",
      alter: "4–12 Jahre",
      dauer: "je 3–5 Min.",
      thema: "Gefühle & Resilienz",
      figur: "fina",
      kurs: "selbstbewusster",
      intro: [
        "Starke Kinder haben nicht weniger Gefühle – sie lernen, mit ihnen umzugehen. Wer seine Gefühle benennen kann und weiß, wie er wieder ruhig wird, steht auch schwierige Situationen besser durch.",
        "Diese kleinen Rituale passen in jeden Familienalltag: beim Abendessen, beim Zubettbringen oder immer dann, wenn es mal stürmisch wird."
      ],
      hinweise: [
        "Gefühle sind nie falsch – auch Wut und Traurigkeit dürfen sein.",
        "Zuhören ist wichtiger als Lösungen anbieten.",
        "Kurze Rituale jeden Tag wirken mehr als lange Gespräche ab und zu."
      ],
      uebungen: [
        {
          titel: "Atmen mit Fina",
          figur: "fina",
          dauer: "3 Min.",
          material: "nichts",
          intro: "Wenn Gefühle groß werden, hilft der Atem, wieder ruhig zu werden. Fina, das Faultier aus der GlüXbande, hat nie Eile und atmet ganz langsam.",
          schritte: [
            "Setzt euch bequem hin oder legt euch auf den Rücken. Dein Kind legt eine Hand auf den Bauch.",
            "Langsam wie Fina durch die Nase einatmen und bis 4 zählen: Der Bauch wird groß und rund wie ein Ballon.",
            "Kurz die Luft anhalten und bis 2 zählen.",
            "Langsam durch den Mund ausatmen und bis 6 zählen: Der Ballon wird wieder klein. Fünf Runden wiederholen."
          ],
          tipp: "Übt das Fina-Atmen in ruhigen Momenten. Dann kann dein Kind es auch abrufen, wenn es wirklich aufgeregt ist."
        },
        {
          titel: "Der Gefühls-Check am Abendbrottisch",
          dauer: "5 Min.",
          material: "nichts",
          intro: "Auf „Wie war's in der Schule?“ kommt oft nur „Gut.“ Mit dem Gefühls-Check erfährst du viel mehr – ohne Verhör.",
          schritte: [
            "Jeder am Tisch zeigt mit der Hand, wie sein Tag war: Daumen hoch, zur Seite oder runter.",
            "Reihum erzählt jede Person einen Moment, in dem sie sich heute gut gefühlt hat.",
            "Wer mag, erzählt auch einen Moment, der doof war. Niemand muss.",
            "Du fängst an – so lernt dein Kind, dass auch Erwachsene schwierige Momente haben."
          ],
          tipp: "Zuhören, nicht bewerten. Ein „Danke, dass du das erzählt hast“ reicht völlig."
        },
        {
          titel: "3 gute Dinge",
          dauer: "5 Min.",
          material: "nichts, gern ein kleines Heft",
          intro: "Wer jeden Tag bewusst auf das Gute schaut, stärkt seine innere Widerstandskraft. Ein schönes Ritual für den Abend.",
          schritte: [
            "Beim Zubettbringen fragst du: „Was waren heute drei gute Dinge?“",
            "Es dürfen auch kleine Dinge sein: das Lieblingsessen, ein Lachen, die Sonne.",
            "Frag bei einem Punkt nach: „Was hast du dazu beigetragen?“ So erlebt dein Kind: Ich kann Gutes bewirken.",
            "Erzähl auch deine drei guten Dinge."
          ],
          steigerung: "Schreibt oder malt die guten Dinge in ein kleines Glücks-Heft.",
          tipp: "Nach ein paar Wochen fangen viele Kinder schon tagsüber an, gute Dinge für den Abend zu „sammeln“."
        }
      ],
      tipp: "Wählt ein Ritual aus und probiert es eine Woche lang jeden Tag aus, bevor ihr das nächste dazunehmt."
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
      kurz: "Mitmach-Kurs für Kinder: spielerisch stark werden – mit Foxy und der GlüXbande.",
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
