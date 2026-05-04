export interface GalleryItem {
  Titel: string;
  Autor: string;
  Kategorie: string;
  Beschreibung: string;
  Text: string;
  Datum: string;
  Tags: string;
  Status: string;
}

export const CATEGORY_STYLES: Record<string, { badge: string }> = {
  Poesie:     { badge: 'bg-[#e8f0e9] text-[#5c7a5e]' },
  Biografie:  { badge: 'bg-[#f0eaf8] text-[#6050a0]' },
  Briefe:     { badge: 'bg-[#fdf0e8] text-[#a07050]' },
  Prosa:      { badge: 'bg-[#f5f0e0] text-[#7a6020]' },
  Schreiben:  { badge: 'bg-[#e8f0e9] text-[#5c7a5e]' },
  Sonstiges:  { badge: 'bg-[#f0e8de] text-[#7a6855]' },
};

export const DEMO_ITEMS: GalleryItem[] = [
  {
    Titel: 'Brief ans Licht',
    Autor: 'Thomas K.',
    Kategorie: 'Briefe',
    Beschreibung: 'Ich habe mir selbst geschrieben – von jemandem, der schon auf der anderen Seite dieser Zeit ist. Es hat mir mehr gegeben, als ich erwartet hatte.',
    Text: 'Lieber Thomas von damals,\n\ndu weißt noch nicht, dass diese Zeit enden wird. Dass du eines Morgens aufwachst und merkst: die Schwere ist kleiner geworden. Nicht weg – aber kleiner. Halte durch. Schreib weiter. Du findest einen Weg.',
    Datum: '3. April 2025',
    Tags: 'brief, mut, reflexion',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Stille Stunden',
    Autor: 'Petra M.',
    Kategorie: 'Prosa',
    Beschreibung: 'Ein Prosatext über die Zeit im Krankenhaus – die Langsamkeit, das Licht, die seltsame Stille. Was ich nicht erwartet hatte: das Aufatmen.',
    Text: 'Das Licht im Zimmer war immer dasselbe. Morgens grau, mittags weiß, abends warm. Ich lernte, die Zeit daran zu messen. Nicht an Uhren. Die Maschinen piepten in einem Rhythmus, den man irgendwann nicht mehr hört.',
    Datum: '12. März 2025',
    Tags: 'krankenhaus, stille, zeit',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Wasserfarben im November',
    Autor: 'Lena S.',
    Kategorie: 'Poesie',
    Beschreibung: 'Ein Gedicht ohne feste Form, das entstanden ist, als ich nicht mehr sprechen wollte. Danach war etwas anders.',
    Text: 'Der Regen klopft in kurzen Sätzen.\nIch antworte nicht.\nNovember kennt keine Fragen,\nnur dieses lange, stille Warten\nauf ein Licht, das ich noch nicht sehe.',
    Datum: '28. März 2025',
    Tags: 'poesie, november, trauer',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Bevor ich krank wurde',
    Autor: 'Maria V.',
    Kategorie: 'Biografie',
    Beschreibung: 'Eine Erinnerung an einen ganz gewöhnlichen Dienstag – bevor die Diagnose alles veränderte. Was ich damals nicht wusste.',
    Text: 'Es war ein Dienstag. Ich hatte Kaffee gemacht, die Post geholt, die Schuhe vergessen. Ein ganz normaler Dienstag. Ich wusste nicht, dass es der letzte vor allem war.',
    Datum: '17. April 2025',
    Tags: 'diagnose, erinnerung, vorher',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'An meine Mutter',
    Autor: 'Anonym',
    Kategorie: 'Briefe',
    Beschreibung: 'Es gibt Dinge, die ich ihr nie gesagt habe. Dieser Brief war der erste Versuch. Ich habe ihn nie gegeben – aber ich habe ihn geschrieben.',
    Text: 'Ich weiß nicht, ob du das je lesen wirst. Wahrscheinlich nicht. Aber ich musste es aufschreiben, damit es irgendwo existiert – dieses: Ich hab dich vermisst, auch als du noch da warst.',
    Datum: '5. Mai 2025',
    Tags: 'mutter, verlust, ungesagt',
    Status: 'veröffentlicht',
  },
  {
    Titel: 'Das Zimmer, das wartet',
    Autor: 'Claudia H.',
    Kategorie: 'Prosa',
    Beschreibung: 'Eine kurze Prosa über das Zimmer, in dem ich die Krise durchgestanden habe. Die Dinge, die darin blieben.',
    Text: 'Das Zimmer wartet noch. Die Tasse auf dem Fensterbrett. Der Berg Bücher, der nicht kleiner wurde. Ich habe gewartet, dass es aufhört. Es hörte auf. Das Zimmer ist noch da.',
    Datum: '22. April 2025',
    Tags: 'zimmer, krise, ort',
    Status: 'veröffentlicht',
  },
];

