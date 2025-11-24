from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
# from schemas import *
from ..core import createSession

from ..models.review import Review
from ..schemas.review_schema import ReadReviewBase, createReviewBase
from typing import List

router = APIRouter(prefix="/reviews")

@router.post("/", response_model=ReadReviewBase)  # create a review
def create_review(review: createReviewBase, session: Session = Depends(createSession)):
    new_review = Review.from_orm(review)
    session.add(new_review)
    session.commit()
    session.refresh(new_review)
    return new_review

@router.get("/{review_id}", response_model=ReadReviewBase)  # get review by id
def get_review(review_id: int, session: Session = Depends(createSession)):
    review = session.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

@router.get("/", response_model=List[ReadReviewBase])  # get all reviews
def get_all_reviews(session: Session = Depends(createSession)):
    reviews = session.exec(select(Review)).all()
    return reviews

@router.get("/recipe/{recipe_id}", response_model=List[ReadReviewBase])  # get reviews for a recipe
def get_reviews_for_recipe(recipe_id: int, session: Session = Depends(createSession)):
    reviews = session.exec(select(Review).where(Review.recipe_id == recipe_id)).all()
    return reviews  

@router.delete("/{review_id}")  # delete review by id
def delete_review(review_id: int, session: Session = Depends(createSession)):
    review = session.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    session.delete(review)
    session.commit()
    return {"message": "Review deleted successfully"}


@router.put("/{review_id}", response_model=ReadReviewBase)  # update review by id
def update_review(review_id: int, review_data: createReviewBase, session: Session = Depends(createSession)):
    review = session.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.rating = review_data.rating
    review.comment = review_data.comment
    session.add(review)
    session.commit()
    session.refresh(review)
    return review

#i was hereeeeewnfowbhnuojbgruj