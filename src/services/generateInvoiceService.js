import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/awsConfig.js";  // Fixed path
import { AWS_BUCKET_NAME } from "../config/serverConfig.js";  // Fixed path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate and upload invoice for an order
 * @param {Object} orderData - The order data object
 * @returns {Promise<string>} - S3 URL of the uploaded invoice
 */
export const generateAndUploadInvoice = async (orderData) => {
    try {
        // Create invoices directory if it doesn't exist
        const invoicesDir = path.join(__dirname, '..', 'temp_invoices');
        if (!fs.existsSync(invoicesDir)) {
            fs.mkdirSync(invoicesDir, { recursive: true });
        }

        // Generate unique filename
        const fileName = `invoice_${orderData.orderId}_${Date.now()}.pdf`;
        const filePath = path.join(invoicesDir, fileName);

        console.log('Generating invoice at:', filePath);

        // Create PDF
        await createInvoicePDF(orderData, filePath);

        // Upload to S3
        const s3Url = await uploadInvoiceToS3(filePath, fileName);

        console.log('Invoice generated and uploaded successfully:', s3Url);
        return s3Url;
    } catch (error) {
        console.error('Error generating invoice:', error);
        throw new Error('Failed to generate invoice: ' + error.message);
    }
};

/**
 * Create invoice PDF
 */
const createInvoicePDF = (orderData, filePath) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Creating invoice PDF for order:', orderData);
            const doc = new PDFDocument({ margin: 50, size: 'A4' });
            const stream = fs.createWriteStream(filePath);

            doc.pipe(stream);

            // Header
            doc.fontSize(24)
               .fillColor('#2c3e50')
               .text('INVOICE', 50, 50, { align: 'center' });

            // Company Info (customize as needed)
            doc.fontSize(10)
               .fillColor('#7f8c8d')
               .text('ACRUX SHOP', 50, 90)
               .text('Phone: +8801308892055', 50, 135);

            // Invoice Details Box
            const invoiceBoxTop = 90;
            doc.fontSize(10)
               .fillColor('#2c3e50')
               .text(`Invoice #: ${orderData.orderId}`, 350, invoiceBoxTop, { align: 'right' })
               .fillColor('#7f8c8d')
               .text(`Date: ${new Date(orderData.createdAt || new Date()).toLocaleDateString('en-GB')}`, 350, invoiceBoxTop + 15, { align: 'right' })

            // Horizontal line
            doc.moveTo(50, 170)
               .lineTo(545, 170)
               .strokeColor('#bdc3c7')
               .stroke();

            // Customer Details
            doc.fontSize(12)
               .fillColor('#2c3e50')
               .text('Bill To:', 50, 190);

            doc.fontSize(10)
               .fillColor('#34495e')
               .text(orderData.customerName, 50, 210)
               .text(`Phone: ${orderData.customerPhone}`, 50, 225)
               .text(`Area: ${orderData.area}`, 50, 240)
               .text('Address:', 50, 255)
               .fontSize(9)
               .text(orderData.deliverAddress || '', 50, 270, { width: 250 });

            // Products Table
            const tableTop = 320;
            
            // Table Header
            doc.fontSize(10)
               .fillColor('#ffffff')
               .rect(50, tableTop, 495, 25)
               .fill('#34495e');

            doc.fillColor('#ffffff')
               .text('Product', 60, tableTop + 7)
               .text('Price', 330, tableTop + 7, { width: 70, align: 'right' })
               .text('Qty', 410, tableTop + 7, { width: 50, align: 'center' })
               .text('Total', 470, tableTop + 7, { width: 65, align: 'right' });

            // Table Rows
            let yPosition = tableTop + 30;
            doc.fillColor('#2c3e50');

            orderData.products.forEach((product, index) => {
                const itemTotal = product.productPrice * product.productQuantity;
                
                // Alternate row background
                if (index % 2 === 0) {
                    doc.rect(50, yPosition - 5, 495, 25)
                       .fill('#ecf0f1');
                    doc.fillColor('#2c3e50');
                }

                doc.fontSize(9)
                   .text(product.productName, 60, yPosition, { width: 260 })
                   .text(product.productPrice.toString(), 330, yPosition, { width: 70, align: 'right' })
                   .text(product.productQuantity.toString(), 410, yPosition, { width: 50, align: 'center' })
                   .text(itemTotal.toString(), 470, yPosition, { width: 65, align: 'right' });

                yPosition += 25;
            });

            // Total Section
            yPosition += 20;
            doc.moveTo(50, yPosition)
               .lineTo(545, yPosition)
               .strokeColor('#bdc3c7')
               .stroke();

            yPosition += 15;

            // Subtotal
            const subtotal = orderData.totalAmount || 0;
            doc.fontSize(10)
               .fillColor('#2c3e50')
               .text('Subtotal:', 380, yPosition)
               .text(subtotal.toString(), 470, yPosition, { width: 65, align: 'right' });

            // Total (with background)
            yPosition += 25;
            doc.rect(350, yPosition - 5, 195, 25)
               .fill('#3498db');
            
            doc.fontSize(12)
               .fillColor('#ffffff')
               .text('Total Amount:', 360, yPosition)
               .text(orderData.totalAmount.toString(), 470, yPosition, { width: 65, align: 'right' });

            // Notes Section
            if (orderData.notes && orderData.notes.trim() !== '') {
                yPosition += 50;
                doc.fontSize(10)
                   .fillColor('#2c3e50')
                   .text('Notes:', 50, yPosition);
                
                doc.fontSize(9)
                   .fillColor('#7f8c8d')
                   .text(orderData.notes, 50, yPosition + 15, { width: 495 });
            }

            // Footer
            const footerY = 750;
            doc.fontSize(8)
               .fillColor('#95a5a6')
               .text('Thank you for your business!', 50, footerY, { align: 'center', width: 495 })
               .text('This is a computer-generated invoice and does not require a signature.', 50, footerY + 15, { align: 'center', width: 495 });

            doc.end();

            stream.on('finish', () => {
                console.log('Invoice PDF created successfully at:', filePath);
                resolve(filePath);
            });

            stream.on('error', (error) => {
                console.error('Error creating PDF stream:', error);
                reject(error);
            });
        } catch (error) {
            console.error('Error in createInvoicePDF:', error);
            reject(error);
        }
    });
};

/**
 * Upload invoice to S3
 */
const uploadInvoiceToS3 = async (filePath, fileName) => {
    try {
        console.log('Uploading invoice to S3:', filePath);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const fileStream = fs.createReadStream(filePath);

        const s3Params = {
            Bucket: AWS_BUCKET_NAME,
            Key: `invoices/${fileName}`,
            Body: fileStream,
            ContentType: 'application/pdf',
            ContentDisposition: 'inline'
        };

        const uploadCommand = new PutObjectCommand(s3Params);
        const result = await s3.send(uploadCommand);
        
        console.log('S3 upload result:', result);

        // Delete local file after successful upload
        fs.unlinkSync(filePath);
        console.log('Local file deleted:', filePath);

        // Return S3 URL
        return `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`;
    } catch (error) {
        console.error('Error uploading invoice to S3:', error);
        
        // Clean up local file on error
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        throw new Error('Failed to upload invoice to S3: ' + error.message);
    }
};

// Export for use in order service
export default generateAndUploadInvoice;