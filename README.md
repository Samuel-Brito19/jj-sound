# Adailton Som

Landing page em PT-BR, feita com Astro e TypeScript. Componentes Astro, CSS responsivo e JavaScript apenas para a galeria ampliada.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Validação e publicação

```sh
npm run check
npm run build
npm run preview
```

O build estático é gerado em `dist/`. Para testar as interações em navegador: `npx playwright install chromium` e `npm run test:e2e`.

## Conteúdo

- WhatsApp: altere `whatsappNumber` em `src/data/site.ts`. **O número atual é ilustrativo e deve ser substituído antes da publicação.**
- Serviços: `src/data/site.ts`.
- Galeria: fotos originais em `photos/`, seleção e legendas em `src/components/Gallery.astro`. Astro gera as versões WebP otimizadas durante o build.
- Cores, tipografia e responsividade: `src/styles/global.css`.
- Metadados: `src/layouts/Layout.astro`. Ao definir o domínio, configure `site` em `astro.config.mjs` e a URL absoluta de `og:image`.

As fontes são carregadas pelo Google Fonts, com alternativas locais caso o serviço esteja indisponível. Não há formulário, rastreamento ou backend.
