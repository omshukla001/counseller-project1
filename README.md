# Admission Portal

Monorepo for the Knowledge Park 360 admission portal.

```
concultancyproj/
├── frontend/   # Vite + React SPA
├── backend/    # Express + MongoDB API
└── deploy/     # nginx sample config
```

## Local development

Requires Node 20+ and a running MongoDB (local or Atlas).

```bash
# 1. Backend
cd backend
cp .env.example .env    # set MONGO_URI, ADMIN_PASSWORD_HASH, JWT_SECRET
npm install
npm run dev             # http://localhost:5000

# 2. Frontend (separate terminal)
cd frontend
npm install
npm run dev             # http://localhost:5173
```

The frontend dev server proxies `/api/*` to `http://localhost:5000`
(see `frontend/vite.config.js`), so `VITE_API_URL` can be left blank in dev.

## API

Public:
- `POST /api/leads` — submit a lead (rate-limited)

Admin (require `Authorization: Bearer <token>`):
- `POST /api/auth/login` — password checked against bcrypt hash in `ADMIN_PASSWORD_HASH`, returns JWT. Rate limited: 5 failed attempts / 15 min and 20 / hour per IP (successful logins don't count against the limit).
- `GET /api/leads` — list leads (supports `?q=` and `?status=`)
- `PATCH /api/leads/:id` — update status/notes
- `DELETE /api/leads/:id` — delete

---

## Deploying to AWS EC2

Works on a single `t3.small` (or larger) Ubuntu 22.04 box. The backend runs
under PM2, MongoDB runs on the same host (or on Atlas), and nginx serves the
built frontend and proxies `/api` to the backend.

### 1. Launch the instance

- Ubuntu 22.04 LTS, 2 GB RAM minimum
- Security group: allow 22 (SSH from your IP), 80, 443
- Attach/allocate an Elastic IP and point your domain's A record at it

### 2. Install dependencies

```bash
sudo apt update && sudo apt upgrade -y

# Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# PM2
sudo npm install -g pm2

# MongoDB 7 (skip if using Atlas)
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl enable --now mongod
```

### 3. Clone and configure

```bash
cd /opt
sudo git clone <your-repo-url> admission-portal
sudo chown -R $USER:$USER admission-portal
cd admission-portal

# Backend env
cd backend
cp .env.example .env
# Edit .env:
#   - JWT_SECRET: `openssl rand -hex 48`
#   - ADMIN_PASSWORD_HASH: `node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 12))"`
#   - CORS_ORIGIN: your domain (https://example.com) or Elastic IP (http://1.2.3.4)
npm ci --omit=dev

# Frontend build
cd ../frontend
# Leave VITE_API_URL empty so the app uses same-origin /api (nginx proxies it)
npm ci
npm run build
sudo mkdir -p /var/www/admission-portal
sudo cp -r dist/* /var/www/admission-portal/
```

### 4. Start the API with PM2

```bash
cd /opt/admission-portal/backend
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u $USER --hp /home/$USER   # copy & run the printed command
```

### 5. Configure nginx

```bash
sudo cp /opt/admission-portal/deploy/nginx.conf.sample /etc/nginx/sites-available/admission-portal
sudo ln -s /etc/nginx/sites-available/admission-portal /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
# Edit the config and replace server_name with your domain
sudo nginx -t && sudo systemctl reload nginx
```

### 6. TLS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

### Updating after a new commit

```bash
cd /opt/admission-portal
git pull

cd backend && npm ci --omit=dev && pm2 reload admission-api

cd ../frontend && npm ci && npm run build
sudo rm -rf /var/www/admission-portal/*
sudo cp -r dist/* /var/www/admission-portal/
```

### Operational notes

- MongoDB: bind to `127.0.0.1` only (the default); never expose 27017 publicly.
- Back up the DB: `mongodump --out /var/backups/mongo/$(date +%F)` in a daily cron.
- Watch logs: `pm2 logs admission-api`, `sudo tail -f /var/log/nginx/error.log`.
- Rotate `JWT_SECRET` by changing `.env` and running `pm2 reload admission-api`
  (this invalidates all existing admin sessions).
