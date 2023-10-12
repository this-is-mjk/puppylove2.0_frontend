import {
  Box,
  BoxProps,
  SimpleGrid,
  Container,
  Text,
  Stack,
  Flex,
  HStack,
} from '@chakra-ui/react'

import { Link, LinkProps } from '@saas-ui/react'

import siteConfig from '../data/config'

export interface FooterProps extends BoxProps {
  columns?: number
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { columns = 2, ...rest } = props
  return (
    <Box bg="#f5f4f2" _dark={{ bg: 'gray.900' }} {...rest}>
      <Container maxW="container.2xl" px="6" py="2">
        <SimpleGrid columns={[1, 1, columns]} spacing={[4, 4, 0]}>
          <Stack spacing="1.4"  display={['none', 'none', 'block']}>
            <Stack alignItems="flex-start">
              <Flex py="2">
                <Box as={siteConfig.logo} flex="1" height="31px"/>
              </Flex>
            </Stack>
          </Stack>
          <Stack spacing="0" alignItems={['flex-start', 'flex-start', 'flex-end']}>
            <Stack>
              <Text fontSize="md" color="muted">
                {siteConfig.seo.description}
              </Text>
            </Stack>
            <Copyright>{siteConfig.footer.copyright}</Copyright>
            <Flex py="1.7">
              <HStack spacing="3" alignSelf="flex-end">
                {siteConfig.footer?.links?.map(({ href, label }) => (
                  <FooterLink key={href} href={href}>
                    {label}
                  </FooterLink>
                ))}
              </HStack>
            </Flex>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export interface CopyrightProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const Copyright: React.FC<CopyrightProps> = ({
  title,
  children,
}: CopyrightProps) => {
  let content
  if (title && !children) {
    content = `&copy; ${new Date().getFullYear()} - ${title}`
  }
  return (
    <Text color="muted" fontSize="sm">
      {content || children}
    </Text>
  )
}

export const FooterLink: React.FC<LinkProps> = (props) => {
  const { children, ...rest } = props
  return (
    <Link
      color="muted"
      fontSize="sm"
      textDecoration="none"
      _hover={{
        color: 'white',
        transition: 'color .2s ease-in',
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
