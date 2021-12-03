import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Button from 'components/Button'
import Logo from 'components/Logo'

type Props = {
  title: string
  links: Array<{ link: string; name: string }>
}

const LinksBlock = ({ title, links }: Props) => {
  return (
    <div className="mt-8 md:mt-0 mx-1">
      <h3 className="font-extended mb-2 text-xl">{title}</h3>
      <ul>
        {links.map(link => (
          <li className="font-extended leading-loose" key={link.link}>
            <Link href={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className="font-extended border-t text-ifblue z-30 relative bg-white">
      <div className="px-0 md:px-12">
        <div className="flex flex-col md:flex-row w-52 md:w-full m-auto justify-between py-14">
          <div className="mt-1">
            <a href="https://www.ironfish.network">
              <Logo />
            </a>
            <p className="mt-3 text-xs w-60">
              Iron Fish is a novel cryptocurrency focused on privacy and
              accessibility
            </p>
          </div>

          <LinksBlock
            title="Company"
            links={[
              {
                link: '/about/',
                name: 'About Us',
              },
              {
                link: 'https://ironfish.network/careers/',
                name: 'Careers',
              },
              {
                link: 'https://ironfish.network/blog/',
                name: 'Blog',
              },
            ]}
          />
          <LinksBlock
            title="Product"
            links={[
              // {
              //   link: "/docs/onboarding/iron-fish-tutorial",
              //   name: "Get started",
              // },
              {
                link: 'https://explorer.ironfish.network/',
                name: 'Block Explorer',
              },
              {
                link: 'https://ironfish.network/docs/whitepaper/1_introduction/',
                name: 'Whitepaper',
              },
              {
                link: '/faq/',
                name: 'FAQ',
              },
            ]}
          />
          <Button className="mt-8 md:mt-0">
            <a href="mailto:contact@ironfish.network">Drop us a line!</a>
          </Button>
        </div>

        <div className="flex justify-between items-center border-t w-full p-4">
          <p className="text-xs">
            <span>Copyright {new Date().getFullYear()} Iron Fish</span>
            <span className="hidden md:inline">. All rights reserved.</span>
          </p>
          <div className="flex justify-between items-center w-40">
            <a href="https://t.me/ironfishcryptochat">
              <Image
                src="/footer/telegram.svg"
                layout="fixed"
                width="14"
                height="16"
                alt="Telegram"
              />
            </a>
            <a href="https://github.com/iron-fish">
              <Image
                src="/footer/github.svg"
                layout="fixed"
                width="16"
                height="16"
                alt="Github"
              />
            </a>
            <a href="http://reddit.com/r/ironfish">
              <Image
                src="/footer/reddit.svg"
                layout="fixed"
                width="17"
                height="16"
                alt="Reddit"
              />
            </a>
            <a href="https://twitter.com/ironfishcrypto">
              <Image
                src="/footer/twitter.svg"
                layout="fixed"
                width="17"
                height="16"
                alt="Twitter"
              />
            </a>
            <a href="https://discord.gg/EkQkEcm8DH">
              <Image
                src="/footer/discord.svg"
                layout="fixed"
                width="15"
                height="16"
                alt="Discord"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
