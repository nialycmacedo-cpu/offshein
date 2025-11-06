import { useState } from "react";
import { LoadingCard } from "@/components/LoadingCard";
import { SuccessCard } from "@/components/SuccessCard";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {isLoading ? (
        <LoadingCard onComplete={() => setIsLoading(false)} />
      ) : (
        <SuccessCard />
      )}
    </div>
  );
};

export default Index;
