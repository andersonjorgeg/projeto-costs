import {parse, v4 as uuidv4} from 'uuid' 

import styles from './Project.module.css'
import Loading from '../../layout/Loading/Loading'
import Container from '../../layout/Containeer/Container'
import ProjectForm from '../../project/ProjectForm/ProjectForm'
import ServiceForm from '../../service/ServiceForm/ServiceForm'
import Message from '../../layout/Message/Message'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Project() {

  const { id } = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data)
      })
      .catch(err => console.log(err))
    }, 300)

  }, [id])

  function editPost(project) {
    setMessage('')

    //budget validation
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado com sucesso!')
        setType('success')
      })
      .catch(err => console.log(err))
  }

  function createService(project) {
    setMessage('')
    //pegando ultimo serviço
    const lastService = project.services[project.services.length - 1]

    //gerando id do serviço
    lastService.id = uuidv4()

    //pegando o custo do ultimo serviço
    const lastServiceCost = lastService.cost

    //pegando o custo do novo serviço
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    //maximum value validation
    if(newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      return false
    }

    //add service cost to project total cost
    project.cost = newCost

    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setShowServiceForm(false)
      })
      .catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm  handleSubmit={editPost} textBtn="Concluir edição" projectData={project} />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
                <h2>Adicione um serviços:</h2>
                <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && <ServiceForm 
                    handleSubmit={createService}
                    textBtn="Adicionar Serviço" 
                    projectData={project}
                  />}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
                <p>Itens de serviços</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}