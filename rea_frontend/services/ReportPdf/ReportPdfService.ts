import { PdfReportParams } from "@/models";
import { jsPDF } from "jspdf";

// export class ReportService {
//   async generateAndSavePDF(params: ReportParams): Promise<string> {
//     const { chartDataUrl, transactions, selectedCities, outputPath } = params;

//     const doc = new jsPDF({ unit: "pt", format: "a4" });
//     doc.setFontSize(18);
//     doc.text("Raport Rynku Nieruchomości", 40, 60);
//     doc.setFontSize(10);
//     doc.setTextColor(100);
//     doc.text(
//       `Data wygenerowania: ${new Date().toLocaleDateString("pl-PL")}`,
//       40,
//       80
//     );

//     doc.setFontSize(14);
//     doc.setTextColor(0);
//     doc.text(`Analiza Rynku - ${selectedCities.join(", ")}`, 40, 120);

//     doc.addImage(chartDataUrl, "PNG", 40, 140, 520, 300, undefined, "FAST");

//     doc.addPage();
//     doc.setFontSize(14);
//     doc.text("Ostatnie Transakcje", 40, 60);

//     (doc as any).autoTable({
//       startY: 80,
//       head: [["Nieruchomość", "Lokalizacja", "Data", "Cena", "Status"]],
//       body: transactions.map((t) => [
//         t.property,
//         t.location,
//         t.date,
//         `${parseInt(t.price, 10).toLocaleString("pl-PL")} zł`,
//         t.status,
//       ]),
//       headStyles: { fillColor: [38, 107, 214] },
//       styles: { fontSize: 10 },
//       margin: { left: 40, right: 40 },
//     });

//     const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
//     const fullPath = path.resolve(outputPath);
//     await fs.writeFile(fullPath, pdfBuffer);

//     return fullPath;
//   }
// }

export const generateReport = (params: PdfReportParams) => {
  const { chartDataUrl, transactions, selectedCities } = params
  const doc = new jsPDF({ unit: "pt", format: "a4" })

  doc.setFontSize(18)
  doc.text("Raport Rynku Nieruchomości", 40, 60)
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(
    `Data wygenerowania: ${new Date().toLocaleDateString("pl-PL")}`,
    40,
    80
  )
  doc.setFontSize(14)
  doc.setTextColor(0)
  doc.text(`Analiza Rynku - ${selectedCities.join(", ")}`, 40, 120)
  doc.addImage(chartDataUrl, "PNG", 40, 140, 520, 300, undefined, "FAST")

  doc.addPage()
  doc.setFontSize(14)
  doc.text("Ostatnie Transakcje", 40, 60)
  ;(doc as any).autoTable({
    startY: 80,
    head: [["Nieruchomość", "Lokalizacja", "Data", "Cena", "Status"]],
    body: transactions.map(t => [
      t.property,
      t.location,
      t.date,
      `${parseInt(t.price, 10).toLocaleString("pl-PL")} zł`,
      t.status,
    ]),
    headStyles: { fillColor: [38, 107, 214] },
    styles: { fontSize: 10 },
    margin: { left: 40, right: 40 },
  })

  return doc
}