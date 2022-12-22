import styles from '../project/projectForm.module.css'

import { useState } from 'react'

import Input from '../form/input'
import SubmitButton from '../form/submitButton'

function ServiceForm({handleSubmit, btnText, projectData}){

    const [service,setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
        console.log(service)
        
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
            type="text"
            text="Nome do serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange}
            />
            <Input
            type="number"
            text="Custo do serviço"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
            />
            <Input
            type="text"
            text="Descrição do serviço"
            name="description"
            placeholder="Insira a descrição do serviço"
            handleOnChange={handleChange}
            />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm