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

# Reads a csv data and stores it in a pandas dataframe
df = pd.read_csv('dim_df_correct.csv')

# Creates 3 empty lists for height, width and depth
h = []
w = []
d = []

# Iterates through each value in the 'rawDim' column
for raw in df['rawDim']:
    # Replaces any sequence of digits, separated by whitespaces and any 
    # character that is not an alphabet, decimal, comma, slash, whitespace, 
    # parentheses, colon or period with the sequence of digits separated by the letter 'x'
    text = re.sub(r'(\d)\s*[^a-zA-Z\.\,\/\d\s\(\)\:]+\s*(\d)', r'\1x\2', raw)

    # Replaces a sequence of digits, followed by whitespaces and a fraction of digits 
    # separated by a slash and white spaces, with a float value that is the sum of the 
    # first sequence of digits and the float representation of the fraction
    text = re.sub(r'(\d+) +(\d+)\s*\/\s*(\d+)', 
                  lambda m: str(float(m.group(1)) + ( float(m.group(2))/float(m.group(3)))) , text)

    # Finds pattern which represents a sequence of digits, decimal, comma or slash, followed by the 
    # letter 'x' or 'by', followed by another sequence of digits, decimal, comma or slash, 
    # followed by an optional sequence of the same pattern, followed by the string 'in' or 'cm'
    group = re.findall(r"(?i)([\d\.\,\/ ]+)(?:[x\×]|by)([\d\.\, \/]+)(?:(?:[x\×]|by)([\d\.\, \/]+))?(in|cm)", text)
    
    # Creates 3 variables and initializes them to the string value 'NaN'
    height = width = depth = 'NaN'

    # Checks if 'group' is a non-empty list
    if group and len(group):

        # Strips any whitespaces in the elements of the last tuple in 'group', and replace commas with dots 
        group = group[-1]
        group = [i.strip() for i in group]
        group = [i.replace(',', '.') for i in group]

        # Converts each element in 'group' list to a float, and if the corresponding element is not an 
        # empty string, the value of its corresponding variable is set to the float value. If the element 
        # is an empty string, its orresponding variable is set to 0.
        height = float(group[0]) if group[0] and group[0] != '' else 0 
        width = float(group[1]) if group[1] and group[1] != '' else 0
        depth = float(group[2]) if group[2] and group[2] != '' else 

        # Sets the value of dimension to be the fourth element of the 'group' list
        dimension = group[3]

        # Checks if the value of dimension in lowercase is not equal to 'cm' and multiplies it by 2.54 to 
        # convert it to 'cm'
        if dimension.lower() != 'cm' :
            height = height * 2.54
            width = width * 2.54
            depth = depth * 2.54

        # If the height, width, or depth value is not present, it sets the value as 'NaN'
        height  = height if group[0] and group[0] != '' else 'NaN'
        width   = width  if group[1] and group[1] != '' else 'NaN'
        depth   = depth  if group[2] and group[2] != '' else 'NaN'

    # Appends the height, width, and depth values as float type to the list h, w, and d respectively
    h.append(float(height))
    w.append(float(width))
    d.append(float(depth))

# Assignes the values in h, w, and d to columns height, width, and depth in the pandas dataframe df
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

# Reads a csv data and stores it in a pandas dataframe
flights = pd.read_csv('flights.csv')
airports = pd.read_csv('airports.csv')
weather = pd.read_csv('weather.csv')
airlines = pd.read_csv('airlines.csv')


# In[57]:

# Connects to the database and creates sql tables from pandas dataframe
conn = sqlite3.connect('nycflights13.db')
flights.to_sql('flights', conn, if_exists='replace')
airports.to_sql('airports', conn, if_exists='replace')
airlines.to_sql('airlines', conn, if_exists='replace')
weather.to_sql('weather', conn, if_exists='replace')

# Closes connection to the database
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


# Connects to the database and assigns a cursor
conn = sqlite3.connect("nycflights13.db")
cur = conn.cursor()

# Sql query performs a join operation on the 'flights' and 'airlines' tables to get the 
# values of the 'name', 'arr_time', 'origin', and 'dest' columns
flights_1 = pd.read_sql_query("""SELECT name, arr_time, origin, dest 
            FROM flights 
            JOIN airlines 
            ON flights.carrier=airlines.carrier;""", conn)

# Saves new table to the database
flights_1.to_sql("flights_1", conn, if_exists="replace")

# Closes cursor and connection to the database
cur.close()
conn.close()

flights_1


# 2. Filter resulting dataframe to include only flights containing the word JetBlue  

# In[59]:


# Connects to the database and assigns a cursor
conn = sqlite3.connect("nycflights13.db")
cur = conn.cursor()

# Sql query retrieves the rows from the 'flights_1' dataframe that have the value 'JetBlue Airways' 
# in the 'name' column
jetblue_flights = pd.read_sql_query("""SELECT *
            FROM flights_1
            WHERE name = 'JetBlue Airways';""", conn)

# Replaces the 'flights_1' table with an updated 'flights_1' table
flights_1.to_sql("flights_1", conn, if_exists="replace")

# Closes cursor and connection to the database
cur.close()
conn.close()

jetblue_flights


# 3. Summarise the total number of flights by origin in ascending order

# In[60]:


# Connects to the database and assigns a cursor
conn = sqlite3.connect("nycflights13.db")
cur = conn.cursor()

# Sql query summarizes the total number of flights by 'origin' in ascending order
total_flights = pd.read_sql_query("""SELECT origin, SUM(flight) 
                                    AS num_flights
                                    FROM flights
                                    GROUP BY origin
                                    ORDER BY num_flights ASC;""", conn)

# Saves new table to the database
total_flights.to_sql("total_flights", conn, if_exists="replace")

# Closes cursor and connection to the database
cur.close()
conn.close()

total_flights


# 4. Filter resulting dataframe to return only origins with more than 10,000 flights

# In[61]:


# Connects to the database and assigns a cursor
conn = sqlite3.connect("nycflights13.db")
cur = conn.cursor()

# Sql query returns only 'origins' with more than 10,000 flights
origins_1 = pd.read_sql_query("""SELECT origin, num_flights 
                            FROM total_flights
                            WHERE num_flights > 10000;""", conn)

# Closes cursor and connection to the database
cur.close()
conn.close()

origins_1

