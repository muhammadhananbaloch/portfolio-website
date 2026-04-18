import { useEffect } from "react";
import Masthead from "@/components/Masthead";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Now from "@/components/Now";
import Work from "@/components/Work";
import StackExp from "@/components/StackExp";
import QuoteContact from "@/components/QuoteContact";
import "@/styles/portfolio.css";

const Index = () => {
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
      <Now />
      <Work />
      <StackExp />
      <QuoteContact />
    </>
  );
};

export default Index;
