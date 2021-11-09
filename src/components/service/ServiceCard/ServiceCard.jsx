import styles from '../../project/ProjectCard/ProjectCard.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

export default function ServiceCard({name, id, cost, description, handleRemove}) {

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id, cost)
  }

  return (
    <div className={styles.project_Card}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> R${cost}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}