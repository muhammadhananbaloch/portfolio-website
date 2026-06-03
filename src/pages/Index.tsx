import { useEffect, useState } from "react";
import Masthead from "@/components/Masthead";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import StackExp from "@/components/StackExp";
import QuoteContact from "@/components/QuoteContact";
import "@/styles/portfolio.css";

const Index = () => {
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("portfolio");
    document.body.classList.add("portfolio");
    return () => {
      document.documentElement.classList.remove("portfolio");
      document.body.classList.remove("portfolio");
    };
  }, []);

  return (
    <>
      <Masthead />
      <Hero />
      <Stats />
      <Work highlightedTech={highlightedTech} />
      <StackExp onHighlightTech={setHighlightedTech} />
      <QuoteContact />
    </>
  );
};

export default Index;
