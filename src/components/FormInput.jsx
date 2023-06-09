import { forwardRef } from 'react'

const FormInput = forwardRef(function FormInput(
    { id, label, msg, validation, handleChange, inputProps },
    inputRef
) {
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
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                onBlur={() => validation(id)}
                onChange={handleChange}
                {...inputProps}
            />
            <div className="mt-1 mb-3 text-xs text-red-500">{msg}</div>
        </div>
    )
})

export default FormInput
