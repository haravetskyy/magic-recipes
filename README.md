# Magic Recipes

Full-Stack JS engineer test assessment - the Recipe book for DevelopersToday. Project consists of frontend (**Next.js**) and backend (**Nest.js**)

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v18 or later)

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

> [!NOTE]
> In this step you can also simply copy data from `.env.example` files and paste it in `.env` files in the same directory

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
