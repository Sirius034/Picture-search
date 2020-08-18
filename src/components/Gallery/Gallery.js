import React, { useState, useContext } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { Card } from '../Card/Card';
import { Button } from '../UI/Button';
import { Loading } from '../UI/Loading';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { Backdrop } from '../UI/Backdrop/Backdrop';
import { Picture } from '../Picture/Picture';

const Gallery = ({ imges, loading, handler, type }) => {
    const { token } = useContext(FirebaseContext);

    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
    const [view, setView] = useState('');

    useScrollPosition(({ currPos }) => {
        setScrollPosition({ ...currPos, y: currPos.y - 500 });
    });

    const viewHandlers = (src) => {
        setView(src);
    }

    const clearHandlers = () => {
        setView('');
    }

    if (loading) return <Loading />

    const BtnChildren = type !== 'danger' ? 'В избранное' : 'Удалить';

    return (
        <div className="col-12 card-columns bg-dark shadow-lg p-4 ">
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
                            src={img.webformatURL}
                            scrollPosition={scrollPosition}
                            height={img.webformatHeight}
                            width={img.webformatWidth}
                            pixabay={img.pageURL}
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