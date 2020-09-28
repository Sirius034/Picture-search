import React, { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { Card } from '../Card/Card';
import { Button } from '../UI/Button/Button';
import { ViewPicture } from '../ViewPicture/ViewPicture';

const Gallery = ({ imges, actionHandler, type, token }) => {
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
    const [view, setView] = useState(false);

    useScrollPosition(({ currPos }) => {
        setScrollPosition({ ...currPos, y: currPos.y + 500 });
    });

    const viewHandlers = (src) => {
        setView(src);
    }

    const clearHandlers = () => {
        setView(false);
    }

    const clickHandler = (ev, id) => {
        ev.stopPropagation();
        actionHandler(id);
    }

    const BtnChildren = type !== 'danger'
        ? <i className="fas fa-star"></i>
        : 'Удалить';

    return (
        <div className="card-columns bg-dark shadow-lg py-4 px-2">
            {view && <ViewPicture src={view} onClick={clearHandlers} />}

            {
                imges.map(img => {
                    return (
                        <Card
                            key={img.id}
                            id={img.id}
                            tags={img.tags}
                            src={img.largeImageURL}
                            scrollPosition={scrollPosition}
                            height={img.webformatHeight}
                            width={img.webformatWidth}
                            pixabay={img.largeImageURL}
                            viewHandlers={viewHandlers}
                        >
                            { token && <Button type={type} onClick={(ev) => clickHandler(ev, img.id)}>{BtnChildren}</Button> }
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default trackWindowScroll(Gallery);