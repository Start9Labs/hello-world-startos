# Hello World

Hello World is a minimal reference service for StartOS. It serves a single static web page and exists to demonstrate what a working StartOS package looks like end-to-end. If you're a user, this is the simplest service you can install — there's nothing to configure. If you're a developer, this package is the [recommended template](https://github.com/Start9Labs/hello-world-startos) for starting a new package.

## What you get on StartOS

After install you have:

- **A running web server** that serves a single page over HTTP/HTTPS.
- **A web interface** reachable on your LAN, over Tor, and (optionally) over a public domain — the same networking options every StartOS service exposes.
- **No configuration required.** The service starts and is immediately usable.

## Getting set up

1. Install Hello World from the marketplace.
2. Open the service's **Dashboard** tab to see its status.
3. Click the web interface link in the Dashboard to open the served page.

That's it. There's no setup wizard, no admin password to set, no first-run prompt.

## Using Hello World

### Web interface

The service exposes one HTTP interface on port 80, automatically wrapped in HTTPS by StartOS. From the **Dashboard** tab, click the interface link to open it. From the interface's own page you can:

- Copy the URL to share or paste into another device.
- Reveal a QR code for opening from a phone.
- Choose between LAN, Tor, and any public domains you've added.

### Actions

Hello World ships with no actions — it has nothing for you to do beyond viewing the page.

## Limitations

- Hello World is intentionally minimal. It is not a useful service on its own; it exists to demonstrate the StartOS packaging system.
- The page content is static and cannot be customized through the StartOS UI.

## Learn more

- [Hello World source code](https://github.com/Start9Labs/hello-world-startos) — the StartOS package
- [Upstream Hello World repo](https://github.com/Start9Labs/hello-world) — the underlying web server
- [StartOS packaging guide](https://docs.start9.com/packaging) — to write your own service
