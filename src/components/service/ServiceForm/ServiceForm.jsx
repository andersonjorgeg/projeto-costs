import {useState} from 'react'
import Input from '../../../Form/Input/Input';
import SubmitButton from '../../../Form/SubmitButton/SubmitButton';
import styles from '../../project/ProjectForm/ProjectForm.module.css';

export default function ServiceForm({ handleSubmit, textBtn, projectData }){

  const [service, setService] = useState({})

  function submit(e) {
    e.preventDefault()
    projectData.services.push(service)
    console.log(service)
    handleSubmit(projectData)
  }

  //adicionando serviço
  function handleChange(e){
    setService({ ...service, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input  
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira nome do serviço"
        handleOnChange={handleChange}
      /> 
      <Input  
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o custo do serviço"
        handleOnChange={handleChange}
      /> 
      <Input  
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      /> 
      <SubmitButton text={textBtn} />
    </form>
  )
}