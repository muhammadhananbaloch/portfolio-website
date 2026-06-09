import { useEffect } from "react";
import Masthead from "@/components/Masthead";
import AmbientGlow from "@/components/AmbientGlow";
import BeatHero from "@/components/beats/BeatHero";
import BeatProjectChapters from "@/components/beats/BeatProjectChapters";
import BeatManifesto from "@/components/beats/BeatManifesto";
import StackScene from "@/components/StackScene";
import ContactScene from "@/components/ContactScene";
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
      <AmbientGlow />
      <Masthead />
      <BeatHero />
      <BeatProjectChapters />
      <BeatManifesto />
      <StackScene />
      <ContactScene />
    </>
  );
};

export default Index;
