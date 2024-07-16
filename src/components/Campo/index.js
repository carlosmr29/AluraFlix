import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Campo.module.css';

const Campo = (props) => {
    const placeholderModificado = `${props.placeholder}...`;
    const { type = "text" } = props;
    
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const manejarCambio = (e) => {
        props.setValor(e.target.value);
    };

    const manejarSubmit = () => {
        setSubmitAttempted(true);
    };

    
    const inputBorderStyle = props.required && !props.valor && submitAttempted
        ? `2px solid red`  
        : `2px solid var(--blanco)`; 

    
    const inputTitleColor = props.required && !props.valor && submitAttempted
        ? `red` 
        : `var(--blanco)`; 

    return (
        <div className={styles.campo}>
            <label>
                <span className={styles.text} style={{ color: inputTitleColor }}>{props.titulo}</span>
                <input 
                    placeholder={placeholderModificado} 
                    required={props.required} 
                    value={props.valor}
                    onChange={manejarCambio}
                    onBlur={manejarSubmit} 
                    type={type}
                    style={{ 
                        backgroundColor: `var(${props.color})`,
                        border: inputBorderStyle 
                    }}
                />
            </label>
            {props.required && !props.valor && submitAttempted && (
                <span className={`${styles.error} ${styles.placeholderError}`}>Este campo es obligatorio</span>
            )}
        </div>
    );
};

Campo.propTypes = {
    titulo: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    valor: PropTypes.string.isRequired,
    setValor: PropTypes.func.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    color: PropTypes.string,
    border: PropTypes.string,
};

export default Campo;
