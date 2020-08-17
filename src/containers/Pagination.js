import React, { useContext } from 'react';
import { PixabayContect } from '../context/pixbay/pixabayContext';

export const Pagination = () => {
    const { page, nextPageData } = useContext(PixabayContect);

    const nextPageHandler = () => {
        nextPageData(page + 1);
    }

    const previousPageHandler = () => {
        if (page === 1) return;

        nextPageData(page - 1);
    }

    return (
        <nav aria-label="New page">
            <ul className="pagination justify-content-center mt-4">
                <li className="page-item" onClick={previousPageHandler}>
                    <span className="page-link" >
                        <i className="fas fa-angle-double-left">
                            <span className="sr-only">Previous</span>
                        </i>
                    </span>
                </li>
                <li className="page-item disabled"><span className="page-link">{page}</span></li>
                <li className="page-item" onClick={nextPageHandler}>
                    <span className="page-link" >
                        <i className="fas fa-angle-double-right f100"></i>
                        <span className="sr-only">Next</span>
                    </span>
                </li>
            </ul>
        </nav>
    );
}