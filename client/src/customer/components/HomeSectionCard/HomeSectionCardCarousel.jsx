
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from './HomeSectionCard';
import "./HomeSectionCard.scss"
import { useState } from 'react';


export const HomeSectionCardCarousel = ({data, sectionName}) => {

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 4 },
        1280: { items: 5 },
        1440: { items: 6 },
        1600: { items: 7 },
        1920: { items: 8 },
        2048: { items: 9 },
    };

    const [activeIndex, setActiveIndex] = useState(0)
    
    // const syncActiveIndex = ({ item }) => setActiveIndex(item)

    const syncActiveIndexForSwipeGestures = (e) => setActiveIndex(e.item);

    const onSlideChanged = (e) => {
        syncActiveIndexForSwipeGestures(e);
  
    };

    const items = data.map((item, index) =>

        <HomeSectionCard image={item.image} name={item.name} price={item.price} key={index} />

    )

    return (

        <div className="home-card-carousel ">
            <h1>{sectionName}</h1>
            <div className="relative p-5 ">
                <AliceCarousel
                    mouseTracking
                    items={items}
                    responsive={responsive}
                    disableDotsControls
                    onSlideChanged={onSlideChanged}
                    activeIndex={activeIndex}
        
                />
               

            </div>
        </div>
    )

};