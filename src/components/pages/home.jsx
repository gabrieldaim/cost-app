import styles from './styles/home.module.css';
import savings from '../../img/savings.svg';
import LinkButton from '../layouts/linkButton';

function Home() {

    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/newProject' text='Criar Projeto'></LinkButton>
            <img src={savings} alt="Costs" />
        </section>
    )
  }
  
  export default Home