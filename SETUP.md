# Funken – Setup-Anleitung für Jane 🌿
*Keine Programmierkenntnisse nötig – alles läuft über Google.*

---

## Übersicht: Was du einrichten musst

| Was | Wo | Einmalig? |
|---|---|---|
| Google Spreadsheet anlegen | Google Drive | ✅ |
| Apps Script einrichten | Im Spreadsheet | ✅ |
| Sheet-ID in Webseite eintragen | `js/app.js` Zeile ~30 | ✅ |
| Forms-URL in Webseite eintragen | `js/app.js` Zeile ~33 | ✅ |

Danach pflegst du **alles nur noch im Google Sheet** – kein Code mehr anfassen.

---

## Schritt 1: Das Google Spreadsheet anlegen

1. Öffne [Google Drive](https://drive.google.com) → **Neu → Google Tabellen**
2. Benenne die Datei z.B. **„Funken – Inhalte"**
3. Unten siehst du Tabellenblätter (Tabs). Benenne Tab 1 in **`Galerie`** um
   *(Rechtsklick auf den Tab → Umbenennen)*
4. Füge in **Zeile 1** diese Spaltenüberschriften ein (genau so):

   | A | B | C | D | E | F | G | H |
   |---|---|---|---|---|---|---|---|
   | Titel | Autor | Kategorie | Beschreibung | Bild | Datum | Tags | Status |

5. Erstelle einen zweiten Tab: **`Impulse`** (Zeile 1 wie folgt)

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Titel | Beschreibung | Kategorie | Tag | Heute |

6. Erstelle einen dritten Tab: **`Einreichungen`** – leer lassen (wird automatisch befüllt)

---

## Schritt 2: Sheet als öffentlich veröffentlichen

Damit die Webseite die Inhalte lesen kann:

1. Menü: **Datei → Freigabe → Im Web veröffentlichen**
2. Wähle: **Gesamtes Dokument** → **Webseite**
3. Klicke **Veröffentlichen** → Bestätige mit „OK"

---

## Schritt 3: Die Sheet-ID herausfinden

Schau in die URL deines Spreadsheets:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
                                       ↑────────────────────────────────────────────────↑
                                       Das ist deine SHEET_ID
```
Kopiere diesen langen String. Du brauchst ihn in Schritt 5.

---

## Schritt 4: Apps Script einrichten (für E-Mails + automatisches Speichern)

1. Im Spreadsheet: Menü **Erweiterungen → Apps Script**
2. Ein neues Fenster öffnet sich. Lösche **alles** dort stehende.
3. Öffne die Datei `setup/apps-script.gs` (in deinem Website-Ordner) und **kopiere den gesamten Inhalt**
4. Füge ihn in das Apps Script Fenster ein
5. Ersetze:
   - `DEINE_SPREADSHEET_ID` → deine ID aus Schritt 3
   - `hallo@funken-projekt.de` → deine echte E-Mail-Adresse
6. Klicke oben auf das **Speichern-Symbol** (💾)
7. Klicke **Bereitstellen → Neue Bereitstellung**
   - **Typ:** Web-App
   - **Ausführen als:** Ich (deine Google-Adresse)
   - **Zugriff:** Jeder
8. Klicke **Bereitstellen** und erteile die nötigen Berechtigungen
9. **Kopiere die Web-App-URL** – du brauchst sie gleich

---

## Schritt 5: URLs in die Webseite eintragen

Öffne die Datei **`js/app.js`** (im WebsiteJane-Ordner) und suche ganz oben die Zeilen:

```javascript
SHEET_ID:      'DEINE_SPREADSHEET_ID',
FORM_ENDPOINT: 'DEIN_APPS_SCRIPT_URL',
```

Ersetze:
- `DEINE_SPREADSHEET_ID` → deine ID aus Schritt 3
- `DEIN_APPS_SCRIPT_URL` → die URL aus Schritt 4

**Danach** im Terminal im WebsiteJane-Ordner ausführen:
```
npm run css:build
```

---

## Laufende Pflege: So funktioniert alles

### 🖼 Galerie befüllen (eigene Inhalte oder Einreichungen veröffentlichen)

**Tab: `Galerie`** – jede Zeile = eine Karte in der Galerie

| Spalte | Was reinschreiben | Beispiel |
|---|---|---|
| Titel | Name des Werks | Herbstnebel |
| Autor | Name oder Pseudonym | Petra M. |
| Kategorie | Genau einer dieser Werte: `Schreiben`, `Malen`, `Fotografie`, `Musik`, `Basteln`, `Bewegung` | Fotografie |
| Beschreibung | Kurzer Text (2–4 Sätze) | Ein stiller Morgen … |
| Bild | Link zum Bild (Google Fotos, Imgur o.ä.) | https://… |
| Datum | Datum im Format TT. Monat JJJJ | 12. März 2025 |
| Tags | Kommagetrennte Schlagwörter | natur, stille, herbst |
| Status | `veröffentlicht` oder leer lassen | veröffentlicht |

> 💡 **Tipp für Bilder:** Lade das Bild bei [Google Fotos](https://photos.google.com) hoch, öffne es, klicke auf die drei Punkte → „Link zum Foto kopieren". Diesen Link in die Bild-Spalte einfügen.
>
> Oder nutze [Imgur.com](https://imgur.com) (kein Account nötig): Bild hochladen → Rechtsklick auf Bild → „Link kopieren".

**Einreichungen von der Seite** landen automatisch im Tab `Einreichungen` mit Status `eingereicht`. Du kannst sie dort anschauen und die guten in den `Galerie`-Tab kopieren (oder direkt dort den Status auf `veröffentlicht` setzen).

---

### ✍️ Neue Impulse hinzufügen

**Tab: `Impulse`** – jede Zeile = ein Impuls-Kärtchen auf der Seite

| Spalte | Was reinschreiben | Beispiel |
|---|---|---|
| Titel | Kurzer Titel des Impulses | Mein Morgengedanke |
| Beschreibung | Aufgabe (2–3 Sätze) | Schreib drei Sätze über das, was du dir heute wünschst … |
| Kategorie | Genau einer: `Schreiben`, `Malen`, `Fotografie`, `Musik`, `Basteln`, `Bewegung` | Schreiben |
| Tag | Stimmungs-Label | Hoffnung |
| Heute | `ja` für den Impuls des Tages (max. 1 pro Kategorie) | ja |

> 💡 **Tipp:** Den „Impuls des Tages" wechselst du, indem du die `ja`-Einträge anpasst. Der bisherige bekommt wieder eine leere Zelle oder `nein`.

---

### 📬 Einreichungen sichten

1. Öffne das Google Sheet → Tab **`Einreichungen`**
2. Du siehst alle eingereichten Werke mit Datum, E-Mail, Text und Bild-Link
3. Wenn du ein Werk veröffentlichen möchtest:
   → Kopiere die Zeile in den **`Galerie`**-Tab
   → Ändere den Status in `Galerie` auf `veröffentlicht`
   → (Optional: schreibe der Person eine persönliche Nachricht)

---

## Häufige Fragen

**F: Die Galerie zeigt immer noch die Demo-Bilder.**
A: Kontrolliere, ob `SHEET_ID` in `js/app.js` wirklich deine echte ID ist (kein Leerzeichen!), und ob das Sheet veröffentlicht wurde (Schritt 2).

**F: Das Formular auf der Seite zeigt eine Fehlermeldung.**
A: Prüfe, ob `FORM_ENDPOINT` die richtige Apps Script URL enthält. Teste die URL im Browser – sie sollte „✦ Funken Apps Script läuft." anzeigen.

**F: Bestätigungsmails kommen nicht an.**
A: Das Apps Script muss Zugriff auf Gmail haben. Beim ersten Ausführen erscheint ein Berechtigungsdialog – diesen bestätigen.

**F: Ich sehe meine neuen Impulse nicht auf der Seite.**
A: Stelle sicher, dass der Spaltenname `Kategorie` exakt so geschrieben ist (Groß-/Kleinschreibung!), und dass der Kategorie-Wert exakt einem der 6 Werte entspricht.

