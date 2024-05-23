import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
// import { response } from "../../../api/src/app";

export default function PlacePage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    const inputHeader = (text) => {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    const inputDescription = (text) => {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    
    const addPhotoByLink = async (ev) => {
        ev.preventDefault();
        try {
            const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
            setAddedPhotos(prev => [...prev, filename]);
            setPhotoLink('');
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    }

    // const uploadPhoto = (ev) => {
    //     ev.preventDefault();

    //     const files = ev.target.files;
    //     const data = new FormData();
    //     for (let index = 0; index < array.length; index++) {
    //         data.set('photos', files[index]);

    //     }
    //     axios.post('/upload', data, {
    //         headers: { 'Content-Type': 'multipart/form-data' }
    //     }).then(response => {
    //         const { data: filename } = response;
    //         setAddedPhotos(prev => {
    //             return [...prev, filename];
    //         })
    //     })
    // }


    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form action="">
                        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                        <input type="text"
                            placeholder="title, for exampel: My lovely apt"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                        />
                        {preInput('Address', 'Address to this place')}
                        <input type="text"
                            placeholder="address"
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}
                        />
                        {preInput('Photo', 'more = better')}
                        <div className="flex gap-2">
                            <input type="text"
                                placeholder={'Add using a link ...jpg'}
                                value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)}
                            />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                                <div key={index}>
                                    <img className="rounded-2xl"
                                        src={`http://localhost:3000/uploads/${link}`}
                                        alt={`Uploaded ${index}`}
                                    />
                                </div>
                            ))}
                            <label className="cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                                <input type="file" className="hidden" />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                </svg>
                                Upload
                            </label>
                        </div>
                        {preInput('Description', 'Description of the place')}
                        <textarea
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                        />
                        {preInput('Perks', 'Select all the parks of your place')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra info', 'house rules, etc')}
                        <textarea
                            value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)}
                        />
                        {preInput('Check in&out times, max guests', 'add check in and out times, remember to have time window for cleaning the room between guests')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text"
                                    placeholder="14:00"
                                    value={checkIn}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                />
                            </div>
                            <div>
                                <h3>Check out time</h3>
                                <input type="text"
                                    placeholder="11"
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                />
                            </div>
                            <div>
                                <h3>Max number of guests</h3>
                                <input type="number"
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)}
                                />
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>

            )}
        </div>
    )
};
