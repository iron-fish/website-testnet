import styles from './index.module.css'

const FishPath = () => (
  <path
    strokeWidth="10000"
    stroke="#000000"
    d="m281.4 90.6-8.8-15.2L242.9 24l-6.3-11c-1.1-1.9-3.1-3.1-5.4-3.1h-89.7c-2.2 0-4.3 1.2-5.4 3.1L129 25.3 97.7 79.7c-.6 1-1.9 1.6-3.1 1.3-1.2-.3-2-1.4-2-2.7V52.5C92.5 29 73.4 9.9 49.9 9.9H13.5c-3.4 0-6.2 2.8-6.2 6.2v36.4c0 17 10.1 32.2 25.8 38.7 1 .4 1.7 1.4 1.7 2.5s-.7 2.1-1.7 2.5c-15.6 6.5-25.7 21.6-25.8 38.4v36.7c0 3.4 2.8 6.2 6.2 6.2h36.4c23.5 0 42.6-19.1 42.6-42.6v-25.8c0-1.2.8-2.3 2-2.7.2-.1.5-.1.7-.1 1 0 1.9.5 2.4 1.4l33.4 57.8 5.1 8.9c1.1 1.9 3.1 3.1 5.4 3.1h89.7c2.2 0 4.3-1.2 5.4-3.1L246 158l22.3-38.6.3-.6 10.2-17.7 2.5-4.3c1.2-1.9 1.2-4.3.1-6.2zM187 126.2c-17.5 0-31.7-14.6-31.7-32.5s14.2-32.5 31.7-32.5 31.7 14.6 31.7 32.5c.1 17.9-14.2 32.5-31.7 32.5z"
  />
)

export const Loader = () => (
  <>
    <svg className="h-0 w-0">
      <defs>
        <clipPath id="fishclip">
          <FishPath />
        </clipPath>
      </defs>
    </svg>
    <div
      className={styles.fishScale}
      role="alert"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className={styles.ironfishLoader} />
    </div>
  </>
)

export default Loader
