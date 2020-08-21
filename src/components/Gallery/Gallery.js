import React, { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { Card } from '../Card/Card';
import { Button } from '../UI/Button/Button';
import { Backdrop } from '../UI/Backdrop/Backdrop';
import { Picture } from '../Picture/Picture';

const Gallery = ({ imges, handler, type, token }) => {
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

    const BtnChildren = type !== 'danger' ? 'В избранное' : 'Удалить';
   
    return (
        <div className="card-columns bg-dark shadow-lg py-1 px-1">
            {view && <Picture src={view} onClick={clearHandlers} >
                <Backdrop onClick={clearHandlers}/>
            </Picture>}
            
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
                            {token && <Button type={type} onClick={() => handler(img.id)}>{BtnChildren}</Button>}
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default trackWindowScroll(Gallery);