import {Link} from 'react-router-dom'
import styles from './menu.module.css'
import Container from './container'
import logo from '../../img/costs_logo.png'

function Menu() {

  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/"><img src={logo} alt="const" /></Link>
        <ul className={styles.list}>
            <li className={styles.item}><Link to="/">Home</Link></li>
            <li className={styles.item}><Link to="/NewProject">Novo Projeto</Link></li>
            <li className={styles.item}><Link to="/Projects">Projetos</Link></li>
            <li className={styles.item}><Link to="/Company">Empresa</Link></li>
            <li className={styles.item}><Link to="/Contact">Contato</Link></li>
        </ul>
      </Container>
    </nav>
  )
}

export default Menu