import { expect, test } from '@playwright/test';

test('gallery opens, closes with Escape, restores focus and reveals more events', async ({
  page,
}) => {
  await page.goto('/');
  const firstPhoto = page.getByRole('button', { name: /^Ampliar:/ }).first();
  await firstPhoto.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveJSProperty('complete', true);
  expect(
    await dialog
      .locator('img')
      .evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(firstPhoto).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass('modal-open');
  await page.getByText('Ver mais eventos', { exact: true }).click();
  await expect(page.getByRole('button', { name: /^Ampliar:/ })).toHaveCount(14);
  await page
    .getByRole('button', { name: /^Ampliar:/ })
    .last()
    .click();
  await expect(dialog).toBeVisible();
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
      await expect(contact).toHaveAttribute(
        'href',
        /^https:\/\/wa\.me\/5585999999999\?text=/,
      );
    }
  }
  expect(errors).toEqual([]);
});
