import styles from './ProjectForm.module.css'
import Input from '../../../Form/Input/Input'
import Select from '../../../Form/Select/Select'
import SubmitButton from '../../../Form/SubmitButton/SubmitButton'

export default function ProjectForm({ btnText }) {
  return (
    <form className={styles.form}>
        <Input 
          type="text" 
          text="Nome do projeto" 
          name="name"
          placeholder="Insira o nome do projeto" 
        />
        <Input 
          type="number" 
          text="Orçamento do projeto"
          name="budget"
          placeholder="Insira o orçamento total" 
        />
        <Select name="category_id" text="selecione a categoria" />
        <SubmitButton text={btnText} />
    </form>
  )
}