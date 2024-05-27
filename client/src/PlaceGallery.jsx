export default function PlaceGallery({place}) {
    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img
                                className="aspect-square cursor-pointer object-cover"
                                onClick={() => setShowAllPhotos(true)}
                                src={'http://localhost:3000/uploads/' + place.photos[0]}
                                alt=""
                            />
                        </div>

                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img
                            className="aspect-square cursor-pointer object-cover"
                            onClick={() => setShowAllPhotos(true)}
                            src={'http://localhost:3000/uploads/' + place.photos[1]}
                            alt=""
                        />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img
                                className="aspect-square cursor-pointer object-cover relative top-2"
                                onClick={() => setShowAllPhotos(true)}
                                src={'http://localhost:3000/uploads/' + place.photos[2]}
                                alt=""
                            />
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                </svg>
                Show more photos
            </button>
        </div>
    )

};
