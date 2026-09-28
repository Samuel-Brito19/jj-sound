import { expect, test } from '@playwright/test';
import { whatsappUrl } from '../src/data/site';

test('gallery opens, closes with Escape, restores focus and scrolls through events', async ({
  page,
}) => {
  await page.goto('/');
  const firstPhoto = page.getByRole('button', { name: /^Ampliar:/ }).first();
  await firstPhoto.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img').first()).toHaveJSProperty(
    'complete',
    true,
  );
  expect(
    await dialog
      .locator('img')
      .first()
      .evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(0);
  await expect(dialog.locator('.lightbox-position')).toHaveText('1 / 14');
  const feed = dialog.locator('.lightbox-feed');
  await feed.hover();
  await page.mouse.wheel(0, 650);
  await expect(dialog.locator('.lightbox-position')).toHaveText('2 / 14');
  await page.keyboard.press('ArrowDown');
  await expect(dialog.locator('.lightbox-position')).toHaveText('3 / 14');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(firstPhoto).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass('modal-open');
  const track = page.locator('#gallery-track');
  await expect(
    page.getByRole('button', { name: 'Fotos anteriores' }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Próximas fotos' }).click();
  await expect
    .poll(() => track.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(100);
  await expect(
    page.getByRole('button', { name: 'Fotos anteriores' }),
  ).toBeEnabled();
  await track.focus();
  await page.keyboard.press('End');
  await expect(
    page.getByRole('button', { name: 'Próximas fotos' }),
  ).toBeDisabled();
  await expect(page.getByRole('button', { name: /^Ampliar:/ })).toHaveCount(14);
  await page
    .getByRole('button', { name: /^Ampliar:/ })
    .last()
    .click();
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.lightbox-position')).toHaveText('14 / 14');
  await page.getByRole('button', { name: 'Fechar imagem' }).click();
  await expect(dialog).not.toBeVisible();
});

test('mobile and desktop have no horizontal overflow and contact links are valid', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator('.service-card')).toHaveCount(8);
    for (const contact of await page
      .getByRole('link', { name: /Fale conosco/ })
      .all()) {
      await expect(contact).toHaveAttribute('href', whatsappUrl);
    }
  }
  expect(errors).toEqual([]);
});
