# ☕ Cafe Inventory System — Setup Guide

## What's on this PC

This PC runs the Cafe Inventory System automatically.  
It manages your stock, staff, and billing — accessible from any device on your network or remotely via Tailscale.

---

## Starting & Stopping the App

| Action | What to do |
|---|---|
| **Start the app** | Double-click `START.bat` |
| **Stop the app** | Double-click `STOP.bat` |

> The app starts automatically when the PC boots — you normally don't need to do anything.

---

## Accessing the App

**From inside the cafe (same Wi-Fi):**
Open any browser and go to:
```
http://<this PC's local IP>
```
*(The START.bat script will display this IP when you run it)*

**From outside the cafe (remotely):**
Open Tailscale on your device, then go to:
```
http://<tailscale IP of cafe PC>
```
*(The Tailscale IP looks like 100.x.x.x — find it in the Tailscale app)*

---

## Troubleshooting

### App won't open in browser
1. Make sure Docker Desktop is running (check the taskbar — whale icon 🐳)
2. Double-click `START.bat` and wait for it to finish
3. Try again in the browser

### Can't access remotely
1. Open Tailscale on your device — make sure it shows "Connected"
2. Open Tailscale on the cafe PC — make sure it shows "Connected"
3. Use the `100.x.x.x` IP, not the local IP

### Docker Desktop won't start
1. Restart the PC
2. After login, wait 1–2 minutes for Docker to start automatically
3. Then double-click `START.bat`

---

## Updating the App (for the developer)

If you receive an updated version of the project:

1. Copy the new files into `C:\cafe-inventory\` (replace existing)
2. Open PowerShell in that folder
3. Run: `docker compose up -d --build`

---

## Important Files

```
cafe-inventory/
├── START.bat              ← Double-click to start
├── STOP.bat               ← Double-click to stop
├── docker-compose.yml     ← App configuration (don't delete)
├── backend/
│   ├── .env               ← Secret settings (don't share)
│   └── uploads/           ← Item images stored here
└── frontend/              ← Website files
```

---

## Support

Contact your developer for any issues beyond basic troubleshooting.
