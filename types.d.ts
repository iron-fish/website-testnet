import '@testing-library/jest-dom/extend-expect'
import 'jest-dom/extend-expect'
import 'jest-fetch-mock'

declare module '*module.css' {
  const styles: {
    [className: string]: string
  }
  export default styles
}
