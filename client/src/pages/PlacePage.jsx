import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
    const { id } = useParams();


    useEffect(() => {

        if (!id) {
            return;
        }

        axios.get('/places/' + id).then(({ data }) => {
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [])




    return (
        <div>
            Place page: {id}
        </div>
    );
};
