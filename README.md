# Brainly Frontend


https://github.com/user-attachments/assets/bb3fa472-3f73-4711-b4da-b593e2947cc3


A React application built with Vite for the Brainly platform, featuring bookmark management and user authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brainly/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the client root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   # or for production
   VITE_API_URL=https://your-vercel-app.vercel.app/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 🧪 Testing

### Test Account
For testing purposes, use these credentials:
- **Email:** `saviantech@gmail.com`
- **Password:** `timetoquit`


## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework (if used)

## 🌐 API Integration

The frontend communicates with the backend API for:
- User authentication (login/register)
- Bookmark management (CRUD operations)

API endpoints are configured through the `VITE_API_URL` environment variable.

## 🚀 Deployment

### Build for production
```bash
npm run build
```



