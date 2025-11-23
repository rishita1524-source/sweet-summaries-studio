const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-pink-light animate-spin border-t-primary"></div>
        <span className="absolute inset-0 flex items-center justify-center text-xl">✨</span>
      </div>
      <p className="text-foreground font-medium">Summarizing your text...</p>
    </div>
  );
};

export default LoadingSpinner;
