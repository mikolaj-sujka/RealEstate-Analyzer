// src/hooks/usePDFBuilder.ts
import jsPDF from 'jspdf';
import autoTable, { applyPlugin } from 'jspdf-autotable';
import { format } from 'date-fns';
import { ChartSection, ReportSection, TableSection } from '@/models';

export class PDFBuilder {
  doc: jsPDF;
  currentY: number;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.currentY = 0;

    // opcjonalnie: jeśli ktoś chce używać doc.autoTable(...) zamiast autoTable(doc,...)
    // można odkomentować poniższą linię:
    // applyPlugin(this.doc.constructor as any); // nie zawsze potrzebne; alternatywnie: applyPlugin(jsPDF);
  }

  addTitlePage(title: string, subtitle?: string, createdAt?: Date) {
    const pageWidth = this.doc.internal.pageSize.getWidth();
    this.doc.setFontSize(24);
    this.doc.text(title, pageWidth / 2, 40, { align: 'center' });
    if (subtitle) {
      this.doc.setFontSize(14);
      this.doc.text(subtitle, pageWidth / 2, 50, { align: 'center' });
    }
    this.doc.setFontSize(10);
    this.doc.text(
      `Data generacji: ${format(createdAt || new Date(), 'yyyy-MM-dd')}`,
      pageWidth / 2,
      60,
      { align: 'center' }
    );
    this.doc.addPage();
    this.currentY = 20;
  }

  async addChartSection(section: ChartSection) {
    this.doc.setFontSize(18);
    this.doc.text(section.title, 14, this.currentY);
    if (section.subtitle) {
      this.doc.setFontSize(12);
      this.doc.text(section.subtitle, 14, this.currentY + 8);
    }
    this.currentY += 16;

    try {
      const img = await section.getImage();
      this.doc.addImage(img, 'PNG', 14, this.currentY, 180, 100);
      this.currentY += 105;
    } catch (e) {
      this.doc.setFontSize(10);
      this.doc.text('Nie udało się załadować wykresu.', 14, this.currentY);
      this.currentY += 10;
    }

    this.doc.addPage();
    this.currentY = 20;
  }

  addTableSection(section: TableSection) {
    this.doc.setFontSize(18);
    this.doc.text(section.title, 14, this.currentY);
    if (section.subtitle) {
      this.doc.setFontSize(12);
      this.doc.text(section.subtitle, 14, this.currentY + 8);
    }
    this.currentY += 16;

    const head = [section.columns.map((c) => c.header)];
    const body = section.data.map((row) =>
      section.columns.map((col) => {
        const raw = row[col.key];
        if (col.render) return col.render(raw, row);
        return String(raw ?? '');
      })
    );

    // poprawne wywołanie autoTable zgodnie z dokumentacją. :contentReference[oaicite:1]{index=1}
    autoTable(this.doc as any, {
      startY: this.currentY,
      head: head as any,
      body: body as any,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
        halign: 'center',
      },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // aktualizacja currentY na podstawie ostatniej wstawionej tabeli
    // autoTable zapisuje meta w lastAutoTable; guard na wypadek nieistnienia
    // @ts-ignore
    this.currentY = (this.doc as any).lastAutoTable?.finalY || this.currentY + 30;

    this.doc.addPage();
    this.currentY = 20;
  }

  async applySection(section: ReportSection) {
    switch (section.type) {
      case 'chart':
        await this.addChartSection(section);
        break;
      case 'table':
        this.addTableSection(section);
        break;
      default:
        break;
    }
  }

  save(fileName: string) {
    this.doc.save(fileName);
  }

  getBlob() {
    return this.doc.output('blob');
  }

  getDataUrl() {
    return this.doc.output('dataurlstring');
  }
}
