import React from 'react'

const Listing = () => {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl text-center my-7 font-semibold'>Create Listing</h1>

            <form className='flex flex-col sm:flex-row gap-5'>
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" className='border p-3 rounded-lg' id='name' placeholder='Name' minLength={'10'} maxLength={'62'} required />
                    <textarea type="text" className='border p-3 rounded-lg' id='description' placeholder='Description' required />
                    <input type="text" className='border p-3 rounded-lg' id='address' placeholder='Address' required />

                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='sale' />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='rent' />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='parking' />
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='furnished' />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='offer' />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input type="number" className='p-3 border rounded-lg' min={'1'} max={'10'} id="bedrooms" />
                            <p>Bedrooms</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="number" className='p-3 border rounded-lg' min={'1'} max={'10'} id="bathrooms" />
                            <p>Bathrooms</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="number" className='p-3 border rounded-lg' min={'1'} max={'10'} id="regularPrice" />
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / Month)</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="number" className='p-3 border rounded-lg' min={'1'} max={'10'} id="discountPrice" />
                            <div className='flex flex-col items-center'>
                                <p>Discounted Price</p>
                                <span className='text-xs'>($ / Month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input className='p-3 border border-gray-600 rounded w-full' type="file" id='images' accept='image/*' multiple />
                        <button className='p-3 text-green-700 uppercase border border-green-700 rounded hover:shadow-lg disabled:opacity-80'>Upload</button>
                    </div>
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default Listing
