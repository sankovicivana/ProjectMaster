#read from csv file
import pandas as pd;
df = pd.read_csv("data_for_test3.csv");

#Kilometraža - nakon preuzimanja podataka hiljade su napisane sa tackom 300.000 i ovo je detektovano kao 300.0 samim tim da bi popravila ovaj problem pomozene su sa 1000
df.Kilometraža = df.Kilometraža * 1000

#size of data frame
print("Rows", df.shape[0]) #48789 
print("Cols", df.shape[1]) #156

#Columns that have NULL values
nan_cols = [i for i in df.columns if df[i].isnull().any()]
print(nan_cols)
#['Model', 'Godište', 'Kilometraža', 'Karoserija', 'Gorivo', 'Snaga motora', 'Zamena', 'Plivajući zamajac', 'Emisiona klasa motora', 'Pogon', 'Menjač', 'Broj vrata', 'Broj sedišta', 'Strana volana', 'Klima', 'Boja', 'Materijal enterijera', 'Boja enterijera', 'Registrovan do', 'Vlasništvo', 'Oštećenje', 'description']


print("Model", df['Model'].isnull().sum()) #Model 8
print("Godište", df['Godište'].isnull().sum())
print("Kilometraža", df['Kilometraža'].isnull().sum())
print("Karoserija", df['Karoserija'].isnull().sum())
print("Gorivo", df['Gorivo'].isnull().sum())
print("Snaga motora", df['Snaga motora'].isnull().sum())
print("Zamena", df['Zamena'].isnull().sum())
print("Plivajući zamajac", df['Plivajući zamajac'].isnull().sum())
print("Emisiona klasa motora", df['Emisiona klasa motora'].isnull().sum())
print("Pogon", df['Pogon'].isnull().sum())
print("Menjač", df['Menjač'].isnull().sum())
print("Broj vrata", df['Broj vrata'].isnull().sum())
print("Broj sedišta", df['Broj sedišta'].isnull().sum())
print("Strana volana", df['Strana volana'].isnull().sum())
print("Klima", df['Klima'].isnull().sum())
print("Boja", df['Boja'].isnull().sum())
print("Materijal enterijera", df['Materijal enterijera'].isnull().sum())
print("Boja enterijera", df['Boja enterijera'].isnull().sum())
print("Registrovan do", df['Registrovan do'].isnull().sum())
print("Vlasništvo", df['Vlasništvo'].isnull().sum())
print("Oštećenje", df['Oštećenje'].isnull().sum())
print("description", df['description'].isnull().sum())


