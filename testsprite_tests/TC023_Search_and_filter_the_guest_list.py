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
        
        # -> Click the 'Empezar' button to submit the login form after filling the email and password fields.
        # usuario o email text field
        elem = page.get_by_placeholder('usuario o email', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin@eventmanager.com")
        
        # -> Click the 'Empezar' button to submit the login form after filling the email and password fields.
        # •••••••• password field
        elem = page.get_by_placeholder('••••••••', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin1234")
        
        # -> Click the 'Empezar' button to submit the login form after filling the email and password fields.
        # Empezar button
        elem = page.get_by_role('button', name='Empezar', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Boda Timo & Kar' event card to open the event details page.
        # Activo Boda Boda Timo & Kar San Nicolas, Buenos...
        elem = page.locator('xpath=/html/body/div/div/main/div/div[4]/article')
        await elem.click(timeout=10000)
        
        # -> Click the 'Invitados' tab to open the guest list
        # Invitados button
        elem = page.get_by_role('button', name='Invitados', exact=True)
        await elem.click(timeout=10000)
        
        # -> Type 'rocio.acosta@gmail.com' into the 'Buscar invitado...' search field to filter the guest table and verify matching results appear.
        # Buscar invitado... text field
        elem = page.get_by_placeholder('Buscar invitado...', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("rocio.acosta@gmail.com")
        
        # -> Click the 'Pendientes' filter button to apply the 'Pendientes' status filter and verify only guests with Pendiente status (and the searched email) are shown.
        # Pendientes button
        elem = page.get_by_role('button', name='Pendientes', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the guest list shows matching results only
        # Assert: Search field contains the queried email.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[3]/div[1]/div[1]/input").nth(0)).to_have_value("rocio.acosta@gmail.com", timeout=15000), "Search field contains the queried email."
        # Assert: Only one guest row is displayed after filtering.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[3]/div[2]/table/tbody/tr")).to_have_count(1, timeout=15000), "Only one guest row is displayed after filtering."
        # Assert: Guest row shows the searched email.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[3]/div[2]/table/tbody/tr/td[3]").nth(0)).to_have_text("rocio.acosta@gmail.com", timeout=15000), "Guest row shows the searched email."
        # Assert: Guest row has status Pendiente.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[3]/div[2]/table/tbody/tr/td[7]").nth(0)).to_have_text("Pendiente", timeout=15000), "Guest row has status Pendiente."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    