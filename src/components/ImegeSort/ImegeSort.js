import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export const ImegeSort = ({ orderHandler, order }) => {
    const activeSort = order === 'popular' ? 'fire' : 'clock';
    const title = <i className={`fas fa-${activeSort}`}></i>

    const onSelect = (eventKey) => {
        orderHandler(eventKey);
    }

    return (
        <div className="mr-3">
            <DropdownButton id="sort" title={title} size="sm" variant="secondary">
                <Dropdown.Item as="button" eventKey="popular" onSelect={onSelect}>
                    <i className="fas fa-fire"></i> Популярные
                </Dropdown.Item>
                <Dropdown.Item as="button" eventKey="latest" onSelect={onSelect}>
                    <i className="fas fa-clock"></i> Новые
            </Dropdown.Item>
            </DropdownButton >
        </div>
    );
}