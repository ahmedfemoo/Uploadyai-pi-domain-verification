// ملف API Route على Vercel للتحقق من الدفع
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { paymentId } = req.body;

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}`, {
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`, // ضع الـ API Key في إعدادات Vercel
      },
    });

    const payment = await response.json();

    if (payment && payment.status === "completed") {
      res.json({ success: true, payment });
    } else {
      res.json({ success: false, payment });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Verification failed" });
  }
}
