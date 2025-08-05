import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProductInfo } from './components/ProductInfo';
import { ManufacturingCosts } from './components/ManufacturingCosts';
import { ShippingSection } from './components/ShippingSection';
import { CustomsSection } from './components/CustomsSection';
import { AmazonFees } from './components/AmazonFees';
import { AdvertisingSection } from './components/AdvertisingSection';
import { ResultsSection } from './components/ResultsSection';
import { PriceRangeTable } from './components/PriceRangeTable';
import { EmailModal } from './components/EmailModal';
import { useCalculator } from './hooks/useCalculator';
import { generateExcelFile } from './utils/excelGenerator';
import { sendToKit } from './utils/emailCapture';

function App() {
  const { data, results, priceVariations, updateData } = useCalculator();
  const [activeSection, setActiveSection] = useState('product');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleMarketChange = (market: 'EU' | 'USA') => {
    updateData({ market });
    if (market === 'USA') {
      // Simplify data for USA market
      updateData({
        product: { ...data.product, vat: 0 }, // No VAT in USA display
        customs: { taricCode: '', importVat: 0, customsDuty: 0 }
      });
    }
  };

  const handleExport = () => {
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (email: string, name?: string, newsletter?: boolean) => {
    try {
      generateExcelFile(data, results);

      const emailData = {
        email,
        name,
        newsletter,
        market: data.market,
        productName: data.product.name || 'Produit sans nom',
        price: data.product.price,
        netMargin: results?.netMargin || 0,
        roi: results?.roi || 0,
        timestamp: new Date().toISOString()
      };

      const success = await sendToKit(emailData);
      
      if (success) {
        alert('Votre fichier Excel a été téléchargé ! Merci pour votre email.');
        setShowEmailModal(false);
      } else {
        alert('Le fichier a été téléchargé, mais nous n\'avons pas pu enregistrer votre email. Veuillez réessayer.');
      }
      
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Le fichier a été téléchargé, mais une erreur est survenue lors de l\'enregistrement de votre email.');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'product':
        return (
          <ProductInfo
            data={data.product}
            onChange={(product) => updateData({ product })}
            market={data.market}
          />
        );
      case 'costs':
        return (
          <ManufacturingCosts
            data={data.costs}
            onChange={(costs) => updateData({ costs })}
            market={data.market}
          />
        );
      case 'shipping':
        return (
          <ShippingSection
            data={data.shipping}
            onChange={(shipping) => updateData({ shipping })}
            market={data.market}
          />
        );
      case 'customs':
        return data.market === 'EU' ? (
          <CustomsSection
            data={data.customs}
            onChange={(customs) => updateData({ customs })}
            market={data.market}
          />
        ) : null;
      case 'amazon':
        return (
          <AmazonFees
            data={data.amazon}
            onChange={(amazon) => updateData({ amazon })}
            market={data.market}
          />
        );
      case 'advertising':
        return (
          <AdvertisingSection
            data={data.advertising}
            onChange={(advertising) => updateData({ advertising })}
          />
        );
      case 'results':
        return (
          <div className="space-y-8">
            {results && (
              <>
                <ResultsSection results={results} market={data.market} />
                <PriceRangeTable variations={priceVariations} market={data.market} />
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header market={data.market} onMarketChange={handleMarketChange} />
      
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onExport={handleExport}
          hasResults={!!results}
        />
        
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>

      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
      />
    </div>
  );
}

export default App;