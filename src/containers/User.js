import React, { useContext, useState } from 'react';
import { UserProfile } from '../components/UserProfile/UserProfile';
import { Button } from '../components/UI/Button';
import { Editor } from '../components/Editor/Editor';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import AnimateHeight from 'react-animate-height';
import { Form } from '../components/UI/Form';

export const User = () => {
    const { logout, user, editor } = useContext(FirebaseContext);

    const [state, setState] = useState({
        editor: false,
        forms: {
            name: { type: 'text', value: user.name, label: 'Name'},
            age: { type: 'number', value: user.age, label: 'Age'},
        }
    });

    const saveProfileHandler = () => {
        const controlName = {...state.forms};
        const fieldsEditor = {};
         
        Object.keys(controlName)
            .filter(fildName => controlName[fildName].value !== user[fildName])
            .forEach(field =>  fieldsEditor[field] = controlName[field].value);

        // отправть в editor и сохранить в бд
        editor(fieldsEditor);
    }

    const onChangeHandler = (value, controlName) => {
        const forms = {...state.forms };
        const control = {...forms[controlName], value };
        
        forms[controlName] = control;

        setState({ ...state, forms });
    }

    const editing = () => { setState({...state, editor: !state.editor }) }
    
    const hgt = state.editor ? 'auto' : 0;
  
    return (
        <div className="col-10 bg-light border border-secondary shadow rounded mx-auto py-4 row" >
            <div className="col-9 row">
                <UserProfile  user={user} />
            </div>

            <div className="col-3 d-flex align-items-start justify-content-end">
                <Button onClick={editing}>
                    Редактировать
                </Button>

                <Button type="danger" onClick={logout}>
                    Выйти
                </Button>
            </div>

            <AnimateHeight height={hgt} duration={700} className="col-12 mt-4">
                <hr className="col-10 h-20 mb-5" />
                <Editor >
                    <Form forms={state.forms} onChangeHandler={onChangeHandler}>
                        <Button onClick={saveProfileHandler}>Сохранить</Button>
                    </Form>
                </Editor>
            </AnimateHeight>
        </div>
    );
}