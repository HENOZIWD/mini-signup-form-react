import { useContext, useEffect, useState } from 'react'
import FormInput from './FormInput'
import { FormContext } from '../App'

const REGEXP = {
    ID: /^[a-z0-9_-]{5,20}$/,
    PW: /^[A-Za-z0-9]{8,16}$/,
}

const Form = ({ showModal }) => {
    const { formData } = useContext(FormContext)
    const [formState, setFormState] = useState({
        id: 'INITIAL',
        pw: 'INITIAL',
        confirmPw: 'INITIAL',
    })

    useEffect(() => {
        Object.entries(formData).forEach(([target, value]) => {
            inputCheck(target, value)
        })
    }, [formData])

    const inputCheck = (target, value) => {
        let result
        if (value === '') {
            result = 'EMPTY'
        } else {
            switch (target) {
                case 'id':
                    result = REGEXP.ID.test(value) ? true : 'INVALID_ID'
                    break

                case 'pw':
                    result = REGEXP.PW.test(value) ? true : 'INVALID_PW'
                    break

                case 'confirmPw':
                    result = value === formData.pw ? true : 'INVALID_CONFIRM_PW'
                    break

                default:
                    break
            }
        }

        setFormState((prev) => ({ ...prev, [target]: result }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (Object.values(formState).every((value) => value === true)) {
            showModal()
        }
    }

    return (
        <form
            id="form"
            className="w-full max-w-md m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <FormInput
                id={'id'}
                label={'아이디'}
                formState={formState.id}
                inputProps={{
                    type: 'text',
                    placeholder: '아이디를 입력해주세요',
                }}
            />
            <FormInput
                id={'pw'}
                label={'비밀번호'}
                formState={formState.pw}
                inputProps={{
                    type: 'password',
                    placeholder: '비밀번호를 입력해주세요',
                    autoComplete: 'off',
                }}
            />
            <FormInput
                id={'confirmPw'}
                label={'비밀번호 확인'}
                formState={formState.confirmPw}
                inputProps={{
                    type: 'password',
                    placeholder: '비밀번호 확인을 입력해주세요',
                    autoComplete: 'off',
                }}
            />
            <div className="flex items-center justify-center">
                <input
                    id="submit"
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
                    value="가입하기"
                />
            </div>
        </form>
    )
}

export default Form
