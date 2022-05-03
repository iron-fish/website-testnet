export const scrollUp = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

export const scrollTo = (el: HTMLElement) =>
  window.scrollTo({ top: el.getBoundingClientRect().top, behavior: 'auto' })
