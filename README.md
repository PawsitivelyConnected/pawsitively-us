Pawsitively Me - An open-source simple dog tracking mechanism
===============

This project extensibly uses GSM Module to track your lvoed ones

### <a id="getting-started"></a> 🏎 Getting Started

#### <a id="clone-deploy"></a> ⛴ Clone & Deploy with Github and Vercel

Create new Github repo with vercel and deploy it within minutes. Could not be easier as hitting some buttons. Shipping of private repos is possible.

Later: Check out your repo locally and run ```npm install``` or ```yarn``` in root

Follow Instructions for [Starting Up](#start-up)

#### <a id="manual-install"></a> ⚙️ Manual install

```bash
git clone https://github.com/richard-unterberg/next-leaflet-starter-typescript
# then
npm install
# or
yarn
```

### <a id="start-up"></a> 🏍️ Start up

According the official [Next.js Docs](https://nextjs.org/docs/getting-started):

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Building with type checking and linting

```bash
npm run build
# or
yarn build
```

Start build locally

```bash
npm run start
# or
yarn start
```

### <a id="coming-up"></a> 📊 Upcoming (probably)

+ redesign zoom in / zoom out
+ atom components for map ui
+ fix error when setting new coordinates in hot reload "Map container is already initialized."
+ breakpoint hook synced with tailwind breakpoint which is usable in js
+ multiple map instances per page
  + not possible atm since we read the map instance directly from window object 🤫
+ add axios for fetching data
  + move simulated "endpoint" (Places) to public folder and convert to JSON

- **Feel free to contribute!** 🤗

### <a id="dependencies"></a> 📦 All them dependencies


See ```package.json``` for more details and devDependencies.

### <a id="disable-lint"></a> 🤯 How to remove those  linting rules?

You can adjust the settings mainly in ```eslint.json``` and ```tsconfig.json```.

I've been using them a lot on my dayjob so I can't be anymore without them.

### <a id="no-ts"></a> 📝 Don't wanna use typscript at all?

See this nice javascript implementation - This repo is heavily inspired by this one:
https://github.com/colbyfayock/next-leaflet-starter


Happy coding! ✌️👽
