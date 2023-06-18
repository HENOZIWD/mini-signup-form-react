import { useEffect, useRef } from 'react'
import FormInput from './FormInput'
import { useForm } from 'react-hook-form'
import Modal from './Modal'

const REGEXP = {
    ID: /^[a-z0-9_-]{5,20}$/,
    PW: /^[A-Za-z0-9]{8,16}$/,
}

const ERR_MSG = {
    EMPTY: '필수 정보입니다.',
    INVALID_ID:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    INVALID_PW: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    INVALID_CONFIRM_PW: '비밀번호가 일치하지 않습니다.',
}

const Form = ({ showModal }) => {
    const {
        register,
        handleSubmit,
        setFocus,
        getValues,
        formState,
        getFieldState,
        trigger,
    } = useForm({
        mode: 'all',
    })

    const modalRef = useRef(null)

    useEffect(() => {
        setFocus('id')
    }, [])

    const onSubmit = () => {
        modalRef.current.showModal()
    }

    return (
        <>
            <form
                id="form"
                className="w-full max-w-md m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormInput
                    id={'id'}
                    label={'아이디'}
                    errMsg={formState.errors['id']?.message}
                    inputProps={{
                        type: 'text',
                        placeholder: '아이디를 입력해주세요',
                        ...register('id', {
                            pattern: {
                                value: REGEXP.ID,
                                message: ERR_MSG.INVALID_ID,
                            },
                            required: ERR_MSG.EMPTY,
                        }),
                    }}
                    trigger={trigger}
                    inValid={getFieldState('id').invalid}
                />
                <FormInput
                    id={'pw'}
                    label={'비밀번호'}
                    errMsg={formState.errors['pw']?.message}
                    inputProps={{
                        type: 'password',
                        placeholder: '비밀번호를 입력해주세요',
                        autoComplete: 'off',
                        ...register('pw', {
                            pattern: {
                                value: REGEXP.PW,
                                message: ERR_MSG.INVALID_PW,
                            },
                            required: ERR_MSG.EMPTY,
                            onChange: () => trigger('confirmPw'),
                        }),
                    }}
                    inValid={getFieldState('pw').invalid}
                />
                <FormInput
                    id={'confirmPw'}
                    label={'비밀번호 확인'}
                    errMsg={formState.errors['confirmPw']?.message}
                    inputProps={{
                        type: 'password',
                        placeholder: '비밀번호 확인을 입력해주세요',
                        autoComplete: 'off',
                        ...register('confirmPw', {
                            validate: {
                                isSamePw: (value) =>
                                    value === getValues('pw') ||
                                    ERR_MSG.INVALID_CONFIRM_PW,
                            },
                            required: ERR_MSG.EMPTY,
                        }),
                    }}
                    inValid={getFieldState('confirmPw').invalid}
                />
                <div className="flex items-center justify-center">
                    <input
                        id="submit"
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
                        value="가입하기"
                        disabled={!formState.isValid}
                    />
                </div>
            </form>
            <Modal ref={modalRef} getValues={getValues} />
        </>
    )
}

export default Form
