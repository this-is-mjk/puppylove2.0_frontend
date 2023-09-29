import * as React from "react";
import type { NextPage } from "next";
import {Box} from "@chakra-ui/react";
import HeroSection from "../app/(landing)/sections/HeroSection"
import { SEO } from "../app/(landing)/components/seo";


const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI Landingspage"
        description="Free SaaS landingspage starter kit"
      />
      <Box>
        <HeroSection />

        {/* <HighlightsSection />

        <FeaturesSection />

        <TestimonialsSection />

        <PricingSection />

        <FaqSection /> */}
      </Box>
    </Box>
  );
};


export default Home;