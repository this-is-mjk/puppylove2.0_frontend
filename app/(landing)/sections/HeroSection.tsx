import { Container, Box, ButtonGroup, Icon } from '@chakra-ui/react';
import { Br } from '@saas-ui/react';
import { BackgroundGradient } from '../components/background-gradient';
import { Hero } from '../components/hero';
import { ButtonLink } from '../components/button-link';
import { FallInPlace } from '../components/motion/fall-in-place';
import { Em } from '../components/typography';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" />
      <Container maxW="container.xl" pt={{ base: 20, lg: 37 }} pb="40">
        <Hero
          id="home"
          justifyContent="center"
          px="30"
          title={
            <FallInPlace fontSize={{ base: 60, lg: 74.5 }}>
              Dating season
              <Br /> Try your luck
            </FallInPlace>
          }
          description={
            <FallInPlace delay={0.4} fontWeight="medium">
              Puppy love is the <Em>Dating App of IIT Kanpur</Em>
              <Br /> built by the <Em>Programming Club</Em>. Try your luck.
              <Br /> Happy Dating!
            </FallInPlace>
          }
        >
          <FallInPlace delay={0.8}>
            {/* <HStack pt="4" pb="12" spacing="8">
                  <NextjsLogo height="28px" /> <ChakraLogo height="20px" />
                </HStack> */}

            <ButtonGroup spacing={4} alignItems="center" pt="10">
              <ButtonLink colorScheme="primary" size="lg" href="/register">
                Sign Up
              </ButtonLink>
              <ButtonLink
                size="lg"
                href="/login"
                variant="outline"
                rightIcon={
                  <Icon
                    as={FiArrowRight}
                    sx={{
                      transitionProperty: 'common',
                      transitionDuration: 'normal',
                      '.chakra-button:hover &': {
                        transform: 'translate(5px)',
                      },
                    }}
                  />
                }
              >
                Log In
              </ButtonLink>
            </ButtonGroup>
          </FallInPlace>
        </Hero>
      </Container>
    </Box>
  );
};

export default HeroSection;
