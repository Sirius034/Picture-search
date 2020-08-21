import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export const ImageOutput = ({ perPageHandler }) => {
    const onSelect = (eventKey) => {
        perPageHandler(eventKey);
    }

    return (
        <DropdownButton id="output" title={<i className="fas fa-th-list"></i>} size="sm" variant="secondary">
            <Dropdown.Item as="button" eventKey="20" onSelect={onSelect}>20 Изображений</Dropdown.Item>
            <Dropdown.Item as="button" eventKey="50" onSelect={onSelect}>50 Изображений</Dropdown.Item>
            <Dropdown.Item as="button" eventKey="100" onSelect={onSelect}>100 Изображений</Dropdown.Item>
        </DropdownButton >
    );
}