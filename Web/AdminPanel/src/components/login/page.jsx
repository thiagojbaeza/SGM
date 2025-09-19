import { useEffect, useState } from "react";
import './login.css';


function Login() {  
    const initialValues = { user: "", password: "" }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialValues)
    const [isSubmit, setIsSubmit] = useState(false)
 
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
        console.log(formValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        if(setIsSubmit)loginAPI()
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
        }
    }, [formErrors, formValues, isSubmit] )

    const validate = (values) => {
        const errors = {}

        if (!values.user) {
            errors.user = "Usuário é obrigatório!"
        } 
        if (!values.password) {
            errors.password = "Senha é obrigatória!"
        } else if (values.password.length < 4) {
            errors.password = "Senha deve ter mais de 4 caracteres!"
        } else if (values.password.length > 10) {
            errors.password = "Senha deve ter menos de 10 caracteres!"
        }
        return errors
    }

    const loginAPI = () => {
        if(formValues.user === "admin" && formValues.password ==="12345"){
            alert("Login efetuado com sucesso")
            
        }else{
            alert("erro ao efetuar o login, verifique as informaçoes")
            return false
        }
        return true
    }

    return (
        <div className="container">
            <pre>{JSON.stringify(formValues, undefined, 2 )}</pre>
            <form onSubmit={handleSubmit}>
                <h1>Bem vindo ao SGM</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <p>{formErrors.user}</p>
                    <div className="field">
                        <label>Usuário</label>
                        <input 
                            type="text" 
                            name="user" 
                            placeholder="Usuário"
                            value={formValues.user}
                            onChange={handleChange} />
                    </div>
                    <p>{formErrors.password}</p>
                    <div className="field">
                        <label>Senha</label>
                        <input 
                            type="text" 
                            name="password" 
                            placeholder="Senha" 
                            value={formValues.password}
                            onChange={handleChange} />
                    </div>
                    <button className="fluid ui button blue">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login