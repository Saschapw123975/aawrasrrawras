# Stripe Payment Setup Guide

## ✅ What Works Right Now

1. **Payment Link Works**: The Stripe Payment Link `https://buy.stripe.com/14A00kdlSdny7ZL14qaR203` is **fully functional**
   - Customers can click "Buy Premium" and complete payment
   - Stripe processes the payment
   - Customer gets charged $13

2. **Payment Tracking**: You can see all payments in:
   - **Stripe Dashboard**: https://dashboard.stripe.com/payments (REAL-TIME)
   - **Admin Page**: http://localhost:5000/admin (after webhook setup)

## ⚠️ What Needs Setup

### Option 1: Use Stripe Dashboard (Easiest - No Setup Needed)

**Just check Stripe Dashboard:**
1. Go to https://dashboard.stripe.com/payments
2. You'll see every payment in real-time
3. No webhook setup needed!

### Option 2: Automatic Tracking (Requires Setup)

To automatically track purchases in your backend:

#### Step 1: Get Public URL (for localhost)

**Option A: Use ngrok (Free)**
```bash
# Install ngrok from https://ngrok.com/
ngrok http 5000
# Copy the URL it gives you (e.g., https://abc123.ngrok.io)
```

**Option B: Deploy to a server**
- Deploy your Flask app to Heroku, Railway, or any hosting
- Use your domain URL

#### Step 2: Configure Stripe Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Enter your webhook URL:
   - If using ngrok: `https://your-ngrok-url.ngrok.io/api/webhook`
   - If deployed: `https://yourdomain.com/api/webhook`
4. Select event: **`checkout.session.completed`**
5. Click **"Add endpoint"**
6. Copy the **"Signing secret"** (starts with `whsec_`)

#### Step 3: Add Secret to Backend

1. Open `backend/app.py`
2. Find line: `STRIPE_WEBHOOK_SECRET = "whsec_your_webhook_secret_here"`
3. Replace with your actual secret: `STRIPE_WEBHOOK_SECRET = "whsec_abc123..."`

#### Step 4: Test

1. Make a test purchase using Stripe test mode
2. Check `purchases.json` file - should see the purchase
3. Check http://localhost:5000/admin - should show the purchase

## 🧪 Testing Payments

### Test Mode (No Real Charges)

1. Go to Stripe Dashboard > Settings > API keys
2. Use **Test mode** toggle
3. Create a test payment link
4. Use test card: `4242 4242 4242 4242`
5. Any future expiry date, any CVC

### Live Mode (Real Charges)

1. Toggle to **Live mode** in Stripe Dashboard
2. Use your real payment link
3. Real customers will be charged

## 📊 Current Status

| Feature | Status | Notes |
|---------|--------|------|
| Payment Link | ✅ **WORKING** | Customers can pay |
| Stripe Dashboard | ✅ **WORKING** | See all payments |
| Webhook Tracking | ⚠️ **NEEDS SETUP** | Requires public URL |
| Admin Dashboard | ⚠️ **NEEDS SETUP** | Works after webhook setup |
| Purchase Logging | ⚠️ **NEEDS SETUP** | Works after webhook setup |

## 🚀 Quick Start (No Setup)

**Just use Stripe Dashboard:**
- All payments appear here: https://dashboard.stripe.com/payments
- No configuration needed
- Works immediately

## 🔧 Full Setup (Automatic Tracking)

Follow Option 2 above to enable:
- Automatic purchase logging
- Admin dashboard updates
- Email notifications (if you add them)

---

**Bottom Line**: Payments work NOW through Stripe. Webhook setup is optional for automatic backend tracking.

