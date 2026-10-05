import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateRzPdf() {
  const pdfDoc = await PDFDocument.create();
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ── PAGE 1: EXACT MATCH TO UPLOADED XFA NOTICE PAGE ──
  const page1 = pdfDoc.addPage([612, 792]);
  const { width, height } = page1.getSize();

  page1.drawText('Please wait...', {
    x: 72,
    y: height - 100,
    size: 24,
    font: timesRoman,
    color: rgb(0, 0, 0),
  });

  const p1 = "If this message is not eventually replaced by the proper contents of the document, your PDF viewer may not be able to display this type of document.";
  page1.drawText(p1, {
    x: 72,
    y: height - 145,
    size: 11,
    font: timesRoman,
    color: rgb(0, 0, 0),
    maxWidth: 468,
    lineHeight: 15,
  });

  const p2 = "You can upgrade to the latest version of Adobe Reader for Windows®, Mac, or Linux® by visiting http://www.adobe.com/go/reader_download.";
  page1.drawText(p2, {
    x: 72,
    y: height - 190,
    size: 11,
    font: timesRoman,
    color: rgb(0, 0, 0),
    maxWidth: 468,
    lineHeight: 15,
  });

  const p3 = "For more assistance with Adobe Reader visit http://www.adobe.com/go/acrreader.";
  page1.drawText(p3, {
    x: 72,
    y: height - 235,
    size: 11,
    font: timesRoman,
    color: rgb(0, 0, 0),
    maxWidth: 468,
    lineHeight: 15,
  });

  const footerNotice = "Windows is either a registered trademark or a trademark of Microsoft Corporation in the United States and/or other countries. Mac is a trademark of Apple Inc., registered in the United States and other countries. Linux is the registered trademark of Linus Torvalds in the U.S. and other countries.";
  page1.drawText(footerNotice, {
    x: 72,
    y: height - 270,
    size: 7.5,
    font: timesRoman,
    color: rgb(0.2, 0.2, 0.2),
    maxWidth: 468,
    lineHeight: 10,
  });

  // ── PAGE 2: 7-DAY RECRUITING ZONE MISSION PLANNER & BATTLE RHYTHM (MON-FRI 0800-1700) ──
  const page2 = pdfDoc.addPage([612, 792]);
  
  page2.drawText('ARMY NATIONAL GUARD', {
    x: 72,
    y: height - 50,
    size: 9.5,
    font: helveticaBold,
    color: rgb(0.5, 0.45, 0.3),
  });

  page2.drawText('RZ MISSION PLANNER & BATTLE RHYTHM', {
    x: 72,
    y: height - 68,
    size: 15,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  page2.drawText('Duty Schedule: Monday - Friday 0800-1700 | Pacing: 25 Calls/Hr - 5 F2F Attempts/Hr', {
    x: 72,
    y: height - 83,
    size: 8.5,
    font: helveticaBold,
    color: rgb(0.65, 0.45, 0.15),
  });

  page2.drawLine({
    start: { x: 72, y: height - 90 },
    end: { x: 540, y: height - 90 },
    thickness: 1,
    color: rgb(0.7, 0.65, 0.5),
  });

  // Header Details Box
  page2.drawRectangle({
    x: 72,
    y: height - 138,
    width: 468,
    height: 40,
    borderWidth: 1,
    borderColor: rgb(0.8, 0.8, 0.8),
    color: rgb(0.97, 0.97, 0.96),
  });

  page2.drawText('Assigned High Schools & Colleges: ________________    Monthly Production Mission: ________________', {
    x: 82,
    y: height - 116,
    size: 8.5,
    font: helvetica,
    color: rgb(0.15, 0.15, 0.15),
  });

  // Table Title
  page2.drawText('WEEKLY BATTLE RHYTHM SCHEDULE (MONDAY - FRIDAY 0800-1700)', {
    x: 72,
    y: height - 156,
    size: 10,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  const days = [
    { day: "Mon (0800-1700)", am: "Lead input (ARISS/RZ), MEPS line-up, Section cadence with 1SG", noon: "School Visit: High School A (Lunch Table, Coach & Counselor meetings)", pm: "Telephone Prospecting Block (25 calls/hr) & Scheduled Applicant Interview", target: "50 Calls | 10 F2F" },
    { day: "Tue (0800-1700)", am: "Packet audits, Medical prescreen waivers, Police background checks", noon: "Area Canvassing: Vocational Trade School & Community College touchpoint", pm: "Telephone Prospecting Block (25 calls/hr) & Scheduled Parent Interview", target: "50 Calls | 10 F2F" },
    { day: "Wed (0800-1700)", am: "Applicant packet submission to MEPS, ASVAB/PiCAT confirmation", noon: "School Visit: High School B (Classroom presentation & Guidance touchpoint)", pm: "Telephone Prospecting Block (25 calls/hr) & In-office Sales Interview", target: "50 Calls | 10 F2F" },
    { day: "Thu (0800-1700)", am: "MEPS Processing Day: Physical exam monitoring & swear-in coordination", noon: "Area Canvassing: Community fitness gym, sports center & local COI visit", pm: "Telephone Prospecting Block (25 calls/hr) & Scheduled Applicant Interview", target: "50 Calls | 10 F2F" },
    { day: "Fri (0800-1700)", am: "Post-MEPS accession packet audits, Weekend muster confirmations", noon: "High School A/B: Athletic department event coordination & display prep", pm: "Weekly production reconciliation, 1SG Sync, & Monday confirmations", target: "38 Calls | 8 F2F" },
    { day: "Sat (Non-Duty)", am: "RSP Drill coordination (as scheduled) or Off-Duty Personal Recovery", noon: "Optional community event / promotional booth presence", pm: "Non-duty personal time", target: "Recovery / Drill" },
    { day: "Sun (Non-Duty)", am: "Personal recovery & spiritual fitness", noon: "Family time & administrative readiness", pm: "Confirm Monday morning MEPS applicant transportation & 0800 arrival", target: "Non-Duty" },
  ];

  let currentY = height - 182;
  
  // Table Header
  page2.drawRectangle({
    x: 72,
    y: currentY - 14,
    width: 468,
    height: 16,
    color: rgb(0.7, 0.65, 0.5),
  });

  page2.drawText('DAY / DUTY HOURS', { x: 76, y: currentY - 10, size: 7.5, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
  page2.drawText('MORNING (0800-1130)', { x: 160, y: currentY - 10, size: 7.5, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
  page2.drawText('MIDDAY (1130-1430) [5 F2F/HR]', { x: 285, y: currentY - 10, size: 7.5, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });
  page2.drawText('AFTERNOON (1430-1700) [25 CALLS/HR]', { x: 415, y: currentY - 10, size: 7.5, font: helveticaBold, color: rgb(0.1, 0.1, 0.1) });

  currentY -= 18;

  days.forEach((d, index) => {
    const isEven = index % 2 === 0;
    const isWorkday = index < 5;
    const rowHeight = 44;
    
    page2.drawRectangle({
      x: 72,
      y: currentY - rowHeight + 10,
      width: 468,
      height: rowHeight,
      color: isWorkday ? (isEven ? rgb(0.96, 0.96, 0.95) : rgb(1, 1, 1)) : rgb(0.93, 0.93, 0.92),
      borderColor: rgb(0.85, 0.85, 0.85),
      borderWidth: 0.5,
    });

    page2.drawText(d.day, { x: 76, y: currentY - 2, size: 7.5, font: helveticaBold, color: isWorkday ? rgb(0.1, 0.1, 0.1) : rgb(0.4, 0.4, 0.4) });
    page2.drawText(d.target, { x: 76, y: currentY - 14, size: 7, font: helveticaBold, color: isWorkday ? rgb(0.65, 0.45, 0.15) : rgb(0.5, 0.5, 0.5) });

    page2.drawText(d.am, { x: 160, y: currentY - 5, size: 7, font: helvetica, color: rgb(0.2, 0.2, 0.2), maxWidth: 120, lineHeight: 9 });
    page2.drawText(d.noon, { x: 285, y: currentY - 5, size: 7, font: helvetica, color: rgb(0.2, 0.2, 0.2), maxWidth: 125, lineHeight: 9 });
    page2.drawText(d.pm, { x: 415, y: currentY - 5, size: 7, font: helvetica, color: rgb(0.2, 0.2, 0.2), maxWidth: 120, lineHeight: 9 });

    currentY -= rowHeight;
  });

  // Footer section on Page 2: Pacing metrics
  page2.drawRectangle({
    x: 72,
    y: currentY - 60,
    width: 468,
    height: 56,
    borderWidth: 1,
    borderColor: rgb(0.8, 0.75, 0.6),
    color: rgb(0.98, 0.97, 0.95),
  });

  page2.drawText('MANDATED SMTB PRODUCTION PACING STANDARDS:', {
    x: 82,
    y: currentY - 16,
    size: 8,
    font: helveticaBold,
    color: rgb(0.5, 0.4, 0.2),
  });

  page2.drawText('1. Telephone Prospecting: 25 Phone Call Attempts per Hour (uninterrupted dialing block).', {
    x: 82,
    y: currentY - 28,
    size: 7.5,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });

  page2.drawText('2. Area Canvassing: 5 Face-to-Face Attempts per Hour (high school lunch tables & community visits).', {
    x: 82,
    y: currentY - 39,
    size: 7.5,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  });

  page2.drawText('Weekly Mon-Fri Math: 9.5h Phone (238 calls) + 9.5h F2F (48 attempts) -> 9-10 Interviews -> 2-3 Enlistments.', {
    x: 82,
    y: currentY - 50,
    size: 7.5,
    font: helveticaBold,
    color: rgb(0.6, 0.4, 0.1),
  });

  const pdfBytes = await pdfDoc.save();

  const outDir = path.resolve('public/documents');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outFile = path.join(outDir, 'RZ_MISSION_PLANNER_AND_BATTLE_RHYTHM.pdf');
  fs.writeFileSync(outFile, pdfBytes);
  console.log('Successfully generated updated PDF:', outFile);
}

generateRzPdf().catch(err => {
  console.error(err);
  process.exit(1);
});
