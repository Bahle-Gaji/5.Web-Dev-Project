import styled from "@emotion/styled";

//I like this background color
const Container = styled.div`
    height: 30px;
    background-color: #E27D60;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
`;

const Announcement = () => {
  return (
    <div>
        <Container>
            New Deal! Get Free Shipping on Orders R500 and Over!
        </Container>
    </div>
  )
}

export default Announcement;