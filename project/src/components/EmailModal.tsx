import React, { useState } from 'react';
import { X, Mail, Download } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, name?: string, newsletter?: boolean) => void;
}

export function EmailModal({ isOpen, onClose, onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Veuillez saisir une adresse email valide.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(email, name, newsletter);
      setEmail('');
      setName('');
      setNewsletter(false);
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Télécharger en Excel
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-600 mb-6">
            Téléchargez vos calculs de rentabilité dans un fichier Excel personnalisé. 
            Votre email nous permettra de vous envoyer des conseils pour optimiser vos ventes Amazon.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom (optionnel)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre nom"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                Je souhaite recevoir des conseils et actualités pour optimiser mes ventes Amazon (recommandé)
              </label>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Téléchargement...' : 'Télécharger Excel'}
            </button>
          </div>
        </form>

        <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 border-t">
          <p>Conformément au RGPD, vos données ne seront pas partagées avec des tiers. Vous pouvez vous désabonner à tout moment.</p>
        </div>
      </div>
    </div>
  );
}