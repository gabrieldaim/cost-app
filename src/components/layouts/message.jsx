import { Link } from 'react-router-dom'
import styles from './message.module.css'
import{ useState, useEffect } from 'react'


function Message({type, msg}) {

    const [visible, setVisible] = useState()

    useEffect(() => {
        if(!msg){
            setVisible(false)
            return
        }
        console.log('mudando')
        setVisible(true)

        const timer = setTimeout(() =>{
            setVisible(false)
        },3000)

        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}
        </>
    )
  }
  
  export default Message