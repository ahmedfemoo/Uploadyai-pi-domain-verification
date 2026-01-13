// تهيئة الـ SDK (استخدم sandbox: true لو بتجرب محليًا)
Pi.init({ version: "2.0", sandbox: true });

// (اختياري) مصادقة المستخدم لعرض الـ username
async function authUser() {
  try {
    const scopes = ['username'];
    const user = await Pi.authenticate(scopes, onIncompletePaymentFound);
    document.getElementById('user').innerText = `مرحبًا، ${user.username}`;
    return user;
  } catch (err) {
    console.error('Auth error:', err);
  }
}

function onIncompletePaymentFound(payment) {
  console.log('Incomplete payment found:', payment);
}

authUser();

// بيانات الدفع التجريبية
const paymentData = {
  amount: 1,
  memo: "Test payment",
  metadata: { orderId: 123 }
};

// زر الدفع
document.getElementById("pay").addEventListener("click", () => {
  Pi.createPayment(paymentData, {
    onReadyForServerApproval: (paymentId) => {
      console.log("جاهز لموافقة السيرفر:", paymentId);
    },
    onReadyForServerCompletion: (paymentId, txid) => {
      console.log("المعاملة اكتملت:", paymentId, txid);
    },
    onCancel: (paymentId) => {
      console.log("المستخدم لغى الدفع:", paymentId);
    },
    onError: (error, paymentId) => {
      console.error("خطأ:", error, paymentId);
    }
  });
});
