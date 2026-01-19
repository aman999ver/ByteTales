# ByteTales: Interactive Computer Science Learning Platform

**ByteTales** is a gamified educational platform designed to teach Computer Science concepts to kids through interactive stories and quizzes.

Developed by **SAS Tech Group G**:
- 👨‍💻 **Aman Verma**
- 👨‍💻 **Santosh Yadav**
- 👨‍💻 **Sneha Singh**

---

## 🚀 Quick Start Guide

Follow these steps to get the project running in minutes.

### 1. Prerequisites
- **Node.js** (v16+)
- **Python** (v3.10+)
- **MongoDB** (Ensure it is running locally or have a connection string ready)

### 2. Clone the Repository
```bash
git clone https://github.com/aman999ver/ByteTales.git
cd ByteTales
```

### 3. Backend Setup
Navigate to the backend folder and set up the environment.

1.  **Create and Activate Virtual Environment:**
    ```bash
    cd backend
    python -m venv venv
    # Windows:
    .\venv\Scripts\activate
    # Mac/Linux:
    # source venv/bin/activate
    ```

2.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Configure Database:**
    - Create a `.env` file in the `backend/` directory.
    - Add your MongoDB connection string (default local):
      ```env
      MONGODB_URI=mongodb://localhost:27017
      SECRET_KEY=your_super_secret_key_here
      ALGORITHM=HS256
      ACCESS_TOKEN_EXPIRE_MINUTES=30
      ```

4.  **Run the Server:**
    ```bash
    uvicorn app.main:app --reload --port 8000
    ```
    *The backend will start at `http://localhost:8000`*

### 4. Frontend Setup
Open a new terminal and navigate to the frontend folder.

1.  **Install Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

2.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    *The application will start at `http://localhost:5173`*

---

## 🌟 Key Features

- **Interactive Stories:** Learn loops, variables, and logic through fantasy adventures.
- **Gamification:** Earn XP, badges, and unlock new avatars.
- **Face Authentication:** Login securely using facial recognition.
- **Admin Panel:** specialized dashboard to manage students, stories, and quizzes.
- **Responsive Design:** Optimized for Desktops, Tablets, and Mobile devices.

## 🛠 Tech Stack

- **Frontend:** React, Vite, Framer Motion
- **Backend:** FastAPI, Python
- **Database:** MongoDB
- **Authentication:** JWT, face_recognition

---

© 2026 ByteTales | Built with ❤️ by **SAS Tech Group G**
