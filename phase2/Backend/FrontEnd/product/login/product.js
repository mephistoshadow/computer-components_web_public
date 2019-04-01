const reviewForm = document.querySelector('#reviewForm');
const review= document.querySelector('#review');
const titleForm=document.querySelector('#titleForm')
const ratingForm=document.querySelector('#ratingForm')
review.addEventListener('click', ReviewLogin)

let numberOfReviews=0
const reviewList=[]

// Review 'class'
class Review {
    constructor(title, rate,review) {
        this.title = title;
        this.rate=rate
        this.review=review
        // set review ID
        this.reviewId = numberOfReviews;
        numberOfReviews++;
    }
}

const review1=new Review("GPU review",4,"It is good.")
reviewList.push(review1)

function ReviewLogin(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn')) {
        if(e.target.id==="save"){
            const review=reviewForm[1].value
            const title=titleForm[0].value
            const rate= parseInt(ratingForm[0].value)
            const rev=new Review(title,rate,review)
            reviewList.push(rev)
            addPost(rev.title,rev.review,rev.rate)
            loginReminder()
            changeRating()

        }

    }

}

function loginReminder(){

    const message="Review product here"
    reviewForm[1].placeholder=message
    titleForm[0].placeholder="Title"
    ratingForm[0].placeholder="Rate number of star"
    reviewForm[1].value=""
    titleForm[0].value=""
    ratingForm[0].value=""

    console.log(reviewForm[1].placeholder)


}
function addPost(review,title,rate) {

    const int=parseInt(rate)
    console.log(int)
    console.log(review)
    console.log(title)
    const review_post=document.createElement("div")
    review_post.className="row"


    //add profile
    const userProfile=document.createElement("div")
    userProfile.className="col-md-2"
    const img=document.createElement("img")
    img.src= "https://image.ibb.co/jw55Ex/def_face.jpg"
    img.className="img img-rounded img-fluid"
    userProfile.appendChild(img)
    review_post.appendChild(userProfile)
    //add post
    const content=document.createElement("div")
    content.className="col-md-10"
    const content_p=document.createElement("p")
    const content_a=document.createElement("a")
    const content_a1=document.createElement("STRONG");
    content_a1.innerText="User:"
    content_a1.style.color="#0074d9"
    content_a1.href="#"
    content_a.appendChild(content_a1)
    content_a.className="float-left"
    const content_title=document.createElement("a")
    const content_a2=document.createElement("STRONG");
    content_a2.innerText=title
    content_a2.style.color="#0074d9"
    content_a2.href=""
    content_title.appendChild(content_a2)
    content_title.className="float-left"

    content_p.appendChild(content_a)
    content_p.appendChild(content_title)

    let i=0
    while(i<int){
        const star=document.createElement("span")
        const star_img=document.createElement("i")
        star.className="float-right"
        star_img.className="text-warning fa fa-star"
        star.appendChild(star_img)
        content_p.appendChild(star)
        console.log("121e32")
        i+=1
    }
    content.appendChild(content_p)
    const comment=document.createElement("div")
    comment.className="clearfix"
    const comment_txt=document.createElement("p")
    comment_txt.innerText=review

    const helpful=document.createElement("a")
    helpful.className="float-right btn text-white btn-danger"
    const helpful_hart=document.createElement("i")
    helpful_hart.className="fa fa-heart"
    const help_txt=document.createTextNode("Helpful")
    helpful.appendChild(helpful_hart)
    helpful.appendChild(help_txt)
    const help=document.createElement("p")
    help.appendChild(helpful)
    content.appendChild(comment)
    content.appendChild(comment_txt)
    content.appendChild(help)
    const card=document.createElement("div")
    card.className="card-body"
    review_post.appendChild(content)
    card.appendChild(review_post)
    const review_con = document.querySelector('.card');
    review_con.appendChild(card)
    console.log(review_con)

}
function changeRating(){
    let rating =document.getElementsByClassName("rating")[0]
    console.log(rating)
    let rate=0
    for(let i =0; i<reviewList.length;i++){
        rate+=reviewList[i].rate
        console.log(rate)
    }

    const rate_int=parseInt(rate/reviewList.length)
    console.log(rate_int)
    while (rating.firstChild) {
        rating.removeChild(rating.firstChild);
    }
    for(let i =0; i<rate_int;i++){

        const  star=document.createElement("i")
        star.className="fa fa-star gold"

        rating.appendChild(star)
    }
    for(let i =rate_int; i<5;i++){
        const  star=document.createElement("i")
        star.className="fa fa-star-o"

        rating.appendChild(star)
        console.log(rating.children[i])
    }
    console.log(rating)

}

