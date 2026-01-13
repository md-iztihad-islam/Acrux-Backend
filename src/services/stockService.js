import fs from 'fs';
import PDFDocument from 'pdfkit';
import bwipjs from 'bwip-js';
import { s3Uploader, uploadPDFToS3 } from "../config/multerConfig.js";
import { getProductByProducIdRepository } from "../repositories/productRepository.js";
import { addStockRepository, deleteStockRepository, getAllStocksRepository, getSctockByProductIdRepository, getStockByIdRepository, getStockByProductIdWithoutPriceRepository, updateStockRepository } from "../repositories/stockRepository.js";

export const addStockService = async (stockData) => {
    try {
        console.log("Stock Data in Service:", stockData);
        const product = await getProductByProducIdRepository(stockData.productId);
        if(!product){
            throw new Error("Product not found for the given productId");
        }

        stockData.product_Id = product[0]._id;
        stockData.remainingQuantity = stockData.quantity;
        const stock = await addStockRepository(stockData);

        const stockDocument = await getStockByIdRepository(stock._id);
        const pdfFilePath = await generateBarcodePDF(stockDocument);

        const barcodePdfUrlPath = await uploadPDFToS3(pdfFilePath);

        stockDocument.barcodePdfUrl = barcodePdfUrlPath;
        await stockDocument.save();

        return stock;
    } catch (error) {
        console.log("Error in addStockService:", error);
        throw new Error("Could not add stock from service due to " + error);
    }
}


// Function to generate PDF with barcodes for each serial number
const generateBarcodePDF = async (stockDocument) => {
    const doc = new PDFDocument();
    const pdfFilePath = `./temp/barcodes_${stockDocument._id}.pdf`; // Temporary local path for the PDF file

    // Ensure the 'temp' directory exists before writing files
    if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp');
    }

    const stream = fs.createWriteStream(pdfFilePath);
    doc.pipe(stream);

    const barcodes = stockDocument.serialNumber; // Get the serial numbers of the stock

    // Define margins and barcode size
    const x = 50; // Horizontal position of barcode
    const yStart = 100; // Starting y-position for the first barcode
    const barcodeWidth = 200; // Width of the barcode image
    const barcodeHeight = 10; // Height of the barcode image (adjust as needed)
    const lineHeight = barcodeHeight + 100; // Space between barcodes
    const pageHeight = 800; // Max height for an A4 page (adjust if needed)
    let currentY = yStart; // Current vertical position for barcode placement

    // Add barcodes to PDF
    for (let index = 0; index < barcodes.length; index++) {
        const serialNum = barcodes[index];
        try {
            // Generate barcode image
            const barcode = await bwipjs.toBuffer({
                bcid: 'code128',      // Barcode type (Code 128)
                text: serialNum,      // Serial number to be displayed as barcode
                scale: 3,             // Scale for the barcode
                height: 10,           // Height of the barcode
                includetext: true,    // Include the serial number text under the barcode
                textxalign: 'center'  // Align text to the center
            });

            // Add barcode image to the PDF
            doc.image(barcode, x, currentY, { width: barcodeWidth });
            doc.text(serialNum, x + 5, currentY + barcodeHeight + 5); // Place serial number text below the barcode

            // Adjust y position for the next barcode
            currentY += lineHeight;

            // If the barcode exceeds the page height, add a new page
            if (currentY + lineHeight + 100 > pageHeight) {
                doc.addPage(); // Create a new page
                currentY = yStart; // Reset the y position to the top of the new page
            }
        } catch (error) {
            console.error(`Error generating barcode for ${serialNum}:`, error);
        }
    }

    // Finalize the PDF
    doc.end();

    // Return the file path once it's generated
    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(pdfFilePath)); // Resolve with the file path
        stream.on('error', reject);
    });
};


export const deleteStockService = async (stockId) => {
    try {
        const deletedStock = await deleteStockRepository(stockId);
        return deletedStock;
    } catch (error) {
        console.log("Error in deleteStockService:", error);
        throw new Error("Could not delete stock from service due to " + error);
    }
}

export const updateStockService = async (stockId, updatedData) => {
    try {
        const updatedStock = await updateStockRepository(stockId, updatedData);
        return updatedStock;
    } catch (error) {
        console.log("Error in updateStockService:", error);
        throw new Error("Could not update stock from service due to " + error);
    }
}

export const getAllStocksService = async () => {
    try {
        const stocks = await getAllStocksRepository();
        return stocks;
    } catch (error) {
        console.log("Error in getAllStocksService:", error);
        throw new Error("Could not fetch stocks from service due to " + error);
    }
}

export const getStockByIdService = async (stockId) => {
    try {
        const stock = await getStockByIdRepository(stockId);
        return stock;
    } catch (error) {
        console.log("Error in getStockByIdService:", error);
        throw new Error("Could not fetch stock from service due to " + error);
    }
}

export const getStockByProductIdService = async (productId) => {
    try {
        const stock = await getSctockByProductIdRepository(productId);
        return stock;
    } catch (error) {
        console.log("Error in getStockByProductIdService:", error);
        throw new Error("Could not fetch stock from service due to " + error);
    }
}

export const getStockByProductIdWithoutPriceService = async (productId) => {
    try {
        const stock = await getStockByProductIdWithoutPriceRepository(productId);
        return stock;
    } catch (error) {
        console.log("Error in getStockByProductIdWithoutPriceService:", error);
        throw new Error("Could not fetch stock from service due to " + error);
    }
}