import React, { useState, useContext } from 'react';
import { Button } from '../components/UI/Button';
import is from 'is_js';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { Form } from '../components/UI/Form';

export const Auth = () => {
    // Нужен стате для определения типа инпут и его контролер
    // так же для авторизации и регистрации
    const { auth } = useContext(FirebaseContext);
    const [formControl, setFormControl] = useState({
        isFormValid: false,
        forms: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                valid: false,
                validation: {
                    reqired: true,
                    email: true
                },
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                valid: false,
                validation: {
                    reqired: true,
                    minLength: 6
                },
            }
        }
    })

    const registerHandler = () => {
        auth(
            formControl.forms.email.value,
            formControl.forms.password.value,
            false
        );
    }

    const loginHandler = () => {
        auth(
            formControl.forms.email.value,
            formControl.forms.password.value,
            true
        );
    }

    const onChangeHandler = (value, controlName) => {
        const forms = { ...formControl.forms };
        const control = { ...forms[controlName], value };
        const valid = valideteControl(value, control.validation);

        control.valid = valid;
        forms[controlName] = control;

        let isFormValid = true;

        Object.keys(forms).forEach(nameForm => {
            isFormValid = forms[nameForm].valid && isFormValid;
        })

        setFormControl({ ...formControl, forms, isFormValid });
    }

    const valideteControl = (value, validation) => {
        let isValid = true;

        if (validation.reqired) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    return (
        <div className="col-7 bg-light border border-secondary shadow rounded m-auto p-3">
            <Form forms={formControl.forms} onChangeHandler={onChangeHandler}>
                <Button type="success" disabled={!formControl.isFormValid} onClick={loginHandler}>
                    Авторизация
                </Button>
                <Button type="primary" disabled={!formControl.isFormValid} onClick={registerHandler}>
                    Регистрация
                </Button>
            </Form>
        </div>
    );
}