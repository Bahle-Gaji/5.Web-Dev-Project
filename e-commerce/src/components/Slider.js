import React from 'react';
import styled from 'styled-components';
import {
    ArrowLeftOutlined as ArrowLeftOutlinedIcon,
    ArrowRightOutlined as ArrowRightOutlinedIcon
} from '@mui/icons-material';

const Container = styled.div`
    width: 100%;
    height: 1100vh;
    display: flex;

`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Slider = () => {
    return (
        <div>
            <Container>
                <Arrow>
                    <ArrowLeftOutlinedIcon />
                </Arrow>
                <Arrow>
                    <ArrowRightOutlinedIcon />
                </Arrow>


            </Container>
        </div>
    )
}

export default Slider;