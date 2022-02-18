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
