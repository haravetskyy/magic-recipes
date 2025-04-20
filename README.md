# Recipe App

Full-Stack JS engineer test assessment - the Recipe book for DevelopersToday. Project consists of frontend (**Next.js**) and backend (**Nest.js**)

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **pnpm**
- **Docker** and **Docker Compose**

---

### **1. Clone the Repository**

```bash
git clone https://github.com/haravetskyy/harbor-task.git
cd harbor-task
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
pnpm install
```

---

### **4. Start the Application**

```bash
pnpm dev
```
