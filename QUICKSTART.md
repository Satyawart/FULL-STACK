# 🚀 BiblioBuddy Quick Start Guide

## Step 1: Start the Backend

Open a terminal and run:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

You should see:
```
✅ Database initialized
🚀 Starting BiblioBuddy Backend on http://127.0.0.1:5000
```

**Keep this terminal running!**

---

## Step 2: Start the Frontend

Open a **NEW** terminal and run:

```bash
cd bibliobuddy-frontend
npm install
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

**Keep this terminal running too!**

---

## Step 3: Open the App

Visit **http://localhost:5173** in your browser.

---

## ✅ What You Should See

1. **Header**: "BiblioBuddy – Your Friendly Book Keeper"
2. **Left Panel**: "Add New Book" form
3. **Right Panel**: "Your Library" (initially shows "No books yet, add one!")

---

## 🎯 Try These Actions

### Add a Book
1. Fill in all fields:
   - Book ID: `101`
   - Title: `Clean Code`
   - Author: `Robert Martin`
   - Price: `599`
2. Click "Add Book"
3. See success toast and book appears in library

### Edit a Book
1. Click "Edit" on any book card
2. Modify fields in the modal
3. Click "Save"
4. See success toast and updated book

### Delete a Book
1. Click "Delete" on any book card
2. Confirm in the dialog
3. See success toast and book disappears

### Search Books
1. Type in the search box (top right)
2. Filter by book ID, title, or author
3. Results update instantly

---

## 🐛 Troubleshooting

### "Connection Error: Failed to load books"
- **Fix**: Make sure backend terminal is running
- Click "Try Again" button after starting backend

### Books not adding
- **Check**: All fields filled and price > 0
- **Check**: Backend terminal for error messages
- **Check**: Browser DevTools > Network tab for API response

### Port already in use
- **Backend (5000)**: Stop other Flask apps or change port in `backend/app.py`
- **Frontend (5173)**: Vite will auto-increment to 5174, 5175, etc.

---

## 📁 File Locations

- **Backend code**: `backend/app.py`
- **Database**: `backend/books.db` (auto-created)
- **Frontend code**: `bibliobuddy-frontend/src/`
- **API config**: `bibliobuddy-frontend/.env`

---

## 🎨 Features to Explore

- ✅ Neumorphic soft blue-white design
- ✅ Smooth Framer Motion animations
- ✅ Responsive layout (try mobile view)
- ✅ Toast notifications
- ✅ Form validation
- ✅ Search/filter
- ✅ Edit modal
- ✅ Delete confirmation

---

**Enjoy managing your book collection! 📚✨**
