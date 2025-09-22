import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - Sneaker Advisor" },
    { name: "description", content: "Informativa sulla privacy di Sneaker Advisor" },
  ];
};

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Informativa sulla Privacy</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduzione</h2>
          <p>
            La presente Informativa sulla Privacy descrive come Sneaker Advisor ("noi", "nostro") 
            raccoglie, utilizza e condivide le informazioni personali quando utilizzi il nostro servizio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Informazioni raccolte</h2>
          <p>
            Raccogliamo informazioni che ci fornisci direttamente quando utilizzi il nostro servizio, 
            incluse le tue preferenze di stile, esigenze e conversazioni nella chat.
          </p>
          <p className="mt-2">
            Utilizziamo queste informazioni esclusivamente per migliorare le raccomandazioni 
            e l'esperienza di assistenza nel trovare le sneakers più adatte alle tue esigenze.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Utilizzo delle informazioni</h2>
          <p>Le informazioni raccolte verranno utilizzate per:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Fornirti raccomandazioni personalizzate di sneakers</li>
            <li>Migliorare il nostro servizio di assistenza</li>
            <li>Analizzare le tendenze e preferenze degli utenti in forma aggregata</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Condivisione delle informazioni</h2>
          <p>
            Non vendiamo o condividiamo le tue informazioni personali con terze parti per scopi 
            di marketing. Possiamo condividere informazioni con fornitori di servizi che ci aiutano 
            a fornire e migliorare il nostro servizio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Sicurezza</h2>
          <p>
            Adottiamo misure di sicurezza ragionevoli per proteggere le tue informazioni personali. 
            Tuttavia, nessun metodo di trasmissione su Internet o metodo di archiviazione elettronica 
            è sicuro al 100%.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. I tuoi diritti</h2>
          <p>
            Hai il diritto di accedere, correggere o cancellare le tue informazioni personali. 
            Per esercitare questi diritti, contattaci all'indirizzo email fornito in fondo a questa pagina.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Modifiche a questa Informativa sulla Privacy</h2>
          <p>
            Possiamo aggiornare la nostra Informativa sulla Privacy di tanto in tanto. 
            Ti informeremo di eventuali modifiche pubblicando la nuova Informativa sulla Privacy 
            su questa pagina.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Contattaci</h2>
          <p>
            Per qualsiasi domanda riguardante questa Informativa sulla Privacy, 
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