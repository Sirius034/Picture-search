import React, { useContext, useState, useEffect } from 'react';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { Button } from '../../components/UI/Button/Button';
import { Editor } from '../../components/Editor/Editor';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { Form } from '../../components/UI/Form';
import AnimateHeight from 'react-animate-height';
import classes from './User.module.css';

export const User = () => {
    const { logout, user, editor } = useContext(FirebaseContext);
    const [inEditor, setInEditor] = useState(false);
    
    const [forms, setForms] = useState({
        name: { type: 'text', value: '', label: 'Name' },
        age: { type: 'number', value: '', label: 'Age' },
    });

    useEffect(() => {
        const controls = {...forms};
        controls.name.value = user.name;
        controls.age.value = user.age;
        
        setForms(controls);
        // eslint-disable-next-line
    },[]);

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
        setForms({...forms, [controlName]: control });
    }

    const editing = () => setInEditor(!inEditor) 

    const hgt = inEditor ? 'auto' : 0;

    const cls = `col-10 bg-light ${classes.User}`;

    return (
        <div className={`col-10 bg-light ${cls}`} >
            <div className="d-flex align-items-start justify-content-end">
                <Button onClick={editing}>
                    Редактировать
                </Button>

                <Button type="danger" onClick={logout}>
                    Выйти
                </Button>
            </div>

            <UserProfile user={user} />            

            <AnimateHeight height={hgt} duration={300} className="col-12">
                <hr className="col-10 h-20 mb-5" />
                <Editor >
                    <Form forms={forms} onChangeHandler={onChangeHandler}>
                        <Button onClick={saveProfileHandler}>Сохранить</Button>
                    </Form>
                </Editor>
            </AnimateHeight>
        </div>
    );
}