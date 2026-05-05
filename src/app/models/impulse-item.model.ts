export interface ImpulseItem {
  Titel: string;
  Beschreibung: string;
  Kategorie: string;
  Tag: string;
}

export const IMPULSE_TABS: { key: string; icon: string; label: string; borderClass: string; numClass: string; tagClass: string }[] = [
  { key: 'Brief',             icon: '/img/icon-email.svg',      label: 'Brief',             borderClass: 'border-sage',        numClass: 'text-sage/20',        tagClass: 'bg-sage-light text-sage-dark' },
  { key: 'Tagebuch',          icon: '/img/icon-diary.svg',      label: 'Tagebuch',          borderClass: 'border-terra',       numClass: 'text-terra/20',       tagClass: 'bg-terra-light text-terra-dark' },
  { key: 'Poesie',            icon: '/img/icon-plant.svg',      label: 'Poesie',            borderClass: 'border-sage',        numClass: 'text-sage/20',        tagClass: 'bg-sage-light text-sage-dark' },
  { key: 'Biografie',         icon: '/img/icon-book-open.svg',  label: 'Biografie',         borderClass: 'border-[#b0a0d0]',   numClass: 'text-[#b0a0d0]/40',   tagClass: 'bg-[#f0eaf8] text-[#6050a0]' },
  { key: 'Freies Schreiben',  icon: '/img/icon-star.svg',       label: 'Freies Schreiben',  borderClass: 'border-terra',       numClass: 'text-terra/30',       tagClass: 'bg-terra-light text-terra-dark' },
];

export const DEMO_IMPULSES: ImpulseItem[] = [
  { Titel: 'Brief ans zukünftige Ich',    Beschreibung: 'Schreib dir selbst einen Brief – von jemandem, der schon weiß, dass alles gut wird. Was würde dieser Mensch dir heute sagen? Was ist wichtig, was kann warten?',              Kategorie: 'Brief',            Tag: 'Ermutigung' },
  { Titel: 'Brief an die Krankheit',       Beschreibung: 'Was würdest du der Krankheit, der Krise oder dem Verlust sagen, wenn du ihr direkt schreiben könntest? Ohne Höflichkeit, ohne Rücksicht – nur ehrlich.',                    Kategorie: 'Brief',            Tag: 'Ausdruck' },
  { Titel: 'Brief an jemanden, dem ich danke', Beschreibung: 'Denke an jemanden, dem du in schwieriger Zeit dankbar bist – und der es vielleicht nicht weiß. Schreib ihm oder ihr einen Brief. Du musst ihn nicht abschicken.',                 Kategorie: 'Brief',            Tag: 'Dankbarkeit' },
  { Titel: 'Was ich heute gesehen habe',   Beschreibung: 'Schreib ein Beobachtungsprotokoll deines Tages. Nur Fakten, keine Wertung – was hast du gesehen, gehört, gespürt? Mindestens 5 Dinge. Dann: Was fällt dir daran auf?',              Kategorie: 'Tagebuch',          Tag: 'Achtsamkeit' },
  { Titel: 'Ein Ort der Ruhe',             Beschreibung: 'Beschreibe einen Ort – real oder erfunden – an dem du dich vollkommen sicher fühlst. Was siehst, riechst, hörst du? Was macht ihn zu einem Ort der Ruhe?',                              Kategorie: 'Tagebuch',          Tag: 'Ressource' },
  { Titel: 'Was ich gerade brauche',       Beschreibung: 'Schreib drei Minuten lang: Was brauchst du gerade wirklich? Nicht was du solltest, nicht was andere erwarten – sondern was du selbst brauchst. Ohne Zensur.',                       Kategorie: 'Tagebuch',          Tag: 'Klärung' },
  { Titel: 'Ein Wort, das alles sagt',     Beschreibung: 'Welches Wort beschreibt deinen heutigen Zustand am besten? Trage es in die Mitte eines Blatts. Drumherum: alles, was dazu gehört. Ein Gedicht ohne Regeln.',                        Kategorie: 'Poesie',            Tag: 'Freivers' },
  { Titel: 'Die Farbe von heute',          Beschreibung: 'Wenn dein heutiger Tag eine Farbe wäre – welche? Schreib ein kurzes Gedicht, das diese Farbe beschreibt, ohne sie zu nennen.',                                                        Kategorie: 'Poesie',            Tag: 'Bild & Metapher' },
  { Titel: 'Litanei der kleinen Dinge',    Beschreibung: 'Schreib eine Liste von Dingen, die heute gut waren. Auch das Kleinste zählt: ein warmer Schluck, ein Moment Stille. Wiederhole dabei: „Ich bin dankbar für …"',                      Kategorie: 'Poesie',            Tag: 'Ritual' },
  { Titel: 'Bevor alles begann',           Beschreibung: 'Beschreibe einen ganz gewöhnlichen Tag aus deinem Leben – bevor die Krise oder Krankheit begann. Was war selbstverständlich? Was hast du nicht bemerkt?',                              Kategorie: 'Biografie',         Tag: 'Erinnerung' },
  { Titel: 'Jemand, der mich geprägt hat', Beschreibung: 'Denke an eine Person, die dich stark beeinflusst hat – positiv wie negativ. Was hat sie in dir hinterlassen? Was trägst du noch heute von ihr mit?',                                 Kategorie: 'Biografie',         Tag: 'Beziehung' },
  { Titel: 'Ein Wendepunkt',              Beschreibung: 'Jeder kennt einen Moment, nach dem nichts mehr so war wie vorher. Beschreibe diesen Moment – nur den Augenblick selbst. Was war der erste Gedanke?',                                  Kategorie: 'Biografie',         Tag: 'Narrativ' },
  { Titel: '10 Minuten, ohne aufhören',   Beschreibung: 'Stell einen Timer auf 10 Minuten. Schreib, ohne die Hand anzuheben, ohne zu korrigieren. Lass alles raus, was da ist.',                                                                 Kategorie: 'Freies Schreiben',  Tag: 'Automatisch' },
  { Titel: 'Was mich heute trägt',         Beschreibung: 'Schreib diesen Satz auf undführe ihn fort – ohne nachzudenken. Wohin führt er dich? Was überrascht dich an dem, was entsteht?',                                                        Kategorie: 'Freies Schreiben',  Tag: 'Satzeinstieg' },
  { Titel: 'Das Bild in meinem Kopf',     Beschreibung: 'Schließ kurz die Augen. Welches Bild taucht auf? Halte es fest – so genau wie möglich. Warum genau dieses Bild?',                                                                        Kategorie: 'Freies Schreiben',  Tag: 'Innenbild' },
];