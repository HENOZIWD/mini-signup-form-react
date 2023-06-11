import { useContext, useEffect, useRef } from 'react'
import { FormContext } from '../App'

const ERR_MSG = {
    EMPTY: '필수 정보입니다.',
    INVALID_ID:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    INVALID_PW: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    INVALID_CONFIRM_PW: '비밀번호가 일치하지 않습니다.',
}

const FormInput = ({ id, label, formState, inputProps }) => {
    const { setFormData } = useContext(FormContext)
    const inputRef = useRef(null)

    useEffect(() => {
        if (id === 'id' && inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                ref={inputRef}
                id={id}
                className={
                    'shadow border rounded w-full py-2 px-3 text-gray-700' +
                    (formState === true || formState === 'INITIAL'
                        ? ''
                        : ' border-red-600')
                }
                onChange={(e) => {
                    setFormData((prev) => ({
                        ...prev,
                        [id]: e.target.value,
                    }))
                }}
                {...inputProps}
            />
            <div className="mt-1 mb-3 text-xs text-red-500">
                {formState === true || formState === 'INITIAL'
                    ? ''
                    : ERR_MSG[formState]}
            </div>
        </div>
    )
}

export default FormInput
