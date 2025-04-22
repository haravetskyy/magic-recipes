# Magic Recipes

A small application which utilizes Free Recipe API (TheMealDb.com). Project consists of frontend (**Next.js**) and backend (**Nest.js**)

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **bun** _(optional, I used it while developing)_

---

### **1. Clone the Repository**

```bash
git clone https://github.com/haravetskyy/magic-recipes.git
cd magic-recipes
```

---

### **2. Configure Environment Variables**

The project requires environment variables to function properly. To assist you, `.env.example` files are provided in the following directories:

- `frontend/`
- `backend/`

These files serve as templates, listing all necessary variables. You need to copy them to their respective `.env` files and fill them with data specific to your setup.

> [!TIP]
> In this step you can also simply rename `.env.example` files to `.env` in all the directories and setup will work

---

### **3. Install Dependencies**

Install all required Node.js packages for both the frontend and backend:

```bash
bun install
```

> [!NOTE]
> If you want to use another package manager than `bun` you will need to enter this command in `root`, `frontend` and `backend` directories

---

### **4. Start the Application**

Run this command in `frontend` and `backend` directories:

```bash
bun dev
```

---

### **5. Access the Application**

Once the application is running, you can access it as follows, assuming you left all environment variables untouched (using default settings from `.env.example`):

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API Documentation**: [http://localhost:8000/api](http://localhost:8000/api)
