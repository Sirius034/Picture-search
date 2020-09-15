import React, { useContext, useState, useEffect } from 'react';
import { User } from '../../components/User/User';
import { Button } from '../../components/UI/Button/Button';
import { Editor } from '../../components/Editor/Editor';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { Form } from '../../components/UI/Form/Form';
import AnimateHeight from 'react-animate-height';
import classes from './UserProfile.module.css';

export const UserProfile = () => {
    const { logout, user, editor } = useContext(FirebaseContext);
    const [inEditor, setInEditor] = useState(false);

    const [forms, setForms] = useState({
        name: { type: 'text', value: '', label: 'Name' },
        age: { type: 'number', value: '', label: 'Age' },
    });

    useEffect(() => {
        const controls = { ...forms };
        controls.name.value = user.name;
        controls.age.value = user.age;

        setForms(controls);
        // eslint-disable-next-line
    }, []);

    const saveProfileHandler = () => {
        const controls = { ...forms };
        const fieldsEditor = {};

        Object.keys(controls)
            .filter(fildName => controls[fildName].value !== user[fildName])
            .forEach(field => fieldsEditor[field] = controls[field].value);

        editor(fieldsEditor);
        setInEditor(!inEditor);
    }

    const onChangeHandler = (value, controlName) => {
        const control = { ...forms[controlName], value };
        setForms({ ...forms, [controlName]: control });
    }

    const editing = () => setInEditor(!inEditor)

    const hgt = inEditor ? 'auto' : 0;

    return (
        <div className={`col col-md-7 bg-light ${classes.UserProfile}`}>
            <div className="btn-toolbar justify-content-end">
                <div className="btn-group" role="group" >
                    <Button setStyle="mr-1" onClick={editing}>Редактировать</Button>
                    <Button type="danger" onClick={logout}>Выйти</Button>
                </div>
            </div>

            <User user={user} />

            <AnimateHeight height={hgt} duration={300} className="col-12 py-3">
                <hr className="col-10 h-20" />
                <Editor>
                    <Form forms={forms} onChangeHandler={onChangeHandler} />
                    <Button type="success" onClick={saveProfileHandler}>Сохранить</Button>
                </Editor>
            </AnimateHeight>
        </div>
    );
}
