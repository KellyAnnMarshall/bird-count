import { expect, test } from '@playwright/test';

test('loads bird data, toggles information and counts bird sightings', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Garden Bird Count' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Blackbird' })).toBeVisible();
  await expect(page.locator('ul.row.col-lg-9 > li')).toHaveCount(15);
  await expect(page.getByRole('heading', { name: 'Bird count totals' })).toBeVisible();
  await expect(page.getByRole('progressbar', { name: 'Blackbird sightings' })).toBeVisible();
  await expect(page.locator('.card ngb-progressbar')).toHaveCount(0);

  const showInformation = page.getByRole('button', { name: 'Show app information' });
  await showInformation.click();
  await expect(page.getByRole('button', { name: 'Hide app information' })).toHaveAttribute('aria-expanded', 'true');

  const blackbirdCard = page.locator('li').filter({ hasText: 'Blackbird' });
  await blackbirdCard.getByRole('button', { name: 'Add a Blackbird' }).click();
  await expect(blackbirdCard.locator('output')).toHaveText('1');
  await expect(page.getByRole('progressbar', { name: 'Blackbird sightings' }))
    .toHaveAttribute('aria-valuenow', '1');
  await expect(page.getByRole('progressbar', { name: 'Blackbird sightings' }).locator('.bird-chart__bar'))
    .toHaveCSS('background-color', 'rgb(236, 19, 19)');

  await blackbirdCard.getByRole('button', { name: 'Subtract a Blackbird' }).click();
  await expect(blackbirdCard.locator('output')).toHaveText('0');
});

test('keeps the bird grid usable at narrow and wide viewport widths', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const cards = page.locator('ul.row.col-lg-9 > li');
  const mobileFirst = await cards.nth(0).boundingBox();
  const mobileSecond = await cards.nth(1).boundingBox();
  if (!mobileFirst || !mobileSecond) {
    throw new Error('Expected the first two bird cards to be visible on mobile.');
  }
  expect(mobileSecond.y).toBe(mobileFirst.y);
  const mobileGrid = await page.locator('ul.row.col-lg-9').boundingBox();
  const mobileChart = await page.getByRole('region', { name: 'Bird count totals' }).boundingBox();
  if (!mobileGrid || !mobileChart) {
    throw new Error('Expected the bird cards and chart to be visible on mobile.');
  }
  expect(mobileChart.y).toBeGreaterThanOrEqual(mobileGrid.y + mobileGrid.height);

  await page.setViewportSize({ width: 768, height: 1024 });
  const tabletGrid = await page.locator('ul.row.col-lg-9').boundingBox();
  const tabletChart = await page.getByRole('region', { name: 'Bird count totals' }).boundingBox();
  if (!tabletGrid || !tabletChart) {
    throw new Error('Expected the bird cards and chart to be visible on tablet.');
  }
  expect(tabletChart.y).toBeGreaterThanOrEqual(tabletGrid.y + tabletGrid.height);

  await page.setViewportSize({ width: 1280, height: 900 });
  const desktopFirst = await cards.nth(0).boundingBox();
  const desktopFourth = await cards.nth(3).boundingBox();
  const desktopGrid = await page.locator('ul.row.col-lg-9').boundingBox();
  const desktopChart = await page.getByRole('region', { name: 'Bird count totals' }).boundingBox();
  if (!desktopFirst || !desktopFourth) {
    throw new Error('Expected the first four bird cards to be visible on desktop.');
  }
  expect(desktopFourth.y).toBe(desktopFirst.y);
  if (!desktopGrid || !desktopChart) {
    throw new Error('Expected the bird cards and chart to be visible on desktop.');
  }
  expect(desktopChart.x).toBeGreaterThan(desktopGrid.x);
});

test('announces when a bird song cannot be played', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => Promise.reject(new Error('Playback unavailable'));
  });
  await page.goto('/');

  const blackbirdCard = page.locator('li').filter({ hasText: 'Blackbird' });
  await blackbirdCard.getByRole('button', { name: 'Play or pause Blackbird song' }).click();

  await expect(page.getByRole('alert')).toContainText('Birdsong playback is unavailable.');
});

test('supports keyboard interaction with the information and count controls', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Blackbird' })).toBeVisible();

  const infoButton = page.getByRole('button', { name: 'Show app information' });
  await page.keyboard.press('Tab');
  await expect(infoButton).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Hide app information' }))
    .toHaveAttribute('aria-expanded', 'true');

  const blackbirdCard = page.locator('li').filter({ hasText: 'Blackbird' });
  await blackbirdCard.getByRole('button', { name: 'Add a Blackbird' }).focus();
  await page.keyboard.press('Space');
  await expect(blackbirdCard.locator('output')).toHaveText('1');
});
