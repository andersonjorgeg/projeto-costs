import ProjectForm from '../../project/ProjectForm/ProjectForm'

import styles from './NewProject.module.css'

export default function NewProject() {
  return (
    <div className={styles.newProject_container}>
      <h1>Criar projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm btnText="Criar projeto" />
    </div>
  )
}