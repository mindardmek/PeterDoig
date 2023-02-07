import scrapy
from peter_doig.items import PeterDoigItem
from scrapy.loader import ItemLoader

# Defines the Spider class
class DoigSpider(scrapy.Spider):
    # Sets the name of the spider
    name = 'doig_spider'
    # Sets the directory to start scraping from
    start_urls = ['file:///Users/mindarmekonnen/Desktop/web_scraping/heni/peter_doig/website.html']

    # Defines the parse function
    def parse(self, response):
        # Selects the container element holding the artwork information
        art_container = response.xpath('//div[@class= "container-fluid"]')
        
        # Creates an instance of an ItemLoader
        loader = ItemLoader(item=PeterDoigItem(), selector=art_container)
        
        # Extracts the artist's name
        loader.add_xpath(
            'artist_name',
            './/div[@class="chr-lot-header__information"]//span[contains(@class,"artist-name")]/text()')
        # Extracts the painting's name
        loader.add_xpath(
            'painting_name',
            './/div[@class="chr-lot-header__information"]//h1/text()')
        # Extracts the price in GBP
        loader.add_xpath(
            'price_gbp',
            './/div[@class="chr-lot-header__bid details"]//span[contains(@class,"value-field")]/text()')
        # Extracts the price in USD
        loader.add_xpath(
            'price_usd',
            './/div[@class="chr-lot-header__bid-details"]//span[contains(@class,"value-field")]/text()')
        # Extracts the estimated price in GBP
        loader.add_xpath(
            'price_gbp_est',
            './/div[@class="chr-lot-header__estimate-details"]/span[@class="chr-body-medium"]/text()' )
        # Extracts the estimated price in USD
        loader.add_xpath(
            'price_usd_est',
            './/div[@class="chr-lot-header__estimate-details"]/span[@class="chr-body-medium"]/text()')
        # Extracts the sale date
        loader.add_xpath(
            'sale_date',
            './/chr-auction-timer//span[@class="chr-body-medium"]//text()')
        # Extracts the image URL
        loader.add_xpath(
            'image_url',
            './/div[@class="chr-lot-header__image-container"]//img/@src')
        # Yields the loaded item
        yield loader.load_item()


# Execute in the terminal to produce output
    # scrapy crawl doig_spider -O output.csv
        
    