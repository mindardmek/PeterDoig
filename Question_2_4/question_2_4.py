#!/usr/bin/env python
# coding: utf-8

# In[52]:


import pandas as pd
import re
import sqlite3


# ### 2. Regex

# For each example below, write a regex to process the string in rawDim to extract the height, width and depth (as float64 integers).  
# 
# ##### Bonus: 
# Is there a single regex for all 5 examples?

# In[53]:


df = pd.read_csv('dim_df_correct.csv')
df


# In[54]:


df['rawDim'].values


# In[55]:


df = pd.read_csv('dim_df_correct.csv')

h = []
w = []
d = []

for raw in df['rawDim']:
    text = re.sub(r'(\d)\s*[^a-zA-Z\.\,\/\d\s\(\)\:]+\s*(\d)', r'\1x\2', raw)
    text = re.sub(r'(\d+) +(\d+)\s*\/\s*(\d+)', 
                  lambda m: str(float(m.group(1)) + ( float(m.group(2))/float(m.group(3)))) , text)
    group = re.findall(r"(?i)([\d\.\,\/ ]+)(?:[x\×]|by)([\d\.\, \/]+)(?:(?:[x\×]|by)([\d\.\, \/]+))?(in|cm)", text)
    height = width = depth = 'NaN'
    if group and len(group) :
        group = group[-1]
        group = [i.strip() for i in group]
        group = [i.replace(',', '.') for i in group]

        height = float(group[0]) if group[0] and group[0] != '' else 0 
        width = float(group[1]) if group[1] and group[1] != '' else 0
        depth = float(group[2]) if group[2] and group[2] != '' else 0
        dimension = group[3]
        if dimension.lower() != 'cm' :
            height = height * 2.54
            width = width * 2.54
            depth = depth * 2.54


        height  = height if group[0] and group[0] != '' else 'NaN'
        width   = width  if group[1] and group[1] != '' else 'NaN'
        depth   = depth  if group[2] and group[2] != '' else 'NaN'

    h.append(float(height))
    w.append(float(width))
    d.append(float(depth))

df['height'] = h
df['width'] = w
df['depth'] = d

df


# ### 4. Data

# The CSV files in the candidateEvalData folder represent the tables in the nycflights13 database with the following tables:  
# 
# 1. flights connects to airlines through the carrier variable  
# 2. flights connects to airports in two ways: via the origin and dest variables  
# 3. flights connects to weather via origin (the location), and year, month, day and hour(the time)

# In[56]:


flights = pd.read_csv('flights.csv')
airports = pd.read_csv('airports.csv')
weather = pd.read_csv('weather.csv')
airlines = pd.read_csv('airlines.csv')


# In[57]:


conn = sqlite3.connect('nycflights13.db')
flights.to_sql('flights', conn, if_exists='replace')
airports.to_sql('airports', conn, if_exists='replace')
airlines.to_sql('airlines', conn, if_exists='replace')
weather.to_sql('weather', conn, if_exists='replace')

conn.close()


# #### Task 1
# ##### Describe inner join, left join, right join, full join

# Inner Join: An Inner join returns only the rows that have matching values in both tables. It results an output which only include the rows from both tables where there is a match in the join condition.
# 
# Left Join: A Left join returns all the rows from the left table, and the matching rows from the right table in the "FROM" statement. The output will include NULL values for the right side, when there is no match.
# 
# Right Join: A Right join returns all the rows from the right table, and the matching rows from the left table in the "FROM" statement. The result will include NULL values for the left side, when there is no match.
# 
# Full Join (Outer Join): A Full join returns all the rows from both tables, including the NULL values when there is no match in either the left or right table. If a row has matching values in both tables, it will only appear once in the result set.

# #### Task 2
# ##### Write the SQL to do the following:  

# 1. Add full airline name to the flights dataframe and show the arr_time, origin, dest and the name of the airline. 

# In[58]:


# connects to the database
conn = sqlite3.connect("nycflights13.db")
# assigns cursor
cur = conn.cursor()

# sql query
flights_1 = pd.read_sql_query("""SELECT name, arr_time, origin, dest 
            FROM flights 
            JOIN airlines 
            ON flights.carrier=airlines.carrier;""", conn)

# saves new table to the database
flights_1.to_sql("flights_1", conn, if_exists="replace")

# closes cursor and connection to the database
cur.close()
conn.close()

flights_1


# 2. Filter resulting dataframe to include only flights containing the word JetBlue  

# In[59]:


conn = sqlite3.connect("nycflights13.db")
cur = conn.cursor()

jetblue_flights = pd.read_sql_query("""SELECT *
            FROM flights_1
            WHERE name = 'JetBlue Airways';""", conn)

flights_1.to_sql("flights_1", conn, if_exists="replace")

cur.close()
conn.close()

jetblue_flights


# 3. Summarise the total number of flights by origin in ascending order

# In[60]:


conn = sqlite3.connect("nycflights13.db")
cur = conn.cursor()

total_flights = pd.read_sql_query("""SELECT origin, SUM(flight) 
                                    AS num_flights
                                    FROM flights
                                    GROUP BY origin
                                    ORDER BY num_flights ASC;""", conn)

total_flights.to_sql("total_flights", conn, if_exists="replace")

cur.close()
conn.close()

total_flights


# 4. Filter resulting dataframe to return only origins with more than 10,000 flights

# In[61]:


conn = sqlite3.connect("nycflights13.db")
cur = conn.cursor()

origins_1 = pd.read_sql_query("""SELECT origin, num_flights 
                            FROM total_flights
                            WHERE num_flights > 10000;""", conn)

cur.close()
conn.close()

origins_1

