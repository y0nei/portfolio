<a name="readme-top"></a>

# Personal portfolio
[![Issues badge][issues badge]][issues]
[![Frontend badge][frontend badge]](https://svelte.dev)
[![Lincense badge][license badge]][license]

> A personal website of mine serving as a portfolio and a link collection for all of my social media accounts (*just like carrd.co/linktr.ee*).

We all know that there are many benefits to having your own portfolio/personal website. For a long time, I have procrastinated on creating one for myself, and instead used social media to establish an online presence and post my work. I believe it's necessary for anybody looking into web development to have a personal website, creating your own portfolio site — rather than working within the limitations of other platforms — showcases your dedication to your craft. With your own site, you can integrate design features tailored exclusively to your style and capabilities.
Speaking of design, I decided to take time and learn Figma in order to create a prototype of this website, not only to train myself as a web developer, but also as a designer.

[![Figma design board][figma badge]][figma board]

## Built with
**Tech used**: Svelte, SCSS, Bun

This is my first project utilizing a JavaScript frameworks. I'm a fan of simplicity and I have always just stuck to using a Python backend serving Jinja2 templates. After completing this project in Astro I chose to learn Svelte and rewrite it using that framework.  
The [`origin/python-based`][python branch] branch is an older abandoned attempt of creating this website using the [FastAPI][fastapi] framework, SCSS and [JinjaX][jinjax] for templating.  
The Astro based version is available under the [`origin/astro-based`][astro branch] branch.

## Quickstart
First make sure that bun is installed locally on your machine. See the installation instructions in [Bun's official documentation][bun install docs].

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Install dependencies                             |
| `bun run dev`             | Starts local dev server                          |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally                       |

## Contributing
Contributions are welcome! If you encounter any issues or have a suggestion that would make this better, please open an issue or submit a pull request.
1. Fork this project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Contact
Yonei - <y0nei@proton.me>  
Matrix (`@y0nei:matrix.org`), Discord (`y0nei`), [Telegram](https://t.me/y0nei)

## Acknowledgements
#### Inspiration:
- [Tamagui landing page design](https://www.lapa.ninja/post/tamagui/)

## License
Distributed under the `AGPL-3.0-or-later` license. See the `LICENSE` file for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LINKS & IMAGES -->
[issues badge]: https://badgers.space/github/issues/y0nei/portfolio?corner_radius=s
[frontend badge]: https://badgers.space/badge/frontend/svelte?color=FF3E00&corner_radius=s
[license badge]: https://badgers.space/badge/license/AGPL-3.0?color=pink&corner_radius=s
[figma badge]: https://badgers.space/badge/icon/figma%20design%20board?icon=feather-figma&color=F24E1E&scale=1.33&corner_radius=m&label=

[license]: https://github.com/y0nei/portfolio/blob/main/LICENSE
[issues]: https://github.com/y0nei/portfolio/issues
[python branch]: https://github.com/y0nei/portfolio/tree/python-based
[astro branch]: https://github.com/y0nei/portfolio/tree/astro-based
[figma board]: https://www.figma.com/file/9nHRCQxvyppGR1tTV1Oxje/Personal-portfolio?type=design&node-id=0%3A1&mode=design&t=ZYjOHM0oWB0JF30c-1
[bun install docs]: https://bun.sh/docs/installation
[fastapi]: https://fastapi.tiangolo.com/
[jinjax]: https://jinjax.scaletti.dev/
