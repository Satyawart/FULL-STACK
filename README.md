# 📚 BiblioBuddy – Your Friendly Book Keeper

A modern, responsive, and fully interactive full-stack web application for managing your personal book collection. Built with React.js, Tailwind CSS, Framer Motion (frontend) and Flask, SQLite (backend).

![BiblioBuddy](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 📖 **View Your Library** – Browse all books with real-time data from backend
- ➕ **Add New Books** – Form with validation (all fields required, price must be positive)
- ✏️ **Edit Books** – Modal-based editing with smooth animations
- 🗑️ **Delete Books** – Confirmation dialog before deletion
- 🔍 **Search** – Filter books by ID, title, or author
- 🎨 **Beautiful UI** – Soft blue-white neumorphic theme with rounded corners
- 📱 **Fully Responsive** – Works seamlessly on desktop, tablet, and mobile
- 🔔 **Toast Notifications** – Success and error messages with auto-dismiss
- 🌐 **REST API** – Complete CRUD operations via Flask backend
- ♿ **Accessible** – Keyboard navigation, ARIA labels, focus rings

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (3.8 or higher)
- **pip** (Python package manager)

### Installation & Running

#### 1️⃣ **Backend Setup**

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend will start on `http://127.0.0.1:5000`

#### 2️⃣ **Frontend Setup**

Open a new terminal:

```bash
cd bibliobuddy-frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

#### 3️⃣ **Open in browser**

Visit `http://localhost:5173` to use the app!

## 🏗️ Project Structure

```
Full Stack/
├── backend/
│   ├── app.py              # Flask REST API server
│   ├── requirements.txt    # Python dependencies
│   ├── books.db           # SQLite database (auto-created)
│   └── README.md          # Backend documentation
│
├── bibliobuddy-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # App header with logo
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── BookList.jsx     # Book grid container
│   │   │   ├── BookCard.jsx     # Individual book with edit/delete
│   │   │   ├── AddBookForm.jsx  # Add book form with validation
│   │   │   ├── SearchBar.jsx    # Search/filter input
│   │   │   └── Toast.jsx        # Toast notification
│   │   ├── lib/
│   │   │   └── api.js          # Axios API client
│   │   ├── App.jsx             # Root component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles + Tailwind
│   ├── public/
│   │   └── logo.svg            # App logo
│   ├── index.html              # HTML template
│   ├── tailwind.config.js      # Tailwind config
│   ├── vite.config.js          # Vite config
│   ├── .env                    # Environment variables
│   └── package.json            # Dependencies
│
└── README.md                   # This file
```

## 🎨 Design System

### Color Palette
- **Background**: `#f5f9ff` – Soft blue-white base
- **Card Background**: `#f8fbff` – Slightly lighter white
- **Accent**: `#cfe2ff` – Soft blue accent
- **Shadow**: `#cbdaf7` – Neumorphic shadow color
- **Text**: Black – All text for maximum clarity

### Typography
- **Fonts**: Inter (body), Poppins (headings) from Google Fonts
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Animations (Framer Motion)
- Fade-in and slide-up for page loads
- Hover lift effects on book cards
- Modal scale and fade transitions
- Toast slide-in from bottom-right
- Smooth layout animations on add/delete

## 🔌 API Endpoints

The Flask backend provides complete CRUD operations:

### GET /books
Fetch all books
```json
Response: [
  { "book_id": "101", "title": "Clean Code", "author": "Robert Martin", "price": 599 }
]
```

### POST /books
Add a new book
```json
Body: { "book_id": "101", "title": "Clean Code", "author": "Robert Martin", "price": 599 }
Response: { "book_id": "101", "title": "Clean Code", "author": "Robert Martin", "price": 599 }
```

### PUT /books/:book_id
Update an existing book
```json
Body: { "title": "Clean Code Updated", "author": "Robert C. Martin", "price": 699 }
Response: { "book_id": "101", "title": "Clean Code Updated", "author": "Robert C. Martin", "price": 699 }
```

### DELETE /books/:book_id
Delete a book
```json
Response: { "message": "Book 101 deleted successfully" }
```

## 🛠️ Tech Stack

### Frontend
- **React 18** – Modern React with hooks
- **Vite** – Lightning-fast build tool
- **Tailwind CSS** – Utility-first CSS framework
- **Framer Motion** – Smooth animations and transitions
- **Axios** – HTTP client for API calls

### Backend
- **Flask** – Python web framework
- **Flask-CORS** – Cross-origin resource sharing
- **SQLite** – Lightweight embedded database

## 📝 Validation Rules

### Add/Edit Book Form
- **Book ID**: Required (string or number)
- **Title**: Required
- **Author**: Required
- **Price**: Required, must be a positive number (> 0)

### Backend Validation
- Duplicate `book_id` prevention (409 Conflict)
- Type validation for all fields
- Proper HTTP status codes (200, 201, 400, 404, 409, 500)

## 🎯 User Experience Features

- **Real-time Updates** – Books sync with backend immediately
- **Error Handling** – Clear error messages with retry options
- **Loading States** – Animated loading indicators
- **Empty States** – "No books yet, add one!" message
- **Search/Filter** – Instant client-side filtering
- **Edit Modal** – Smooth modal with form pre-filled
- **Delete Confirmation** – Browser confirm dialog
- **Toast Notifications** – Auto-dismiss success/error toasts
- **Responsive Design** – Mobile-first, works on all screen sizes
- **Keyboard Accessible** – Focus rings, tab navigation

## 🧪 Testing the App

1. **Start Backend**: `cd backend && python app.py`
2. **Start Frontend**: `cd bibliobuddy-frontend && npm run dev`
3. **Add Books**: Fill form and submit (all fields required, price > 0)
4. **Edit Books**: Click Edit button, modify fields, save
5. **Delete Books**: Click Delete, confirm in dialog
6. **Search**: Type in search box to filter by ID/title/author
7. **Error Handling**: Stop backend and click Retry to see connection error
8. **Responsive**: Test on mobile/tablet/desktop viewports

## 🚢 Building for Production

### Frontend
```bash
cd bibliobuddy-frontend
npm run build
```
Optimized build will be in `bibliobuddy-frontend/dist/`

### Backend
For production, use a WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 💡 Tips & Troubleshooting

### Common Issues

**"Connection Error: Failed to load books"**
- Ensure backend is running on `http://127.0.0.1:5000`
- Check `.env` file has correct `VITE_API_BASE`
- Restart frontend dev server after changing `.env`

**Books not appearing after add**
- Check browser Network tab for POST response
- Verify backend returned 201 status
- Look for toast error message

**CORS errors**
- Flask-CORS is enabled by default in `backend/app.py`
- If issues persist, check browser console for details

### Development Tips
- Keep both terminals open (backend + frontend)
- Use browser DevTools Network tab to debug API calls
- Check Flask terminal for backend errors
- SQLite database `books.db` is created automatically

---

**Made with ❤️ for book lovers everywhere**

**Happy Reading! 📚✨**
