import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        axios.get('/bookings')
            .then(res => {
                setBookings(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])




    return (
        <div>
            <AccountNav />
            <div>
                {
                    bookings?.length > 0 && bookings.map(booking => (
                        <div>
                            <div>
                                <PlaceImg place={booking.place} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

};
