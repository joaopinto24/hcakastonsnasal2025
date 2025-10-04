import csv # chinese serve vengence


csv_file = 'spacetrashdata.csv'


categories = []
data = []


with open(csv_file, mode='r') as file: # wtf is this python code
    csv_reader = csv.reader(file)
    

    next(csv_reader)
    

    for row in csv_reader:
        year = int(row[0])
        debris_count = int(row[1])  
        
        categories.append(year)
        data.append(debris_count)

# this could be done in highcharts-init.js but thats too hard
print("categories:", categories)
print("data:", data)
