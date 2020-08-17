import React, { useState, useContext } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { Card } from '../Card/Card';
import { Button } from '../UI/Button';
import { Loading } from '../UI/Loading';
import { FirebaseContext } from '../../context/firebase/firebaseContext';

const Gallery = ({ imges, loading, handler, type }) => {
    const { token } = useContext(FirebaseContext);
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

    useScrollPosition(({ currPos }) => {
        setScrollPosition({ ...currPos, y: currPos.y - 500 });
    })

    if (loading) return <Loading />

    const BtnChildren = type !== 'danger' ? 'В избранное' : 'Удалить';

    return (
        <div className="col-12 card-columns bg-dark shadow-lg p-4 ">
            {
                imges.map(img => {
                    return (
                        <Card
                            key={img.id}
                            id={img.id}
                            tags={img.tags}
                            src={img.webformatURL}
                            handler={handler}
                            scrollPosition={scrollPosition}
                            height={img.webformatHeight}
                            width={img.webformatWidth}
                            pixabay={img.pageURL}
                        >
                            {token && <Button type={type}>{BtnChildren}</Button>}
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default trackWindowScroll(Gallery);