import React, { useState, useEffect } from "react";
import MovieDataService from '../services/movies';
import { Link, useParams } from 'react-router-dom';
import { Card, Container, Image, Col, Row, Button, Media } from "react-bootstrap";
import moment from 'moment';

const Movie = (props) => {


    const [movie, setMovie] = useState({
        id: null,
        title: '',
        rated: '',
        reviews: []
    })

    const getMovie = id => {
        MovieDataService.get(id)
            .then(res => {
                console.log(res.data)
                setMovie(res.data)
            })
            .catch(e => console.log(e))
    }

    let { id } = useParams();

    useEffect(() => {
        getMovie(id)
    }, [id])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {props.user && <Link to={"/movies/" + id + "/review"}>Add Review</Link>}
                            </Card.Body>
                        </Card>
                        <br></br>

                        <h2>Reviews</h2>
                        <br></br>

                        {movie.reviews.map((review, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Body>
                                        <h5>{review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY")}</h5>
                                        <p>{review.review}</p>
                                        {props.user && props.user.id === review.user_id &&
                                            <Row>
                                                <Col>
                                                <Link to={{ pathname: "/movies/" + id +"/review", state: { currentReview: review }}}>Edit</Link>
                                                </Col>
                                                <Col><Button variant="link">Delete</Button></Col>
                                            </Row>
                                        }
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Movie;