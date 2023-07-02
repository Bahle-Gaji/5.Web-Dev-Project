import React, { useState } from "react";
import MovieDataService from '../services/movies';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const AddReview = (props) => {
    const location = useLocation();
    const { id } = useParams();

    let editing = false;
    let initialReviewState = '';

    if (location.state && location.state.currentReview) {
        editing = true
        initialReviewState = location.state.currentReview.review
    }

    const [review, setReview] = useState(initialReviewState);
    //keeps track if review is submitted
    const [submitted, setSubmitted] = useState(false);

    const onChangeReview = e => {
        const review = e.target.value
        setReview(review)
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: id
        }


        if (editing) {
            data.review_id = location.state.currentReview._id
            MovieDataService.updateReview(data)
                .then(res => {
                    console.log("here")
                    setSubmitted(true);
                    console.log(res.data)
                })
                .catch(e => {
                    console.log('error here')
                    console.log(e)})
        }
        else {
            MovieDataService.createReview(data)
                .then(res => setSubmitted(true))
                .catch(e => console.log(e))
        }
    }

    return (
        <div>
            {submitted ?
                (
                    <div>
                        <h4>Review submitted successfully</h4>
                        <Link to={'/movies/' + id}>Back to movie</Link>
                    </div>
                )
                :
                (
                    <Form>
                        <Form.Group>
                            <Form.Label>{editing ? 'Edit' : "Create"} Review</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={review}
                                onChange={onChangeReview}
                            />
                            <Button variant="primary" onClick={saveReview}>
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                )}
        </div>
    )
}

export default AddReview;