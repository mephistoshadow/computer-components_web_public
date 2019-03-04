const reviewForm = document.querySelector('#reviewForm');
const review= document.querySelector('#review');
review.addEventListener('click', ReviewLogin)

let numberOfReviews=0
const user=[]
// Review 'class'
class Review {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        // set review ID
        this.reviewId = numberOfReviews;
        numberOfReviews++;
    }
}



function ReviewLogin(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn')) {
        console.log("=save=")
        addpost()
        loginReminder()
    }

}

function loginReminder(){
    const message="Please login to submit your review"
    reviewForm[1].placeholder=message
    
    console.log(reviewForm[1].placeholder)



}
function addpost() {
    
}

