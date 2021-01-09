import React from 'react';
import styled from 'styled-components';
import * as cdt from '../../util/styles';

const Button = ({ color, text, onClick, fontSize, buttonType, filter }) => {
    const StyledButton = styled.button(() => ({
        display: 'inline-block',
        padding: '0.7em 1.4em',
        margin: '0 0.3em 0.3em 0',
        border: 'none',
        outline: 'none',
        borderRadius: '0.3em',
        boxSizing: 'border-box',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: '700',
        color: `${cdt.white}`,
        backgroundColor: `${cdt[color]}`,
        boxShadow: 'inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17)',
        textAlign: 'center',
        position: 'relative',
        fontSize,
        cursor: 'pointer',
        transition: 'all 0.1s ease-in',
        filter: `grayscale(${filter === 'pale' ? 75 : 0}%)`,
        '&:hover': {
            filter: 'contrast(120%)',
            transform: 'scale(1.01)'
        }
    }));

    return <StyledButton type={buttonType || "button"} onClick={onClick} >{text}</StyledButton>
}

export default Button