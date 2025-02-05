# Urban Estates(Real Estates website and web app)

_A fully functional application for multilevel users with user authentication and image upload and payment integration_

---

## Introduction

UrbanEstates is a real estate platform where users can look through a collection of properties and purchase via offering the agent of that property. Users can give reviews to a particular property also. Agents can add properties and sell via the offers of various users. Admins on the otherhand will manage the whole structure of the Web app. Admins can verify properties added by agents and manage users and change user roles. Admins can run advertisements that will be shown in the home page and can manage reviews that were added by the users.
![UrbanEats Screenshot](public/screenshot.png)

### Key Features:

- **Image Upload**: Instead of image url, agents can direct upload their real estate image and users can create account using their photo uploaded from the device.
- **User Authentication**: Register, log in, and manage accounts through firebase authentication.
- **Good-looking UI**: User Friendly and Modern responsive UI with tailwindCSS
- **Payment Integration**: Users Can purchase through Stripe card payment
- **Property Showcase**: Properties are shown in the page with details expansion viewpoint
- **UI based on Specific User Role**: Three key user role distinctions are apparant. These are Agent, Admin and User. The Dashboard design specific for particular user role.
- **Admin Specific functionalities**:Admin can update Status of property acceptance,Advertise properteis, manage users and manage reviews.
- **Agent Specific functionalities**:Agents can add properties to sell, see the offers from the users and accept offers from them.
- **User Specific functionalities**: Users can add products to wishlist and make an offer for that particular property. If the agent accepts the offer users can pay through Stripe and purchase that property.
- **Review Functionality**: Users can add reviews about properties and these will be saved in the database.
- **Data Protection**: The MongoDB database will save data and for this the whole information will be persisted.

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
  - Mongoose(orm for MongoDB)
  - MongoDB (NoSQL database)

- **Other Tools**:

  - dotenv (for environment variables)
  - firebase(for authentication)
  - cloudinary(for image upload)
  - stripe(for payment integration)

---

## Dependencies Used

```json
"dependencies": {
    "@stripe/react-stripe-js": "^3.1.1",
    "@stripe/stripe-js": "^5.5.0",
    "@tanstack/react-query": "4",
    "axios": "^1.7.9",
    "firebase": "^11.2.0",
    "firebase-tools": "^13.29.2",
    "global": "^4.4.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.4.0",
    "react-router": "^7.1.3",
    "react-simple-typewriter": "^5.0.1",
    "react-toastify": "^11.0.3",
    "react-type-animation": "^3.2.0",
    "react-typist": "^2.0.5",
    "swiper": "^11.2.2"
}
```

1. Clone the repository:
   ```bash
   git clone https://github.com/shihabhq/urbaneats.git
   cd urban-estates
   ```
2. Install Dependencies:
   ```bash
   yarn
   ```
3. Create a .env file and add your Firebase & backend API keys

4. Start the development server:
   ```bash
   yarn start
   ```

## Demo Credentials

##### for admin login

- email: admin@gmail.com
- password: Admin1@

##### for agent login

- email: agent1@gmail.com
- password: Agent1@

Live Link: [Click Here!](https://urbanestate-dbfe4.web.app/)

Serverside Link: [Click Here!](https://github.com/shihabhq/urbanestates-server)
