const {
    CreateInvoiceService,
    InvoiceListService,
    InvoiceProductListService,
    PaymentSuccessInvoiceService,
    PaymentCancelService,
    PaymentFailService,
    PaymentIPNInvoiceService
} = require("../services/InvoiceServices");

// ================= CREATE INVOICE =================
exports.CreateInvoiceService = async (req, res) => {
    let result = await CreateInvoiceService(req);
    return res.status(200).json(result);
};

// ================= INVOICE LIST =================
exports.InvoiceListService = async (req, res) => {
    let result = await InvoiceListService(req);
    return res.status(200).json(result);
};

// ================= INVOICE PRODUCTS =================
exports.InvoiceProductListService = async (req, res) => {
    let result = await InvoiceProductListService(req);
    return res.status(200).json(result);
};

// ================= PAYMENT SUCCESS =================
exports.PaymentSuccessInvoiceService = async (req, res) => {
    try {
        await PaymentSuccessInvoiceService(req);

        const trxID = req.params.trxID;

        console.log("SUCCESS TRX:", trxID);

        return res.redirect(`${process.env.FRONTEND_URL}/cart`);
    } catch (error) {
        console.log("Payment Success Error:", error);
        return res.redirect(`${process.env.FRONTEND_URL}/cart`);
    }
};

// ================= PAYMENT CANCEL =================
exports.PaymentCancelService = async (req, res) => {
    try {
        await PaymentCancelService(req);

        const trxID = req.params.trxID;

        console.log("CANCEL TRX:", trxID);

        return res.redirect(`${process.env.FRONTEND_URL}/cart`);
    } catch (error) {
        console.log("Payment Cancel Error:", error);
        return res.redirect(`${process.env.FRONTEND_URL}/cart`);
    }
};

// ================= PAYMENT FAIL =================
exports.PaymentFailService = async (req, res) => {
    try {
        await PaymentFailService(req);

        const trxID = req.params.trxID;

        console.log("FAIL TRX:", trxID);

        return res.redirect(`${process.env.FRONTEND_URL}/cart`);
    } catch (error) {
        console.log("Payment Fail Error:", error);
        return res.redirect(`${process.env.FRONTEND_URL}/cart`);
    }
};

// ================= IPN =================
exports.PaymentIPNInvoiceService = async (req, res) => {
    try {
        await PaymentIPNInvoiceService(req);
        return res.sendStatus(200);
    } catch (error) {
        console.log("IPN Error:", error);
        return res.sendStatus(200);
    }
};