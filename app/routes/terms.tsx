import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Termini di Servizio - Sneaker Advisor" },
    { name: "description", content: "Termini e condizioni di utilizzo di Sneaker Advisor" },
  ];
};

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Termini di Servizio</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Accettazione dei Termini</h2>
          <p>
            Utilizzando il servizio Sneaker Advisor, accetti i presenti Termini di Servizio. 
            Se non accetti questi termini, ti preghiamo di non utilizzare il nostro servizio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Descrizione del Servizio</h2>
          <p>
            Sneaker Advisor è un servizio di consulenza virtuale che aiuta gli utenti a trovare 
            le sneakers più adatte alle loro esigenze e preferenze attraverso un'interfaccia di chat.
          </p>
          <p className="mt-2">
            Le raccomandazioni fornite si basano sulle informazioni che fornisci durante la conversazione
            e hanno solo scopo informativo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Accuratezza delle Informazioni</h2>
          <p>
            Ci impegniamo a fornire informazioni accurate e aggiornate, tuttavia non garantiamo 
            la completezza, l'affidabilità o l'accuratezza delle informazioni fornite. 
            Le raccomandazioni sono generate da un sistema di intelligenza artificiale e potrebbero 
            non riflettere la disponibilità effettiva dei prodotti.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Limitazioni di Responsabilità</h2>
          <p>
            Sneaker Advisor non è responsabile per decisioni di acquisto o altre azioni intraprese 
            sulla base delle nostre raccomandazioni. Non siamo affiliati con i marchi o i prodotti 
            che possiamo raccomandare e non vendiamo direttamente alcun prodotto.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Proprietà Intellettuale</h2>
          <p>
            Tutti i contenuti presenti su Sneaker Advisor, inclusi testi, grafica, loghi, immagini, 
            sono di proprietà di Sneaker Advisor o dei suoi licenzianti e sono protetti dalle leggi 
            sul copyright e sulla proprietà intellettuale.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Utilizzo Accettabile</h2>
          <p>
            Non è consentito utilizzare Sneaker Advisor per scopi illegali o non autorizzati. 
            Gli utenti non devono tentare di interferire con il funzionamento del servizio o 
            utilizzare il servizio in modi che potrebbero danneggiarlo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Modifiche ai Termini</h2>
          <p>
            Ci riserviamo il diritto di modificare questi Termini di Servizio in qualsiasi momento. 
            L'utilizzo continuato del servizio dopo tali modifiche costituisce l'accettazione dei 
            nuovi Termini.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Legge Applicabile</h2>
          <p>
            Questi Termini di Servizio sono regolati e interpretati in conformità con le leggi italiane.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contattaci</h2>
          <p>
            Per qualsiasi domanda riguardante questi Termini di Servizio, 
            contattaci all'indirizzo: <a href="mailto:info@sneakeradvisor.it" className="text-blue-600 hover:underline">info@sneakeradvisor.it</a>
          </p>
        </section>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <a href="/" className="text-blue-600 hover:underline">&larr; Torna alla home</a>
      </div>
    </div>
  );
} 