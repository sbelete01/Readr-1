# Readr
Find your perfect book match for free with Readr.

<div>
<img src = "https://user-images.githubusercontent.com/51866859/73042049-5b9dc600-3e25-11ea-899c-6f9006b7f8a7.png" width = "250" style = "padding: 10px">
<img src = "https://user-images.githubusercontent.com/51866859/73042303-5d1bbe00-3e26-11ea-8688-bad4a677b04f.png" width = "250" style = "padding: 10px">
<img src = "https://user-images.githubusercontent.com/51866859/73042069-6c4e3c00-3e25-11ea-956c-1eea4718489c.png" width = "250" style = "padding: 10px">


Readr develops an algorithm unique to each user. The more you use it, the better your book suggestions get!

#### The tech stack for this app: 

- External API(s) - [Google Books](https://developers.google.com/books) (possibly Open Library for epub text)
- Frontend Framework - React
- Styling Library - Material UI
- Server Framework - Express
- Database - PostgreSQL - (for speed over mySQL) Sequelize ORM
- Authentication - OAuth -> Google
- Deployment Platform - Digital Ocean
- Testing Framework - Mocha Chai
- Project Management Tool - GitHub Projects

#### User Experience

* A user logs in with third-party authenication from Google.
* The first time a user logs in, they will be prompted for their name, DOB and a short questionare. 
* After completing the questionare, they will see a page with a single book suggestion and short description of the book.
* The users will see two large button links below the book suggestion
    - **"Interested", "Not Interested".**
* The user can click "Interested", "Not Interested"" in the book suggestion
    - This information is saved in a join table in the database with the userID, the book's ISBN, and a boolean value.
* #### If the user clicks "Interested":
    - The book will be added to their "To-Read" list.
    - The next book suggestion will appear. 
* #### If the user clicks "Not Interested":
    - The book will be added to their "Not interested" list. 
    - The next book suggestion will appear. 
* #### If the user clicks "Read Now":
    - The user will be taken to an ePub copy of the book, if avaliable. For this [component](client/src/components/EbookView.jsx), 
      we are using [ReactReader powerd by ePub.js](https://github.com/gerhardsletten/react-reader)
    - If not avaliable, they will be directed to an outside link to a public domain copy of the book. 
    - If in app, the user should be able to exit the ebook and be back on the suggestion page. 

#### User Book Lists
 * "To-Read"
    - A list of books the user clicked "Interested" on. 
    - The user can access their "To-Read" list at any time via a link in the top bar of the app. 
    - The user can move a book to the "Not Interested" list.
    - The user can remove a book from the list. 
    - A user can click "read now" to start reading the book. 
    - A user can sort their list by date added or genre
* "Not Interested"
    - A list of books the user clicked "Not Interested" on.
    - The user can move a book to the "To-Read" list.
    - A user can remove a book from the list. 
    - A user can click "read now" to start reading the book.
    - A user can sort their list by date added or genre 


#### Book Suggestion Algorithm


#### User Navigation 


#### Database
This app uses PostgreSQL 
* Schema 
    * Users table with ID, username
    * Books table with ISBN#, Title, Author, Description, thumbnail Cover image, book url
    * Join table to populate users To-Read list with unique User ID, ISBN#, and Boolean
    * Join table to show relationship between users/followers  

##### To include in environmental variables:
A clientID and clientSecret from google for authentication
To include with developer determined values
* cookieKey
* DATABASE
* USER_NAME
* USER_PASSWORD
* HOST
* DB_PORT
* PORT
