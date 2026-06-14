// Uses Resend API to send transactional emails (OTP, verification codes, etc.)
const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error("RESEND_API_KEY is not set in environment variables");
    }

    
   
    const fromAddress = process.env.EMAIL_FROM || "CoreVault <onboarding@resend.dev>";

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: fromAddress,
            to: [EmailTo],
            subject: EmailSubject,
            text: EmailText
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Resend error: ${response.status} - ${JSON.stringify(data)}`);
    }

    return data;
};

module.exports = EmailSend;