import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import "../../../../public/pclub-logo.png"

const inter = Inter({ weight: '800', subsets: ['latin'] })

export const Logo: React.FC<HTMLChakraProps<'svg'>> = (props) => {
  const color = useColorModeValue('#3A3A40', '#d0cadb')
  return (
    <Flex flexDirection="row">
      <div style={{ borderRadius: '30px', overflow: 'hidden', top: "-20px" }}>
        <Image
          src={"/PuppyLove-logo.png"}
          alt="Logo"
          width={40}
          height={30}
        />
      </div>
      <Text fontSize="23" paddingLeft={4} className={inter.className} color={color}>Puppy Love</Text>
    </Flex>
  )
}
