# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
import re
from datetime import datetime
from itemloaders.processors import MapCompose, TakeFirst


# Extracts name
def get_name(name_raw):
    return re.sub(r'[(b.\d{4})]', '', name_raw).strip()


# Extracts text
def get_text(text_raw):
    return text_raw.strip()


# Extracts price in gbp
def get_price_gbp(gbp_raw):
    gbp_str = re.sub('[\sGBP,]', '', gbp_raw)
    gbp = float(gbp_str)
    return gbp


# Converts gbp to usd
def gbp_to_usd(gbp_price):
    usd = (gbp_price)*1.19
    return usd


# Extracts estimated price in gbp
def gpb_est(price_gbp_est):
    gbp_est_range = [x.replace(',', '') for x in re.findall(
        r'[A-Z]{3} (\d{1,3}(?:,\d{3})*)', price_gbp_est)]
    gbp_est_range = [float(i) for i in gbp_est_range]
    return gbp_est_range


# Extracts estimated price in gbp and converts it to usd
def usd_est(price_gbp_est):
    gbp_est_range = [x.replace(',', '') for x in re.findall(
        r'[A-Z]{3} (\d{1,3}(?:,\d{3})*)', price_gbp_est)]
    gbp_est_range = [float(i) for i in gbp_est_range]
    usd_est_range = [i * 1.19 for i in gbp_est_range]
    return usd_est_range


# Converts date string to datetime value
def str_to_date(date_str):
    return datetime.strptime(date_str, '%d %b %Y').date()


class PeterDoigItem(scrapy.Item):
    # define the fields for your item here
    artist_name = scrapy.Field(
        input_processor=MapCompose(get_name))

    painting_name = scrapy.Field(
        input_processor=MapCompose(get_text))

    price_gbp = scrapy.Field(
        input_processor=MapCompose(get_price_gbp),
        output_processor=TakeFirst())

    price_usd = scrapy.Field(
        input_processor=MapCompose(get_price_gbp, gbp_to_usd),
        output_processor=TakeFirst())

    price_gbp_est = scrapy.Field(
        input_processor=MapCompose(gpb_est))

    price_usd_est = scrapy.Field(
        input_processor=MapCompose(usd_est))

    sale_date = scrapy.Field(
        input_processor=MapCompose(str_to_date),
        output_processor=TakeFirst())

    image_url = scrapy.Field()
