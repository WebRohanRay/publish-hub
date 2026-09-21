import React from "react";
import { AxiomLogo } from "./AxiomLogo";

interface AtlasLogoProps {
  className?: string;
  isDark?: boolean;
  href?: string;
}

// Seamlessly forward to the new modern AxiomLogo
export const AtlasLogo: React.FC<AtlasLogoProps> = (props) => {
  return <AxiomLogo {...props} />;
};
