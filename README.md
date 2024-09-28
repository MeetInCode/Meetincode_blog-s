Here’s the updated README with Redux Toolkit added:

# Blog Platform

This project is a blog platform where users can create, edit, and view posts. The application is built with React, Redux Toolkit, React Router, Appwrite for authentication, TinyMCE for rich-text editing, and React Hook Forms for form handling.Entire project is build by keeping production-grade rules in mind.

## Project Structure

```
c:/Users/ASUS/Desktop/meetincode-blogs/
├─ conf/
│  └─ conf.js
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ appwrite/
│  │  ├─ auth.js
│  │  └─ config.js
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ container/
│  │  │  └─ container.jsx
│  │  ├─ footer/
│  │  │  ├─ footer.jsx
│  │  │  └─ logo.jsx
│  │  ├─ header/
│  │  │  ├─ header.jsx
│  │  │  └─ logoutbtn.jsx
│  │  ├─ post-form/
│  │  │  └─ postform.jsx
│  │  ├─ authLayout.jsx
│  │  ├─ button.jsx
│  │  ├─ index.js
│  │  ├─ input.jsx
│  │  ├─ login.jsx
│  │  ├─ postcard.jsx
│  │  ├─ RTE.jsx
│  │  ├─ select.jsx
│  │  └─ signup.jsx
│  ├─ pages/
│  │  ├─ AddPost.jsx
│  │  ├─ AllPosts.jsx
│  │  ├─ EditPost.jsx
│  │  ├─ HomePage.jsx
│  │  ├─ index.js
│  │  ├─ Login.jsx
│  │  ├─ showpost.jsx
│  │  └─ SignUp.jsx
│  ├─ store/
│  │  ├─ authslice.js
│  │  └─ store.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## Key Technologies

### 1. **Appwrite**

Appwrite is used in this project for user authentication and backend API interactions. It handles sign-up, login, and user sessions.

- **Location in the Project:** `src/appwrite/`
- **Files:**
  - `auth.js`: Handles authentication logic such as login, sign-up, and session management.
  - `config.js`: Contains the Appwrite configuration (server URL, project ID, etc.).

### 2. **TinyMCE**

TinyMCE is a rich-text editor used for writing and formatting blog posts.

- **Location in the Project:** TinyMCE is integrated in the `post-form` component found at `src/components/post-form/postform.jsx` and `RTE.jsx`.
- **Usage:** TinyMCE provides an easy-to-use text editor interface for users to format their blog posts with text styles, links, media embeds, and more.

### 3. **React Hook Form**

React Hook Form is used for managing form states and validation, ensuring smooth user interactions and data submission.

- **Location in the Project:** Integrated into forms like login, sign-up, and post creation in the components located in `src/components/`.
- **Usage:** React Hook Form simplifies form validation, handling input values and errors efficiently in components such as `login.jsx`, `signup.jsx`, and `postform.jsx`.

### 4. **Redux Toolkit**

Redux Toolkit simplifies state management in this project by reducing boilerplate code and offering a powerful API for managing slices of state.

- **Location in the Project:** The Redux setup is located in `src/store/`.
- **Files:**

  - `authslice.js`: Defines the authentication-related slice of state, including actions like login, logout, and user session management.
  - `store.js`: Configures the Redux store using `configureStore` from Redux Toolkit.

- **Usage:** The global state is managed via Redux Toolkit to store authentication information and other global states. Components access and dispatch actions through `useSelector` and `useDispatch`.

## Key Features

### Routing

- The app uses `react-router-dom` to manage routes. Each page (Home, Login, Signup, All Posts, Add Post, Edit Post, and Post Details) is tied to a specific route in the app. Routes are set up in `main.jsx` with dynamic routes for editing posts and viewing post details.

### State Management

- Redux Toolkit is used for global state management, particularly for managing authentication states (login, signup, etc.). The store is located in `src/store/`.

### Rich Text Editor

- TinyMCE is integrated into the blog creation form to allow users to write and style blog posts easily.

## Setup

### Prerequisites

- Node.js and npm/yarn installed.
- Appwrite server (refer to the Appwrite documentation for setting up your Appwrite backend).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/meetincode-blogs.git
   cd meetincode-blogs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Rename `sample.env` to `.env`.
   - Update the values for Appwrite and other configurations.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run the linter for checking code quality.

## License

This project is licensed under the MIT License.

---

Let me know if any further details are needed!

IN CASE IF IN FUTURE WE DECIDE TO SHIFT FROM APPWRITE TO ANY OTHER BACKEND SERVICE THEN ONLY FOLDER WHICH WILL NEED TO BE CHANGED IS APPWRITE->AUTH.JS & CONFIG.JS
