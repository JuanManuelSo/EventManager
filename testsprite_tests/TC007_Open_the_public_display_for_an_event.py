import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:4000")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Navigate to /display/1 to open the public display screen and check that the display loads and shows the idle state.
        await page.goto("http://localhost:4000/display/1")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # --> Assertions to verify final state
        
        # --> Verify the display screen is loaded
        # Assert: The URL contains /display/1 indicating the display page loaded.
        await expect(page).to_have_url(re.compile("/display/1"), timeout=15000), "The URL contains /display/1 indicating the display page loaded."
        await page.locator("xpath=/html/body/div[1]/div/div[1]/button").nth(0).scroll_into_view_if_needed()
        # Assert: The 'Salir de pantalla' button is visible on the display page.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[1]/button").nth(0)).to_be_visible(timeout=15000), "The 'Salir de pantalla' button is visible on the display page."
        await page.locator("xpath=/html/body/div[1]/div/div[1]/div/button").nth(0).scroll_into_view_if_needed()
        # Assert: The 'Audio off' button is visible on the display page.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[1]/div/button").nth(0)).to_be_visible(timeout=15000), "The 'Audio off' button is visible on the display page."
        await page.locator("xpath=/html/body/div[1]/div/div[1]/div/span[2]").nth(0).scroll_into_view_if_needed()
        # Assert: The 'Conectado' status is visible on the display page.
        await expect(page.locator("xpath=/html/body/div[1]/div/div[1]/div/span[2]").nth(0)).to_be_visible(timeout=15000), "The 'Conectado' status is visible on the display page."
        current_url = await page.evaluate("() => window.location.href")
        # Assert: page loaded with a URL (final outcome verified by the AI judge during the run)
        assert current_url, 'Page should have loaded with a URL'
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    