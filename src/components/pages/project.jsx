import styles from './styles/project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layouts/loading'
import Container from '../layouts/container'
import ProjectForm from '../project/projectForm'
import Message from '../layouts/message'
import ServiceForm from '../service/ServiceForm'
import {parse, v4 as uuidv4} from 'uuid'
import ServiceCard from '../service/serviceCard'


function Project(){

  const { id } = useParams()
  const [ project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [services, setServices] = useState([])

  useEffect(() => {
    setTimeout(() => {
        fetch(`https://costs-app-fake-backend.vercel.app/projects/${id}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }})
     .then(res => res.json())
     .then(json => {
        setProject(json)
        setServices(json.services)
      })
  }
    ,700)}, [id])

    function createService(project){
        setMessage('')
        //last service
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`https://costs-app-fake-backend.vercel.app/projects/${project.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
    }).then(res => res.json())
    .then(json => {
       setServices(json.services)
       setShowServiceForm(!showServiceForm)
     })
    }

    function removeService(id, cost) {
        setMessage('')
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)


        fetch(`https://costs-app-fake-backend.vercel.app/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectUpdated)
        })
         .then(res => res.json())
         .then(json => {
            setProject(projectUpdated)
            setServices(servicesUpdate)
            setMessage('Serviço removido com sucesso!')
            setType('success')
          }).catch(err => console.log(err))

    }


   function toogleProjectForm(){
    setShowProjectForm(!showProjectForm)
    }

    function toogleServiceForm(){
        setShowServiceForm(!showServiceForm)
        }

    function editPost(project){
        setMessage('')
        //budget validation
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do Projeto')
            setType('error')
            return false
        }
        fetch(`https://costs-app-fake-backend.vercel.app/projects/${id}`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    })
     .then(res => res.json())
     .then(json => {
        setProject(json)
        setShowProjectForm(false)
        setMessage('Projeto Atualizado!')
        setType('success')
      }).catch(err => console.log(err))


    }

return (
    <>
    {project.name ? 
    <div className={styles.project_details}>
        <Container customClass="column">
            {message && <Message type={type} msg={message}/>}
            <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button className={styles.btn} onClick={toogleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                {!showProjectForm ? (
                    <div className={styles.project_info}>
                        <p>
                            <span>Categoria:</span> {project.category.name}
                        </p>
                        <p>
                            <span>Total de Orçamento:</span> R${project.budget}
                        </p>
                        <p>
                            <span>Total Utilizado:</span> R${project.cost}
                        </p>
                    </div>
                ): (
                    <div className={styles.project_info}>
                        <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project}/>
                    </div>
                )}
            </div>
            <div className={styles.service_form_container}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn} onClick={toogleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                    <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm 
                            handleSubmit={createService}
                            btnText="Adicionar serviço"
                            projectData={project}
                            />
                        )}
                    </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
                {services.length > 0 &&
                services.map((service) => (
                    <ServiceCard 
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                    />
                ))
                }
                {services.length === 0 && <p>não há serviços cadastrados</p>}
            </Container>
        </Container>
    </div>
    : <Loading/>}
    </>
)


}

export default Project
