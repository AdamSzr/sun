import { chromium } from "playwright"
import { NextRequest } from "next/server"
import { ApiErrorResponse, SuccessResponse } from "@fet/responses"
import rates from './market.json'

const currencies = [ `AUX`, `AG`, `EUR`, `USD` ]


export async function GET( request:NextRequest ) {

  // const gold = await scrapeApart()
  // const currencies = await loadNbpRates()
  // const tavexSilver = await scrapeTavex( `srebro` )
  // const tavexGold = await scrapeTavex( `zloto` )

  return SuccessResponse( rates.item )
}


export async function scrapeApart() {
  return Promise.resolve([
    {
      "name": `Australijski Kangur 1oz - 2025/2026r.`,
      "price": `16 022`,
      "link": `https://mennica.apart.pl/produkt/australijski-kangur-1oz-20252026r/3`,
    },
    {
      "name": `Australijski Kangur 1oz - 2025/2026r. (24h)`,
      "price": `16 069`,
      "link": `https://mennica.apart.pl/produkt/australijski-kangur-1oz-20252026r-24h/10`,
    },
    {
      "name": `Australijski Kangur 1oz - Różne roczniki (24h)`,
      "price": `16 053`,
      "link": `https://mennica.apart.pl/produkt/australijski-kangur-1oz-rozne-roczniki-24h/247`,
    },
    {
      "name": `Britannia 1oz - 2025/2026r`,
      "price": `16 069`,
      "link": `https://mennica.apart.pl/produkt/britannia-1oz-20252026r/132`,
    },
    {
      "name": `Britannia 1oz - 2025/2026r (24h)`,
      "price": `16 108`,
      "link": `https://mennica.apart.pl/produkt/britannia-1oz-20252026r-24h/133`,
    },
    {
      "name": `Britannia 1oz - Różne roczniki (24h)`,
      "price": `16 108`,
      "link": `https://mennica.apart.pl/produkt/britannia-1oz-rozne-roczniki-24h/13`,
    },
    {
      "name": `Filharmonik Wiedeński 1oz - 2025/2026r`,
      "price": `16 147`,
      "link": `https://mennica.apart.pl/produkt/filharmonik-wiedenski-1oz-20252026r/2`,
    },
    {
      "name": `Filharmonik Wiedeński 1oz - 2025/2026r (24h)`,
      "price": `16 194`,
      "link": `https://mennica.apart.pl/produkt/filharmonik-wiedenski-1oz-20252026r-24h/9`,
    },
    {
      "name": `Filharmonik Wiedeński 1oz - Różne roczniki (24h)`,
      "price": `16 147`,
      "link": `https://mennica.apart.pl/produkt/filharmonik-wiedenski-1oz-rozne-roczniki-24h/246`,
    },
    {
      "name": `Kanadyjski Liść Klonowy 1oz - 2024/2025r (24h)`,
      "price": `16 194`,
      "link": `https://mennica.apart.pl/produkt/kanadyjski-lisc-klonowy-1oz-20242025r-24h/8`,
    },
    {
      "name": `Kanadyjski Liść Klonowy 1oz - 2024/2025r.`,
      "price": `16 147`,
      "link": `https://mennica.apart.pl/produkt/kanadyjski-lisc-klonowy-1oz-20242025r/1`,
    },
    {
      "name": `Kanadyjski Liść Klonowy 1oz - Różne roczniki (24h)`,
      "price": `16 163`,
      "link": `https://mennica.apart.pl/produkt/kanadyjski-lisc-klonowy-1oz-rozne-roczniki-24h/202`,
    },
    {
      "name": `Krugerrand 1oz - 2024/2025r. (24h)`,
      "price": `16 194`,
      "link": `https://mennica.apart.pl/produkt/krugerrand-1oz-20242025r-24h/12`,
    },
    {
      "name": `Krugerrand 1oz - 2024/2025r.`,
      "price": `16 147`,
      "link": `https://mennica.apart.pl/produkt/krugerrand-1oz-20242025r/5`,
    },
    {
      "name": `Krugerrand 1oz - Różne roczniki (24h)`,
      "price": `16 038`,
      "link": `https://mennica.apart.pl/produkt/krugerrand-1oz-rozne-roczniki-24h/170`,
    },
    {
      "name": `Amerykański Orzeł 1oz - 2024/2025r. (24h)`,
      "price": `16 524`,
      "link": `https://mennica.apart.pl/produkt/amerykanski-orzel-1oz-20242025r-24h/11`,
    },
    {
      "name": `Amerykański Orzeł 1oz - Różne roczniki (24h)`,
      "price": `16 351`,
      "link": `https://mennica.apart.pl/produkt/amerykanski-orzel-1oz-rozne-roczniki-24h/248`,
    },
    {
      "name": `Amerykański Bizon 1oz (24h)`,
      "price": `16 618`,
      "link": `https://mennica.apart.pl/produkt/amerykanski-bizon-1oz-24h/14`,
    },
    {
      "name": `Austriacki Dukat (24h)`,
      "price": `1 899`,
      "link": `https://mennica.apart.pl/produkt/austriacki-dukat-24h/138`,
    },
    {
      "name": `4 Dukaty Austriackie (Czworak) (24h)`,
      "price": `7 456`,
      "link": `https://mennica.apart.pl/produkt/4-dukaty-austriackie-czworak-24h/139`,
    },
    {
      "name": `Złoty Słoń 1oz - Big Five (24h)`,
      "price": `16 430`,
      "link": `https://mennica.apart.pl/produkt/zloty-slon-1oz-big-five-24h/136`,
    },
    {
      "name": `Somalijski Słoń 1oz (24h)`,
      "price": `17 166`,
      "link": `https://mennica.apart.pl/produkt/somalijski-slon-1oz-24h/245`,
    },
    {
      "name": `Chińska Panda 30g`,
      "price": `15 954`,
      "link": `https://mennica.apart.pl/produkt/chinska-panda-30g/1888`,
    },
    {
      "name": `Australijski Kangur 1/2 oz (24h)`,
      "price": `8 387`,
      "link": `https://mennica.apart.pl/produkt/australijski-kangur-12-oz-24h/83`,
    },
    {
      "name": `Australijski Kangur 1/4 oz - 2025/2026r. (24h)`,
      "price": `4 272`,
      "link": `https://mennica.apart.pl/produkt/australijski-kangur-14-oz-20252026r-24h/84`,
    },
    {
      "name": `Australijski Kangur 1/10 oz (24h)`,
      "price": `1 756`,
      "link": `https://mennica.apart.pl/produkt/australijski-kangur-110-oz-24h/85`,
    },
    {
      "name": `Britannia 1/2 oz (24h)`,
      "price": `8 426`,
      "link": `https://mennica.apart.pl/produkt/britannia-12-oz-24h/92`,
    },
    {
      "name": `Britannia 1/4 oz (24h)`,
      "price": `4 272`,
      "link": `https://mennica.apart.pl/produkt/britannia-14-oz-24h/93`,
    },
    {
      "name": `Britannia 1/10 oz (24h)`,
      "price": `1 709`,
      "link": `https://mennica.apart.pl/produkt/britannia-110-oz-24h/94`,
    },
    {
      "name": `Filharmonik Wiedeński 1/2 oz (24h)`,
      "price": `8 348`,
      "link": `https://mennica.apart.pl/produkt/filharmonik-wiedenski-12-oz-24h/79`,
    },
    {
      "name": `Filharmonik Wiedeński 1/4 oz (24h)`,
      "price": `4 272`,
      "link": `https://mennica.apart.pl/produkt/filharmonik-wiedenski-14-oz-24h/80`,
    },
    {
      "name": `Filharmonik Wiedeński 1/10 oz (24h)`,
      "price": `1 756`,
      "link": `https://mennica.apart.pl/produkt/filharmonik-wiedenski-110-oz-24h/81`,
    },
    {
      "name": `Filharmonik Wiedeński 1/25 oz(24h)`,
      "price": `796`,
      "link": `https://mennica.apart.pl/produkt/filharmonik-wiedenski-125-oz24h/82`,
    },
    {
      "name": `Kanadyjski Liść Klonowy 1/2 oz (24h)`,
      "price": `8 466`,
      "link": `https://mennica.apart.pl/produkt/kanadyjski-lisc-klonowy-12-oz-24h/75`,
    },
    {
      "name": `Kanadyjski Liść Klonowy 1/4 oz (24h)`,
      "price": `4 341`,
      "link": `https://mennica.apart.pl/produkt/kanadyjski-lisc-klonowy-14-oz-24h/76`,
    },
    {
      "name": `Kanadyjski Liść Klonowy 1/10 oz (24h)`,
      "price": `1 803`,
      "link": `https://mennica.apart.pl/produkt/kanadyjski-lisc-klonowy-110-oz-24h/77`,
    },
    {
      "name": `Kanadyjski Liść Klonowy 1/20 oz (24h)`,
      "price": `1 097`,
      "link": `https://mennica.apart.pl/produkt/kanadyjski-lisc-klonowy-120-oz-24h/78`,
    },
    {
      "name": `Amerykański Orzeł 1/2 oz (24h)`,
      "price": `8 622`,
      "link": `https://mennica.apart.pl/produkt/amerykanski-orzel-12-oz-24h/86`,
    },
    {
      "name": `Amerykański Orzeł 1/4 oz (24h)`,
      "price": `4 409`,
      "link": `https://mennica.apart.pl/produkt/amerykanski-orzel-14-oz-24h/87`,
    },
    {
      "name": `Amerykański Orzeł 1/10 oz (24h)`,
      "price": `1 819`,
      "link": `https://mennica.apart.pl/produkt/amerykanski-orzel-110-oz-24h/88`,
    },
    {
      "name": `Krugerrand 1/2 oz (24h)`,
      "price": `8 426`,
      "link": `https://mennica.apart.pl/produkt/krugerrand-12-oz-24h/89`,
    },
    {
      "name": `Krugerrand 1/4 oz (24h)`,
      "price": `4 321`,
      "link": `https://mennica.apart.pl/produkt/krugerrand-14-oz-24h/90`,
    },
    {
      "name": `Krugerrand 1/10 oz (24h)`,
      "price": `1 787`,
      "link": `https://mennica.apart.pl/produkt/krugerrand-110-oz-24h/91`,
    },
    {
      "name": `Chińska Panda 15g`,
      "price": `8 317`,
      "link": `https://mennica.apart.pl/produkt/chinska-panda-15g/1889`,
    },
    {
      "name": `Chińska Panda 8g`,
      "price": `4 597`,
      "link": `https://mennica.apart.pl/produkt/chinska-panda-8g/1890`,
    },
    {
      "name": `Chińska Panda 3g`,
      "price": `1 845`,
      "link": `https://mennica.apart.pl/produkt/chinska-panda-3g/1891`,
    },
    {
      "name": `Chińska Panda 1g`,
      "price": `696`,
      "link": `https://mennica.apart.pl/produkt/chinska-panda-1g/1892`,
    },
    {
      "name": `Australijski Lunar - Rok Konia 1/2oz (24h)`,
      "price": `8 544`,
      "link": `https://mennica.apart.pl/produkt/australijski-lunar-rok-konia-12oz-24h/1649`,
    },
  ])



  const browser = await chromium.launch({
    headless: true,
  })

  const page = await browser.newPage({
    userAgent:
      `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120`,
  })

  await page.goto( `https://mennica.apart.pl/zloto/monety`, {
    waitUntil: `networkidle`,
    timeout: 60000,
  } )

  // jeśli lazy loading – przewijanie
  await page.evaluate( () => {
    window.scrollTo( 0, document.body.scrollHeight )
  } )

  await page.waitForTimeout( 2000 )

  const products = await page.$$eval( `.product`, items =>
    items.map( el => {
      return ({
        name: el.querySelector( `.product-name  a.productListGTM` )?.innerText.trim(),
        price: el.querySelector( `.price > .value` )?.innerText.trim(),
        link: el.querySelector( `a` )?.href,
      })
    } ),
  )

  await browser.close()
  return products
}


export async function loadNbpRates() {
  type NBPRate = { currency: string, mid: number, code: string }
  const rates = await fetch( `https://api.nbp.pl/api/exchangerates/tables/A?format=json` ).then( it => it.json() ).then( it => it.at( 0 ).rates as NBPRate[] )

  return rates.map( ({ currency, mid, code }) => ({ currency, code, price:mid }) )
}



export async function scrapeTavex( metal:`zloto` | `srebro` ) {
  const urlGen = (pageNr:number) => `https://tavex.pl/${metal}/page/${pageNr}?filter%5Bstock_indicator%5D%5B0%5D=1`
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()


  const products = []
  let pageNr = 1

  while (true) {
    try {
      const response = await page.goto( urlGen( pageNr ), {
        waitUntil: `networkidle`,
        timeout: 60000,
      } )

      if (!response || response.status() === 404) {
        console.log( `Strona ${pageNr} nie istnieje (404)` )
        break
      }

      await page.waitForSelector( `.v-category__content`, { timeout: 10000 } )

      const loadedProducts = await page.$$eval( `.v-category__content .product__meta`, els =>
        els.map( el => {
          const name = el.querySelector( `.product__title-inner` )?.textContent.trim()
          const price = el.querySelector( `.product__price.product__price--single  .product__price-value` )?.innerText?.split( ` ` ).at( 0 )?.replace( `,`, `.` )
          
          return ({
            name,
            price: isNaN( price ) ? price : Number( price ),
          })

        } ),
      )

      if (loadedProducts.length === 0) {
        console.log( `Brak produktów na stronie ${pageNr}` )
        break
      }

      products.push( loadedProducts )
      

      pageNr++ // przechodzimy do następnej strony

    } catch (err) {
      console.error( `Błąd podczas pobierania strony ${pageNr}:`, err )
      break
    }
  }


  await browser.close()
  return products.flat()
}
