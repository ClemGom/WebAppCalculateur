// netlify/functions/submit-email-to-kit.ts

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

export const handler = async (event: any) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const emailData: EmailData = JSON.parse(event.body);
    console.log('Received emailData:', emailData); // NOUVEAU LOG

    // Get environment variables
    const KIT_API_KEY = process.env.KIT_API_KEY;
    const KIT_FORM_ID = process.env.KIT_FORM_ID;

    console.log('KIT_API_KEY (first 5 chars):', KIT_API_KEY ? KIT_API_KEY.substring(0, 5) : 'N/A'); // NOUVEAU LOG (partiel pour sécurité)
    console.log('KIT_FORM_ID:', KIT_FORM_ID); // NOUVEAU LOG

    if (!KIT_API_KEY || !KIT_FORM_ID) {
      console.error('Missing Kit configuration');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Configuration manquante',
          success: false
        }),
      };
    }

    // Send to ConvertKit
    const response = await fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email: emailData.email,
        first_name: emailData.name || '',
        fields: {
          market: emailData.market,
          product_name: emailData.productName,
          price: emailData.price.toString(),
          net_margin: emailData.netMargin.toFixed(1),
          roi: emailData.roi.toFixed(1),
          newsletter_consent: emailData.newsletter ? 'Oui' : 'Non',
          timestamp: emailData.timestamp
        }
      })
    });

    const result = await response.json();
    console.log('ConvertKit API response status:', response.status); // NOUVEAU LOG
    console.log('ConvertKit API response body:', result); // NOUVEAU LOG

    if (response.ok) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          message: 'Email ajouté avec succès à Kit'
        }),
      };
    } else {
      console.error('Kit API error:', result);
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          error: 'Erreur lors de l\'ajout à Kit',
          details: result
        }),
      };
    }

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: 'Erreur serveur interne'
      }),
    };
  }
};
