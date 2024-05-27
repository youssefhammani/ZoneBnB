import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);


    useEffect(() => {

        if (!id) {
            return;
        }

        axios.get('/places/' + id).then(({ data }) => {
            setPlace(data);
        });
    }, [id]);

    if (!place) return '';

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div className="">
                        <h2 className="text-3xl">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {
                        place?.photos?.length > 0 &&
                        place.photos.map(photo => (
                            <div className="">
                                <img
                                    className="w-full"
                                    src={'http://localhost:3000/uploads/' + photo}
                                    alt=""
                                />
                            </div>

                        ))
                    }
                </div>

            </div>
        );
    }




    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl mr-48">{place.title}</h1>
            <a className="flex gap-1 my-3 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.address}
            </a>
            <PlaceGallery place={place} />

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="">
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests}
                </div>
                <div className="">
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div className="">
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>

        </div>
    );
};
