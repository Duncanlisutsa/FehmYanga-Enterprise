# FehmYanga Farm Website

This project includes a static frontend and a Node/Express backend for contact form submissions.

## Frontend

Files:
- `index.html`
- `style.css`
- `javascript.js`

Open `index.html` in a browser, or serve the folder with a local static server.

## Backend

The backend lives in `server/` and exposes a POST endpoint:

- `POST http://localhost:3000/api/contact`

### Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Copy `.env.example` to `.env` and fill in your SMTP settings:
```bash
cp .env.example .env
```

3. Start the backend:
```bash
npm start
```

## Notes

- The frontend sends contact messages to `http://localhost:3000/api/contact`.
- The backend uses `nodemailer` and SMTP credentials from `server/.env`.
- The repository remote is configured to `https://github.com/Duncanlisutsa/FehmYanga-Enterprise.git`.
