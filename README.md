# Urban Estates(Real Estates website and web app)

_A fully functional application for multilevel users with user authentication and image upload and payment integration_

---

## Introduction

### Key Features:

- **User Authentication**: Register, log in, and manage user roles and accounts through firebase
- **Image Upload**: Instead of image url, agents can direct upload their real estate image and users can create account using their photo from the device
- **Good-looking UI**: User Friendly and Modern UI with tailwind
- **Payment Integration**: Users Can pay through Stripe card
- **Property Showcase**: Properties are shown in the page with details expansion viewpoint
- **UI based on Specific User Role**: Three key user role distinctions added. These are Agent, Admin and User. The Dashboard design specific for particular user role
- **Admin Specific functionalities**:Admin can update Status of property acceptance,Advertise properteis, manage users and manage reviews
- **Agent Specific functionalities**:Agents can add properties to sell, see the offers from the users and accept offers from them,
- **Review Functionality**: Users can add reviews about properties and these will be saved in the database.
- **Data Protection**: The MongoDB database will save their data and for this reason they will have their data protected somewhere.

---

## Technologies Used

- **Frontend**:

  - React.js
  - React Router v7 (for navigation)
  - React type animation
  - Axios (for HTTP requests)
  - CSS3, TailwindCSS, DaisyUI (for styling)
  - react-icons, react-toastify
  - swiper, sweet alert

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB (NoSQL database)
  - mongoose(orm for MongoDB)

- **Other Tools**:

  - dotenv (for environment variables)
  - firebase(for authentication)
  - cloudinary(for image upload)
  - stripe(for payment integration)

---

## Demo Credentials

##### for admin login

- email: admin@gmail.com
- password: Admin1@

##### for agent login

- email: agent1@gmail.com
- password: Agent1@

Live Link: [Click Here!](https://urbanestate-dbfe4.web.app/)
