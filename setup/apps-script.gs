/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  Funken – Google Apps Script                                  ║
 * ║  Dieses Skript speichert Einreichungen und sendet E-Mails.    ║
 * ╚═══════════════════════════════════════════════════════════════╝
 *
 * EINRICHTUNG (einmalig, ca. 5 Minuten):
 * ───────────────────────────────────────
 * 1. Öffne dein Google Spreadsheet (das Galerie-Sheet)
 * 2. Menü: Erweiterungen → Apps Script
 * 3. Lösche den vorhandenen Code und füge diesen hier ein
 * 4. Ersetze SPREADSHEET_ID und JANE_EMAIL mit deinen Werten
 * 5. Klicke auf „Speichern" (Disketten-Symbol)
 * 6. Klicke auf „Bereitstellen" → „Neue Bereitstellung"
 *    - Typ: Web-App
 *    - Ausführen als: Ich (deine Google-Adresse)
 *    - Zugriff: Jeder
 * 7. Klicke auf „Bereitstellen" und kopiere die Web-App-URL
 * 8. Füge diese URL in js/app.js bei CONFIG.FORM_ENDPOINT ein
 */

// ─── Konfiguration ───────────────────────────────────────────────
const SPREADSHEET_ID = 'DEINE_SPREADSHEET_ID';  // Aus der Sheet-URL
const EINREICHUNGEN_TAB = 'Einreichungen';       // Tabellenblatt-Name
const JANE_EMAIL = 'hallo@funken-projekt.de';    // Janes E-Mail-Adresse

// ─── Haupt-Handler: Einreichung entgegennehmen ───────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. In Google Sheet speichern
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(EINREICHUNGEN_TAB)
                 || ss.insertSheet(EINREICHUNGEN_TAB);

    // Kopfzeile anlegen, falls das Sheet neu ist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Datum', 'Name', 'Email', 'Kategorie', 'Titel',
                       'Beschreibung', 'Bild', 'Tags', 'Status']);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    }

    // Datensatz einfügen (Status "eingereicht" → Admin ändert auf "veröffentlicht")
    sheet.appendRow([
      new Date(),
      data.name        || '',
      data.email       || '',
      data.kategorie   || '',
      data.titel       || '',
      data.beschreibung|| '',
      data.bild        || '',
      data.tags        || '',
      'eingereicht',
    ]);

    // 2. Bestätigungsmail an Einreicher/in
    if (data.email) {
      GmailApp.sendEmail(
        data.email,
        '✦ Deine Einreichung bei Funken ist angekommen!',
        '', // plain text (wird durch HTML ersetzt)
        {
          htmlBody: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #3d2e22;">
              <h2 style="color: #8aaa8e; font-size: 1.4rem; margin-bottom: 0.5rem;">
                Danke, ${data.name}! ✦
              </h2>
              <p style="line-height: 1.7; color: #7a6855;">
                Deine Einreichung <strong>„${data.titel}"</strong>
                (Kategorie: ${data.kategorie}) ist sicher bei mir angekommen.
              </p>
              <p style="line-height: 1.7; color: #7a6855;">
                Ich sichte alle Werke persönlich und mit Sorgfalt.
                Wenn dein Werk in der Galerie erscheint, bekommst du eine Nachricht von mir.
              </p>
              <hr style="border: none; border-top: 1px solid #e4d8cc; margin: 1.5rem 0;">
              <p style="font-size: 0.85rem; color: #a09080;">
                Mit herzlichen Grüßen,<br>
                <strong style="color: #5c7a5e;">Jane Spiekermann</strong><br>
                <a href="https://funken-projekt.de" style="color: #c4956a;">funken-projekt.de</a>
              </p>
            </div>
          `,
          name: 'Jane Spiekermann – Funken',
          replyTo: JANE_EMAIL,
        }
      );
    }

    // 3. Benachrichtigung an Jane
    GmailApp.sendEmail(
      JANE_EMAIL,
      `✦ Neue Einreichung: „${data.titel}" (${data.kategorie})`,
      '', // plain text (wird durch HTML ersetzt)
      {
        htmlBody: `
          <div style="font-family: Georgia, serif; max-width: 560px; color: #3d2e22;">
            <h2 style="color: #c4956a;">Neue Einreichung! ✦</h2>
            <table style="border-collapse: collapse; width: 100%; font-size: 0.9rem;">
              <tr><td style="padding: 6px 12px; background: #f0e8de; font-weight: bold;">Name</td>     <td style="padding: 6px 12px;">${data.name}</td></tr>
              <tr><td style="padding: 6px 12px; font-weight: bold;">E-Mail</td>    <td style="padding: 6px 12px;">${data.email}</td></tr>
              <tr><td style="padding: 6px 12px; background: #f0e8de; font-weight: bold;">Kategorie</td><td style="padding: 6px 12px;">${data.kategorie}</td></tr>
              <tr><td style="padding: 6px 12px; font-weight: bold;">Titel</td>     <td style="padding: 6px 12px;"><strong>${data.titel}</strong></td></tr>
              <tr><td style="padding: 6px 12px; background: #f0e8de; font-weight: bold;">Beschreibung</td><td style="padding: 6px 12px;">${data.beschreibung}</td></tr>
              <tr><td style="padding: 6px 12px; font-weight: bold;">Bild-URL</td>  <td style="padding: 6px 12px;"><a href="${data.bild}">${data.bild || '–'}</a></td></tr>
            </table>
            <p style="margin-top: 1.5rem; font-size: 0.85rem; color: #7a6855;">
              → Öffne das
              <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}" style="color: #8aaa8e;">
                Google Sheet
              </a>
              und ändere den Status auf <strong>veröffentlicht</strong>,
              um das Werk in der Galerie zu zeigen.
            </p>
          </div>
        `,
      }
    );

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET-Handler (für einfachen Verbindungstest im Browser)
function doGet(e) {
  return ContentService
    .createTextOutput('✦ Funken Apps Script läuft.')
    .setMimeType(ContentService.MimeType.TEXT);
}

