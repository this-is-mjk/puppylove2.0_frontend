import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import Image from 'next/image'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'Puppy Love',
    description: "IIT Kanpur's Dating App",
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: '',
        label: 'Home',
      },
      {
        id: 'credits',
        label: 'Credits',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{' '}
        <Link href="https://pclub.in/">Programming Club</Link>
      </>
    ),
    links: [
      {
        href: 'https://pclub.in/',
        label: 'Website',
      },
      {
        href: 'mailto:pclubiitk@gmail.com',
        label: 'Contact',
      },
      {
        href: 'https://www.linkedin.com/company/pclubiitk/',
        label: <FaLinkedin size="14" />,
      },
      {
        href: 'https://www.instagram.com/pclubiitk/',
        label: <FaInstagram size="14" />,
      },
      {
        href: 'https://github.com/pclubiitk',
        label: <FaGithub size="14" />,
      },
    ],
  },
  signup: {
    title: 'Start dating',
    features: [
      {
        icon: FiCheck,
        title: 'Accessible',
        description: 'All components strictly follow WAI-ARIA standards.',
      },
      {
        icon: FiCheck,
        title: 'Themable',
        description:
          'Fully customize all components to your brand with theme support and style props.',
      },
      {
        icon: FiCheck,
        title: 'Composable',
        description:
          'Compose components to fit your needs and mix them together to create new ones.',
      },
      {
        icon: FiCheck,
        title: 'Productive',
        description:
          'Designed to reduce boilerplate and fully typed, build your product at speed.',
      },
    ],
  },
}

export default siteConfig
