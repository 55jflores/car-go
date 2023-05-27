"use client"

import { Car } from "../../types/cars.types"
import React, {useState, FormEvent, cache } from 'react'
import useSWR, {mutate} from 'swr'
import Image from "next/image"
import Link from "next/link"
import LoadingComponent from "../customLoading"
import BlurImage from "../components/BlurImage"

interface Cars {
    make: string;
    model: string[];
  }

interface FormData {
  year: string,
  make: string,
  model: string
}

const fetcher = async (url: string):Promise<Car[]> => {
  const res = await fetch(url);
  const data = await res.json();
  console.log('Data is ',data);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  if (data === null) {
    return []
  }
  return data;
}

const Maincomponent = () => {
  // Array of objects for dropdown menus
  const carsArray: Cars[] = [
      { make: 'Nissan', model: ['Altima', 'Maxima'] },
      { make: 'Honda', model: ['Accord', 'Civic'] },
      { make: 'Ford', model: ['Focus', 'GT'] },   
  ];
  
  // Holds make and model that the user has selected
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  
  // Array of type Car that will hold response from request
  const [cars, setCars] = useState<Car[]| null>(null); 
  const [loading, setLoading] = useState<boolean | null>(null);

  // Variables that will hold make and model to pass as query params to details page
  const [formData, setFormData] = useState<FormData>({year: '', make: '', model: ''})

  //const [make, setMake] = useState('')
  //const [model, setModel] = useState('')
  //const [year, setYear] = useState('')
  // Setting Make and resetting Model
  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMake(event.target.value);
      setSelectedModel('');
  };
    
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(event.target.value)
  }
  // Setting model
  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };
    
  // Iterating over array of objects. Returning object that matches Make we are looking for
  const selectedMakeData = carsArray.find(
    (car) => car.make === selectedMake
  );

  const handleSubmit = async (event: FormEvent) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault()
      // Displaying loading component
      //setLoading(true);
      // Cast the event target to an HTML form
      const form = event.target as HTMLFormElement
      const key = `/api/getcar/?year=${form.year.value}&make=${form.make.value}&model=${form.model.value}`

      setFormData({ year: form.year.value, make: form.make.value, model: form.model.value })

      //setMake(form.make.value)
      //setModel(form.model.value)
      //setYear(form.year.value)
      console.log('In here',form.year.value,form.model.value,form.make.value)
      mutate<Car[]>(key);
      // Calling backend to fetch data
      /*
      const res = await fetch(`/api/getcar/?year=${form.year.value}&make=${form.make.value}&model=${form.model.value}`,  {cache: 'no-store'})
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      // Extracting JSON
      const result = await res.json();
      */
      // Removing loading component and setting variable to array of Car objects 
      //setLoading(false)
      //setCars(result)

    }

    const { data, error, isLoading } = useSWR<Car[]>(
      formData['year'] && formData['make'] && formData['model'] ? `/api/getcar/?year=${formData['year']}&make=${formData['make']}&model=${formData['model']}` : null,
      fetcher
    );

  

    return (

      <div className="font-mono">
          
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="year" className="block mb-2 font-bold text-gray-700">
              Year
            </label>
            <input
              type="number"
              placeholder="YYYY"
              min="1950"
              max="2023"
              id="year"
              name="year"
              required
              value={selectedYear}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleYearChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="make-select" className="block mb-2 font-bold text-gray-700">
              Make
            </label>
            <select
              id="make"
              name="make"
              value={selectedMake}
              onChange={handleMakeChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Make</option>
              {carsArray.map((cars) => (
                <option key={cars.make} value={cars.make}>
                  {cars.make}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="model-select" className="block mb-2 font-bold text-gray-700">
              Model
            </label>
            <select
              id="model"
              name="model"
              value={selectedModel}
              onChange={handleModelChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Model</option>
              {selectedMakeData &&
                selectedMakeData.model.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Search
          </button>
      </form>


      <div className="flex flex-col items-center">

        {isLoading && <LoadingComponent message="Grabbing cars for sale..." />}
        
        {data?.length == 0 && <h1>{formData['year']} {formData['make']} {formData['model']} not found</h1>}
        {data && data.map((car: Car) => (
          <div key={car.id} className="mb-4">
            <Link
              key={car.id}
              href="/details/[make]/[model]/[carId]"
              as={`/details/${formData['make']}/${formData['model']}/${car.id}`}
              className="block cursor-pointer"
            >
              <p className="text-blue-500 font-bold">{car.contact}</p>
              <p className="text-gray-600">{car.created_at}</p>
              <p className="text-gray-600">{car.price}</p>
              <p className="text-gray-600">{car.year}</p>
              <BlurImage key={car.pictures![0] as string} url={car.pictures![0]} />
              
            </Link>
          </div>
        ))}
      </div>

    </div>

  )
}


export const metadata = {
    title: 'Select Cars',
    description: 'View cars from our selection'
}
export default Maincomponent;