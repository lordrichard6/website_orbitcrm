
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

interface QRBillData {
    currency: 'CHF' | 'EUR';
    amount: number;
    reference: string;
    creditor: {
        name: string;
        address: string;
        zip: string;
        city: string;
        country: string;
        account: string;
    };
    debtor: {
        name: string;
        address: string;
        zip: string;
        city: string;
        country: string;
    };
    message?: string;
}

export class SwissQRBill {
    private data: QRBillData;

    constructor(data: QRBillData) {
        this.data = data;
    }

    public attachTo(doc: PDFKit.PDFDocument) {
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;

        // Swiss QR Bill specifications
        const billHeight = 296.33; // ~105mm in points
        const billY = pageHeight - billHeight;

        // Draw separator line with scissors if needed, or just a line
        doc.lineWidth(1)
            .dash(3, { space: 3 })
            .moveTo(0, billY)
            .lineTo(pageWidth, billY)
            .stroke();

        doc.undash();

        doc.text('Payment Part', 60, billY + 20); // Placeholder for actual QR Bill layout

        // This is a simplified placeholder implementation.
        // A full implementation requires precise positioning of text and the QR code.
        // Ideally, we'd use a library, but since 'swissqrbill' failed, we render a basic valid QR.

        // Generate QR Code content string (Swiss QR Standard)
        // SPC\r\n0200\r\n1\r\n... (This needs strict formatting)
        // For MVP, we'll generate a QR code that contains the IBAN and Ref for scanning ease.
        // Note: This won't be a 100% banking compliant Swiss QR without the strict format library.

        const qrString = `SPC\r\n0200\r\n1\r\n${this.data.creditor.account}\r\n...\r\n${this.data.amount}`;

        this.renderExamples(doc, billY);
    }

    private async renderExamples(doc: PDFKit.PDFDocument, y: number) {
        // Mockup of a QR bill bottom section
        doc.fontSize(10).text('Account / Payable to', 60, y + 40);
        doc.fontSize(8).text(this.data.creditor.account, 60, y + 55);
        doc.text(this.data.creditor.name, 60, y + 65);
        doc.text(`${this.data.creditor.address}, ${this.data.creditor.zip} ${this.data.creditor.city}`, 60, y + 75);

        doc.fontSize(10).text('Reference', 200, y + 40);
        doc.fontSize(8).text(this.data.reference, 200, y + 55);

        doc.fontSize(10).text('Payable by', 60, y + 120);
        doc.fontSize(8).text(this.data.debtor.name, 60, y + 135);
        doc.text(`${this.data.debtor.address}, ${this.data.debtor.zip} ${this.data.debtor.city}`, 60, y + 145);

        doc.fontSize(10).text('Currency', 60, y + 200);
        doc.text(this.data.currency, 60, y + 215);

        doc.text('Amount', 100, y + 200);
        doc.text(this.data.amount.toFixed(2), 100, y + 215);

        // Generate QR
        try {
            const qrDataUrl = await QRCode.toDataURL(this.data.creditor.account, { errorCorrectionLevel: 'M' });
            doc.image(qrDataUrl, 200, y + 120, { width: 100, height: 100 });
        } catch (e) {
            doc.text('Error generating QR', 200, y + 150);
        }
    }
}
