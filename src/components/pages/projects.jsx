import Message from "../layouts/message"
import { useLocation } from "react-router-dom"
import styles from './styles/projects.module.css'
import Container from '../layouts/container'
import LinkButton from "../layouts/linkButton"
import ProjectCard from "../project/projectCard"
import { useState, useEffect } from "react"
import Loading from "../layouts/loading"

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoaing] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message= ''
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        setTimeout(() => {
            fetch('https://costs-app-fake-backend.vercel.app/projects',{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }}).then(response => response.json())
                .then(data => {
                    setProjects(data)
                    setRemoveLoaing(true)
                }).catch(err => console.log(err))
        },300)
    }, [])

    function removeProject(id){
        fetch(`https://costs-app-fake-backend.vercel.app/projects/${id}`,{
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }}).then(response => response.json())
                   .then(() => {
                        setProjects(projects.filter((project)=>project.id !==id))
                        setProjectMessage('Projeto removido com sucesso!')
                   }).catch((err)=> console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to='/newProject' text='Criar Projeto'></LinkButton>
            </div>
            {message && <Message msg={message} type="success"/>}
            {projectMessage && <Message msg={projectMessage} type="success"/>}
            <Container customClass="start">
                {projects.length > 0 &&
                   projects.map((project) => (
                    <ProjectCard handleRemove={removeProject} id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id}/>
                   )) 
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )
                }
            </Container>
        </div>
    )
  }
  
  export default Projects