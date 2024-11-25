from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def scrape_room_availability():
    # Set up Selenium WebDriver
    options = Options()
    options.add_argument('--headless')  # Run in headless mode
    options.add_argument('--disable-gpu')  # Disable GPU acceleration
    options.add_argument('--no-sandbox')  # Bypass OS security model (if needed)

    # Path to ChromeDriver executable
    service = Service('path_to_chromedriver')  # Update with your chromedriver path

    driver = webdriver.Chrome(service=service, options=options)

    try:
        url = 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=4190725563792709&_uCurrency=AED&ccde=AE&checkin=12082024&checkout=12132024&city=CTDUB&cmp=SEM%7CD%7CGCCDH%7CG%7CHname%7CDH_GCC_Hname_Nonfocus_Desktop%7C201809101209243576%7CRSA%7C640623074156&country=UNI&currency=AED&gad_source=1&gclid=CjwKCAiA9IC6BhA3EiwAsbltOGT-ShF1Kce2WdOR3PgTFtioAUaOi-7GNelPbRR3jWkQiO2PR3bJsxoCWdcQAvD_BwE&lat=25.14161&lng=55.19081&locusId=CTDUB&locusType=city&rank=1&reference=hotel&roomStayQualifier=2e0e&s_kwcid=AL%211631%213%21640623074156%21e%21%21g%21%21burj+al+arab&searchText=Dubai&topHtlId=201809101209243576&type=city&viewType=LUXE&mtkeys=2109913823509565842&isPropSearch=T'
        driver.get(url)

        # Wait for the dynamic content to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, 'room-info'))
        )

        # Extract room details
        rooms = []
        room_elements = driver.find_elements(By.CLASS_NAME, 'room-info')

        for room_element in room_elements:
            room_type = room_element.find_element(By.TAG_NAME, 'h2').text.strip()
            availability = room_element.find_element(By.CLASS_NAME, 'availability').text.strip()
            rooms.append({'roomType': room_type, 'availability': availability})

        return rooms

    except Exception as e:
        print("Error:", e)
        return []

    finally:
        driver.quit()

# Example usage
if __name__ == "__main__":
    rooms = scrape_room_availability()
    print(rooms)
