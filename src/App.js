import { createContext, useRef, useState } from 'react'
import './App.css'
import FontControlBox from './components/FontControlBox'
import Footer from './components/Footer'
import Form from './components/Form'
import Modal from './components/Modal'

export const FormContext = createContext(null)

function App() {
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        confirmPw: '',
    })
    const modalRef = useRef(null)

    const showModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            <section className="form-wrapper">
                <Form showModal={showModal} />
                <Footer />
            </section>
            <FontControlBox />
            <Modal ref={modalRef} />
        </FormContext.Provider>
    )
}

export default App
