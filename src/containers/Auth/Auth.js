import React, { useState, useContext } from 'react';
import classes from './Auth.module.scss';
import is from 'is_js';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { Button } from '../../components/UI/Button/Button';
import { Form } from '../../components/UI/Form/Form';

export const Auth = () => {
    const { auth } = useContext(FirebaseContext);
    const [formControl, setFormControl] = useState({
        isFormValid: false,
        forms: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                touch: false,
                valid: false,
                errorMessage: 'Введите корректно email',
                validation: {
                    reqired: true,
                    email: true
                },
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                touch: false,
                valid: false,
                errorMessage: 'Пароль должен состоять не менее чем из 6 символов',
                validation: {
                    reqired: true,
                    minLength: 6
                },
            }
        }
    });

    const cls = `col-lg-5 col-md-8 col-sm-11 bg-light ${classes.Auth}`

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
        control.touch = true;

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
        <div className={cls}>
            <Form forms={formControl.forms} onChangeHandler={onChangeHandler}>
                <Button setStyle="mr-3 mb-2" type="success" disabled={!formControl.isFormValid} onClick={loginHandler}>
                    Авторизация
                </Button>
                <Button setStyle="mb-2" type="primary" disabled={!formControl.isFormValid} onClick={registerHandler}>
                    Регистрация
                </Button>
            </Form>
        </div>
    );
}