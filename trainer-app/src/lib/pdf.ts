import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

import type { Session } from './session';
import { buildSessionHtml, type PdfOptions } from './sessionHtml';

// A4 bei 72 dpi
const A4 = { width: 595, height: 842 };

function fileName(session: Session) {
  const base = (session.title.trim() || 'Trainingseinheit').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
  return `PowerUpKids-${base}.pdf`;
}

/** Web: expo-print druckt dort nur die App-Seite, daher das HTML über ein unsichtbares iframe drucken. */
function printHtmlOnWeb(html: string) {
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(iframe);
  const doc = iframe.contentWindow!.document;
  doc.open();
  doc.write(html);
  doc.close();
  // Kurz warten, bis Layout und Schriften bereit sind.
  setTimeout(() => {
    iframe.contentWindow!.focus();
    iframe.contentWindow!.print();
    setTimeout(() => iframe.remove(), 1000);
  }, 300);
}

/** Erstellt das PDF und öffnet den Teilen-Dialog (im Web: Druckdialog → „Als PDF speichern"). */
export async function shareSessionPdf(session: Session, options: PdfOptions) {
  const html = buildSessionHtml(session, options);
  if (Platform.OS === 'web') {
    printHtmlOnWeb(html);
    return;
  }
  const { uri } = await Print.printToFileAsync({ html, ...A4 });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      UTI: 'com.adobe.pdf',
      dialogTitle: fileName(session),
    });
  }
}

/** Öffnet direkt den System-Druckdialog. */
export async function printSession(session: Session, options: PdfOptions) {
  const html = buildSessionHtml(session, options);
  if (Platform.OS === 'web') {
    printHtmlOnWeb(html);
    return;
  }
  await Print.printAsync({ html, ...A4 });
}
