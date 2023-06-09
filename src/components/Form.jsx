import { useContext, useEffect, useRef, useState } from 'react'
import FormInput from './FormInput'
import { FormContext } from '../App'

const Form = ({ showModal }) => {
    const { formData, setFormData } = useContext(FormContext)
    const [idMsg, setIdMsg] = useState('')
    const [pwMsg, setPwMsg] = useState('')
    const [confirmPwMsg, setConfirmPwMsg] = useState('')
    const idInputRef = useRef(null)
    const pwInputRef = useRef(null)
    const confirmPwInputRef = useRef(null)

    useEffect(() => {
        if (idInputRef.current) {
            idInputRef.current.focus()
        }
    }, [])

    const ERR_MSG = {
        EMPTY: '필수 정보입니다.',
        INVALID_ID:
            '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
        INVALID_PW: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
        INVALID_CONFIRM_PW: '비밀번호가 일치하지 않습니다.',
    }

    const REGEXP = {
        ID: /^[a-z0-9_-]{5,20}$/,
        PW: /^[A-Za-z0-9]{8,16}$/,
    }

    const inputCheck = (target, value) => {
        if (value === '') {
            return 'EMPTY'
        }
        switch (target) {
            case 'id':
                return REGEXP.ID.test(value) ? true : 'INVALID_ID'

            case 'pw':
                return REGEXP.PW.test(value) ? true : 'INVALID_PW'

            case 'confirmPw':
                return value === formData.pw ? true : 'INVALID_CONFIRM_PW'

            default:
                break
        }
    }

    const validation = (target) => {
        switch (target) {
            case 'id':
                const idCheckResult = inputCheck(target, formData.id)
                if (idCheckResult === true) {
                    setIdMsg('')
                    if (idInputRef.current) {
                        idInputRef.current.classList.remove('border-red-600')
                    }
                } else {
                    setIdMsg(ERR_MSG[idCheckResult])
                    if (idInputRef.current) {
                        idInputRef.current.classList.add('border-red-600')
                    }
                }
                return idCheckResult === true

            case 'pw':
                const pwCheckResult = inputCheck(target, formData.pw)
                if (pwCheckResult === true) {
                    setPwMsg('')
                    if (pwInputRef.current) {
                        pwInputRef.current.classList.remove('border-red-600')
                    }
                } else {
                    setPwMsg(ERR_MSG[pwCheckResult])
                    if (pwInputRef.current) {
                        pwInputRef.current.classList.add('border-red-600')
                    }
                }
                return pwCheckResult === true

            case 'confirmPw':
                const confirmPwCheckResult = inputCheck(
                    target,
                    formData.confirmPw
                )
                if (confirmPwCheckResult === true) {
                    setConfirmPwMsg('')
                    if (confirmPwInputRef.current) {
                        confirmPwInputRef.current.classList.remove(
                            'border-red-600'
                        )
                    }
                } else {
                    setConfirmPwMsg(ERR_MSG[confirmPwCheckResult])
                    if (confirmPwInputRef.current) {
                        confirmPwInputRef.current.classList.add(
                            'border-red-600'
                        )
                    }
                }
                return confirmPwCheckResult === true

            default:
                break
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const [idStatus, pwStatus, confirmPwStatus] = [
            validation('id'),
            validation('pw'),
            validation('confirmPw'),
        ]

        if (idStatus && pwStatus && confirmPwStatus) {
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
                ref={idInputRef}
                id={'id'}
                label={'아이디'}
                msg={idMsg}
                validation={validation}
                handleChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                }
                inputProps={{
                    type: 'text',
                    placeholder: '아이디를 입력해주세요',
                    value: formData.id,
                }}
            />
            <FormInput
                ref={pwInputRef}
                id={'pw'}
                label={'비밀번호'}
                msg={pwMsg}
                validation={validation}
                handleChange={(e) =>
                    setFormData({ ...formData, pw: e.target.value })
                }
                inputProps={{
                    type: 'password',
                    placeholder: '비밀번호를 입력해주세요',
                    autoComplete: 'off',
                    value: formData.pw,
                }}
            />
            <FormInput
                ref={confirmPwInputRef}
                id={'confirmPw'}
                label={'비밀번호 확인'}
                msg={confirmPwMsg}
                validation={validation}
                handleChange={(e) =>
                    setFormData({ ...formData, confirmPw: e.target.value })
                }
                inputProps={{
                    type: 'password',
                    placeholder: '비밀번호 확인을 입력해주세요',
                    autoComplete: 'off',
                    value: formData.confirmPw,
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
