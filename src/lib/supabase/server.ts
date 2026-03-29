import{createServerClient}from"@supabase/ssr"
import{cookies}from"next/headers"
export async function createClient(){const c=await cookies();return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,{cookies:{get(n){return c.get(n)?.value},set(n,v,o){try{c.set({name:n,value:v,...o})}catch{}},remove(n,o){try{c.set({name:n,value:"",...o})}catch{}}}})}