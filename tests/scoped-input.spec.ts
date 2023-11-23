import { test, expect } from '@playwright/test'
import { describe } from 'node:test'

test('App loads', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    const element = await page.getByText('Select locations')

    await expect(element).toBeVisible()
})

describe('ScopedInput', () => {
    test('should filter tree based on search', async ({ page }) => {
        await page.goto('http://localhost:3000/')

        // Find input with "Search the tree" as placeholder text.
        const input = await page.$('input[placeholder="Search the tree"]')

        // Type 'Denmark' into the input.
        await input?.fill('Office')

        const element = await page.getByText('Aarhus Office Hub')

        // Expect an element with the text 'Aarhus Office Hub' to be visible.
        await expect(element).toBeVisible()

        await input?.fill('Paris Corp')

        await expect(element).not.toBeVisible()
    })

    test('should select children nodes when a parent is selected', async ({
        page,
    }) => {
        await page.goto('http://localhost:3000/')

        // Find the label with denmark as text.
        await page.getByText('Denmark').click()

        // Expect the checkboxes to be checked.
        expect(await page.isChecked('#aarhus')).toBeTruthy()
        expect(await page.isChecked('#aarhus-technologies')).toBeTruthy()
        expect(await page.isChecked('#aarhus-office-hub')).toBeTruthy()

        // Uncheck the parent node.
        await page.getByText('Denmark').click()

        // Expect the checkboxes to be unchecked.
        expect(await page.isChecked('#aarhus')).toBeFalsy()
        expect(await page.isChecked('#aarhus-technologies')).toBeFalsy()
        expect(await page.isChecked('#aarhus-office-hub')).toBeFalsy()
    })
})
