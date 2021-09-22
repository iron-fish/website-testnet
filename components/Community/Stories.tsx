import Img from 'next/image'
import Link from 'next/link'

import clsx from 'clsx'

import hipster from 'public/cold-hipster.png'
import inks from 'public/inks.png'
import windows from 'public/windows-pc.png'
import island from 'public/island.png'

import styles from './Stories.module.css'

const stories = [
  {
    title: 'Iron Fish in Russian',
    submittedBy: 'Gregg G.',
    link: '#',
    image: hipster,
  },
  {
    title: 'Iron Fish in Russian',
    submittedBy: 'Gregg G.',
    link: '#',
    image: inks,
  },
  {
    title: 'Iron Fish in Russian',
    submittedBy: 'Gregg G.',
    link: '#',
    image: windows,
  },
  {
    title: 'Iron Fish in Russian',
    submittedBy: 'Gregg G.',
    link: '#',
    image: island,
  },
]

const Stories = () => (
  <div className="flex flex-row flex-wrap max-w-[72rem]">
    {stories.map(({ title, submittedBy, image, link }) => (
      <Link key={title} href={link} passHref>
        <a
          className={clsx(
            'rounded-lg',
            'overflow-hidden',
            'flex',
            'flex-column',
            'relative',
            styles.story
          )}
        >
          <div className="absolute bottom-8 w-full z-30 text-white left-8">
            <strong className="text-2xl">{title}</strong>
            <br />
            <span className="text-lg">Submitted by {submittedBy}</span>
          </div>
          <div
            className={clsx(
              'w-full',
              'h-full',
              'bg-black',
              'opacity-50',
              'absolute',
              'z-10'
            )}
          />
          <Img className={styles.image} src={image} />
        </a>
      </Link>
    ))}
  </div>
)
export default Stories
