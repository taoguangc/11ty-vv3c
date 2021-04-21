import Glide, { Swipe, Images, Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'
new Glide('.glide.home', {
  type: 'carousel',
  focusAt: 'center',
  perView: 1,
  gap: 0
}).mount({ Swipe, Images, Controls, Breakpoints })
new Glide('.glide.works', {
  type: 'carousel',
  startAt: 1,
  perView: 3,
  peek: {
    before: 180,
    after: 180
  },
  gap: 60,
  breakpoints: {
    1024: {
      peek: {
        before: 80,
        after: 80
      },
      gap: 40
    },
    800: {
      perView: 2,
      peek: {
        before: 80,
        after: 80
      },
      gap: 40
    },
    640: {
      perView: 1,
      peek: {
        before: 60,
        after: 60
      },
      gap: 40
    }
  }
}).mount({ Swipe, Images, Controls, Breakpoints })