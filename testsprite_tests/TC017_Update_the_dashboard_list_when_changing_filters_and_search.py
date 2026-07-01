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
        
        # -> Fill the 'usuario o email' field with admin@eventmanager.com, fill the 'Contraseña' field with admin1234, then click the 'Empezar' button to sign in.
        # usuario o email text field
        elem = page.get_by_placeholder('usuario o email', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin@eventmanager.com")
        
        # -> Fill the 'usuario o email' field with admin@eventmanager.com, fill the 'Contraseña' field with admin1234, then click the 'Empezar' button to sign in.
        # •••••••• password field
        elem = page.get_by_placeholder('••••••••', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("admin1234")
        
        # -> Fill the 'usuario o email' field with admin@eventmanager.com, fill the 'Contraseña' field with admin1234, then click the 'Empezar' button to sign in.
        # Empezar button
        elem = page.get_by_role('button', name='Empezar', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Finalizados' button on the dashboard to filter events by finalized status.
        # Finalizados button
        elem = page.get_by_role('button', name='Finalizados', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Finalizados' button on the dashboard to filter events by finalized status.
        # Buscar evento... text field
        elem = page.get_by_placeholder('Buscar evento...', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Boda")
        
        # -> Hacer clic en el botón de filtro de estado "Activos" para mostrar los eventos activos que coincidan con la búsqueda.
        # Activos 1 button
        elem = page.get_by_role('button', name='Activos 1', exact=True)
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the visible event list is updated
        # Assert: The search field contains the query 'Boda'.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[3]/div[1]/input").nth(0)).to_have_value("Boda", timeout=15000), "The search field contains the query 'Boda'."
        # Assert: The event list shows exactly 1 visible event card.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[4]/article")).to_have_count(1, timeout=15000), "The event list shows exactly 1 visible event card."
        # Assert: The visible event card title is 'Boda Timo & Kar'.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[4]/article/div[2]/h3").nth(0)).to_have_text("Boda Timo & Kar", timeout=15000), "The visible event card title is 'Boda Timo & Kar'."
        # Assert: The event card displays the 'Activo' badge indicating the selected status filter.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[4]/article/div[1]/div[2]/span[2]").nth(0)).to_have_text("Activo", timeout=15000), "The event card displays the 'Activo' badge indicating the selected status filter."
        
        # --> Verify only matching events are displayed
        # Assert: Search field value is 'Boda'.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[3]/div[1]/input").nth(0)).to_have_value("Boda", timeout=15000), "Search field value is 'Boda'."
        # Assert: Exactly 1 event card is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[4]/article")).to_have_count(1, timeout=15000), "Exactly 1 event card is visible."
        # Assert: The visible event title is 'Boda Timo & Kar'.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[4]/article/div[2]/h3").nth(0)).to_have_text("Boda Timo & Kar", timeout=15000), "The visible event title is 'Boda Timo & Kar'."
        # Assert: The event card shows the 'Activo' badge.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div/div[4]/article/div[1]/div[2]/span[2]").nth(0)).to_have_text("Activo", timeout=15000), "The event card shows the 'Activo' badge."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    