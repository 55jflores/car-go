import useSWR from 'swr';
import { Car } from '@/types/cars.types';
import LoadingComponent from '@/app/customLoading';
import Image from 'next/image';
import BlurImage from '../../../../components/BlurImage';

interface PageProps {
    params : {
        make: string,
        model: string,
        carId: string 
    }
}

const getCar = async (make:string, model:string, carId:string): Promise<Car[]> => {
    const res = await fetch(`http://localhost:3000/api/getcardetails/?make=${make}&model=${model}&carId=${carId}`, {cache: 'no-store'})

    console.log('Res ok', res.ok)
    if (!res.ok) {
        throw new Error('Failed To fetch data')
    }
    
    return res.json();
}

const page = async ({params}: PageProps) => {
    /*
    const fetcher = async (carId: string): Promise<Car[]> => {
        const res = await fetch(`/api/getcardetails/?make=${params.make}&model=${params.model}&carId=${carId}`)
        const data = await res.json();
        
        console.log('Data is ',data)
        return data;
    }
    */

    const data = await getCar(params.make, params.model, params.carId);

    //const {data, error, isLoading} = useSWR<Car[]>(params.carId,fetcher);

    //if(error) return <p>Dam, got an error</p>;
    //if(isLoading) return <LoadingComponent message={`Grabbing ${params.make} ${params.model} details...`}/> 


    return(
        <div className='font-mono'>
            {data && (
                <div className='flex flex-col items-center'>
                    <h1>{data[0].year} {params.make} {params.model} </h1>
                    <p className="text-blue-500 font-bold">{data[0].contact}</p>
                    <p className="text-gray-600">{data[0].created_at}</p>
                    <p className="text-gray-600">{data[0].price}</p>
                    <p className="text-gray-600">{data[0].year}</p>
                    <div className="flex justify-between mb-5">
                        {data[0].pictures?.map((picture) => 
                            <BlurImage key={picture} url={picture} />
                        )}
                    </div>
                </div>
            )
            }

        </div>
    )
}

export const metadata = {
    title: 'Car Details',
    description: 'Details about car you are viewing'
}

export default page;