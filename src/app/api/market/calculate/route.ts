import { SuccessResponse } from '@fet/responses'
import rates from './../market.json'

export async function GET() {
  const tavex = [ ...rates.item.tavexGold, ...rates.item.tavexSilver ]
  const merged = items.map( it => ({ ...it, ...tavex.find( v => v.name === it.name ) }) ).map( it => ({ ...it, total: it.amount * it.price }) )
  return SuccessResponse({ data:merged, total: merged.reduce( (p, a) => p + a.total, 0 ) })
}


const items =   [
  { name:`Złota moneta Wiedeński Filharmonik 1 oz`, amount:2 },
  { name:`Moneta Złoty Dukat Austriacki 3,44 g`, amount:9 },
  { name:`Srebrna moneta Wiedeński Filharmonik 1 oz`, amount:6 },
  { name:`Srebrna moneta Wiedeński Filharmonik 1 oz`, amount:6 },
  { name:`EUR`, amount: 5800 },
],
