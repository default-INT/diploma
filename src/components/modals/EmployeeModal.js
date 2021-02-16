import React, {useState} from 'react'
import { ModalWindow } from "./index";
import PropTypes from "prop-types";

const EMPLOYEE_NAME_PATTERN = /[A-zА-я]{4,40}/

const validEmployeeName = name => EMPLOYEE_NAME_PATTERN.test(name.trim())
const validBirthYear = number => !isNaN(number) && +number !== 0 && parseInt(number) > 1930

const EmployeeModal = ({employee, action, title = 'Добавление нового тарифа', onModalState}) => {
    employee || (
        employee = {
            firstName: '',
            secondName: '',
            lastName: '',
            birthdayYear: '',
            fired: null
        }
    )

    const [firstName, setFirstName] = useState(employee.firstName)
    const [secondName, setSecondName] = useState(employee.secondName)
    const [lastName, setLastName] = useState(employee.lastName)
    const [birthdayYear, setBirthdayYear] = useState(employee.birthdayYear)
    const [fired, setFired] = useState(employee.fired)
    const [msg, setMsg] = useState('')

    const actionOnClick = () => {
        try {
            const newEmployee = {
                id: employee.id,
                firstName, secondName, lastName,
                birthdayYear, fired
            }
            action(newEmployee)
            onModalState(false)
        } catch (e) {
            setMsg('Ошибка: ' + e)
        }
    }

    return (
        <ModalWindow title={title} onModalState={onModalState}>
            <form className='modal-form'>
                <input type="text" placeholder='Полное имя' onChange={event => setFirstName(event.target.value)}
                       value={firstName} />
                <input type="text" placeholder='Отчество' onChange={event => setSecondName(event.target.value)}
                       value={secondName} />
                <input type="text" placeholder='Фамилия' onChange={event => setLastName(event.target.value)}
                       value={lastName} />
                <input type="text" placeholder='Год рождения' onChange={event => setBirthdayYear(event.target.value)}
                       value={birthdayYear} />
                {
                    fired !== null ? (
                        <label className="checkbox-block">
                            Уволен
                            <input name="fired" type="checkbox" checked={fired} onChange={event => setFired(event.target.checked)}/>
                        </label>
                    ) : null
                }
                <div className="btn-container">
                    <div className="msg">{msg}</div>
                    <a className="default-btn" onClick={actionOnClick}>Сохранить</a>
                </div>
            </form>
        </ModalWindow>
    )
}

EmployeeModal.propTypes = {
    employee: PropTypes.object,
    action: PropTypes.func,
    title: PropTypes.string,
    onModalState: PropTypes.func
}

export { EmployeeModal }