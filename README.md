# play-webpack

> webpack playground for publicPaths

- separates css from js using mini-css-extract-plugin
- uses file-loader to extract images and fonts
- dynamic import of `js` files
- vendor bundling
- use of `__webpack_public_path__` to change public paths for js, css, img and fonts

## usage

```bash
npm i
npm run build
# start using `/` for public path 
npm run hs:root 
# start using `/static` for assets
npm run hs:static
```

## License

https://unlicense.org

