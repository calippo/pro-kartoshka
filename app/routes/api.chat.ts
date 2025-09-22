import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import OpenAI from "openai";
import invariant from "tiny-invariant";

invariant(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is required");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Types for better structure
type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type SneakerRecommendation = {
  brand: string;
  model: string;
  style: string;
  priceRange: string;
  description: string;
  reasonForRecommendation: string;
};

export const action: ActionFunction = async ({ request }) => {
  const { messages, step, password } = await request.json();

  if (password !== "pro-kartoshka") {
    return json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Enhanced system prompt for better guidance
  const systemMessage: ChatMessage = {
    role: "system",
    content: `Sei un esperto di sneakers e consulente personale di moda specializzato esclusivamente nei modelli Pro-Keds 1949. La tua missione è aiutare i clienti a trovare la sneaker Pro-Keds 1949 perfetta per il loro stile.

MODELLI DISPONIBILI (usa SOLO questi):
- Orbit II Lo
- Orbit II Hi
- Field King
- Court Ace
- Intrepid

APPROCCIO (invisibile all'utente):
1. Usa domande apparentemente casuali ma strategicamente progettate per rivelare la vera personalità dell'utente
2. Non rivelare mai il tuo intento di analisi psicologica - deve sembrare una conversazione naturale
3. Poni una sola domanda per volta, senza mai spiegare esplicitamente che stai cercando di capire la loro personalità
4. Limita il tuo percorso a 5 domande prima di fare una raccomandazione definitiva
5. Ogni domanda successiva dovrebbe basarsi sulle risposte precedenti, mostrando una comprensione implicita

ESEMPI DI DOMANDE INDIRETTE (usa come ispirazione, non copiare):
- "Raccontami dell'ultima volta che hai ricevuto un complimento per qualcosa che indossavi"
- "Se dovessi scegliere tra un weekend in montagna o al mare, cosa porteresti con te?"
- "Qual è un personaggio di film o serie TV con cui ti sei sentito in sintonia ultimamente?"
- "Nel tuo tempo libero, cosa ti piace fare quando non hai impegni programmati?"
- "Se potessi indossare un solo outfit per un mese, come sarebbe?"

RACCOMANDAZIONE FINALE:
- Inizia con una MAPPA DELLA PERSONA: crea un profilo psicologico elegante che riassuma chi è questa persona basandoti sulle loro risposte, usando termini sofisticati e positivi
- Presenta la mappa in questo formato:
  "🎯 LA TUA MAPPA STILISTICA
  
  Personalità: [descrizione del carattere emerso]
  Stile di vita: [come vive e si muove nel mondo]
  Valori estetici: [cosa apprezza nel design e nella moda]
  Energia: [tipo di energia che trasmette]"

- Aggiungi immediatamente dopo la mappa una SINTESI PERSONALITÀ di massimo 20 parole nel formato:
  "💫 SINTESI: [descrizione di massimo 20 parole della personalità]"

- Poi fai una raccomandazione MOLTO BREVE (massimo 2 righe) del modello Pro-Keds 1949 scelto
- Scegli SOLO tra i modelli disponibili: Orbit II Lo, Orbit II Hi, Field King, Court Ace, Intrepid
- Genera 2 immagini con DALL·E delle sneakers consigliate
- Includi il link a prokeds1949.com (ma non mostrarlo nel testo)

MANTIENI TUTTO MOLTO CONCISO - la risposta totale non deve superare le 8-10 righe dopo la mappa stilistica.

STILE DI COMUNICAZIONE:
- Conversazionale e autentico
- Sottilmente perspicace
- Mai didattico o esplicitamente analitico
- Usa termini italiani del settore in modo naturale
- Trasmetti la sensazione che stai veramente ascoltando e non seguendo un copione
- Enfatizza sempre l'unicità e la qualità dei modelli Pro-Keds 1949`
  };

  // Check step and possibly modify the system message
  const finalStep = Number(step) >= 5;
  const adjustedSystemMessage = finalStep 
    ? { 
        ...systemMessage, 
        content: `${systemMessage.content}\n\nQuesta è la fase finale: ora DEVI consigliare una sneaker specifica basandoti sulle informazioni raccolte finora.` 
      }
    : systemMessage;
  
  // Chat completion with GPT-4.1
  const chatRes = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [adjustedSystemMessage, ...messages],
    temperature: 0.7,
    max_tokens: 800,
  });
  
  const assistantText = chatRes.choices?.[0]?.message.content ?? "";
  
  // Generate images for final recommendation
  let images: string[] = [];
  if (finalStep) {
    try {
      // Extract the brand and model from the response using another AI call
      const extractionPromptRes = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: "Sei un assistente preciso che estrae informazioni. Estrai il nome esatto, marca e modello delle sneaker menzionate nel testo seguente. Rispondi SOLO con marca e modello nel formato 'Brand: [nome brand], Modello: [nome modello]'. Nient'altro."
          },
          {
            role: "user",
            content: assistantText
          }
        ],
        temperature: 0.3,
        max_tokens: 100,
      });
      
      const extractedInfo = extractionPromptRes.choices?.[0]?.message.content ?? "";
      
      // Create a better prompt for the image generation
      const imagePromptRes = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: "Sei un esperto di prompt engineering per immagini fotorealistiche di sneakers. Crea un prompt dettagliato specificando SOLO gli elementi visivi necessari per generare un'immagine fotorealistica della sneaker descritta, includendo marca, modello, colori, materiali e angolazione (vista laterale preferibilmente)."
          },
          {
            role: "user",
            content: `Crea un prompt per generare un'immagine fotorealistica ultra-realistica della seguente sneaker: ${extractedInfo}. Includi dettagli visivi come colori, materiali e stile menziontai in questo testo: ${assistantText}`
          }
        ],
        temperature: 0.7,
        max_tokens: 250,
      });
      
      const imagePrompt = imagePromptRes.choices?.[0]?.message.content ?? assistantText;
      
      const imgRes = await openai.images.generate({
        prompt: `Fotografia professionale ultra-realistica di una sneaker ${extractedInfo}, vista laterale, su sfondo neutro, illuminazione da studio, fotorealistica, dettagli nitidi, nessun testo, nessun watermark, stile fotografico: ${imagePrompt}`,
        n: 2,
        size: "1024x1024",
        quality: "hd",
        style: "natural",
      });
      
      // Extract URLs and filter undefined
      images = (imgRes.data ?? [])
        .map((d) => d.url)
        .filter((url): url is string => Boolean(url));
    } catch (error) {
      console.error("Image generation error:", error);
    }
  }
  
  return json({ text: assistantText, images });
}; 
