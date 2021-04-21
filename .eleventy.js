const fs = require("fs")
const format = require("date-fns/format")
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")
const Image = require("@11ty/eleventy-img")
const sharp = require("sharp")

module.exports = function (config) {
  config.addPassthroughCopy("images")
  config.addPassthroughCopy("scripts")

  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  })

  config.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  })

  config.addCollection("works", function (collection) {
    const coll = collection.getFilteredByTag("works")

    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1]
      const nextPost = coll[i + 1]

      coll[i].data["prevPost"] = prevPost
      coll[i].data["nextPost"] = nextPost
    }

    return coll
  })

  config.setTemplateFormats([
    // Templates:
    'html',
    'njk',
    'md',
    // Static Assets:
    'jpeg',
    'webp',
    'jpg',
    'png',
    'svg',
    'woff',
    'woff2',
  ])

  config.addPlugin(eleventyNavigationPlugin)

  config.addNunjucksAsyncShortcode("Image", async (src, alt) => {
    if (!alt) {
      throw new Error(`Missing \`alt\` on myImage from: ${src}`)
    }

    let stats = await Image(src, {
      widths: [25, 320, 640, 960],
      formats: ["avif", "jpeg", "webp"],
      urlPath: "/images/",
      outputDir: "./_site/images/",
    })

    let lowestSrc = stats["jpeg"][0]

    const placeholder = await sharp(lowestSrc.outputPath)
      .resize({ fit: sharp.fit.inside })
      .blur()
      .toBuffer()

    const base64Placeholder = `data:image/png;base64,${placeholder.toString(
      "base64"
    )}`

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].reduce(
          (_acc, curr) => `${_acc} ${curr.srcset} ,`,
          ""
        ),
      }),
      {}
    )

    const source = `<source type="image/webp" data-srcset="${srcset["webp"]}" >`

    const img = `<img
      class="lazy"
      alt="${alt}"
      src="${base64Placeholder}"
      data-src="${lowestSrc.url}"
      data-sizes='(min-width: 1024px) 1024px, 100vw'
      data-srcset="${srcset["jpeg"]}"
      width="${lowestSrc.width}"
      height="${lowestSrc.height}">`

    return `<picture> ${source} ${img} </picture>`
  })

  return {
    dir: {
      input: 'src'
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}