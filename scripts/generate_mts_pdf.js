import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { MASTER_TRAINING_SCHEDULE } from '../src/data/masterScheduleData.js';

async function generateMtsPdf() {
  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Split the 25 days into pages: 5 days per page (exactly matching the 5 pages of the attached schedule!)
  for (let week = 1; week <= 5; week++) {
    const page = pdfDoc.addPage([792, 612]); // Landscape Letter size matching the attached document
    const { width, height } = page.getSize();
    const startDay = (week - 1) * 5 + 1;
    const endDay = week * 5;

    // Table Header
    page.drawRectangle({
      x: 36,
      y: height - 45,
      width: width - 72,
      height: 22,
      color: rgb(0, 0, 0),
    });

    page.drawText('DATE | TIME', { x: 44, y: height - 39, size: 8, font: helveticaBold, color: rgb(1, 1, 1) });
    page.drawText('SUBJECT', { x: 180, y: height - 39, size: 8, font: helveticaBold, color: rgb(1, 1, 1) });
    page.drawText('REFERENCE', { x: 440, y: height - 39, size: 8, font: helveticaBold, color: rgb(1, 1, 1) });
    page.drawText('HRS', { x: 610, y: height - 39, size: 8, font: helveticaBold, color: rgb(1, 1, 1) });
    page.drawText('INSTRUCTOR', { x: 650, y: height - 39, size: 8, font: helveticaBold, color: rgb(1, 1, 1) });
    page.drawText('LOCATION', { x: 720, y: height - 39, size: 8, font: helveticaBold, color: rgb(1, 1, 1) });

    let currentY = height - 48;

    for (let dayNum = startDay; dayNum <= endDay; dayNum++) {
      const periods = MASTER_TRAINING_SCHEDULE.filter(p => p.dayNumber === dayNum);
      if (periods.length === 0) continue;

      const firstPeriod = periods[0];

      // Day Title Strip (Yellow banner matching attached PDF)
      page.drawRectangle({
        x: 36,
        y: currentY - 14,
        width: width - 72,
        height: 14,
        color: rgb(0.98, 0.85, 0.2), // Yellow banner
      });

      page.drawText(`Day ${dayNum} / ${firstPeriod.dayOfWeek}`, {
        x: 44,
        y: currentY - 10,
        size: 7.5,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      page.drawText(firstPeriod.dateStr, {
        x: 240,
        y: currentY - 10,
        size: 7.5,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });

      currentY -= 14;

      // Periods Rows
      periods.forEach((period, idx) => {
        const isEval = period.isEvaluation || period.isRetest;
        const rowHeight = 12.5;

        // Draw row background if evaluation or alternating
        if (isEval) {
          page.drawRectangle({
            x: 36,
            y: currentY - rowHeight,
            width: width - 72,
            height: rowHeight,
            color: rgb(0.98, 0.94, 0.94),
          });
        }

        // Draw borders
        page.drawRectangle({
          x: 36,
          y: currentY - rowHeight,
          width: width - 72,
          height: rowHeight,
          borderWidth: 0.3,
          borderColor: rgb(0.7, 0.7, 0.7),
        });

        const fontToUse = isEval ? helveticaBold : helvetica;
        const textColor = isEval ? rgb(0.8, 0.1, 0.1) : rgb(0.1, 0.1, 0.1);

        page.drawText(period.time, { x: 44, y: currentY - 9, size: 6.5, font: fontToUse, color: textColor });
        page.drawText(period.subject.slice(0, 65), { x: 140, y: currentY - 9, size: 6.5, font: fontToUse, color: textColor });
        page.drawText(period.reference.slice(0, 42), { x: 440, y: currentY - 9, size: 6, font: helvetica, color: rgb(0.2, 0.2, 0.2) });
        page.drawText(period.hours, { x: 610, y: currentY - 9, size: 6, font: helvetica, color: rgb(0.2, 0.2, 0.2) });
        page.drawText(period.instructor.slice(0, 16), { x: 650, y: currentY - 9, size: 6, font: helvetica, color: rgb(0.2, 0.2, 0.2) });
        page.drawText(period.location.slice(0, 18), { x: 720, y: currentY - 9, size: 6, font: helvetica, color: rgb(0.2, 0.2, 0.2) });

        currentY -= rowHeight;
      });
    }

    // Page Number Footer
    page.drawText(`Page ${week}`, {
      x: width / 2 - 15,
      y: 18,
      size: 8,
      font: helveticaBold,
      color: rgb(0.2, 0.2, 0.2),
    });
  }

  const pdfBytes = await pdfDoc.save();

  const outDir = path.resolve('public/documents');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outFile = path.join(outDir, 'NCRC_27-001_Master_Training_Schedule.pdf');
  fs.writeFileSync(outFile, pdfBytes);
  console.log('Successfully generated MTS PDF:', outFile);
}

generateMtsPdf().catch(err => {
  console.error(err);
  process.exit(1);
});
