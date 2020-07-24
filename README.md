# team48
### General description.
- A user can signup to the website and become a member. 

- Once a user signs up or logs in, he or she is directed to the profile page. 

- Note, there is a navigation bar, allowing navigation to either the main page, profile page (it can be regular user's page, or the admin dashboard, depending on its privilege), or log out. 

- The mainpage showcases many products across multiple categories, as well as videos that act as supplementary information. A user can select a product to access its product page. 

- Once a user has navigated to a product page, he or she can add the product to their wishlist, and write a review if the user has used it, along with reading others' if the user is considering buying.

- Aside from the user, there is also the admin, who has an admin dashboard to view all the computer component products featured in the website, with options to delete them as necessary. Also, in the same page, an admin has privilege to disable any users. 






### Routes in the server.js file.

- There are routes for logging in, either through logging in directly (if signed up previously), 
or through signing up. Also, a route for logging out.

- There's a route navigating to the main webpage, accessible notably through the navigation bar. 

- There is also a route leading to an error page, should there be an error. 

- Many of the routes check the session cookie, to confirm that the user is in a logged-state if necessary. 

- Concerning products, there are routes for getting one or every product info, deleting it, as well as uploading or updating reviews, as well as posting it. 

- Concering users (regular or admin), there are routes for updating their passwords, getting or adding their wishlist products, any specific or all comments uploaded previously, or if given privileges, disable regular users. 
