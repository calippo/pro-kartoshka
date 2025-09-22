import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState, useRef } from "react";

// Message type for chat
type Msg = { role: "user" | "assistant"; content: string; images?: string[] };

// Pro-Keds models data
const proKedsModels = [
  {
    name: "Orbit II Lo",
    image: "https://www.prokeds1949.com/cdn/shop/files/ORBIT_II_LO_model_1000x.jpg?v=1748592445",
    price: "220 EUR",
    description: "Sneaker low-top con tomaia in canvas stone-washed e suola modellata a mano. Tecnologia Rubber Fusion™ per un'elevata resistenza e flessibilità."
  },
  {
    name: "Orbit II Hi",
    image: "https://www.prokeds1949.com/cdn/shop/files/ORBIT_HI_model_1000x.jpg?v=1748598717",
    price: "240 EUR",
    description: "Sneaker high-top in canvas stone-washed con fodera in pelle. Suola artigianale con base Vibram® e gomma spugna, integrata con tecnologia Rubber Fusion™."
  },
  {
    name: "Intrepid",
    image: "https://www.prokeds1949.com/cdn/shop/files/INTREPID_model_1000x.jpg?v=1748601521",
    price: "180 EUR",
    description: "Sneaker vulcanizzata con suola ottenuta tramite fusione ad alta temperatura di cinque strati foxing. Massima aderenza, flessibilità e struttura."
  },
  {
    name: "Field King",
    image: "https://www.prokeds1949.com/cdn/shop/files/Field_King-model_1000x.jpg?v=1748597901",
    price: "180 EUR",
    description: "Sneaker mid-cut con linguetta reversibile e costruzione multistrato. Design deciso, pensato per contesti dinamici e urban."
  },
  {
    name: "Court Ace",
    image: "https://www.prokeds1949.com/cdn/shop/files/court_ace_model_1000x.jpg?v=1748600656",
    price: "180 EUR",
    description: "Sneaker low-top con tomaia in materiali misti e inserti in pelle. Proporzioni bilanciate, struttura essenziale e dettagli tecnici."
  }
];

// Add skeleton loading component
const SkeletonLoading = () => (
  <div className="w-full max-w-2xl mx-auto text-center animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
  </div>
);

// MessageBubble component for better organization
const MessageBubble = ({ message }: { message: Msg }) => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    message.images ? message.images.map(() => false) : []
  );
  
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={`text-center ${message.role === "assistant" ? "" : "mt-8"}`}>
        <h3 className={`text-lg italic font-light mb-2 ${message.role === "user" ? "text-gray-400" : "text-gray-300"}`}>
          {message.role === "user" ? "Tu" : "Pro Advisor"}
        </h3>
        <div className={`mx-auto text-xl font-light tracking-wide text-center whitespace-pre-line ${message.role === "user" ? "text-gray-300" : "text-white"}`}>
          {message.content}
        </div>
        
        {message.images && message.images.length > 0 && (
          <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto mt-8">
            {message.images.map((url, j) => (
              <div key={j} className="relative">
                {!loadedImages[j] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-gray-600 border-t-gray-300 rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={url} 
                  alt="sneaker suggestion" 
                  className={`w-full h-auto object-cover rounded-lg shadow-lg ${
                    !loadedImages[j] ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(j)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Add a component for the sneaker models showcase
const ProKedsModels = () => {
  const models = [
    {
      name: "Orbit II Lo",
      image: "https://www.prokeds1949.com/cdn/shop/files/ORBIT_II_LO_model_1000x.jpg?v=1748592445"
    },
    {
      name: "Orbit II Hi", 
      image: "https://www.prokeds1949.com/cdn/shop/files/ORBIT_HI_model_1000x.jpg?v=1748598717"
    },
    {
      name: "Intrepid",
      image: "https://www.prokeds1949.com/cdn/shop/files/INTREPID_model_1000x.jpg?v=1748601521"
    },
    {
      name: "Field King",
      image: "https://www.prokeds1949.com/cdn/shop/files/Field_King-model_1000x.jpg?v=1748597901"
    },
    {
      name: "Court Ace",
      image: "https://www.prokeds1949.com/cdn/shop/files/court_ace_model_1000x.jpg?v=1748600656"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-light text-center tracking-widest uppercase mb-12 text-gray-300">
        I Nostri Modelli Pro-Keds 1949
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {models.map((model, index) => (
          <div key={index} className="text-center">
            <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors">
              <img 
                src={model.image} 
                alt={model.name}
                className="w-full h-auto object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h3 className="text-sm font-light text-gray-300 tracking-wide">
                {model.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: "Sneaker Advisor" },
    { name: "description", content: "Chat con un esperto di fashion per trovare le sneaker perfette per te." },
  ];
};

export default function Index() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stepRef = useRef(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get only the last question and answer for display
  const displayMessages = () => {
    if (msgs.length === 0) return [];
    
    // If we only have the welcome message
    if (msgs.length === 1 && msgs[0].role === "assistant") {
      return [msgs[0]];
    }
    
    // Find the last user message index
    const lastUserIndex = [...msgs].reverse().findIndex(m => m.role === "user");
    
    if (lastUserIndex === -1) return [msgs[msgs.length - 1]];
    
    const lastUserPosition = msgs.length - 1 - lastUserIndex;
    const assistantResponse = lastUserPosition < msgs.length - 1 ? msgs[lastUserPosition + 1] : null;
    
    return [
      msgs[lastUserPosition],
      ...(assistantResponse ? [assistantResponse] : [])
    ];
  };

  // Check if we're at the final step (step 5 or higher) and have a recommendation
  const getRecommendedModel = () => {
    if (stepRef.current >= 5 && msgs.length > 1) {
      const lastAssistantMessage = msgs.filter(m => m.role === "assistant").pop();
      if (lastAssistantMessage?.content) {
        // Extract model name from the response
        const content = lastAssistantMessage.content.toLowerCase();
        if (content.includes('orbit ii lo') || content.includes('orbit lo')) {
          return proKedsModels.find(m => m.name === "Orbit II Lo");
        } else if (content.includes('orbit ii hi') || content.includes('orbit hi')) {
          return proKedsModels.find(m => m.name === "Orbit II Hi");
        } else if (content.includes('field king')) {
          return proKedsModels.find(m => m.name === "Field King");
        } else if (content.includes('court ace')) {
          return proKedsModels.find(m => m.name === "Court Ace");
        } else if (content.includes('intrepid')) {
          return proKedsModels.find(m => m.name === "Intrepid");
        }
      }
    }
    return null;
  };

  // Extract personality summary from AI response
  const getPersonalitySummary = () => {
    if (stepRef.current >= 5 && msgs.length > 1) {
      const lastAssistantMessage = msgs.filter(m => m.role === "assistant").pop();
      if (lastAssistantMessage?.content) {
        // Look for the SINTESI pattern
        const content = lastAssistantMessage.content;
        const sintesiMatch = content.match(/💫\s*SINTESI:\s*([^💫\n]+)/i);
        if (sintesiMatch) {
          return sintesiMatch[1].trim();
        }
        
        // Fallback: extract from Personalità section if SINTESI not found
        const personalitaMatch = content.match(/Personalità:\s*([^\n]+)/i);
        if (personalitaMatch) {
          const personalita = personalitaMatch[1].trim();
          // Limit to 20 words
          const words = personalita.split(' ').slice(0, 20);
          return words.join(' ') + (personalita.split(' ').length > 20 ? '...' : '');
        }
      }
    }
    return "La tua personalità riflette autenticità, stile raffinato e ricerca dell'eccellenza in ogni dettaglio del tuo modo di essere.";
  };

  useEffect(() => {
    // Welcome message
    if (msgs.length === 0) {
      setMsgs([
        {
          role: "assistant",
          content: "Ciao! Sono il tuo consulente personale specializzato in sneakers Pro-Keds 1949. Ti aiuterò a trovare il modello Pro-Keds 1949 perfetto per il tuo stile."
        }
      ]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    if (!text.trim() || isLoading) return;
    
    const userMessage = { role: "user" as const, content: text };
    const newMsgs: Msg[] = [...msgs, userMessage];
    setMsgs(newMsgs);
    setText("");
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/chat", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMsgs,
          step: stepRef.current,
          password: "pro-kartoshka",
        }),
      });
      
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      
      const data: { text: string; images?: string[] } = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.text, images: data.images }]);
      stepRef.current++;
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Errore durante la comunicazione col server");
      setMsgs((m) => [...m, { 
        role: "assistant", 
        content: "Mi dispiace, c'è stato un problema nella comunicazione. Riprova tra qualche istante." 
      }]);
    } finally {
      setIsLoading(false);
      // Focus the input field after sending
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const retryLastMessage = () => {
    if (msgs.length < 2 || isLoading) return;
    
    // Remove the last error message
    setMsgs(msgs.slice(0, -1));
    setIsLoading(true);
    setError(null);
    
    // Retry the request
    const messagesToSend = msgs.slice(0, -1);
    
    fetch("/api/chat", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messagesToSend,
        step: stepRef.current,
        password: "pro-kartoshka",
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then(data => {
        setMsgs((m) => [...m.slice(0, -1), { 
          role: "assistant", 
          content: data.text, 
          images: data.images 
        }]);
        stepRef.current++;
      })
      .catch(e => {
        console.error(e);
        setError(e instanceof Error ? e.message : "Errore durante la comunicazione col server");
        setMsgs((m) => [...m, { 
          role: "assistant", 
          content: "Mi dispiace, c'è ancora un problema nella comunicazione. Riprova più tardi." 
        }]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const recommendedModel = getRecommendedModel();
  const interviewCompleted = Boolean(recommendedModel);
  const visibleMessages = interviewCompleted ? [] : displayMessages();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-['Cormorant_Garamond',_serif]">
      <header className="py-8 border-b border-gray-800">
        <h1 className="text-3xl font-light text-center tracking-widest uppercase">Sneaker Model Advisor</h1>
        <p className="text-center text-sm text-gray-400 mt-2 tracking-wide">Dall’archivio ’49, tra parquet e passerella: lasciati scegliere dallo stile. Quale sneaker sei?</p>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl space-y-16 mb-10">
          {visibleMessages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}
          
          {!interviewCompleted && isLoading && <SkeletonLoading />}
          
          {!interviewCompleted && error && (
            <div className="text-center mt-8">
              <button 
                onClick={retryLastMessage}
                className="text-sm bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-full transition-colors"
              >
                Errore: clicca per riprovare
              </button>
            </div>
          )}
        </div>

        {/* Show only the recommended model at the end */}
        {recommendedModel && (
          <div className="w-full max-w-2xl mb-16">
            <div className="group bg-gray-900 rounded-lg p-8">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img 
                  src={recommendedModel.image} 
                  alt={recommendedModel.name}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-light text-white mb-2">{recommendedModel.name}</h3>
                <p className="text-gray-400 text-lg mb-4">{recommendedModel.price}</p>
                
                {/* Personality description - max 20 words */}
                <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    {getPersonalitySummary()}
                  </p>
                </div>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{recommendedModel.description}</p>
                <a 
                  href="https://www.prokeds1949.com/collections/uomo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-8 py-3 bg-white text-black font-light tracking-wide hover:bg-gray-200 transition-colors"
                >
                  SCOPRI LA COLLEZIONE
                </a>
              </div>
            </div>
          </div>
        )}
        
        {!interviewCompleted && (
          <div className="w-full max-w-lg mx-auto mt-auto">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="w-full bg-gray-900 border-b border-gray-700 px-4 py-3 pr-16 text-white focus:outline-none focus:border-gray-500 text-lg font-light"
                placeholder="Scrivi la tua risposta..."
                disabled={isLoading}
              />
              <button 
                onClick={send} 
                disabled={isLoading || !text.trim()}
                className={`absolute right-0 top-0 h-full px-4 flex items-center justify-center transition-colors ${
                  isLoading || !text.trim()
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-white hover:text-gray-300'
                }`}
                aria-label="Invia"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
      
      <div ref={bottomRef} />
    </div>
  );
}
