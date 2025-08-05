interface EmailData {
  email: string;
  name?: string;
  newsletter?: boolean;
  market: string;
  productName: string;
  price: number;
  netMargin: number;
  roi: number;
  timestamp: string;
}

export async function sendToKit(emailData: EmailData): Promise<boolean> {
  try {
    // Utilise la fonction Netlify comme proxy pour éviter les problèmes CORS
    const response = await fetch('/.netlify/functions/submit-email-to-kit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Erreur Kit:', error);
    return false;
  }
}

export async function sendToGoogleSheets(emailData: EmailData): Promise<boolean> {
  try {
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_APPS_SCRIPT_URL';
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailData.email,
        name: emailData.name || '',
        newsletter: emailData.newsletter ? 'Oui' : 'Non',
        market: emailData.market,
        productName: emailData.productName,
        price: emailData.price,
        netMargin: emailData.netMargin.toFixed(1) + '%',
        roi: emailData.roi.toFixed(1) + '%',
        timestamp: emailData.timestamp
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Erreur Google Sheets:', error);
    return false;
  }
}

export async function sendToWebhook(emailData: EmailData): Promise<boolean> {
  try {
    const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'YOUR_WEBHOOK_URL';
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    return response.ok;
  } catch (error) {
    console.error('Erreur Webhook:', error);
    return false;
  }
}