import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FloatingHearts from "@/components/FloatingHearts";
import LoadingSpinner from "@/components/LoadingSpinner";
import { API_ENDPOINTS } from "@/config/api";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Oops! 💖",
        description: "Please paste some text to summarize!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary("");

    try {
      const response = await fetch(API_ENDPOINTS.summarize, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize");
      }

      const data = await response.json();
      setSummary(data.summary || "No summary returned");
      
      toast({
        title: "Success! ✨",
        description: "Your text has been summarized!",
      });
    } catch (error) {
      toast({
        title: "Error 😢",
        description: "Failed to summarize. Please check your API endpoint in src/config/api.ts",
        variant: "destructive",
      });
      console.error("Summarization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setSummary("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <FloatingHearts />
      
      <div className="w-full max-w-3xl z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
            ✨ Summarizer 💖
          </h1>
          <p className="text-foreground/80 text-lg">
            Turn long text into cute little summaries!
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 animate-scale-in">
          <div className="space-y-3">
            <label className="text-foreground font-semibold text-lg flex items-center gap-2">
              <span>✍️</span>
              <span>Paste your text here...</span>
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Once upon a time, in a land far, far away..."
              className="min-h-[200px] text-base resize-none glass-card border-2 border-white/40 focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/60"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSummarize}
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ animation: "pulse-glow 2s infinite" }}
            >
              ✨ Summarize
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              disabled={isLoading}
              className="flex-1 sm:flex-none bg-white/60 backdrop-blur-sm border-2 border-primary/30 hover:bg-white/80 text-foreground font-semibold text-lg py-6 px-8 rounded-full transition-all duration-300 hover:scale-105"
            >
              🗑️ Clear
            </Button>
          </div>

          {isLoading && <LoadingSpinner />}

          {summary && !isLoading && (
            <div className="space-y-3 animate-fade-in">
              <label className="text-foreground font-semibold text-lg flex items-center gap-2">
                <span>✨</span>
                <span>Summary Output</span>
              </label>
              <div className="glass-card rounded-2xl p-6 border-2 border-white/40 min-h-[150px]">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6 text-foreground/60 text-sm">
          <p>Made with 💖 by your friendly summarizer</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
