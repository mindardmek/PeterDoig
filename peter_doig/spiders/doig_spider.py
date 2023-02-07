import scrapy
from peter_doig.items import PeterDoigItem
from scrapy.loader import ItemLoader


class DoigSpider(scrapy.Spider):
    name = 'doig_spider'
    start_urls = ['file:///Users/mindarmekonnen/Desktop/web_scraping/heni/peter_doig/website.html']

    def parse(self, response):
        art_container = response.xpath('//div[@class= "container-fluid"]')
        loader = ItemLoader(item=PeterDoigItem(), selector=art_container)

        loader.add_xpath(
            'artist_name',
            './/div[@class="chr-lot-header__information"]//span[contains(@class,"artist-name")]/text()')

        loader.add_xpath(
            'painting_name',
            './/div[@class="chr-lot-header__information"]//h1/text()')

        loader.add_xpath(
            'price_gbp',
            './/div[@class="chr-lot-header__bid-details"]//span[contains(@class,"value-field")]/text()')

        loader.add_xpath(
            'price_usd',
            './/div[@class="chr-lot-header__bid-details"]//span[contains(@class,"value-field")]/text()')

        loader.add_xpath(
            'price_gbp_est',
            './/div[@class="chr-lot-header__estimate-details"]/span[@class="chr-body-medium"]/text()' )

        loader.add_xpath(
            'price_usd_est',
            './/div[@class="chr-lot-header__estimate-details"]/span[@class="chr-body-medium"]/text()')

        loader.add_xpath(
            'sale_date',
            './/chr-auction-timer//span[@class="chr-body-medium"]//text()')

        loader.add_xpath(
            'image_url',
            './/div[@class="chr-lot-header__image-container"]//img/@src')

        yield loader.load_item()


# Execute in the terminal to produce output
    # scrapy crawl doig_spider -O output.csv
        
    