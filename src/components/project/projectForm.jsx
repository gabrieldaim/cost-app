import { useEffect, useState } from 'react'

import Input from '../form/input'
import Select from '../form/select'
import SubmitButton from '../form/submitButton'
import styles from './projectForm.module.css'

function ProjectForm({btnText, handleSubmit, projectData}) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("https://costs-app-fake-backend.vercel.app/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",}
        })
        .then((resp) => resp.json())
        .then((data) => {setCategories(data)})
        .catch((err) => console.error(err))
    }, [])

    const submit = (e)=> {
        e.preventDefault()
        if (project.category && project.budget && project.name){
            handleSubmit(project)
        }else {
            alert('preencher todos os campos')
        }

    }

    function handleChange(e){
        setProject({ ...project, [e.target.name] : e.target.value})
    }

    function handleCategory(e){
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input handleOnChange={handleChange} type='text' text='Nome do projeto' name='name' placeholder='Insira o nome do Projeto' value={project.name ? project.name: ''}/>
            <Input handleOnChange={handleChange} type='number' text='Orçamento do Projeto' name='budget' placeholder='Insira o orçamento total' value={project.budget ? project.budget: ''}/>
            <Select handleOnChange={handleCategory} name='category_id' text='Selecione a categoria' options={categories} value={project.category ? project.category.id: ''}/>
            <SubmitButton text={btnText}/>
        </form>
    )
  }
  
  export default ProjectForm