import styles from './styles/newProject.module.css';
import ProjectForm from '../project/projectForm';
import { useNavigate } from 'react-router-dom';

function NewProject() {

    const history = useNavigate()

    function createPost(project){
        // initialize cost and services
        project.cost = 0
        project.services = []
        
        fetch("http://localhost:5000/projects", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",},
            body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
        .then((data) => {
            //redirect
            history("/projects", { state: { message: 'Projeto criado com sucesso!' } })
        }) 
        .catch((err) => console.error(err))


    }

    return (
        <div className={styles.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adiconar os serviços</p>
            <ProjectForm btnText = 'Criar Projeto' handleSubmit = {createPost}/>
        </div>
    )
  }
  
  export default NewProject