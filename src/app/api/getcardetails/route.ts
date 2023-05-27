import { NextRequest } from "next/server";
import supabaseClient from "../supabaseclient";

export async function GET(req: NextRequest) {
    
    // Grabbing search parameters
    const {searchParams} = new URL(req.url)

    // Extracting parameters
    const id = searchParams.get('carId') as string 
    const make = searchParams.get('make') as string
    const model = searchParams.get('model') as string

    // Table to select from
    const table = make.charAt(0).toUpperCase() + make.substring(1) + model.charAt(0).toUpperCase() + model.substring(1)
    console.log('Table is ',table)

    // Grabbing data
    const {data, error} = await supabaseClient.from(table).select('*').eq('id',id)
    // Returning response
    return new Response(JSON.stringify(data))

}