import * as React from "react";
import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import HeroSection from "../app/(landing)/sections/HeroSection"
import { SEO } from "../app/(landing)/components/seo";
import { search_students } from "@/utils/API_Calls/search";


const Home: NextPage = () => {
  React.useEffect(()=>{search_students("")},[])
  return (
    <Box>
      <SEO
        title="Puppy Love"
        description="Free SaaS landingspage starter kit"
      />
      <Box>
        <HeroSection />
      </Box>
    </Box>
  );
};


export default Home;