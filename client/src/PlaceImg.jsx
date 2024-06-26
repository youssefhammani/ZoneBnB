export default function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photos?.length) {
        return '';
    }

    if (!className) {
        className = 'object-cover';
    }

    return (
        // <Image className={className} src={place.photos[index]} alt="" />
        <img className={className} src={'http://localhost:3000/uploads/' + place.photos[index]} alt="" />
    )
};
